
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const LoginPopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();

  useEffect(() => {
    // Only show popup for non-logged in users after 15 seconds
    if (!user) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 15000);
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleLogin = () => {
    navigate('/auth');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-temple-maroon">
            {language === 'en' ? 'Stay Updated!' : 'अपडेट रहें!'}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-gray-600">
          {language === 'en'
            ? 'Sign in to receive updates about temple activities and special events.'
            : 'मंदिर की गतिविधियों और विशेष कार्यक्रमों के बारे में अपडेट प्राप्त करने के लिए साइन इन करें।'}
        </DialogDescription>
        <div className="mt-4 text-center">
          <Button 
            onClick={handleLogin}
            className="bg-temple-maroon hover:bg-temple-maroon/90 text-white"
          >
            {language === 'en' ? 'Sign In Now' : 'अभी साइन इन करें'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
