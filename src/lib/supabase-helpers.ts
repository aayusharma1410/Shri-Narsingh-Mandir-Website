
import { supabase } from './supabase';

/**
 * Creates the necessary database tables if they don't already exist
 */
export async function ensureDatabaseSetup() {
  try {
    console.log('Setting up database tables...');
    
    // Instead of trying to create tables via the API, 
    // we'll recommend using the SQL Editor in Supabase dashboard
    console.log('For reliable database setup, please run the setup_tables.sql script in the Supabase SQL Editor.');
    
    // Check if tables exist
    const { data: userDetailsCheck, error: userDetailsError } = await supabase
      .from('user_details')
      .select('id')
      .limit(1);
    
    if (userDetailsError) {
      console.error('Error checking user_details table. Table might not exist:', userDetailsError);
      console.log('Please run the setup_tables.sql script in the Supabase SQL Editor.');
    } else {
      console.log('User details table exists');
    }
    
    const { data: donorsCheck, error: donorsError } = await supabase
      .from('donors')
      .select('id')
      .limit(1);
    
    if (donorsError) {
      console.error('Error checking donors table. Table might not exist:', donorsError);
      console.log('Please run the setup_tables.sql script in the Supabase SQL Editor.');
    } else {
      console.log('Donors table exists');
    }
    
    console.log('Database check complete');
  } catch (error) {
    console.error('Error checking database setup:', error);
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
