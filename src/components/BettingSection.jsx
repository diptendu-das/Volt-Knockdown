import React, { useState } from 'react';
import { DollarSign, Flame, Zap, Trophy, ShieldAlert, ArrowRight, CheckCircle2, TrendingUp, Smartphone } from 'lucide-react';
import { BETTING_MARKETS, FIGHTERS } from '../data/fightData';
import { soundFX } from '../utils/audio';

export default function BettingSection({ onAddToBetSlip, selectedBetIds, onOpenBets }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Main', 'Specials', 'Rounds', 'Props'];

  const filteredMarkets = activeCategory === 'All'
    ? BETTING_MARKETS
    : BETTING_MARKETS.filter(m => m.category === activeCategory);

  return (
    <section id="betting" className="relative py-20 bg-[#09090e] border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-mono tracking-widest uppercase mb-3">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>SCHOOL OF ELECTRICAL SPORTSBOOK • UPI PHONEPE QR VERIFIED</span>
          </div>
          <h2 className="font-teko text-5xl sm:text-7xl font-black tracking-tight uppercase text-white leading-none">
            BET ON THE <span className="text-amber-400">BANTER</span>
          </h2>
          <p className="font-barlow text-lg text-zinc-400 mt-2">
            Will 6'7" Arman finish the fight in 30 seconds, or will Srichandan miraculously escape into the corridor? Wager via PhonePe QR!
          </p>
        </div>

        {/* Featured Moneyline Head-to-Head Banner */}
        <div className="bg-gradient-to-r from-red-950/80 via-black to-sky-950/80 border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-mono text-amber-400 tracking-wider uppercase font-bold block">
                MAIN EVENT MONEYLINE ODDS
              </span>
              <h3 className="font-teko text-3xl sm:text-4xl font-bold text-white uppercase">
                WHO SURVIVES THE 1:00 PM LUNCH BREAK?
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-white/10 text-zinc-300">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Hostel Consensus: 95% Arman • 5% Srichandan</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Arman Moneyline Card */}
            <div 
              onClick={() => {
                soundFX.playCash();
                onAddToBetSlip({
                  id: 'ml-arman',
                  name: "Arman (The 6'7\" Behemoth)",
                  odds: FIGHTERS.red.odds.moneyline,
                  decimal: FIGHTERS.red.odds.decimal,
                  market: 'Match Winner (Moneyline)',
                  fighter: 'arman'
                });
              }}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selectedBetIds.includes('ml-arman')
                  ? 'bg-red-950/80 border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.5)] scale-[1.01]'
                  : 'bg-zinc-950/80 border-red-900/60 hover:border-red-500 hover:bg-zinc-900/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-red-400 font-bold uppercase block">
                    RED CORNER • 6'7" TITAN
                  </span>
                  <h4 className="font-teko text-3xl sm:text-4xl font-black text-white">
                    ARMAN "CHAMP-ISH"
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans">
                    48-0-0 • 47 KOs • 86" Reach • Heavyweight Champion
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-zinc-500">ODDS</div>
                  <div className="font-teko text-4xl font-black text-red-400 leading-none">
                    -1500
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    ×1.07 (Safe Money)
                  </div>
                </div>
              </div>
            </div>

            {/* Srichandan Moneyline Card */}
            <div 
              onClick={() => {
                soundFX.playCash();
                onAddToBetSlip({
                  id: 'ml-srichandan',
                  name: "Srichandan (The 4-Foot Dynamo)",
                  odds: FIGHTERS.blue.odds.moneyline,
                  decimal: FIGHTERS.blue.odds.decimal,
                  market: 'Match Winner (Moneyline)',
                  fighter: 'srichandan'
                });
              }}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selectedBetIds.includes('ml-srichandan')
                  ? 'bg-sky-950/80 border-sky-500 shadow-[0_0_25px_rgba(14,165,233,0.5)] scale-[1.01]'
                  : 'bg-zinc-950/80 border-sky-900/60 hover:border-sky-500 hover:bg-zinc-900/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-sky-400 font-bold uppercase block">
                    BLUE CORNER • 4'0" UNDERDOG
                  </span>
                  <h4 className="font-teko text-3xl sm:text-4xl font-black text-white">
                    SRICHANDAN "SPEEDY"
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans">
                    5-14-1 • 4 KOs • 38" Reach • Counter Specialist • High Speed Agility
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-zinc-500">JACKPOT ODDS</div>
                  <div className="font-teko text-4xl font-black text-amber-400 leading-none">
                    +{FIGHTERS.blue.odds.moneyline}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    ×{FIGHTERS.blue.odds.decimal} (Surprise Win)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { soundFX.playClick(); setActiveCategory(cat); }}
              className={`px-5 py-2 rounded-xl font-barlow text-sm uppercase tracking-wider font-bold transition-all shrink-0 ${
                activeCategory === cat
                  ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat === 'All' ? 'ALL BETTING MARKETS' : cat}
            </button>
          ))}
        </div>

        {/* Markets Grid */}
        <div className="space-y-8">
          {filteredMarkets.map((market) => (
            <div key={market.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
                <h4 className="font-teko text-2xl sm:text-3xl font-bold tracking-wider text-white">
                  {market.title}
                </h4>
                <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-white/5">
                  {market.options.length} OPTIONS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {market.options.map((opt) => {
                  const isSelected = selectedBetIds.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        soundFX.playCash();
                        onAddToBetSlip({
                          id: opt.id,
                          name: opt.name,
                          odds: opt.odds,
                          decimal: opt.decimal,
                          market: market.title,
                          fighter: opt.fighter
                        });
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-950/60 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-[1.01]'
                          : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-600 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="pr-3">
                        <span className={`text-xs font-bold block leading-tight ${
                          opt.fighter === 'arman' ? 'text-red-400' : opt.fighter === 'srichandan' ? 'text-sky-400' : 'text-zinc-200'
                        }`}>
                          {opt.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          Multiplier: ×{opt.decimal}
                        </span>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className={`font-mono text-sm font-black px-2.5 py-1 rounded border block ${
                          isSelected 
                            ? 'bg-amber-500 text-black border-amber-400 font-extrabold'
                            : 'bg-black/60 border-white/10 text-amber-400'
                        }`}>
                          {opt.odds > 0 ? `+${opt.odds}` : opt.odds}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to open Betslip */}
        <div className="mt-12 text-center">
          <button
            onClick={() => { soundFX.playClick(); onOpenBets(); }}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black font-teko text-2xl tracking-wider uppercase rounded-xl font-bold shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all inline-flex items-center gap-2"
          >
            <Smartphone className="w-5 h-5" />
            <span>OPEN BETSLIP & PAY VIA PHONEPE QR</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
