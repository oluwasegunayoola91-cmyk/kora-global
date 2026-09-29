import React from 'react';
import { ArrowRight, Check, Shield } from 'lucide-react';
import { PRODUCT_IMAGES, WHATSAPP_LINK } from '../data/productData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface FinalCTAProps {
  onOrderClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOrderClick }) => {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-stone-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAFAF7] border border-stone-200/80 rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF6FC] text-[#1687C9] text-xs font-black uppercase tracking-widest border border-[#1687C9]/20">
              <Shield className="w-3.5 h-3.5" />
              PEACEFUL NIGHTS AWAIT
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43] tracking-tight leading-tight uppercase">
              READY FOR A MORE COMFORTABLE NIGHT?
            </h2>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Choose your KORA Global mosquito net size and place your order today.
            </p>

            {/* Quick Price List */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-black text-[#102A43] py-1">
              <span className="bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs">
                6 × 6 — ₦28,000
              </span>
              <span className="bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs">
                6 × 7 — ₦28,000
              </span>
              <span className="bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs">
                6 × 4 — ₦25,000
              </span>
            </div>

            {/* Primary Order CTA & Secondary WhatsApp Chat Option */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-[#1687C9] hover:bg-[#126fa6] rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <span>ORDER YOURS NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold text-[#102A43] hover:text-[#1687C9] bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-stone-600 font-semibold border-t border-stone-200/60">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#1687C9]" />
                Zero installation required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#1687C9]" />
                Doorstep dispatch nationwide
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#1687C9]" />
                Pouch included
              </span>
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full min-h-[380px] relative bg-stone-100">
            <img
              src={PRODUCT_IMAGES.folded}
              alt="KORA Foldable net in storage pouch"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#FAFAF7] via-transparent to-transparent opacity-60 lg:opacity-40" />

            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-stone-200 shadow-md">
              <span className="text-xs font-black text-[#102A43] block">Foldable in Seconds</span>
              <span className="text-[11px] text-stone-500 font-medium">Compact Flat Storage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
