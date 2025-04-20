
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DarshanSlideshow from '@/components/DarshanSlideshow';
import NoticeBoard from '@/components/NoticeBoard';
import DailySchedule from '@/components/DailySchedule';
import JhankiTable from '@/components/JhankiTable';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const HomePage = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    document.title = language === 'en' 
      ? "Shri Narsingh Temple | Hasampur, Sikar, Rajasthan" 
      : "श्री नृसिंह मंदिर | हासमपुर, सीकर, राजस्थान";
    
    // Add meta tags for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = language === 'en' 
        ? "Official website of Shri Narsingh Temple in Hasampur, Sikar, Rajasthan. View daily darshan, temple timings, live aarti and more." 
        : "हासमपुर, सीकर, राजस्थान में श्री नृसिंह मंदिर की आधिकारिक वेबसाइट। दैनिक दर्शन, मंदिर समय, लाइव आरती और अधिक देखें।";
      document.head.appendChild(meta);
    } else {
      metaDescription.content = language === 'en' 
        ? "Official website of Shri Narsingh Temple in Hasampur, Sikar, Rajasthan. View daily darshan, temple timings, live aarti and more." 
        : "हासमपुर, सीकर, राजस्थान में श्री नृसिंह मंदिर की आधिकारिक वेबसाइट। दैनिक दर्शन, मंदिर समय, लाइव आरती और अधिक देखें।";
    }
    
    // Add keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const meta = document.createElement('meta');
      meta.name = "keywords";
      meta.content = "Shri Narsingh Temple, Hasampur, नृसिंह मंदिर, हासमपुर, Sikar, Rajasthan, temple, Hindu temple, Lord Narsingh, darshan, aarti";
      document.head.appendChild(meta);
    }
    
    // Add canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      const link = document.createElement('link');
      link.rel = "canonical";
      link.href = window.location.origin;
      document.head.appendChild(link);
    }
  }, [language]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-temple-maroon">
            {language === 'en' ? 'Today\'s Darshan' : 'आज का दर्शन'}
          </h2>
          <DarshanSlideshow />
        </section>
        
        <section className="my-12">
          <JhankiTable />
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div>
            <NoticeBoard />
          </div>
          <div>
            <DailySchedule isSummerTimings={true} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
