
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { ensureDatabaseSetup } from '@/lib/supabase-helpers';
import { useAuthOperations } from '@/hooks/useAuthOperations';

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
  const { signIn, signUp, signOut } = useAuthOperations();

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await ensureDatabaseSetup();
      } catch (error) {
        console.error('Failed to set up database:', error);
      }
    };
    
    setupDatabase();
  }, []);

  useEffect(() => {
    // Only listen to auth changes without automatic login
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Initial check for session without auto-login
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Explicitly set session and user to null to prevent default login
      setSession(null);
      setUser(null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
