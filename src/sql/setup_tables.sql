
-- Enable PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_details table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    username TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_sign_in TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_details ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data"
    ON user_details
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own data"
    ON user_details
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data"
    ON user_details
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);
