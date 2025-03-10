
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
    
    try {
      await signUp(formData.email, formData.password, formData.username);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <div className="h-20 w-20 rounded-full bg-temple-gold/20 flex items-center justify-center">
          <span className="text-3xl font-serif text-temple-gold">ॐ</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">{t('signup.username')}</Label>
          <Input
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            className="border-temple-gold/30 focus:border-temple-gold"
            aria-invalid={!!errors.username}
          />
          {errors.username && (
            <p className="text-xs text-red-500 mt-1">{errors.username}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t('signup.email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            className="border-temple-gold/30 focus:border-temple-gold"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">{t('signup.password')}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="border-temple-gold/30 focus:border-temple-gold"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border-temple-gold/30 focus:border-temple-gold"
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full bg-temple-gold hover:bg-temple-gold/80 text-white"
            disabled={isLoading}
          >
            {isLoading ? t('signup.signingUp') : t('signup.signupButton')}
          </Button>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            {t('signup.alreadyHaveAccount')}{' '}
            <button 
              type="button"
              onClick={onToggleForm}
              className="text-temple-maroon hover:underline"
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
