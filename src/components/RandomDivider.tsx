import pokebowl from "../assets/pokebowl.png";

const RandomDivider = () => {
  return (
    <div className="hotpaprikabg text-white  w-full flex h-25 text-center items-center">
      <img src={pokebowl} alt="Pokebowl" className="h-40" />
      <div className="ml-4 text-left">
        <p>Not sure what to cook? Let us help you decide!</p>
        <button className="bg-white hotpaprikacolor px-3 py-2 rounded-md mt-2 font-bold hover:bg-gray-200">
          Surprise Me!
        </button>
      </div>
    </div>
  );
};

export default RandomDivider;
