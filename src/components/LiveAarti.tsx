
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LiveAarti = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const nextScheduledTime = new Date();
  nextScheduledTime.setHours(18, 30, 0);
  if (nextScheduledTime < new Date()) {
    nextScheduledTime.setDate(nextScheduledTime.getDate() + 1);
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <section 
      id="live-aarti" 
      className="section-container relative bg-gradient-to-b from-temple-cream to-white"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-temple-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-temple-gold/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-temple-gold font-medium mb-3 opacity-0 animate-on-scroll">आरती दर्शन</p>
        <h2 className="section-heading text-temple-maroon opacity-0 animate-on-scroll">लाइव आरती</h2>
        <p className="text-lg opacity-0 animate-on-scroll">
          हर दिन सुबह और शाम को होने वाली आरती का सीधा प्रसारण देखें और घर बैठे आध्यात्मिक अनुभव प्राप्त करें।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
        <div className="lg:col-span-2 opacity-0 animate-on-scroll">
          <div className="relative bg-black rounded-xl overflow-hidden shadow-xl">
            {/* Video placeholder */}
            <div className="relative pt-[56.25%] bg-temple-maroon/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-temple-gold/20 flex items-center justify-center animate-pulse">
                    <span className="text-3xl font-serif text-temple-gold">ॐ</span>
                  </div>
                  <p className="text-white font-medium">
                    {isPlaying ? 'आरती चल रही है' : 'अगली आरती जल्द ही शुरू होगी'}
                  </p>
                </div>
              </div>
              
              {/* Video controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <Button 
                    onClick={togglePlay}
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  
                  <div className="text-white text-sm">
                    {isPlaying ? 'Live' : 'Next: ' + formatTime(nextScheduledTime)}
                  </div>
                  
                  <Button 
                    onClick={toggleMute}
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="opacity-0 animate-on-scroll">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-temple-gold/20">
            <h3 className="font-serif text-xl font-bold mb-4 text-temple-maroon">आरती समय सूची</h3>
            
            <div className="space-y-4">
              <div className="border-b border-temple-gold/20 pb-3">
                <p className="font-medium">प्रातः आरती</p>
                <p className="text-sm text-gray-600">सुबह 5:30 बजे</p>
              </div>
              
              <div className="border-b border-temple-gold/20 pb-3">
                <p className="font-medium">मध्याह्न आरती</p>
                <p className="text-sm text-gray-600">दोपहर 12:00 बजे</p>
              </div>
              
              <div className="border-b border-temple-gold/20 pb-3">
                <p className="font-medium">संध्या आरती</p>
                <p className="text-sm text-gray-600">शाम 6:30 बजे</p>
              </div>
              
              <div>
                <p className="font-medium">शयन आरती</p>
                <p className="text-sm text-gray-600">रात 8:00 बजे</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">अगली आरती</h4>
              <div className="bg-temple-lightgold rounded-lg p-3">
                <p className="font-medium text-temple-maroon">{formatDate(nextScheduledTime)}</p>
                <p className="text-sm">{formatTime(nextScheduledTime)}</p>
              </div>
            </div>
            
            <Button className="w-full mt-6 bg-temple-gold hover:bg-temple-gold/80 text-white">
              अनुस्मारक सेट करें
            </Button>
          </div>
        </div>
      </div>

      {/* Aarti in Written Form - Moved from AboutSection */}
      <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-temple-gold/20 shadow-xl opacity-0 animate-on-scroll">
        <div className="flex items-center mb-6">
          <Music className="w-8 h-8 text-temple-maroon mr-3" />
          <h3 className="font-serif text-2xl font-bold text-temple-maroon">आरती</h3>
        </div>
        <div className="mb-8">
          <h4 className="font-serif text-xl font-bold mb-3 text-temple-maroon">आरती - ॐ जय जगदीश हरे</h4>
          <div className="bg-temple-gold/5 p-6 rounded-lg border border-temple-gold/30">
            <p className="mb-2 leading-relaxed text-gray-800">ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे</p>
            <p className="mb-2 leading-relaxed text-gray-800">भक्त जनों के संकट, क्षण में दूर करे</p>
            <p className="mb-2 leading-relaxed text-gray-800">जो ध्यावे फल पावे, दुःख बिनसे मन का</p>
            <p className="mb-2 leading-relaxed text-gray-800">स्वामी दुःख बिनसे मन का</p>
            <p className="mb-2 leading-relaxed text-gray-800">ॐ जय जगदीश हरे...</p>
            <p className="mt-4 text-sm text-gray-600 italic">Om Jai Jagdish Hare, Swami Jai Jagdish Hare <br />
            Victory to the Lord of the universe, O Lord, victory to You, the Lord of the universe <br />
            The troubles of Your devotees are removed in a moment... </p>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-xl font-bold mb-3 text-temple-maroon">भोग आरती - आओ भोग लगाओ</h4>
          <div className="bg-temple-gold/5 p-6 rounded-lg border border-temple-gold/30">
            <p className="mb-2 leading-relaxed text-gray-800">आओ भोग लगाओ जगत के पालनहारे</p>
            <p className="mb-2 leading-relaxed text-gray-800">दया करो अब स्वामी दीन दयालु हमारे</p>
            <p className="mb-2 leading-relaxed text-gray-800">नाना व्यंजन सजे हैं भोग धरे हम प्यारे</p>
            <p className="mb-2 leading-relaxed text-gray-800">ग्रहण करो भगवंत श्री आनंद मंगलकारे</p>
            <p className="mb-2 leading-relaxed text-gray-800">आओ भोग लगाओ...</p>
            <p className="mt-4 text-sm text-gray-600 italic">Come, let us offer bhog to the Sustainer of the world <br />
            Have mercy now, O Lord, our merciful protector <br />
            Various dishes have been prepared, we offer this food with love <br />
            Please accept it, O Lord, bringer of joy and auspiciousness</p>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600 text-center">
          <p>भोग आरती के समय भगवान को विशेष भोग अर्पित किया जाता है। सभी भक्तों से अनुरोध है कि वे इस पवित्र समय में उपस्थित होकर प्रसाद ग्रहण करें।</p>
          <p className="mt-2">During Bhog Aarti, special offerings are made to the deity. All devotees are requested to attend and receive prasad during this auspicious time.</p>
        </div>
      </div>
    </section>
  );
};

export default LiveAarti;
