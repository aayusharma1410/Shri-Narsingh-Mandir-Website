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
        ? "Over 565 years old, Shri Narsingh Temple is an important part of Hasampur's spiritual heritage."
        : "565 वर्षों से अधिक पुराना, श्री नरसिंह मंदिर हसमपुर की आध्यात्मिक विरासत का एक महत्वपूर्ण हिस्सा है।"
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
      title: language === 'en' ? "Priest Family" : "पूजारी परिवार",
      description: language === 'en'
        ? "The priest family, descendants of Shri Shri 1008 Vishnu Das Ji Maharaj, Narhiya Swami, is the priest and personal servant of Shri Narsingh Bhagwan here."
        : "श्री श्री 1008 विष्णु दास जी महाराज के वंशज नरहिया स्वामी यहां श्री नरसिंह भगवान के पुजारी एवं निज अंग सेवक हैं।"
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

      {/* Narsingh Avatar Story Section */}
      <div className="mt-16 bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-temple-gold/20 shadow-xl opacity-0 animate-on-scroll">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full">
            <h3 className="font-serif text-2xl font-bold mb-4 text-temple-maroon text-center">
              नृसिंह अवतार की विस्तृत कथा
            </h3>
            <div className="prose prose-lg max-w-none">
              <p className="mb-4">
                सनातन धर्म में जब-जब अधर्म बढ़ता है और धर्म संकट में पड़ता है, तब-तब भगवान विष्णु पृथ्वी पर अवतार लेते हैं। उनके दस प्रमुख अवतारों को 'दशावतार' कहा गया है। इन अवतारों में से चौथा अवतार था नृसिंह अवतार, जो भगवान ने अधर्मी राक्षस हिरण्यकश्यप का संहार करने और अपने परम भक्त प्रह्लाद की रक्षा हेतु धारण किया था।
              </p>
              <p className="mb-4">
                यह अवतार विशेष था क्योंकि इसमें भगवान न तो पूर्ण रूप से मनुष्य था, न पूर्ण रूप से पशु — वह आधे सिंह और आधे मनुष्य के रूप में प्रकट हुए।
              </p>
              <p className="mb-4">
                बहुत प्राचीन समय की बात है। कश्यप ऋषि की पत्नी दिति से दो असुर पुत्र उत्पन्न हुए — हिरण्याक्ष और हिरण्यकश्यप। दोनों भाई अत्यंत बलशाली और घमंडी थे। उन्होंने देवताओं पर अत्याचार करना शुरू किया और ब्रह्मांड में आतंक फैलाया।
              </p>
              <p className="mb-4">
                जब हिरण्याक्ष ने पृथ्वी को रसातल में ले जाकर छुपा दिया, तब भगवान विष्णु ने वराह अवतार लेकर उसका वध किया और पृथ्वी को पुनः ऊपर लाए।
              </p>
              <p className="mb-4">
                अपने भाई की मृत्यु से क्रोधित होकर हिरण्यकश्यप ने भगवान विष्णु से बदला लेने का निश्चय किया। उसने कठोर तपस्या कर ब्रह्मा जी को प्रसन्न किया और उनसे वरदान माँगा कि उसे कोई भी प्राणी मार न सके — न मानव, न पशु; न दिन में, न रात में; न घर के भीतर, न बाहर; न आकाश में, न पृथ��वी पर; और न ही किसी शस्त्र से उसकी मृत्यु हो। ब्रह्मा जी ने यह वरदान दे दिया।
              </p>
              <p className="mb-4">
                इस वरदान के कारण हिरण्यकश्यप का घमंड और अधिक बढ़ गया। उसने तीनों लोकों में अपनी शक्ति का विस्तार किया और स्वयं को भगवान घोषित कर दिया। उसने आदेश दिया कि सभी लोग सिर्फ उसकी पूजा करें। जो भी भगवान विष्णु का नाम लेता, उसे दंडित किया जाता।
              </p>
              <p className="mb-4">
                परंतु उसका पुत्र प्रह्लाद, बचपन से ही भगवान विष्णु का परम भक्त था। वह हर समय नारायण का स्मरण करता, भगवान की महिमा गाता और सभी को भक्ति का संदेश देता।
              </p>
              <p className="mb-4">
                जब हिरण्यकश्यप को यह ज्ञात हुआ कि उसका स्वयं का पुत्र ही उसकी आज्ञा का उल्लंघन कर रहा है, तो वह अत्यंत क्रोधित हो उठा।
              </p>
              <p className="mb-4">
                हिरण्यकश्यप ने प्रह्लाद को विष्णु भक्ति से रोकने की कई बार कोशिश की, लेकिन प्रह्लाद कभी डिगा नहीं। तब हिरण्यकश्यप ने उसे मारने के कई प्रयास किए — कभी उसे विष पिलाया गया, कभी हाथियों के सामने डाला गया, कभी आग में बैठाया गया (जिसमें होलिका भी थी), परंतु हर बार भगवान विष्णु ने अपने भक्त की रक्षा की। प्रह्लाद हर बार बचता गया।
              </p>
              <p className="mb-4">
                एक दिन हिरण्यकश्यप ने क्रोध में आकर प्रह्लाद से पूछा —<br/>
                "कहाँ है तेरा विष्णु? क्या वह इस खंभे में भी है?"<br/>
                प्रह्लाद ने शांत स्वर में उत्तर दिया —<br/>
                "हाँ, वह हर जगह है — इस खंभे में भी।"
              </p>
              <p className="mb-4">
                हिरण्यकश्यप ने आवेश में आकर खंभे को तोड़ डाला, और उसी क्षण उस खंभे से एक अद्भुत और भयानक रूप प्रकट हुआ — भगवान विष्णु का नृसिंह अवतार।
              </p>
              <p className="mb-4">
                यह रूप आधा सिंह और आधा मनुष्य का था। यह अवतार ना पूर्ण रूप से मनुष्य था, न पूर्ण ���ूप से पशु — इस प्रकार ब्रह्मा जी के वरदान का पालन भी हुआ।
              </p>
              <p className="mb-4">
                नृसिंह रूप में भगवान ने हिरण्यकश्यप को उसके महल के द्वार की चौखट पर पकड़ लिया — जो न घर के अंदर था, न बाहर। वह समय संध्या का था — न दिन, न रात। भगवान ने उसे अपनी जंघा पर रखकर — जो न धरती थी, न आकाश — अपने नखों से उसका वध कर दिया — जो न कोई शस्त्र थे, न अस्त्र।
              </p>
              <p className="mb-4">
                इस प्रकार हर एक शर्त के अनुरूप ही हिरण्यकश्यप का संहार किया गया।
              </p>
              <p className="mb-4">
                उसके बाद भगवान नृसिंह अत्यंत उग्र हो गए। कोई भी देवता उन्हें शांत नहीं कर पाया। तब उनका परम भक्त प्रह्लाद उनके चरणों में आया, और विनम्रता से प्रार्थना की। उसकी भक्ति से प्रसन्न होकर भगवान नृसिंह शांत हुए और प्रह्लाद को आशीर्वाद दिया।
              </p>
              <p>
                इस प्रकार अधर्मी हिरण्यकश्यप का अंत हुआ और भक्त प्रह्लाद की विजय। यह कथा हमें सिखाती है कि भक्ति में शक्ति होती है। सच्चे श्रद्धालु की रक्षा स्वयं भगवान करते हैं, चाहे परिस्थिति कितनी भी कठिन क्यों न हो। अहंकार, अत्याचार और अधर्म का अंत निश्चित है — और धर्म, सत्य और भक्ति की सदा विजय होती है।
              </p>
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
                ? 'Nearest Railway Station: Neem Ka Thana Railway Station (30 km)'
                : 'निकटतम रेलवे स्टेशन: नीम का थाना रेलवे स्टेशन (30 किमी)'
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
