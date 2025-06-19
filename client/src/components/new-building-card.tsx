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
    <Card className={`bg-white hover:shadow-lg transition-shadow border border-neutral-200 ${className}`}>
      <CardContent className="p-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          <Building className="w-6 h-6 text-primary" />
        </div>
        
        <h3 className="font-semibold text-text-primary mb-2">{building.name}</h3>
        
        <div className="flex items-center text-text-secondary mb-2">
          <MapPin className="w-4 h-4 mr-1 text-accent-orange" />
          <span className="text-sm">{building.location}</span>
        </div>
        
        <p className="text-sm text-text-secondary mb-4">
          {building.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-text-secondary">от</p>
            <p className="font-bold text-lg text-accent-orange">
              {formatPrice(building.priceFrom)}
            </p>
          </div>
          <Badge className="bg-blue-50 text-blue-600 border-blue-200">
            {building.readiness || "В продаже"}
          </Badge>
        </div>
        
        <Link href={`/new-buildings/${building.id}`}>
          <Button variant="ghost" className="text-accent-orange font-medium text-sm hover:underline p-0">
            Подробнее →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}