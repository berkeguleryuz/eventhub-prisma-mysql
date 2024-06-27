import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
}

const Categories = ({ categories, selectedCategory }: CategoriesProps) => {
  return (
    <div className="flex flex-wrap px-4 gap-7 justify-center my-10">
      <Button variant={selectedCategory === null ? "default" : "outline"}>
        All Categories
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}>
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
