
import GalleryGrid from './gallery/GalleryGrid';

const GallerySection = () => {
  return (
    <section className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-temple-maroon mb-2">मंदिर गैलरी</h2>
        <p className="text-lg text-neutral-600">यहाँ मंदिर से जुड़ी सुंदर झलकियाँ देखें।</p>
      </div>
      <GalleryGrid />
    </section>
  );
};

export default GallerySection;
