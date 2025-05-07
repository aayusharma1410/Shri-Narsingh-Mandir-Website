
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
  
  useEffect(() => {
    // Only navigate if user exists and is authenticated
    // Also make sure we're not in a loading state to avoid premature redirects
    if (user && !loading) {
      navigate('/', { replace: true });
    }
  }, [user, navigate, loading]); // Only re-run when these dependencies change
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const pageTitle = isLogin 
    ? (language === 'en' ? 'Welcome Back' : 'वापस स्वागत है') 
    : (language === 'en' ? 'Create Account' : 'खाता बनाएं');

  // If we're still loading the auth state, show a loading indicator
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
