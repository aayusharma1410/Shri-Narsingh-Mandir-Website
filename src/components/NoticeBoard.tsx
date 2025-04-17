
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';

interface Notice {
  id: number;
  title: string;
  title_hi: string;
  content: string;
  content_hi: string;
  is_important: boolean;
  created_at: string;
}

const NoticeBoard = () => {
  const { language } = useLanguage();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) throw error;
        setNotices(data || []);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <Card className="h-full animate-pulse">
        <CardContent className="p-6">
          <div className="h-7 w-3/4 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-3 flex flex-row items-center">
        <div>
          <CardTitle className="text-2xl text-temple-maroon">
            {language === 'en' ? "Notice Board" : "सूचना पट्ट"}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? "Important temple announcements" 
              : "महत्वपूर्ण मंदिर घोषणाएँ"}
          </CardDescription>
        </div>
        <Bell className="w-6 h-6 text-temple-gold ml-auto" />
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {notices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <p>{language === 'en' ? "No notices at the moment" : "इस समय कोई सूचना नहीं है"}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice, index) => (
              <div key={notice.id} className="animate-on-scroll opacity-0" style={{ animationDelay: `${index * 150}ms` }}>
                {index > 0 && <Separator className="my-4" />}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg text-temple-maroon">
                      {language === 'en' ? notice.title : notice.title_hi}
                    </h3>
                    {notice.is_important && (
                      <Badge variant="destructive" className="text-xs">
                        {language === 'en' ? "Important" : "महत्वपूर्ण"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(notice.created_at)}
                  </p>
                  <p className="text-sm">
                    {language === 'en' ? notice.content : notice.content_hi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NoticeBoard;
