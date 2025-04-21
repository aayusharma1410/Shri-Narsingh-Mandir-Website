
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { AtSign, Lock, User, AlertCircle } from 'lucide-react';

const SignUpForm = ({ onToggleForm }: { onToggleForm: () => void }) => {
  const { signUp } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [signupError, setSignupError] = useState('');

  const BLOCKED_EMAILS = ['shrilakshminarsinghhasampur@gmail.com'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear general signup error when user makes changes
    if (signupError) {
      setSignupError('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    } else if (BLOCKED_EMAILS.includes(formData.email)) {
      newErrors.email = 'This email is not allowed to register';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setSignupError('');
    
    try {
      await signUp(formData.email, formData.password, formData.username);
    } catch (error: any) {
      setSignupError(error.message || 'An error occurred during signup');
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <div className="h-20 w-20 rounded-full bg-temple-gold/20 flex items-center justify-center animate-glow">
          <span className="text-3xl font-serif text-temple-gold">ॐ</span>
        </div>
      </div>
      
      {signupError && (
        <div className="p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-600 flex items-start gap-2">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{signupError}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-temple-maroon font-medium">{t('signup.username')}</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-temple-gold/70">
              <User size={18} />
            </div>
            <Input
              id="username"
              name="username"
              placeholder="Enter your full name"
              value={formData.username}
              onChange={handleChange}
              className="pl-10 border-temple-gold/30 focus-visible:ring-temple-gold/70 focus-visible:border-temple-gold transition-all duration-200"
              aria-invalid={!!errors.username}
            />
          </div>
          {errors.username && (
            <p className="text-xs text-red-500 mt-1">{errors.username}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-temple-maroon font-medium">{t('signup.email')}</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-temple-gold/70">
              <AtSign size={18} />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
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
          <Label htmlFor="password" className="text-temple-maroon font-medium">{t('signup.password')}</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-temple-gold/70">
              <Lock size={18} />
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 border-temple-gold/30 focus-visible:ring-temple-gold/70 focus-visible:border-temple-gold transition-all duration-200"
              aria-invalid={!!errors.password}
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">{t('signup.passwordRequirements')}</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-temple-maroon font-medium">{t('signup.confirmPassword')}</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-temple-gold/70">
              <Lock size={18} />
            </div>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pl-10 border-temple-gold/30 focus-visible:ring-temple-gold/70 focus-visible:border-temple-gold transition-all duration-200"
              aria-invalid={!!errors.confirmPassword}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full bg-temple-gold hover:bg-temple-gold/80 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? t('signup.signingUp') : t('signup.signupButton')}
          </Button>
        </div>
        
        <div className="text-center text-sm text-muted-foreground pt-2">
          <p>
            {t('signup.alreadyHaveAccount')}{' '}
            <button 
              type="button"
              onClick={onToggleForm}
              className="text-temple-maroon hover:text-temple-darkred hover:underline transition-colors"
            >
              {t('signup.loginLink')}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;

