import { IoIosTime, IoMdPerson } from "react-icons/io";
import { BsFileBarGraphFill } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MealAPI } from "../../services/mealAPI";
import { SignIn, useUser } from "@clerk/clerk-react";
import { API_URL } from "../../api";
import type { Meal } from "./Home";
import { IoReloadSharp } from "react-icons/io5";

export default function RecipeDetails() {
  const { recipeId } = useParams();
  const [isFavourite, setIsFavourite] = useState(false);
  const [recipe, setRecipe] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!userId || !recipeId) return;

    const checkIfSaved = async () => {
      try {
        const response = await fetch(`${API_URL}/favourites/${userId}`);
        if (!response.ok) {
          console.log("User has no favourites yet");
          setIsFavourite(false);
          return;
        }
        const favourites = await response.json();
        console.log(favourites);
        const isRecipeSaved = favourites.some(
          (fav: Meal) => fav.recipeId === parseInt(recipeId)
        );
        console.log("isrecipesaved:", isRecipeSaved);

        setIsFavourite(isRecipeSaved);
      } catch (error) {
        console.error(error);
      }
    };

    const loadRecipeDetails = async () => {
      try {
        const recipeResponse = await MealAPI.getMealById(recipeId);
        const transformedRecipe = MealAPI.transformMealData(recipeResponse);
        setRecipe(transformedRecipe);
      } finally {
        setLoading(false);
      }
    };

    checkIfSaved();
    loadRecipeDetails();
  }, [userId, recipeId]);

  const handleToggleFav = async () => {
    if (!userId || !recipeId) return;
    setIsSaving(true);
    try {
      if (isFavourite) {
        //remove from favourites
        const response = await fetch(
          `${API_URL}/favourites/${userId}/${recipeId}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          console.log("User has no favourites yet");
          setIsFavourite(false);
          return;
        }
      } else {
        const response = await fetch(`${API_URL}/favourites/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            recipeId: parseInt(recipeId),
            title: recipe?.title,
            imageUrl: recipe?.image,
            cookTime: recipe?.cookTime,
            servings: recipe?.servings,
          }),
        });
        const newFav = await response.json();
        console.log("newFav", newFav);
        if (!response.ok) {
          setIsSaving(false);
          throw new Error("Failed to add recipe");
        }
        setIsFavourite(true);
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!userId) return <SignIn />; // Safe now ✅
  if (loading) return <div>Loading recipe details...</div>;

  return (
    <div className="w-full min-h-screen bg-white py-17">
      {/* Banner Section */}
      <div className="relative w-full h-72 sm:h-96">
        <img
          src={recipe?.image}
          alt={recipe?.title || "not found"}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-5">
          <div className="flex justify-between w-full">
            <h1 className="text-white text-3xl font-bold max-w-[70%] drop-shadow-lg bg-orange-500/50 px-3 py-1 rounded-xl">
              {recipe?.title}
            </h1>
            <button
              onClick={handleToggleFav}
              className="bg-white/80 hover:bg-white text-red-600 p-3 rounded-full transition"
            >
              {isSaving ? (
                <IoReloadSharp size={20} />
              ) : isFavourite ? (
                <FaHeart size={20} />
              ) : (
                <FaRegHeart size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex gap-6 text-green-700 font-medium text-sm">
          <div className="flex items-center gap-1">
            <IoIosTime size={20} /> {recipe?.cookTime}
          </div>
          <div className="flex items-center gap-1">
            <IoMdPerson size={20} /> {recipe?.servings}
          </div>
          <div className="flex items-center gap-1">
            <BsFileBarGraphFill /> {recipe?.category}
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Ingredients
        </h2>
        <ul className="list-disc ml-6 space-y-1 text-gray-700">
          {recipe?.ingredients?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Instructions
        </h2>
        <ul className="list-decimal ml-6 space-y-1 text-gray-700">
          {recipe?.instructions?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
