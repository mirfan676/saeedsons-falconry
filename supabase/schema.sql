create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  city text not null,
  address text not null,
  items jsonb not null,
  subtotal numeric not null default 0,
  status text not null default 'whatsapp_pending',
  created_at timestamptz not null default now()
);

alter table public.orders add column if not exists country text not null default '';

alter table public.orders enable row level security;

drop policy if exists "Public can create order requests" on public.orders;
create policy "Public can create order requests"
on public.orders for insert
to anon, authenticated
with check (true);

drop policy if exists "Admin can view orders" on public.orders;
create policy "Admin can view orders"
on public.orders for select
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@saeedsonsfalconry.com');

drop policy if exists "Admin can update orders" on public.orders;
create policy "Admin can update orders"
on public.orders for update
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@saeedsonsfalconry.com')
with check ((auth.jwt() ->> 'email') = 'admin@saeedsonsfalconry.com');

