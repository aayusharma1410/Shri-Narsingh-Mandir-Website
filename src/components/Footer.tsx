
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-temple-maroon text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">
              {language === 'en' ? 'Shri Narsingh Temple' : 'श्री नरसिंह मंदिर'}
            </h3>
            <p className="mb-4">
              {language === 'en' 
                ? 'Located in Hasampur, Rajasthan, Shri Narsingh Temple is a center for spiritual peace and devotion. Devotees receive divine blessings by visiting this sacred place.'
                : 'हसमपुर, राजस्थान में स्थित श्री नरसिंह मंदिर आध्यात्मिक शांति और भक्ति का केंद्र है। यहां दर्शन करके भक्तगण परमात्मा का आशीर्वाद प्राप्त करते हैं।'}
            </p>
            <div className="flex items-center mt-6">
              <Heart className="w-5 h-5 mr-2 text-temple-gold" />
              <p>{language === 'en' ? 'Run by devotees\' support' : 'भक्तों के सहयोग से संचालित'}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">
              {language === 'en' ? 'Contact Us' : 'संपर्क करें'}
            </h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="w-5 h-5 mr-3 text-temple-gold shrink-0" />
                <span>
                  {language === 'en' 
                    ? 'Shri Narsingh Temple, Hasampur, Rajasthan, India'
                    : 'श्री नरसिंह मंदिर, हसमपुर, राजस्थान, भारत'}
                </span>
              </li>
              <li className="flex">
                <Phone className="w-5 h-5 mr-3 text-temple-gold shrink-0" />
                <span>+91 8955672580</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-temple-gold shrink-0 mt-1" />
                <span className="break-all">shrilakshminarsinghhasampur@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">
              {language === 'en' ? 'Quick Links' : 'त्वरित लिंक'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-temple-gold transition-colors">
                  {language === 'en' ? 'Home' : 'मुख्य पृष्ठ'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-temple-gold transition-colors">
                  {language === 'en' ? 'Temple History' : 'मंदिर का इतिहास'}
                </Link>
              </li>
              <li>
                <Link to="/live-aarti" className="hover:text-temple-gold transition-colors">
                  {language === 'en' ? 'Live Aarti' : 'लाइव आरती'}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-temple-gold transition-colors">
                  {language === 'en' ? 'Gallery' : 'चित्र दीर्घा'}
                </Link>
              </li>
              <li>
                <Link to="/timings" className="hover:text-temple-gold transition-colors">
                  {language === 'en' ? 'Darshan Timings' : 'दर्शन समय'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">
              {language === 'en' ? 'Get Updates' : 'अपडेट प्राप्त करें'}
            </h3>
            <p className="mb-4">
              {language === 'en' 
                ? 'Register your email for latest information and upcoming events at the temple.'
                : 'मंदिर से जुड़ी नवीनतम जानकारी और आगामी कार्यक्रमों के लिए अपना ईमेल पंजीकृत करें।'}
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder={language === 'en' ? 'Your Email' : 'आपका ईमेल'} 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-temple-gold"
              />
              <Button className="bg-temple-gold hover:bg-temple-gold/80 text-white">
                {language === 'en' ? 'Subscribe' : 'सदस्यता लें'}
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-white/20" />
        
        <div className="text-center text-white/70">
          <p>
            &copy; {currentYear} {language === 'en' ? 'Shri Narsingh Temple, Hasampur. All rights reserved.' : 'श्री नरसिंह मंदिर, हसमपुर। सर्वाधिकार सुरक्षित।'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
