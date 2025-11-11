import "../App.css";
import Hero from "../components/Hero.tsx";
import HomeRecipe from "../components/HomeRecipe.tsx";
import RandomDivider from "../components/RandomDivider.tsx";
import Newsletter from "../components/Newsletter.tsx";
import { useEffect, useState } from "react";
import { MealAPI } from "../../services/mealAPI.tsx";
import FeaturedRecipe from "../components/FeaturedRecipe.tsx";
import CategoriesFilter from "../components/CategoriesFilter.tsx";
import { type Category } from "../components/CategoriesFilter.tsx";
export type Meal = {
  id: string;
  title: string;
  description: string;
  recipeId?: number;
  imageUrl?: string;
  image?: string;
  cookTime: string;
  servings: number;
  category: string;
  area: string;
  ingredients: string[];
  instructions: string[];
  originalData: any;
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredRecipe, setFeaturedRecipe] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  // const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [apiCategories, apiRandomMeals, apiRandomMeal] = await Promise.all([
        MealAPI.getCategories(),
        MealAPI.getRandomMeals(12),
        MealAPI.getRandomMeal(),
      ]);

      const transformedCategories = apiCategories.map(
        (category: any, index: any) => {
          return {
            id: index + 1,
            name: category.strCategory,
            image: category.strCategoryThumb,
            description: category.strCategoryDescription,
          };
        }
      );
      setCategories(transformedCategories);

      const transformedMeals = apiRandomMeals
        .map((meal) => MealAPI.transformMealData(meal))
        .filter((meal) => meal !== null);

      setRecipes(transformedMeals);

      const transformedFeatured = MealAPI.transformMealData(apiRandomMeal);
      setFeaturedRecipe(transformedFeatured);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData = async (category: string) => {
    try {
      const meals = await MealAPI.filterByCategory(category);
      const transformedMeals = meals
        .map((meal: Meal) => MealAPI.transformMealData(meal))
        .filter((meal: Meal | null) => meal !== null);
      setRecipes(transformedMeals);
    } catch (error) {
      console.error("Error loading category data:", error);
      setRecipes([]);
    }
  };

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    await loadCategoryData(category);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Hero />
      <RandomDivider />
      {featuredRecipe && <FeaturedRecipe recipe={featuredRecipe} />}
      {/* {recipes.length > 0 && (
        <CategoriesFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      )} */}
      <HomeRecipe recipes={recipes} />
      <Newsletter />
    </>
  );
};

export default Home;
