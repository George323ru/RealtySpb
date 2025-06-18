import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadForm from "@/components/LeadForm";
import { Shield, TrendingUp, Clock, Users, CheckCircle, Star } from "lucide-react";

export default function Rent() {
  const [activeTab, setActiveTab] = useState("landlord");

  const landlordBenefits = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "Гарантированный доход",
      description: "Обеспечиваем стабильную аренду и своевременные платежи"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Проверенные арендаторы",
      description: "Тщательная проверка платежеспособности и благонадежности"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-500" />,
      title: "Экономия времени",
      description: "Берем на себя все заботы по поиску и сопровождению арендаторов"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Управление объектом",
      description: "Полное управление недвижимостью и решение всех вопросов"
    }
  ];

  const tenantBenefits = [
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Юридическая чистота",
      description: "Все объекты проверены, договоры составлены правильно"
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      title: "Быстрый подбор",
      description: "Найдем подходящий объект в кратчайшие сроки"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      title: "Лучшие цены",
      description: "Помогаем найти оптимальное соотношение цена-качество"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Поддержка 24/7",
      description: "Помощь в решении любых вопросов в период аренды"
    }
  ];

  const landlordServices = [
    "Бесплатная оценка арендной стоимости",
    "Профессиональная фотосъемка объекта",
    "Размещение на всех площадках",
    "Проверка потенциальных арендаторов",
    "Проведение показов квартиры",
    "Составление договора аренды",
    "Прием-передача объекта",
    "Контроль своевременных платежей",
    "Решение спорных вопросов",
    "Управление объектом"
  ];

  const tenantServices = [
    "Подбор объектов по вашим критериям",
    "Организация просмотров",
    "Проверка юридической чистоты",
    "Помощь в переговорах с собственником",
    "Составление договора аренды",
    "Сопровождение при заселении",
    "Помощь в оформлении коммунальных услуг",
    "Поддержка в период аренды"
  ];

  const pricingPlans = [
    {
      title: "Базовый",
      price: "50% от месячной аренды",
      description: "Поиск и проверка арендаторов",
      features: [
        "Размещение объявлений",
        "Проверка арендаторов",
        "Проведение показов",
        "Составление договора"
      ]
    },
    {
      title: "Стандартный",
      price: "100% от месячной аренды",
      description: "Полное сопровождение аренды",
      features: [
        "Все услуги базового пакета",
        "Прием-передача объекта",
        "Контроль платежей",
        "Решение спорных вопросов",
        "Поддержка 3 месяца"
      ],
      popular: true
    },
    {
      title: "Премиум",
      price: "8% от ежемесячной аренды",
      description: "Полное управление недвижимостью",
      features: [
        "Все услуги стандартного пакета",
        "Постоянное управление",
        "Контроль состояния объекта",
        "Организация ремонтных работ",
        "Поддержка 24/7"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Сдача в аренду 
              <span className="text-yandex-yellow"> без проблем</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Поможем сдать вашу недвижимость надежным арендаторам или найти идеальную квартиру для аренды
            </p>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-md mx-auto mb-8">
              <TabsList className="grid w-full grid-cols-2 bg-white/20">
                <TabsTrigger value="landlord" className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-600">
                  Собственникам
                </TabsTrigger>
                <TabsTrigger value="tenant" className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-600">
                  Арендаторам
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                {activeTab === "landlord" ? "Сдать квартиру" : "Найти квартиру"}
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg">
                Узнать условия
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="landlord">Собственникам</TabsTrigger>
              <TabsTrigger value="tenant">Арендаторам</TabsTrigger>
            </TabsList>

            <TabsContent value="landlord">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  Преимущества для собственников
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Сдавайте недвижимость с гарантией дохода и минимумом забот
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {landlordBenefits.map((benefit, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
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
            </TabsContent>

            <TabsContent value="tenant">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  Преимущества для арендаторов
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Найдите идеальную квартиру для аренды с профессиональной поддержкой
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {tenantBenefits.map((benefit, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
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
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="landlord">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                    Услуги для собственников
                  </h2>
                  <p className="text-lg text-text-secondary">
                    Полный комплекс услуг для успешной сдачи недвижимости в аренду
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {landlordServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <span className="text-text-primary font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tenant">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                    Услуги для арендаторов
                  </h2>
                  <p className="text-lg text-text-secondary">
                    Помогаем найти и арендовать идеальную недвижимость
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tenantServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                      <span className="text-text-primary font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Тарифы для собственников
            </h2>
            <p className="text-lg text-text-secondary">
              Выберите подходящий пакет услуг
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-accent-orange shadow-lg' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-orange text-white">
                    Популярный
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-text-primary">
                    {plan.title}
                  </CardTitle>
                  <div className="text-3xl font-bold text-accent-orange mt-2">
                    {plan.price}
                  </div>
                  <p className="text-text-secondary mt-2">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-text-primary">{feature}</span>
                    </div>
                  ))}
                  <Button 
                    className={`w-full mt-6 ${plan.popular 
                      ? 'bg-accent-orange text-white hover:bg-orange-600' 
                      : 'border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white'
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Выбрать тариф
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-500">
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {activeTab === "landlord" 
                ? "Узнайте стоимость аренды вашей недвижимости" 
                : "Найдите идеальную квартиру для аренды"
              }
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {activeTab === "landlord"
                ? "Получите бесплатную оценку арендной стоимости и план сдачи"
                : "Оставьте заявку и мы подберем варианты по вашим критериям"
              }
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title={activeTab === "landlord" ? "Сдать недвижимость" : "Найти квартиру для аренды"}
              description="Заполните форму и наш специалист свяжется с вами в течение 15 минут"
              serviceType="Хочу сдать в аренду"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
