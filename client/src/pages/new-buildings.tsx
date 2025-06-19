import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Building, Calendar, ArrowRight, Search, Filter } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import NewBuildingCardHorizontal from "@/components/NewBuildingCardHorizontal";
import type { NewBuilding } from "@shared/schema";

export default function NewBuildings() {
  const { data: buildings = [], isLoading } = useQuery<NewBuilding[]>({
    queryKey: ["/api/new-buildings"],
  });

  const districts = [
    "Приморский", "Центральный", "Василеостровский", "Выборгский",
    "Калининский", "Московский", "Невский", "Петроградский"
  ];

  const developers = [
    "ПСК Группа", "СПб Реновация", "Эталон", "ЛСР", "Setl Group"
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Новостройки Санкт-Петербурга
            </h1>
            <p className="text-lg text-text-secondary">
              {buildings.length} жилых комплексов от проверенных застройщиков
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
                <Input
                  placeholder="Поиск по названию..."
                  className="pl-10"
                />
              </div>
              
              <Select>
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

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Застройщик" />
                </SelectTrigger>
                <SelectContent>
                  {developers.map((developer) => (
                    <SelectItem key={developer} value={developer}>
                      {developer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Срок сдачи" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024 год</SelectItem>
                  <SelectItem value="2025">2025 год</SelectItem>
                  <SelectItem value="2026">2026 год</SelectItem>
                  <SelectItem value="ready">Сданные</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Buildings Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-1/2 h-64 bg-neutral-200"></div>
                      <div className="lg:w-1/2 p-8">
                        <div className="h-4 bg-neutral-200 rounded mb-4"></div>
                        <div className="h-6 bg-neutral-200 rounded mb-2"></div>
                        <div className="h-4 bg-neutral-200 rounded mb-4 w-3/4"></div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="h-12 bg-neutral-200 rounded"></div>
                          <div className="h-12 bg-neutral-200 rounded"></div>
                        </div>
                        <div className="h-10 bg-neutral-200 rounded"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : buildings.length === 0 ? (
              <Card className="p-12 text-center">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-50 text-text-secondary" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Новостройки не найдены
                </h3>
                <p className="text-text-secondary">
                  Попробуйте изменить параметры поиска
                </p>
              </Card>
            ) : (
              <div className="space-y-6">
                {buildings.map((building) => (
                  <NewBuildingCardHorizontal key={building.id} building={building} />
                ))}
              </div>
            )}

            {/* Load More */}
            {buildings.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" className="px-8 py-3">
                  Показать еще
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Преимущества покупки в новостройке
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Почему стоит выбрать квартиру от застройщика
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Современные технологии
                </h3>
                <p className="text-text-secondary">
                  Новые материалы, энергоэффективность, умные системы
                </p>
              </Card>

              <Card className="text-center p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Гарантия качества
                </h3>
                <p className="text-text-secondary">
                  Гарантия от застройщика, страхование, контроль качества
                </p>
              </Card>

              <Card className="text-center p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Рост стоимости
                </h3>
                <p className="text-text-secondary">
                  Потенциал роста стоимости после завершения строительства
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-text-primary">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Нужна помощь в выборе новостройки?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Наши эксперты помогут подобрать идеальный вариант с учетом ваших потребностей и бюджета
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-neutral-100 px-8 py-3 text-lg font-semibold">
                Получить консультацию
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-text-primary hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold"
              >
                Подобрать квартиру
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
