import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import PropertyCard from "@/components/property-card";
import SearchForm from "@/components/search-form";
import { Property } from "@shared/schema";
import { PROPERTY_TYPES, DISTRICTS, BUILDING_CLASSES } from "@/lib/constants";
import { SlidersHorizontal, Grid, List, Filter } from "lucide-react";

const Buy = () => {
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
    isNewBuilding: "",
  });

  // Parse URL parameters
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialFilters = Object.fromEntries(urlParams.entries());

  const queryParams = new URLSearchParams({
    transactionType: "sale",
    ...initialFilters,
    ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value)),
  }).toString();

  const { data: properties = [], isLoading, error } = useQuery<Property[]>({
    queryKey: [`/api/properties?${queryParams}`],
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    // Sort properties locally
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
      {/* Header */}
      <section className="bg-white border-b border-neutral-200 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Купить недвижимость в Санкт-Петербурге
          </h1>
          <p className="text-lg text-text-secondary mb-6">
            Найдите идеальную недвижимость среди {properties.length} объектов
          </p>
          
          <SearchForm variant="compact" onSearch={(searchFilters) => {
            setFilters(prev => ({ ...prev, ...searchFilters }));
          }} />
        </div>
      </section>

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
                      Класс жилья
                    </label>
                    <Select value={filters.buildingClass} onValueChange={(value) => handleFilterChange("buildingClass", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Любой класс" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Любой класс</SelectItem>
                        {BUILDING_CLASSES.map((cls) => (
                          <SelectItem key={cls.value} value={cls.value}>
                            {cls.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Тип объекта
                    </label>
                    <Select value={filters.isNewBuilding} onValueChange={(value) => handleFilterChange("isNewBuilding", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Любой" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Любой</SelectItem>
                        <SelectItem value="true">Новостройки</SelectItem>
                        <SelectItem value="false">Вторичное жилье</SelectItem>
                      </SelectContent>
                    </Select>
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

          {/* Main Content */}
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
                    isNewBuilding: "",
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
    </div>
  );
};

export default Buy;
