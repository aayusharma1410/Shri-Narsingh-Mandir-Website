
import Navbar from '@/components/Navbar';
import PoshakSevaSection from '@/components/PoshakSevaSection';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import PraktotsavScheduleDialog from '@/components/PraktotsavScheduleDialog';
import { useEffect } from 'react';

const PoshakSevaPage = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    document.title = language === 'en' 
      ? "Poshak Seva | Shri Narsingh Temple Hasampur" 
      : "पोशाक सेवा | श्री नृसिंह मंदिर हसामपुर";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.setAttribute("content", language === 'en' 
        ? "Offer divine poshak seva (clothing service) to Shri Narsingh Bhagwan. Book your seva online and receive blessings. Various seva options available for devotees." 
        : "श्री नृसिंह भगवान को दिव्य पोशाक सेवा प्रदान करें। अपनी सेवा ऑनलाइन बुक करें और आशीर्वाद प्राप्त करें। भक्तों के लिए विभिन्न सेवा विकल्प उपलब्ध हैं।");
      document.head.appendChild(meta);
    } else {
      metaDescription.setAttribute("content", language === 'en' 
        ? "Offer divine poshak seva (clothing service) to Shri Narsingh Bhagwan. Book your seva online and receive blessings. Various seva options available for devotees." 
        : "श्री नृसिंह भगवान को दिव्य पोशाक सेवा प्रदान करें। अपनी सेवा ऑनलाइन बुक करें और आशीर्वाद प्राप्त करें। भक्तों के लिए विभिन्न सेवा विकल्प उपलब्ध हैं।");
    }
  }, [language]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50/70 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-temple-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-temple-maroon/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 top-1/2 w-24 h-72 rotate-45 bg-temple-gold/10 blur-2xl"></div>
      </div>
      
      <Navbar />
      <PraktotsavScheduleDialog />
      
      <div className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-temple-maroon mb-4 animate-fade-in drop-shadow-sm">
            {language === 'en' ? "Poshak Seva Booking" : "पोशाक सेवा बुकिंग"}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-temple-gold/40 via-temple-gold to-temple-gold/40 mx-auto mb-6 animate-scale-in rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in">
            {language === 'en' 
              ? "Offer divine clothing service to Lord Narsingh and receive blessings. Book your seva dates online." 
              : "भगवान नृसिंह को दिव्य पोशाक सेवा अर्पित करें और आशीर्वाद प्राप्त करें। अपनी सेवा तिथियां ऑनलाइन बुक करें।"}
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <PoshakSevaSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PoshakSevaPage;
