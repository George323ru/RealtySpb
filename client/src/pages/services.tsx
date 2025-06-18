import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { Service } from "@shared/schema";

export default function Services() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const serviceCategories = [
    {
      title: "Предпродажная подготовка",
      description: "Подготовим недвижимость к продаже для получения максимальной стоимости",
      icon: "🔨",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Дизайн и ремонт",
      description: "Создание современного дизайна и качественный ремонт любой сложности",
      icon: "🎨",
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Строительство",
      description: "Полный цикл строительных работ от проекта до сдачи объекта",
      icon: "🏗️",
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Юридические услуги",
      description: "Полное правовое сопровождение сделок с недвижимостью",
      icon: "⚖️",
      color: "bg-orange-50 border-orange-200"
    }
  ];

  const allServices = [
    {
      name: "Предпродажная подготовка",
      description: "Комплексная подготовка объекта к продаже для получения максимальной стоимости",
      price: "от 50 000 ₽",
      features: ["Анализ состояния объекта", "План улучшений", "Косметические работы", "Профессиональная фотосъемка"],
      icon: "🔨"
    },
    {
      name: "Дизайн-проект",
      description: "Создание уникального дизайна интерьера с учетом ваших потребностей",
      price: "от 3 000 ₽/м²",
      features: ["3D визуализация", "Планировочные решения", "Подбор материалов", "Авторский надзор"],
      icon: "🎨"
    },
    {
      name: "Ремонт под ключ",
      description: "Качественный ремонт любой сложности с гарантией",
      price: "от 15 000 ₽/м²",
      features: ["Черновые работы", "Чистовая отделка", "Сантехника и электрика", "Уборка после ремонта"],
      icon: "🔧"
    },
    {
      name: "Земля",
      description: "Комплексные услуги по работе с земельными участками: подбор, оформление, проверка документов",
      price: "от 50 000 ₽",
      features: ["Подбор участков", "Межевание", "Оформление документов", "Смена категории земли", "Разрешения на строительство", "Проверка документов"],
      icon: "🌱"
    },
    {
      name: "Строительство домов",
      description: "Строительство частных домов и коттеджей под ключ",
      price: "от 35 000 ₽/м²",
      features: ["Проектирование", "Фундамент и коробка", "Инженерные системы", "Внутренняя отделка"],
      icon: "🏠"
    },
    {
      name: "Проектирование",
      description: "Архитектурное и конструктивное проектирование",
      price: "от 1 500 ₽/м²",
      features: ["Архитектурный проект", "Конструктивный раздел", "Инженерные разделы", "Согласование"],
      icon: "📐"
    },
    {
      name: "Инженерные системы",
      description: "Проектирование и монтаж всех инженерных коммуникаций",
      price: "от 2 000 ₽/м²",
      features: ["Электроснабжение", "Водоснабжение", "Отопление", "Вентиляция"],
      icon: "⚙️"
    },
    {
      name: "Ландшафтный дизайн",
      description: "Благоустройство территории и ландшафтное проектирование",
      price: "от 500 ₽/м²",
      features: ["Проект благоустройства", "Озеленение", "Дорожки и площадки", "Системы полива"],
      icon: "🌿"
    },
    {
      name: "Юридическая проверка",
      description: "Полная правовая экспертиза объектов недвижимости",
      price: "от 25 000 ₽",
      features: ["Проверка документов", "Анализ обременений", "Выявление рисков", "Юридическое заключение"],
      icon: "🔍"
    },
    {
      name: "Сопровождение сделки",
      description: "Полное сопровождение от предварительного договора до регистрации",
      price: "от 50 000 ₽",
      features: ["Подготовка документов", "Проведение расчетов", "Регистрация сделки", "Послепродажная поддержка"],
      icon: "🤝"
    },
    {
      name: "Управление недвижимостью",
      description: "Профессиональное управление коммерческой недвижимостью",
      price: "от 5% с оборота",
      features: ["Поиск арендаторов", "Управление договорами", "Техническое обслуживание", "Финансовая отчетность"],
      icon: "📊"
    },
    {
      name: "Комплектация мебелью",
      description: "Подбор и расстановка мебели под готовый интерьер",
      price: "от 50 000 ₽",
      features: ["Подбор мебели", "Доставка и сборка", "Расстановка", "Декорирование"],
      icon: "🛋️"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 to-blue-800 py-20">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Дополнительные{" "}
              <span className="text-yandex-yellow">услуги</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90">
              Полный спектр услуг для работы с недвижимостью — от дизайна до юридического сопровождения
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-yandex-yellow mb-2">13</div>
                <div className="text-sm">Видов услуг</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-yandex-yellow mb-2">500+</div>
                <div className="text-sm">Завершенных проектов</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-yandex-yellow mb-2">24/7</div>
                <div className="text-sm">Поддержка клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Основные направления
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Выберите категорию услуг, которая вас интересует
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceCategories.map((category, index) => (
                <Card key={index} className={`${category.color} hover:shadow-lg transition-all duration-300 cursor-pointer h-full`}>
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      {category.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4 flex-1">
                      {category.description}
                    </p>
                    <Button variant="ghost" className="text-accent-orange font-medium mt-auto">
                      Подробнее →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Все наши услуги
              </h2>
              <p className="text-lg text-text-secondary">
                Комплексные решения для всех ваших потребностей в области недвижимости
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-3xl">{service.icon}</div>
                      <Badge variant="outline" className="text-accent-orange border-accent-orange">
                        {service.price}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-text-secondary mb-4 text-sm">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-accent-orange hover:bg-orange-600 text-white">
                      Заказать услугу
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Как мы работаем
              </h2>
              <p className="text-lg text-text-secondary">
                Простой и понятный процесс оказания услуг
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Консультация",
                  description: "Обсуждаем ваши потребности и подбираем оптимальное решение"
                },
                {
                  step: "02",
                  title: "Планирование",
                  description: "Составляем детальный план работ и смету проекта"
                },
                {
                  step: "03",
                  title: "Выполнение",
                  description: "Реализуем проект с контролем качества на каждом этапе"
                },
                {
                  step: "04",
                  title: "Результат",
                  description: "Сдаем готовый результат с гарантией качества"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent-orange text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Нужна консультация по услугам?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Наши специалисты помогут выбрать оптимальное решение для ваших задач
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-indigo-600 hover:bg-neutral-100 px-8 py-3 text-lg font-semibold">
                Получить консультацию
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 text-lg font-semibold"
              >
                Рассчитать стоимость
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
