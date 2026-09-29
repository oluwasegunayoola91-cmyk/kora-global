import React from 'react';
import { ArrowRight, Sparkles, Moon, Shield } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

interface LifestyleProps {
  onOrderClick: () => void;
}

export const Lifestyle: React.FC<LifestyleProps> = ({ onOrderClick }) => {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-stone-200/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102A43] text-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#EAF6FC] text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#1687C9]" />
              SLEEP SANCTUARY
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight uppercase">
              A BETTER NIGHT STARTS WITH A BETTER SLEEPING SPACE.
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
              KORA Global is designed for real homes, real bedrooms, and real nights. Simple enough
              for everyday use. Practical enough to fold away when you need the space.
            </p>

            <div className="pt-2">
              <button
                onClick={onOrderClick}
                className="inline-flex items-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-[#102A43] bg-white hover:bg-stone-100 rounded-xl transition-all shadow-md active:scale-98"
              >
                <span>ORDER YOUR KORA NET</span>
                <ArrowRight className="w-4 h-4 text-[#102A43]" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center text-xs text-stone-300">
              <div>
                <span className="block font-black text-white text-base">360°</span>
                <span>Protection</span>
              </div>
              <div>
                <span className="block font-black text-white text-base">2 Mins</span>
                <span>Setup</span>
              </div>
              <div>
                <span className="block font-black text-white text-base">Zero</span>
                <span>Ceiling Hooks</span>
              </div>
            </div>
          </div>

          {/* Lifestyle Visual */}
          <div className="lg:col-span-6 relative h-80 sm:h-96 lg:h-full min-h-[400px]">
            <img
              src={PRODUCT_IMAGES.bedroom}
              alt="KORA Foldable net in clean tranquil bedroom"
              className="absolute inset-0 w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#102A43] via-transparent to-transparent opacity-80 lg:opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};
