import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('WARNING: GEMINI_API_KEY not set. AI features will not work.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface DocumentClassification {
  clientName?: string;
  clientPhone?: string;
  clientGSTIN?: string;
  documentType: string;
  documentDate?: string;
  financialYear?: string;
  confidence: number;
  explanation: string;
  extractedData?: Record<string, any>;
}

export class GeminiService {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * Quick classification for fast processing
   */
  async quickClassify(text: string): Promise<DocumentClassification> {
    const prompt = `
You are an AI assistant helping accountants classify documents. Analyze the following document text and extract:

1. Client identification:
   - Name (company or individual)
   - Phone number (mobile/landline)
   - GSTIN (if present)

2. Document classification:
   - Type (Invoice, TDS Certificate, GST Return, Bank Statement, Balance Sheet, Audit Report, ID Proof, Other)
   - Document date
   - Financial year (e.g., 2023-24)

3. Confidence score (0-1) - how confident you are about this classification

4. Brief explanation of how you identified the document (mention specific keywords, patterns, or numbers found)

Document text:
${text.substring(0, 2000)}

Respond in JSON format:
{
  "clientName": "string or null",
  "clientPhone": "string or null",
  "clientGSTIN": "string or null",
  "documentType": "string",
  "documentDate": "YYYY-MM-DD or null",
  "financialYear": "YYYY-YY or null",
  "confidence": 0.0-1.0,
  "explanation": "string"
}
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response.text();

      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const classification: DocumentClassification = JSON.parse(jsonMatch[0]);
      return classification;
    } catch (error) {
      console.error('Gemini quick classification error:', error);
      return {
        documentType: 'Other',
        confidence: 0,
        explanation: `Error during classification: ${(error as Error).message}`,
      };
    }
  }

  /**
   * Deep analysis for slow filter - more thorough but slower
   */
  async deepAnalysis(text: string, fileMetadata?: any): Promise<DocumentClassification> {
    const prompt = `
You are an expert AI assistant for professional document management in accounting and legal firms.
Perform a DEEP ANALYSIS of this document with maximum accuracy.

Available context:
- File name: ${fileMetadata?.fileName || 'unknown'}
- File size: ${fileMetadata?.fileSize || 'unknown'}
- Upload date: ${fileMetadata?.uploadDate || 'unknown'}

Document text (full):
${text}

Analyze in detail and extract:

1. **Client Identification:**
   - Full legal name (individual or entity)
   - All phone numbers found (with country code if present)
   - GSTIN/PAN/other tax identifiers
   - Email addresses
   - Address details

2. **Document Classification:**
   - Precise document type
   - Issue/generation date
   - Validity period (if applicable)
   - Financial year
   - Document number/reference

3. **Key Financial Data:**
   - Amounts mentioned
   - Tax components (CGST, SGST, IGST)
   - Payment details
   - Due dates

4. **Compliance Markers:**
   - Mandatory fields present/missing
   - Signatures/stamps present
   - Regulatory compliance status

5. **Confidence Assessment:**
   - Overall confidence (0-1)
   - Factors supporting classification
   - Ambiguities or concerns

Respond in detailed JSON format:
{
  "clientName": "string or null",
  "clientPhone": "string or null",
  "clientGSTIN": "string or null",
  "documentType": "specific type",
  "documentDate": "YYYY-MM-DD or null",
  "financialYear": "YYYY-YY or null",
  "confidence": 0.0-1.0,
  "explanation": "detailed explanation with specific evidence",
  "extractedData": {
    "amounts": [],
    "taxDetails": {},
    "parties": [],
    "references": []
  }
}
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response.text();

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const classification: DocumentClassification = JSON.parse(jsonMatch[0]);
      return classification;
    } catch (error) {
      console.error('Gemini deep analysis error:', error);
      return {
        documentType: 'Other',
        confidence: 0,
        explanation: `Error during deep analysis: ${(error as Error).message}`,
      };
    }
  }

  /**
   * Generate AI insights for dashboard
   */
  async generateInsights(data: {
    clients: any[];
    documents: any[];
    tasks: any[];
  }): Promise<string[]> {
    const prompt = `
You are analyzing data for an accounting firm. Generate actionable insights.

Data summary:
- Total clients: ${data.clients.length}
- Total documents: ${data.documents.length}
- Pending tasks: ${data.tasks.filter((t) => t.status === 'pending').length}

Provide 3-5 actionable insights in bullet points. Focus on:
- Clients at risk of missing deadlines
- Document submission patterns
- Areas needing attention
- Efficiency improvements

Return as JSON array of strings:
["insight 1", "insight 2", ...]
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response.text();

      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        return ['No insights available at this time.'];
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Gemini insights generation error:', error);
      return ['Unable to generate insights. Please try again later.'];
    }
  }
}

export const geminiService = new GeminiService();
