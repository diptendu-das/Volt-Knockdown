import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, Flame, Trophy, Ticket, DollarSign } from 'lucide-react';
import { soundFX } from '../utils/audio';

export default function PromoTrailerModal({ isOpen, onClose, onOpenTickets, onOpenBets }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const trailerScenes = [
    {
      title: "DECEMBER 12, 2026",
      subtitle: "LIVE FROM THE APEX SPHERE • LAS VEGAS",
      quote: "The violent convergence of two unbroken legacies.",
      corner: "gold",
      sound: 'bell'
    },
    {
      title: "29-0-0 • 26 KNOCKOUTS",
      subtitle: "VIKTOR 'THE CYBORG' VOLKOV",
      quote: "A human battering ram. He has stopped his last 7 opponents inside round 2.",
      corner: "red",
      sound: 'impact'
    },
    {
      title: "31-1-0 • 2-DIVISION CHAMPION",
      subtitle: "DAMIAN 'THE REAPER' CROSS",
      quote: "Surgical striking. Razor elbows. 82 inches of pure lethal reach.",
      corner: "blue",
      sound: 'impact'
    },
    {
      title: "5 ROUNDS. ONE BELT.",
      subtitle: "NO MERCY. NO EXCUSES. NO REMATCH CLAUSE.",
      quote: "Someone is leaving the Octagon on a stretcher.",
      corner: "red",
      sound: 'bell'
    }
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const currentScene = trailerScenes[currentSlide];
    if (currentScene.sound === 'bell') {
      soundFX.playBell();
    } else {
      soundFX.playImpact();
    }

    const timer = setTimeout(() => {
      if (currentSlide < trailerScenes.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else {
        // loop or pause at end
        setIsPlaying(false);
      }
    }, 3200);

    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, currentSlide]);

  if (!isOpen) return null;

  const scene = trailerScenes[currentSlide];

  const restartTrailer = () => {
    setCurrentSlide(0);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl bg-[#09090d] border-2 border-red-600/60 rounded-2xl overflow-hidden shadow-[0_0_70px_rgba(220,38,38,0.4)]">
        
        {/* Top Control Bar */}
        <div className="p-4 bg-black/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="font-teko text-2xl font-bold tracking-wider text-white uppercase">
              OFFICIAL PPV PROMO TEASER TRAILER
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={restartTrailer}
              title="Restart Trailer"
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause" : "Play"}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cinematic Screen Canvas */}
        <div className="relative h-96 sm:h-[450px] bg-gradient-to-br from-black via-zinc-950 to-red-950/40 p-8 flex flex-col justify-between items-center text-center overflow-hidden">
          
          {/* Animated scanlines & vignette */}
          <div className="absolute inset-0 scanline pointer-events-none opacity-40"></div>
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>

          {/* Progress Indicator */}
          <div className="flex gap-2 w-full max-w-md relative z-10">
            {trailerScenes.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' 
                    : idx < currentSlide ? 'bg-zinc-600' : 'bg-zinc-900'
                }`}
              ></div>
            ))}
          </div>

          {/* Dramatic Center Text Sequence */}
          <div className="relative z-10 my-auto space-y-4 max-w-2xl px-4 animate-fade-in">
            <div className={`font-mono text-xs uppercase tracking-widest font-bold ${
              scene.corner === 'red' ? 'text-red-400' : scene.corner === 'blue' ? 'text-sky-400' : 'text-amber-400'
            }`}>
              {scene.subtitle}
            </div>

            <h3 className="font-teko text-5xl sm:text-7xl font-black text-white leading-none tracking-tight uppercase drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
              {scene.title}
            </h3>

            <p className="font-sans text-base sm:text-lg italic text-zinc-300 max-w-xl mx-auto">
              "{scene.quote}"
            </p>
          </div>

          {/* Action CTAs at bottom */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <button
              onClick={() => {
                onClose();
                onOpenTickets();
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-teko text-xl tracking-wider uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.6)] flex items-center gap-2"
            >
              <Ticket className="w-5 h-5 text-amber-300" />
              <span>CLAIM ARENA PASS</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBets();
              }}
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/50 font-teko text-xl tracking-wider uppercase rounded-xl transition-all flex items-center gap-2"
            >
              <DollarSign className="w-5 h-5" />
              <span>PLACE LIVE WAGER</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

