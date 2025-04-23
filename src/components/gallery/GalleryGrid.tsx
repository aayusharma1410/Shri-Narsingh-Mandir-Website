
const images = [
  {
    src: "/lovable-uploads/214bbd7c-3cc1-48f4-9c27-ad653c93a0d4.png",
    alt: "Mandir 1",
  },
  {
    src: "/lovable-uploads/e931afc9-057b-4c6f-bd47-47526665a6f9.png",
    alt: "Mandir 2",
  },
  {
    src: "/lovable-uploads/9b63e954-06f4-49a0-8084-e70782580926.png",
    alt: "Mandir 3",
  },
  {
    src: "/lovable-uploads/a0c1f138-de7c-4a2e-b3bb-bf54fd56d16b.png",
    alt: "Mandir 4",
  },
  {
    src: "/lovable-uploads/ce663b47-0708-4d47-a0d8-7e8f4b8fb805.png",
    alt: "Mandir 5",
  },
  {
    src: "/lovable-uploads/9dba9ae0-312c-4cda-85f1-cbd671670016.png",
    alt: "Mandir 6",
  },
  {
    src: "/lovable-uploads/b088dffc-3cf1-483d-930d-dea60edac677.png",
    alt: "Mandir 7",
  },
  {
    src: "/lovable-uploads/86e9ef1e-63a8-40c0-af86-156596394985.png",
    alt: "Mandir 8",
  },
  {
    src: "/lovable-uploads/eef2c643-736e-4bde-856c-4b3d1e4c447b.png",
    alt: "Mandir 9",
  },
  {
    src: "/lovable-uploads/8d449a70-b1ed-40b5-9216-c19bdbfff0c2.png",
    alt: "Mandir 10",
  },
  {
    src: "/lovable-uploads/24010e52-3707-4baa-83e5-5e072b316af0.png",
    alt: "Mandir 11",
  },
  {
    src: "/lovable-uploads/65964d97-ac2f-4fc2-a08b-5f7a041b6042.png",
    alt: "Mandir 12",
  },
];

const GalleryGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((img, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
          <img src={img.src} alt={img.alt} className="w-full h-64 object-cover"/>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
