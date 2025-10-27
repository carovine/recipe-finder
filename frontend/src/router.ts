import {
  type RouteConfig,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  index("./App.tsx"),
  route("Recipes", "./Pages/Recipes.tsx"),
  route("Random", "./Pages/Random.tsx"),
  route("Favourite", "./Pages/Favourite.tsx"),
] satisfies RouteConfig;
