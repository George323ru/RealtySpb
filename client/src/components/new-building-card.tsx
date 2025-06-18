import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Calendar, ArrowRight, Users, Ruler } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { NewBuilding } from "@shared/schema";

interface NewBuildingCardProps {
  building: NewBuilding;
  className?: string;
}

export default function NewBuildingCard({ building, className = "" }: NewBuildingCardProps) {
  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full ${className}`}>
      <div className="relative">
        <img 
          src={building.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"} 
          alt={building.name}
          className="w-full h-48 object-cover" 
        />
        <div className="absolute top-4 left-4">
          <Badge 
            className={
              building.readiness === "Сдан" 
                ? "bg-green-500 text-white shadow-lg" 
                : "bg-blue-500 text-white shadow-lg"
            }
          >
            {building.readiness || "В продаже"}
          </Badge>
        </div>
        {building.pricePerMeter && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-white text-accent-orange shadow-lg font-semibold">
              от {formatPrice(building.pricePerMeter)}/м²
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <h3 className="font-bold text-xl text-text-primary mb-2 line-clamp-2">
            {building.name}
          </h3>
          
          <div className="flex items-center text-text-secondary mb-3">
            <MapPin className="w-4 h-4 mr-1 text-accent-orange" />
            <span className="text-sm">{building.location}</span>
          </div>

          <p className="text-sm text-text-secondary mb-4 line-clamp-2">
            {building.description}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-neutral-50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Building className="w-4 h-4 mr-1 text-accent-orange" />
                <span className="text-xs text-text-secondary">Застройщик</span>
              </div>
              <p className="font-medium text-sm text-text-primary">{building.developer}</p>
            </div>
            
            <div className="bg-neutral-50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Calendar className="w-4 h-4 mr-1 text-accent-orange" />
                <span className="text-xs text-text-secondary">Срок сдачи</span>
              </div>
              <p className="font-medium text-sm text-text-primary">
                {building.completionYear || "Уточняется"}
              </p>
            </div>
          </div>

          {building.features && building.features.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {building.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {building.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{building.features.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="border-t border-neutral-100 pt-4 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-text-secondary">Цена от</p>
                <p className="font-bold text-lg text-accent-orange">
                  {formatPrice(building.priceFrom)}
                </p>
              </div>
              {building.totalFlats && (
                <div className="text-right">
                  <p className="text-xs text-text-secondary">Квартир</p>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-text-secondary" />
                    <p className="font-medium text-sm">{building.totalFlats}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <Link href={`/new-buildings/${building.id}`}>
            <Button className="w-full bg-accent-orange hover:bg-orange-600 text-white group">
              Подробнее о ЖК
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}