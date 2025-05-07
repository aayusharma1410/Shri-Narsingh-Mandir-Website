import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import SuggestionForm from "./SuggestionForm";

const Footer = () => {
  const { language } = useLanguage();
  
  const quick_links = [
    { name: language === 'en' ? 'Home' : 'होम', path: '/' },
    { name: language === 'en' ? 'About Us' : 'हमारे बारे में', path: '/about' },
    { name: language === 'en' ? 'Aarti Timings' : 'आरती का समय', path: '/timings' },
    { name: language === 'en' ? 'Gallery' : 'गैलरी', path: '/gallery' },
    { name: language === 'en' ? 'Live Aarti' : 'लाइव आरती', path: '/live-aarti' },
    { name: language === 'en' ? 'Poshak Seva' : 'पोशक सेवा', path: '/poshak-seva' },
  ];

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
                    : "हसामपुर, सीकर जिला, राजस्थान 332502"}
                </span>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-2 mt-0.5 text-temple-gold" />
                <span>
                  {language === "en"
                    ? "Open Daily: 4:30 AM - 8:30 PM"
                    : "प्रतिदिन खुला: सुबह 4:30 - रात 8:30"}
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-2 mt-0.5 text-temple-gold" />
                <div>
                  <a 
                    href="tel:+919119389603" 
                    className="hover:text-temple-gold transition-colors font-medium underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 cursor-pointer"
                    aria-label="Call temple phone number"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = "tel:+919119389603";
                    }}
                  >
                    +91 91193 89603
                  </a>
                  <br />
                  <a 
                    href="tel:+917597866205" 
                    className="hover:text-temple-gold transition-colors font-medium underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 cursor-pointer"
                    aria-label="Call secondary temple phone number"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = "tel:+917597866205";
                    }}
                  >
                    +91 75978 66205
                  </a>
                  <br />
                  <a 
                    href="tel:+918955672580" 
                    className="hover:text-temple-gold transition-colors font-medium underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 cursor-pointer"
                    aria-label="Call alternative temple phone number"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = "tel:+918955672580";
                    }}
                  >
                    +91 89556 72580
                  </a>
                </div>
              </li>

              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-2 mt-0.5 text-temple-gold" />
                <a 
                  href="mailto:shrilakshminarisnghhasampur@gmail.com" 
                  className="hover:text-temple-gold transition-colors font-medium underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 cursor-pointer"
                  aria-label="Send email to temple"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = "mailto:shrilakshminarisnghhasampur@gmail.com";
                  }}
                >
                  shrilakshminarisnghhasampur@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <Instagram className="w-5 h-5 mr-2 mt-0.5 text-temple-gold" />
                <a href="https://www.instagram.com/shrinarsinghmandirofficial/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-temple-gold transition-colors font-medium underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 cursor-pointer">
                  @shrinarsinghtemple
                </a>
              </li>
              <li className="flex items-start">
                <Facebook className="w-5 h-5 mr-2 mt-0.5 text-temple-gold" />
                <a href="https://www.facebook.com/profile.php?id=61575204090417" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-temple-gold transition-colors font-medium underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 cursor-pointer">
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
              {quick_links.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="hover:text-temple-gold transition-colors font-medium relative hover:pl-4 group hover:underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2">
                    <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Suggestion Form */}
          <div className="md:col-span-3">
            <SuggestionForm />
          </div>
          
          {/* Map */}
          <div className="md:col-span-3">
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
                aria-label="Map showing location of Shri Narsingh Temple in Hasampur, Rajasthan"
              ></iframe>
            </div>
          </div>
        </div>
        
        <hr className="border-temple-gold/30 my-8" />
        
        <div className="text-center text-sm text-white/70">
          <p>
            © {new Date().getFullYear()} {language === "en" 
              ? "Shri Narsingh Temple, Hasampur. All Rights Reserved." 
              : "श्री नृसिंह मंदिर, हसामपुर। सर्वाधिकार सुरक्षित।"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
