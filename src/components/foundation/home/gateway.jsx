import react from 'react';
// paths according to your structure
import mushroomimg from '../../../assets/foundation/mushroom.webp';
import dairyimg from '../../../assets/foundation/dairy.webp';

const gateway = () => {
  return (
    <section className="relative w-full bg-white py-4 lg:py-8 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* visual gateway: high-visibility interactive panels */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
          
          {/* mushroom venture panel */}
          <div className="group relative flex-1 h-[220px] lg:h-[400px] rounded-[2.5rem] overflow-hidden bg-white border-2 border-slate-100 hover:border-orange-200 shadow-sm hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500">
            <a href="/mushroom" className="flex h-full w-full items-center justify-between px-6 lg:px-12">
              
              {/* text section */}
              <div className="relative z-20 flex flex-col items-start">
                <span className="text-[10px] font-black tracking-[0.3em] text-orange-600 uppercase mb-2">
                  fresh harvest
                </span>
                <h3 className="text-4xl lg:text-6xl font-black text-slate-900 leading-none tracking-tighter mb-8">
                  Mush<br/>room.
                </h3>
                
                {/* explicit button with border ring */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-full text-[10px] font-extrabold uppercase tracking-[0.15em] group-hover:bg-orange-600 group-hover:ring-4 group-hover:ring-orange-100 transition-all duration-300 shadow-xl">
                  explore farm
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* floating visual with border and shadow */}
              <div className="relative w-36 h-36 lg:w-64 lg:h-64 rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700">
                <img 
                  src={mushroomimg} 
                  alt="mushroom" 
                  className="w-full h-full object-cover rounded-[2.2rem] border-4 border-white shadow-2xl grayscale-[5%] group-hover:grayscale-0"
                />
              </div>

              {/* background decorative text */}
              <div className="absolute right-6 bottom-0 select-none pointer-events-none opacity-[0.04]">
                <span className="text-[10rem] lg:text-[14rem] font-black leading-none text-slate-900">01</span>
              </div>
            </a>
          </div>

          {/* dairy venture panel */}
          <div className="group relative flex-1 h-[220px] lg:h-[400px] rounded-[2.5rem] overflow-hidden bg-white border-2 border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500">
            <a href="/dairy" className="flex h-full w-full items-center justify-between px-6 lg:px-12">
              
              {/* text section */}
              <div className="relative z-20 flex flex-col items-start">
                <span className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase mb-2">
                  pure organic
                </span>
                <h3 className="text-4xl lg:text-6xl font-black text-slate-900 leading-none tracking-tighter mb-8">
                  Dairy<br/>Farm.
                </h3>
                
                {/* explicit button with border ring */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-full text-[10px] font-extrabold uppercase tracking-[0.15em] group-hover:bg-blue-600 group-hover:ring-4 group-hover:ring-blue-100 transition-all duration-300 shadow-xl">
                  visit store
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* floating visual with border and shadow */}
              <div className="relative w-36 h-36 lg:w-64 lg:h-64 -rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700">
                <img 
                  src={dairyimg} 
                  alt="dairy" 
                  className="w-full h-full object-cover rounded-[2.2rem] border-4 border-white shadow-2xl grayscale-[5%] group-hover:grayscale-0"
                />
              </div>

              {/* background decorative text */}
              <div className="absolute right-6 bottom-0 select-none pointer-events-none opacity-[0.04]">
                <span className="text-[10rem] lg:text-[14rem] font-black leading-none text-slate-900">02</span>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default gateway;