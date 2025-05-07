
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const LoginPopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

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
            Stay Updated!
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-center space-y-4">
          <p className="text-gray-600">
            Sign in to receive updates about temple activities and special events.
          </p>
          <Button 
            onClick={handleLogin}
            className="bg-temple-maroon hover:bg-temple-maroon/90 text-white"
          >
            Sign In Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
