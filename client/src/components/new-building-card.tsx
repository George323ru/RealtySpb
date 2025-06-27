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
    <Link href={`/new-buildings/${building.id}`} className="block group h-full">
      <Card className={`h-full bg-white border border-neutral-200 transition-all duration-300 ease-out group-hover:shadow-2xl group-hover:shadow-green-100/50 group-hover:-translate-y-1 group-hover:scale-[1.02] cursor-pointer ${className}`}>
        <CardContent className="p-6 h-full flex flex-col">
          {/* Icon Section */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:shadow-lg">
            <Building className="w-8 h-8 text-blue-600 transition-colors duration-300 group-hover:text-white" />
          </div>
          
          {/* Title */}
          <h3 className="font-bold text-xl text-text-primary mb-4 transition-colors duration-300 group-hover:text-accent-orange line-clamp-2">
            {building.name}
          </h3>
          
          {/* Location */}
          <div className="flex items-start text-text-secondary mb-4 transition-colors duration-300 group-hover:text-text-primary">
            <MapPin className="w-5 h-5 mr-3 text-accent-orange transition-transform duration-300 group-hover:scale-110 flex-shrink-0 mt-0.5" />
            <span className="text-sm leading-relaxed">{building.location}</span>
          </div>
          
          {/* Description */}
          <p className="text-sm text-text-secondary mb-6 flex-1 transition-colors duration-300 group-hover:text-text-primary leading-relaxed">
            {building.description}
          </p>
          
          {/* Price and Status Section */}
          <div className="space-y-4 mt-auto">
            <div className="flex justify-between items-start">
              <div className="transition-transform duration-300 group-hover:scale-105">
                <p className="text-xs text-text-secondary mb-1 transition-colors duration-300 group-hover:text-accent-orange font-medium">
                  от
                </p>
                <p className="font-bold text-xl text-accent-orange transition-colors duration-300 group-hover:text-accent-orange-dark">
                  {formatPrice(building.priceFrom)}
                </p>
              </div>
              <div className="transition-transform duration-300 group-hover:scale-105">
                <Badge className="bg-green-50 text-green-600 border-green-200 transition-all duration-300 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 group-hover:shadow-lg">
                  {building.readiness || "В продаже"}
                </Badge>
              </div>
            </div>
            
            {/* Additional Details */}
            {building.totalFlats && (
              <div className="flex items-center text-sm text-text-secondary transition-all duration-300 group-hover:text-text-primary group-hover:translate-x-1">
                <Users className="w-4 h-4 mr-2 text-accent-orange transition-transform duration-300 group-hover:scale-110" />
                <span>{building.totalFlats} квартир</span>
              </div>
            )}
            
            {/* Call to Action */}
            <div className="pt-2 border-t border-neutral-100 transition-colors duration-300 group-hover:border-accent-orange/30">
              <div className="inline-flex items-center text-accent-orange font-medium text-sm transition-all duration-300 group-hover:text-accent-orange-dark transform group-hover:translate-x-1">
                Подробнее
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}