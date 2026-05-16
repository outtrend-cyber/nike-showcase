import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, setCartItems, onCheckout }) {
  
  // Calculate total
  const total = cartItems.reduce((acc, item) => {
    const priceNum = parseInt(item.Price.replace('$', ''));
    return acc + (priceNum * item.quantity);
  }, 0);

  const updateQuantity = (name, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.Name === name) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeItem = (name) => {
    setCartItems(prev => prev.filter(item => item.Name !== name));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 pointer-events-auto"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-nike-black border-l border-white/10 z-50 flex flex-col shadow-2xl pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-white font-anton text-2xl md:text-3xl tracking-wide">YOUR CART</h2>
              <button 
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-4">
                  <p className="text-xl font-medium">Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.Name} 
                    className="flex bg-white/5 rounded-xl p-4 gap-4 relative group"
                  >
                    {/* Item Image */}
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-black/40 rounded-lg flex items-center justify-center p-2 shrink-0">
                      <img src={item.Image} alt={item.Name} className="w-14 h-14 md:w-20 md:h-20 object-contain" style={{ maxWidth: '80px', maxHeight: '80px' }} />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between py-1 pr-6">
                      <div>
                        <h3 className="text-white font-bold text-sm md:text-lg leading-tight line-clamp-2">{item.Name}</h3>
                        <p className="text-nike-red font-anton text-lg md:text-xl mt-1">{item.Price}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center bg-black/40 rounded-full px-2 py-1">
                          <button onClick={() => updateQuantity(item.Name, -1)} className="text-white/60 hover:text-white p-1">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.Name, 1)} className="text-white/60 hover:text-white p-1">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => removeItem(item.Name)}
                      className="absolute top-4 right-4 text-white/30 hover:text-nike-red transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/10 p-6 bg-black/40 backdrop-blur-md">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white/60 font-medium">TOTAL</span>
                  <span className="text-white font-anton text-3xl md:text-4xl">${total}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full bg-nike-red text-white py-3 md:py-4 font-anton text-xl md:text-2xl tracking-widest uppercase hover:bg-white hover:text-nike-red transition-colors duration-300"
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
