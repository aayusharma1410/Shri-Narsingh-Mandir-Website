
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthPageLayout from '@/components/auth/AuthPageLayout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Use useEffect for navigation instead of redirecting during render
  useEffect(() => {
    // Only navigate if user exists to prevent unnecessary redirects
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const pageTitle = isLogin 
    ? (language === 'en' ? 'Welcome Back' : 'वापस स्वागत है') 
    : (language === 'en' ? 'Create Account' : 'खाता बनाएं');

  return (
    <>
      <Navbar />
      <AuthPageLayout 
        title={pageTitle} 
        showAlert={!isLogin}
      >
        {isLogin ? (
          <LoginForm onSwitchMode={toggleAuthMode} />
        ) : (
          <SignupForm onSwitchMode={toggleAuthMode} />
        )}
      </AuthPageLayout>
    </>
  );
};

export default AuthPage;
