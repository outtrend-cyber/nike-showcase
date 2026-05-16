import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, LogOut, ShoppingBag, Heart, Settings, ChevronRight } from 'lucide-react';

// Simulated Google user profiles for demo
const DEMO_PROFILES = [
  { name: "Alex Johnson", email: "alex.johnson@gmail.com", avatar: "AJ" },
  { name: "Sarah Williams", email: "sarah.w@gmail.com", avatar: "SW" },
  { name: "Mike Chen", email: "mike.chen@gmail.com", avatar: "MC" },
];

export default function ProfileModal({ isOpen, onClose, user, setUser }) {
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('nike_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nike_user');
    }
  }, [user]);

  const handleGoogleSignIn = () => {
    setIsSigningIn(true);
    // Simulate Google OAuth delay
    setTimeout(() => {
      const randomProfile = DEMO_PROFILES[Math.floor(Math.random() * DEMO_PROFILES.length)];
      setUser(randomProfile);
      setIsSigningIn(false);
    }, 1800);
  };

  const handleSignOut = () => {
    setUser(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-neutral-950 border-l border-white/10 z-[999] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-anton text-2xl tracking-wider text-white uppercase">
                {user ? 'My Account' : 'Sign In'}
              </h2>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {!user ? (
                /* ===== SIGN IN VIEW ===== */
                <div className="flex flex-col items-center justify-center h-full gap-8">
                  
                  {/* Nike Logo */}
                  <div className="flex flex-col items-center gap-3">
                    <span className="font-bold text-5xl italic tracking-tighter text-white">NIKE</span>
                    <p className="text-white/40 text-sm tracking-widest uppercase">Member Access</p>
                  </div>

                  {/* Benefits */}
                  <div className="w-full max-w-xs space-y-3 my-4">
                    {[
                      'Early access to new releases',
                      'Member-exclusive colorways',
                      'Free shipping on all orders',
                      'Birthday rewards & perks'
                    ].map((benefit, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3 text-white/60 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-nike-red)] flex-shrink-0" />
                        {benefit}
                      </motion.div>
                    ))}
                  </div>

                  {/* Google Sign-In Button */}
                  <motion.button
                    onClick={handleGoogleSignIn}
                    disabled={isSigningIn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full max-w-xs flex items-center justify-center gap-3 bg-white text-black font-semibold py-4 px-6 rounded-xl hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isSigningIn ? (
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-5 h-5 border-2 border-neutral-300 border-t-black rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <>
                        {/* Google "G" Logo */}
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span>Continue with Google</span>
                      </>
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-4 w-full max-w-xs">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-white/20 text-xs tracking-widest uppercase">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Email Sign-In (Visual Only) */}
                  <div className="w-full max-w-xs space-y-3">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors text-sm"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors text-sm"
                    />
                    <button className="w-full bg-[var(--color-nike-red)] text-white font-bold py-3.5 rounded-xl tracking-wider uppercase text-sm hover:brightness-110 transition-all">
                      Sign In
                    </button>
                  </div>

                  <p className="text-white/20 text-[10px] tracking-wider text-center max-w-xs">
                    By signing in, you agree to Nike's Privacy Policy and Terms of Use.
                  </p>
                </div>
              ) : (
                /* ===== PROFILE VIEW ===== */
                <div className="flex flex-col gap-6">
                  
                  {/* User Card */}
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-nike-red)] to-orange-600 flex items-center justify-center text-white font-anton text-xl tracking-wider">
                      {user.avatar}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{user.name}</h3>
                      <p className="text-white/40 text-sm">{user.email}</p>
                      <span className="text-[10px] text-[var(--color-nike-red)] font-bold tracking-widest uppercase mt-1 inline-block">
                        Nike Member
                      </span>
                    </div>
                  </div>

                  {/* Member Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Points', value: '2,450' },
                      { label: 'Orders', value: '7' },
                      { label: 'Wishlist', value: '12' }
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                        <div className="text-white font-anton text-xl tracking-wider">{stat.value}</div>
                        <div className="text-white/30 text-[10px] tracking-widest uppercase mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-1 mt-2">
                    {[
                      { icon: ShoppingBag, label: 'Order History', desc: 'Track your orders' },
                      { icon: Heart, label: 'Wishlist', desc: 'Saved items' },
                      { icon: Settings, label: 'Account Settings', desc: 'Manage your profile' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          <item.icon className="w-5 h-5 text-white/60" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-white text-sm font-medium">{item.label}</div>
                          <div className="text-white/30 text-xs">{item.desc}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                      </button>
                    ))}
                  </div>

                  {/* Member Perks Banner */}
                  <div className="bg-gradient-to-r from-[var(--color-nike-red)]/20 to-orange-600/20 border border-[var(--color-nike-red)]/30 rounded-2xl p-5 mt-2">
                    <div className="text-[var(--color-nike-red)] text-xs font-bold tracking-widest uppercase mb-2">Member Exclusive</div>
                    <div className="text-white font-anton text-lg tracking-wider">FREE SHIPPING ON ALL ORDERS</div>
                    <div className="text-white/40 text-xs mt-1">Valid through December 2026</div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {user && (
              <div className="p-6 border-t border-white/10">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 transition-colors py-3 text-sm font-medium tracking-wider"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
