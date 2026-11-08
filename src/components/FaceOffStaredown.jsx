import React, { useState } from 'react';
import { Flame, Zap, ShieldAlert, Sparkles, Volume2, AlertTriangle, Eye } from 'lucide-react';
import { FIGHTERS } from '../data/fightData';
import { soundFX } from '../utils/audio';

export default function FaceOffStaredown() {
  const [tension, setTension] = useState(50); // 0 to 100
  const [brawlTriggered, setBrawlTriggered] = useState(false);

  // Stare-down intensity levels
  const getIntensityLevel = () => {
    if (tension < 30) return { label: 'COLD CLASSROOM STARE', color: 'text-zinc-400', badge: 'bg-zinc-800' };
    if (tension < 70) return { label: 'HIGH VOLTAGE BANTER', color: 'text-amber-400', badge: 'bg-amber-950 border-amber-600' };
    if (tension < 95) return { label: 'ARMAN LOOKING DOWN FROM 6\'7"', color: 'text-red-500', badge: 'bg-red-950 border-red-600 animate-pulse' };
    return { label: 'SRICHANDAN RUNNING FOR THE EXIT!', color: 'text-red-400', badge: 'bg-red-600 text-white animate-bounce' };
  };

  const level = getIntensityLevel();

  // Offset distance based on tension
  const redOffset = (tension / 100) * 110;
  const blueOffset = (tension / 100) * 110;

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setTension(val);

    if (val >= 98 && !brawlTriggered) {
      setBrawlTriggered(true);
      soundFX.playImpact();
      setTimeout(() => soundFX.playBell(), 150);
    } else if (val < 90) {
      setBrawlTriggered(false);
    }
  };

  const triggerMaxTension = () => {
    setTension(100);
    setBrawlTriggered(true);
    soundFX.playImpact();
    setTimeout(() => soundFX.playBell(), 200);
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#07070a] via-black to-[#09090e] border-t border-red-900/40 overflow-hidden">
      
      {tension >= 95 && (
        <div className="absolute inset-0 bg-red-600/10 pointer-events-none animate-pulse"></div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>INTERACTIVE WEIGH-IN STARE-DOWN (6'7" VS 4'0")</span>
          </div>
          <h2 className="font-teko text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            EYE TO <span className="text-red-500">CHEST</span>
          </h2>
          <p className="font-barlow text-lg text-zinc-400 mt-2">
            Because at 4'0", Srichandan cannot reach Arman's eye level! Drag the tension slider to close the distance.
          </p>
        </div>

        {/* The Staredown Arena Box */}
        <div className="relative rounded-2xl bg-zinc-950 border-2 border-zinc-800 p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-between">
          
          {/* Tension Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-zinc-800 gap-4">
            <div className="flex items-center gap-3">
              <span className={`font-teko text-2xl font-bold tracking-wider px-3 py-1 rounded border ${level.badge}`}>
                {level.label}
              </span>
            </div>
            <div className="font-mono text-sm text-zinc-400 flex items-center gap-2">
              <span>HOSTEL TENSION METER:</span>
              <span className="font-teko text-3xl font-black text-amber-400 leading-none">
                {tension}%
              </span>
            </div>
          </div>

          {/* Visual Stare-down Stage */}
          <div className="relative py-12 flex items-center justify-center overflow-hidden">
            
            {tension > 85 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="w-24 h-24 rounded-full bg-amber-400/30 blur-xl animate-ping"></div>
                <div className="text-center font-teko text-4xl font-black text-amber-400 tracking-wider animate-bounce">
                  ⚡ FLASHPOINT ⚡
                </div>
              </div>
            )}

            {/* Arman 6'7" Heavyweight */}
            <div 
              className="flex flex-col items-center transition-transform duration-200 z-10"
              style={{ transform: `translateX(${redOffset}px)` }}
            >
              <div className="relative group flex flex-col items-center">
                <div className={`w-36 h-36 sm:w-48 sm:h-48 rounded-2xl border-4 overflow-hidden shadow-2xl ${
                  tension > 80 ? 'border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.8)]' : 'border-red-900/60'
                }`}>
                  <img 
                    src="./arman.jpg" 
                    alt="Arman" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="mt-2 text-center">
                  <span className="font-teko text-3xl font-black text-red-500 block leading-tight">ARMAN</span>
                  <span className="font-mono text-[11px] text-zinc-300 font-bold bg-black/80 px-2 py-0.5 rounded border border-red-500/40">
                    6'7" (201 CM) • 235 LBS
                  </span>
                </div>
              </div>
            </div>

            {/* Srichandan 4'0" Underdog */}
            <div 
              className="flex flex-col items-center transition-transform duration-200 z-10"
              style={{ transform: `translateX(-${blueOffset}px)` }}
            >
              <div className="relative group flex flex-col items-center">
                {/* Scaled down to show 4-foot height difference */}
                <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 flex flex-col items-center justify-center bg-gradient-to-br from-sky-950 to-black ${
                  tension > 80 ? 'border-sky-400 shadow-[0_0_35px_rgba(56,189,248,0.8)]' : 'border-sky-900/60'
                }`}>
                  <span className="text-4xl animate-bounce">🧎‍♂️</span>
                </div>
                <div className="mt-2 text-center">
                  <span className="font-teko text-2xl font-black text-sky-400 block leading-tight">SRICHANDAN</span>
                  <span className="font-mono text-[10px] text-zinc-300 font-bold bg-black/80 px-2 py-0.5 rounded border border-sky-500/40">
                    4'0" (122 CM) • 84 LBS
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Tension Slider Control */}
          <div className="pt-6 border-t border-zinc-800 space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-500">SAFE DISTANCE (0%)</span>
              <span className="text-amber-400 font-bold uppercase font-barlow text-sm">
                DRAG SLIDER TO CLOSE DISTANCE
              </span>
              <span className="text-red-500 font-bold">CHAOTIC BRAWL (100%)</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={tension}
              onChange={handleSliderChange}
              className="w-full h-3 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-500"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-zinc-400 italic">
                {tension < 50
                  ? "Srichandan is standing behind the front desk looking nervous."
                  : tension < 85
                  ? "Arman reaches out his 86\" arm; Srichandan is asking for a timeout to study for viva."
                  : "🔥 POINT BLANK! Arman is about to lift Srichandan up by his collar!"}
              </p>

              <button
                onClick={triggerMaxTension}
                className="w-full sm:w-auto px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white font-teko text-base sm:text-lg tracking-wider uppercase rounded-lg border border-red-400 transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] flex items-center justify-center gap-1.5"
              >
                <span>💥 TRIGGER MAXIMUM CHAOS</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
