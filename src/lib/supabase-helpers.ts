
import { supabase } from './supabase';

/**
 * Creates the necessary database tables if they don't already exist
 */
export async function ensureDatabaseSetup() {
  try {
    // First, try to use the RPC function if it exists
    try {
      await supabase.rpc('create_user_details_table_if_not_exists');
    } catch (error) {
      console.log('RPC function not available, will try direct SQL');
    }
    
    try {
      await supabase.rpc('create_donors_table_if_not_exists');
    } catch (error) {
      console.log('RPC function not available, will try direct SQL');
    }
    
    // Fallback - Create user_details table if doesn't exist
    const { error: userDetailsError } = await supabase
      .from('_sql')
      .select(`
        CREATE TABLE IF NOT EXISTS user_details (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES auth.users(id) UNIQUE,
          email TEXT NOT NULL,
          username TEXT,
          language_preference TEXT DEFAULT 'en',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          last_sign_in TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
    
    if (userDetailsError) {
      console.error('Error creating user_details table:', userDetailsError);
    }
    
    // Create donors table if it doesn't exist
    const { error: donorsError } = await supabase
      .from('_sql')
      .select(`
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
      `);
    
    if (donorsError) {
      console.error('Error creating donors table:', donorsError);
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
    const { error } = await supabase
      .from('user_details')
      .update({ language_preference: language })
      .eq('user_id', userId);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating language preference:', error);
    return false;
  }
}
