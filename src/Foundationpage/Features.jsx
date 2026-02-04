import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Milk, Sprout, ArrowRight } from "lucide-react";

/* ---------------- COMPONENT ---------------- */

function Features() {
  return (
    <>
      {/* ================= PROGRAMS ================= */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-green-400 font-semibold text-xs uppercase tracking-widest">
              Our Specialties
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Featured Programs
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Dairy Program */}
            <Link to="/dairy">
              <motion.div
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                        <Milk className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Dairy Farming
                        </h3>
                        <p className="text-blue-200 text-xs">
                          12-week program
                        </p>
                      </div>
                    </div>

                    <motion.div
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 45 }}
                    >
                      <ArrowRight className="text-blue-600" size={18} />
                    </motion.div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                      🐄 Cattle Care
                    </span>
                    <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                      🥛 Processing
                    </span>
                    <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                      📊 Business
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Mushroom Program */}
            <Link to="/mushrooms">
              <motion.div
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1576076567699-247103a75b10?w=800)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                        <Sprout className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Mushroom Cultivation
                        </h3>
                        <p className="text-emerald-200 text-xs">
                          8-week program
                        </p>
                      </div>
                    </div>

                    <motion.div
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 45 }}
                    >
                      <ArrowRight
                        className="text-emerald-600"
                        size={18}
                      />
                    </motion.div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                      🍄 Cultivation
                    </span>
                    <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                      🏭 Processing
                    </span>
                    <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                      💰 Marketing
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
