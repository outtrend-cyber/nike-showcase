import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cartItems, onPay }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cartItems.reduce((acc, item) => {
    const priceNum = parseInt(item.Price.replace('$', ''));
    return acc + (priceNum * item.quantity);
  }, 0);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate network request
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Wait for success animation then close and clear cart
      setTimeout(() => {
        setIsSuccess(false);
        onPay();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isProcessing && !isSuccess ? onClose : undefined}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-nike-black border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {isSuccess ? (
              <div className="w-full p-8 md:p-16 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                >
                  <CheckCircle2 className="w-16 h-16 md:w-24 md:h-24 text-nike-red" />
                </motion.div>
                <h2 className="text-2xl md:text-4xl font-anton text-white tracking-wide">ORDER CONFIRMED</h2>
                <p className="text-white/60 font-medium">Your premium gear is on the way.</p>
              </div>
            ) : (
              <>
                {/* Left: Order Summary */}
                <div className="w-full md:w-1/2 p-6 md:p-12 bg-white/5 md:border-r border-b md:border-b-0 border-white/10">
                  <h2 className="text-2xl md:text-3xl font-anton text-white tracking-wide mb-6 md:mb-8">SUMMARY</h2>
                  <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2">
                    {cartItems.map(item => (
                      <div key={item.Name} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-black/40 rounded-md p-1 shrink-0 flex items-center justify-center">
                            <img src={item.Image} alt={item.Name} className="w-14 h-14 object-contain" style={{ maxWidth: '60px', maxHeight: '60px' }} />
                          </div>
                          <div>
                            <p className="text-white font-bold">{item.Name}</p>
                            <p className="text-white/50 text-sm">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-white font-anton">{item.Price}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/60">Subtotal</span>
                      <span className="text-white">${total}</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-white/60">Shipping</span>
                      <span className="text-white uppercase text-sm font-bold">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-anton text-nike-red">
                      <span>TOTAL</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Payment Mockup */}
                <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between">
                  <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-anton text-white tracking-wide mb-6 md:mb-8">PAYMENT</h2>
                    <div className="space-y-4">
                      <div className="w-full p-4 bg-black/40 border border-white/20 rounded-lg text-white/40">
                        •••• •••• •••• 4242
                      </div>
                      <div className="flex gap-4">
                        <div className="w-1/2 p-4 bg-black/40 border border-white/20 rounded-lg text-white/40">
                          12 / 28
                        </div>
                        <div className="w-1/2 p-4 bg-black/40 border border-white/20 rounded-lg text-white/40">
                          CVC
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full mt-8 md:mt-12 bg-nike-white text-nike-black py-3 md:py-4 font-anton text-xl md:text-2xl tracking-widest uppercase hover:bg-nike-red hover:text-white transition-colors duration-300 disabled:opacity-50"
                  >
                    {isProcessing ? 'PROCESSING...' : 'PAY NOW'}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
