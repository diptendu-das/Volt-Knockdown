import React from 'react';
import { Swords, Flame, Trophy, Shield } from 'lucide-react';
import { UNDERCARD_FIGHTS } from '../data/fightData';
import { soundFX } from '../utils/audio';

export default function Undercard({ onSelectFighterBet, onOpenBets }) {
  return (
    <section id="undercard" className="relative py-20 bg-[#07070a] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-white/10 text-zinc-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>FULL 10-BOUT PAY-PER-VIEW UNDERCARD</span>
          </div>
          <h2 className="font-teko text-5xl sm:text-7xl font-black tracking-tight uppercase text-white leading-none">
            THE STACKED <span className="text-red-500">FIGHT CARD</span>
          </h2>
          <p className="font-barlow text-lg text-zinc-400 mt-2">
            Every match is a war. 3 Championship belts on the line before the Main Event walkouts.
          </p>
        </div>

        {/* Fight Cards Grid */}
        <div className="space-y-6">
          {UNDERCARD_FIGHTS.map((fight) => (
            <div 
              key={fight.id} 
              className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 hover:border-zinc-700 transition-all shadow-xl group"
            >
              {/* Division & Rounds Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/5 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {fight.division}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                  <span className="bg-zinc-900 px-2 py-0.5 rounded border border-white/10 font-bold text-white">
                    {fight.weightClass}
                  </span>
                  <span>{fight.status}</span>
                </div>
              </div>

              {/* Fighter Matchup Display */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6">
                {/* Fighter 1 */}
                <div className="md:col-span-5 flex items-center justify-between bg-zinc-900/60 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{fight.f1.flag}</span>
                    <div>
                      <h4 className="font-teko text-2xl font-bold text-white leading-tight">
                        {fight.f1.name}
                      </h4>
                      <span className="text-xs font-mono text-zinc-400">
                        "{fight.f1.nickname}" • {fight.f1.record}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundFX.playCash();
                      onSelectFighterBet({
                        id: `uc-${fight.id}-f1`,
                        name: fight.f1.name,
                        odds: parseInt(fight.f1.odds),
                        decimal: 1.85,
                        market: fight.division,
                        fighter: 'red'
                      });
                      onOpenBets();
                    }}
                    className="font-mono text-xs font-bold px-3 py-1 rounded bg-black/80 text-amber-400 border border-amber-500/30 hover:border-amber-400"
                  >
                    {fight.f1.odds}
                  </button>
                </div>

                {/* Center VS */}
                <div className="md:col-span-2 text-center">
                  <span className="font-teko text-3xl font-black italic text-zinc-500 group-hover:text-red-500 transition-colors">
                    VS
                  </span>
                </div>

                {/* Fighter 2 */}
                <div className="md:col-span-5 flex items-center justify-between bg-zinc-900/60 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{fight.f2.flag}</span>
                    <div>
                      <h4 className="font-teko text-2xl font-bold text-white leading-tight">
                        {fight.f2.name}
                      </h4>
                      <span className="text-xs font-mono text-zinc-400">
                        "{fight.f2.nickname}" • {fight.f2.record}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundFX.playCash();
                      onSelectFighterBet({
                        id: `uc-${fight.id}-f2`,
                        name: fight.f2.name,
                        odds: parseInt(fight.f2.odds),
                        decimal: 2.15,
                        market: fight.division,
                        fighter: 'blue'
                      });
                      onOpenBets();
                    }}
                    className="font-mono text-xs font-bold px-3 py-1 rounded bg-black/80 text-amber-400 border border-amber-500/30 hover:border-amber-400"
                  >
                    {fight.f2.odds}
                  </button>
                </div>
              </div>

              {/* Hype Synopsis */}
              <div className="text-xs text-zinc-400 font-sans border-t border-white/5 pt-3">
                <span className="text-zinc-500 font-mono uppercase font-bold">MATCH INTEL: </span>
                {fight.hype}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

