import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PropertyCard from "@/components/property-card";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import type { Property } from "@shared/schema";

export default function Buy() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  
  const [filters, setFilters] = useState({
    propertyType: searchParams.get('type') || '',
    district: searchParams.get('district') || '',
    priceFrom: searchParams.get('priceFrom') || '',
    priceTo: searchParams.get('priceTo') || '',
    buildingType: searchParams.get('buildingType') || '',
    rooms: searchParams.get('rooms') || '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", filters],
    enabled: true,
  });

  const propertyTypes = [
    { value: "квартира", label: "Квартиры" },
    { value: "дом", label: "Дома" },
    { value: "коммерческая", label: "Коммерческая недвижимость" },
    { value: "земля", label: "Земельные участки" },
    { value: "гараж", label: "Гаражи" },
    { value: "машиноместо", label: "Машиноместа" }
  ];

  const districts = [
    "Центральный", "Василеостровский", "Выборгский", "Калининский",
    "Кировский", "Колпинский", "Красногвардейский", "Красносельский",
    "Кронштадтский", "Курортный", "Московский", "Невский",
    "Петроградский", "Петродворцовый", "Приморский", "Пушкинский",
    "Фрунзенский", "Адмиралтейский"
  ];

  const roomOptions = [
    { value: "1", label: "1 комната" },
    { value: "2", label: "2 комнаты" },
    { value: "3", label: "3 комнаты" },
    { value: "4", label: "4 комнаты" },
    { value: "5", label: "5+ комнат" }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      propertyType: '',
      district: '',
      priceFrom: '',
      priceTo: '',
      buildingType: '',
      rooms: '',
    });
  };

  const getPageTitle = () => {
    if (filters.propertyType) {
      const type = propertyTypes.find(t => t.value === filters.propertyType);
      return `Купить ${type?.label || 'недвижимость'} в Санкт-Петербурге`;
    }
    return "Купить недвижимость в Санкт-Петербурге";
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              {getPageTitle()}
            </h1>
            <p className="text-lg text-text-secondary">
              {properties.length} объектов в каталоге
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <Card className="sticky top-24">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Фильтры</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Тип недвижимости
                    </label>
                    <Select 
                      value={filters.propertyType} 
                      onValueChange={(value) => handleFilterChange('propertyType', value)}
                    >
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

                  {/* District */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Район
                    </label>
                    <Select 
                      value={filters.district} 
                      onValueChange={(value) => handleFilterChange('district', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите район" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Цена
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="От"
                        value={filters.priceFrom}
                        onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
                      />
                      <Input
                        placeholder="До"
                        value={filters.priceTo}
                        onChange={(e) => handleFilterChange('priceTo', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Rooms */}
                  {filters.propertyType === 'квартира' && (
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Количество комнат
                      </label>
                      <Select 
                        value={filters.rooms} 
                        onValueChange={(value) => handleFilterChange('rooms', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Building Type */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Тип здания
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="new"
                          checked={filters.buildingType === 'новостройка'}
                          onCheckedChange={(checked) => 
                            handleFilterChange('buildingType', checked ? 'новостройка' : '')
                          }
                        />
                        <label htmlFor="new" className="text-sm">Новостройка</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="secondary"
                          checked={filters.buildingType === 'вторичка'}
                          onCheckedChange={(checked) => 
                            handleFilterChange('buildingType', checked ? 'вторичка' : '')
                          }
                        />
                        <label htmlFor="secondary" className="text-sm">Вторичная</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Сбросить фильтры
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Properties Grid */}
            <div className="lg:w-3/4">
              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
                  <Input
                    placeholder="Поиск по адресу или названию..."
                    className="pl-10"
                  />
                </div>
                <Select defaultValue="price-desc">
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                    <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                    <SelectItem value="area-desc">Площадь: по убыванию</SelectItem>
                    <SelectItem value="area-asc">Площадь: по возрастанию</SelectItem>
                    <SelectItem value="date-desc">Дата: сначала новые</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-64 bg-neutral-200 rounded-t-lg"></div>
                      <CardContent className="p-6">
                        <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                        <div className="h-4 bg-neutral-200 rounded mb-4 w-3/4"></div>
                        <div className="h-8 bg-neutral-200 rounded"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : properties.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="text-text-secondary mb-4">
                    <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      Объекты не найдены
                    </h3>
                    <p>Попробуйте изменить параметры поиска</p>
                  </div>
                  <Button onClick={clearFilters} variant="outline">
                    Сбросить фильтры
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
