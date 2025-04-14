import React, { createContext, useContext, useState, ReactNode } from 'react';

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
      policies: 'Mandir Policies'
    },
    about: {
      narsinghKatha: `The Story of Lord Narsingh Avatar

In Sanatan Dharma, whenever dharma is in decline and adharma rises, Lord Vishnu takes avatar on Earth. His ten principal avatars are known as 'Dashavatar'. Among these, the fourth avatar was Narsingh, which the Lord took to destroy the demon Hiranyakashipu and protect his devotee Prahlad. This avatar was unique as the Lord appeared neither fully human nor fully animal — he manifested as half-lion and half-human.

Long ago, sage Kashyap's wife Diti gave birth to two demon brothers — Hiranyaksha and Hiranyakashipu. Both were extremely powerful and arrogant. They terrorized the devas and spread chaos in the universe. When Hiranyaksha hid the Earth in the cosmic waters, Lord Vishnu took the Varaha avatar and killed him, restoring Earth to its place.

Enraged by his brother's death, Hiranyakashipu vowed revenge against Lord Vishnu. He performed severe penance to please Lord Brahma and asked for a boon that no being could kill him — neither human nor animal; neither by day nor by night; neither inside nor outside; neither in sky nor on earth; and not by any weapon. Lord Brahma granted this boon.

This boon made Hiranyakashipu even more arrogant. He expanded his power across the three worlds and declared himself God. He ordered everyone to worship only him. Anyone who took Lord Vishnu's name was punished.

However, his son Prahlad was a supreme devotee of Lord Vishnu from childhood. He constantly remembered Narayan, sang His glory, and spread the message of devotion. When Hiranyakashipu learned that his own son was disobeying his orders, he became furious.

Hiranyakashipu tried many times to stop Prahlad from worshipping Vishnu, but Prahlad never wavered. Then he tried to kill Prahlad — through poison, by having elephants trample him, by placing him in fire (with Holika), but each time Lord Vishnu protected His devotee. Prahlad survived every attempt.

One day, in anger, Hiranyakashipu asked Prahlad:
"Where is your Vishnu? Is He in this pillar too?"
Prahlad calmly replied:
"Yes, He is everywhere — even in this pillar."

Hiranyakashipu struck the pillar in rage, and at that moment, Lord Vishnu emerged in His Narsingh avatar — half-lion, half-human. This form was neither fully human nor fully animal — thus adhering to Lord Brahma's boon.

As Narsingh, the Lord caught Hiranyakashipu at the threshold of his palace — neither inside nor outside. It was twilight — neither day nor night. He placed him on His thighs — neither earth nor sky — and tore him apart with His nails — neither weapon nor projectile. Thus, every condition of the boon was fulfilled in Hiranyakashipu's death.

Afterward, Lord Narsingh became extremely fierce. No deity could calm Him. Then His supreme devotee Prahlad approached His feet and humbly prayed. Pleased by his devotion, Lord Narsingh became peaceful and blessed Prahlad.

Thus ended the evil Hiranyakashipu and triumphed devotee Prahlad. This story teaches us that devotion has power. The Lord Himself protects His true devotees, no matter how difficult the circumstances. Pride, tyranny, and adharma must end — and dharma, truth, and devotion always triumph.`
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
      policies: 'मंदिर नीतियां'
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
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Fix: Initialize with a typed value instead of just string
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

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
