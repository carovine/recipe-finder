const searches = ["pizza", "pasta", "salad", "soup", "dessert", "sandwich", "sushi", "tacos", "curry", "stir-fry"];

const Recipes = () => {
  return (
    <div className="pt-20 px-4 bg-gray-950 text-white min-h-screen">
      <div className=" block">
        <h1 className="text-2xl font-bold mb-[1.5rem]" >Previous Searches</h1>
        <div className="items-center flex flex-wrap">
          {searches.map((search, index) => (
            <div key={index} className="text-md mb-2 bg-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-gray-700 inline mx-1">{search}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
