
import { supabase } from './supabase';

/**
 * Creates the necessary database tables if they don't already exist
 */
export async function ensureDatabaseSetup() {
  try {
    console.log('Setting up database tables...');
    
    // Create user_details table if it doesn't exist
    try {
      const { error } = await supabase.from('_sql').select(`
        CREATE TABLE IF NOT EXISTS user_details (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT NOT NULL,
          username TEXT,
          language_preference TEXT DEFAULT 'en',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          last_sign_in TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(user_id)
        );
      `).single();
      
      if (error) {
        console.error('Error creating user_details table:', error);
      } else {
        console.log('User details table setup completed');
      }
    } catch (error) {
      console.error('Exception when creating user_details table:', error);
    }
    
    // Create donors table if it doesn't exist
    try {
      const { error } = await supabase.from('_sql').select(`
        CREATE TABLE IF NOT EXISTS donors (
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
      `).single();
      
      if (error) {
        console.error('Error creating donors table:', error);
      } else {
        console.log('Donors table setup completed');
      }
    } catch (error) {
      console.error('Exception when creating donors table:', error);
    }
    
    // Set up row level security
    try {
      const { error: rlsError } = await supabase.from('_sql').select(`
        -- Enable RLS on user_details
        ALTER TABLE IF EXISTS user_details ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for users to read their own data
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE tablename = 'user_details' AND policyname = 'Users can read their own data'
          ) THEN
            CREATE POLICY "Users can read their own data" 
            ON user_details 
            FOR SELECT 
            USING (auth.uid() = user_id);
          END IF;
        END
        $$;
        
        -- Create policy for users to insert their own data
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE tablename = 'user_details' AND policyname = 'Users can insert their own data'
          ) THEN
            CREATE POLICY "Users can insert their own data" 
            ON user_details 
            FOR INSERT 
            WITH CHECK (auth.uid() = user_id);
          END IF;
        END
        $$;
        
        -- Create policy for users to update their own data
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE tablename = 'user_details' AND policyname = 'Users can update their own data'
          ) THEN
            CREATE POLICY "Users can update their own data" 
            ON user_details 
            FOR UPDATE 
            USING (auth.uid() = user_id);
          END IF;
        END
        $$;
      `).single();
      
      if (rlsError) {
        console.error('Error setting up RLS policies:', rlsError);
      } else {
        console.log('Row level security policies created');
      }
    } catch (error) {
      console.error('Exception when setting up RLS policies:', error);
    }
    
    console.log('Database setup complete');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

/**
 * Updates the language preference for a user
 */
export async function updateUserLanguagePreference(userId: string, language: 'en' | 'hi') {
  try {
    // First check if user exists in user_details
    const { data: existingUser } = await supabase
      .from('user_details')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (!existingUser) {
      // If user doesn't exist, get their info and create entry
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        const email = userData.user.email || '';
        const username = userData.user.user_metadata?.username || email.split('@')[0] || 'user';
        
        await supabase
          .from('user_details')
          .insert([
            { 
              user_id: userId, 
              email,
              username,
              language_preference: language
            }
          ]);
      }
    } else {
      // Update existing user's language preference
      await supabase
        .from('user_details')
        .update({ language_preference: language })
        .eq('user_id', userId);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating language preference:', error);
    return false;
  }
}
