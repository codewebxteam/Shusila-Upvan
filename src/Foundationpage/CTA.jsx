import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function CTA() {
  return (
    <>
      {/* ================= FINAL CTA ================= */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600" />
        <div className="relative z-10 text-center max-w-4xl mx-auto text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Transform Your Farm?
          </h2>

          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white text-green-700 font-bold rounded-full shadow-2xl"
            >
              Get Started <ChevronRight className="inline ml-2" />
            </motion.button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default CTA;
