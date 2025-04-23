
import GalleryGrid from "./gallery/GalleryGrid";
import { useLanguage } from "@/contexts/LanguageContext";

const GallerySection = () => {
  const { language } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-temple-maroon mb-2">
          {language === "en" ? "Temple Gallery" : "मंदिर गैलरी"}
        </h2>
        <p className="text-lg text-neutral-600">
          {language === "en"
            ? "View beautiful glimpses from the temple."
            : "यहाँ मंदिर से जुड़ी सुंदर झलकियाँ देखें।"}
        </p>
      </div>
      <GalleryGrid />
    </section>
  );
};

export default GallerySection;
