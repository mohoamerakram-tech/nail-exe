-- Run once in the Supabase SQL editor before deploying the admin catalogue.
create table if not exists public.catalog_state (
  id text primary key,
  products jsonb not null default '[]'::jsonb,
  logos jsonb not null default '[]'::jsonb,
  promotions jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.catalog_state enable row level security;

-- The application uses the server-only service role key, which bypasses RLS.
-- No browser-facing policies are intentionally created for catalogue mutations.

insert into storage.buckets (id, name, public)
values ('catalog-media', 'catalog-media', true)
on conflict (id) do update set public = excluded.public;
