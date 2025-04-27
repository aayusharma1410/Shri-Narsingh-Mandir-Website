
import { useLanguage } from "@/contexts/LanguageContext";
import DonationDialog from "@/components/DonationDialog";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";

const DonationPage = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="min-h-screen bg-temple-gold/5 py-20 px-4">
      <div className="container mx-auto mt-16">
        <h1 className="text-4xl font-bold text-temple-maroon text-center mb-8">
          {language === 'en' ? 'Online Donations' : 'ऑनलाइन दान'}
        </h1>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DonationDialog />
        </Dialog>
      </div>
    </div>
  );
};

export default DonationPage;
