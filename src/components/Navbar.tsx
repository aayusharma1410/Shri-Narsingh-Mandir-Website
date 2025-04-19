import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, Globe, User } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LoginDialog from './LoginDialog';
import { supabase } from '@/lib/supabase';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { user, signOut } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      const fetchUsername = async () => {
        try {
          const { data, error } = await supabase
            .from('user_details')
            .select('username')
            .eq('user_id', user.id)
            .single();
          
          if (data && data.username) {
            setUsername(data.username);
          } else {
            setUsername(user.email?.split('@')[0] || 'User');
          }
        } catch (error) {
          console.error("Error fetching username:", error);
          setUsername(user.email?.split('@')[0] || 'User');
        }
      };
      
      fetchUsername();
    }
  }, [user]);

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

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleLoginClick = () => {
    setShowLoginDialog(true);
  };

  const handleLogout = async () => {
    await signOut();
  };

  const navLinks = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.liveAarti'), path: "/live-aarti" },
    { name: t('nav.gallery'), path: "/gallery" },
    { name: t('nav.timings'), path: "/timings" },
    { name: "Poshak Seva", path: "/poshak-seva" },
  ];

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className={`font-bold text-xl ${isScrolled ? 'text-temple-maroon' : 'text-white'}`}>
                श्री नृसिंह मंदिर
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors duration-200 ${
                    isScrolled
                      ? "text-gray-700 hover:text-temple-gold"
                      : "text-white hover:text-temple-gold"
                  } ${location.pathname === link.path ? "font-medium" : "font-normal"}`}
                >
                  {link.name}
                </Link>
              ))}

              <Button 
                onClick={toggleLanguage} 
                variant="outline" 
                size="sm"
                className={`flex items-center gap-1 rounded-full border-2 ${
                  isScrolled 
                    ? "border-temple-gold bg-white text-temple-maroon hover:bg-temple-gold/10" 
                    : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
              </Button>

              {user ? (
                <>
                  {user.email === 'shrilakshminarsinghhasampur@gmail.com' && (
                    <Link
                      to="/admin"
                      className={`transition-colors duration-200 ${
                        isScrolled
                          ? "text-gray-700 hover:text-temple-gold"
                          : "text-white hover:text-temple-gold"
                      }`}
                    >
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center gap-2">
                    <User className={`h-4 w-4 ${isScrolled ? "text-gray-700" : "text-white"}`} />
                    <span className={`${isScrolled ? "text-gray-700" : "text-white"}`}>
                      {username}
                    </span>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className={`${
                        isScrolled ? "text-gray-700" : "text-white"
                      } hover:text-temple-gold`}
                    >
                      {t('nav.logout')}
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  onClick={handleLoginClick}
                  variant="ghost"
                  className={`${
                    isScrolled ? "text-gray-700" : "text-white"
                  } hover:text-temple-gold`}
                >
                  {t('nav.login')}
                </Button>
              )}
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
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="px-4 py-2 text-base hover:bg-gray-100 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}

                  <Button 
                    onClick={toggleLanguage} 
                    variant="outline"
                    className="w-full justify-start gap-2 bg-temple-gold/10 text-temple-maroon hover:bg-temple-gold/20"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{language === 'en' ? 'हिंदी में देखें' : 'View in English'}</span>
                  </Button>

                  {user ? (
                    <>
                      {user.email === 'shrilakshminarsinghhasampur@gmail.com' && (
                        <Link
                          to="/admin"
                          className="px-4 py-2 text-base hover:bg-gray-100 rounded-md"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <div className="px-4 py-2 text-base">
                        <User className="h-4 w-4 inline mr-2" />
                        {username}
                      </div>
                      <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        {t('nav.logout')}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        setShowLoginDialog(true);
                      }}
                      variant="default"
                      className="w-full justify-start"
                    >
                      {t('nav.login')}
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  );
};

export default Navbar;
