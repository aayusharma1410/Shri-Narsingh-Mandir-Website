
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const DarshanSlideshow = () => {
  const { language } = useLanguage();
  const [currentImage] = useState("/lovable-uploads/acbea974-756b-4308-a7dd-5f93aa907c3a.png");

  return (
    <div id="darshan-slideshow" className="w-full max-w-2xl mx-auto mb-4">
      <h2 className="text-2xl font-serif text-center mb-4">
        {language === 'en' ? "Today's Darshan" : "आज का दर्शन"}
      </h2>
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden 
        border-[6px] border-gradient-to-tr from-temple-gold to-temple-maroon
        shadow-xl transition-all duration-300 
        hover:shadow-2xl hover:border-temple-gold/80"
        style={{
          boxShadow: '0 8px 32px 0 rgba(153,97,11,0.22), 0 1.5px 0 0 #7e260c',
          borderImage: 'linear-gradient(135deg, #C59D5F 60%, #7E260C 100%) 1',
          borderWidth: '6px',
        }}
      >
        <img
          src={currentImage}
          alt={language === 'en' ? "Today's Darshan" : "आज का दर्शन"}
          className="w-full h-full object-contain rounded-2xl"
        />
        <div className="absolute inset-0 pointer-events-none border-2 border-dotted border-temple-gold/60 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default DarshanSlideshow;
