# NeonTutorials — Production-ready tutorial/blog platform

## 1) Project folder structure

```txt
app/
  admin/
  api/
  articles/
  login/
  rss.xml/
  globals.css
  layout.tsx
  page.tsx
components/
lib/
prisma/
public/
```

## 2) Prisma schema

Defined in `prisma/schema.prisma` with models:
- `User`
- `Article`
- `Category`
- `Tag`
- `ArticleTag`
- `Account`, `Session`, `VerificationToken` for NextAuth

## 3) Installation steps

1. Install dependencies
   ```bash
   npm install
   ```
2. Setup env variables
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client and migrate
   ```bash
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   ```
4. Seed sample data
   ```bash
   npm run prisma:seed
   ```
5. Run local server
   ```bash
   npm run dev
   ```

> Note: `npm run build` runs `prisma generate` before `next build` so Vercel has an up-to-date Prisma Client during cached installs.

> DB-backed pages and feed/sitemap routes are configured as dynamic to avoid Prisma table lookup failures during build-time prerender in environments where migrations are applied after deploy.

## 4) Environment variables

See `.env.example`:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## 5) Full code files

All production source files are committed in this repository and ready for Vercel deployment.

### Deploy to Vercel

1. Push to GitHub.
2. Import project in Vercel.
3. Configure environment variables.
4. Set Postgres DB (Neon/Supabase/RDS), run Prisma migration.
5. Deploy.
