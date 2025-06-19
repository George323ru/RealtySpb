import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import SearchForm from "@/components/SearchForm";
import PropertyCard from "@/components/PropertyCard";
import { Building2, Grid, List, Map, TrendingUp, Users, Store, CheckCircle } from "lucide-react";
import type { Property } from "@shared/schema";
import type { SearchFilters } from "@/lib/types";

export default function Commercial() {
  const [location] = useLocation();
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [commercialType, setCommercialType] = useState<string>("");
  
  // Parse URL search params to get initial filters
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialFilters: SearchFilters = {
    propertyType: "commercial",
    transactionType: urlParams.get('transactionType') || "sale",
    district: urlParams.get('district') || undefined,
    priceFrom: urlParams.get('priceFrom') ? parseInt(urlParams.get('priceFrom')!) : undefined,
    priceTo: urlParams.get('priceTo') ? parseInt(urlParams.get('priceTo')!) : undefined,
    minArea: urlParams.get('minArea') ? parseFloat(urlParams.get('minArea')!) : undefined,
    maxArea: urlParams.get('maxArea') ? parseFloat(urlParams.get('maxArea')!) : undefined,
  };

  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const buildQueryString = (filters: SearchFilters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, value.toString());
      }
    });
    return params.toString();
  };

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", buildQueryString(filters)],
    queryFn: async () => {
      const response = await fetch(`/api/properties?${buildQueryString(filters)}`);
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters({ ...newFilters, propertyType: "commercial" });
  };

  const commercialTypes = [
    { icon: Store, title: "Торговые помещения", description: "Магазины, салоны, шоу-румы" },
    { icon: Building2, title: "Офисы", description: "Офисные помещения и бизнес-центры" },
    { icon: Users, title: "Общепит", description: "Рестораны, кафе, бары" },
    { icon: TrendingUp, title: "Склады", description: "Складские и производственные помещения" },
  ];

  const advantages = [
    "Высокая доходность от аренды",
    "Стабильный поток арендаторов",
    "Налоговые льготы для бизнеса",
    "Рост стоимости в перспективе",
    "Диверсификация инвестиций",
    "Возможность собственного использования",
  ];

  const investmentBenefits = [
    {
      title: "Торговые помещения",
      yield: "8-12%",
      features: ["Высокая проходимость", "Стабильный спрос", "Долгосрочная аренда"],
    },
    {
      title: "Офисные помещения",
      yield: "6-10%",
      features: ["Престижные локации", "Корпоративные арендаторы", "Развитая инфраструктура"],
    },
    {
      title: "Склады",
      yield: "10-15%",
      features: ["Растущий сегмент", "Логистические хабы", "Крупные арендаторы"],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Building2 className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Коммерческая недвижимость в Санкт-Петербурге
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Офисы, торговые помещения, склады и производственные объекты для бизнеса и инвестиций
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">{properties.length}</div>
                <div className="opacity-90">объектов в продаже</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">8-15%</div>
                <div className="opacity-90">доходность в год</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="opacity-90">сделок за год</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Типы коммерческой недвижимости
            </h2>
            <p className="text-lg text-text-secondary">
              Выберите подходящий тип объекта для вашего бизнеса или инвестиций
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commercialTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card key={index} className="hover-lift text-center cursor-pointer border-2 border-transparent hover:border-purple-200">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {type.title}
                    </h3>
                    <p className="text-text-secondary text-sm">{type.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-neutral-100 border-b border-neutral-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-2">
                Поиск коммерческой недвижимости
              </h2>
              <p className="text-text-secondary">
                {isLoading ? "Загрузка..." : `Найдено ${properties.length} объектов`}
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
              >
                <Map className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <SearchForm initialFilters={filters} onSearch={handleSearch} />
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Объекты не найдены
                </h3>
                <p className="text-text-secondary mb-6">
                  Попробуйте изменить параметры поиска или расширить критерии.
                </p>
                <Button
                  onClick={() => setFilters({ propertyType: "commercial" })}
                  className="bg-accent-orange hover:bg-orange-600"
                >
                  Сбросить фильтры
                </Button>
              </div>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : viewMode === "list" ? (
            <div className="space-y-6">
              {properties.map((property) => (
                <Card key={property.id} className="hover-lift">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={property.images[0] || "/placeholder-property.jpg"}
                        alt={property.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <CardContent className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-text-primary mb-2">
                            {property.title}
                          </h3>
                          <p className="text-text-secondary mb-2">{property.address}</p>
                          <p className="text-sm text-text-secondary">
                            {property.area} м², {property.floor}/{property.totalFloors} этаж
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-text-primary">
                            {new Intl.NumberFormat("ru-RU", {
                              style: "currency",
                              currency: "RUB",
                              minimumFractionDigits: 0,
                            }).format(property.price)}
                          </div>
                          {property.pricePerMeter && (
                            <div className="text-sm text-text-secondary">
                              {new Intl.NumberFormat("ru-RU", {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 0,
                              }).format(property.pricePerMeter)}/м²
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {property.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {property.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button asChild className="bg-accent-orange hover:bg-orange-600">
                          <a href={`/property/${property.id}`}>Подробнее</a>
                        </Button>
                        <Button variant="outline">В избранное</Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center">
              <Map className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Карта в разработке
              </h3>
              <p className="text-text-secondary">
                Функция просмотра объектов на карте будет добавлена в ближайшее время.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Investment Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Инвестиционная привлекательность
            </h2>
            <p className="text-lg text-text-secondary">
              Доходность и преимущества различных типов коммерческой недвижимости
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentBenefits.map((benefit, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {benefit.title}
                  </h3>
                  <div className="text-3xl font-bold text-purple-600 mb-4">
                    {benefit.yield}
                  </div>
                  <p className="text-sm text-text-secondary mb-4">годовых</p>
                  <ul className="space-y-2">
                    {benefit.features.map((feature, i) => (
                      <li key={i} className="flex items-center justify-center text-sm text-text-secondary">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Преимущества коммерческой недвижимости
            </h2>
            <p className="text-lg text-text-secondary">
              Почему стоит инвестировать в коммерческую недвижимость
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
                <span className="text-text-primary">{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ищете выгодные инвестиции?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Получите персональную консультацию по коммерческой недвижимости
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              Подобрать объект
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              Рассчитать доходность
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
