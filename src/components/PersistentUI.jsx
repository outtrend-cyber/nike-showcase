import React, { useState } from 'react';
import { User, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchOverlay from './SearchOverlay';

export default function PersistentUI({ cartCount = 0, onCartClick, activeCategory, setActiveCategory, onSelectShoe, onProfileClick, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full z-50 pointer-events-none">
      {/* Top Bar */}
      <div className="w-full bg-[var(--color-nike-black)] text-[var(--color-nike-white)] text-center py-1.5 md:py-2 text-[10px] md:text-xs font-semibold tracking-widest pointer-events-auto">
        ENJOY AN EXCLUSIVE 10% COUPON FOR YOUR FIRST PURCHASE.
      </div>

      {/* Sticky Navbar */}
      <nav className="w-full px-4 md:px-8 py-4 md:py-6 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/20 to-transparent">
        {/* Left: Logo */}
        <div className="text-[var(--color-nike-white)] font-bold text-2xl md:text-3xl italic tracking-tighter">
          NIKE
        </div>

        {/* Center: Links (Desktop only) */}
        <div className="hidden md:flex space-x-8">
          {['men', 'women', 'kids', 'sale'].map((item) => {
            const isActive = activeCategory === item;
            return (
              <button 
                key={item} 
                onClick={() => setActiveCategory(item)}
                className={`font-bold tracking-wider transition-colors uppercase text-sm ${
                  isActive 
                    ? 'text-[var(--color-nike-red)] drop-shadow-md border-b-2 border-[var(--color-nike-red)]' 
                    : 'text-[var(--color-nike-black)] hover:text-[var(--color-nike-white)]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Right: Icons & Search */}
        <div className="flex items-center space-x-5 md:space-x-6">
          <SearchOverlay onSelectShoe={onSelectShoe} />
          
          <button 
            onClick={onProfileClick}
            className="relative text-[var(--color-nike-black)] hover:text-[var(--color-nike-white)] transition-colors p-1"
          >
            {user ? (
              <div className="w-7 h-7 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-[var(--color-nike-red)] to-orange-600 flex items-center justify-center text-white text-[9px] md:text-[10px] font-bold ring-2 ring-white/30">
                {user.avatar}
              </div>
            ) : (
              <User className="w-6 h-6 md:w-6 md:h-6" />
            )}
          </button>
          
          <button 
            className="relative text-[var(--color-nike-black)] hover:text-[var(--color-nike-white)] transition-colors p-1"
            onClick={onCartClick}
          >
            <ShoppingBag className="w-6 h-6 md:w-6 md:h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-nike-red)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden text-[var(--color-nike-black)] hover:text-[var(--color-nike-white)] transition-colors p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 pointer-events-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col p-6 space-y-1">
              {['men', 'women', 'kids', 'sale'].map((item) => {
                const isActive = activeCategory === item;
                return (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveCategory(item);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-4 text-left font-anton text-2xl tracking-[0.2em] uppercase transition-colors border-b border-white/5 ${
                      isActive ? 'text-[var(--color-nike-red)]' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item}
                    {item === 'sale' && (
                      <span className="ml-3 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-sans font-bold tracking-wider">
                        30% OFF
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
