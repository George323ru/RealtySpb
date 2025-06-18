import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UnifiedForm from "@/components/UnifiedForm";
import { MapPin, TreePine, Zap, Droplets, Phone, CheckCircle, Calculator, FileText, Users, Hammer } from "lucide-react";
import type { Property } from "@shared/schema";

interface LandFilters {
  priceFrom?: string;
  priceTo?: string;
  area?: string;
  location?: string;
  utilities?: string;
}

export default function LandPage() {
  const [filters, setFilters] = useState<LandFilters>({});

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['/api/properties', { ...filters, propertyType: 'land' }],
  });

  const landProperties = (properties as Property[]).filter((property: Property) => 
    property.propertyType === 'Участок' || 
    property.title.toLowerCase().includes('участок') ||
    property.description.toLowerCase().includes('участок')
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  const services = [
    {
      title: "Поиск участков",
      description: "Найдем идеальный участок под ваши требования и бюджет",
      icon: <MapPin className="w-6 h-6" />,
      features: ["Анализ локации", "Проверка документов", "Осмотр участка", "Переговоры с продавцом"]
    },
    {
      title: "Юридическое сопровождение",
      description: "Полная юридическая проверка и сопровождение сделки",
      icon: <FileText className="w-6 h-6" />,
      features: ["Проверка правоустанавливающих документов", "Анализ обременений", "Сопровождение регистрации", "Гарантии чистоты сделки"]
    },
    {
      title: "Подключение коммуникаций",
      description: "Организация подключения всех необходимых коммуникаций",
      icon: <Zap className="w-6 h-6" />,
      features: ["Электричество", "Газ", "Водоснабжение", "Канализация", "Интернет"]
    },
    {
      title: "Разрешения на строительство",
      description: "Получение всех необходимых разрешений и согласований",
      icon: <Hammer className="w-6 h-6" />,
      features: ["Проектная документация", "Согласования в администрации", "Технические условия", "Разрешение на строительство"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Земельные участки в Санкт-Петербурге
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Комплексные услуги по подбору, покупке и оформлению земельных участков. 
              От поиска до получения разрешений на строительство.
            </p>
          </div>

          {/* Quick Services */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-green-600 mb-4 flex justify-center">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Поиск земельных участков</h2>
            
            <div className="grid md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Цена от</label>
                <Input
                  placeholder="от 1 000 000"
                  value={filters.priceFrom || ''}
                  onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Цена до</label>
                <Input
                  placeholder="до 10 000 000"
                  value={filters.priceTo || ''}
                  onChange={(e) => handleFilterChange('priceTo', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Площадь (соток)</label>
                <Select value={filters.area || ''} onValueChange={(value) => handleFilterChange('area', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любая" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любая</SelectItem>
                    <SelectItem value="6">до 6 соток</SelectItem>
                    <SelectItem value="10">6-10 соток</SelectItem>
                    <SelectItem value="15">10-15 соток</SelectItem>
                    <SelectItem value="20">15-20 соток</SelectItem>
                    <SelectItem value="20+">более 20 соток</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Район</label>
                <Select value={filters.location || ''} onValueChange={(value) => handleFilterChange('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любой" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любой</SelectItem>
                    <SelectItem value="Всеволожский">Всеволожский</SelectItem>
                    <SelectItem value="Гатчинский">Гатчинский</SelectItem>
                    <SelectItem value="Ломоносовский">Ломоносовский</SelectItem>
                    <SelectItem value="Тосненский">Тосненский</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Коммуникации</label>
                <Select value={filters.utilities || ''} onValueChange={(value) => handleFilterChange('utilities', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любые" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любые</SelectItem>
                    <SelectItem value="full">Все коммуникации</SelectItem>
                    <SelectItem value="partial">Частично</SelectItem>
                    <SelectItem value="none">Без коммуникаций</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Доступные участки ({landProperties.length})
          </h2>
          
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {landProperties.map((property: Property) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={property.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"} 
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-t-lg" 
                    />
                    <Badge className="absolute top-3 left-3 bg-green-600">
                      {property.propertyType}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{property.title}</h3>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.district}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-gray-50 rounded p-2">
                        <div className="text-xs text-gray-500">Площадь</div>
                        <div className="font-medium">{property.area} м²</div>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <div className="text-xs text-gray-500">За сотку</div>
                        <div className="font-medium">{Math.round(Number(property.price) / (parseInt(property.area) / 100)).toLocaleString()} ₽</div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatPrice(property.price)}
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Полный спектр услуг по земле
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Мы сопровождаем вас на всех этапах - от поиска участка до получения разрешений на строительство
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{service.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Как мы работаем
            </h2>
            <p className="text-lg text-gray-600">
              Простой и понятный процесс от заявки до получения ключей
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Консультация", desc: "Обсуждаем ваши потребности и бюджет" },
              { step: "2", title: "Подбор участков", desc: "Находим варианты по вашим критериям" },
              { step: "3", title: "Осмотр и проверка", desc: "Показываем участки и проверяем документы" },
              { step: "4", title: "Сопровождение", desc: "Помогаем с покупкой и оформлением" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Готовы найти свой участок?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Оставьте заявку и получите персональную консультацию по земельным участкам
            </p>
            
            <div className="max-w-md mx-auto">
              <UnifiedForm 
                serviceType="Земля"
                title="Получить консультацию"
                buttonText="Получить консультацию"
                successTitle="Заявка отправлена!"
                successMessage="Мы свяжемся с вами в течение 15 минут для обсуждения подходящих участков."
                className="bg-white"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}