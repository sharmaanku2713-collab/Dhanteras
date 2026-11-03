import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Share2, PlusCircle, RotateCcw, Flame, Send } from 'lucide-react';
import { Diya } from '../common/Diya';
import { FireworksCanvas } from './FireworksCanvas';
import { AsaiPromotion } from '../common/AsaiPromotion';
import { FESTIVAL_DATA } from '../../config/brand';
import confetti from 'canvas-confetti';

interface DiwaliPageProps {
  senderName: string;
  onOpenShareModal: () => void;
  onCreateNewGreeting: () => void;
  onReplayAnimation: () => void;
}

export const DiwaliPage: React.FC<DiwaliPageProps> = ({
  senderName,
  onOpenShareModal,
  onCreateNewGreeting,
  onReplayAnimation,
}) => {
  const data = FESTIVAL_DATA.diwali;
  const [sparkleActive, setSparkleActive] = useState(false);

  const triggerCelebration = () => {
    setSparkleActive(true);
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#FF6A00', '#FFD166', '#FF006E', '#00F5D4', '#9D4EDD'],
    });
    setTimeout(() => setSparkleActive(false), 1200);
  };

  return (
    <div className="relative min-w-full overflow-hidden bg-gradient-to-b from-[#07090D] via-[#0E0A1E] to-[#07090D] text-white">
      {/* Interactive Fireworks Canvas */}
      <FireworksCanvas />

      {/* Decorative Traditional Hanging Akash Kandils (Diwali Lanterns) */}
      <div className="absolute top-14 left-0 right-0 z-20 pointer-events-none flex justify-between px-6 md:px-16 overflow-hidden">
        {/* Left Lantern */}
        <div className="flex flex-col items-center animate-float-slow">
          <div className="w-0.5 h-12 bg-gradient-to-b from-orange-400/50 to-orange-400" />
          <svg viewBox="0 0 70 110" className="w-12 h-20 md:w-16 md:h-28 drop-shadow-[0_0_15px_rgba(255,106,0,0.6)]">
            <defs>
              <linearGradient id="kandilGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF006E" />
                <stop offset="50%" stopColor="#FF8A00" />
                <stop offset="100%" stopColor="#FFD166" />
              </linearGradient>
            </defs>
            {/* Diamond lantern body */}
            <polygon points="35,5 65,45 35,85 5,45" fill="url(#kandilGrad1)" stroke="#FFD166" strokeWidth="1.5" />
            <polygon points="35,18 52,45 35,72 18,45" fill="#FFE29F" opacity="0.85" />
            {/* Hanging tassels */}
            <line x1="20" y1="85" x2="18" y2="108" stroke="#FFD166" strokeWidth="1.5" />
            <line x1="28" y1="85" x2="28" y2="110" stroke="#FF8A00" strokeWidth="1.5" />
            <line x1="35" y1="85" x2="35" y2="114" stroke="#FF006E" strokeWidth="2" />
            <line x1="42" y1="85" x2="42" y2="110" stroke="#FF8A00" strokeWidth="1.5" />
            <line x1="50" y1="85" x2="52" y2="108" stroke="#FFD166" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Center subtle glowing stars */}
        <div className="hidden md:flex gap-16 pt-4 opacity-70">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FFD166] animate-ping" style={{ animationDuration: `${2 + i * 0.8}s` }} />
          ))}
        </div>

        {/* Right Lantern */}
        <div className="flex flex-col items-center animate-float-slow" style={{ animationDelay: '1.2s' }}>
          <div className="w-0.5 h-16 bg-gradient-to-b from-orange-400/50 to-orange-400" />
          <svg viewBox="0 0 70 110" className="w-12 h-20 md:w-16 md:h-28 drop-shadow-[0_0_15px_rgba(255,138,0,0.6)]">
            <defs>
              <linearGradient id="kandilGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9D4EDD" />
                <stop offset="50%" stopColor="#FF6A00" />
                <stop offset="100%" stopColor="#FFD166" />
              </linearGradient>
            </defs>
            <polygon points="35,5 65,45 35,85 5,45" fill="url(#kandilGrad2)" stroke="#FFD166" strokeWidth="1.5" />
            <polygon points="35,18 52,45 35,72 18,45" fill="#FFE29F" opacity="0.85" />
            <line x1="20" y1="85" x2="18" y2="108" stroke="#FFD166" strokeWidth="1.5" />
            <line x1="28" y1="85" x2="28" y2="110" stroke="#FF8A00" strokeWidth="1.5" />
            <line x1="35" y1="85" x2="35" y2="114" stroke="#9D4EDD" strokeWidth="2" />
            <line x1="42" y1="85" x2="42" y2="110" stroke="#FF8A00" strokeWidth="1.5" />
            <line x1="50" y1="85" x2="52" y2="108" stroke="#FFD166" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Hero Greeting Section */}
      <section className="relative z-20 pt-28 pb-16 md:pt-36 md:pb-24 px-4 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Deepotsav Aura Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500/10 via-red-500/20 to-orange-500/10 border border-orange-500/40 text-xs md:text-sm text-[#FFD166] mb-6 shadow-md shadow-orange-500/20"
        >
          <Flame className="w-4 h-4 text-[#FF8A00] animate-pulse" />
          <span className="font-semibold tracking-wider">दीपोत्सव • प्रकाश • आनंद</span>
          <Flame className="w-4 h-4 text-[#FF8A00] animate-pulse" />
        </motion.div>

        {/* Intricate Traditional Rangoli Centerpiece SVG */}
        <motion.div
          initial={{ rotate: -45, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative mb-6 cursor-pointer"
          onClick={triggerCelebration}
          title="Click the Rangoli for fireworks burst!"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[#FF6A00]/25 blur-3xl rounded-full scale-125" />

          <svg viewBox="0 0 160 160" className="w-32 h-32 md:w-44 md:h-44 overflow-visible drop-shadow-[0_0_30px_rgba(255,106,0,0.5)]">
            <defs>
              <linearGradient id="rangoliRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF006E" />
                <stop offset="50%" stopColor="#FF8A00" />
                <stop offset="100%" stopColor="#FFD166" />
              </linearGradient>
            </defs>

            {/* Rangoli outer ring */}
            <circle cx="80" cy="80" r="74" fill="none" stroke="url(#rangoliRing)" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="80" cy="80" r="66" fill="#140924" stroke="#FFD166" strokeWidth="1.5" />

            {/* 8 Flower Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle} 80 80)`}>
                <path
                  d="M 80 80 Q 70 45 80 25 Q 90 45 80 80 Z"
                  fill={idx % 2 === 0 ? '#FF6A00' : '#FF006E'}
                  stroke="#FFD166"
                  strokeWidth="1"
                />
                <circle cx="80" cy="30" r="2.5" fill="#FFE29F" />
              </g>
            ))}

            {/* Central Lotus & Diya */}
            <circle cx="80" cy="80" r="22" fill="#831843" stroke="#FFD166" strokeWidth="2" />
            <circle cx="80" cy="80" r="14" fill="#FF8A00" />
            <circle cx="80" cy="80" r="7" fill="#FFF275" className="animate-pulse" />
          </svg>
        </motion.div>

        {/* Row of Glowing Diyas */}
        <div className="flex items-center justify-center gap-4 md:gap-10 mb-4">
          <Diya size="sm" />
          <Diya size="lg" />
          <Diya size="sm" />
        </div>

        {/* Hindi Greeting */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black font-cinzel tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFE29F] via-[#FFD166] to-[#FF8A00] drop-shadow-[0_4px_20px_rgba(255,138,0,0.5)]"
        >
          {data.hindiTitle}
        </motion.h2>

        {/* English Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-4xl font-extrabold text-white mt-2 tracking-wide font-cinzel"
        >
          {data.title}!
        </motion.h1>

        {/* Supporting Message */}
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
          className="mt-8 relative rounded-3xl py-7 px-8 md:py-9 md:px-12 bg-gradient-to-b from-[#1E1128]/90 via-[#150B1F]/80 to-[#0A0610]/95 border-2 border-orange-500/50 shadow-2xl shadow-orange-950/60 max-w-lg w-full text-center"
        >
          {/* Subtle golden corner accents */}
          <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#FFD166]" />
          <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#FFD166]" />
          <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#FFD166]" />
          <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#FFD166]" />

          <p className="text-xs md:text-sm uppercase tracking-widest text-[#FF8A00] font-semibold">
            WITH WARM WISHES FROM
          </p>

          <h3 className="text-3xl md:text-5xl font-black text-[#FFD166] mt-2 font-cinzel tracking-wider drop-shadow-md uppercase break-words">
            {senderName || 'A FRIEND'}
          </h3>
        </motion.div>

        {/* Action CTAs */}
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

        {/* Interactive tip */}
        <p className="mt-6 text-xs text-orange-200/60 font-light flex items-center gap-1.5 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
          <span>Tap anywhere on the night sky to launch fireworks!</span>
        </p>
      </section>

      {/* ASAI LABS Brand Promotion Section */}
      <AsaiPromotion />
    </div>
  );
};
