import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PRODUCT_IMAGES, WHATSAPP_LINK } from '../data/productData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface HeroProps {
  onOrderNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle light-blue glow behind product */}
      <div className="absolute top-1/4 right-1/6 w-96 h-96 bg-[#EAF6FC] rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-[#1687C9]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Direct Hook & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF6FC] text-[#1687C9] text-xs font-black tracking-widest uppercase border border-[#1687C9]/20 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1687C9]" />
              KORA GLOBAL
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-[#102A43] tracking-tight leading-[1.12] text-balance">
              <span>PROTECT YOUR SLEEP.</span> <br />
              <span className="text-[#1687C9]">SLEEP MORE COMFORTABLY.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Enjoy a more comfortable sleeping environment with the KORA Global Foldable Mosquito
              Net — a practical design that is easy to use, easy to fold, and easy to store.
            </p>

            {/* CTA & Secondary Microcopy */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-[#1687C9] hover:bg-[#126fa6] rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <span>ORDER YOURS NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-stone-500">
                <span className="font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1687C9]" />
                  Available in multiple sizes (6 × 6, 6 × 7, 6 × 4)
                </span>
                <span className="hidden sm:inline text-stone-300">•</span>
                <span className="flex items-center gap-1">
                  Questions?{' '}
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#1687C9] hover:underline inline-flex items-center gap-1"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Chat with us on WhatsApp</span>
                  </a>
                </span>
              </div>
            </div>

            {/* Trust checkmarks */}
            <div className="pt-4 border-t border-stone-200/70 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-[#102A43]">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#1687C9] stroke-[2.5]" />
                Pop-up Setup
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#1687C9] stroke-[2.5]" />
                No Ceiling Hooks
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#1687C9] stroke-[2.5]" />
                Storage Bag Included
              </span>
            </div>
          </div>

          {/* Right Column: Hero Product Visual */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Product Frame with subtle floating motion */}
              <div className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-xl border border-stone-200/80 overflow-hidden animate-subtle-float">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
                  <img
                    src={PRODUCT_IMAGES.hero}
                    alt="KORA Global Foldable Mosquito Net installed over a bed in a clean bedroom"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/15 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Tag */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#1687C9]/20 shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1687C9]" />
                  <span className="text-[11px] font-black tracking-wider text-[#102A43] uppercase">
                    FOLDABLE DESIGN
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 bg-[#102A43]/90 text-white backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-medium">
                  Signature Blue Structural Frame
                </div>
              </div>

              {/* Sub-label */}
              <p className="mt-3 text-center text-xs text-stone-500 font-medium">
                Transparent High-Flow Mesh · Reinforced Flexible Arches · Fits Over Any Bed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

