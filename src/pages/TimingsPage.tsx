
import Navbar from '@/components/Navbar';
import TimingsSection from '@/components/TimingsSection';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const TimingsPage = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    document.title = language === 'en' 
      ? "Temple Timings | Shri Narsingh Temple Hasampur" 
      : "मंदिर समय | श्री नृसिंह मंदिर हसामपुर";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.setAttribute("content", language === 'en' 
        ? "View the opening times, darshan hours and aarti schedule for Shri Narsingh Temple in Hasampur. Plan your visit with detailed timings for all seasons." 
        : "हसामपुर में श्री नृसिंह मंदिर के खुलने का समय, दर्शन समय और आरती कार्यक्रम देखें। सभी मौसमों के लिए विस्तृत समय के साथ अपनी यात्रा की योजना बनाएं।");
      document.head.appendChild(meta);
    } else {
      metaDescription.setAttribute("content", language === 'en' 
        ? "View the opening times, darshan hours and aarti schedule for Shri Narsingh Temple in Hasampur. Plan your visit with detailed timings for all seasons." 
        : "हसामपुर में श्री नृसिंह मंदिर के खुलने का समय, दर्शन समय और आरती कार्यक्रम देखें। सभी मौसमों के लिए विस्तृत समय के साथ अपनी यात्रा की योजना बनाएं।");
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-temple-cream/50 via-white to-amber-50/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-temple-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-temple-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-temple-maroon/3 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-temple-gold/5 rounded-full blur-3xl"></div>
      
      <Navbar />
      <div className="pt-24 pb-12 relative z-10">
        <div className="container mx-auto px-4 text-center mb-6">
          <div className="inline-block p-1 bg-gradient-to-r from-temple-gold/30 via-temple-gold to-temple-gold/30 rounded-lg mb-3">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-temple-maroon mb-0 px-6 py-2 bg-white/80 rounded-md backdrop-blur-sm">
              {language === 'en' ? "Temple Timings" : "मंदिर समय"}
            </h1>
          </div>
          <div className="w-32 h-0.5 bg-gradient-to-r from-temple-gold/30 via-temple-gold to-temple-gold/30 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            {language === 'en' 
              ? "Find detailed information about darshan timings, aarti schedule, and special event timings at Shri Narsingh Temple." 
              : "श्री नृसिंह मंदिर में दर्शन समय, आरती कार्यक्रम और विशेष आयोजन समय के बारे में विस्तृत जानकारी प्राप्त करें।"}
          </p>
        </div>
        <TimingsSection />
      </div>
      <Footer />
    </div>
  );
};

export default TimingsPage;
