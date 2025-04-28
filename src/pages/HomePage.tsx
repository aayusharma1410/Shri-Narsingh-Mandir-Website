
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DarshanSlideshow from '@/components/DarshanSlideshow';
import NoticeBoard from '@/components/NoticeBoard';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import PraktotsavScheduleDialog from '@/components/PraktotsavScheduleDialog';

const HomePage = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    document.title = language === 'en' 
      ? "Shri Narsingh Temple | Hasampur, Sikar, Rajasthan" 
      : "श्री नृसिंह मंदिर | हासमपुर, सीकर, राजस्थान";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.setAttribute("content", language === 'en' 
        ? "Official website of Shri Narsingh Temple in Hasampur, Sikar, Rajasthan. View daily darshan, temple timings, live aarti and more. Experience divine blessings online." 
        : "हासमपुर, सीकर, राजस्थान में श्री नृसिंह मंदिर की आधिकारिक वेबसाइट। दैनिक दर्शन, मंदिर समय, लाइव आरती और अधिक देखें। ऑनलाइन दिव्य आशीर्वाद का अनुभव करें।");
      document.head.appendChild(meta);
    } else {
      metaDescription.setAttribute("content", language === 'en' 
        ? "Official website of Shri Narsingh Temple in Hasampur, Sikar, Rajasthan. View daily darshan, temple timings, live aarti and more. Experience divine blessings online." 
        : "हासमपुर, सीकर, राजस्थान में श्री नृसिंह मंदिर की आधिकारिक वेबसाइट। दैनिक दर्शन, मंदिर समय, लाइव आरती और अधिक देखें। ऑनलाइन दिव्य आशीर्वाद का अनुभव करें।");
    }
  }, [language]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <PraktotsavScheduleDialog />
      <div className="container mx-auto px-2 md:px-0 py-8">
        {/* Add the Praktotsav schedule image */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <img 
            src="/lovable-uploads/d825fb41-d828-4d31-8d63-a5402da86735.png"
            alt={language === 'en' ? "Narsingh Praktotsav Schedule" : "नृसिंह प्रकटोत्सव समय-सारणी"}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <DarshanSlideshow />
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-2xl mx-auto">
            <NoticeBoard />
          </div>

          <div className="w-full relative bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-temple-maroon text-center">
                {language === "en"
                  ? "How to Reach Hasampur Temple"
                  : "हासमपुर मंदिर कैसे पहुँचे"}
              </h2>
              <div className="w-full h-[450px] md:h-[550px] relative">
                <iframe
                  title="Hasampur Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.9459708397293!2d75.86830677541354!3d27.673900876194365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396cb5251085f91b%3A0x333f18db169ffacf!2sHasampur%2C%20Rajasthan%20332502!5e0!3m2!1sen!2sin!4v1681559233761!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  className="border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex flex-col gap-2 text-center text-sm py-4">
                <span>
                  <b>Nearest Railway Station</b>: Neem Ka Thana (30 km)
                </span>
                <span>
                  <b>Nearest Bus Stop</b>: Hasampur Bus Stand (1 km)
                </span>
                <a
                  href="https://maps.app.goo.gl/cDMdhQgxMkvGrEnj7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-temple-maroon underline hover:text-temple-gold"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
