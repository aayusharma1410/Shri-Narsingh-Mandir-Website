
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import DarshanSlideshow from "@/components/DarshanSlideshow";
import TimingsSection from "@/components/TimingsSection";
import NoticeBoard from "@/components/NoticeBoard";
import PoshakSevaSection from "@/components/PoshakSevaSection";
import GallerySection from "@/components/GallerySection";
import DailySchedule from "@/components/DailySchedule";
import PraktotsavScheduleDialog from "@/components/PraktotsavScheduleDialog";

const HomePage = () => {
  return (
    <div className="w-full">
      <PraktotsavScheduleDialog />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <AboutSection />
        <DarshanSlideshow />
        <TimingsSection />
        <NoticeBoard />
        <PoshakSevaSection />
        <DailySchedule />
        <GallerySection />
      </div>
    </div>
  );
};

export default HomePage;
