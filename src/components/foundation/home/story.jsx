 import React from 'react';
import { Leaf, ShieldCheck, BadgePercent, Tractor } from 'lucide-react';
import mushroomImg from '../../../assets/foundation/mushroom.webp';

const Story = () => {
  const features = [
    { 
      icon: <ShieldCheck size={22} />, 
      title: "100% Shuddh", 
      desc: "zero milawat", 
      theme: "bg-orange-50 border-orange-200 text-orange-700 shadow-orange-100" 
    },
    { 
      icon: <Tractor size={22} />, 
      title: "Self Grown", 
      desc: "apne farms", 
      theme: "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-emerald-100" 
    },
    { 
      icon: <BadgePercent size={22} />, 
      title: "Sahi Daam", 
      desc: "direct price", 
      theme: "bg-blue-50 border-blue-200 text-blue-700 shadow-blue-100" 
    },
    { 
      icon: <Leaf size={22} />, 
      title: "Health First", 
      desc: "taza aur fit", 
      theme: "bg-rose-50 border-rose-200 text-rose-700 shadow-rose-100" 
    },
  ];

  return (
    <section className="relative w-full bg-white py-10 lg:py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* 1. modern panoramic image frame (cropped effect) */}
        <div className="relative w-full h-[220px] lg:h-[380px] rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl mb-10 group">
          <img 
            src={mushroomImg} 
            alt="The Foundation Farm" 
            className="w-full h-full object-cover object-[center_35%] transition-transform duration-[2s] group-hover:scale-110"
          />
          {/* subtle dark overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
          
          <div className="absolute bottom-6 left-8 lg:bottom-10 lg:left-12 text-white">
            <h2 className="text-[9px] font-black tracking-[0.5em] uppercase text-green-400 mb-2">Our Roots</h2>
            <h3 className="text-3xl lg:text-5xl font-black tracking-tighter leading-none">
              Purely Grown. <br /> <span className="text-white/60">Truly Real.</span>
            </h3>
          </div>
        </div>

        {/* 2. story text & multi-color feature grid */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* left: narrative content */}
          <div className="w-full lg:w-[35%]">
            <p className="text-2xl lg:text-4xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-4">
              Hum khud kisaan hain, <br />
              <span className="text-slate-400">isliye shuddh hain.</span>
            </p>
            <p className="text-xs lg:text-sm text-slate-500 font-medium leading-relaxed max-w-sm">
              Mushroom se lekar Dairy tak, sab kuch hamare apne farms mein tayyar hota hai taaki purity aur sahi daam dono mil sakein.
            </p>
          </div>

          {/* right: multi-color cards with borders */}
          <div className="w-full lg:w-[65%] grid grid-cols-2 gap-3 lg:gap-4">
            {features.map((item, index) => (
              <div 
                key={index} 
                className={`flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 p-4 lg:p-6 rounded-[2rem] border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${item.theme}`}
              >
                {/* icon container */}
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  {item.icon}
                </div>
                
                {/* text content */}
                <div className="text-center sm:text-left">
                  <h4 className="text-sm lg:text-base font-black tracking-tight leading-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest opacity-80 leading-none">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Story;