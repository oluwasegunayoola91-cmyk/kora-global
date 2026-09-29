import React from 'react';
import { FoldHorizontal, Maximize2, Feather, CheckCircle } from 'lucide-react';
import { TRUST_STRIP_ITEMS } from '../data/productData';

export const TrustStrip: React.FC = () => {
  const icons = [FoldHorizontal, Maximize2, Feather, CheckCircle];

  return (
    <section className="border-y border-stone-200/70 bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
          {TRUST_STRIP_ITEMS.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={item.title}
                className={`flex items-start gap-3.5 pt-3 sm:pt-0 ${
                  idx === 0 ? 'pt-0' : ''
                } ${idx > 0 ? 'sm:pl-6' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#EAF6FC] text-[#1687C9] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-[#102A43] tracking-wide uppercase">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-500 leading-snug mt-0.5">
                    {item.desc}
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
