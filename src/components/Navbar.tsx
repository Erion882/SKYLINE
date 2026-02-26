import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Drone, ChevronRight, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sq' : 'en');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl py-4 shadow-2xl border-b border-white/10' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Drone size={24} />
          </div>
          <span className={`text-xl font-black tracking-tighter transition-colors ${scrolled ? 'text-white' : 'text-white'}`}>SKYLINE DIGITAL</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors relative group"
            >
              {t.nav[item.toLowerCase() as keyof typeof t.nav]}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-400 transition-all group-hover:w-full" />
            </a>
          ))}
          
          <div className="h-4 w-px bg-white/20 mx-2" />

          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            <Languages size={14} />
            {language === 'en' ? 'SQ' : 'EN'}
          </button>

          <a 
            href="#booking"
            className="px-8 py-3 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl"
          >
            {t.nav.bookNow}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={toggleLanguage}
            className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <Languages size={20} />
          </button>
          <button 
            className="w-10 h-10 flex items-center justify-center text-white" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[60] p-8 flex flex-col gap-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <Drone size={24} className="text-white" />
                <span className="text-xl font-black text-white">SKYLINE</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>

            {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-black text-white flex items-center justify-between group"
              >
                {t.nav[item.toLowerCase() as keyof typeof t.nav]} 
                <ChevronRight size={32} className="text-zinc-800 group-hover:text-emerald-400 transition-colors" />
              </a>
            ))}
            
            <div className="mt-auto space-y-6">
              <button 
                onClick={() => { toggleLanguage(); setIsOpen(false); }}
                className="w-full py-4 border border-white/10 rounded-2xl text-white font-bold flex items-center justify-center gap-3"
              >
                <Languages size={20} />
                {language === 'en' ? 'Switch to Albanian' : 'Kalo në Anglisht'}
              </button>
              <a 
                href="#booking"
                onClick={() => setIsOpen(false)}
                className="block w-full py-6 bg-white text-black rounded-2xl text-center font-black text-xl uppercase tracking-tighter"
              >
                {t.nav.bookNow}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
