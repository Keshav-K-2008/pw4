-- =========================================================================
-- StadiumMind AI — Initial Database Schema (FIFA World Cup 2026)
-- =========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Define Enums
create type user_role as enum ('fan', 'volunteer', 'security', 'medical', 'operations', 'admin');
create type incident_severity as enum ('low', 'medium', 'high', 'critical');
create type incident_status as enum ('open', 'in_progress', 'resolved');
create type volunteer_status as enum ('available', 'on_task', 'break', 'off_duty');

-- 1. Profiles Table (Linked to Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null unique,
  full_name text,
  role user_role not null default 'fan',
  language text not null default 'en',
  accessibility_needs text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Profiles
alter table public.profiles enable row level security;

-- 2. Stadiums Table
create table public.stadiums (
  id text primary key,
  name text not null,
  location_name text not null,
  location_lat double precision not null,
  location_lng double precision not null,
  capacity integer not null,
  zones text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.stadiums enable row level security;

-- 3. Matches Table
create table public.matches (
  id text primary key,
  stadium_id text references public.stadiums(id) on delete cascade,
  home_team text not null,
  away_team text not null,
  status text not null, -- 'scheduled', 'live', 'completed'
  home_score integer default 0,
  away_score integer default 0,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.matches enable row level security;

-- 4. Incidents Table
create table public.incidents (
  id text primary key default uuid_generate_v4()::text,
  stadium_id text references public.stadiums(id) on delete cascade,
  match_id text references public.matches(id) on delete set null,
  type text not null, -- 'medical_emergency', 'lost_child', 'fire', 'suspicious_activity', etc.
  severity incident_severity not null default 'medium',
  status incident_status not null default 'open',
  title text not null,
  description text not null,
  location_name text not null,
  location_lat double precision,
  location_lng double precision,
  reported_by text not null,
  assigned_team text,
  response_team_ids text[] default '{}',
  ai_summary text,
  ai_priority_score integer default 5,
  estimated_eta integer, -- in minutes
  resolved_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.incidents enable row level security;

-- 5. Volunteers Table
create table public.volunteers (
  id text primary key default uuid_generate_v4()::text,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  zone text not null,
  status volunteer_status not null default 'available',
  current_task text,
  performance_score integer default 100,
  shift_start timestamp with time zone not null,
  shift_end timestamp with time zone not null,
  phone text,
  skills text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.volunteers enable row level security;

-- 6. Notifications Table
create table public.notifications (
  id text primary key default uuid_generate_v4()::text,
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  type text not null, -- 'info', 'warning', 'critical', 'success'
  is_read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notifications enable row level security;

-- RLS Policies

-- Profiles Policies
create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Operations and Admins can view all profiles" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('operations', 'admin')
    )
  );

-- Stadiums Policies
create policy "Anyone can view stadiums" on public.stadiums
  for select using (true);

create policy "Admins can manage stadiums" on public.stadiums
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Matches Policies
create policy "Anyone can view matches" on public.matches
  for select using (true);

-- Incidents Policies
create policy "Ops, Security, Medical, Admin can view all incidents" on public.incidents
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('operations', 'admin', 'security', 'medical')
    )
  );

create policy "Staff can report incidents" on public.incidents
  for insert with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('operations', 'admin', 'security', 'medical', 'volunteer')
    )
  );

-- Volunteers Policies
create policy "Volunteers can view their own volunteer record" on public.volunteers
  for select using (profile_id = auth.uid());

create policy "Ops and Admins can view all volunteers" on public.volunteers
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('operations', 'admin')
    )
  );

-- Notifications Policies
create policy "Users can view their own notifications" on public.notifications
  for select using (user_id = auth.uid());

create policy "Users can update their own notifications" on public.notifications
  for update using (user_id = auth.uid());
