
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, Bell, Calendar, Info, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
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
          .order("created_at", { ascending: false })
          .limit(5);

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
            <Bell className="mr-2 h-5 w-5 text-temple-maroon" />
            <CardTitle className="text-xl font-serif text-temple-maroon">
              {language === "en" ? "Notice Board" : "सूचना पट्ट"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
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
            <Bell className="mr-2 h-5 w-5 text-temple-maroon" />
            <CardTitle className="text-xl font-serif text-temple-maroon">
              {language === "en" ? "Notice Board" : "सूचना पट्ट"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <Info className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <p className="text-gray-500">
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
      <CardHeader className="bg-temple-gold/10 border-b border-temple-gold/20 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Megaphone className="mr-2 h-5 w-5 text-temple-maroon" />
            <CardTitle className="text-xl font-serif text-temple-maroon">
              {language === "en" ? "Notice Board" : "सूचना पट्ट"}
            </CardTitle>
          </div>
          <Badge variant="outline" className="border-temple-gold">
            {language === "en" ? "Updates" : "अपडेट"}
          </Badge>
        </div>
        <CardDescription className="text-temple-maroon/70">
          {language === "en"
            ? "Important announcements and temple updates"
            : "महत्वपूर्ण घोषणाएँ और मंदिर अपडेट"}
        </CardDescription>
      </CardHeader>

      <ScrollArea className="max-h-[350px] overflow-auto">
        <CardContent className="p-0">
          <Accordion type="multiple" className="w-full divide-y">
            {notices.map((notice) => (
              <AccordionItem
                key={notice.id}
                value={String(notice.id)}
                className={`px-4 py-2 ${
                  notice.is_important
                    ? "bg-red-50/50 hover:bg-red-50/80"
                    : "hover:bg-gray-50"
                } transition-colors duration-200`}
              >
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex items-start text-left gap-2">
                    {notice.is_important && (
                      <AlertCircle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <h3 className="font-medium text-temple-maroon text-base">
                        {language === "en" ? notice.title : notice.title_hi}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(
                          new Date(notice.created_at),
                          language === "en" ? "MMM d, yyyy" : "d MMM, yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 text-sm leading-relaxed">
                  <div className="bg-white/50 p-3 rounded-md border border-gray-100">
                    {language === "en" ? notice.content : notice.content_hi}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </ScrollArea>

      <CardFooter className="bg-gray-50/50 border-t p-3 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-temple-maroon hover:text-temple-gold hover:bg-temple-maroon/10 text-xs"
        >
          {language === "en" ? "View All Notices" : "सभी सूचनाएँ देखें"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoticeBoard;
