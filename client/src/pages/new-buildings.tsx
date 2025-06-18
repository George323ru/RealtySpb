import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ConsultationForm from "@/components/consultation-form";
import { NewBuilding } from "@shared/schema";
import { 
  MapPin, 
  Calendar, 
  Building, 
  Home, 
  ArrowRight, 
  Filter,
  Grid,
  List,
  Star,
  CheckCircle
} from "lucide-react";
import { DISTRICTS, BUILDING_CLASSES } from "@/lib/constants";

const NewBuildings = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("price-asc");
  const [filters, setFilters] = useState({
    district: "",
    buildingClass: "",
    priceFrom: "",
    priceTo: "",
    readiness: "",
  });

  const { data: buildings = [], isLoading, error } = useQuery<NewBuilding[]>({
    queryKey: ["/api/new-buildings"],
  });

  const advantages = [
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Новое жилье",
      description: "Квартиры в новых домах с современными планировками и инфраструктурой"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      title: "Гарантия качества",
      description: "Работаем только с проверенными застройщиками с государственной лицензией"
    },
    {
      icon: <Home className="w-8 h-8 text-blue-500" />,
      title: "Первичный рынок",
      description: "Покупка напрямую от застройщика без переплат и комиссий"
    },
    {
      icon: <Building className="w-8 h-8 text-purple-500" />,
      title: "Современные ЖК",
      description: "Жилые комплексы с развитой инфраструктурой и благоустроенной территорией"
    }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredBuildings = buildings.filter(building => {
    if (filters.district && building.district !== filters.district) return false;
    if (filters.buildingClass && building.buildingClass !== filters.buildingClass) return false;
    if (filters.priceFrom && building.priceFrom < parseInt(filters.priceFrom)) return false;
    if (filters.priceTo && building.priceFrom > parseInt(filters.priceTo)) return false;
    if (filters.readiness && !building.readiness.toLowerCase().includes(filters.readiness.toLowerCase())) return false;
    return true;
  });

  const sortedBuildings = [...filteredBuildings].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.priceFrom - b.priceFrom;
      case "price-desc":
        return b.priceFrom - a.priceFrom;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const getReadinessColor = (readiness: string) => {
    if (readiness.includes("100%") || readiness.toLowerCase().includes("сдан")) {
      return "bg-green-500";
    } else if (parseInt(readiness) >= 75) {
      return "bg-blue-500";
    } else if (parseInt(readiness) >= 50) {
      return "bg-yellow-500";
    }
    return "bg-gray-500";
  };

  const getClassColor = (buildingClass: string) => {
    const colors = {
      economy: "bg-gray-500",
      comfort: "bg-blue-500",
      business: "bg-purple-500",
      premium: "bg-yellow-500"
    };
    return colors[buildingClass as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Новостройки Санкт-Петербурга
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Лучшие жилые комплексы от проверенных застройщиков с государственной гарантией
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{buildings.length}+</div>
                <div className="text-sm opacity-80">Жилых комплексов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">18</div>
                <div className="text-sm opacity-80">Районов города</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-80">Проверенные застройщики</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Преимущества покупки в новостройках
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Почему стоит выбрать новое жилье от застройщика
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

      {/* Filters and Listings */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
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

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Готовность
                      </label>
                      <Select value={filters.readiness} onValueChange={(value) => handleFilterChange("readiness", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Любая" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Любая</SelectItem>
                          <SelectItem value="сдан">Сданные дома</SelectItem>
                          <SelectItem value="90">90%+ готовности</SelectItem>
                          <SelectItem value="50">50%+ готовности</SelectItem>
                          <SelectItem value="строительство">В стройке</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-6 bg-accent-orange hover:bg-orange-600"
                    onClick={() => {
                      // Filters are applied automatically via the filteredBuildings
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
                    Найдено: <span className="font-semibold text-text-primary">{sortedBuildings.length}</span> ЖК
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                      <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                      <SelectItem value="name">По названию</SelectItem>
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

              {/* Buildings Grid/List */}
              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-8">
                      <div className="h-6 bg-gray-200 rounded mb-4 skeleton" />
                      <div className="h-4 bg-gray-200 rounded mb-2 skeleton" />
                      <div className="h-4 bg-gray-200 rounded w-2/3 skeleton" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500">Ошибка загрузки данных. Попробуйте обновить страницу.</p>
                </div>
              ) : sortedBuildings.length > 0 ? (
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 lg:grid-cols-2 gap-8" 
                  : "space-y-6"
                }>
                  {sortedBuildings.map((building) => (
                    <Card key={building.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                      <div className={viewMode === "list" ? "flex flex-col lg:flex-row" : ""}>
                        <div className={viewMode === "list" ? "lg:w-1/3" : ""}>
                          <img
                            src={building.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"}
                            alt={building.name}
                            className="w-full h-64 object-cover"
                          />
                        </div>
                        <CardContent className={`p-6 ${viewMode === "list" ? "lg:w-2/3" : ""}`}>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex flex-wrap gap-2">
                              <Badge className={`${getReadinessColor(building.readiness)} text-white`}>
                                {building.readiness}
                              </Badge>
                              <Badge className={`${getClassColor(building.buildingClass)} text-white`}>
                                {BUILDING_CLASSES.find(c => c.value === building.buildingClass)?.label || building.buildingClass}
                              </Badge>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-text-primary mb-2">
                            {building.name}
                          </h3>
                          
                          <div className="flex items-center text-text-secondary mb-3">
                            <MapPin className="w-4 h-4 mr-1 text-accent-orange" />
                            <span className="text-sm">{building.location}</span>
                          </div>

                          <p className="text-text-secondary mb-4 line-clamp-2">
                            {building.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-text-secondary">Квартиры от</div>
                              <div className="text-lg font-bold text-text-primary">
                                {formatPrice(building.priceFrom)}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-text-secondary">За м²</div>
                              <div className="text-lg font-bold text-text-primary">
                                от {formatPrice(building.pricePerMeterFrom)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                            <span className="flex items-center">
                              <Home className="w-4 h-4 mr-1" />
                              {building.totalFlats} квартир
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {building.completionDate || "Готов"}
                            </span>
                          </div>

                          {building.features && building.features.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {building.features.slice(0, 3).map((feature, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                              {building.features.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{building.features.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          <Button className="w-full bg-accent-orange hover:bg-orange-600">
                            Посмотреть планировки
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    ЖК не найдены
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Попробуйте изменить параметры поиска или сбросить фильтры
                  </p>
                  <Button
                    onClick={() => setFilters({
                      district: "",
                      buildingClass: "",
                      priceFrom: "",
                      priceTo: "",
                      readiness: "",
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
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <ConsultationForm 
              title="Заинтересовались новостройкой?"
              description="Оставьте заявку и получите подробную презентацию выбранного ЖК и помощь в выборе квартиры"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewBuildings;
