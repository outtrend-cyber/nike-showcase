import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroShoe({ activeShoe }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={activeShoe.Name}
          // The strict bounding box keeping everything centered
          className="absolute w-full max-w-[700px] h-[400px] flex justify-center items-center" 
          initial={{ opacity: 0, scale: 0.3, y: 150, x: 100, rotateZ: -15, rotateY: 45 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0, rotateZ: 0, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.3, y: -150, x: -100, rotateZ: 15, rotateY: -45 }}
          transition={{ 
            type: "spring", 
            stiffness: 150, 
            damping: 12, 
            mass: 1.2,
            // Override the spring for opacity to prevent "ghost" bouncing
            opacity: { type: "tween", duration: 0.3, ease: "easeOut" }
          }}
        >
          {/* Clean image tag with zero programmatic flipping */}
          <img
            src={activeShoe.Image}
            alt={activeShoe.Name}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
