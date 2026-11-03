import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Flame, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BRAND, FESTIVAL_DATA } from '../../config/brand';
import { generateGreetingUrl, sanitizeSenderName } from '../../utils/url';
import { Diya } from './Diya';
import confetti from 'canvas-confetti';

interface GreetingCreatorProps {
  initialFestival?: 'dhanteras' | 'diwali';
  onGreetingCreated: (festival: 'dhanteras' | 'diwali', senderName: string, url: string) => void;
}

export const GreetingCreator: React.FC<GreetingCreatorProps> = ({
  initialFestival = 'diwali',
  onGreetingCreated,
}) => {
  const [selectedFestival, setSelectedFestival] = useState<'dhanteras' | 'diwali'>(initialFestival);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const festival = FESTIVAL_DATA[selectedFestival];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeSenderName(name);

    if (!cleanName || cleanName.length === 0) {
      setError('Please enter your name to create your greeting.');
      return;
    }

    setError(null);
    const url = generateGreetingUrl(festival.route, cleanName);

    // Trigger celebration confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: selectedFestival === 'dhanteras' ? ['#FFD166', '#FF8A00', '#FFE29F'] : ['#FF6A00', '#FFD166', '#FF007F'],
    });

    onGreetingCreated(selectedFestival, cleanName, url);
  };

  return (
    <div className="relative py-12 md:py-16 px-4 max-w-4xl mx-auto">
      {/* Header / Intro */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-orange-500/30 text-xs md:text-sm text-[#FFD166] mb-4 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#FF8A00]" />
          <span>Interactive Festive Experience by {BRAND.name}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-cinzel leading-tight"
        >
          Create Your <span className="text-[#FF8A00]">Personalized</span> Greeting
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed"
        >
          Surprise your friends and family on WhatsApp with a personalized cinematic opening animation, glowing diyas, and warm wishes.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 bg-[#0B1422]/95 border border-orange-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-orange-950/40 backdrop-blur-xl"
        >
          {/* Festival Switcher */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Select Celebration:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedFestival('dhanteras')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs md:text-sm font-bold border transition-all ${
                  selectedFestival === 'dhanteras'
                    ? 'bg-gradient-to-r from-[#FF8A00] to-[#E5A93B] text-black border-[#FFD166] shadow-lg shadow-orange-500/25'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Happy Dhanteras</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFestival('diwali')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs md:text-sm font-bold border transition-all ${
                  selectedFestival === 'diwali'
                    ? 'bg-gradient-to-r from-[#FF6A00] to-[#E63946] text-white border-[#FF8A00] shadow-lg shadow-red-500/25'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>Happy Diwali</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="senderName"
                className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
              >
                Your Name <span className="text-[#FF8A00]">*</span>
              </label>
              <div className="relative">
                <input
                  id="senderName"
                  type="text"
                  maxLength={40}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. Aniket, Sharma Family, Priya..."
                  className={`w-full px-4 py-3.5 rounded-2xl bg-[#07090D] border text-sm text-white placeholder-gray-500 outline-none transition-all ${
                    error
                      ? 'border-red-500 ring-2 ring-red-500/30'
                      : 'border-white/15 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/30'
                  }`}
                />
              </div>

              {error && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-red-400">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Privacy notice - Only ask sender name */}
            <div className="flex items-center gap-2 text-[11px] text-gray-400 bg-white/5 p-3 rounded-xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                100% Private. We only ask for your name. No receiver info or login required.
              </span>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl font-bold text-sm md:text-base text-white btn-festive-shimmer shadow-xl shadow-orange-500/30 active:scale-[0.98] transition-transform"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Create Greeting Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* WhatsApp Flow Explanation */}
          <div className="mt-6 pt-5 border-t border-white/10 text-xs text-gray-400 space-y-1.5">
            <p className="font-semibold text-gray-200">How WhatsApp Sharing Works:</p>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-gray-400">
              <li>Enter your name and generate your link.</li>
              <li>Click the WhatsApp button to share with friends, family, or groups.</li>
              <li>When they tap your link, they experience the cinematic reveal with your name!</li>
            </ol>
          </div>
        </motion.div>

        {/* Right Column: Live Interactive Card Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-5 flex flex-col items-center"
        >
          <div className="w-full text-center mb-2">
            <span className="text-xs uppercase tracking-widest text-[#FFD166] font-semibold">
              Live Recipient Preview
            </span>
          </div>

          {/* Miniature Greeting Card */}
          <div className="w-full relative rounded-3xl overflow-hidden p-6 border-2 border-[#FF8A00]/50 bg-gradient-to-b from-[#14121F] via-[#0E0B16] to-[#07090D] shadow-2xl shadow-orange-900/30 text-center">
            {/* Top Diya */}
            <div className="flex justify-center mb-2">
              <Diya size="sm" />
            </div>

            <p className="text-[10px] tracking-widest uppercase text-[#FF8A00] font-semibold">
              {festival.hindiTitle}
            </p>

            <h3 className="text-xl md:text-2xl font-extrabold font-cinzel text-white mt-0.5">
              {festival.title}!
            </h3>

            <p className="text-xs text-gray-300 mt-2 line-clamp-2 px-2 font-light">
              "{festival.message}"
            </p>

            {/* Sender signature showcase */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                {festival.signaturePrefix}
              </p>
              <p className="text-base font-bold text-[#FFD166] mt-0.5">
                {name.trim() || 'Your Name Here'}
              </p>
            </div>

            {/* Aniket Mascot Mini-Badge */}
            <div className="mt-4 flex items-center justify-center gap-2 bg-white/5 py-1.5 px-3 rounded-full border border-white/10">
              <img
                src="/assets/character/aniket-happy.png"
                alt="Aniket Mascot"
                className="w-6 h-6 rounded-full object-cover border border-[#FF8A00]"
              />
              <span className="text-[10px] text-gray-300">
                Crafted with <span className="text-[#FF8A00] font-bold">ASAI LABS</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
