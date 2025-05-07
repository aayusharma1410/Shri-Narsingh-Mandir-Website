import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { saveUserToDatabase } from '@/utils/userDatabaseUtils';
import { useLanguage } from './LanguageContext';

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    username?: string;
    language?: string;
  };
}

interface AuthContextType {
  user: User | null;
  signUp: (
    email: string, 
    password: string, 
    username: string, 
    fullName: string, 
    phoneNumber: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const session = supabase.auth.getSession();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.session?.user) {
        setUser(session.session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    if (session) {
      setUser(session.data.session?.user ?? null);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    username: string, 
    fullName: string, 
    phoneNumber: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: fullName,
            phone_number: phoneNumber,
            language_preference: language,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        const userId = data.user.id;
        await saveUserToDatabase(userId, email, username, language);
      }
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
