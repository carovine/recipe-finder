import { IoIosTime, IoMdPerson } from "react-icons/io";
import { BsFileBarGraphFill } from "react-icons/bs";
import { BiSolidHeartCircle } from "react-icons/bi";
import { type Meal } from "../pages/Home";
import { Link } from "react-router";


const HomeRecipe = ({recipes}: {recipes: Meal[]}) => {
  return (
    <section className="py-32">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className=" text-3xl lg:text-4xl font-bold text-center">
          Featured Recipes
        </h2>
        <p className="text-right text-gray-600 underline hotpaprikacolor cursor-pointer my-5">
          View All
        </p>
        <ul className="grid gap-x-8 gap-y-10 mb-16 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((meal, key) => (
            <li className="w-full mx-auto group sm:max-w-sm" key={key}>
              <Link to={`/recipe/${meal.id}`}>
                <div className="relative">
                  <img
                    src={meal.image}
                    loading="lazy"
                    alt={meal.title}
                    className="w-sm h-xs object-cover rounded-lg "
                  />
                  <BiSolidHeartCircle className="absolute top-2 right-2 text-black hover:text-red-500 text-xl" />
                </div>
                <div className="mt-3 space-y-2">
                  <h3 className="text-lg text-gray-800 duration-150 group-hover:text-orange-600 font-semibold">
                    {meal.title}
                  </h3>
                  <div className="flex align-center text-green-700 font-medium text-sm">
                    <div className="flex items-center mr-2 gap-1">
                      <IoIosTime size={20} /> {meal.cookTime}
                    </div>
                    <div className="flex items-center mr-2 gap-1">
                      <IoMdPerson size={20} /> {meal.servings}
                    </div>
                    <div className="flex items-center mr-2 gap-1">
                      <BsFileBarGraphFill /> {meal.category}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeRecipe;
