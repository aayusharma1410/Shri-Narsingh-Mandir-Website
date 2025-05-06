
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import SuggestionForm from "./SuggestionForm";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-gradient-to-b from-temple-maroon to-temple-darkred relative text-white pt-16 pb-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-temple-gold/30 via-temple-gold to-temple-gold/30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-temple-gold/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-temple-gold/3 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Temple Info */}
          <div className="md:col-span-4">
            <h3 className="text-xl font-serif mb-4 inline-block relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-temple-gold after:mt-1">
              {language === "en" ? "Shri Narsingh Temple" : "श्री नृसिंह मंदिर"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-temple-gold group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-temple-gold/90 transition-colors">
                  {language === "en"
                    ? "Hasampur, Sikar District, Rajasthan 332502"
                    : "हसामपुर, सीकर जिला, राजस्थान 332502"}
                </span>
              </li>
              <li className="flex items-start group">
                <Clock className="w-5 h-5 mr-2 mt-0.5 text-temple-gold group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-temple-gold/90 transition-colors">
                  {language === "en"
                    ? "Open Daily: 4:30 AM - 8:30 PM"
                    : "प्रतिदिन खुला: सुबह 4:30 - रात 8:30"}
                </span>
              </li>
              <li className="flex items-start group">
                <Phone className="w-5 h-5 mr-2 mt-0.5 text-temple-gold group-hover:scale-110 transition-transform" />
                <div>
                  <a 
                    href="tel:+919119389603" 
                    className="hover:text-temple-gold transition-colors font-medium underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 cursor-pointer hover:scale-105 inline-block"
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
                    href="tel:+918955672580" 
                    className="hover:text-temple-gold transition-colors font-medium underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 cursor-pointer hover:scale-105 inline-block"
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

              <li className="flex items-start group">
                <Mail className="w-5 h-5 mr-2 mt-0.5 text-temple-gold group-hover:scale-110 transition-transform" />
                <a 
                  href="mailto:shrilakshminarisnghhasampur@gmail.com" 
                  className="hover:text-temple-gold transition-colors font-medium underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 cursor-pointer hover:scale-105 inline-block"
                  aria-label="Send email to temple"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = "mailto:shrilakshminarisnghhasampur@gmail.com";
                  }}
                >
                  shrilakshminarisnghhasampur@gmail.com
                </a>
              </li>
              <li className="flex items-start group">
                <Instagram className="w-5 h-5 mr-2 mt-0.5 text-temple-gold group-hover:scale-110 transition-transform" />
                <a href="https://www.instagram.com/shrinarsinghmandirofficial/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-temple-gold transition-colors font-medium underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 cursor-pointer hover:scale-105 inline-block">
                  @shrinarsinghtemple
                </a>
              </li>
              <li className="flex items-start group">
                <Facebook className="w-5 h-5 mr-2 mt-0.5 text-temple-gold group-hover:scale-110 transition-transform" />
                <a href="https://www.facebook.com/profile.php?id=61575204090417" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-temple-gold transition-colors font-medium underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 cursor-pointer hover:scale-105 inline-block">
                  Shri Narsingh Temple
                </a>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-serif mb-4 inline-block relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-temple-gold after:mt-1">
              {language === "en" ? "Quick Links" : "त्वरित लिंक"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-temple-gold transition-colors font-medium relative hover:pl-4 group hover:underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 flex items-center">
                  <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span className="group-hover:translate-x-2 transition-transform">{language === "en" ? "Home" : "होम"}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-temple-gold transition-colors font-medium relative hover:pl-4 group hover:underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 flex items-center">
                  <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span className="group-hover:translate-x-2 transition-transform">{language === "en" ? "About" : "परिचय"}</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-temple-gold transition-colors font-medium relative hover:pl-4 group hover:underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 flex items-center">
                  <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span className="group-hover:translate-x-2 transition-transform">{language === "en" ? "Gallery" : "गैलरी"}</span>
                </Link>
              </li>
              <li>
                <Link to="/live-aarti" className="hover:text-temple-gold transition-colors font-medium relative hover:pl-4 group hover:underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 flex items-center">
                  <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span className="group-hover:translate-x-2 transition-transform">{language === "en" ? "Live Aarti" : "लाइव आरती"}</span>
                </Link>
              </li>
              <li>
                <Link to="/poshak-seva" className="hover:text-temple-gold transition-colors font-medium relative hover:pl-4 group hover:underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 flex items-center">
                  <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span className="group-hover:translate-x-2 transition-transform">{language === "en" ? "Poshak Seva" : "पोशाक सेवा"}</span>
                </Link>
              </li>
              <li>
                <Link to="/policies" className="hover:text-temple-gold transition-colors font-medium relative hover:pl-4 group hover:underline decoration-temple-gold/30 hover:decoration-temple-gold decoration-2 underline-offset-2 flex items-center">
                  <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span className="group-hover:translate-x-2 transition-transform">{language === "en" ? "Temple Policies" : "मंदिर नियम"}</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Suggestion Form */}
          <div className="md:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10 shadow-lg hover:shadow-xl transition-shadow">
              <SuggestionForm />
            </div>
          </div>
          
          {/* Map */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-serif mb-4 inline-block relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-temple-gold after:mt-1">
              {language === "en" ? "Location" : "स्थान"}
            </h3>
            <HoverCard>
              <HoverCardTrigger>
                <div className="rounded-lg overflow-hidden h-[250px] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border-2 border-temple-gold/20 group">
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
                    className="group-hover:opacity-90 transition-opacity"
                  ></iframe>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="bg-gradient-to-b from-amber-50 to-white text-temple-maroon border border-temple-gold/20">
                <p className="text-sm">
                  {language === "en" 
                    ? "Visit Shri Narsingh Temple in Hasampur, Sikar District" 
                    : "हसामपुर, सीकर जिले में श्री नृसिंह मंदिर पधारें"}
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        
        <hr className="border-temple-gold/30 my-8" />
        
        <div className="text-center text-sm">
          <p className="bg-gradient-to-r from-amber-100/70 via-temple-gold/80 to-amber-100/70 inline-block text-transparent bg-clip-text font-medium">
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
