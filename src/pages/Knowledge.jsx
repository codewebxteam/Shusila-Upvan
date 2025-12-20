import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Heart, 
  Share2, 
  Download,
  Bookmark,
  Star,
  TrendingUp,
  Clock,
  ChefHat,
  Leaf,
  Zap,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  PlayCircle,
  PauseCircle,
  Eye,
  EyeOff,
  Lightbulb,
  Brain,
  Dumbbell,
  TestTube,
  Scale,
  Calendar,
  MapPin,
  TrendingDown,
  Award,
  Users,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- IMAGE IMPORTS ---
import button from "../assets/knowledge/button.webp";
import cremini from "../assets/knowledge/cremini.webp";
import enoki from "../assets/knowledge/enoki.webp";
import king from "../assets/knowledge/king.webp";
import milky from "../assets/knowledge/milky.webp";
import oyster from "../assets/knowledge/oyster.webp";
import protobelo from "../assets/knowledge/protobelo.webp";
import shitake from "../assets/knowledge/shitake.webp";

// Quiz data
const quizQuestions = [
  {
    question: "Which mushroom is known for its meaty texture and often used as a burger patty?",
    options: ["Shiitake", "Portobello", "Enoki", "Button"],
    correct: 1,
    explanation: "Portobello mushrooms have a large, meaty texture that makes them perfect for grilling as burger patties."
  },
  {
    question: "Which mushroom contains lentinan, known for boosting immunity?",
    options: ["Oyster", "Shiitake", "Button", "Milky"],
    correct: 1,
    explanation: "Shiitake mushrooms contain lentinan, a compound known for its immune-boosting properties."
  },
  {
    question: "Which mushroom has the mildest flavor and is most commonly used worldwide?",
    options: ["Portobello", "Oyster", "Button", "King Oyster"],
    correct: 2,
    explanation: "Button mushrooms have a mild, soft flavor making them versatile for various dishes worldwide."
  }
];

