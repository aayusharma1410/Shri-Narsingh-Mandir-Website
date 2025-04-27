
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Globe, ArrowLeft, LogOut } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isLoginPage = location.pathname === '/auth';

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

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

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const getTextColorClass = (isScrolled: boolean) => {
    if (isLoginPage) {
      return 'text-yellow-400';
    }
    return isScrolled ? 'text-yellow-400' : 'text-white';
  };

  const navLinks = [
    { name: language === 'en' ? 'Home' : 'होम', path: "/" },
    { name: language === 'en' ? 'About' : 'परिचय', path: "/about" },
    { name: language === 'en' ? 'Live Aarti' : 'आरती दर्शन', path: "/live-aarti" },
    { name: language === 'en' ? 'Timings' : 'समय सारणी', path: "/timings" },
    { name: language === 'en' ? 'Gallery' : 'गैलरी', path: "/gallery" },
    { name: language === 'en' ? 'Poshak Seva' : 'पोशाक सेवा', path: "/poshak-seva" },
    { name: language === 'en' ? 'Donation' : 'दान', path: "/donation" },
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
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative px-3 py-2 
                  ${getTextColorClass(isScrolled)} no-underline
                  transition-all duration-400 ease-in-out
                  hover:tracking-[4px]
                  ${location.pathname === link.path ? "font-medium" : "font-normal"}
                `}
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <Button 
                onClick={() => signOut()} 
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
                {user.user_metadata.username || 'Profile'}
              </Button>
            )}

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
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%]">
              <SheetHeader>
                <SheetTitle>श्री नृसिंह मंदिर</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4">
                {navLinks.filter(link => !user || link.path !== '/auth').map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-4 py-2 text-base hover:bg-gray-100 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {user && (
                  <Button 
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{language === 'en' ? 'Logout' : 'लॉग आउट'}</span>
                  </Button>
                )}

                <Button 
                  onClick={() => {
                    toggleLanguage();
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="w-full justify-start gap-2 bg-temple-gold/10 text-temple-maroon hover:bg-temple-gold/20"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === 'en' ? 'हिंदी में देखें' : 'View in English'}</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
