/*
  Create Climate Pledges System

  1) Table: pledges
  2) Security: RLS + insert/select policies (public read excludes sensitive fields on client)
  3) Indexes for sorting/filtering
*/

-- Ensure pgcrypto is available for gen_random_uuid
create extension if not exists pgcrypto;

-- Create pledges table
create table if not exists pledges (
  id uuid primary key default gen_random_uuid(),
  pledge_number bigserial unique not null,
  name text not null,
  email text not null,
  mobile text not null,
  state text not null,
  profile_type text not null check (profile_type in ('Student', 'Working Professional', 'Other')),
  commitments jsonb not null default '[]'::jsonb,
  commitment_count integer not null default 0,
  hearts_rating integer not null default 3 check (hearts_rating >= 1 and hearts_rating <= 5),
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table pledges enable row level security;

-- Policy: Anyone can insert pledges
create policy "Anyone can create pledges"
  on pledges
  for insert
  to anon, authenticated
  with check (true);

-- Policy: Anyone can view pledges (client must avoid selecting sensitive fields)
create policy "Anyone can view pledges"
  on pledges
  for select
  to anon, authenticated
  using (true);

-- Indexes
create index if not exists idx_pledges_created_at on pledges (created_at desc);
create index if not exists idx_pledges_profile_type on pledges (profile_type);
create index if not exists idx_pledges_state on pledges (state);


