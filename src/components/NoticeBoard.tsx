import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

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

  // Default notices to use when database is not available
  const defaultNotices: Notice[] = [
    {
      id: 1,
      title: "Temple Renovation",
      title_hi: "मंदिर का जीर्णोद्धार",
      content: "We are pleased to announce that temple renovation work will begin next month.",
      content_hi: "हमें यह घोषणा करते हुए प्रसन्नता हो रही है कि मंदिर के जीर्णोद्धार का कार्य अगले महीने से प्रारंभ होगा।",
      is_important: true,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Annual Festival",
      title_hi: "वार्षिक उत्सव",
      content: "Annual temple festival will be celebrated from 15th to 21st May with special ceremonies.",
      content_hi: "वार्षिक मंदिर उत्सव 15 से 21 मई तक विशेष समारोहों के साथ मनाया जाएगा।",
      is_important: false,
      created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 3,
      title: "Bhajan Sandhya",
      title_hi: "भजन संध्या",
      content: "Join us for a special Bhajan Sandhya program every Saturday evening at 7 PM.",
      content_hi: "हर शनिवार शाम 7 बजे होने वाले विशेष भजन संध्या कार्यक्रम में हमारे साथ शामिल हों।",
      is_important: false,
      created_at: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  useEffect(() => {
    // Simply use the default notices since we've removed Supabase integration
    setNotices(defaultNotices);
    setIsLoading(false);
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
                      {language === 'en' ? notice.title : (notice.title_hi || notice.title)}
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
                    {language === 'en' ? notice.content : (notice.content_hi || notice.content)}
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
