# 🚀 StudyFlow — Complete Deployment Guide
**Next.js + Supabase + Vercel | Built by Thulani Billy**

---

## What You're Deploying
- **Landing page** — stunning Aurora-themed marketing site
- **Auth** — login, register, Google OAuth (email/password)
- **Dashboard** — full sidebar app with 11 pages
- **AI Features** — flashcard generator + AI chat (Claude)
- **Database** — Supabase PostgreSQL with RLS

---

## STEP 1 — Create Your Supabase Project (5 mins)

1. Go to **https://supabase.com** → Sign up free
2. Click **"New project"**
   - Name: `studyflow`
   - Database password: save this somewhere
   - Region: **South Africa (af-south-1)** or closest
3. Wait ~2 mins for project to spin up
4. Go to **Settings → API**
   - Copy: `Project URL` → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - Copy: `anon public` key → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy: `service_role` key → this is your `SUPABASE_SERVICE_ROLE_KEY`

### Run the database schema
5. In Supabase dashboard → **SQL Editor** → **New query**
6. Open the file `supabase-schema.sql` from this project
7. Paste the entire contents and click **Run**
8. You should see "Success" — all tables created

### Enable Google OAuth (optional but recommended)
9. Go to **Authentication → Providers → Google**
10. Enable it
11. Create credentials at **https://console.cloud.google.com**
    - Create project → APIs & Services → Credentials → OAuth 2.0
    - Authorized redirect URI: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
12. Paste Client ID + Secret into Supabase

---

## STEP 2 — Get Your Anthropic API Key (2 mins)

1. Go to **https://console.anthropic.com**
2. Sign up / log in
3. Go to **API Keys** → **Create Key**
4. Copy the key — this is your `ANTHROPIC_API_KEY`
5. Add some credits (AI features won't work without credits)

---

## STEP 3 — Deploy to Vercel (5 mins)

### Option A: GitHub (recommended)
1. Push this project to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial StudyFlow commit"
   git remote add origin https://github.com/YOUR_USERNAME/studyflow.git
   git push -u origin main
   ```
2. Go to **https://vercel.com** → Sign up with GitHub
3. Click **"Add New Project"** → Import your repo
4. Framework: **Next.js** (auto-detected)
5. Add Environment Variables (paste from Step 1 & 2):
   ```
   NEXT_PUBLIC_SUPABASE_URL       = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY  = your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY      = your_service_role_key
   ANTHROPIC_API_KEY              = your_anthropic_key
   NEXT_PUBLIC_APP_URL            = https://your-vercel-url.vercel.app
   ```
6. Click **Deploy** — done in ~2 mins!

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## STEP 4 — Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local (copy from .env.local.example)
cp .env.local.example .env.local
# Then fill in your keys

# 3. Run the dev server
npm run dev

# 4. Open http://localhost:3000
```

---

## STEP 5 — After Deployment

### Update Supabase redirect URLs
1. Supabase → **Authentication → URL Configuration**
2. Site URL: `https://YOUR_APP.vercel.app`
3. Redirect URLs: `https://YOUR_APP.vercel.app/**`

### Add custom domain (optional)
1. Vercel → Your project → **Settings → Domains**
2. Add your domain (e.g. `studyflow.co.za`)
3. Update DNS at your registrar

---

## Project Structure

```
studyflow/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Landing page
│   │   ├── layout.tsx            ← Root layout
│   │   ├── globals.css           ← Aurora design system
│   │   ├── auth/
│   │   │   ├── login/            ← Login page
│   │   │   ├── register/         ← Register page
│   │   │   └── callback/         ← OAuth callback
│   │   ├── dashboard/
│   │   │   ├── layout.tsx        ← Sidebar + topbar
│   │   │   ├── page.tsx          ← Dashboard home
│   │   │   ├── ai/               ← AI Assistant
│   │   │   ├── flashcards/       ← AI Flashcards
│   │   │   ├── goals/            ← Goal tracking
│   │   │   ├── progress/         ← Study progress
│   │   │   └── tasks/            ← Task board
│   │   └── api/
│   │       └── ai/               ← Claude AI API route
│   ├── components/
│   │   └── dashboard/
│   │       └── DashboardHome.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts         ← Browser Supabase
│   │   │   └── server.ts         ← Server Supabase
│   │   └── utils.ts
│   └── middleware.ts             ← Auth protection
├── supabase-schema.sql           ← Run this in Supabase
├── tailwind.config.js
├── package.json
└── .env.local.example            ← Copy → .env.local
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom Aurora design system |
| Auth | Supabase Auth (email + Google OAuth) |
| Database | Supabase PostgreSQL |
| AI | Anthropic Claude claude-sonnet-4-20250514 |
| Deployment | Vercel |
| Animations | Framer Motion |
| Fonts | Syne (display) + Manrope (body) + JetBrains Mono |

---

## Features Built

| Feature | Status |
|---------|--------|
| Landing page | ✅ Full |
| User registration | ✅ Full |
| Login + Google OAuth | ✅ Full |
| Auth middleware (protected routes) | ✅ Full |
| Dashboard layout + sidebar | ✅ Full |
| Dashboard home (stats, tasks, goals) | ✅ Full |
| AI Flashcard generator | ✅ Full |
| AI Chat assistant | ✅ Full |
| Goal tracking (CRUD) | ✅ Full |
| Progress tracker | ✅ Full |
| Task board (Kanban) | 🚧 Next sprint |
| Notes editor | 🚧 Next sprint |
| Schedule | 🚧 Next sprint |
| Analytics charts | 🚧 Next sprint |

---

## Need Help?

If you run into issues:
1. Check browser console for errors
2. Check Vercel logs → Your project → **Deployments → Logs**
3. Check Supabase logs → **Logs → API**

Built with ❤️ for StudyFlow by Thulani Billy
