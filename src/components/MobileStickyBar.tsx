import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { KORA_PRODUCT_CONFIG, formatPrice } from '../data/productData';

interface MobileStickyBarProps {
  onOrderClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOrderClick }) => {
  const lowestPrice = KORA_PRODUCT_CONFIG.PRICES['6 × 4'];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3">
      <div className="min-w-0">
        <span className="text-[11px] font-black text-[#102A43] block leading-tight truncate">
          KORA Foldable Net
        </span>
        <span className="text-xs text-[#1687C9] font-black tabular-nums">
          From {formatPrice(lowestPrice)}
        </span>
      </div>

      <button
        onClick={onOrderClick}
        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1687C9] active:bg-[#126fa6] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
      >
        <span>ORDER YOURS</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
