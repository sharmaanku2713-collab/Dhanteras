import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Instagram, Sparkles, CheckCircle2, ArrowRight, Phone, Laptop, Zap, ShieldCheck } from 'lucide-react';
import { BRAND } from '../../config/brand';

export const AsaiPromotion: React.FC = () => {
  const whatsappCtaUrl = `https://wa.me/919352089550?text=${encodeURIComponent(
    'Hi ASAI LABS, I visited your festive greeting website and want to discuss a website.'
  )}`;

  return (
    <section className="relative py-16 px-4 overflow-hidden border-t border-orange-500/20 bg-gradient-to-b from-[#07090D] via-[#0B1422] to-[#07090D]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF6A00]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#FFD166]/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Subtle Brand Badge */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/20 to-orange-500/10 border border-orange-500/30 text-xs md:text-sm text-[#FFD166] mb-3 shadow-sm shadow-orange-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>Official ASAI LABS Experience</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-cinzel"
          >
            Want a Website <span className="text-[#FF8A00]">Like This?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            {BRAND.name} creates modern, responsive and engaging websites for businesses and brands.
          </motion.p>
        </div>

        {/* Character + Offer Card */}
        <div className="relative rounded-3xl bg-[#0B1422]/90 border border-orange-500/30 p-6 md:p-10 shadow-2xl shadow-orange-950/40 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Aniket Character Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 flex flex-col items-center justify-center text-center"
            >
              <div className="relative group">
                {/* Warm orange rim lighting halo */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#FF6A00] via-[#FF8A00] to-[#FFD166] rounded-2xl blur-lg opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Character Image Container */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#FF8A00]/80 bg-[#07090D] shadow-xl max-w-[310px]">
                  <img
                    src="/assets/character/aniket-desk-full.png"
                    alt="Aniket — ASAI LABS Creator Mascot"
                    className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle character overlay label */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#07090D] via-[#07090D]/80 to-transparent p-3 pt-6 flex items-center justify-between">
                    <div>
                      <p className="text-white text-xs font-bold tracking-wide">Aniket</p>
                      <p className="text-[#FF8A00] text-[10px] font-medium">ASAI LABS Creator & Builder</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FF6A00]/20 border border-[#FF6A00]/50 px-2 py-0.5 rounded text-[10px] text-[#FFD166]">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Official</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tagline under character */}
              <p className="mt-4 text-xs md:text-sm font-semibold tracking-wider uppercase text-gray-400">
                "{BRAND.tagline}"
              </p>
            </motion.div>

            {/* Right: Pitch & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF8A00]">
                  Professional Web Engineering
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                  Elevate Your Brand With Next-Gen Digital Experiences
                </h3>
                <p className="text-sm md:text-base text-gray-300 mt-2 leading-relaxed">
                  Whether you need an interactive campaign, an e-commerce platform, a corporate website, or custom creative animations, ASAI LABS delivers tailored high-speed web solutions.
                </p>
              </div>

              {/* Feature pillars */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Zap className="w-4 h-4 text-[#FF8A00] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Ultra-Fast & Mobile First</h4>
                    <p className="text-[11px] text-gray-400">Flawless on smartphones</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Laptop className="w-4 h-4 text-[#FFD166] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Interactive Motion</h4>
                    <p className="text-[11px] text-gray-400">Cinematic user engagement</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <MessageCircle className="w-4 h-4 text-[#25D366] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white">WhatsApp Integrated</h4>
                    <p className="text-[11px] text-gray-400">Seamless lead generation</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-[#FF8A00] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Modern Engineering</h4>
                    <p className="text-[11px] text-gray-400">Clean, scalable code</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {/* CTA 1: Build My Website (WhatsApp) */}
                <a
                  href={whatsappCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF6A00] via-[#FF8A00] to-[#FF6A00] hover:from-[#FF8A00] hover:to-[#FF6A00] shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-white fill-current" />
                  <span>Build My Website</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* CTA 2: Follow on Instagram */}
                <a
                  href={BRAND.instagramProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-gray-200 bg-white/5 border border-white/15 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-white transition-all"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Follow on Instagram</span>
                </a>
              </div>

              {/* Contact direct display */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#FF8A00]" />
                  <span>Call / WhatsApp:</span>
                  <a
                    href={`tel:${BRAND.phone}`}
                    className="font-semibold text-white hover:text-[#FFD166] transition-colors"
                  >
                    {BRAND.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-1.5 text-[11px]">
                  <span>Tagline:</span>
                  <span className="text-[#FFD166] font-medium">{BRAND.tagline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
