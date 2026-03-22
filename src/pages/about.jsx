import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ShieldCheck, Globe, Users, ArrowUpRight, Instagram, Phone } from 'lucide-react';
import ownerImg from '../assets/owner/swapnil.webp';

const About = () => {
  return (
    <main className="min-h-screen bg-white pt-20 lg:pt-32 pb-20 overflow-hidden relative">
      {/* Background Decorative Glows - Mushroom Style */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/40 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-slate-50 blur-[100px] -z-10 rounded-full" />

      {/* 1. BRAND HEADLINE - Compact & Punchy */}
      <section className="container mx-auto px-6 pt-12 mb-8 lg:mb-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[48px] lg:text-[110px] font-black text-slate-900 tracking-tighter leading-[0.85] mb-6">
            Scalable <br className="lg:hidden" />
            <span className="text-emerald-600 italic">Purity.</span>
          </h1>
          <p className="text-slate-500 text-sm lg:text-xl font-medium max-w-2xl leading-relaxed opacity-80">
            Susheela Upvan Khalilabad ka ek modern agricultural powerhouse hai. <br className="hidden lg:block" />
            Hum purity ko technology ke saath scale kar rahe hain.
          </p>
        </motion.div>
      </section>

      {/* 2. LEADERSHIP: THE OWNER (High Visibility) */}
      <section className="container mx-auto px-6 mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[450px] shrink-0 relative group"
          >
            <div className="aspect-[4/5] bg-slate-100 rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl relative z-10">
              <img
                src={ownerImg}
                alt="Swapnil Singh"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white text-3xl font-black tracking-tighter italic">Swapnil Singh</p>
                <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">Founder & CEO</p>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-emerald-600/5 rounded-[3.5rem] -z-10 rotate-3 transition-transform group-hover:rotate-6 duration-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                The <span className="text-slate-200">Foundation</span> <br /> Mindset.
              </h2>
              <div className="w-20 h-1.5 bg-emerald-600 rounded-full mx-auto lg:mx-0" />
            </div>
            <p className="text-slate-500 text-base lg:text-lg font-medium leading-relaxed max-w-xl">
              "Mera maqsad sirf product bechna nahi, ek aisi legacy banana hai jahan quality aur honesty hamare business ka DNA ho. Susheela Upvan Khalilabad ki mitti se nikla ek global vision hai."
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200">
                Connect <Instagram size={16} />
              </button>
              <a 
                href="tel:+919123456789"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-100"
              >
                Call Now <Phone size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>


      {/* 4. BUSINESS CORE STATS (Horizontal & Compact) */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-slate-900 py-16 rounded-[4rem] mx-4 lg:mx-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[80px] rounded-full" />
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {[
            { label: "Daily Output", val: "500L+", icon: <Users size={20} /> },
            { label: "Lab Certified", val: "ISO", icon: <ShieldCheck size={20} /> },
            { label: "Presence", val: "UP & BR", icon: <Globe size={20} /> },
            { label: "Facility", val: "Modern", icon: <Building2 size={20} /> }
          ].map((item, i) => (
            <div key={i} className="text-center lg:text-left lg:border-l border-white/10 lg:pl-8 group">
              <div className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <p className="text-3xl font-black text-white tracking-tighter mb-1">{item.val}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

    </main>
  );
};

export default About;