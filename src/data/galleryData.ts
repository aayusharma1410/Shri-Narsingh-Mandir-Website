import { GalleryImage, GalleryCategory } from '@/types/gallery';

export const galleryImages: GalleryImage[] = [
  { 
    id: 1, 
    image_url: "/lovable-uploads/9d35f335-2af8-4d36-8911-d309c4f8dd26.png",
    title: "श्री नृसिंह देव दर्शन",
    alt: "Shri Narsingh Dev Darshan", 
    category: "darshan",
    created_at: new Date().toISOString()
  },
  { 
    id: 2, 
    image_url: "/lovable-uploads/73682d4c-f478-41f2-bbb7-a5dd1b218f32.png",
    title: "श्री नृसिंह मंदिर श्रृंगार",
    alt: "Shri Narsingh Temple Shringar", 
    category: "shringar",
    created_at: new Date().toISOString()
  },
  { 
    id: 3, 
    image_url: "/lovable-uploads/7f5e03d3-8c83-4f35-84d4-942efc47d2b2.png", 
    title: "Evening Darshan",
    alt: "Evening Darshan", 
    category: "darshan",
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    image_url: "/lovable-uploads/1dda7531-87ab-45fc-a698-3d3a28d25d05.png",
    title: "Morning Darshan",
    alt: "Morning Darshan",
    category: "darshan",
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    image_url: "/lovable-uploads/9f9d2654-52ad-44c3-92d3-8f92b067dade.png",
    title: "Afternoon Darshan",
    alt: "Afternoon Darshan",
    category: "darshan",
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    image_url: "/lovable-uploads/0dc387c4-682c-498b-a4d8-b35159ef10a5.png",
    title: "Evening Special Darshan",
    alt: "Evening Special Darshan",
    category: "darshan",
    created_at: new Date().toISOString()
  },
  { 
    id: 7, 
    image_url: "/lovable-uploads/3bdeaf32-014d-4973-a6ca-fba97d0465ac.png", 
    title: "Special Darshan",
    alt: "Special Darshan", 
    category: "shringar",
    created_at: new Date().toISOString()
  },
  { 
    id: 8, 
    image_url: "/lovable-uploads/0f7c6a0d-b7e6-4f35-9ee9-a9ae61e5327d.png", 
    title: "Shri Narsingh Dev",
    alt: "Shri Narsingh Dev", 
    category: "shringar",
    created_at: new Date().toISOString()
  },
  { 
    id: 9, 
    image_url: "/lovable-uploads/8004559d-4885-4064-a334-9c67a69b8f1b.png", 
    title: "Temple Interior",
    alt: "Temple Interior", 
    category: "mandir",
    created_at: new Date().toISOString()
  },
  { 
    id: 10, 
    image_url: "/lovable-uploads/aa5bf370-ee00-4613-93a3-805c90a67e20.png", 
    title: "Sacred Murti",
    alt: "Sacred Murti", 
    category: "darshan",
    created_at: new Date().toISOString()
  },
  { 
    id: 11, 
    image_url: "/lovable-uploads/acbea974-756b-4308-a7dd-5f93aa907c3a.png",
    title: "Temple Overview",
    alt: "Temple Overview", 
    category: "mandir",
    created_at: new Date().toISOString()
  },
  { 
    id: 12, 
    image_url: "/lovable-uploads/d0ad4717-d4b0-47f6-9f34-65a4cc3931a2.png",
    title: "श्री नृसिंह मंदिर दर्शन",
    alt: "Shri Narsingh Temple Darshan", 
    category: "darshan",
    created_at: new Date().toISOString()
  }
];

export const categories: GalleryCategory[] = [
  { id: 'all', name: 'सभी' },
  { id: 'darshan', name: 'दर्शन' },
  { id: 'shringar', name: 'श्रृंगार' },
  { id: 'events', name: 'उत्सव' },
  { id: 'mandir', name: 'मंदिर' }
];
