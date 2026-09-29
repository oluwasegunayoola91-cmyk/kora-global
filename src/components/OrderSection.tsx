import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowRight,
  Plus,
  Minus,
  MessageCircle,
  PhoneCall,
  Clock,
  RotateCcw,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { BedSize, OrderDetails, OrderFormData } from '../types';
import {
  KORA_PRODUCT_CONFIG,
  NIGERIAN_STATES,
  PRODUCT_IMAGES,
  WHATSAPP_LINK,
  formatPrice,
} from '../data/productData';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface OrderSectionProps {
  selectedSize: BedSize;
  onSelectSize: (size: BedSize) => void;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({
  selectedSize,
  onSelectSize,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState<Omit<OrderFormData, 'size' | 'quantity'>>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    state: 'Lagos',
    lga: '',
  });

  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  const unitPrice = KORA_PRODUCT_CONFIG.PRICES[selectedSize];
  const totalPrice = unitPrice * quantity;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((q) => Math.max(1, Math.min(10, q + delta)));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required for delivery call.';
    } else if (formData.phone.trim().length < 9) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.address.trim()) newErrors.address = 'Detailed Delivery Address is required.';
    if (!formData.state) newErrors.state = 'Please select a State.';
    if (!formData.lga.trim()) newErrors.lga = 'Local Government is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          state: formData.state,
          lga: formData.lga.trim(),
          size: selectedSize,
          quantity,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.orderStored) {
        setIsSubmitting(false);
        setConfirmedOrder(data.order);
        onOrderSuccess(data.order);
      } else {
        setIsSubmitting(false);
        setSubmitError(
          data.error ||
            'We were unable to complete your order automatically. Please contact our dispatch desk directly on WhatsApp.'
        );
      }
    } catch (err) {
      console.error('Order submission network error:', err);
      setIsSubmitting(false);
      setSubmitError(
        'A connection issue occurred while submitting your order. Please place your order directly via WhatsApp for instant processing.'
      );
    }
  };

  const whatsappHref = `https://wa.me/${KORA_PRODUCT_CONFIG.WHATSAPP_NUMBER.replace(
    /[^0-9]/g,
    ''
  )}?text=${encodeURIComponent(
    `Hello KORA Global, I just placed an order for the Foldable Mosquito Net (${selectedSize}, Qty: ${quantity}).`
  )}`;

  return (
    <section id="order-form" className="py-20 md:py-28 bg-white border-t border-stone-200/70 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
          <span className="text-xs font-black tracking-widest text-[#1687C9] uppercase">
            FAST DIRECT ORDER
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102A43] tracking-tight uppercase">
            READY TO GET YOUR KORA?
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Choose your preferred size and fill in your delivery details below.
          </p>
        </div>

        {confirmedOrder ? (
          /* ================= ORDER CONFIRMATION SCREEN ================= */
          <div className="max-w-2xl mx-auto bg-[#FAFAF7] border-2 border-[#1687C9]/30 rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#EAF6FC] text-[#1687C9] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black text-[#1687C9] tracking-widest uppercase">
                ORDER SUCCESSFUL
              </span>
              <h3 className="text-3xl font-black text-[#102A43] uppercase">
                ORDER RECEIVED!
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you for choosing KORA Global. Your order details have been received and our
                dispatch team is preparing your package.
              </p>
            </div>

            {/* Receipt Details Card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 text-left space-y-3.5 shadow-xs">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-stone-100 text-stone-500">
                <span>Order Reference:</span>
                <span className="font-mono font-black text-sm text-[#102A43]">
                  {confirmedOrder.orderId}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#17202A]">
                <div className="flex justify-between">
                  <span className="text-stone-500">Product:</span>
                  <span className="font-bold text-[#102A43]">
                    {KORA_PRODUCT_CONFIG.PRODUCT_NAME}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Selected Size:</span>
                  <span className="font-bold text-[#1687C9]">{confirmedOrder.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Quantity:</span>
                  <span className="font-bold">{confirmedOrder.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Delivery To:</span>
                  <span className="font-semibold text-right max-w-[240px]">
                    {confirmedOrder.address}, {confirmedOrder.lga}, {confirmedOrder.state}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Customer Phone:</span>
                  <span className="font-semibold">{confirmedOrder.phone}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-sm font-black text-[#102A43]">
                <span>TOTAL:</span>
                <span className="text-lg text-[#1687C9] tabular-nums">
                  {formatPrice(confirmedOrder.total)}
                </span>
              </div>
            </div>

            {/* Post-order CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white text-white" />
                <span>WHATSAPP US</span>
              </a>

              <button
                onClick={() => setConfirmedOrder(null)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#102A43] hover:bg-[#1687C9] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                <span>ORDER ANOTHER ITEM</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================= ACTIVE EMBEDDED ORDER FORM ================= */
          <div className="max-w-5xl mx-auto bg-[#FAFAF7] border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-xl">
            {submitError && (
              <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
                <div className="flex items-start sm:items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
                  <p className="font-medium leading-relaxed">{submitError}</p>
                </div>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl shadow-xs transition-colors shrink-0"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white text-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column (7 Cols): The Delivery Form */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-lg font-black text-[#102A43] uppercase tracking-wide">
                    1. Select Your Size
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Click to choose your exact bed dimensions:
                  </p>

                  {/* 3 Clickable Size Selection Radios */}
                  <div className="grid grid-cols-3 gap-2.5 mt-3">
                    {KORA_PRODUCT_CONFIG.SIZES.map((size) => {
                      const isSelected = selectedSize === size;
                      const price = KORA_PRODUCT_CONFIG.PRICES[size];

                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => onSelectSize(size)}
                          className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                            isSelected
                              ? 'bg-[#EAF6FC] border-[#1687C9] text-[#102A43] shadow-xs'
                              : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          <span className="text-xs font-black">{size}</span>
                          <span className="text-[11px] font-bold tabular-nums text-[#1687C9]">
                            {formatPrice(price)}
                          </span>
                          {isSelected && (
                            <span className="text-[9px] font-bold text-[#1687C9] flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" /> Selected
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-stone-200">
                  <div>
                    <span className="text-xs font-black text-[#102A43] uppercase tracking-wide block">
                      Quantity
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Standard package per bed
                    </span>
                  </div>

                  <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 text-stone-600 hover:text-stone-900 disabled:opacity-30 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-black text-[#102A43] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                      className="p-2 text-stone-600 hover:text-stone-900 disabled:opacity-30 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Delivery Information Fields */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-black text-[#102A43] uppercase tracking-wide">
                    2. Delivery Details
                  </h3>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Babatunde Adeleke"
                      className={`w-full text-sm px-4 py-3 bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#1687C9] ${
                        errors.fullName ? 'border-red-400' : 'border-stone-300'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] font-bold text-red-500 mt-1 block">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">
                        Phone Number (for call) *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 0803 123 4567"
                        className={`w-full text-sm px-4 py-3 bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#1687C9] ${
                          errors.phone ? 'border-red-400' : 'border-stone-300'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] font-bold text-red-500 mt-1 block">
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. name@example.com"
                        className="w-full text-sm px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#1687C9]"
                      />
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">
                      Detailed Delivery Address *
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. No 14 Admiralty Way, Flat 3B, Lekki Phase 1"
                      className={`w-full text-sm px-4 py-2.5 bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#1687C9] ${
                        errors.address ? 'border-red-400' : 'border-stone-300'
                      }`}
                    />
                    {errors.address && (
                      <span className="text-[11px] font-bold text-red-500 mt-1 block">
                        {errors.address}
                      </span>
                    )}
                  </div>

                  {/* State & LGA */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full text-sm px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#1687C9]"
                      >
                        {NIGERIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#102A43] uppercase mb-1">
                        Local Government (LGA) *
                      </label>
                      <input
                        type="text"
                        name="lga"
                        value={formData.lga}
                        onChange={handleInputChange}
                        placeholder="e.g. Eti-Osa / Ikeja"
                        className={`w-full text-sm px-4 py-3 bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#1687C9] ${
                          errors.lga ? 'border-red-400' : 'border-stone-300'
                        }`}
                      />
                      {errors.lga && (
                        <span className="text-[11px] font-bold text-red-500 mt-1 block">
                          {errors.lga}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (5 Cols): Dynamic Order Summary & Primary CTA */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-md space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                      <img
                        src={PRODUCT_IMAGES.hero}
                        alt="KORA Foldable Mosquito Net"
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1687C9] uppercase">
                        Product
                      </h4>
                      <h3 className="text-sm font-black text-[#102A43] leading-snug">
                        KORA FOLDABLE MOSQUITO NET
                      </h3>
                      <span className="text-xs font-bold text-stone-500">
                        Size: {selectedSize}
                      </span>
                    </div>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="space-y-2 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>Selected Size:</span>
                      <strong className="text-[#102A43]">{selectedSize}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <strong className="text-[#102A43]">{quantity}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Product Price:</span>
                      <strong className="text-[#102A43] tabular-nums">
                        {formatPrice(unitPrice)}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Delivery:</span>
                      <span className="font-semibold text-stone-500">
                        To be calculated / free promo
                      </span>
                    </div>
                    <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-base font-black text-[#102A43]">
                      <span>TOTAL:</span>
                      <span className="text-2xl text-[#1687C9] tabular-nums">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* The Primary Order Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-[#1687C9] hover:bg-[#126fa6] rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>PROCESSING YOUR ORDER...</span>
                    ) : (
                      <>
                        <span>PLACE MY ORDER</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>

                  <div className="text-center space-y-1">
                    <p className="text-[11px] text-stone-500 font-semibold flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1687C9]" />
                      <span>Zero risk · Payment confirmation upon dispatch</span>
                    </p>
                    <p className="text-[10px] text-stone-400">
                      Our dispatch coordinator will phone you immediately to confirm delivery.
                    </p>
                  </div>
                </div>

                {/* Trust Highlights under summary */}
                <div className="bg-white rounded-2xl p-4 border border-stone-200 text-xs space-y-2 text-stone-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#1687C9] shrink-0" />
                    <span><strong>Nationwide Delivery:</strong> 24–48 hours for major cities.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-[#1687C9] shrink-0" />
                    <span><strong>7-Day Inspection:</strong> Complete peace of mind guarantee.</span>
                  </div>
                </div>

                {/* WhatsApp Help Option */}
                <div className="bg-[#EAF6FC]/70 rounded-2xl p-3.5 border border-[#1687C9]/20 text-xs text-center text-stone-700">
                  <span>Need help with your order? </span>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#1687C9] hover:underline inline-flex items-center gap-1"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Chat with KORA Global on WhatsApp</span>
                  </a>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
