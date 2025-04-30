
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSwitcherProps {
  isScrolled: boolean;
}

export const LanguageSwitcher = ({ isScrolled }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };
  
  return (
    <Button 
      onClick={toggleLanguage} 
      variant="outline" 
      size="sm"
      className={`
        flex items-center gap-1 rounded-full border-2
        transition-all duration-400 ease-in-out
        hover:tracking-[4px]
        ${isScrolled 
          ? "border-temple-gold bg-white text-temple-maroon hover:bg-temple-gold/10" 
          : "border-white/20 bg-white/10 text-white hover:bg-white/20"
        }
      `}
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
    </Button>
  );
};
