
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  titleHi: z.string().min(3, "Hindi title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  contentHi: z.string().min(10, "Hindi content must be at least 10 characters"),
  isImportant: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface NoticeFormProps {
  onSuccess?: () => void;
}

const NoticeForm = ({ onSuccess }: NoticeFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      titleHi: "",
      content: "",
      contentHi: "",
      isImportant: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Insert record into notices table
      const { error } = await supabase.from("notices").insert({
        title: values.title,
        title_hi: values.titleHi,
        content: values.content,
        content_hi: values.contentHi,
        is_important: values.isImportant,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Notice has been added successfully",
      });

      // Reset form
      form.reset();

      // Call success callback if provided
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error adding notice:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add notice",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title (English)</FormLabel>
                <FormControl>
                  <Input placeholder="Important Announcement" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="titleHi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title (Hindi)</FormLabel>
                <FormControl>
                  <Input placeholder="महत्वपूर्ण घोषणा" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (English)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter notice content here..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contentHi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (Hindi)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="यहां नोटिस सामग्री दर्ज करें..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isImportant"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Mark as Important</FormLabel>
                  <FormDescription>
                    Important notices will be highlighted on the notice board.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Saving..." : "Add Notice"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NoticeForm;
