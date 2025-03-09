
import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';

const LoginDialog = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Attempted",
        description: "This is a demo. Login functionality will be implemented in the future.",
      });
    }, 1500);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl font-serif text-temple-maroon">
          {t('login.title')}
        </DialogTitle>
      </DialogHeader>
      
      <div className="py-6">
        <div className="flex items-center justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-temple-gold/20 flex items-center justify-center">
            <span className="text-3xl font-serif text-temple-gold">ॐ</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('login.email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              required
              value={loginData.email}
              onChange={handleChange}
              className="border-temple-gold/30 focus:border-temple-gold"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">{t('login.password')}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={loginData.password}
              onChange={handleChange}
              className="border-temple-gold/30 focus:border-temple-gold"
            />
          </div>
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-temple-gold hover:bg-temple-gold/80 text-white"
              disabled={isLoading}
            >
              {isLoading ? t('login.loggingIn') : t('login.loginButton')}
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <a href="#" className="hover:text-temple-maroon">{t('login.forgotPassword')}</a>
          </div>
        </form>
      </div>
    </DialogContent>
  );
};

export default LoginDialog;
