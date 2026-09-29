import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_QUESTIONS, WHATSAPP_LINK } from '../data/productData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAFAF7] border-t border-stone-200/70 scroll-mt-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-black tracking-widest text-[#1687C9] uppercase">
            COMMON INQUIRIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43] tracking-tight uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-base text-stone-600 leading-relaxed max-w-xl mx-auto">
            Everything you need to know about sizes, daily use, folding, care, and delivery.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQ_QUESTIONS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.question}
                className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-stone-50/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-[#102A43] leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#EAF6FC] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#1687C9] text-white' : 'text-[#1687C9]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-stone-600 leading-relaxed border-t border-stone-100">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions note */}
        <div className="mt-10 text-center text-xs text-stone-500">
          Have an additional question about sizing or ordering?{' '}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1687C9] font-bold underline hover:text-[#126fa6] inline-flex items-center gap-1"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 inline text-[#25D366]" />
            <span>Chat directly with KORA Global on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

