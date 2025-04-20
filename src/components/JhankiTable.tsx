
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';

interface JhankiStory {
  id: number;
  name: string;
  name_hi: string;
  story: string;
  story_hi: string;
}

const JhankiTable = () => {
  const { language, t } = useLanguage();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  
  // Sample data for Jhanki stories
  const jhankiStories: JhankiStory[] = [
    {
      id: 1,
      name: "Shri Narsingh Avatar",
      name_hi: "श्री नरसिंह अवतार",
      story: "The fourth avatar of Lord Vishnu, who appeared to protect his devotee Prahlad.",
      story_hi: "भगवान विष्णु का चौथा अवतार, जो अपने भक्त प्रह्लाद की रक्षा के लिए प्रकट हुए थे।"
    },
    {
      id: 2,
      name: "Krishna Leela",
      name_hi: "कृष्ण लीला",
      story: "Depicts Lord Krishna's divine plays during his childhood in Vrindavan.",
      story_hi: "वृंदावन में बचपन के दौरान भगवान कृष्ण की दिव्य लीलाओं को दर्शाती है।"
    },
    {
      id: 3,
      name: "Ram Darbar",
      name_hi: "राम दरबार",
      story: "Depicts Lord Ram's court after his coronation as the King of Ayodhya.",
      story_hi: "अयोध्या के राजा के रूप में राजतिलक के बाद भगवान राम के दरबार को दर्शाती है।"
    },
    {
      id: 4,
      name: "Shiv Parivar",
      name_hi: "शिव परिवार",
      story: "Shows Lord Shiva with his family including Parvati, Ganesh, and Kartikeya.",
      story_hi: "भगवान शिव को पार्वती, गणेश और कार्तिकेय सहित उनके परिवार के साथ दिखाती है।"
    },
    {
      id: 5,
      name: "Ganesh Sthapana",
      name_hi: "गणेश स्थापना",
      story: "The ceremonial installation of Lord Ganesh, the remover of obstacles.",
      story_hi: "विघ्नहर्ता भगवान गणेश की औपचारिक स्थापना।"
    },
    {
      id: 6,
      name: "Durga Mata",
      name_hi: "दुर्गा माता",
      story: "Depicts Goddess Durga victorious after slaying the demon Mahishasura.",
      story_hi: "महिषासुर का वध करने के बाद विजयी देवी दुर्गा को दर्शाती है।"
    },
    {
      id: 7,
      name: "Saraswati Puja",
      name_hi: "सरस्वती पूजा",
      story: "Worship of Goddess Saraswati, the deity of knowledge and arts.",
      story_hi: "ज्ञान और कला की देवी सरस्वती की पूजा।"
    },
    {
      id: 8,
      name: "Vishnu Shayanam",
      name_hi: "विष्णु शयनम्",
      story: "Lord Vishnu reclining on Sheshnag in the cosmic ocean.",
      story_hi: "कॉस्मिक महासागर में शेषनाग पर विश्राम करते हुए भगवान विष्णु।"
    },
    {
      id: 9,
      name: "Lakshmi Narayan",
      name_hi: "लक्ष्मी नारायण",
      story: "The divine couple Goddess Lakshmi and Lord Vishnu seated together.",
      story_hi: "दिव्य जोड़ी देवी लक्ष्मी और भगवान विष्णु एक साथ विराजमान।"
    },
    {
      id: 10,
      name: "Hanuman Chalisa",
      name_hi: "हनुमान चालीसा",
      story: "Depicts Lord Hanuman, the epitome of devotion and strength.",
      story_hi: "भक्ति और शक्ति के प्रतीक भगवान हनुमान को दर्शाती है।"
    },
    {
      id: 11,
      name: "Radha Krishna",
      name_hi: "राधा कृष्ण",
      story: "The divine love between Radha and Krishna, symbolizing devotion.",
      story_hi: "राधा और कृष्ण के बीच दिव्य प्रेम, भक्ति का प्रतीक।"
    },
    {
      id: 12,
      name: "Ganga Avtaran",
      name_hi: "गंगा अवतरण",
      story: "The descent of River Ganges from the heavens to Earth.",
      story_hi: "स्वर्ग से पृथ्वी पर गंगा नदी का अवतरण।"
    },
    {
      id: 13,
      name: "Dashavatar",
      name_hi: "दशावतार",
      story: "The ten primary incarnations of Lord Vishnu over different cosmic ages.",
      story_hi: "विभिन्न युगों में भगवान विष्णु के दस प्रमुख अवतार।"
    },
    {
      id: 14,
      name: "Navagraha",
      name_hi: "नवग्रह",
      story: "The nine celestial bodies that influence human life according to Vedic astrology.",
      story_hi: "वैदिक ज्योतिष के अनुसार मानव जीवन को प्रभावित करने वाले नौ आकाशीय पिंड।"
    },
    {
      id: 15,
      name: "Kali Mata",
      name_hi: "काली माता",
      story: "The fierce form of Goddess Durga, destroyer of evil forces.",
      story_hi: "देवी दुर्गा का उग्र रूप, बुरी शक्तियों का विनाश करने वाली।"
    },
    {
      id: 16,
      name: "Surya Dev",
      name_hi: "सूर्य देव",
      story: "Worship of the Sun God, the source of energy and life.",
      story_hi: "ऊर्जा और जीवन के स्रोत सूर्य देव की पूजा।"
    },
    {
      id: 17,
      name: "Santoshi Mata",
      name_hi: "संतोषी माता",
      story: "The goddess of satisfaction, born from the combined energies of other goddesses.",
      story_hi: "संतोष की देवी, अन्य देवियों की संयुक्त शक्तियों से उत्पन्न।"
    },
    {
      id: 18,
      name: "Kartikeya",
      name_hi: "कार्तिकेय",
      story: "The son of Lord Shiva, commander of the army of devas.",
      story_hi: "भगवान शिव के पुत्र, देवताओं की सेना के सेनापति।"
    },
    {
      id: 19,
      name: "Annapurna Devi",
      name_hi: "अन्नपूर्णा देवी",
      story: "The goddess of food and nourishment, an aspect of Parvati.",
      story_hi: "भोजन और पोषण की देवी, पार्वती का एक रूप।"
    },
    {
      id: 20,
      name: "Dattatreya",
      name_hi: "दत्तात्रेय",
      story: "The combined form of the trinity: Brahma, Vishnu, and Shiva.",
      story_hi: "त्रिमूर्ति का संयुक्त रूप: ब्रह्मा, विष्णु और शिव।"
    },
    {
      id: 21,
      name: "Sita Swayamvar",
      name_hi: "सीता स्वयंवर",
      story: "The event where Sita chose Ram as her husband by garlanding him.",
      story_hi: "वह घटना जहां सीता ने राम को माला पहनाकर अपने पति के रूप में चुना था।"
    },
    {
      id: 22,
      name: "Krishna Arjun Rath",
      name_hi: "कृष्ण अर्जुन रथ",
      story: "Lord Krishna giving Bhagavad Gita discourse to Arjun on the battlefield.",
      story_hi: "युद्धक्षेत्र में भगवान कृष्ण द्वारा अर्जुन को भगवद गीता का उपदेश।"
    },
    {
      id: 23,
      name: "Samudra Manthan",
      name_hi: "समुद्र मंथन",
      story: "The churning of the ocean by devas and asuras to obtain amrit.",
      story_hi: "अमृत प्राप्त करने के लिए देवताओं और असुरों द्वारा समुद्र का मंथन।"
    },
    {
      id: 24,
      name: "Gayatri Mata",
      name_hi: "गायत्री माता",
      story: "The personification of the Gayatri Mantra, representing enlightenment.",
      story_hi: "गायत्री मंत्र का साकार रूप, ज्ञान का प्रतिनिधित्व करती हुई।"
    },
    {
      id: 25,
      name: "Satyanarayan Katha",
      name_hi: "सत्यनारायण कथा",
      story: "The holy narrative of Lord Vishnu in his form as Satyanarayan.",
      story_hi: "सत्यनारायण के रूप में भगवान विष्णु की पवित्र कथा।"
    },
  ];

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-temple-maroon text-center">
        {t('jhanki.title')}
      </h2>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-temple-cream">
              <TableHead className="w-20 text-temple-maroon font-bold">
                {t('jhanki.columnHeaders.sno')}
              </TableHead>
              <TableHead className="text-temple-maroon font-bold">
                {t('jhanki.columnHeaders.name')}
              </TableHead>
              <TableHead className="text-temple-maroon font-bold">
                {t('jhanki.columnHeaders.story')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jhankiStories.map((jhanki) => (
              <TableRow 
                key={jhanki.id}
                className={`
                  transition-all duration-200 
                  ${hoveredRow === jhanki.id ? 'bg-temple-gold/10' : 'hover:bg-temple-cream/30'}`
                }
                onMouseEnter={() => setHoveredRow(jhanki.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <TableCell className="font-medium">{jhanki.id}</TableCell>
                <TableCell className="font-medium text-temple-maroon">
                  {language === 'en' ? jhanki.name : jhanki.name_hi}
                </TableCell>
                <TableCell>
                  {language === 'en' ? jhanki.story : jhanki.story_hi}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JhankiTable;
