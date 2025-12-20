import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  ArrowRight, 
  X, 
  Users,
  Clock,
  Ticket,
  Heart,
  Share2,
  Download,
  Filter,
  Search,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Camera
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

// --- IMAGE IMPORTS ---
import EventHero from "../assets/dairy/EventHero.jpg";
import patnaEvent from "../assets/dairy/PatnaEvent.jpg";
import cheese from "../assets/dairy/cheese.jpg";
import Milkfestival  from "../assets/dairy/MilkFestival.jpeg";
import butter from "../assets/dairy/butter.jpg";
import cowghee from "../assets/dairy/cowghee.jpg";
import curd from "../assets/dairy/curd.jpg"

// Dummy gallery images (dairy-themed)
import img1 from "../assets/dairy/PatnaEvent.jpg";
import img2 from "../assets/dairy/cheese.jpg";
import img3 from "../assets/dairy/MilkFestival.jpeg";
import img4 from "../assets/dairy/butter.jpg";
import img5 from "../assets/dairy//cowghee.jpg"
import img6 from "../assets/dairy/curd.jpg";

// --- BACKEND API CONFIG ---
const API_ENDPOINTS = {
  GET_EVENTS: "https://your-backend-api.com/api/events ",
  REGISTER_EVENT: "https://your-backend-api.com/api/events/register ",
  GET_EVENT_DETAILS: "https://your-backend-api.com/api/events/ ",
  UPLOAD_PHOTO: "https://your-backend-api.com/api/events/upload-photo ",
  GET_GALLERY: "https://your-backend-api.com/api/gallery ",
  CONTACT_ORGANIZER: "https://your-backend-api.com/api/contact-organizer ",
};

// --- BACKEND SERVICE ---
class EventService {
  static async fetchEvents() {
    try {
      const response = await fetch(API_ENDPOINTS.GET_EVENTS);
      if (!response.ok) throw new Error("Failed to fetch events");
      return await response.json();
    } catch (error) {
      console.warn("Using fallback events data:", error.message);
      return initialEventsData;
    }
  }

  static async registerForEvent(eventId, userData) {
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER_EVENT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, userData }),
      });
      return await response.json();
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, message: "Registration failed" };
    }
  }

  static async contactOrganizer(eventId, message) {
    try {
      const response = await fetch(API_ENDPOINTS.CONTACT_ORGANIZER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, message }),
      });
      return await response.json();
    } catch (error) {
      console.error("Contact failed:", error);
      return { success: false, message: "Contact failed" };
    }
  }
}

