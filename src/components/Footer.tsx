import React, { useState } from 'react';
import { Instagram, Facebook, Video, ArrowUp } from 'lucide-react';
import { KORA_PRODUCT_CONFIG, WHATSAPP_LINK } from '../data/productData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface FooterProps {
  onNavClick: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Order', href: '#order-form' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#faq' },
  ];

  const policies: Record<string, { title: string; content: string }> = {
    Contact: {
      title: 'Contact KORA Global',
      content:
        'Customer Support Hours: Mon – Sat, 8:00 AM – 7:00 PM (WAT). WhatsApp: +234 810 432 0603. Email: support@koraglobal.com.',
    },
    Shipping: {
      title: 'Delivery Policy',
      content: KORA_PRODUCT_CONFIG.DELIVERY_POLICY,
    },
    Returns: {
      title: 'Returns & Exchange Policy',
      content: KORA_PRODUCT_CONFIG.RETURN_POLICY,
    },
    Privacy: {
      title: 'Privacy Policy',
      content:
        'KORA Global protects all customer delivery records. Data provided during order placement is solely used to process and deliver your shipment.',
    },
  };

  return (
    <footer className="bg-[#102A43] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Info (6 Cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1687C9] text-white flex items-center justify-center font-black text-sm">
                K
              </div>
              <span className="text-xl font-black tracking-tight text-white font-sans">
                KORA <span className="font-bold text-[#1687C9]">GLOBAL</span>
              </span>
            </div>

            <p className="text-sm text-stone-300 font-medium italic">
              Simple products for better everyday living.
            </p>

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Designed for real homes and comfortable sleep without the hassle of permanent fixtures.
            </p>

            {/* Social & WhatsApp Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#25D366] hover:text-white flex items-center justify-center text-stone-300 transition-colors"
                aria-label="WhatsApp"
                title="Chat with KORA Global on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-pink-600 hover:text-white flex items-center justify-center text-stone-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-blue-600 hover:text-white flex items-center justify-center text-stone-300 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-stone-800 hover:text-white flex items-center justify-center text-stone-300 transition-colors"
                aria-label="TikTok"
              >
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavClick(link.href);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Support (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              {Object.keys(policies).map((key) => (
                <li key={key}>
                  <button
                    onClick={() => setActiveModal(key)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {key}
                  </button>
                </li>
              ))}
            </ul>

            {/* Official WhatsApp Option */}
            <div className="pt-3 text-xs text-stone-400 space-y-1">
              <span className="block font-bold text-stone-200 uppercase tracking-wider text-[11px]">
                WhatsApp
              </span>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#1687C9] hover:underline"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Chat with KORA Global</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 KORA Global. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors text-stone-400 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Policy Modal */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white text-[#17202A] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-base font-bold text-[#102A43]">
                {policies[activeModal].title}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-stone-400 hover:text-stone-700 text-xs font-bold"
              >
                Close
              </button>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {policies[activeModal].content}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 px-4 bg-[#102A43] text-white rounded-xl text-xs font-bold hover:bg-[#1687C9] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
