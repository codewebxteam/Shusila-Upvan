//  import { motion } from "framer-motion";
// import heroImage from "../assets/hero.webp";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Sprout,
//   ShoppingBasket,
//   Calendar,
//   Users,
//   BookOpen,
//   Phone,
// } from "lucide-react";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";
// import { useCallback } from "react";

// // ---- Mushroom Data ----
// import button from "../assets/knowledge/button.webp";
// import cremini from "../assets/knowledge/cremini.webp";
// import enoki from "../assets/knowledge/enoki.webp";
// import king from "../assets/knowledge/king.webp";
// import milky from "../assets/knowledge/milky.webp";
// import oyster from "../assets/knowledge/oyster.webp";
// import protobelo from "../assets/knowledge/protobelo.webp";
// import shitake from "../assets/knowledge/shitake.webp";

// const mushrooms = [
//   {
//     id: 1,
//     name: "Button Mushroom",
//     image: button,
//     taste: "Mild, soft",
//     uses: "Soups, curries, pizzas, salads",
//     slug: "button",
//   },
//   {
//     id: 2,
//     name: "Oyster Mushroom",
//     image: oyster,
//     taste: "Delicate, soft",
//     uses: "Stir-fries, soups, as meat substitute",
//     slug: "oyster",
//   },
//   {
//     id: 3,
//     name: "Shiitake Mushroom",
//     image: shitake,
//     taste: "Rich, umami flavor",
//     uses: "Asian dishes, medicinal supplements",
//     slug: "shiitake",
//   },
//   {
//     id: 4,
//     name: "Milky Mushroom",
//     image: milky,
//     taste: "Soft, slightly sweet",
//     uses: "Curries, stir-fries, local dishes",
//     slug: "milky",
//   },
//   {
//     id: 5,
//     name: "King Oyster Mushroom",
//     image: king,
//     taste: "Meaty, firm",
//     uses: "Gourmet dishes, soups, salads",
//     slug: "king",
//   },
//   {
//     id: 6,
//     name: "Enoki Mushroom",
//     image: enoki,
//     taste: "Mild, crunchy",
//     uses: "Soups, salads, sushi",
//     slug: "enoki",
//   },
//   {
//     id: 7,
//     name: "Cremini Mushroom",
//     image: cremini,
//     taste: "Deeper flavor",
//     uses: "Pastas, stews, curries",
//     slug: "cremini",
//   },
//   {
//     id: 8,
//     name: "Portobello Mushroom",
//     image: protobelo,
//     taste: "Robust, meaty",
//     uses: "Grilled, burgers, sandwiches",
//     slug: "portobello",
//   },
// ];

// // ---- Carousel Component ----
// const MushroomCarousel = () => {
//   const [emblaRef, emblaApi] = useEmblaCarousel(
//     { loop: true, align: "start" },
//     [Autoplay({ delay: 4000 })]
//   );

//   const navigate = useNavigate();

//   const scrollPrev = useCallback(
//     () => emblaApi && emblaApi.scrollPrev(),
//     [emblaApi]
//   );
//   const scrollNext = useCallback(
//     () => emblaApi && emblaApi.scrollNext(),
//     [emblaApi]
//   );

//   // Click handler -> navigate with hash
//   const handleCardClick = (slug) => {
//     navigate(`/mushrooms#${slug}`);
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto mt-20 relative">
//       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
//         Popular Mushrooms
//       </h2>
//       <div className="overflow-hidden" ref={emblaRef}>
//         <div className="flex -ml-6">
//           {mushrooms.map((m) => (
//             <div
//               key={m.id}
//               className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 pl-6 cursor-pointer"
//               onClick={() => handleCardClick(m.slug)}
//             >
//               <div className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-200 flex flex-col sm:flex-row items-center gap-6">
//                 {/* Left Image */}
//                 <img
//                   src={m.image}
//                   alt={m.name}
//                   className="w-40 h-40 object-cover rounded-xl"
//                 />
//                 {/* Right Info */}
//                 <div className="flex-1 text-center sm:text-left">
//                   <h3 className="text-xl font-bold text-green-800">{m.name}</h3>
//                   <p className="text-gray-700 text-sm">
//                     <span className="font-semibold">Taste:</span> {m.taste}
//                   </p>
//                   <p className="text-gray-700 text-sm">
//                     <span className="font-semibold">Uses:</span> {m.uses}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Prev/Next Buttons - Centered */}
//       <button
//         onClick={scrollPrev}
//         className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-green-500 hover:text-white"
//       >
//         ◀
//       </button>
//       <button
//         onClick={scrollNext}
//         className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-green-500 hover:text-white"
//       >
//         ▶
//       </button>
//     </div>
//   );
// };

