# Climate Pledge Platform

A modern web application built with React, Vite, and Supabase that allows users to make climate action pledges and join a community of environmentally conscious individuals.

## Features

- 🌱 Interactive pledge form with multiple commitment categories
- 💚 Real-time pledge wall showing community commitments
- 🔍 Search and filter pledges by various criteria
- 🎨 Beautiful UI with Tailwind CSS and shadcn/ui
- 🔒 Secure data handling with Supabase

## Tech Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database & Backend:** Supabase
- **State Management:** React Query
- **Form Handling:** React Hook Form
- **Icons:** Lucide React

## Quick Start (Local Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/sm6746/climate-pledge.git
   cd climate-pledge
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Configure Supabase**

   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Get your credentials:
   - Go to Project Settings → API
   - Copy your Project URL and anon/public key

   c. Create `.env.local` file:
   ```bash
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Set up the database**

   Option A — Using SQL Editor:
   - Open Supabase Dashboard → SQL Editor
   - Open `supabase/migrations/0001_create_pledges.sql`
   - Run the SQL to create the table and set up security

   Option B — Using Supabase CLI:
   ```bash
   supabase db push
   ```

5. **Start the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

6. Open http://localhost:5173 in your browser

## Project Structure

```
climate-pledge/
├── src/
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── PledgeForm.tsx   # Pledge submission form
│   │   └── PledgeWall.tsx   # Community pledge display
│   ├── lib/
│   │   ├── supabaseClient.ts # Supabase configuration
│   │   ├── pledgeService.ts  # Pledge data operations
│   │   └── database.types.ts # TypeScript types for DB
│   └── pages/               # Application pages
├── public/                  # Static assets
└── ...config files         # Various configuration files
```

## Features in Detail

### Pledge Form
- Personal information collection (name, email, mobile, state)
- Profile type selection (Student, Working Professional, Other)
- Multiple commitment categories:
  - Energy & Water Conservation
  - Sustainable Transportation
  - Waste Reduction & Recycling
- Form validation and error handling
- Success notifications
- Privacy-focused data handling

### Pledge Wall
- Real-time pledge display
- Search functionality
- Profile type filtering
- Commitment count visualization
- Hearts rating system
- Responsive design

### Data Security
- Row Level Security (RLS) enabled
- Public/private field separation
- Secure API access
- Input validation

## Database Schema

```sql
create table pledges (
  id uuid primary key default gen_random_uuid(),
  pledge_number bigserial unique not null,
  name text not null,
  email text not null,
  mobile text not null,
  state text not null,
  profile_type text not null,
  commitments jsonb not null default '[]'::jsonb,
  commitment_count integer not null default 0,
  hearts_rating integer not null default 3,
  created_at timestamptz not null default now()
);
```

## Deployment

Deploy to your favorite static host (Vercel, Netlify, Render). Make sure to:

1. Set up the environment variables on your hosting platform
2. Configure build settings (if needed)
3. Set up any required deployment hooks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Supabase](https://supabase.com/) for the backend infrastructure
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Vite](https://vitejs.dev/) for the blazing fast build tool
