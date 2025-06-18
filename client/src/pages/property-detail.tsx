import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConsultationForm from "@/components/consultation-form";
import PropertyCard from "@/components/property-card";
import { Property } from "@shared/schema";
import { 
  ArrowLeft, 
  MapPin, 
  Home, 
  Square, 
  Layers, 
  Calendar,
  Car,
  CableCar,
  Palette,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  CheckCircle,
  X,
  Eye,
  Clock
} from "lucide-react";
import { PROPERTY_TYPES, BUILDING_CLASSES, RENOVATION_TYPES } from "@/lib/constants";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreenGallery, setShowFullscreenGallery] = useState(false);

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
  });

  const { data: similarProperties = [] } = useQuery<Property[]>({
    queryKey: ["/api/properties", { 
      district: property?.district,
      propertyType: property?.propertyType,
      limit: 3 
    }],
    enabled: !!property,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <X className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Объект не найден
              </h1>
              <p className="text-text-secondary mb-6">
                Запрашиваемая недвижимость не существует или была удалена
              </p>
              <Link href="/buy">
                <Button className="bg-accent-orange hover:bg-orange-600">
                  Вернуться к поиску
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const formatPricePerMeter = (price: number | null) => {
    if (!price) return "";
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽/м²";
  };

  const getPropertyTypeLabel = (type: string) => {
    const propertyType = PROPERTY_TYPES.find(pt => pt.value === type);
    return propertyType?.label || type;
  };

  const getBuildingClassLabel = (cls: string | null) => {
    if (!cls) return "";
    const buildingClass = BUILDING_CLASSES.find(bc => bc.value === cls);
    return buildingClass?.label || cls;
  };

  const getRenovationLabel = (renovation: string | null) => {
    if (!renovation) return "";
    const renovationType = RENOVATION_TYPES.find(rt => rt.value === renovation);
    return renovationType?.label || renovation;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-accent-orange">Главная</Link>
            <span>/</span>
            <Link href="/buy" className="hover:text-accent-orange">Купить</Link>
            <span>/</span>
            <span className="text-text-primary">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/buy">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к поиску
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={property.images[currentImageIndex] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-t-lg cursor-pointer"
                    onClick={() => setShowFullscreenGallery(true)}
                  />
                  
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75"
                      >
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                      </button>
                    </>
                  )}

                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.isNewBuilding && (
                      <Badge className="bg-green-500 text-white">Новостройка</Badge>
                    )}
                    <Badge className="bg-blue-500 text-white">
                      {getPropertyTypeLabel(property.propertyType)}
                    </Badge>
                    {property.transactionType === "rent" && (
                      <Badge className="bg-accent-orange text-white">Аренда</Badge>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100">
                      <Heart className="w-5 h-5 text-text-secondary" />
                    </button>
                    <button className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100">
                      <Share2 className="w-5 h-5 text-text-secondary" />
                    </button>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </div>

                {property.images.length > 1 && (
                  <div className="p-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {property.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${property.title} - ${index + 1}`}
                          className={`w-20 h-20 object-cover rounded cursor-pointer flex-shrink-0 ${
                            index === currentImageIndex ? "ring-2 ring-accent-orange" : ""
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Property Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-text-secondary mb-2">
                      <MapPin className="w-5 h-5 mr-2 text-accent-orange" />
                      <span>{property.address}</span>
                    </div>
                    <div className="flex items-center text-sm text-text-secondary">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>Просмотров: 124</span>
                      <Clock className="w-4 h-4 ml-4 mr-1" />
                      <span>Обновлено вчера</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-text-primary mb-1">
                      {formatPrice(property.price)}
                    </div>
                    {property.pricePerMeter && (
                      <div className="text-text-secondary">
                        {formatPricePerMeter(property.pricePerMeter)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {property.rooms && (
                    <div className="flex items-center">
                      <Home className="w-5 h-5 mr-2 text-accent-orange" />
                      <span>{property.rooms} комн.</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Square className="w-5 h-5 mr-2 text-accent-orange" />
                    <span>{property.area} м²</span>
                  </div>
                  {property.floor && property.totalFloors && (
                    <div className="flex items-center">
                      <Layers className="w-5 h-5 mr-2 text-accent-orange" />
                      <span>{property.floor}/{property.totalFloors} эт.</span>
                    </div>
                  )}
                  {property.yearBuilt && (
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-accent-orange" />
                      <span>{property.yearBuilt} г.</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Описание</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Info Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Характеристики</TabsTrigger>
                    <TabsTrigger value="features">Особенности</TabsTrigger>
                    <TabsTrigger value="location">Расположение</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Тип недвижимости:</span>
                          <span className="font-medium">{getPropertyTypeLabel(property.propertyType)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Площадь:</span>
                          <span className="font-medium">{property.area} м²</span>
                        </div>
                        {property.rooms && (
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Комнат:</span>
                            <span className="font-medium">{property.rooms}</span>
                          </div>
                        )}
                        {property.floor && property.totalFloors && (
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Этаж:</span>
                            <span className="font-medium">{property.floor} из {property.totalFloors}</span>
                          </div>
                        )}
                        {property.yearBuilt && (
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Год постройки:</span>
                            <span className="font-medium">{property.yearBuilt}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        {property.buildingClass && (
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Класс жилья:</span>
                            <span className="font-medium">{getBuildingClassLabel(property.buildingClass)}</span>
                          </div>
                        )}
                        {property.renovation && (
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Ремонт:</span>
                            <span className="font-medium">{getRenovationLabel(property.renovation)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Тип сделки:</span>
                          <span className="font-medium">
                            {property.transactionType === "sale" ? "Продажа" : "Аренда"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Район:</span>
                          <span className="font-medium">{property.district}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.parking && (
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span>Парковка</span>
                        </div>
                      )}
                      {property.elevator && (
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span>Лифт</span>
                        </div>
                      )}
                      {property.balcony && (
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span>Балкон</span>
                        </div>
                      )}
                      {property.furnished && (
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span>Мебель</span>
                        </div>
                      )}
                      {property.features?.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="location" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-text-primary mb-2">Адрес</h4>
                        <p className="text-text-secondary">{property.address}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-2">Район</h4>
                        <p className="text-text-secondary">{property.district}</p>
                      </div>
                      <div className="w-full h-64 bg-neutral-200 rounded-lg flex items-center justify-center">
                        <span className="text-text-secondary">Карта будет доступна после интеграции картографического сервиса</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <ConsultationForm 
                  title="Заинтересовались объектом?"
                  description="Оставьте заявку и мы свяжемся с вами для организации показа"
                  propertyId={property.id}
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Связаться с нами
                </h3>
                <div className="space-y-3">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Telegram
                  </Button>
                  <Button className="w-full bg-accent-orange hover:bg-orange-600 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Позвонить
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Property Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Статистика объекта
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Просмотров:</span>
                    <span className="font-medium">124</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Добавлено:</span>
                    <span className="font-medium">5 дней назад</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Обновлено:</span>
                    <span className="font-medium">Вчера</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">ID объекта:</span>
                    <span className="font-medium">{property.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Похожие объекты
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties
                .filter(p => p.id !== property.id)
                .slice(0, 3)
                .map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Fullscreen Gallery Modal */}
      {showFullscreenGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowFullscreenGallery(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-full">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="max-w-full max-h-screen object-contain"
            />
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30"
                >
                  <ArrowLeft className="w-6 h-6 rotate-180" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
