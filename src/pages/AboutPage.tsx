
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutPage = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    document.title = language === 'en' 
      ? "About | Shri Narsingh Temple Hasampur" 
      : "परिचय | श्री नृसिंह मंदिर हसामपुर";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.setAttribute("content", language === 'en' 
        ? "Learn about the history, significance and legends of Shri Narsingh Temple in Hasampur, Sikar. A sacred place of worship with ancient heritage." 
        : "हसामपुर, सीकर में श्री नृसिंह मंदिर के इतिहास, महत्व और किंवदंतियों के बारे में जानें। प्राचीन विरासत के साथ पूजा का एक पवित्र स्थान।");
      document.head.appendChild(meta);
    } else {
      metaDescription.setAttribute("content", language === 'en' 
        ? "Learn about the history, significance and legends of Shri Narsingh Temple in Hasampur, Sikar. A sacred place of worship with ancient heritage." 
        : "हसामपुर, सीकर में श्री नृसिंह मंदिर के इतिहास, महत्व और किंवदंतियों के बारे में जानें। प्राचीन विरासत के साथ पूजा का एक पवित्र स्थान।");
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50/70 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-96 h-96 bg-temple-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-temple-maroon/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -right-10 top-1/2 w-24 h-72 -rotate-45 bg-temple-gold/10 blur-2xl"></div>
      </div>
      
      <Navbar />
      <div className="pt-24 pb-12 relative z-10">
        <div className="container mx-auto px-4 text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-temple-maroon mb-4 animate-fade-in drop-shadow-sm">
            {language === 'en' ? "About the Temple" : "मंदिर का परिचय"}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-temple-gold/40 via-temple-gold to-temple-gold/40 mx-auto mb-6 animate-scale-in rounded-full"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto animate-fade-in">
            {language === 'en' 
              ? "Discover the divine heritage and spiritual significance of Shri Narsingh Temple in Hasampur." 
              : "हसामपुर में श्री नृसिंह मंदिर की दिव्य विरासत और आध्यात्मिक महत्व के बारे में जानें।"}
          </p>
        </div>
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
