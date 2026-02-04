import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

/* ================= DATA ================= */
const stats = [
  { icon: "👨‍🌾", number: "50K+", label: "Farmers Empowered" },
  { icon: "🥛", number: "1M+", label: "Litres Milk / Day" },
  { icon: "🍄", number: "500+", label: "Mushroom Units" },
  { icon: "🌍", number: "20+", label: "States Covered" },
];

/* ================= COMPONENT ================= */
function Hero() {
  const { scrollY } = useScroll();

  const heroY = useTransform(scrollY, [0, 300], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.85]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-black text-white">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[140px] -top-40 -left-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] bottom-0 right-0"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 text-center max-w-6xl"
      >
        <span className="inline-block mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
          🌱 Transforming Agriculture Since 2020
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Cultivate Your <br />
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Sustainable Future
          </span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          India's most trusted foundation empowering farmers with modern dairy &
          mushroom farming.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/diary">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-white text-black rounded-full font-semibold"
            >
              Start Your Journey{" "}
              <ArrowRight className="inline ml-2" size={18} />
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 border border-white/20 rounded-full flex items-center gap-2"
          >
            <Play size={16} /> Watch Stories
          </motion.button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold">{s.number}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