// --- INITIAL DATA (Updated for Dairy Events) ---
const initialEventsData = [
  {
    id: 1,
    slug: "patna-dairy-expo-2025",
    status: "upcoming",
    name: "Patna Dairy Expo 2025",
    location: "Gyan Bhawan, Patna, Bihar",
    date: "October 25-26, 2025",
    time: "10:00 AM - 8:00 PM",
    description: "Join us for the largest dairy exhibition in Bihar! Discover modern milk processing techniques, attend cheese making workshops, and taste artisan dairy products from local producers.",
    longDescription: "The Patna Dairy Expo is back bigger and better! This year we feature over 50 exhibitors showcasing advanced dairy equipment, live cheese making demonstrations by celebrity chefs, milk quality assessment workshops, and a special kids zone with fun dairy education activities.",
    image: patnaEvent,
    featured: true,
    category: "fair",
    price: "Free",
    capacity: 500,
    registered: 342,
    rating: 4.8,
    speakers: ["Dr. Rajesh Verma", "Chef Priya Sharma", "Prof. Arun Kumar"],
    // gallery: [img1, img2, img3, img4, img5, img6],
    highlights: [
      "Live cheese making demos",
      "Milk quality workshops",
      "Modern dairy equipment showcase",
      "Kids dairy education zone",
      "Farmer meetup"
    ],
    contact: {
      phone: "+91-9876543210",
      email: "patnaexpo@dairymart.com",
      organizer: "DairyMart Events Team"
    }
  },
  {
    id: 2,
    slug: "artisan-cheese-workshop",
    status: "upcoming",
    name: "Artisan Cheese Making Workshop",
    location: "Lonavala, Maharashtra",
    date: "November 15, 2025",
    time: "7:00 AM - 4:00 PM",
    description: "Learn the art of making gourmet cheeses! Hands-on workshop covering cheddar, mozzarella, feta and more with expert cheesemakers.",
    longDescription: "Experience the art and science of cheese making in the beautiful hills of Lonavala. Our expert instructors will teach you traditional techniques, culture selection, aging processes, and flavor development. Includes lunch and all materials.",
    image: cheese,
    featured: false,
    category: "workshop",
    price: "₹2,499",
    capacity: 25,
    registered: 18,
    rating: 4.9,
    // gallery: [img2, img3, img4],
    highlights: [
      "Expert instruction",
      "Hands-on cheese making",
      "Take home your creations",
      "Lunch included",
      "Certificate provided"
    ]
  },
  {
    id: 3,
    slug: "mumbai-milk-festival",
    status: "past",
    name: "Mumbai Milk Festival",
    location: "Jio World Centre, Mumbai",
    date: "August 15-16, 2025",
    time: "11:00 AM - 9:00 PM",
    description: "Celebrating the versatility of milk with live demonstrations, tasting sessions, and educational exhibits about dairy nutrition.",
    longDescription: "The Mumbai Milk Festival brought together food enthusiasts, nutritionists, and dairy lovers for a weekend of milky delights. Featuring milkshake competitions, paneer making sessions, and expert talks on dairy nutrition.",
    image: Milkfestival,
    featured: false,
    category: "festival",
    price: "₹499",
    capacity: 1000,
    registered: 856,
    rating: 4.7,
    // gallery: [img1, img2, img3, img4, img5, img6],
    highlights: [
      "Milkshake competitions",
      "Paneer making sessions",
      "Nutrition seminars",
      "Kids activities",
      "Live music"
    ]
  },
  {
    id: 4,
    slug: "delhi-butter-making-workshop",
    status: "past",
    name: "Traditional Butter Making Workshop",
    location: "India Habitat Centre, New Delhi",
    date: "June 20-21, 2025",
    time: "9:00 AM - 5:00 PM",
    description: "Learn traditional butter making techniques, from cream separation to churning and flavoring artisan butters.",
    longDescription: "A comprehensive 2-day workshop covering everything from cream selection to final butter packaging. Participants learned cultured butter, ghee making, and flavored butter creations with take-home samples.",
    image: butter,
    featured: false,
    category: "workshop",
    price: "₹3,999",
    capacity: 50,
    registered: 50,
    rating: 4.9,
    // gallery: [img4, img5, img6, img1, img2, img3],
    highlights: [
      "Traditional techniques",
      "Take-home samples",
      "Ghee making included",
      "Expert guidance",
      "Recipe booklet"
    ]
  },
  {
    id: 5,
    slug: "bengaluru-yogurt-festival",
    status: "upcoming",
    name: "Bengaluru Yogurt & Probiotics Festival",
    location: "UB City, Bengaluru",
    date: "December 5-7, 2025",
    time: "12:00 PM - 10:00 PM",
    description: "A celebration of yogurt, probiotics, and fermented dairy products from around the world.",
    image: cowghee,
    category: "festival",
    price: "₹299",
    capacity: 800,
    registered: 213,
    rating: 4.5,
    // gallery: [img3, img4, img5]
  },
  {
    id: 6,
    slug: "kolkata-dairy-tech-meet",
    status: "upcoming",
    name: "Kolkata Dairy Technology Summit",
    location: "Science City, Kolkata",
    date: "November 30, 2025",
    time: "9:00 AM - 6:00 PM",
    description: "Annual gathering of dairy technologists and industry experts showcasing latest innovations.",
    image: curd,
    category: "conference",
    price: "Free",
    capacity: 300,
    registered: 187,
    rating: 4.6,
    // gallery: [img5, img6, img1]
  }
];

