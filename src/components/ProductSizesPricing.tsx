import React from 'react';
import { Check, ArrowRight, Bed } from 'lucide-react';
import { BedSize } from '../types';
import { KORA_PRODUCT_CONFIG, WHATSAPP_LINK, formatPrice } from '../data/productData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ProductSizesPricingProps {
  selectedSize: BedSize;
  onSelectSize: (size: BedSize) => void;
  onProceedToOrder: (size: BedSize) => void;
}

export const ProductSizesPricing: React.FC<ProductSizesPricingProps> = ({
  selectedSize,
  onSelectSize,
  onProceedToOrder,
}) => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#FAFAF7] border-t border-stone-200/70 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs font-black tracking-widest text-[#1687C9] uppercase">
            CLEAR & HONEST PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43] tracking-tight uppercase">
            PRODUCT SIZES & PRICES
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Choose the size that fits your bed. Click to select, then complete your delivery details below.
          </p>
        </div>

        {/* 3 Size Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {KORA_PRODUCT_CONFIG.SIZES.map((size) => {
            const isSelected = selectedSize === size;
            const price = KORA_PRODUCT_CONFIG.PRICES[size];
            const desc = KORA_PRODUCT_CONFIG.SIZE_DESCRIPTIONS[size];

            return (
              <div
                key={size}
                onClick={() => onSelectSize(size)}
                className={`relative rounded-3xl p-6 sm:p-7 cursor-pointer border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#EAF6FC] border-[#1687C9] shadow-xl ring-2 ring-[#1687C9]/30 -translate-y-1'
                    : 'bg-white border-stone-200/90 hover:border-stone-300 hover:bg-stone-50/50'
                }`}
              >
                <div>
                  {/* Bed visual icon */}
                  <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center mb-4 text-[#1687C9] shadow-xs">
                    <Bed className="w-6 h-6 stroke-[2]" />
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-2xl font-black text-[#102A43]">
                      {size}
                    </h3>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'bg-[#1687C9] border-[#1687C9] text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 font-medium mb-6">
                    {desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/80">
                  <span className="text-2xl sm:text-3xl font-black text-[#102A43] tabular-nums block mb-1">
                    {formatPrice(price)}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-[#1687C9]' : 'text-stone-400'
                    }`}
                  >
                    {isSelected ? '✓ Selected for order' : 'Click to select size'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Panel to jump to order form */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <button
            onClick={() => onProceedToOrder(selectedSize)}
            className="inline-flex items-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-[#1687C9] hover:bg-[#126fa6] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
          >
            <span>ORDER {selectedSize} NOW — {formatPrice(KORA_PRODUCT_CONFIG.PRICES[selectedSize])}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          <p className="text-xs text-stone-500">
            Selected size automatically pre-filled in the order form below.
          </p>

          <div className="pt-2 text-xs text-stone-600">
            <span>Need help choosing a size? </span>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#1687C9] hover:underline inline-flex items-center gap-1"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Chat with us on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
