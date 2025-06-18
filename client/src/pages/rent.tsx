import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "@/components/property-card";
import SearchForm from "@/components/search-form";
import ConsultationForm from "@/components/consultation-form";
import { Property } from "@shared/schema";
import { 
  Home, 
  Users, 
  DollarSign, 
  Shield, 
  Calendar, 
  FileText, 
  Key, 
  TrendingUp,
  CheckCircle,
  Clock
} from "lucide-react";

const Rent = () => {
  const [activeTab, setActiveTab] = useState("rent-out");

  const { data: rentalProperties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties?transactionType=rent"],
  });

  const rentOutBenefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "Стабильный доход",
      description: "Гарантированная арендная плата каждый месяц с минимальными рисками"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Надежные арендаторы",
      description: "Тщательная проверка всех потенциальных арендаторов и их платежеспособности"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Юридическая защита",
      description: "Профессиональное оформление договоров и защита ваших интересов"
    },
    {
      icon: <Key className="w-8 h-8 text-orange-500" />,
      title: "Управление объектом",
      description: "Полное управление арендой, решение всех вопросов с арендаторами"
    }
  ];

  const rentServices = [
    {
      title: "Поиск арендаторов",
      description: "Активный поиск и подбор надежных арендаторов",
      features: [
        "Размещение объявлений на всех площадках",
        "Проверка документов и платежеспособности",
        "Организация просмотров",
        "Переговоры об условиях аренды"
      ]
    },
    {
      title: "Оформление договора",
      description: "Профессиональная подготовка всех документов",
      features: [
        "Составление договора аренды",
        "Акт приема-передачи имущества",
        "Регистрация договора при необходимости",
        "Консультации по налогообложению"
      ]
    },
    {
      title: "Управление арендой",
      description: "Полное сопровождение в период аренды",
      features: [
        "Контроль своевременной оплаты",
        "Решение вопросов с арендаторами",
        "Организация ремонта при необходимости",
        "Продление или перезаключение договоров"
      ]
    }
  ];

  const rentalSteps = [
    {
      number: 1,
      title: "Оценка и подготовка",
      description: "Оценим рентабельность и подготовим объект к сдаче",
      icon: <Home className="w-6 h-6" />
    },
    {
      number: 2,
      title: "Поиск арендаторов",
      description: "Найдем надежных арендаторов в кратчайшие сроки",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: 3,
      title: "Оформление сделки",
      description: "Подготовим и оформим все необходимые документы",
      icon: <FileText className="w-6 h-6" />
    },
    {
      number: 4,
      title: "Управление арендой",
      description: "Обеспечим комфортное управление на весь период",
      icon: <Calendar className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Аренда недвижимости в Санкт-Петербурге
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Сдавайте недвижимость выгодно или находите идеальное жилье для аренды
            </p>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md mx-auto">
              <TabsList className="grid w-full grid-cols-2 bg-white/20">
                <TabsTrigger value="rent-out" className="text-white data-[state=active]:text-purple-600">
                  Сдать в аренду
                </TabsTrigger>
                <TabsTrigger value="find-rental" className="text-white data-[state=active]:text-purple-600">
                  Снять жилье
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Rent Out Tab */}
        <TabsContent value="rent-out" className="mt-0">
          {/* Benefits Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  Преимущества сдачи в аренду с нами
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Получайте максимальный доход от вашей недвижимости без лишних хлопот
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {rentOutBenefits.map((benefit, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-text-secondary">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">7-14 дней</div>
                  <div className="text-text-secondary">Средний срок поиска арендаторов</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                  <div className="text-text-secondary">Объектов сданы в первый месяц</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">3%</div>
                  <div className="text-text-secondary">Комиссия агентства</div>
                </div>
              </div>
            </div>
          </section>

          {/* Process Steps */}
          <section className="py-16 bg-neutral-100">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  Как мы работаем
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Простой и понятный процесс сдачи недвижимости в аренду
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {rentalSteps.map((step, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center text-white mx-auto mb-4">
                        {step.icon}
                      </div>
                      <div className="text-sm text-accent-orange font-semibold mb-2">
                        Шаг {step.number}
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary mb-3">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Services Details */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  Наши услуги
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Полный комплекс услуг для сдачи недвижимости в аренду
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {rentServices.map((service, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-text-primary mb-3">
                        {service.title}
                      </h3>
                      <p className="text-text-secondary mb-4">
                        {service.description}
                      </p>
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-text-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section for Rent Out */}
          <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center text-white">
                <ConsultationForm 
                  title="Сдайте недвижимость в аренду"
                  description="Оставьте заявку и получите бесплатную консультацию по сдаче вашей недвижимости"
                />
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Find Rental Tab */}
        <TabsContent value="find-rental" className="mt-0">
          {/* Search Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  Найдите идеальное жилье для аренды
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Большая база проверенных объектов аренды в Санкт-Петербурге
                </p>
              </div>
              
              <SearchForm />
            </div>
          </section>

          {/* Statistics */}
          <section className="py-16 bg-neutral-100">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-accent-orange mb-2">{rentalProperties.length}+</div>
                  <div className="text-text-secondary">Объектов в аренду</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-accent-orange mb-2">18</div>
                  <div className="text-text-secondary">Районов города</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-accent-orange mb-2">24/7</div>
                  <div className="text-text-secondary">Поддержка клиентов</div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-accent-orange mb-2">100%</div>
                  <div className="text-text-secondary">Проверенные объекты</div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Rental Properties */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  Популярные предложения аренды
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Актуальные объекты аренды с проверенными собственниками
                </p>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                      <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 skeleton" />
                      <div className="h-4 bg-gray-200 rounded mb-2 skeleton" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 skeleton" />
                    </div>
                  ))}
                </div>
              ) : rentalProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rentalProperties.slice(0, 6).map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Объекты аренды скоро появятся
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Мы активно работаем над наполнением базы арендных объектов
                  </p>
                </div>
              )}
              
              {rentalProperties.length > 6 && (
                <div className="text-center mt-12">
                  <Button className="bg-accent-orange hover:bg-orange-600 text-white px-8 py-3">
                    Посмотреть все объекты аренды
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Services for Tenants */}
          <section className="py-16 bg-neutral-100">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  Услуги для арендаторов
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Помогаем найти и арендовать идеальное жилье
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      Подбор жилья
                    </h3>
                    <p className="text-text-secondary mb-4">
                      Найдем оптимальные варианты согласно вашим требованиям и бюджету
                    </p>
                    <div className="space-y-2 text-sm text-text-secondary">
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Персональный подбор
                      </div>
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Организация просмотров
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      Проверка объектов
                    </h3>
                    <p className="text-text-secondary mb-4">
                      Тщательная проверка всех объектов и собственников
                    </p>
                    <div className="space-y-2 text-sm text-text-secondary">
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Проверка документов
                      </div>
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Юридическая чистота
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <FileText className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      Оформление сделки
                    </h3>
                    <p className="text-text-secondary mb-4">
                      Помощь в переговорах и оформлении всех документов
                    </p>
                    <div className="space-y-2 text-sm text-text-secondary">
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Составление договора
                      </div>
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Защита интересов
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section for Find Rental */}
          <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center text-white">
                <ConsultationForm 
                  title="Найдите идеальное жилье для аренды"
                  description="Оставьте заявку и мы подберем лучшие варианты согласно вашим требованиям"
                />
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Rent;
