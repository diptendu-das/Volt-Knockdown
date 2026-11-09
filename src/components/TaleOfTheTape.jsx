import React, { useState } from 'react';
import { Swords, Shield, Zap, Skull, Flame, Target, Award, CheckCircle2 } from 'lucide-react';
import { FIGHTERS, EVENT_DETAILS } from '../data/fightData';
import { soundFX } from '../utils/audio';

export default function TaleOfTheTape({ onSelectFighterBet, onOpenBets }) {
  const [activeFighter, setActiveFighter] = useState('arman');

  const statComparisons = [
    { label: 'HEIGHT & FRAME', red: 99, blue: 10, note: "Arman is 6'7\" — Srichandan is 4'0\" (looks up like looking at a skyscraper)" },
    { label: 'STRIKING POWER', red: 99, blue: 12, note: "Arman's right hand can short-circuit the entire Seminar Hall power supply" },
    { label: 'REACH ADVANTAGE', red: 100, blue: 18, note: "Arman has 86\" reach — can hit Srichandan without stepping off the podium" },
    { label: 'CHIN DURABILITY', red: 99, blue: 15, note: "Srichandan's chin taps out if someone coughs loudly near his ear" },
    { label: 'CANTEEN POWER', red: 100, blue: 25, note: "Arman consumes 6 samosas daily for maximum heavyweight mass" },
    { label: 'SPRINTING & EVASION', red: 72, blue: 99, note: "Srichandan's only hope is sprinting out the door into the Electrical corridor" },
  ];

  const physicalMetrics = [
    { label: 'OFFICIAL RECORD', red: FIGHTERS.red.record, blue: FIGHTERS.blue.record, advantage: 'red' },
    { label: 'HEIGHT', red: "6'7\" (201 cm)", blue: "4'0\" (122 cm)", advantage: 'red' },
    { label: 'ARM REACH', red: "86.0\" (Desk to Desk)", blue: "34.0\" (Mini)", advantage: 'red' },
    { label: 'WEIGHT', red: FIGHTERS.red.weight, blue: FIGHTERS.blue.weight, advantage: 'red' },
    { label: 'KNOCKOUT RATE', red: "97.9% (47 KOs)", blue: "0.0% (Zero)", advantage: 'red' },
    { label: 'FIGHTING STANCE', red: "Towering Over Him", blue: "Ready to Flee", advantage: 'red' },
    { label: 'VIVA PREPARATION', red: "Done Last Week", blue: "Crying Right Now", advantage: 'red' },
  ];

  const fighter = activeFighter === 'arman' ? FIGHTERS.red : FIGHTERS.blue;

  return (
    <section id="tale-of-the-tape" className="relative py-20 bg-[#09090e] border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-red-500/30 text-zinc-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Swords className="w-3.5 h-3.5 text-amber-500" />
            <span>TALE OF THE TAPE • THE 6'7" VS 4'0" MISMATCH</span>
          </div>
          <h2 className="font-teko text-5xl sm:text-7xl font-black tracking-tight uppercase text-white leading-none">
            TALE OF THE <span className="text-red-500">TAPE</span>
          </h2>
          <p className="font-barlow text-lg text-zinc-400 mt-2">
            The School of Electrical's biggest statistical mismatch. Compare 6'7" Arman's crushing stats vs 5'4" Srichandan's survival chances.
          </p>
        </div>

        {/* Physical Comparison Matrix */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl mb-14">
          <div className="grid grid-cols-3 bg-zinc-900/90 p-4 border-b border-zinc-800 text-center font-teko text-2xl tracking-wider">
            <div className="text-red-500 flex items-center justify-center gap-2">
              <span>ARMAN (6'7")</span>
              <span className="text-xs font-mono text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-800">
                FAVORITE
              </span>
            </div>
            <div className="text-zinc-400 text-sm font-mono uppercase tracking-widest my-auto">
              STAT METRIC
            </div>
            <div className="text-sky-400 flex items-center justify-center gap-2">
              <span className="text-xs font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                +{FIGHTERS.blue.odds.moneyline}
              </span>
              <span>SRICHANDAN (5'4")</span>
            </div>
          </div>

          <div className="divide-y divide-zinc-900">
            {physicalMetrics.map((m, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 p-4 items-center hover:bg-zinc-900/40 transition-colors text-center"
              >
                {/* Arman Value */}
                <div className="font-mono text-sm sm:text-base font-extrabold text-red-400">
                  {m.red}
                  <span className="ml-1 text-[10px] text-amber-400 font-mono">▲ TITAN</span>
                </div>

                {/* Metric Name */}
                <div className="text-zinc-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  {m.label}
                </div>

                {/* Srichandan Value */}
                <div className="font-mono text-sm sm:text-base font-bold text-sky-300">
                  {m.blue}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STAT COMPARISON BARS */}
        <div className="bg-gradient-to-b from-zinc-950 to-black border border-white/10 rounded-2xl p-6 sm:p-10 mb-14 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-zinc-800 gap-4">
            <div>
              <h3 className="font-teko text-3xl sm:text-4xl font-bold tracking-wider text-white">
                COMBAT ATTRIBUTE METERS (1-100)
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Verified by Electrical Block Sensors & Canteen Table Weigh-In
              </p>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs">
              <span className="flex items-center gap-2 text-red-400 font-bold">
                <span className="w-3 h-3 bg-red-600 rounded"></span> ARMAN (6'7")
              </span>
              <span className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="w-3 h-3 bg-sky-500 rounded"></span> SRICHANDAN (5'4")
              </span>
            </div>
          </div>

          <div className="space-y-6 mt-8">
            {statComparisons.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-red-400 text-sm">{stat.red}</span>
                  <span className="text-zinc-300 font-bold uppercase tracking-wider font-barlow text-sm">{stat.label}</span>
                  <span className="font-bold text-sky-400 text-sm">{stat.blue}</span>
                </div>

                {/* Comparative progress bar */}
                <div className="grid grid-cols-2 gap-2 h-3.5 bg-zinc-900 rounded-full p-0.5 border border-zinc-800 overflow-hidden">
                  <div className="flex justify-end">
                    <div
                      className="h-full bg-gradient-to-l from-red-600 to-rose-700 rounded-l-full transition-all duration-1000 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                      style={{ width: `${stat.red}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-start">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-r-full transition-all duration-1000 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                      style={{ width: `${stat.blue}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center text-[11px] text-zinc-500 font-mono">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INDIVIDUAL FIGHTER DOSSIER */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-2 sm:gap-4 mb-8">
            <button
              onClick={() => { soundFX.playClick(); setActiveFighter('arman'); }}
              className={`px-2 sm:px-6 py-2 sm:py-2.5 rounded-xl font-teko text-base sm:text-2xl tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${activeFighter === 'arman'
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
            >
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              <span>ARMAN (6'7")</span>
            </button>

            <button
              onClick={() => { soundFX.playClick(); setActiveFighter('srichandan'); }}
              className={`px-2 sm:px-6 py-2 sm:py-2.5 rounded-xl font-teko text-base sm:text-2xl tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${activeFighter === 'srichandan'
                  ? 'bg-sky-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.6)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              <span>SRICHANDAN (5'4")</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Fighter Info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-block font-mono text-xs px-3 py-1 rounded bg-black/60 border border-white/10 text-amber-400">
                TRAINING CAMP: {fighter.trainingCamp}
              </div>

              <h4 className="font-teko text-4xl font-black text-white leading-none">
                {fighter.firstName} "{fighter.nickname}" {fighter.lastName}
              </h4>

              {/* Quote */}
              <blockquote className="p-4 rounded-xl bg-zinc-900/80 border-l-4 border-amber-500 text-sm font-sans italic text-zinc-200">
                "{fighter.quote}"
              </blockquote>

              <div className="text-sm text-zinc-400 leading-relaxed">
                {fighter.fightingStyle}. Signature battle weapon:{' '}
                <span className="text-white font-bold">{fighter.signatureMove}</span>.
              </div>

              {/* Strengths list */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
                  SEMINAR HALL ATTRIBUTES:
                </div>
                {fighter.strengths.map((str, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-sans text-zinc-300">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeFighter === 'arman' ? 'text-red-500' : 'text-sky-400'
                      }`} />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Fights History */}
            <div className="lg:col-span-6 bg-zinc-900/50 rounded-xl p-5 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-bold">
                  RECENT CAMPUS RECORDS
                </span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${activeFighter === 'arman'
                    ? 'text-emerald-400 bg-emerald-950 border-emerald-800'
                    : 'text-amber-400 bg-amber-950 border-amber-800'
                  }`}>
                  {activeFighter === 'arman' ? '48-0 UNDEFEATED' : '0-47 SURVIVOR'}
                </span>
              </div>

              <div className="space-y-3">
                {fighter.recentFights.map((fight, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-black/60 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-zinc-500">{fight.event} • {fight.title}</div>
                      <div className="text-sm font-bold text-white mt-0.5">{fight.opponent}</div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-mono font-bold block ${fight.result.includes('WIN') ? 'text-emerald-400' : fight.result.includes('DRAW') ? 'text-amber-400' : 'text-red-400'
                        }`}>
                        {fight.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bet Button */}
              <button
                onClick={() => {
                  soundFX.playCash();
                  onSelectFighterBet({
                    id: `ml-${fighter.id}`,
                    name: `${fighter.firstName} '${fighter.nickname}' ${fighter.lastName}`,
                    odds: fighter.odds.moneyline,
                    decimal: fighter.odds.decimal,
                    category: 'Match Winner (Moneyline)'
                  });
                  onOpenBets();
                }}
                className={`w-full mt-5 py-3 rounded-xl font-teko text-xl tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${activeFighter === 'arman'
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.4)]'
                  }`}
              >
                <Award className="w-5 h-5 text-amber-300" />
                <span>BET ON {fighter.lastName} ({fighter.odds.moneyline > 0 ? `+${fighter.odds.moneyline}` : fighter.odds.moneyline})</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
