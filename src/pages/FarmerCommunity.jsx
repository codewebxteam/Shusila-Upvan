import React, { useState, useEffect } from "react";
import { 
  Users, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  TrendingUp,
  Star,
  Award,
  Shield,
  Share2,
  Heart,
  Filter,
  Search,
  Plus,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Video,
  FileText,
  Image as ImageIcon,
  ThumbsUp,
  MessageSquare,
  Eye,
  Crop,
  Truck,
  DollarSign,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserPlus,
  Users as UsersIcon,
  BarChart,
  Leaf,
  Droplets,
  Cloud,
  Sun,
  Wind
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

// --- BACKEND API CONFIG ---
const API_ENDPOINTS = {
  GET_FARMERS: "https://your-backend-api.com/api/farmers",
  GET_POSTS: "https://your-backend-api.com/api/community/posts",
  CREATE_POST: "https://your-backend-api.com/api/community/posts/create",
  SEND_MESSAGE: "https://your-backend-api.com/api/messages/send",
  CREATE_EVENT: "https://your-backend-api.com/api/events/create",
  JOIN_COMMUNITY: "https://your-backend-api.com/api/community/join",
  GET_MARKET_PRICES: "https://your-backend-api.com/api/market/prices",
  GET_WEATHER: "https://your-backend-api.com/api/weather",
};

// --- BACKEND SERVICE ---
class FarmerService {
  static async fetchFarmers() {
    try {
      const response = await fetch(API_ENDPOINTS.GET_FARMERS);
      if (!response.ok) throw new Error("Failed to fetch farmers");
      return await response.json();
    } catch (error) {
      console.warn("Using fallback data:", error.message);
      return initialFarmersData;
    }
  }

  static async fetchCommunityPosts() {
    try {
      const response = await fetch(API_ENDPOINTS.GET_POSTS);
      if (!response.ok) throw new Error("Failed to fetch posts");
      return await response.json();
    } catch (error) {
      console.warn("Using fallback posts data");
      return initialCommunityPosts;
    }
  }

  static async sendMessage(toFarmerId, message) {
    try {
      const response = await fetch(API_ENDPOINTS.SEND_MESSAGE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toFarmerId, message }),
      });
      return await response.json();
    } catch (error) {
      console.error("Message send failed:", error);
      return { success: false, message: "Message failed" };
    }
  }

  static async createPost(postData) {
    try {
      const response = await fetch(API_ENDPOINTS.CREATE_POST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      return await response.json();
    } catch (error) {
      console.error("Post creation failed:", error);
      return { success: false, message: "Post failed" };
    }
  }

  static async joinCommunity(farmerId) {
    try {
      const response = await fetch(API_ENDPOINTS.JOIN_COMMUNITY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ farmerId }),
      });
      return await response.json();
    } catch (error) {
      console.error("Join failed:", error);
      return { success: false, message: "Join failed" };
    }
  }
}

