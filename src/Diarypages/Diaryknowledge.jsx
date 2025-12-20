import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Target,
  Award,
  Brain,
  BookOpen,
  Star,
  Zap,
  Clock,
  ChefHat,
  Leaf,
  TrendingUp,
  Download,
  Share2,
  Heart,
  Eye,
  EyeOff,
  Lightbulb,
  Scale,
  MapPin,
  Calendar,
  Users,
  Dumbbell,
  TestTube,
  Volume2,
  VolumeX,
  PlayCircle,
  PauseCircle,
  Bookmark
} from "lucide-react";

// --- IMAGE IMPORTS (Updated to dairy-themed images) ---
import cowmilk from "../assets/dairy/cowmilk.jpg";
import curd from "../assets/dairy/curd.jpg";
import paneer from "../assets/dairy/paneer.jpg";
import butter from "../assets/dairy/butter.jpg";
import cowghee from "../assets/dairy/cowghee.jpg";
import cheese from "../assets/dairy/cheese.jpg";
import cream from "../assets/dairy/cream.jpg";

//  DATA (unchanged – dairy)
const dairyData = [
  {
    id: 1,
    name: "Milk",
    type: "Cow Milk",
    category: "milk",
    image: cowmilk,
    nutrition: { calories: 60, protein: "3g", fat: "3g", carbs: "5g" },
    facts: ["Rich in calcium", "Good for bones"]
  },
  {
    id: 2,
    name: "Curd",
    type: "Yogurt",
    category: "curd",
    image: curd,
    nutrition: { calories: 60, protein: "3g", fat: "3g", carbs: "4g" },
    facts: ["Probiotic benefits", "Aids digestion"]
  },
  {
    id: 3,
    name: "Paneer",
    type: "Cottage Cheese",
    category: "paneer",
    image: paneer,
    nutrition: { calories: 265, protein: "18g", fat: "20g", carbs: "1g" },
    facts: ["High protein", "Low carb"]
  },
  {
    id: 4,
    name: "Butter",
    type: "Unsalted",
    category: "butter",
    image: butter,
    nutrition: { calories: 717, protein: "0.85g", fat: "81g", carbs: "0.1g" },
    facts: ["High fat", "Rich flavor"]
  },
  {
    id: 5,
    name: "Ghee",
    type: "Clarified Butter",
    category: "ghee",
    image: cowghee,
    nutrition: { calories: 900, protein: "0g", fat: "100g", carbs: "0g" },
    facts: ["Long shelf life", "Good for cooking at high heat"]
  },
  {
    id: 6,
    name: "Cheese",
    type: "Processed Cheese",
    category: "cheese",
    image: cheese,
    nutrition: { calories: 402, protein: "25g", fat: "33g", carbs: "1.3g" },
    facts: ["Calcium rich", "Adds creamy texture"]
  },
  {
    id: 7,
    name: "Flavoured Milk",
    type: "Chocolate Milk",
    category: "drink",
    image: cowmilk,
    nutrition: { calories: 120, protein: "3g", fat: "2g", carbs: "22g" },
    facts: ["Good energy drink", "Contains sugar"]
  },
  {
    id: 8,
    name: "Cream",
    type: "Fresh Cream",
    category: "cream",
    image: cream,
    nutrition: { calories: 345, protein: "2g", fat: "37g", carbs: "3g" },
    facts: ["Used in desserts", "Adds richness"]
  }
];

const quizQuestions = [
  {
    question: "Which dairy product is richest in protein?",
    options: ["Milk", "Paneer", "Butter", "Cream"],
    correct: 1,
    explanation: "Paneer has the highest protein content among common dairy products."
  },
  {
    question: "Which product is clarified butter?",
    options: ["Butter", "Ghee", "Curd", "Cheese"],
    correct: 1,
    explanation: "Ghee is made by clarifying butter and removing milk solids."
  },
  {
    question: "Which dairy product contains probiotics?",
    options: ["Milk", "Curd", "Cheese", "Ghee"],
    correct: 1,
    explanation: "Curd contains live bacteria which provide probiotic benefits."
  }
];

