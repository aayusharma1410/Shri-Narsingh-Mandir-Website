
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface JhankiItem {
  id: number;
  name: string;
  name_hi: string;
  story: string;
  story_hi: string;
}

const jhankiData: JhankiItem[] = [
  { 
    id: 1, 
    name: "Lord Narsingh's Appearance", 
    name_hi: "भगवान नृसिंह का प्रकट्य",
    story: "The story of Lord Narsingh appearing from a pillar to protect His devotee Prahlad.", 
    story_hi: "भगवान नृसिंह के एक स्तंभ से प्रकट होकर अपने भक्त प्रहलाद की रक्षा करने की कहानी।"
  },
  { 
    id: 2, 
    name: "Hiranyakashipu's Penance", 
    name_hi: "हिरण्यकशिपु की तपस्या",
    story: "The demon king performed severe penance to gain immortality from Lord Brahma.", 
    story_hi: "राक्षस राजा ने ब्रह्मा जी से अमरत्व प्राप्त करने के लिए कठोर तपस्या की।"
  },
  { 
    id: 3, 
    name: "Prahlad's Devotion", 
    name_hi: "प्रहलाद की भक्ति",
    story: "Despite his father's threats, Prahlad remained devoted to Lord Vishnu.", 
    story_hi: "अपने पिता की धमकियों के बावजूद, प्रहलाद भगवान विष्णु के प्रति समर्पित रहे।"
  },
  { 
    id: 4, 
    name: "Lord Vishnu's Promise", 
    name_hi: "भगवान विष्णु का वादा",
    story: "Lord Vishnu promised to protect His devotees in any situation.", 
    story_hi: "भगवान विष्णु ने किसी भी परिस्थिति में अपने भक्तों की रक्षा करने का वादा किया।"
  },
  { 
    id: 5, 
    name: "Holika Dahan", 
    name_hi: "होलिका दहन",
    story: "Hiranyakashipu asked his sister Holika to take Prahlad into a fire, but she was burnt instead.", 
    story_hi: "हिरण्यकशिपु ने अपनी बहन होलिका से प्रहलाद को आग में ले जाने को कहा, लेकिन उसके बजाय वह जल गई।"
  },
  { 
    id: 6, 
    name: "The Final Challenge", 
    name_hi: "अंतिम चुनौती",
    story: "Hiranyakashipu challenged Prahlad to show Lord Vishnu in a pillar.", 
    story_hi: "हिरण्यकशिपु ने प्रहलाद को एक स्तंभ में भगवान विष्णु को दिखाने की चुनौती दी।"
  },
  { 
    id: 7, 
    name: "The Pillar's Breaking", 
    name_hi: "स्तंभ का टूटना",
    story: "When Hiranyakashipu struck the pillar in anger, it broke and Lord Narsingh appeared.", 
    story_hi: "जब हिरण्यकशिपु ने क्रोध में स्तंभ पर प्रहार किया, तो वह टूट गया और भगवान नृसिंह प्रकट हुए।"
  },
  { 
    id: 8, 
    name: "The Half-Man Half-Lion Form", 
    name_hi: "आधा-मानव आधा-सिंह रूप",
    story: "Lord Vishnu took the form of half-man half-lion, which wasn't covered in Hiranyakashipu's boons.", 
    story_hi: "भगवान विष्णु ने आधा-मानव आधा-सिंह का रूप लिया, जो हिरण्यकशिपु के वरदानों में शामिल नहीं था।"
  },
  { 
    id: 9, 
    name: "Twilight Hour", 
    name_hi: "संध्या काल",
    story: "Lord Narsingh appeared at twilight, when it was neither day nor night.", 
    story_hi: "भगवान नृसिंह संध्या काल में प्रकट हुए, जब न दिन था और न ही रात।"
  },
  { 
    id: 10, 
    name: "On the Threshold", 
    name_hi: "देहली पर",
    story: "The demon was killed on the threshold, neither inside nor outside.", 
    story_hi: "राक्षस को देहली पर मारा गया, न अंदर, न बाहर।"
  },
  { 
    id: 11, 
    name: "Lord's Claws", 
    name_hi: "भगवान के नाखून",
    story: "Lord used His claws, which were neither a weapon nor a non-weapon.", 
    story_hi: "भगवान ने अपने नाखूनों का उपयोग किया, जो न तो हथियार थे और न ही गैर-हथियार।"
  },
  { 
    id: 12, 
    name: "On the Lap", 
    name_hi: "गोद में",
    story: "The demon was placed on Lord's lap, neither on earth nor in the sky.", 
    story_hi: "राक्षस को भगवान की गोद में रखा गया, न तो धरती पर और न ही आकाश में।"
  },
  { 
    id: 13, 
    name: "Protection of Devotees", 
    name_hi: "भक्तों की सुरक्षा",
    story: "This avatar demonstrated Lord Vishnu's promise to protect His true devotees.", 
    story_hi: "इस अवतार ने अपने सच्चे भक्तों की रक्षा करने के भगवान विष्णु के वादे को प्रदर्शित किया।"
  },
  { 
    id: 14, 
    name: "Lord's Anger", 
    name_hi: "भगवान का क्रोध",
    story: "The Lord was so angry that no one could calm Him down except Goddess Lakshmi.", 
    story_hi: "भगवान इतने क्रोधित थे कि देवी लक्ष्मी के अलावा कोई भी उन्हें शांत नहीं कर सकता था।"
  },
  { 
    id: 15, 
    name: "Prahlad's Prayer", 
    name_hi: "प्रहलाद की प्रार्थना",
    story: "Prahlad prayed to the Lord to calm down and show mercy.", 
    story_hi: "प्रहलाद ने भगवान से शांत होने और दया दिखाने की प्रार्थना की।"
  },
  { 
    id: 16, 
    name: "Narsingh's Blessing", 
    name_hi: "नृसिंह का आशीर्वाद",
    story: "Lord Narsingh blessed Prahlad and made him the king.", 
    story_hi: "भगवान नृसिंह ने प्रहलाद को आशीर्वाद दिया और उन्हें राजा बनाया।"
  },
  { 
    id: 17, 
    name: "The Cosmic Form", 
    name_hi: "विश्वरूप",
    story: "After killing Hiranyakashipu, Lord showed His cosmic form to the devas.", 
    story_hi: "हिरण्यकशिपु को मारने के बाद, भगवान ने देवताओं को अपना विश्वरूप दिखाया।"
  },
  { 
    id: 18, 
    name: "Lakshmi's Arrival", 
    name_hi: "लक्ष्मी का आगमन",
    story: "Goddess Lakshmi appeared to pacify Lord Narsingh.", 
    story_hi: "भगवान नृसिंह को शांत करने के लिए देवी लक्ष्मी प्रकट हुईं।"
  },
  { 
    id: 19, 
    name: "The Divine Couple", 
    name_hi: "दिव्य जोड़ी",
    story: "After being pacified, Lord Narsingh and Goddess Lakshmi blessed the universe together.", 
    story_hi: "शांत होने के बाद, भगवान नृसिंह और देवी लक्ष्मी ने एक साथ ब्रह्मांड को आशीर्वाद दिया।"
  },
  { 
    id: 20, 
    name: "The Shaligram Form", 
    name_hi: "शालिग्राम रूप",
    story: "In Hasampur, Lord Narsingh appeared in a Shaligram form under a musical stone.", 
    story_hi: "हसामपुर में, भगवान नृसिंह एक बाजनी शिला के नीचे शालिग्राम रूप में प्रकट हुए।"
  },
  { 
    id: 21, 
    name: "The Temple's Founding", 
    name_hi: "मंदिर की स्थापना",
    story: "The temple was established after the miraculous appearance of the Lord.", 
    story_hi: "भगवान के चमत्कारिक प्रकटीकरण के बाद मंदिर की स्थापना की गई थी।"
  },
  { 
    id: 22, 
    name: "Daily Worship", 
    name_hi: "दैनिक पूजा",
    story: "The Shaligram form is worshipped daily with devotion and rituals.", 
    story_hi: "शालिग्राम रूप की दैनिक भक्ति और अनुष्ठानों के साथ पूजा की जाती है।"
  },
  { 
    id: 23, 
    name: "Narsingh Jayanti", 
    name_hi: "नृसिंह जयंती",
    story: "The appearance day of Lord Narsingh is celebrated with great fervor at the temple.", 
    story_hi: "भगवान नृसिंह के प्रकटीकरण दिवस को मंदिर में बड़े उत्साह के साथ मनाया जाता है।"
  },
  { 
    id: 24, 
    name: "Special Aartis", 
    name_hi: "विशेष आरतियां",
    story: "Morning and evening aartis are performed in traditional style with full devotion.", 
    story_hi: "सुबह और शाम की आरतियां पारंपरिक शैली में पूर्ण भक्ति के साथ की जाती हैं।"
  },
  { 
    id: 25, 
    name: "Poshak Seva", 
    name_hi: "पोशाक सेवा",
    story: "Devotees offer special garments to Lord Narsingh on special occasions.", 
    story_hi: "भक्त विशेष अवसरों पर भगवान नृसिंह को विशेष वस्त्र अर्पित करते हैं।"
  },
];

