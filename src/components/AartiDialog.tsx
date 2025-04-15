
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Music } from "lucide-react";

// Aarti texts from the LiveAarti component
const morningAarti = {
  en: `Om Jai Jagdish Hare
Swami Jai Jagdish Hare
Bhakt jano ke sankat
Kshan mein door kare
Jo dhyave phal pave
Dukh binse man ka
Swami dukh binse man ka
Sukh sampatti ghar aave
Kasht mite tan ka
Om Jai Jagdish Hare

Maat-pita tum mere
Sharan gahun main kiski
Swami sharan gahun main kiski
Tum bin aur na dooja
Aas karun jiski
Om Jai Jagdish Hare

Tum poorn parmatma
Tum antaryaami
Swami tum antaryaami
Parabrahma Parmeshwar
Tum sabke Swami
Om Jai Jagdish Hare

Tum karuna ke saagar
Tum paalan karta
Swami tum paalan karta
Main moorakh khal kaami
Kripa karo bharta
Om Jai Jagdish Hare

Tum ho ek agochar
Sabke praanpati
Swami sabke praanpati
Kis vidhi miloon dayamay
Tumko main kumati
Om Jai Jagdish Hare

Deenbandhu dukh-harta
Tum Thakur mere
Swami tum Thakur mere
Apne haath uthao
Dwaar pada tere
Om Jai Jagdish Hare

Vishay-vikaar mitaao
Paap haro Deva
Swami paap haro Deva
Shraddha-bhakti badhaao
Santan ki seva
Om Jai Jagdish Hare

Shri Lakshmi Narayan ji ki aarti
Jo koi nar gaave
Swami jo koi nar gaave
Kahat Shivanand Swami
Sukh sampatti paave
Om Jai Jagdish Hare`,

  hi: `ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे

भक्त जनों के संकट, क्षण में दूर करे

जो ध्यावे फल पावे, दुःख बिनसे मन का

स्वामी दुःख बिनसे मन का

सुख सम्पत्ति घर आवे, कष्ट मिटे तन का ॥ ॐ जय जगदीश हरे।

मात-पिता तुम मेरे, शरण गहूँ में किसकी। स्वार्मी शरण गहूँ मैं किसकी।

तुम बिन और न दूजा, आस करूँ जिसकी ॥ ॐ जय जगदीश हरे ।

तुम पूरण परमात्मा, तुम अन्तर्यामी। स्वामी तुम अन्तर्यामी ।

पारब्रह्म परमेश्वर, तुम सबके स्वामी ॥ ॐ जय जगदीश हरे।

तुम करुणा के सागर, तुम पालन कर्ता । स्वामी तुम पालन-कर्ता ।

में मूरख खल कामी, कृपा करो भर्ता ॥ ॐ जय जगदीश हरे।

तुम हो एक अगोचर, सबके प्राणपति । स्वामी सबके प्राणपति ।

किस विधि मिलूँ दयामय, तुमको मैं कुमति ॥ ॐ जय जगदीश हरे ।

दीनबन्धु दुखहर्ता, तुम ठाकुर मेरे। स्वामी तुम ठाकुर मेरे।

अपने हाथ उठाओ, द्वार पड़ा तेरे ॥ ॐ जय जगदीश हरे ।

विषय-विकार मिटाओ, पाप हरो देवा । स्वभी पाप हरो देवा ।

श्रद्धा-भक्ति बढ़ाओ, सन्तन की सेवा ॥ ॐ जय जगदीश हरे।

श्री लक्ष्मीनृसिंहजी की आरती, जो कोई नर गावे।

स्वामी जो कोई नर गावे ।

कहत शिवानन्द स्वामी, सुख संपत्ति पावे ॥

ॐ जय जगदीश हरे।`
};

const eveningAarti = {
  en: `Aarti Narsingh Baba ki utaaro khamb fathaye ki
Prem se bhakt Prahlad rata, pita ki shakti se ladta
Dhyan mein magan Ram ka, shabd bhakt ka maan rakhaye ki
Aarti...

Khamb ko laal agni keena, bhakt le ja lipta deena
Lamb se nikli gunj bhari, asurni garbh giraye ki
Aarti...

Khadag ko khamb bheja deena, kahaan tera Ram, bata deena
Roop hai ugrav ati ke Hari, Narsingh banaye ki
Aarti...

Daitya ka faatat hai sina, dekh tad roop mati heena
Roop hai ugrav adhik hi apaar, shaant hi dhyan dharaye ki
Aarti...

Jivha bani hui chhuri dhaar, mukut dheedi bahut vishal
Phatat jab hriday asur sab, darat khamb se prakat nikaale ki
Aarti...

Shish par jata ati pyaari, kees mein daadhi si chhaari
Netra hain laala laal bhaari, ang mein pitambar dhaari
Aarti...

Gale mein Vaijayanti mala, shish par mukut ghara nyaara
Kaan mein kundal ati pyaara, kar mein shankh chakra dhaari
Aarti...

Lakshmi ji vaame ang bilse, devta darshan ko tarse
Gagan se pushp bahut varse, mahipar mangalkari ki
Aarti...

Gaj ko graah ne aa jakda, tarsoon graah ko ja pakda
Phiraakar chakra kaat graahik, Garud taje dhaavan waale ki
Aarti...

Aarti Shri Narsingh gaaye, gaate pad vo amar paaye
Hari yu kehta kar jore, laaj rakh Vishnudas kul ki
Aarti...

Sevak yu kehta kar jore, laaj rakh hum sab bhakton ki
Aarti Narsingh Baba ki utaaro khamb fathaye ki`,

  hi: `आरती नृसिंह बाबाकी उतारो खम्यफटये की।

प्रेम से भक्त प्रहलाद रटा पिता की शक्ति से नड़टां ।।

ध्यान में मग्न राम का शब्द भक्त का मान रखैये की ।। आरती. ।।

खम्व को लाल अगनी कीना, भक्त लेजा लिपटा दीना ।।

लम्ब से निकली गुन्ज भरी असुरणी गर्भ गिरैये की ।

खड़ग को खम्ब पेजा दीनां कहां तेरा राम वता देना ।।

रूप हे उग्र अति के हरि नरसे सिंह बनये की ।। आरती. ।।

दैत्वका फाटत है सिना देख तद् रुपमति हीना ।

रूप है उग्र अधिक ही अपार शान्त ही ध्यान धरैय की ।। आरती. ।।

जिवहा बनी हुई छुरधार मुकुटि ढेडी बहुत विशाल

फटत जब हृदय असुर सब डरत खम्ब से प्रगट न्दाले की ।। आरती. ।।

शिशपर जटा अति प्यारी किर में दाढ़ी सी छारी ।

नेत्र हैं लाला लाल भारी अंग में पिताम्बर धारी ।। आरती. ।।

गले में वेजन्तीमाला शिशपर मुकुट घरा न्यारा ।

कान में कुण्डल अतिप्यारा कर में संख चक्र धारी ।। आरती. ।।

लक्ष्मी जी वांमे अंग बिलसे देवता दर्शन को तरसे ।

गगन से पुष्प बहुत वर्षे महिपर मंगलकारी की ।। आरती.।।

गजको ग्राहने आ जकड़ा टरसुन ग्राहको जा पकड़ा

फिराकर चक्र काट ग्राइक गरुड़ तज धावन वाले की ।। आरती.।।

आरती श्री नृसिंह गाये गाते पद वो अमर पावे ।

हरि यु कहता करजोरे लाज रख विष्णुदास कुल की ।। आरती. ।।

सेवक यु कहता करजोरे लाज रख हम सब भक्तों की ।`
};

