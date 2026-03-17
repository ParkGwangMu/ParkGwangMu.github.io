# ParkGwangMu

GitHub Pages starter site for the `ParkGwangMu` account.

This version includes a browser-side Supabase connection for a contact form.

## Publish target

Create the GitHub repository as:

`ParkGwangMu.github.io`

Then upload the files in this folder to that repository.

## Supabase setup

1. Create a Supabase project.
2. In Supabase SQL Editor, create the table:

```sql
create table public.site_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text,
  message text not null,
  created_at timestamptz not null default now()
);
```

3. Enable insert access for the anonymous role with Row Level Security:

```sql
alter table public.site_messages enable row level security;

create policy "Allow anon inserts to site_messages"
on public.site_messages
for insert
to anon
with check (true);
```

4. Open `supabase-config.js` and replace:
   - `YOUR_SUPABASE_URL`
   - `YOUR_SUPABASE_ANON_KEY`

5. Push the files to `ParkGwangMu.github.io`. GitHub Pages will serve the form as a static site.

## Notes

- The anon key is safe to expose in a browser app, but your table policies must stay minimal.
- If you also want to read messages back on the site, add a separate `select` policy instead of reusing the insert policy.
