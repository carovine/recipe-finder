import "../App.css";
import { type Meal } from "../pages/Home";
import { Link } from "react-router-dom";
import { IoIosTime, IoMdPerson } from "react-icons/io";
import { BsFileBarGraphFill } from "react-icons/bs";

const FeaturedRecipe = ({ recipe }: { recipe: Meal }) => {
  return (
    <section className="w-full bg-gray-50 py-12 px-4 sm:px-8 md:px-16">
      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* Left side: Text + button */}
        <div className="flex-1 text-left">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Recipe of the Day
          </h2>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {recipe.title}
          </h3>

          <div className="flex items-center text-green-700 font-medium text-sm gap-4 mb-6">
            <div className="flex items-center gap-1">
              <IoIosTime size={20} /> {recipe.cookTime}
            </div>
            <div className="flex items-center gap-1">
              <IoMdPerson size={20} /> {recipe.servings}
            </div>
            <div className="flex items-center gap-1">
              <BsFileBarGraphFill size={18} /> {recipe.category}
            </div>
          </div>

          <Link
            to={`/recipe/${recipe.id}`}
            className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            See More →
          </Link>
        </div>

        {/* Right side: Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-60 max-w-sm rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipe;
