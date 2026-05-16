import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import { shoesData } from './data/shoesData';
import SceneView from './components/SceneView';
import ScrollShowcase from './components/ScrollShowcase';
import PersistentUI from './components/PersistentUI';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import FooterSection from './components/FooterSection';
import Loader from './components/Loader';
import ProfileModal from './components/ProfileModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('men');
  const [activeShoeIndex, setActiveShoeIndex] = useState(0);
  
  // Global E-Commerce State
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nike_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  // Search handler: navigates to a specific shoe in any category
  const handleSelectShoe = useCallback((category, index) => {
    setActiveCategory(category);
    setActiveShoeIndex(index);
  }, []);

  // Safely get the active shoe based on current category and index
  const currentCategoryData = shoesData[activeCategory];
  const activeShoe = currentCategoryData[activeShoeIndex] || currentCategoryData[0];

  const handleAddToCart = (shoe) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.Name === shoe.Name);
      if (existing) {
        return prev.map(item => item.Name === shoe.Name ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...shoe, quantity: 1 }];
    });
  };

  return (
    // The top-level wrapper MUST occupy the full viewport width
    <div className="w-full min-h-screen bg-black">
      
      {/* 0. INTRO LOADER */}
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 1. FIXED OVERLAYS: Navigation and global header details */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <PersistentUI 
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
          onCartClick={() => setIsCartOpen(true)}
          activeCategory={activeCategory}
          setActiveCategory={(cat) => {
            setActiveCategory(cat);
            setActiveShoeIndex(0); // Reset index when switching categories
          }}
          onSelectShoe={handleSelectShoe}
          onProfileClick={() => setIsProfileOpen(true)}
          user={user}
        />
      </div>
      
      {/* 2. FIXED CANVAS LAYER: Pinned to viewport space background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <React.Suspense fallback={null}>
            <SceneView activeShoeIndex={activeShoeIndex} activeCategory={activeCategory} />
          </React.Suspense>
        </Canvas>
      </div>

      {/* 3. SCROLL PROGRESS CONTROLLER LAYER (Contains Hero UI + Scrolling Metrics) */}
      <ScrollShowcase 
        activeCategoryData={currentCategoryData}
        activeShoe={activeShoe}
        activeShoeIndex={activeShoeIndex}
        setActiveShoeIndex={setActiveShoeIndex}
        onAddToCart={() => handleAddToCart(activeShoe)}
      />

      {/* 4. FINAL HERO FOOTER */}
      <FooterSection activeShoe={activeShoe} />

      {/* E-Commerce UI Layers (z-40 / z-50) */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        setCartItems={setCartItems}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cartItems={cartItems}
        onPay={() => {
          setCartItems([]);
          setIsCheckoutOpen(false);
        }}
      />

      {/* Profile Drawer */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        setUser={setUser}
      />

    </div>
  );
}