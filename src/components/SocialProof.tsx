import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { KORA_PRODUCT_CONFIG } from '../data/productData';

export const SocialProof: React.FC = () => {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#FAFAF7] border-t border-stone-200/70 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs font-black tracking-widest text-[#1687C9] uppercase">
            COMMUNITY REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43] tracking-tight uppercase">
            WHAT CUSTOMERS ARE SAYING
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Everyday experiences from households using KORA Global for uninterrupted sleep.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {KORA_PRODUCT_CONFIG.REVIEWS.map((r) => (
            <div
              key={r.id}
              className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#102A43]">{r.author}</h4>
                  {r.size && <span className="text-stone-400">Used for {r.size} bed</span>}
                </div>
                <span className="font-semibold text-[#1687C9] bg-[#EAF6FC] px-2 py-0.5 rounded-md">
                  Verified Order
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
