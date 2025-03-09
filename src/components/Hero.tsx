
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Golden gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-temple-gold/20 to-transparent"></div>
      
      <div className="container relative z-10 px-6 py-32 mx-auto text-center">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/30">
            <p className="font-serif text-temple-gold">{t('hero.welcome')}</p>
          </div>
          
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white hero-text-stroke">
            {t('hero.temple')}
          </h1>
          
          <h2 className={`font-serif text-2xl md:text-3xl text-white mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {t('hero.subtitle')}
          </h2>
          
          <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-temple-gold hover:bg-temple-gold/80 text-white font-medium px-8 py-6 text-lg"
              >
                {t('hero.viewDarshan')}
              </Button>
              <Button 
                variant="outline" 
                className="border-white hover:bg-white/20 text-white font-medium px-8 py-6 text-lg backdrop-blur-sm"
              >
                {t('hero.templeTimings')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
