import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Flame, Share2 } from 'lucide-react';
import { BRAND } from '../../config/brand';
import { festiveAudio } from '../../utils/audio';
import { trackMusicPlayClicked } from '../../utils/analytics';

interface NavbarProps {
  currentRoute: 'dhanteras' | 'diwali' | 'home';
  onNavigate: (route: 'dhanteras' | 'diwali' | 'home') => void;
  onOpenShareModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenShareModal }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMusic = async () => {
    if (isPlayingMusic) {
      festiveAudio.stop();
      setIsPlayingMusic(false);
      trackMusicPlayClicked(false, currentRoute === 'home' ? undefined : currentRoute);
    } else {
      const started = await festiveAudio.start();
      setIsPlayingMusic(started);
      if (started) trackMusicPlayClicked(true, currentRoute === 'home' ? undefined : currentRoute);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090D]/90 backdrop-blur-md border-b border-orange-500/20 py-2.5 shadow-lg shadow-black/40'
          : 'bg-gradient-to-b from-[#07090D]/90 via-[#07090D]/60 to-transparent py-3.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          {/* Stylized ASAI Logo Symbol */}
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF8A00] to-[#FF6A00] p-0.5 shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#07090D] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-6 h-6 fill-current text-white">
                <polygon points="50,15 82,82 64,82 50,56 36,82 18,82" fill="#FF8A00" />
                <polygon points="50,38 60,62 40,62" fill="#07090D" />
              </svg>
              {/* Subtle flame accent */}
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#FFD166] rounded-full animate-ping" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base md:text-lg tracking-wider text-white font-cinzel">
                ASAI <span className="text-[#FF8A00]">LABS</span>
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-light tracking-wide hidden sm:block">
              {BRAND.tagline}
            </p>
          </div>
        </button>

        {/* Festival Navigation Tabs */}
        <div className="flex items-center bg-[#0B1422]/90 border border-orange-500/20 p-1 rounded-full text-xs">
          <button
            onClick={() => onNavigate('dhanteras')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
              currentRoute === 'dhanteras'
                ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF6A00] text-white shadow-md shadow-orange-500/30'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            <span className="hidden xs:inline">Shubh</span> Dhanteras
          </button>

          <button
            onClick={() => onNavigate('diwali')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
              currentRoute === 'diwali'
                ? 'bg-gradient-to-r from-[#FF6A00] to-[#E63946] text-white shadow-md shadow-red-500/30'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#FFD166]" />
            <span className="hidden xs:inline">Shubh</span> Diwali
          </button>
        </div>

        {/* Right Controls: Share + Audio Music Toggle */}
        <div className="flex items-center gap-2">
          {onOpenShareModal && (
            <button
              onClick={onOpenShareModal}
              title="Share Greeting"
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/40 text-gray-300 hover:text-white hover:bg-orange-500/10 transition-colors"
            >
              <Share2 className="w-4 h-4 text-[#FFD166]" />
            </button>
          )}

          <button
            onClick={handleToggleMusic}
            title={isPlayingMusic ? "Mute Festive Music" : "Play Festive Music"}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isPlayingMusic
                ? "bg-[#FF8A00]/20 border-[#FF8A00] text-[#FFD166] shadow-sm shadow-orange-500/40"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-[#FF8A00] animate-bounce" />
                <span className="hidden md:inline text-[11px]">Music On</span>
                {/* Audio waves */}
                <div className="flex items-end gap-0.5 h-3">
                  <div className="w-0.5 h-full bg-[#FFD166] animate-pulse" />
                  <div className="w-0.5 h-2/3 bg-[#FF8A00] animate-pulse delay-75" />
                  <div className="w-0.5 h-4/5 bg-[#FF6A00] animate-pulse delay-150" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">Music Off</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
