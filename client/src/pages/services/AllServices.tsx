import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import { ArrowRight, CheckCircle, Star, Users } from "lucide-react";
import type { Service } from "@shared/schema";

export default function AllServices() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const serviceCategories = [
    {
      title: "Основные услуги",
      description: "Покупка, продажа и аренда недвижимости",
      services: [
        { title: "Покупка недвижимости", slug: "buy", icon: "fas fa-home", description: "Поможем найти и купить идеальную недвижимость" },
        { title: "Продажа недвижимости", slug: "sell", icon: "fas fa-hand-holding-usd", description: "Продадим вашу недвижимость по максимальной цене" },
        { title: "Аренда недвижимости", slug: "rent", icon: "fas fa-key", description: "Сдача и поиск недвижимости в аренду" },
      ]
    },
    {
      title: "Подготовка и оформление",
      description: "Услуги по подготовке недвижимости к сделке",
      services: services?.filter(s => ["pre-sale-preparation", "legal-verification", "transaction-support"].includes(s.slug)) || []
    },
    {
      title: "Дизайн и ремонт",
      description: "Создание и реализация дизайн-проектов",
      services: services?.filter(s => ["design-project", "renovation", "furniture-completing"].includes(s.slug)) || []
    },
    {
      title: "Строительство",
      description: "Полный цикл строительных работ",
      services: services?.filter(s => ["construction", "project-design", "engineering-systems", "landscape-design"].includes(s.slug)) || []
    },
    {
      title: "Земля и участки",
      description: "Работа с земельными участками",
      services: services?.filter(s => ["land-services", "land-selection"].includes(s.slug)) || []
    },
    {
      title: "Управление",
      description: "Управление и обслуживание недвижимости",
      services: services?.filter(s => ["property-management"].includes(s.slug)) || []
    }
  ];

  const advantages = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Комплексный подход",
      description: "Все услуги в одном месте - от поиска до заселения"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Высокое качество",
      description: "Работаем только с проверенными подрядчиками и материалами"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      title: "Гарантии",
      description: "Предоставляем гарантии на все виды выполненных работ"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-500 text-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Все услуги 
              <span className="text-yandex-yellow"> в одном месте</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Полный спектр услуг для работы с недвижимостью - от поиска и покупки до дизайна и управления
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Получить консультацию
              </Button>
              <Button variant="outline" className="border-white text-foreground hover:bg-white hover:text-purple-600 px-8 py-4 text-lg">
                Рассчитать стоимость
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-lg text-muted-foreground">
              Преимущества работы с нашей командой профессионалов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Наши услуги
            </h2>
            <p className="text-lg text-muted-foreground">
              Полный перечень услуг по категориям
            </p>
          </div>

          <div className="space-y-16">
            {serviceCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => {
                    // Handle basic services that don't come from API
                    if ('icon' in service) {
                      return (
                        <Card key={serviceIndex} className="hover:shadow-lg transition-shadow group">
                          <CardContent className="p-6">
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                                <i className={`${service.icon} text-accent text-xl`}></i>
                              </div>
                              <h4 className="text-lg font-semibold text-foreground">
                                {service.title}
                              </h4>
                            </div>
                            <p className="text-muted-foreground mb-4">
                              {service.description}
                            </p>
                            <Link href={service.slug === 'buy' ? '/buy' : service.slug === 'sell' ? '/sell' : '/rent'}>
                              <Button 
                                variant="outline" 
                                className="w-full border-accent-orange text-accent hover:bg-accent hover:text-foreground group-hover:bg-accent group-hover:text-foreground transition-colors"
                              >
                                Подробнее
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      );
                    }

                    // Handle services from API
                    return (
                      <Card key={service.id} className="hover:shadow-lg transition-shadow group">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                              <i className={`${service.icon} text-accent text-xl`}></i>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-foreground">
                                {service.title}
                              </h4>
                              {service.price && (
                                <Badge variant="secondary" className="mt-1">
                                  {service.price}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {service.description}
                          </p>

                          {service.features.length > 0 && (
                            <div className="mb-4">
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {service.features.slice(0, 2).map((feature, featureIndex) => (
                                  <li key={featureIndex} className="flex items-center">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <Link href={`/services/${service.slug}`}>
                            <Button 
                              variant="outline" 
                              className="w-full border-accent-orange text-accent hover:bg-accent hover:text-foreground group-hover:bg-accent group-hover:text-foreground transition-colors"
                            >
                              Подробнее
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Как мы работаем
            </h2>
            <p className="text-lg text-muted-foreground">
              Простой и понятный процесс сотрудничества
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  number: "01",
                  title: "Консультация",
                  description: "Обсуждаем ваши потребности и цели"
                },
                {
                  number: "02",
                  title: "Планирование",
                  description: "Составляем план работ и смету"
                },
                {
                  number: "03",
                  title: "Реализация",
                  description: "Выполняем работы согласно плану"
                },
                {
                  number: "04",
                  title: "Результат",
                  description: "Сдаем готовый объект с гарантией"
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent text-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Request */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-500 text-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Нужна помощь с выбором услуги?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Наши эксперты помогут определить, какие услуги вам нужны, и составят оптимальный план работ
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title="Получить консультацию по услугам"
              description="Расскажите о ваших задачах, и мы подберем подходящие решения"
              serviceType="Консультация по услугам"
            />
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Наши гарантии
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
                <div className="font-semibold text-foreground mb-1">
                  Качество работ
                </div>
                <div className="text-sm text-muted-foreground">
                  Гарантируем высокое качество
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">24/7</div>
                <div className="font-semibold text-foreground mb-1">
                  Поддержка
                </div>
                <div className="text-sm text-muted-foreground">
                  Круглосуточная поддержка
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-500 mb-2">2 года</div>
                <div className="font-semibold text-foreground mb-1">
                  Гарантия
                </div>
                <div className="text-sm text-muted-foreground">
                  На все виды работ
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-500 mb-2">0₽</div>
                <div className="font-semibold text-foreground mb-1">
                  Консультация
                </div>
                <div className="text-sm text-muted-foreground">
                  Бесплатная консультация
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
