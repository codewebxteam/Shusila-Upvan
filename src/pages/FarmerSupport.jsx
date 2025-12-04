

import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "framer-motion";
import { 
  ArrowRight, 
  Leaf, 
  Handshake, 
  Sprout, 
  Phone, 
  Mail, 
  Shield,
  Award,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  FileText,
  Download,
  Video,
  Calendar,
  MapPin,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Quote,
  ThumbsUp,
  Zap,
  Truck,
  DollarSign,
  BookOpen,
  Headphones,
  Target,
  BarChart,
  Heart
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

// --- IMAGE IMPORTS ---
import heroImage from "../assets/hero.webp";
import img1 from "../assets/mushrooms/Img1.png";
import img2 from "../assets/mushrooms/Img2.png";
import img3 from "../assets/mushrooms/Img3.png";
import img4 from "../assets/mushrooms/Img4.png";
import img5 from "../assets/mushrooms/Img5.png";
import img6 from "../assets/mushrooms/Img6.png";

// --- SUCCESS STORIES DATA ---
const successStories = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Punjab",
    story: "With MushroomMart's guidance, my farm's production increased by 300% in just 6 months!",
    before: "2kg/month",
    after: "8kg/month",
    duration: "6 months",
    image: img1
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Uttarakhand",
    story: "The market access provided helped me earn ₹50,000 monthly from my small farm.",
    before: "₹15,000/month",
    after: "₹50,000/month",
    duration: "4 months",
    image: img2
  },
  {
    id: 3,
    name: "Vikram Singh",
    location: "Haryana",
    story: "Expert cultivation training transformed my struggling farm into a profitable business.",
    before: "30% success rate",
    after: "90% success rate",
    duration: "8 months",
    image: img3
  }
];

// --- SUPPORT PROGRAMS DATA ---
const supportPrograms = [
  {
    id: 1,
    title: "Starter Farmer Program",
    icon: <Sprout size={28} />,
    description: "Complete setup support for new mushroom farmers",
    duration: "3 months",
    support: ["Free training", "Equipment subsidy", "Market linkage"],
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 2,
    title: "Growth Accelerator",
    icon: <TrendingUp size={28} />,
    description: "Scale your existing farm with advanced techniques",
    duration: "6 months",
    support: ["Advanced training", "Quality certification", "Export guidance"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Premium Partnership",
    icon: <Award size={28} />,
    description: "Exclusive benefits for high-volume producers",
    duration: "1 year",
    support: ["Direct contracts", "Premium pricing", "Tech support"],
    color: "from-purple-500 to-pink-500"
  }
];

// --- TESTIMONIALS DATA ---
const testimonials = [
  {
    id: 1,
    name: "Anjali Patel",
    location: "Gujarat",
    quote: "MushroomMart's support changed my life. From struggling to now exporting to Dubai!",
    rating: 5,
    date: "2 months ago"
  },
  {
    id: 2,
    name: "Sanjay Verma",
    location: "Madhya Pradesh",
    quote: "The cultivation guidance is exceptional. My yield quality improved dramatically.",
    rating: 5,
    date: "3 weeks ago"
  },
  {
    id: 3,
    name: "Meena Devi",
    location: "Rajasthan",
    quote: "As a woman farmer, the community support and fair pricing have been life-changing.",
    rating: 5,
    date: "1 week ago"
  }
];

// --- TRUST METRICS COMPONENT ---
const TrustMetrics = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
    {[
      { icon: <Users size={32} />, value: "500+", label: "Farmers Supported" },
      { icon: <TrendingUp size={32} />, value: "₹2Cr+", label: "Income Generated" },
      { icon: <CheckCircle size={32} />, value: "95%", label: "Success Rate" },
      { icon: <Shield size={32} />, value: "24/7", label: "Support Available" }
    ].map((metric, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
        viewport={{ once: true }}
        className="bg-white p-6 rounded-xl text-center shadow-lg border border-green-200"
      >
        <div className="text-green-600 mb-3 flex justify-center">{metric.icon}</div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
        <div className="text-gray-600">{metric.label}</div>
      </motion.div>
    ))}
  </div>
);

