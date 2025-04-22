import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-temple-maroon text-white pt-16 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Temple Info */}
          <div className="md:col-span-4">
            <h3 className="text-xl font-serif mb-4">
              {language === "en" ? "Shri Narsingh Temple" : "श्री नृसिंह मंदिर"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-temple-gold" />
                <span>
                  {language === "en"
                    ? "Hasampur, Sikar District, Rajasthan 332502"
                    : "हासमपुर, सीकर जिला, राजस्थान 332502"}
                </span>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-2 mt-0.5 text-temple-gold" />
                <span>
                  {language === "en"
                    ? "Open Daily: 5:00 AM - 9:00 PM"
                    : "प्रतिदिन खुला: सुबह 5:00 - रात 9:00"}
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-2 mt-0.5 text-temple-gold" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-2 mt-0.5 text-temple-gold" />
                <span>contact@shrinarsinhgtemple.org</span>
              </li>
              <li className="flex items-start">
                <Instagram className="w-5 h-5 mr-2 mt-0.5 text-temple-gold" />
                <a href="https://www.instagram.com/p/DItYel0Tew8T3UZeMnAQAfTKSIFjneiuj5CpqM0/?igsh=cGNxcnMwNGs1NjZq" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-temple-gold transition-colors">
                  @shrinarsinhgtemple
                </a>
              </li>
              <li className="flex items-start">
                <Facebook className="w-5 h-5 mr-2 mt-0.5 text-temple-gold" />
                <a href="https://www.facebook.com/events/695352646486362/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-temple-gold transition-colors">
                  Shri Narsingh Temple
                </a>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-serif mb-4">
              {language === "en" ? "Quick Links" : "त्वरित लिंक"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-temple-gold transition-colors">
                  {language === "en" ? "Home" : "होम"}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-temple-gold transition-colors">
                  {language === "en" ? "About" : "परिचय"}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-temple-gold transition-colors">
                  {language === "en" ? "Gallery" : "गैलरी"}
                </Link>
              </li>
              <li>
                <Link to="/live-aarti" className="hover:text-temple-gold transition-colors">
                  {language === "en" ? "Live Aarti" : "लाइव आरती"}
                </Link>
              </li>
              <li>
                <Link to="/poshak-seva" className="hover:text-temple-gold transition-colors">
                  {language === "en" ? "Poshak Seva" : "पोशाक सेवा"}
                </Link>
              </li>
              <li>
                <Link to="/policies" className="hover:text-temple-gold transition-colors">
                  {language === "en" ? "Temple Policies" : "मंदिर नियम"}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Map - now takes full width */}
          <div className="md:col-span-6">
            <h3 className="text-xl font-serif mb-4">
              {language === "en" ? "Location" : "स्थान"}
            </h3>
            <div className="rounded-lg overflow-hidden h-[250px] shadow w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.9459708397293!2d75.86830677541354!3d27.673900876194365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396cb5251085f91b%3A0x333f18db169ffacf!2sHasampur%2C%20Rajasthan%20332502!5e0!3m2!1sen!2sin!4v1681559233761!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Temple Location"
              ></iframe>
            </div>
          </div>
        </div>
        
        <hr className="border-temple-gold/30 my-8" />
        
        <div className="text-center text-sm text-white/70">
          <p>
            © {new Date().getFullYear()} {language === "en" ? "Shri Narsingh Temple, Hasampur. All Rights Reserved." : "श्री नृसिंह मंदिर, हासमपुर। सर्वाधिकार सुरक्षित।"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
