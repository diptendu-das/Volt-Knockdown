import React, { useState } from 'react';
import { Volume2, Sparkles, MessageCircle, Share2, HelpCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function BanterSoundboard() {
  const [playingId, setPlayingId] = useState(null);
  const [activeExcuse, setActiveExcuse] = useState(null);
  const [copiedShare, setCopiedShare] = useState(false);

  const funnyExcuses = [
    "Sir please, my AC Machines practical viva is at 2:00 PM. Don't hit my glasses!",
    "Arman took my assignment notebook hostage, I had no choice!",
    "I was only 4 feet tall when I entered the Seminar Hall, now I'm 3'10\" from fear!",
    "I'm not running away from Arman, I'm just testing my kinetic acceleration!",
    "Someone tell the HOD that Arman is using unauthorized 3-phase high voltage punches!"
  ];

  const playBanterSound = (id, type) => {
    setPlayingId(id);
    if (type === 'bell') soundFX.playBell();
    else if (type === 'impact') soundFX.playImpact();
    else if (type === 'cash') soundFX.playCash();
    else soundFX.playClick();

    setTimeout(() => setPlayingId(null), 600);
  };

  const spinExcuseWheel = () => {
    soundFX.playClick();
    const random = funnyExcuses[Math.floor(Math.random() * funnyExcuses.length)];
    setActiveExcuse(random);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🔥 *THE LUNCH BREAK BRAWL IS OFFICIAL!* 🔥\n\n` +
      `🥊 *6'7" Behemoth Arman (48-0)* vs *4'0" Sparky Srichandan (0-47)*\n` +
      `📍 *Venue:* Seminar Hall (Electrical Block)\n` +
      `⏰ *Time:* Monday, 9th Nov 2026 @ 1:00 PM Sharp (Lunch Break)\n` +
      `⚡ *Engineered by:* Diptendu Das\n\n` +
      `Book your Front Row seat or bet on Srichandan's escape via PhonePe UPI QR!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    soundFX.playCash();
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#09090e] to-black border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-400 text-xs font-mono tracking-widest uppercase mb-2">
            <Volume2 className="w-3.5 h-3.5" />
            <span>CAMPUS AUDIO & WHATSAPP HYPE CENTRAL</span>
          </div>
          <h3 className="font-teko text-4xl sm:text-6xl font-black text-white uppercase leading-none">
            SEMINAR HALL <span className="text-amber-400">SOUNDBOARD</span> & BANTER
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
            Tap sounds to test the Seminar Hall acoustics, generate Srichandan's viva excuses, or broadcast to your college group!
          </p>
        </div>

        {/* Grid of Soundboard Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10">
          <button
            onClick={() => playBanterSound(1, 'bell')}
            className={`p-2.5 sm:p-4 rounded-xl border text-center transition-all ${
              playingId === 1 
                ? 'bg-amber-500 text-black border-amber-400 scale-95' 
                : 'bg-zinc-950 border-zinc-800 hover:border-amber-500/60 text-white'
            }`}
          >
            <span className="text-2xl sm:text-3xl block mb-1">🔔</span>
            <span className="font-teko text-base sm:text-xl font-bold tracking-wider uppercase block leading-tight">
              1:00 PM WAR BELL
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400">Lunch Break Stoppage</span>
          </button>

          <button
            onClick={() => playBanterSound(2, 'impact')}
            className={`p-2.5 sm:p-4 rounded-xl border text-center transition-all ${
              playingId === 2 
                ? 'bg-red-600 text-white border-red-400 scale-95 shadow-[0_0_20px_rgba(220,38,38,0.8)]' 
                : 'bg-zinc-950 border-zinc-800 hover:border-red-500/60 text-white'
            }`}
          >
            <span className="text-2xl sm:text-3xl block mb-1">💥</span>
            <span className="font-teko text-base sm:text-xl font-bold tracking-wider uppercase block leading-tight">
              ARMAN'S 6'7" SLAM
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400">Blackboard Shaker</span>
          </button>

          <button
            onClick={() => playBanterSound(3, 'cash')}
            className={`p-2.5 sm:p-4 rounded-xl border text-center transition-all ${
              playingId === 3 
                ? 'bg-emerald-500 text-black border-emerald-400 scale-95' 
                : 'bg-zinc-950 border-zinc-800 hover:border-emerald-500/60 text-white'
            }`}
          >
            <span className="text-2xl sm:text-3xl block mb-1">🥟</span>
            <span className="font-teko text-base sm:text-xl font-bold tracking-wider uppercase block leading-tight">
              SAMOSA ESCROW DING
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400">UPI PhonePe Paid</span>
          </button>

          <button
            onClick={() => playBanterSound(4, 'click')}
            className={`p-2.5 sm:p-4 rounded-xl border text-center transition-all ${
              playingId === 4 
                ? 'bg-sky-500 text-black border-sky-400 scale-95' 
                : 'bg-zinc-950 border-zinc-800 hover:border-sky-500/60 text-white'
            }`}
          >
            <span className="text-2xl sm:text-3xl block mb-1">🏃‍♂️</span>
            <span className="font-teko text-base sm:text-xl font-bold tracking-wider uppercase block leading-tight">
              SRICHANDAN ESCAPE
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400">Corridor Sprint</span>
          </button>
        </div>

        {/* Excuses Generator & WhatsApp Share Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Srichandan's Excuse Generator */}
          <div className="p-6 rounded-2xl bg-zinc-950 border-2 border-sky-600/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                  SRICHANDAN'S EMERGENCY VIVA EXCUSE GENERATOR
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-4">
                Click to generate Srichandan's next excuse to avoid facing the 6'7" Arman inside the Seminar Hall:
              </p>

              <div className="p-4 rounded-xl bg-black/80 border border-zinc-800 min-h-[85px] flex items-center justify-center text-center">
                <p className="text-sm font-sans italic text-amber-300">
                  {activeExcuse || "Click below to pull a desperate excuse from Srichandan's brain!"}
                </p>
              </div>
            </div>

            <button
              onClick={spinExcuseWheel}
              className="mt-4 w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-teko text-xl tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)]"
            >
              🎲 GENERATE NEW VIVA EXCUSE
            </button>
          </div>

          {/* College WhatsApp Viral Share Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950/40 border-2 border-amber-500/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  SHARE BRAWL TO COLLEGE WHATSAPP GROUPS
                </span>
              </div>
              <h4 className="font-teko text-3xl font-black text-white leading-none">
                SPREAD THE BANTER ACROSS HOSTELS
              </h4>
              <p className="text-xs text-zinc-400 mt-2">
                Ensure every student in the Electrical Department knows Arman is taking on 4'0" Srichandan at 1:00 PM!
              </p>
            </div>

            <div className="space-y-2 mt-4">
              <button
                onClick={handleShareWhatsApp}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-teko text-xl tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>SHARE ON WHATSAPP (INSTANT VIRAL)</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-mono transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>{copiedShare ? "✓ COPIED LINK TO CLIPBOARD!" : "COPY EVENT LINK TO SHARE"}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

