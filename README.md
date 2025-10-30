# Climate Pledge — Local development

This repository contains a Vite + React app for collecting climate pledges.

## Quick start (local)

1. Clone the repository:

```powershell
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies and start the dev server:

```powershell
npm install
npm run dev
```

3. Open the URL reported by Vite (typically http://localhost:5173).

## How to edit this project

- Use your preferred IDE and edit files locally.
- You can also edit files directly in GitHub or open a Codespace.

## Tech stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deploying

Deploy to your favorite static host (Vercel, Netlify, Render). Configure environment variables on the host if you use backend services (for example, Supabase keys).

## Supabase integration

This project is pre-wired for Supabase via `@supabase/supabase-js` and a client at `src/lib/supabaseClient.ts`.

### 1) Create a Supabase project

- Go to the Supabase dashboard and create a new project.
- Copy your Project URL and the `anon` public API key from: Project Settings → API.

### 2) Add environment variables (Vite)

Create a `.env.local` file at the project root with:

```bash
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
```

- Restart the dev server after changing env vars.

### 3) Use the client

Import and use the client anywhere in the app:

```ts
import { supabase } from '@/lib/supabaseClient'

// Example: read from a table named "pledges"
const { data, error } = await supabase
  .from('pledges')
  .select('*')
  .order('created_at', { ascending: false })
```

### 4) Create database schema (pledges)

You can run the provided SQL with either the Supabase SQL Editor or the CLI:

- SQL file: `supabase/migrations/0001_create_pledges.sql`

Option A — SQL Editor:
- Open your project → SQL Editor → paste the file contents → Run.

Option B — Supabase CLI (requires `supabase` CLI installed and linked):
```bash
supabase db push
```

This creates the `pledges` table, enables RLS with permissive insert/select (public reads should avoid selecting `email`/`mobile`), and adds helpful indexes.

### 4) (Optional) Generate TypeScript types

You can generate typed database definitions and pass them to the client for full end-to-end typing. See Supabase docs for `supabase gen types typescript ...` and then wire in `createClient<Database>(...)` in `src/lib/supabaseClient.ts`.

## Notes

- Replace placeholder Git URL with your repository URL before sharing.
- This README intentionally avoids references to any third-party editor used during development.
