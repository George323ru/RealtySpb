import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Ruler, Trees, Search } from "lucide-react";
import { type Property } from "@shared/schema";
import PropertyCard from "@/components/property-card";
import ConsultationForm from "@/components/consultation-form";

interface LandFilters {
  district: string;
  priceFrom: string;
  priceTo: string;
  areaFrom: string;
  areaTo: string;
  purpose: string;
}

export default function Land() {
  const [filters, setFilters] = useState<LandFilters>({
    district: "",
    priceFrom: "",
    priceTo: "",
    areaFrom: "",
    areaTo: "",
    purpose: ""
  });

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties', { propertyType: 'земля', ...filters }],
  });

  const handleFilterChange = (key: keyof LandFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const districts = [
    "Всеволожский", "Выборгский", "Гатчинский", "Кингисеппский",
    "Киришский", "Кировский", "Ломоносовский", "Лужский",
    "Подпорожский", "Приозерский", "Сланцевский", "Тихвинский",
    "Тосненский", "Волосовский", "Волховский"
  ];

  const purposes = [
    "ИЖС", "СНТ", "ДНП", "Коммерческая", "Промышленная", "Сельхозназначения"
  ];

  const filteredProperties = properties?.filter(property => {
    if (filters.district && !property.district.includes(filters.district)) return false;
    if (filters.priceFrom && property.price < parseInt(filters.priceFrom)) return false;
    if (filters.priceTo && property.price > parseInt(filters.priceTo)) return false;
    if (filters.areaFrom && property.area < parseInt(filters.areaFrom)) return false;
    if (filters.areaTo && property.area > parseInt(filters.areaTo)) return false;
    return true;
  }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-background-secondary">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Земельные участки
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100">
              Найдите идеальный участок для строительства дома или дачи
            </p>
            <div className="flex items-center justify-center space-x-8 text-green-100">
              <div className="flex items-center space-x-2">
                <Trees className="h-6 w-6" />
                <span>Участки в пригороде</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-6 w-6" />
                <span>Разные районы</span>
              </div>
              <div className="flex items-center space-x-2">
                <Ruler className="h-6 w-6" />
                <span>От 6 соток</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Filters */}
        <Card className="mb-12 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-text-primary">
              Поиск земельных участков
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Район
                </label>
                <Select value={filters.district} onValueChange={(value) => handleFilterChange('district', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите район" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все районы</SelectItem>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Цена от (руб.)
                </label>
                <Input
                  type="number"
                  placeholder="500000"
                  value={filters.priceFrom}
                  onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Цена до (руб.)
                </label>
                <Input
                  type="number"
                  placeholder="5000000"
                  value={filters.priceTo}
                  onChange={(e) => handleFilterChange('priceTo', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Площадь от (соток)
                </label>
                <Input
                  type="number"
                  placeholder="6"
                  value={filters.areaFrom}
                  onChange={(e) => handleFilterChange('areaFrom', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Площадь до (соток)
                </label>
                <Input
                  type="number"
                  placeholder="50"
                  value={filters.areaTo}
                  onChange={(e) => handleFilterChange('areaTo', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Назначение
                </label>
                <Select value={filters.purpose} onValueChange={(value) => handleFilterChange('purpose', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любое" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любое</SelectItem>
                    {purposes.map((purpose) => (
                      <SelectItem key={purpose} value={purpose}>
                        {purpose}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-text-secondary">Загружаем участки...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-text-primary">
                Найдено участков: {filteredProperties.length}
              </h2>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-green-700 border-green-700">
                  <Trees className="h-4 w-4 mr-1" />
                  Земельные участки
                </Badge>
              </div>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="text-center py-16">
                <Trees className="h-24 w-24 text-gray-300 mx-auto mb-8" />
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  Участков не найдено
                </h3>
                <p className="text-text-secondary mb-8">
                  Попробуйте изменить параметры поиска или обратитесь к нашим специалистам
                </p>
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  Получить консультацию
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6">
            <Trees className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Подбор участка</h3>
            <p className="text-text-secondary mb-4">
              Поможем найти идеальный участок под ваши требования
            </p>
            <Button variant="outline" className="w-full">
              Подобрать участок
            </Button>
          </Card>

          <Card className="text-center p-6">
            <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Проверка документов</h3>
            <p className="text-text-secondary mb-4">
              Юридическая проверка участка и чистота документов
            </p>
            <Button variant="outline" className="w-full">
              Проверить документы
            </Button>
          </Card>

          <Card className="text-center p-6">
            <Ruler className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Межевание</h3>
            <p className="text-text-secondary mb-4">
              Услуги по межеванию и кадастровому учету
            </p>
            <Button variant="outline" className="w-full">
              Заказать межевание
            </Button>
          </Card>
        </div>

        {/* Consultation Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Нужна помощь с выбором участка?
            </CardTitle>
            <p className="text-center text-text-secondary">
              Наши специалисты помогут найти идеальный участок для ваших целей
            </p>
          </CardHeader>
          <CardContent>
            <ConsultationForm defaultService="Подбор земельного участка" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}