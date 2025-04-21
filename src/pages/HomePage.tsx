
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
      <div className="container mx-auto px-2 md:px-0 py-8">
        <DarshanSlideshow />
        <div className="flex flex-col items-center my-8 gap-4">
          {/* Center NoticeBoard and make it fixed width on desktop */}
          <div className="w-full max-w-2xl mx-auto">
            <NoticeBoard />
          </div>

          {/* 25-row Table: now wider */}
          <div className="w-full mx-auto mt-8">
            <div className="rounded-lg overflow-x-auto bg-white shadow">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-temple-gold/30">
                    <th className="px-4 py-2 w-12">S. No</th>
                    <th className="px-4 py-2 w-40">Avatar's Name</th>
                    <th className="px-4 py-2">Story</th>
                  </tr>
                </thead>
                <tbody>
                  {stories.map((row) => (
                    <tr
                      key={row.s_no}
                      className="border-b last:border-b-0 even:bg-temple-cream/20 transition-colors hover:bg-temple-gold/20"
                    >
                      <td className="px-4 py-2 text-center">{row.s_no}</td>
                      <td className="px-4 py-2 text-center">{row.avatar}</td>
                      <td className="px-4 py-2">{row.story}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Large Map Section - Full Width */}
          <div className="w-screen md:w-[90vw] lg:w-full relative left-1/2 right-1/2 -ml-[50vw] md:-ml-[45vw] lg:ml-0 md:left-0 md:right-0 md:mx-auto mt-10">
            <div className="rounded-lg shadow bg-white p-4">
              <h2 className="text-lg font-semibold mb-2 text-temple-maroon text-center">
                {language === "en"
                  ? "How to Reach Hasampur Temple"
                  : "हासमपुर मंदिर कैसे पहुँचे"}
              </h2>
              <div className="w-full aspect-video mb-4 rounded overflow-hidden">
                <iframe
                  title="Hasampur Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.9459708397293!2d75.86830677541354!3d27.673900876194365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396cb5251085f91b%3A0x333f18db169ffacf!2sHasampur%2C%20Rajasthan%20332502!5e0!3m2!1sen!2sin!4v1681559233761!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  allowFullScreen
                  loading="lazy"
                  className="border-0 w-full h-[350px] md:h-[420px] lg:h-[480px]"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex flex-col gap-2 text-center text-sm">
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

          {/* Daily Schedule */}
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
