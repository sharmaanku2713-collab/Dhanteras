import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Share2, PlusCircle, RotateCcw, Heart, Send } from 'lucide-react';
import { Diya } from '../common/Diya';
import { CoinShowerCanvas } from './CoinShowerCanvas';
import { AsaiPromotion } from '../common/AsaiPromotion';
import { FESTIVAL_DATA } from '../../config/brand';
import confetti from 'canvas-confetti';

interface DhanterasPageProps {
  senderName: string;
  onOpenShareModal: () => void;
  onCreateNewGreeting: () => void;
  onReplayAnimation: () => void;
}

export const DhanterasPage: React.FC<DhanterasPageProps> = ({
  senderName,
  onOpenShareModal,
  onCreateNewGreeting,
  onReplayAnimation,
}) => {
  const data = FESTIVAL_DATA.dhanteras;
  const [coinsBlasted, setCoinsBlasted] = useState(false);

  const handleSparkleBurst = () => {
    setCoinsBlasted(true);
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD166', '#FFE29F', '#FF8A00', '#D4AF37'],
    });
    setTimeout(() => setCoinsBlasted(false), 1500);
  };

  return (
    <div className="relative min-w-full overflow-hidden bg-gradient-to-b from-[#07090D] via-[#161006] to-[#07090D] text-white">
      {/* Interactive Golden Coin Shower Canvas */}
      <CoinShowerCanvas />

      {/* Decorative Traditional Marigold Toran at the Top */}
      <div className="absolute top-16 left-0 right-0 z-20 pointer-events-none flex justify-around opacity-80 overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="flex flex-col items-center animate-float-slow" style={{ animationDelay: `${i * 0.3}s` }}>
            {/* Thread */}
            <div className="w-0.5 h-6 bg-[#FF8A00]/40" />
            {/* Marigold flower */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF6A00] via-[#FF8A00] to-[#FFD166] shadow-sm shadow-orange-500/50 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E5A93B]" />
            </div>
          </div>
        ))}
      </div>

      {/* Hero Greeting Section */}
      <section className="relative z-20 pt-28 pb-16 md:pt-36 md:pb-24 px-4 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Sacred Shubh Labh Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/20 to-amber-500/10 border border-[#FFD166]/40 text-xs md:text-sm text-[#FFD166] mb-6 shadow-md shadow-orange-500/15"
        >
          <Sparkles className="w-4 h-4 text-[#FF8A00] animate-spin-slow" />
          <span className="font-semibold tracking-wider">शुभ लाभ • आरोग्य • समृद्धि</span>
          <Sparkles className="w-4 h-4 text-[#FF8A00] animate-spin-slow" />
        </motion.div>

        {/* Traditional Sacred Kalash SVG Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mb-6 cursor-pointer"
          onClick={handleSparkleBurst}
          title="Click the Kalash for golden prosperity blessings!"
        >
          {/* Ambient Diya/Kalash Glow */}
          <div className="absolute inset-0 bg-[#FFD166]/20 blur-2xl rounded-full scale-125" />

          <svg viewBox="0 0 160 160" className="w-32 h-32 md:w-40 md:h-40 overflow-visible drop-shadow-[0_10px_25px_rgba(255,170,0,0.45)]">
            <defs>
              <linearGradient id="brassKalash" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF275" />
                <stop offset="40%" stopColor="#FFD166" />
                <stop offset="80%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>
              <radialGradient id="coconutGrad" cx="45%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#8D5B4C" />
                <stop offset="70%" stopColor="#543026" />
                <stop offset="100%" stopColor="#301B15" />
              </radialGradient>
            </defs>

            {/* Mango Leaves */}
            <path d="M 80 70 C 60 40, 30 50, 25 70 C 45 65, 65 72, 80 70 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1" />
            <path d="M 80 70 C 100 40, 130 50, 135 70 C 115 65, 95 72, 80 70 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1" />
            <path d="M 80 68 C 65 30, 45 25, 45 45 C 55 55, 70 65, 80 68 Z" fill="#388E3C" />
            <path d="M 80 68 C 95 30, 115 25, 115 45 C 105 55, 90 65, 80 68 Z" fill="#388E3C" />
            <path d="M 80 65 C 75 25, 85 25, 80 15 C 75 25, 85 25, 80 65 Z" fill="#4CAF50" />

            {/* Sacred Coconut */}
            <ellipse cx="80" cy="52" rx="22" ry="25" fill="url(#coconutGrad)" />
            {/* Sacred Tilak on Coconut */}
            <line x1="74" y1="48" x2="86" y2="48" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="74" y1="52" x2="86" y2="52" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="80" cy="50" r="2.5" fill="#FFD166" />

            {/* Brass Kalash Pot */}
            <path
              d="M 55 75 
                 C 55 72, 105 72, 105 75 
                 C 105 82, 128 95, 128 120 
                 C 128 145, 108 152, 80 152 
                 C 52 152, 32 145, 32 120 
                 C 32 95, 55 82, 55 75 Z"
              fill="url(#brassKalash)"
              stroke="#B45309"
              strokeWidth="2"
            />

            {/* Traditional Auspicious Swastika / Shubh Symbol on Kalash */}
            <g transform="translate(80, 118) scale(0.65)" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round">
              <line x1="-12" y1="0" x2="12" y2="0" />
              <line x1="0" y1="-12" x2="0" y2="12" />
              <line x1="12" y1="0" x2="12" y2="8" />
              <line x1="-12" y1="0" x2="-12" y2="-8" />
              <line x1="0" y1="12" x2="-8" y2="12" />
              <line x1="0" y1="-12" x2="8" y2="-12" />
            </g>

            {/* Golden Coins Overflowing From Kalash */}
            <circle cx="50" cy="80" r="7" fill="#FFE29F" stroke="#D97706" strokeWidth="1" />
            <circle cx="110" cy="80" r="7" fill="#FFE29F" stroke="#D97706" strokeWidth="1" />
            <circle cx="42" cy="92" r="6" fill="#FFD166" stroke="#D97706" strokeWidth="1" />
            <circle cx="118" cy="92" r="6" fill="#FFD166" stroke="#D97706" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Flanking Glowing Terracotta Diyas */}
        <div className="flex items-center justify-center gap-6 md:gap-14 mb-4">
          <Diya size="md" />
          <div className="hidden sm:block">
            <Diya size="sm" />
          </div>
          <Diya size="md" />
        </div>

        {/* Main Sanskrit/Hindi Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black font-cinzel tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFF275] via-[#FFD166] to-[#FF8A00] drop-shadow-[0_4px_15px_rgba(255,209,102,0.4)]"
        >
          {data.hindiTitle}
        </motion.h2>

        {/* English Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-4xl font-extrabold text-white mt-2 tracking-wide font-cinzel"
        >
          {data.title}!
        </motion.h1>

        {/* Supporting Auspicious Blessing Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-5 text-base md:text-xl text-gray-200 max-w-2xl font-light leading-relaxed px-4"
        >
          "{data.message}"
        </motion.p>

        {/* Personalized Sender Name Card Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-8 relative rounded-3xl p-6 md:p-8 bg-gradient-to-b from-[#1F170B]/90 via-[#151008]/80 to-[#0B0906]/95 border-2 border-[#FFD166]/50 shadow-2xl shadow-orange-950/50 max-w-lg w-full"
        >
          {/* Subtle golden corner accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#FFD166]" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#FFD166]" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#FFD166]" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#FFD166]" />

          <p className="text-xs uppercase tracking-widest text-[#FF8A00] font-semibold">
            {data.signaturePrefix}
          </p>

          <h3 className="text-2xl md:text-4xl font-black text-[#FFD166] mt-1 font-cinzel tracking-wider drop-shadow-md">
            {senderName || data.defaultSender}
          </h3>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-3">
            {/* Mascot Avatar from reference sheet */}
            <div className="relative">
              <img
                src="/assets/character/aniket-happy.png"
                alt="Aniket mascot"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#FF8A00] shadow-md shadow-orange-500/30"
              />
              <span className="absolute -bottom-1 -right-1 text-xs">✨</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Aniket & ASAI LABS</p>
              <p className="text-[10px] text-gray-400">Wishing you health & abundance</p>
            </div>
          </div>
        </motion.div>

        {/* Interactive Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3.5 w-full max-w-lg"
        >
          {/* Send This Greeting Button */}
          <button
            onClick={onOpenShareModal}
            className="flex-1 min-w-[200px] flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl font-bold text-sm md:text-base text-white btn-festive-shimmer shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4 fill-current" />
            <span>Send This Greeting</span>
          </button>

          {/* Create Your Own Greeting Button */}
          <button
            onClick={onCreateNewGreeting}
            className="flex items-center justify-center gap-2 py-4 px-5 rounded-2xl font-semibold text-xs md:text-sm text-gray-200 bg-white/5 border border-white/15 hover:border-[#FFD166]/50 hover:bg-white/10 hover:text-white transition-all shadow-md"
          >
            <PlusCircle className="w-4 h-4 text-[#FFD166]" />
            <span>Create Your Own</span>
          </button>

          {/* Replay Animation Option */}
          <button
            onClick={onReplayAnimation}
            title="Replay cinematic cloud reveal"
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 text-gray-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Tip: Tap anywhere to shower gold coins */}
        <p className="mt-6 text-xs text-amber-200/60 font-light flex items-center gap-1.5 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
          <span>Tap anywhere on screen to shower golden coins!</span>
        </p>
      </section>

      {/* ASAI LABS Brand Promotion Section */}
      <AsaiPromotion />
    </div>
  );
};
