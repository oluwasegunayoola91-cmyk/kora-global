import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { WHATSAPP_LINK } from '../data/productData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface NavbarProps {
  onOrderClick: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '#product' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Video', href: '#product-video' },
    { name: 'Sizes & Prices', href: '#pricing' },
    { name: 'Order Now', href: '#order-form' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-3'
          : 'bg-[#FAFAF7]/95 backdrop-blur-xs border-b border-stone-200/40 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
            aria-label="KORA Global"
          >
            <div className="w-8 h-8 rounded-lg bg-[#102A43] flex items-center justify-center text-white shadow-xs">
              <span className="font-extrabold text-sm tracking-tight text-white">K</span>
            </div>
            <span className="text-xl font-black tracking-tight text-[#102A43] font-sans">
              KORA <span className="font-bold text-[#1687C9]">GLOBAL</span>
            </span>
          </a>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5">
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#pricing');
              }}
              className="text-xs font-bold text-stone-600 hover:text-[#102A43] uppercase tracking-wider transition-colors"
            >
              Sizes & Pricing
            </a>

            {/* Header WhatsApp Contact Option */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-stone-600 hover:text-[#102A43] hover:bg-stone-100/80 transition-colors"
              aria-label="Chat with us on WhatsApp"
              title="Chat with us on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>Chat with us</span>
            </a>

            <button
              onClick={onOrderClick}
              className="relative p-2 text-stone-700 hover:text-[#102A43] rounded-lg transition-colors cursor-pointer"
              aria-label="View Order Form"
            >
              <ShoppingBag className="w-5 h-5 text-[#102A43]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1687C9] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={onOrderClick}
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1687C9] hover:bg-[#126fa6] rounded-xl transition-all shadow-xs hover:shadow-sm active:scale-98 cursor-pointer"
            >
              ORDER NOW
            </button>
          </div>

          {/* Mobile Right */}
          <div className="flex items-center gap-1 sm:gap-2 md:hidden">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#25D366] hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Chat with us on WhatsApp"
              title="Chat with us on WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            </a>

            <button
              onClick={onOrderClick}
              className="relative p-2 text-stone-700 hover:text-[#102A43]"
              aria-label="View Order"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1687C9] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-[#102A43] rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-stone-200/80 bg-white rounded-2xl shadow-xl px-4 space-y-2">
            <nav className="flex flex-col space-y-1.5 py-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="px-3 py-2 text-sm font-semibold text-stone-700 hover:text-[#102A43] hover:bg-[#EAF6FC]/50 rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#102A43] hover:bg-[#EAF6FC]/50 rounded-xl transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </nav>
            <div className="pt-2 border-t border-stone-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOrderClick();
                }}
                className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#1687C9] hover:bg-[#126fa6] rounded-xl text-center shadow-xs"
              >
                ORDER YOURS NOW
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

