import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Play } from 'lucide-react';
import Skeleton from './Skeleton';
import { useLanguage } from '../context/LanguageContext';

const projects = [
  {
    title: "Alpine Peaks",
    category: "Drone / Video",
    image: "https://picsum.photos/seed/alpine/800/600",
    link: "#"
  },
  {
    title: "Urban Pulse",
    category: "Video Editing",
    image: "https://picsum.photos/seed/urban/800/600",
    link: "#"
  },
  {
    title: "TechFlow SaaS",
    category: "Web Development",
    image: "https://picsum.photos/seed/tech/800/600",
    link: "#"
  },
  {
    title: "Ocean Breeze",
    category: "Drone Shooting",
    image: "https://picsum.photos/seed/ocean/800/600",
    link: "#"
  },
  {
    title: "Luxe Estates",
    category: "Full Package",
    image: "https://picsum.photos/seed/estate/800/600",
    link: "#"
  },
  {
    title: "Creative Studio",
    category: "Web Development",
    image: "https://picsum.photos/seed/studio/800/600",
    link: "#"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-zinc-900 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              {t.portfolio.title}
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              {t.portfolio.subtitle}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 border border-zinc-700 rounded-full hover:bg-white hover:text-black transition-all">{t.portfolio.filterAll}</button>
            <button className="px-6 py-2 border border-zinc-700 rounded-full hover:bg-white hover:text-black transition-all">{t.portfolio.filterDrone}</button>
            <button className="px-6 py-2 border border-zinc-700 rounded-full hover:bg-white hover:text-black transition-all">{t.portfolio.filterWeb}</button>
          </div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-800/50 p-8 flex flex-col justify-end gap-4">
                <Skeleton className="h-4 w-24 bg-zinc-700" />
                <Skeleton className="h-8 w-48 bg-zinc-700" />
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full bg-zinc-700" />
                  <Skeleton className="h-10 w-10 rounded-full bg-zinc-700" />
                </div>
              </div>
            ))
          ) : (
            projects.map((project, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-800"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">{project.category}</p>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Play size={18} fill="black" />
                    </button>
                    <button className="w-10 h-10 bg-zinc-800 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
