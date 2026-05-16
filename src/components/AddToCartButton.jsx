import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function AddToCartButton({ onAdd, activeShoe }) {
  const [clicks, setClicks] = useState([]);

  const handleAddClick = () => {
    if (onAdd) onAdd();
    const id = Date.now();
    const newParticles = Array.from({ length: 8 }).map((_, i) => {
      const isLeft = i % 2 === 0;
      const randomX = (Math.random() * 150 + 50) * (isLeft ? -1 : 1);
      const randomY = -(Math.random() * 150 + 100);
      const rotation = Math.random() * 360 * (isLeft ? -1 : 1);
      return { id: `${id}-${i}`, x: randomX, y: randomY, rotation };
    });
    setClicks([...clicks, { id, particles: newParticles }]);
    setTimeout(() => {
      setClicks((prev) => prev.filter((clickState) => clickState.id !== id));
    }, 1200);
  };

  return (
    <div className="relative flex flex-col items-center justify-center pointer-events-auto gap-2 md:gap-3">
      
      {/* Sale Price Display */}
      {activeShoe && (
        <div className="flex items-center gap-2 md:gap-3">
          {activeShoe.onSale && (
            <>
              <span className="bg-red-600 text-white text-[8px] md:text-[10px] font-bold uppercase tracking-widest px-2 md:px-3 py-0.5 md:py-1 rounded-full animate-pulse">
                30% OFF
              </span>
              <span className="text-white/50 line-through text-sm md:text-lg font-medium">
                {activeShoe.originalPrice}
              </span>
            </>
          )}
          <span className={`font-anton text-xl md:text-2xl ${activeShoe.onSale ? 'text-red-400' : 'text-white'}`}>
            {activeShoe.Price}
          </span>
        </div>
      )}

      {/* Particle System */}
      <AnimatePresence>
        {clicks.map((clickState) =>
          clickState.particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 md:w-3 md:h-3 bg-[var(--color-nike-red)] rounded-full z-20 pointer-events-none"
              initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
              animate={{ 
                x: particle.x, 
                y: [0, particle.y, particle.y + 300],
                rotate: particle.rotation,
                scale: [1, 1.5, 0],
                opacity: [1, 1, 0]
              }}
              transition={{ duration: 1.2, ease: "circOut", times: [0, 0.4, 1] }}
            />
          ))
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92, y: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="relative bg-[var(--color-nike-black)] text-[var(--color-nike-white)] 
                   px-8 py-3 md:px-12 md:py-4 font-anton text-lg md:text-2xl tracking-[0.15em] md:tracking-[0.2em] shadow-[0_0_40px_rgba(234,85,59,0.3)]
                   hover:shadow-[0_0_60px_rgba(234,85,59,0.6)] hover:bg-[var(--color-nike-red)] 
                   transition-all duration-300 z-30"
        onClick={handleAddClick}
      >
        ADD TO CART
      </motion.button>
    </div>
  );
}
