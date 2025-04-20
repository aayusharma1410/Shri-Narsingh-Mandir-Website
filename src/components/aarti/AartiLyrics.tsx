import { Button } from "@/components/ui/button";
import { Music } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AartiLyricsProps {
  selectedAarti: string;
  onAartiSelect: (aarti: string) => void;
}

const AartiLyrics = ({ selectedAarti, onAartiSelect }: AartiLyricsProps) => {
  const { language } = useLanguage();

  return (
    <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-temple-gold/20 shadow-xl">
      <div className="flex items-center mb-6">
        <Music className="w-8 h-8 text-temple-maroon mr-3" />
        <h3 className="font-serif text-2xl font-bold text-temple-maroon">आरती</h3>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-center space-x-4 mb-8">
          <Button 
            variant={selectedAarti === "om-jai-jagdish" ? "default" : "outline"} 
            onClick={() => onAartiSelect("om-jai-jagdish")}
            className={selectedAarti === "om-jai-jagdish" ? "bg-temple-gold hover:bg-temple-gold/90" : ""}
          >
            ॐ जय जगदीश हरे
          </Button>
          <Button 
            variant={selectedAarti === "narsingh-aarti" ? "default" : "outline"} 
            onClick={() => onAartiSelect("narsingh-aarti")}
            className={selectedAarti === "narsingh-aarti" ? "bg-temple-gold hover:bg-temple-gold/90" : ""}
          >
            नृसिंह बाबा की आरती
          </Button>
          <Button 
            variant={selectedAarti === "bhog-aarti" ? "default" : "outline"} 
            onClick={() => onAartiSelect("bhog-aarti")}
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
  );
};

export default AartiLyrics;
