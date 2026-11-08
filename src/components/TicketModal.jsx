import React, { useState } from 'react';
import { X, CheckCircle2, Ticket, QrCode, Shield, Download, Printer, User, Mail, Sparkles, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENT_DETAILS } from '../data/fightData';
import { soundFX } from '../utils/audio';

export default function TicketModal({ isOpen, onClose, initialTier, bankroll, onDeductBankroll }) {
  const [tier, setTier] = useState(initialTier);
  const [quantity, setQuantity] = useState(1);
  const [includeSamosaAddon, setIncludeSamosaAddon] = useState(true);

  // Buyer Info
  const [fullName, setFullName] = useState('Electrical Student');
  const [phone, setPhone] = useState('+91 98765 43210');

  // Confirmation state
  const [bookedTicket, setBookedTicket] = useState(null);

  if (!isOpen) return null;

  const currentTier = tier || initialTier;
  const unitPrice = currentTier ? currentTier.price : 150;
  const addonCost = includeSamosaAddon ? 30 : 0; // ₹30 for Extra Canteen Samosa & Chai
  const subtotal = (unitPrice * quantity) + addonCost;

  const handleBooking = (e) => {
    e.preventDefault();

    // Play victory sounds and blast confetti
    soundFX.playCash();
    setTimeout(() => soundFX.playBell(), 200);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#dc2626', '#f59e0b', '#38bdf8', '#ffffff']
    });

    const ticketNumber = `SOEE-BRAWL-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomSeat = `SEMINAR DESK ${Math.floor(1 + Math.random() * 3)} • SEAT 0${quantity}`;

    setBookedTicket({
      ticketNumber,
      tierName: currentTier.name,
      quantity,
      seatLocation: currentTier.id === 'seminar-vip' ? 'FRONT DESK 1 (FACING ARMAN) • SEAT 01' : randomSeat,
      holderName: fullName || 'ELECTRICAL BATCHMATE',
      totalPaid: subtotal,
      eventDate: EVENT_DETAILS.date,
      venue: EVENT_DETAILS.venue,
      gate: 'SEMINAR HALL MAIN DOOR (DO NOT BRING PROFESSORS)',
      developer: EVENT_DETAILS.developerName
    });
  };

  const resetAndClose = () => {
    setBookedTicket(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-zinc-950 border-2 border-red-500 rounded-2xl shadow-[0_0_60px_rgba(220,38,38,0.5)] overflow-hidden my-6">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-red-950 via-zinc-900 to-zinc-950 p-4 border-b border-red-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-amber-400" />
            <span className="font-teko text-2xl font-black tracking-wider text-white uppercase">
              {bookedTicket ? 'SEMINAR PASS ISSUED' : `SEMINAR TICKET PAYMENT PORTAL`}
            </span>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!bookedTicket ? (
            /* BOOKING & UPI SCAN FORM */
            <form onSubmit={handleBooking} className="space-y-5">
              
              {/* Selected Tier Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/70 to-zinc-900 border border-red-500/50 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-red-400 uppercase tracking-widest font-bold">
                    SEMINAR HALL TICKET
                  </div>
                  <h4 className="font-teko text-3xl font-black text-white leading-none mt-0.5">
                    {currentTier.name}
                  </h4>
                  <div className="text-xs text-zinc-400 mt-1">
                    {EVENT_DETAILS.venue} • 1:00 PM LUNCH BREAK
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-zinc-400">PRICE</div>
                  <div className="font-teko text-4xl font-black text-amber-400 leading-none">
                    ₹{unitPrice}
                  </div>
                </div>
              </div>

              {/* UPI QR PAYMENT PORTAL */}
              <div className="p-5 rounded-2xl bg-black border-2 border-amber-500/70 text-center space-y-3 shadow-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold uppercase">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>SCAN TO PAY VIA ANY UPI APP</span>
                </div>

                <p className="text-xs text-zinc-300 font-sans">
                  Open <strong className="text-white">PhonePe / Google Pay / Paytm / UPI</strong> and scan this official QR to pay:
                </p>

                {/* The User-Provided PhonePe QR Image */}
                <div className="relative inline-block p-3 bg-white rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                  <img 
                    src="./payment-qr.jpg" 
                    alt="PhonePe Payment QR Code"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg mx-auto"
                  />
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-black text-amber-400 text-[10px] font-mono font-bold px-3 py-0.5 rounded-full border border-amber-400 shadow">
                    TOTAL PAYABLE: ₹{subtotal}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 pt-1">
                  UPI ID Linked to Official Event Escrow • Instant Entry Confirmation
                </div>
              </div>

              {/* Quantity & Extra Samosa Addon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-white/5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-bold">
                    SELECT QUANTITY (SEATS):
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => { soundFX.playClick(); setQuantity(num); }}
                        className={`flex-1 py-1.5 rounded-lg font-mono font-bold text-xs transition-all ${
                          quantity === num
                            ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Samosa Addon */}
                <div 
                  onClick={() => setIncludeSamosaAddon(!includeSamosaAddon)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                    includeSamosaAddon 
                      ? 'bg-amber-950/40 border-amber-500/60' 
                      : 'bg-zinc-900/50 border-white/5'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={includeSamosaAddon}
                    onChange={() => {}}
                    className="mt-1 accent-amber-500 rounded"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Extra Canteen Samosa & Chai (+₹30)
                    </span>
                    <span className="text-[10px] text-zinc-400 leading-tight block">
                      Hot snacks to enjoy while watching Srichandan run for his life.
                    </span>
                  </div>
                </div>
              </div>

              {/* Buyer Name & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                    YOUR NAME / BATCH:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul (EE 3rd Year)"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                    WHATSAPP (FOR PASS):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Confirm Payment Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 text-white font-teko text-2xl tracking-wider uppercase rounded-xl shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-2 border border-red-400/50"
              >
                <CheckCircle2 className="w-6 h-6 text-amber-300" />
                <span>I HAVE PAID VIA QR — GENERATE MY TICKET (₹{subtotal})</span>
              </button>

            </form>
          ) : (
            /* DIGITAL SEMINAR PASS */
            <div className="space-y-5">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  UPI PAYMENT VERIFIED • SEAT CONFIRMED
                </div>
                <h3 className="font-teko text-4xl font-black text-white uppercase">
                  YOU HAVE ACCESS TO THE SEMINAR HALL
                </h3>
              </div>

              {/* Seminar Pass Canvas */}
              <div className="relative rounded-2xl bg-gradient-to-r from-zinc-950 via-red-950/70 to-zinc-950 border-2 border-amber-500/80 p-6 shadow-2xl text-white overflow-hidden">
                <div className="flex justify-between items-start pb-3 border-b border-white/10 gap-2">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold block">
                      SCHOOL OF ELECTRICAL • LUNCH BREAK BRAWL
                    </span>
                    <h4 className="font-teko text-3xl font-black text-white leading-none">
                      ARMAN (6'7") VS SRICHANDAN (4'0")
                    </h4>
                  </div>
                  <div className="bg-amber-500 text-black font-teko text-xl px-3 py-0.5 rounded font-bold">
                    {bookedTicket.tierName}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 text-xs font-mono border-b border-white/10">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">STUDENT NAME</span>
                    <span className="text-white font-bold">{bookedTicket.holderName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">SEAT NUMBER</span>
                    <span className="text-amber-300 font-bold">{bookedTicket.seatLocation}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">DATE & TIME</span>
                    <span className="text-white font-bold">9TH NOV, 2026 • 1:00 PM</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">DEVELOPER & MATCHMAKER</span>
                    <span className="text-red-400 font-bold">{bookedTicket.developer}</span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>PASS ID: {bookedTicket.ticketNumber}</span>
                  <span className="text-amber-400 font-bold">PAID VIA PHONEPE UPI (₹{bookedTicket.totalPaid})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    window.print();
                  }}
                  className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-barlow font-bold text-sm uppercase rounded-xl border border-zinc-700 transition-all flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>PRINT PASS</span>
                </button>
                <button
                  onClick={resetAndClose}
                  className="flex-1 py-3 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 text-white font-barlow font-bold text-sm uppercase rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>DONE & BACK TO FIGHT</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