//  DAIRY CARD  (styled like MushroomCard)
const DairyCard = ({ product, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-200"
    >
      {/* image + badges */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
          >
            <Bookmark
              size={20}
              className={bookmarked ? "text-red-500 fill-current" : "text-gray-600"}
            />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
            {product.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.type}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">Popular</span>
          </div>
        </div>

        {/* quick info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <Leaf size={16} className="text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Calories</p>
              <p className="font-semibold">{product.nutrition.calories}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
            <Dumbbell size={16} className="text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Protein</p>
              <p className="font-semibold">{product.nutrition.protein}</p>
            </div>
          </div>
        </div>

        {/* expandable */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-4 border-t">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Nutrition (per 100 g)</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Fat</p>
                    <p className="font-bold">{product.nutrition.fat}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="font-bold">{product.nutrition.carbs}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Quick Facts</h4>
                <ul className="space-y-2">
                  {product.facts.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Lightbulb
                        size={16}
                        className="text-yellow-500 mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* actions */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-green-600 font-semibold hover:text-green-700 flex items-center gap-2"
          >
            {expanded ? (
              <>
                <EyeOff size={18} /> Show Less
              </>
            ) : (
              <>
                <Eye size={18} /> Learn More
              </>
            )}
          </button>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 size={18} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

//  QUIZ  (styled like DairyQuiz)
const DairyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (optionIndex) => {
    setSelectedOption(optionIndex);
    if (optionIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-6 md:p-8 mb-12 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-green-600" size={28} />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Test Your Dairy Knowledge
        </h2>
      </div>

      {!quizCompleted ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              Score: {score}
            </span>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">
              {quizQuestions[currentQuestion].question}
            </h3>
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedOption === null
                      ? "bg-gray-100 hover:bg-green-100 hover:border-green-300"
                      : selectedOption === index
                      ? index === quizQuestions[currentQuestion].correct
                        ? "bg-green-100 border-2 border-green-500"
                        : "bg-red-100 border-2 border-red-500"
                      : index === quizQuestions[currentQuestion].correct
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedOption !== null &&
                      index === quizQuestions[currentQuestion].correct && (
                        <Award className="text-green-600" size={20} />
                      )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedOption !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 p-4 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-blue-800">Did You Know?</p>
                  <p className="text-blue-700">
                    {quizQuestions[currentQuestion].explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz Completed!
          </h3>
          <p className="text-gray-600 mb-6">
            You scored{" "}
            <span className="font-bold text-green-600">{score}</span> out of{" "}
            <span className="font-bold">{quizQuestions.length}</span>
          </p>

          <div className="mb-8">
            {score === quizQuestions.length ? (
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                <Award size={20} /> Dairy Expert!
              </div>
            ) : score >= quizQuestions.length / 2 ? (
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <Star size={20} /> Good Knowledge!
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                <BookOpen size={20} /> Keep Learning!
              </div>
            )}
          </div>

          <button
            onClick={resetQuiz}
            className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-colors"
          >
            Take Quiz Again
          </button>
        </div>
      )}
    </div>
  );
};

//  MAIN PAGE  (Knowledge styling)
const DiaryKnowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredDairy, setFilteredDairy] = useState(dairyData);

  const categories = [
    { id: "all", label: "All Dairy", icon: <Leaf size={18} /> },
    { id: "milk", label: "Milk", icon: <Zap size={18} /> },
    { id: "curd", label: "Curd", icon: <TestTube size={18} /> },
    { id: "paneer", label: "Paneer", icon: <ChefHat size={18} /> },
    { id: "butter", label: "Butter", icon: <TrendingUp size={18} /> },
    { id: "ghee", label: "Ghee", icon: <Target size={18} /> },
    { id: "cheese", label: "Cheese", icon: <Award size={18} /> },
    { id: "drink", label: "Drink", icon: <Users size={18} /> },
    { id: "cream", label: "Cream", icon: <MapPin size={18} /> }
  ];

  React.useEffect(() => {
    let filtered = dairyData;
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    setFilteredDairy(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    // exact same background as Knowledge page
    <div className="bg-[#fdfbe9] min-h-screen py-12 px-4 md:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-900 mb-6">
          Dairy <span className="text-green-600">Knowledge Hub</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          Explore, learn, and master the fascinating world of dairy. From nutrition to cooking tips.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="Search dairy by name, type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-green-700">{dairyData.length}</div>
            <div className="text-sm text-gray-600">Dairy Types</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-green-700">8+</div>
            <div className="text-sm text-gray-600">Health Benefits</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-green-700">20+</div>
            <div className="text-sm text-gray-600">Cooking Uses</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-green-700">100%</div>
            <div className="text-sm text-gray-600">Natural Info</div>
          </div>
        </div>
      </motion.div>

      {/* Quiz Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <DairyQuiz />
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                selectedCategory === cat.id
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dairy Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredDairy.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen size={64} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No dairy found</h3>
            <p className="text-gray-600">Try adjusting your search or filter</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "all"
                  ? "All Dairy Products"
                  : selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1) + " Products"}
              </h2>
              <span className="text-gray-600">{filteredDairy.length} found</span>
            </div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDairy.map((product, index) => (
                <DairyCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Download CTA */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Download Complete Dairy Guide
            </h2>
            <p className="text-green-200 mb-8">
              Get our comprehensive PDF guide with recipes, health benefits, and storage tips.
            </p>
            <button className="bg-white text-green-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-3">
              <Download size={24} /> Download Free Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryKnowledge;