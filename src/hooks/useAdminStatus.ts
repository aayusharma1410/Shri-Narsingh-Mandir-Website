
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useAdminStatus = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      setLoading(true);
      
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          return;
        }
        
        setIsAdmin(data?.is_admin || false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [user]);

  return { isAdmin, loading };
};
