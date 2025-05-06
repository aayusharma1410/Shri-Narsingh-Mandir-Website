
import { Button } from "@/components/ui/button";
import { Facebook, Pause, Play, Volume2, VolumeX, Music } from 'lucide-react';
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
    <div className="relative bg-black rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-all duration-300">
      {/* Decorative elements */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-amber-500/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-temple-gold/10 rounded-full blur-xl"></div>
      
      <div className="relative pt-[56.25%] bg-gradient-to-br from-temple-maroon/30 to-temple-maroon/10">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          
          {/* Divine light rays effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/4 bg-gradient-to-b from-temple-gold/5 via-transparent to-transparent rotate-45 animate-pulse"></div>
            <div className="absolute top-0 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/4 bg-gradient-to-b from-temple-gold/5 via-transparent to-transparent -rotate-45 animate-pulse"></div>
          </div>
          
          <Button 
            onClick={onPlayToggle}
            variant="ghost" 
            size="icon"
            className="w-20 h-20 rounded-full bg-gradient-to-br from-temple-gold/40 to-temple-gold/20 hover:from-temple-gold/50 hover:to-temple-gold/30 text-white hover:text-white transition-all duration-300 mb-4 z-10 shadow-[0_0_15px_rgba(255,200,0,0.3)] hover:shadow-[0_0_20px_rgba(255,200,0,0.5)]"
          >
            <Play className="h-12 w-12 ml-1" />
          </Button>
          
          <div className="relative z-10">
            <p className="text-white font-medium text-lg shadow-sm">
              {language === 'en' ? 'Click to watch Live Aarti' : 'लाइव आरती देखने के लिए क्लिक करें'}
            </p>
            
            <div className="flex items-center justify-center mt-3">
              <Music className="h-4 w-4 text-temple-gold mr-2 animate-pulse" />
              <p className="text-temple-gold/90 text-sm">
                {language === 'en' ? 'Experience divine blessings through live darshan' : 'लाइव दर्शन के माध्यम से दिव्य आशीर्वाद का अनुभव करें'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
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
                ? <span className="px-2 py-0.5 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-xs font-medium animate-pulse flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-white"></span> 
                    Live
                  </span>
                : <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-temple-gold">Next:</span> {formatTime(nextScheduledTime)}
                  </div>}
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
