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