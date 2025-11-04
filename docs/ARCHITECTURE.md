# DocIntelliPro Architecture

## System Overview

DocIntelliPro is built as an Electron-based desktop application with a React frontend, Node.js backend services, and SQLite database. The system leverages Google's Gemini AI for intelligent document classification.

## Architecture Layers

### 1. Presentation Layer (React Frontend)

**Location**: `src/pages/`, `src/components/`

**Responsibilities**:
- User interface rendering
- User interaction handling
- State management (Zustand)
- API communication (TanStack Query)
- Form validation

**Key Components**:
- **Dashboard**: Overview and metrics
- **Clients**: Client management
- **Documents**: Document browsing and search
- **Tasks**: Deadline tracking
- **Communications**: Client messaging
- **Analytics**: Reporting and insights
- **Settings**: Configuration

### 2. Application Layer (Electron)

**Location**: `electron/`

**Responsibilities**:
- Desktop window management
- File system access
- IPC (Inter-Process Communication)
- Native OS integration
- Auto-updates

**Key Files**:
- `main.ts`: Main process entry point
- `preload.ts`: Secure IPC bridge

### 3. Business Logic Layer (Services)

**Location**: `src/services/`

**Services**:

#### Gemini Service (`gemini.service.ts`)
- Document classification (quick/deep)
- AI insights generation
- Confidence scoring
- Learning from corrections

#### OCR Service (`ocr.service.ts`)
- PDF text extraction
- Image OCR (Tesseract)
- Text preprocessing
- Multi-format support

#### Document Service (`document.service.ts`)
- Document processing pipeline
- Client matching
- Folder management
- Search functionality
- Metadata extraction

#### (Future Services)
- Communication Service
- Task Service
- Analytics Service
- Cloud Sync Service

### 4. Data Access Layer (ORM)

**Location**: `src/db/`

**Technology**: Drizzle ORM + Better SQLite3

**Responsibilities**:
- Database queries
- Schema management
- Migrations
- Type-safe data access

### 5. Data Storage Layer

**Technologies**:
- **SQLite**: Structured data (metadata, relationships)
- **File System**: Raw documents
- **Cloud Storage**: Optional backup (Google Drive, OneDrive, Dropbox)

## Data Flow

### Document Upload Flow

```
1. User selects files in UI
   ↓
2. Electron IPC reads file data
   ↓
3. OCR Service extracts text
   ↓
4. Gemini Service classifies document
   ↓
5. Document Service matches to client
   ↓
6. File moved to client folder
   ↓
7. Database record created
   ↓
8. (Optional) Cloud sync triggered
   ↓
9. UI updated with results
```

### Search Flow

```
1. User enters search query
   ↓
2. Document Service queries database
   ↓
3. Full-text search on OCR content
   ↓
4. Results filtered and ranked
   ↓
5. UI displays results with highlights
```

### AI Classification Flow

```
1. Document text extracted
   ↓
2. Quick classification attempted (2-3s)
   ↓
3. If confidence < 80%:
   - Add to slow filter queue
   - Deep analysis in background (10-15s)
   ↓
4. Classification result stored
   ↓
5. If user corrects:
   - AI Learning table updated
   - Rules adjusted for future
```

## Component Communication

### IPC (Inter-Process Communication)

```typescript
// Renderer → Main
window.electron.selectFolder()
window.electron.selectFiles()
window.electron.readFile(path)

// Main → Renderer (via preload)
ipcMain.handle('select-folder', async () => {...})
ipcMain.handle('read-file', async (_, path) => {...})
```

### State Management (Zustand)

```typescript
// Auth Store
useAuthStore()
  - user: User | null
  - isAuthenticated: boolean
  - login(username, password)
  - logout()

// App Store
useAppStore()
  - sidebarOpen: boolean
  - searchQuery: string
  - showUploadModal: boolean
```

### API Communication (TanStack Query)

