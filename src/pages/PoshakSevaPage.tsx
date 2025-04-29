
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
    <div className="min-h-screen">
      <Navbar />
      <PraktotsavScheduleDialog />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-temple-maroon mb-3">
            {language === 'en' ? "Poshak Seva Booking" : "पोशाक सेवा बुकिंग"}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {language === 'en' 
              ? "Offer divine clothing service to Lord Narsingh and receive blessings. Book your seva dates online." 
              : "भगवान नृसिंह को दिव्य पोशाक सेवा अर्पित करें और आशीर्वाद प्राप्त करें। अपनी सेवा तिथियां ऑनलाइन बुक करें।"}
          </p>
        </div>
        <PoshakSevaSection />
      </div>
      <Footer />
    </div>
  );
};

export default PoshakSevaPage;
