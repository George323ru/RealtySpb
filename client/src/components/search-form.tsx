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
  { value: "квартира", label: "Квартира" },
  { value: "дом", label: "Дом" },
  { value: "коммерческая", label: "Коммерческая" },
  { value: "земля", label: "Земля" },
  { value: "гараж", label: "Гараж" },
  { value: "машиноместо", label: "Машиноместо" }
];

export default function SearchForm({ className, onSearch }: SearchFormProps) {
  const [, setLocation] = useLocation();
  const [action, setAction] = useState("Купить");
  const [propertyType, setPropertyType] = useState("");
  const [district, setDistrict] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const handleSearch = () => {
    const filters = { action, propertyType, district, priceFrom, priceTo };
    
    if (onSearch) {
      onSearch(filters);
    } else {
      // Navigate to appropriate page with filters
      const searchParams = new URLSearchParams();
      if (propertyType) searchParams.set('type', propertyType);
      if (district) searchParams.set('district', district);
      if (priceFrom) searchParams.set('priceFrom', priceFrom);
      if (priceTo) searchParams.set('priceTo', priceTo);
      
      const query = searchParams.toString();
      const path = action === "Купить" ? "/buy" : action === "Продать" ? "/sell" : "/rent";
      setLocation(`${path}${query ? `?${query}` : ''}`);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-2xl p-6 lg:p-8 ${className || ''}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0 mb-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {["Купить", "Продать", "Сдать"].map((actionType) => (
            <Button
              key={actionType}
              onClick={() => setAction(actionType)}
              variant={action === actionType ? "default" : "outline"}
              className={action === actionType 
                ? "bg-accent-orange text-white hover:bg-orange-600" 
                : "border-neutral-300 hover:border-accent-orange"
              }
            >
              {actionType}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Тип недвижимости
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип" />
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
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Район
          </label>
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите район" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((districtName) => (
                <SelectItem key={districtName} value={districtName}>
                  {districtName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Цена от
          </label>
          <Input
            type="text"
            placeholder="От 3 000 000 ₽"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Цена до
          </label>
          <Input
            type="text"
            placeholder="До 15 000 000 ₽"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleSearch}
          className="flex-1 bg-accent-orange text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-orange-600"
        >
          <Search className="mr-2 w-5 h-5" />
          Найти недвижимость
        </Button>
        <Button
          variant="outline"
          className="sm:w-auto border-2 border-accent-orange text-accent-orange py-4 px-6 rounded-lg font-semibold text-lg hover:bg-accent-orange hover:text-white"
        >
          Расширенный поиск
        </Button>
      </div>
    </div>
  );
}
