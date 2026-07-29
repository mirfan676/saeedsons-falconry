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

alter table public.orders enable row level security;

drop policy if exists "Public can create order requests" on public.orders;
create policy "Public can create order requests"
on public.orders for insert
to anon, authenticated
with check (true);
