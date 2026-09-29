import React from 'react';
import { Sparkles, Moon, FoldHorizontal } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/productData';

export const HowItWorks: React.FC = () => {
  const icons = [Sparkles, Moon, FoldHorizontal];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white border-t border-stone-200/70 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs font-black tracking-widest text-[#1687C9] uppercase">
            SIMPLE THREE-STEP ROUTINE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43] tracking-tight uppercase">
            HOW DOES KORA WORK?
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Ready in under two minutes without tools, ceiling anchors, or assembly hassles.
          </p>
        </div>

        {/* 3 Steps Horizontal Timeline on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden md:block absolute top-14 left-1/6 right-1/6 h-0.5 bg-stone-200 -z-0" />

          {HOW_IT_WORKS_STEPS.map((s, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={s.step}
                className="bg-[#FAFAF7] border border-stone-200/80 rounded-3xl p-8 space-y-4 relative z-10 transition-all hover:shadow-md hover:border-[#1687C9]/40 text-center flex flex-col items-center"
              >
                {/* Step Icon Badge with Step Number */}
                <div className="relative mb-2">
                  <div className="w-16 h-16 rounded-2xl bg-[#EAF6FC] text-[#1687C9] flex items-center justify-center border-2 border-white shadow-md mx-auto">
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>
                  <span className="absolute -bottom-2.5 bg-[#102A43] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full font-mono">
                    {s.step}
                  </span>
                </div>

                <div className="pt-2">
                  <h3 className="text-xl font-black text-[#102A43] uppercase tracking-wide">
                    {s.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mt-2">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
