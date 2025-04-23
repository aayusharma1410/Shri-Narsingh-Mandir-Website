
import { useLanguage } from "@/contexts/LanguageContext";

const images = [
  // ... original 24 images
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

  // 12 images from previous uploads (add their URLs)
  { src: "/lovable-uploads/96f3551d-605e-457c-8298-87a262fac624.png" },
  { src: "/lovable-uploads/9577bbf3-23e3-4946-8e97-3d8165e6fe23.png" },
  { src: "/lovable-uploads/254331c3-94d3-4840-a1b3-1cb946358993.png" },
  { src: "/lovable-uploads/44eb1178-dd52-4031-ad69-a188e9f3bd7d.png" },
  { src: "/lovable-uploads/fbf6abc0-ad91-467b-a5c0-4f9426696da3.png" },
  { src: "/lovable-uploads/a8e0c849-219a-4e0f-bf53-5ec44439c492.png" },
  { src: "/lovable-uploads/4c74e40e-9938-4b62-b142-5590239e67e1.png" },
  { src: "/lovable-uploads/b5d21303-402d-426d-8b8c-fdf8df9e9338.png" },
  { src: "/lovable-uploads/2ef8ca7a-ad0f-4108-89fd-d1d3776f4ec0.png" },
  { src: "/lovable-uploads/24746a93-d748-4066-8c3e-66aacc8e8a98.png" },
  { src: "/lovable-uploads/4950fa95-d67e-4632-94d6-4ca3c8b49248.png" },
  { src: "/lovable-uploads/8a1999f9-f5b4-4906-a68b-932dbe3470f9.png" },

  // The 12 images you just uploaded (add their URLs)
  { src: "/lovable-uploads/d6748ab9-ba86-43ed-9152-cefb21daaf10.png" }, // 1
  { src: "/lovable-uploads/c36033bb-02ff-4b42-b558-d1e83771ff7e.png" }, // 2
  { src: "/lovable-uploads/ebc0df1a-b578-4efc-90ee-b08f99ff58c2.png" }, // 3
  { src: "/lovable-uploads/53b33278-c7f2-4170-92f4-c7f4521c9afc.png" }, // 4
  { src: "/lovable-uploads/39262e1c-3850-4267-ab13-214e3daaecd6.png" }, // 5
  { src: "/lovable-uploads/afb5b125-2a34-4d5d-816a-4ef4fee2215c.png" }, // 6
  { src: "/lovable-uploads/ba05b727-c445-43b8-bf38-1a7e7f52a76f.png" }, // 7
  { src: "/lovable-uploads/dda0f0f2-aa8d-4b8c-9e5f-8a8601fd6e62.png" }, // 8
  { src: "/lovable-uploads/eb566ea2-26fe-419c-b158-28e718bc37d2.png" }, // 9
  { src: "/lovable-uploads/27d352ba-6dfa-4e61-be45-7e42260962bb.png" }, // 10
  { src: "/lovable-uploads/c344df14-3852-475c-80f9-c09db77b79b1.png" }, // 11
  { src: "/lovable-uploads/68572ab7-cbe0-431d-a29e-23dd45799e33.png" }, // 12
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
            alt={`Temple gallery image`}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
