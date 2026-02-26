import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import BookingForm from './components/BookingForm';
import Chatbot from './components/Chatbot';
import OrderManager from './components/OrderManager';
import { LayoutDashboard, Globe } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function MainContent() {
  const [view, setView] = useState<'public' | 'admin'>('public');
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-black selection:text-white">
      {/* View Switcher (For Demo Purposes) */}
      <div className="fixed top-24 left-6 z-40 flex flex-col gap-2">
        <button 
          onClick={() => setView('public')}
          className={`p-3 rounded-xl shadow-lg transition-all ${view === 'public' ? 'bg-black text-white' : 'bg-white text-zinc-400 hover:text-zinc-900'}`}
          title="Public View"
        >
          <Globe size={20} />
        </button>
        <button 
          onClick={() => setView('admin')}
          className={`p-3 rounded-xl shadow-lg transition-all ${view === 'admin' ? 'bg-black text-white' : 'bg-white text-zinc-400 hover:text-zinc-900'}`}
          title="Admin View"
        >
          <LayoutDashboard size={20} />
        </button>
      </div>

      {view === 'public' ? (
        <>
          <Navbar />
          <main>
            <Hero />
            <Services />
            <Portfolio />
            
            <section id="booking" className="py-24 bg-zinc-100">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900">
                      {t.booking.title}
                    </h2>
                    <p className="text-xl text-zinc-600 leading-relaxed">
                      {t.booking.subtitle}
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <span className="font-bold">01</span>
                        </div>
                        <p className="font-medium text-zinc-900">{t.booking.step1}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <span className="font-bold">02</span>
                        </div>
                        <p className="font-medium text-zinc-900">{t.booking.step2}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <span className="font-bold">03</span>
                        </div>
                        <p className="font-medium text-zinc-900">{t.booking.step3}</p>
                      </div>
                    </div>
                  </div>
                  <BookingForm />
                </div>
              </div>
            </section>
          </main>

          <footer className="bg-white border-t border-zinc-100 py-12">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center">
                  <Globe size={16} />
                </div>
                <span className="font-black tracking-tighter text-zinc-900">SKYLINE DIGITAL</span>
              </div>
              <p className="text-zinc-400 text-sm">© 2024 Skyline Digital. All rights reserved.</p>
              <div className="flex gap-6">
                {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
                  <a key={social} href="#" className="text-sm font-bold text-zinc-400 hover:text-black transition-colors">{social}</a>
                ))}
              </div>
            </div>
          </footer>
          
          <Chatbot />
        </>
      ) : (
        <div className="pt-24 min-h-screen bg-zinc-50">
          <OrderManager />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
