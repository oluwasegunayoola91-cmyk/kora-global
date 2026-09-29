import React from 'react';
import { Sparkles, Maximize2, ShieldCheck, ArrowRight } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

interface ProductVisualProps {
  onOrderClick: () => void;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({ onOrderClick }) => {
  const callouts = [
    {
      title: 'FOLDABLE STRUCTURE',
      desc: 'Flexible high-memory steel frame opens and collapses smoothly.',
      position: 'top-6 left-6 sm:top-10 sm:left-10',
    },
    {
      title: 'MESH NETTING',
      desc: 'Breathable ultra-fine micro-mesh keeps insects out with free airflow.',
      position: 'top-6 right-6 sm:top-10 sm:right-10',
    },
    {
      title: 'BED-SIZED DESIGN',
      desc: 'Engineered specifically to sit squarely over standard 6ft mattresses.',
      position: 'bottom-20 left-6 sm:bottom-12 sm:left-10',
    },
    {
      title: 'EASY STORAGE',
      desc: 'Collapses into a lightweight circular pouch for daytime tidiness.',
      position: 'bottom-6 right-6 sm:bottom-12 sm:right-10',
    },
  ];

  return (
    <section id="product" className="py-20 md:py-28 bg-[#FAFAF7] border-t border-stone-200/70 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs font-black tracking-widest text-[#1687C9] uppercase">
            PRODUCT ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43] tracking-tight uppercase">
            SIMPLE DESIGN. SMARTER SLEEPING.
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Every component is crafted for practical protection and bedroom harmony.
          </p>
        </div>

        {/* Large Visual Showcase with Callout Cards */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-4 sm:p-8 border border-stone-200/80 shadow-xl space-y-8">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/70">
            <img
              src={PRODUCT_IMAGES.hero}
              alt="KORA Global Foldable Mosquito Net detailed architecture"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-950/15 pointer-events-none" />

            {/* Subtle Callout badges overlaid on image on larger screens */}
            <div className="hidden md:block">
              {callouts.map((c) => (
                <div
                  key={c.title}
                  className={`absolute ${c.position} bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-[#1687C9]/30 shadow-lg max-w-[210px] space-y-1`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1687C9]" />
                    <span className="text-[11px] font-black tracking-wider text-[#102A43] uppercase">
                      {c.title}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-stone-600 leading-tight">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Callout Cards for Mobile/Tablet or structured view */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {callouts.map((c) => (
              <div
                key={c.title}
                className="bg-[#FAFAF7] border border-stone-200 rounded-2xl p-4 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1687C9]" />
                  <h4 className="text-xs font-black text-[#102A43] uppercase tracking-wide">
                    {c.title}
                  </h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick CTA banner */}
          <div className="pt-2 text-center">
            <button
              onClick={onOrderClick}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#1687C9] hover:text-[#126fa6] transition-colors"
            >
              <span>See available sizes and place your order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
