
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleTimingsClick = () => {
    navigate('/timings');
  };

  const handleDarshanClick = () => {
    // Scroll to darshan slideshow section on the homepage
    const darshanSection = document.getElementById('darshan-slideshow');
    if (darshanSection) {
      darshanSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/lovable-uploads/0af9c7fa-6f04-49c6-a66c-ef79a1c19db1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay with slightly darker and more vibrant colors to enhance the image */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-temple-maroon/30 to-temple-gold/20"></div>
      
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
                className="bg-temple-gold hover:bg-temple-gold/80 text-white font-medium px-8 py-6 text-lg shadow-lg"
                onClick={handleDarshanClick}
              >
                {t('hero.viewDarshan')}
              </Button>
              <Button 
                variant="outline" 
                className="border-temple-gold text-temple-gold hover:bg-temple-gold/20 font-medium px-8 py-6 text-lg backdrop-blur-sm shadow-lg"
                onClick={handleTimingsClick}
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