// const Home = () => {
//   return (
//     <motion.div
//       className="bg-gradient-to-b from-[#fdfbe9] via-[#f4fce3] to-[#e8f8f0] min-h-screen px-6 md:px-12 py-16 flex flex-col items-center"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -30 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Hero Section */}
//       <div className="flex flex-wrap gap-12 justify-between max-w-6xl w-full">
//         {/* Left Text */}
//         <div className="flex-1 text-gray-900 min-w-[300px]">
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
//             UrbanFungi <br />
//             <span className="bg-gradient-to-r from-green-600 via-lime-500 to-yellow-500 bg-clip-text text-transparent font-extrabold">
//               Buy, Learn & Grow with
//             </span>{" "}
//             the Mushroom Community
//           </h1>
//           <p className="text-gray-700 text-lg mb-6">
//             Discover everything about mushrooms – from organic cultivation to
//             healthy recipes and community events. All in one place 🍄
//           </p>

//           <div className="flex flex-wrap gap-4">
//             <Link to="/mushrooms">
//               <button className="bg-gradient-to-r from-green-500 via-lime-400 to-yellow-400 text-white px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//                 Explore Mushrooms
//               </button>
//             </Link>
//             <button className="border-2 border-green-600 text-green-700 px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:text-white">
//               Request a Demo
//             </button>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div className="flex-1 flex justify-center min-w-[300px]">
//           <img
//             src={heroImage}
//             alt="Mushroom preview"
//             className="max-w-full rounded-xl shadow-2xl border-4 border-yellow-200"
//           />
//         </div>
//       </div>

//       {/* Middle Heading */}
//       <div className="w-full mt-28 flex justify-center">
//         <div className="text-gray-900 text-2xl md:text-2xl font-semibold bg-gradient-to-r from-green-500 via-lime-400 to-yellow-400 px-6 py-2 rounded-full inline-block shadow-md">
//           Fresh Mushrooms, Healthy Living, Strong Community.
//         </div>
//       </div>

//       {/* 🔥 Carousel Section */}
//       <MushroomCarousel />

//       {/* ---- What We Offer Section ---- */}
//       <section className="w-full max-w-6xl mt-20 px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
//             What We Offer
//           </h2>
//           <p className="text-gray-700 text-lg max-w-2xl mx-auto">
//             Explore our services for farmers, mushroom enthusiasts, and healthy
//             food lovers.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {/* Cultivation Guide */}
//           <Link to="/farmer-support">
//             <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-200 hover:to-yellow-100 cursor-pointer h-full flex flex-col justify-between">
//               <Sprout size={48} className="mx-auto text-green-600" />
//               <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
//                 Cultivation Support
//               </h3>
//               <p className="text-gray-700">
//                 Learn mushroom farming techniques, get expert help, and grow
//                 organic mushrooms.
//               </p>
//             </div>
//           </Link>

//           {/* Buy Fresh Mushrooms */}
//           <Link to="/mushrooms">
//             <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-200 hover:to-yellow-100 cursor-pointer h-full flex flex-col justify-between">
//               <ShoppingBasket size={48} className="mx-auto text-yellow-500" />
//               <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
//                 Buy Fresh Mushrooms
//               </h3>
//               <p className="text-gray-700">
//                 Order fresh, organic, and exotic mushrooms directly from trusted
//                 farmers.
//               </p>
//             </div>
//           </Link>

//           {/* Events */}
//           <Link to="/events">
//             <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-200 hover:to-yellow-100 cursor-pointer h-full flex flex-col justify-between">
//               <Calendar size={48} className="mx-auto text-green-600" />
//               <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
//                 Community Events
//               </h3>
//               <p className="text-gray-700">
//                 Join workshops, mushroom festivals, and farmer meetups near you.
//               </p>
//             </div>
//           </Link>

//           {/* Knowledge Hub */}
//           <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-200 hover:to-yellow-100 h-full flex flex-col justify-between">
//             <BookOpen size={48} className="mx-auto text-green-700" />
//             <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
//               Knowledge Hub
//             </h3>
//             <p className="text-gray-700">
//               Access guides, recipes, and research to understand mushrooms
//               better.
//             </p>
//           </div>

//           {/* Farmer Community */}
//           <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-200 hover:to-yellow-100 h-full flex flex-col justify-between">
//             <Users size={48} className="mx-auto text-yellow-500" />
//             <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
//               Farmer Community
//             </h3>
//             <p className="text-gray-700">
//               Connect with fellow mushroom growers and share knowledge &
//               experiences.
//             </p>
//           </div>

