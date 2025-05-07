import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type LanguageContextType = {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
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
      donate: 'Donate',
      policies: 'Mandir Policies',
      poshakSeva: 'Poshak Seva'
    },
    donation: {
      title: 'Donate to the Mandir',
      description: 'Your contribution helps us maintain the mandir and support community services.',
      amount: 'Select an amount',
      custom: 'Custom amount',
      paymentMethod: 'Payment method',
      card: 'Credit/Debit Card',
      donate: 'Make Donation',
      success: 'Donation Successful',
      thankYou: 'Thank you for your generous donation of ₹{amount}. Your contribution is greatly appreciated.',
      receipt: 'Donation Receipt',
      receiptSent: 'A receipt has been sent to {email}',
      emailReceipt: 'Email for Receipt',
      scanQR: 'Scan with any UPI app to donate ₹{amount}'
    },
    hero: {
      welcome: "Welcome to",
      temple: "Shri Narsingh Mandir",
      subtitle: "A Sacred Space for Spiritual Connection",
      viewDarshan: "View Darshan",
      templeTimings: "Mandir Timings",
      aarti: "Aarti"
    },
    login: {
      title: 'Sign In',
      email: 'Email Address',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      loginButton: 'Sign In',
      loggingIn: 'Signing in...',
      noAccount: 'Don\'t have an account yet?',
      createAccount: 'Create an Account'
    },
    signup: {
      title: 'Create an Account',
      username: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      passwordRequirements: 'Password must be at least 6 characters long',
      signupButton: 'Create Account',
      signingUp: 'Creating account...',
      alreadyHaveAccount: 'Already have an account?',
      loginLink: 'Sign In Instead'
    },
    policies: {
      title: 'Mandir Policies',
      refundTitle: 'Return & Refund Policy',
      privacyTitle: 'Privacy Policy',
      disclaimerTitle: 'Disclaimer'
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
      signupMessage: 'Join our mandir community',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      usernamePlaceholder: 'Choose a username',
      passwordRequirements: 'Password must be at least 8 characters',
      submitInfo: 'By creating an account, you agree to our Terms and Privacy Policy'
    },
    poshakSeva: {
      title: 'Poshak Seva',
      description: 'Poshak Seva is one of the most sacred and heartfelt offerings a devotee can make at Shri Lakshmi Narsingh Mandir, Hasampur.',
      whyImportant: 'Why Poshak Seva is Important:',
      reasons: 'Offering new garments to the deity is a time-honored tradition that signifies respect, devotion, and reverence, It is believed that Poshak Seva helps in fulfilling wishes, removing obstacles, and bringing divine blessings, Devotees perform this seva to mark special occasions in their lives, such as birthdays, anniversaries, or spiritual milestones, Bhagwan Narsingh is known as the divine protector. Offering poshak is a way to seek his blessings for strength, courage, and protection from all forms of negativity, Performing this seva not only pleases the deity but also purifies the heart of the devotee and strengthens the connection between the soul and the divine',
      bookTitle: 'Book Poshak Seva',
      formLabels: {
        fullName: 'Full Name',
        email: 'Email Address',
        mobile: 'Mobile Number',
        date: 'Date of Seva',
        poshakType: 'Type of Poshak',
        occasion: 'Occasion (Optional)',
        notes: 'Additional Notes (Optional)'
      },
      submitButton: 'Book Poshak Seva',
      submitting: 'Submitting...',
      successTitle: 'Booking Successful',
      successMessage: 'Thank you for booking the Poshak Seva. The Shri Narsingh Mandir Committee, Hasampur will contact you soon regarding further details and confirmation.',
      blessing: 'May Bhagwan Narsingh bless you and your family with divine grace.'
    },
    jhanki: {
      title: 'Jhanki Stories',
      columnHeaders: {
        sno: 'S.No',
        name: 'Jhanki Name',
        story: 'Story'
      }
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
      donate: 'दान करें',
      policies: 'मंदिर नीतियां',
      poshakSeva: 'पोशाक सेवा'
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
      thankYou: 'आपके ₹{amount} के उदार दान के लिए धन्यवाद। आपके योगदान की बहुत सराहना की जाती है।',
      receipt: 'दान रसीद',
      receiptSent: 'एक रसीद {email} पर भेज दी गई है',
      emailReceipt: 'रसीद के लिए ईमेल',
      scanQR: '₹{amount} का दान करने के लिए किसी भी यूपीआई ऐप से स्कैन करें'
    },
    hero: {
      welcome: "आपका स्वागत है",
      temple: "श्री नृसिंह मंदिर",
      subtitle: "आध्यात्मिक संबंध के लिए एक पवित्र स्थान",
      viewDarshan: "दर्शन करें",
      templeTimings: "मंदिर समय",
      aarti: "आरती"
    },
    login: {
      title: 'प्रवेश करें',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      forgotPassword: 'पासवर्ड भूल गए?',
      loginButton: 'प्रवेश करें',
      loggingIn: 'प्रवेश हो रहा है...',
      noAccount: 'खाता नहीं है?',
      createAccount: 'नया खाता बनाएं'
    },
    signup: {
      title: 'नया खाता बनाएं',
      username: 'आपका नाम',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      passwordRequirements: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए',
      signupButton: 'खाता बनाएं',
      signingUp: 'खाता बन रहा है...',
      alreadyHaveAccount: 'पहले से ही खाता है?',
      loginLink: 'प्रवेश करें'
    },
    policies: {
      title: 'मंदिर नीतियां',
      refundTitle: 'वापसी और धनवापसी नीति',
      privacyTitle: 'गोपनीयता नीति',
      disclaimerTitle: 'अस्वीकरण'
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
    poshakSeva: {
      title: 'पोशाक सेवा',
      description: 'पोशाक सेवा श्री लक्ष्मी नरसिंह मंदिर, हसमपुर में एक भक्त द्वारा किया जा सकने वाला सबसे पवित्र और हृदयस्पर्शी चढ़ावा है।',
      whyImportant: 'पोशाक सेवा क्यों महत्वपूर्ण है:',
      reasons: 'देवता को नए वस्त्र अर्पित करना एक समय-सम्मानित परंपरा है जो सम्मान, भक्ति और श्रद्धा का प्रतीक है, यह माना जाता है कि पोशाक सेवा इच्छाओं को पूरा करने, बाधाओं को दूर करने और दिव्य आशीर्वाद लाने में मदद करती है, भक्त अपने जीवन के विशेष अवसरों, जैसे जन्मदिन, वर्षगांठ, या आध्यात्मिक मील के पत्थर पर यह सेवा करते हैं, भगवान नरसिंह को दिव्य रक्षक के रूप में जाना जाता है। पोशाक चढ़ाना शक्ति, साहस और सभी प्रकार की नकारात्मकता से सुरक्षा के लिए उनका आशीर्वाद लेने का एक तरीका है, इस सेवा को करने से न केवल देवता प्रसन्न होते हैं बल्कि भक्त का हृदय भी शुद्ध होता है और आत्मा और दिव्य के बीच संबंध मजबूत होता है',
      bookTitle: 'पोशाक सेवा बुक करें',
      formLabels: {
        fullName: 'पूरा नाम',
        email: 'ईमेल पता',
        mobile: 'मोबाइल नंबर',
        date: 'सेवा की तिथि',
        poshakType: 'पोशाक का प्रकार',
        occasion: 'अवसर (वैकल्पिक)',
        notes: 'अतिरिक्त नोट्स (वैकल्पिक)'
      },
      submitButton: 'पोशाक सेवा बुक करें',
      submitting: 'प्रस्तुत किया जा रहा है...',
      successTitle: 'बुकिंग सफल',
      successMessage: 'पोशाक सेवा बुक करने के लिए धन्यवाद। श्री नृसिंह मंदिर समिति, हसामपुर आपसे जल्द ही आगे की जानकारी और पुष्टि के संबंध में संपर्क करेगी।',
      blessing: 'भगवान नृसिंह आपको और आपके परिवार को दिव्य कृपा से आशीर्वाद दें।'
    },
    jhanki: {
      title: 'झांकी कथाएं',
      columnHeaders: {
        sno: 'क्र.सं.',
        name: 'झांकी का नाम',
        story: 'कथा'
      }
    }
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('hi'); // Default to Hindi now

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k as keyof typeof value];
    }
    
    if (typeof value !== 'string') return key;
    
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
