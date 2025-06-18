import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useLocation } from "wouter";

interface SearchFormProps {
  className?: string;
  onSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  action: string;
  propertyType: string;
  district: string;
  priceFrom: string;
  priceTo: string;
}

const districts = [
  "Центральный", "Василеостровский", "Выборгский", "Калининский",
  "Кировский", "Колпинский", "Красногвардейский", "Красносельский",
  "Кронштадтский", "Курортный", "Московский", "Невский",
  "Петроградский", "Петродворцовый", "Приморский", "Пушкинский",
  "Фрунзенский", "Адмиралтейский"
];

const propertyTypes = [
  { value: "apartment", label: "Квартира" },
  { value: "house", label: "Дом" },
  { value: "office", label: "Офисное помещение" },
  { value: "retail", label: "Торговое помещение" },
  { value: "warehouse", label: "Склад" },
  { value: "production", label: "Производственное помещение" },
  { value: "restaurant", label: "Ресторан/Кафе" },
  { value: "hotel", label: "Гостиница" },
  { value: "medical", label: "Медицинский центр" },
  { value: "beauty", label: "Салон красоты" },
  { value: "fitness", label: "Спортзал/Фитнес" },
  { value: "auto", label: "Автосервис" },
  { value: "land", label: "Земля" },
  { value: "garage", label: "Гараж" },
  { value: "parking", label: "Машиноместо" }
];

export default function SearchForm({ className, onSearch }: SearchFormProps) {
  const [, setLocation] = useLocation();
  // Removed action state since this form is only for purchasing
  const [propertyType, setPropertyType] = useState("");
  const [district, setDistrict] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const handleSearch = () => {
    const filters = { action: "Купить", propertyType, district, priceFrom, priceTo };
    
    if (onSearch) {
      onSearch(filters);
    } else {
      // Navigate to buy page with filters
      const searchParams = new URLSearchParams();
      if (propertyType) searchParams.set('propertyType', propertyType);
      if (district) searchParams.set('district', district);
      if (priceFrom) searchParams.set('priceFrom', priceFrom);
      if (priceTo) searchParams.set('priceTo', priceTo);
      
      const query = searchParams.toString();
      setLocation(`/buy${query ? `?${query}` : ''}`);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-neutral-200 ${className || ''}`}>
      {/* Compact Search Bar */}
      <div className="flex items-center gap-2 p-3">
        <div className="flex-1 flex items-center gap-2">
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-[140px] h-10 border-none bg-neutral-50 text-sm">
              <SelectValue placeholder="Тип" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="w-px h-6 bg-neutral-200"></div>
          
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="w-[130px] h-10 border-none bg-neutral-50 text-sm">
              <SelectValue placeholder="Район" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((districtName) => (
                <SelectItem key={districtName} value={districtName}>
                  {districtName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="w-px h-6 bg-neutral-200"></div>
          
          <Input
            type="text"
            placeholder="От"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            className="w-[90px] h-10 border-none bg-neutral-50 text-sm text-center"
          />
          
          <span className="text-neutral-400 text-sm">—</span>
          
          <Input
            type="text"
            placeholder="До"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            className="w-[90px] h-10 border-none bg-neutral-50 text-sm text-center"
          />
        </div>
        
        <Button
          onClick={handleSearch}
          className="bg-accent-orange text-white px-6 h-10 rounded-lg font-medium hover:bg-orange-600 flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Найти
        </Button>
      </div>
    </div>
  );
}
