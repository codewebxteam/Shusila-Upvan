//  import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MapPin, Calendar, ArrowRight, X } from "lucide-react";

// // --- IMAGE IMPORTS ---
// import heroImage from "../assets/hero.webp";
// import patnaEventImg from "../assets/mushrooms/Img1.png";
// import delhiEventImg from "../assets/mushrooms/Img2.png";
// import mumbaiEventImg from "../assets/mushrooms/Img3.png";

// // Dummy gallery images
// import img1 from "../assets/mushrooms/Img1.png";
// import img2 from "../assets/mushrooms/Img2.png";
// import img3 from "../assets/mushrooms/Img3.png";
// import img4 from "../assets/mushrooms/Img4.png";
// import img5 from "../assets/mushrooms/Img5.png";
// import img6 from "../assets/mushrooms/Img6.png";

// // --- MOCK DATA FOR EVENTS ---
// const eventsData = [
//   {
//     id: 1,
//     status: "upcoming",
//     name: "Patna Mushroom Fair 2025",
//     location: "Gyan Bhawan, Patna, Bihar",
//     date: "October 25-26, 2025",
//     description:
//       "Join us for the largest mushroom fair in Bihar! Discover rare species, attend cultivation seminars by leading experts, and taste gourmet mushroom dishes from local chefs. A perfect weekend for fungi enthusiasts and families alike.",
//     image: patnaEventImg,
//     featured: true,
//     gallery: [img1, img2, img3, img4, img5, img6],
//   },
//   {
//     id: 2,
//     status: "upcoming",
//     name: "Monsoon Mushroom Foraging Trip",
//     location: "Lonavala, Maharashtra",
//     date: "November 15, 2025",
//     description:
//       "Embark on a guided foraging adventure in the lush hills of Lonavala. Learn to identify wild, edible mushrooms with our expert mycologists. Limited spots available.",
//     image: null,
//     gallery: [],
//   },
//   {
//     id: 3,
//     status: "past",
//     name: "Gourmet Mushroom Festival",
//     location: "Jio World Centre, Mumbai",
//     date: "August 2025",
//     description:
//       "Our Mumbai festival was a massive success, celebrating the culinary versatility of mushrooms with live cooking demos and tasting stalls from top city chefs. It was a feast for the senses!",
//     image: mumbaiEventImg,
//     gallery: [img1, img2, img3, img4, img5, img6],
//   },
//   {
//     id: 4,
//     status: "past",
//     name: "Mushroom Cultivation Workshop",
//     location: "India Habitat Centre, New Delhi",
//     date: "June 2025",
//     description:
//       "We hosted a sold-out, hands-on workshop in Delhi where attendees learned the A-Z of setting up their own home mushroom farms, from substrate preparation to harvesting.",
//     image: delhiEventImg,
//     gallery: [img4, img5, img6, img1, img2, img3],
//   },
// ];

// // --- HERO SECTION ---
// const HeroSection = () => (
//   <motion.div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
//     <motion.img
//       src={heroImage}
//       alt="Mushroom Events Banner"
//       className="absolute inset-0 w-full h-full object-cover blur-sm"
//       initial={{ scale: 1.1, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ duration: 1.2 }}
//     />
//     <div className="absolute inset-0 bg-black/50"></div>
//     <div className="relative z-10 text-center px-4">
//       <motion.h1
//         className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, delay: 0.5 }}
//       >
//         MushroomMart Events
//       </motion.h1>
//       <motion.p
//         className="text-lg md:text-xl text-green-400 mt-2 drop-shadow"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, delay: 0.7 }}
//       >
//         Join our fungi community and celebrate the magic of mushrooms.
//       </motion.p>
//     </div>
//   </motion.div>
// );

