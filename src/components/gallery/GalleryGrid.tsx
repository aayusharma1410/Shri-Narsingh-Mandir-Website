
import { useLanguage } from "@/contexts/LanguageContext";

const images = [
  // 12 previous images
  { src: "/lovable-uploads/7f625b19-cd60-4f0e-815b-774a886a698e.png" },
  { src: "/lovable-uploads/114d810c-7bc8-433e-8da5-8b80adbac600.png" },
  { src: "/lovable-uploads/20b24d22-a8be-4b63-9a74-fe44c6f8843f.png" },
  { src: "/lovable-uploads/fab70008-4000-4a0e-8a0a-ece0dd5ee144.png" },
  { src: "/lovable-uploads/16280244-f8b7-4105-b8b6-562659b3ed9c.png" },
  { src: "/lovable-uploads/f28caddc-d06c-4910-8e58-0ed8c7d65e26.png" },
  { src: "/lovable-uploads/ef89bde4-5c89-4826-98c5-b3a0f6cc27e4.png" },
  { src: "/lovable-uploads/054159d4-7d82-4bfc-97ce-2bfb2eea9143.png" },
  { src: "/lovable-uploads/74292dca-a549-4ab9-b368-1eef3369b839.png" },
  { src: "/lovable-uploads/fcd644c0-acd1-4dcc-b433-185b6ecdd7da.png" },
  { src: "/lovable-uploads/e1ec8cb5-cd7f-4ccc-af2d-3d49b63fbdb1.png" },
  { src: "/lovable-uploads/1680ae5b-154e-44e4-8952-f8c18b49388e.png" },
  // 12 newly uploaded images
  { src: "/lovable-uploads/5a1e4af3-b020-4c99-b58b-de4b945ee812.png" },
  { src: "/lovable-uploads/df14dcdf-ed4f-4032-9560-dbe4dcbdc341.png" },
  { src: "/lovable-uploads/6c11a880-b3fa-4c19-bc35-09e68493c012.png" },
  { src: "/lovable-uploads/9aa0c848-a330-4f5a-a856-6ad42f62be24.png" },
  { src: "/lovable-uploads/3a83f1a0-a79f-4006-b708-e3369a0a90dd.png" },
  { src: "/lovable-uploads/5cdbe381-92a0-49f5-8974-820e78fc4362.png" },
  { src: "/lovable-uploads/116ef74c-c14f-4bdf-a99e-dd445a1e5d2d.png" },
  { src: "/lovable-uploads/5c19a53c-3671-4c29-935a-b85d4a24da1c.png" },
  { src: "/lovable-uploads/f43a6fd8-f8c0-49fc-a387-73caba0e4e59.png" },
  { src: "/lovable-uploads/a14b1784-2068-45bc-82cd-93db94df081e.png" },
  { src: "/lovable-uploads/4a1f2dca-56b7-44f2-bf1c-22177fe88ae0.png" },
  { src: "/lovable-uploads/8fc518e9-689c-4416-95ad-ece33b8a34db.png" },
];

const GalleryGrid = () => {
  // Language in case needed for future, but not using captions now.
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
            alt={`Temple gallery image ${idx + 1}`}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
