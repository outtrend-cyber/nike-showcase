import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { shoesData } from '../data/shoesData';

export default function SearchOverlay({ onSelectShoe }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Build a flat searchable index from all categories
  const allShoes = Object.entries(shoesData).flatMap(([category, shoes]) =>
    shoes.map((shoe, index) => ({ ...shoe, category, index }))
  );

  const results = query.length > 0
    ? allShoes.filter(shoe =>
        shoe.Name.toLowerCase().includes(query.toLowerCase()) ||
        shoe.GhostText.toLowerCase().includes(query.toLowerCase()) ||
        shoe.leftHeader?.toLowerCase().includes(query.toLowerCase()) ||
        shoe.rightHeader?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (shoe) => {
    onSelectShoe(shoe.category, shoe.index);
    setIsOpen(false);
    setQuery('');
    // Scroll back to top to see the selected shoe
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryLabel = (cat) => {
    const labels = { men: "Men's", women: "Women's", kids: "Kids'", sale: "Sale" };
    return labels[cat] || cat;
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-[var(--color-nike-black)] hover:text-[var(--color-nike-white)] transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Full-Screen Search Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dark Backdrop */}
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => { setIsOpen(false); setQuery(''); }}
            />

            {/* Search Content */}
            <div className="relative z-10 w-full max-w-3xl mx-auto pt-16 md:pt-24 px-4 md:px-8">
              
              {/* Search Input Bar */}
              <div className="flex items-center gap-4 border-b-2 border-white/30 pb-4">
                <Search className="w-6 h-6 text-white/50 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sneakers..."
                  className="bg-transparent text-white text-xl md:text-3xl font-anton tracking-wider placeholder-white/20 outline-none w-full uppercase"
                />
                <button 
                  onClick={() => { setIsOpen(false); setQuery(''); }}
                  className="text-white/50 hover:text-white transition-colors flex-shrink-0"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              {/* Quick Category Pills */}
              {query.length === 0 && (
                <motion.div 
                  className="mt-8 flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <span className="text-white/30 text-xs tracking-widest uppercase mr-4 self-center">Trending:</span>
                  {['Air Force', 'Jordan', 'Dunk', 'Air Max', 'Huarache'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 border border-white/20 rounded-full text-white/60 text-sm tracking-wider hover:bg-white/10 hover:text-white transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Search Results */}
              <div className="mt-8 max-h-[60vh] overflow-y-auto space-y-2 scrollbar-thin">
                <AnimatePresence mode="popLayout">
                  {results.map((shoe, i) => (
                    <motion.button
                      key={`${shoe.category}-${shoe.index}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, delay: i * 0.05 }}
                      onClick={() => handleSelect(shoe)}
                      className="w-full flex items-center gap-6 p-4 rounded-xl hover:bg-white/10 transition-all group text-left"
                    >
                      {/* Shoe Thumbnail */}
                      <div 
                        className="w-14 h-14 md:w-20 md:h-20 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                        style={{ backgroundColor: shoe.Color + '30' }}
                      >
                        <img 
                          src={shoe.Image} 
                          alt={shoe.Name} 
                          className={`w-[90%] h-[90%] object-contain ${shoe.hasWhiteBg ? 'mix-blend-multiply' : ''}`}
                        />
                      </div>
                      
                      {/* Shoe Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-anton text-base md:text-xl tracking-wider group-hover:text-white truncate">
                            {shoe.Name}
                          </span>
                          {shoe.onSale && (
                            <span className="bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0">
                              30% OFF
                            </span>
                          )}
                        </div>
                        <span className="text-white/40 text-xs tracking-widest uppercase">
                          {getCategoryLabel(shoe.category)}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex flex-col items-end flex-shrink-0">
                        {shoe.onSale && (
                          <span className="text-white/30 line-through text-sm">{shoe.originalPrice}</span>
                        )}
                        <span className={`font-anton text-xl tracking-wider ${shoe.onSale ? 'text-red-400' : 'text-white'}`}>
                          {shoe.Price}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>

                {/* No Results */}
                {query.length > 0 && results.length === 0 && (
                  <motion.div 
                    className="text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-white/30 text-lg tracking-wider">No sneakers found for "{query}"</p>
                    <p className="text-white/15 text-sm mt-2 tracking-wider">Try searching by name or feature</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
