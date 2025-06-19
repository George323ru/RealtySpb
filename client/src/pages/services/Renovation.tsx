import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import { CheckCircle, Wrench, Paintbrush, Zap, Droplets, Shield, Clock } from "lucide-react";

export default function Renovation() {
  const services = [
    {
      icon: <Paintbrush className="w-8 h-8 text-blue-500" />,
      title: "Косметический ремонт",
      description: "Обновление интерьера без перепланировки",
      price: "от 4 000 ₽/м²"
    },
    {
      icon: <Wrench className="w-8 h-8 text-green-500" />,
      title: "Капитальный ремонт",
      description: "Полная реконструкция с заменой коммуникаций",
      price: "от 12 000 ₽/м²"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Электромонтажные работы",
      description: "Замена проводки и установка электрики",
      price: "от 2 500 ₽/м²"
    },
    {
      icon: <Droplets className="w-8 h-8 text-cyan-500" />,
      title: "Сантехнические работы",
      description: "Замена труб и установка сантехники",
      price: "от 3 000 ₽/м²"
    }
  ];

  const benefits = [
    "Собственная бригада сертифицированных мастеров",
    "Гарантия на все виды работ до 3 лет",
    "Фиксированная стоимость по договору",
    "Закупка материалов по оптовым ценам",
    "Соблюдение сроков выполнения работ",
    "Ежедневная уборка рабочего места"
  ];

  const process = [
    {
      step: "01",
      title: "Выезд на объект",
      description: "Бесплатный замер и оценка объема работ"
    },
    {
      step: "02",
      title: "Составление сметы",
      description: "Детальный расчет стоимости материалов и работ"
    },
    {
      step: "03",
      title: "Заключение договора",
      description: "Фиксируем сроки, стоимость и гарантии"
    },
    {
      step: "04",
      title: "Закупка материалов",
      description: "Приобретаем качественные материалы"
    },
    {
      step: "05",
      title: "Выполнение работ",
      description: "Ремонт с ежедневным контролем качества"
    },
    {
      step: "06",
      title: "Сдача объекта",
      description: "Приемка работ и оформление гарантии"
    }
  ];

  const renovationTypes = [
    {
      title: "Квартиры",
      description: "Ремонт квартир любой площади и планировки",
      features: ["Студии и однокомнатные", "Многокомнатные квартиры", "Элитное жилье"],
      price: "от 4 000 ₽/м²"
    },
    {
      title: "Загородные дома",
      description: "Ремонт и отделка частных домов",
      features: ["Деревянные дома", "Кирпичные дома", "Коттеджи"],
      price: "от 6 000 ₽/м²"
    },
    {
      title: "Коммерческие помещения",
      description: "Ремонт офисов, магазинов, ресторанов",
      features: ["Офисы", "Торговые помещения", "Рестораны и кафе"],
      price: "от 5 000 ₽/м²"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-text-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Ремонт 
              <span className="text-yandex-yellow"> под ключ</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Качественный ремонт квартир, домов и коммерческих помещений с гарантией до 3 лет
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Рассчитать стоимость
              </Button>
              <Button variant="outline" className="border-white text-text-primary hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
                Портфолио работ
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
              Виды ремонтных работ
            </h2>
            <p className="text-lg text-text-secondary">
              Полный спектр услуг по ремонту и отделке
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
                  <Badge className="bg-green-500 text-text-primary">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Renovation Types */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Ремонт любых объектов
            </h2>
            <p className="text-lg text-text-secondary">
              Специализируемся на ремонте различных типов недвижимости
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {renovationTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <Badge className="bg-green-500 text-text-primary w-fit">
                    {type.price}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-text-secondary">{type.description}</p>
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-text-primary">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-green-500 text-text-primary hover:bg-green-600">
                    Заказать ремонт
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
              Этапы работы
            </h2>
            <p className="text-lg text-text-secondary">
              Как проходит процесс ремонта от заявки до сдачи объекта
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-green-500 text-text-primary rounded-full flex items-center justify-center font-bold text-lg mr-6">
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
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
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
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Гарантия 3 года
                </h3>
                <p className="text-text-secondary">
                  На все виды выполненных работ
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Точные сроки
                </h3>
                <p className="text-text-secondary">
                  Выполняем работы в договорные сроки
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
                  Стоимость не изменится в процессе работ
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-500 text-text-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Готовы начать ремонт?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Получите бесплатный расчет стоимости ремонта и консультацию наших специалистов
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title="Заказать ремонт под ключ"
              description="Оставьте заявку и мы составим смету для вашего объекта"
              serviceType="Ремонт"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
