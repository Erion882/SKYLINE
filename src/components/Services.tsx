import React from 'react';
import { motion } from 'motion/react';
import { Drone, Video, Code, Layers, Zap, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.drone.title,
      description: t.services.drone.desc,
      icon: Drone,
      color: "bg-blue-50 text-blue-600",
      features: t.services.drone.features
    },
    {
      title: t.services.video.title,
      description: t.services.video.desc,
      icon: Video,
      color: "bg-purple-50 text-purple-600",
      features: t.services.video.features
    },
    {
      title: t.services.web.title,
      description: t.services.web.desc,
      icon: Code,
      color: "bg-emerald-50 text-emerald-600",
      features: t.services.web.features
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-3xl mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 mb-6">
            {t.services.title.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'text-zinc-400' : ''}>{word} </span>
            ))}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-zinc-500 leading-relaxed">
            {t.services.subtitle}
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group p-8 rounded-3xl border border-zinc-100 bg-zinc-50 hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-500"
            >
              <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">{service.title}</h3>
              <p className="text-zinc-500 mb-8 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                    <Zap size={14} className="text-zinc-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
