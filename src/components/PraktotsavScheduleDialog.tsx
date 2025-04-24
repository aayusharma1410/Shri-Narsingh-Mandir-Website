
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const PraktotsavScheduleDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  
  useEffect(() => {
    // Show dialog after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-2xl text-temple-maroon">
            {language === 'en' 
              ? 'Shri Narsingh Praktotsav Schedule' 
              : 'श्री नृसिंह प्रकटोत्सव समय-सारणी'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center p-4">
          <img 
            src="/lovable-uploads/f5a026b3-4a57-43f3-97a6-6b586cf2606b.png" 
            alt="Narsingh Praktotsav Schedule" 
            className="max-w-full rounded-lg shadow-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PraktotsavScheduleDialog;
