import "./App.css";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import HomeRecipe from "./components/HomeRecipe.tsx";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <HomeRecipe />
    </>
  );
}

export default App;
