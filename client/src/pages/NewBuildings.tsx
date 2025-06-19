import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Building, Calendar, Users } from "lucide-react";
import type { NewBuilding } from "@shared/schema";

export default function NewBuildings() {
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");

  const { data: newBuildings, isLoading } = useQuery<NewBuilding[]>({
    queryKey: ["/api/new-buildings"],
  });

  const filteredBuildings = newBuildings?.filter(building => {
    if (filterBy === "all") return true;
    if (filterBy === "ready") return building.readiness === "Сдан";
    if (filterBy === "construction") return building.readiness !== "Сдан";
    return true;
  });

  const sortedBuildings = filteredBuildings?.sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return parseFloat(a.priceFrom) - parseFloat(b.priceFrom);
      case "price-desc":
        return parseFloat(b.priceFrom) - parseFloat(a.priceFrom);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return b.id - a.id;
    }
  });

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("ru-RU").format(parseFloat(price));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Новостройки 
              <span className="text-yandex-yellow"> Санкт-Петербурга</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Лучшие жилые комплексы от надежных застройщиков с государственной гарантией и выгодными условиями покупки
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Подобрать квартиру
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                Ипотечные программы
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages of New Buildings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Преимущества новостроек
            </h2>
            <p className="text-lg text-text-secondary">
              Почему стоит выбрать квартиру в новостройке
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Современная планировка
                </h3>
                <p className="text-text-secondary">
                  Продуманные планировки с оптимальным использованием пространства
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-blue-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Государственная гарантия
                </h3>
                <p className="text-text-secondary">
                  Защита прав покупателей и гарантия сдачи объекта в срок
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-percentage text-purple-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Выгодная ипотека
                </h3>
                <p className="text-text-secondary">
                  Льготные ипотечные программы для покупки новостроек
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-tools text-orange-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Чистовая отделка
                </h3>
                <p className="text-text-secondary">
                  Многие ЖК предлагают квартиры с качественной отделкой
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Buildings List */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          {/* Filters and Sorting */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-text-primary">
                {sortedBuildings?.length || 0} жилых комплексов
              </h2>
              <p className="text-text-secondary">Актуальные предложения от застройщиков</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все комплексы</SelectItem>
                  <SelectItem value="ready">Сданные</SelectItem>
                  <SelectItem value="construction">В строительстве</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Сначала новые</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="name">По алфавиту</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Buildings Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-8 animate-pulse">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                      <div className="bg-gray-300 h-64 rounded-lg"></div>
                    </div>
                    <div className="lg:w-1/2 lg:pl-8 pt-6 lg:pt-0">
                      <div className="bg-gray-300 h-8 rounded mb-4"></div>
                      <div className="bg-gray-300 h-4 rounded mb-2"></div>
                      <div className="bg-gray-300 h-10 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedBuildings && sortedBuildings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sortedBuildings.map((building) => (
                <Card key={building.id} className="overflow-hidden hover:shadow-xl transition-shadow bg-white">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                      <img
                        src={building.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3"}
                        alt={building.name}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                    </div>
                    <CardContent className="lg:w-1/2 p-8">
                      <div className="flex items-center mb-4">
                        <Badge 
                          className={`mr-3 ${
                            building.readiness === "Сдан" 
                              ? "bg-green-500 text-white" 
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          {building.readiness === "Сдан" ? "Готово" : `Сдача в ${building.completionDate}`}
                        </Badge>
                        <span className="text-sm text-text-secondary">от застройщика</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-text-primary mb-3">
                        {building.name}
                      </h3>
                      
                      <p className="text-text-secondary mb-4 flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-accent-orange" />
                        {building.location}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="text-sm text-text-secondary">Квартиры от</div>
                          <div className="text-xl font-bold text-text-primary">
                            {formatPrice(building.priceFrom)} ₽
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-text-secondary">За м²</div>
                          <div className="text-xl font-bold text-text-primary">
                            от {formatPrice(building.pricePerMeterFrom)} ₽
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-text-secondary mb-6">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {building.totalFlats} квартир
                        </span>
                        <span>{building.readiness}</span>
                      </div>

                      {building.features.length > 0 && (
                        <div className="mb-6">
                          <div className="text-sm text-text-secondary mb-2">Особенности:</div>
                          <div className="flex flex-wrap gap-2">
                            {building.features.slice(0, 3).map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                        Посмотреть планировки
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Комплексы не найдены
              </h3>
              <p className="text-text-secondary mb-8">
                Попробуйте изменить фильтры или обратитесь к нашим специалистам
              </p>
              <Button className="bg-accent-orange text-white hover:bg-orange-600">
                Связаться с экспертом
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Investment Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Инвестиции в новостройки
            </h2>
            <p className="text-lg text-text-secondary">
              Почему новостройки - выгодное вложение
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-green-500 mb-2">+15%</div>
                <div className="text-lg font-semibold text-text-primary mb-2">
                  Рост стоимости
                </div>
                <p className="text-text-secondary">
                  Средний рост цен на квартиры в новостройках за год
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-blue-500 mb-2">7-9%</div>
                <div className="text-lg font-semibold text-text-primary mb-2">
                  Доходность аренды
                </div>
                <p className="text-text-secondary">
                  Годовая доходность от сдачи квартиры в аренду
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-purple-500 mb-2">3%</div>
                <div className="text-lg font-semibold text-text-primary mb-2">
                  Льготная ипотека
                </div>
                <p className="text-text-secondary">
                  Минимальная ставка по ипотеке на новостройки
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Не знаете, какую новостройку выбрать?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Наши эксперты помогут подобрать идеальный вариант под ваш бюджет и потребности
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
              Получить консультацию
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              Каталог планировок
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
