import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, Home, Calendar } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import type { NewBuilding } from '@shared/schema';

interface NewBuildingCardProps {
  building: NewBuilding;
}

// Конфигурация карточки
const CARD_CONFIG = {
  height: 'h-[240px]',
  spacing: {
    padding: 'p-6',
    titleMargin: 'mb-4',
    detailsMargin: 'mb-5',
    priceMargin: 'mb-6',
    iconSpacing: 'mr-3'
  },
  typography: {
    title: 'text-xl font-bold text-gray-900 leading-tight',
    detail: 'text-sm text-gray-600',
    price: 'text-2xl font-bold text-orange-500',
    pricePerMeter: 'text-base text-gray-500 mt-1'
  }
};

// Утилиты
const formatPrice = (price: number): string => {
  return price.toLocaleString('ru-RU') + ' ₽';
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=240&fit=crop&crop=building",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=240&fit=crop&crop=building", 
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&h=240&fit=crop&crop=building",
  "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=500&h=240&fit=crop&crop=building"
];

const getMainImage = (building: NewBuilding): string => {
  if (building.images && building.images.length > 0) {
    return building.images[0];
  }
  return FALLBACK_IMAGES[building.id % FALLBACK_IMAGES.length];
};

const getStatusInfo = (readiness: string | null) => {
  if (!readiness) return { label: 'В продаже', color: 'bg-orange-500' };
  
  const key = readiness.toLowerCase();
  
  if (key === 'готов' || key === 'сдан') {
    return { label: 'Сдан', color: 'bg-green-500' };
  }
  if (key === 'отделка' || key === 'чистовая отделка') {
    return { label: 'Отделка', color: 'bg-blue-500' };
  }
  if (key === 'строительство' || key === 'строится') {
    return { label: 'Строится', color: 'bg-orange-500' };
  }
  if (key === 'фундамент') {
    return { label: 'Фундамент', color: 'bg-gray-500' };
  }
  if (key === 'проект') {
    return { label: 'Проект', color: 'bg-purple-500' };
  }
  
  return { label: readiness, color: 'bg-orange-500' };
};

// Подкомпоненты
const BuildingTitle = ({ name }: { name: string }) => (
  <h3 className={`${CARD_CONFIG.typography.title} ${CARD_CONFIG.spacing.titleMargin} group-hover:text-orange-500 transition-colors`}>
    {name}
  </h3>
);

const BuildingDetails = ({ building }: { building: NewBuilding }) => (
  <div className={`space-y-3 ${CARD_CONFIG.spacing.detailsMargin}`}>
    <div className="flex items-start">
      <MapPin className={`w-4 h-4 ${CARD_CONFIG.spacing.iconSpacing} text-orange-500 shrink-0 mt-0.5`} />
      <span className={`${CARD_CONFIG.typography.detail} leading-tight`}>
        {building.location}
      </span>
    </div>
    
    <div className="flex items-center">
      <Building className={`w-4 h-4 ${CARD_CONFIG.spacing.iconSpacing} text-orange-500 shrink-0`} />
      <span className={CARD_CONFIG.typography.detail}>
        {building.developer}
      </span>
    </div>
    
    {building.totalFlats && (
      <div className="flex items-center">
        <Home className={`w-4 h-4 ${CARD_CONFIG.spacing.iconSpacing} text-orange-500 shrink-0`} />
        <span className={CARD_CONFIG.typography.detail}>
          {building.totalFlats} квартир
        </span>
      </div>
    )}
  </div>
);

const BuildingPricing = ({ building }: { building: NewBuilding }) => (
  <div className={CARD_CONFIG.spacing.priceMargin}>
    <div className={CARD_CONFIG.typography.price}>
      от {formatPrice(building.priceFrom)}
    </div>
    {building.pricePerMeter && (
      <div className={CARD_CONFIG.typography.pricePerMeter}>
        {formatPrice(building.pricePerMeter)}/м²
      </div>
    )}
  </div>
);

const BuildingButton = ({ buildingId }: { buildingId: number }) => (
  <div className="mt-auto">
    <Link href={`/new-buildings/${buildingId}`}>
      <Button 
        size="sm" 
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Подробнее →
      </Button>
    </Link>
  </div>
);

const BuildingImage = ({ building }: { building: NewBuilding }) => {
  const statusInfo = getStatusInfo(building.readiness);
  
  return (
    <div className="relative w-1/2 lg:w-3/5">
      <Link href={`/new-buildings/${building.id}`}>
        <div 
          className="cursor-pointer h-full"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <OptimizedImage 
            src={getMainImage(building)} 
            alt={building.name}
            className="w-full h-full object-cover rounded-r-lg"
            width={500}
            height={240}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 60vw"
          />
        </div>
      </Link>
     
      {/* Статус бейдж */}
      <div className="absolute top-4 left-4">
        {statusInfo.label === 'Сдан' ? (
          <Badge className="bg-green-500 text-white font-medium px-3 py-1.5 text-sm">
            Сдан
          </Badge>
        ) : building.completionYear ? (
          <Badge className="bg-white/95 text-gray-900 font-medium px-3 py-1.5 text-sm shadow-md">
            <Calendar className="w-3 h-3 mr-1.5" />
            Сдача: {building.completionYear}
          </Badge>
        ) : (
          <Badge className={`${statusInfo.color} text-white font-medium px-3 py-1.5 text-sm`}>
            {statusInfo.label}
          </Badge>
        )}
      </div>
     
      {/* Hover эффект */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-lg" />
     
      {/* Счетчик фото */}
      {building.images && building.images.length > 1 && (
        <div className="absolute bottom-4 right-4">
          <div className="bg-black/80 text-white px-3 py-1.5 rounded-md text-sm flex items-center">
            <Building className="w-3 h-3 mr-1.5" />
            {building.images.length} фото
          </div>
        </div>
      )}
    </div>
  );
};

// Основной компонент
export default function NewBuildingCardHorizontal({ building }: NewBuildingCardProps) {
  return (
    <Card className="group animate-fade-in overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
      <CardContent className="p-0">
        <div className={`flex ${CARD_CONFIG.height}`}>
          
          {/* Левая часть - Контент */}
          <div className={`w-1/2 lg:w-2/5 ${CARD_CONFIG.spacing.padding} flex flex-col`}>
            <BuildingTitle name={building.name} />
            <BuildingDetails building={building} />
            <BuildingPricing building={building} />
            <BuildingButton buildingId={building.id} />
          </div>
          
          {/* Правая часть - Изображение */}
          <BuildingImage building={building} />
          
        </div>
      </CardContent>
    </Card>
  );
} 