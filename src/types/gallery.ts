
export interface GalleryImage {
  id: string | number;
  image_url?: string; // Making it optional since we might have src instead
  src?: string; // Adding src for backward compatibility
  title?: string; // Making title optional
  alt?: string; // Adding alt property for accessibility
  created_at?: string; // Making created_at optional
  category?: string; // Adding category property
}

export type GalleryCategory = {
  id: string;
  name: string;
};
