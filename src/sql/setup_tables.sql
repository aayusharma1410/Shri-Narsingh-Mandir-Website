
-- This file contains SQL code for setting up all necessary tables and functions
-- To use this file, copy its contents and paste into the SQL Editor of your Supabase project

-- Create the user_details table
CREATE OR REPLACE FUNCTION create_user_details_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.user_details (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    language_preference TEXT DEFAULT 'en',
    is_admin BOOLEAN DEFAULT false,
    last_sign_in TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (user_id)
  );
  
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'Error creating user_details table: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies for user_details
CREATE OR REPLACE FUNCTION setup_user_details_policies()
RETURNS void AS $$
BEGIN
  -- Enable RLS on the table
  ALTER TABLE public.user_details ENABLE ROW LEVEL SECURITY;

  -- Create policies
  CREATE POLICY "Allow users to view their own data"
    ON public.user_details FOR SELECT
    USING (auth.uid() = user_id);

  CREATE POLICY "Allow users to update their own data"
    ON public.user_details FOR UPDATE
    USING (auth.uid() = user_id);
    
  CREATE POLICY "Admin users can view all data"
    ON public.user_details FOR SELECT
    USING (EXISTS (
      SELECT 1 FROM public.user_details
      WHERE user_id = auth.uid() AND is_admin = true
    ));
    
  CREATE POLICY "Admin users can update all data"
    ON public.user_details FOR UPDATE
    USING (EXISTS (
      SELECT 1 FROM public.user_details
      WHERE user_id = auth.uid() AND is_admin = true
    ));
    
  CREATE POLICY "Allow insertion during auth hook"
    ON public.user_details FOR INSERT
    WITH CHECK (true);
    
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'Error setting up user_details policies: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the gallery_images table
CREATE OR REPLACE FUNCTION create_gallery_images_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.gallery_images (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
  );
  
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'Error creating gallery_images table: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies for gallery_images
CREATE OR REPLACE FUNCTION setup_gallery_images_policies()
RETURNS void AS $$
BEGIN
  -- Enable RLS on the table
  ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

  -- Create policies
  CREATE POLICY "Gallery images are viewable by everyone"
    ON public.gallery_images FOR SELECT
    USING (true);

  CREATE POLICY "Only admins can insert gallery images"
    ON public.gallery_images FOR INSERT
    WITH CHECK (EXISTS (
      SELECT 1 FROM public.user_details
      WHERE user_id = auth.uid() AND is_admin = true
    ));
    
  CREATE POLICY "Only admins can update gallery images"
    ON public.gallery_images FOR UPDATE
    USING (EXISTS (
      SELECT 1 FROM public.user_details
      WHERE user_id = auth.uid() AND is_admin = true
    ));
    
  CREATE POLICY "Only admins can delete gallery images"
    ON public.gallery_images FOR DELETE
    USING (EXISTS (
      SELECT 1 FROM public.user_details
      WHERE user_id = auth.uid() AND is_admin = true
    ));
    
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'Error setting up gallery_images policies: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the darshan_images table
CREATE OR REPLACE FUNCTION create_darshan_images_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.darshan_images (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    title_hi TEXT,
    image_url TEXT NOT NULL,
    time TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
  );
  
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'Error creating darshan_images table: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies for darshan_images
CREATE OR REPLACE FUNCTION setup_darshan_images_policies()
RETURNS void AS $$
BEGIN
  -- Enable RLS on the table
  ALTER TABLE public.darshan_images ENABLE ROW LEVEL SECURITY;

  -- Create policies
  CREATE POLICY "Darshan images are viewable by everyone"
    ON public.darshan_images FOR SELECT
    USING (true);

  CREATE POLICY "Only admins can insert darshan images"
    ON public.darshan_images FOR INSERT
    WITH CHECK (EXISTS (
      SELECT 1 FROM public.user_details
      WHERE user_id = auth.uid() AND is_admin = true
    ));
    
  CREATE POLICY "Only admins can update darshan images"
    ON public.darshan_images FOR UPDATE
    USING (EXISTS (
      SELECT 1 FROM public.user_details
      WHERE user_id = auth.uid() AND is_admin = true
    ));
    
  CREATE POLICY "Only admins can delete darshan images"
    ON public.darshan_images FOR DELETE
    USING (EXISTS (
      SELECT 1 FROM public.user_details
      WHERE user_id = auth.uid() AND is_admin = true
    ));
    
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'Error setting up darshan_images policies: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the notices table
CREATE OR REPLACE FUNCTION create_notices_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.notices (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    title_hi TEXT,
    content TEXT NOT NULL,
    content_hi TEXT,
    is_important BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
  );
  
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'Error creating notices table: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies for notices
CREATE OR REPLACE FUNCTION setup_notices_policies()
RETURNS void AS $$
BEGIN
  -- Enable RLS on the table
  ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

  -- Create policies
  CREATE POLICY "Notices are viewable by everyone"
    ON public.notices FOR SELECT
    USING (true);

  CREATE POLICY "Only admins can insert notices"
    ON public.notices FOR INSERT
    WITH CHECK (EXISTS (
      SELECT 1 FROM public.user_details
      WHERE user_id = auth.uid() AND is_admin = true
    ));
    
  CREATE POLICY "Only admins can update notices"
    ON public.notices FOR UPDATE
    USING (EXISTS (
      SELECT 1 FROM public.user_details
      WHERE user_id = auth.uid() AND is_admin = true
    ));
    
  CREATE POLICY "Only admins can delete notices"
    ON public.notices FOR DELETE
    USING (EXISTS (
      SELECT 1 FROM public.user_details
      WHERE user_id = auth.uid() AND is_admin = true
    ));
    
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'Error setting up notices policies: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_user_admin(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    is_admin BOOLEAN;
BEGIN
    SELECT ud.is_admin INTO is_admin
    FROM public.user_details ud
    WHERE ud.user_id = $1;
    
    RETURN COALESCE(is_admin, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to make a user an admin
CREATE OR REPLACE FUNCTION make_user_admin(user_id UUID)
RETURNS void AS $$
BEGIN
    INSERT INTO public.user_details (user_id, username, email, is_admin)
    SELECT 
        $1, 
        COALESCE((SELECT raw_user_meta_data->>'username' FROM auth.users WHERE id = $1), 'admin'),
        COALESCE((SELECT email FROM auth.users WHERE id = $1), 'admin@example.com'),
        true
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        is_admin = true,
        updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create storage buckets if they don't exist
CREATE OR REPLACE FUNCTION create_storage_buckets()
RETURNS void AS $$
BEGIN
    -- This function would need to be run with appropriate permissions
    -- For now, create these buckets manually in the Supabase dashboard
    RAISE NOTICE 'Please create the following storage buckets manually in the Supabase dashboard:';
    RAISE NOTICE '1. gallery-images';
    RAISE NOTICE '2. darshan-images';
END;
$$ LANGUAGE plpgsql;

-- Run this function to check/setup everything
SELECT create_storage_buckets();
