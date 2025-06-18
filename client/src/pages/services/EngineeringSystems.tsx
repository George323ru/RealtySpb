import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import { CheckCircle, Zap, Droplets, Wind, Flame, Wifi, Shield } from "lucide-react";

export default function EngineeringSystems() {
  const systems = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Электроснабжение",
      description: "Проектирование и монтаж электрических сетей",
      price: "от 3 500 ₽/м²",
      features: ["Силовые сети", "Освещение", "Слаботочные системы", "Автоматизация"]
    },
    {
      icon: <Droplets className="w-8 h-8 text-blue-500" />,
      title: "Водоснабжение и канализация",
      description: "Системы водоснабжения и водоотведения",
      price: "от 2 800 ₽/м²",
      features: ["Холодное водоснабжение", "Горячее водоснабжение", "Канализация", "Ливневка"]
    },
    {
      icon: <Wind className="w-8 h-8 text-green-500" />,
      title: "Вентиляция и кондиционирование",
      description: "Системы климат-контроля и воздухообмена",
      price: "от 4 200 ₽/м²",
      features: ["Приточная вентиляция", "Вытяжная вентиляция", "Кондиционирование", "Рекуперация"]
    },
    {
      icon: <Flame className="w-8 h-8 text-red-500" />,
      title: "Отопление",
      description: "Системы теплоснабжения и отопления",
      price: "от 3 200 ₽/м²",
      features: ["Радиаторное отопление", "Теплый пол", "Котельные", "Тепловые пункты"]
    },
    {
      icon: <Wifi className="w-8 h-8 text-purple-500" />,
      title: "Слаботочные системы",
      description: "Телекоммуникации и автоматизация",
      price: "от 1 800 ₽/м²",
      features: ["Интернет и телефония", "Видеонаблюдение", "Контроль доступа", "Умный дом"]
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "Пожарная безопасность",
      description: "Системы противопожарной защиты",
      price: "от 2 500 ₽/м²",
      features: ["Пожарная сигнализация", "Система оповещения", "Автоматическое пожаротушение", "Дымоудаление"]
    }
  ];

  const benefits = [
    "Лицензированные специалисты",
    "Соблюдение всех норм и стандартов",
    "Гарантия на работы до 5 лет",
    "Использование качественного оборудования",
    "Комплексное проектирование всех систем",
    "Сервисное обслуживание после монтажа"
  ];

  const process = [
    {
      step: "01",
      title: "Техническое задание",
      description: "Определяем требования к инженерным системам"
    },
    {
      step: "02",
      title: "Проектирование",
      description: "Создаем проекты всех инженерных систем"
    },
    {
      step: "03",
      title: "Согласование",
      description: "Получаем разрешения в контролирующих органах"
    },
    {
      step: "04",
      title: "Закупка оборудования",
      description: "Приобретаем качественные материалы и оборудование"
    },
    {
      step: "05",
      title: "Монтаж систем",
      description: "Выполняем установку всех инженерных систем"
    },
    {
      step: "06",
      title: "Пуско-наладка",
      description: "Настраиваем и тестируем работу систем"
    },
    {
      step: "07",
      title: "Сдача в эксплуатацию",
      description: "Оформляем документы и запускаем системы"
    }
  ];

  const objectTypes = [
    {
      title: "Жилые здания",
      description: "Частные дома, квартиры, коттеджи",
      features: ["Комфортный микроклимат", "Энергоэффективность", "Безопасность", "Автоматизация"],
      complexity: "Стандартная"
    },
    {
      title: "Коммерческие объекты",
      description: "Офисы, торговые центры, гостиницы",
      features: ["Высокая надежность", "Масштабируемость", "Энергосбережение", "Удаленный контроль"],
      complexity: "Повышенная"
    },
    {
      title: "Промышленные объекты",
      description: "Заводы, склады, производственные здания",
      features: ["Промышленные стандарты", "Высокие нагрузки", "Специальные требования", "Автоматизация"],
      complexity: "Высокая"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Инженерные 
              <span className="text-yandex-yellow"> системы</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Проектирование и монтаж всех инженерных коммуникаций для комфорта и безопасности
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Заказать проект
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-4 text-lg">
                Примеры работ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Systems */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Инженерные системы
            </h2>
            <p className="text-lg text-text-secondary">
              Полный комплекс инженерных коммуникаций
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((system, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {system.icon}
                    <CardTitle className="text-lg">{system.title}</CardTitle>
                  </div>
                  <Badge className="bg-cyan-500 text-white w-fit">
                    {system.price}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-text-secondary">{system.description}</p>
                  <div className="space-y-2">
                    {system.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-500" />
                        <span className="text-sm text-text-primary">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-cyan-500 text-white hover:bg-cyan-600">
                    Узнать подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Object Types */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Типы объектов
            </h2>
            <p className="text-lg text-text-secondary">
              Проектируем инженерные системы для любых зданий
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {objectTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <Badge variant="outline">{type.complexity} сложность</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-text-secondary">{type.description}</p>
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-500" />
                        <span className="text-sm text-text-primary">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-cyan-500 text-white hover:bg-cyan-600">
                    Заказать проект
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
              От проекта до запуска систем в эксплуатацию
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
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
                  <CheckCircle className="w-6 h-6 text-cyan-500 flex-shrink-0" />
                  <span className="text-text-primary font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Современные технологии
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <Wifi className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  IoT технологии
                </h3>
                <p className="text-sm text-text-secondary">
                  Интернет вещей для умного управления
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Wind className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Энергосбережение
                </h3>
                <p className="text-sm text-text-secondary">
                  Современные энергоэффективные решения
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Безопасность
                </h3>
                <p className="text-sm text-text-secondary">
                  Комплексные системы защиты
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Автоматизация
                </h3>
                <p className="text-sm text-text-secondary">
                  Полная автоматизация систем
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Нужны инженерные системы?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Получите бесплатную консультацию инженера и расчет стоимости систем для вашего объекта
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title="Заказать инженерные системы"
              description="Опишите ваш объект и требования к системам"
              serviceType="Инженерные системы"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
