import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, MessageCircle, Share2, Sparkles, ExternalLink } from 'lucide-react';
import { generateWhatsAppShareUrl, copyToClipboard, triggerWebShare } from '../../utils/url';
import { trackWhatsAppShareClicked, trackCopyLinkClicked } from '../../utils/analytics';
import { FESTIVAL_DATA } from '../../config/brand';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  festivalType: 'dhanteras' | 'diwali';
  senderName: string;
  shareUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  festivalType,
  senderName,
  shareUrl,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const festival = FESTIVAL_DATA[festivalType];
  const greetingMessage = festival.shareMessageTemplate(senderName || 'A Friend', shareUrl);
  const whatsappUrl = generateWhatsAppShareUrl(greetingMessage);

  const handleCopy = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      // Track copy_link_clicked event
      trackCopyLinkClicked(festivalType);
    }
  };

  const handleNativeShare = async () => {
    await triggerWebShare(
      `${festival.title} Greeting from ${senderName}`,
      greetingMessage,
      shareUrl
    );
  };

  const handleWhatsAppClick = () => {
    // Track whatsapp_share_clicked event
    trackWhatsAppShareClicked(festivalType);
  };

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        {/* Backdrop dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md rounded-3xl bg-[#0B1422] border border-orange-500/40 p-6 md:p-8 shadow-2xl shadow-orange-950/60 z-10 text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF6A00] to-[#FFD166] text-black mb-3 shadow-lg shadow-orange-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-cinzel text-white">
              Share Your Greeting
            </h3>
            <p className="text-xs text-gray-300 mt-1">
              Your personalized <span className="text-[#FF8A00] font-medium">{festival.title}</span> link is ready!
            </p>
          </div>

          {/* Generated URL Box */}
          <div className="mb-5">
            <label className="block text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-1.5">
              Your Personalized Link
            </label>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#07090D] border border-white/10 focus-within:border-[#FF8A00]">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent text-xs text-gray-200 px-2 flex-1 outline-none truncate font-mono"
              />
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  copied
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                    : 'bg-white/10 hover:bg-white/20 text-gray-200'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* WhatsApp Primary Action Button */}
          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-95 shadow-lg shadow-emerald-950/40 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Share Directly on WhatsApp</span>
            </a>

            {/* Native Share fallback or supplementary */}
            {hasNativeShare && (
              <button
                onClick={handleNativeShare}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-gray-200 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Share2 className="w-4 h-4 text-[#FFD166]" />
                <span>Share via Other Apps</span>
              </button>
            )}

            {/* Open Preview Link */}
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open and preview how it looks</span>
            </a>
          </div>

          {/* WhatsApp message note */}
          <div className="mt-5 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[11px] text-gray-300">
            <p className="font-semibold text-[#FFD166] mb-1">WhatsApp Message Preview:</p>
            <p className="italic text-gray-300">"{greetingMessage}"</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
