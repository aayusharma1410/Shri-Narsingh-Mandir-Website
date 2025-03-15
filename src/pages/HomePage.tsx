
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import DarshanSlideshow from '@/components/DarshanSlideshow';

const HomePage = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <DarshanSlideshow />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
