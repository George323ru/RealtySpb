import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import { CheckCircle, Building2, Home, Factory, Hammer, Shield, Clock } from "lucide-react";

export default function Construction() {
  const services = [
    {
      icon: <Home className="w-8 h-8 text-blue-500" />,
      title: "Загородные дома",
      description: "Строительство частных домов и коттеджей",
      price: "от 35 000 ₽/м²"
    },
    {
      icon: <Building2 className="w-8 h-8 text-green-500" />,
      title: "Многоквартирные дома",
      description: "Жилые комплексы и многоэтажные здания",
      price: "от 45 000 ₽/м²"
    },
    {
      icon: <Factory className="w-8 h-8 text-purple-500" />,
      title: "Коммерческие объекты",
      description: "Офисы, торговые центры, склады",
      price: "от 25 000 ₽/м²"
    },
    {
      icon: <Hammer className="w-8 h-8 text-orange-500" />,
      title: "Реконструкция",
      description: "Модернизация существующих зданий",
      price: "от 20 000 ₽/м²"
    }
  ];

  const constructionTypes = [
    {
      title: "Каркасные дома",
      description: "Быстрое и экономичное строительство",
      features: ["Короткие сроки", "Доступная цена", "Энергоэффективность", "Экологичность"],
      timeline: "3-4 месяца",
      price: "от 25 000 ₽/м²"
    },
    {
      title: "Кирпичные дома",
      description: "Традиционное надежное строительство",
      features: ["Долговечность", "Отличная теплоизоляция", "Престижность", "Высокая прочность"],
      timeline: "6-8 месяцев",
      price: "от 40 000 ₽/м²"
    },
    {
      title: "Дома из газобетона",
      description: "Современная технология строительства",
      features: ["Хорошая теплоизоляция", "Небольшой вес", "Простота обработки", "Огнестойкость"],
      timeline: "4-6 месяцев",
      price: "от 30 000 ₽/м²"
    }
  ];

  const benefits = [
    "Собственная строительная бригада",
    "Гарантия на строительство 5 лет",
    "Фиксированная стоимость по договору",
    "Контроль качества на каждом этапе",
    "Использование сертифицированных материалов",
    "Соблюдение всех строительных норм"
  ];

  const process = [
    {
      step: "01",
      title: "Проектирование",
      description: "Создание архитектурного и конструктивного проекта"
    },
    {
      step: "02",
      title: "Получение разрешений",
      description: "Оформление всех необходимых документов"
    },
    {
      step: "03",
      title: "Подготовка участка",
      description: "Земляные работы и устройство фундамента"
    },
    {
      step: "04",
      title: "Возведение конструкций",
      description: "Строительство стен, перекрытий, кровли"
    },
    {
      step: "05",
      title: "Инженерные системы",
      description: "Монтаж коммуникаций и инженерного оборудования"
    },
    {
      step: "06",
      title: "Отделочные работы",
      description: "Внутренняя и внешняя отделка здания"
    },
    {
      step: "07",
      title: "Ввод в эксплуатацию",
      description: "Получение разрешения на ввод в эксплуатацию"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Строительство 
              <span className="text-yandex-yellow"> под ключ</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Полный цикл строительных работ от проекта до сдачи объекта с гарантией качества
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Рассчитать стоимость
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 text-lg">
                Портфолио объектов
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Виды строительных работ
            </h2>
            <p className="text-lg text-text-secondary">
              Строим объекты любой сложности и назначения
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {service.description}
                  </p>
                  <Badge className="bg-blue-500 text-white">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Types */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Технологии строительства
            </h2>
            <p className="text-lg text-text-secondary">
              Выберите подходящую технологию для вашего проекта
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {constructionTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">{type.timeline}</Badge>
                    <Badge className="bg-blue-500 text-white">{type.price}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-text-secondary">{type.description}</p>
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-text-primary">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                    Узнать подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Этапы строительства
            </h2>
            <p className="text-lg text-text-secondary">
              Пошаговый процесс от проекта до готового объекта
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                  {item.step}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Наши преимущества
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span className="text-text-primary font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Гарантии качества
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Гарантия 5 лет
                </h3>
                <p className="text-text-secondary">
                  На все строительные работы
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Точные сроки
                </h3>
                <p className="text-text-secondary">
                  Строго соблюдаем график работ
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <CheckCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Фиксированная цена
                </h3>
                <p className="text-text-secondary">
                  Стоимость не изменится
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Stats */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Наши результаты
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">150+</div>
                <div className="text-text-primary font-semibold">Построенных объектов</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
                <div className="text-text-primary font-semibold">Сданных в срок</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-500 mb-2">10</div>
                <div className="text-text-primary font-semibold">Лет на рынке</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-500 mb-2">98%</div>
                <div className="text-text-primary font-semibold">Довольных клиентов</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Готовы начать строительство?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Получите бесплатную консультацию и расчет стоимости вашего проекта
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title="Заказать строительство"
              description="Расскажите о вашем проекте и мы рассчитаем стоимость"
              serviceType="Строительство"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
