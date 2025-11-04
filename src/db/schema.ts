import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Users table - for role-based access control
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(), // Hashed
  role: text('role', { enum: ['admin', 'staff', 'viewer'] }).notNull().default('staff'),
  fullName: text('full_name').notNull(),
  phone: text('phone'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Clients table
export const clients = sqliteTable('clients', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  phone: text('phone').notNull().unique(),
  email: text('email'),
  gstin: text('gstin').unique(),
  pan: text('pan'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  pincode: text('pincode'),
  folderPath: text('folder_path'), // Physical folder location
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Document types
export const documentTypes = sqliteTable('document_types', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  description: text('description'),
  isMandatory: integer('is_mandatory', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Documents table
export const documents = sqliteTable('documents', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clientId: integer('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  documentTypeId: integer('document_type_id').references(() => documentTypes.id),
  fileName: text('file_name').notNull(),
  originalName: text('original_name').notNull(),
  filePath: text('file_path').notNull(),
  fileSize: integer('file_size').notNull(), // In bytes
  mimeType: text('mime_type').notNull(),

  // AI Classification fields
  aiClassification: text('ai_classification'),
  aiConfidence: real('ai_confidence'), // 0-1
  aiExplanation: text('ai_explanation'),
  documentDate: text('document_date'),
  financialYear: text('financial_year'),

  // OCR and text content
  extractedText: text('extracted_text'),
  ocrProcessed: integer('ocr_processed', { mode: 'boolean' }).default(false),

  // Status fields
  status: text('status', { enum: ['pending', 'processing', 'classified', 'verified', 'archived'] })
    .notNull()
    .default('pending'),
  isLocked: integer('is_locked', { mode: 'boolean' }).notNull().default(false),

  // Metadata
  tags: text('tags'), // JSON array
  notes: text('notes'),
  uploadedBy: integer('uploaded_by').references(() => users.id),
  verifiedBy: integer('verified_by').references(() => users.id),
  verifiedAt: text('verified_at'),

  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Tasks and deadlines
export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clientId: integer('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  documentId: integer('document_id').references(() => documents.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  description: text('description'),
  taskType: text('task_type', { enum: ['filing', 'review', 'approval', 'reminder', 'other'] })
    .notNull()
    .default('other'),
  priority: text('priority', { enum: ['low', 'medium', 'high', 'urgent'] })
    .notNull()
    .default('medium'),
  status: text('status', { enum: ['pending', 'in_progress', 'completed', 'cancelled'] })
    .notNull()
    .default('pending'),
  assignedTo: integer('assigned_to').references(() => users.id),
  dueDate: text('due_date'),
  completedAt: text('completed_at'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Communication logs
export const communications = sqliteTable('communications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clientId: integer('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['email', 'whatsapp', 'sms', 'call', 'internal'] }).notNull(),
  direction: text('direction', { enum: ['inbound', 'outbound'] }).notNull(),
  subject: text('subject'),
  message: text('message').notNull(),
  sentBy: integer('sent_by').references(() => users.id),
  status: text('status', { enum: ['sent', 'delivered', 'failed', 'pending'] })
    .notNull()
    .default('pending'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Activity logs for audit trail
export const activityLogs = sqliteTable('activity_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  entityType: text('entity_type'), // 'client', 'document', 'task', etc.
  entityId: integer('entity_id'),
  details: text('details'), // JSON
  ipAddress: text('ip_address'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// AI Learning data - for adaptive classification
export const aiLearning = sqliteTable('ai_learning', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  documentId: integer('document_id').references(() => documents.id, { onDelete: 'cascade' }),
  originalClassification: text('original_classification'),
  correctedClassification: text('corrected_classification'),
  correctedBy: integer('corrected_by').references(() => users.id),
  confidence: real('confidence'),
  learningData: text('learning_data'), // JSON with patterns
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Subscription plans
export const subscriptionPlans = sqliteTable('subscription_plans', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name', { enum: ['starter', 'pro', 'enterprise'] }).notNull().unique(),
  displayName: text('display_name').notNull(),
  price: real('price').notNull(),
  maxClients: integer('max_clients'),
  maxFilesPerClient: integer('max_files_per_client'),
  features: text('features'), // JSON array
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Current subscription
export const subscription = sqliteTable('subscription', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  planId: integer('plan_id').notNull().references(() => subscriptionPlans.id),
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  transactionId: text('transaction_id'),
  amount: real('amount').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Document templates
export const templates = sqliteTable('templates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  templateType: text('template_type', { enum: ['invoice', 'declaration', 'balance_sheet', 'other'] })
    .notNull(),
  content: text('content').notNull(), // Template content
  fields: text('fields'), // JSON array of fillable fields
  createdBy: integer('created_by').references(() => users.id),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Cloud sync status
export const cloudSync = sqliteTable('cloud_sync', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  documentId: integer('document_id').notNull().references(() => documents.id, { onDelete: 'cascade' }),
  provider: text('provider', { enum: ['google_drive', 'onedrive', 'dropbox'] }).notNull(),
  cloudFileId: text('cloud_file_id'),
  cloudPath: text('cloud_path'),
  status: text('status', { enum: ['pending', 'synced', 'failed'] }).notNull().default('pending'),
  lastSyncedAt: text('last_synced_at'),
  error: text('error'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});
