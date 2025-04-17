
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DarshanImageForm from "@/components/admin/DarshanImageForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DarshanImage {
  id: number;
  title: string;
  title_hi: string;
  image_url: string;
  time: string;
  date: string;
  created_at: string;
}

const AdminDarshan = () => {
  const [darshanImages, setDarshanImages] = useState<DarshanImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchDarshanImages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("darshan_images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDarshanImages(data || []);
    } catch (error: any) {
      console.error("Error fetching darshan images:", error);
      toast({
        title: "Error",
        description: "Failed to load darshan images",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDarshanImages();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from("darshan_images")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Filter out deleted image from state
      setDarshanImages(darshanImages.filter((image) => image.id !== id));

      toast({
        title: "Success",
        description: "Darshan image deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting darshan image:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete darshan image",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Darshan Images</h1>
          <p className="text-muted-foreground">
            Manage today's darshan images displayed on the homepage
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Darshan Image</h2>
            <DarshanImageForm onSuccess={fetchDarshanImages} />
          </CardContent>
        </Card>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">Current Darshan Images</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : darshanImages.length === 0 ? (
            <p>No darshan images found. Add your first one above.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {darshanImages.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="h-12 w-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{image.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {image.title_hi}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{image.time}</TableCell>
                    <TableCell>{new Date(image.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Darshan Image
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this darshan image?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(image.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDarshan;
