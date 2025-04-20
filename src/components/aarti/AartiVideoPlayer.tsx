
import { Button } from "@/components/ui/button";
import { Facebook, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from '@/contexts/LanguageContext';
import { formatTime } from '@/utils/aartiTimeUtils';

interface AartiVideoPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  nextScheduledTime: Date;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
}

const AartiVideoPlayer = ({
  isPlaying,
  isMuted,
  nextScheduledTime,
  onPlayToggle,
  onMuteToggle
}: AartiVideoPlayerProps) => {
  const { language } = useLanguage();

  return (
    <div className="relative bg-black rounded-xl overflow-hidden shadow-xl">
      <div className="relative pt-[56.25%] bg-temple-maroon/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-temple-gold/20 flex items-center justify-center animate-pulse">
              <Facebook className="h-10 w-10 text-temple-gold" />
            </div>
            <p className="text-white font-medium">
              {isPlaying 
                ? (language === 'en' ? 'Aarti is now live' : 'आरती अभी लाइव है')
                : (language === 'en' ? 'Next aarti will begin soon' : 'अगली आरती जल्द ही शुरू होगी')}
            </p>
            <p className="text-white/70 text-sm mt-2">
              {language === 'en' 
                ? 'Click play to watch on Facebook Live' 
                : 'फेसबुक लाइव पर देखने के लिए प्ले बटन पर क्लिक करें'}
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={onPlayToggle}
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:bg-white/20 relative"
                  >
                    <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                    </div>
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {language === 'en' ? 'Watch on Facebook Live' : 'फेसबुक लाइव पर देखें'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="text-white text-sm flex items-center gap-2">
              {isPlaying 
                ? <span className="px-2 py-0.5 bg-red-600 rounded-full text-xs font-medium animate-pulse flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-white"></span> 
                    Live
                  </span>
                : 'Next: ' + formatTime(nextScheduledTime)}
            </div>
            
            <Button 
              onClick={onMuteToggle}
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AartiVideoPlayer;
