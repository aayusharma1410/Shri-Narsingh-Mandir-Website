
-- This is a function that will be added in Supabase SQL editor to create the user_details table if it doesn't exist
CREATE OR REPLACE FUNCTION create_user_details_table_if_not_exists()
RETURNS void AS $$
BEGIN
    -- Check if the table exists
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_details') THEN
        -- Create the table if it doesn't exist
        CREATE TABLE public.user_details (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            email TEXT NOT NULL,
            username TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
            last_sign_in TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
            UNIQUE(user_id)
        );

        -- Set up RLS (Row Level Security)
        ALTER TABLE public.user_details ENABLE ROW LEVEL SECURITY;

        -- Create policy for users to read their own data
        CREATE POLICY "Users can read their own data" 
            ON public.user_details 
            FOR SELECT 
            USING (auth.uid() = user_id);

        -- Create policy for users to insert their own data
        CREATE POLICY "Users can insert their own data" 
            ON public.user_details 
            FOR INSERT 
            WITH CHECK (auth.uid() = user_id);

        -- Create policy for users to update their own data
        CREATE POLICY "Users can update their own data" 
            ON public.user_details 
            FOR UPDATE 
            USING (auth.uid() = user_id);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Call the function to ensure the table exists
SELECT create_user_details_table_if_not_exists();
