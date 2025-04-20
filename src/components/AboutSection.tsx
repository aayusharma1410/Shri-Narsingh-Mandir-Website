
import { useState, useEffect } from 'react';
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
                    ? "Shri Lakshmi Narsingh Mandir in Hasampur has a rich history dating back several centuries. It is renowned for its divine spiritual energy and architectural beauty. The temple was established by devotees who were guided by divine intervention to this sacred spot. Over the years, it has become an important pilgrimage site for devotees of Lord Narsingh."
                    : "हसमपुर में श्री लक्ष्मी नरसिंह मंदिर का इतिहास कई शताब्दियों पुराना है। यह अपनी दिव्य आध्यात्मिक ऊर्जा और वास्तुकला सौंदर्य के लिए प्रसिद्ध है। मंदिर की स्थापना भक्तों द्वारा की गई थी जिन्हें दिव्य हस्तक्षेप के माध्यम से इस पवित्र स्थान की ओर मार्गदर्शित किया गया था। वर्षों के दौरान, यह भगवान नरसिंह के भक्तों के लिए एक महत्वपूर्ण तीर्थ स्थल बन गया है।"}
                </p>
                
                <p className="text-justify">
                  {language === 'en' 
                    ? "The temple has witnessed many miracles and continues to fulfill the wishes of true devotees who come with pure hearts. The idol of Lord Narsingh installed in the temple is believed to be self-manifested (Swayambhu) and holds immense spiritual power."
                    : "मंदिर ने कई चमत्कारों को देखा है और शुद्ध हृदय से आने वाले सच्चे भक्तों की इच्छाओं को पूरा करना जारी रखता है। मंदिर में स्थापित भगवान नरसिंह की मूर्ति को स्वयंभू माना जाता है और इसमें अपार आध्यात्मिक शक्ति है।"}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="narsingh">
            <Card className="border-temple-gold/30">
              <CardContent className="pt-6 prose max-w-none">
                <div className="mb-4 whitespace-pre-line">
                  {t('about.narsinghKatha')}
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
