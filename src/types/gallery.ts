
export interface DarshanImage {
  id: string;
  title: string;
  title_hi?: string;
  image_url: string;
  media_type: 'image' | 'video';
  created_at: string;
  display_date?: string;
}

export interface GalleryImage {
  id: string;
  title?: string;
  image_url: string;
  category?: string;
  media_type: 'image' | 'video';
  created_at?: string;
  is_darshan?: boolean;
}

export interface GalleryCategory {
  id: string;
  name: string;
  name_hi?: string;
}
