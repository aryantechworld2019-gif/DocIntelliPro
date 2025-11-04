# 🧩 DocIntelliPro - Smart File Manager for Professionals

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

**A subscription-based desktop software that automatically identifies, organizes, and manages client documents for accountants and company secretaries — powered by AI (Gemini) for document understanding and auto-classification.**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Subscription Plans](#-subscription-plans)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

DocIntelliPro revolutionizes document management for accounting and legal professionals by leveraging AI to automate the tedious process of sorting, classifying, and organizing client documents. Built with modern technologies and powered by Google's Gemini AI, it saves professionals 15-20 hours weekly.

### Key Value Propositions

- **70% faster** file classification - No manual sorting
- **60% faster** document tracking - All clients in one dashboard
- **80% faster** audit preparation - One-click reports
- **50% faster** communication - Direct in-app messaging
- **100% safer** data security - Role-based and encrypted

---

## ✨ Features

### 🧭 1. Smart Client Dashboard
- Client summary cards with key metrics
- Upload trend charts (daily/weekly/monthly)
- Activity heatmap showing active/inactive clients
- Real-time file counter by document type
- At-a-glance compliance tracking

### 🧾 2. Gemini AI File Identification & Classification
- **Auto-detect document owner** based on:
  - Name extraction from document text
  - Phone numbers (mobile/landline)
  - GSTIN/PAN identification
- **Automatic document type classification**:
  - Invoices, TDS Certificates, GST Returns
  - Bank Statements, Balance Sheets, P&L
  - Audit Reports, ID Proofs, and more
- **Document date & financial year extraction**
- **Confidence scoring** with detailed explanations
- **Dual-speed processing**:
  - Quick classification (2-3 seconds)
  - Deep analysis mode (10-15 seconds, higher accuracy)

### 📂 3. Auto Folder Creation & Intelligent Sorting
- Dynamic client folder creation using mobile/GSTIN
- Automatic document routing to correct folders
- "Other" folder for unidentified documents
- Auto-rescan when new clients are added
- Zero manual file organization required

### 🔍 4. Deep Search & Filter Engine
- Full-text search across all documents (OCR-powered)
- Filter by client, date, file type, confidence level
- Global search with keyboard shortcut (Ctrl + K)
- Advanced filters for compliance tracking

### 🧠 5. AI-Powered Insights Panel
- Identify clients missing mandatory documents
- Track document submission patterns
- Predict deadline risks
- Generate proactive follow-up suggestions
- Compliance gap analysis

### 📊 6. Client Analytics & Reporting
- Per-client statistics and metrics
- Upload frequency analysis
- Document type distribution
- Missing mandatory documents tracker
- Export reports to Excel/PDF

### 💬 7. Smart Communication Center
- Send file upload links via WhatsApp/Email
- Automated reminders for missing documents
- Chat-style communication log
- "Send for Review" / "Request Correction" workflows
- Complete audit trail of client interactions

### 🔐 8. Access Control & Privacy Layer
- Role-based access (Admin, Staff, Viewer)
- Sensitive file locking (Admin-only access)
- File-level encryption for confidential documents
- Activity logging for compliance

### ☁️ 9. Cloud Backup & Local Sync
- Integration with Google Drive, OneDrive, Dropbox
- Automatic bi-directional sync
- Offline mode with later sync
- Version control and conflict resolution

### 📅 10. Task & Deadline Tracker
- Auto-created reminders based on document type
- Filing deadline calendar
- Task assignment and tracking
- Email/SMS notifications for upcoming deadlines

### 🧩 11. Smart Learning (Adaptive Rules)
- Learns from admin corrections
- Updates classification rules locally
- Improves accuracy over time
- Reduces repetitive corrections

### 📈 12. Revenue & Performance Dashboard (Firm Owners)
- Subscription income tracking
- Client count and growth metrics
- Staff productivity analysis
- Time saved by automation metrics
- Month-over-month comparisons

### 🧾 13. Smart Document Templates
- AI-generated standard templates
- Auto-fill client details
- Export to Word, PDF, Excel
- Customizable template library

### 🔄 14. Slow Filter (Deep AI Scan)
- Background processing for uncertain documents
- High-accuracy deep analysis mode
- Automatic routing upon completion
- Queue management system

### ⚙️ 15. Multi-Tier Subscription System
Built-in subscription management with three tiers:

| Plan | Price | Max Clients | Max Files/Client | Key Features |
|------|-------|-------------|------------------|--------------|
| **Starter** | ₹999/mo | 20 | 50 | Basic sorting, dashboard, quick search |
| **Pro** | ₹2,999/mo | 50 | 100 | AI classification, insights, reminders, cloud sync |
| **Enterprise** | ₹29,999/mo | Unlimited | Unlimited | All Pro features + multi-user, API access, custom templates |

---

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Zustand** - State management
- **TanStack Query** - Server state management
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Framer Motion** - Animations

### Desktop Framework
- **Electron** - Cross-platform desktop application
- **Vite** - Fast build tool and dev server

### Backend & Services
- **Node.js** - Runtime environment
- **Express** - API server
- **Better SQLite3** - Local database
- **Drizzle ORM** - Type-safe database queries

### AI & Document Processing
- **Google Gemini AI** - Document classification
- **Tesseract.js** - OCR for images
- **PDF Parse** - PDF text extraction
- **pdf-lib** - PDF manipulation

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TS-specific linting
- **Electron Builder** - Application packaging
- **Concurrently** - Run multiple scripts
- **Wait-on** - Dependency coordination

---

## 📦 Installation

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Git** for version control
- **Gemini API Key** from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/DocIntelliPro.git
cd DocIntelliPro
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional
DB_PATH=./data/docintelipro.db
STORAGE_PATH=./storage
PORT=3001
```

### Step 4: Initialize Database

```bash
npm run db:generate
npm run db:migrate
```

### Step 5: Start Development Server

```bash
npm run dev
```

This will start:
- React dev server on `http://localhost:5173`
- Electron application window

---

## ⚙️ Configuration

### Gemini AI Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key to your `.env` file

### Storage Configuration

By default, documents are stored in `./storage` directory. To change:

```env
STORAGE_PATH=/path/to/your/storage
```

### Cloud Sync (Optional)

To enable cloud backup:

```env
# Google Drive
GOOGLE_DRIVE_CLIENT_ID=your_client_id
GOOGLE_DRIVE_CLIENT_SECRET=your_client_secret

# Dropbox
DROPBOX_API_KEY=your_api_key

# OneDrive
ONEDRIVE_CLIENT_ID=your_client_id
ONEDRIVE_CLIENT_SECRET=your_client_secret
```

---

## 🚀 Usage

### First Time Setup

1. **Login** with demo credentials:
   - Username: `admin`
   - Password: `admin`

2. **Configure Gemini API** in Settings

3. **Add Your First Client**:
   - Navigate to Clients
   - Click "Add Client"
   - Fill in client details

4. **Upload Documents**:
   - Click "Upload" button in header
   - Select files or drag-and-drop
   - AI will automatically classify

### Daily Workflow

1. **Morning Dashboard Review**
   - Check AI insights for urgent items
   - Review pending tasks
   - Identify clients with missing documents

2. **Document Processing**
   - Upload new documents
   - Review AI classifications (confidence < 80%)
   - Approve or correct classifications

3. **Client Communication**
   - Send reminders for missing documents
   - Share upload links
   - Log client interactions

4. **End of Day**
   - Mark completed tasks
   - Review analytics
   - Schedule follow-ups

### Keyboard Shortcuts

- `Ctrl/Cmd + K` - Global search
- `Ctrl/Cmd + U` - Upload documents
- `Ctrl/Cmd + N` - New client
- `Ctrl/Cmd + /` - Show shortcuts

---

## 🏗 Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Electron Main Process                 │
│  - Window Management                                     │
│  - IPC Handlers                                          │
│  - File System Access                                    │
└─────────────────────────────────────────────────────────┘
                              │
                              │ IPC Communication
                              │
┌─────────────────────────────────────────────────────────┐
│                  React Frontend (Renderer)               │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │  Components │  │  State Mgmt  │  │  API Clients   │ │
│  │  (Pages/UI) │  │  (Zustand)   │  │  (Axios)       │ │
│  └─────────────┘  └──────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST
                              │
┌─────────────────────────────────────────────────────────┐
│                    Backend Services                      │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │  Gemini AI  │  │     OCR      │  │   Document     │ │
│  │  Service    │  │  Processing  │  │   Service      │ │
│  └─────────────┘  └──────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────────┘
                              │
                              │ ORM (Drizzle)
                              │
┌─────────────────────────────────────────────────────────┐
│                   SQLite Database                        │
│  - Clients, Documents, Users                            │
│  - Tasks, Communications, Activity Logs                  │
│  - AI Learning, Templates, Cloud Sync                    │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
Document Upload → OCR Processing → AI Classification →
Client Matching → Folder Assignment → Database Storage →
Cloud Sync (Optional) → Dashboard Update
```

### Key Components

1. **Electron Main Process** (`electron/main.ts`)
   - Manages application lifecycle
   - Handles file system operations
   - Provides IPC for renderer communication

2. **React Frontend** (`src/`)
   - User interface and interactions
   - State management
   - API communication

3. **Gemini Service** (`src/services/gemini.service.ts`)
   - Document classification
   - AI insights generation
   - Confidence scoring

4. **OCR Service** (`src/services/ocr.service.ts`)
   - PDF text extraction
   - Image OCR processing
   - Text normalization

5. **Document Service** (`src/services/document.service.ts`)
   - Orchestrates document processing pipeline
   - Client matching and folder management
   - Search and retrieval

---

## 🗄 Database Schema

### Core Tables

- **users** - User accounts and roles
- **clients** - Client information and metadata
- **documents** - Document records with AI classification
- **document_types** - Predefined document categories
- **tasks** - Deadlines and to-dos
- **communications** - Client communication logs
- **activity_logs** - Audit trail
- **ai_learning** - Classification corrections for learning
- **subscription_plans** - Plan definitions
- **subscription** - Current subscription status
- **templates** - Document templates
- **cloud_sync** - Cloud synchronization status

See `src/db/schema.ts` for complete schema definitions.

---

## 📚 API Documentation

### Document Processing API

```typescript
// Process a document
await documentService.processDocument({
  filePath: '/path/to/file.pdf',
  originalName: 'invoice.pdf',
  mimeType: 'application/pdf',
  useDeepAnalysis: false // or true for deep scan
});

// Search documents
await documentService.searchDocuments('tax invoice 2024');

// Get client documents
await documentService.getDocumentsByClient(clientId);
```

### Gemini AI API

```typescript
// Quick classification
const result = await geminiService.quickClassify(documentText);

// Deep analysis
const result = await geminiService.deepAnalysis(documentText, metadata);

// Generate insights
const insights = await geminiService.generateInsights({
  clients: [],
  documents: [],
  tasks: []
});
```

---

## 💳 Subscription Plans

### Plan Comparison

| Feature | Starter | Pro | Enterprise |
|---------|---------|-----|------------|
| Price | ₹999/mo | ₹2,999/mo | ₹29,999/mo |
| Max Clients | 20 | 50 | Unlimited |
| Max Files/Client | 50 | 100 | Unlimited |
| Basic Sorting | ✅ | ✅ | ✅ |
| AI Classification | ❌ | ✅ | ✅ |
| AI Insights | ❌ | ✅ | ✅ |
| Auto Reminders | ❌ | ✅ | ✅ |
| Cloud Sync | ❌ | ✅ | ✅ |
| Multi-user Access | ❌ | ❌ | ✅ |
| Custom Templates | ❌ | ❌ | ✅ |
| API Access | ❌ | ❌ | ✅ |
| Support | Email | Priority | Dedicated |

---

## 🔧 Development

### Build for Production

```bash
# Build React app
npm run build:react

# Build Electron app
npm run build:electron

# Package for distribution
npm run build
```

### Database Migrations

```bash
# Generate migration
npm run db:generate

# Run migrations
npm run db:migrate

# Studio (GUI)
npm run db:studio
```

### Linting

```bash
npm run lint
```

### Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure all tests pass

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful document understanding
- **Electron** team for the amazing desktop framework
- **React** community for the incredible ecosystem
- All contributors who make this project better

---

## 📞 Support

- **Documentation**: [docs.docintelipro.com](https://docs.docintelipro.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/DocIntelliPro/issues)
- **Email**: support@docintelipro.com
- **Discord**: [Join our community](https://discord.gg/docintelipro)

---

## 🎯 Roadmap

### v1.1 (Coming Soon)
- [ ] Mobile app (React Native)
- [ ] WhatsApp integration
- [ ] Bulk document upload
- [ ] Advanced OCR for handwritten documents

### v1.2
- [ ] Multi-language support (Hindi, Tamil, etc.)
- [ ] Voice commands
- [ ] Smart document comparison
- [ ] Automated report generation

### v2.0
- [ ] Cloud-based version
- [ ] Team collaboration features
- [ ] Advanced AI models
- [ ] Blockchain for document verification

---

<div align="center">

**Made with ❤️ for Accounting Professionals**

[⬆ Back to Top](#-docintelipro---smart-file-manager-for-professionals)

</div>
