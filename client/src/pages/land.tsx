import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchForm from "@/components/search-form";
import PropertyCard from "@/components/property-card";
import ConsultationForm from "@/components/consultation-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Ruler, 
  TreePine, 
  Hammer, 
  Shield, 
  Calculator,
  CheckCircle,
  ArrowRight,
  Home,
  Building2,
  Factory
} from "lucide-react";
import type { Property } from "@shared/schema";

const landCategories = [
  {
    id: "residential",
    title: "Под ИЖС",
    description: "Участки для строительства частных домов",
    icon: Home,
    color: "bg-blue-100 text-blue-600",
    features: ["Коммуникации", "Подъездные пути", "Документы в порядке"]
  },
  {
    id: "commercial", 
    title: "Коммерческие",
    description: "Земля для бизнеса и инвестиций",
    icon: Building2,
    color: "bg-green-100 text-green-600",
    features: ["Высокий трафик", "Развитая инфраструктура", "Перспективы роста"]
  },
  {
    id: "agricultural",
    title: "Сельхозназначения", 
    description: "Участки для фермерства и агробизнеса",
    icon: TreePine,
    color: "bg-amber-100 text-amber-600",
    features: ["Плодородная почва", "Удобный доступ", "Поддержка государства"]
  },
  {
    id: "industrial",
    title: "Промышленные",
    description: "Территории для производства",
    icon: Factory,
    color: "bg-purple-100 text-purple-600", 
    features: ["Энергомощности", "Логистика", "Промзона"]
  }
];

const services = [
  {
    title: "Подбор участка",
    description: "Найдем идеальный участок под ваши цели и бюджет",
    icon: MapPin,
    features: ["Анализ документов", "Проверка обременений", "Осмотр участка"]
  },
  {
    title: "Юридическое сопровождение", 
    description: "Полная проверка и безопасная сделка",
    icon: Shield,
    features: ["Проверка правоустанавливающих документов", "Сопровождение сделки", "Регистрация права"]
  },
  {
    title: "Оценка стоимости",
    description: "Независимая оценка рыночной стоимости",
    icon: Calculator,
    features: ["Анализ рынка", "Учет перспектив развития", "Официальный отчет"]
  },
  {
    title: "Помощь в строительстве",
    description: "Подключение коммуникаций и разрешения",
    icon: Hammer,
    features: ["Проектирование", "Получение разрешений", "Подключение коммуникаций"]
  }
];

export default function Land() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: properties = [] } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  // Filter land properties
  const landProperties = properties.filter(property => 
    property.propertyType === "Земельный участок"
  );

  const handleSearch = (filters: any) => {
    console.log("Land search filters:", filters);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
              Земельные участки в{" "}
              <span className="text-green-600">Санкт-Петербурге</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Подбор и покупка земельных участков под строительство, бизнес и инвестиции. 
              Профессиональное сопровождение от поиска до регистрации права.
            </p>
          </div>
          
          <SearchForm 
            onSearch={handleSearch}
            defaultCategory="Земельный участок"
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Категории земельных участков
            </h2>
            <p className="text-lg text-text-secondary">
              Выберите подходящую категорию для ваших целей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {landCategories.map((category) => (
              <Card 
                key={category.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {category.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-4">
                    {category.description}
                  </p>

                  <div className="space-y-2">
                    {category.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-text-secondary">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Available Properties */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Доступные участки
            </h2>
            <p className="text-lg text-text-secondary">
              Актуальные предложения земельных участков в СПб и области
            </p>
          </div>

          {landProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {landProperties.slice(0, 6).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              
              <div className="text-center">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Смотреть все участки
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <TreePine className="w-16 h-16 text-text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Загружаем актуальные предложения
                </h3>
                <p className="text-text-secondary mb-6">
                  Наша база участков постоянно обновляется. Оставьте заявку и мы подберем подходящие варианты.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Получить подборку участков
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Услуги по работе с землей
            </h2>
            <p className="text-lg text-text-secondary">
              Комплексное сопровождение сделок с земельными участками
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-text-primary mb-2">
                        {service.title}
                      </h3>
                      
                      <p className="text-text-secondary mb-4">
                        {service.description}
                      </p>

                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-text-secondary">
                            <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Готовы найти идеальный участок?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Оставьте заявку и наш специалист по земельным участкам свяжется с вами
          </p>
          
          <div className="max-w-md mx-auto">
            <ConsultationForm 
              className="bg-white rounded-lg p-6" 
              defaultService="Подбор земельного участка"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Почему выбирают нас
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Безопасность сделок
              </h3>
              <p className="text-text-secondary">
                Тщательная проверка документов и юридическая чистота каждого участка
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Знание рынка
              </h3>
              <p className="text-text-secondary">
                15 лет опыта работы с земельными участками в Санкт-Петербурге и области
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 text-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Полное сопровождение
              </h3>
              <p className="text-text-secondary">
                От поиска участка до получения разрешений на строительство
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}