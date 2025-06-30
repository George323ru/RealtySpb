import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import PropertyCard from "@/components/PropertyCard";
import { Search, Filter, MapPin, TrendingUp, Shield, Clock } from "lucide-react";
import type { Property } from "@shared/schema";

export default function Secondary() {
  const [filters, setFilters] = useState({
    district: '',
    priceFrom: '',
    priceTo: '',
    rooms: '',
    floor: '',
  });

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", { buildingType: "вторичка", ...filters }],
  });

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

  const advantages = [
    {
      icon: MapPin,
      title: "Развитая инфраструктура",
      description: "Сложившаяся инфраструктура, близость к центру, транспортная доступность"
    },
    {
      icon: TrendingUp,
      title: "Стабильная стоимость",
      description: "Реальная рыночная стоимость без переплат за бренд застройщика"
    },
    {
      icon: Shield,
      title: "Проверенное качество",
      description: "Возможность оценить состояние дома и квартиры перед покупкой"
    },
    {
      icon: Clock,
      title: "Быстрое заселение",
      description: "Возможность сразу въехать или сдать в аренду"
    }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      district: '',
      priceFrom: '',
      priceTo: '',
      rooms: '',
      floor: '',
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 py-20 min-h-[70vh] flex items-center">
        {/* Enhanced Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        
        {/* Background Image with Enhanced Contrast */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920')"}}
        ></div>
        
        {/* Additional Gradient Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-transparent to-red-900/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Enhanced Typography with Better Contrast */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-2xl">
              Вторичная недвижимость{" "}
              <span className="text-yandex-yellow drop-shadow-lg">Санкт-Петербурга</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-12 font-light text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Проверенные квартиры с развитой инфраструктурой в исторических районах города
            </p>
            
            {/* Enhanced Stats Cards with Better Visibility */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-yandex-yellow mb-3 drop-shadow-lg">{properties.length}</div>
                <div className="text-base text-white/90 font-medium">Объектов в каталоге</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-yandex-yellow mb-3 drop-shadow-lg">18</div>
                <div className="text-base text-white/90 font-medium">Районов города</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-yandex-yellow mb-3 drop-shadow-lg">100%</div>
                <div className="text-base text-white/90 font-medium">Проверенных объектов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
                <Input
                  placeholder="Поиск по адресу..."
                  className="pl-10"
                />
              </div>
              
              <Select value={filters.district} onValueChange={(value) => handleFilterChange('district', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Район" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Цена от"
                value={filters.priceFrom}
                onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
              />

              <Input
                placeholder="Цена до"
                value={filters.priceTo}
                onChange={(e) => handleFilterChange('priceTo', e.target.value)}
              />

              <Select value={filters.rooms} onValueChange={(value) => handleFilterChange('rooms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Комнаты" />
                </SelectTrigger>
                <SelectContent>
                  {roomOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={clearFilters} variant="outline">
                Сбросить
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Sort Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4 sm:mb-0">
                Найдено {properties.length} объектов
              </h2>
              <Select defaultValue="price-desc">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="area-desc">Площадь: больше</SelectItem>
                  <SelectItem value="area-asc">Площадь: меньше</SelectItem>
                  <SelectItem value="date-desc">Дата: новые</SelectItem>
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
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-50 text-text-secondary" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Объекты не найдены
                </h3>
                <p className="text-text-secondary mb-4">
                  Попробуйте изменить параметры поиска
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Сбросить фильтры
                </Button>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                  <Button variant="outline" className="px-8 py-3">
                    Показать еще объекты
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Преимущества вторичной недвижимости
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Почему стоит рассматривать готовые квартиры при покупке жилья
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <advantage.icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {advantage.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Districts */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Популярные районы
              </h2>
              <p className="text-lg text-text-secondary">
                Самые востребованные районы для покупки вторичной недвижимости
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Центральный", count: "1,234", avgPrice: "15,500,000" },
                { name: "Петроградский", count: "892", avgPrice: "12,800,000" },
                { name: "Василеостровский", count: "756", avgPrice: "11,200,000" },
                { name: "Адмиралтейский", count: "634", avgPrice: "14,300,000" },
                { name: "Московский", count: "1,123", avgPrice: "8,900,000" },
                { name: "Невский", count: "978", avgPrice: "7,600,000" }
              ].map((district, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {district.name} район
                  </h3>
                  <div className="flex justify-between text-sm text-text-secondary mb-2">
                    <span>Объектов:</span>
                    <span className="font-medium">{district.count}</span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Средняя цена:</span>
                    <span className="font-medium">{parseInt(district.avgPrice).toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <Button variant="ghost" className="w-full mt-4 text-accent-orange">
                    Смотреть объекты →
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Не нашли подходящий вариант?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Наши специалисты помогут найти идеальную квартиру с учетом всех ваших пожеланий
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-amber-600 hover:bg-neutral-100 px-8 py-3 text-lg font-semibold">
                Подобрать квартиру
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 text-lg font-semibold"
              >
                Получить консультацию
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
