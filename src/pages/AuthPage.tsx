
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
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Only navigate when the auth state has been fully determined and user exists
  useEffect(() => {
    if (user && !loading) {
      navigate('/', { replace: true });
    }
  }, [user, navigate, loading]);
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const pageTitle = isLogin 
    ? (language === 'en' ? 'Welcome Back' : 'वापस स्वागत है') 
    : (language === 'en' ? 'Create Account' : 'खाता बनाएं');

  // Show loading indicator when auth state is being determined
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-temple-maroon"></div>
        </div>
      </>
    );
  }

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
