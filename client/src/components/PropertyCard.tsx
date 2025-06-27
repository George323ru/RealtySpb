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

  const getCategoryColor = (propertyType: string) => {
    const colors = {
      apartment: "bg-blue-500",
      house: "bg-green-500", 
      commercial: "bg-accent-orange",
      land: "bg-yellow-500",
      garage: "bg-gray-500",
      parking: "bg-purple-500"
    };
    return colors[propertyType as keyof typeof colors] || "bg-gray-500";
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement favorite functionality
    console.log("Added to favorites:", property.id);
  };

  return (
    <Link href={`/property/${property.id}`} className="block group">
      <Card className="h-full overflow-hidden border border-neutral-200 bg-white transition-all duration-300 ease-out group-hover:shadow-2xl group-hover:shadow-orange-100/50 group-hover:-translate-y-1 group-hover:scale-[1.02] cursor-pointer">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <OptimizedImage
            src={property.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"}
            alt={property.title}
            className="w-full h-64 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            width={400}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient overlay that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Property Type Badge */}
          <div className="absolute top-4 left-4 transform transition-transform duration-300 group-hover:scale-110">
            <Badge className={`${getCategoryColor(property.propertyType)} text-white font-medium px-3 py-1 shadow-lg backdrop-blur-sm`}>
              {getPropertyTypeLabel(property.propertyType)}
            </Badge>
          </div>
          
          {/* Favorite Button */}
          <div className="absolute top-4 right-4 transform transition-all duration-300 group-hover:scale-110">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500 shadow-lg transition-all duration-300 hover:shadow-xl border-0 hover:scale-110"
            >
              <Heart className="w-4 h-4 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-6 flex flex-col h-full">
          {/* Price Section */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-text-primary transition-colors duration-300 group-hover:text-accent-orange">
              {formatPrice(property.price)} ₽
            </span>
            {property.pricePerMeter && (
              <span className="text-sm text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
                {formatPricePerMeter(property.pricePerMeter)} ₽/м²
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-text-primary mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-accent-orange">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-text-secondary mb-4 transition-colors duration-300 group-hover:text-text-primary">
            <MapPin className="w-4 h-4 mr-2 text-accent-orange transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm">{property.address}</span>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between text-sm text-text-secondary mb-6 flex-1">
            <span className="transition-colors duration-300 group-hover:text-text-primary">
              {property.rooms ? `${property.rooms} комнат` : getPropertyTypeLabel(property.propertyType)}
            </span>
            {property.floor && property.totalFloors && (
              <span className="transition-colors duration-300 group-hover:text-text-primary">
                {property.floor}/{property.totalFloors} этаж
              </span>
            )}
            <span className="transition-colors duration-300 group-hover:text-text-primary">
              {parseFloat(property.area)} м²
            </span>
          </div>

          {/* Action Button */}
          <div className="mt-auto">
            <Button 
              className="w-full transition-all duration-300 group-hover:shadow-lg transform group-hover:-translate-y-0.5 bg-accent-orange hover:bg-accent-orange-dark text-white font-medium"
              size="default"
            >
              Подробнее
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
