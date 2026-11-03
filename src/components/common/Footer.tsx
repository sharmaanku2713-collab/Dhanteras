import React from 'react';
import { Heart, Instagram, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { BRAND } from '../../config/brand';

interface FooterProps {
  onNavigate: (route: 'dhanteras' | 'diwali' | 'home') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative border-t border-white/10 bg-[#07090D] pt-12 pb-8 px-4 text-gray-400 text-xs">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Col 1: Brand Info */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF8A00] to-[#FF6A00] p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#07090D] rounded-[10px] flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#FF8A00] fill-current">
                  <polygon points="50,15 82,82 64,82 50,56 36,82 18,82" fill="#FF8A00" />
                  <polygon points="50,38 60,62 40,62" fill="#07090D" />
                </svg>
              </div>
            </div>
            <span className="text-lg font-bold text-white tracking-wider font-cinzel">
              ASAI <span className="text-[#FF8A00]">LABS</span>
            </span>
          </div>

          <p className="text-gray-300 text-xs font-medium">
            "{BRAND.tagline}"
          </p>

          <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
            {BRAND.websiteService} Building fast, immersive, and custom high-converting web experiences that elevate modern brands.
          </p>

          {/* Social Badges */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={BRAND.instagramProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/50 hover:text-pink-400 transition-colors"
              title="Follow on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`tel:${BRAND.phone}`}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF8A00]/50 hover:text-[#FF8A00] transition-colors"
              title="Call Us"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Festive Experiences */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
            Festive Greetings
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onNavigate('dhanteras')}
                className="hover:text-[#FFD166] transition-colors flex items-center gap-1.5"
              >
                <span>Shubh Dhanteras Experience</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('diwali')}
                className="hover:text-[#FF8A00] transition-colors flex items-center gap-1.5"
              >
                <span>Shubh Diwali Experience</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-[#FFD166]" />
                <span>Create New Greeting</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Brand Character Mascot */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
            ASAI Mascot
          </h4>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
            <img
              src="/assets/character/aniket-waving.png"
              alt="Aniket"
              className="w-10 h-10 rounded-xl object-cover border border-[#FF8A00]"
            />
            <div>
              <p className="text-white font-bold text-xs">Aniket</p>
              <p className="text-[10px] text-gray-400">The Creator. The Builder.</p>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-gray-400">
            Follow the journey: 90 Days. 10K Followers.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
        <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with festive joy & devotion for Dhanteras and Diwali
          <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
        </p>
      </div>
    </footer>
  );
};
