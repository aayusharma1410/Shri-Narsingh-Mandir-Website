
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DarshanSlideshow from '@/components/DarshanSlideshow';
import NoticeBoard from '@/components/NoticeBoard';
import DailySchedule from '@/components/DailySchedule';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

// Table Row Stories (Dummy Content)
const stories = Array.from({ length: 25 }).map((_, i) => ({
  s_no: i + 1,
  avatar: `User${i + 1}`,
  story: "This is a sample short story for avatar " + (i + 1)
}));

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
        ? "Official website of Shri Narsingh Temple in Hasampur, Sikar, Rajasthan. View daily darshan, temple timings, live aarti and more." 
        : "हासमपुर, सीकर, राजस्थान में श्री नृसिंह मंदिर की आधिकारिक वेबसाइट। दैनिक दर्शन, मंदिर समय, लाइव आरती और अधिक देखें।");
      document.head.appendChild(meta);
    } else {
      metaDescription.setAttribute("content", language === 'en' 
        ? "Official website of Shri Narsingh Temple in Hasampur, Sikar, Rajasthan. View daily darshan, temple timings, live aarti and more." 
        : "हासमपुर, सीकर, राजस्थान में श्री नृसिंह मंदिर की आधिकारिक वेबसाइट। दैनिक दर्शन, मंदिर समय, लाइव आरती और अधिक देखें।");
    }
  }, [language]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <DarshanSlideshow />
        <div className="flex flex-col items-center my-8 gap-4">
          {/* Center NoticeBoard and make it fixed width on desktop */}
          <div className="w-full max-w-xl mx-auto">
            <NoticeBoard />
          </div>
          {/* Table: 25 rows, 3 columns below notice board */}
          <div className="w-full max-w-xl mx-auto mt-6">
            <div className="rounded-lg overflow-x-auto bg-white shadow">
              <table className="min-w-full table-fixed">
                <thead>
                  <tr className="bg-temple-gold/30">
                    <th className="px-4 py-2 w-12">S. No</th>
                    <th className="px-4 py-2 w-32">Avatar's Name</th>
                    <th className="px-4 py-2">Story</th>
                  </tr>
                </thead>
                <tbody>
                  {stories.map((row) => (
                    <tr key={row.s_no} className="border-b last:border-b-0 even:bg-temple-cream/20">
                      <td className="px-4 py-2 text-center">{row.s_no}</td>
                      <td className="px-4 py-2 text-center">{row.avatar}</td>
                      <td className="px-4 py-2">{row.story}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full max-w-xl mx-auto mt-6">
            <DailySchedule isSummerTimings={true} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
