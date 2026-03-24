export const supabaseConfig = {
  url: "https://zowoulfkyhtffjjkhdye.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvd291bGZreWh0ZmZqamtoZHllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2OTU4NjUsImV4cCI6MjA4OTI3MTg2NX0.IOfJmrDbr_7Ibw8TtiubkGnEYKTa-0rJ2LiCI5wQl70",
};

create table if not exists public.board_posts (
    id bigint generated always as identity primary key,
    author text not null,
    title text not null,
    content text not null,
    created_at timestamptz not null default now()
  );

  alter table public.board_posts enable row level security;

  create policy "Allow anon insert board_posts"
  on public.board_posts
  for insert
  to anon
  with check (true);

  create policy "Allow anon select board_posts"
  on public.board_posts
  for select
  to anon
  using (true);
