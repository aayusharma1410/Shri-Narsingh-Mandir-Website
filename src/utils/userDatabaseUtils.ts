
import { supabase } from '@/lib/supabase';

export const saveUserToDatabase = async (userId: string, email: string, username: string, language: string) => {
  try {
    console.log("Saving user to database:", { userId, email, username });
    
    // Check if user already exists in the user_details table
    const { data: existingUser, error: fetchError } = await supabase
      .from('user_details')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    console.log("Existing user check result:", { existingUser, fetchError });

    if (!existingUser) {
      // User doesn't exist, insert new record
      const { error: insertError } = await supabase
        .from('user_details')
        .insert([
          { 
            user_id: userId, 
            email,
            username,
            language_preference: language,
          }
        ]);
        
      console.log("Insert result:", { insertError });
      if (insertError) throw insertError;
    } else {
      // User exists, update last_sign_in and username if needed
      const { error: updateError } = await supabase
        .from('user_details')
        .update({ 
          last_sign_in: new Date().toISOString(),
          username: username,
        })
        .eq('user_id', userId);
        
      console.log("Update result:", { updateError });
      if (updateError) throw updateError;
    }
  } catch (error) {
    console.error('Error saving user to database:', error);
  }
};
