export type GuestCountTier = 50 | 100 | 200 | number;

export type EventShift = 'diurno' | 'noturno' | 'integral';

export type EventType = 
  | 'casamento'
  | 'aniversario_adulto'
  | '15_anos'
  | 'confraternizacao'
  | 'corporativo'
  | 'infantil';

export type BuffetOptionId = 'nenhum' | 'churrasco' | 'finger_food' | 'jantar_nobre' | 'boteco_chope';

export interface PackageTierPrice {
  guests: 50 | 100 | 200;
  totalPrice: number;
  pricePerPerson: number;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  isPopular?: boolean;
  pricing: Record<50 | 100 | 200, { totalPrice: number; pricePerPerson: number }>;
  features: string[];
  buffetIncluded: boolean;
  buffetDescription: string;
  depositPercentage: number;
}

export interface ExtraService {
  id: string;
  name: string;
  description: string;
  price: number;
  perGuest?: boolean;
}

export interface TourPoint {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  capacity: string;
  dimensions: string;
  highlightSpecs: string[];
  image: string;
  hotspots: {
    id: string;
    title: string;
    description: string;
    x: number; // percentage 0-100
    y: number; // percentage 0-100
  }[];
  narration: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'salao' | 'gourmet' | 'piscina' | 'buffet' | 'eventos';
  categoryLabel: string;
  imageUrl: string;
  description: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  eventType: string;
  guestsCount: number;
  date: string;
  comment: string;
  highlight: string;
  eventPhoto?: string;
}

export interface BookingSubmission {
  protocol: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: EventType;
  eventDate: string;
  shift: EventShift;
  guestCount: number;
  packageId: string;
  buffetId: BuffetOptionId;
  selectedExtras: string[];
  notes?: string;
  totalPrice: number;
  depositPrice: number;
  submittedAt: string;
}
