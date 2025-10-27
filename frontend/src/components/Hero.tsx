import heroimagealt from "../assets/heroimagealt.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useGSAP(() => {
    gsap.from("#hero-image", {
      scrollTrigger: {
        trigger: "#hero-image",
        start: "top 40%",
        end: "bottom 20%",
        scrub: true,
      },
      rotation: -360,
      duration: 1,
    });
  }, []);
  return (
    <div className="pt-15 px-10 min-h-screen text-black flex gap-4 hero-container">
      <div className="mt-27 px-6">
        <h1 className="text-5xl font-bold hero-title">
          One Stop Destination For All Your Cravings
        </h1>
        <p className="text-md mt-4 text-gray-600">
          Discover delicious recipes tailored to your taste buds. Whether you're
          craving something sweet, savory, or healthy, we've got you covered!
        </p>
        <button className="mt-6 rounded-md hotpaprikabg px-5 py-2.5 text-sm font-medium text-white shadow-sm cursor-pointer explore-button">
          Explore Recipes
        </button>
      </div>
      <div>
        <img
          id="hero-image"
          src={heroimagealt}
          alt="Delicious Food"
          className=" rotate-0"
        />
      </div>
    </div>
  );
};

export default Hero;
