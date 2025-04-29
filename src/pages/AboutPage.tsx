
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
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-temple-maroon mb-3">
            {language === 'en' ? "About the Temple" : "मंदिर का परिचय"}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
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
