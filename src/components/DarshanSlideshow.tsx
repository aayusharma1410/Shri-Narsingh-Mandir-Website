
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const DarshanSlideshow = () => {
  const { language } = useLanguage();
  // Using the newly uploaded image
  const [currentImage] = useState("/lovable-uploads/f4096cab-75a2-4b34-8a37-cb345eb06781.png");

  return (
    <div id="darshan-slideshow" className="w-full max-w-2xl mx-auto mb-4">
      <h2 className="text-2xl font-serif text-center mb-4">
        {language === 'en' ? "Today's Darshan" : "आज का दर्शन"}
      </h2>
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden 
        border-4 border-temple-gold 
        shadow-lg transition-all duration-300 
        hover:shadow-2xl hover:border-temple-maroon/70">
        <img
          src={currentImage}
          alt={language === 'en' ? "Today's Darshan" : "आज का दर्शन"}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default DarshanSlideshow;
