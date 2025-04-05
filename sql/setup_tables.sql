
-- This file contains SQL to set up all necessary tables in Supabase
-- You can run this in the Supabase SQL editor

-- Create user_details table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  username TEXT,
  language_preference TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_sign_in TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create donors table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.donors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  name TEXT,
  amount NUMERIC NOT NULL,
  transaction_id TEXT,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  anonymous BOOLEAN DEFAULT FALSE
);

-- Enable RLS on user_details
ALTER TABLE IF EXISTS public.user_details ENABLE ROW LEVEL SECURITY;

-- Create policies for user_details table
-- Users can read their own data
CREATE POLICY IF NOT EXISTS "Users can read their own data" 
ON public.user_details 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY IF NOT EXISTS "Users can insert their own data" 
ON public.user_details 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY IF NOT EXISTS "Users can update their own data" 
ON public.user_details 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Enable RLS on donors table
ALTER TABLE IF EXISTS public.donors ENABLE ROW LEVEL SECURITY;

-- Create policies for donors table
-- Users can read all donors data (for public display)
CREATE POLICY IF NOT EXISTS "Users can read all donors data" 
ON public.donors 
FOR SELECT 
USING (true);

-- Users can insert their own donation data
CREATE POLICY IF NOT EXISTS "Users can insert their own donation data" 
ON public.donors 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR auth.uid() IS NOT NULL);

-- Only admins can update or delete donation records
-- Note: You would need to implement an admin role system to use this
-- CREATE POLICY "Only admins can update donations" 
-- ON public.donors 
-- FOR UPDATE 
-- USING (auth.uid() IN (SELECT id FROM public.admins));
