import Tesseract from 'tesseract.js';
import pdfParse from 'pdf-parse';
import fs from 'fs/promises';

export class OCRService {
  /**
   * Extract text from PDF
   */
  async extractFromPDF(filePath: string): Promise<string> {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error(`Failed to extract text from PDF: ${(error as Error).message}`);
    }
  }

  /**
   * Extract text from image using Tesseract OCR
   */
  async extractFromImage(filePath: string): Promise<string> {
    try {
      const result = await Tesseract.recognize(filePath, 'eng', {
        logger: (m) => console.log(m),
      });
      return result.data.text;
    } catch (error) {
      console.error('OCR extraction error:', error);
      throw new Error(`Failed to extract text from image: ${(error as Error).message}`);
    }
  }

  /**
   * Extract text based on file type
   */
  async extractText(filePath: string, mimeType: string): Promise<string> {
    if (mimeType === 'application/pdf') {
      return this.extractFromPDF(filePath);
    }

    if (
      mimeType.startsWith('image/') ||
      ['image/jpeg', 'image/jpg', 'image/png', 'image/tiff'].includes(mimeType)
    ) {
      return this.extractFromImage(filePath);
    }

    // For text-based documents, just read the file
    if (mimeType.startsWith('text/')) {
      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    }

    throw new Error(`Unsupported file type for OCR: ${mimeType}`);
  }
}

export const ocrService = new OCRService();
