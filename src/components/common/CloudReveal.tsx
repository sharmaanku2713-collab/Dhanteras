import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FastForward, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CloudRevealProps {
  festivalType: 'dhanteras' | 'diwali';
  senderName: string;
  onAnimationComplete?: () => void;
  onReplayRequest?: () => void;
}

export const CloudReveal: React.FC<CloudRevealProps> = ({
  festivalType,
  senderName,
  onAnimationComplete,
}) => {
  // Animation step: 0 = Init atmosphere, 1 = Clouds drift in & warm glow, 2 = Clouds parting & diya reveal, 3 = Completed/Revealed
  const [step, setStep] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  useEffect(() => {
    // Sequence timing
    // Step 0 -> Step 1 at 400ms
    const t1 = setTimeout(() => {
      setStep(1);
    }, 400);

    // Step 1 -> Step 2 at 1800ms (clouds begin parting)
    const t2 = setTimeout(() => {
      setStep(2);
      // Trigger festive sparkle celebration
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: festivalType === 'dhanteras' ? ['#FFD166', '#FF8A00', '#FFE29F'] : ['#FF6A00', '#FFD166', '#FF007F'],
        disableForReducedMotion: true,
      });
    }, 2000);

    // Step 2 -> Step 3 at 3600ms (reveal finishes)
    const t3 = setTimeout(() => {
      setStep(3);
      setIsRevealed(true);
      if (onAnimationComplete) onAnimationComplete();
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [festivalType, onAnimationComplete]);

  const handleSkip = () => {
    setStep(3);
    setIsRevealed(true);
    if (onAnimationComplete) onAnimationComplete();
  };

  if (isRevealed) {
    return null;
  }

  const isDhanteras = festivalType === 'dhanteras';

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-[#07090D] select-none">
      {/* Skip button for quick access */}
      <button
        onClick={handleSkip}
        className="absolute top-20 right-6 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs text-gray-200 border border-white/15 transition-all shadow-md hover:scale-105"
      >
        <span>Skip Reveal</span>
        <FastForward className="w-3.5 h-3.5 text-[#FFD166]" />
      </button>

      {/* STEP 1: Ambient background lighting & glowing central mandala */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: step >= 1 ? 0.9 : 0.2,
          scale: step >= 2 ? 1.4 : 1,
        }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className={`w-[600px] h-[600px] rounded-full blur-3xl opacity-75 ${
            isDhanteras
              ? 'bg-gradient-to-r from-[#FF8A00]/40 via-[#FFD166]/50 to-[#E5A93B]/30'
              : 'bg-gradient-to-r from-[#FF6A00]/40 via-[#FFD166]/40 to-[#9D4EDD]/30'
          }`}
        />
      </motion.div>

      {/* Behind-clouds Center Festive Teaser */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{
          opacity: step >= 1 ? 1 : 0,
          scale: step >= 2 ? 1.05 : 0.95,
          y: step >= 2 ? 0 : 20,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute z-20 text-center px-4 max-w-lg pointer-events-none"
      >
        {/* Sacred greeting intro */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="mx-auto w-24 h-24 mb-4 opacity-70"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#FFD166] fill-current">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M50 15 L53 35 L70 30 L58 45 L75 55 L58 65 L70 80 L53 75 L50 95 L47 75 L30 80 L42 65 L25 55 L42 45 L30 30 L47 35 Z"
              fill="url(#mandalaGrad)"
              opacity="0.8"
            />
            <defs>
              <linearGradient id="mandalaGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFD166" />
                <stop offset="100%" stopColor="#FF8A00" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-[#FFD166] mb-1 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF8A00] animate-pulse" />
          Special Festive Blessing
          <Sparkles className="w-4 h-4 text-[#FF8A00] animate-pulse" />
        </p>

        <h1 className="text-3xl md:text-5xl font-extrabold font-cinzel text-white drop-shadow-md">
          {isDhanteras ? 'शुभ धनतेरस' : 'शुभ दीपावली'}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="mt-3 text-sm md:text-base text-gray-300 font-light"
        >
          A sacred greeting sent from{' '}
          <span className="font-bold text-[#FFD166] underline decoration-[#FF8A00]">
            {senderName || 'A Friend'}
          </span>
        </motion.p>
      </motion.div>

      {/* STEP 2 & 3: Layered Clouds that part gracefully */}

      {/* Left Top Cloud Layer */}
      <motion.div
        initial={{ x: '-15%', opacity: 0.85, scale: 1 }}
        animate={{
          x: step >= 2 ? '-130%' : step === 1 ? '-5%' : '-25%',
          opacity: step >= 2 ? 0 : 0.9,
          scale: step >= 2 ? 1.15 : 1,
        }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[-10%] left-[-15%] w-[110%] md:w-[70%] h-[75%] z-30 pointer-events-none"
      >
        <svg viewBox="0 0 800 600" className="w-full h-full filter drop-shadow-[0_15px_30px_rgba(255,138,0,0.15)]">
          <defs>
            <linearGradient id="cloudGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1929" stopOpacity="0.98" />
              <stop offset="45%" stopColor="#2A1E20" stopOpacity="0.95" />
              <stop offset="85%" stopColor="#4A2511" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF8A00" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M 50 450 
               C 50 350, 150 280, 260 300 
               C 310 190, 470 170, 540 270 
               C 620 230, 720 280, 740 370 
               C 800 420, 810 520, 730 580 
               C 650 620, 200 640, 50 450 Z"
            fill="url(#cloudGradLeft)"
          />
        </svg>
      </motion.div>

      {/* Right Bottom Cloud Layer */}
      <motion.div
        initial={{ x: '15%', opacity: 0.85, scale: 1 }}
        animate={{
          x: step >= 2 ? '130%' : step === 1 ? '5%' : '25%',
          opacity: step >= 2 ? 0 : 0.9,
          scale: step >= 2 ? 1.15 : 1,
        }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[-10%] right-[-15%] w-[110%] md:w-[70%] h-[75%] z-30 pointer-events-none"
      >
        <svg viewBox="0 0 800 600" className="w-full h-full filter drop-shadow-[0_-15px_30px_rgba(255,209,102,0.15)]">
          <defs>
            <linearGradient id="cloudGradRight" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#15121F" stopOpacity="0.98" />
              <stop offset="40%" stopColor="#231718" stopOpacity="0.95" />
              <stop offset="80%" stopColor="#54250C" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFD166" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path
            d="M 750 200 
               C 750 300, 650 370, 540 350 
               C 490 460, 330 480, 260 380 
               C 180 420, 80 370, 60 280 
               C 0 230, -10 130, 70 70 
               C 150 30, 600 10, 750 200 Z"
            fill="url(#cloudGradRight)"
          />
        </svg>
      </motion.div>

      {/* Golden Mist Horizon Transition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step === 1 ? 0.6 : step === 2 ? 0.9 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-radial from-[#FF8A00]/25 via-transparent to-transparent pointer-events-none z-25"
      />
    </div>
  );
};
