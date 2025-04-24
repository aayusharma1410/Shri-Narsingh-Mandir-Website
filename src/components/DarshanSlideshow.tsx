
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const DarshanSlideshow = () => {
  const { language } = useLanguage();
  // Using the new image uploaded by the user
  const [currentImage] = useState("/lovable-uploads/f5a026b3-4a57-43f3-97a6-6b586cf2606b.png");

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
