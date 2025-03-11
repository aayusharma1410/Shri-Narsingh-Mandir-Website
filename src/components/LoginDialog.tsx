
import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import SignUpForm from './SignUpForm';

const LoginDialog = () => {
  const { t } = useLanguage();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await signIn(loginData.email, loginData.password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
    setErrors({});
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl font-serif text-temple-maroon">
          {showSignUp ? t('signup.title') : t('login.title')}
        </DialogTitle>
      </DialogHeader>
      
      <div className="py-6">
        {showSignUp ? (
          <SignUpForm onToggleForm={toggleForm} />
        ) : (
          <div className="space-y-6">
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
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
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
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
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
              
              <div className="mt-6 flex flex-col items-center space-y-3">
                <div className="text-sm text-muted-foreground">
                  <a href="#" className="hover:text-temple-maroon">{t('login.forgotPassword')}</a>
                </div>
                
                <div className="w-full border-t border-border my-2"></div>
                
                <p className="text-sm text-center text-muted-foreground">
                  {t('login.noAccount')}
                </p>
                
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={toggleForm}
                  className="w-full border-temple-gold text-temple-maroon hover:bg-temple-gold/10"
                >
                  {t('login.createAccount')}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default LoginDialog;