// Mushroom data with enhanced information
const mushroomsData = [
  {
    id: 1,
    name: "Button Mushroom",
    image: button,
    taste: "Mild, soft",
    uses: "Soups, curries, pizzas, salads",
    health: "Rich in B vitamins, selenium, low-calorie",
    availability: "Cultivated, available all-year",
    difficulty: "Easy",
    cookingTime: "5-7 mins",
    nutrition: {
      calories: 22,
      protein: "3.1g",
      carbs: "3.3g",
      fiber: "1g"
    },
    category: "beginner",
    season: "All year",
    origin: "Europe",
    facts: [
      "Most widely cultivated mushroom in the world",
      "Contains more protein than most vegetables",
      "Rich source of selenium for antioxidant protection"
    ],
    quizHint: "This is the most common mushroom found in grocery stores worldwide."
  },
  {
    id: 2,
    name: "Oyster Mushroom",
    image: oyster,
    taste: "Delicate, soft",
    uses: "Stir-fries, soups, as meat substitute",
    health: "High in protein, fiber, antioxidants",
    availability: "Cultivated, seasonal (All-year possible in controlled farms)",
    difficulty: "Easy",
    cookingTime: "3-5 mins",
    nutrition: {
      calories: 33,
      protein: "3.3g",
      carbs: "6.1g",
      fiber: "2.3g"
    },
    category: "beginner",
    season: "Winter",
    origin: "Asia",
    facts: [
      "Can be grown on agricultural waste like straw",
      "Contains lovastatin which helps lower cholesterol",
      "Has a delicate seafood-like flavor"
    ],
    quizHint: "Named for its oyster-shaped cap, this mushroom grows in clusters."
  },
  {
    id: 3,
    name: "Shiitake Mushroom",
    image: shitake,
    taste: "Rich, umami flavor",
    uses: "Asian dishes, medicinal supplements",
    health: "Boosts immunity, contains lentinan",
    availability: "Cultivated, specialty stores",
    difficulty: "Medium",
    cookingTime: "8-10 mins",
    nutrition: {
      calories: 34,
      protein: "2.2g",
      carbs: "6.8g",
      fiber: "2.5g"
    },
    category: "medicinal",
    season: "All year",
    origin: "East Asia",
    facts: [
      "Contains lentinan which has anti-cancer properties",
      "Traditionally used in Chinese medicine for centuries",
      "Dried shiitake have more intense flavor than fresh"
    ],
    quizHint: "This medicinal mushroom is a staple in traditional Asian cuisine and medicine."
  },
  {
    id: 4,
    name: "Milky Mushroom",
    image: milky,
    taste: "Soft, slightly sweet",
    uses: "Curries, stir-fries, local dishes",
    health: "High in protein, dietary fiber, vitamins",
    availability: "Cultivated in tropical areas, seasonal",
    difficulty: "Easy",
    cookingTime: "5-7 mins",
    nutrition: {
      calories: 28,
      protein: "3.1g",
      carbs: "4.3g",
      fiber: "1.2g"
    },
    category: "tropical",
    season: "Monsoon",
    origin: "India",
    facts: [
      "Excellent for tropical climate cultivation",
      "Rich in essential amino acids",
      "Popular in Indian and Southeast Asian cuisines"
    ],
    quizHint: "This mushroom thrives in tropical climates and is popular in Indian cooking."
  },
  {
    id: 5,
    name: "King Oyster Mushroom",
    image: king,
    taste: "Meaty, firm",
    uses: "Gourmet dishes, soups, salads",
    health: "Rich in protein, low in fat",
    availability: "Cultivated, gourmet stores",
    difficulty: "Medium",
    cookingTime: "10-12 mins",
    nutrition: {
      calories: 35,
      protein: "3.3g",
      carbs: "6.5g",
      fiber: "2.3g"
    },
    category: "gourmet",
    season: "All year",
    origin: "Mediterranean",
    facts: [
      "Has a thick, meaty stem perfect for slicing",
      "Often used as scallop substitute in vegan dishes",
      "Retains texture well when cooked"
    ],
    quizHint: "Known for its thick stem, this mushroom is often used as a seafood substitute."
  },
  {
    id: 6,
    name: "Enoki Mushroom",
    image: enoki,
    taste: "Mild, crunchy",
    uses: "Soups, salads, sushi",
    health: "Antioxidants, supports digestion",
    availability: "Cultivated, specialty stores",
    difficulty: "Easy",
    cookingTime: "2-3 mins",
    nutrition: {
      calories: 37,
      protein: "2.7g",
      carbs: "7.8g",
      fiber: "2.7g"
    },
    category: "delicate",
    season: "Winter",
    origin: "East Asia",
    facts: [
      "Grows in long, thin clusters",
      "Commonly used in Japanese and Korean cuisine",
      "Should be eaten cooked to avoid potential bacteria"
    ],
    quizHint: "This delicate mushroom grows in long clusters and is often used in Asian soups."
  },
  {
    id: 7,
    name: "Cremini Mushroom",
    image: cremini,
    taste: "Deeper flavor than button",
    uses: "Pastas, stews, curries",
    health: "Low calorie, rich in antioxidants",
    availability: "Cultivated, all-year",
    difficulty: "Easy",
    cookingTime: "7-9 mins",
    nutrition: {
      calories: 22,
      protein: "3.1g",
      carbs: "3.3g",
      fiber: "1g"
    },
    category: "versatile",
    season: "All year",
    origin: "Europe",
    facts: [
      "Also known as baby bella or brown mushroom",
      "More flavor than white button mushrooms",
      "Same species as button and portobello"
    ],
    quizHint: "This is essentially a brown version of the common button mushroom with more flavor."
  },
  {
    id: 8,
    name: "Portobello Mushroom",
    image: protobelo,
    taste: "Robust, meaty",
    uses: "Grilled, burgers, sandwiches",
    health: "Rich in nutrients and antioxidants",
    availability: "Cultivated, all-year",
    difficulty: "Easy",
    cookingTime: "10-15 mins",
    nutrition: {
      calories: 22,
      protein: "3.1g",
      carbs: "3.3g",
      fiber: "1g"
    },
    category: "meaty",
    season: "All year",
    origin: "Europe",
    facts: [
      "Mature form of cremini mushroom",
      "Large cap makes it perfect for stuffing",
      "Excellent source of copper and selenium"
    ],
    quizHint: "This large, mature mushroom is often grilled whole as a vegetarian burger patty."
  }
];

