
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import DarshanSlideshow from '@/components/DarshanSlideshow';
import JhankiTable from '@/components/JhankiTable';
import PraktotsavSchedule from '@/components/PraktotsavSchedule';
import PraktotsavScheduleDialog from '@/components/PraktotsavScheduleDialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const HomePage = () => {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();

  // Set default language to Hindi but respect user preference if logged in
  useEffect(() => {
    if (!user) {
      // Set default to Hindi if no user
      setLanguage('hi');
    } else {
      // If user is logged in, load language from their preferences
      loadUserPreferences();
    }
  }, [user]);

  // Load language preference from user_details if the user is logged in
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
        } else {
          // If no preference is set, default to Hindi
          setLanguage('hi');
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
        // Default to Hindi if there's an error
        setLanguage('hi');
      }
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <PraktotsavSchedule />
        <DarshanSlideshow />
        <JhankiTable />
      </main>
      <Footer />
      <PraktotsavScheduleDialog />
    </div>
  );
};

export default HomePage;
