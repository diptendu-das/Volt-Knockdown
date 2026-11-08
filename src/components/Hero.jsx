import React, { useEffect, useState, useRef } from 'react';
import { Flame, Shield, Trophy, Swords, Zap, MapPin, Calendar, Clock, ArrowRight, Volume2 } from 'lucide-react';
import { EVENT_DETAILS, FIGHTERS } from '../data/fightData';
import { soundFX } from '../utils/audio';

export default function Hero({ onOpenTickets, onSelectFighterBet, onOpenBets }) {
  // Countdown timer state ticking down to Nov 9, 2026 at 1:00 PM
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 0,
    seconds: 0,
  });

  const canvasRef = useRef(null);

  // Live countdown ticker to Nov 9, 2026, 1:00 PM local time
  useEffect(() => {
    const target = new Date("2026-11-09T13:00:00+05:30").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Atmospheric Canvas Sparks / Floating Embers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.5,
      speedY: -(Math.random() * 1.6 + 0.3),
      speedX: (Math.random() - 0.5) * 1.0,
      opacity: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(239, 68, 68,' : 'rgba(56, 189, 248,',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity -= 0.002;

        if (p.y < 0 || p.opacity <= 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.7 + 0.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color === 'rgba(239, 68, 68,' ? '#dc2626' : '#0284c7';
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="main-event" className="relative min-h-screen bg-[#07070a] bg-cage-mesh overflow-hidden flex flex-col justify-between pt-3 pb-12 sm:pb-16">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Atmospheric Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#07070a] pointer-events-none z-0"></div>
      <div className="absolute -top-40 left-0 w-[400px] h-[400px] bg-red-600/20 blur-[140px] pointer-events-none"></div>
      <div className="absolute -top-40 right-0 w-[400px] h-[400px] bg-sky-600/15 blur-[140px] pointer-events-none"></div>

      {/* Center Event Header Badge */}
      <div className="relative z-20 max-w-7xl mx-auto px-2 sm:px-4 w-full text-center mt-1 mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-red-950/90 border border-red-500 text-red-300 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(220,38,38,0.4)] animate-pulse">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>PRESENTED BY SCHOOL OF ELECTRICAL</span>
          <Zap className="w-3.5 h-3.5 text-amber-400" />
        </div>

        <h1 className="font-teko text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase mt-2 leading-none text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]">
          <span className="text-white">LUNCH BREAK</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 text-glow-red">BRAWL</span>
        </h1>

        <div className="inline-block bg-black/80 border border-amber-500/50 px-3 py-0.5 rounded-lg mt-1">
          <p className="font-barlow text-xs sm:text-base font-extrabold tracking-widest text-amber-400 uppercase">
            6'7" ARMAN VS 4'0" SRICHANDAN • 1:00 PM SEMINAR HALL
          </p>
        </div>

        {/* Date, Venue & Time Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2 sm:mt-3 text-[11px] sm:text-xs font-mono text-zinc-300">
          <div className="flex items-center gap-1.5 bg-zinc-900/90 px-2.5 py-1 rounded border border-red-500/40">
            <Calendar className="w-3.5 h-3.5 text-red-500" />
            <span className="font-bold text-white">9TH NOV 2026</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900/90 px-2.5 py-1 rounded border border-amber-500/40">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-amber-300">1:00 PM SHARP</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900/90 px-2.5 py-1 rounded border border-sky-500/40">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-zinc-200 font-bold">SEMINAR HALL</span>
          </div>
        </div>
      </div>

      {/* THE TITANS FACE-OFF SECTION: SIDE-BY-SIDE EVEN ON MOBILE SCREENS (grid-cols-2 ALWAYS) */}
      <div className="relative z-20 max-w-7xl mx-auto px-2 sm:px-4 w-full my-auto">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 items-stretch">
          
          {/* RED CORNER: ARMAN (6'7" HEAVYWEIGHT MONSTER) */}
          <div className="relative group flex flex-col">
            <div className="relative h-full p-2.5 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-950/70 via-zinc-950/95 to-zinc-950 border sm:border-2 border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.35)] flex flex-col justify-between">
              
              {/* Header Badges */}
              <div>
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="bg-red-600 text-white font-teko text-xs sm:text-lg px-2 sm:px-3 py-0.5 rounded font-black tracking-wider truncate">
                    RED CORNER
                  </span>
                  <span className="text-base sm:text-2xl">{FIGHTERS.red.flag}</span>
                </div>

                {/* Fighter Name */}
                <div className="space-y-0.5">
                  <div className="text-red-400 font-mono text-[9px] sm:text-xs font-extrabold uppercase truncate">
                    6'7" TITAN
                  </div>
                  <h2 className="font-teko text-2xl sm:text-5xl md:text-6xl font-black text-white tracking-wider leading-none truncate">
                    {FIGHTERS.red.firstName}
                  </h2>
                  <div className="text-[10px] sm:text-xs font-mono font-bold text-amber-400">
                    "{FIGHTERS.red.nickname}"
                  </div>
                </div>
              </div>

              {/* Fighter Photo */}
              <div className="relative my-2 sm:my-3 h-36 sm:h-56 md:h-72 rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-t from-red-950 via-black to-zinc-900 border border-red-500/60 shadow-lg flex items-center justify-center">
                <img 
                  src="./arman.jpg" 
                  alt="Arman The Behemoth"
                  className="w-full h-full object-cover object-top filter brightness-105 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none"></div>

                {/* Overlays */}
                <div className="absolute top-1.5 left-1.5 bg-red-600/90 text-white px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-xs font-mono font-black shadow">
                  6'7" (201 CM)
                </div>
                <div className="absolute top-1.5 right-1.5 bg-black/80 border border-red-500/60 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[11px] font-mono text-red-400">
                  86" REACH
                </div>

                {/* Bottom Record Tag */}
                <div className="absolute bottom-1.5 inset-x-1.5 bg-red-950/95 border border-red-500/80 rounded p-1 sm:p-2 flex items-center justify-between backdrop-blur-md">
                  <span className="font-teko text-base sm:text-2xl font-black text-white leading-none">
                    48-0 (47 KOs)
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-mono font-bold text-amber-300 uppercase">
                    UNDEFEATED
                  </span>
                </div>
              </div>

              {/* Quick Specs (Compact on mobile) */}
              <div className="grid grid-cols-2 gap-1 text-center text-[9px] sm:text-xs font-mono py-1 sm:py-2 bg-black/70 rounded-lg border border-red-900/40 mb-2 sm:mb-3">
                <div>
                  <span className="text-zinc-500 block text-[8px] sm:text-[10px]">WEIGHT</span>
                  <span className="font-black text-white">235 LBS</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[8px] sm:text-[10px]">POWER</span>
                  <span className="font-black text-red-500">99 / 100</span>
                </div>
              </div>

              {/* Action Button: Bet Arman */}
              <button
                onClick={() => {
                  soundFX.playCash();
                  onSelectFighterBet({
                    id: 'ml-arman',
                    name: "Arman (The 6'7\" Behemoth)",
                    odds: FIGHTERS.red.odds.moneyline,
                    decimal: FIGHTERS.red.odds.decimal,
                    category: 'Match Winner (Moneyline)'
                  });
                  onOpenBets();
                }}
                className="w-full py-2 sm:py-3 px-2 sm:px-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 text-white font-teko text-base sm:text-2xl tracking-wider uppercase rounded-lg sm:rounded-xl transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] flex items-center justify-between border border-red-400/50"
              >
                <span className="truncate">BET ARMAN</span>
                <span className="bg-black/50 font-mono text-[11px] sm:text-sm font-bold px-1.5 sm:px-2 py-0.5 rounded text-amber-300">
                  {FIGHTERS.red.odds.moneyline}
                </span>
              </button>
            </div>
          </div>

          {/* BLUE CORNER: SRICHANDAN (4'0" DYNAMO WITH 5 SOLID WINS) */}
          <div className="relative group flex flex-col">
            <div className="relative h-full p-2.5 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-bl from-sky-950/50 via-zinc-950/95 to-zinc-950 border sm:border-2 border-sky-500 shadow-[0_0_30px_rgba(14,165,233,0.35)] flex flex-col justify-between">
              
              {/* Header Badges */}
              <div>
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="bg-sky-600 text-white font-teko text-xs sm:text-lg px-2 sm:px-3 py-0.5 rounded font-black tracking-wider truncate">
                    BLUE CORNER
                  </span>
                  <span className="text-base sm:text-2xl">{FIGHTERS.blue.flag}</span>
                </div>

                {/* Fighter Name - CLEAN HEADING without long tag */}
                <div className="space-y-0.5">
                  <div className="text-sky-400 font-mono text-[9px] sm:text-xs font-extrabold uppercase truncate">
                    4'0" DYNAMO
                  </div>
                  <h2 className="font-teko text-2xl sm:text-5xl md:text-6xl font-black text-white tracking-wider leading-none truncate">
                    {FIGHTERS.blue.firstName}
                  </h2>
                  <div className="text-[10px] sm:text-xs font-mono font-bold text-sky-300">
                    "{FIGHTERS.blue.nickname}"
                  </div>
                </div>
              </div>

              {/* Fighter Avatar & 5 Wins Showcase */}
              <div className="relative my-2 sm:my-3 h-36 sm:h-56 md:h-72 rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-t from-sky-950 via-black to-zinc-900 border border-sky-500/50 shadow-lg flex flex-col items-center justify-center p-2 text-center">
                
                {/* 4-Foot Avatar */}
                <div className="my-auto flex flex-col items-center justify-center scale-90 sm:scale-100">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center text-2xl sm:text-4xl mb-1 sm:mb-2 animate-bounce">
                    ⚡
                  </div>
                  <div className="font-mono text-[9px] sm:text-xs text-sky-200 font-bold bg-black/80 px-2 sm:px-3 py-0.5 rounded border border-sky-500/40">
                    HEIGHT: 4'0" (122 CM)
                  </div>
                </div>

                {/* Overlays */}
                <div className="absolute top-1.5 left-1.5 bg-sky-600/90 text-white px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-xs font-mono font-black shadow">
                  4'0" (122 CM)
                </div>
                <div className="absolute top-1.5 right-1.5 bg-black/80 border border-sky-500/60 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[11px] font-mono text-sky-300 font-bold">
                  5 WINS • 4 KOs
                </div>

                {/* Bottom Record Tag */}
                <div className="absolute bottom-1.5 inset-x-1.5 bg-sky-950/95 border border-sky-500/80 rounded p-1 sm:p-2 flex items-center justify-between backdrop-blur-md">
                  <span className="font-teko text-base sm:text-2xl font-black text-white leading-none">
                    5-14-1 (4 KOs)
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-mono font-bold text-sky-300 uppercase">
                    5 CAREER WINS
                  </span>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-1 text-center text-[9px] sm:text-xs font-mono py-1 sm:py-2 bg-black/70 rounded-lg border border-sky-900/40 mb-2 sm:mb-3">
                <div>
                  <span className="text-zinc-500 block text-[8px] sm:text-[10px]">WEIGHT</span>
                  <span className="font-black text-white">92 LBS</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[8px] sm:text-[10px]">SPEED</span>
                  <span className="font-black text-sky-400">96 / 100</span>
                </div>
              </div>

              {/* Action Button: Bet Srichandan */}
              <button
                onClick={() => {
                  soundFX.playCash();
                  onSelectFighterBet({
                    id: 'ml-srichandan',
                    name: "Srichandan (The 4-Foot Dynamo)",
                    odds: FIGHTERS.blue.odds.moneyline,
                    decimal: FIGHTERS.blue.odds.decimal,
                    category: 'Match Winner (Moneyline)'
                  });
                  onOpenBets();
                }}
                className="w-full py-2 sm:py-3 px-2 sm:px-3 bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 hover:from-sky-500 text-white font-teko text-base sm:text-2xl tracking-wider uppercase rounded-lg sm:rounded-xl transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] flex items-center justify-between border border-sky-400/50"
              >
                <span className="truncate">BET SRICHANDAN</span>
                <span className="bg-black/50 font-mono text-[11px] sm:text-sm font-bold px-1.5 sm:px-2 py-0.5 rounded text-amber-300">
                  +{FIGHTERS.blue.odds.moneyline}
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* COUNTDOWN TIMER: 9TH NOV, 2026 AT 1:00 PM */}
      <div className="relative z-20 max-w-4xl mx-auto px-2 sm:px-4 w-full mt-6 sm:mt-10 text-center">
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-amber-500/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
          <div className="text-[10px] sm:text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>COUNTDOWN TO 1:00 PM LUNCH BREAK (SEMINAR HALL)</span>
          </div>

          {/* Time digits */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xs sm:max-w-md mx-auto">
            <div className="bg-black/80 border border-red-500/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <span className="font-teko text-3xl sm:text-6xl font-black text-white leading-none block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[11px] font-mono text-zinc-400 tracking-wider">HOURS</span>
            </div>
            <div className="bg-black/80 border border-red-500/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <span className="font-teko text-3xl sm:text-6xl font-black text-white leading-none block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[11px] font-mono text-zinc-400 tracking-wider">MINUTES</span>
            </div>
            <div className="bg-black/80 border border-red-500/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <span className="font-teko text-3xl sm:text-6xl font-black text-red-500 leading-none block animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[11px] font-mono text-red-400 tracking-wider">SECONDS</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 sm:mt-6">
            <button
              onClick={() => {
                soundFX.playBell();
                onOpenTickets();
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 text-white font-teko text-xl sm:text-2xl tracking-wider uppercase rounded-xl shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-2 border border-red-400/50"
            >
              <Trophy className="w-5 h-5 text-amber-300" />
              <span>BOOK SEMINAR SEAT (SCAN QR)</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                onOpenBets();
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/60 font-teko text-xl sm:text-2xl tracking-wider uppercase rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 text-amber-400" />
              <span>EXPLORE ALL BANTER BETS</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
