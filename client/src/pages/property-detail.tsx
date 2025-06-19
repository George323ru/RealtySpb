import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ConsultationForm from "@/components/consultation-form";
import PropertyCard from "@/components/property-card";
import { 
  MapPin, 
  Home, 
  Maximize, 
  Building, 
  Calendar,
  Phone,
  Heart,
  Share2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Car,
  Zap,
  Wifi,
  Shield
} from "lucide-react";
import { formatPrice, formatPricePerMeter, formatArea, formatFloor, formatRooms } from "@/lib/utils";
import type { Property } from "@shared/schema";

export default function PropertyDetail() {
  const params = useParams();
  const propertyId = parseInt(params.id || '1');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: property, isLoading } = useQuery<Property>({
    queryKey: [`/api/properties/${propertyId}`],
  });

  const { data: similarProperties = [] } = useQuery<Property[]>({
    queryKey: ["/api/properties", { 
      district: property?.district,
      propertyType: property?.propertyType 
    }],
    enabled: !!property,
  });

  const nextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-neutral-200 rounded mb-8 w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-96 bg-neutral-200 rounded-lg mb-6"></div>
                  <div className="h-32 bg-neutral-200 rounded mb-6"></div>
                </div>
                <div className="h-96 bg-neutral-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Объект не найден
          </h2>
          <p className="text-text-secondary mb-4">
            Возможно, объект был снят с продажи или перемещен
          </p>
          <Link href="/buy">
            <Button>Вернуться к поиску</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const currentImage = property.images?.[currentImageIndex] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200";
  const filteredSimilar = similarProperties.filter(p => p.id !== property.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Link href="/" className="hover:text-accent-orange">Главная</Link>
              <span>/</span>
              <Link href="/buy" className="hover:text-accent-orange">Купить</Link>
              <span>/</span>
              <span className="text-text-primary">{property.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/buy">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к объектам
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="relative mb-8">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <img
                    src={currentImage}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {property.images && property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-neutral-300/60 text-text-primary p-2 rounded-full hover:bg-opacity-70"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-neutral-300/60 text-text-primary p-2 rounded-full hover:bg-opacity-70"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-neutral-300/60 text-text-primary px-3 py-1 rounded">
                        {currentImageIndex + 1} / {property.images.length}
                      </div>
                    </>
                  )}
                  
                  <div className="absolute top-4 left-4">
                    <Badge className={
                      property.buildingType === "новостройка" 
                        ? "bg-green-500 text-text-primary" 
                        : "bg-blue-500 text-text-primary"
                    }>
                      {property.buildingType === "новостройка" ? "Новостройка" : "Вторичка"}
                    </Badge>
                  </div>
                  
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100">
                      <Heart className="w-5 h-5 text-text-secondary" />
                    </button>
                    <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100">
                      <Share2 className="w-5 h-5 text-text-secondary" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {property.images && property.images.length > 1 && (
                  <div className="flex space-x-2 mt-4 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          index === currentImageIndex ? 'border-accent-orange' : 'border-neutral-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Фото ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Info */}
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{property.title}</CardTitle>
                      <p className="text-text-secondary flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-accent-orange" />
                        {property.district}, {property.address}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-text-primary">
                        {formatPrice(property.price)}
                      </div>
                      {property.pricePerMeter && (
                        <div className="text-text-secondary">
                          {formatPricePerMeter(property.pricePerMeter)}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {property.rooms && (
                      <div className="text-center p-4 bg-neutral-100 rounded-lg">
                        <Home className="w-6 h-6 mx-auto mb-2 text-text-secondary" />
                        <div className="text-sm text-text-secondary">Комнаты</div>
                        <div className="font-semibold">{formatRooms(property.rooms)}</div>
                      </div>
                    )}
                    
                    <div className="text-center p-4 bg-neutral-100 rounded-lg">
                      <Maximize className="w-6 h-6 mx-auto mb-2 text-text-secondary" />
                      <div className="text-sm text-text-secondary">Площадь</div>
                      <div className="font-semibold">{formatArea(property.area)}</div>
                    </div>
                    
                    {property.floor && property.totalFloors && (
                      <div className="text-center p-4 bg-neutral-100 rounded-lg">
                        <Building className="w-6 h-6 mx-auto mb-2 text-text-secondary" />
                        <div className="text-sm text-text-secondary">Этаж</div>
                        <div className="font-semibold">{formatFloor(property.floor, property.totalFloors)}</div>
                      </div>
                    )}
                    
                    <div className="text-center p-4 bg-neutral-100 rounded-lg">
                      <Calendar className="w-6 h-6 mx-auto mb-2 text-text-secondary" />
                      <div className="text-sm text-text-secondary">Тип</div>
                      <div className="font-semibold">{property.propertyType}</div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Описание</h3>
                    <p className="text-text-secondary leading-relaxed">
                      {property.description}
                    </p>
                  </div>

                  {property.features && property.features.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">Особенности</h3>
                      <div className="flex flex-wrap gap-2">
                        {property.features.map((feature, index) => (
                          <Badge key={index} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Similar Properties */}
              {filteredSimilar.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-6">
                    Похожие объекты
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSimilar.map((similarProperty) => (
                      <PropertyCard key={similarProperty.id} property={similarProperty} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Заинтересовал объект?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ConsultationForm 
                    defaultService="купить"
                    className="!p-0 !bg-transparent"
                  />
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Button className="w-full bg-accent-orange hover:bg-orange-600 text-text-primary">
                      <Phone className="w-4 h-4 mr-2" />
                      Позвонить сейчас
                    </Button>
                    <Button variant="outline" className="w-full">
                      Записаться на просмотр
                    </Button>
                    <Button variant="ghost" className="w-full">
                      Заказать видео-звонок
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Property Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Удобства</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Car className="w-5 h-5 mr-3 text-text-secondary" />
                      <span className="text-sm">Парковка</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 mr-3 text-text-secondary" />
                      <span className="text-sm">Лифт</span>
                    </div>
                    <div className="flex items-center">
                      <Wifi className="w-5 h-5 mr-3 text-text-secondary" />
                      <span className="text-sm">Интернет</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 mr-3 text-text-secondary" />
                      <span className="text-sm">Охрана</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Agent Info */}
              <Card>
                <CardContent className="p-6 text-center">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b5c1b1e4?w=100"
                    alt="Агент"
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-text-primary mb-1">Анна Петрова</h3>
                  <p className="text-sm text-text-secondary mb-4">Ваш персональный агент</p>
                  <Button variant="outline" className="w-full">
                    Связаться с агентом
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
