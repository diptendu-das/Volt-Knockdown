import React, { useState } from 'react';
import { Ticket, CheckCircle2, Shield, Sparkles, AlertCircle, ArrowRight, MapPin, Users, Smartphone } from 'lucide-react';
import { TICKET_TIERS, EVENT_DETAILS } from '../data/fightData';
import { soundFX } from '../utils/audio';

export default function TicketSection({ onOpenBookingModal }) {
  const [selectedTierId, setSelectedTierId] = useState('seminar-vip');

  const selectedTier = TICKET_TIERS.find(t => t.id === selectedTierId) || TICKET_TIERS[0];

  return (
    <section id="tickets" className="relative py-20 bg-[#07070a] border-t border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-mono tracking-widest uppercase mb-3 animate-pulse">
            <Ticket className="w-4 h-4 text-amber-400" />
            <span>SEMINAR HALL SEAT RESERVATION • PHONEPE UPI QR</span>
          </div>
          <h2 className="font-teko text-5xl sm:text-7xl font-black tracking-tight uppercase text-white leading-none">
            RESERVE YOUR <span className="text-red-500">BENCH</span>
          </h2>
          <p className="font-barlow text-lg text-zinc-400 mt-2">
            Presented by School of Electrical. Don't stand in the corridor; book your seat inside the Seminar Hall for 9th Nov, 1:00 PM lunch break!
          </p>
        </div>

        {/* Seminar Hall Seating Map & Tier Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Seminar Hall Schematic SVG */}
          <div className="lg:col-span-6 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>ELECTRICAL SEMINAR HALL SCHEMATIC</span>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                CLICK ZONE TO PREVIEW
              </span>
            </div>

            {/* Stylized Classroom / Seminar Hall SVG */}
            <div className="relative aspect-video w-full bg-black rounded-xl border border-white/5 flex items-center justify-center p-4">
              <svg viewBox="0 0 450 300" className="w-full h-full max-w-[400px]">
                {/* Podium / Blackboard Stage where Arman stands */}
                <rect x="50" y="20" width="350" height="40" rx="6" fill="#1c1917" stroke="#dc2626" strokeWidth="2" />
                <text x="225" y="45" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  BLACKBOARD / BRAWL STAGE (ARMAN 6'7")
                </text>

                {/* Front Row (Splash Zone) */}
                <rect 
                  x="70" y="80" width="310" height="35" rx="5" 
                  fill={selectedTierId === 'seminar-vip' ? 'rgba(220, 38, 38, 0.45)' : 'rgba(220, 38, 38, 0.15)'}
                  stroke={selectedTierId === 'seminar-vip' ? '#ef4444' : '#7f1d1d'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:stroke-red-400"
                  onClick={() => { soundFX.playClick(); setSelectedTierId('seminar-vip'); }}
                />
                <text x="225" y="102" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  DESK 1-2: FRONT ROW SPLASH ZONE (₹150)
                </text>

                {/* Middle Benches */}
                <rect 
                  x="50" y="135" width="350" height="40" rx="5" 
                  fill={selectedTierId === 'seminar-middle' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(245, 158, 11, 0.12)'}
                  stroke={selectedTierId === 'seminar-middle' ? '#f59e0b' : '#78350f'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:stroke-amber-400"
                  onClick={() => { soundFX.playClick(); setSelectedTierId('seminar-middle'); }}
                />
                <text x="225" y="160" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  DESK 3-5: MIDDLE BENCH SAFE DISTANCE (₹80)
                </text>

                {/* Back Benches */}
                <rect 
                  x="40" y="195" width="370" height="45" rx="5" 
                  fill={selectedTierId === 'back-bench' ? 'rgba(161, 161, 170, 0.35)' : 'rgba(255, 255, 255, 0.05)'}
                  stroke={selectedTierId === 'back-bench' ? '#e4e4e7' : '#3f3f46'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:stroke-zinc-300"
                  onClick={() => { soundFX.playClick(); setSelectedTierId('back-bench'); }}
                />
                <text x="225" y="222" textAnchor="middle" fill="#d4d4d8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  DESK 6-8: BACK BENCHER BALCONY (₹40)
                </text>

                {/* Door / Exit path where Srichandan runs */}
                <rect x="380" y="255" width="50" height="30" rx="3" fill="#0284c7" opacity="0.7" />
                <text x="405" y="274" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace">EXIT 🏃‍♂️</text>
              </svg>

              <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[11px] font-mono border border-white/10 text-zinc-300">
                SELECTED VIEW: <span className="text-white font-bold">{selectedTier.name}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-red-950/30 border border-red-900/40 flex items-center gap-2.5 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>Front row attendees must duck if Srichandan is airborne. Free samosa coupon included!</span>
            </div>
          </div>

          {/* Right: Selected Tier Details & Instant Checkout */}
          <div className="lg:col-span-6 bg-gradient-to-br from-zinc-950 to-zinc-900 border-2 border-red-500 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded text-xs font-teko text-lg tracking-wider font-bold ${selectedTier.badgeColor}`}>
                {selectedTier.badge}
              </span>
              <span className="font-mono text-xs text-zinc-400">
                ZONE: <strong className="text-white">{selectedTier.zone}</strong>
              </span>
            </div>

            <h3 className="font-teko text-4xl sm:text-5xl font-black text-white leading-none">
              {selectedTier.name}
            </h3>

            <p className="text-sm text-zinc-400 mt-2 mb-6 leading-relaxed">
              {selectedTier.description}
            </p>

            {/* Price block */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase block">PRICE PER TICKET</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-teko text-5xl font-black text-amber-400 leading-none">
                    ₹{selectedTier.price}
                  </span>
                  {selectedTier.originalPrice && (
                    <span className="text-sm font-mono line-through text-zinc-500">
                      ₹{selectedTier.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-zinc-500 uppercase block">AVAILABILITY</span>
                <span className="font-mono text-sm font-bold text-red-400 bg-red-950/80 px-2.5 py-1 rounded border border-red-800 inline-block mt-0.5">
                  {selectedTier.availableSeats} BENCHES LEFT
                </span>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-2.5 mb-8">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-3">
                SEMINAR PRIVILEGES:
              </div>
              {selectedTier.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => {
                soundFX.playBell();
                onOpenBookingModal(selectedTier);
              }}
              className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 text-white font-teko text-2xl tracking-wider uppercase rounded-xl shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-3 border border-red-400/50"
            >
              <Smartphone className="w-6 h-6 text-amber-300" />
              <span>PAY & BOOK VIA PHONEPE QR (₹{selectedTier.price})</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* All Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TICKET_TIERS.map((tier) => (
            <div
              key={tier.id}
              onClick={() => { soundFX.playClick(); setSelectedTierId(tier.id); }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedTierId === tier.id
                  ? 'bg-zinc-900 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)] scale-[1.02]'
                  : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-teko tracking-wider ${tier.badgeColor}`}>
                  {tier.badge}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">{tier.availableSeats} left</span>
              </div>
              <h4 className="font-teko text-xl font-bold text-white leading-tight truncate">
                {tier.name}
              </h4>
              <div className="font-teko text-3xl font-black text-amber-400 mt-2">
                ₹{tier.price}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
