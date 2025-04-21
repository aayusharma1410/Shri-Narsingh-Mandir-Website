
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import SignUpForm from './SignUpForm';
import { AtSign, Lock, LogIn } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  const { t } = useLanguage();
  const { signIn, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!loginData.email.trim()) newErrors.email = 'Email is required';
    if (!loginData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await signIn(loginData.email, loginData.password);
      onOpenChange(false);
      setLoginData({
        email: '',
        password: '',
      });
      toast({
        title: "Success",
        description: "Successfully logged in",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      onOpenChange(false);
      toast({
        title: "Success",
        description: "Logged in with Google",
      });
    } catch (error: any) {
      toast({
        title: "Google Login Error",
        description: error.message || "Google login failed",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-temple-cream/95 to-white border-temple-gold/30 shadow-lg">
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
              <div className="flex items-center justify-center mb-8">
                <div className="h-20 w-20 rounded-full bg-temple-gold/20 flex items-center justify-center animate-glow">
                  <span className="text-3xl font-serif text-temple-gold">ॐ</span>
                </div>
              </div>

              {/* Google Login Button */}
              <div className="flex flex-col space-y-2 mb-4">
                <Button 
                  onClick={handleGoogleLogin} 
                  className="w-full bg-[white] border text-temple-maroon hover:bg-temple-gold/20 font-medium flex items-center justify-center gap-2"
                  disabled={googleLoading}
                  type="button"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                  {googleLoading ? "Signing in..." : "Log in with Google"}
                </Button>
                <div className="text-center text-xs text-muted-foreground">Or use your email below</div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-temple-maroon font-medium">{t('login.email')}</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-temple-gold/70">
                      <AtSign size={18} />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      value={loginData.email}
                      onChange={handleChange}
                      className="pl-10 border-temple-gold/30 focus-visible:ring-temple-gold/70 focus-visible:border-temple-gold transition-all duration-200"
                      aria-invalid={!!errors.email}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-temple-maroon font-medium">{t('login.password')}</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-temple-gold/70">
                      <Lock size={18} />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={loginData.password}
                      onChange={handleChange}
                      className="pl-10 border-temple-gold/30 focus-visible:ring-temple-gold/70 focus-visible:border-temple-gold transition-all duration-200"
                      aria-invalid={!!errors.password}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                  )}
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-temple-gold hover:bg-temple-gold/80 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? t('login.loggingIn') : t('login.loginButton')}
                  </Button>
                </div>
                
                <div className="mt-4 flex flex-col items-center space-y-5">
                  <div className="text-sm text-muted-foreground">
                    <a href="#" className="text-temple-maroon hover:text-temple-darkred transition-colors">{t('login.forgotPassword')}</a>
                  </div>
                  
                  <div className="w-full flex items-center gap-3">
                    <div className="h-px flex-1 bg-temple-gold/20"></div>
                    <span className="text-xs text-muted-foreground px-2">{t('login.noAccount')}</span>
                    <div className="h-px flex-1 bg-temple-gold/20"></div>
                  </div>
                  
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={toggleForm}
                    className="w-full border-temple-gold text-temple-maroon hover:bg-temple-gold/10 transition-all duration-300"
                  >
                    {t('login.createAccount')}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
