import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingParticles = ({ color }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 15,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * -20,
      isColored: Math.random() > 0.5,
      rotationDir: Math.random() > 0.5 ? 1 : -1
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.isColored ? color : '#333333',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            opacity: p.isColored ? 0.8 : 0.3
          }}
          animate={{
            y: [0, -150, 0],
            rotate: [0, 360 * p.rotationDir],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
        />
      ))}
    </div>
  );
};

export default function FooterSection({ activeShoe }) {
  const brandColor = activeShoe?.Color || "#ea580c";

  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between items-center p-4 md:p-8 overflow-hidden font-sans border-t-4 md:border-t-8" style={{ borderColor: brandColor }}>
      
      <FloatingParticles color={brandColor} />

      {/* 1. TOP MINI-BADGE */}
      <div className="mt-8 md:mt-12 z-10">
        <span 
          className="border rounded-full px-3 md:px-4 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-sm bg-black/20"
          style={{ borderColor: brandColor, color: brandColor }}
        >
          Next Level Innovation
        </span>
      </div>

      {/* 2. CORE HEADLINES */}
      <div className="relative flex flex-col items-center justify-center my-auto selection:bg-orange-500 z-10 pointer-events-none px-4">
        <h1 className="text-[14vw] md:text-[12vw] font-anton uppercase text-transparent stroke-text leading-none select-none opacity-40 absolute tracking-tighter whitespace-nowrap">
          JUST DO IT.
        </h1>
        <h1 className="text-[12vw] md:text-[10vw] font-anton uppercase text-white leading-none relative z-10 tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] whitespace-nowrap">
          BREAK LIMITS<span style={{ color: brandColor }}>.</span>
        </h1>
      </div>

      {/* 3. TRUST BADGES */}
      <div className="w-full max-w-6xl border-t border-neutral-800 pt-4 md:pt-6 pb-4 md:pb-8 flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center text-[9px] md:text-xs tracking-widest text-neutral-400 uppercase font-medium z-10">
        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 items-center">
          <span className="flex items-center gap-2"><span style={{ color: brandColor }}>●</span> Nike Authentic Labs</span>
          <span className="text-neutral-700 hidden md:inline">|</span>
          <span className="flex items-center gap-2"><span style={{ color: brandColor }}>●</span> Member Exclusive Shipping</span>
        </div>

        <div className="flex gap-6 items-center text-lg text-white">
          <a href="#" className="transition-colors hover:scale-110" style={{ color: "white" }}>𝕏</a>
          <a href="#" className="transition-colors hover:scale-110" style={{ color: "white" }}>📸</a>
          <a href="#" className="transition-colors hover:scale-110" style={{ color: "white" }}>📺</a>
        </div>

        <div>
          <span className="cursor-pointer hover:text-white transition-colors">Secure Checkout</span>
        </div>
      </div>

      {/* 4. CTA BUTTON */}
      <div className="mb-8 md:mb-12 relative z-20">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: brandColor, color: "#ffffff" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="bg-white text-black font-anton uppercase text-base md:text-xl px-10 md:px-16 py-4 md:py-5 tracking-widest transition-colors duration-200 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          Explore the Lab
        </motion.button>
      </div>

      {/* 5. FOOTER */}
      <div className="w-full text-center text-[8px] md:text-[10px] text-neutral-600 tracking-widest uppercase font-mono mt-2 md:mt-4 z-10 pb-2">
        © 2026 NIKE, INC. ENGINEERED FOR WORLD-CLASS ATHLETES.
      </div>

    </div>
  );
}
