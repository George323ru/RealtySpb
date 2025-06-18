import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import SearchForm from "@/components/SearchForm";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Property, PropertySearchFilters } from "@shared/schema";

export default function Buy() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  
  const [filters, setFilters] = useState<PropertySearchFilters>({
    propertyType: searchParams.get('type') || undefined,
    district: searchParams.get('district') || undefined,
    category: searchParams.get('category') || undefined,
    priceFrom: searchParams.get('priceFrom') ? Number(searchParams.get('priceFrom')) : undefined,
    priceTo: searchParams.get('priceTo') ? Number(searchParams.get('priceTo')) : undefined,
  });

  const [sortBy, setSortBy] = useState("newest");

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", filters],
  });

  const handleSearch = (newFilters: PropertySearchFilters) => {
    setFilters(newFilters);
  };

  const sortedProperties = properties?.sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-desc":
        return parseFloat(b.price) - parseFloat(a.price);
      case "area-asc":
        return parseFloat(a.area) - parseFloat(b.area);
      case "area-desc":
        return parseFloat(b.area) - parseFloat(a.area);
      default:
        return b.id - a.id;
    }
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-white border-b border-neutral-200 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Купить недвижимость в СПб
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Найдите идеальный объект среди {properties?.length || 0} предложений недвижимости в Санкт-Петербурге
            </p>
          </div>
          
          <SearchForm onSearch={handleSearch} compact />
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Filters and Sorting */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-text-primary">
                {properties?.length || 0} объектов найдено
              </h2>
              {filters.district && (
                <p className="text-text-secondary">в районе: {filters.district}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary">Сортировать:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Сначала новые</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="area-asc">Площадь: по возрастанию</SelectItem>
                  <SelectItem value="area-desc">Площадь: по убыванию</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Property Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-6 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded mb-4"></div>
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
              ))}
            </div>
          ) : sortedProperties && sortedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Объекты не найдены
              </h3>
              <p className="text-text-secondary mb-8">
                Попробуйте изменить параметры поиска или обратитесь к нашим специалистам
              </p>
              <Button className="bg-accent-orange text-white hover:bg-orange-600">
                Связаться с экспертом
              </Button>
            </div>
          )}

          {/* Load More */}
          {sortedProperties && sortedProperties.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" className="border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white">
                Показать больше объектов
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
