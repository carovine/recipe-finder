import "./App.css";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import HomeRecipe from "./components/HomeRecipe.tsx";
import RandomDivider from "./components/RandomDivider.tsx";
import Newsletter from "./components/Newsletter.tsx";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <RandomDivider />
      <HomeRecipe />
      <Newsletter />
    </>
  );
}

export default App;
