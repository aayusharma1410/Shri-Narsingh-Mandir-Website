
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

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

  /**
   * Saves or updates user details in the 'user_details' table in Supabase.
   * This table stores additional information about users beyond what's in the auth.users table.
   * 
   * Table Schema:
   * - user_id: The user's UUID from auth.users (primary key, foreign key)
   * - email: The user's email address
   * - username: The user's chosen display name
   * - created_at: When the user's record was first created
   * - last_sign_in: The timestamp of the user's most recent sign in
   * 
   * This function is called after authentication events (sign-up and sign-in).
   */
  const saveUserToDatabase = async (userId: string, email: string, username: string) => {
    try {
      // First check if user already exists in the user_details table
      const { data: existingUser } = await supabase
        .from('user_details')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!existingUser) {
        // User doesn't exist, insert new record
        const { error } = await supabase
          .from('user_details')
          .insert([
            { 
              user_id: userId, 
              email,
              username,
              created_at: new Date().toISOString(),
              last_sign_in: new Date().toISOString()
            }
          ]);
          
        if (error) throw error;
      } else {
        // User exists, update last_sign_in
        const { error } = await supabase
          .from('user_details')
          .update({ last_sign_in: new Date().toISOString() })
          .eq('user_id', userId);
          
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error saving user to database:', error);
      // Don't throw error here to prevent blocking the auth flow
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
        title: "सफल प्रवेश!",
        description: "आपने सफलतापूर्वक प्रवेश किया है।",
      });
    } catch (error: any) {
      toast({
        title: "प्रवेश में त्रुटि",
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
          throw new Error("बहुत अधिक साइन-अप प्रयास। कृपया एक मिनट रुकें और फिर से प्रयास करें।");
        }
        throw error;
      }
      
      if (data.user) {
        // Save user to our custom database table
        await saveUserToDatabase(data.user.id, email, username);
      }
      
      toast({
        title: "खाता बनाया गया!",
        description: "कृपया अपने खाते की पुष्टि के लिए अपना ईमेल जांचें।",
      });
    } catch (error: any) {
      let errorMessage = error.message;
      
      // Handle rate limit errors with user-friendly message
      if (error.code === "over_email_send_rate_limit" || error.status === 429) {
        errorMessage = "बहुत अधिक साइन-अप प्रयास। कृपया एक मिनट रुकें और फिर से प्रयास करें।";
      }
      
      toast({
        title: "खाता बनाने में त्रुटि",
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
        title: "साइन आउट",
        description: "आप सफलतापूर्वक साइन आउट हो गए हैं।",
      });
    } catch (error: any) {
      toast({
        title: "साइन आउट में त्रुटि",
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
