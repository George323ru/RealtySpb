import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropertyCard from "@/components/PropertyCard";
import { Search, SlidersHorizontal, Home, Clock, Shield, DollarSign } from "lucide-react";
import type { Property } from "@shared/schema";

interface PropertySearch {
  dealType?: string;
  propertyType?: string;
  district?: string;
  priceFrom?: number;
  priceTo?: number;
  areaFrom?: number;
  areaTo?: number;
  rooms?: number;
  isNew?: boolean;
}

const districts = [
  "Центральный", "Василеостровский", "Выборгский", "Калининский",
  "Кировский", "Колпинский", "Красногвардейский", "Красносельский",
  "Кронштадтский", "Курортный", "Московский", "Невский",
  "Петроградский", "Петродворцовый", "Приморский", "Пушкинский",
  "Фрунзенский", "Адмиралтейский"
];

const propertyTypes = [
  { value: "apartment", label: "Квартиры" },
  { value: "house", label: "Дома" },
  { value: "commercial", label: "Коммерческая недвижимость" },
  { value: "land", label: "Земельные участки" },
  { value: "garage", label: "Гаражи" },
  { value: "parking", label: "Машиноместа" }
];

export default function SecondaryProperties() {
  const [searchParams, setSearchParams] = useState<PropertySearch>({
    dealType: 'buy',
    isNew: false, // Only secondary properties
  });

  const [showFilters, setShowFilters] = useState(false);

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", searchParams],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, String(value));
        }
      });
      const response = await fetch(`/api/properties?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });

  const handleSearch = () => {
    setSearchParams({ ...searchParams });
  };

  const formatPrice = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Вторичная недвижимость СПб
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Готовые к заселению квартиры и дома с историей и характером
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5000+</div>
                <div className="opacity-90">объектов в базе</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">72ч</div>
                <div className="opacity-90">средний срок показа</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="opacity-90">успешных сделок</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="opacity-90">юридическая чистота</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Преимущества вторичного рынка
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Home className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Готово к заселению</h3>
              <p className="text-secondary text-sm">
                Сразу после покупки можно заехать и жить
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Адекватная цена</h3>
              <p className="text-secondary text-sm">
                Реальная рыночная стоимость без переплат
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Быстрое оформление</h3>
              <p className="text-secondary text-sm">
                Сделка проходит в течение 1-2 недель
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Сформированный район</h3>
              <p className="text-secondary text-sm">
                Развитая инфраструктура и транспорт
              </p>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Фильтры поиска</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-primary mb-2 block">
                      Тип недвижимости
                    </Label>
                    <Select
                      value={searchParams.propertyType || ''}
                      onValueChange={(value) => setSearchParams({...searchParams, propertyType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Любой тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Любой тип</SelectItem>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-primary mb-2 block">
                      Район
                    </Label>
                    <Select
                      value={searchParams.district || ''}
                      onValueChange={(value) => setSearchParams({...searchParams, district: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Любой район" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Любой район</SelectItem>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-primary mb-2 block">
                      Цена, ₽
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="От"
                        value={searchParams.priceFrom ? formatPrice(searchParams.priceFrom.toString()) : ''}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, '');
                          setSearchParams({
                            ...searchParams,
                            priceFrom: value ? parseInt(value) : undefined
                          });
                        }}
                      />
                      <Input
                        placeholder="До"
                        value={searchParams.priceTo ? formatPrice(searchParams.priceTo.toString()) : ''}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, '');
                          setSearchParams({
                            ...searchParams,
                            priceTo: value ? parseInt(value) : undefined
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-primary mb-2 block">
                      Площадь, м²
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="От"
                        value={searchParams.areaFrom?.toString() || ''}
                        onChange={(e) => setSearchParams({
                          ...searchParams,
                          areaFrom: e.target.value ? parseInt(e.target.value) : undefined
                        })}
                      />
                      <Input
                        placeholder="До"
                        value={searchParams.areaTo?.toString() || ''}
                        onChange={(e) => setSearchParams({
                          ...searchParams,
                          areaTo: e.target.value ? parseInt(e.target.value) : undefined
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-primary mb-2 block">
                      Количество комнат
                    </Label>
                    <Select
                      value={searchParams.rooms ? String(searchParams.rooms) : ''}
                      onValueChange={(value) => setSearchParams({
                        ...searchParams,
                        rooms: value ? parseInt(value) : undefined
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Любое" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Любое количество</SelectItem>
                        <SelectItem value="1">1 комната</SelectItem>
                        <SelectItem value="2">2 комнаты</SelectItem>
                        <SelectItem value="3">3 комнаты</SelectItem>
                        <SelectItem value="4">4 комнаты</SelectItem>
                        <SelectItem value="5">5+ комнат</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleSearch}
                    className="w-full bg-accent hover:bg-orange-600 text-foreground"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Применить фильтры
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(true)}
                className="flex items-center"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Фильтры
              </Button>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  Вторичная недвижимость
                </h2>
                <p className="text-secondary mt-1">
                  Найдено объектов: {properties.length}
                </p>
              </div>
            </div>

            {/* Property Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="w-full h-64 bg-gray-200"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Объекты не найдены
                  </h3>
                  <p className="text-secondary mb-6">
                    Попробуйте изменить параметры поиска или сбросить фильтры
                  </p>
                  <Button
                    onClick={() => setSearchParams({ dealType: 'buy', isNew: false })}
                    variant="outline"
                  >
                    Сбросить фильтры
                  </Button>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
