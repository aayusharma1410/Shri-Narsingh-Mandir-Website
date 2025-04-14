
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Home, Info, Video, Image, Clock, User, Menu, X, Globe, LogOut, Heart } from 'lucide-react';
import LoginDialog from './LoginDialog';
import DonationDialog from './DonationDialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Removed 'policies' item from the navItems array
  const navItems = [
    { name: t('nav.home'), icon: <Home className="w-4 h-4" />, href: '/' },
    { name: t('nav.about'), icon: <Info className="w-4 h-4" />, href: '/about' },
    { name: t('nav.liveAarti'), icon: <Video className="w-4 h-4" />, href: '/live-aarti' },
    { name: t('nav.gallery'), icon: <Image className="w-4 h-4" />, href: '/gallery' },
    { name: t('nav.timings'), icon: <Clock className="w-4 h-4" />, href: '/timings' },
    { name: t('nav.donate'), icon: <Heart className="w-4 h-4" />, href: '#', isDonation: true }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || t('nav.user');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 shadow-md backdrop-blur-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className={`font-serif text-2xl font-bold transition-colors ${
            isScrolled ? 'text-temple-maroon' : 'text-white hero-text-stroke'
          }`}>
            {language === 'en' ? 'Shri Narsingh Temple' : 'श्री नृसिंह मंदिर'}
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            item.isDonation ? (
              <Dialog key={item.name}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className={`px-3 py-2 rounded-md flex items-center space-x-1 transition-all
                      border-temple-gold ${
                      isScrolled 
                        ? 'text-temple-maroon bg-white hover:bg-temple-lightgold/50' 
                        : 'text-white border-white/30 bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Button>
                </DialogTrigger>
                <DonationDialog />
              </Dialog>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md flex items-center space-x-1 transition-all hover:bg-temple-lightgold/20 ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )
          ))}
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleLanguage}
            className={`ml-1 ${
              isScrolled ? 'text-temple-maroon hover:bg-temple-lightgold/20' : 'text-white hover:bg-white/20'
            }`}
          >
            <Globe className="w-4 h-4" />
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`ml-2 border-temple-gold ${
                    isScrolled ? 'text-temple-maroon bg-white hover:bg-temple-lightgold/50' : 'text-white border-white/30 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  {username}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-temple-gold/30">
                <DropdownMenuItem className="cursor-pointer text-temple-maroon" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('nav.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`ml-2 border-temple-gold ${
                    isScrolled ? 'text-temple-maroon bg-white hover:bg-temple-lightgold/50' : 'text-white border-white/30 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  {t('nav.login')}
                </Button>
              </DialogTrigger>
              <LoginDialog />
            </Dialog>
          )}
        </nav>

        <div className="md:hidden flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleLanguage}
            className={`${
              isScrolled ? 'text-temple-maroon hover:bg-temple-lightgold/20' : 'text-white hover:bg-white/20'
            }`}
          >
            <Globe className="w-5 h-5" />
          </Button>
          
          <button 
            className="p-2 rounded-full bg-temple-lightgold/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 
              <X className={`w-6 h-6 ${isScrolled ? 'text-temple-maroon' : 'text-white'}`} /> : 
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-temple-maroon' : 'text-white'}`} />
            }
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-temple-gold/30 shadow-lg animate-fade-in">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              item.isDonation ? (
                <Dialog key={item.name}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="px-4 py-3 rounded-md flex items-center space-x-3 transition-all justify-start w-full border-temple-gold text-temple-maroon hover:bg-temple-lightgold/50"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Button>
                  </DialogTrigger>
                  <DonationDialog />
                </Dialog>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-4 py-3 rounded-md flex items-center space-x-3 transition-all hover:bg-temple-lightgold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              )
            ))}
            
            {user ? (
              <div className="flex flex-col space-y-2">
                <div className="px-4 py-3 rounded-md flex items-center space-x-3 bg-temple-lightgold/20 text-temple-maroon">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{username}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-temple-gold text-temple-maroon"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-temple-gold text-temple-maroon"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t('nav.login')}
                  </Button>
                </DialogTrigger>
                <LoginDialog />
              </Dialog>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
