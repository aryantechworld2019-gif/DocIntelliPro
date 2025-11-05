# Database Setup Guide - DocIntelliPro

Complete guide for setting up and managing the SQLite database.

---

## 🚀 Quick Start (First Time Setup)

For **first-time setup**, use the push command:

```bash
npm run db:push
```

This will:
- ✅ Create `data/docintelipro.db` file
- ✅ Create all 11 tables from schema
- ✅ Insert default document types
- ✅ Insert subscription plans
- ✅ Ready to use immediately!

---

## 📋 Available Database Commands

### For Development (Recommended)

```bash
# Push schema directly to database (fastest)
npm run db:push

# Open Drizzle Studio (visual database browser)
npm run db:studio
```

### For Production (Migration-based)

```bash
# Generate migration files from schema changes
npm run db:generate

# Apply pending migrations
npm run db:migrate

# Push schema changes (alternative to migrations)
npm run db:push
```

---

## 🗄️ Database Schema Overview

DocIntelliPro uses **SQLite** with **Drizzle ORM**.

### Tables Created:

1. **users** - User accounts and authentication
2. **clients** - Client information (name, phone, GSTIN, etc.)
3. **documents** - Document records with AI classification
4. **document_types** - Predefined document categories
5. **tasks** - Tasks and deadlines
6. **communications** - Client communication logs
7. **activity_logs** - Audit trail
8. **ai_learning** - AI classification learning data
9. **subscription_plans** - Available plans
10. **subscription** - Current subscription status
11. **templates** - Document templates
12. **cloud_sync** - Cloud backup status

---

## 🎯 First Time Setup - Step by Step

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your Gemini API key
# GEMINI_API_KEY=your_key_here
```

### Step 3: Create Database

```bash
# Create database with all tables
npm run db:push
```

**Expected Output:**
```
✓ Database file created at ./data/docintelipro.db
✓ 11 tables created successfully
✓ Default data inserted
```

### Step 4: Verify Setup

```bash
# Check database file exists
ls -la data/

# Open Drizzle Studio to browse tables
npm run db:studio
```

Then open: `https://local.drizzle.studio`

---

## 🔧 Common Operations

### View Database Contents

```bash
# Launch Drizzle Studio (visual interface)
npm run db:studio
```

### Reset Database (Start Fresh)

```bash
# Delete database
rm -rf data/
rm -rf drizzle/

# Recreate from scratch
npm run db:push
```

### Backup Database

```bash
# Create backup
cp data/docintelipro.db data/backup-$(date +%Y%m%d).db

# Or use SQLite backup
sqlite3 data/docintelipro.db ".backup data/backup.db"
```

---

## 📊 Default Data Inserted

### Document Types:
- Invoice
- TDS Certificate
- GST Return
- Bank Statement
- Balance Sheet
- Profit & Loss
- Audit Report
- ID Proof
- Other

### Subscription Plans:
- **Starter**: ₹999/mo (20 clients, 50 files/client)
- **Pro**: ₹2,999/mo (50 clients, 100 files/client)
- **Enterprise**: ₹29,999/mo (Unlimited)

---

## 🐛 Troubleshooting

### Error: "No such file or directory: data/"

**Solution:**
```bash
mkdir -p data
npm run db:push
```

### Error: "Database is locked"

**Solution:**
```bash
# Close all apps using the database
# Then reset WAL mode
sqlite3 data/docintelipro.db "PRAGMA journal_mode=DELETE;"
sqlite3 data/docintelipro.db "PRAGMA journal_mode=WAL;"
```

### Error: "Table already exists"

**Solution:**
```bash
# Drop and recreate
rm data/docintelipro.db
npm run db:push
```

### Error: "Cannot find module 'better-sqlite3'"

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🔄 Migration Workflow (Production)

When deploying to production or working in a team:

### 1. Make Schema Changes

Edit `src/db/schema.ts` with your changes.

### 2. Generate Migration

```bash
npm run db:generate
```

This creates a new migration file in `drizzle/` folder.

### 3. Review Migration

Check the generated SQL in `drizzle/0001_*.sql`

### 4. Apply Migration

```bash
npm run db:migrate
```

### 5. Commit Migration Files

```bash
git add drizzle/
git commit -m "feat: add new database migration"
git push
```

---

## 📁 Database File Location

- **Development**: `./data/docintelipro.db`
- **Production**: Configured via `DB_PATH` in `.env`

### Database Files:
```
data/
├── docintelipro.db       # Main database file
├── docintelipro.db-shm   # Shared memory (WAL mode)
└── docintelipro.db-wal   # Write-ahead log (WAL mode)
```

**Note:** All three files are needed. Don't delete `-shm` or `-wal` files.

---

## 🔍 Inspecting Database

### Using Drizzle Studio (Recommended)

```bash
npm run db:studio
```

- Visual interface
- Browse all tables
- Edit data
- Run queries

### Using SQLite CLI

```bash
# Open database
sqlite3 data/docintelipro.db

# List all tables
.tables

# Describe table structure
.schema users

# Query data
SELECT * FROM clients;

# Exit
.quit
```

### Using DB Browser for SQLite (GUI)

Download from: https://sqlitebrowser.org/

Then open `data/docintelipro.db`

---

## 🚀 Performance Tips

### Enable WAL Mode (Already Configured)

```sql
PRAGMA journal_mode = WAL;
```

Benefits:
- ✅ Better concurrent access
- ✅ Faster writes
- ✅ Automatic in DocIntelliPro

### Backup Regularly

```bash
# Add to crontab for daily backups
0 2 * * * cp /path/to/data/docintelipro.db /backups/backup-$(date +\%Y\%m\%d).db
```

---

## 📊 Database Size Management

### Check Database Size

```bash
du -h data/docintelipro.db
```

### Vacuum Database (Reclaim Space)

```bash
sqlite3 data/docintelipro.db "VACUUM;"
```

### Archive Old Data

```bash
# Export old data
sqlite3 data/docintelipro.db ".dump" > archive.sql

# Delete old records (example)
sqlite3 data/docintelipro.db "DELETE FROM documents WHERE created_at < '2023-01-01';"

# Vacuum to reclaim space
sqlite3 data/docintelipro.db "VACUUM;"
```

---

## 🔐 Security Notes

### File Permissions

```bash
# Secure database file (Unix/Linux)
chmod 600 data/docintelipro.db
```

### Encryption (Optional)

For sensitive data, consider using SQLite encryption extensions like SQLCipher.

### Backups

- ✅ Never commit database files to git (already in .gitignore)
- ✅ Keep regular backups
- ✅ Test restore procedures

---

## 📚 Additional Resources

- **Drizzle ORM Docs**: https://orm.drizzle.team/
- **SQLite Documentation**: https://www.sqlite.org/docs.html
- **Drizzle Kit**: https://github.com/drizzle-team/drizzle-kit-mirror

---

## ✅ Checklist

- [ ] Installed dependencies (`npm install`)
- [ ] Created `.env` file with Gemini API key
- [ ] Ran `npm run db:push`
- [ ] Verified database created in `data/` folder
- [ ] Opened Drizzle Studio (`npm run db:studio`)
- [ ] Confirmed default data exists

---

**Need Help?**

- Check [SETUP.md](./SETUP.md) for general setup
- Check [README.md](./README.md) for project overview
- Open an issue on GitHub

---

*Last updated: 2024-11-05*
