export type Category = {
  id: number;
  name: string;
  image: string;
  description: string;
};

const CategoriesFilter = ({ categories, selectedCategory, onSelectCategory }: { categories: Category[]; selectedCategory: string; onSelectCategory: (category: string) => void; }) => {
  return (
    <div className="w-full py-4">
      <div className="flex justify gap-3 flex-wrap px-2 m-0">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.name)}
              className={`flex flex-col items-center min-w-[80px] p-3 rounded-xl transition 
              ${isSelected ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              <img
                src={category.image}
                alt={category.name}
                className={`w-12 h-12 rounded-full object-cover mb-2 shadow-md
                ${isSelected ? "ring-2 ring-white" : ""}`}
              />
              <span className="font-medium text-sm whitespace-nowrap">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};


export default CategoriesFilter