```typescript
// Query example
const { data, isLoading } = useQuery({
  queryKey: ['clients'],
  queryFn: fetchClients
});

// Mutation example
const mutation = useMutation({
  mutationFn: uploadDocument,
  onSuccess: () => queryClient.invalidateQueries(['documents'])
});
```

## Security Architecture

### Authentication & Authorization

- **Local authentication** (extensible to OAuth)
- **Role-based access control** (Admin, Staff, Viewer)
- **Session management** via Zustand persist

### Data Security

- **File encryption** for sensitive documents
- **Database encryption** (optional, via SQLCipher)
- **Secure IPC** with context isolation
- **API key protection** in environment variables

### Privacy

- **Local-first architecture** (data stays on device)
- **Optional cloud sync** (user controlled)
- **Activity logging** for audit trails
- **Data anonymization** for analytics

## Performance Optimization

### Frontend

- **Code splitting** via dynamic imports
- **Lazy loading** for routes and components
- **Memoization** for expensive computations
- **Virtual scrolling** for large lists

### Backend

- **Database indexing** on frequently queried fields
- **WAL mode** for SQLite (better concurrency)
- **Background processing** for slow tasks
- **Caching** for frequent operations

### AI Processing

- **Quick classification first** (2-3s response)
- **Slow filter for uncertainty** (background)
- **Batch processing** for bulk uploads
- **Local caching** of classification patterns

## Scalability Considerations

### Current Design (Desktop App)

- **Single-user focus**
- **Local data storage**
- **Suitable for**: Individual practitioners, small firms

### Future Cloud Version

- **Multi-tenant architecture**
- **Distributed processing**
- **Cloud database** (PostgreSQL)
- **Microservices** for AI, OCR, sync
- **API Gateway** for external integrations

## Error Handling

### Frontend

- **Error boundaries** for React components
- **Toast notifications** for user feedback
- **Retry logic** for failed requests
- **Fallback UI** for loading states

### Backend

- **Try-catch blocks** in all async operations
- **Error logging** to file/console
- **Graceful degradation** when AI unavailable
- **User-friendly error messages**

### AI Processing

- **Fallback classification** (type: "Other")
- **Confidence scoring** for uncertainty
- **Manual review queue** for low confidence
- **Learning from corrections**

## Monitoring & Observability

### Logging

- **Application logs**: Errors, warnings, info
- **Activity logs**: User actions (database)
- **AI logs**: Classification results, confidence
- **Performance logs**: Processing times

### Metrics (Future)

- Documents processed per day
- Average classification time
- AI accuracy rate
- User activity patterns
- Storage usage

## Deployment Architecture

### Development

```
Developer Machine
  ↓
npm run dev
  ↓
Vite Dev Server (localhost:5173)
Electron Dev Mode
```

### Production

```
Source Code
  ↓
npm run build
  ↓
Electron Builder
  ↓
Platform-specific installers:
  - Windows: .exe (NSIS)
  - macOS: .dmg
  - Linux: .AppImage
```

### Auto-Update Flow

```
1. App checks for updates on startup
2. If available, downloads in background
3. Prompts user to install
4. Installs on next restart
```

## Technology Decisions

### Why Electron?

- Cross-platform desktop (Windows, macOS, Linux)
- Web technologies (React, TypeScript)
- File system access
- Native OS integration

### Why React?

- Component reusability
- Large ecosystem
- Developer experience
- TypeScript support

### Why SQLite?

- Zero configuration
- Local-first data
- ACID compliance
- Single file database

### Why Gemini AI?

- State-of-the-art document understanding
- Multimodal capabilities
- Reasonable pricing
- Easy integration

### Why Zustand?

- Lightweight state management
- Simple API
- TypeScript support
- No boilerplate

## Future Enhancements

### Near-term

1. Real-time collaboration
2. Mobile companion app
3. WhatsApp/SMS integration
4. Advanced analytics

### Long-term

1. Cloud-hosted version
2. AI model fine-tuning
3. Blockchain document verification
4. API for third-party integrations

---

For implementation details, see the codebase and inline documentation.
