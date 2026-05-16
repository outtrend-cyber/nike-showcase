import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: swoosh draw, 1: slogan, 2: progress, 3: exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => setPhase(3), 3200);
    const t4 = setTimeout(() => onComplete(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  const sloganLetters = "JUST DO IT.".split("");

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Nike Swoosh — Accurate SVG Path */}
          <motion.svg
            viewBox="0 0 69.7 30.4"
            className="w-44 h-auto mb-8"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.path
              d="M2.4 25.1C5.3 21.6 9.5 16.7 14.5 12.5c5.3-4.4 10.8-7.5 14.4-8.8 1.5-.5 2.8-.8 3.7-.8.8 0 1.3.2 1.6.5.3.3.5.8.5 1.5 0 1.5-.8 3.8-2.2 6.5-1.4 2.7-3.3 5.5-5.1 7.7l2.8-1.1c3.2-4.5 5.8-9.2 7-12.6.6-1.7.9-3.1.9-4.2 0-.5-.1-.9-.2-1.2L67.3.1c-1.1 3.3-3.8 8.6-7.7 14.1-3.9 5.5-8.8 11.1-13.8 14.8-.9.7-1.7 1-2.4 1-.5 0-.9-.2-1.2-.5-.3-.3-.4-.8-.4-1.3 0-1.2.6-3 1.7-5.2 1.1-2.2 2.6-4.7 4.3-7 .5-.7 1-1.4 1.6-2.1L44.2 16c-2.2 3-4.1 6.1-5.4 8.8-1.3 2.7-2 4.9-2 6.3 0 .3 0 .5.1.7-4.2 1.3-8 .6-10.6-1.3-2.6-1.8-4-4.6-4-7.3 0-.5 0-1 .1-1.5C16.9 25 10.4 28.3 5.6 29.8c-1.2.4-2.2.6-3.1.6h-.1L2.4 25.1z"
              fill="none"
              stroke="white"
              strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.path
              d="M2.4 25.1C5.3 21.6 9.5 16.7 14.5 12.5c5.3-4.4 10.8-7.5 14.4-8.8 1.5-.5 2.8-.8 3.7-.8.8 0 1.3.2 1.6.5.3.3.5.8.5 1.5 0 1.5-.8 3.8-2.2 6.5-1.4 2.7-3.3 5.5-5.1 7.7l2.8-1.1c3.2-4.5 5.8-9.2 7-12.6.6-1.7.9-3.1.9-4.2 0-.5-.1-.9-.2-1.2L67.3.1c-1.1 3.3-3.8 8.6-7.7 14.1-3.9 5.5-8.8 11.1-13.8 14.8-.9.7-1.7 1-2.4 1-.5 0-.9-.2-1.2-.5-.3-.3-.4-.8-.4-1.3 0-1.2.6-3 1.7-5.2 1.1-2.2 2.6-4.7 4.3-7 .5-.7 1-1.4 1.6-2.1L44.2 16c-2.2 3-4.1 6.1-5.4 8.8-1.3 2.7-2 4.9-2 6.3 0 .3 0 .5.1.7-4.2 1.3-8 .6-10.6-1.3-2.6-1.8-4-4.6-4-7.3 0-.5 0-1 .1-1.5C16.9 25 10.4 28.3 5.6 29.8c-1.2.4-2.2.6-3.1.6h-.1L2.4 25.1z"
              fill="white"
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
            />
          </motion.svg>

          {/* "JUST DO IT." — Staggered Letter-by-Letter Animation */}
          <motion.div
            className="flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
          >
            {sloganLetters.map((letter, i) => (
              <motion.span
                key={i}
                className={`font-anton text-4xl md:text-6xl tracking-[0.15em] uppercase ${
                  letter === ' ' ? 'w-4 md:w-6' : 'text-white'
                }`}
                initial={{ y: 60, opacity: 0, rotateX: -90 }}
                animate={phase >= 1 ? { y: 0, opacity: 1, rotateX: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-10"
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={phase >= 2 ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-nike-red)] to-orange-500 rounded-full"
              initial={{ width: "0%" }}
              animate={phase >= 2 ? { width: "100%" } : {}}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* Bottom Copyright */}
          <motion.div
            className="absolute bottom-8 w-full text-center text-white/15 text-[10px] tracking-[0.5em] uppercase font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            © 2026 NIKE, INC.
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
