import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play, Globe, Drone, Code, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Cinematic Background */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?auto=format&fit=crop&q=80&w=2070" 
          alt="Cinematic Drone View" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Cinematic Overlay Grain/Vignette */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      <div className="container mx-auto px-6 relative z-30 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-12"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">{t.hero.badge}</span>
          </motion.div>
          
          <div className="space-y-4">
            <motion.h1 
              className="text-5xl sm:text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase"
            >
              <motion.span 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="block"
              >
                {t.hero.title1}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="block text-transparent stroke-white stroke-1"
                style={{ WebkitTextStroke: '1px white' }}
              >
                {t.hero.title2}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="block text-emerald-400"
              >
                {t.hero.title3}
              </motion.span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
          >
            {t.hero.subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <a 
              href="#booking"
              className="px-10 py-5 bg-white text-black rounded-full font-bold flex items-center gap-3 hover:bg-emerald-400 transition-all group shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              {t.hero.ctaStart} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#portfolio"
              className="px-10 py-5 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-full font-bold hover:bg-white/10 transition-all"
            >
              {t.hero.ctaPortfolio}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold block text-center w-full">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center w-full"
        >
          <ChevronDown size={20} className="text-white/40" />
        </motion.div>
      </motion.div>

      {/* Side Stats */}
      <div className="absolute left-12 bottom-12 z-30 hidden xl:block">
        <div className="flex items-center gap-6">
          <div className="flex -space-x-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden">
                <img src={`https://picsum.photos/seed/${i+20}/100/100`} alt="Client" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-widest font-bold">
            <p className="text-white">{t.hero.statsTitle}</p>
            <p className="text-white/40">{t.hero.statsSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
