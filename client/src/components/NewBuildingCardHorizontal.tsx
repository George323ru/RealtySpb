import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Building, Users, Home } from "lucide-react";
import { Link } from "wouter";
import type { NewBuilding } from "@shared/schema";

interface NewBuildingCardProps {
  building: NewBuilding;
}

// Статусы готовности на основе readiness
const getStatusInfo = (readiness: string | null) => {
  if (!readiness) return { label: 'В продаже', color: 'bg-accent-orange' };
  
  switch (readiness.toLowerCase()) {
    case 'готов':
    case 'сдан':
      return { label: 'Сдан', color: 'bg-green-500' };
    case 'отделка':
    case 'чистовая отделка':
      return { label: 'Отделка', color: 'bg-blue-500' };
    case 'строительство':
    case 'строится':
      return { label: 'Строится', color: 'bg-orange-500' };
    case 'фундамент':
      return { label: 'Фундамент', color: 'bg-gray-500' };
    case 'проект':
      return { label: 'Проект', color: 'bg-purple-500' };
    default:
      return { label: readiness, color: 'bg-accent-orange' };
  }
};

export default function NewBuildingCardHorizontal({ building }: NewBuildingCardProps) {
  const statusInfo = getStatusInfo(building.readiness);
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  const getMainImage = () => {
    if (building.images && building.images.length > 0) {
      return building.images[0];
    }
    // Fallback изображения для новостроек
    const defaultImages = [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=building",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=building", 
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop&crop=building",
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=400&h=300&fit=crop&crop=building"
    ];
    return defaultImages[building.id % defaultImages.length];
  };

  return (
    <Card className="card-unified group animate-fade-in">
      <CardContent className="p-0">
        <div className="flex h-[200px]">
          {/* Левая часть - Информация */}
          <div className="w-1/2 p-lg flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-orange transition-[var(--transition-fast)] leading-tight">
                {building.name}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-start text-text-secondary">
                  <MapPin className="w-4 h-4 mr-2 text-accent-orange shrink-0 mt-0.5" />
                  <span className="text-sm leading-tight">{building.location}</span>
                </div>
                
                <div className="flex items-center text-text-secondary">
                  <Building className="w-4 h-4 mr-2 text-accent-orange shrink-0" />
                  <span className="text-sm">{building.developer}</span>
                </div>
                
                {building.totalFlats && (
                  <div className="flex items-center text-text-secondary">
                    <Home className="w-4 h-4 mr-2 text-accent-orange shrink-0" />
                    <span className="text-sm">{building.totalFlats} квартир</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-xl font-bold text-accent-orange">
                  от {formatPrice(building.priceFrom)}
                </div>
                {building.pricePerMeter && (
                  <div className="text-sm text-text-secondary">
                    {formatPrice(building.pricePerMeter)}/м²
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <Link href={`/new-buildings/${building.id}`}>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Подробнее →
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Правая часть - Фото */}
          <div className="relative w-1/2 shrink-0">
            <Link href={`/new-buildings/${building.id}`}>
              <img 
                src={getMainImage()} 
                alt={building.name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </Link>
            
            {/* Плашка статуса/сдачи */}
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
            
            {/* Overlay при hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Индикатор количества фото */}
            {building.images && building.images.length > 1 && (
              <div className="absolute bottom-4 right-4">
                <div className="bg-black/80 text-white px-3 py-1.5 rounded-md text-sm flex items-center">
                  <Building className="w-3 h-3 mr-1.5" />
                  {building.images.length} фото
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}