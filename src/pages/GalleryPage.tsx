
import Navbar from '@/components/Navbar';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-12">
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
