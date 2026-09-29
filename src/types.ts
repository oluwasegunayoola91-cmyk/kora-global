export type BedSize = '6 × 6' | '6 × 7' | '6 × 4';

export interface ProductConfig {
  PRODUCT_NAME: string;
  PRODUCT_SUBTITLE: string;
  PRODUCT_DESCRIPTION: string;
  SIZES: BedSize[];
  PRICES: Record<BedSize, number>;
  SIZE_DESCRIPTIONS: Record<BedSize, string>;
  CURRENCY: {
    code: string;
    symbol: string;
    name: string;
  };
  WHATSAPP_NUMBER: string;
  DELIVERY_POLICY: string;
  RETURN_POLICY: string;
  REVIEWS: {
    id: string;
    author: string;
    rating: number;
    quote: string;
    size?: BedSize;
  }[];
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  lga: string;
  size: BedSize;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  state: string;
  lga: string;
  size: BedSize;
  quantity: number;
  unitPrice: number;
  total: number;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
