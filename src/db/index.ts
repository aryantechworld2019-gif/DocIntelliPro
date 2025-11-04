import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'docintelipro.db');
const sqlite = new Database(dbPath);

// Enable WAL mode for better performance
sqlite.pragma('journal_mode = WAL');

export const db = drizzle(sqlite, { schema });

// Initialize default data
export async function initializeDatabase() {
  try {
    // Insert default document types
    const defaultDocTypes = [
      { name: 'Invoice', description: 'Tax invoices and bills', isMandatory: false },
      { name: 'TDS Certificate', description: 'TDS Form 16/16A', isMandatory: true },
      { name: 'GST Return', description: 'GSTR-1, GSTR-3B, etc.', isMandatory: true },
      { name: 'Bank Statement', description: 'Monthly bank statements', isMandatory: false },
      { name: 'Balance Sheet', description: 'Annual balance sheet', isMandatory: true },
      { name: 'Profit & Loss', description: 'P&L Statement', isMandatory: true },
      { name: 'Audit Report', description: 'Tax audit report', isMandatory: false },
      { name: 'ID Proof', description: 'Aadhaar, PAN, etc.', isMandatory: false },
      { name: 'Other', description: 'Miscellaneous documents', isMandatory: false },
    ];

    for (const docType of defaultDocTypes) {
      await db.insert(schema.documentTypes).values(docType).onConflictDoNothing();
    }

    // Insert subscription plans
    const plans = [
      {
        name: 'starter',
        displayName: 'Starter',
        price: 999,
        maxClients: 20,
        maxFilesPerClient: 50,
        features: JSON.stringify([
          'Basic sorting',
          'Dashboard',
          'Quick search',
          'Email support',
        ]),
        isActive: true,
      },
      {
        name: 'pro',
        displayName: 'Pro',
        price: 2999,
        maxClients: 50,
        maxFilesPerClient: 100,
        features: JSON.stringify([
          'Gemini AI classification',
          'AI Insights',
          'Automatic reminders',
          'Analytics dashboard',
          'Priority support',
          'Cloud sync',
        ]),
        isActive: true,
      },
      {
        name: 'enterprise',
        displayName: 'Enterprise',
        price: 29999,
        maxClients: null,
        maxFilesPerClient: null,
        features: JSON.stringify([
          'All Pro features',
          'Unlimited clients',
          'Unlimited files',
          'Multi-user access',
          'Advanced analytics',
          'Custom templates',
          'API access',
          'Dedicated support',
        ]),
        isActive: true,
      },
    ];

    for (const plan of plans) {
      await db.insert(schema.subscriptionPlans).values(plan).onConflictDoNothing();
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
