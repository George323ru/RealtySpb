import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import { CheckCircle, Ruler, Building, FileText, Calculator, Compass, Layers } from "lucide-react";

export default function ProjectDesign() {
  const services = [
    {
      icon: <Building className="w-8 h-8 text-blue-500" />,
      title: "Архитектурный проект",
      description: "Планировочные и объемно-пространственные решения",
      price: "от 800 ₽/м²"
    },
    {
      icon: <Layers className="w-8 h-8 text-green-500" />,
      title: "Конструктивный проект",
      description: "Расчет и проектирование несущих конструкций",
      price: "от 600 ₽/м²"
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      title: "Инженерные разделы",
      description: "Проектирование всех инженерных систем",
      price: "от 400 ₽/м²"
    },
    {
      icon: <Calculator className="w-8 h-8 text-orange-500" />,
      title: "Рабочая документация",
      description: "Детальные чертежи для строительства",
      price: "от 300 ₽/м²"
    }
  ];

  const projectTypes = [
    {
      title: "Жилые дома",
      description: "Проектирование частных домов и коттеджей",
      features: ["Индивидуальные решения", "Энергоэффективность", "Современные материалы", "Ландшафтная интеграция"],
      complexity: "Средняя сложность",
      timeline: "30-45 дней"
    },
    {
      title: "Многоквартирные дома",
      description: "Жилые комплексы и многоэтажные здания",
      features: ["Оптимизация планировок", "Соблюдение норм", "Экономическая эффективность", "Современная архитектура"],
      complexity: "Высокая сложность",
      timeline: "60-90 дней"
    },
    {
      title: "Коммерческие здания",
      description: "Офисы, торговые центры, производственные здания",
      features: ["Функциональность", "Технологичность", "Безопасность", "Инвестиционная привлекательность"],
      complexity: "Высокая сложность",
      timeline: "45-60 дней"
    }
  ];

  const benefits = [
    "Команда опытных архитекторов и инженеров",
    "Соблюдение всех строительных норм и правил",
    "Современные программы проектирования",
    "Экспертиза в государственных органах",
    "Сопровождение на всех этапах",
    "Авторский надзор при строительстве"
  ];

  const process = [
    {
      step: "01",
      title: "Техническое задание",
      description: "Определяем требования к проекту и участку"
    },
    {
      step: "02",
      title: "Эскизный проект",
      description: "Создаем концептуальные решения"
    },
    {
      step: "03",
      title: "Проект для экспертизы",
      description: "Разрабатываем проект для получения разрешений"
    },
    {
      step: "04",
      title: "Рабочая документация",
      description: "Готовим детальные чертежи для строительства"
    },
    {
      step: "05",
      title: "Прохождение экспертизы",
      description: "Получаем положительное заключение"
    },
    {
      step: "06",
      title: "Авторский надзор",
      description: "Контролируем соответствие проекту при строительстве"
    }
  ];

  const packages = [
    {
      title: "Эскизный проект",
      price: "500 ₽/м²",
      description: "Концептуальные решения",
      features: [
        "Поэтажные планы",
        "Фасады здания",
        "Разрезы",
        "Схема участка",
        "Пояснительная записка"
      ]
    },
    {
      title: "Проект для строительства",
      price: "1 200 ₽/м²",
      description: "Полная проектная документация",
      features: [
        "Архитектурные решения",
        "Конструктивные решения",
        "Инженерные системы",
        "Спецификации материалов",
        "Смета на строительство"
      ],
      popular: true
    },
    {
      title: "Рабочая документация",
      price: "800 ₽/м²",
      description: "Детальные чертежи",
      features: [
        "Рабочие чертежи",
        "Узлы и детали",
        "Спецификации",
        "Ведомости объемов",
        "Технические решения"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Проектирование 
              <span className="text-yandex-yellow"> зданий</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Профессиональное архитектурное и конструктивное проектирование объектов любой сложности
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Заказать проект
              </Button>
              <Button variant="outline" className="border-white text-foreground hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg">
                Портфолио проектов
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Виды проектных работ
            </h2>
            <p className="text-lg text-muted-foreground">
              Полный комплекс проектных услуг
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <Badge className="bg-indigo-500 text-foreground">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Типы проектируемых объектов
            </h2>
            <p className="text-lg text-muted-foreground">
              Специализируемся на проектировании различных типов зданий
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">{type.complexity}</Badge>
                    <Badge className="bg-indigo-500 text-foreground">{type.timeline}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{type.description}</p>
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-indigo-500 text-foreground hover:bg-indigo-600">
                    Заказать проект
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Стадии проектирования
            </h2>
            <p className="text-lg text-muted-foreground">
              Выберите необходимую стадию проекта
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'border-indigo-500 border-2' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-foreground">
                    Популярный
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-center">{pkg.title}</CardTitle>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-500">{pkg.price}</div>
                    <div className="text-sm text-muted-foreground">{pkg.description}</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  <Button 
                    className={`w-full mt-6 ${pkg.popular 
                      ? 'bg-indigo-500 text-foreground hover:bg-indigo-600' 
                      : 'border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-foreground'
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Этапы проектирования
            </h2>
            <p className="text-lg text-muted-foreground">
              Пошаговый процесс создания проекта
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-indigo-500 text-foreground rounded-full flex items-center justify-center font-bold text-lg mr-6">
                  {item.step}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Наши преимущества
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-indigo-500 flex-shrink-0" />
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Stats */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Наш опыт
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-indigo-500 mb-2">200+</div>
                <div className="text-foreground font-semibold">Проектов выполнено</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
                <div className="text-foreground font-semibold">Прошли экспертизу</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-500 mb-2">12</div>
                <div className="text-foreground font-semibold">Лет опыта</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
                <div className="text-foreground font-semibold">Архитекторов в команде</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-500 text-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Готовы начать проектирование?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Получите бесплатную консультацию архитектора и предварительный расчет стоимости проекта
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title="Заказать проект"
              description="Расскажите о вашем объекте и мы рассчитаем стоимость проектирования"
              serviceType="Проектирование"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
