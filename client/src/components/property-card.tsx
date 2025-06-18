import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Home, Square, Layers } from "lucide-react";
import { Property } from "@shared/schema";
import { PROPERTY_TYPES } from "@/lib/constants";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const PropertyCard = ({ property, className = "" }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const formatPricePerMeter = (price: number | null) => {
    if (!price) return "";
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽/м²";
  };

  const getPropertyTypeLabel = (type: string) => {
    const propertyType = PROPERTY_TYPES.find(pt => pt.value === type);
    return propertyType?.label || type;
  };

  const getBadgeColor = () => {
    if (property.isNewBuilding) return "bg-green-500";
    if (property.propertyType === "house") return "bg-blue-500";
    if (property.propertyType === "commercial") return "bg-purple-500";
    return "bg-gray-500";
  };

  const getBadgeText = () => {
    if (property.isNewBuilding) return "Новостройка";
    return getPropertyTypeLabel(property.propertyType);
  };

  return (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-300 property-card ${className}`}>
      <div className="relative">
        <img
          src={property.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"}
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${getBadgeColor()} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {getBadgeText()}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <button className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
            <Heart className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
        {property.transactionType === "rent" && (
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-accent-orange text-white">
              Аренда
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-text-primary">
            {formatPrice(property.price)}
          </span>
          {property.pricePerMeter && (
            <span className="text-sm text-text-secondary">
              {formatPricePerMeter(property.pricePerMeter)}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center text-text-secondary mb-4">
          <MapPin className="w-4 h-4 mr-1 text-accent-orange" />
          <span className="text-sm">{property.address}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
          {property.rooms && (
            <div className="flex items-center">
              <Home className="w-4 h-4 mr-1" />
              <span>{property.rooms} комн.</span>
            </div>
          )}
          {property.floor && property.totalFloors && (
            <div className="flex items-center">
              <Layers className="w-4 h-4 mr-1" />
              <span>{property.floor}/{property.totalFloors} эт.</span>
            </div>
          )}
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{property.area} м²</span>
          </div>
        </div>

        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {property.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {property.features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{property.features.length - 3}
              </Badge>
            )}
          </div>
        )}

        <Link href={`/property/${property.id}`}>
          <Button className="w-full bg-accent-orange text-white hover:bg-orange-600 transition-colors">
            Подробнее
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
