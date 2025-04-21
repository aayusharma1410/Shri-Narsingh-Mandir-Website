
import { supabase } from '@/lib/supabase';

export const saveUserToDatabase = async (userId: string, email: string, username: string, language: string) => {
  try {
    console.log("Attempting to save user to database:", { userId, email, username });
    
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
            created_at: new Date().toISOString(),
            last_sign_in: new Date().toISOString()
          }
        ]);
        
      console.log("Insert result:", { insertError });
      if (insertError) {
        console.error('Error inserting user to database:', insertError);
        
        // If the table doesn't exist, try to create it
        if (insertError.code === '42P01') {
          console.log('Attempting to create user_details table...');
          const createTableSQL = `
            CREATE TABLE IF NOT EXISTS user_details (
              id SERIAL PRIMARY KEY,
              user_id UUID NOT NULL UNIQUE,
              email TEXT NOT NULL,
              username TEXT NOT NULL,
              language_preference TEXT NOT NULL DEFAULT 'en',
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              last_sign_in TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
          `;
          
          const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
          if (createError) {
            console.error('Error creating user_details table:', createError);
          } else {
            // Try to insert user again
            const { error: retryError } = await supabase
              .from('user_details')
              .insert([{ 
                user_id: userId, 
                email,
                username,
                language_preference: language,
                created_at: new Date().toISOString(),
                last_sign_in: new Date().toISOString()
              }]);
              
            console.log("Retry insert result:", { retryError });
            if (retryError) throw retryError;
          }
        }
      }
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