// --- INITIAL DATA (Fallback) ---
const initialFarmersData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Punjab",
    farmType: "Dairy & Mushroom",
    experience: "15 years",
    crops: ["Wheat", "Mushroom", "Dairy"],
    rating: 4.8,
    online: true,
    distance: "25 km",
    joined: "2020",
    achievements: ["Top Producer 2023", "Organic Certified"],
    specialties: ["Mushroom Cultivation", "Dairy Management"],
    contact: {
      phone: "+91-9876543210",
      email: "rajesh@farm.com",
      whatsapp: true
    }
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Uttarakhand",
    farmType: "Mushroom Farming",
    experience: "8 years",
    crops: ["Oyster Mushroom", "Shiitake", "Milky"],
    rating: 4.9,
    online: true,
    distance: "40 km",
    joined: "2021",
    achievements: ["Innovation Award 2022"],
    specialties: ["Organic Farming", "Value Addition"],
    contact: {
      phone: "+91-9876543211",
      email: "priya@mushroomfarm.com",
      whatsapp: true
    }
  },
  {
    id: 3,
    name: "Vikram Singh",
    location: "Haryana",
    farmType: "Integrated Farming",
    experience: "20 years",
    crops: ["Rice", "Vegetables", "Mushroom"],
    rating: 4.7,
    online: false,
    distance: "60 km",
    joined: "2018",
    achievements: ["Best Integrated Farm 2021"],
    specialties: ["Crop Rotation", "Sustainable Practices"],
    contact: {
      phone: "+91-9876543212",
      email: "vikram@farm.com",
      whatsapp: true
    }
  },
  {
    id: 4,
    name: "Anjali Patel",
    location: "Gujarat",
    farmType: "Commercial Mushroom",
    experience: "12 years",
    crops: ["Button", "Oyster", "Portobello"],
    rating: 4.6,
    online: true,
    distance: "120 km",
    joined: "2019",
    achievements: ["Export Quality Certified"],
    specialties: ["Commercial Production", "Export"],
    contact: {
      phone: "+91-9876543213",
      email: "anjali@exportfarm.com",
      whatsapp: true
    }
  },
  {
    id: 5,
    name: "Sanjay Verma",
    location: "Madhya Pradesh",
    farmType: "Organic Farming",
    experience: "18 years",
    crops: ["Soybean", "Mushroom", "Pulses"],
    rating: 4.5,
    online: false,
    distance: "80 km",
    joined: "2017",
    achievements: ["Organic Certification"],
    specialties: ["Soil Health", "Natural Pesticides"],
    contact: {
      phone: "+91-9876543214",
      email: "sanjay@organicfarm.com",
      whatsapp: false
    }
  },
  {
    id: 6,
    name: "Meena Devi",
    location: "Rajasthan",
    farmType: "Women-led Farm",
    experience: "10 years",
    crops: ["Millet", "Mushroom", "Herbs"],
    rating: 4.9,
    online: true,
    distance: "95 km",
    joined: "2022",
    achievements: ["Women Entrepreneur Award"],
    specialties: ["Drought-resistant Crops", "Women Empowerment"],
    contact: {
      phone: "+91-9876543215",
      email: "meena@womenfarm.com",
      whatsapp: true
    }
  }
];

const initialCommunityPosts = [
  {
    id: 1,
    farmerId: 2,
    farmerName: "Priya Sharma",
    farmerImage: null,
    timestamp: "2 hours ago",
    content: "Just harvested a fresh batch of Oyster mushrooms! The monsoon weather has been perfect this year. Anyone else experiencing good yields?",
    likes: 24,
    comments: 8,
    shares: 3,
    type: "update",
    tags: ["Harvest", "Oyster Mushroom", "Monsoon"],
    media: []
  },
  {
    id: 2,
    farmerId: 1,
    farmerName: "Rajesh Kumar",
    farmerImage: null,
    timestamp: "5 hours ago",
    content: "Looking for advice: My button mushrooms are developing brown spots. Has anyone faced this issue?",
    likes: 15,
    comments: 12,
    shares: 2,
    type: "question",
    tags: ["Help", "Button Mushroom", "Disease"],
    media: []
  },
  {
    id: 3,
    farmerId: 4,
    farmerName: "Anjali Patel",
    farmerImage: null,
    timestamp: "1 day ago",
    content: "Successfully exported 500kg of Portobello mushrooms to Dubai! Great milestone for our farm.",
    likes: 45,
    comments: 15,
    shares: 8,
    type: "achievement",
    tags: ["Export", "Portobello", "Success"],
    media: []
  },
  {
    id: 4,
    farmerId: 6,
    farmerName: "Meena Devi",
    farmerImage: null,
    timestamp: "2 days ago",
    content: "Hosting a women farmers meetup this weekend. Topics: Mushroom cultivation basics and marketing. DM if interested!",
    likes: 32,
    comments: 18,
    shares: 6,
    type: "event",
    tags: ["Workshop", "Women Farmers", "Meetup"],
    media: []
  }
];

