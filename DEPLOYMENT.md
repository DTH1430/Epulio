# Deployment Guide

Complete guide for deploying your portfolio website to Vercel.

## Pre-Deployment Checklist

Before deploying, ensure you have:

- ✅ Supabase project set up and running
- ✅ Database schema executed (`supabase/schema.sql`)
- ✅ Environment variables configured locally
- ✅ App tested locally (`npm run dev`)
- ✅ Admin user created in Supabase
- ✅ Sample data seeded (optional)

## Option 1: Deploy with Vercel CLI (Recommended)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy

```bash
# Deploy to preview
vercel

# Or deploy directly to production
vercel --prod
```

### Step 4: Add Environment Variables

When prompted, or via the Vercel dashboard:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
```

Optional (only if you want to run seed in production):
```
SUPABASE_SERVICE_ROLE_KEY = your-service-role-key-here
```

### Step 5: Verify Deployment

Visit the URL provided by Vercel to see your live site!

## Option 2: Deploy via GitHub

### Step 1: Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Multi-user portfolio website"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/portfolio.git

# Push to GitHub
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Project"**
3. Select your GitHub repository
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables

In the Vercel import screen or dashboard:

1. Click **"Environment Variables"**
2. Add each variable:
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://your-project.supabase.co`
   - Environment: Production (and Preview if desired)

3. Repeat for:
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (optional)

### Step 4: Deploy

Click **"Deploy"** and wait ~2 minutes.

## Option 3: One-Click Deploy Button

Add this to your GitHub README for easy deployment:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/portfolio&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Supabase%20credentials%20required&envLink=https://supabase.com/dashboard/project/_/settings/api)
```

## Post-Deployment

### 1. Test Your Deployment

Visit your Vercel URL and verify:

- ✅ Homepage loads with profiles
- ✅ Profile detail pages work
- ✅ Admin login page accessible
- ✅ Can login with admin credentials
- ✅ Images load correctly
- ✅ All navigation works

### 2. Set Up Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

### 3. Configure Supabase URL (Optional)

If using a custom domain, update your allowed URLs in Supabase:

1. Go to Supabase Dashboard
2. **Authentication** → **URL Configuration**
3. Add your Vercel domain to **Site URL** and **Redirect URLs**

## Environment Variables Reference

### Required Variables

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public/anonymous key | Supabase → Settings → API → Project API keys → anon public |

### Optional Variables

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (for seed script) | Supabase → Settings → API → Project API keys → service_role |

## Vercel Configuration

The project includes a `vercel.json` file with optimal settings:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## Continuous Deployment

Once connected to GitHub:

1. Push changes to your main branch
2. Vercel automatically deploys
3. Preview deployments for pull requests
4. Production deployments for main branch

```bash
# Make changes
git add .
git commit -m "Update profile features"
git push

# Vercel automatically deploys!
```

## Troubleshooting Deployment

### Build Fails

**Error: Missing environment variables**
```
Solution: Add all required env vars in Vercel dashboard
```

**Error: TypeScript errors**
```bash
# Test build locally
npm run build

# Fix any TypeScript errors
```

### Runtime Errors

**"Failed to fetch profiles"**
```
Solution:
- Verify Supabase URL and keys in Vercel env vars
- Check RLS policies are set correctly
- Ensure database schema is applied
```

**Images not loading**
```
Solution:
- Check image URLs are valid
- Verify Next.js image config in next.config.js
- Add image domains to remotePatterns if needed
```

### Authentication Issues

**"Cannot login to admin"**
```
Solution:
- Verify admin user exists in Supabase Auth
- Check SUPABASE_URL and ANON_KEY are correct
- Clear browser cache and cookies
```

## Performance Optimization

### Caching

The app uses `revalidate = 0` for development. For production:

```typescript
// In app/page.tsx
export const revalidate = 60; // Cache for 60 seconds
```

### Image Optimization

Next.js automatically optimizes images. For better performance:

1. Use WebP format when possible
2. Specify image dimensions
3. Use Supabase Storage for images instead of external URLs

### Database Optimization

For better query performance:

```sql
-- Add index on created_at
CREATE INDEX idx_profiles_created_at ON profiles(created_at DESC);
```

## Monitoring

### Vercel Analytics

Enable in Vercel dashboard:
1. Go to your project
2. Click **"Analytics"**
3. Enable Web Analytics

### Supabase Monitoring

Check database usage:
1. Supabase → **Database** → **Backups**
2. Monitor API usage in **Settings** → **Usage**

## Scaling Considerations

As your app grows:

1. **Enable caching** for profile data
2. **Add pagination** for profile lists
3. **Use Supabase Edge Functions** for complex operations
4. **Implement CDN** for static assets
5. **Set up database backups** in Supabase

## Security Checklist

Before going live:

- ✅ RLS policies enabled (included in schema.sql)
- ✅ Service role key kept secret (not in client code)
- ✅ CORS configured in Supabase if needed
- ✅ Environment variables not committed to git
- ✅ Admin routes protected with authentication

## Updating Your Deployment

```bash
# Pull latest changes
git pull

# Make your updates
# ... edit files ...

# Test locally
npm run dev

# Commit and push
git add .
git commit -m "Your update message"
git push

# Vercel auto-deploys!
```

## Rollback

If something goes wrong:

1. Go to Vercel dashboard
2. Click **"Deployments"**
3. Find a working deployment
4. Click **"..."** → **"Promote to Production"**

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Production Checklist](https://supabase.com/docs/guides/platform/going-into-prod)

---

**🎉 Congratulations on deploying your portfolio website!**

For questions or issues, refer to the [README.md](README.md) or [SETUP.md](SETUP.md).
