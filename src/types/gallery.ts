
export interface GalleryImage {
  id: string | number;
  image_url?: string;
  src?: string;
  title?: string;
  alt?: string;
  created_at?: string;
  category?: string;
  media_type: 'image' | 'video';
}

export type GalleryCategory = {
  id: string;
  name: string;
};
