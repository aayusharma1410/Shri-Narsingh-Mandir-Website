
import Navbar from '@/components/Navbar';
import TimingsSection from '@/components/TimingsSection';
import Footer from '@/components/Footer';

const TimingsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12">
        <TimingsSection />
      </div>
      <Footer />
    </div>
  );
};

export default TimingsPage;
