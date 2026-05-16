import { motion } from 'framer-motion-3d';
import { Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { shoesData } from '../data/shoesData'; 

const MotionText = motion(Text);

export default function SceneView({ activeShoeIndex, activeCategory = 'men' }) {
  const currentCategoryData = shoesData[activeCategory];
  const { viewport } = useThree();
  
  // Scale ghost text based on viewport width — much smaller on mobile
  const isMobile = viewport.width < 6;
  const baseScale = isMobile ? (viewport.width / 20) : Math.min(viewport.width / 10, 1);
  
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

      {/* 2. The Sliding Ghost Text — scales with viewport */}
      {currentCategoryData.map((shoe, index) => {
        const isActive = index === activeShoeIndex;
        const scaledFontSize = (30 / shoe.GhostText.length) * baseScale;
        return (
          <MotionText
            key={`text-${activeCategory}-${index}`}
            text={shoe.GhostText}
            font="https://raw.githubusercontent.com/google/fonts/main/ofl/anton/Anton-Regular.ttf"
            fontSize={scaledFontSize} 
            letterSpacing={0.02}
            anchorX="center"
            anchorY="middle"
            position={[0, 0, -5]}
            transparent={true}
            color={shoe.TextColor}
            animate={{
              fillOpacity: isActive ? 0.15 : 0,
              x: isActive ? 0 : (index < activeShoeIndex ? -5 : 5),
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
      
    </>
  );
}

