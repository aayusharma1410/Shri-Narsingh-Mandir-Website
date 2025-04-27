import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { registerServiceWorker, subscribeUserToPush, saveSubscription } from '@/utils/pushNotifications';

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
  const [visibleNotices, setVisibleNotices] = useState<number[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const { data: notices, isLoading } = useQuery({
    queryKey: ['notices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching notices:', error);
        throw error;
      }

      return data as Notice[];
    }
  });

  useEffect(() => {
    checkNotificationSubscription();
  }, []);

  const checkNotificationSubscription = async () => {
    if (!('Notification' in window)) return;
    
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    setIsSubscribed(!!subscription);
  };

  const handleSubscribe = async () => {
    try {
      if (!('Notification' in window)) {
        throw new Error('This browser does not support notifications');
      }

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Notification permission was not granted');
      }

      const registration = await registerServiceWorker();
      const subscription = await subscribeUserToPush(registration);
      await saveSubscription(subscription);

      setIsSubscribed(true);
      toast({
        title: language === 'en' ? "Notifications Enabled" : "सूचनाएं सक्षम",
        description: language === 'en' 
          ? "You will now receive notifications when notices are updated" 
          : "अब आपको नोटिस अपडेट होने पर सूचनाएं मिलेंगी"
      });
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error" : "त्रुटि",
        description: language === 'en' 
          ? "Failed to enable notifications" 
          : "सूचनाएं सक्षम करने में विफल"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  useEffect(() => {
    if (!notices) return;
    
    // Show notices one by one with delay
    const timer = setTimeout(() => {
      setVisibleNotices(notices.map(notice => notice.id));
    }, 100);
    
    return () => clearTimeout(timer);
  }, [notices]);

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
        <div className="flex items-center gap-2 ml-auto">
          {!isSubscribed && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleSubscribe}
            >
              <Bell className="w-4 h-4" />
              {language === 'en' ? "Enable Notifications" : "सूचनाएं सक्षम करें"}
            </Button>
          )}
          <Bell className="w-6 h-6 text-temple-gold" />
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {!notices || notices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <p>{language === 'en' ? "No notices at the moment" : "इस समय कोई सूचना नहीं है"}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice, index) => (
              <div 
                key={notice.id} 
                className={`transition-opacity duration-500 ${visibleNotices.includes(notice.id) ? 'opacity-100' : 'opacity-0'}`}
              >
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
