
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const GalleryPage = () => {
  // To be filled with gallery images in card format as you provide the images
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-20">
        <h1 className="text-3xl font-extrabold mb-8 text-temple-maroon text-center">गैलरी / Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 justify-items-center">
          {/* When you share mandir images, we'll place cards here */}
          <div className="w-full flex items-center justify-center h-40 bg-temple-cream text-temple-maroon font-bold text-xl rounded-xl shadow">
            Coming Soon...
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
