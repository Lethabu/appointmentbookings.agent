-- PostgreSQL schema for multi-tenant SaaS (Supabase compatible)
-- 1. Tenants (Salons)
create table if not exists salons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subdomain text unique not null,
  owner_id uuid references auth.users(id) on delete cascade,
  plan text default 'basic',
  trial_ends_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Users (Profiles)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text default 'owner',
  salon_id uuid references salons(id),
  created_at timestamptz default now()
);

-- 3. Services
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references salons(id) on delete cascade,
  name text not null,
  duration int not null,
  price int not null,
  created_at timestamptz default now()
);

-- 4. Appointments
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references salons(id) on delete cascade,
  user_id uuid references auth.users(id),
  service_id uuid references services(id),
  start_time timestamptz not null,
  end_time timestamptz not null,
  status text default 'booked',
  created_at timestamptz default now()
);

-- 5. Orders (for e-commerce)
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references salons(id) on delete cascade,
  user_id uuid references auth.users(id),
  total int not null,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Enable RLS and add policies for tenant isolation
alter table salons enable row level security;
alter table profiles enable row level security;
alter table services enable row level security;
alter table appointments enable row level security;
alter table orders enable row level security;

-- Only allow salon owners to access their salon
create policy "Owner can access their salon" on salons
  for all using (auth.uid() = owner_id);

-- Only allow users to access their own profile
create policy "User can access own profile" on profiles
  for all using (auth.uid() = id);

-- Only allow access to services for users in the same salon
create policy "Salon users can access services" on services
  for all using (exists (select 1 from profiles p where p.id = auth.uid() and p.salon_id = salon_id));

-- Only allow access to appointments for users in the same salon
create policy "Salon users can access appointments" on appointments
  for all using (exists (select 1 from profiles p where p.id = auth.uid() and p.salon_id = salon_id));

-- Only allow access to orders for users in the same salon
create policy "Salon users can access orders" on orders
  for all using (exists (select 1 from profiles p where p.id = auth.uid() and p.salon_id = salon_id));
