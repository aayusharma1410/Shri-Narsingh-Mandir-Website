
import Navbar from '@/components/Navbar';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const GalleryPage = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    document.title = language === 'en' 
      ? "Gallery | Shri Narsingh Temple" 
      : "गैलरी | श्री नृसिंह मंदिर";
  }, [language]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-12">
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
