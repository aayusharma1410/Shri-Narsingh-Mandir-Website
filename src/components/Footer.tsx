
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-red-700 text-white pt-12 pb-6">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-2xl text-temple-gold mb-4">
              {language === 'en' ? 'Shri Narsingh Temple' : 'श्री नृसिंह मंदिर'}
            </h3>
            <p className="mb-4 text-white/80">
              {language === 'en'
                ? 'An ancient temple dedicated to Bhagwan Narsingh, situated in the serene village of Hasampur, Sikar, Rajasthan, India.'
                : 'हसामपुर, सीकर, राजस्थान, भारत के शांत गांव में स्थित भगवान नृसिंह को समर्पित एक प्राचीन मंदिर।'}
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/shrinarsinhgtemple" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-temple-gold/20 hover:bg-temple-gold/40 transition-colors"
              >
                <Facebook size={16} className="text-temple-gold" />
              </a>
              <a 
                href="https://www.instagram.com/shrinarsinhgtemple" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-temple-gold/20 hover:bg-temple-gold/40 transition-colors"
              >
                <Instagram size={16} className="text-temple-gold" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg text-temple-gold mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-temple-gold transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-temple-gold transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/80 hover:text-temple-gold transition-colors">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/live-aarti" className="text-white/80 hover:text-temple-gold transition-colors">
                  {t('nav.liveAarti')}
                </Link>
              </li>
              <li>
                <Link to="/timings" className="text-white/80 hover:text-temple-gold transition-colors">
                  {t('nav.timings')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg text-temple-gold mb-4">
              {t('footer.contactUs')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-temple-gold mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">
                  {language === 'en' 
                    ? 'Hasampur, Sikar, Rajasthan, India' 
                    : 'हसामपुर, सीकर, राजस्थान, भारत'}
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-temple-gold mr-3 flex-shrink-0" />
                <a href="tel:+917073990477" className="text-white/80 hover:text-temple-gold transition-colors">
                  +91 7073990477
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-temple-gold mr-3 flex-shrink-0" />
                <a href="mailto:shrilakshminarsinghhasampur@gmail.com" className="text-white/80 hover:text-temple-gold transition-colors">
                  shrilakshminarsinghhasampur@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6 bg-temple-gold/10" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-white/70 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} {language === 'en' ? 'Shri Narsingh Temple. All rights reserved.' : 'श्री नृसिंह मंदिर। सर्वाधिकार सुरक्षित।'}
          </p>
          <div className="flex space-x-4">
            <Link to="/policies" className="text-sm text-white/70 hover:text-temple-gold transition-colors">
              {t('footer.policies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
