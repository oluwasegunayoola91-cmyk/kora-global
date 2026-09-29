import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ProblemSection } from './components/ProblemSection';
import { WhyKora } from './components/WhyKora';
import { ProductVisual } from './components/ProductVisual';
import { HowItWorks } from './components/HowItWorks';
import { ProductVideo } from './components/ProductVideo';
import { ProductSizesPricing } from './components/ProductSizesPricing';
import { Lifestyle } from './components/Lifestyle';
import { SocialProof } from './components/SocialProof';
import { OrderSection } from './components/OrderSection';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileStickyBar } from './components/MobileStickyBar';
import { BedSize, OrderDetails } from './types';

export default function App() {
  const [selectedSize, setSelectedSize] = useState<BedSize>('6 × 6');
  const [orderCount, setOrderCount] = useState(0);

  const scrollToOrder = () => {
    const el = document.querySelector('#order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPricing = () => {
    const el = document.querySelector('#pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSizeAndScroll = (size: BedSize) => {
    setSelectedSize(size);
    scrollToOrder();
  };

  const handleOrderSuccess = (_order: OrderDetails) => {
    setOrderCount((c) => c + 1);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#17202A] selection:bg-[#1687C9]/20 selection:text-[#102A43]">
      {/* 1. Sticky Navigation */}
      <Navbar
        onOrderClick={scrollToOrder}
        cartCount={orderCount}
      />

      <main>
        {/* 2. Hero Section: Hook & Primary Product Intro */}
        <Hero onOrderNow={scrollToOrder} />

        {/* 3. Trust Strip */}
        <TrustStrip />

        {/* 4. Problem Section: Tired of mosquitoes disturbing your sleep? */}
        <ProblemSection onOrderClick={scrollToOrder} />

        {/* 5. Benefits: Why Your Home Needs KORA */}
        <WhyKora />

        {/* 6. Product Visual Showcase with Callout Points */}
        <ProductVisual onOrderClick={scrollToOrder} />

        {/* 7. How Does KORA Work? (3 Steps) */}
        <HowItWorks />

        {/* 8. Product Video Demonstration */}
        <ProductVideo onChooseSize={scrollToPricing} />

        {/* 9. Product Sizes & Prices (6x6, 6x7, 6x4) */}
        <ProductSizesPricing
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onProceedToOrder={handleSelectSizeAndScroll}
        />

        {/* 9. Lifestyle: A Better Night Starts With A Better Sleeping Space */}
        <Lifestyle onOrderClick={scrollToOrder} />

        {/* 10. Social Proof: Customer Feedback */}
        <SocialProof />

        {/* 11. Embedded Direct Order Section with Dynamic Summary */}
        <OrderSection
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onOrderSuccess={handleOrderSuccess}
        />

        {/* 12. Frequently Asked Questions */}
        <FAQ />

        {/* 13. Final CTA Banner */}
        <FinalCTA onOrderClick={scrollToOrder} />
      </main>

      {/* 14. Footer */}
      <Footer onNavClick={(href) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* 15. Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* 16. Mobile Sticky CTA Bar */}
      <MobileStickyBar onOrderClick={scrollToOrder} />
    </div>
  );
}
