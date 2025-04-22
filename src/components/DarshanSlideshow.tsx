
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const DarshanSlideshow = () => {
  const { language } = useLanguage();
  const [currentImage] = useState("/lovable-uploads/acbea974-756b-4308-a7dd-5f93aa907c3a.png");

  return (
    <div id="darshan-slideshow" className="w-full max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-serif text-center mb-4">
        {language === 'en' ? "Today's Darshan" : "आज का दर्शन"}
      </h2>
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
        <img
          src={currentImage}
          alt={language === 'en' ? "Today's Darshan" : "आज का दर्शन"}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default DarshanSlideshow;
