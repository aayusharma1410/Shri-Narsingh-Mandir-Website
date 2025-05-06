
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import LiveAarti from '@/components/LiveAarti';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const LiveAartiPage = () => {
  const { language } = useLanguage();
  const [nextAartiTime, setNextAartiTime] = useState<string>("");
  const [isLiveNow, setIsLiveNow] = useState<boolean>(false);

  useEffect(() => {
    document.title = language === 'en' 
      ? "Live Aarti | Shri Narsingh Temple Hasampur" 
      : "लाइव आरती | श्री नृसिंह मंदिर हसामपुर";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.setAttribute("content", language === 'en' 
        ? "Watch live aarti from Shri Narsingh Temple Hasampur. Daily morning and evening aarti broadcast. Experience divine worship from anywhere." 
        : "श्री नृसिंह मंदिर हसामपुर से लाइव आरती देखें। दैनिक सुबह और शाम की आरती का प्रसारण। कहीं से भी दिव्य पूजा का अनुभव करें।");
      document.head.appendChild(meta);
    } else {
      metaDescription.setAttribute("content", language === 'en' 
        ? "Watch live aarti from Shri Narsingh Temple Hasampur. Daily morning and evening aarti broadcast. Experience divine worship from anywhere." 
        : "श्री नृसिंह मंदिर हसामपुर से लाइव आरती देखें। दैनिक सुबह और शाम की आरती का प्रसारण। कहीं से भी दिव्य पूजा का अनुभव करें।");
    }
    
    // Calculate next aarti time based on current time
    const calculateNextAarti = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentMonth = now.getMonth();
      
      // Summer schedule (April to October) - months 3-9
      const isSummer = currentMonth >= 3 && currentMonth <= 9;
      
      // Check if we're within the aarti time window (15 minute window)
      const checkIfLiveNow = () => {
        if (isSummer) {
          // Morning aarti at 5:15 AM
          if (currentHour === 5 && currentMinute >= 0 && currentMinute <= 30) {
            return true;
          }
          // Evening aarti at 7:15 PM
          if (currentHour === 19 && currentMinute >= 0 && currentMinute <= 30) {
            return true;
          }
        } else {
          // Morning aarti at 5:30 AM
          if (currentHour === 5 && currentMinute >= 15 && currentMinute <= 45) {
            return true;
          }
          // Evening aarti at 6:15 PM
          if (currentHour === 18 && currentMinute >= 0 && currentMinute <= 30) {
            return true;
          }
        }
        return false;
      };
      
      setIsLiveNow(checkIfLiveNow());
      
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
    <div className="min-h-screen bg-gradient-to-b from-temple-cream via-amber-50/70 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-temple-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-temple-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-temple-maroon/3 rounded-full blur-2xl"></div>
      
      <Navbar />
      <div className="pt-24 pb-12 relative z-10">
        <div className="container mx-auto px-4 text-center mb-6">
          <div className="inline-block p-1 bg-gradient-to-r from-temple-gold/30 via-temple-gold to-temple-gold/30 rounded-lg mb-3">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-temple-maroon mb-0 px-6 py-2 bg-white/80 rounded-md backdrop-blur-sm">
              {language === 'en' ? "Live Aarti Darshan" : "लाइव आरती दर्शन"}
            </h1>
          </div>
          <div className="w-32 h-0.5 bg-gradient-to-r from-temple-gold/30 via-temple-gold to-temple-gold/30 mx-auto mb-4"></div>
          {isLiveNow ? (
            <p className="text-lg font-medium bg-gradient-to-r from-temple-gold/20 via-temple-gold/30 to-temple-gold/20 inline-block px-6 py-2 rounded-full animate-pulse shadow-md">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse shadow-lg shadow-red-500/30"></span>
              {language === 'en' ? "Live Now" : "अभी लाइव"}
            </p>
          ) : (
            <p className="text-lg font-medium text-temple-maroon bg-temple-cream/50 px-6 py-2 rounded-full inline-block shadow-sm">
              {language === 'en' ? "Next Aarti: " : "अगली आरती: "} 
              <span className="font-bold text-temple-gold">{nextAartiTime}</span>
            </p>
          )}
        </div>
        <LiveAarti />
      </div>
      <Footer />
    </div>
  );
};

export default LiveAartiPage;
