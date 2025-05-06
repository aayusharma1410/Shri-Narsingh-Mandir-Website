
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

  const generateUniqueUsername = (baseUsername: string): string => {
    // Generate a unique username by adding a timestamp and random string
    const timestamp = new Date().getTime().toString().slice(-5);
    const randomString = Math.random().toString(36).substring(2, 5);
    return `${baseUsername}_${timestamp}${randomString}`;
  };

  const signUp = async (email: string, password: string, username: string, fullName: string, phoneNumber?: string, city?: string, state?: string, country?: string) => {
    console.log("Signing up with:", email);
    console.log("Additional info:", { username, fullName, phoneNumber, city, state, country });
    
    // Generate a unique username to avoid conflicts
    const uniqueUsername = generateUniqueUsername(username);
    console.log("Generated unique username:", uniqueUsername);
    
    // Ensure all fields are defined before sending to Supabase
    const userData = {
      username: uniqueUsername,
      full_name: fullName,
      phone_number: phoneNumber || '',
      city: city || '',
      state: state || '',
      country: country || '',
    };
    
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      
      if (error) throw error;
      
      // After successful sign-up, also create a record in user_profiles if needed
      const userId = data?.user?.id;
      
      if (userId) {
        console.log("Creating user profile for:", userId);
        
        try {
          // Check if a profile already exists
          const { data: existingProfile } = await supabase
            .from('user_profiles')
            .select('id')
            .eq('id', userId)
            .maybeSingle();
          
          // If no profile exists, create one
          if (!existingProfile) {
            console.log("No existing profile found, creating new profile");
            
            // Explicitly include all fields in the profile record
            const profileData = {
              id: userId,
              username: uniqueUsername,
              full_name: fullName,
              phone_number: phoneNumber || null,  // Use null instead of empty string for optional fields
              city: city || null,
              state: state || null,
              country: country || null
            };
            
            console.log("Inserting profile data:", profileData);
            
            const { error: profileError, data: profileData } = await supabase
              .from('user_profiles')
              .insert([profileData])
              .select();
            
            if (profileError) {
              console.error("Error creating user profile:", profileError);
            } else {
              console.log("User profile created successfully:", profileData);
            }
          } else {
            console.log("Profile already exists, skipping creation");
          }
        } catch (profileError) {
          console.error("Error in profile creation process:", profileError);
          // We don't throw here as the auth signup was successful
        }
      } else {
        console.warn("No user ID available, cannot create profile");
      }
    } catch (error) {
      console.error("Error in signup process:", error);
      throw error;
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
