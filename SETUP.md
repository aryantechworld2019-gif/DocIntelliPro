# DocIntelliPro - Complete Setup Guide

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ and npm installed
- **Git** for version control
- **Gemini API Key** from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **VS Code** or your preferred code editor

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React, TypeScript, Tailwind CSS
- Electron for desktop
- Drizzle ORM and Better SQLite3
- Google Gemini AI SDK
- Tesseract.js for OCR
- And more...

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Required: Get this from https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_actual_api_key_here

# Optional: Database configuration
DB_PATH=./data/docintelipro.db

# Optional: Storage location for documents
STORAGE_PATH=./storage

# Optional: API server port
PORT=3001
```

**Important:** Never commit `.env` file to git. It's already in `.gitignore`.

### 3. Generate Database Schema

```bash
npm run db:generate
```

This creates SQLite migration files based on the schema in `src/db/schema.ts`.

### 4. Push Database Schema (First Time)

```bash
npm run db:push
```

This creates the actual database tables in `data/docintelipro.db`.

### 5. Start Development Server

```bash
npm run dev
```

This will:
- Start Vite dev server on port 5173
- Launch Electron application
- Open DevTools automatically

### 6. Login to Application

Default demo credentials:
- **Username:** `admin`
- **Password:** `admin`

## Available Scripts

### Development
```bash
npm run dev                 # Start both React and Electron in dev mode
npm run dev:react           # Start only React dev server
npm run dev:electron        # Start only Electron (requires React running)
```

### Database
```bash
npm run db:generate         # Generate migration files from schema
npm run db:migrate          # Run pending migrations
npm run db:push             # Push schema directly to database
npm run db:studio           # Open Drizzle Studio (database GUI)
```

### Building
```bash
npm run build               # Build for production (all platforms)
npm run build:react         # Build only React app
npm run build:electron      # Compile TypeScript for Electron
```

### Code Quality
```bash
npm run lint                # Run ESLint
npm run lint:fix            # Fix ESLint issues automatically
npm run type-check          # Run TypeScript type checking
```

## Project Structure

```
DocIntelliPro/
├── electron/               # Electron main process
│   ├── main.ts            # Main process entry
│   └── preload.ts         # Preload script (IPC bridge)
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/             # Page components
│   ├── services/          # Business logic services
│   ├── db/                # Database schema and ORM
│   ├── store/             # Zustand state management
│   ├── lib/               # Utility functions
│   ├── types/             # TypeScript type definitions
│   └── main.tsx           # React entry point
├── public/                # Static assets
├── data/                  # SQLite database (gitignored)
├── storage/               # Document storage (gitignored)
├── drizzle/               # Database migrations
└── docs/                  # Documentation
```

## Common Issues & Solutions

### Issue: "GEMINI_API_KEY not set"

**Solution:** Make sure you've created `.env` file with a valid Gemini API key.

```bash
cp .env.example .env
# Edit .env and add your API key
```

### Issue: Database errors on first run

**Solution:** Generate and push the database schema:

```bash
npm run db:push
```

### Issue: Electron window not opening

**Solution:** Make sure React dev server is running first:

```bash
# Terminal 1
npm run dev:react

# Terminal 2 (wait for React to start)
npm run dev:electron
```

Or just use:
```bash
npm run dev  # Starts both automatically
```

### Issue: TypeScript errors

**Solution:** Run type checking to see all errors:

```bash
npm run type-check
```

### Issue: Port 5173 already in use

**Solution:** Kill the process using port 5173:

```bash
# On macOS/Linux
lsof -ti:5173 | xargs kill -9

# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## Database Management

### View Database

Use Drizzle Studio to visually inspect your database:

```bash
npm run db:studio
```

This opens a web interface at `https://local.drizzle.studio`

### Reset Database

To start fresh:

```bash
# Delete the database file
rm -rf data/

# Recreate schema
npm run db:push
```

### Migrations

For production, use migrations:

```bash
# 1. Generate migration from schema changes
npm run db:generate

# 2. Review the generated SQL in drizzle/ folder

# 3. Apply migration
npm run db:migrate
```

## Testing AI Features

### 1. Get Gemini API Key

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key to your `.env` file

### 2. Test Classification

1. Upload a sample document (invoice, receipt, etc.)
2. Check the Dashboard for AI insights
3. View document classification in Documents section

## Building for Production

### Build All Platforms

```bash
npm run build
```

This creates installers in the `release/` folder:
- **Windows:** `.exe` installer
- **macOS:** `.dmg` installer
- **Linux:** `.AppImage`

### Build Specific Platform

```bash
# Windows only
npm run build -- --win

# macOS only
npm run build -- --mac

# Linux only
npm run build -- --linux
```

## Development Tips

### Hot Reload

- React components hot reload automatically
- Electron main process requires restart (Ctrl+C and `npm run dev`)

### DevTools

- **React DevTools:** Available in Electron window (F12)
- **Redux DevTools:** Not needed (using Zustand)
- **Drizzle Studio:** Run `npm run db:studio`

### Debugging

- **Renderer Process:** Use Chrome DevTools (F12)
- **Main Process:** Add `console.log` in `electron/main.ts`
- **Services:** Use the logger utility from `src/lib/logger.ts`

```typescript
import { logger } from '@/lib/logger';

logger.info('This is an info message');
logger.error('This is an error', error);
logger.debug('This is a debug message'); // Only in development
```

## Environment Variables

### Available Variables

- `GEMINI_API_KEY` - Google Gemini API key (required)
- `DB_PATH` - Database file path (default: `./data/docintelipro.db`)
- `STORAGE_PATH` - Document storage path (default: `./storage`)
- `PORT` - API server port (default: `3001`)
- `NODE_ENV` - Environment (automatic: `development` or `production`)

### Vite Variables (Renderer Process)

For React components, prefix with `VITE_`:

```env
VITE_API_URL=http://localhost:3001
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Next Steps

1. ✅ Complete setup following this guide
2. 📖 Read [README.md](./README.md) for feature overview
3. 🏗️ Read [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for system design
4. 🎯 Read [docs/FEATURES.md](./docs/FEATURES.md) for implementation details
5. 🤝 Read [CONTRIBUTING.md](./CONTRIBUTING.md) if you want to contribute

## Getting Help

- **Issues:** https://github.com/yourusername/DocIntelliPro/issues
- **Discussions:** https://github.com/yourusername/DocIntelliPro/discussions
- **Email:** support@docintelipro.com

## License

MIT License - see [LICENSE](./LICENSE) file for details.

---

**Happy Coding! 🎉**
