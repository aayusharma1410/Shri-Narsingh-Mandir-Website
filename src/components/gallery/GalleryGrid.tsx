import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

// Previous images array as reference
const previousImages = [
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
  { src: "/lovable-uploads/d6748ab9-ba86-43ed-9152-cefb21daaf10.png" },
  { src: "/lovable-uploads/c36033bb-02ff-4b42-b558-d1e83771ff7e.png" },
  { src: "/lovable-uploads/ebc0df1a-b578-4efc-90ee-b08f99ff58c2.png" },
  { src: "/lovable-uploads/53b33278-c7f2-4170-92f4-c7f4521c9afc.png" },
  { src: "/lovable-uploads/39262e1c-3850-4267-ab13-214e3daaecd6.png" },
  { src: "/lovable-uploads/afb5b125-2a34-4d5d-816a-4ef4fee2215c.png" },
  { src: "/lovable-uploads/ba05b727-c445-43b8-bf38-1a7e7f52a76f.png" },
  { src: "/lovable-uploads/dda0f0f2-aa8d-4b8c-9e5f-8a8601fd6e62.png" },
  { src: "/lovable-uploads/eb566ea2-26fe-419c-b158-28e718bc37d2.png" },
  { src: "/lovable-uploads/27d352ba-6dfa-4e61-be45-7e42260962bb.png" },
  { src: "/lovable-uploads/c344df14-3852-475c-80f9-c09db77b79b1.png" },
  { src: "/lovable-uploads/68572ab7-cbe0-431d-a29e-23dd45799e33.png" },
  // --- Your newly uploaded images below ---
  { src: "/lovable-uploads/6b1f973a-fc17-4450-abe6-8d8e0e16b07c.png" },
  { src: "/lovable-uploads/da3e6c3e-0fc4-42b9-9944-72c3bf5444fa.png" },
  { src: "/lovable-uploads/a911e7b9-9539-40a6-922c-a27368b307f9.png" },
  { src: "/lovable-uploads/bbb79916-521a-4846-9394-745007e9586b.png" },
  { src: "/lovable-uploads/4b566f3c-130c-4606-9a4a-6dc8fa6fc08f.png" },
  { src: "/lovable-uploads/f4096cab-75a2-4b34-8a37-cb345eb06781.png" },
  { src: "/lovable-uploads/841399d7-9c7a-4c42-bd96-2cb640e49ad7.png" },
  { src: "/lovable-uploads/73fa08e5-2eb8-4fae-b65a-9d4400b01344.png" },
  { src: "/lovable-uploads/7710d07a-f630-4c83-a307-1b40d8807f51.png" },
  { src: "/lovable-uploads/66fc9910-e292-48e3-a8f7-9c280d607e98.png" },
  { src: "/lovable-uploads/24bfad22-2358-4a02-a411-c1c69ca58ed2.png" },
  { src: "/lovable-uploads/fff58530-94ce-45c6-8026-01d8730f161f.png" },
  // images just attached in chat
  { src: "/lovable-uploads/temple-img-1.jpg" }, // Will reference the uploaded images by order:
  { src: "/lovable-uploads/temple-img-2.jpg" },
  { src: "/lovable-uploads/temple-img-3.jpg" },
  { src: "/lovable-uploads/temple-img-4.jpg" },
  { src: "/lovable-uploads/temple-img-5.jpg" },
  { src: "/lovable-uploads/temple-img-6.jpg" },
  { src: "/lovable-uploads/temple-img-7.jpg" },
  { src: "/lovable-uploads/temple-img-8.jpg" },
  { src: "/lovable-uploads/temple-img-9.jpg" },
  { src: "/lovable-uploads/temple-img-10.jpg" },
  { src: "/lovable-uploads/temple-img-11.jpg" },
  { src: "/lovable-uploads/temple-img-12.jpg" },
];

// New temple images uploaded by the user
const newTempleImages = [
  { src: "/lovable-uploads/48ed701e-7287-4e88-8e05-8cdce5a33872.png", alt: "Shri Narsingh Dev with detailed crown and ornaments" },
  { src: "/lovable-uploads/24d5cf2b-6b6f-40ab-ab45-3b9bcf80da80.png", alt: "Shri Narsingh Dev with floral decoration" },
  { src: "/lovable-uploads/06d2cf4e-3b98-49a4-b5d4-3084bc0f17c5.png", alt: "Shri Narsingh Dev with yellow ornaments" },
  { src: "/lovable-uploads/dfce9811-506f-4eee-9ce3-516beaa83c38.png", alt: "Shri Narsingh Dev shrine full view" },
  { src: "/lovable-uploads/f0593bba-d3b5-4444-8065-363b7e5b56c7.png", alt: "Shri Narsingh Dev with tiger mount" },
  { src: "/lovable-uploads/734c1704-9c8e-40d9-83cf-5c81a49cc412.png", alt: "Shri Narsingh Dev with tiger mount and floral decoration" },
  { src: "/lovable-uploads/f3e377c3-c72e-4bff-9a88-474683a54ecb.png", alt: "Temple ritual with devotees" },
  { src: "/lovable-uploads/5f96b252-4b07-489f-9701-2b20a02e3c28.png", alt: "Decorated temple shrine" },
];