const JhankiTable = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const filteredData = jhankiData.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return language === 'en' 
      ? item.name.toLowerCase().includes(searchLower) || item.story.toLowerCase().includes(searchLower)
      : item.name_hi.toLowerCase().includes(searchLower) || item.story_hi.toLowerCase().includes(searchLower);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-temple-gold/20">
        <CardContent className="pt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-temple-maroon mb-4 text-center">
              {language === 'en' ? 'Jhanki Stories' : 'झांकी कथाएं'}
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input 
                placeholder={language === 'en' ? "Search stories..." : "कथाएं खोजें..."}
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-temple-gold/10 text-temple-maroon">
                  <th className="py-3 px-4 text-left border-b border-temple-gold/20">
                    {language === 'en' ? 'S.No' : 'क्र.सं.'}
                  </th>
                  <th className="py-3 px-4 text-left border-b border-temple-gold/20">
                    {language === 'en' ? 'Jhanki Name' : 'झांकी का नाम'}
                  </th>
                  <th className="py-3 px-4 text-left border-b border-temple-gold/20">
                    {language === 'en' ? 'Story' : 'कथा'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr 
                    key={item.id}
                    className={`transition-colors duration-200 ${
                      hoveredRow === item.id 
                        ? 'bg-temple-gold/10' 
                        : 'hover:bg-temple-gold/5'
                    }`}
                    onMouseEnter={() => setHoveredRow(item.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="py-3 px-4 border-b border-temple-gold/10">{item.id}</td>
                    <td className="py-3 px-4 border-b border-temple-gold/10 font-medium">
                      {language === 'en' ? item.name : item.name_hi}
                    </td>
                    <td className="py-3 px-4 border-b border-temple-gold/10">
                      {language === 'en' ? item.story : item.story_hi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JhankiTable;
