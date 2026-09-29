import React from 'react';
import { WHATSAPP_LINK } from '../data/productData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const WhatsAppButton: React.FC = () => {
  return (
    <aside
      aria-label="WhatsApp Customer Support"
      className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 z-40"
    >
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95 cursor-pointer border border-white/25"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-5 sm:h-5 fill-white text-white shrink-0" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          Chat with us
        </span>
      </a>
    </aside>
  );
};

