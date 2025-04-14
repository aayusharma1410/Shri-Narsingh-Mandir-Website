
import { useLanguage } from "@/contexts/LanguageContext";

const PraktotsavSchedule = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-16 bg-gradient-to-r from-temple-maroon/5 to-temple-gold/5">
      <div className="container px-6 mx-auto">
        <h2 className="section-heading mb-8 text-4xl text-center font-serif">
          {language === 'en' 
            ? 'Shri Narsingh Praktotsav Schedule' 
            : 'श्री नृसिंह प्रकटोत्सव समय-सारणी'}
        </h2>
        
        <div className="flex justify-center">
          <div className="max-w-4xl rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/lovable-uploads/eb79f79a-297f-438b-a238-c69a86aa3d3f.png" 
              alt="Narsingh Praktotsav Schedule" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PraktotsavSchedule;
