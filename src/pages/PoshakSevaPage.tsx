
import Navbar from '@/components/Navbar';
import PoshakSevaSection from '@/components/PoshakSevaSection';
import Footer from '@/components/Footer';

const PoshakSevaPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12">
        <PoshakSevaSection />
      </div>
      <Footer />
    </div>
  );
};

export default PoshakSevaPage;
