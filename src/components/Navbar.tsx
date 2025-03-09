
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Home, Info, Video, Image, Clock, User, Menu, X } from 'lucide-react';
import LoginDialog from './LoginDialog';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: <Home className="w-4 h-4" />, href: '#home' },
    { name: 'About', icon: <Info className="w-4 h-4" />, href: '#about' },
    { name: 'Live Aarti', icon: <Video className="w-4 h-4" />, href: '#live-aarti' },
    { name: 'Gallery', icon: <Image className="w-4 h-4" />, href: '#gallery' },
    { name: 'Timings', icon: <Clock className="w-4 h-4" />, href: '#timings' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 shadow-md backdrop-blur-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className={`font-serif text-2xl font-bold transition-colors ${
            isScrolled ? 'text-temple-maroon' : 'text-white hero-text-stroke'
          }`}>
            श्री नरसिंह मंदिर
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`px-3 py-2 rounded-md flex items-center space-x-1 transition-all hover:bg-temple-lightgold/20 ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className={`ml-2 border-temple-gold ${
                  isScrolled ? 'text-temple-maroon bg-white hover:bg-temple-lightgold/50' : 'text-white border-white/30 bg-white/10 hover:bg-white/20'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </DialogTrigger>
            <LoginDialog />
          </Dialog>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-full bg-temple-lightgold/20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? 
            <X className={`w-6 h-6 ${isScrolled ? 'text-temple-maroon' : 'text-white'}`} /> : 
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-temple-maroon' : 'text-white'}`} />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-temple-gold/30 shadow-lg animate-fade-in">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-3 rounded-md flex items-center space-x-3 transition-all hover:bg-temple-lightgold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-temple-gold text-temple-maroon"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </DialogTrigger>
              <LoginDialog />
            </Dialog>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
