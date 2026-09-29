import React from 'react';
import { ShieldCheck, FoldHorizontal, Archive, Wind, Wrench } from 'lucide-react';
import { WHY_KORA_BENEFITS } from '../data/productData';

export const WhyKora: React.FC = () => {
  const icons = [ShieldCheck, FoldHorizontal, Archive, Wind, Wrench];

  return (
    <section id="benefits" className="py-20 md:py-28 bg-white border-t border-stone-200/70 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs font-black tracking-widest text-[#1687C9] uppercase">
            PRODUCT BENEFITS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43] tracking-tight uppercase">
            WHY YOUR HOME NEEDS KORA
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Five reasons Nigerian families and sleepers trust KORA Global for everyday bedroom comfort.
          </p>
        </div>

        {/* 5 Benefit Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_KORA_BENEFITS.map((b, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={b.number}
                className={`bg-[#FAFAF7] border border-stone-200/80 rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-[#1687C9]/40 ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-[#1687C9] font-mono">
                      {b.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/80 text-[#1687C9] flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-[#102A43] uppercase tracking-wide mb-2">
                    {b.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-1.5 text-xs font-bold text-[#1687C9]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1687C9]" />
                  <span>KORA Standard Quality</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
