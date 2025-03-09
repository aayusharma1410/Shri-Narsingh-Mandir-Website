
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-temple-maroon text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">
              {t('hero.temple')}
            </h3>
            <p className="mb-4">
              {t('footer.about')}
            </p>
            <div className="flex items-center mt-6">
              <Heart className="w-5 h-5 mr-2 text-temple-gold" />
              <p>{t('footer.supportedBy')}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="w-5 h-5 mr-3 text-temple-gold" />
                <span>
                  {t('timings.temple')}, {t('timings.village')} {t('timings.state')}
                </span>
              </li>
              <li className="flex">
                <Phone className="w-5 h-5 mr-3 text-temple-gold" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex">
                <Mail className="w-5 h-5 mr-3 text-temple-gold" />
                <span>info@narsinghmandir.org</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-temple-gold transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-temple-gold transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/live-aarti" className="hover:text-temple-gold transition-colors">
                  {t('nav.liveAarti')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-temple-gold transition-colors">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/timings" className="hover:text-temple-gold transition-colors">
                  {t('nav.timings')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">{t('footer.getUpdates')}</h3>
            <p className="mb-4">
              {t('footer.emailPrompt')}
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder={t('footer.yourEmail')} 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-temple-gold"
              />
              <Button className="bg-temple-gold hover:bg-temple-gold/80 text-white">
                {t('footer.subscribe')}
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-white/20" />
        
        <div className="text-center text-white/70">
          <p>
            &copy; {currentYear} {t('hero.temple')}। {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
