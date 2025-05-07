
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
  
  // Fix the infinite re-render issue by using useEffect properly
  useEffect(() => {
    // Only navigate if user exists and is authenticated
    if (user) {
      navigate('/');
    }
  }, [user, navigate]); // Only re-run when these dependencies change
  
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
