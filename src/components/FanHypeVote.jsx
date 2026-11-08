import React, { useState } from 'react';
import { Flame, Zap, Trophy, ThumbsUp, MessageSquare } from 'lucide-react';
import { FIGHTERS, PRESS_QUOTES } from '../data/fightData';
import { soundFX } from '../utils/audio';

export default function FanHypeVote() {
  const [votes, setVotes] = useState({
    arman: 2480,
    srichandan: 112,
  });
  const [hasVoted, setHasVoted] = useState(false);
  const [votedFor, setVotedFor] = useState(null);

  const totalVotes = votes.arman + votes.srichandan;
  const armanPct = Math.round((votes.arman / totalVotes) * 100);
  const srichandanPct = 100 - armanPct;

  const handleVote = (fighterId) => {
    if (hasVoted) return;
    soundFX.playImpact();
    setVotes(prev => ({
      ...prev,
      [fighterId]: prev[fighterId] + 1
    }));
    setHasVoted(true);
    setVotedFor(fighterId);
  };

  return (
    <section className="relative py-16 bg-[#07070a] border-t border-zinc-900 overflow-hidden">
      
      {/* Press Quotes Marquee Ticker */}
      <div className="mb-14 overflow-hidden border-y border-red-900/30 bg-zinc-950/90 py-3">
        <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
          {PRESS_QUOTES.concat(PRESS_QUOTES).map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs font-mono">
              <span className={`font-bold px-2 py-0.5 rounded ${
                item.corner === 'red' ? 'bg-red-950 text-red-400 border border-red-800' :
                item.corner === 'blue' ? 'bg-sky-950 text-sky-400 border border-sky-800' :
                'bg-amber-950 text-amber-400 border border-amber-800'
              }`}>
                {item.speaker}
              </span>
              <span className="text-zinc-300 italic font-sans text-sm">
                "{item.quote}"
              </span>
              <span className="text-zinc-600">///</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Fan Vote Card */}
        <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 shadow-2xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-widest mb-3">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>COLLEGE HOSTEL CONSENSUS POLL ({totalVotes.toLocaleString()} VOTES)</span>
          </div>

          <h3 className="font-teko text-4xl sm:text-6xl font-black text-white uppercase leading-none">
            WHO WALKS OUT AS <span className="text-amber-400">SEMINAR CHAMPION?</span>
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 mb-8">
            Can 4'0" Srichandan survive 3 rounds against 6'7" Arman? Vote below!
          </p>

          {/* Dual Voting Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
            {/* Vote Arman */}
            <button
              onClick={() => handleVote('arman')}
              disabled={hasVoted}
              className={`p-4 rounded-xl font-teko text-2xl tracking-wider uppercase border-2 transition-all flex items-center justify-between ${
                votedFor === 'arman'
                  ? 'bg-red-600 text-white border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.6)]'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-red-950/40 border-zinc-800 hover:border-red-500/60'
              } disabled:cursor-default`}
            >
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-500" />
                <span>ARMAN (6'7" TITAN)</span>
              </div>
              <span className="font-mono text-lg font-bold text-red-400">
                {armanPct}%
              </span>
            </button>

            {/* Vote Srichandan */}
            <button
              onClick={() => handleVote('srichandan')}
              disabled={hasVoted}
              className={`p-4 rounded-xl font-teko text-2xl tracking-wider uppercase border-2 transition-all flex items-center justify-between ${
                votedFor === 'srichandan'
                  ? 'bg-sky-600 text-white border-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.6)]'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-sky-950/40 border-zinc-800 hover:border-sky-500/60'
              } disabled:cursor-default`}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-sky-400" />
                <span>SRICHANDAN (4'0" DYNAMO)</span>
              </div>
              <span className="font-mono text-lg font-bold text-sky-400">
                {srichandanPct}%
              </span>
            </button>
          </div>

          {/* Animated Dual Percentage Bar */}
          <div className="space-y-2">
            <div className="h-4 bg-zinc-950 rounded-full overflow-hidden flex border border-white/10 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-red-600 to-rose-700 rounded-l-full transition-all duration-700 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                style={{ width: `${armanPct}%` }}
              ></div>
              <div 
                className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-r-full transition-all duration-700 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                style={{ width: `${srichandanPct}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
              <span className="text-red-400 font-bold">{votes.arman.toLocaleString()} Votes (Arman by 30-sec KO)</span>
              <span className="text-sky-400 font-bold">{votes.srichandan.toLocaleString()} Votes (Srichandan Miracle Escape)</span>
            </div>
          </div>

          {hasVoted && (
            <div className="mt-4 text-xs font-mono text-emerald-400 animate-pulse font-bold">
              ✓ Prediction recorded! Be inside the Seminar Hall at 1:00 PM Sharp on 9th Nov!
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
