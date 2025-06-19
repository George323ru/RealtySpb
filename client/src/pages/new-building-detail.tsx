import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, Calendar, Building, Users, Home, ArrowLeft, 
  ChevronLeft, ChevronRight, Phone, Mail, Heart,
  Download, Share2, Calculator, Car, TreePine, Waves, ShoppingCart
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import MortgageCalculator from "@/components/MortgageCalculator";
import ConsultationForm from "@/components/consultation-form";
import type { NewBuilding } from "@shared/schema";

export default function NewBuildingDetail() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedLayout, setSelectedLayout] = useState(0);

  // Прокрутка к верху страницы при загрузке
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: building, isLoading } = useQuery<NewBuilding>({
    queryKey: [`/api/new-buildings/${id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-48 mb-4"></div>
            <div className="h-96 bg-neutral-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-neutral-200 rounded"></div>
              </div>
              <div className="h-64 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!building) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            ЖК не найден
          </h1>
          <Link href="/new-buildings">
            <Button>Вернуться к списку</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Примеры планировок (в реальном проекте будут из API)
  const layouts = [
    {
      id: 1,
      name: "1-комнатная",
      area: "38-42",
      price: "от 4 800 000",
      rooms: 1,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "2-комнатная",
      area: "56-68",
      price: "от 7 200 000",
      rooms: 2,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "3-комнатная",
      area: "78-89",
      price: "от 9 800 000",
      rooms: 3,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    }
  ];

  const allImages = building.images?.length ? building.images : [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&crop=building",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=building",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop&crop=building",
    "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&h=600&fit=crop&crop=building"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const statusInfo = getStatusInfo(building.readiness);

  function getStatusInfo(readiness: string | null) {
    if (!readiness) return { label: 'В продаже', color: 'bg-accent-orange' };
    
    switch (readiness.toLowerCase()) {
      case 'готов':
      case 'сдан':
        return { label: 'Сдан', color: 'bg-green-500' };
      case 'отделка':
      case 'чистовая отделка':
        return { label: 'Отделка', color: 'bg-blue-500' };
      case 'строительство':
      case 'строится':
        return { label: 'Строится', color: 'bg-orange-500' };
      case 'фундамент':
        return { label: 'Фундамент', color: 'bg-gray-500' };
      case 'проект':
        return { label: 'Проект', color: 'bg-purple-500' };
      default:
        return { label: 'В продаже', color: 'bg-accent-orange' };
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-text-secondary hover:text-accent-orange">
              Главная
            </Link>
            <span className="text-text-secondary">/</span>
            <Link href="/new-buildings" className="text-text-secondary hover:text-accent-orange">
              Новостройки
            </Link>
            <span className="text-text-secondary">/</span>
            <span className="text-text-primary font-medium">{building.name}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center mb-4">
                <Link href="/new-buildings">
                  <Button variant="ghost" size="sm" className="mr-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад к списку
                  </Button>
                </Link>
                <Badge className={`${statusInfo.color} text-white`}>
                  {statusInfo.label}
                </Badge>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">
                {building.name}
              </h1>
              
              <div className="flex items-center text-text-secondary mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{building.location}</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-text-secondary">
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  <span>Застройщик: {building.developer}</span>
                </div>
                {building.completionYear && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Сдача: {building.completionYear}</span>
                  </div>
                )}
                {building.totalFlats && (
                  <div className="flex items-center">
                    <Home className="w-4 h-4 mr-1" />
                    <span>{building.totalFlats} квартир</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-accent-orange mb-2">
                от {formatPrice(building.priceFrom)}
              </div>
              {building.pricePerMeter && (
                <div className="text-text-secondary">
                  от {formatPrice(building.pricePerMeter)}/м²
                </div>
              )}
              
              <div className="flex items-center space-x-2 mt-4">
                <Button size="sm" variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  В избранное
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Презентация
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-8">
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
              <img
                src={allImages[currentImageIndex]}
                alt={`${building.name} - фото ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-accent-orange' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Миниатюра ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="layouts">Планировки</TabsTrigger>
                <TabsTrigger value="infrastructure">Инфраструктура</TabsTrigger>
                <TabsTrigger value="documents">Документы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-text-primary mb-4">
                      О жилом комплексе
                    </h3>
                    <div className="prose max-w-none text-text-secondary">
                      <p>{building.description}</p>
                      
                      {building.features && building.features.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold text-text-primary mb-3">
                            Особенности комплекса:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {building.features.map((feature, index) => (
                              <div key={index} className="flex items-center">
                                <div className="w-2 h-2 bg-accent-orange rounded-full mr-3 flex-shrink-0"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="layouts" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-text-primary mb-4">
                      Доступные планировки
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {layouts.map((layout, index) => (
                        <Card key={layout.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-neutral-100">
                              <img
                                src={layout.image}
                                alt={layout.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="font-semibold text-text-primary mb-2">
                              {layout.name}
                            </h4>
                            <div className="text-sm text-text-secondary mb-2">
                              Площадь: {layout.area} м²
                            </div>
                            <div className="font-bold text-accent-orange">
                              {layout.price} ₽
                            </div>
                            <Button className="w-full mt-3" size="sm">
                              <Calculator className="w-4 h-4 mr-2" />
                              Рассчитать ипотеку
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="infrastructure" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-text-primary mb-4">
                      Инфраструктура района
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                          <Car className="w-4 h-4 mr-2" />
                          Транспорт
                        </h4>
                        <ul className="space-y-2 text-text-secondary">
                          <li>• Метро "Парк Победы" — 5 мин пешком</li>
                          <li>• Автобусная остановка — 2 мин</li>
                          <li>• До центра города — 15 мин</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Торговля
                        </h4>
                        <ul className="space-y-2 text-text-secondary">
                          <li>• ТРК "Питер Радуга" — 3 мин</li>
                          <li>• Супермаркет "Лента" — 5 мин</li>
                          <li>• Кафе и рестораны — в доме</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                          <TreePine className="w-4 h-4 mr-2" />
                          Рекреация
                        </h4>
                        <ul className="space-y-2 text-text-secondary">
                          <li>• Московский парк Победы — 5 мин</li>
                          <li>• Детские площадки — во дворе</li>
                          <li>• Спортивный комплекс — 7 мин</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Социальные объекты
                        </h4>
                        <ul className="space-y-2 text-text-secondary">
                          <li>• Детский сад — в доме</li>
                          <li>• Школа № 123 — 8 мин пешком</li>
                          <li>• Поликлиника — 10 мин</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-text-primary mb-4">
                      Документы и разрешения
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-text-primary">Разрешение на строительство</h4>
                          <p className="text-sm text-text-secondary">№ 78-101-123-2023 от 15.03.2023</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-text-primary">Проектная декларация</h4>
                          <p className="text-sm text-text-secondary">Актуальная версия от 01.06.2023</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-text-primary">Презентация ЖК</h4>
                          <p className="text-sm text-text-secondary">Подробная информация о комплексе</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Calculator & Form */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Ипотечный калькулятор
                </h3>
                <MortgageCalculator 
                  compact={true} 
                  defaultPrice={building.priceFrom}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Получить консультацию
                </h3>
                <ConsultationForm 
                  defaultService="Покупка новостройки"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Контакты отдела продаж
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-3 text-accent-orange" />
                    <span className="text-text-primary">+7 (812) 123-45-67</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-accent-orange" />
                    <span className="text-text-primary">sales@{building.name.toLowerCase().replace(/\s+/g, '')}.ru</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="text-sm text-text-secondary mb-2">
                    Режим работы:
                  </div>
                  <div className="text-sm text-text-primary">
                    Пн-Вс: 09:00 - 21:00
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}