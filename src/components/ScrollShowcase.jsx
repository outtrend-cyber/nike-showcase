import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AddToCartButton from './AddToCartButton';
import ThumbnailGallery from './ThumbnailGallery';

export default function ScrollShowcase({ activeCategoryData, activeShoe, activeShoeIndex, setActiveShoeIndex, onAddToCart }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth screen transitions across 300vh (Hero -> Phase 1 -> Phase 2)
  const shoeX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "0%", "25%", "25%", "-25%"]);
  const shoeY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "0%", "10%", "10%", "-5%"]);
  const shoeScale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1, 1, 1.1, 1.1, 1.1]);
  const shoeRotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, -10, -10, 15]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-transparent">
      
      {/* CRITICAL STICKY LOCK */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden z-20 pointer-events-none">
        <motion.div 
          style={{ x: shoeX, y: shoeY, scale: shoeScale, rotate: shoeRotate }} 
          className="w-[85%] max-w-[650px] aspect-video flex justify-center items-center"
        >
          <img 
            src={activeShoe.Image} 
            alt={activeShoe.Name} 
            className={`w-full h-full object-contain ${
              activeShoe.hasWhiteBg 
                ? 'mix-blend-multiply' 
                : 'drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]'
            }`} 
          />
        </motion.div>
      </div>

      {/* NORMAL DOCUMENT FLOW CONTENT */}
      <div className="absolute top-0 left-0 w-full h-[300vh] z-30 pointer-events-none">
        
        {/* HERO SECTION (0 - 100vh) */}
        <div className="w-full h-screen relative">
          <div className="absolute bottom-32 md:bottom-40 w-full flex justify-center pointer-events-auto px-4">
             <AddToCartButton onAdd={onAddToCart} activeShoe={activeShoe} />
          </div>
          <div className="absolute bottom-4 md:bottom-8 w-full flex justify-center pointer-events-auto px-4 overflow-x-auto">
             <ThumbnailGallery 
               activeCategoryData={activeCategoryData} 
               activeShoeIndex={activeShoeIndex} 
               setActiveShoeIndex={setActiveShoeIndex} 
             />
          </div>
        </div>

        {/* Phase 1: Left Metrics */}
        <div className="w-full h-screen flex items-center px-6 md:px-12 lg:px-24 pointer-events-none">
          <div className="max-w-xs md:max-w-sm flex flex-col gap-3 md:gap-4 font-sans" style={{ color: activeShoe.TextColor }}>
            <span className="font-bold uppercase tracking-wider opacity-80 text-xs md:text-sm" style={{ color: activeShoe.TextColor }}>{activeShoe.leftTitle}</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-anton uppercase leading-none">{activeShoe.leftHeader}</h2>
            <p className="text-xs md:text-sm leading-relaxed opacity-80 font-medium">{activeShoe.leftDesc}</p>
          </div>
        </div>

        {/* Phase 2: Right Metrics */}
        <div className="w-full h-screen flex items-center justify-end px-6 md:px-12 lg:px-24 pointer-events-none">
          <div className="max-w-xs md:max-w-sm flex flex-col gap-3 md:gap-4 font-sans text-right items-end" style={{ color: activeShoe.TextColor }}>
            <span className="font-bold uppercase tracking-wider opacity-80 text-xs md:text-sm" style={{ color: activeShoe.TextColor }}>{activeShoe.rightTitle}</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-anton uppercase leading-none">{activeShoe.rightHeader}</h2>
            <p className="text-xs md:text-sm leading-relaxed opacity-80 font-medium">{activeShoe.rightDesc}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
