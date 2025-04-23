
import { useLanguage } from "@/contexts/LanguageContext";

const images = [
  {
    src: "/lovable-uploads/7f625b19-cd60-4f0e-815b-774a886a698e.png",
    altEn: "Narsingh Tiger Face Closeup",
    altHi: "नरसिंह सिंह मुख क्लोजअप",
  },
  {
    src: "/lovable-uploads/114d810c-7bc8-433e-8da5-8b80adbac600.png",
    altEn: "Full Altar Narsingh",
    altHi: "पूर्ण वेदी नरसिंह",
  },
  {
    src: "/lovable-uploads/20b24d22-a8be-4b63-9a74-fe44c6f8843f.png",
    altEn: "Narsingh golden Prakatosav",
    altHi: "नरसिंह स्वर्ण प्रकटोत्सव",
  },
  {
    src: "/lovable-uploads/fab70008-4000-4a0e-8a0a-ece0dd5ee144.png",
    altEn: "Darshan - White Outfit",
    altHi: "दर्शन - सफेद पोशाक",
  },
  {
    src: "/lovable-uploads/16280244-f8b7-4105-b8b6-562659b3ed9c.png",
    altEn: "Narsingh Altar Flower Arch",
    altHi: "नरसिंह वेदी पुष्प तोरण",
  },
  {
    src: "/lovable-uploads/f28caddc-d06c-4910-8e58-0ed8c7d65e26.png",
    altEn: "Altar Red Shringar",
    altHi: "वेदी लाल श्रृंगार",
  },
  {
    src: "/lovable-uploads/ef89bde4-5c89-4826-98c5-b3a0f6cc27e4.png",
    altEn: "Red Dress Closeup",
    altHi: "लाल पोशाक क्लोजअप",
  },
  {
    src: "/lovable-uploads/054159d4-7d82-4bfc-97ce-2bfb2eea9143.png",
    altEn: "Narsingh Altar Wide",
    altHi: "नरसिंह वेदी चौड़ा",
  },
  {
    src: "/lovable-uploads/74292dca-a549-4ab9-b368-1eef3369b839.png",
    altEn: "Blue-dressed Face Closeup",
    altHi: "नीली पोशाक में मुख क्लोजअप",
  },
  {
    src: "/lovable-uploads/fcd644c0-acd1-4dcc-b433-185b6ecdd7da.png",
    altEn: "Yellow-Orange Dress Full Altar",
    altHi: "पीली-नारंगी पोशाक वेदी",
  },
  {
    src: "/lovable-uploads/e1ec8cb5-cd7f-4ccc-af2d-3d49b63fbdb1.png",
    altEn: "Yellow-Orange Dress Closeup",
    altHi: "पीली-नारंगी पोशाक क्लोजअप",
  },
  {
    src: "/lovable-uploads/1680ae5b-154e-44e4-8952-f8c18b49388e.png",
    altEn: "Yellow-Orange Dress Upper Closeup",
    altHi: "पीली-नारंगी पोशाक ऊपर क्लोजअप",
  },
];

const GalleryGrid = () => {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer flex flex-col"
        >
          <img
            src={img.src}
            alt={language === "en" ? img.altEn : img.altHi}
            className="w-full h-64 object-cover"
          />
          <div className="p-3 flex flex-col items-center">
            <p className="font-medium text-temple-maroon text-center text-base">
              {language === "en" ? img.altEn : img.altHi}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
