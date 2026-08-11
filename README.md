# MECELFAB Industrial Solutions - Platform Documentation

This repository contains the production-ready source code for the MECELFAB Industrial Solutions corporate website, CRM, and internal Business Management Platform. It is built using **Next.js (App Router)** and **Prisma** with a **PostgreSQL** (or SQLite for local dev) database.

---

## 1. Environment Setup

To run the platform locally or prepare for deployment, configure your environment variables.
Create a `.env` file in the root directory:

```env
# Required for NextAuth Security
NEXTAUTH_SECRET="generate-a-secure-random-string-here"
NEXTAUTH_URL="http://localhost:3000" # or your production URL

# Database Connection (Production should use a remote PostgreSQL string)
DATABASE_URL="file:./dev.db" 
```

### Installation
1. Install dependencies: `npm install`
2. Generate Prisma Client: `npx prisma generate`
3. Push Schema to Database: `npx prisma db push`
4. Seed initial Admin User: `npm run prisma db seed` (Run `node prisma/seed.js`)
5. Start development server: `npm run dev`

---

## 2. Deployment Instructions

This application is designed for zero-config deployment on **Vercel** or **Netlify**.

### Pre-Deployment Checklist
1. **Database:** Provision a remote PostgreSQL database (e.g., Supabase, Vercel Postgres, AWS RDS). Update `DATABASE_URL` in your production environment variables.
2. **NextAuth:** Generate a secure string for `NEXTAUTH_SECRET` (e.g., `openssl rand -base64 32`).
3. **Environment Variables:** Add `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` to your hosting provider's dashboard.

### Deployment Steps (Vercel)
1. Import the GitHub repository into Vercel.
2. The framework preset (Next.js) will be automatically detected.
3. Configure the environment variables.
4. Click **Deploy**. Vercel will automatically run `npm run build`.

---

## 3. Backup & Recovery Procedures

### Backups
- **Database:** Since the production environment requires a remote PostgreSQL provider (like Supabase), automated Point-in-Time Recovery (PITR) and daily backups are handled natively by the provider. Ensure backups are enabled in your database dashboard.
- **Documents & Media:** Any files uploaded through the Admin Portal (`/public/uploads` or `/private_uploads`) must be backed up securely. If deploying on a Serverless platform (like Vercel), local file storage is ephemeral. **Important:** For serverless production, you must migrate the `upload` APIs to use an S3 bucket or equivalent cloud storage.

### Disaster Recovery
In the event of a catastrophic database failure:
1. Restore the PostgreSQL database from the latest snapshot via your database provider.
2. Verify connection via `DATABASE_URL`.
3. Trigger a redeployment of the application on Vercel to invalidate cached ISR data.

---

## 4. Admin Governance & Access

### Role-Based Access Control (RBAC)
Access to the `/admin` portal is securely governed by NextAuth.
- **SUPER_ADMIN / ADMIN:** Full access to all modules, including System Settings, Global Content CMS, User Management, and Activity Logs.
- **EDITOR:** Can manage Services, Projects, Testimonials, and Clients. Cannot access security or system settings.
- **VIEWER:** Read-only access to records.

### Account Management
- Never share Admin credentials.
- When an employee leaves, a `SUPER_ADMIN` must immediately downgrade their role to `VIEWER` or delete their account via the `/admin/users` dashboard.

---

## 5. Security & Maintenance

- **Rate Limiting:** Form submissions (Contact, Service Request) are rate-limited to 5 requests per minute per IP to prevent spam.
- **Security Headers:** Strict CSP, HSTS, and X-Frame-Options are enforced via `next.config.mjs`.
- **Ongoing Maintenance:** 
  - Do NOT arbitrarily upgrade major versions of `next` or `prisma` without testing in a staging environment.
  - Regularly review the `/admin/activity` log for anomalous behavior.

---
*Generated during Phase 12 Platform Maturity Audit.*
