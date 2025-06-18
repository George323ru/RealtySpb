import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadForm from "@/components/LeadForm";
import { CheckCircle, Palette, Home, Lightbulb, Monitor, Clock, Star } from "lucide-react";

export default function DesignProject() {
  const services = [
    {
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      title: "Дизайн-проект интерьера",
      description: "Полный дизайн-проект с 3D визуализацией",
      price: "от 2 500 ₽/м²"
    },
    {
      icon: <Home className="w-8 h-8 text-blue-500" />,
      title: "Перепланировка",
      description: "Проектирование новой планировки",
      price: "от 1 500 ₽/м²"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: "Светодизайн",
      description: "Проект освещения с расчетами",
      price: "от 800 ₽/м²"
    },
    {
      icon: <Monitor className="w-8 h-8 text-green-500" />,
      title: "3D визуализация",
      description: "Фотореалистичные изображения интерьера",
      price: "от 15 000 ₽/комната"
    }
  ];

  const benefits = [
    "Экономия времени и средств на этапе ремонта",
    "Избежание ошибок и переделок",
    "Точный расчет количества материалов",
    "Оптимальное использование пространства",
    "Создание уникального стиля",
    "Увеличение стоимости недвижимости"
  ];

  const process = [
    {
      step: "01",
      title: "Техническое задание",
      description: "Обсуждаем ваши пожелания, бюджет и сроки"
    },
    {
      step: "02",
      title: "Обмеры и планировка",
      description: "Делаем точные замеры и создаем планировку"
    },
    {
      step: "03",
      title: "Концепция дизайна",
      description: "Разрабатываем стилистическое решение"
    },
    {
      step: "04",
      title: "3D визуализация",
      description: "Создаем фотореалистичные изображения"
    },
    {
      step: "05",
      title: "Рабочие чертежи",
      description: "Готовим техническую документацию"
    },
    {
      step: "06",
      title: "Авторский надзор",
      description: "Контролируем реализацию проекта"
    }
  ];

  const portfolioCategories = [
    { title: "Квартиры", count: "150+ проектов", style: "Современный, классический, лофт" },
    { title: "Загородные дома", count: "80+ проектов", style: "Скандинавский, прованс, кантри" },
    { title: "Коммерческие помещения", count: "45+ проектов", style: "Офисы, рестораны, магазины" },
    { title: "Элитная недвижимость", count: "25+ проектов", style: "Премиум, арт-деко, неоклассика" }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Дизайн-проект 
              <span className="text-yandex-yellow"> интерьера</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Создаем уникальные интерьеры с 3D визуализацией и полным комплектом рабочих чертежей
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Заказать дизайн-проект
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg">
                Посмотреть портфолио
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
              Что включает дизайн-проект
            </h2>
            <p className="text-lg text-text-secondary">
              Полный комплекс услуг по созданию интерьера
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
                  <Badge className="bg-purple-500 text-white">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Наше портфолио
            </h2>
            <p className="text-lg text-text-secondary">
              Более 300 реализованных проектов в различных стилях
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {category.title}
                  </h3>
                  <div className="text-purple-500 font-medium mb-2">
                    {category.count}
                  </div>
                  <p className="text-sm text-text-secondary">
                    {category.style}
                  </p>
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
              Этапы создания дизайн-проекта
            </h2>
            <p className="text-lg text-text-secondary">
              Пошаговый процесс от идеи до реализации
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
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
                Преимущества работы с нами
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

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Стоимость дизайн-проекта
            </h2>
            <p className="text-lg text-text-secondary">
              Прозрачные цены на все виды услуг
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Эскизный проект</CardTitle>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-500">1 500 ₽/м²</div>
                  <div className="text-sm text-text-secondary">базовые решения</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Планировочные решения</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Стилистическая концепция</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Подбор материалов</span>
                </div>
                <Button className="w-full mt-6 bg-purple-500 text-white hover:bg-purple-600">
                  Заказать
                </Button>
              </CardContent>
            </Card>

            <Card className="border-purple-500 border-2 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white">
                Популярный
              </Badge>
              <CardHeader>
                <CardTitle className="text-center">Рабочий проект</CardTitle>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-500">2 500 ₽/м²</div>
                  <div className="text-sm text-text-secondary">полная документация</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Все из эскизного проекта</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Рабочие чертежи</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">3D визуализация</span>
                </div>
                <Button className="w-full mt-6 bg-purple-500 text-white hover:bg-purple-600">
                  Заказать
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Авторский надзор</CardTitle>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-500">500 ₽/м²</div>
                  <div className="text-sm text-text-secondary">контроль реализации</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Контроль качества работ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Консультации подрядчиков</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Корректировки проекта</span>
                </div>
                <Button className="w-full mt-6 bg-purple-500 text-white hover:bg-purple-600">
                  Заказать
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Готовы создать дом мечты?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Получите бесплатную консультацию дизайнера и узнайте стоимость проекта для вашего интерьера
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title="Заказать дизайн-проект"
              description="Расскажите о ваших пожеланиях, и мы создадим уникальный проект"
              serviceType="Дизайн-проект"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