//           {/* Contact */}
//           <Link to="/contact">
//             <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-200 hover:to-yellow-100 cursor-pointer h-full flex flex-col justify-between">
//               <Phone size={48} className="mx-auto text-green-600" />
//               <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
//                 Contact Us
//               </h3>
//               <p className="text-gray-700">
//                 Have questions? Reach out for support and collaboration.
//               </p>
//             </div>
//           </Link>
//         </div>
//       </section>
//     </motion.div>
//   );
// };

// export default Home;






import { motion } from "framer-motion";
import heroImage from "../assets/hero.webp";
import { Link, useNavigate } from "react-router-dom";
import {
  Sprout,
  ShoppingBasket,
  Calendar,
  Users,
  BookOpen,
  Phone,
  ChevronLeft,
  ChevronRight,
  ChefHat,
  Utensils,
  ArrowRight,
  Leaf,
  TrendingUp,
  Shield,
  Heart,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useState, useEffect } from "react";

// ---- Mushroom Data ----
import button from "../assets/knowledge/button.webp";
import cremini from "../assets/knowledge/cremini.webp";
import enoki from "../assets/knowledge/enoki.webp";
import king from "../assets/knowledge/king.webp";
import milky from "../assets/knowledge/milky.webp";
import oyster from "../assets/knowledge/oyster.webp";
import protobelo from "../assets/knowledge/protobelo.webp";
import shitake from "../assets/knowledge/shitake.webp";

const mushrooms = [
  {
    id: 1,
    name: "Button Mushroom",
    image: button,
    taste: "Mild, soft",
    uses: "Soups, curries, pizzas, salads",
    slug: "button",
  },
  {
    id: 2,
    name: "Oyster Mushroom",
    image: oyster,
    taste: "Delicate, soft",
    uses: "Stir-fries, soups, as meat substitute",
    slug: "oyster",
  },
  {
    id: 3,
    name: "Shiitake Mushroom",
    image: shitake,
    taste: "Rich, umami flavor",
    uses: "Asian dishes, medicinal supplements",
    slug: "shiitake",
  },
  {
    id: 4,
    name: "Milky Mushroom",
    image: milky,
    taste: "Soft, slightly sweet",
    uses: "Curries, stir-fries, local dishes",
    slug: "milky",
  },
  {
    id: 5,
    name: "King Oyster Mushroom",
    image: king,
    taste: "Meaty, firm",
    uses: "Gourmet dishes, soups, salads",
    slug: "king",
  },
  {
    id: 6,
    name: "Enoki Mushroom",
    image: enoki,
    taste: "Mild, crunchy",
    uses: "Soups, salads, sushi",
    slug: "enoki",
  },
  {
    id: 7,
    name: "Cremini Mushroom",
    image: cremini,
    taste: "Deeper flavor",
    uses: "Pastas, stews, curries",
    slug: "cremini",
  },
  {
    id: 8,
    name: "Portobello Mushroom",
    image: protobelo,
    taste: "Robust, meaty",
    uses: "Grilled, burgers, sandwiches",
    slug: "portobello",
  },
];

// Features data
const features = [
  {
    title: "Cultivation Support",
    description: "Learn mushroom farming techniques, get expert help, and grow organic mushrooms.",
    icon: <Sprout size={28} />,
    link: "/farmer-support",
  },
  {
    title: "Buy Fresh Mushrooms",
    description: "Order fresh, organic, and exotic mushrooms directly from trusted farmers.",
    icon: <ShoppingBasket size={28} />,
    link: "/mushrooms",
  },
  {
    title: "Community Events",
    description: "Join workshops, mushroom festivals, and farmer meetups near you.",
    icon: <Calendar size={28} />,
    link: "/events",
  },
  {
    title: "Knowledge Hub",
    description: "Access guides, recipes, and research to understand mushrooms better.",
    icon: <BookOpen size={28} />,
    link: "/knowledge",
  },
  {
    title: "Farmer Community",
    description: "Connect with fellow mushroom growers and share knowledge & experiences.",
    icon: <Users size={28} />,
    link: "/community",
  },
  {
    title: "Contact Us",
    description: "Have questions? Reach out for support and collaboration.",
    icon: <Phone size={28} />,
    link: "/contact",
  },
];

// Benefits data
const benefits = [
  {
    icon: <Leaf size={32} />,
    title: "100% Organic",
    description: "Chemical-free, naturally grown mushrooms",
    color: "from-green-400 to-green-600",
  },
  {
    icon: <Shield size={32} />,
    title: "Quality Guaranteed",
    description: "Freshness and quality assured",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Fair Prices",
    description: "Direct from farmers, no middlemen",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    icon: <Heart size={32} />,
    title: "Health Benefits",
    description: "Rich in nutrients and antioxidants",
    color: "from-pink-400 to-pink-600",
  },
];

