
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
    
    // Insert the user into the user_profiles table with phone_number
    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        id: userId,
        username: username,
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
