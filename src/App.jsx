import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TaleOfTheTape from './components/TaleOfTheTape';
import FaceOffStaredown from './components/FaceOffStaredown';
import TicketSection from './components/TicketSection';
import TicketModal from './components/TicketModal';
import BettingSection from './components/BettingSection';
import BetSlipDrawer from './components/BetSlipDrawer';
import Undercard from './components/Undercard';
import FanHypeVote from './components/FanHypeVote';
import BanterSoundboard from './components/BanterSoundboard';
import Footer from './components/Footer';
import { TICKET_TIERS } from './data/fightData';
import { soundFX } from './utils/audio';
import { Ticket, DollarSign } from 'lucide-react';

export default function App() {
  // Bankroll state
  const [bankroll, setBankroll] = useState(() => {
    const saved = localStorage.getItem('soee_bankroll');
    return saved ? Number(saved) : 1000;
  });

  useEffect(() => {
    localStorage.setItem('soee_bankroll', String(bankroll));
  }, [bankroll]);

  // Modal & Drawer visibility
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedTicketTier, setSelectedTicketTier] = useState(TICKET_TIERS[0]);
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false);

  // Betting states
  const [selectedBets, setSelectedBets] = useState([]);
  const [placedBets, setPlacedBets] = useState(() => {
    const saved = localStorage.getItem('soee_placed_bets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('soee_placed_bets', JSON.stringify(placedBets));
  }, [placedBets]);

  // Reset bankroll
  const handleResetBankroll = () => {
    setBankroll(1000);
  };

  // Ticket Modal open
  const handleOpenTickets = (tier) => {
    if (tier) setSelectedTicketTier(tier);
    setIsTicketModalOpen(true);
  };

  // Add/toggle bet in bet slip
  const handleAddToBetSlip = (bet) => {
    setSelectedBets((prev) => {
      const exists = prev.some((b) => b.id === bet.id);
      if (exists) {
        return prev.filter((b) => b.id !== bet.id);
      } else {
        return [...prev, bet];
      }
    });
  };

  const handleRemoveBet = (betId) => {
    setSelectedBets((prev) => prev.filter((b) => b.id !== betId));
  };

  const handleClearBets = () => {
    setSelectedBets([]);
  };

  // Place confirmed bets
  const handlePlaceBets = (newBets, totalDeduction) => {
    setBankroll((prev) => Math.max(0, prev - totalDeduction));
    setPlacedBets((prev) => [...newBets, ...prev]);
  };

  // Fight Simulation Settlement
  const handleSimulateFight = (outcome) => {
    let totalWonPayout = 0;

    setPlacedBets((prev) =>
      prev.map((ticket) => {
        if (ticket.status !== 'PENDING') return ticket;

        let won = false;
        // Check winner match
        if (ticket.fighter === outcome.winner) won = true;
        if (ticket.betId.includes(outcome.winner)) won = true;
        // Check round / method match
        if (ticket.betId.includes('arman-ko') && outcome.method.includes('KO')) won = true;
        if (ticket.betId.includes('arman-tko') && outcome.method.includes('TKO')) won = true;
        if (ticket.betId.includes('lift-up')) won = true; // Guaranteed fun win
        if (ticket.betId.includes('60s') && outcome.round === 1) won = true;

        if (won) {
          totalWonPayout += ticket.potentialPayout;
          return { ...ticket, status: 'WON' };
        } else {
          return { ...ticket, status: 'LOST' };
        }
      })
    );

    if (totalWonPayout > 0) {
      setBankroll((prev) => prev + totalWonPayout);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white relative">
      {/* Navbar */}
      <Navbar
        bankroll={bankroll}
        onResetBankroll={handleResetBankroll}
        onOpenTickets={() => handleOpenTickets(TICKET_TIERS[0])}
        onOpenBets={() => setIsBetSlipOpen(true)}
        activeBetsCount={selectedBets.length}
      />

      {/* Hero Section */}
      <Hero
        onOpenTickets={() => handleOpenTickets(TICKET_TIERS[0])}
        onSelectFighterBet={handleAddToBetSlip}
        onOpenBets={() => setIsBetSlipOpen(true)}
      />

      {/* Tale of the Tape */}
      <TaleOfTheTape
        onSelectFighterBet={handleAddToBetSlip}
        onOpenBets={() => setIsBetSlipOpen(true)}
      />

      {/* Face-Off Interactive Stare-down */}
      <FaceOffStaredown />

      {/* Tickets Reservation Section */}
      <TicketSection
        onOpenBookingModal={handleOpenTickets}
      />

      {/* Betting / Sportsbook Section */}
      <BettingSection
        onAddToBetSlip={handleAddToBetSlip}
        selectedBetIds={selectedBets.map((b) => b.id)}
        onOpenBets={() => setIsBetSlipOpen(true)}
      />

      {/* Undercard Fight Card */}
      <Undercard
        onSelectFighterBet={handleAddToBetSlip}
        onOpenBets={() => setIsBetSlipOpen(true)}
      />

      {/* Fan Hype Vote & Press Marquee */}
      <FanHypeVote />

      {/* College Soundboard & WhatsApp Sharing */}
      <BanterSoundboard />

      {/* Footer */}
      <Footer
        onOpenTickets={() => handleOpenTickets(TICKET_TIERS[0])}
        onOpenBets={() => setIsBetSlipOpen(true)}
      />

      {/* Ticket Modal (With PhonePe UPI QR) */}
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        initialTier={selectedTicketTier}
        bankroll={bankroll}
        onDeductBankroll={(amt) => setBankroll((prev) => Math.max(0, prev - amt))}
      />

      {/* Bet Slip Drawer (With PhonePe UPI QR) */}
      <BetSlipDrawer
        isOpen={isBetSlipOpen}
        onClose={() => setIsBetSlipOpen(false)}
        selectedBets={selectedBets}
        onRemoveBet={handleRemoveBet}
        onClearBets={handleClearBets}
        bankroll={bankroll}
        onPlaceBets={handlePlaceBets}
        placedBets={placedBets}
        onSimulateFight={handleSimulateFight}
      />

      {/* Floating Bottom Quick Action Dock */}
      <aside aria-label="Quick Actions" className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 bg-zinc-950/95 backdrop-blur-lg border border-red-500/50 rounded-full px-2 sm:px-4 py-1.5 sm:py-2 shadow-[0_0_30px_rgba(0,0,0,0.85)] flex items-center gap-2 sm:gap-3 w-[92%] sm:w-auto max-w-md justify-between sm:justify-center">
        <button
          onClick={() => {
            soundFX.playBell();
            handleOpenTickets(TICKET_TIERS[0]);
          }}
          className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 text-white font-teko text-sm sm:text-lg tracking-wider uppercase rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] flex items-center justify-center gap-1.5 transition-all"
        >
          <Ticket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
          <span>BOOK TICKET</span>
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            setIsBetSlipOpen(true);
          }}
          className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/40 font-teko text-sm sm:text-lg tracking-wider uppercase rounded-full flex items-center justify-center gap-1.5 transition-all"
        >
          <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          <span>BETSLIP {selectedBets.length > 0 && `(${selectedBets.length})`}</span>
        </button>
      </aside>
    </div>
  );
}
