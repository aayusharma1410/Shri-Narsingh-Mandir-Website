
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation object
const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.liveAarti': 'Live Aarti',
    'nav.gallery': 'Gallery',
    'nav.timings': 'Timings',
    'nav.login': 'Login',
    
    // Hero
    'hero.welcome': 'Welcome',
    'hero.temple': 'Shri Narsingh Temple',
    'hero.subtitle': 'Ancient Temple of Hasampur',
    'hero.viewDarshan': 'Today\'s Darshan',
    'hero.templeTimings': 'Temple Timings',
    'hero.scrollDown': 'Scroll Down',
    
    // About
    'about.title': 'About Us',
    'about.heading': 'Shri Narsingh Temple Hasampur',
    'about.description': 'Shri Narsingh Temple Hasampur is an ancient temple dedicated to Lord Narsingh, who is one of the avatars of Lord Vishnu. This temple is known for its beautiful architecture, peaceful atmosphere and deep spiritual traditions.',
    'about.history': 'Temple History',
    'about.historyText1': 'Shri Narsingh Temple was established in the 1820s. It was built by the local king, who was a devout follower of Lord Narsingh. Over the years, this temple has become a center of faith and spirituality.',
    'about.historyText2': 'The architecture of the temple reflects the North Indian style, featuring carved pillars, extensive sculptures, and beautiful fresco paintings. In addition to the main temple, the complex also has several small temples and sacred pools.',
    
    // Features
    'feature.ancientHistory': 'Ancient History',
    'feature.ancientHistoryDesc': 'More than 200 years old, Shri Narsingh Temple is an important part of Hasampur\'s spiritual heritage.',
    'feature.sacredPlace': 'Sacred Place',
    'feature.sacredPlaceDesc': 'Surrounded by natural beauty, this temple is a center of peace and spirituality.',
    'feature.devotionCenter': 'Center of Devotion',
    'feature.devotionCenterDesc': 'Hundreds of devotees come here every day for darshan and worship, bringing the place to life.',
    'feature.communityService': 'Community Service',
    'feature.communityServiceDesc': 'The temple organizes social service and cultural events besides religious activities.',
    
    // Live Aarti
    'liveAarti.title': 'Aarti Darshan',
    'liveAarti.heading': 'Live Aarti',
    'liveAarti.description': 'Watch the live broadcast of aarti held every morning and evening and get a spiritual experience sitting at home.',
    'liveAarti.live': 'Live',
    'liveAarti.next': 'Next: ',
    'liveAarti.inProgress': 'Aarti in Progress',
    'liveAarti.starting': 'Next Aarti Starting Soon',
    'liveAarti.schedule': 'Aarti Schedule',
    'liveAarti.morning': 'Morning Aarti',
    'liveAarti.noon': 'Noon Aarti',
    'liveAarti.evening': 'Evening Aarti',
    'liveAarti.night': 'Night Aarti',
    'liveAarti.nextAarti': 'Next Aarti',
    'liveAarti.setReminder': 'Set Reminder',
    
    // Gallery
    'gallery.title': 'Our Gallery',
    'gallery.heading': 'Temple Gallery',
    'gallery.description': 'See the beautiful images of Shri Narsingh Temple and its spiritual environment.',
    
    // Timings
    'timings.title': 'Darshan Timings',
    'timings.heading': 'Temple Timings',
    'timings.description': 'Get information about darshan and puja timings of Shri Narsingh Temple.',
    'timings.regularTimings': 'Regular Darshan Timings',
    'timings.day': 'Day',
    'timings.morning': 'Morning',
    'timings.evening': 'Evening',
    'timings.mondayToSaturday': 'Monday to Saturday',
    'timings.sundayAndHolidays': 'Sunday and Holidays',
    'timings.specialDays': 'Special Day Timings',
    'timings.howToReach': 'How to Reach',
    'timings.address': 'Address:',
    'timings.temple': 'Shri Narsingh Temple',
    'timings.village': 'Hasampur Village,',
    'timings.state': 'Uttar Pradesh, India',
    'timings.nearestRailway': 'Nearest Railway Station:',
    'timings.railwayDesc': 'Hasampur Railway Station (2 km)',
    'timings.nearestBus': 'Nearest Bus Stop:',
    'timings.busDesc': 'Hasampur Bus Stand (1 km)',
    'timings.upcomingFestivals': 'Upcoming Festivals',
    'timings.aartiTimings': 'Aarti Timings',
    'timings.contactDetails': 'Contact Details',
    'timings.phone': 'Phone:',
    'timings.email': 'Email:',
    
    // Footer
    'footer.about': 'Shri Narsingh Temple is an ancient temple more than 200 years old dedicated to Lord Narsingh in Hasampur.',
    'footer.supportedBy': 'Operated with your support',
    'footer.contactUs': 'Contact Us',
    'footer.quickLinks': 'Quick Links',
    'footer.getUpdates': 'Get Updates',
    'footer.emailPrompt': 'Enter your email below to receive the latest information about temple festivals and activities.',
    'footer.yourEmail': 'Your Email',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved.',
    
    // Login
    'login.title': 'Login to Shri Narsingh Temple',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.loginButton': 'Login',
    'login.loggingIn': 'Logging in...',
    'login.forgotPassword': 'Forgot password?',
    'login.noAccount': 'Don\'t have an account?',
    'login.createAccount': 'Create Account',
    
    // Signup
    'signup.title': 'Create Your Account',
    'signup.username': 'Username',
    'signup.email': 'Email Address',
    'signup.password': 'Password',
    'signup.confirmPassword': 'Confirm Password',
    'signup.signupButton': 'Sign Up',
    'signup.signingUp': 'Creating account...',
    'signup.alreadyHaveAccount': 'Already have an account?',
    'signup.loginLink': 'Login',
    'signup.passwordRequirements': 'Password must be at least 6 characters',
  },
  hi: {
    // Navbar
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.liveAarti': 'लाइव आरती',
    'nav.gallery': 'गैलरी',
    'nav.timings': 'समय',
    'nav.login': 'लॉगिन',
    
    // Hero
    'hero.welcome': 'पधारो म्हारे देश',
    'hero.temple': 'श्री नरसिंह मंदिर',
    'hero.subtitle': 'हसमपुर का प्राचीन मंदिर',
    'hero.viewDarshan': 'आज के दर्शन',
    'hero.templeTimings': 'मंदिर समय',
    'hero.scrollDown': 'नीचे स्क्रॉल करें',
    
    // About
    'about.title': 'हमारे बारे में',
    'about.heading': 'श्री नरसिंह मंदिर हसमपुर',
    'about.description': 'श्री नरसिंह मंदिर हसमपुर भगवान नरसिंह को समर्पित एक प्राचीन मंदिर है, जो भगवान विष्णु के अवतारों में से एक हैं। यह मंदिर अपनी सुंदर वास्तुकला, शांत वातावरण और गहरी आध्यात्मिक परंपराओं के लिए जाना जाता है।',
    'about.history': 'मंदिर का इतिहास',
    'about.historyText1': 'श्री नरसिंह मंदिर की स्थापना 1820 के दशक में हुई थी। इसका निर्माण स्थानीय राजा द्वारा किया गया था, जो भगवान नरसिंह के अनन्य भक्त थे। वर्षों से, यह मंदिर आस्था और आध्यात्मिकता का केंद्र बन गया है।',
    'about.historyText2': 'मंदिर की वास्तुकला उत्तर भारतीय शैली को दर्शाती है, जिसमें नक्काशीदार स्तंभ, विस्तृत मूर्तिकला और सुंदर फ्रेस्को पेंटिंग शामिल हैं। मुख्य मंदिर के अलावा, परिसर में कई छोटे मंदिर और पवित्र कुंड भी हैं।',
    
    // Features
    'feature.ancientHistory': 'प्राचीन इतिहास',
    'feature.ancientHistoryDesc': '200 वर्षों से अधिक पुराना, श्री नरसिंह मंदिर हसमपुर की आध्यात्मिक विरासत का एक महत्वपूर्ण हिस्सा है।',
    'feature.sacredPlace': 'पवित्र स्थान',
    'feature.sacredPlaceDesc': 'प्राकृतिक सौंदर्य से घिरा हुआ, यह मंदिर शांति और आध्यात्मिकता का केंद्र है।',
    'feature.devotionCenter': 'भक्ति का केंद्र',
    'feature.devotionCenterDesc': 'हर दिन सैकड़ों भक्त यहां दर्शन और पूजा के लिए आते हैं, जिससे यह स्थान जीवंत हो उठता है।',
    'feature.communityService': 'सामुदायिक सेवा',
    'feature.communityServiceDesc': 'मंदिर धार्मिक गतिविधियों के अलावा समाज सेवा और सांस्कृतिक कार्यक्रमों का भी आयोजन करता है।',
    
    // Live Aarti
    'liveAarti.title': 'आरती दर्शन',
    'liveAarti.heading': 'लाइव आरती',
    'liveAarti.description': 'हर दिन सुबह और शाम को होने वाली आरती का सीधा प्रसारण देखें और घर बैठे आध्यात्मिक अनुभव प्राप्त करें।',
    'liveAarti.live': 'लाइव',
    'liveAarti.next': 'अगला: ',
    'liveAarti.inProgress': 'आरती चल रही है',
    'liveAarti.starting': 'अगली आरती जल्द ही शुरू होगी',
    'liveAarti.schedule': 'आरती समय सूची',
    'liveAarti.morning': 'प्रातः आरती',
    'liveAarti.noon': 'मध्याह्न आरती',
    'liveAarti.evening': 'संध्या आरती',
    'liveAarti.night': 'शयन आरती',
    'liveAarti.nextAarti': 'अगली आरती',
    'liveAarti.setReminder': 'अनुस्मारक सेट करें',
    
    // Gallery
    'gallery.title': 'हमारी गैलरी',
    'gallery.heading': 'मंदिर गैलरी',
    'gallery.description': 'श्री नरसिंह मंदिर और इसके आध्यात्मिक वातावरण की सुंदर छवियां देखें।',
    
    // Timings
    'timings.title': 'दर्शन समय',
    'timings.heading': 'मंदिर समय',
    'timings.description': 'श्री नरसिंह मंदिर के दर्शन और पूजा के समय की जानकारी प्राप्त करें।',
    'timings.regularTimings': 'नियमित दर्शन समय',
    'timings.day': 'दिन',
    'timings.morning': 'सुबह',
    'timings.evening': 'शाम',
    'timings.mondayToSaturday': 'सोमवार से शनिवार',
    'timings.sundayAndHolidays': 'रविवार और छुट्टियां',
    'timings.specialDays': 'विशेष दिनों के समय',
    'timings.howToReach': 'पहुंचने का मार्ग',
    'timings.address': 'पता:',
    'timings.temple': 'श्री नरसिंह मंदिर',
    'timings.village': 'हसमपुर गांव,',
    'timings.state': 'उत्तर प्रदेश, भारत',
    'timings.nearestRailway': 'निकटतम रेलवे स्टेशन:',
    'timings.railwayDesc': 'हसमपुर रेलवे स्टेशन (2 किमी)',
    'timings.nearestBus': 'निकटतम बस स्टॉप:',
    'timings.busDesc': 'हसमपुर बस स्टैंड (1 किमी)',
    'timings.upcomingFestivals': 'आगामी उत्सव',
    'timings.aartiTimings': 'आरती समय',
    'timings.contactDetails': 'संपर्क विवरण',
    'timings.phone': 'फोन:',
    'timings.email': 'ईमेल:',
    
    // Footer
    'footer.about': '200 वर्षों से अधिक पुराना, श्री नरसिंह मंदिर हसमपुर एक प्राचीन मंदिर है जो भगवान नरसिंह को समर्पित है।',
    'footer.supportedBy': 'आपके सहयोग से संचालित',
    'footer.contactUs': 'संपर्क करें',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.getUpdates': 'अपडेट पाएं',
    'footer.emailPrompt': 'मंदिर के उत्सवों और गतिविधियों के बारे में नवीनतम जानकारी प्राप्त करने के लिए नीचे अपना ईमेल दर्ज करें।',
    'footer.yourEmail': 'आपका ईमेल',
    'footer.subscribe': 'सबस्क्राइब',
    'footer.rights': 'सर्वाधिकार सुरक्षित।',
    
    // Login
    'login.title': 'श्री नरसिंह मंदिर में लॉगिन करें',
    'login.email': 'ईमेल',
    'login.password': 'पासवर्ड',
    'login.loginButton': 'लॉगिन',
    'login.loggingIn': 'लॉगिन हो रहा है...',
    'login.forgotPassword': 'पासवर्ड भूल गए?',
    'login.noAccount': 'खाता नहीं है?',
    'login.createAccount': 'खाता बनाएं',
    
    // Signup
    'signup.title': 'अपना खाता बनाएं',
    'signup.username': 'उपयोगकर्ता नाम',
    'signup.email': 'ईमेल पता',
    'signup.password': 'पासवर्ड',
    'signup.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'signup.signupButton': 'साइन अप',
    'signup.signingUp': 'खाता बन रहा है...',
    'signup.alreadyHaveAccount': 'पहले से ही खाता है?',
    'signup.loginLink': 'लॉगिन',
    'signup.passwordRequirements': 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
