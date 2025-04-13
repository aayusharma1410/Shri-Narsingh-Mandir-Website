
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface DailyScheduleProps {
  isSummerTimings: boolean;
}

const DailySchedule = ({ isSummerTimings }: DailyScheduleProps) => {
  const summerSchedule = [
    { event: "पट खुलने का समय", time: "4:30 AM" },
    { event: "अभिषेक", time: "4:30 AM-4:45 AM" },
    { event: "श्रृंगार", time: "4:45 PM-5:00 AM" },
    { event: "बाल भोग", time: "5:00 AM-5:15 AM" },
    { event: "मंगला आरती", time: "5:15 AM-5:30 AM" },
    { event: "राज भोग", time: "11:15 AM-11:30 AM" },
    { event: "शयन", time: "12:00 PM-4:30 PM" },
    { event: "पट खुलने का समय", time: "4:30 PM" },
    { event: "संध्या आरती", time: "7:15 PM-7:30 PM" },
    { event: "शयन भोग", time: "9:00 PM-9:15 PM" },
    { event: "रात्री शयन", time: "9:30 PM-4:30 AM" },
  ];

  const winterSchedule = [
    { event: "पट खुलने का समय", time: "5:00 AM" },
    { event: "अभिषेक", time: "5:00 AM-5:15 AM" },
    { event: "श्रृंगार", time: "5:15 PM-5:30 AM" },
    { event: "बाल भोग", time: "5:30 AM-5:45 AM" },
    { event: "मंगला आरती", time: "5:45 AM-6:00 AM" },
    { event: "राज भोग", time: "11:45 AM-12:00 PM" },
    { event: "शयन", time: "12:30 PM-5:00 PM" },
    { event: "पट खुलने का समय", time: "5:00 PM" },
    { event: "संध्या आरती", time: "7:45 PM-8:00 PM" },
    { event: "शयन भोग", time: "9:30 PM-9:45 PM" },
    { event: "रात्री शयन", time: "10:00 PM-5:00 AM" },
  ];

  const schedule = isSummerTimings ? summerSchedule : winterSchedule;

  return (
    <Card className="glass-card opacity-0 animate-on-scroll">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Clock className="w-6 h-6 text-temple-gold mr-2" />
          <h3 className="font-serif text-xl font-semibold text-temple-maroon">दैनिक कार्यक्रम</h3>
          <span className="ml-2 text-sm text-temple-gold font-medium px-2 py-1 bg-temple-gold/10 rounded">
            {isSummerTimings ? "ग्रीष्मकालीन" : "शीतकालीन"}
          </span>
        </div>
        <div className="divide-y divide-temple-gold/10">
          {schedule.map((item, index) => (
            <div key={index} className="py-3 flex justify-between items-center">
              <span className="font-medium text-temple-maroon">{item.event}</span>
              <span className="text-gray-600">{item.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySchedule;
