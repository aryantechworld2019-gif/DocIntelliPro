import fs from 'fs/promises';
import path from 'path';
import { db } from '../db';
import { documents, clients, documentTypes } from '../db/schema';
import { eq, and, like, or } from 'drizzle-orm';
import { geminiService } from './gemini.service';
import { ocrService } from './ocr.service';

export interface ProcessDocumentOptions {
  filePath: string;
  originalName: string;
  mimeType: string;
  useDeepAnalysis?: boolean;
}

export class DocumentService {
  private storagePath: string;

  constructor() {
    this.storagePath = process.env.STORAGE_PATH || path.join(process.cwd(), 'storage');
    this.ensureStorageDir();
  }

  private async ensureStorageDir() {
    try {
      await fs.mkdir(this.storagePath, { recursive: true });
    } catch (error) {
      console.error('Error creating storage directory:', error);
    }
  }

  /**
   * Process a new document: OCR -> AI Classification -> Store
   */
  async processDocument(options: ProcessDocumentOptions) {
    const { filePath, originalName, mimeType, useDeepAnalysis = false } = options;

    try {
      // Step 1: Extract text (OCR)
      console.log(`Extracting text from ${originalName}...`);
      const extractedText = await ocrService.extractText(filePath, mimeType);

      // Step 2: AI Classification
      console.log(`Classifying document...`);
      const classification = useDeepAnalysis
        ? await geminiService.deepAnalysis(extractedText, { fileName: originalName })
        : await geminiService.quickClassify(extractedText);

      // Step 3: Find or create client
      let client = null;
      if (classification.clientPhone) {
        const existingClients = await db
          .select()
          .from(clients)
          .where(eq(clients.phone, classification.clientPhone))
          .limit(1);

        if (existingClients.length > 0) {
          client = existingClients[0];
        } else if (classification.clientName) {
          // Create new client
          const [newClient] = await db
            .insert(clients)
            .values({
              name: classification.clientName,
              phone: classification.clientPhone,
              gstin: classification.clientGSTIN || null,
            })
            .returning();
          client = newClient;
        }
      }

      if (!client) {
        // No client identified - move to "Other" folder
        console.log('No client identified, moving to Other folder');
        return {
          success: false,
          reason: 'no_client',
          classification,
        };
      }

      // Step 4: Get file stats
      const stats = await fs.stat(filePath);

      // Step 5: Create client folder if needed
      const clientFolderPath = path.join(this.storagePath, this.sanitizeFolderName(client.name));
      await fs.mkdir(clientFolderPath, { recursive: true });

      // Update client folder path
      await db.update(clients).set({ folderPath: clientFolderPath }).where(eq(clients.id, client.id));

      // Step 6: Move file to client folder
      const newFilePath = path.join(clientFolderPath, originalName);
      await fs.copyFile(filePath, newFilePath);

      // Step 7: Find document type
      const docTypesList = await db.select().from(documentTypes);
      const matchedType = docTypesList.find(
        (dt) => dt.name.toLowerCase() === classification.documentType.toLowerCase()
      );

      // Step 8: Save document record
      const [document] = await db
        .insert(documents)
        .values({
          clientId: client.id,
          documentTypeId: matchedType?.id || null,
          fileName: originalName,
          originalName: originalName,
          filePath: newFilePath,
          fileSize: stats.size,
          mimeType: mimeType,
          extractedText: extractedText,
          ocrProcessed: true,
          aiClassification: classification.documentType,
          aiConfidence: classification.confidence,
          aiExplanation: classification.explanation,
          documentDate: classification.documentDate || null,
          financialYear: classification.financialYear || null,
          status: classification.confidence > 0.8 ? 'classified' : 'pending',
        })
        .returning();

      return {
        success: true,
        document,
        client,
        classification,
      };
    } catch (error) {
      console.error('Document processing error:', error);
      throw error;
    }
  }

  /**
   * Sanitize folder name for file system
   */
  private sanitizeFolderName(name: string): string {
    return name.replace(/[^a-z0-9_\-]/gi, '_').toLowerCase();
  }

  /**
   * Search documents by text content
   */
  async searchDocuments(query: string) {
    return await db
      .select()
      .from(documents)
      .where(
        or(
          like(documents.extractedText, `%${query}%`),
          like(documents.originalName, `%${query}%`),
          like(documents.aiExplanation, `%${query}%`)
        )
      )
      .limit(50);
  }

  /**
   * Get documents by client
   */
  async getDocumentsByClient(clientId: number) {
    return await db.select().from(documents).where(eq(documents.clientId, clientId));
  }

  /**
   * Rescan "Other" folder when new client is added
   */
  async rescanOtherFolder(newClientPhone: string) {
    const otherFolderPath = path.join(this.storagePath, 'other');

    try {
      const files = await fs.readdir(otherFolderPath);

      for (const file of files) {
        const filePath = path.join(otherFolderPath, file);
        // Re-process this file
        // This would be implemented based on file metadata
      }
    } catch (error) {
      console.error('Error rescanning Other folder:', error);
    }
  }
}

export const documentService = new DocumentService();