const images = [
  { src: "/lovable-uploads/7f625b19-cd60-4f0e-815b-774a886a698e.png", alt: "Temple image" },
  { src: "/lovable-uploads/114d810c-7bc8-433e-8da5-8b80adbac600.png", alt: "Temple image" },
  { src: "/lovable-uploads/20b24d22-a8be-4b63-9a74-fe44c6f8843f.png", alt: "Temple image" },
  { src: "/lovable-uploads/fab70008-4000-4a0e-8a0a-ece0dd5ee144.png", alt: "Temple image" },
  { src: "/lovable-uploads/16280244-f8b7-4105-b8b6-562659b3ed9c.png", alt: "Temple image" },
  { src: "/lovable-uploads/f28caddc-d06c-4910-8e58-0ed8c7d65e26.png", alt: "Temple image" },
  { src: "/lovable-uploads/ef89bde4-5c89-4826-98c5-b3a0f6cc27e4.png", alt: "Temple image" },
  { src: "/lovable-uploads/054159d4-7d82-4bfc-97ce-2bfb2eea9143.png", alt: "Temple image" },
  { src: "/lovable-uploads/74292dca-a549-4ab9-b368-1eef3369b839.png", alt: "Temple image" },
  { src: "/lovable-uploads/fcd644c0-acd1-4dcc-b433-185b6ecdd7da.png", alt: "Temple image" },
  { src: "/lovable-uploads/e1ec8cb5-cd7f-4ccc-af2d-3d49b63fbdb1.png", alt: "Temple image" },
  { src: "/lovable-uploads/1680ae5b-154e-44e4-8952-f8c18b49388e.png", alt: "Temple image" },
  
  // Add all the previously defined images
  { src: "/lovable-uploads/5a1e4af3-b020-4c99-b58b-de4b945ee812.png", alt: "Temple image" },
  { src: "/lovable-uploads/df14dcdf-ed4f-4032-9560-dbe4dcbdc341.png", alt: "Temple image" },
  { src: "/lovable-uploads/6c11a880-b3fa-4c19-bc35-09e68493c012.png", alt: "Temple image" },
  { src: "/lovable-uploads/9aa0c848-a330-4f5a-a856-6ad42f62be24.png", alt: "Temple image" },
  { src: "/lovable-uploads/3a83f1a0-a79f-4006-b708-e3369a0a90dd.png", alt: "Temple image" },
  { src: "/lovable-uploads/5cdbe381-92a0-49f5-8974-820e78fc4362.png", alt: "Temple image" },
  { src: "/lovable-uploads/116ef74c-c14f-4bdf-a99e-dd445a1e5d2d.png", alt: "Temple image" },
  { src: "/lovable-uploads/5c19a53c-3671-4c29-935a-b85d4a24da1c.png", alt: "Temple image" },
  { src: "/lovable-uploads/f43a6fd8-f8c0-49fc-a387-73caba0e4e59.png", alt: "Temple image" },
  { src: "/lovable-uploads/a14b1784-2068-45bc-82cd-93db94df081e.png", alt: "Temple image" },
  { src: "/lovable-uploads/4a1f2dca-56b7-44f2-bf1c-22177fe88ae0.png", alt: "Temple image" },
  { src: "/lovable-uploads/8fc518e9-689c-4416-95ad-ece33b8a34db.png", alt: "Temple image" },
  { src: "/lovable-uploads/96f3551d-605e-457c-8298-87a262fac624.png", alt: "Temple image" },
  { src: "/lovable-uploads/9577bbf3-23e3-4946-8e97-3d8165e6fe23.png", alt: "Temple image" },
  { src: "/lovable-uploads/254331c3-94d3-4840-a1b3-1cb946358993.png", alt: "Temple image" },
  { src: "/lovable-uploads/44eb1178-dd52-4031-ad69-a188e9f3bd7d.png", alt: "Temple image" },
  { src: "/lovable-uploads/fbf6abc0-ad91-467b-a5c0-4f9426696da3.png", alt: "Temple image" },
  { src: "/lovable-uploads/a8e0c849-219a-4e0f-bf53-5ec44439c492.png", alt: "Temple image" },
  { src: "/lovable-uploads/4c74e40e-9938-4b62-b142-5590239e67e1.png", alt: "Temple image" },
  { src: "/lovable-uploads/b5d21303-402d-426d-8b8c-fdf8df9e9338.png", alt: "Temple image" },
  { src: "/lovable-uploads/2ef8ca7a-ad0f-4108-89fd-d1d3776f4ec0.png", alt: "Temple image" },
  { src: "/lovable-uploads/24746a93-d748-4066-8c3e-66aacc8e8a98.png", alt: "Temple image" },
  { src: "/lovable-uploads/4950fa95-d67e-4632-94d6-4ca3c8b49248.png", alt: "Temple image" },
  { src: "/lovable-uploads/8a1999f9-f5b4-4906-a68b-932dbe3470f9.png", alt: "Temple image" },
  { src: "/lovable-uploads/d6748ab9-ba86-43ed-9152-cefb21daaf10.png", alt: "Temple image" },
  { src: "/lovable-uploads/c36033bb-02ff-4b42-b558-d1e83771ff7e.png", alt: "Temple image" },
  { src: "/lovable-uploads/ebc0df1a-b578-4efc-90ee-b08f99ff58c2.png", alt: "Temple image" },
  { src: "/lovable-uploads/53b33278-c7f2-4170-92f4-c7f4521c9afc.png", alt: "Temple image" },
  { src: "/lovable-uploads/39262e1c-3850-4267-ab13-214e3daaecd6.png", alt: "Temple image" },
  { src: "/lovable-uploads/afb5b125-2a34-4d5d-816a-4ef4fee2215c.png", alt: "Temple image" },
  { src: "/lovable-uploads/ba05b727-c445-43b8-bf38-1a7e7f52a76f.png", alt: "Temple image" },
  { src: "/lovable-uploads/dda0f0f2-aa8d-4b8c-9e5f-8a8601fd6e62.png", alt: "Temple image" },
  { src: "/lovable-uploads/eb566ea2-26fe-419c-b158-28e718bc37d2.png", alt: "Temple image" },
  { src: "/lovable-uploads/27d352ba-6dfa-4e61-be45-7e42260962bb.png", alt: "Temple image" },
  { src: "/lovable-uploads/c344df14-3852-475c-80f9-c09db77b79b1.png", alt: "Temple image" },
  { src: "/lovable-uploads/68572ab7-cbe0-431d-a29e-23dd45799e33.png", alt: "Temple image" },
  // --- Your newly uploaded images below ---
  { src: "/lovable-uploads/6b1f973a-fc17-4450-abe6-8d8e0e16b07c.png", alt: "Temple image" },
  { src: "/lovable-uploads/da3e6c3e-0fc4-42b9-9944-72c3bf5444fa.png", alt: "Temple image" },
  { src: "/lovable-uploads/a911e7b9-9539-40a6-922c-a27368b307f9.png", alt: "Temple image" },
  { src: "/lovable-uploads/bbb79916-521a-4846-9394-745007e9586b.png", alt: "Temple image" },
  { src: "/lovable-uploads/4b566f3c-130c-4606-9a4a-6dc8fa6fc08f.png", alt: "Temple image" },
  { src: "/lovable-uploads/f4096cab-75a2-4b34-8a37-cb345eb06781.png", alt: "Temple image" },
  { src: "/lovable-uploads/841399d7-9c7a-4c42-bd96-2cb640e49ad7.png", alt: "Temple image" },
  { src: "/lovable-uploads/73fa08e5-2eb8-4fae-b65a-9d4400b01344.png", alt: "Temple image" },
  { src: "/lovable-uploads/7710d07a-f630-4c83-a307-1b40d8807f51.png", alt: "Temple image" },
  { src: "/lovable-uploads/66fc9910-e292-48e3-a8f7-9c280d607e98.png", alt: "Temple image" },
  { src: "/lovable-uploads/24bfad22-2358-4a02-a411-c1c69ca58ed2.png", alt: "Temple image" },
  { src: "/lovable-uploads/fff58530-94ce-45c6-8026-01d8730f161f.png", alt: "Temple image" },
  // images just attached in chat
  { src: "/lovable-uploads/temple-img-1.jpg", alt: "Temple image" }, // Will reference the uploaded images by order:
  { src: "/lovable-uploads/temple-img-2.jpg", alt: "Temple image" },
  { src: "/lovable-uploads/temple-img-3.jpg", alt: "Temple image" },
  { src: "/lovable-uploads/temple-img-4.jpg", alt: "Temple image" },
  { src: "/lovable-uploads/temple-img-5.jpg", alt: "Temple image" },
  { src: "/lovable-uploads/temple-img-6.jpg", alt: "Temple image" },
  { src: "/lovable-uploads/temple-img-7.jpg", alt: "Temple image" },
  { src: "/lovable-uploads/temple-img-8.jpg", alt: "Temple image" },
  { src: "/lovable-uploads/temple-img-9.jpg", alt: "Temple image" },
  { src: "/lovable-uploads/temple-img-10.jpg", alt: "Temple image" },
  { src: "/lovable-uploads/temple-img-11.jpg", alt: "Temple image" },
  { src: "/lovable-uploads/temple-img-12.jpg", alt: "Temple image" },
  
  // Add new temple images
  ...newTempleImages,
];

const GalleryGrid = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow hover:scale-105 transition-transform cursor-pointer overflow-hidden"
            onClick={() => setSelectedImage(img.src)}
          >
            <img
              src={img.src}
              alt={img.alt || "Gallery image"}
              className="w-full h-44 sm:h-52 md:h-60 lg:h-64 object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Simple Modal for Image Preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
            <img 
              src={selectedImage} 
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button 
              className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
