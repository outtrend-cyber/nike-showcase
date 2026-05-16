import { motion } from 'framer-motion-3d';
import { Text } from '@react-three/drei';
// Ensure this path matches your data file location
import { shoesData } from '../data/shoesData'; 

const MotionText = motion(Text);

export default function SceneView({ activeShoeIndex, activeCategory = 'men' }) {
  const currentCategoryData = shoesData[activeCategory];
  
  return (
    <>
      <ambientLight intensity={1} />

      {/* 1. The Deep Background Morphing Plane */}
      <motion.mesh position={[0, 0, -10]}>
        <planeGeometry args={[150, 150]} />
        <motion.meshBasicMaterial 
          animate={{ color: currentCategoryData[activeShoeIndex].Color }} 
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
      </motion.mesh>

      {/* 2. The Sliding Ghost Text */}
      {currentCategoryData.map((shoe, index) => {
        const isActive = index === activeShoeIndex;
        return (
          <MotionText
            key={`text-${index}`}
            text={shoe.GhostText}
            font="https://raw.githubusercontent.com/google/fonts/main/ofl/anton/Anton-Regular.ttf" // Reliable TTF source
            // Dynamic sizing: Ensures long words like "AIR FORCE 1" shrink to fit, and short words like "BLAZER" scale up to maintain impact.
            fontSize={30 / shoe.GhostText.length} 
            letterSpacing={0.02}
            anchorX="center"
            anchorY="middle"
            position={[0, 0, -5]}
            transparent={true}
            color={shoe.TextColor} // Stark Neutral Contrast
            animate={{
              fillOpacity: isActive ? 0.2 : 0, // Bumped to 20% for a slightly stronger, premium contrast
              x: isActive ? 0 : (index < activeShoeIndex ? -5 : 5), // Wider slide
              scale: isActive ? 1 : 0.8
            }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 14, 
              mass: 1,
              fillOpacity: { type: "tween", duration: 0.4, ease: "easeOut" }
            }}
          />
        );
      })}
      
      {/* STRICT ENFORCEMENT: NO SHOE IMAGES ARE RENDERED IN THIS CANVAS */}
    </>
  );
}