// --- WEATHER WIDGET ---
const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temperature: 28,
    condition: "Sunny",
    humidity: 65,
    rainfall: "Low",
    forecast: [
      { day: "Today", high: 28, low: 22, condition: "sunny" },
      { day: "Tomorrow", high: 27, low: 23, condition: "partly-cloudy" },
      { day: "Wed", high: 26, low: 22, condition: "rainy" },
    ]
  });

  const getWeatherIcon = (condition) => {
    switch(condition) {
      case 'sunny': return <Sun className="text-yellow-500" />;
      case 'rainy': return <Cloud className="text-blue-500" />;
      case 'partly-cloudy': return <Wind className="text-gray-500" />;
      default: return <Sun className="text-yellow-500" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Farm Weather</h3>
        <div className="flex items-center gap-2">
          <Globe size={20} className="text-blue-600" />
          <span className="text-sm text-gray-600">Punjab Region</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{weather.temperature}°C</div>
          <div className="text-sm text-gray-600">Current Temp</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">{weather.condition}</div>
          <div className="text-sm text-gray-600">Condition</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">{weather.humidity}%</div>
          <div className="text-sm text-gray-600">Humidity</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">{weather.rainfall}</div>
          <div className="text-sm text-gray-600">Rainfall Risk</div>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h4 className="font-bold text-gray-900 mb-3">3-Day Forecast</h4>
        <div className="grid grid-cols-3 gap-2">
          {weather.forecast.map((day, idx) => (
            <div key={idx} className="text-center p-2 bg-white rounded-lg">
              <div className="text-sm font-semibold">{day.day}</div>
              <div className="my-2">{getWeatherIcon(day.condition)}</div>
              <div className="text-xs">
                <div className="text-gray-900 font-bold">{day.high}°</div>
                <div className="text-gray-600">{day.low}°</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MARKET PRICES WIDGET ---
const MarketPricesWidget = () => {
  const [prices, setPrices] = useState([
    { crop: "Button Mushroom", price: "₹120/kg", change: "+5%" },
    { crop: "Oyster Mushroom", price: "₹180/kg", change: "+8%" },
    { crop: "Shiitake", price: "₹350/kg", change: "+12%" },
    { crop: "Milky Mushroom", price: "₹90/kg", change: "-2%" },
    { crop: "Portobello", price: "₹280/kg", change: "+15%" },
  ]);

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Today's Market Prices</h3>
        <div className="flex items-center gap-2">
          <TrendingUp size={20} className="text-green-600" />
          <span className="text-sm text-gray-600">Live Updates</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {prices.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-lg hover:bg-green-50">
            <div>
              <div className="font-semibold text-gray-900">{item.crop}</div>
              <div className="text-sm text-gray-600">Wholesale Price</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">{item.price}</div>
              <div className={`text-sm font-semibold ${
                item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last updated: 10:30 AM</span>
          <button className="text-green-600 font-semibold hover:text-green-700">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

// --- FARMER CARD COMPONENT ---
const FarmerCard = ({ farmer, onConnect, index }) => {
  const [showContact, setShowContact] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setSending(true);
    const result = await FarmerService.sendMessage(farmer.id, message);
    
    if (result.success) {
      toast.success("Message sent successfully!");
      setMessage("");
      setShowContact(false);
    } else {
      toast.error(result.message || "Failed to send message");
    }
    setSending(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-200"
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{farmer.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-gray-600">{farmer.location}</span>
              <span className="text-xs text-gray-500">• {farmer.distance} away</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="font-bold">{farmer.rating}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2 h-2 rounded-full ${farmer.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-600">
            {farmer.online ? 'Online Now' : 'Last seen 2h ago'}
          </span>
        </div>

        {/* Farm Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <Crop size={18} className="text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Farm Type</p>
              <p className="font-semibold">{farmer.farmType}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award size={18} className="text-yellow-600" />
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-semibold">{farmer.experience}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Community Since</p>
              <p className="font-semibold">{farmer.joined}</p>
            </div>
          </div>
        </div>

        {/* Crops Tags */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Main Crops</p>
          <div className="flex flex-wrap gap-2">
            {farmer.crops.map((crop, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {crop}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        {farmer.achievements.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Achievements</p>
            <div className="flex flex-wrap gap-2">
              {farmer.achievements.map((achievement, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-1"
                >
                  <Award size={12} /> {achievement}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <AnimatePresence>
          {showContact ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4 border-t">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Send Message</h4>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows={3}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleSendMessage}
                    disabled={sending}
                    className="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Send"}
                  </button>
                  <button
                    onClick={() => setShowContact(false)}
                    className="border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  or connect via:
                </div>
                
                <div className="flex gap-3 justify-center">
                  {farmer.contact.whatsapp && (
                    <button className="p-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200">
                      <MessageCircle size={20} />
                    </button>
                  )}
                  <button className="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200">
                    <Phone size={20} />
                  </button>
                  <button className="p-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200">
                    <Mail size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setShowContact(true)}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} /> Connect
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <UserPlus size={20} className="text-gray-600" />
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- COMMUNITY POST COMPONENT ---
const CommunityPost = ({ post, onLike, onComment, index }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    onLike(post.id, !liked);
  };

  const getPostIcon = (type) => {
    switch(type) {
      case 'question': return <AlertCircle className="text-blue-500" />;
      case 'achievement': return <Award className="text-yellow-500" />;
      case 'event': return <Calendar className="text-green-500" />;
      default: return <Users className="text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-green-200"
    >
      {/* Post Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
          {post.farmerName.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-gray-900">{post.farmerName}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {getPostIcon(post.type)}
                <span>{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</span>
                <span>•</span>
                <span>{post.timestamp}</span>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bookmark size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-6">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
        
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 ${liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
          >
            <ThumbsUp size={18} className={liked ? 'fill-current' : ''} />
            <span>{post.likes + (liked ? 1 : 0)}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <MessageSquare size={18} />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
            <Share2 size={18} />
            <span>{post.shares}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Eye size={16} />
          <span>{Math.floor(Math.random() * 100) + 50} views</span>
        </div>
      </div>

      {/* Comment Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t pt-4">
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              {/* Sample Comments */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Ramesh Patel</div>
                    <p className="text-gray-700">Great harvest! What substrate are you using?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Sita Devi</div>
                    <p className="text-gray-700">Congratulations on the export success! 👏</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- CREATE POST MODAL ---
const CreatePostModal = ({ isOpen, onClose }) => {
  const [postContent, setPostContent] = useState("");
  const [postType, setPostType] = useState("update");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    if (!postContent.trim()) {
      toast.error("Please write something to post");
      return;
    }

    setUploading(true);
    const postData = {
      content: postContent,
      type: postType,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      media: []
    };

    const result = await FarmerService.createPost(postData);
    
    if (result.success) {
      toast.success("Posted successfully!");
      setPostContent("");
      setTags("");
      onClose();
    } else {
      toast.error(result.message || "Failed to post");
    }
    setUploading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">Create Post</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <XCircle size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Post Type</label>
            <div className="flex flex-wrap gap-2">
              {['update', 'question', 'achievement', 'event'].map(type => (
                <button
                  key={type}
                  onClick={() => setPostType(type)}
                  className={`px-4 py-2 rounded-full capitalize ${
                    postType === type
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">What's on your mind?</label>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share updates, ask questions, or celebrate achievements..."
              rows={6}
              className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., harvest, oyster mushroom, monsoon"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <ImageIcon size={20} /> Photo
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Video size={20} /> Video
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <FileText size={20} /> Document
            </button>
          </div>
        </div>
        
        <div className="p-6 border-t flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {uploading ? "Posting..." : "Post to Community"}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN FARMER COMMUNITY PAGE ---
const FarmerCommunity = () => {
  const [farmers, setFarmers] = useState(initialFarmersData);
  const [posts, setPosts] = useState(initialCommunityPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedFarmType, setSelectedFarmType] = useState("all");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [communityStats, setCommunityStats] = useState({
    totalFarmers: 1560,
    onlineNow: 234,
    postsToday: 42,
    newConnections: 18
  });

  // Fetch data from backend
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [farmersData, postsData] = await Promise.all([
        FarmerService.fetchFarmers(),
        FarmerService.fetchCommunityPosts()
      ]);
      setFarmers(farmersData);
      setPosts(postsData);
      setLoading(false);
    };
    loadData();
  }, []);

  // Filter farmers
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = searchQuery === "" || 
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.crops.some(crop => crop.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = selectedLocation === "all" || 
      farmer.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    const matchesFarmType = selectedFarmType === "all" || 
      farmer.farmType.toLowerCase().includes(selectedFarmType.toLowerCase());
    
    return matchesSearch && matchesLocation && matchesFarmType;
  });

  const handleLikePost = (postId, liked) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: liked ? post.likes + 1 : post.likes - 1 }
        : post
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbe9]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfbe9] min-h-screen font-sans text-gray-900">
      <Toaster position="top-center" />
      <CreatePostModal isOpen={showCreatePost} onClose={() => setShowCreatePost(false)} />

      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Farmer Community Hub</h1>
              <p className="text-xl text-green-200 mb-8">
                Connect, Learn, and Grow Together with Fellow Farmers
              </p>
              
              {/* Community Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{communityStats.totalFarmers}+</div>
                  <div className="text-green-300">Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{communityStats.onlineNow}</div>
                  <div className="text-green-300">Online Now</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{communityStats.postsToday}</div>
                  <div className="text-green-300">Posts Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">{communityStats.newConnections}</div>
                  <div className="text-green-300">New Connections</div>
                </div>
              </div>
              
              <button
                onClick={() => setShowCreatePost(true)}
                className="bg-white text-green-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-3"
              >
                <Plus size={24} /> Create Post
              </button>
            </div>
            
            <div className="lg:w-1/3">
              <WeatherWidget />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Filters and Widgets */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
              <div className="mb-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search farmers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                    <div className="flex flex-wrap gap-2">
                      {["all", "Punjab", "Uttarakhand", "Haryana", "Gujarat", "Rajasthan"].map(location => (
                        <button
                          key={location}
                          onClick={() => setSelectedLocation(location)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedLocation === location
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {location === "all" ? "All" : location}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Farm Type</label>
                    <div className="flex flex-wrap gap-2">
                      {["all", "Dairy", "Mushroom", "Integrated", "Organic"].map(type => (
                        <button
                          key={type}
                          onClick={() => setSelectedFarmType(type)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedFarmType === type
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {type === "all" ? "All" : type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
                <Filter size={20} /> Apply Filters
              </button>
            </div>
            
            {/* Market Prices Widget */}
            <MarketPricesWidget />
            
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                  <Video size={20} /> Join Live Session
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                  <FileText size={20} /> View Resources
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
                  <Calendar size={20} /> Upcoming Events
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100">
                  <DollarSign size={20} /> Market Analysis
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Farmers Grid */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Connect with Farmers ({filteredFarmers.length})
              </h2>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            {filteredFarmers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl">
                <Users size={64} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No farmers found</h3>
                <p className="text-gray-600">Try adjusting your filters or search</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFarmers.map((farmer, index) => (
                  <FarmerCard
                    key={farmer.id}
                    farmer={farmer}
                    onConnect={(id) => console.log("Connect to:", id)}
                    index={index}
                  />
                ))}
              </div>
            )}
            
            {/* Community Posts */}
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Community Updates</h2>
                <button className="text-green-600 font-semibold hover:text-green-700">
                  View All Posts →
                </button>
              </div>
              
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <CommunityPost
                    key={post.id}
                    post={post}
                    onLike={handleLikePost}
                    onComment={() => {}}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Join Community CTA */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-green-200 mb-8">
              Connect with thousands of farmers, share knowledge, and grow together.
            </p>
            <button
              onClick={async () => {
                const result = await FarmerService.joinCommunity();
                if (result.success) {
                  toast.success("Welcome to the community!");
                }
              }}
              className="bg-white text-green-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-3"
            >
              <UserPlus size={24} /> Join Free
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerCommunity;