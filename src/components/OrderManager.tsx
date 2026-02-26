import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Clock, AlertCircle, Trash2, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import Skeleton from './Skeleton';

interface Booking {
  id: number;
  name: string;
  email: string;
  service: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  created_at: string;
}

export default function OrderManager() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.name.toLowerCase().includes(filter.toLowerCase()) ||
    b.service.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900">Order Management</h2>
          <p className="text-zinc-500">Manage your service bookings and client requests.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Search bookings..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-full focus:ring-2 focus:ring-black outline-none w-full md:w-64"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-20 rounded-full" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-full max-w-md" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredBookings.map((booking) => (
            <motion.div
              layout
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-zinc-900">{booking.name}</h4>
                  <span className={cn(
                    "text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border",
                    booking.status === 'pending' && "bg-amber-50 text-amber-600 border-amber-200",
                    booking.status === 'confirmed' && "bg-blue-50 text-blue-600 border-blue-200",
                    booking.status === 'completed' && "bg-emerald-50 text-emerald-600 border-emerald-200",
                    booking.status === 'cancelled' && "bg-rose-50 text-rose-600 border-rose-200"
                  )}>
                    {booking.status}
                  </span>
                </div>
                <div className="text-sm text-zinc-500 flex flex-wrap gap-x-4 gap-y-1">
                  <span>{booking.email}</span>
                  <span className="font-medium text-zinc-900">{booking.service}</span>
                  <span>Date: {format(new Date(booking.date), 'PPP')}</span>
                </div>
                {booking.notes && (
                  <p className="text-sm text-zinc-600 italic mt-2">"{booking.notes}"</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {booking.status === 'pending' && (
                  <button 
                    onClick={() => updateStatus(booking.id, 'confirmed')}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    title="Confirm"
                  >
                    <Check size={20} />
                  </button>
                )}
                {booking.status === 'confirmed' && (
                  <button 
                    onClick={() => updateStatus(booking.id, 'completed')}
                    className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                    title="Complete"
                  >
                    <Check size={20} />
                  </button>
                )}
                <button 
                  onClick={() => updateStatus(booking.id, 'cancelled')}
                  className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                  title="Cancel"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
          {filteredBookings.length === 0 && (
            <div className="text-center py-20 bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200">
              <AlertCircle className="mx-auto text-zinc-300 mb-2" size={48} />
              <p className="text-zinc-500">No bookings found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
