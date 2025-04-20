
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AboutSection = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-temple-maroon">
          {language === 'en' ? 'About Shri Lakshmi Narsingh Mandir' : 'श्री लक्ष्मी नरसिंह मंदिर के बारे में'}
        </h1>

        <Tabs
          defaultValue="history"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="history" className="text-sm md:text-base">
              {language === 'en' ? 'Temple History' : 'मंदिर का इतिहास'}
            </TabsTrigger>
            <TabsTrigger value="narsingh" className="text-sm md:text-base">
              {language === 'en' ? 'Narsingh Avatar' : 'नृसिंह अवतार'}
            </TabsTrigger>
            <TabsTrigger value="features" className="text-sm md:text-base">
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
    ? "Devotee supreme and embodiment of sacrifice, Shri Shri 1008 Swami Vishnudass Ji Maharaj, founder of the Hasampur Peeth, was born in the year 1444 (Samvat). According to sacred legends, a lion once attacked a cow. To protect the frightened cow, Swami Ji placed himself before the lion. Deeply moved by his devotion, sacrifice, and pure love, Lord Narsingh appeared with a thunderous roar and instructed Swami Ji to remove a heavy boulder. The rock shifted effortlessly at Swami Ji’s mere touch, and a divine Shaligram form of Lord Narsingh manifested amidst sounds of conches, bells, and traditional instruments."
    : "भक्त शिरोमणि त्यागमूर्ति श्री श्री १००८ श्री स्वामी विष्णुदास जी महाराज, हसामपुर पीठ के संस्थापक, का जन्म संवत १४४४ में हुआ। प्राकट्य प्रसंग की सुनी हुई कथानुसार सिंह ने एक गऊ पर आक्रमण कर दिया। भयभीत गऊ की रक्षा के लिए स्वामी जी ने स्वयं को सिंह के सामने प्रस्तुत किया। उनकी अनन्य भक्ति, असीम त्याग और निष्कलंक प्रेम से द्रवित होकर नृसिंह भगवान ने सिंहगर्जना करते हुए दर्शन दिए और एक भारी शिला को हटाने का आदेश दिया, जो स्वामी जी के स्पर्श मात्र से हट गई। उसी क्षण शंख, घंटा, घडियाल की ध्वनि के साथ श्री नृसिंह भगवान की शालिग्राम मूर्ति का प्राकट्य हुआ।"}
</p>

<p className="text-justify">
  {language === 'en' 
    ? "In devotion to this divine form, Swami Ji's son Shri Shri 1008 Shri Gangadas Ji Maharaj was born in the year 1476 (Samvat). Following in his father’s footsteps, he carried forward the legacy of immense devotion, penance, and divine love, and glorified the temple’s name across all directions."
    : "इस दिव्य मूर्ति की सेवा स्वरूप स्वामी जी के पुत्र श्री श्री १००८ श्री गंगादास जी महाराज का जन्म संवत १४७६ में हुआ। उन्होंने अपने पिता की भांति ही असीम भक्ति, त्याग, तपस्या और प्रभु प्रेम के मार्ग पर चलते हुए मंदिर की कीर्ति को दसों दिशाओं में फैलाया।"}
