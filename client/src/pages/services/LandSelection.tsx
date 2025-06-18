import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import { CheckCircle, MapPin, Car, Zap, Droplets, TreePine, Building, Search } from "lucide-react";

export default function LandSelection() {
  const selectionCriteria = [
    {
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      title: "Расположение",
      description: "Анализ транспортной доступности и инфраструктуры",
      details: ["Удаленность от города", "Качество дорог", "Общественный транспорт"]
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Коммуникации",
      description: "Проверка возможности подключения всех коммуникаций",
      details: ["Электричество", "Газ", "Водопровод и канализация"]
    },
    {
      icon: <TreePine className="w-8 h-8 text-green-500" />,
      title: "Экология",
      description: "Оценка экологической обстановки района",
      details: ["Качество воздуха", "Близость к лесу", "Отсутствие вредных производств"]
    },
    {
      icon: <Building className="w-8 h-8 text-purple-500" />,
      title: "Перспективы развития",
      description: "Анализ планов развития района",
      details: ["Планы застройки", "Инфраструктурные проекты", "Рост стоимости"]
    }
  ];

  const packages = [
    {
      title: "Базовый подбор",
      price: "25 000 ₽",
      description: "Подбор участков по основным критериям",
      features: [
        "Анализ 5-7 вариантов",
        "Базовая проверка документов",
        "Консультация по выбору",
        "Организация просмотра"
      ]
    },
    {
      title: "Расширенный",
      price: "50 000 ₽",
      description: "Детальный анализ с выездом на место",
      features: [
        "Анализ 10-15 вариантов",
        "Выезд на участки",
        "Проверка коммуникаций",
        "Анализ документов",
        "Отчет с рекомендациями"
      ],
      popular: true
    },
    {
      title: "Премиум",
      price: "100 000 ₽",
      description: "Полное сопровождение до покупки",
      features: [
        "Неограниченное количество вариантов",
        "Полная юридическая проверка",
        "Анализ инвестиционного потенциала",
        "Сопровождение сделки",
        "Помощь в получении кредита"
      ]
    }
  ];

  const benefits = [
    "Доступ к эксклюзивным предложениям",
    "Экономия времени на поиски",
    "Профессиональная оценка участков",
    "Защита от мошенничества",
    "Знание рынка и цен",
    "Помощь в переговорах с продавцом"
  ];

  const process = [
    {
      step: "01",
      title: "Анализ потребностей",
      description: "Определяем ваши требования к участку и бюджет"
    },
    {
      step: "02",
      title: "Поиск вариантов",
      description: "Подбираем участки из различных источников"
    },
    {
      step: "03",
      title: "Первичный отбор",
      description: "Фильтруем варианты по вашим критериям"
    },
    {
      step: "04",
      title: "Детальный анализ",
      description: "Проверяем документы и инфраструктуру"
    },
    {
      step: "05",
      title: "Выезд на участки",
      description: "Организуем просмотр лучших вариантов"
    },
    {
      step: "06",
      title: "Помощь в выборе",
      description: "Даем рекомендации по окончательному выбору"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Подбор 
              <span className="text-yandex-yellow"> участка</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Поможем найти идеальный земельный участок с учетом всех ваших требований и бюджета
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Найти участок
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg">
                Критерии подбора
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Criteria */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Критерии подбора участка
            </h2>
            <p className="text-lg text-text-secondary">
              На что мы обращаем внимание при выборе земельного участка
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {selectionCriteria.map((criteria, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {criteria.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3 text-center">
                    {criteria.title}
                  </h3>
                  <p className="text-text-secondary mb-4 text-center">
                    {criteria.description}
                  </p>
                  <div className="space-y-2">
                    {criteria.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-text-primary">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Пакеты услуг
            </h2>
            <p className="text-lg text-text-secondary">
              Выберите подходящий уровень сервиса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'border-emerald-500 border-2' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white">
                    Популярный
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-center">{pkg.title}</CardTitle>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-500">{pkg.price}</div>
                    <div className="text-sm text-text-secondary">{pkg.description}</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  <Button 
                    className={`w-full mt-6 ${pkg.popular 
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                      : 'border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    Выбрать пакет
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
              Как мы работаем
            </h2>
            <p className="text-lg text-text-secondary">
              Пошаговый процесс подбора идеального участка
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
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
                Преимущества нашего сервиса
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <span className="text-text-primary font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Истории успеха
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-emerald-500 mb-2">7 дней</div>
                <div className="text-text-primary font-semibold mb-2">
                  Средний срок подбора
                </div>
                <div className="text-sm text-text-secondary">
                  Находим подходящие варианты
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">98%</div>
                <div className="text-text-primary font-semibold mb-2">
                  Довольных клиентов
                </div>
                <div className="text-sm text-text-secondary">
                  Покупают выбранный участок
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-500 mb-2">300+</div>
                <div className="text-text-primary font-semibold mb-2">
                  Участков подобрано
                </div>
                <div className="text-sm text-text-secondary">
                  За последний год
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Найдем идеальный участок за 7 дней
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Опишите ваши требования к участку, и мы подберем лучшие варианты в кратчайшие сроки
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title="Заказать подбор участка"
              description="Расскажите о ваших требованиях и мы найдем идеальный вариант"
              serviceType="Подбор участка"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
