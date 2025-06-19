import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadForm from "@/components/LeadForm";
import { 
  MapPin, Phone, Share2, Heart, Camera, Maximize2, 
  Car, Wifi, Zap, Droplets, Home, Calendar, User, Ruler
} from "lucide-react";
import type { Property } from "@shared/schema";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-orange mx-auto mb-4"></div>
          <p className="text-text-secondary">Загрузка информации об объекте...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Объект не найден
          </h1>
          <p className="text-text-secondary mb-8">
            Возможно, объект был продан или снят с продажи
          </p>
          <Button className="bg-accent-orange text-white hover:bg-orange-600">
            Вернуться к поиску
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("ru-RU").format(parseFloat(price));
  };

  const formatPricePerMeter = (price: string | null) => {
    if (!price) return "";
    return new Intl.NumberFormat("ru-RU").format(parseFloat(price));
  };

  const getPropertyTypeLabel = (type: string) => {
    const types = {
      apartment: "Квартира",
      house: "Дом",
      commercial: "Коммерческая",
      land: "Земля",
      garage: "Гараж",
      parking: "Машиноместо"
    };
    return types[type as keyof typeof types] || type;
  };

  const getCategoryLabel = (category: string) => {
    const categories = {
      new_building: "Новостройка",
      secondary: "Вторичная",
      rental: "Аренда"
    };
    return categories[category as keyof typeof categories] || category;
  };

  const amenities = [
    { icon: <Car className="w-5 h-5" />, label: "Парковка" },
    { icon: <Wifi className="w-5 h-5" />, label: "Интернет" },
    { icon: <Zap className="w-5 h-5" />, label: "Электричество" },
    { icon: <Droplets className="w-5 h-5" />, label: "Водоснабжение" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Image Gallery */}
      <section className="bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {/* Main Image */}
            <div className="lg:col-span-2 relative">
              <img
                src={property.images[selectedImage] || property.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3"}
                alt={property.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-accent-orange text-white">
                  {property.propertyType}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="bg-white/80 hover:bg-white"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="absolute bottom-4 right-4">
                <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                  <Camera className="w-4 h-4 mr-2" />
                  {property.images.length} фото
                </Button>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {property.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} - фото ${index + 1}`}
                  className={`w-full h-24 lg:h-32 object-cover rounded cursor-pointer transition-opacity ${
                    selectedImage === index ? "opacity-100 ring-2 ring-accent-orange" : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
              {property.images.length > 4 && (
                <div className="w-full h-24 lg:h-32 bg-gray-800 rounded flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
                  <span className="text-white text-sm">
                    +{property.images.length - 4} фото
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Property Information */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  {property.title}
                </h1>
                <p className="text-text-secondary flex items-center text-lg">
                  <MapPin className="w-5 h-5 mr-2 text-accent-orange" />
                  {property.address}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-accent-orange">
                      {formatPrice(property.price)} ₽
                    </div>
                    <div className="text-sm text-text-secondary">Цена</div>
                  </CardContent>
                </Card>

                {property.pricePerMeter && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-text-primary">
                        {formatPricePerMeter(property.pricePerMeter)} ₽
                      </div>
                      <div className="text-sm text-text-secondary">За м²</div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-text-primary">
                      {parseFloat(property.area)}
                    </div>
                    <div className="text-sm text-text-secondary">м²</div>
                  </CardContent>
                </Card>

                {property.rooms && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-text-primary">
                        {property.rooms}
                      </div>
                      <div className="text-sm text-text-secondary">комнат</div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description">Описание</TabsTrigger>
                  <TabsTrigger value="details">Характеристики</TabsTrigger>
                  <TabsTrigger value="amenities">Удобства</TabsTrigger>
                  <TabsTrigger value="location">Расположение</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-text-primary mb-4">
                        Описание объекта
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {property.description}
                      </p>
                      
                      {property.features.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-text-primary mb-3">
                            Особенности:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {property.features.map((feature, index) => (
                              <Badge key={index} variant="secondary">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-text-primary mb-4">
                        Технические характеристики
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex justify-between py-2 border-b border-neutral-200">
                          <span className="text-text-secondary">Тип недвижимости:</span>
                          <span className="font-medium">{getPropertyTypeLabel(property.propertyType)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-neutral-200">
                          <span className="text-text-secondary">Категория:</span>
                          <span className="font-medium">{getCategoryLabel(property.category)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-neutral-200">
                          <span className="text-text-secondary">Общая площадь:</span>
                          <span className="font-medium">{parseFloat(property.area)} м²</span>
                        </div>
                        {property.rooms && (
                          <div className="flex justify-between py-2 border-b border-neutral-200">
                            <span className="text-text-secondary">Количество комнат:</span>
                            <span className="font-medium">{property.rooms}</span>
                          </div>
                        )}
                        {property.floor && property.totalFloors && (
                          <div className="flex justify-between py-2 border-b border-neutral-200">
                            <span className="text-text-secondary">Этаж:</span>
                            <span className="font-medium">{property.floor} из {property.totalFloors}</span>
                          </div>
                        )}
                        <div className="flex justify-between py-2 border-b border-neutral-200">
                          <span className="text-text-secondary">Район:</span>
                          <span className="font-medium">{property.district}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="amenities" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-text-primary mb-4">
                        Удобства и инфраструктура
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-neutral-100 rounded-lg">
                            <div className="text-accent-orange">
                              {amenity.icon}
                            </div>
                            <span className="text-sm font-medium text-text-primary">
                              {amenity.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="location" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-text-primary mb-4">
                        Расположение и транспорт
                      </h3>
                      <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 text-accent-orange mx-auto mb-2" />
                          <p className="text-text-secondary">Интерактивная карта</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-neutral-100 rounded-lg">
                          <i className="fas fa-subway text-2xl text-blue-500 mb-2"></i>
                          <div className="font-medium text-text-primary">Метро</div>
                          <div className="text-sm text-text-secondary">5 мин пешком</div>
                        </div>
                        <div className="text-center p-4 bg-neutral-100 rounded-lg">
                          <i className="fas fa-bus text-2xl text-green-500 mb-2"></i>
                          <div className="font-medium text-text-primary">Автобус</div>
                          <div className="text-sm text-text-secondary">2 мин до остановки</div>
                        </div>
                        <div className="text-center p-4 bg-neutral-100 rounded-lg">
                          <i className="fas fa-car text-2xl text-purple-500 mb-2"></i>
                          <div className="font-medium text-text-primary">Парковка</div>
                          <div className="text-sm text-text-secondary">Во дворе</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <LeadForm 
                  title="Узнать подробности"
                  description="Получите больше информации об этом объекте"
                  serviceType="Интересует объект"
                  compact
                />

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Контакты специалиста</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=400&h=400"
                        alt="Специалист"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-text-primary">Анна Петрова</div>
                        <div className="text-sm text-text-secondary">Эксперт по жилой недвижимости</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button className="w-full bg-accent-orange text-white hover:bg-orange-600">
                        <Phone className="w-4 h-4 mr-2" />
                        Позвонить
                      </Button>
                      <Button variant="outline" className="w-full border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white">
                        Написать в WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-text-primary mb-4">
                      Нужна помощь?
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>• Организуем показ в удобное время</li>
                      <li>• Проведем юридическую проверку</li>
                      <li>• Поможем с оформлением ипотеки</li>
                      <li>• Сопроводим сделку до конца</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-text-primary mb-8">
              Похожие объекты
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Similar properties would be loaded here */}
              <div className="text-center py-16 col-span-full">
                <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-text-secondary">
                  Похожие объекты загружаются...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
