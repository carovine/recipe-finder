import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";

const Favourites = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  } else {
    return (
      <>
      <Navbar />
      <div className="pt-20">Your Favourites</div>
      </>
    );
  }
};

export default Favourites;
