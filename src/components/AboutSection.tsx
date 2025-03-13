
import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { History, MapPin, Heart, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const childElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    childElements?.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      childElements?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const features = [
    {
      icon: <History className="w-10 h-10 text-temple-maroon" />,
      title: language === 'en' ? "Ancient History" : "प्राचीन इतिहास",
      description: language === 'en' 
        ? "Over 200 years old, Shri Narsingh Temple is an important part of Hasampur's spiritual heritage."
        : "200 वर्षों से अधिक पुराना, श्री नरसिंह मंदिर हसमपुर की आध्यात्मिक विरासत का एक महत्वपूर्ण हिस्सा है।"
    },
    {
      icon: <MapPin className="w-10 h-10 text-temple-maroon" />,
      title: language === 'en' ? "Sacred Location" : "पवित्र स्थान",
      description: language === 'en'
        ? "Surrounded by natural beauty, this temple is a center of peace and spirituality."
        : "प्राकृतिक सौंदर्य से घिरा हुआ, यह मंदिर शांति और आध्यात्मिकता का केंद्र है।"
    },
    {
      icon: <Heart className="w-10 h-10 text-temple-maroon" />,
      title: language === 'en' ? "Center of Devotion" : "भक्ति का केंद्र",
      description: language === 'en'
        ? "Hundreds of devotees visit daily for darshan and worship, bringing the place to life."
        : "हर दिन सैकड़ों भक्त यहां दर्शन और पूजा के लिए आते हैं, जिससे यह स्थान जीवंत हो उठता है।"
    },
    {
      icon: <Users className="w-10 h-10 text-temple-maroon" />,
      title: language === 'en' ? "Community Service" : "सामुदायिक सेवा",
      description: language === 'en'
        ? "Besides religious activities, the temple organizes social service and cultural events."
        : "मंदिर धार्मिक गतिविधियों के अलावा समाज सेवा और सांस्कृतिक कार्यक्रमों का भी आयोजन करता है।"
    }
  ];

  return (
    <section id="about" className="section-container bg-temple-lightgold/30" ref={sectionRef}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-temple-gold font-medium mb-3 opacity-0 animate-on-scroll">
          {language === 'en' ? 'About Us' : 'हमारे बारे में'}
        </p>
        <h2 className="section-heading text-temple-maroon opacity-0 animate-on-scroll">
          {language === 'en' ? 'Shri Narsingh Temple Hasampur' : 'श्री नरसिंह मंदिर हसमपुर'}
        </h2>
        <p className="text-lg opacity-0 animate-on-scroll">
          {language === 'en' 
            ? 'Shri Narsingh Temple in Hasampur is an ancient temple dedicated to Lord Narasimha, one of the incarnations of Lord Vishnu. The temple is known for its beautiful architecture, serene atmosphere, and deep spiritual traditions.'
            : 'श्री नरसिंह मंदिर हसमपुर भगवान नरसिंह को समर्पित एक प्राचीन मंदिर है, जो भगवान विष्णु के अवतारों में से एक हैं। यह मंदिर अपनी सुंदर वास्तुकला, शांत वातावरण और गहरी आध्यात्मिक परंपराओं के लिए जाना जाता है।'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="glass-card border-temple-gold/20 opacity-0 animate-on-scroll">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-temple-gold/10 rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-2 text-temple-maroon">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-temple-gold/20 shadow-xl opacity-0 animate-on-scroll">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <h3 className="font-serif text-2xl font-bold mb-4 text-temple-maroon">
              {language === 'en' ? 'Temple History' : 'मंदिर का इतिहास'}
            </h3>
            {language === 'en' ? (
              <>
                <p className="mb-4">
                  Bhakt Shiromani Gopalak Tyagamurti Shri Shri 1008 Shri Swami Vishnudas Ji Maharaj, the founder of Hasampur Peeth, was born in Samvat 1444 (1444).
                </p>
                <p className="mb-4">
                  According to the legend, a lion attacked a cow. To protect the frightened cow, Swami Ji presented himself before the lion.
                </p>
                <p className="mb-4">
                  Moved by his unwavering devotion, immense sacrifice, and sincere love, Lord Narasimha appeared with a lion's roar and commanded him to remove himself from under a heavy stone. The stone moved at Swami Ji's touch, and Lord Narasimha's Shaligram idol form appeared with the sounds of jhalar, conch, bell, and gong.
                </p>
                <p className="mb-4">
                  In service to this divine idol, Swami Ji's son Shri Shri 1008 Shri Gangadas Ji Maharaj was born in Samvat 1476. Like his father, through immense devotion, sacrifice, austerity, and complete surrender to divine love, he spread the temple's glory in all ten directions.
                </p>
                <p>
                  The temple's architecture reflects the North Indian style, featuring ornate pillars, elaborate sculptures, and beautiful fresco paintings. Besides the main temple, the complex also houses several small temples and sacred wells.
                </p>
              </>
            ) : (
              <>
                <p className="mb-4">
                  भक्त शिरोमणि गौपालक त्यागमूर्ति श्री श्री १००८ श्री स्वामी विष्णुदास जी महाराज, हसामपुर पीठ के संस्थापक, का जन्म संवत १४४४(1444) में हुआ।
                </p>
                <p className="mb-4">
                  प्राकट्य प्रसंग में से सुनी हुई कथानुसार सिंह ने गऊ पर आक्रमण किया। भयभीत गऊ की रक्षार्थ स्वामी जी ने स्वंय को सिंह के सम्मुख प्रस्तुत किया।
                </p>
                <p className="mb-4">
                  आपकी अनन्य भक्ति असीम त्याग एवं निश्छल प्रेम समर्पण और सेवा से द्रवीभूत होकर नृसिंह भगवान ने सिंह गर्जना करते हुए दर्शन दिये और स्वंय को भारी भरकम शिला के नीचे से निकालने का आदेश किया। जो स्वामी जी के स्पर्श मात्र से सरक गई और श्री नृसिंह भगवान की शालिग्राम मूर्ति रूप का झालर शंख, घंटा, घडियाल की ध्वनि के साथ प्राकट्य हुआ।
                </p>
                <p className="mb-4">
                  इस अलौकिक मूर्ति की सेवा स्वरुप स्वामी जी के पुत्र श्री श्री १००८ श्री गंगादास जी महाराज का जन्म संवत् १४७६ में हुआ। जिन्होंने अपने पिता की भांति ही असीम भक्ति त्याग, तपस्या एवं सम्पूर्ण समर्पित प्रभु प्रेम के चल पर मंदिर की कीर्ति को दसों दिशाओं में विजयमान किया।
                </p>
                <p>
                  मंदिर की वास्तुकला उत्तर भारतीय शैली को दर्शाती है, जिसमें नक्काशीदार स्तंभ, विस्तृत मूर्तिकला और सुंदर फ्रेस्को पेंटिंग शामिल हैं। मुख्य मंदिर के अलावा, परिसर में कई छोटे मंदिर और पवित्र कुंड भी हैं।
                </p>
              </>
            )}
          </div>
          <div className="md:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="Temple History" 
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16 bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-temple-gold/20 shadow-xl opacity-0 animate-on-scroll">
        <div className="mb-6 text-center">
          <h3 className="font-serif text-2xl font-bold mb-2 text-temple-maroon">
            {language === 'en' ? 'Location' : 'स्थान'}
          </h3>
          <p className="text-gray-700 mb-6">
            {language === 'en'
              ? 'Find directions to Shri Narsingh Temple, Hasampur, Rajasthan, India'
              : 'श्री नरसिंह मंदिर, हसमपुर, राजस्थान, भारत तक पहुंचने का मार्ग'}
          </p>
        </div>

        <div className="rounded-lg overflow-hidden h-80 bg-gray-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.6839773988823!2d77.45014591493774!3d28.760255482371196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf41afb11a607%3A0x97c2713eff3d574e!2sShree%20Narsingh%20Temple!5e0!3m2!1sen!2sin!4v1693996060311!5m2!1sen!2sin"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title={language === 'en' ? "Location of Shri Narsingh Temple Hasampur" : "श्री नरसिंह मंदिर हसमपुर का स्थान"}
            className="w-full h-full"
          ></iframe>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-temple-maroon mb-2">
              {language === 'en' ? 'Address:' : 'पता:'}
            </h4>
            <p>
              {language === 'en' ? 'Shri Narsingh Temple' : 'श्री नरसिंह मंदिर'}
            </p>
            <p>
              {language === 'en' ? 'Hasampur, Rajasthan,' : 'हसमपुर, राजस्थान,'}
            </p>
            <p>
              {language === 'en' ? 'India' : 'भारत'}
            </p>
            
            <p className="mt-4">
              <a 
                href="https://maps.app.goo.gl/NJGWkr84GFpJry7D8"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-temple-gold hover:underline"
              >
                {language === 'en' 
                  ? 'View on Google Maps →'
                  : 'गूगल मैप्स पर देखें →'
                }
              </a>
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-temple-maroon mb-2">
              {language === 'en' ? 'How to Reach:' : 'कैसे पहुंचें:'}
            </h4>
            <p className="mb-2">
              {language === 'en' 
                ? 'Nearest Railway Station: Hasampur Railway Station (2 km)'
                : 'निकटतम रेलवे स्टेशन: हसमपुर रेलवे स्टेशन (2 किमी)'
              }
            </p>
            <p>
              {language === 'en'
                ? 'Nearest Bus Stop: Hasampur Bus Stand (1 km)'
                : 'निकटतम बस स्टॉप: हसमपुर बस स्टैंड (1 किमी)'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
