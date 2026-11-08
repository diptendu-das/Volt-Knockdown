import React, { useState } from 'react';
import { Volume2, VolumeX, Flame, Ticket, DollarSign, Swords, ShieldAlert, Sparkles, RotateCcw, Zap } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { EVENT_DETAILS } from '../data/fightData';

export default function Navbar({ bankroll, onResetBankroll, onOpenTickets, onOpenBets, activeBetsCount }) {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFX.playClick();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#08080c]/95 backdrop-blur-md border-b border-red-900/40">
      {/* Top Banner Marquee */}
      <div className="bg-gradient-to-r from-red-950 via-zinc-950 to-amber-950 text-xs py-1 px-4 border-b border-white/5 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            PRESENTED BY SCHOOL OF ELECTRICAL
          </span>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="text-zinc-300 font-barlow tracking-wider hidden md:inline">
            SEMINAR HALL • 9TH NOV @ 1:00 PM • DEV: {EVENT_DETAILS.developerName.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-black/70 px-2.5 py-0.5 rounded border border-amber-500/30 text-amber-400">
            <span className="text-zinc-400 font-sans text-[11px]">WALLET:</span>
            <span className="font-bold text-amber-300">₹{bankroll.toLocaleString()}</span>
            <button
              onClick={() => { soundFX.playCash(); onResetBankroll(); }}
              title="Reset Wallet to ₹1,000"
              className="ml-1 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-zinc-500 hover:text-amber-400" />
            </button>
          </div>

          <button 
            onClick={toggleSound}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded border transition-colors ${
              isMuted 
                ? 'border-zinc-700 text-zinc-500 hover:text-zinc-300' 
                : 'border-red-600/40 text-red-400 hover:bg-red-950/40'
            }`}
            title="Toggle Sound Effects"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
            <span className="text-[11px] font-sans font-semibold tracking-wider">
              {isMuted ? 'FX OFF' : 'FX ON'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 bg-gradient-to-br from-red-600 to-amber-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform shadow-[0_0_20px_rgba(220,38,38,0.6)]">
            <Zap className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-300 rounded-full animate-ping"></div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-teko text-2xl sm:text-3xl font-black tracking-wider text-white leading-none">
                LUNCH BREAK
              </span>
              <span className="font-teko text-2xl sm:text-3xl font-black tracking-wider text-red-500 leading-none">
                BRAWL
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase -mt-0.5">
              ARMAN (6'7") VS SRICHANDAN (4'0")
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <a 
            href="#main-event" 
            onClick={() => soundFX.playClick()}
            className="font-barlow text-sm uppercase tracking-widest font-bold text-zinc-300 hover:text-red-400 transition-colors"
          >
            The Matchup
          </a>
          <a 
            href="#tale-of-the-tape" 
            onClick={() => soundFX.playClick()}
            className="font-barlow text-sm uppercase tracking-widest font-bold text-zinc-300 hover:text-red-400 transition-colors"
          >
            6'7" vs 4'0" Stats
          </a>
          <a 
            href="#tickets" 
            onClick={() => soundFX.playClick()}
            className="font-barlow text-sm uppercase tracking-widest font-bold text-zinc-300 hover:text-red-400 transition-colors"
          >
            Seminar Tickets
          </a>
          <a 
            href="#betting" 
            onClick={() => soundFX.playClick()}
            className="font-barlow text-sm uppercase tracking-widest font-bold text-zinc-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <span>Banter Bets (UPI QR)</span>
            {activeBetsCount > 0 && (
              <span className="bg-amber-500 text-black text-[10px] font-extrabold px-1.5 py-0.2 rounded-full font-mono">
                {activeBetsCount}
              </span>
            )}
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Bet Slip Launcher */}
          <button
            onClick={() => { soundFX.playClick(); onOpenBets(); }}
            className="relative hidden sm:flex items-center gap-2 px-3.5 py-2 bg-zinc-900 border border-amber-500/50 hover:border-amber-400 text-amber-300 rounded-lg font-barlow font-bold text-xs uppercase tracking-wider transition-all hover:bg-zinc-800"
          >
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>Betslip</span>
            {activeBetsCount > 0 && (
              <span className="bg-amber-500 text-black font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                {activeBetsCount}
              </span>
            )}
          </button>

          {/* Book Tickets Direct CTA */}
          <button
            onClick={() => { soundFX.playBell(); onOpenTickets(); }}
            className="relative group overflow-hidden px-2.5 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 text-white font-teko text-sm sm:text-xl tracking-wider uppercase rounded-lg sm:rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.5)] transform active:scale-95 transition-all flex items-center gap-1.5 sm:gap-2 border border-red-400/50 shrink-0"
          >
            <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            <span className="hidden sm:inline">BOOK TICKET (UPI QR)</span>
            <span className="sm:hidden font-bold">TICKETS</span>
          </button>
        </div>
      </div>
    </header>
  );
}
