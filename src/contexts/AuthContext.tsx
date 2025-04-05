import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Create table functions
  const ensureTablesExist = async () => {
    try {
      // Ensure user_details table exists
      try {
        await supabase.rpc('create_user_details_table_if_not_exists');
      } catch (error) {
        console.error('Error creating user_details table:', error);
        // Continue as table might already exist
      }
      
      // Create donors table if it doesn't exist
      try {
        await supabase.rpc('create_donors_table_if_not_exists');
      } catch (error) {
        console.error('Error creating donors table:', error);
      }
      
      // If RPC fails, try using _sql approach
      const { error: donorsTableError } = await supabase
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
      
      if (donorsTableError) {
        console.log("Error creating donors table manually:", donorsTableError);
      }
    } catch (error) {
      console.error('Error ensuring tables exist:', error);
    }
  };

  // Ensure tables exist on component load
  useEffect(() => {
    ensureTablesExist();
  }, []);

  /**
   * Saves or updates user details in the 'user_details' table in Supabase.
   */
  const saveUserToDatabase = async (userId: string, email: string, username: string) => {
    try {
      console.log("Saving user to database:", { userId, email, username });
      
      // Ensure user_details table exists
      await ensureTablesExist();
      
      // Check if user already exists in the user_details table
      const { data: existingUser, error: fetchError } = await supabase
        .from('user_details')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      console.log("Existing user check result:", { existingUser, fetchError });

      if (!existingUser) {
        // User doesn't exist, insert new record
        const { data: insertData, error: insertError } = await supabase
          .from('user_details')
          .insert([
            { 
              user_id: userId, 
              email,
              username,
              language_preference: language, // Store current language preference
              created_at: new Date().toISOString(),
              last_sign_in: new Date().toISOString()
            }
          ]);
          
        console.log("Insert result:", { insertData, insertError });
        if (insertError) throw insertError;
      } else {
        // User exists, update last_sign_in and username if needed
        const { data: updateData, error: updateError } = await supabase
          .from('user_details')
          .update({ 
            last_sign_in: new Date().toISOString(),
            username: username, // Update username in case it changed
            language_preference: language // Update language preference
          })
          .eq('user_id', userId);
          
        console.log("Update result:", { updateData, updateError });
        if (updateError) throw updateError;
      }
    } catch (error) {
      console.error('Error saving user to database:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // Ensure username is available in the UI
      if (data.user) {
        const username = data.user.user_metadata?.username || data.user.email?.split('@')[0] || 'user';
        
        // Update user_details table
        await saveUserToDatabase(data.user.id, data.user.email!, username);
      }
      
      toast({
        title: language === 'en' ? "Successful Login!" : "सफल प्रवेश!",
        description: language === 'en' ? "You have successfully logged in." : "आपने सफलतापूर्वक प्रवेश किया है।",
      });
    } catch (error: any) {
      toast({
        title: language === 'en' ? "Login Error" : "प्रवेश में त्रुटि",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { username }
        }
      });
      
      if (error) {
        // Handle rate limit errors specifically
        if (error.status === 429) {
          throw new Error(language === 'en' 
            ? "Too many signup attempts. Please wait a minute and try again."
            : "बहुत अधिक साइन-अप प्रयास। कृपया एक मिनट रुकें और फिर से प्रयास करें।");
        }
        throw error;
      }
      
      if (data.user) {
        // Save user to our custom database table
        await saveUserToDatabase(data.user.id, email, username);
      }
      
      toast({
        title: language === 'en' ? "Account Created!" : "खाता बनाया गया!",
        description: language === 'en' 
          ? "Please check your email to confirm your account." 
          : "कृपया अपने खाते की पुष्टि के लिए अपना ईमेल जांचें।",
      });
    } catch (error: any) {
      let errorMessage = error.message;
      
      // Handle rate limit errors with user-friendly message
      if (error.code === "over_email_send_rate_limit" || error.status === 429) {
        errorMessage = language === 'en' 
          ? "Too many signup attempts. Please wait a minute and try again."
          : "बहुत अधिक साइन-अप प्रयास। कृपया एक मिनट रुकें और फिर से प्रयास करें।";
      }
      
      toast({
        title: language === 'en' ? "Account Creation Error" : "खाता बनाने में त्रुटि",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: language === 'en' ? "Sign Out" : "साइन आउट",
        description: language === 'en' 
          ? "You have successfully signed out." 
          : "आप सफलतापूर्वक साइन आउट हो गए हैं।",
      });
    } catch (error: any) {
      toast({
        title: language === 'en' ? "Sign Out Error" : "साइन आउट में त्रुटि",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
