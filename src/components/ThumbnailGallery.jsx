import React from 'react';
import { motion } from 'framer-motion';

export default function ThumbnailGallery({ activeShoeIndex, setActiveShoeIndex, activeCategoryData }) {
  return (
    <div className="relative z-50 max-w-full">
      <div className="bg-white/30 backdrop-blur-md px-3 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl flex items-center space-x-3 md:space-x-6 shadow-xl border border-white/20 overflow-x-auto scrollbar-none">
        {activeCategoryData && activeCategoryData.map((shoe, index) => {
          const isActive = index === activeShoeIndex;
          return (
            <motion.button
              key={index}
              onClick={() => setActiveShoeIndex(index)}
              whileHover={{ translateY: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white/50 flex items-center justify-center overflow-hidden transition-all duration-300 flex-shrink-0 ${
                isActive ? 'border-[3px] border-nike-red shadow-[0_0_15px_rgba(234,85,59,0.5)]' : 'border border-white/40 opacity-70 hover:opacity-100'
              }`}
            >
              <img 
                src={shoe.Image} 
                alt={shoe.Name} 
                className="w-[120%] h-auto object-contain transform -rotate-12 mix-blend-multiply"
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
