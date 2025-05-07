
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AboutSection = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-temple-maroon">
          {language === 'en' ? 'About Shri Lakshmi Narsingh Mandir' : 'श्री नृसिंह मंदिर के बारे में'}
        </h1>

        <Tabs defaultValue="history" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger 
              value="history" 
              className="text-sm md:text-base transition-all duration-300 hover:bg-temple-gold hover:text-white transform hover:-translate-y-1"
            >
              {language === 'en' ? 'Temple History' : 'मंदिर का इतिहास'}
            </TabsTrigger>
            <TabsTrigger 
              value="narsingh" 
              className="text-sm md:text-base transition-all duration-300 hover:bg-temple-gold hover:text-white transform hover:-translate-y-1"
            >
              {language === 'en' ? 'Narsingh Avatar' : 'नृसिंह अवतार'}
            </TabsTrigger>
            <TabsTrigger 
              value="features" 
              className="text-sm md:text-base transition-all duration-300 hover:bg-temple-gold hover:text-white transform hover:-translate-y-1"
            >
              {language === 'en' ? 'Temple Features' : 'मंदिर की विशेषताएं'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card className="border-temple-gold/30">
              <CardContent className="pt-6 space-y-4">
                <div className="flex flex-col items-center mb-6">
                  <img 
                    src="/lovable-uploads/fab16119-9793-47b9-8c6a-59f2e83db43e.png" 
                    alt="Temple history image" 
                    className="rounded-lg max-w-full mb-4 shadow-lg"
                    style={{ maxHeight: '60vh' }}
                  />
                  <p className="text-center text-sm italic mt-2">
                    {language === 'en' 
                      ? "Appearance of Shri Narsingh Shaligram Ji from under the musical stone and Shri Shri 1008 Shri Swami Vishnudas Ji Maharaj."
                      : "श्री नृसिंह शालिग्राम जी का बाजनी शिला के नीचे से प्राकट्य का चित्र एवं श्री श्री १००८ श्री स्वामी विष्णुदास जी महाराज।"}
                  </p>
                </div>

                <p className="text-justify">
                  {language === 'en' 
                    ? "Devotee supreme and embodiment of sacrifice, Shri Shri 1008 Swami Vishnudass Ji Maharaj, founder of the Hasampur Peeth, was born in the year 1444 (Samvat). According to sacred legends, a lion once attacked a cow. To protect the frightened cow, Swami Ji placed himself before the lion. Deeply moved by his devotion, sacrifice, and pure love, Lord Narsingh appeared with a thunderous roar and instructed Swami Ji to remove a heavy boulder. The rock shifted effortlessly at Swami Ji's mere touch, and a divine Shaligram form of Lord Narsingh manifested amidst sounds of conches, bells, and traditional instruments."
                    : "भक्त शिरोमणि त्यागमूर्ति श्री श्री १००८ श्री स्वामी विष्णुदास जी महाराज, हसामपुर पीठ के संस्थापक, का जन्म संवत १४४४ में हुआ। प्राकट्य प्रसंग की सुनी हुई कथानुसार सिंह ने एक गऊ पर आक्रमण कर दिया। भयभीत गऊ की रक्षा के लिए स्वामी जी ने स्वयं को सिंह के सामने प्रस्तुत किया। उनकी अनन्य भक्ति, असीम त्याग और निष्कलंक प्रेम से द्रवित होकर नृसिंह भगवान ने सिंहगर्जना करते हुए दर्शन दिए और एक भारी शिला को हटाने का आदेश दिया, जो स्वामी जी के स्पर्श मात्र से हट गई। उसी क्षण शंख, घंटा, घडियाल की ध्वनि के साथ श्री नृसिंह भगवान की शालिग्राम मूर्ति का प्राकट्य हुआ।"}
                </p>

                <p className="text-justify">
                  {language === 'en' 
                    ? "In devotion to this divine form, Swami Ji's son Shri Shri 1008 Shri Gangadas Ji Maharaj was born in the year 1476 (Samvat). Following in his father's footsteps, he carried forward the legacy of immense devotion, penance, and divine love, and glorified the temple's name across all directions."
                    : "इस दिव्य मूर्ति की सेवा स्वरूप स्वामी जी के पुत्र श्री श्री १००८ श्री गंगादास जी महाराज का जन्म संवत १४७६ में हुआ। उन्होंने अपने पिता की भांति ही असीम भक्ति, त्याग, तपस्या और प्रभु प्रेम के मार्ग पर चलते हुए मंदिर की कीर्ति को दसों दिशाओं में फैलाया।"}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="narsingh">
            <Card className="border-temple-gold/30">
              <CardContent className="pt-6 space-y-4">
                <h2 className="text-xl font-bold text-center">
                  {language === 'en'
                    ? "Detailed Katha of Lord Narsingh"
                    : "भगवान नृसिंह जी की विस्तृत कथा"}
                </h2>

                <p className="text-justify">
                  {language === 'en'
                    ? "Lord Narsingh is considered the fourth incarnation of Lord Vishnu. He appeared to destroy unrighteousness and protect his devoted follower Prahlad. The story of Narsingh Avatar is deeply inspiring, mysterious, and full of devotion."
                    : "भगवान नृसिंह विष्णु जी का चौथा अवतार माने जाते हैं। उन्होंने यह अवतार अधर्म के विनाश और अपने भक्त प्रह्लाद की रक्षा हेतु लिया था। नृसिंह अवतार की कथा बहुत ही प्रेरणादायक, रहस्यमयी और भक्तिपूर्ण है।"}
                </p>

                <h3 className="text-lg font-semibold">
                  {language === 'en' ? "Beginning: Hiranyakashipu and Prahlad" : "कथा का प्रारंभ: हिरण्यकश्यप और प्रह्लाद"}
                </h3>

                <p className="text-justify">
                  {language === 'en'
                    ? "In the Satya Yuga, there lived a tyrannical demon king named Hiranyakashipu who held great enmity towards Lord Vishnu for slaying his brother Hiranyaksha. He performed intense penance and received a boon from Brahma:"
                    : "सत्य युग में एक अत्याचारी दैत्यराज हुआ, हिरण्यकश्यप। वह भगवान विष्णु से घोर द्वेष रखता था क्योंकि विष्णु भगवान ने उसके भाई हिरण्याक्ष का वध किया था। हिरण्यकश्यप ने कठोर तपस्या करके ब्रह्मा जी से वरदान प्राप्त किया कि—"}
                </p>

                <ul className="list-disc pl-6 text-justify">
                  <li>{language === 'en' ? "He cannot be killed by a man or animal." : "न कोई मनुष्य उसे मार सके, न कोई पशु।"}</li>
                  <li>{language === 'en' ? "He won't die during the day or night." : "न दिन में मरे, न रात में।"}</li>
                  <li>{language === 'en' ? "He won't die inside or outside the house." : "न घर के भीतर मरे, न बाहर।"}</li>
                  <li>{language === 'en' ? "Not in the sky or on the ground." : "न आकाश में, न पृथ्वी पर।"}</li>
                  <li>{language === 'en' ? "Not by any weapon or tool." : "न किसी अस्त्र से, न किसी शस्त्र से।"}</li>
                </ul>

                <p className="text-justify">
                  {language === 'en'
                    ? "Drunk with power, he declared himself God and forced everyone to worship him. But his own son Prahlad was a staunch devotee of Lord Vishnu, chanting his name constantly."
                    : "इस वरदान से अहंकार में भरकर वह खुद को भगवान मानने लगा और प्रजा को भी उसी की पूजा करने को मजबूर किया। परन्तु उसका पुत्र प्रह्लाद, भगवान विष्णु का परम भक्त था। वह हर पल विष्णु का नाम जपता।"}
                </p>

                <h3 className="text-lg font-semibold">
                  {language === 'en' ? "Torture on Prahlad" : "प्रह्लाद पर अत्याचार"}
                </h3>

                <p className="text-justify">
                  {language === 'en'
                    ? "To stop Prahlad's devotion, Hiranyakashipu inflicted several tortures on him:"
                    : "हिरण्यकश्यप ने प्रह्लाद को विष्णु भक्ति से रोकने के लिए अनेक कष्ट दिए—"}
                </p>

                <ul className="list-disc pl-6 text-justify">
                  <li>{language === 'en' ? "Thrown from a high mountain." : "उसे ऊँचे पर्वत से फेंका गया।"}</li>
                  <li>{language === 'en' ? "Placed among venomous snakes." : "विषैले नागों के बीच डाला गया।"}</li>
                  <li>{language === 'en' ? "Made to sit in fire with Holika." : "आग में बिठाया गया (होलिका के साथ)।"}</li>
                </ul>

                <p className="text-justify">
                  {language === 'en'
                    ? "But every time, Lord Vishnu protected his devotee."
                    : "लेकिन हर बार भगवान विष्णु ने अपने भक्त की रक्षा की।"}
                </p>

                <h3 className="text-lg font-semibold">
                  {language === 'en' ? "Appearance of Lord Narsingh" : "नृसिंह अवतार का प्रकट होना"}
                </h3>

                <p className="text-justify">
                  {language === 'en'
                    ? "One day, in anger, Hiranyakashipu asked Prahlad, \"Where is your Lord Vishnu?\" Prahlad replied, \"God is everywhere!\" Hiranyakashipu pointed to a pillar and asked, \"Is He in this pillar too?\" Prahlad said, \"Yes!\""
                    : "जब हिरण्यकश्यप ने गुस्से में प्रह्लाद से पूछा: \"कहाँ है तेरा भगवान विष्णु?\" प्रह्लाद ने उत्तर दिया: \"भगवान सर्वत्र हैं – हर जगह!\" हिरण्यकश्यप ने एक स्तंभ की ओर इशारा करके पूछा – \"क्या वह इस खंभे में भी है?\" प्रह्लाद ने कहा – \"हाँ!\""}
                </p>

                <p className="text-justify">
                  {language === 'en'
                    ? "Enraged, he struck the pillar. Suddenly, Lord Vishnu emerged in the fierce form of Narsingh, fulfilling all conditions of the boon:"
                    : "तभी हिरण्यकश्यप ने क्रोध में आकर खंभे को तोड़ा, और उसमें से भगवान विष्णु ने नृसिंह रूप में प्रकट होकर सभी शर्तों को ध्यान में रखते हुए उसका वध किया:"}
                </p>

                <ul className="list-disc pl-6 text-justify">
                  <li>{language === 'en' ? "Half-man, half-lion (not man or animal)" : "आधे मनुष्य और आधे सिंह के रूप में (न मनुष्य, न पशु)"}</li>
                  <li>{language === 'en' ? "At twilight (not day or night)" : "संध्या समय (ना दिन, ना रात)"}</li>
                  <li>{language === 'en' ? "On the threshold (neither inside nor outside)" : "द्वार की चौखट पर (ना अंदर, ना बाहर)"}</li>
                  <li>{language === 'en' ? "On his lap (neither sky nor ground)" : "घुटनों पर बिठाकर (ना आकाश, ना पृथ्वी)"}</li>
                  <li>{language === 'en' ? "With nails (neither weapon nor tool)" : "नाखूनों से चीरकर (ना अस्त्र, ना शस्त्र)"}</li>
                </ul>

                <p className="text-justify">
                  {language === 'en'
                    ? "Thus, Lord Narsingh destroyed unrighteousness and protected his devotee Prahlad."
                    : "इस तरह भगवान नृसिंह ने अधर्म का अंत किया और अपने भक्त प्रह्लाद की रक्षा की।"}
                </p>

                <h3 className="text-lg font-semibold">
                  {language === 'en' ? "Significance of Narsingh Avatar" : "नृसिंह अवतार का महत्व"}
                </h3>

                <ul className="list-disc pl-6 text-justify">
                  <li>{language === 'en' ? "God always protects his true devotees." : "भगवान अपने भक्तों की रक्षा हर परिस्थिति में करते हैं।"}</li>
                  <li>{language === 'en' ? "No matter how great ego or tyranny is, Dharma always wins." : "अहंकार और अत्याचार चाहे कितना भी बड़ा क्यों न हो, धर्म की विजय होती है।"}</li>
                  <li>{language === 'en' ? "Prahlad's patience, faith, and devotion remain an inspiration." : "भक्त प्रह्लाद का धैर्य, श्रद्धा और विश्वास आज भी प्रेरणा देता है।"}</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card className="border-temple-gold/30">
              <CardContent className="pt-6 space-y-6">
                <h3 className="text-xl font-semibold text-temple-maroon">
                  {language === 'en' ? 'Temple Features' : 'मंदिर की विशेषताएं'}
                </h3>

                <h4 className="text-lg font-medium text-temple-maroon">
                  {language === 'en' ? 'Scenic Location' : 'स्थान की विशेषता'}
                </h4>
                <p className="text-justify">
                  {language === 'en'
                    ? 'The temple is surrounded by beautiful hills, providing a serene and spiritual environment.'
                    : 'यह मंदिर चारों ओर से सुंदर पहाड़ों के बीच स्थित है, जो इसे अत्यंत शांत और आध्यात्मिक वातावरण प्रदान करता है।'}
                </p>

                <h4 className="text-lg font-medium text-temple-maroon">
                  {language === 'en' ? "Divine Darshan of Lord Narsingh's face" : 'भगवान नृसिंह के चेहरे के दर्शन'}
                </h4>
                <p className="text-justify">
                  {language === 'en'
                    ? 'The face of Lord Narsingh is placed on the throne for only 5 days in a year, making these darshans extremely rare and sacred.'
                    : 'मंदिर में श्री नृसिंह भगवान का चेहरा केवल 5 दिनों के लिए ही सिंहासनारूढ़ (विराजमान) होता है, जो दर्शन अत्यंत दुर्लभ और पावन माने जाते हैं।'}
                </p>

                <h4 className="text-lg font-medium text-temple-maroon">
                  {language === 'en' ? 'Traditional Priest Service' : 'परंपरागत पुजारी सेवा'}
                </h4>
                <p className="text-justify">
                  {language === 'en'
                    ? 'The temple services are performed by the descendants of Shri Shri 1008 Swami Vishnudas Ji Maharaj.'
                    : 'मंदिर में सेवा का कार्य श्री श्री 1008 श्री स्वामी विष्णुदास जी के वंशज करते हैं।'}
                  <br />
                  {language === 'en'
                    ? 'Currently, Nahariya Swami Ji serves as the personal servant and main priest of Lord Narsingh.'
                    : 'यह नाहरिया स्वामी वंश के हैं एवं भगवान के निज सेवक एवं पुजारी के रूप में सेवा निभा रहे हैं।'}
                </p>

                <h4 className="text-lg font-medium text-temple-maroon">
                  {language === 'en' ? 'Narsingh Chaturdashi Fair' : 'श्री नृसिंह चतुर्दशी पर मेला एवं लीला'}
                </h4>
                <p className="text-justify">
                  {language === 'en'
                    ? 'A grand fair is organized every year on the auspicious occasion of Shri Narsingh Chaturdashi, attracting devotees from distant places.'
                    : 'मंदिर में हर वर्ष श्री नृसिंह चतुर्दशी के शुभ अवसर पर भव्य मेला भरता है जिसमें दूर-दूर से श्रद्धालु दर्शन हेतु आते हैं।'} 
                  <br />
                  {language === 'en'
                    ? 'The divine play of God also takes place, during which the 24 incarnations of Lord Vishnu are witnessed, and at the end, at 4:15 PM, the darshan of Lord Narisngh takes place.'
                    : 'भगवान की लीला भी होती है, जिसमें श्री विष्णु भगवान के 24 अवतार के दर्शन होते हैं और अंत में शुभ 4:15 बजे श्री नृसिंह भगवान के दर्शन होते हैं।'}
                </p>

                <h4 className="text-lg font-medium text-temple-maroon">
                  {language === 'en' ? 'Wish-Fulfilling Shrine' : 'मनोकामना पूर्ण होने का स्थल'}
                </h4>
                <p className="text-justify">
                  {language === 'en'
                    ? 'It is believed that any true wish made to the Narsingh Shaligram here is fulfilled.'
                    : 'यहाँ विराजित नृसिंह शालिग्राम जी से माँगी गई हर सच्ची मनोकामना पूर्ण होती है।'}
                  <br />
                  {language === 'en'
                    ? 'Devotees believe the Lord always blesses those who pray sincerely.'
                    : 'श्रद्धालुओं की आस्था है कि यहाँ माँगने से भगवान अवश्य कृपा करते हैं।'}
                </p>
                <h4 className="text-lg font-medium text-temple-maroon">
  {language === 'en' ? 'Presence of Lord Hanuman' : 'हनुमान जी विराजमान हैं'}
</h4>
<p className="text-justify">
  {language === 'en'
    ? 'In front of Shri Narsingh Bhagwan, Lord Hanuman is gracefully seated, symbolizing unwavering devotion and strength.'
    : 'श्री नृसिंह भगवान के समक्ष हनुमान जी विराजमान हैं, जो उनकी अखंड भक्ति और शक्ति का प्रतीक हैं।'}
</p>


                <h4 className="text-lg font-medium text-temple-maroon">
                  {language === 'en' ? 'Private Worship (Apras)' : 'अप्रस में पूजा'}
                </h4>
                <p className="text-justify">
                  {language === 'en'
                    ? 'Worship in the temple is performed in private (Apras), preserving its purity and traditional sanctity.'
                    : 'मंदिर में पूजा अप्रस (निजता) में होती है, जो भगवान की सेवा को अत्यंत पवित्र एवं परंपरागत रूप में सम्पन्न करती है।'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AboutSection;
