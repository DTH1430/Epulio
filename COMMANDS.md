# Quick Reference Commands

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Seed database with sample data
npm run seed
```

---

## Setup Commands

```bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables (Windows)
notepad .env.local

# Edit environment variables (Mac/Linux)
nano .env.local
```

---

## Deployment Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel list
```

---

## Git Commands

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Multi-user portfolio website"

# Add remote repository
git remote add origin https://github.com/yourusername/portfolio.git

# Push to GitHub
git push -u origin main
```

---

## Database Commands

### Run Schema in Supabase
1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Copy contents of `supabase/schema.sql`
4. Paste and click "Run"

### Seed Database
```bash
npm run seed
```

---

## Build Commands

### Standard Build
```bash
npm run build
```

### Build with Placeholder Env (for testing)
```bash
# Windows
set NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co && set NEXT_PUBLIC_SUPABASE_ANON_KEY=example-key && npm run build

# Mac/Linux
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=example-key npm run build
```

---

## Useful npm Scripts

```json
{
  "dev": "next dev",           // Start dev server on localhost:3000
  "build": "next build",       // Create production build
  "start": "next start",       // Start production server
  "lint": "next lint",         // Run ESLint
  "seed": "tsx scripts/seed.ts" // Seed database
}
```

---

## Environment Variables

### Required for Development
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Required for Seed Script
```bash
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

---

## Port Management

### Default Ports
- Development: `http://localhost:3000`
- Production: `http://localhost:3000` (when using `npm start`)

### Change Port
```bash
# Windows
set PORT=3001 && npm run dev

# Mac/Linux
PORT=3001 npm run dev
```

---

## Troubleshooting Commands

### Clear Next.js Cache
```bash
# Remove .next folder
rm -rf .next

# Windows
rmdir /s .next

# Then rebuild
npm run build
```

### Clear node_modules
```bash
# Remove node_modules
rm -rf node_modules

# Windows
rmdir /s node_modules

# Reinstall
npm install
```

### View Build Output
```bash
# Build and see detailed output
npm run build -- --debug
```

---

## Vercel-Specific Commands

```bash
# Link to existing Vercel project
vercel link

# View environment variables
vercel env ls

# Add environment variable
vercel env add NEXT_PUBLIC_SUPABASE_URL

# Pull environment variables
vercel env pull

# View deployment logs
vercel logs
```

---

## Package Management

```bash
# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Install specific package
npm install package-name

# Install dev dependency
npm install -D package-name

# Uninstall package
npm uninstall package-name
```

---

## Quick Start Sequence

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env.local

# 3. Edit env file with your Supabase credentials
# (Do this manually in your editor)

# 4. Seed database
npm run seed

# 5. Start development server
npm run dev
```

---

## Production Deployment Sequence

```bash
# 1. Ensure everything works locally
npm run build
npm start

# 2. Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# 3. Push to GitHub
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main

# 4. Deploy to Vercel
vercel --prod

# Or use Vercel dashboard to import from GitHub
```

---

## Database Management

### View Supabase Tables
```bash
# Log into Supabase CLI (if installed)
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# View tables
supabase db dump --schema public
```

### Reset Database
1. Go to Supabase Dashboard
2. SQL Editor
3. Run: `DROP TABLE IF EXISTS profiles CASCADE;`
4. Re-run `supabase/schema.sql`
5. Re-run seed script: `npm run seed`

---

## TypeScript Commands

```bash
# Type check without building
npx tsc --noEmit

# Watch mode type checking
npx tsc --noEmit --watch
```

---

## Useful Shortcuts

### VS Code
- `Ctrl + \`` - Open terminal
- `Ctrl + Shift + P` - Command palette
- `Ctrl + P` - Quick file open
- `F5` - Start debugging

### Terminal
- `Ctrl + C` - Stop running process
- `Ctrl + L` - Clear terminal
- `↑/↓` - Navigate command history

---

## Quick Links

- **Local Dev**: http://localhost:3000
- **Supabase Dashboard**: https://app.supabase.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

---

**💡 Tip**: Bookmark this file for quick reference!
