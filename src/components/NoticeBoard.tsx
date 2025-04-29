
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, Calendar, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("notices")
          .select("*")
          .order("is_important", { ascending: false })
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching notices:", error);
          return;
        }

        setNotices(data || []);
      } catch (error) {
        console.error("Error in notices fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notices'
        },
        () => {
          fetchNotices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <Card className="w-full border-temple-maroon/20 shadow-md">
        <CardHeader className="bg-temple-gold/10 border-b border-temple-gold/20 pb-2">
          <div className="flex items-center">
            <Bell className="mr-2 h-6 w-6 text-temple-maroon" />
            <CardTitle className="text-3xl font-serif text-temple-maroon font-bold">
              {language === "en" ? "Notice Board" : "सूचना पट्ट"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (notices.length === 0) {
    return (
      <Card className="w-full border-temple-maroon/20 shadow-md">
        <CardHeader className="bg-temple-gold/10 border-b border-temple-gold/20 pb-2">
          <div className="flex items-center">
            <Bell className="mr-2 h-6 w-6 text-temple-maroon" />
            <CardTitle className="text-3xl font-serif text-temple-maroon font-bold">
              {language === "en" ? "Notice Board" : "सूचना पट्ट"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 text-lg font-medium">
            {language === "en"
              ? "No notices available at the moment"
              : "इस समय कोई सूचना उपलब्ध नहीं है"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-temple-maroon/20 shadow-md">
      <CardHeader className="bg-temple-gold/10 border-b border-temple-gold/20 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Megaphone className="mr-3 h-7 w-7 text-temple-maroon" />
            <CardTitle className="text-3xl font-serif text-temple-maroon font-bold">
              {language === "en" ? "Notice Board" : "सूचना पट्ट"}
            </CardTitle>
          </div>
          <Badge variant="outline" className="border-temple-gold text-base">
            {language === "en" ? "Updates" : "अपडेट"}
          </Badge>
        </div>
        <CardDescription className="text-temple-maroon/70 text-lg mt-1">
          {language === "en"
            ? "Important announcements and temple updates"
            : "महत्वपूर्ण घोषणाएँ और मंदिर अपडेट"}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 max-h-[600px] overflow-y-auto">
        <div className="w-full divide-y">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={`px-5 py-4 ${
                notice.is_important
                  ? "bg-red-50/50 hover:bg-red-50/90"
                  : "hover:bg-gray-100/70"
              } transition-all duration-300 ease-in-out cursor-pointer`}
            >
              <div className="flex items-start text-left gap-3 mb-2">
                <div>
                  <h3 className="font-bold text-temple-maroon text-xl">
                    {language === "en" ? notice.title : notice.title_hi}
                  </h3>
                  <p className="text-base text-muted-foreground flex items-center mt-1">
                    <Calendar className="h-5 w-5 mr-1" />
                    {format(
                      new Date(notice.created_at),
                      language === "en" ? "MMM d, yyyy" : "d MMM, yyyy"
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-2 text-lg">
                <div className="bg-white/50 p-4 rounded-md border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <p className="font-semibold">
                    {language === "en" ? notice.content : notice.content_hi}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NoticeBoard;
