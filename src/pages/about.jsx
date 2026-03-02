import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  ShieldCheck,
  Globe,
  Users,
  ArrowUpRight,
  Instagram,
  Quote,
  Star,
  Zap,
  Leaf
} from 'lucide-react';
import ownerImg from '../assets/owner/swapnil.webp';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <main className="min-h-screen bg-white pt-28 lg:pt-36 pb-20 overflow-hidden relative selection:bg-emerald-100 selection:text-emerald-900">
      {/* Decorative Background Elements */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-emerald-50 rounded-full blur-[100px] -z-10 opacity-40"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative"
      >
        {/* 1. BRAND HEADLINE - Split Styling */}
        <section className="mb-20 max-w-5xl">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 mb-6 shadow-sm">
            <Star size={12} className="fill-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Story</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-[54px] lg:text-[110px] font-black text-slate-900 tracking-tighter leading-[0.85] mb-8">
            Scalable <br />
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent italic">Purity.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-slate-500 text-sm lg:text-xl font-medium max-w-2xl leading-relaxed opacity-90 border-l-4 border-emerald-500 pl-6 lg:pl-8">
            Susheela Upvan Khalilabad ka ek modern agricultural powerhouse hai. Hum purity ko technology ke saath scale kar rahe hain, ek sehatmand kal ke liye.
          </motion.p>
        </section>

        {/* 2. LEADERSHIP: THE OWNER (High Visibility) */}
        <section className="mb-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <motion.div variants={itemVariants} className="w-full lg:w-[450px] shrink-0 relative group">
              <div className="aspect-[4/5] bg-slate-100 rounded-[4rem] overflow-hidden border-8 border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative z-10 transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-1">
                <img
                  src={ownerImg}
                  alt="Swapnil Singh"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-10 left-10">
                  <p className="text-white text-3xl font-black tracking-tighter italic drop-shadow-lg">Swapnil Singh</p>
                  <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] bg-emerald-950/20 backdrop-blur-sm px-2 py-1 rounded inline-block">Founder & CEO</p>
                </div>
              </div>
              {/* Background Accent Decorative */}
              <div className="absolute -top-6 -right-6 w-full h-full bg-emerald-600/5 rounded-[4.5rem] -z-10 rotate-6 blur-2xl group-hover:rotate-12 transition-transform duration-700"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-emerald-500 rounded-2xl -z-10 rotate-12 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Zap className="text-white fill-white" size={32} />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex-1 space-y-8 text-center lg:text-left">
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                  The <span className="text-emerald-100 drop-shadow-[0_0_1px_#10b981]">Foundation</span> Mindset.
                </h2>
                <div className="w-20 h-2 bg-emerald-500 mx-auto lg:mx-0 rounded-full shadow-lg shadow-emerald-500/30"></div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-8 -left-10 text-emerald-100 w-24 h-24 -z-10 rotate-12 opacity-50" />
                <p className="text-slate-600 text-lg lg:text-2xl font-semibold leading-relaxed max-w-2xl italic tracking-tight">
                  "Mera maqsad sirf product bechna nahi, ek aisi legacy banana hai jahan quality aur honesty hamare business ka DNA ho. Susheela Upvan Khalilabad ki mitti se nikla ek global vision hai."
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 shadow-2xl shadow-slate-200 transition-all border border-slate-800"
              >
                Connect With Me <Instagram size={18} />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* 3. INVESTOR BOARD - Premium Cards */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-4 group">
              Board of Investors
              <div className="w-12 h-[2px] bg-emerald-500 rounded-full group-hover:w-20 transition-all duration-500"></div>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Investor 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="flex items-center gap-8 p-8 bg-slate-50 rounded-[3rem] border border-slate-100 group transition-all hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.1)] relative overflow-hidden"
            >
              <div className="w-32 h-32 lg:w-44 lg:h-44 bg-emerald-100 rounded-[2.5rem] overflow-hidden flex-shrink-0 relative border-4 border-white shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/10 font-black italic text-emerald-200 text-4xl">IMG</div>
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 to-transparent group-hover:opacity-0 transition-opacity"></div>
              </div>
              <div className="flex-1">
                <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-2 group-hover:text-emerald-600 transition-colors">INVESTOR 1</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Strategic Partner</p>
                <button className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all shadow-sm">
                  <ArrowUpRight size={20} />
                </button>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-50 rounded-full opacity-50 -z-10"></div>
            </motion.div>

            {/* Investor 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="flex items-center gap-8 p-8 bg-slate-50 rounded-[3rem] border border-slate-100 group transition-all hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.1)] relative overflow-hidden"
            >
              <div className="w-32 h-32 lg:w-44 lg:h-44 bg-emerald-100 rounded-[2.5rem] overflow-hidden flex-shrink-0 relative border-4 border-white shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/10 font-black italic text-emerald-200 text-4xl">IMG</div>
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 to-transparent group-hover:opacity-0 transition-opacity"></div>
              </div>
              <div className="flex-1">
                <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-2 group-hover:text-emerald-600 transition-colors">INVESTOR 2</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Growth Partner</p>
                <button className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all shadow-sm">
                  <ArrowUpRight size={20} />
                </button>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-50 rounded-full opacity-50 -z-10"></div>
            </motion.div>
          </div>
        </section>

        {/* 4. BUSINESS CORE STATS - Premium Dark Design */}
        <motion.section
          variants={itemVariants}
          className="bg-slate-900 pt-16 pb-12 rounded-[5rem] overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 opacity-80"></div>
          <div className="container mx-auto px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
              {[
                { label: "Daily Output", val: "500L+", icon: <Users size={24} /> },
                { label: "Lab Certified", val: "ISO", icon: <ShieldCheck size={24} /> },
                { label: "Presence", val: "UP & BR", icon: <Globe size={24} /> },
                { label: "Facility", val: "Modern", icon: <Building2 size={24} /> }
              ].map((item, i) => (
                <div key={i} className="text-center lg:text-left border-l border-white/5 pl-8 group cursor-default">
                  <div className="text-emerald-500 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">{item.icon}</div>
                  <p className="text-3xl lg:text-4xl font-black text-white tracking-tighter mb-2 italic">{item.val}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">{item.label}</p>
                  <div className="w-0 group-hover:w-full h-[1px] bg-emerald-500 mt-4 transition-all duration-700"></div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center border-t border-white/5 pt-8 flex items-center justify-center gap-2 text-slate-500 text-[10px] uppercase font-bold tracking-[0.5em]">
              <Leaf size={14} className="text-emerald-500" /> Growing for Khalilabad
            </div>
          </div>

          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-600/10 blur-[100px] rounded-full"></div>
        </motion.section>
      </motion.div>
    </main>
  );
};

export default About;
