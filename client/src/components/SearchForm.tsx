import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useLocation } from "wouter";
import { DISTRICTS, PROPERTY_TYPES } from "@/lib/constants";
import type { PropertySearchFilters } from "@shared/schema";

interface SearchFormProps {
  onSearch?: (filters: PropertySearchFilters) => void;
  defaultCategory?: string;
  compact?: boolean;
  className?: string;
}

// Компонент для красивого форматирования цены
interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

function PriceInput({ value, onChange, placeholder, className = "" }: PriceInputProps) {
  const formatPrice = (inputValue: string) => {
    const numValue = inputValue.replace(/\D/g, '');
    if (!numValue) return '';
    return new Intl.NumberFormat('ru-RU').format(parseInt(numValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    onChange(numericValue);
  };

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={formatPrice(value)}
      onChange={handleChange}
      className={`text-center ${className}`}
    />
  );
}

export default function SearchForm({ onSearch, defaultCategory, compact = false, className }: SearchFormProps) {
  const [, setLocation] = useLocation();
  const [action, setAction] = useState("buy");
  const [filters, setFilters] = useState<PropertySearchFilters>({
    propertyType: defaultCategory
  });

  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters);
    } else {
      // Навигация на страницу поиска
      const searchParams = new URLSearchParams();
      if (filters.propertyType) searchParams.set('propertyType', filters.propertyType);
      if (filters.district) searchParams.set('district', filters.district);
      if (filters.priceFrom) searchParams.set('priceFrom', filters.priceFrom.toString());
      if (filters.priceTo) searchParams.set('priceTo', filters.priceTo.toString());
      
      const query = searchParams.toString();
      setLocation(`/buy${query ? `?${query}` : ''}`);
    }
  };

  const updateFilter = (key: keyof PropertySearchFilters, value: string | number | undefined) => {
    setFilters((prev: PropertySearchFilters) => ({
      ...prev,
      [key]: value
    }));
  };

  if (compact) {
    return (
      <Card className={`w-full ${className || ''}`}>
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
              <PriceInput
                value={filters.priceFrom?.toString() || ""}
                onChange={(value) => updateFilter("priceFrom", value ? Number(value) : undefined)}
                placeholder="3 000 000"
              />
            </div>
            
            <div>
              <Label htmlFor="price-to">Цена до</Label>
              <PriceInput
                value={filters.priceTo?.toString() || ""}
                onChange={(value) => updateFilter("priceTo", value ? Number(value) : undefined)}
                placeholder="15 000 000"
              />
            </div>
          </div>
          
          <Button onClick={handleSearch} className="w-full bg-accent-gray text-white hover:bg-accent-gray-dark">
            <Search className="w-4 h-4 mr-2" />
            Найти недвижимость
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`minimal-card ${className || ''}`}>
      <div className="p-6">
        {/* Action Buttons - только для полной версии */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
          <Button
            variant={action === "buy" ? "default" : "outline"}
            onClick={() => setAction("buy")}
            className={action === "buy" ? "bg-accent-gray text-white" : ""}
          >
            Купить
          </Button>
          <Button
            variant={action === "sell" ? "default" : "outline"}
            onClick={() => setAction("sell")}
            className={action === "sell" ? "bg-accent-gray text-white" : ""}
          >
            Продать
          </Button>
          <Button
            variant={action === "rent" ? "default" : "outline"}
            onClick={() => setAction("rent")}
            className={action === "rent" ? "bg-accent-gray text-white" : ""}
          >
            Сдать
          </Button>
        </div>
        
        {/* Компактная форма для всех экранов */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          {/* Тип недвижимости */}
          <div className="flex-1 min-w-0">
            <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
              <SelectTrigger className="h-12 border-0 bg-muted/50 hover:bg-muted/80 focus:bg-background focus:ring-2 focus:ring-ring/30 focus:ring-offset-0 transition-all duration-200 focus:outline-none">
                <SelectValue placeholder="Тип недвижимости" />
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

          {/* Район */}
          <div className="flex-1 min-w-0">
            <Select value={filters.district} onValueChange={(value) => updateFilter("district", value)}>
              <SelectTrigger className="h-12 border-0 bg-muted/50 hover:bg-muted/80 focus:bg-background focus:ring-2 focus:ring-ring/30 focus:ring-offset-0 transition-all duration-200 focus:outline-none">
                <SelectValue placeholder="Район" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {DISTRICTS.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Цена */}
          <div className="flex items-center gap-2 sm:min-w-[200px]">
            <div className="flex-1">
              <PriceInput
                value={filters.priceFrom?.toString() || ""}
                onChange={(value) => updateFilter("priceFrom", value ? Number(value) : undefined)}
                placeholder="Цена от"
                className="h-12 border-0 bg-muted/50 hover:bg-muted/80 focus:bg-background focus:ring-2 focus:ring-ring/30 focus:ring-offset-0 transition-all duration-200 focus:outline-none"
              />
            </div>
            <span className="text-muted-foreground font-light">—</span>
            <div className="flex-1">
              <PriceInput
                value={filters.priceTo?.toString() || ""}
                onChange={(value) => updateFilter("priceTo", value ? Number(value) : undefined)}
                placeholder="Цена до"
                className="h-12 border-0 bg-muted/50 hover:bg-muted/80 focus:bg-background focus:ring-2 focus:ring-ring/30 focus:ring-offset-0 transition-all duration-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Кнопка поиска */}
          <Button
            onClick={handleSearch}
            className="h-12 px-6 sm:px-8 bg-primary hover:bg-primary/90 focus:bg-primary/90 focus:ring-2 focus:ring-ring/30 focus:ring-offset-0 text-primary-foreground font-medium flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Найти</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
