
// User database utilities

import { supabase } from '@/integrations/supabase/client';

export const saveUserToDatabase = async (
  userId: string, 
  email: string, 
  username: string, 
  language: string,
  phoneNumber?: string,
  fullName?: string
) => {
  try {
    console.log("Saving user to database:", { 
      userId, 
      email, 
      username, 
      language,
      phoneNumber, 
      fullName 
    });
    
    // Generate a unique username by appending random digits if needed
    const uniqueUsername = await ensureUniqueUsername(username);
    
    // Insert the user into the user_profiles table with phone_number
    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        id: userId,
        username: uniqueUsername,
        full_name: fullName,
        language_preference: language,
        phone_number: phoneNumber,
      });
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error saving user to database:', error);
    return false;
  }
};

// Helper function to ensure unique username
const ensureUniqueUsername = async (baseUsername: string): Promise<string> => {
  let username = baseUsername;
  let isUnique = false;
  let attempts = 0;
  
  while (!isUnique && attempts < 5) {
    // Check if the username exists
    const { data, error } = await supabase
      .from('user_profiles')
      .select('username')
      .eq('username', username)
      .single();
    
    if (error && error.code === 'PGRST116') {
      // Error code PGRST116 means no rows returned, so username is unique
      isUnique = true;
    } else if (!error && data) {
      // Username exists, append random digits
      username = `${baseUsername}${Math.floor(Math.random() * 1000)}`;
      attempts++;
    } else if (error) {
      // For any other error, just try with a random suffix
      username = `${baseUsername}${Math.floor(Math.random() * 1000)}`;
      attempts++;
    } else {
      // If no error and no data (shouldn't happen), consider it unique
      isUnique = true;
    }
  }
  
  return username;
};
