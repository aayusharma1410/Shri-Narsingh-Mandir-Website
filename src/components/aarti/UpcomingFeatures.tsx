
import { Calendar, Share2, Bell, Cast } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const UpcomingFeatures = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-temple-gold" />,
      title: language === 'en' ? "Aarti Calendar" : "आरती कैलेंडर",
      description: language === 'en' 
        ? "Set reminders for special aarti ceremonies on festival days."
        : "त्योहारों के दिनों पर विशेष आरती समारोहों के लिए रिमाइंडर सेट करें।",
    },
    {
      icon: <Share2 className="w-6 h-6 text-temple-gold" />,
      title: language === 'en' ? "Share Live Aarti" : "लाइव आरती शेयर करें",
      description: language === 'en'
        ? "Share live aarti with friends and family via social media."
        : "सोशल मीडिया के माध्यम से दोस्तों और परिवार के साथ लाइव आरती शेयर करें।",
    },
    {
      icon: <Bell className="w-6 h-6 text-temple-gold" />,
      title: language === 'en' ? "Notifications" : "सूचनाएं",
      description: language === 'en'
        ? "Get notifications before aarti begins so you never miss it."
        : "आरती शुरू होने से पहले सूचनाएं प्राप्त करें ताकि आप कभी इसे न चूकें।",
    },
    {
      icon: <Cast className="w-6 h-6 text-temple-gold" />,
      title: language === 'en' ? "Multi-Device Casting" : "मल्टी-डिवाइस कास्टिंग",
      description: language === 'en'
        ? "Cast aarti to your TV or other devices for a better viewing experience."
        : "बेहतर देखने के अनुभव के लिए आरती को अपने टीवी या अन्य उपकरणों पर कास्ट करें।",
    }
  ];

  return (
    <div className="mt-16 mb-12">
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl font-bold text-temple-maroon">
          {language === 'en' ? 'Upcoming Features' : 'आने वाली सुविधाएँ'}
        </h3>
        <p className="text-gray-600 mt-2">
          {language === 'en' 
            ? 'New features that will enhance your spiritual experience' 
            : 'नई सुविधाएँ जो आपके आध्यात्मिक अनुभव को बढ़ाएँगी'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl p-6 border border-temple-gold/20 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-temple-lightgold/30 p-3 rounded-full mb-4">
                {feature.icon}
              </div>
              <h4 className="font-serif text-lg font-semibold mb-2 text-temple-maroon">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                {feature.description}
              </p>
              <span className="inline-block px-3 py-1 bg-temple-gold/10 text-temple-gold text-xs font-medium rounded-full">
                {language === 'en' ? 'Coming Soon' : 'जल्द आ रहा है'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingFeatures;
