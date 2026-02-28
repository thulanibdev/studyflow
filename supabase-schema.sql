-- ─────────────────────────────────────────────────────
-- StudyFlow Database Schema
-- Run this in your Supabase SQL Editor
-- ─────────────────────────────────────────────────────

-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  university text,
  year_of_study int,
  subjects text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Goals
create table public.goals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  deadline text not null,
  done boolean default false,
  created_at timestamptz default now()
);

-- Study sessions
create table public.study_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  subject text not null,
  duration_mins int not null,
  quality int check (quality between 1 and 5),
  notes text,
  studied_at timestamptz default now()
);

-- Flashcard decks
create table public.flashcard_decks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text,
  ai_generated boolean default false,
  created_at timestamptz default now()
);

-- Flashcards
create table public.flashcards (
  id uuid default gen_random_uuid() primary key,
  deck_id uuid references public.flashcard_decks(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  front text not null,
  back text not null,
  created_at timestamptz default now()
);

-- Tasks
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  subject text,
  due_date date,
  priority text check (priority in ('low','medium','high')) default 'medium',
  status text check (status in ('todo','inprogress','done')) default 'todo',
  created_at timestamptz default now()
);

-- AI Chat history
create table public.ai_chats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text,
  messages jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Row Level Security ──────────────────────────────

alter table public.profiles enable row level security;
alter table public.goals enable row level security;
alter table public.study_sessions enable row level security;
alter table public.flashcard_decks enable row level security;
alter table public.flashcards enable row level security;
alter table public.tasks enable row level security;
alter table public.ai_chats enable row level security;

-- Profiles
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Goals
create policy "Users manage own goals" on public.goals for all using (auth.uid() = user_id);

-- Study sessions
create policy "Users manage own sessions" on public.study_sessions for all using (auth.uid() = user_id);

-- Flashcard decks
create policy "Users manage own decks" on public.flashcard_decks for all using (auth.uid() = user_id);

-- Flashcards
create policy "Users manage own flashcards" on public.flashcards for all using (auth.uid() = user_id);

-- Tasks
create policy "Users manage own tasks" on public.tasks for all using (auth.uid() = user_id);

-- AI Chats
create policy "Users manage own chats" on public.ai_chats for all using (auth.uid() = user_id);

-- ── Auto-create profile on signup ──────────────────

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
