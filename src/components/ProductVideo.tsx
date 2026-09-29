import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { WHATSAPP_LINK } from '../data/productData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ProductVideoProps {
  onChooseSize: () => void;
}

export const ProductVideo: React.FC<ProductVideoProps> = ({ onChooseSize }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="product-video"
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#FAFAF7] border-t border-stone-200/70 scroll-mt-14 relative overflow-hidden"
    >
      {/* Background ambient accents matching KORA Global aesthetic */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#EAF6FC] rounded-full blur-3xl pointer-events-none -z-10 opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-12">
          {/* Eyebrow badge */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF6FC] text-[#1687C9] text-xs font-black tracking-widest uppercase border border-[#1687C9]/20 shadow-xs transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Play className="w-3 h-3 fill-[#1687C9]" />
            <span>SEE THE PRODUCT IN ACTION</span>
          </div>

          {/* Headline */}
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43] tracking-tight uppercase leading-tight transition-all duration-700 delay-100 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            SEE THE KORA MOSQUITO NET IN ACTION
          </h2>

          {/* Supporting Text */}
          <p
            className={`text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            See how the foldable design works, how it fits around your bed, and why it makes everyday
            sleep more comfortable and protected.
          </p>
        </div>

        {/* Video Player Container */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'
          }`}
        >
          <div className="bg-white rounded-3xl p-3 sm:p-5 shadow-2xl border border-stone-200/90 relative">
            {/* 16:9 Responsive Video Aspect Ratio Container */}
            <div className="relative aspect-video w-full rounded-2xl sm:rounded-[1.35rem] overflow-hidden bg-[#102A43] shadow-inner">
              <iframe
                src="https://www.youtube.com/embed/jWcJKYvU6Gw?rel=0&modestbranding=1"
                title="KORA Global Foldable Mosquito Net in Action"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
              />
            </div>

            {/* Subtle caption beneath player */}
            <div className="mt-3.5 px-2 flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-stone-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1687C9]" />
                Official KORA Demonstration Video
              </span>
              <span className="hidden sm:inline text-stone-400 font-medium">
                Tap play to watch folding & setup demonstration
              </span>
            </div>
          </div>
        </div>

        {/* Conversion Flow Below Video */}
        <div
          className={`max-w-2xl mx-auto text-center mt-12 sm:mt-14 space-y-4 transition-all duration-700 delay-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="space-y-1">
            <span className="text-xs font-black tracking-widest text-[#1687C9] uppercase">
              LIKE WHAT YOU SEE?
            </span>
            <p className="text-base sm:text-lg font-bold text-[#102A43]">
              Choose your size and order your KORA Foldable Mosquito Net today.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onChooseSize}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-[#1687C9] hover:bg-[#126fa6] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
            >
              <span>CHOOSE YOUR SIZE</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          <div className="pt-2 text-xs text-stone-600 flex items-center justify-center gap-1.5">
            <span>Questions about the product? </span>
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
