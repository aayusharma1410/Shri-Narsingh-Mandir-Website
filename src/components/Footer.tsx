
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Mail, MapPin, Phone, FileText, Link as LinkIcon, Info } from "lucide-react";
import { Card } from "@/components/ui/card";

const Footer = () => {
  const { language, t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-red-700 to-red-800 text-white pt-16 pb-8 shadow-lg border-t-4 border-temple-gold relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/9d35f335-2af8-4d36-8911-d309c4f8dd26.png')] opacity-5"></div>
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Temple Info */}
          <div className="flex flex-col items-start">
            <h3 className="font-serif text-2xl text-temple-gold mb-4 relative after:content-[''] after:block after:w-16 after:h-0.5 after:bg-temple-gold/70 after:mt-2">
              {language === 'en' ? 'Shri Narsingh Temple' : 'श्री नृसिंह मंदिर'}
            </h3>
            <p className="mb-6 text-white/90 leading-relaxed">
              {language === 'en'
                ? 'An ancient temple dedicated to Bhagwan Narsingh, situated in the serene village of Hasampur, Sikar, Rajasthan, India.'
                : 'हसामपुर, सीकर, राजस्थान, भारत के शांत गांव में स्थित भगवान नृसिंह को समर्पित एक प्राचीन मंदिर।'}
            </p>
            <div className="flex space-x-3 mb-2">
              <a 
                href="https://www.facebook.com/shrinarsinhgtemple" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-temple-gold/20 hover:bg-temple-gold/40 transition-colors duration-300 transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook size={20} className="text-temple-gold" />
              </a>
              <a 
                href="https://www.instagram.com/shrinarsinhgtemple" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-temple-gold/20 hover:bg-temple-gold/40 transition-colors duration-300 transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-temple-gold" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <Card className="bg-red-800/30 backdrop-blur-sm border-temple-gold/30 p-6 rounded-xl">
            <h3 className="font-serif text-lg text-temple-gold mb-4 border-b border-temple-gold/30 pb-2 flex items-center gap-2">
              <LinkIcon size={18} className="text-temple-gold" />
              {language === 'en' ? 'Quick Links' : 'त्वरित लिंक'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/90 hover:text-temple-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-temple-gold/50 group-hover:bg-temple-gold group-hover:w-2 transition-all"></span>
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/90 hover:text-temple-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-temple-gold/50 group-hover:bg-temple-gold group-hover:w-2 transition-all"></span>
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/90 hover:text-temple-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-temple-gold/50 group-hover:bg-temple-gold group-hover:w-2 transition-all"></span>
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/live-aarti" className="text-white/90 hover:text-temple-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-temple-gold/50 group-hover:bg-temple-gold group-hover:w-2 transition-all"></span>
                  {t('nav.liveAarti')}
                </Link>
              </li>
              <li>
                <Link to="/timings" className="text-white/90 hover:text-temple-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-temple-gold/50 group-hover:bg-temple-gold group-hover:w-2 transition-all"></span>
                  {t('nav.timings')}
                </Link>
              </li>
            </ul>
          </Card>
          
          {/* Contact Us */}
          <Card className="bg-red-800/30 backdrop-blur-sm border-temple-gold/30 p-6 rounded-xl hover:bg-red-800/40 transition-colors">
            <h3 className="font-serif text-lg text-temple-gold mb-4 border-b border-temple-gold/30 pb-2 flex items-center gap-2">
              <Phone size={18} className="text-temple-gold" />
              {language === 'en' ? 'Contact Us' : 'संपर्क करें'}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-temple-gold mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-white/90">
                  {language === 'en' 
                    ? 'Hasampur, Sikar, Rajasthan, India' 
                    : 'हसामपुर, सीकर, राजस्थान, भारत'}
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-temple-gold mr-3 flex-shrink-0" />
                <a href="tel:+917073990477" className="text-white/90 hover:text-temple-gold transition-colors">
                  +91 7073990477
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-temple-gold mr-3 flex-shrink-0" />
                <a 
                  href="mailto:shrilakshminarsinghhasampur@gmail.com" 
                  className="text-white/90 hover:text-temple-gold transition-colors text-sm md:text-base truncate"
                >
                  shrilakshminarsinghhasampur@gmail.com
                </a>
              </li>
            </ul>
          </Card>

          {/* Terms & Policies */}
          <Card className="bg-red-800/30 backdrop-blur-sm border-temple-gold/30 p-6 rounded-xl hover:bg-red-800/40 transition-colors">
            <h3 className="font-serif text-lg text-temple-gold mb-4 border-b border-temple-gold/30 pb-2 flex items-center gap-2">
              <FileText size={18} className="text-temple-gold" />
              {language === 'en' ? 'Terms & Policies' : 'नियम और नीतियां'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/policies#terms" className="text-white/90 hover:text-temple-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-temple-gold/50 group-hover:bg-temple-gold group-hover:w-2 transition-all"></span>
                  {language === 'en' ? 'Terms & Conditions' : 'नियम और शर्तें'}
                </Link>
              </li>
              <li>
                <Link to="/policies#privacy" className="text-white/90 hover:text-temple-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-temple-gold/50 group-hover:bg-temple-gold group-hover:w-2 transition-all"></span>
                  {language === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}
                </Link>
              </li>
              <li>
                <Link to="/policies#donation" className="text-white/90 hover:text-temple-gold transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-temple-gold/50 group-hover:bg-temple-gold group-hover:w-2 transition-all"></span>
                  {language === 'en' ? 'Donation Policy' : 'दान नीति'}
                </Link>
              </li>
            </ul>
          </Card>
        </div>
        
        <Separator className="my-8 bg-temple-gold/20" />
        
        <div className="text-center">
          <p className="text-sm text-white/80">
            &copy; {year} {language === 'en' 
              ? 'Shri Narsingh Temple. All rights reserved.' 
              : 'श्री नृसिंह मंदिर। सर्वाधिकार सुरक्षित।'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
