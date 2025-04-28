
import Navbar from '@/components/Navbar';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const GalleryPage = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    document.title = language === 'en' 
      ? "Gallery | Shri Narsingh Temple Hasampur" 
      : "गैलरी | श्री नृसिंह मंदिर हासमपुर";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.setAttribute("content", language === 'en' 
        ? "Explore the photo gallery of Shri Narsingh Temple Hasampur. View images of temple, deity, festivals, celebrations and events." 
        : "श्री नृसिंह मंदिर हासमपुर की फोटो गैलरी देखें। मंदिर, देवता, त्योहार, समारोह और आयोजनों की तस्वीरें देखें।");
      document.head.appendChild(meta);
    } else {
      metaDescription.setAttribute("content", language === 'en' 
        ? "Explore the photo gallery of Shri Narsingh Temple Hasampur. View images of temple, deity, festivals, celebrations and events." 
        : "श्री नृसिंह मंदिर हासमपुर की फोटो गैलरी देखें। मंदिर, देवता, त्योहार, समारोह और आयोजनों की तस्वीरें देखें।");
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-temple-maroon mb-3">
            {language === 'en' ? "Temple Gallery" : "मंदिर गैलरी"}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {language === 'en' 
              ? "Browse through our collection of photographs capturing the divine essence of Shri Narsingh Temple, its festivals and celebrations." 
              : "श्री नृसिंह मंदिर के दिव्य सार, इसके त्योहारों और समारोहों को दर्शाने वाले हमारे फोटोग्राफ के संग्रह को देखें।"}
          </p>
        </div>
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
