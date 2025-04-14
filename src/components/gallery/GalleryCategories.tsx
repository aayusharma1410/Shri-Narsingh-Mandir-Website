
import { Button } from "@/components/ui/button";
import { GalleryCategory } from "@/types/gallery";

interface GalleryCategoriesProps {
  categories: GalleryCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const GalleryCategories = ({ categories, activeCategory, onCategoryChange }: GalleryCategoriesProps) => {
  return (
    <div className="mb-8 opacity-0 animate-on-scroll">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={activeCategory === category.id 
              ? "bg-temple-gold hover:bg-temple-gold/80 text-white" 
              : "border-temple-gold/30 text-temple-maroon hover:bg-temple-lightgold/50"
            }
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GalleryCategories;
