
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { calculateNextAartiTime } from '@/utils/aartiTimeUtils';
import AartiVideoPlayer from './aarti/AartiVideoPlayer';
import AartiSchedule from './aarti/AartiSchedule';
import AartiLyrics from './aarti/AartiLyrics';
import UpcomingFeatures from './aarti/UpcomingFeatures';

const LiveAarti = () => {
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedAarti, setSelectedAarti] = useState("om-jai-jagdish");
  const sectionRef = useRef<HTMLDivElement>(null);
  const nextScheduledTime = calculateNextAartiTime();

  useEffect(() => {
    setIsLoaded(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const childElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    childElements?.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      childElements?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const togglePlay = () => {
    window.open('https://www.facebook.com/profile.php?id=61571381196072', '_blank');
    setIsPlaying(true);
  };

  return (
    <section 
      id="live-aarti" 
      className="section-container relative bg-gradient-to-b from-temple-cream to-white"
      ref={sectionRef}
    >
      <div className="absolute top-0 left-0 w-24 h-24 bg-temple-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-temple-gold/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-temple-gold font-medium mb-3 opacity-0 animate-on-scroll">आरती दर्शन</p>
        <h2 className="section-heading text-temple-maroon opacity-0 animate-on-scroll">
          {language === 'en' ? 'Live Aarti' : 'लाइव आरती'}
        </h2>
        <p className="text-lg opacity-0 animate-on-scroll">
          {language === 'en' 
            ? 'Watch the live broadcast of the aarti performed every morning and evening and experience the spiritual atmosphere from home.'
            : 'हर दिन सुबह और शाम को होने वाली आरती का सीधा प्रसारण देखें और घर बैठे आध्यात्मिक अनुभव प्राप्त करें।'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
        <div className="lg:col-span-2 opacity-0 animate-on-scroll">
          <AartiVideoPlayer
            isPlaying={isPlaying}
            isMuted={isMuted}
            nextScheduledTime={nextScheduledTime}
            onPlayToggle={togglePlay}
            onMuteToggle={() => setIsMuted(!isMuted)}
          />
        </div>
        
        <div className="opacity-0 animate-on-scroll">
          <AartiSchedule
            nextScheduledTime={nextScheduledTime}
            onWatchLive={togglePlay}
          />
        </div>
      </div>

      <UpcomingFeatures />

      <AartiLyrics
        selectedAarti={selectedAarti}
        onAartiSelect={setSelectedAarti}
      />
    </section>
  );
};

export default LiveAarti;
