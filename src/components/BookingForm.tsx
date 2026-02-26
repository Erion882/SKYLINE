import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Mail, User, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BookingForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Drone Shooting',
    date: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', service: 'Drone Shooting', date: '', notes: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-3xl shadow-xl border border-zinc-100 text-center space-y-4"
      >
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900">{t.booking.successTitle}</h3>
        <p className="text-zinc-600">{t.booking.successDesc}</p>
        <button 
          onClick={() => setStatus('idle')}
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-zinc-800 transition-colors"
        >
          {t.booking.bookAnother}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-zinc-100 space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-zinc-900">{t.booking.formTitle}</h3>
        <p className="text-zinc-500 text-sm">{t.booking.formSub}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <User size={14} /> {t.booking.name}
          </label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition-all"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Mail size={14} /> {t.booking.email}
          </label>
          <input
            required
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            {t.booking.service}
          </label>
          <select
            value={formData.service}
            onChange={e => setFormData({ ...formData, service: e.target.value })}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition-all"
          >
            <option>Drone Shooting</option>
            <option>Video Editing</option>
            <option>Web Development</option>
            <option>Full Package</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Calendar size={14} /> {t.booking.date}
          </label>
          <input
            required
            type="date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <MessageSquare size={14} /> {t.booking.notes}
        </label>
        <textarea
          rows={4}
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition-all resize-none"
          placeholder={t.booking.placeholderNotes}
        />
      </div>

      <button
        disabled={status === 'loading'}
        type="submit"
        className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-zinc-800 transition-all disabled:opacity-50 shadow-lg shadow-black/10"
      >
        {status === 'loading' ? t.booking.sending : t.booking.submit}
      </button>
    </form>
  );
}
