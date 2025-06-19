import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  const formatPricePerMeter = (price: number | null) => {
    if (!price) return "";
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  const getPropertyTypeLabel = (type: string) => {
    const types = {
      apartment: "Квартира",
      house: "Дом",
      commercial: "Коммерческая",
      land: "Земля",
      garage: "Гараж",
      parking: "Машиноместо"
    };
    return types[type as keyof typeof types] || type;
  };

  const getCategoryLabel = (category: string) => {
    const categories = {
      new_building: "Новостройка",
      secondary: "Вторичная",
      rental: "Аренда"
    };
    return categories[category as keyof typeof categories] || category;
  };

  const getCategoryColor = (propertyType: string) => {
    const colors = {
      apartment: "bg-primary",
      house: "bg-accent-orange", 
      commercial: "bg-accent-orange",
      land: "bg-primary",
      garage: "bg-neutral-500",
      parking: "bg-accent"
    };
    return colors[propertyType as keyof typeof colors] || "bg-neutral-500";
  };

  return (
    <Card className="card-unified group animate-fade-in">
      <div className="relative">
        <OptimizedImage
          src={property.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"}
          alt={property.title}
          className="w-full h-64"
          width={400}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${getCategoryColor(property.propertyType)} text-white font-medium px-3 py-1 rounded-md`}>
            {getPropertyTypeLabel(property.propertyType)}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500 min-h-[44px] min-w-[44px]"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-text-primary">
            {formatPrice(property.price)} ₽
          </span>
          {property.pricePerMeter && (
            <span className="text-sm text-text-secondary">
              {formatPricePerMeter(property.pricePerMeter)} ₽/м²
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
          {property.title}
        </h3>
        <p className="text-text-secondary mb-4 flex items-center">
          <MapPin className="w-4 h-4 mr-1 text-accent-orange" />
          {property.address}
        </p>
        <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
          <span>{property.rooms ? `${property.rooms} комнат` : getPropertyTypeLabel(property.propertyType)}</span>
          {property.floor && property.totalFloors && (
            <span>{property.floor}/{property.totalFloors} этаж</span>
          )}
          <span>{parseFloat(property.area)} м²</span>
        </div>
        <Link href={`/property/${property.id}`}>
          <Button className="w-full" size="default">
            Подробнее
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
