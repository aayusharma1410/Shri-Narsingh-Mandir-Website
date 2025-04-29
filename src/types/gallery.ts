
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
  title_hi?: string;
  image_url: string;
  created_at: string;
  display_date?: string;
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

// Define DarshanMediaRow to match the Supabase schema
export interface DarshanMediaRow {
  id: string;
  title: string;
  title_hi: string | null;
  image_url: string;
  media_type: string;
  created_at: string;
  display_date: string | null;
  uploaded_by: string | null;
}
