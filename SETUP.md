# Quick Setup Guide

Follow these steps to get your portfolio website running in minutes!

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Supabase

1. **Create a free Supabase account**: https://supabase.com
2. **Create a new project** (takes ~2 minutes to provision)
3. **Run the database schema**:
   - Go to SQL Editor in Supabase dashboard
   - Copy/paste contents from `supabase/schema.sql`
   - Click "Run" to create the profiles table

### Step 3: Configure Environment Variables

1. Copy the example file:
```bash
cp .env.example .env.local
```

2. Get your Supabase credentials:
   - Go to **Project Settings** → **API** in Supabase
   - Copy **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **anon public** key → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy **service_role** key → paste as `SUPABASE_SERVICE_ROLE_KEY`

Your `.env.local` should look like:
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Create an Admin User

1. In Supabase, go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter email and password (you'll use this to login)

### Step 5: Seed Sample Data (Optional)

```bash
npm run seed
```

This adds 3 sample profiles to get you started.

### Step 6: Run the App!

```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

## 📝 Quick Test

1. **View profiles**: Go to homepage
2. **Click a profile**: See detailed view
3. **Admin login**: Go to `/admin`, use credentials from Step 4
4. **Add a profile**: Click "Add Profile" in admin dashboard

## 🚢 Deploy to Vercel (2 minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

When prompted, add these environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Done! Your site is live! 🌐

## 📋 Checklist

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] `.env.local` configured with API keys
- [ ] Admin user created in Supabase Auth
- [ ] Sample data seeded (optional)
- [ ] App running on http://localhost:3000
- [ ] Can view profiles
- [ ] Can login to admin
- [ ] Can create/edit/delete profiles

## 🆘 Common Issues

**"No profiles found"**
→ Run `npm run seed` or create profiles via admin dashboard

**"Authentication failed"**
→ Double-check you created a user in Supabase Authentication

**Build errors**
→ Make sure `.env.local` exists with correct values

**Images not loading**
→ Use valid image URLs (try Unsplash: https://unsplash.com)

## 🔗 Helpful Links

- [Full README](README.md) - Detailed documentation
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

---

Need help? Check the [README.md](README.md) for detailed docs!
