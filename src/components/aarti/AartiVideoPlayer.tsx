
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
    <div className="relative bg-black rounded-xl overflow-hidden shadow-xl border border-temple-gold/20 transform transition-all duration-300 hover:shadow-2xl">
      <div className="relative pt-[56.25%] bg-temple-maroon/20 overflow-hidden">
        {/* This is where an embedded livestream would go when available */}
        {/* For now we show a placeholder with play button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-temple-maroon/90 to-black">
          <Button 
            onClick={onPlayToggle}
            variant="ghost" 
            size="icon"
            className="w-20 h-20 rounded-full bg-temple-gold/20 hover:bg-temple-gold/30 text-white hover:text-white transition-all duration-300 mb-4 backdrop-blur-sm shadow-lg shadow-temple-gold/10"
          >
            <Play className="h-12 w-12" />
          </Button>
          <p className="text-white font-medium text-lg text-shadow-sm px-4 py-2 bg-black/30 rounded-full backdrop-blur-sm">
            {language === 'en' ? 'Click to watch Live Aarti' : 'लाइव आरती देखने के लिए क्लिक करें'}
          </p>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-max text-white text-xs bg-black/40 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">
            {language === 'en' ? 'Coming Soon: Direct Embedded Live Stream' : 'जल्द आ रहा है: सीधा एम्बेडेड लाइव स्ट्रीम'}
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
                    className="text-white hover:bg-white/20 relative group"
                  >
                    <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      <Facebook className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {language === 'en' ? 'Watch on Facebook Live' : 'फेसबुक लाइव पर देखें'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="text-white text-sm flex items-center gap-2">
              {isPlaying 
                ? <span className="px-2 py-0.5 bg-red-600 rounded-full text-xs font-medium animate-pulse flex items-center gap-1 shadow-lg shadow-red-500/20">
                    <span className="h-2 w-2 rounded-full bg-white"></span> 
                    Live
                  </span>
                : <span className="flex items-center">
                    <span className="mr-1">Next:</span> 
                    <span className="bg-temple-gold/20 px-2 py-0.5 rounded text-white font-medium">{formatTime(nextScheduledTime)}</span>
                  </span>
              }
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
