
import { GalleryImage, GalleryCategory } from '@/types/gallery';

export const galleryImages: GalleryImage[] = [
  { 
    id: 1, 
    src: "/lovable-uploads/1434a5a6-10d5-4de1-a362-1d2ee64eced3.png", 
    alt: "Morning Darshan", 
    category: "darshan"
  },
  { 
    id: 2, 
    src: "/lovable-uploads/6d709d5e-8162-4c9f-a65d-e08f56299ea8.png", 
    alt: "Afternoon Darshan", 
    category: "darshan"
  },
  { 
    id: 3, 
    src: "/lovable-uploads/7f5e03d3-8c83-4f35-84d4-942efc47d2b2.png", 
    alt: "Evening Darshan", 
    category: "darshan"
  },
  { 
    id: 4, 
    src: "/lovable-uploads/eb2af739-3b7b-411b-ae85-7d7f864aba86.png", 
    alt: "Shri Narsingh Darshan", 
    category: "darshan"
  },
  { 
    id: 5, 
    src: "/lovable-uploads/ce4e2728-1e57-4787-9769-5ffb97c2a7f6.png", 
    alt: "Decorated Shrine", 
    category: "shringar"
  },
  { 
    id: 6, 
    src: "/lovable-uploads/679567b7-197f-4de6-8181-b6266467e36c.png", 
    alt: "Festival Celebration", 
    category: "events"
  },
  { 
    id: 7, 
    src: "/lovable-uploads/3bdeaf32-014d-4973-a6ca-fba97d0465ac.png", 
    alt: "Special Darshan", 
    category: "shringar"
  },
  { 
    id: 8, 
    src: "/lovable-uploads/0f7c6a0d-b7e6-4f35-9ee9-a9ae61e5327d.png", 
    alt: "Shri Narsingh Dev", 
    category: "shringar"
  },
  { 
    id: 9, 
    src: "/lovable-uploads/8004559d-4885-4064-a334-9c67a69b8f1b.png", 
    alt: "Temple Interior", 
    category: "mandir"
  },
  { 
    id: 10, 
    src: "/lovable-uploads/aa5bf370-ee00-4613-93a3-805c90a67e20.png", 
    alt: "Sacred Murti", 
    category: "darshan"
  }
];

export const categories: GalleryCategory[] = [
  { id: 'all', name: 'सभी' },
  { id: 'darshan', name: 'दर्शन' },
  { id: 'shringar', name: 'श्रृंगार' },
  { id: 'events', name: 'उत्सव' },
  { id: 'mandir', name: 'मंदिर' }
];
