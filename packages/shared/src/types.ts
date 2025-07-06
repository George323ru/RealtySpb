export interface SearchFilters {
  propertyType?: string;
  transactionType?: string;
  district?: string;
  priceFrom?: number;
  priceTo?: number;
  minArea?: number;
  maxArea?: number;
  rooms?: number;
  isNewBuilding?: boolean;
}

export interface PropertySearchParams extends SearchFilters {
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'area' | 'created' | 'rooms';
  sortOrder?: 'asc' | 'desc';
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
}

export interface PropertyRequestFormData {
  name: string;
  phone: string;
  email?: string;
  propertyType: string;
  transactionType: string;
  district?: string;
  priceFrom?: number;
  priceTo?: number;
  minArea?: number;
  maxArea?: number;
  rooms?: number;
  message?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface HeroSearchData {
  action: 'buy' | 'sell' | 'rent';
  propertyType: string;
  district: string;
  priceFrom: string;
  priceTo: string;
}

// Types for General Service Page (the one with all service cards)
export interface ServicePageDirection {
  icon: string;
  title: string;
  description: string;
  cta?: string;
  slug: string;
}

export interface ServicePageWorkStep {
  id: string;
  title: string;
  description: string;
}

export interface ServicePageAdvantage {
  icon: string; // Corresponds to a lucide-react icon name
  title: string;
  description: string;
}

export interface ServicePageFaqItem {
  icon: string;
  question: string;
  answer: string;
}

export interface ServicePageReview {
  author: string;
  text: string;
}

export interface ServicePageData {
  directions: ServicePageDirection[];
  howItWorksSteps: ServicePageWorkStep[];
  advantages: ServicePageAdvantage[];
  faqItems: ServicePageFaqItem[];
  reviews: ServicePageReview[];
}

// =================================================================
// Types for Specific Service Detail Page (e.g., Heating, Design)
// =================================================================

interface Cta {
  primaryCta: string;
  secondaryCta?: string;
}

interface Audience {
  icon: string;
  title: string;
}

interface PainGainItem {
  text: string;
}

interface SubService {
  icon: string;
  title:string;
  description: string;
}

interface CaseStudy {
  image: string;
  title: string;
  problem: string;
  solution: string;
  duration: string;
  budget: string;
  videoUrl?: string;
  beforeImage?: string;
  afterImage?: string;
}

interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

interface Advantage {
  icon: string;
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceDetailData {
  serviceName: string;
  metaDescription: string;
  hero: Cta & {
    title: string;
    subtitle: string;
    image: string;
    videoUrl?: string;
  };
  targetAudiences: Audience[];
  painGain: {
    painTitle: string;
    gainTitle: string;
    pains: PainGainItem[];
    gains: PainGainItem[];
  };
  subServices: SubService[];
  caseStudies: CaseStudy[];
  processSteps: ProcessStep[];
  advantages: Advantage[];
  faq: FaqItem[];
  districts?: string[];
}

export interface EstimateExample {
  type: string; // Например: "Студия", "2-комнатная квартира"
  price: string; // Например: "от 180 000 ₽"
  works: string[]; // Перечень основных работ
  duration: string; // Например: "7 дней"
  image?: string; // URL изображения (опционально)
}

export interface EngineerExpert {
  name: string;
  photo: string;
  experience: string; // Например: '12 лет опыта'
  quote: string;
  position: string;
} 