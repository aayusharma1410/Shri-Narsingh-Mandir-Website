
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface MobileNavMenuProps {
  isScrolled: boolean;
  navLinks: { name: string; path: string }[];
}

export const MobileNavMenu = ({ isScrolled, navLinks }: MobileNavMenuProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const getTextColorClass = (isScrolled: boolean) => {
    return isScrolled ? "text-temple-maroon" : "text-temple-gold";
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={getTextColorClass(isScrolled)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-full max-w-[300px] bg-gradient-to-b from-temple-cream/95 to-white p-0"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 flex justify-end">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-temple-maroon"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto py-2">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="py-2 px-4 hover:bg-temple-gold/10 text-temple-maroon font-medium text-lg"
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {!user && (
                  <Link
                    to="/auth"
                    className="py-2 px-4 mt-2 bg-temple-maroon/5 text-temple-maroon font-medium text-lg"
                    onClick={handleLinkClick}
                  >
                    Sign In / Sign Up
                  </Link>
                )}
              </nav>
            </div>
            
            <div className="p-4 border-t border-temple-gold/20">
              <div className="text-center text-temple-maroon/70 text-sm">
                © 2023 श्री नृसिंह मंदिर
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
