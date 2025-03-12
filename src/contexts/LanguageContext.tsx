
import { createContext, useContext, useState, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, options?: Record<string, any>) => string;
};

type TranslationType = {
  nav: {
    home: string;
    about: string;
    liveAarti: string;
    gallery: string;
    timings: string;
    login: string;
    logout: string;
    user: string;
    donate: string;
  };
  auth: {
    login: string;
    signup: string;
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    forgotPassword: string;
    noAccount: string;
    alreadyAccount: string;
    signupBtn: string;
    loginBtn: string;
    or: string;
    rememberMe: string;
    welcomeBack: string;
    createAccount: string;
    signupMessage: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    usernamePlaceholder: string;
    passwordRequirements: string;
    submitInfo: string;
  };
  donation: {
    title: string;
    description: string;
    amount: string;
    custom: string;
    paymentMethod: string;
    card: string;
    donate: string;
    success: string;
    thankYou: string;
  };
};

const translations: Record<string, TranslationType> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      liveAarti: 'Live Aarti',
      gallery: 'Gallery',
      timings: 'Timings',
      login: 'Login',
      logout: 'Logout',
      user: 'User',
      donate: 'Donate'
    },
    auth: {
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      username: 'Username',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      alreadyAccount: 'Already have an account?',
      signupBtn: 'Create Account',
      loginBtn: 'Sign In',
      or: 'or',
      rememberMe: 'Remember me',
      welcomeBack: 'Welcome back',
      createAccount: 'Create an account',
      signupMessage: 'Join our temple community',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      usernamePlaceholder: 'Choose a username',
      passwordRequirements: 'Password must be at least 8 characters',
      submitInfo: 'By creating an account, you agree to our Terms and Privacy Policy'
    },
    donation: {
      title: 'Donate to the Temple',
      description: 'Your contribution helps us maintain the temple and support community services.',
      amount: 'Select an amount',
      custom: 'Custom amount',
      paymentMethod: 'Payment method',
      card: 'Credit/Debit Card',
      donate: 'Make Donation',
      success: 'Donation Successful',
      thankYou: 'Thank you for your generous donation of ₹{amount}. Your contribution is greatly appreciated.'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'परिचय',
      liveAarti: 'लाइव आरती',
      gallery: 'गैलरी',
      timings: 'समय सारणी',
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      user: 'उपयोगकर्ता',
      donate: 'दान करें'
    },
    auth: {
      login: 'लॉगिन',
      signup: 'साइन अप',
      email: 'ईमेल',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      username: 'उपयोगकर्ता नाम',
      forgotPassword: 'पासवर्ड भूल गए?',
      noAccount: 'खाता नहीं है?',
      alreadyAccount: 'पहले से ही खाता है?',
      signupBtn: 'खाता बनाएं',
      loginBtn: 'साइन इन करें',
      or: 'या',
      rememberMe: 'मुझे याद रखें',
      welcomeBack: 'वापसी पर स्वागत है',
      createAccount: 'खाता बनाएं',
      signupMessage: 'हमारे मंदिर समुदाय से जुड़ें',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      usernamePlaceholder: 'एक उपयोगकर्ता नाम चुनें',
      passwordRequirements: 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए',
      submitInfo: 'खाता बनाकर, आप हमारी शर्तों और गोपनीयता नीति से सहमत हैं'
    },
    donation: {
      title: 'मंदिर को दान करें',
      description: 'आपका योगदान मंदिर के रखरखाव और सामुदायिक सेवाओं के समर्थन में मदद करता है।',
      amount: 'राशि चुनें',
      custom: 'कस्टम राशि',
      paymentMethod: 'भुगतान का तरीका',
      card: 'क्रेडिट/डेबिट कार्ड',
      donate: 'दान करें',
      success: 'दान सफल',
      thankYou: 'आपके ₹{amount} के उदार दान के लिए धन्यवाद। आपके योगदान की बहुत सराहना की जाती है।'
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string, options?: Record<string, any>) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k as keyof typeof value];
    }
    
    if (typeof value !== 'string') return key;
    
    if (options) {
      return Object.entries(options).reduce((acc, [optKey, optVal]) => 
        acc.replace(new RegExp(`\\{${optKey}\\}`, 'g'), String(optVal))
      , value);
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
