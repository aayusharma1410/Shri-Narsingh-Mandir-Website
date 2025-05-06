
import { Link } from "react-router-dom";
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-temple-cream to-amber-50 border-t border-temple-gold/20">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-temple-gold/30 via-temple-gold to-temple-gold/30"></div>
      <div className="absolute -top-12 right-0 w-24 h-24 bg-temple-gold/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-8 left-0 w-32 h-32 bg-temple-gold/10 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Temple Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold text-temple-maroon border-b border-temple-gold/30 pb-2 inline-block">
              {language === 'en' ? 'Shri Narsingh Temple' : 'श्री नरसिंह मंदिर'}
            </h3>
            
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-temple-gold flex-shrink-0 mt-1" />
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Village Hasampur, District Mathura, Uttar Pradesh, India' 
                  : 'ग्राम हसामपुर, जिला मथुरा, उत्तर प्रदेश, भारत'}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-temple-gold flex-shrink-0" />
              <a href="tel:+918955672580" className="text-gray-600 hover:text-temple-maroon transition-colors">
                +91 8955672580
              </a>
            </div>
            
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-temple-gold flex-shrink-0" />
              <a href="mailto:shrilakshminarsinghhasampur@gmail.com" className="text-gray-600 hover:text-temple-maroon transition-colors break-all">
                shrilakshminarsinghhasampur@gmail.com
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold text-temple-maroon border-b border-temple-gold/30 pb-2 inline-block">
              {language === 'en' ? 'Quick Links' : 'त्वरित लिंक्स'}
            </h3>
            
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-temple-maroon transition-colors flex items-center">
                  <span className="bg-temple-gold/10 h-1.5 w-1.5 rounded-full mr-2"></span>
                  {language === 'en' ? 'Home' : 'होम'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-temple-maroon transition-colors flex items-center">
                  <span className="bg-temple-gold/10 h-1.5 w-1.5 rounded-full mr-2"></span>
                  {language === 'en' ? 'About' : 'परिचय'}
                </Link>
              </li>
              <li>
                <Link to="/timings" className="text-gray-600 hover:text-temple-maroon transition-colors flex items-center">
                  <span className="bg-temple-gold/10 h-1.5 w-1.5 rounded-full mr-2"></span>
                  {language === 'en' ? 'Timings' : 'समय'}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-600 hover:text-temple-maroon transition-colors flex items-center">
                  <span className="bg-temple-gold/10 h-1.5 w-1.5 rounded-full mr-2"></span>
                  {language === 'en' ? 'Gallery' : 'गैलरी'}
                </Link>
              </li>
              <li>
                <Link to="/poshak-seva" className="text-gray-600 hover:text-temple-maroon transition-colors flex items-center">
                  <span className="bg-temple-gold/10 h-1.5 w-1.5 rounded-full mr-2"></span>
                  {language === 'en' ? 'Poshak Seva' : 'पोशाक सेवा'}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Aarti Timings */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold text-temple-maroon border-b border-temple-gold/30 pb-2 inline-block">
              {language === 'en' ? 'Aarti Timings' : 'आरती समय'}
            </h3>
            
            <div className="space-y-2 bg-white/50 p-3 rounded-lg shadow-inner">
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'en' ? 'Morning:' : 'सुबह:'}</span>
                <span className="text-temple-maroon font-medium">5:15 AM</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'en' ? 'Noon:' : 'दोपहर:'}</span>
                <span className="text-temple-maroon font-medium">12:00 PM</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'en' ? 'Evening:' : 'शाम:'}</span>
                <span className="text-temple-maroon font-medium">7:15 PM</span>
              </div>
            </div>

            <Link to="/live-aarti" className="inline-block px-4 py-2 bg-gradient-to-r from-temple-gold/20 to-temple-gold/30 rounded-full text-temple-maroon hover:from-temple-gold/30 hover:to-temple-gold/40 transition-all duration-300 text-sm font-medium">
              {language === 'en' ? 'Watch Live Aarti' : 'लाइव आरती देखें'}
            </Link>
          </div>
          
          {/* Connect with us */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold text-temple-maroon border-b border-temple-gold/30 pb-2 inline-block">
              {language === 'en' ? 'Connect with Us' : 'हमसे जुड़ें'}
            </h3>
            
            <p className="text-gray-600">
              {language === 'en'
                ? 'Follow us on social media to stay updated with temple activities and events.'
                : 'मंदिर की गतिविधियों और कार्यक्रमों से अपडेट रहने के लिए हमें सोशल मीडिया पर फॉलो करें।'}
            </p>
            
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/profile.php?id=61571381196072" target="_blank" rel="noopener noreferrer" className="p-2 bg-temple-gold/10 rounded-full hover:bg-temple-gold/20 transition-colors">
                <Facebook className="h-5 w-5 text-temple-maroon" />
              </a>
              
              <a href="#" className="p-2 bg-temple-gold/10 rounded-full hover:bg-temple-gold/20 transition-colors">
                <Instagram className="h-5 w-5 text-temple-maroon" />
              </a>
              
              <a href="mailto:shrilakshminarsinghhasampur@gmail.com" className="p-2 bg-temple-gold/10 rounded-full hover:bg-temple-gold/20 transition-colors">
                <Mail className="h-5 w-5 text-temple-maroon" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-4 border-t border-temple-gold/20 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} {language === 'en' ? 'Shri Narsingh Temple, Hasampur. All rights reserved.' : 'श्री नरसिंह मंदिर, हसामपुर। सर्वाधिकार सुरक्षित।'}
          </p>
          <p className="text-gray-500 text-xs mt-2 flex items-center justify-center">
            {language === 'en' ? 'Made with ' : 'बनाया गया '} 
            <Heart className="h-3 w-3 text-red-500 mx-1 animate-pulse" fill="currentColor" /> 
            {language === 'en' ? ' and devotion' : ' और भक्ति के साथ'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
