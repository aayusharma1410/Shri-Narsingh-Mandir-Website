
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { uploadImage } from "@/lib/supabase-helpers";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  titleHi: z.string().min(3, "Hindi title must be at least 3 characters"),
  time: z.string().min(1, "Time is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface DarshanImageFormProps {
  onSuccess?: () => void;
}

const DarshanImageForm = ({ onSuccess }: DarshanImageFormProps) => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      titleHi: "",
      time: "05:00 AM",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedImage(null);
      setImagePreview(null);
      return;
    }

    const file = event.target.files[0];
    if (!file.type.includes("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    setSelectedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const onSubmit = async (values: FormValues) => {
    if (!selectedImage) {
      toast({
        title: "Image required",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image to Supabase Storage
      const imageUrl = await uploadImage(selectedImage, 'darshan-images');
      
      if (!imageUrl) {
        throw new Error("Failed to upload image");
      }

      // Get current date in format YYYY-MM-DD
      const currentDate = format(new Date(), "yyyy-MM-dd");

      // Insert record into darshan_images table
      const { error } = await supabase.from("darshan_images").insert({
        title: values.title,
        title_hi: values.titleHi,
        image_url: imageUrl,
        time: values.time,
        date: currentDate,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Darshan image has been added successfully",
      });

      // Reset form
      form.reset();
      setSelectedImage(null);
      setImagePreview(null);

      // Call success callback if provided
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error adding darshan image:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add darshan image",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (English)</FormLabel>
                  <FormControl>
                    <Input placeholder="Morning Darshan" {...field} />
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
                    <Input placeholder="प्रातः दर्शन" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input placeholder="05:00 AM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="image">Darshan Image</Label>
              {!imagePreview ? (
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image")?.click()}
                  >
                    Select Image
                  </Button>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Uploading..." : "Add Darshan Image"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DarshanImageForm;
