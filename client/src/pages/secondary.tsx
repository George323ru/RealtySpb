import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/property-card";
import SearchForm from "@/components/search-form";
import ConsultationForm from "@/components/consultation-form";
import { Property } from "@shared/schema";
import { PROPERTY_TYPES, DISTRICTS, BUILDING_CLASSES, RENOVATION_TYPES } from "@/lib/constants";
import { 
  SlidersHorizontal, 
  Grid, 
  List, 
  Filter, 
  Star, 
  CheckCircle, 
  Home, 
  Calendar,
  Shield,
  TrendingUp
} from "lucide-react";

const Secondary = () => {
  const [location] = useLocation();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("price-asc");
  const [filters, setFilters] = useState({
    propertyType: "",
    district: "",
    priceFrom: "",
    priceTo: "",
    areaFrom: "",
    areaTo: "",
    rooms: "",
    buildingClass: "",
    renovation: "",
    yearBuilt: "",
  });

  // Parse URL parameters
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialFilters = Object.fromEntries(urlParams.entries());

  const queryParams = new URLSearchParams({
    transactionType: "sale",
    isNewBuilding: "false",
    ...initialFilters,
    ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value)),
  }).toString();

  const { data: properties = [], isLoading, error } = useQuery<Property[]>({
    queryKey: [`/api/properties?${queryParams}`],
  });

  const advantages = [
    {
      icon: <Home className="w-8 h-8 text-blue-500" />,
      title: "Готовое жилье",
      description: "Квартиры с готовой отделкой, можно заехать сразу после покупки"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Проверенные объекты",
      description: "Все квартиры проходят тщательную проверку документов и состояния"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "Стабильная цена",
      description: "Фиксированная стоимость без доплат и неожиданных расходов"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Юридическая чистота",
      description: "Полная правовая проверка каждого объекта и безопасность сделки"
    }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "area-asc":
        return a.area - b.area;
      case "area-desc":
        return b.area - a.area;
      case "newest":
        return (b.yearBuilt || 0) - (a.yearBuilt || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Вторичная недвижимость в Санкт-Петербурге
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Готовые квартиры и дома с проверенной историей и юридической чистотой
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{properties.length}+</div>
                <div className="text-sm opacity-80">Проверенных объектов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">15+ лет</div>
                <div className="text-sm opacity-80">Опыт на рынке</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-80">Юридическая чистота</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white border-b border-neutral-200 py-8">
        <div className="container mx-auto px-4">
          <SearchForm variant="compact" onSearch={(searchFilters) => {
            setFilters(prev => ({ ...prev, ...searchFilters }));
          }} />
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Преимущества вторичного рынка
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Почему стоит рассмотреть покупку готового жилья
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-text-secondary">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Filter className="w-5 h-5 mr-2 text-accent-orange" />
                  <h3 className="text-lg font-semibold text-text-primary">Фильтры</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Тип недвижимости
                    </label>
                    <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange("propertyType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Любой тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Любой тип</SelectItem>
                        {PROPERTY_TYPES.map((type) => (
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
                    <Select value={filters.district} onValueChange={(value) => handleFilterChange("district", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Любой район" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Любой район</SelectItem>
                        {DISTRICTS.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Цена от
                      </label>
                      <Input
                        placeholder="От"
                        value={filters.priceFrom}
                        onChange={(e) => handleFilterChange("priceFrom", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Цена до
                      </label>
                      <Input
                        placeholder="До"
                        value={filters.priceTo}
                        onChange={(e) => handleFilterChange("priceTo", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Площадь от
                      </label>
                      <Input
                        placeholder="м²"
                        value={filters.areaFrom}
                        onChange={(e) => handleFilterChange("areaFrom", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Площадь до
                      </label>
                      <Input
                        placeholder="м²"
                        value={filters.areaTo}
                        onChange={(e) => handleFilterChange("areaTo", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Комнат
                    </label>
                    <Select value={filters.rooms} onValueChange={(value) => handleFilterChange("rooms", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Любое количество" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Любое количество</SelectItem>
                        <SelectItem value="1">1 комната</SelectItem>
                        <SelectItem value="2">2 комнаты</SelectItem>
                        <SelectItem value="3">3 комнаты</SelectItem>
                        <SelectItem value="4">4 комнаты</SelectItem>
                        <SelectItem value="5">5+ комнат</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Тип ремонта
                    </label>
                    <Select value={filters.renovation} onValueChange={(value) => handleFilterChange("renovation", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Любой" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Любой</SelectItem>
                        {RENOVATION_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Год постройки от
                    </label>
                    <Input
                      placeholder="2000"
                      value={filters.yearBuilt}
                      onChange={(e) => handleFilterChange("yearBuilt", e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 bg-accent-orange hover:bg-orange-600"
                  onClick={() => {
                    // Apply filters - they're already being applied via the query
                  }}
                >
                  Применить фильтры
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Properties Listing */}
          <div className="lg:w-3/4">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <span className="text-text-secondary">
                  Найдено: <span className="font-semibold text-text-primary">{properties.length}</span> объектов
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={handleSort}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                    <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                    <SelectItem value="area-asc">Площадь: по возрастанию</SelectItem>
                    <SelectItem value="area-desc">Площадь: по убыванию</SelectItem>
                    <SelectItem value="newest">Сначала новые</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-4">
                    <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 skeleton" />
                    <div className="h-4 bg-gray-200 rounded mb-2 skeleton" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 skeleton" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Ошибка загрузки данных. Попробуйте обновить страницу.</p>
              </div>
            ) : sortedProperties.length > 0 ? (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-6"
              }>
                {sortedProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                    className={viewMode === "list" ? "flex flex-row" : ""}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <SlidersHorizontal className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Объекты не найдены
                </h3>
                <p className="text-text-secondary mb-4">
                  Попробуйте изменить параметры поиска или сбросить фильтры
                </p>
                <Button
                  onClick={() => setFilters({
                    propertyType: "",
                    district: "",
                    priceFrom: "",
                    priceTo: "",
                    areaFrom: "",
                    areaTo: "",
                    rooms: "",
                    buildingClass: "",
                    renovation: "",
                    yearBuilt: "",
                  })}
                  variant="outline"
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Как мы помогаем купить вторичное жилье
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Профессиональное сопровождение на всех этапах покупки
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Подбор объектов",
                description: "Находим квартиры по вашим критериям и бюджету",
                icon: <Home className="w-6 h-6" />
              },
              {
                step: "2", 
                title: "Проверка документов",
                description: "Тщательная проверка юридической чистоты",
                icon: <Shield className="w-6 h-6" />
              },
              {
                step: "3",
                title: "Организация показов",
                description: "Удобное время для осмотра выбранных объектов",
                icon: <Calendar className="w-6 h-6" />
              },
              {
                step: "4",
                title: "Сопровождение сделки",
                description: "Полная поддержка до получения ключей",
                icon: <CheckCircle className="w-6 h-6" />
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    {item.icon}
                  </div>
                  <Badge variant="outline" className="mb-3">
                    Шаг {item.step}
                  </Badge>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <ConsultationForm 
              title="Ищете квартиру на вторичном рынке?"
              description="Оставьте заявку и мы подберем лучшие варианты согласно вашим критериям"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Secondary;
