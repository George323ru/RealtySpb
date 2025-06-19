import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { DISTRICTS, PROPERTY_TYPES, PROPERTY_CATEGORIES } from "@/lib/constants";
import type { PropertySearchFilters } from "@shared/schema";

interface SearchFormProps {
  onSearch: (filters: PropertySearchFilters) => void;
  defaultCategory?: string;
  compact?: boolean;
}

export default function SearchForm({ onSearch, defaultCategory, compact = false }: SearchFormProps) {
  const [action, setAction] = useState("buy");
  const [filters, setFilters] = useState<PropertySearchFilters>({
    propertyType: defaultCategory
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const updateFilter = (key: keyof PropertySearchFilters, value: string | number | undefined) => {
    setFilters((prev: PropertySearchFilters) => ({
      ...prev,
      [key]: value
    }));
  };

  if (compact) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="property-type">Тип недвижимости</Label>
              <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="district">Район</Label>
              <Select value={filters.district} onValueChange={(value) => updateFilter("district", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите район" />
                </SelectTrigger>
                <SelectContent>
                  {DISTRICTS.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="price-from">Цена от</Label>
              <Input
                type="number"
                placeholder="3 000 000"
                value={filters.priceFrom || ""}
                onChange={(e) => updateFilter("priceFrom", e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            
            <div>
              <Label htmlFor="price-to">Цена до</Label>
              <Input
                type="number"
                placeholder="15 000 000"
                value={filters.priceTo || ""}
                onChange={(e) => updateFilter("priceTo", e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>
          
          <Button onClick={handleSearch} className="w-full bg-accent-orange text-white hover:bg-accent-orange/90">
            <Search className="w-4 h-4 mr-2" />
            Найти недвижимость
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardContent className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0 mb-6">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <Button
              variant={action === "buy" ? "default" : "outline"}
              onClick={() => setAction("buy")}
              className={action === "buy" ? "bg-accent-orange text-white" : ""}
            >
              Купить
            </Button>
            <Button
              variant={action === "sell" ? "default" : "outline"}
              onClick={() => setAction("sell")}
              className={action === "sell" ? "bg-accent-orange text-white" : ""}
            >
              Продать
            </Button>
            <Button
              variant={action === "rent" ? "default" : "outline"}
              onClick={() => setAction("rent")}
              className={action === "rent" ? "bg-accent-orange text-white" : ""}
            >
              Сдать
            </Button>
          </div>
        </div>
        
        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
          <div>
            <Label htmlFor="property-type" className="text-sm mb-1 block">Тип недвижимости</Label>
            <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Квартира" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="district" className="text-sm mb-1 block">Район</Label>
            <Select value={filters.district} onValueChange={(value) => updateFilter("district", value)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Центральный" />
              </SelectTrigger>
              <SelectContent>
                {DISTRICTS.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="price-from" className="text-sm mb-1 block">Цена от</Label>
            <Input
              type="number"
              placeholder="3 000 000"
              value={filters.priceFrom || ""}
              onChange={(e) => updateFilter("priceFrom", e.target.value ? Number(e.target.value) : undefined)}
              className="focus-orange h-10 text-sm"
            />
          </div>
          
          <div>
            <Label htmlFor="price-to" className="text-sm mb-1 block">Цена до</Label>
            <Input
              type="number"
              placeholder="15 000 000"
              value={filters.priceTo || ""}
              onChange={(e) => updateFilter("priceTo", e.target.value ? Number(e.target.value) : undefined)}
              className="focus-orange h-10 text-sm"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleSearch} className="flex-1 bg-accent-orange text-white py-3 px-4 sm:py-4 sm:px-6 text-base sm:text-lg hover:bg-accent-orange/90">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Найти недвижимость
          </Button>
          <Button variant="outline" className="sm:w-auto py-3 px-4 sm:py-4 sm:px-6 text-base sm:text-lg border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white">
            Расширенный поиск
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
