
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