// --- ENHANCED HERO SECTION ---
const HeroSection = () => (
  <motion.div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
    <motion.img
      src={heroImage}
      alt="Farmers and Mushrooms Banner"
      className="absolute inset-0 w-full h-full object-cover"
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
    <div className="relative z-10 text-center px-4 max-w-4xl">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl mb-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Empowering Mushroom Farmers
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-green-300 font-medium mb-8 drop-shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Grow with confidence. Sell with pride. Succeed together.
      </motion.p>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
          <Calendar size={20} /> Book Free Consultation
        </button>
        <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
          <Video size={20} /> Watch Success Stories
        </button>
      </motion.div>
    </div>
  </motion.div>
);

// --- SUCCESS STORIES CAROUSEL ---
const SuccessStoriesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === successStories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? successStories.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {successStories.map((story) => (
            <div key={story.id} className="min-w-full">
              <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {story.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{story.name}</h3>
                        <p className="text-green-300 flex items-center gap-2">
                          <MapPin size={16} /> {story.location}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-lg mb-6 italic">"{story.story}"</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 p-4 rounded-xl">
                        <div className="text-sm text-green-300">Before</div>
                        <div className="text-xl font-bold">{story.before}</div>
                      </div>
                      <div className="bg-green-500/20 p-4 rounded-xl">
                        <div className="text-sm text-green-300">After</div>
                        <div className="text-xl font-bold">{story.after}</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-2">
                      <Clock size={18} className="text-green-300" />
                      <span className="text-green-300">Transformation in {story.duration}</span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <div className="absolute -top-3 -right-3 bg-yellow-500 text-white px-4 py-2 rounded-full font-bold">
                      Success Story
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-green-500 hover:text-white transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-green-500 hover:text-white transition-colors"
      >
        <ChevronRight size={24} />
      </button>
      
      <div className="flex justify-center gap-2 mt-4">
        {successStories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === idx ? 'bg-green-600 w-8' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// --- SUPPORT PROGRAM CARDS ---
const SupportPrograms = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
    {supportPrograms.map((program) => (
      <motion.div
        key={program.id}
        whileHover={{ y: -10 }}
        className="bg-white rounded-2xl overflow-hidden shadow-xl border border-green-200"
      >
        <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
        <div className="p-8">
          <div className={`w-14 h-14 bg-gradient-to-r ${program.color} rounded-xl flex items-center justify-center mb-6`}>
            <div className="text-white">{program.icon}</div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
          <p className="text-gray-600 mb-6">{program.description}</p>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-gray-500" />
              <span className="font-semibold">{program.duration} program</span>
            </div>
            
            <div className="space-y-3">
              {program.support.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
            Apply Now
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

// --- TESTIMONIALS SECTION ---
const TestimonialsSection = () => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
      What Our Farmers Say
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-white p-6 rounded-2xl shadow-lg border border-green-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
              <p className="text-gray-600 text-sm">{testimonial.location}</p>
            </div>
          </div>
          
          <Quote className="text-green-200/50 float-left mr-2" size={24} />
          <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
          
          <div className="flex justify-between items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-500">{testimonial.date}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- BENEFITS GRID ---
const BenefitsGrid = () => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
      Your Benefits with MushroomMart
    </h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          icon: <DollarSign size={32} />,
          title: "Fair Pricing",
          description: "Guaranteed minimum prices for your produce"
        },
        {
          icon: <Truck size={32} />,
          title: "Logistics Support",
          description: "Free pickup and delivery to markets"
        },
        {
          icon: <BookOpen size={32} />,
          title: "Free Training",
          description: "Regular workshops and expert guidance"
        },
        {
          icon: <Headphones size={32} />,
          title: "24/7 Support",
          description: "Always available for your queries"
        },
        {
          icon: <Target size={32} />,
          title: "Quality Standards",
          description: "Help you achieve premium quality"
        },
        {
          icon: <BarChart size={32} />,
          title: "Market Insights",
          description: "Real-time price and demand data"
        },
        {
          icon: <Shield size={32} />,
          title: "Risk Protection",
          description: "Insurance and risk management support"
        },
        {
          icon: <Users size={32} />,
          title: "Community",
          description: "Network of 500+ successful farmers"
        }
      ].map((benefit, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-green-200 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-white">{benefit.icon}</div>
          </div>
          <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
          <p className="text-gray-600 text-sm">{benefit.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

// --- ENHANCED CONTACT FORM ---
const EnhancedContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    farmSize: "",
    experience: "",
    interest: "",
    message: ""
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Form submitted successfully! We'll contact you within 24 hours.");
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      farmSize: "",
      experience: "",
      interest: "",
      message: ""
    });
    setSubmitting(false);
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Grow With Us?</h2>
          <p className="text-gray-700 mb-8 text-lg">
            Join thousands of successful farmers who trust MushroomMart for their farming journey.
            Get personalized support from day one.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="text-green-600" size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Call Us Anytime</p>
                <p className="text-gray-600">+91-98765 43210</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageCircle className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900">WhatsApp Support</p>
                <p className="text-gray-600">Available 24/7</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Email</p>
                <p className="text-gray-600">support@mushroommart.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              name="farmSize"
              value={formData.farmSize}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Farm Size</option>
              <option value="small">Small (0-500 sq ft)</option>
              <option value="medium">Medium (500-2000 sq ft)</option>
              <option value="large">Large (2000+ sq ft)</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Farming Experience</option>
              <option value="beginner">Beginner (0-1 year)</option>
              <option value="intermediate">Intermediate (1-3 years)</option>
              <option value="experienced">Experienced (3+ years)</option>
            </select>
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Primary Interest</option>
              <option value="cultivation">Cultivation Training</option>
              <option value="market">Market Access</option>
              <option value="collaboration">Business Collaboration</option>
              <option value="all">Complete Support</option>
            </select>
          </div>
          
          <textarea
            name="message"
            placeholder="Tell us about your farm and goals..."
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? "Submitting..." : "Start Your Journey"}
            <ArrowRight size={20} />
          </button>
          
          <p className="text-sm text-gray-600 text-center">
            By submitting, you agree to our terms. We respect your privacy.
          </p>
        </form>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function FarmerSupportPage() {
  const dummyGalleryImages = [img1, img2, img3, img4, img5, img6];

  return (
    <div className="bg-[#fdfbe9] min-h-screen font-sans text-gray-900">
      <Toaster position="top-center" />
      <HeroSection />

      <main className="w-full max-w-7xl mx-auto px-4 py-16">
        {/* Trust Metrics */}
        <TrustMetrics />

        {/* Success Stories Carousel */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Real Farmer Success Stories
          </h2>
          <SuccessStoriesCarousel />
        </motion.section>

        {/* Support Programs */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Support Programs
          </h2>
          <SupportPrograms />
        </motion.section>

        {/* Benefits Grid */}
        <BenefitsGrid />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Community Gallery */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Farming Community
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyGalleryImages.map((imgSrc, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden aspect-video shadow-xl"
              >
                <img
                  src={imgSrc}
                  alt={`Mushroom farm community ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <p className="font-bold">Community Member</p>
                    <p className="text-sm">Successfully growing since 2023</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Contact Form */}
        <EnhancedContactForm />

        {/* Trust Badges */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Trusted & Recognized
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <Shield size={48} className="text-green-600 mb-2" />
              <p className="font-semibold">ISO Certified</p>
            </div>
            <div className="flex flex-col items-center">
              <Award size={48} className="text-yellow-600 mb-2" />
              <p className="font-semibold">Govt. Recognized</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart size={48} className="text-red-500 mb-2" />
              <p className="font-semibold">Farmer First</p>
            </div>
            <div className="flex flex-col items-center">
              <ThumbsUp size={48} className="text-blue-600 mb-2" />
              <p className="font-semibold">100% Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Download Resources */}
        <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Free Resources for Farmers</h3>
          <p className="text-green-200 mb-8 max-w-2xl mx-auto">
            Download our comprehensive guides on mushroom cultivation, market insights, and success tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Download size={20} /> Cultivation Guide (PDF)
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <FileText size={20} /> Market Analysis Report
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Video size={20} /> Training Videos
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}