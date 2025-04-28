
import { useLanguage } from "@/contexts/LanguageContext";
import DonationDialog from "@/components/DonationDialog";
import { Dialog } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DonationPage = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    document.title = language === 'en' 
      ? "Donation | Shri Narsingh Temple Hasampur" 
      : "दान | श्री नृसिंह मंदिर हासमपुर";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.setAttribute("content", language === 'en' 
        ? "Make online donations to Shri Narsingh Temple in Hasampur. Support temple activities, maintenance and charitable work. Secure payment options available." 
        : "हासमपुर में श्री नृसिंह मंदिर को ऑनलाइन दान करें। मंदिर गतिविधियों, रखरखाव और धर्मार्थ कार्य का समर्थन करें। सुरक्षित भुगतान विकल्प उपलब्ध हैं।");
      document.head.appendChild(meta);
    } else {
      metaDescription.setAttribute("content", language === 'en' 
        ? "Make online donations to Shri Narsingh Temple in Hasampur. Support temple activities, maintenance and charitable work. Secure payment options available." 
        : "हासमपुर में श्री नृसिंह मंदिर को ऑनलाइन दान करें। मंदिर गतिविधियों, रखरखाव और धर्मार्थ कार्य का समर्थन करें। सुरक्षित भुगतान विकल्प उपलब्ध हैं।");
    }
  }, [language]);
  
  return (
    <div className="min-h-screen bg-temple-gold/5 py-20 px-4">
      <Navbar />
      <div className="container mx-auto mt-16">
        <h1 className="text-4xl font-bold text-temple-maroon text-center mb-4">
          {language === 'en' ? 'Online Donations' : 'ऑनलाइन दान'}
        </h1>
        <p className="text-lg text-center max-w-2xl mx-auto mb-8">
          {language === 'en' 
            ? 'Support the temple and its activities by contributing online. Your donations help maintain the temple and support various charitable initiatives.' 
            : 'ऑनलाइन योगदान देकर मंदिर और इसकी गतिविधियों का समर्थन करें। आपके दान मंदिर के रखरखाव में मदद करते हैं और विभिन्न धर्मार्थ पहलों का समर्थन करते हैं।'}
        </p>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DonationDialog />
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default DonationPage;
