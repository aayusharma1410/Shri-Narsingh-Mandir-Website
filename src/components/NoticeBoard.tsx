
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Notice {
  id: number;
  title: string;
  title_hi?: string;
  content: string;
  content_hi?: string;
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
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) throw error;
        setNotices(data || []);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();

    // Subscribe to changes
    const channel = supabase
      .channel("public:notices")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notices" },
        (payload) => {
          console.log("Notices change received!", payload);
          fetchNotices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === "en" ? "en-US" : "hi-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div id="notice-board" className="notice-board-section bg-white py-6 px-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-temple-maroon flex items-center">
          <Bell className="mr-2" />
          {language === "en" ? "Important Notices" : "महत्वपूर्ण सूचनाएँ"}
        </h2>
      </div>

      <div className="space-y-4">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-2/3 mt-1" />
              </Card>
            ))}
          </>
        ) : notices.length > 0 ? (
          notices.map((notice) => (
            <Card key={notice.id} className="p-4 border-l-4 border-temple-maroon">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg leading-tight">
                  {language === "en" ? notice.title : notice.title_hi || notice.title}
                </h3>
                {notice.is_important && (
                  <Badge className="bg-red-500 hover:bg-red-600">
                    {language === "en" ? "Important" : "महत्वपूर्ण"}
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 text-sm whitespace-pre-wrap">
                {language === "en"
                  ? notice.content
                  : notice.content_hi || notice.content}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {formatDate(notice.created_at)}
              </p>
            </Card>
          ))
        ) : (
          <Card className="p-4 text-center">
            <p className="text-gray-500">
              {language === "en"
                ? "No notices at the moment"
                : "इस समय कोई सूचना नहीं है"}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