</p>

              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="narsingh">
            <Card className="border-temple-gold/30">
              <CardContent className="pt-6 prose max-w-none">
                <div className="mb-4 whitespace-pre-line">
                <p className="text-justify">
    {language === 'en'
      ? "Lord Vishnu incarnated as Narsingh (half-man, half-lion) to protect his devotee Prahlad and kill the demon king Hiranyakashipu."
      : "भगवान विष्णु ने अपने भक्त प्रह्लाद की रक्षा करने और अत्याचारी राक्षस राजा हिरण्यकशिपु का वध करने के लिए नृसिंह अवतार (आधा नर – आधा सिंह रूप) लिया था।"}
  </p>

  <p className="text-justify">
    {language === 'en'
      ? "Hiranyakashipu performed penance and received a boon from Brahma — he couldn't be killed by man or animal, during day or night, inside or outside, by weapon or tool. He became arrogant and banned the worship of Vishnu."
      : "हिरण्यकशिपु ने ब्रह्मा जी से वरदान प्राप्त किया था — कि वह ना दिन में मरेगा, ना रात में, ना घर में, ना बाहर, ना मनुष्य से, ना जानवर से, ना अस्त्र से, ना शस्त्र से। इसके कारण वह घमंडी हो गया और भगवान विष्णु की पूजा पर रोक लगा दी।"}
  </p>

  <p className="text-justify">
    {language === 'en'
      ? "His son Prahlad was a great devotee of Lord Vishnu. Despite his father's anger, he kept chanting 'Narayana'."
      : "उसका पुत्र प्रह्लाद भगवान विष्णु का परम भक्त था। पिता के विरोध के बावजूद वह 'नारायण' का जप करता रहा।"}
  </p>

  <p className="text-justify">
    {language === 'en'
      ? "Hiranyakashipu tried to kill Prahlad many times — by poison, elephants, and fire — but Vishnu always saved him."
      : "हिरण्यकशिपु ने प्रह्लाद को विष, हाथियों और आग से मारने की कोशिश की, लेकिन भगवान विष्णु ने हर बार उसकी रक्षा की।"}
  </p>

  <p className="text-justify">
    {language === 'en'
      ? "One day, Hiranyakashipu asked, 'Is your God in this pillar?' Prahlad replied, 'Yes, He is everywhere.' Hiranyakashipu hit the pillar, and Lord Narsingh emerged in fierce form."
      : "एक दिन हिरण्यकशिपु ने पूछा, 'क्या तेरा भगवान इस खंभे में है?' प्रह्लाद ने कहा, 'हाँ, वह हर जगह है।' तब खंभे से भगवान नृसिंह उग्र रूप में प्रकट हुए।"}
  </p>

  <p className="text-justify">
    {language === 'en'
      ? "At twilight, on the doorstep, Lord Narsingh placed Hiranyakashipu on His lap and tore him with claws — thus not breaking the boon."
      : "संध्या समय, घर की देहरी पर भगवान नृसिंह ने हिरण्यकशिपु को अपनी जंघा पर रखकर नखों से चीर डाला — जिससे वरदान भी नहीं टूटा।"}
  </p>

  <p className="text-justify">
    {language === 'en'
      ? "After the killing, the Lord was furious. Only Prahlad's loving prayers could calm Him. He blessed Prahlad with eternal devotion."
      : "वध के बाद भगवान क्रोधित थे, लेकिन प्रह्लाद की भक्ति ने उन्हें शांत किया। उन्होंने प्रह्लाद को सदा भक्ति का वरदान दिया।"}
  </p>

  <p className="text-justify font-semibold">
    {language === 'en'
      ? "Glory to Lord Narsingh! This story teaches us that true devotion has power, good always wins, and God protects His devotees."
      : "श्री नृसिंह भगवान की जय! यह कथा हमें सिखाती है कि सच्ची भक्ति में शक्ति होती है, धर्म की विजय होती है और भगवान अपने भक्तों की रक्षा करते हैं।"}
  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card className="border-temple-gold/30">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-xl font-semibold text-temple-maroon">
                  {language === 'en' ? 'Temple Architecture' : 'मंदिर की वास्तुकला'}
                </h3>
                <p className="text-justify">
                  {language === 'en' 
                    ? "The temple is built in traditional North Indian architectural style with intricate carvings and detailed craftsmanship. The main sanctum houses the deity of Lord Narsingh along with Goddess Lakshmi. The temple complex includes several smaller shrines dedicated to other deities."
                    : "मंदिर उत्तर भारतीय पारंपरिक वास्तुकला शैली में जटिल नक्काशी और विस्तृत कारीगरी के साथ बनाया गया है। मुख्य गर्भगृह में भगवान नरसिंह के साथ देवी लक्ष्मी की मूर्ति स्थापित है। मंदिर परिसर में अन्य देवताओं को समर्पित कई छोटे मंदिर भी शामिल हैं।"}
                </p>

                <h3 className="text-xl font-semibold text-temple-maroon">
                  {language === 'en' ? 'Regular Ceremonies' : 'नियमित समारोह'}
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    {language === 'en' ? 'Daily Aarti (Morning and Evening)' : 'दैनिक आरती (सुबह और शाम)'}
                  </li>
                  <li>
                    {language === 'en' ? 'Weekly Narsingh Chalisa Path' : 'साप्ताहिक नरसिंह चालीसा पाठ'}
                  </li>
                  <li>
                    {language === 'en' ? 'Monthly Purnima celebrations' : 'मासिक पूर्णिमा समारोह'}
                  </li>
                  <li>
                    {language === 'en' ? 'Annual Narsingh Jayanti celebrations' : 'वार्षिक नरसिंह जयंती समारोह'}
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-temple-maroon">
                  {language === 'en' ? 'Community Services' : 'सामुदायिक सेवाएँ'}
                </h3>
                <p className="text-justify">
                  {language === 'en' 
                    ? "The temple also serves as a community center and regularly organizes charitable activities such as food distribution, medical camps, and educational assistance for underprivileged children."
                    : "मंदिर एक सामुदायिक केंद्र के रूप में भी कार्य करता है और नियमित रूप से भोजन वितरण, चिकित्सा शिविर और वंचित बच्चों के लिए शैक्षिक सहायता जैसी परोपकारी गतिविधियों का आयोजन करता है।"}
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

