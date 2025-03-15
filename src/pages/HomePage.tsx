
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import DarshanSlideshow from '@/components/DarshanSlideshow';
import GallerySection from '@/components/GallerySection';

const HomePage = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <DarshanSlideshow />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
