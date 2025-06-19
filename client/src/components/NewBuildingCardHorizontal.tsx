import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Building, Users } from "lucide-react";
import { Link } from "wouter";
import type { NewBuilding } from "@shared/schema";

interface NewBuildingCardProps {
  building: NewBuilding;
}

// Статусы готовности
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'ready':
      return { label: 'Сдан', color: 'bg-green-500' };
    case 'finishing':
      return { label: 'Отделка', color: 'bg-blue-500' };
    case 'construction':
      return { label: 'Строится', color: 'bg-orange-500' };
    case 'foundation':
      return { label: 'Фундамент', color: 'bg-gray-500' };
    case 'project':
      return { label: 'Проект', color: 'bg-purple-500' };
    default:
      return { label: 'В продаже', color: 'bg-accent-orange' };
  }
};

// Генерация изображений новостроек
const getBuildingImage = (buildingId: number) => {
  const images = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&crop=building",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop&crop=building", 
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop&crop=building",
    "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=600&h=400&fit=crop&crop=building",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=building",
    "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=600&h=400&fit=crop&crop=building"
  ];
  return images[buildingId % images.length];
};

export default function NewBuildingCardHorizontal({ building }: NewBuildingCardProps) {
  const statusInfo = getStatusInfo(building.status || 'ready');
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white group">
      <CardContent className="p-0">
        <div className="flex h-48">
          {/* Левая часть - Текст */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-accent-orange transition-colors">
                  {building.name}
                </h3>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {building.district}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  Сдача: {building.completionDate}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="w-4 h-4 mr-2 text-gray-400" />
                  от {building.minArea} м²
                </div>
              </div>

              <div className="mb-4">
                <div className="text-2xl font-bold text-accent-orange">
                  от {formatPrice(building.pricePerSqm)}/м²
                </div>
                <div className="text-sm text-gray-500">
                  от {formatPrice(building.minPrice)}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link href={`/new-buildings/${building.id}`}>
                <Button size="sm" className="bg-accent-orange hover:bg-orange-600 text-white">
                  Подробнее
                </Button>
              </Link>
              <Button size="sm" variant="outline" className="border-gray-300 hover:border-accent-orange hover:text-accent-orange">
                Планировки
              </Button>
            </div>
          </div>
          
          {/* Правая часть - Фото */}
          <div className="relative w-64 h-48">
            <img 
              src={getBuildingImage(building.id)} 
              alt={building.name}
              className="w-full h-full object-cover"
            />
            
            {/* Статус готовности */}
            <div className="absolute top-3 left-3">
              <Badge 
                className={`${statusInfo.color} text-white font-medium px-3 py-1 text-xs`}
              >
                {statusInfo.label}
              </Badge>
            </div>
            
            {/* Количество квартир */}
            <div className="absolute bottom-3 right-3">
              <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {building.apartments || '50+'} кв.
              </div>
            </div>
            
            {/* Overlay при hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}