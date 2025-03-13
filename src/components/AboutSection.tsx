
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
            <p className="mb-4">
              {language === 'en'
                ? 'Shri Narsingh Temple was established in the 1820s. It was built by the local king, who was a devoted follower of Lord Narasimha. Over the years, this temple has become a center of faith and spirituality.'
                : 'श्री नरसिंह मंदिर की स्थापना 1820 के दशक में हुई थी। इसका निर्माण स्थानीय राजा द्वारा किया गया था, जो भगवान नरसिंह के अनन्य भक्त थे। वर्षों से, यह मंदिर आस्था और आध्यात्मिकता का केंद्र बन गया है।'}
            </p>
            <p>
              {language === 'en'
                ? 'The temple\'s architecture reflects the North Indian style, featuring ornate pillars, elaborate sculptures, and beautiful fresco paintings. Besides the main temple, the complex also houses several small temples and sacred wells.'
                : 'मंदिर की वास्तुकला उत्तर भारतीय शैली को दर्शाती है, जिसमें नक्काशीदार स्तंभ, विस्तृत मूर्तिकला और सुंदर फ्रेस्को पेंटिंग शामिल हैं। मुख्य मंदिर के अलावा, परिसर में कई छोटे मंदिर और पवित्र कुंड भी हैं।'}
            </p>
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

      {/* Map Section (moved from TimingsSection) */}
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
