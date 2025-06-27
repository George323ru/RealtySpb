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
  { value: "office", label: "Офис" },
  { value: "retail", label: "Торговля" },
  { value: "warehouse", label: "Склад" },
  { value: "land", label: "Земля" },
  { value: "garage", label: "Гараж" }
];

// Кастомный компонент для полей цены
interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function PriceInput({ value, onChange, placeholder }: PriceInputProps) {
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
    <input
      type="text"
      placeholder={placeholder}
      value={formatPrice(value)}
      onChange={handleChange}
      className="flex h-12 w-full rounded-lg bg-gray-50/80 px-3 py-2 text-sm text-center text-gray-900 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200/50 focus:outline-none transition-all duration-200 border-0"
    />
  );
}

export default function SearchForm({ className, onSearch }: SearchFormProps) {
  const [, setLocation] = useLocation();
  const [propertyType, setPropertyType] = useState("");
  const [district, setDistrict] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const handleSearch = () => {
    const filters = { action: "Купить", propertyType, district, priceFrom, priceTo };
    
    if (onSearch) {
      onSearch(filters);
    } else {
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
    <div className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 ${className || ''}`}>
      <div className="p-4 sm:p-6">
        {/* Компактная форма для всех экранов */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          {/* Тип недвижимости */}
          <div className="flex-1 min-w-0">
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="h-12 border-0 bg-gray-50/80 hover:bg-gray-100/80 focus:bg-white focus:ring-2 focus:ring-gray-200/50 focus:ring-offset-0 transition-all duration-200 focus:outline-none">
                <SelectValue placeholder="Тип недвижимости" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Район */}
          <div className="flex-1 min-w-0">
            <Select value={district} onValueChange={setDistrict}>
              <SelectTrigger className="h-12 border-0 bg-gray-50/80 hover:bg-gray-100/80 focus:bg-white focus:ring-2 focus:ring-gray-200/50 focus:ring-offset-0 transition-all duration-200 focus:outline-none">
                <SelectValue placeholder="Район" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {districts.map((districtName) => (
                  <SelectItem key={districtName} value={districtName}>
                    {districtName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Цена */}
          <div className="flex items-center gap-2 sm:min-w-[200px]">
            <div className="flex-1">
              <PriceInput
                value={priceFrom}
                onChange={setPriceFrom}
                placeholder="Цена от"
              />
            </div>
            <span className="text-gray-400 font-light">—</span>
            <div className="flex-1">
              <PriceInput
                value={priceTo}
                onChange={setPriceTo}
                placeholder="Цена до"
              />
            </div>
          </div>

          {/* Кнопка поиска */}
          <Button
            onClick={handleSearch}
            className="h-12 px-6 sm:px-8 bg-accent-orange hover:bg-accent-orange-dark focus:bg-accent-orange-dark focus:ring-2 focus:ring-accent-orange/30 focus:ring-offset-0 text-white font-medium flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Найти</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
