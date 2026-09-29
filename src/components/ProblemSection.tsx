import React from 'react';
import { Volume2, PackageX, Wrench, ArrowRight } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

interface ProblemSectionProps {
  onOrderClick: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOrderClick }) => {
  const problems = [
    {
      icon: Volume2,
      title: 'MOSQUITOES AT NIGHT',
      desc: "Don't let constant buzzing and mosquito interruptions ruin your night.",
    },
    {
      icon: PackageX,
      title: 'BULKY SOLUTIONS',
      desc: 'Avoid solutions that are difficult to set up or store.',
    },
    {
      icon: Wrench,
      title: 'COMPLICATED INSTALLATION',
      desc: "KORA's foldable design is made for convenient everyday use.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAFAF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-black tracking-widest text-[#1687C9] uppercase">
            WHY YOUR HOME NEEDS THIS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43] tracking-tight uppercase">
            TIRED OF MOSQUITOES DISTURBING YOUR SLEEP?
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Your bedroom should be a place to rest. KORA Global helps create a more comfortable
            sleeping space without requiring a complicated permanent installation.
          </p>
        </div>

        {/* 3 Visual Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {problems.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white border border-stone-200/80 rounded-3xl p-7 lg:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] text-[#1687C9] flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-base font-black text-[#102A43] tracking-wide">
                  {p.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Transition Bridge to KORA Solution */}
        <div className="max-w-3xl mx-auto bg-[#102A43] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            There’s A Smarter, Simpler Way.
          </h3>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
            The KORA Global Foldable Mosquito Net provides instant over-bed protection without nails,
            strings, or permanent brackets.
          </p>
          <div className="pt-2">
            <button
              onClick={onOrderClick}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-black uppercase tracking-wider text-[#102A43] bg-white hover:bg-stone-100 rounded-xl transition-all shadow-md active:scale-98"
            >
              <span>SEE PRICING & ORDER</span>
              <ArrowRight className="w-4 h-4 text-[#102A43]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
