import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchForm from "@/components/SearchForm";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, TrendingUp, Shield, Clock } from "lucide-react";
import type { Property, PropertySearchFilters } from "@shared/schema";

export default function Secondary() {
  const [filters, setFilters] = useState<PropertySearchFilters>({
    category: "secondary"
  });
  const [sortBy, setSortBy] = useState("newest");

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", filters],
  });

  const handleSearch = (newFilters: PropertySearchFilters) => {
    setFilters({
      ...newFilters,
      category: "secondary"
    });
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

  const advantages = [
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Быстрое заселение",
      description: "Можно въехать сразу после оформления сделки"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "Сформированная инфраструктура",
      description: "Развитая транспортная и социальная инфраструктура района"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "История дома",
      description: "Можно оценить качество строительства и управления домом"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
      title: "Возможность торга",
      description: "Больше возможностей для переговоров о цене"
    }
  ];

  const buyingTips = [
    "Проверьте юридическую чистоту квартиры",
    "Изучите историю дома и управляющую компанию",
    "Оцените состояние коммуникаций",
    "Узнайте о планах реновации района",
    "Проверьте документы на перепланировку",
    "Изучите соседей и атмосферу в доме"
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Вторичная недвижимость 
              <span className="text-yandex-yellow"> СПб</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Квартиры с историей в лучших районах Санкт-Петербурга. Проверенные объекты с юридической чистотой.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Найти квартиру
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg">
                Консультация эксперта
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Form */}
      <section className="bg-white border-b border-neutral-200 py-8">
        <div className="container mx-auto px-4">
          <SearchForm onSearch={handleSearch} defaultCategory="secondary" compact />
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Преимущества вторичного жилья
            </h2>
            <p className="text-lg text-text-secondary">
              Почему стоит рассмотреть квартиры на вторичном рынке
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
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

      {/* Property Listings */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-text-primary">
                {sortedProperties?.length || 0} объектов вторичного жилья
              </h2>
              <p className="text-text-secondary">Проверенные предложения с юридической чистотой</p>
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

      {/* Buying Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Что важно при покупке вторичного жилья
              </h2>
              <p className="text-lg text-text-secondary">
                Советы экспертов для безопасной покупки
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {buyingTips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-text-primary font-medium">{tip}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Card className="inline-block">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Нужна помощь эксперта?
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Наши специалисты проведут полную проверку объекта и помогут с выбором
                  </p>
                  <Button className="bg-accent-orange text-white hover:bg-orange-600">
                    Получить консультацию
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* District Guide */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Популярные районы для покупки
            </h2>
            <p className="text-lg text-text-secondary">
              Обзор лучших районов Санкт-Петербурга для приобретения жилья
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Центральный район
                </h3>
                <p className="text-text-secondary mb-4">
                  Исторический центр с развитой инфраструктурой и культурными объектами
                </p>
                <div className="text-sm text-text-secondary space-y-1">
                  <div>• Средняя цена: 200-400 тыс. ₽/м²</div>
                  <div>• Транспорт: отличная доступность</div>
                  <div>• Инфраструктура: максимальная</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Василеостровский
                </h3>
                <p className="text-text-secondary mb-4">
                  Престижный район с видами на Неву и близостью к центру
                </p>
                <div className="text-sm text-text-secondary space-y-1">
                  <div>• Средняя цена: 180-350 тыс. ₽/м²</div>
                  <div>• Транспорт: хорошая доступность</div>
                  <div>• Экология: у воды</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Приморский
                </h3>
                <p className="text-text-secondary mb-4">
                  Современный развивающийся район с новой инфраструктурой
                </p>
                <div className="text-sm text-text-secondary space-y-1">
                  <div>• Средняя цена: 120-220 тыс. ₽/м²</div>
                  <div>• Транспорт: метро, автобусы</div>
                  <div>• Перспективы: высокие</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
