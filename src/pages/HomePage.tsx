
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import DarshanSlideshow from '@/components/DarshanSlideshow';
import PraktotsavSchedule from '@/components/PraktotsavSchedule';
import PraktotsavScheduleDialog from '@/components/PraktotsavScheduleDialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const HomePage = () => {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();

  // Load language preference from user_details if the user is logged in
  useEffect(() => {
    const loadUserPreferences = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('user_details')
            .select('language_preference')
            .eq('user_id', user.id)
            .single();

          if (error) throw error;
          
          if (data?.language_preference) {
            setLanguage(data.language_preference as 'en' | 'hi');
          }
        } catch (error) {
          console.error('Error loading language preference:', error);
        }
      }
    };

    loadUserPreferences();
  }, [user, setLanguage]);

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <PraktotsavSchedule />
        <DarshanSlideshow />
      </main>
      <Footer />
      <PraktotsavScheduleDialog />
    </div>
  );
};

export default HomePage;
