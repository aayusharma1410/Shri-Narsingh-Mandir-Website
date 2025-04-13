
import Navbar from '@/components/Navbar';
import LiveAarti from '@/components/LiveAarti';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

const LiveAartiPage = () => {
  useEffect(() => {
    document.title = "Live Aarti | Shri Narsingh Temple";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12">
        <LiveAarti />
      </div>
      <Footer />
    </div>
  );
};

export default LiveAartiPage;
