import { IoCloseCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { MealAPI } from "../../services/mealAPI";
import type { Meal } from "./Home";
import useDebounce from "../../hooks/useDebounce";
import { IoIosSearch } from "react-icons/io";
import RecipeCard from "../components/RecipeCard";

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (initialLoading) return;
    const performSearch = async () => {
      setLoading(true);
      try {
        const results = await handleSearch(debouncedSearchQuery);
        setRecipes(results);
      } catch (error) {
        console.error("error searching", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    performSearch();
  }, [debouncedSearchQuery, initialLoading]);

  const handleSearch = async (query: string) => {
    // no search query, fetch random meals
    if (!query.trim()) {
      const randomMeals = await MealAPI.getRandomMeals(12);
      console.log("randomMeals:", randomMeals);
      return randomMeals
        .map((meal) => MealAPI.transformMealData(meal))
        .filter((meal) => meal !== null);
    } else {
      // search by name first then by ingredient
      let queryMeals = await MealAPI.searchMealsByName(query);
      console.log("queryMeals:", queryMeals);
      if (queryMeals.length === 0) {
        queryMeals = await MealAPI.filterByIngredient(query);
      }
      return queryMeals
        .map((meal: Meal) => MealAPI.transformMealData(meal))
        .filter((meal: Meal) => meal !== null);
    }
  };
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const results = await handleSearch("");
        setRecipes(results);
      } catch (error) {
        console.error("Error loading the recipes", error);
      } finally {
        setInitialLoading(false);
      }
    };
    loadInitialData();
  }, []);
  if (initialLoading) {
    return (
      <>
        <div className="pt-20">Loading Recipe Page</div>
      </>
    );
  }
  return (
    <>
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="search relative w-full max-w-md flex gap-2 ">
          <div>Search: </div>
          <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, ingredients..."
            className="w-full max-w-md py-2 px-4 rounded-lg bg-white border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none text-gray-700 placeholder-gray-400"
          />
          {searchQuery.length > 0 && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <IoCloseCircle size={20} />
            </button>
          )}
        </div>

        <div className="mt-8 w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {searchQuery ? `Results for "${searchQuery}"` : "Popular Recipes"}
            </h2>
            <span className="text-sm text-gray-600">
              {recipes.length} found
            </span>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="w-full flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
            </div>
          ) : (
            <>
              {recipes.length > 0 ? (
                <RecipeCard recipes={recipes} />
              ) : (
                <div className="py-10 text-center text-gray-600">
                  No Results Found
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Recipes;
