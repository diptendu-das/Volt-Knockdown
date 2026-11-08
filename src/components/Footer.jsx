import React from 'react';
import { Swords, ShieldAlert, Award, ShieldCheck, Ticket, Zap, Heart, Code2 } from 'lucide-react';
import { EVENT_DETAILS } from '../data/fightData';
import { soundFX } from '../utils/audio';

export default function Footer({ onOpenTickets, onOpenBets }) {
  return (
    <footer className="bg-black border-t-2 border-red-900/60 text-zinc-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Call-Out */}
        <div className="bg-gradient-to-r from-red-950/70 via-zinc-950 to-amber-950/70 border-2 border-amber-500/40 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>PRESENTED BY SCHOOL OF ELECTRICAL • OFFICIAL BANTER SHOWDOWN</span>
            </div>
            <h3 className="font-teko text-4xl sm:text-5xl font-black text-white uppercase leading-none mt-1">
              VOLT-KNOCKOUT: THE LUNCH BREAK BRAWL
            </h3>
            <p className="text-sm text-zinc-300 font-sans mt-1">
              6'7" Arman vs 4'0" Srichandan. 9th Nov, 2026 at 1:00 PM in Seminar Hall. Don't miss the banter.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { soundFX.playBell(); onOpenTickets(); }}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-teko text-xl tracking-wider uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-400/40"
            >
              BOOK SEMINAR SEAT (UPI QR)
            </button>
            <button
              onClick={() => { soundFX.playClick(); onOpenBets(); }}
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/50 font-teko text-xl tracking-wider uppercase rounded-xl transition-all"
            >
              BET ON THE CLASH
            </button>
          </div>
        </div>

        {/* Developer Credit Banner */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 border border-red-600 text-red-400 text-xs font-mono font-bold tracking-widest uppercase mb-2">
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>CHIEF ENGINEER & MATCHMAKER</span>
          </div>
          <h4 className="font-teko text-3xl font-black text-white uppercase tracking-wider">
            DESIGNED & DEVELOPED BY <span className="text-amber-400">{EVENT_DETAILS.developerName.toUpperCase()}</span>
          </h4>
          <p className="text-xs text-zinc-400 font-sans max-w-lg mx-auto mt-1">
            Engineered with high voltage React code, Web Audio API sound effects, and 100% pure college hostel banter for the School of Electrical.
          </p>
        </div>

        {/* Official Sanctioning & Partners */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-zinc-900 text-center font-mono text-xs">
          <div className="p-3 rounded-xl bg-zinc-950 border border-white/5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <span className="text-white font-bold block">SCHOOL OF ELECTRICAL</span>
            <span className="text-[10px] text-zinc-500">Official Sanctioning</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950 border border-white/5">
            <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <span className="text-white font-bold block">SEMINAR HALL ARENA</span>
            <span className="text-[10px] text-zinc-500">1:00 PM Sharp</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950 border border-white/5">
            <Ticket className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <span className="text-white font-bold block">PHONEPE UPI ESCROW</span>
            <span className="text-[10px] text-zinc-500">Instant Verification</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950 border border-white/5">
            <ShieldAlert className="w-5 h-5 text-sky-400 mx-auto mb-1" />
            <span className="text-white font-bold block">VIVA PROTECTION</span>
            <span className="text-[10px] text-zinc-500">Save Srichandan at 2 PM</span>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 font-sans gap-4">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-red-500" />
            <span>© 2026 Volt-Knockout. Created by Diptendu Das for Arman vs Srichandan. All Banter Reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span className="text-zinc-400">NO LAB COATS WERE HARMED</span>
            <span className="text-zinc-400">SAMOSA PROTOCOL COMPLIANT</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
