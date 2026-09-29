import { ProductConfig, FAQItem } from '../types';

import heroImg from '../assets/images/hero_nestguard_bed_net_1790625251432.jpg';
import foldedImg from '../assets/images/nestguard_folded_storage_1790625262234.jpg';
import bedroomImg from '../assets/images/nestguard_bedroom_lifestyle_1790625274930.jpg';
import detailImg from '../assets/images/nestguard_mesh_zipper_detail_1790625285964.jpg';
import beforeImg from '../assets/images/bedroom_without_net_1790625836710.jpg';

export const PRODUCT_IMAGES = {
  hero: heroImg,
  folded: foldedImg,
  bedroom: bedroomImg,
  detail: detailImg,
  withoutNet: beforeImg,
};

export const WHATSAPP_LINK = 'https://wa.me/2348104320603';

export const KORA_PRODUCT_CONFIG: ProductConfig = {
  PRODUCT_NAME: 'KORA Global Foldable Mosquito Net',
  PRODUCT_SUBTITLE: 'Foldable Mosquito Net for Beds',
  PRODUCT_DESCRIPTION:
    'Enjoy a more comfortable sleeping environment with the KORA Global Foldable Mosquito Net — a practical design that is easy to use, easy to fold, and easy to store.',
  SIZES: ['6 × 6', '6 × 7', '6 × 4'],
  PRICES: {
    '6 × 6': 28000,
    '6 × 7': 28000,
    '6 × 4': 25000,
  },
  SIZE_DESCRIPTIONS: {
    '6 × 6': 'Fits standard 6ft × 6ft beds',
    '6 × 7': 'Fits extended 6ft × 7ft beds',
    '6 × 4': 'Fits compact 6ft × 4ft beds',
  },
  CURRENCY: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
  },
  WHATSAPP_NUMBER: '2348104320603',
  DELIVERY_POLICY:
    'Delivery typically takes 24–48 hours for Lagos, Abuja, and Port Harcourt, and 2–4 business days for other states across Nigeria. Tracking updates are sent via WhatsApp/SMS.',
  RETURN_POLICY:
    'We offer a 7-day inspection and exchange policy if there is any factory defect or size mismatch.',
  REVIEWS: [
    {
      id: 'rev-1',
      author: 'Adebayo O.',
      rating: 5,
      quote: 'Very convenient to use and easy to fold away. Doesn’t make the bedroom feel crowded.',
      size: '6 × 6',
    },
    {
      id: 'rev-2',
      author: 'Chioma E.',
      rating: 5,
      quote: 'I like how simple the design is. Took literally two minutes to pop up over the bed.',
      size: '6 × 7',
    },
    {
      id: 'rev-3',
      author: 'Emeka N.',
      rating: 5,
      quote: 'Zero buzzing at night and the mesh still lets breeze in comfortably. Good quality.',
      size: '6 × 6',
    },
    {
      id: 'rev-4',
      author: 'Fatima M.',
      rating: 5,
      quote: 'Easy to handle and fold into the bag when cleaning the room. Highly recommended.',
      size: '6 × 4',
    },
  ],
};

export const NIGERIAN_STATES = [
  'Lagos',
  'Abuja (FCT)',
  'Rivers',
  'Oyo',
  'Ogun',
  'Delta',
  'Enugu',
  'Edo',
  'Kaduna',
  'Kano',
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Ebonyi',
  'Ekiti',
  'Gombe',
  'Imo',
  'Jigawa',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Nasarawa',
  'Niger',
  'Ondo',
  'Osun',
  'Plateau',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'OPEN',
    description: 'Unfold the mosquito net and position it over your bed.',
  },
  {
    step: '02',
    title: 'SLEEP',
    description: 'Enjoy your sleeping space with the net in place.',
  },
  {
    step: '03',
    title: 'FOLD',
    description: 'When you’re done, fold it away for convenient storage.',
  },
];

export const TRUST_STRIP_ITEMS = [
  {
    title: 'EASY TO FOLD',
    desc: 'Practical storage',
  },
  {
    title: 'MULTIPLE SIZES',
    desc: 'Choose your preferred size',
  },
  {
    title: 'LIGHTWEIGHT',
    desc: 'Easy to handle',
  },
  {
    title: 'EASY TO USE',
    desc: 'Designed for everyday use',
  },
];

export const WHY_KORA_BENEFITS = [
  {
    number: '01',
    title: 'MOSQUITO PROTECTION',
    description: 'The mesh creates a protected sleeping area.',
  },
  {
    number: '02',
    title: 'FOLDABLE DESIGN',
    description: 'Fold it away when you’re finished using it.',
  },
  {
    number: '03',
    title: 'EASY TO STORE',
    description: 'Its foldable structure makes storage more convenient.',
  },
  {
    number: '04',
    title: 'BREATHABLE MESH',
    description: 'Designed to allow airflow while creating a protected sleeping space.',
  },
  {
    number: '05',
    title: 'NO PERMANENT INSTALLATION',
    description: 'A practical alternative to permanently installed mosquito nets.',
  },
];

export const FAQ_QUESTIONS: FAQItem[] = [
  {
    question: 'What sizes are available?',
    answer: 'KORA Global currently offers 6 × 6, 6 × 7, and 6 × 4 options.',
  },
  {
    question: 'How do I choose my size?',
    answer: 'Choose the option that corresponds to your bed size.',
  },
  {
    question: 'Is the mosquito net foldable?',
    answer: 'Yes. It is designed to fold away when not in use.',
  },
  {
    question: 'Is it easy to set up?',
    answer: 'The foldable design is intended for convenient everyday setup and storage.',
  },
  {
    question: 'How do I clean it?',
    answer:
      'Gently wipe down with a damp cloth or hand-wash in lukewarm water with mild soap. Air dry in the shade. Avoid machine washing or bleach.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Delivery typically takes 24–48 hours for Lagos, Abuja, and Port Harcourt, and 2–4 business days for other states across Nigeria. Tracking updates are sent via WhatsApp/SMS.',
  },
  {
    question: 'Do you accept returns?',
    answer:
      'Yes. We offer a 7-day inspection and return/exchange policy if there is any factory defect or size mismatch, provided the item is clean and with its original carry bag.',
  },
];

export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}
