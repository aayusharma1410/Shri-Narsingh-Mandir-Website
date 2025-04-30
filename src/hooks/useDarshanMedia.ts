
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { DarshanImage } from '@/types/gallery';

export const useDarshanMedia = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [darshanMedia, setDarshanMedia] = useState<DarshanImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDarshanMedia = async () => {
    try {
      setLoading(true);
      console.log('Fetching darshan media...');
      
      // Use the darshan_media table
      const { data, error } = await supabase
        .from('darshan_media')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error('Error fetching darshan media:', error);
        toast({
          variant: "destructive",
          title: language === 'en' ? 'Error' : 'त्रुटि',
          description: language === 'en' 
            ? 'Failed to load darshan images'
            : 'दर्शन छवियां लोड करने में विफल',
        });
        return;
      }
      
      console.log('Darshan media fetched:', data);
      
      // Transform the data to match DarshanImage type
      const transformedData: DarshanImage[] = (data || []).map((item: any) => ({
        id: item.id,
        title: item.title || 'Darshan Image',
        title_hi: item.title_hi,
        image_url: item.image_url,
        created_at: item.created_at || new Date().toISOString(),
        media_type: (item.media_type as 'image' | 'video') || 'image',
        display_date: item.display_date
      }));
      
      console.log('Transformed darshan data:', transformedData);
      setDarshanMedia(transformedData);
    } catch (error) {
      console.error('Error in darshan fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDarshanMedia();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'darshan_media'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          fetchDarshanMedia();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { 
    darshanMedia, 
    loading, 
    fetchDarshanMedia 
  };
};
