import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/signup/*" element={<Signup />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/favourites/" element={<Favourites />} />
      <Route
        path="/favourites/:RecipeId"
        element={<div>Recipe Details Page</div>}
      />
    </Routes>
  );
}

export default App;
