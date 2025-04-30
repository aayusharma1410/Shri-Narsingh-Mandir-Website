
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDarshanMedia } from '@/hooks/useDarshanMedia';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import DarshanUploader from './darshan/DarshanUploader';
import DarshanMedia from './darshan/DarshanMedia';

const DarshanSlideshow = () => {
  const { language } = useLanguage();
  const { darshanMedia, loading, fetchDarshanMedia } = useDarshanMedia();
  const { isAdmin } = useAdminStatus();
  
  useEffect(() => {
    // Load darshan media on component mount
    fetchDarshanMedia();
  }, []);
  
  return (
    <div id="darshan-slideshow" className="w-full max-w-2xl mx-auto mb-4">
      <h2 className="text-2xl font-serif text-center mb-4 text-temple-maroon font-semibold">
        {language === 'en' ? "Today's Darshan" : "आज का दर्शन"}
      </h2>
      
      {isAdmin && (
        <DarshanUploader onUploadSuccess={fetchDarshanMedia} />
      )}
      
      <DarshanMedia 
        darshanMedia={darshanMedia} 
        loading={loading} 
        onImageDeleted={fetchDarshanMedia}
      />
    </div>
  );
};

export default DarshanSlideshow;
