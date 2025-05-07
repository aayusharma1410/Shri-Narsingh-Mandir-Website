
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { UserMenu } from "@/components/navigation/UserMenu";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { MobileNavMenu } from "@/components/navigation/MobileNavMenu";
import { NavLink } from "@/components/navigation/NavLink";

const Navbar = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const isLoginPage = location.pathname === '/auth';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getTextColorClass = (isScrolled: boolean) => {
    if (isLoginPage) {
      return 'text-temple-maroon';
    }
    return isScrolled ? 'text-temple-maroon' : 'text-temple-gold';
  };

  const navLinks = [
    { name: language === 'en' ? 'Home' : 'होम', path: "/" },
    { name: language === 'en' ? 'About' : 'परिचय', path: "/about" },
    { name: language === 'en' ? 'Live Aarti' : 'आरती दर्शन', path: "/live-aarti" },
    { name: language === 'en' ? 'Timings' : 'समय सारणी', path: "/timings" },
    { name: language === 'en' ? 'Gallery' : 'गैलरी', path: "/gallery" },
    { name: language === 'en' ? 'Poshak Seva' : 'पोशाक सेवा', path: "/poshak-seva" },
    { name: language === 'en' ? 'Login' : 'लॉग इन', path: "/auth" },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {isLoginPage && (
              <Button
                variant="ghost"
                size="icon"
                className={getTextColorClass(isScrolled)}
                asChild
              >
                <Link to="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            )}
            <Link to="/" className="flex items-center space-x-2">
              <span className={`font-bold text-xl ${getTextColorClass(isScrolled)}`}>
                श्री नृसिंह मंदिर
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.filter(link => !user || link.path !== '/auth').map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                isActive={location.pathname === link.path}
                textColorClass={getTextColorClass(isScrolled)}
              >
                {link.name}
              </NavLink>
            ))}

            {user && (
              <UserMenu 
                user={user} 
                language={language} 
                isScrolled={isScrolled} 
              />
            )}

            <LanguageSwitcher isScrolled={isScrolled} />
          </div>

          <MobileNavMenu 
            isScrolled={isScrolled} 
            navLinks={navLinks} 
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
