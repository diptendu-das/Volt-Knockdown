import React, { useState } from 'react';
import { X, DollarSign, Trash2, CheckCircle2, Play, AlertCircle, ArrowRight, ShieldCheck, Flame, Trophy, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';
import { EVENT_DETAILS } from '../data/fightData';

export default function BetSlipDrawer({ 
  isOpen, 
  onClose, 
  selectedBets, 
  onRemoveBet, 
  onClearBets, 
  bankroll, 
  onPlaceBets, 
  placedBets, 
  onSimulateFight 
}) {
  const [activeTab, setActiveTab] = useState('slip'); // 'slip' | 'active' | 'simulator'
  const [showPaymentQR, setShowPaymentQR] = useState(false);
  const [wagers, setWagers] = useState({}); // { [betId]: amount }
  const [simState, setSimState] = useState({
    simulating: false,
    step: 0,
    result: null,
  });

  if (!isOpen) return null;

  // Helper to calculate profit
  const calculatePayout = (stake, odds) => {
    const s = Number(stake) || 0;
    if (s <= 0) return { profit: 0, total: 0 };
    let profit = 0;
    if (odds > 0) {
      profit = (s * odds) / 100;
    } else {
      profit = (s * 100) / Math.abs(odds);
    }
    return {
      profit: Math.round(profit * 100) / 100,
      total: Math.round((s + profit) * 100) / 100,
    };
  };

  const handleWagerChange = (betId, value) => {
    setWagers(prev => ({
      ...prev,
      [betId]: Math.max(0, Number(value) || 0)
    }));
  };

  const setPresetWager = (betId, amount) => {
    soundFX.playClick();
    setWagers(prev => ({
      ...prev,
      [betId]: amount
    }));
  };

  // Total stake across all selected bets
  const totalStake = selectedBets.reduce((acc, b) => acc + (Number(wagers[b.id]) || 0), 0);
  const totalPotentialPayout = selectedBets.reduce((acc, b) => {
    const s = Number(wagers[b.id]) || 0;
    return acc + calculatePayout(s, b.odds).total;
  }, 0);

  // Trigger payment QR modal or confirm
  const handleProceedToPayment = () => {
    if (selectedBets.length === 0) return;
    if (totalStake <= 0) {
      alert("Please enter a wager amount for at least one selection.");
      return;
    }
    setShowPaymentQR(true);
  };

  // Submit bets after scanning QR
  const handleConfirmBetsAfterQR = () => {
    const newBets = selectedBets
      .filter(b => (Number(wagers[b.id]) || 0) > 0)
      .map(b => {
        const stake = Number(wagers[b.id]);
        const { profit, total } = calculatePayout(stake, b.odds);
        return {
          ticketId: `EE-BET-${Math.floor(1000 + Math.random() * 9000)}`,
          betId: b.id,
          name: b.name,
          odds: b.odds,
          market: b.market,
          fighter: b.fighter,
          stake,
          potentialProfit: profit,
          potentialPayout: total,
          status: 'PENDING',
          placedAt: new Date().toLocaleTimeString(),
        };
      });

    onPlaceBets(newBets, totalStake);

    // Audio & Confetti
    soundFX.playCash();
    setTimeout(() => soundFX.playBell(), 250);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#dc2626', '#38bdf8']
    });

    onClearBets();
    setWagers({});
    setShowPaymentQR(false);
    setActiveTab('active');
  };

  // Fight Simulation (Hilarious Banter Stoppage)
  const runSimulation = () => {
    if (simState.simulating) return;

    soundFX.playBell();
    setSimState({ simulating: true, step: 1, result: null });

    setTimeout(() => {
      soundFX.playImpact();
      setSimState(prev => ({ ...prev, step: 2 }));
    }, 1800);

    setTimeout(() => {
      soundFX.playImpact();
      setSimState(prev => ({ ...prev, step: 3 }));
    }, 3600);

    setTimeout(() => {
      // Possible hilarious outcomes showcasing Arman as dominant
      const outcomes = [
        {
          winner: 'arman',
          winnerName: "Arman (The 6'7\" Behemoth)",
          method: 'KO (Sent Srichandan Flying)',
          round: 1,
          time: '0:28',
          summary: "Arman threw a light jab that created a wind turbine effect, launching 4-foot Srichandan directly into the seminar blackboard! Total KO!"
        },
        {
          winner: 'arman',
          winnerName: "Arman (The 6'7\" Behemoth)",
          method: 'TKO (Desk Hide & Forfeit)',
          round: 1,
          time: '0:45',
          summary: "Srichandan took one look at Arman's 86-inch reach, crawled under Desk 4, and refused to come out until lunch break ended! Arman claims undisputed victory!"
        },
        {
          winner: 'arman',
          winnerName: "Arman (The 6'7\" Behemoth)",
          method: 'Submission (Lifted by Collar)',
          round: 2,
          time: '1:12',
          summary: "Arman picked Srichandan up with one hand like a backpack. Srichandan tapped out immediately shouting 'Bhai Viva hai mat maar!'"
        }
      ];

      const chosen = outcomes[Math.floor(Math.random() * outcomes.length)];
      soundFX.playBell();
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });

      setSimState({
        simulating: false,
        step: 4,
        result: chosen
      });

      // Grade user bets
      onSimulateFight(chosen);
    }, 5200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-zinc-950 border-l-2 border-red-500/50 h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-zinc-950 via-zinc-900 to-red-950/60 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-400" />
            <h3 className="font-teko text-2xl font-black text-white tracking-wider uppercase">
              SEMINAR HALL BETSLIP & PAYMENTS
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold bg-black/70 px-2 py-1 rounded border border-amber-500/40">
              WALLET: ₹{bankroll.toLocaleString()}
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 bg-zinc-900 border-b border-zinc-800 text-center font-barlow text-xs uppercase tracking-wider font-bold">
          <button
            onClick={() => { soundFX.playClick(); setActiveTab('slip'); setShowPaymentQR(false); }}
            className={`py-3 transition-colors ${
              activeTab === 'slip'
                ? 'bg-amber-500 text-black font-extrabold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            PICKS ({selectedBets.length})
          </button>
          <button
            onClick={() => { soundFX.playClick(); setActiveTab('active'); setShowPaymentQR(false); }}
            className={`py-3 transition-colors ${
              activeTab === 'active'
                ? 'bg-amber-500 text-black font-extrabold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            MY BETS ({placedBets.length})
          </button>
          <button
            onClick={() => { soundFX.playClick(); setActiveTab('simulator'); setShowPaymentQR(false); }}
            className={`py-3 transition-colors ${
              activeTab === 'simulator'
                ? 'bg-red-600 text-white font-extrabold shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                : 'text-red-400 hover:text-white'
            }`}
          >
            SIMULATE BRAWL ⚡
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* QR PAYMENT POPUP VIEW INSIDE BETSLIP */}
          {showPaymentQR ? (
            <div className="space-y-4 text-center bg-black p-5 rounded-2xl border-2 border-amber-500 shadow-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold uppercase">
                <Smartphone className="w-3.5 h-3.5" />
                <span>UPI BETTING ESCROW SCAN</span>
              </div>

              <h4 className="font-teko text-3xl font-black text-white leading-none">
                SCAN & PAY TO LOCK IN YOUR WAGER
              </h4>

              <p className="text-xs text-zinc-300">
                Scan with <strong className="text-white">PhonePe / GPay / Paytm</strong> to verify your wager of <strong className="text-amber-400">₹{totalStake}</strong>:
              </p>

              {/* The Uploaded PhonePe QR Image */}
              <div className="relative inline-block p-2.5 bg-white rounded-xl shadow-lg">
                <img 
                  src="./payment-qr.jpg" 
                  alt="PhonePe QR Code for Betting"
                  className="w-48 h-48 object-contain rounded-lg mx-auto"
                />
                <div className="mt-1 bg-black text-amber-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  ESCROW AMOUNT: ₹{totalStake}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleConfirmBetsAfterQR}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-teko text-2xl tracking-wider uppercase rounded-xl font-black shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <span>I HAVE PAID ₹{totalStake} VIA QR (CONFIRM BETS)</span>
                </button>

                <button
                  onClick={() => setShowPaymentQR(false)}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-300"
                >
                  ← Back to Modify Selections
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* TAB 1: BET SLIP SELECTIONS */}
              {activeTab === 'slip' && (
                <>
                  {selectedBets.length === 0 ? (
                    <div className="py-16 text-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-600">
                        <DollarSign className="w-8 h-8" />
                      </div>
                      <h4 className="font-teko text-2xl text-zinc-400">NO PICKS LOADED</h4>
                      <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                        Click Arman, Srichandan, or any Seminar Hall banter props to load your slip.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                        <span>SELECTED WAGERS ({selectedBets.length})</span>
                        <button
                          onClick={onClearBets}
                          className="text-red-400 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Clear All
                        </button>
                      </div>

                      {selectedBets.map((bet) => {
                        const currentStake = Number(wagers[bet.id]) || 0;
                        const { profit, total } = calculatePayout(currentStake, bet.odds);

                        return (
                          <div key={bet.id} className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                                  {bet.market}
                                </span>
                                <h5 className="font-bold text-white text-sm mt-0.5">
                                  {bet.name}
                                </h5>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black border border-white/10 text-amber-400">
                                  {bet.odds > 0 ? `+${bet.odds}` : bet.odds}
                                </span>
                                <button
                                  onClick={() => onRemoveBet(bet.id)}
                                  className="text-zinc-500 hover:text-red-400 p-1"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Wager Input */}
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                  <span className="absolute left-3 top-2.5 text-zinc-500 text-xs font-mono">₹</span>
                                  <input
                                    type="number"
                                    min="0"
                                    placeholder="Wager (INR)"
                                    value={wagers[bet.id] || ''}
                                    onChange={(e) => handleWagerChange(bet.id, e.target.value)}
                                    className="w-full bg-black border border-zinc-700 rounded-lg pl-7 pr-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-400"
                                  />
                                </div>
                                <button
                                  onClick={() => setPresetWager(bet.id, 50)}
                                  className="px-2.5 py-2 rounded bg-zinc-800 text-[11px] font-mono hover:bg-zinc-700 text-zinc-300"
                                >
                                  ₹50
                                </button>
                                <button
                                  onClick={() => setPresetWager(bet.id, 100)}
                                  className="px-2.5 py-2 rounded bg-zinc-800 text-[11px] font-mono hover:bg-zinc-700 text-zinc-300"
                                >
                                  ₹100
                                </button>
                                <button
                                  onClick={() => setPresetWager(bet.id, 200)}
                                  className="px-2.5 py-2 rounded bg-zinc-800 text-[11px] font-mono hover:bg-zinc-700 text-amber-400 font-bold"
                                >
                                  ₹200
                                </button>
                              </div>

                              {currentStake > 0 && (
                                <div className="flex justify-between items-center text-xs font-mono mt-2 text-zinc-400 bg-black/40 p-2 rounded">
                                  <span>Profit: <strong className="text-emerald-400">₹{profit}</strong></span>
                                  <span>Total Payout: <strong className="text-white">₹{total}</strong></span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* TAB 2: ACTIVE BETS */}
              {activeTab === 'active' && (
                <div className="space-y-4">
                  {placedBets.length === 0 ? (
                    <div className="py-16 text-center space-y-2">
                      <ShieldCheck className="w-12 h-12 text-zinc-600 mx-auto" />
                      <h4 className="font-teko text-2xl text-zinc-400">NO BETS PLACED YET</h4>
                      <p className="text-xs text-zinc-500">
                        Scan the UPI QR code to place bets on Arman or Srichandan.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-xs font-mono text-zinc-400 font-bold">
                        VERIFIED WCF BET TICKETS ({placedBets.length})
                      </div>
                      {placedBets.map((ticket, i) => (
                        <div 
                          key={i} 
                          className={`p-4 rounded-xl border ${
                            ticket.status === 'WON'
                              ? 'bg-emerald-950/40 border-emerald-500/60'
                              : ticket.status === 'LOST'
                              ? 'bg-red-950/40 border-red-900/60'
                              : 'bg-zinc-900/80 border-amber-500/30'
                          }`}
                        >
                          <div className="flex justify-between items-start text-xs font-mono">
                            <span className="text-zinc-500">{ticket.ticketId} • {ticket.placedAt}</span>
                            <span className={`px-2 py-0.5 rounded font-bold ${
                              ticket.status === 'WON' 
                                ? 'bg-emerald-500 text-black' 
                                : ticket.status === 'LOST'
                                ? 'bg-red-600 text-white'
                                : 'bg-amber-500 text-black'
                            }`}>
                              {ticket.status}
                            </span>
                          </div>

                          <div className="font-bold text-white text-sm mt-1">
                            {ticket.name}
                          </div>

                          <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-white/5 text-[11px] font-mono">
                            <div>
                              <span className="text-zinc-500 block">WAGER</span>
                              <span className="text-white font-bold">₹{ticket.stake}</span>
                            </div>
                            <div>
                              <span className="text-zinc-500 block">ODDS</span>
                              <span className="text-amber-400 font-bold">{ticket.odds > 0 ? `+${ticket.odds}` : ticket.odds}</span>
                            </div>
                            <div>
                              <span className="text-zinc-500 block">PAYOUT</span>
                              <span className={`font-bold ${ticket.status === 'WON' ? 'text-emerald-400' : 'text-zinc-300'}`}>
                                ₹{ticket.potentialPayout}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: FIGHT SIMULATOR */}
              {activeTab === 'simulator' && (
                <div className="space-y-6 py-2">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-red-950/60 to-black border border-red-500/40 text-center space-y-2">
                    <Flame className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
                    <h4 className="font-teko text-3xl font-black text-white">
                      LIVE SEMINAR HALL SIMULATION
                    </h4>
                    <p className="text-xs text-zinc-300">
                      Simulate the lunch break bout right now! See if Srichandan manages to escape or gets sent through the blackboard.
                    </p>
                  </div>

                  {/* Simulation stages */}
                  {simState.simulating && (
                    <div className="p-5 rounded-xl bg-black border border-amber-500/50 space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-amber-400 font-bold">
                        <span>SIMULATING 1:00 PM LUNCH BREAK CLASH</span>
                        <span className="animate-spin">⚙️</span>
                      </div>

                      <div className="space-y-2 text-xs font-mono">
                        <div className={`p-2 rounded ${simState.step >= 1 ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}>
                          🔔 1:00 PM: Bell rings! Srichandan looks up at 6'7" Arman in absolute horror.
                        </div>
                        {simState.step >= 2 && (
                          <div className="p-2 rounded bg-zinc-800 text-red-400 font-bold animate-pulse">
                            💥 ROUND 1: Arman extends his 86" reach! Srichandan ducks under Desk 3 screaming for mercy!
                          </div>
                        )}
                        {simState.step >= 3 && (
                          <div className="p-2 rounded bg-zinc-800 text-amber-400 font-bold animate-pulse">
                            🩸 STOPPAGE: Referee Diptendu Das steps in as Srichandan surrenders his lunch tiffin!
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Simulation Finished Outcome */}
                  {simState.result && (
                    <div className="p-5 rounded-xl bg-gradient-to-r from-red-950/80 to-zinc-950 border-2 border-red-500 space-y-3">
                      <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                        OFFICIAL BOUT RESULT
                      </div>
                      <h4 className="font-teko text-4xl font-black text-white leading-none">
                        {simState.result.winnerName}
                      </h4>
                      <div className="text-sm font-mono text-emerald-400 font-bold">
                        VICTORY BY {simState.result.method} • ROUND {simState.result.round} ({simState.result.time})
                      </div>
                      <p className="text-xs text-zinc-300 italic border-l-2 border-red-500 pl-3 py-1">
                        "{simState.result.summary}"
                      </p>
                      <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/10">
                        Sanctioned by School of Electrical • Lead Matchmaker: Diptendu Das
                      </div>
                    </div>
                  )}

                  {/* Run Simulation Trigger */}
                  <button
                    disabled={simState.simulating}
                    onClick={runSimulation}
                    className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 text-white font-teko text-2xl tracking-wider uppercase rounded-xl shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>{simState.simulating ? 'BRAWL IN PROGRESS...' : 'RUN LIVE BRAWL SIMULATION 💥'}</span>
                  </button>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer / Total Stake & Action Button (Only on Slip Tab when not showing QR) */}
        {!showPaymentQR && activeTab === 'slip' && selectedBets.length > 0 && (
          <div className="p-4 bg-zinc-900 border-t border-zinc-800 space-y-3">
            <div className="flex justify-between items-baseline text-xs font-mono">
              <span className="text-zinc-400">TOTAL COMBAT WAGER:</span>
              <span className="font-bold text-white text-sm">₹{totalStake}</span>
            </div>
            <div className="flex justify-between items-baseline text-xs font-mono">
              <span className="text-zinc-400">ESTIMATED WINNINGS:</span>
              <span className="font-teko text-2xl font-bold text-amber-400">₹{totalPotentialPayout}</span>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full py-3 sm:py-3.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black font-teko text-lg sm:text-2xl tracking-wider uppercase rounded-xl font-black shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>SCAN UPI QR TO LOCK IN (₹{totalStake})</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
