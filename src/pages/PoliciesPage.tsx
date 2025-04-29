
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PolicySection from '@/components/PolicySection';
import { useLanguage } from '@/contexts/LanguageContext';

const PoliciesPage = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    document.title = language === 'en' 
      ? "Temple Policies | Shri Narsingh Temple Hasampur" 
      : "मंदिर नीतियां | श्री नृसिंह मंदिर हसामपुर";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.setAttribute("content", language === 'en' 
        ? "Important temple rules and policies for visitors to Shri Narsingh Temple in Hasampur. Guidelines for darshan, offerings, donations and conduct within temple premises." 
        : "हसामपुर में श्री नृसिंह मंदिर के आगंतुकों के लिए महत्वपूर्ण मंदिर नियम और नीतियां। मंदिर परिसर में दर्शन, भेंट, दान और आचरण के लिए दिशानिर्देश।");
      document.head.appendChild(meta);
    } else {
      metaDescription.setAttribute("content", language === 'en' 
        ? "Important temple rules and policies for visitors to Shri Narsingh Temple in Hasampur. Guidelines for darshan, offerings, donations and conduct within temple premises." 
        : "हसामपुर में श्री नृसिंह मंदिर के आगंतुकों के लिए महत्वपूर्ण मंदिर नियम और नीतियां। मंदिर परिसर में दर्शन, भेंट, दान और आचरण के लिए दिशानिर्देश।");
    }
  }, [language]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-temple-maroon text-center mb-3">
            {language === 'en' ? 'Temple Policies' : 'मंदिर नीतियां'}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-10">
            {language === 'en' 
              ? "Important guidelines and rules to observe while visiting Shri Narsingh Temple to maintain its sanctity and ensure a spiritually fulfilling experience for all devotees." 
              : "श्री नृसिंह मंदिर की यात्रा करते समय इसकी पवित्रता बनाए रखने और सभी भक्तों के लिए आध्यात्मिक रूप से परिपूर्ण अनुभव सुनिश्चित करने के लिए महत्वपूर्ण दिशानिर्देश और नियम।"}
          </p>
        </div>
        <PolicySection />
      </main>
      <Footer />
    </div>
  );
};

export default PoliciesPage;