// --- INTERACTIVE QUIZ COMPONENT ---
const MushroomQuiz = () => {
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Test Your Mushroom Knowledge</h2>
      </div>
      
      {!quizCompleted ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              Score: {score}
            </span>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">{quizQuestions[currentQuestion].question}</h3>
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedOption === null
                      ? 'bg-gray-100 hover:bg-green-100 hover:border-green-300'
                      : selectedOption === index
                      ? index === quizQuestions[currentQuestion].correct
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-red-100 border-2 border-red-500'
                      : index === quizQuestions[currentQuestion].correct
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedOption !== null && index === quizQuestions[currentQuestion].correct && (
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
                  <p className="text-blue-700">{quizQuestions[currentQuestion].explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
          <p className="text-gray-600 mb-6">
            You scored <span className="font-bold text-green-600">{score}</span> out of <span className="font-bold">{quizQuestions.length}</span>
          </p>
          
          <div className="mb-8">
            {score === quizQuestions.length ? (
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                <Award size={20} /> Mushroom Expert!
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

// --- MUSHROOM COMPARISON TOOL ---
const ComparisonTool = () => {
  const [selectedMushrooms, setSelectedMushrooms] = useState([1, 3]);
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    const data = mushroomsData.filter(m => selectedMushrooms.includes(m.id));
    setComparisonData(data);
  }, [selectedMushrooms]);

  const toggleMushroom = (id) => {
    if (selectedMushrooms.includes(id)) {
      if (selectedMushrooms.length > 1) {
        setSelectedMushrooms(selectedMushrooms.filter(mId => mId !== id));
      }
    } else {
      if (selectedMushrooms.length < 3) {
        setSelectedMushrooms([...selectedMushrooms, id]);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 mb-12 shadow-lg border border-green-200">
      <div className="flex items-center gap-3 mb-6">
        <Scale className="text-green-600" size={28} />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Compare Mushrooms</h2>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">Select up to 3 mushrooms to compare:</p>
        <div className="flex flex-wrap gap-2">
          {mushroomsData.map(mushroom => (
            <button
              key={mushroom.id}
              onClick={() => toggleMushroom(mushroom.id)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedMushrooms.includes(mushroom.id)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {mushroom.name}
            </button>
          ))}
        </div>
      </div>
      
      {comparisonData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Feature</th>
                {comparisonData.map(mushroom => (
                  <th key={mushroom.id} className="text-left p-4">
                    <div className="flex items-center gap-3">
                      <img src={mushroom.image} alt={mushroom.name} className="w-12 h-12 object-cover rounded" />
                      <span className="font-bold">{mushroom.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-semibold">Taste Profile</td>
                {comparisonData.map(mushroom => (
                  <td key={mushroom.id} className="p-4">{mushroom.taste}</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-4 font-semibold">Cooking Time</td>
                {comparisonData.map(mushroom => (
                  <td key={mushroom.id} className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      {mushroom.cookingTime}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-4 font-semibold">Difficulty Level</td>
                {comparisonData.map(mushroom => (
                  <td key={mushroom.id} className="p-4">
                    <div className="flex items-center gap-2">
                      {mushroom.difficulty === 'Easy' && <Zap size={16} className="text-green-500" />}
                      {mushroom.difficulty === 'Medium' && <TrendingUp size={16} className="text-yellow-500" />}
                      {mushroom.difficulty === 'Hard' && <Target size={16} className="text-red-500" />}
                      {mushroom.difficulty}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-4 font-semibold">Season</td>
                {comparisonData.map(mushroom => (
                  <td key={mushroom.id} className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      {mushroom.season}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold">Best Used In</td>
                {comparisonData.map(mushroom => (
                  <td key={mushroom.id} className="p-4">
                    <div className="flex items-center gap-2">
                      <ChefHat size={16} className="text-gray-500" />
                      {mushroom.uses.split(',')[0]}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// --- ENHANCED MUSHROOM CARD ---
const MushroomCard = ({ mushroom, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);

  const pronounceName = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(mushroom.name);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
      setPlayingAudio(true);
      
      setTimeout(() => setPlayingAudio(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-200"
    >
      {/* Card Header */}
      <div className="relative">
        <img
          src={mushroom.image}
          alt={mushroom.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
          >
            <Bookmark size={20} className={bookmarked ? "text-red-500 fill-current" : "text-gray-600"} />
          </button>
          <button
            onClick={pronounceName}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
            disabled={playingAudio}
          >
            {playingAudio ? <Volume2 size={20} className="text-green-600" /> : <VolumeX size={20} className="text-gray-600" />}
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
            {mushroom.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{mushroom.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">Origin: {mushroom.origin}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < (mushroom.difficulty === 'Easy' ? 4 : mushroom.difficulty === 'Medium' ? 3 : 2)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">Difficulty</span>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <Clock size={16} className="text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Cook Time</p>
              <p className="font-semibold">{mushroom.cookingTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
            <Leaf size={16} className="text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Calories</p>
              <p className="font-semibold">{mushroom.nutrition.calories}</p>
            </div>
          </div>
        </div>

        {/* Taste Profile */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <ChefHat size={18} className="text-gray-600" />
            <span className="font-semibold text-gray-900">Taste Profile</span>
          </div>
          <p className="text-gray-700">{mushroom.taste}</p>
        </div>

        {/* Expandable Section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4 border-t">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Nutrition Facts (per 100g)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Protein</p>
                      <p className="font-bold">{mushroom.nutrition.protein}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Carbs</p>
                      <p className="font-bold">{mushroom.nutrition.carbs}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Fiber</p>
                      <p className="font-bold">{mushroom.nutrition.fiber}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Calories</p>
                      <p className="font-bold">{mushroom.nutrition.calories}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Fun Facts</h4>
                  <ul className="space-y-2">
                    {mushroom.facts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Lightbulb size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Health Benefits</h4>
                  <p className="text-gray-700">{mushroom.health}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
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

// --- INTERACTIVE LEARNING PATH ---
const LearningPath = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Beginner",
      description: "Start with Button and Oyster mushrooms",
      mushrooms: [1, 2]
    },
    {
      title: "Intermediate",
      description: "Explore Cremini and Milky mushrooms",
      mushrooms: [7, 4]
    },
    {
      title: "Advanced",
      description: "Master Shiitake and Portobello",
      mushrooms: [3, 8]
    },
    {
      title: "Expert",
      description: "Try King Oyster and Enoki",
      mushrooms: [5, 6]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-3xl p-8 text-white mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Target className="text-green-300" size={28} />
        <h2 className="text-2xl md:text-3xl font-bold">Learning Path</h2>
      </div>
      
      <p className="text-green-200 mb-8">Follow this guided path to master mushrooms step by step</p>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-0 top-1/2 w-full h-1 bg-green-700/50 transform -translate-y-1/2"></div>
        <div 
          className="absolute left-0 top-1/2 h-1 bg-green-400 transform -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {/* Steps */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className="flex flex-col items-center w-24"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all ${
                index <= currentStep 
                  ? 'bg-green-500 shadow-lg scale-110' 
                  : 'bg-green-800/50'
              }`}>
                <span className="font-bold">{index + 1}</span>
              </div>
              <span className={`font-semibold text-center mb-1 ${
                index === currentStep ? 'text-green-300' : 'text-green-400'
              }`}>{step.title}</span>
              <span className="text-xs text-green-300/80 text-center">{step.description}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Current Step Content */}
      <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">{steps[currentStep].title} Level</h3>
        <p className="text-green-200 mb-4">Focus on these mushrooms:</p>
        <div className="grid grid-cols-2 gap-4">
          {steps[currentStep].mushrooms.map(mushroomId => {
            const mushroom = mushroomsData.find(m => m.id === mushroomId);
            return (
              <div key={mushroom.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                <img src={mushroom.image} alt={mushroom.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="font-semibold">{mushroom.name}</p>
                  <p className="text-sm text-green-300/80">{mushroom.taste}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- MAIN KNOWLEDGE PAGE ---
const Knowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showQuiz, setShowQuiz] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [filteredMushrooms, setFilteredMushrooms] = useState(mushroomsData);

  // Categories for filtering
  const categories = [
    { id: "all", label: "All Mushrooms", icon: <Leaf size={18} /> },
    { id: "beginner", label: "Beginner", icon: <Zap size={18} /> },
    { id: "medicinal", label: "Medicinal", icon: <TestTube size={18} /> },
    { id: "gourmet", label: "Gourmet", icon: <ChefHat size={18} /> },
    { id: "tropical", label: "Tropical", icon: <Sun size={18} /> }
  ];

  // Search and filter mushrooms
  useEffect(() => {
    let filtered = mushroomsData;
    
    if (searchQuery) {
      filtered = filtered.filter(mushroom =>
        mushroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mushroom.taste.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mushroom.uses.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(mushroom => mushroom.category === selectedCategory);
    }
    
    setFilteredMushrooms(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-[#fdfbe9] min-h-screen py-12 px-4 md:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-900 mb-6">
          Mushroom <span className="text-green-600">Knowledge Hub</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          Explore, learn, and master the fascinating world of mushrooms. From identification to cooking tips.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="Search mushrooms by name, taste, or uses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <div className="text-2xl font-bold text-green-700">{mushroomsData.length}</div>
            <div className="text-sm text-gray-600">Mushroom Types</div>
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
            <div className="text-sm text-gray-600">Organic Info</div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Tools Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl text-left hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <Brain size={32} />
              <div>
                <h3 className="text-xl font-bold">Interactive Quiz</h3>
                <p className="text-green-100">Test your mushroom knowledge</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-200">
              {showQuiz ? "Hide Quiz" : "Take Quiz Now"} <ChevronRight size={20} />
            </div>
          </button>
          
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-2xl text-left hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <Scale size={32} />
              <div>
                <h3 className="text-xl font-bold">Comparison Tool</h3>
                <p className="text-blue-100">Compare different mushrooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-blue-200">
              {showComparison ? "Hide Tool" : "Compare Now"} <ChevronRight size={20} />
            </div>
          </button>
        </div>
        
        {showQuiz && <MushroomQuiz />}
        {showComparison && <ComparisonTool />}
      </div>

      {/* Learning Path */}
      <div className="max-w-7xl mx-auto">
        <LearningPath />
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mushroom Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredMushrooms.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen size={64} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No mushrooms found</h3>
            <p className="text-gray-600">Try adjusting your search or filter</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Mushrooms' : 
                 selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) + ' Mushrooms'}
              </h2>
              <span className="text-gray-600">{filteredMushrooms.length} found</span>
            </div>
            
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMushrooms.map((mushroom, index) => (
                <MushroomCard key={mushroom.id} mushroom={mushroom} index={index} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Download Guide CTA */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Download Complete Mushroom Guide</h2>
            <p className="text-green-200 mb-8">
              Get our comprehensive PDF guide with recipes, cultivation tips, and health benefits.
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

export default Knowledge;

// Helper component for Sun icon
const Sun = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);
