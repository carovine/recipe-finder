import { RedirectToSignIn, useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { type Meal } from "./Home";
import { API_URL } from "../../api";
import RecipeCard from "../components/RecipeCard";

const Favourites = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [favouriteRecipes, setfavouriteRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // to fetch favourite recipes for the signed-in user
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        if (!user?.id) return;
        const response = await fetch(`${API_URL}/favourites/${user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch favourites");
        }
        const favourites = await response.json();
        console.log("favs:", favourites);
        if (favourites.length === 0) {
          setfavouriteRecipes([]);
          setLoading(false);
          return;
        }
        const transformedFavourites = favourites.map((favourite: Meal) => ({
          ...favourite,
          id: favourite.recipeId,
        }));
        setfavouriteRecipes(transformedFavourites);
      } catch (error) {
        console.error("Error loading favourites:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFavourites();
  }, [user?.id]);

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  } else if (loading) {
    return (
      <>
        <div className="pt-20">Loading your favourites...</div>
      </>
    );
  } else if (favouriteRecipes.length === 0) {
    return (
      <>
        <div className="pt-20 text-center">
          You have no favourite recipes yet.
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="pt-20">Your Favourites</div>
        <RecipeCard recipes={favouriteRecipes} />
      </>
    );
  }
};

export default Favourites;
