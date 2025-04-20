
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import LiveAarti from '@/components/LiveAarti';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const LiveAartiPage = () => {
  const { language } = useLanguage();
  const [nextAartiTime, setNextAartiTime] = useState<string>("");

  useEffect(() => {
    document.title = "Live Aarti | Shri Narsingh Temple";
    
    // Calculate next aarti time based on current time
    const calculateNextAarti = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMonth = now.getMonth();
      
      // Summer schedule (April to October) - months 3-9
      const isSummer = currentMonth >= 3 && currentMonth <= 9;
      
      // Summer schedule
      if (isSummer) {
        if (currentHour < 5) {
          return language === 'en' ? "Mangla Aarti at 5:15 AM" : "मंगला आरती सुबह 5:15 बजे";
        } else if (currentHour < 19) {
          return language === 'en' ? "Sandhya Aarti at 7:15 PM" : "संध्या आरती शाम 7:15 बजे";
        } else {
          return language === 'en' ? "Mangla Aarti at 5:15 AM tomorrow" : "मंगला आरती कल सुबह 5:15 बजे";
        }
      } 
      // Winter schedule
      else {
        if (currentHour < 5) {
          return language === 'en' ? "Mangla Aarti at 5:30 AM" : "मंगला आरती सुबह 5:30 बजे";
        } else if (currentHour < 18) {
          return language === 'en' ? "Sandhya Aarti at 6:15 PM" : "संध्या आरती शाम 6:15 बजे";
        } else {
          return language === 'en' ? "Mangla Aarti at 5:30 AM tomorrow" : "मंगला आरती कल सुबह 5:30 बजे";
        }
      }
    };
    
    setNextAartiTime(calculateNextAarti());
    
    // Update time every minute
    const interval = setInterval(() => {
      setNextAartiTime(calculateNextAarti());
    }, 60000);
    
    return () => clearInterval(interval);
  }, [language]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 text-center mb-6">
          <p className="text-lg font-medium text-temple-gold">
            {language === 'en' ? "Next Aarti: " : "अगली आरती: "} 
            <span className="font-bold">{nextAartiTime}</span>
          </p>
        </div>
        <LiveAarti />
      </div>
      <Footer />
    </div>
  );
};

export default LiveAartiPage;
