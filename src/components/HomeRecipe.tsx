import { IoIosTime, IoMdPerson } from "react-icons/io";
import { BsFileBarGraphFill } from "react-icons/bs";
import lasanga from "../assets/lasanga.jpg";
import walnutbrownie from "../assets/walnutbrownie.jpg";

const posts = [
  {
    title: "Chicken Lasagna",
    desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people.",
    img: lasanga,
    date: "Jan 4 2022",
    href: "javascript:void(0)",
    level: "Easy",
    time: "5 min",
    serving: "2 servings",
  },
  {
    title: "Walnut Brownies",
    desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations.",
    img: walnutbrownie,
    date: "Jan 4 2022",
    href: "javascript:void(0)",
    level: "Medium",
    time: "10 min",
    serving: "3 servings",
  },
  {
    title: "Grilled Salmon with Lemon Butter",
    desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks.",
    img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    date: "Jan 4 2022",
    href: "javascript:void(0)",
    level: "Hard",
    time: "15 min",
    serving: "4 servings",
  },
  {
    title: "Vegan Buddha Bowl",
    desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational.",
    img: "https://images.unsplash.com/photo-1634812328723-902bb47365a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069",
    date: "Jan 4 2022",
    href: "javascript:void(0)",
    level: "Easy",
    time: "5 min",
    serving: "2 servings",
  },
  {
    title: "Avocado Toast with Poached Eggs",
    desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational.",
    img: "https://plus.unsplash.com/premium_photo-1693237860577-dde9ed1f394c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1161",
    date: "Jan 4 2022",
    href: "javascript:void(0)",
    level: "Easy",
    time: "5 min",
    serving: "2 servings",
  },
];

const HomeRecipe = () => {
  return (
    <section className="py-32">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className=" text-3xl lg:text-4xl font-bold text-center">
          Latest Recipes
        </h2>
        <p className="text-right text-gray-600 underline hotpaprikacolor cursor-pointer my-5">
          View All
        </p>
        <ul className="grid gap-x-8 gap-y-10 mb-16 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((items, key) => (
            <li className="w-full mx-auto group sm:max-w-sm" key={key}>
              <a href={items.href}>
                <img
                  src={items.img}
                  loading="lazy"
                  alt={items.title}
                  className="w-sm h-xs object-cover rounded-lg"
                />
                <div className="mt-3 space-y-2">
                  <h3 className="text-lg text-gray-800 duration-150 group-hover:text-orange-600 font-semibold">
                    {items.title}
                  </h3>
                  <div className="flex align-center text-green-700 font-medium text-sm">
                    <div className="flex items-center mr-2 gap-1">
                      <IoIosTime size={20} /> {items.time}
                    </div>
                    <div className="flex items-center mr-2 gap-1">
                      <IoMdPerson size={20} /> {items.serving}
                    </div>
                    <div className="flex items-center mr-2 gap-1">
                      <BsFileBarGraphFill /> {items.level}
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeRecipe;
