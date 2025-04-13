
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DonationDialog = () => {
  const { language } = useLanguage();
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center font-serif text-2xl text-temple-maroon">
          {language === 'en' ? 'Online Donations' : 'ऑनलाइन दान'}
        </DialogTitle>
      </DialogHeader>
      
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-temple-lightgold/30 p-6 rounded-full mb-6">
          <Clock className="h-12 w-12 text-temple-gold" />
        </div>
        
        <h3 className="text-xl font-semibold text-temple-maroon mb-2">
          {language === 'en' ? 'Coming Soon' : 'जल्द आ रहा है'}
        </h3>
        
        <p className="text-gray-600 text-center max-w-sm">
          {language === 'en' 
            ? 'Online donation facility will be available soon. Please visit the temple for donations at present.'
            : 'ऑनलाइन दान की सुविधा जल्द ही उपलब्ध होगी। कृपया वर्तमान में दान के लिए मंदिर आएं।'
          }
        </p>
      </div>
    </DialogContent>
  );
};

export default DonationDialog;
