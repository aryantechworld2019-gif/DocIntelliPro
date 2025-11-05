// Application constants

export const APP_NAME = 'DocIntelliPro';
export const APP_VERSION = '1.0.0';

// Document types
export const DOCUMENT_TYPES = [
  'Invoice',
  'TDS Certificate',
  'GST Return',
  'Bank Statement',
  'Balance Sheet',
  'Profit & Loss',
  'Audit Report',
  'ID Proof',
  'Other',
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number];

// User roles
export const USER_ROLES = ['admin', 'staff', 'viewer'] as const;
export type UserRole = (typeof USER_ROLES)[number];

// Document status
export const DOCUMENT_STATUS = ['pending', 'processing', 'classified', 'verified', 'archived'] as const;
export type DocumentStatus = (typeof DOCUMENT_STATUS)[number];

// Task status
export const TASK_STATUS = ['pending', 'in_progress', 'completed', 'cancelled'] as const;
export type TaskStatus = (typeof TASK_STATUS)[number];

// Task priority
export const TASK_PRIORITY = ['low', 'medium', 'high', 'urgent'] as const;
export type TaskPriority = (typeof TASK_PRIORITY)[number];

// Communication types
export const COMMUNICATION_TYPES = ['email', 'whatsapp', 'sms', 'call', 'internal'] as const;
export type CommunicationType = (typeof COMMUNICATION_TYPES)[number];

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  STARTER: {
    name: 'starter',
    displayName: 'Starter',
    price: 999,
    maxClients: 20,
    maxFilesPerClient: 50,
  },
  PRO: {
    name: 'pro',
    displayName: 'Pro',
    price: 2999,
    maxClients: 50,
    maxFilesPerClient: 100,
  },
  ENTERPRISE: {
    name: 'enterprise',
    displayName: 'Enterprise',
    price: 29999,
    maxClients: null,
    maxFilesPerClient: null,
  },
} as const;

// AI classification confidence thresholds
export const CONFIDENCE_THRESHOLDS = {
  HIGH: 0.8,
  MEDIUM: 0.5,
  LOW: 0.3,
} as const;

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  MAX_UPLOAD: 50 * 1024 * 1024, // 50MB
  WARNING: 10 * 1024 * 1024, // 10MB
} as const;

// Supported file extensions
export const SUPPORTED_EXTENSIONS = {
  DOCUMENTS: ['.pdf', '.doc', '.docx'],
  SPREADSHEETS: ['.xls', '.xlsx', '.csv'],
  IMAGES: ['.jpg', '.jpeg', '.png', '.tiff'],
  ALL: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.csv', '.jpg', '.jpeg', '.png', '.tiff'],
} as const;
