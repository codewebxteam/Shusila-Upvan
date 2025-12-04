import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Milk, Sprout, BookOpen, Users, Phone } from "lucide-react";

import heroDairy from "../assets/foundation/dairy.webp";
import heroMushroom from "../assets/foundation/mushroom.webp";

export default function FoundationHome() {
  return (
    <motion.div
      className="bg-gradient-to-b from-[#f3fce8] via-[#f0fff4] to-[#e1f5ff] min-h-screen px-6 md:px-12 py-16 flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <div className="flex flex-wrap gap-12 justify-between max-w-6xl w-full">
        
        {/* LEFT TEXT */}
        <div className="flex-1 text-gray-900 min-w-[300px]">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-r from-green-600 via-lime-500 to-blue-500 bg-clip-text text-transparent font-extrabold">
              Foundation for Smart Farming
            </span>
            <br />
            Dairy & Mushroom Training Hub
          </h1>

          <p className="text-gray-700 text-lg mb-6">
            Learn modern farming techniques, boost production, and grow
            profitable dairy and mushroom units with expert guidance.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link to="/dairy">
              <button className="bg-gradient-to-r from-green-500 via-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                Explore Dairy 
              </button>
            </Link>

            <Link to="/home">
              <button className="border-2 border-green-600 text-green-700 px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:text-white">
                Explore Mushroom
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT FLOATING IMAGES */}
        <div className="flex-1 relative flex justify-center min-w-[300px]">
          <motion.img
            src={heroDairy}
            alt="Dairy Farming"
            className="w-60 md:w-72 rounded-xl shadow-2xl border-4 border-green-200 absolute -top-6 left-4"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
          <motion.img
            src={heroMushroom}
            alt="Mushroom Farming"
            className="w-60 md:w-72 rounded-xl shadow-2xl border-4 border-yellow-200 absolute top-20 right-4"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
        </div>
      </div>

      {/* Middle Heading */}
      <div className="w-full mt-28 flex justify-center">
        <div className="text-gray-900 text-2xl md:text-2xl font-semibold bg-gradient-to-r from-green-500 via-blue-400 to-yellow-400 px-6 py-2 rounded-full inline-block shadow-md">
          Empowering Farmers to Achieve Better Production
        </div>
      </div>

      {/* TWO MAIN OPTIONS */}
      <section className="w-full max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Dairy */}
        <Link to="/dairy">
          <div className="bg-white p-10 rounded-xl shadow-xl border border-blue-200 hover:shadow-2xl transition-transform hover:-translate-y-2 cursor-pointer">
            <Milk size={60} className="text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-3"> Explore Dairy </h3>
            <p className="text-gray-600 text-center">
              Learn about cattle management, high-quality feed, milk yield
              improvement, and modern dairy strategies.
            </p>
          </div>
        </Link>

        {/* Mushroom */}
        <Link to="/mushroom">
          <div className="bg-white p-10 rounded-xl shadow-xl border border-green-200 hover:shadow-2xl transition-transform hover:-translate-y-2 cursor-pointer">
            <Sprout size={60} className="text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-3">Explore Mushroom</h3>
            <p className="text-gray-600 text-center">
              Training for oyster, button, and milky mushroom cultivation with
              step-by-step production and marketing guidance.
            </p>
          </div>
        </Link>

      </section>

      {/* What We Offer */}
      <section className="w-full max-w-6xl mt-24 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
            Foundation Services
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Your client provides full training and support for new and
            experienced farmers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Training */}
          <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <BookOpen size={50} className="mx-auto text-green-700" />
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
              Training Programs
            </h3>
            <p className="text-gray-700">
              Step-by-step guidance to grow dairy and mushroom farms efficiently.
            </p>
          </div>

          {/* Community */}
          <div className="bg-blue-100 p-8 rounded-xl text-center shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <Users size={50} className="mx-auto text-blue-700" />
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
              Farmer Community
            </h3>
            <p className="text-gray-700">
              Join a growing network of farmers and share experiences.
            </p>
          </div>

          {/* Support */}
          <div className="bg-yellow-100 p-8 rounded-xl text-center shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <Phone size={50} className="mx-auto text-yellow-500" />
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
              Support & Consultancy
            </h3>
            <p className="text-gray-700">
              Get advice for increasing production, solving issues, and scaling.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}



