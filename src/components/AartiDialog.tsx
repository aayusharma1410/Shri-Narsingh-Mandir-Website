
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Music } from "lucide-react";

// Aarti texts from the LiveAarti component
const morningAarti = {
  en: `Jai Lakshmi Narsingh ji, Jai Lakshmi Narsingh ji
Shri Lakshmi Narsingh ji, Jai Lakshmi Narsingh ji

Prabhu ji tum Bhakt-vatsala ho, Prabhu ji tum Bhakt-vatsala ho
Sharan mein lelo, Shri Lakshmi Narsingh ji
Jai Lakshmi Narsingh ji, Jai Lakshmi Narsingh ji

Prabhu ji kalyug mein sukh-shanti do, Prabhu ji kalyug mein sukh-shanti do
Gyan vairagya do, Shri Lakshmi Narsingh ji
Jai Lakshmi Narsingh ji, Jai Lakshmi Narsingh ji`,

  hi: `जय लक्ष्मी नृसिंह जी, जय लक्ष्मी नृसिंह जी
श्री लक्ष्मी नृसिंह जी, जय लक्ष्मी नृसिंह जी

प्रभु जी तुम भक्त-वत्सल हो, प्रभु जी तुम भक्त-वत्सल हो
शरण में लेलो, श्री लक्ष्मी नृसिंह जी
जय लक्ष्मी नृसिंह जी, जय लक्ष्मी नृसिंह जी

प्रभु जी कलयुग में सुख-शान्ति दो, प्रभु जी कलयुग में सुख-शान्ति दो
ज्ञान वैराग्य दो, श्री लक्ष्मी नृसिंह जी
जय लक्ष्मी नृसिंह जी, जय लक्ष्मी नृसिंह जी`
};

const eveningAarti = {
  en: `Om Jay Jagadish Hare, Swami Jay Jagadish Hare
Bhakt Jano Ke Sankat, Daas Jano Ke Sankat
Kshan Men Door Kare, Om Jay Jagadish Hare

Jo Dhyave Phal Pave, Dukh Bin Se Man Ka
Swami Dukh Bin Se Man Ka, Sukh Sampati Ghar Aave
Sukh Sampati Ghar Aave, Kashta Mite Tan Ka
Om Jay Jagadish Hare

Maat Pita Tum Mere, Sharan Kahoon Kiski
Swami Sharan Kahoon Kiski, Tum Bin Aur Na Dooja
Tum Bin Aur Na Dooja, Aas Karoon Jiski
Om Jay Jagadish Hare`,

  hi: `ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे
भक्त जनों के संकट, दास जनों के संकट
क्षण में दूर करे, ॐ जय जगदीश हरे

जो ध्यावे फल पावे, दुख बिनसे मन का
स्वामी दुख बिनसे मन का, सुख सम्पत्ति घर आवे
सुख सम्पत्ति घर आवे, कष्ट मिटे तन का
ॐ जय जगदीश हरे

मात-पिता तुम मेरे, शरण कहूँ किसकी
स्वामी शरण कहूँ किसकी, तुम बिन और न दूजा
तुम बिन और न दूजा, आस करूँ जिसकी
ॐ जय जगदीश हरे`
};

const nightAarti = {
  en: `Aarti Keeje Shri Bhagawan, Jai Jai Narsingh Bhagawan
Sharan Mein Aaye Sahay Karo, Jai Jai Narsingh Bhagawan

Karuna Sindhu Sada Sukh-daata, Deen-bandhu Dayal
Tum Ho Jagat Ke Paalan-karta, Deenon Ke Pratipal
Bhav-bandhan Se Mukti Dilaado, Do Bhakti Ka Daan
Jai Jai Narsingh Bhagawan, Jai Jai Narsingh Bhagawan

Jo Sharanaagat Tumhare Aaye, Unko Kiye Kalyan
Jo Drohee Ban Ke Sataye, Unka Kiya Vinash
Bhakt Prahlad Ki Raksha Kaarani, Liya Avataar
Jai Jai Narsingh Bhagawan, Jai Jai Narsingh Bhagawan`,

  hi: `आरती कीजै श्री भगवान, जय जय नृसिंह भगवान
शरण में आये सहाय करो, जय जय नृसिंह भगवान

करुणा सिंधु सदा सुख-दाता, दीन-बंधु दयाल
तुम हो जगत के पालन-कर्ता, दीनों के प्रतिपाल
भव-बंधन से मुक्ति दिलादो, दो भक्ति का दान
जय जय नृसिंह भगवान, जय जय नृसिंह भगवान

जो शरणागत तुम्हारे आये, उनको किये कल्याण
जो द्रोही बन के सताये, उनका किया विनाश
भक्त प्रह्लाद की रक्षा कारणि, लिया अवतार
जय जय नृसिंह भगवान, जय जय नृसिंह भगवान`
};

const AartiDialog = () => {
  const { language } = useLanguage();
  
  return (
    <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-center font-serif text-2xl text-temple-maroon">
          {language === 'en' ? 'Shri Narsingh Aarti' : 'श्री नृसिंह आरती'}
        </DialogTitle>
        <DialogDescription className="text-center">
          {language === 'en' 
            ? 'Sacred hymns sung in devotion to Lord Narsingh' 
            : 'श्री नृसिंह भगवान की भक्ति में गाए जाने वाले पवित्र भजन'}
        </DialogDescription>
      </DialogHeader>
      
      <Tabs defaultValue="morning" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="morning" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            {language === 'en' ? 'Morning Aarti' : 'प्रातः आरती'}
          </TabsTrigger>
          <TabsTrigger value="evening" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            {language === 'en' ? 'Evening Aarti' : 'संध्या आरती'}
          </TabsTrigger>
          <TabsTrigger value="night" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            {language === 'en' ? 'Night Aarti' : 'रात्रि आरती'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="morning" className="mt-4">
          <div className="bg-temple-lightgold/20 p-6 rounded-lg border border-temple-gold/20">
            <h3 className="font-serif text-xl mb-4 text-temple-maroon">
              {language === 'en' ? 'Morning Aarti' : 'प्रातः आरती'}
            </h3>
            <div className="whitespace-pre-line text-lg">
              {language === 'en' ? morningAarti.en : morningAarti.hi}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="evening" className="mt-4">
          <div className="bg-temple-lightgold/20 p-6 rounded-lg border border-temple-gold/20">
            <h3 className="font-serif text-xl mb-4 text-temple-maroon">
              {language === 'en' ? 'Evening Aarti' : 'संध्या आरती'}
            </h3>
            <div className="whitespace-pre-line text-lg">
              {language === 'en' ? eveningAarti.en : eveningAarti.hi}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="night" className="mt-4">
          <div className="bg-temple-lightgold/20 p-6 rounded-lg border border-temple-gold/20">
            <h3 className="font-serif text-xl mb-4 text-temple-maroon">
              {language === 'en' ? 'Night Aarti' : 'रात्रि आरती'}
            </h3>
            <div className="whitespace-pre-line text-lg">
              {language === 'en' ? nightAarti.en : nightAarti.hi}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default AartiDialog;
