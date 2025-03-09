
import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { History, MapPin, Heart, Users } from 'lucide-react';

const AboutSection = () => {
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
      title: "प्राचीन इतिहास",
      description: "200 वर्षों से अधिक पुराना, श्री नरसिंह मंदिर हसमपुर की आध्यात्मिक विरासत का एक महत्वपूर्ण हिस्सा है।"
    },
    {
      icon: <MapPin className="w-10 h-10 text-temple-maroon" />,
      title: "पवित्र स्थान",
      description: "प्राकृतिक सौंदर्य से घिरा हुआ, यह मंदिर शांति और आध्यात्मिकता का केंद्र है।"
    },
    {
      icon: <Heart className="w-10 h-10 text-temple-maroon" />,
      title: "भक्ति का केंद्र",
      description: "हर दिन सैकड़ों भक्त यहां दर्शन और पूजा के लिए आते हैं, जिससे यह स्थान जीवंत हो उठता है।"
    },
    {
      icon: <Users className="w-10 h-10 text-temple-maroon" />,
      title: "सामुदायिक सेवा",
      description: "मंदिर धार्मिक गतिविधियों के अलावा समाज सेवा और सांस्कृतिक कार्यक्रमों का भी आयोजन करता है।"
    }
  ];

  return (
    <section id="about" className="section-container bg-temple-lightgold/30" ref={sectionRef}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-temple-gold font-medium mb-3 opacity-0 animate-on-scroll">हमारे बारे में</p>
        <h2 className="section-heading text-temple-maroon opacity-0 animate-on-scroll">श्री नरसिंह मंदिर हसमपुर</h2>
        <p className="text-lg opacity-0 animate-on-scroll">
          श्री नरसिंह मंदिर हसमपुर भगवान नरसिंह को समर्पित एक प्राचीन मंदिर है, जो भगवान विष्णु के अवतारों में से एक हैं। यह मंदिर अपनी सुंदर वास्तुकला, शांत वातावरण और गहरी आध्यात्मिक परंपराओं के लिए जाना जाता है।
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
            <h3 className="font-serif text-2xl font-bold mb-4 text-temple-maroon">मंदिर का इतिहास</h3>
            <p className="mb-4">
              श्री नरसिंह मंदिर की स्थापना 1820 के दशक में हुई थी। इसका निर्माण स्थानीय राजा द्वारा किया गया था, जो भगवान नरसिंह के अनन्य भक्त थे। वर्षों से, यह मंदिर आस्था और आध्यात्मिकता का केंद्र बन गया है।
            </p>
            <p>
              मंदिर की वास्तुकला उत्तर भारतीय शैली को दर्शाती है, जिसमें नक्काशीदार स्तंभ, विस्तृत मूर्तिकला और सुंदर फ्रेस्को पेंटिंग शामिल हैं। मुख्य मंदिर के अलावा, परिसर में कई छोटे मंदिर और पवित्र कुंड भी हैं।
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
    </section>
  );
};

export default AboutSection;