// ---- Carousel Component ----
const MushroomCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      skipSnaps: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  // Handle click to navigate with hash
  const handleCardClick = (slug) => {
    navigate(`/mushrooms#${slug}`);
  };

  // Update selected index
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-20 px-4 relative group">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Popular Mushrooms
          </h2>
          <p className="text-gray-600 mt-2">Discover our premium collection</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="p-3 rounded-full bg-white backdrop-blur-sm border border-gray-200 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all shadow-lg hover:shadow-xl"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="p-3 rounded-full bg-white backdrop-blur-sm border border-gray-200 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all shadow-lg hover:shadow-xl"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex gap-6">
          {mushrooms.map((m) => (
            <div
              key={m.id}
              className="flex-grow-0 flex-shrink-0 min-w-0 basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-200 hover:border-green-400 cursor-pointer overflow-hidden h-full"
                onClick={() => handleCardClick(m.slug)}
              >
                <div className="relative">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-48 object-cover rounded-xl mb-4 hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Popular
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{m.name}</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-50">
                      <ChefHat size={18} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Taste</p>
                      <p className="text-gray-600">{m.taste}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-yellow-50">
                      <Utensils size={18} className="text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Best Used In</p>
                      <p className="text-gray-600">{m.uses}</p>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg">
                  View Details
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {mushrooms.slice(0, 4).map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? 'bg-green-600 w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-[#fdfbe9] via-[#f4fce3] to-[#e8f8f0] min-h-screen px-4 sm:px-6 lg:px-12 py-12 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between items-center max-w-6xl mx-auto mb-20">
        {/* Left Text */}
        <div className="flex-1 w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
              UrbanFungi{" "}
              <span className="block bg-gradient-to-r from-green-600 via-lime-500 to-yellow-500 bg-clip-text text-transparent">
                Buy, Learn & Grow
              </span>
              <span className="text-xl md:text-2xl font-normal text-gray-700 block mt-4">
                with the Mushroom Community 🍄
              </span>
            </h1>
            
            <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
              Discover everything about mushrooms – from organic cultivation to
              healthy recipes and community events. All in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/mushrooms">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden group bg-gradient-to-r from-green-500 via-lime-400 to-yellow-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  <span className="relative z-10">Explore Mushrooms</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-green-600 text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Request a Demo
              </motion.button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${benefit.color} text-white`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{benefit.title}</p>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full lg:w-1/2 flex justify-center"
        >
          <div className="relative">
            <img
              src={heroImage}
              alt="Mushroom preview"
              className="w-full max-w-lg rounded-2xl shadow-2xl border-4 border-yellow-200 hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-yellow-400 text-white px-6 py-3 rounded-xl shadow-xl">
              <p className="font-bold text-lg">Fresh Daily!</p>
              <p className="text-sm">From local farms</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Middle Heading */}
      <div className="w-full max-w-6xl mx-auto my-20 flex justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-900 text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 via-lime-400 to-yellow-400 px-8 py-4 rounded-full inline-block shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          Fresh Mushrooms, Healthy Living, Strong Community.
        </motion.div>
      </div>

      {/* 🔥 Carousel Section */}
      <MushroomCarousel />

      {/* Stats Section */}
      <section className="w-full max-w-6xl mx-auto mt-20 px-4 py-12 bg-gradient-to-r from-green-50 to-yellow-50 rounded-3xl shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "500+", label: "Happy Farmers" },
            { number: "50+", label: "Mushroom Varieties" },
            { number: "1000+", label: "Community Members" },
            { number: "24/7", label: "Expert Support" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-700 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-700 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---- What We Offer Section ---- */}
      <section className="w-full max-w-6xl mx-auto mt-20 px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 relative inline-block"
          >
            What We Offer
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-500 to-yellow-400 rounded-full"></div>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Explore our comprehensive services for farmers, mushroom enthusiasts, and healthy food lovers.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={feature.link}>
                <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100 h-full group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-4">{feature.description}</p>
                  <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Explore</span>
                    <ArrowRight size={20} className="ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full max-w-2xl mx-auto mt-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-center text-white shadow-xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Mushroom News
          </h3>
          <p className="mb-6 opacity-90 text-lg">
            Get latest recipes, farming tips, and community events in your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors text-lg shadow-lg"
            >
              Subscribe
            </motion.button>
          </form>
          <p className="text-sm opacity-75 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-4xl mx-auto mt-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-100 to-yellow-100 p-8 md:p-12 rounded-3xl shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Join the Mushroom Revolution?
          </h3>
          <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">
            Whether you're a farmer, chef, or mushroom lover, there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Join Now Free
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-green-600 text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all"
              >
                Contact Sales
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
