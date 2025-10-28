import RecipeCard from "./RecipeCard";
import { type Meal } from "../pages/Home";
import { Link } from "react-router-dom";

const HomeRecipe = ({ recipes }: { recipes: Meal[] }) => {
  return (
    <section className="py-32">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className=" text-3xl lg:text-4xl font-bold text-center">
          Featured Recipes
        </h2>
        <Link to="/recipes" className="text-right text-gray-600 underline hotpaprikacolor cursor-pointer my-5">
          View All
        </Link>
        <RecipeCard recipes={recipes} />
      </div>
    </section>
  );
};

export default HomeRecipe;
