
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from '@/contexts/LanguageContext';
import { NavLink } from "@/components/navigation/NavLink";

interface MobileNavMenuProps {
  isScrolled: boolean;
  navLinks: Array<{ name: string; path: string }>;
}

export const MobileNavMenu = ({ isScrolled, navLinks }: MobileNavMenuProps) => {
  const { language, setLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Memoize language toggle function
  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  }, [language, setLanguage]);
  
  // Handle location changes to close menu
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Memoize open toggle to prevent recreation on renders
  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  // Memoize signout handler
  const handleSignOut = useCallback(() => {
    signOut();
    setIsOpen(false);
  }, [signOut]);

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`md:hidden ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}
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
              onClick={handleSignOut}
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
  );
};
