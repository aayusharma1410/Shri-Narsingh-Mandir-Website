import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Music, Calendar, Share2, Bell, Cast, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const LiveAarti = () => {
  const { t, language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedAarti, setSelectedAarti] = useState("om-jai-jagdish");
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsLoaded(true);
    
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

  const togglePlay = () => {
    // Open Facebook event link in a new tab
    window.open('https://www.facebook.com/events/695352646486362/', '_blank');
    setIsPlaying(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const nextScheduledTime = new Date();
  nextScheduledTime.setHours(18, 30, 0);
  if (nextScheduledTime < new Date()) {
    nextScheduledTime.setDate(nextScheduledTime.getDate() + 1);
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Upcoming features array
  const upcomingFeatures = [
    {
      icon: <Calendar className="w-6 h-6 text-temple-gold" />,
      title: language === 'en' ? "Aarti Calendar" : "आरती कैलेंडर",
      description: language === 'en' 
        ? "Set reminders for special aarti ceremonies on festival days."
        : "त्योहारों के दिनों पर विशेष आरती समारोहों के लिए रिमाइंडर सेट करें।",
      comingSoon: true
    },
    {
      icon: <Share2 className="w-6 h-6 text-temple-gold" />,
      title: language === 'en' ? "Share Live Aarti" : "लाइव आरती शेयर करें",
      description: language === 'en'
        ? "Share live aarti with friends and family via social media."
        : "सोशल मीडिया के माध्यम से दोस्तों और परिवार के साथ लाइव आरती शेयर करें।",
      comingSoon: true
    },
    {
      icon: <Bell className="w-6 h-6 text-temple-gold" />,
      title: language === 'en' ? "Notifications" : "सूचनाएं",
      description: language === 'en'
        ? "Get notifications before aarti begins so you never miss it."
        : "आरती शुरू होने से पहले सूचनाएं प्राप्त करें ताकि आप कभी इसे न चूकें।",
      comingSoon: true
    },
    {
      icon: <Cast className="w-6 h-6 text-temple-gold" />,
      title: language === 'en' ? "Multi-Device Casting" : "मल्टी-डिवाइस कास्टिंग",
      description: language === 'en'
        ? "Cast aarti to your TV or other devices for a better viewing experience."
        : "बेहतर देखने के अनुभव के लिए आरती को अपने टीवी या अन्य उपकरणों पर कास्ट करें।",
      comingSoon: true
    }
  ];

  return (
    <section 
      id="live-aarti" 
      className="section-container relative bg-gradient-to-b from-temple-cream to-white"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-temple-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-temple-gold/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-temple-gold font-medium mb-3 opacity-0 animate-on-scroll">आरती दर्शन</p>
        <h2 className="section-heading text-temple-maroon opacity-0 animate-on-scroll">
          {language === 'en' ? 'Live Aarti' : 'लाइव आरती'}
        </h2>
        <p className="text-lg opacity-0 animate-on-scroll">
          {language === 'en' 
            ? 'Watch the live broadcast of the aarti performed every morning and evening and experience the spiritual atmosphere from home.'
            : 'हर दिन सुबह और शाम को होने वाली आरती का सीधा प्रसारण देखें और घर बैठे आध्यात्मिक अनुभव प्राप्त करें।'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
        <div className="lg:col-span-2 opacity-0 animate-on-scroll">
          <div className="relative bg-black rounded-xl overflow-hidden shadow-xl">
            {/* Video placeholder */}
            <div className="relative pt-[56.25%] bg-temple-maroon/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-temple-gold/20 flex items-center justify-center animate-pulse">
                    <Facebook className="h-10 w-10 text-temple-gold" />
                  </div>
                  <p className="text-white font-medium">
                    {isPlaying 
                      ? (language === 'en' ? 'Aarti is now live' : 'आरती अभी लाइव है')
                      : (language === 'en' ? 'Next aarti will begin soon' : 'अगली आरती जल्द ही शुरू होगी')}
                  </p>
                  <p className="text-white/70 text-sm mt-2">
                    {language === 'en' 
                      ? 'Click play to watch on Facebook Live' 
                      : 'फेसबुक लाइव पर देखने के लिए प्ले बटन पर क्लिक करें'}
                  </p>
                </div>
              </div>
              
              {/* Video controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          onClick={togglePlay}
                          variant="ghost" 
                          size="icon"
                          className="text-white hover:bg-white/20 relative"
                        >
                          <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                          </div>
                          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {language === 'en' ? 'Watch on Facebook Live' : 'फेसबुक लाइव पर देखें'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <div className="text-white text-sm flex items-center gap-2">
                    {isPlaying 
                      ? <span className="px-2 py-0.5 bg-red-600 rounded-full text-xs font-medium animate-pulse flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-white"></span> 
                          Live
                        </span>
                      : 'Next: ' + formatTime(nextScheduledTime)}
                  </div>
                  
                  <Button 
                    onClick={toggleMute}
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="opacity-0 animate-on-scroll">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-temple-gold/20">
            <h3 className="font-serif text-xl font-bold mb-4 text-temple-maroon">
              {language === 'en' ? 'Aarti Schedule' : 'आरती समय सूची'}
            </h3>
            
            <div className="space-y-4">
              <div className="border-b border-temple-gold/20 pb-3">
                <p className="font-medium">{language === 'en' ? 'Morning Aarti' : 'मंगला आरती'}</p>
                <p className="text-sm text-gray-600">{language === 'en' ? '5:15 AM' : 'सुबह 5:15 बजे'}</p>
              </div>
              
              <div className="border-b border-temple-gold/20 pb-3">
                <p className="font-medium">{language === 'en' ? 'Bhog Aarti' : 'भोग आरती'}</p>
                <p className="text-sm text-gray-600">{language === 'en' ? '11:15 PM' : 'दोपहर 11:15 बजे'}</p>
              </div>
              
              <div className="border-b border-temple-gold/20 pb-3">
                <p className="font-medium">{language === 'en' ? 'Evening Aarti' : 'संध्या आरती'}</p>
                <p className="text-sm text-gray-600">{language === 'en' ? '7:15 PM' : 'शाम 7:15 बजे'}</p>
              </div>
              
              <div>
                <p className="font-medium">{language === 'en' ? 'Shayan Bhog Aarti' : 'शयन भोग आरती'}</p>
                <p className="text-sm text-gray-600">{language === 'en' ? '8:15 PM' : 'रात 8:15 बजे'}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">{language === 'en' ? 'Next Aarti' : 'अगली आरती'}</h4>
              <div className="bg-temple-lightgold rounded-lg p-3">
                <p className="font-medium text-temple-maroon">{formatDate(nextScheduledTime)}</p>
                <p className="text-sm">{formatTime(nextScheduledTime)}</p>
              </div>
            </div>
            
            <Button 
              onClick={togglePlay}
              className="w-full mt-6 bg-temple-gold hover:bg-temple-gold/80 text-white flex items-center justify-center gap-2"
            >
              <Facebook className="h-4 w-4" />
              {language === 'en' ? 'Watch Live on Facebook' : 'फेसबुक पर लाइव देखें'}
            </Button>
          </div>
        </div>
      </div>

      {/* New Upcoming Features Section */}
      <div className="mt-16 mb-12 opacity-0 animate-on-scroll">
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
          {upcomingFeatures.map((feature, index) => (
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
                {feature.comingSoon && (
                  <span className="inline-block px-3 py-1 bg-temple-gold/10 text-temple-gold text-xs font-medium rounded-full">
                    {language === 'en' ? 'Coming Soon' : 'जल्द आ रहा है'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aarti in Written Form - Moved from AboutSection */}
      <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-temple-gold/20 shadow-xl opacity-0 animate-on-scroll">
        <div className="flex items-center mb-6">
          <Music className="w-8 h-8 text-temple-maroon mr-3" />
          <h3 className="font-serif text-2xl font-bold text-temple-maroon">आरती</h3>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-center space-x-4 mb-8">
            <Button 
              variant={selectedAarti === "om-jai-jagdish" ? "default" : "outline"} 
              onClick={() => setSelectedAarti("om-jai-jagdish")}
              className={selectedAarti === "om-jai-jagdish" ? "bg-temple-gold hover:bg-temple-gold/90" : ""}
            >
              ॐ जय जगदीश हरे
            </Button>
            <Button 
              variant={selectedAarti === "narsingh-aarti" ? "default" : "outline"} 
              onClick={() => setSelectedAarti("narsingh-aarti")}
              className={selectedAarti === "narsingh-aarti" ? "bg-temple-gold hover:bg-temple-gold/90" : ""}
            >
              नृसिंह बाबा की आरती
            </Button>
            <Button 
              variant={selectedAarti === "bhog-aarti" ? "default" : "outline"} 
              onClick={() => setSelectedAarti("bhog-aarti")}
              className={selectedAarti === "bhog-aarti" ? "bg-temple-gold hover:bg-temple-gold/90" : ""}
            >
              भोग आरती
            </Button>
          </div>

          {selectedAarti === "om-jai-jagdish" && (
            <div>
              <h4 className="font-serif text-xl font-bold mb-3 text-temple-maroon">आरती - ॐ जय जगदीश हरे</h4>
              <div className="bg-temple-gold/5 p-6 rounded-lg border border-temple-gold/30">
                <p className="mb-2 leading-relaxed text-gray-800">ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे</p>
                <p className="mb-2 leading-relaxed text-gray-800">भक्त जनों के संकट, क्षण में दूर करे</p>
                <p className="mb-2 leading-relaxed text-gray-800">जो ध्यावे फल पावे, दुःख बिनसे मन का</p>
                <p className="mb-2 leading-relaxed text-gray-800">स्वामी दुःख बिनसे मन का</p>
                <p className="mb-2 leading-relaxed text-gray-800">सुख सम्पत्ति घर आवे, कष्ट मिटे तन का ॥ ॐ जय जगदीश हरे।</p>
                <p className="mb-2 leading-relaxed text-gray-800">मात-पिता तुम मेरे, शरण गहूँ में किसकी। स्वार्मी शरण गहूँ मैं किसकी।</p>
                <p className="mb-2 leading-relaxed text-gray-800">तुम बिन और न दूजा, आस करूँ जिसकी ॥ ॐ जय जगदीश हरे ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">तुम पूरण परमात्मा, तुम अन्तर्यामी। स्वामी तुम अन्तर्यामी ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">पारब्रह्म परमेश्वर, तुम सबके स्वामी ॥ ॐ जय जगदीश हरे।</p>
                <p className="mb-2 leading-relaxed text-gray-800">तुम करुणा के सागर, तुम पालन कर्ता । स्वामी तुम पालन-कर्ता ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">में मूरख खल कामी, कृपा करो भर्ता ॥ ॐ जय जगदीश हरे।</p>
                <p className="mb-2 leading-relaxed text-gray-800">तुम हो एक अगोचर, सबके प्राणपति । स्वामी सबके प्राणपति ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">किस विधि मिलूँ दयामय, तुमको मैं कुमति ॥ ॐ जय जगदीश हरे ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">दीनबन्धु दुखहर्ता, तुम ठाकुर मेरे। स्वामी तुम ठाकुर मेरे।</p>
                <p className="mb-2 leading-relaxed text-gray-800">अपने हाथ उठाओ, द्वार पड़ा तेरे ॥ ॐ जय जगदीश हरे ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">विषय-विकार मिटाओ, पाप हरो देवा । स्वभी पाप हरो देवा ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">श्रद्धा-भक्ति बढ़ाओ, सन्तन की सेवा ॥ ॐ जय जगदीश हरे।</p>
                <p className="mb-2 leading-relaxed text-gray-800">श्री लक्ष्मीनृसिंहजी की आरती, जो कोई नर गावे।</p>
                <p className="mb-2 leading-relaxed text-gray-800">स्वामी जो कोई नर गावे ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">कहत शिवानन्द स्वामी, सुख संपत्ति पावे ॥</p>
                <p className="mb-2 leading-relaxed text-gray-800">ॐ जय जगदीश हरे।</p>
                
              </div>
            </div>
          )}
          
          {selectedAarti === "narsingh-aarti" && (
            <div>
              <h4 className="font-serif text-xl font-bold mb-3 text-temple-maroon">श्री लक्ष्मी नृसिंह आरती</h4>
              <div className="bg-temple-gold/5 p-6 rounded-lg border border-temple-gold/30">
                <p className="mb-2 leading-relaxed text-gray-800">आरती नृसिंह बाबाकी उतारो खम्यफटये की।</p>
                <p className="mb-2 leading-relaxed text-gray-800">प्रेम से भक्त प्रहलाद रटा पिता की शक्ति से नड़टां ।।</p>
                <p className="mb-2 leading-relaxed text-gray-800">ध्यान में मग्न राम का शब्द भक्त का मान रखैये की ।। आरती. ।।</p>
                <p className="mb-2 leading-relaxed text-gray-800">खम्व को लाल अगनी कीना, भक्त लेजा लिपटा दीना ।।</p>
                <p className="mb-2 leading-relaxed text-gray-800">लम्ब से निकली गुन्ज भरी असुरणी गर्भ गिरैये की ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">खड़ग को खम्ब पेजा दीनां कहां तेरा राम वता देना ।।</p>
                <p className="mb-2 leading-relaxed text-gray-800">रूप हे उग्र अति के हरि नरसे सिंह बनये की ।। आरती. ।।</p>
                <p className="mb-2 leading-relaxed text-gray-800">दैत्वका फाटत है सिना देख तद् रुपमति हीना ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">रूप है उग्र अधिक ही अपार शान्त ही ध्यान धरैय की ।। आरती. ।।</p>
                <p className="mb-2 leading-relaxed text-gray-800">जिवहा बनी हुई छुरधार मुकुटि ढेडी बहुत विशाल</p>
                <p className="mb-2 leading-relaxed text-gray-800">फटत जब हृदय असुर सब डरत खम्ब से प्रगट न्दाले की ।। आरती. ।।</p>
                <p className="mb-2 leading-relaxed text-gray-800">शिशपर जटा अति प्यारी किर में दाढ़ी सी छारी ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">नेत्र हैं लाला लाल भारी अंग में पिताम्बर धारी ।। आरती. ।।</p>
                <p className="mb-2 leading-relaxed text-gray-800">गले में वेजन्तीमाला शिशपर मुकुट घरा न्यारा ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">कान में कुण्डल अतिप्यारा कर में संख चक्र धारी ।। आरती. ।।</p>
                <p className="mb-2 leading-relaxed text-gray-800">लक्ष्मी जी वांमे अंग बिलसे देवता दर्शन को तरसे ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">गगन से पुष्प बहुत वर्षे महिपर मंगलकारी की ।। आरती.।।</p>
                <p className="mb-2 leading-relaxed text-gray-800">गजको ग्राहने आ जकड़ा टरसुन ग्राहको जा पकड़ा</p>
                <p className="mb-2 leading-relaxed text-gray-800">फिराकर चक्र काट ग्राइक गरुड़ तज धावन वाले की ।। आरती.।।</p>
                <p className="mb-2 leading-relaxed text-gray-800">आरती श्री नृसिंह गाये गाते पद वो अमर पावे ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">हरि यु कहता करजोरे लाज रख विष्णुदास कुल की ।। आरती. ।।</p>
                <p className="mb-2 leading-relaxed text-gray-800">सेवक यु कहता करजोरे लाज रख हम सब भक्तों की ।</p>
                
              </div>
            </div>
          )}
          
          {selectedAarti === "bhog-aarti" && (
            <div>
              <h4 className="font-serif text-xl font-bold mb-3 text-temple-maroon">श्री नृसिंह भगवान भोग आरती</h4>
              <div className="bg-temple-gold/5 p-6 rounded-lg border border-temple-gold/30">
                <p className="mb-2 leading-relaxed text-gray-800">महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह</p>
                <p className="mb-2 leading-relaxed text-gray-800">छप्पन भोग छत्तीसों व्यंजन, नाना विधि के कंद ।1।</p>
                <p className="mb-2 leading-relaxed text-gray-800">महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह</p>
                <p className="mb-2 leading-relaxed text-gray-800">दुर्योधन घर मेवा त्यागी, तो शाक विदुर घर पायो ।2।</p>
                <p className="mb-2 leading-relaxed text-gray-800">महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह</p>
                <p className="mb-2 leading-relaxed text-gray-800">भीलनी के बेर सुदामा के तंदुल, रुचि रुचि भोग लगाओ 131</p>
                <p className="mb-2 leading-relaxed text-gray-800">महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह</p>
                <p className="mb-2 leading-relaxed text-gray-800">करमा बाई को खीचड़ो खायो, तो भक्ता को मान बढ़ायो 141</p>
                <p className="mb-2 leading-relaxed text-gray-800">महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह</p>
                <p className="mb-2 leading-relaxed text-gray-800">नारद मुनि पनवाड़ो ल्याये, तो जल भर ल्याये श्री गंग ।5।</p>
                <p className="mb-2 leading-relaxed text-gray-800">महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह</p>
                <p className="mb-2 leading-relaxed text-gray-800">लक्ष्मी जी भोजन आप बनावे, तो मन में बहुत उमंग ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह 161</p>
                <p className="mb-2 leading-relaxed text-gray-800">चारों भैया जीमन बैठे, तो मात् कोशल्या उमंग।</p>
                <p className="mb-2 leading-relaxed text-gray-800">महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह 161</p>
                <p className="mb-2 leading-relaxed text-gray-800">प्रेम भाव से भोजन करियो, तो करियो बहुत आनंद।</p>
                <p className="mb-2 leading-relaxed text-gray-800">महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह 171</p>
                <p className="mb-2 leading-relaxed text-gray-800">सनक सनंदन चंवर डुलावत, तो गावत वेद अनन्त ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह 18।</p>
                <p className="mb-2 leading-relaxed text-gray-800">दास वैजन्ती गाली जो गावें, तो मन में बहुत उमंग ।</p>
                <p className="mb-2 leading-relaxed text-gray-800">महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह 191</p>
                <p className="mb-2 leading-relaxed text-gray-800">आओ जी कन्हैया आपा चौपड़ खेला, आओ जी सांवरिया आपा चौपड़ खेला तो बाजी लगाई गुरु ज्ञान की ले, तो जाइजे रै कांनुडा बीडो पान की ।10।</p>
                <p className="mb-2 leading-relaxed text-gray-800">पान की रे पान की और रस ज्ञान की, और गुरु ज्ञान की, और माता जानकी, ले तो जाइजे रै कांनुडा बीडो पान की ।11।</p>
                
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-600 text-center">
          <p>भोग आरती के समय भगवान को विशेष भोग अर्पित किया जाता है। सभी भक्तों से अनुरोध है कि वे इस पवित्र समय में उपस्थित होकर प्रसाद ग्रहण करें।</p>
          <p className="mt-2">During Bhog Aarti, special offerings are made to the deity. All devotees are requested to attend and receive prasad during this auspicious time.</p>
        </div>
      </div>
    </section>
  );
};

export default LiveAarti;