const nightAarti = {
  en: `Mahaprabhu aarogo Narsingh, Dayanidhi aarogo Narsingh
Chhappan bhog chhatteeson vyanjan, naana vidhi ke kand ॥1॥

Mahaprabhu aarogo Narsingh, Dayanidhi aarogo Narsingh
Duryodhan ghar mewa tyaagi, to shaak Vidur ghar paayo ॥2॥

Mahaprabhu aarogo Narsingh, Dayanidhi aarogo Narsingh
Bhilni ke ber, Sudama ke tandul, ruchi ruchi bhog lagaayo ॥3॥

Mahaprabhu aarogo Narsingh, Dayanidhi aarogo Narsingh
Karma Bai ko kheechdo khayo, to bhakta ko maan badhaayo ॥4॥

Mahaprabhu aarogo Narsingh, Dayanidhi aarogo Narsingh
Narad Muni panvaado lyaaye, to jal bhar lyaaye Shri Gang ॥5॥

Mahaprabhu aarogo Narsingh, Dayanidhi aarogo Narsingh
Lakshmi ji bhojan aap banaave, to man mein bahut umang ॥6॥

Mahaprabhu aarogo Narsingh, Dayanidhi aarogo Narsingh
Chaaro Bhaiya jeeman baithe, to maat Kaushalya umang ॥7॥

Mahaprabhu aarogo Narsingh, Dayanidhi aarogo Narsingh
Prem bhaav se bhojan kariyo, to kariyo bahut aanand ॥8॥

Mahaprabhu aarogo Narsingh, Dayanidhi aarogo Narsingh
Sanak Sanandan chamvar dulaavat, to gaavat Ved anant ॥9॥

Mahaprabhu aarogo Narsingh, Dayanidhi aarogo Narsingh
Daas Vaijayanti gaali jo gaave, to man mein bahut umang ॥10॥

Aao ji Kanhaaiya aapa chaupad khela
Aao ji Saawariya aapa chaupad khela
To baazi lagaai Guru Gyaan ki le,
To jaaiyo re Kanuda beedo paan ki ॥11॥

Paan ki re paan ki, aur ras gyaan ki
Aur Guru Gyaan ki, aur Mata Janki
Le to jaaiyo re Kanuda beedo paan ki ॥12॥`,

  hi: `महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह

छप्पन भोग छत्तीसों व्यंजन, नाना विधि के कंद ।1।

महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह

दुर्योधन घर मेवा त्यागी, तो शाक विदुर घर पायो ।2।

महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह

भीलनी के बेर सुदामा के तंदुल, रुचि रुचि भोग लगाओ 131

महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह

करमा बाई को खीचड़ो खायो, तो भक्ता को मान बढ़ायो 141

महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह

नारद मुनि पनवाड़ो ल्याये, तो जल भर ल्याये श्री गंग ।5।

महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह

लक्ष्मी जी भोजन आप बनावे, तो मन में बहुत उमंग ।

महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह 161

चारों भैया जीमन बैठे, तो मात् कोशल्या उमंग।

महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह 161

प्रेम भाव से भोजन करियो, तो करियो बहुत आनंद।

महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह 171

सनक सनंदन चंवर डुलावत, तो गावत वेद अनन्त ।

महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह 18।

दास वैजन्ती गाली जो गावें, तो मन में बहुत उमंग ।

महाप्रभु आरोगो नृसिंह दयानिधि आरोगो नृसिंह 191

आओ जी कन्हैया आपा चौपड़ खेला, आओ जी सांवरिया आपा चौपड़ खेला तो बाजी लगाई गुरु ज्ञान की ले, तो जाइजे रै कांनुडा बीडो पान की ।10।

पान की रे पान की और रस ज्ञान की, और गुरु ज्ञान की, और माता जानकी, ले तो जाइजे रै कांनुडा बीडो पान की ।11।`
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
