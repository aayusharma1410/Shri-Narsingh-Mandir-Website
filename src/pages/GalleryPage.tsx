
import Navbar from '@/components/Navbar';
import GallerySection from '@/components/GallerySection';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-12">
        <GallerySection />
      </main>
    </div>
  );
};

export default GalleryPage;
