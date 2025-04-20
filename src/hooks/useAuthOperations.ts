
import { supabase } from '@/lib/supabase';
import { saveUserToDatabase } from '@/utils/userDatabaseUtils';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export const useAuthOperations = () => {
  const { toast } = useToast();
  const { language } = useLanguage();

  const signIn = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // Ensure username is available in the UI
      if (data.user) {
        const username = data.user.user_metadata?.username || data.user.email?.split('@')[0] || 'user';
        
        // Update user_details table
        await saveUserToDatabase(data.user.id, data.user.email!, username, language);
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
        if (error.status === 429) {
          throw new Error(language === 'en' 
            ? "Too many signup attempts. Please wait a minute and try again."
            : "बहुत अधिक साइन-अप प्रयास। कृपया एक मिनट रुकें और फिर से प्रयास करें।");
        }
        throw error;
      }
      
      if (data.user) {
        await saveUserToDatabase(data.user.id, email, username, language);
      }
      
      toast({
        title: language === 'en' ? "Account Created!" : "खाता बनाया गया!",
        description: language === 'en' 
          ? "Please check your email to confirm your account." 
          : "कृपया अपने खाते की पुष्टि के लिए अपना ईमेल जांचें।",
      });
    } catch (error: any) {
      let errorMessage = error.message;
      
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

  return { signIn, signUp, signOut };
};
