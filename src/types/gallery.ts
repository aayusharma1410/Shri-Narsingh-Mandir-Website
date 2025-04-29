
export interface GalleryImage {
  id: string | number;
  image_url?: string;
  src?: string;
  title?: string;
  alt?: string;
  created_at?: string;
  category?: string;
  uploaded_by?: string;
  media_type: 'image' | 'video';
  is_darshan?: boolean;
}

export type GalleryCategory = {
  id: string;
  name: string;
};

export interface DarshanImage {
  id: string | number;
  title: string;
  image_url: string;
  created_at: string;
  uploaded_by?: string;
  media_type: 'image' | 'video';
}

// Define GalleryImageRow to match the Supabase schema type
export interface GalleryImageRow {
  id: string;
  title: string | null;
  image_url: string;
  category: string | null;
  created_at: string | null;
  uploaded_by: string | null;
  media_type: string | null;
  is_darshan: boolean | null;
}