// // --- EVENT MODAL ---
// const EventModal = ({ event, onClose }) => {
//   if (!event) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//       >
//         <motion.div
//           className="bg-[#fdfbe9] rounded-2xl border border-green-500/30 w-full max-w-5xl h-full max-h-[90vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden"
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 200, damping: 25 }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="h-full overflow-y-auto p-4 md:p-6 bg-white rounded-l-2xl">
//             <div className="grid grid-cols-1 gap-4">
//               {event.gallery.map((imgSrc, index) => (
//                 <motion.img
//                   key={index}
//                   src={imgSrc}
//                   alt={`${event.name} gallery ${index + 1}`}
//                   className="w-full h-auto object-cover rounded-lg"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="relative flex flex-col p-8 bg-slate-900/80 rounded-r-2xl text-white">
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
//             >
//               <X size={28} />
//             </button>
//             <h2 className="text-4xl font-extrabold mb-4">{event.name}</h2>
//             <div className="flex items-center gap-4 text-green-400 mb-2">
//               <Calendar size={20} />
//               <span>{event.date}</span>
//             </div>
//             <div className="flex items-center gap-4 text-green-400 mb-6">
//               <MapPin size={20} />
//               <span>{event.location}</span>
//             </div>
//             <div className="border-t border-green-500/20 pt-6">
//               <p className="text-gray-100 leading-relaxed">{event.description}</p>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // --- EVENTS PAGE ---
// export default function EventsPage() {
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const upcomingEvents = eventsData.filter((e) => e.status === "upcoming");
//   const pastEvents = eventsData.filter((e) => e.status === "past");
//   const featuredEvent = upcomingEvents.find((e) => e.featured);
//   const otherUpcomingEvents = upcomingEvents.filter((e) => !e.featured);

//   return (
//     <div className="bg-[#fdfbe9] min-h-screen font-sans text-gray-900">
//       <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
//       <HeroSection />

//       <main className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-24">
//         {/* Upcoming Events */}
//         <motion.section
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.2 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h2 className="text-3xl font-bold text-green-900 mb-8 border-l-4 border-green-500 pl-4">
//             Upcoming Events
//           </h2>
//           {featuredEvent && (
//             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 rounded-2xl overflow-hidden border border-green-500/20 shadow-lg mb-12 bg-white">
//               <div className="lg:col-span-3">
//                 <img
//                   src={featuredEvent.image}
//                   alt={featuredEvent.name}
//                   className="w-full h-full object-cover min-h-[300px]"
//                 />
//               </div>
//               <div className="lg:col-span-2 p-8 flex flex-col justify-center">
//                 <h3 className="text-3xl font-bold text-gray-900 mb-4">
//                   {featuredEvent.name}
//                 </h3>
//                 <div className="flex items-center gap-4 text-green-700 mb-2">
//                   <Calendar size={20} />
//                   <span>{featuredEvent.date}</span>
//                 </div>
//                 <div className="flex items-center gap-4 text-green-700 mb-4">
//                   <MapPin size={20} />
//                   <span>{featuredEvent.location}</span>
//                 </div>
//                 <p className="text-gray-700 leading-relaxed mb-6">
//                   {featuredEvent.description}
//                 </p>
//                 <button className="flex items-center justify-center gap-2 w-full md:w-auto bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 self-start">
//                   Register Now <ArrowRight size={20} />
//                 </button>
//               </div>
//             </div>
//           )}
//           {otherUpcomingEvents.map((event) => (
//             <div
//               key={event.id}
//               className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl mb-4 border border-green-500/20 shadow-sm"
//             >
//               <div>
//                 <h4 className="text-xl font-bold text-gray-900">{event.name}</h4>
//                 <div className="flex items-center gap-4 text-green-700 mt-1 text-sm">
//                   <Calendar size={16} />
//                   <span>{event.date}</span>
//                   <MapPin size={16} />
//                   <span>{event.location}</span>
//                 </div>
//               </div>
//               <button
//                 className="mt-4 md:mt-0 text-green-900 font-semibold hover:text-green-600 transition-colors flex items-center gap-2"
//                 onClick={() => setSelectedEvent(event)}
//               >
//                 View Details <ArrowRight size={16} />
//               </button>
//             </div>
//           ))}
//         </motion.section>

