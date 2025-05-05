
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, fullName: string, phoneNumber?: string, city?: string, state?: string, country?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Got session:", currentSession ? "exists" : "none");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("Signing in with:", email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, username: string, fullName: string, phoneNumber?: string, city?: string, state?: string, country?: string) => {
    console.log("Signing up with:", email);
    console.log("Additional info:", { username, fullName, phoneNumber, city, state, country });
    
    // Ensure all fields are defined before sending to Supabase
    const userData = {
      username,
      full_name: fullName,
      phone_number: phoneNumber || '',
      city: city || '',
      state: state || '',
      country: country || '',
    };
    
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    
    if (error) throw error;
    
    // After successful sign-up, also create a record in user_profiles if needed
    try {
      // Check if we have a user ID from the signup response
      const userId = data?.user?.id;
      
      if (userId) {
        console.log("Creating user profile for:", userId);
        
        // Generate a unique username if needed by appending a random string
        const uniqueUsername = `${username}_${Math.random().toString(36).substring(2, 8)}`;
        
        // Try to create the profile directly - if it fails due to uniqueness, we'll get an error
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              id: userId,
              username: uniqueUsername, // Use the unique username
              full_name: fullName,
              phone_number: phoneNumber || '',
              city: city || '',
              state: state || '',
              country: country || '',
            }
          ]);
        
        if (profileError) {
          console.error("Error creating user profile:", profileError);
        } else {
          console.log("User profile created successfully");
        }
      } else {
        console.warn("No user ID available, cannot create profile");
      }
    } catch (profileError) {
      console.error("Error in profile creation process:", profileError);
      // We don't throw here as the auth signup was successful
    }
  };

  const signOut = async () => {
    console.log("Signing out");
    const { error } = await supabase.auth.signOut();
    console.log("Signout result:", error ? `Error: ${error.message}` : "Success");
    if (error) throw error;
    
    // Force clear the user and session state
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
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
