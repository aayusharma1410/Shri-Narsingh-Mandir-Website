
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
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-temple-maroon mb-3">
            {language === 'en' ? "Temple Timings" : "मंदिर समय"}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
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
