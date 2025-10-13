# Multi-User Portfolio Website

A production-ready full-stack portfolio website built with Next.js 15, TypeScript, Tailwind CSS, Shadcn/UI, and Supabase. This application allows you to showcase multiple portfolios of your friends or team members with full CRUD functionality.

## Features

- **Modern Tech Stack**: Next.js 15 App Router, TypeScript, Tailwind CSS, Shadcn/UI
- **Database & Auth**: Supabase for PostgreSQL database and authentication
- **Responsive Design**: Mobile-first, fully responsive UI
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for profiles
- **Authentication**: Protected admin routes with Supabase Auth
- **Rich Profiles**: Support for bio, skills, social links, and projects
- **Image Support**: Profile photos and project images
- **Production Ready**: Optimized for deployment on Vercel

## Project Structure

```
portfolio/
├── app/
│   ├── page.tsx                 # Home page with profiles grid
│   ├── layout.tsx               # Root layout with navbar
│   ├── globals.css              # Global styles with Tailwind
│   ├── profile/[id]/
│   │   └── page.tsx             # Dynamic profile detail page
│   └── admin/
│       └── page.tsx             # Admin dashboard with CRUD
├── components/
│   ├── ui/                      # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   └── badge.tsx
│   ├── Navbar.tsx               # Navigation component
│   ├── ProfileCard.tsx          # Profile card component
│   └── ProfileForm.tsx          # Profile form for CRUD
├── lib/
│   ├── supabase.ts              # Supabase client & types
│   ├── auth.ts                  # Authentication utilities
│   └── utils.ts                 # Utility functions
├── scripts/
│   └── seed.ts                  # Database seed script
├── supabase/
│   └── schema.sql               # Database schema
└── ...config files
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)
- npm or yarn package manager

### 1. Clone and Install

```bash
# Clone the repository (or download the files)
cd portfolio

# Install dependencies
npm install
```

### 2. Set Up Supabase

1. **Create a Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in your project details

2. **Run the Database Schema**
   - In your Supabase dashboard, go to **SQL Editor**
   - Copy the contents of `supabase/schema.sql`
   - Paste and run the SQL to create the `profiles` table

3. **Get Your API Keys**
   - Go to **Project Settings** → **API**
   - Copy your `Project URL`
   - Copy your `anon/public` key
   - Copy your `service_role` key (keep this secret!)

4. **Create an Admin User**
   - Go to **Authentication** → **Users**
   - Click **Add User**
   - Create a user with email and password (you'll use this to login to admin)

### 3. Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
```

Update [.env.local](.env.local) with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 4. Seed the Database (Optional)

Run the seed script to add sample profiles:

```bash
npm run seed
```

This will insert 3 sample profiles:
- Alice Nguyen - Frontend Developer
- Bao Tran - UI/UX Designer
- Duy Le - Backend Engineer

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## Usage

### Viewing Profiles

- Visit the homepage to see all profiles in a responsive grid
- Click on any profile card to view detailed information
- Each profile shows bio, skills, social links, and projects

### Admin Dashboard

1. Navigate to `/admin` or click "Admin Login" in the navbar
2. Sign in with the admin credentials you created in Supabase
3. Once logged in, you can:
   - **Create** new profiles with the "Add Profile" button
   - **Edit** existing profiles with the edit icon
   - **Delete** profiles with the delete icon

### Profile Data Structure

Each profile includes:
- **Name**: Full name
- **Bio**: Short description
- **Photo URL**: Profile picture URL
- **Skills**: Array of skills/technologies
- **Social Links**: GitHub, LinkedIn, Twitter, Website
- **Projects**: Array of featured projects with title, description, URL, and image

## Deployment to Vercel

### Method 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Method 2: Using Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In the Vercel dashboard, go to your project settings
   - Navigate to **Environment Variables**
   - Add the following variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - (Optional) `SUPABASE_SERVICE_ROLE_KEY` if you want to run seed script in production

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

### Method 3: Deploy Button

You can also create a deploy button by adding this to your GitHub README:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=your-repo-url)
```

## Customization

### Styling

- Modify [app/globals.css](app/globals.css) to change color scheme and CSS variables
- Update [tailwind.config.ts](tailwind.config.ts) for Tailwind customization
- All colors use CSS variables for easy theming

### Database Schema

To modify the database schema:

1. Update [supabase/schema.sql](supabase/schema.sql)
2. Run the new SQL in Supabase SQL Editor
3. Update TypeScript types in [lib/supabase.ts](lib/supabase.ts)

### Adding Features

Some ideas for extending the app:

- Add dark mode toggle
- Implement profile search and filtering
- Add pagination for profiles
- Allow profile owners to edit their own profiles
- Add contact forms
- Implement file upload for images
- Add analytics and view counts

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: [Supabase Auth](https://supabase.com/docs/guides/auth)
- **Deployment**: [Vercel](https://vercel.com/)

## Troubleshooting

### "No profiles found" message

- Make sure you ran the database schema in Supabase
- Check your environment variables are correct
- Try running `npm run seed` to add sample data

### Authentication issues

- Verify you created a user in Supabase Authentication
- Check your Supabase URL and keys in `.env.local`
- Make sure RLS policies are set up correctly (schema.sql includes this)

### Build errors

- Run `npm run build` locally to test
- Check for TypeScript errors: `npx tsc --noEmit`
- Ensure all environment variables are set in Vercel

### Images not loading

- Verify image URLs are accessible
- Check Next.js image configuration in [next.config.js](next.config.js)
- Ensure image domains are whitelisted if using external sources

## Database Schema

The `profiles` table structure:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| name | TEXT | Profile name |
| bio | TEXT | Short biography |
| photo_url | TEXT | Profile photo URL |
| skills | TEXT[] | Array of skills |
| socials | JSONB | Social media links object |
| projects | JSONB | Array of projects |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Support

For questions or issues:
1. Check the troubleshooting section above
2. Review Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
3. Review Next.js documentation: [https://nextjs.org/docs](https://nextjs.org/docs)

---

**Built with ❤️ using Next.js and Supabase**
