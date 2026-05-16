import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AddToCartButton from './AddToCartButton';
import ThumbnailGallery from './ThumbnailGallery';

export default function ScrollShowcase({ activeCategoryData, activeShoe, activeShoeIndex, setActiveShoeIndex, onAddToCart }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth screen transitions across 300vh (Hero -> Phase 1 -> Phase 2)
  const shoeXDesktop = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "0%", "25%", "25%", "-25%"]);
  const shoeXMobile = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "0%", "0%", "0%", "0%"]);
  
  const shoeYDesktop = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "0%", "10%", "10%", "-5%"]);
  const shoeYMobile = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "0%", "-35%", "-35%", "-35%"]);
  
  const shoeScaleDesktop = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1, 1, 1.1, 1.1, 1.1]);
  const shoeScaleMobile = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1, 1, 0.75, 0.75, 0.75]);
  
  const shoeRotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, -10, -10, 15]);

  const shoeX = isMobile ? shoeXMobile : shoeXDesktop;
  const shoeY = isMobile ? shoeYMobile : shoeYDesktop;
  const shoeScale = isMobile ? shoeScaleMobile : shoeScaleDesktop;

  // INTERACTIVE TEXT OPACITY: Metrics fade in/out based on scroll position
  const phase1Opacity = useTransform(scrollYProgress, [0.15, 0.35, 0.5, 0.7], [0, 1, 1, 0]);
  const phase2Opacity = useTransform(scrollYProgress, [0.65, 0.85, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-transparent">
      
      {/* CRITICAL STICKY LOCK */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden z-20 pointer-events-none">
        <motion.div 
          key={isMobile ? 'mobile' : 'desktop'}
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
        <div className="w-full h-screen flex items-end md:items-center justify-center md:justify-start pb-28 md:pb-0 px-6 md:px-12 lg:px-24 pointer-events-none">
          <motion.div 
            style={{ opacity: phase1Opacity }}
            className="max-w-xs md:max-w-sm flex flex-col gap-2 md:gap-4 font-sans text-center md:text-left items-center md:items-start drop-shadow-md bg-black/20 md:bg-transparent p-6 md:p-0 rounded-[2.5rem] backdrop-blur-[3px] md:backdrop-blur-none border border-white/5 md:border-none pointer-events-auto" 
            style={{ color: activeShoe.TextColor, opacity: phase1Opacity }}
          >
            <span className="font-bold uppercase tracking-[0.2em] opacity-80 text-[10px] md:text-xs" style={{ color: activeShoe.TextColor }}>{activeShoe.leftTitle}</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-anton uppercase leading-none tracking-tight">{activeShoe.leftHeader}</h2>
            <p className="text-[11px] md:text-sm leading-relaxed opacity-90 font-medium max-w-[280px] md:max-w-none">{activeShoe.leftDesc}</p>
          </motion.div>
        </div>

        {/* Phase 2: Right Metrics */}
        <div className="w-full h-screen flex items-end md:items-center justify-center md:justify-end pb-28 md:pb-0 px-6 md:px-12 lg:px-24 pointer-events-none">
          <motion.div 
            style={{ opacity: phase2Opacity }}
            className="max-w-xs md:max-w-sm flex flex-col gap-2 md:gap-4 font-sans text-center md:text-right items-center md:items-end drop-shadow-md bg-black/20 md:bg-transparent p-6 md:p-0 rounded-[2.5rem] backdrop-blur-[3px] md:backdrop-blur-none border border-white/5 md:border-none pointer-events-auto" 
            style={{ color: activeShoe.TextColor, opacity: phase2Opacity }}
          >
            <span className="font-bold uppercase tracking-[0.2em] opacity-80 text-[10px] md:text-xs" style={{ color: activeShoe.TextColor }}>{activeShoe.rightTitle}</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-anton uppercase leading-none tracking-tight">{activeShoe.rightHeader}</h2>
            <p className="text-[11px] md:text-sm leading-relaxed opacity-90 font-medium max-w-[280px] md:max-w-none">{activeShoe.rightDesc}</p>
          </motion.div>
        </div>


      </div>
    </div>
  );
}