//         {/* Past Events Gallery */}
//         <motion.section
//           className="mt-24"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.2 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h2 className="text-3xl font-bold text-green-900 mb-8 border-l-4 border-green-500 pl-4">
//             Past Event Gallery
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {pastEvents.map((event) => (
//               <div
//                 key={event.id}
//                 className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg"
//                 onClick={() => setSelectedEvent(event)}
//               >
//                 <img
//                   src={event.image}
//                   alt={event.name}
//                   className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
//                 <div className="absolute bottom-0 left-0 p-6">
//                   <h3 className="text-2xl font-bold text-white">{event.name}</h3>
//                   <p className="text-green-400 flex items-center gap-2 mt-1">
//                     <MapPin size={16} /> {event.location}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </motion.section>
//       </main>
//     </div>
//   );
// }


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
import heroImage from "../assets/hero.webp";
import patnaEventImg from "../assets/mushrooms/Img1.png";
import delhiEventImg from "../assets/mushrooms/Img2.png";
import mumbaiEventImg from "../assets/mushrooms/Img3.png";
import bengaluruEventImg from "../assets/mushrooms/Img4.png";
import kolkataEventImg from "../assets/mushrooms/Img5.png";
import chennaiEventImg from "../assets/mushrooms/Img6.png";

// Dummy gallery images
import img1 from "../assets/mushrooms/Img1.png";
import img2 from "../assets/mushrooms/Img2.png";
import img3 from "../assets/mushrooms/Img3.png";
import img4 from "../assets/mushrooms/Img4.png";
import img5 from "../assets/mushrooms/Img5.png";
import img6 from "../assets/mushrooms/Img6.png";

// --- BACKEND API CONFIG ---
const API_ENDPOINTS = {
  GET_EVENTS: "https://your-backend-api.com/api/events",
  REGISTER_EVENT: "https://your-backend-api.com/api/events/register",
  GET_EVENT_DETAILS: "https://your-backend-api.com/api/events/",
  UPLOAD_PHOTO: "https://your-backend-api.com/api/events/upload-photo",
  GET_GALLERY: "https://your-backend-api.com/api/gallery",
  CONTACT_ORGANIZER: "https://your-backend-api.com/api/contact-organizer",
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

// --- INITIAL DATA (Fallback) ---
const initialEventsData = [
  {
    id: 1,
    slug: "patna-mushroom-fair-2025",
    status: "upcoming",
    name: "Patna Mushroom Fair 2025",
    location: "Gyan Bhawan, Patna, Bihar",
    date: "October 25-26, 2025",
    time: "10:00 AM - 8:00 PM",
    description: "Join us for the largest mushroom fair in Bihar! Discover rare species, attend cultivation seminars by leading experts, and taste gourmet mushroom dishes from local chefs.",
    longDescription: "The Patna Mushroom Fair is back bigger and better! This year we feature over 50 exhibitors showcasing exotic mushroom varieties, live cooking demonstrations by celebrity chefs, cultivation workshops for beginners and experts, and a special kids zone with fun fungal activities.",
    image: patnaEventImg,
    featured: true,
    category: "fair",
    price: "Free",
    capacity: 500,
    registered: 342,
    rating: 4.8,
    speakers: ["Dr. Rajesh Verma", "Chef Priya Sharma", "Prof. Arun Kumar"],
    gallery: [img1, img2, img3, img4, img5, img6],
    highlights: [
      "Live cooking demos",
      "Mushroom cultivation workshops",
      "Rare species exhibition",
      "Kids activity zone",
      "Farmer meetup"
    ],
    contact: {
      phone: "+91-9876543210",
      email: "patnafair@mushroommart.com",
      organizer: "MushroomMart Events Team"
    }
  },
  {
    id: 2,
    slug: "monsoon-foraging-trip",
    status: "upcoming",
    name: "Monsoon Mushroom Foraging Trip",
    location: "Lonavala, Maharashtra",
    date: "November 15, 2025",
    time: "7:00 AM - 4:00 PM",
    description: "Embark on a guided foraging adventure in the lush hills of Lonavala. Learn to identify wild, edible mushrooms with our expert mycologists.",
    longDescription: "Experience the thrill of mushroom foraging in the beautiful monsoon forests of Lonavala. Our expert guides will teach you identification techniques, sustainable harvesting practices, and traditional uses of wild mushrooms. Includes lunch and transportation from Pune.",
    image: img2,
    featured: false,
    category: "outing",
    price: "₹2,499",
    capacity: 25,
    registered: 18,
    rating: 4.9,
    gallery: [img2, img3, img4],
    highlights: [
      "Expert guided tour",
      "Identification training",
      "Sustainable harvesting",
      "Lunch included",
      "Transport from Pune"
    ]
  },
  {
    id: 3,
    slug: "gourmet-festival-mumbai",
    status: "past",
    name: "Gourmet Mushroom Festival",
    location: "Jio World Centre, Mumbai",
    date: "August 15-16, 2025",
    time: "11:00 AM - 9:00 PM",
    description: "Our Mumbai festival was a massive success, celebrating the culinary versatility of mushrooms with live cooking demos and tasting stalls.",
    longDescription: "The Gourmet Mushroom Festival brought together food enthusiasts, chefs, and mushroom lovers for a weekend of culinary exploration. Featuring cooking competitions, tasting sessions, and expert talks on mushroom gastronomy.",
    image: mumbaiEventImg,
    featured: false,
    category: "festival",
    price: "₹499",
    capacity: 1000,
    registered: 856,
    rating: 4.7,
    gallery: [img1, img2, img3, img4, img5, img6],
    highlights: [
      "Cooking competitions",
      "Tasting sessions",
      "Chef demonstrations",
      "Wine pairing",
      "Live music"
    ]
  },
  {
    id: 4,
    slug: "delhi-cultivation-workshop",
    status: "past",
    name: "Mushroom Cultivation Workshop",
    location: "India Habitat Centre, New Delhi",
    date: "June 20-21, 2025",
    time: "9:00 AM - 5:00 PM",
    description: "Hands-on workshop where attendees learned the A-Z of setting up their own home mushroom farms.",
    longDescription: "A comprehensive 2-day workshop covering everything from substrate preparation to harvesting techniques. Participants received starter kits and lifetime access to our cultivation support group.",
    image: delhiEventImg,
    featured: false,
    category: "workshop",
    price: "₹3,999",
    capacity: 50,
    registered: 50,
    rating: 4.9,
    gallery: [img4, img5, img6, img1, img2, img3],
    highlights: [
      "Practical training",
      "Starter kit included",
      "Expert guidance",
      "Networking",
      "Ongoing support"
    ]
  },
  {
    id: 5,
    slug: "bengaluru-food-fest",
    status: "upcoming",
    name: "Bengaluru Mushroom Food Festival",
    location: "UB City, Bengaluru",
    date: "December 5-7, 2025",
    time: "12:00 PM - 10:00 PM",
    description: "A culinary extravaganza featuring mushroom dishes from around the world.",
    image: bengaluruEventImg,
    category: "festival",
    price: "₹299",
    capacity: 800,
    registered: 213,
    rating: 4.5,
    gallery: [img3, img4, img5]
  },
  {
    id: 6,
    slug: "kolkata-farmer-meet",
    status: "upcoming",
    name: "Kolkata Mushroom Farmers Meet",
    location: "Science City, Kolkata",
    date: "November 30, 2025",
    time: "9:00 AM - 6:00 PM",
    description: "Annual gathering of mushroom farmers and industry experts.",
    image: kolkataEventImg,
    category: "conference",
    price: "Free",
    capacity: 300,
    registered: 187,
    rating: 4.6,
    gallery: [img5, img6, img1]
  }
];

// --- HERO SECTION with Countdown ---
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
        src={heroImage}
        alt="Mushroom Events Banner"
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
          Mushroom Community Events
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-green-300 font-medium mb-8 drop-shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Join, Learn, and Celebrate with Fungi Enthusiasts
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

// --- EVENT FILTER BAR ---
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

// --- EVENT STATS CARD ---
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

// --- ENHANCED EVENT MODAL ---
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
        text: `Check out this event: ${event.name}`,
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
                      <p className="text-gray-600">{event.contact?.email || "events@mushroommart.com"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-green-600" />
                    <div>
                      <p className="font-bold">Organizer</p>
                      <p className="text-gray-600">{event.contact?.organizer || "MushroomMart Events Team"}</p>
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

// --- EVENT CARD COMPONENT ---
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

// --- MAIN EVENTS PAGE ---
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
            Want to Organize an Event?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Partner with us to host mushroom-related events, workshops, or festivals.
            Reach thousands of fungi enthusiasts.
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