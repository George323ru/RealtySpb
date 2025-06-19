import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin } from "lucide-react";
import { formatPrice, formatPricePerMeter, formatArea, formatFloor, formatRooms } from "@/lib/utils";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const mainImage = property.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800";
  
  const getBadgeVariant = (buildingType: string) => {
    switch (buildingType) {
      case "новостройка":
        return "bg-green-500 text-white";
      case "вторичка":
        return "bg-blue-500 text-white";
      default:
        return "bg-purple-500 text-white";
    }
  };

  return (
    <Card className={`group hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${className || ''}`}>
      <div className="relative">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className={getBadgeVariant(property.buildingType || "")}>
            {property.buildingType === "новостройка" ? "Новостройка" : 
             property.buildingType === "вторичка" ? "Вторичка" :
             property.propertyType}
          </Badge>
        </div>
        <button className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
          <Heart className="w-4 h-4 text-text-secondary" />
        </button>
      </div>
      
      <CardContent className="p-6 flex flex-col flex-1">
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
        
        <p className="text-text-secondary mb-4 flex items-center flex-1">
          <MapPin className="w-4 h-4 mr-1 text-accent-orange" />
          {property.district}, {property.address}
        </p>
        
        <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
          {property.rooms && <span>{formatRooms(property.rooms)}</span>}
          {property.floor && property.totalFloors && (
            <span>{formatFloor(property.floor, property.totalFloors)}</span>
          )}
          <span>{formatArea(property.area)}</span>
        </div>
        
        <Link href={`/property/${property.id}`} className="mt-auto">
          <Button className="w-full bg-accent-orange text-white hover:bg-orange-600">
            Подробнее
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
