
-- Create storage bucket for gallery images
-- Run this in the Supabase SQL editor or set up in the Storage section of Supabase dashboard
CREATE BUCKET IF NOT EXISTS "gallery_images" WITH (
  public = false
);

-- Enable row level security
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy for gallery_images bucket
CREATE POLICY "Public Access for Gallery Images" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'gallery_images');

-- Allow authenticated users to upload to the gallery_images bucket
CREATE POLICY "Allow Authenticated Users to Upload" 
  ON storage.objects FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'gallery_images');

-- Allow administrators to update and delete images
CREATE POLICY "Allow Admin to Update and Delete" 
  ON storage.objects FOR DELETE 
  TO authenticated 
  USING (
    bucket_id = 'gallery_images' AND 
    (SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@temple.com'
  );

-- Create gallery table if not exists
CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_hi VARCHAR(255),
  image_url TEXT NOT NULL,
  alt TEXT,
  category VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on gallery_images table
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policy for gallery_images table
CREATE POLICY "Public Access for Gallery Images Table" 
  ON gallery_images FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow Authenticated Users to Insert Gallery Images" 
  ON gallery_images FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Allow administrators to update and delete
CREATE POLICY "Allow Admin to Update and Delete Gallery Images" 
  ON gallery_images FOR UPDATE 
  TO authenticated 
  USING ((SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@temple.com');

CREATE POLICY "Allow Admin to Delete Gallery Images" 
  ON gallery_images FOR DELETE 
  TO authenticated 
  USING ((SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@temple.com');

-- Create darshan_images table if not exists
CREATE TABLE IF NOT EXISTS darshan_images (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_hi VARCHAR(255),
  image_url TEXT NOT NULL,
  time VARCHAR(50), -- e.g., "05:00 AM"
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on darshan_images table
ALTER TABLE darshan_images ENABLE ROW LEVEL SECURITY;

-- Create policy for darshan_images table
CREATE POLICY "Public Access for Darshan Images" 
  ON darshan_images FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- Allow administrators to insert, update and delete
CREATE POLICY "Allow Admin to Insert Darshan Images" 
  ON darshan_images FOR INSERT 
  TO authenticated 
  WITH CHECK ((SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@temple.com');

CREATE POLICY "Allow Admin to Update Darshan Images" 
  ON darshan_images FOR UPDATE 
  TO authenticated 
  USING ((SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@temple.com');

CREATE POLICY "Allow Admin to Delete Darshan Images" 
  ON darshan_images FOR DELETE 
  TO authenticated 
  USING ((SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@temple.com');

-- Create notices table if not exists
CREATE TABLE IF NOT EXISTS notices (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_hi VARCHAR(255),
  content TEXT NOT NULL,
  content_hi TEXT,
  is_important BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on notices table
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- Create policy for notices table
CREATE POLICY "Public Access for Notices" 
  ON notices FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- Allow administrators to insert, update and delete
CREATE POLICY "Allow Admin to Insert Notices" 
  ON notices FOR INSERT 
  TO authenticated 
  WITH CHECK ((SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@temple.com');

CREATE POLICY "Allow Admin to Update Notices" 
  ON notices FOR UPDATE 
  TO authenticated 
  USING ((SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@temple.com');

CREATE POLICY "Allow Admin to Delete Notices" 
  ON notices FOR DELETE 
  TO authenticated 
  USING ((SELECT email FROM auth.users WHERE id = auth.uid()) = 'admin@temple.com');
