import React, { useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, PlayCircle, Plus, Sparkles, Globe } from 'lucide-react';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const foundationEvents = [
    {
      title: "The Sustainability Summit 2026",
      date: "12",
      month: "APR",
      location: "Main Farm Headquarters",
      spots: "Limited Access",
      type: "Foundation Flagship",
      theme: "from-slate-800 to-slate-950",
      accent: "text-amber-500"
    },
    {
      title: "Future Farmers Meetup",
      date: "18",
      month: "MAY",
      location: "Khalilabad Hub",
      spots: "40 Slots Open",
      type: "Community Growth",
      theme: "from-green-700 to-green-900",
      accent: "text-green-400"
    }
  ];

  return (
    <section className="w-full bg-white py-20 lg:py-32 overflow-hidden relative border-t border-slate-50">
      <div className="container mx-auto px-6">
        
        {/* Foundation Header */}
        <div className="max-w-4xl mb-16 lg:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Globe size={16} className="text-slate-900" />
            </div>
            <span className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase">Foundation Ecosystem</span>
          </div>
          <h3 className="text-5xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-8">
            Beyond the <br />
            <span className="text-slate-400 italic">Product.</span>
          </h3>
          <p className="text-sm lg:text-base text-slate-500 font-medium max-w-xl leading-relaxed">
            Foundation sirf products nahi bechta, hum ek community banate hain. Hamare events ka maksad hai logon ko prakriti aur shuddhata ke kareeb lana.
          </p>

          {/* Minimalist Switcher */}
          <div className="mt-12 inline-flex p-1 bg-slate-50 border border-slate-100 rounded-2xl">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'upcoming' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400'}`}
            >
              Upcoming Chapters
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'past' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400'}`}
            >
              The Legacy
            </button>
          </div>
        </div>

        {activeTab === 'upcoming' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {foundationEvents.map((event, i) => (
              <div key={i} className="group relative bg-white border border-slate-100 rounded-[3rem] p-10 lg:p-14 transition-all duration-500 hover:border-slate-300 hover:shadow-2xl">
                <div className="flex flex-col h-full gap-12">
                  <div className="flex justify-between items-start">
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${event.theme} flex flex-col items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform`}>
                      <span className="text-3xl font-black">{event.date}</span>
                      <span className="text-[10px] font-bold tracking-widest">{event.month}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${event.accent} mb-2 block`}>{event.type}</span>
                      <p className="text-xs font-bold text-slate-400 flex items-center justify-end gap-1">
                        <MapPin size={12}/> {event.location}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                      {event.title}
                    </h4>
                    <p className="text-slate-500 text-xs font-medium mb-8 max-w-xs">
                      Join the core team to understand our vision for 2026 and how we are scaling purity.
                    </p>
                    <button className="w-full lg:w-fit px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-green-600 transition-colors active:scale-95">
                      Register Interest <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent opacity-60 group-hover:opacity-100 transition-all z-10"></div>
                <div className="absolute bottom-8 left-8 right-8 z-20 translate-y-4 group-hover:translate-y-0 transition-all opacity-0 group-hover:opacity-100">
                   <p className="text-[9px] font-black text-green-400 uppercase tracking-widest mb-2">Success Story</p>
                   <h5 className="text-white font-black text-xl leading-tight">Foundation Day 2025</h5>
                   <PlayCircle className="text-white/50 mt-4 group-hover:text-white transition-colors" size={32} strokeWidth={1}/>
                </div>
                <div className="w-full h-full bg-slate-200 group-hover:scale-110 transition-transform duration-700"></div>
              </div>
            ))}
          </div>
        )}

        {/* Foundation CTA */}
        <div className="mt-20 p-10 lg:p-16 rounded-[4rem] bg-[#0F172A] relative overflow-hidden group">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <h4 className="text-3xl lg:text-5xl font-black text-white tracking-tighter mb-4 italic">
                Shape the <span className="text-green-500">Future.</span>
              </h4>
              <p className="text-slate-400 text-sm font-medium max-w-md">
                Kya aap hamare farm tours ya sustainability drives ka hissa banna chahte hain? Humse judiye.
              </p>
            </div>
            <button className="px-12 py-6 bg-white text-slate-900 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all shadow-2xl flex items-center gap-4">
              Join Foundation <ArrowRight size={18} />
            </button>
          </div>
          {/* Abstract Grid BG */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

      </div>
    </section>
  );
};

export default Events;