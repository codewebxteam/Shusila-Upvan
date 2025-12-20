import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Leaf, Handshake, Sprout, Phone, Mail, Shield, Award, Users,
  TrendingUp, Clock, CheckCircle, Star, FileText, Download, Video, Calendar,
  MapPin, MessageCircle, ChevronRight, ChevronLeft, Quote, ThumbsUp, Zap,
  Truck, DollarSign, BookOpen, Headphones, Target, BarChart, Heart
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

// --- DAIRY IMAGES ---
import paneer from "../assets/dairy/paneer.jpg";
import cheese from "../assets/dairy/cheese.jpg";
import cowghee from "../assets/dairy/cowghee.jpg";
import PatnaEvent from "../assets/dairy/PatnaEvent.jpg";

// ----------------------------------------------------
//  DATA
// ----------------------------------------------------
const successStories = [
  {
    id: 1,
    name: "Amar Singh",
    location: "Punjab",
    story: "With DairyMart's support my milk yield doubled & I now supply to 3 cities!",
    before: "50 L/day",
    after: "120 L/day",
    duration: "6 months",
    image: paneer
  },
  {
    id: 2,
    name: "Kavita Devi",
    location: "Uttarakhand",
    story: "Value-add training helped me sell paneer & ghee—monthly profit ₹60 000.",
    before: "₹18 000/month",
    after: "₹60 000/month",
    duration: "4 months",
    image: cheese
  },
  {
    id: 3,
    name: "Rohit Patil",
    location: "Maharashtra",
    story: "Chilling & logistics support lets me reach Mumbai markets effortlessly.",
    before: "Local only",
    after: "25 Mumbai outlets",
    duration: "8 months",
    image: cowghee
  }
];

const supportPrograms = [
  {
    id: 1,
    title: "Dairy Starter Program",
    icon: <Sprout size={28} />,
    description: "Complete setup for new dairy farmers & milk cooperatives",
    duration: "3 months",
    support: ["Free training", "Equipment subsidy", "Chilling-hub linkage"],
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 2,
    title: "Value-Add Accelerator",
    icon: <TrendingUp size={28} />,
    description: "Make paneer, ghee, flavoured milk for higher margins",
    duration: "6 months",
    support: ["Product labs", "FSSAI help", "Branding & packaging"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Premium Partnership",
    icon: <Award size={28} />,
    description: "Contracted supply to big dairies & export houses",
    duration: "1 year",
    support: ["Direct contracts", "Premium pricing", "Cold-chain tech"],
    color: "from-purple-500 to-pink-500"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sunita Yadav",
    location: "UP",
    quote: "DairyMart's chilling centre 5 km away changed the game—zero spoilage!",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Manoj Prajapati",
    location: "MP",
    quote: "Training on balanced cattle feed increased fat percentage by 0.6 %—big bonus!",
    rating: 5,
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Jyoti Ben",
    location: "Gujarat",
    quote: "As a woman dairy farmer, micro-loans & weekly pickups give steady income.",
    rating: 5,
    date: "3 days ago"
  }
];

// ----------------------------------------------------
//  UI  (same structure, creamy dairy colours)
// ----------------------------------------------------
const TrustMetrics = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
    {[
      { icon: <Users size={32} />, value: "3 200+", label: "Dairy Farmers" },
      { icon: <TrendingUp size={32} />, value: "₹5Cr+", label: "Milk Payments" },
      { icon: <CheckCircle size={32} />, value: "98%", label: "On-time Payout" },
      { icon: <Shield size={32} />, value: "24/7", label: "Chilling Support" }
    ].map((m, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
        viewport={{ once: true }}
        className="bg-white/90 p-6 rounded-xl text-center shadow-lg border border-emerald-200"
      >
        <div className="text-emerald-600 mb-3 flex justify-center">{m.icon}</div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{m.value}</div>
        <div className="text-gray-600">{m.label}</div>
      </motion.div>
    ))}
  </div>
);

const HeroSection = () => (
  <motion.div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
     <motion.img
          src={PatnaEvent}
          alt="Farmers and Mushrooms Banner"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
    <div className="relative z-10 text-center px-4 max-w-4xl">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl mb-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Empowering Dairy Customers
      </motion.h1>
      {/* same sub-title colour as farmer-support */}
      <motion.p
        className="text-xl md:text-2xl text-green-300 font-medium mb-8 drop-shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Chill, Process & Profit. Sell with pride. Succeed together.
      </motion.p>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        {/* same green CTA button */}
        <button className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
          <Calendar size={20} /> Book Free Dairy Consultation
        </button>
        <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
          <Video size={20} /> Watch Dairy Stories
        </button>
      </motion.div>
    </div>
  </motion.div>
);

const SuccessStoriesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => setCurrentIndex((p) => (p + 1) % successStories.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + successStories.length) % successStories.length);
  useEffect(() => { const i = setInterval(next, 5000); return () => clearInterval(i); }, []);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {successStories.map((s) => (
            <div key={s.id} className="min-w-full">
              {/*  NEW GREEN GRADIENT  */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
                {/*  rest of your JSX stays identical  */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{s.name}</h3>
                        <p className="text-green-100 flex items-center gap-2">
                          <MapPin size={16} /> {s.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg mb-6 italic">"{s.story}"</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 p-4 rounded-xl">
                        <div className="text-sm text-green-100">Before</div>
                        <div className="text-xl font-bold">{s.before}</div>
                      </div>
                      <div className="bg-emerald-400/20 p-4 rounded-xl">
                        <div className="text-sm text-green-100">After</div>
                        <div className="text-xl font-bold">{s.after}</div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-2">
                      <Clock size={18} className="text-green-100" />
                      <span className="text-green-100">Transformation in {s.duration}</span>
                    </div>
                  </div>
                  {/*  IMAGE – now visible  */}
                  <div className="relative">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white px-4 py-2 rounded-full font-bold">
                      Success Story
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={prev} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-green-500 hover:text-white transition-colors">
        <ChevronLeft size={24} />
      </button>
      <button onClick={next} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-green-500 hover:text-white transition-colors">
        <ChevronRight size={24} />
      </button>
      <div className="flex justify-center gap-2 mt-4">
        {successStories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all ${currentIndex === idx ? "bg-green-600 w-8" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

const SupportPrograms = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
    {supportPrograms.map((p) => (
      <motion.div
        key={p.id}
        whileHover={{ y: -10 }}
        className="bg-white/90 rounded-2xl overflow-hidden shadow-xl border border-emerald-200"
      >
        {/* green → emerald gradient header */}
        <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
        <div className="p-8">
          {/* green gradient icon background */}
          <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
            <div className="text-white">{p.icon}</div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{p.title}</h3>
          <p className="text-gray-600 mb-6">{p.description}</p>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-gray-500" />
              <span className="font-semibold">{p.duration} program</span>
            </div>
            <div className="space-y-3">
              {p.support.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {/* emerald check circle */}
                  <CheckCircle size={18} className="text-emerald-500" />
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

const TestimonialsSection = () => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Dairy Customers Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((t) => (
        <div key={t.id} className="bg-white/90 p-6 rounded-2xl shadow-lg border border-green-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">{t.name.charAt(0)}</div>
            <div><h4 className="font-bold text-gray-900">{t.name}</h4><p className="text-gray-600 text-sm">{t.location}</p></div>
          </div>
          <Quote className="text-green-200/50 float-left mr-2" size={24} />
          <p className="text-gray-700 italic mb-6">"{t.quote}"</p>
          <div className="flex justify-between items-center">
            <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} size={16} className="text-green-400 fill-current" />))}</div>
            <span className="text-sm text-gray-500">{t.date}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BenefitsGrid = () => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Benefits with DairyMart</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { icon: <DollarSign size={32} />, title: "Fair Milk Price", description: "Guaranteed MSP + quality bonus" },
        { icon: <Truck size={32} />, title: "Free Pickup", description: "Daily chilled trucks at your farm" },
        { icon: <BookOpen size={32} />, title: "Free Training", description: "Cattle feed, hygiene, finance" },
        { icon: <Headphones size={32} />, title: "24×7 Vet Line", description: "Doctor on call / chat" },
        { icon: <Target size={32} />, title: "Quality Premium", description: "Extra ₹2/litre for high SNF/FAT" },
        { icon: <BarChart size={32} />, title: "Market Intel", description: "Daily milk rate SMS & app" },
        { icon: <Shield size={32} />, title: "Cattle Insurance", description: "Premium support & claim help" },
        { icon: <Users size={32} />, title: "Co-op Network", description: "4 000+ member dairy societies" }
      ].map((b, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="bg-white/90 p-6 rounded-xl shadow-lg border border-green-200 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"><div className="text-white">{b.icon}</div></div>
          <h4 className="font-bold text-gray-900 mb-2">{b.title}</h4>
          <p className="text-gray-600 text-sm">{b.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const EnhancedContactForm = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", cattleCount: "", experience: "", interest: "", message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Form submitted! Dairy expert will call within 24 hrs.");
    setFormData({ name: "", email: "", phone: "", cattleCount: "", experience: "", interest: "", message: "" });
    setSubmitting(false);
  };
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-3xl p-8 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Grow with Dairy?</h2>
          <p className="text-gray-700 mb-8 text-lg">Join thousands of dairy customers who trust DairyMart for fair milk prices & hassle-free pickup.</p>
          <div className="space-y-6">
            <div className="flex items-center gap-4"><div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center"><Phone className="text-yellow-600" size={24} /></div><div><p className="font-bold text-gray-900">Call Us Anytime</p><p className="text-gray-600">+91-8010 010 010</p></div></div>
            <div className="flex items-center gap-4"><div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><MessageCircle className="text-green-600" size={24} /></div><div><p className="font-bold text-gray-900">WhatsApp Support</p><p className="text-gray-600">Available 24/7</p></div></div>
            <div className="flex items-center gap-4"><div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"><Mail className="text-purple-600" size={24} /></div><div><p className="font-bold text-gray-900">Email</p><p className="text-gray-600">support@dairymart.com</p></div></div>
          </div>
        </div>
        {/*  form submit  */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
            <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
            <select name="cattleCount" value={formData.cattleCount} onChange={handleChange} required className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"><option value="">Cattle Count</option><option value="1-5">1-5</option><option value="6-20">6-20</option><option value="21-50">21-50</option><option value="50+">50+</option></select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select name="experience" value={formData.experience} onChange={handleChange} required className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"><option value="">Diary Experience</option><option value="beginner">Beginner (0-1 yr)</option><option value="intermediate">Intermediate (1-3 yrs)</option><option value="experienced">Experienced (3+ yrs)</option></select>
            <select name="interest" value={formData.interest} onChange={handleChange} required className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"><option value="">Primary Interest</option><option value="pickup">Daily Milk Pickup</option><option value="valueadd">Value-Add (paneer/ghee)</option><option value="cattle">Cattle Insurance</option><option value="all">Complete Support</option></select>
          </div>
          <textarea name="message" rows={4} placeholder="Tell us about your dairy setup & goals..." value={formData.message} onChange={handleChange} className="w-full p-3 rounded-lg bg-white border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">{submitting ? "Submitting..." : "Start Dairy Journey"}<ArrowRight size={20} /></button>
          <p className="text-sm text-gray-600 text-center">By submitting, you agree to our terms. We respect your privacy.</p>
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------
//  MAIN EXPORT
// ----------------------------------------------------
export default function DiarySupport() {
  const galleryImages = []; 

  return (
    <div className="min-h-screen bg-[#fffaf0] font-sans text-gray-900">
      <Toaster position="top-center" />
      <HeroSection />
      <main className="w-full max-w-7xl mx-auto px-4 py-16">
        <TrustMetrics />
        <motion.section className="mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Real Dairy Success Stories</h2>
          <SuccessStoriesCarousel />
        </motion.section>
        <motion.section className="mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Dairy Support Programs</h2>
          <SupportPrograms />
        </motion.section>
        <BenefitsGrid />
        <TestimonialsSection />
        <motion.section className="mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Milky Community</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((src, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="relative rounded-2xl overflow-hidden aspect-video shadow-xl">
                <img src={src} alt={`Dairy community ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white"><p className="font-bold">Dairy Cooperative Member</p><p className="text-sm">Supplying since 2022</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <EnhancedContactForm />
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Trusted & Recognized</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center"><Shield size={48} className="text-yellow-600 mb-2" /><p className="font-semibold">ISO 9001</p></div>
            <div className="flex flex-col items-center"><Award size={48} className="text-orange-500 mb-2" /><p className="font-semibold">NDDB Partner</p></div>
            <div className="flex flex-col items-center"><Heart size={48} className="text-red-500 mb-2" /><p className="font-semibold">Diary First</p></div>
            <div className="flex flex-col items-center"><ThumbsUp size={48} className="text-green-600 mb-2" /><p className="font-semibold">100% Payout</p></div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Free Resources for Dairy </h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">Download guides on cattle care, chilling best-practices, paneer & ghee making, market rates.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"><Download size={20} /> Dairy Guide (PDF)</button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"><FileText size={20} /> Rate Chart 2024</button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"><Video size={20} /> Training Videos</button>
          </div>
        </div>
      </main>
    </div>
  );
}