// --- HERO SECTION with Countdown (Updated for Dairy) ---
const HeroSection = () => {
  const [nextEvent, setNextEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const upcoming = initialEventsData.find(e => e.status === "upcoming" && e.featured);
    setNextEvent(upcoming);
    
    // Countdown timer
    const timer = setInterval(() => {
      if (nextEvent) {
        const eventDate = new Date("2025-10-25").getTime();
        const now = new Date().getTime();
        const difference = eventDate - now;
        
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextEvent]);

  return (
    <motion.div className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      <motion.img
        src={EventHero}
        alt="Dairy Events Banner"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl mb-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Dairy Community Events
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-green-300 font-medium mb-8 drop-shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Join, Learn, and Celebrate with Dairy Enthusiasts
        </motion.p>

        {/* Countdown Timer */}
        {nextEvent && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 inline-block border border-green-500/30"
          >
            <p className="text-green-300 font-bold mb-4">Next Big Event Starts In:</p>
            <div className="flex gap-4 md:gap-8 justify-center">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
                  <div className="text-green-300 text-sm uppercase">{unit}</div>
                </div>
              ))}
            </div>
            <p className="text-white mt-4">{nextEvent.name}</p>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="text-white text-center">
          <div className="text-sm mb-2">Scroll to Explore</div>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- EVENT FILTER BAR (No changes needed) ---
const EventFilterBar = ({ activeFilter, setActiveFilter, searchQuery, setSearchQuery }) => {
  const filters = [
    { id: "all", label: "All Events" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past Events" },
    { id: "workshop", label: "Workshops" },
    { id: "festival", label: "Festivals" },
    { id: "fair", label: "Fairs" }
  ];

  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg py-4 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeFilter === filter.id
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[200px]"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
              <Filter size={20} /> Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- EVENT STATS CARD (No changes needed) ---
const EventStats = ({ event }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
    <div className="bg-green-50 p-4 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <Ticket className="text-green-600" size={20} />
        <span className="text-sm text-gray-600">Price</span>
      </div>
      <div className="text-xl font-bold text-gray-900">{event.price}</div>
    </div>
    
    <div className="bg-blue-50 p-4 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <Users className="text-blue-600" size={20} />
        <span className="text-sm text-gray-600">Registered</span>
      </div>
      <div className="text-xl font-bold text-gray-900">
        {event.registered}/{event.capacity}
      </div>
    </div>
    
    <div className="bg-yellow-50 p-4 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <Star className="text-yellow-600" size={20} />
        <span className="text-sm text-gray-600">Rating</span>
      </div>
      <div className="text-xl font-bold text-gray-900">{event.rating}/5.0</div>
    </div>
    
    <div className="bg-purple-50 p-4 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="text-purple-600" size={20} />
        <span className="text-sm text-gray-600">Duration</span>
      </div>
      <div className="text-xl font-bold text-gray-900">{event.time}</div>
    </div>
  </div>
);

// --- ENHANCED EVENT MODAL (No structural changes, only content updates) ---
const EventModal = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    attendees: 1,
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const result = await EventService.registerForEvent(event.id, registrationData);
    
    if (result.success) {
      toast.success("Registration successful! Check your email for confirmation.");
      onClose();
    } else {
      toast.error(result.message || "Registration failed");
    }
    setLoading(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: `Check out this dairy event: ${event.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!event) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-[#fdfbe9] rounded-3xl border border-green-500/30 w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleShare}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
              >
                <Share2 size={20} className="text-white" />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30">
                <Bookmark size={20} className="text-white" />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{event.name}</h2>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex overflow-x-auto">
              {["details", "gallery", "register", "contact"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium capitalize whitespace-nowrap ${
                    activeTab === tab
                      ? "border-b-2 border-green-600 text-green-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[50vh]">
            {activeTab === "details" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">About This Event</h3>
                  <p className="text-gray-700">{event.longDescription || event.description}</p>
                </div>
                
                <EventStats event={event} />
                
                {event.highlights && (
                  <div>
                    <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <TrendingUp size={20} /> Event Highlights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {event.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {event.speakers && (
                  <div>
                    <h4 className="text-lg font-bold mb-3">Featured Speakers</h4>
                    <div className="space-y-2">
                      {event.speakers.map((speaker, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Users size={16} className="text-green-600" />
                          </div>
                          <span>{speaker}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.gallery?.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-lg"
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute bottom-2 right-2 p-2 bg-black/50 rounded-full">
                      <Camera size={16} className="text-white" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "register" && (
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-bold text-green-800 mb-2">Registration Details</h4>
                  <p className="text-green-700">Price: <span className="font-bold">{event.price}</span></p>
                  <p className="text-green-700">Available Seats: <span className="font-bold">{event.capacity - event.registered}</span></p>
                </div>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border rounded-lg"
                    value={registrationData.name}
                    onChange={e => setRegistrationData({...registrationData, name: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 border rounded-lg"
                    value={registrationData.email}
                    onChange={e => setRegistrationData({...registrationData, email: e.target.value})}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-3 border rounded-lg"
                    value={registrationData.phone}
                    onChange={e => setRegistrationData({...registrationData, phone: e.target.value})}
                  />
                  
                  <div className="flex items-center gap-4">
                    <span>Number of Attendees:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setRegistrationData({...registrationData, attendees: Math.max(1, registrationData.attendees - 1)})}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="font-bold">{registrationData.attendees}</span>
                      <button
                        onClick={() => setRegistrationData({...registrationData, attendees: registrationData.attendees + 1})}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleRegister}
                    disabled={loading || event.registered >= event.capacity}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Register Now"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="text-green-600" />
                    <div>
                      <p className="font-bold">Phone</p>
                      <p className="text-gray-600">{event.contact?.phone || "+91-9876543210"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-green-600" />
                    <div>
                      <p className="font-bold">Email</p>
                      <p className="text-gray-600">{event.contact?.email || "events@dairymart.com"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-green-600" />
                    <div>
                      <p className="font-bold">Organizer</p>
                      <p className="text-gray-600">{event.contact?.organizer || "DairyMart Events Team"}</p>
                    </div>
                  </div>
                </div>
                
                <textarea
                  placeholder="Your message to organizer..."
                  rows={4}
                  className="w-full p-3 border rounded-lg"
                />
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                  Send Message
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- EVENT CARD COMPONENT (No structural changes) ---
const EventCard = ({ event, onClick }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-green-200 hover:shadow-2xl transition-all duration-300"
  >
    <div className="relative">
      <img
        src={event.image}
        alt={event.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-3 right-3">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          event.status === "upcoming" 
            ? "bg-green-500 text-white" 
            : "bg-gray-500 text-white"
        }`}>
          {event.status === "upcoming" ? "Upcoming" : "Past"}
        </span>
      </div>
      {event.featured && (
        <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          Featured
        </div>
      )}
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Ticket size={16} className="text-green-600" />
          <span className="font-bold text-green-700">{event.price}</span>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-6 line-clamp-2">{event.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600">{event.registered} registered</span>
        </div>
        <button
          onClick={() => onClick(event)}
          className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
        >
          View Details <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </motion.div>
);

// --- MAIN EVENTS PAGE (Only updated text content) ---
export default function EventsPage() {
  const [events, setEvents] = useState(initialEventsData);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch events from backend
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const data = await EventService.fetchEvents();
      setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, []);

  // Filter events
  const filteredEvents = React.useMemo(() => {
    let filtered = events;
    
    // Apply status filter
    if (activeFilter === "upcoming") {
      filtered = filtered.filter(e => e.status === "upcoming");
    } else if (activeFilter === "past") {
      filtered = filtered.filter(e => e.status === "past");
    } else if (activeFilter !== "all") {
      filtered = filtered.filter(e => e.category === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [events, activeFilter, searchQuery]);

  const upcomingEvents = events.filter(e => e.status === "upcoming");
  const pastEvents = events.filter(e => e.status === "past");
  const featuredEvent = upcomingEvents.find(e => e.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbe9]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfbe9] min-h-screen font-sans text-gray-900">
      <Toaster position="top-center" />
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <HeroSection />
      
      <EventFilterBar 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Event */}
        {featuredEvent && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Star className="text-yellow-500" /> Featured Event
            </h2>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                    Featured
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {featuredEvent.name}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar size={20} />
                      <span>{featuredEvent.date} • {featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin size={20} />
                      <span>{featuredEvent.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-8 text-lg">{featuredEvent.description}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setSelectedEvent(featuredEvent)}
                      className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Ticket size={20} /> Register Now
                    </button>
                    <button
                      onClick={() => setSelectedEvent(featuredEvent)}
                      className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="relative min-h-[400px]">
                  <img
                    src={featuredEvent.image}
                    alt={featuredEvent.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent" />
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* All Events Grid */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {activeFilter === "all" ? "All Events" : 
               activeFilter === "upcoming" ? "Upcoming Events" :
               activeFilter === "past" ? "Past Events" :
               `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}s`}
            </h2>
            <span className="text-gray-600">
              {filteredEvents.length} events found
            </span>
          </div>
          
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Calendar size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your filters or search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={setSelectedEvent}
                />
              ))}
            </div>
          )}
        </motion.section>

        {/* Upcoming vs Past Stats */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-green-900 to-emerald-900 rounded-3xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{upcomingEvents.length}</div>
              <p className="text-green-300">Upcoming Events</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{pastEvents.length}</div>
              <p className="text-green-300">Past Events</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{events.length}</div>
              <p className="text-green-300">Total Events</p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Want to Organize a Dairy Event?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Partner with us to host dairy-related events, workshops, or festivals.
            Reach thousands of dairy enthusiasts and industry professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors">
              <MessageCircle className="inline mr-2" size={20} />
              Contact Us
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-colors">
              <Mail className="inline mr-2" size={20} />
              Submit Proposal
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  );
} 