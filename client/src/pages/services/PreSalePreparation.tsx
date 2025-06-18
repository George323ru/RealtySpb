import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import { CheckCircle, Camera, Paintbrush, Wrench, TrendingUp, Clock, Euro } from "lucide-react";

export default function PreSalePreparation() {
  const services = [
    {
      icon: <Camera className="w-8 h-8 text-blue-500" />,
      title: "Профессиональная фотосъемка",
      description: "Качественные фото для привлекательных объявлений",
      price: "от 15 000 ₽"
    },
    {
      icon: <Paintbrush className="w-8 h-8 text-green-500" />,
      title: "Косметический ремонт",
      description: "Устранение дефектов и освежение интерьера",
      price: "от 2 500 ₽/м²"
    },
    {
      icon: <Wrench className="w-8 h-8 text-purple-500" />,
      title: "Мелкий ремонт",
      description: "Устранение мелких недостатков и поломок",
      price: "от 5 000 ₽"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: "Стейджинг",
      description: "Расстановка мебели и декора для показов",
      price: "от 25 000 ₽"
    }
  ];

  const benefits = [
    "Увеличение стоимости недвижимости на 15-20%",
    "Сокращение времени продажи в 2-3 раза",
    "Привлечение большего количества покупателей",
    "Улучшение первого впечатления от объекта",
    "Профессиональная презентация недвижимости",
    "Выделение среди конкурентов на рынке"
  ];

  const process = [
    {
      step: "01",
      title: "Анализ объекта",
      description: "Осматриваем недвижимость и определяем объем работ"
    },
    {
      step: "02",
      title: "Составление плана",
      description: "Разрабатываем план подготовки с учетом бюджета"
    },
    {
      step: "03",
      title: "Выполнение работ",
      description: "Проводим все необходимые работы по подготовке"
    },
    {
      step: "04",
      title: "Фотосъемка",
      description: "Делаем профессиональные фото готового объекта"
    },
    {
      step: "05",
      title: "Размещение",
      description: "Размещаем привлекательные объявления на площадках"
    }
  ];

  const beforeAfter = [
    {
      title: "Без подготовки",
      points: ["Среднее время продажи: 6-8 месяцев", "Торг до 15% от цены", "Мало просмотров объявления"],
      color: "bg-red-50 border-red-200"
    },
    {
      title: "С подготовкой",
      points: ["Среднее время продажи: 2-3 месяца", "Торг до 5% от цены", "Высокий интерес покупателей"],
      color: "bg-green-50 border-green-200"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Предпродажная 
              <span className="text-yandex-yellow"> подготовка</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Увеличим стоимость вашей недвижимости на 15-20% и сократим время продажи в 2-3 раза
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Получить оценку
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                Примеры работ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Разница очевидна
            </h2>
            <p className="text-lg text-text-secondary">
              Сравните результаты продажи с подготовкой и без неё
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {beforeAfter.map((comparison, index) => (
              <Card key={index} className={`${comparison.color} border-2`}>
                <CardHeader>
                  <CardTitle className="text-xl text-center">
                    {comparison.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {comparison.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                      <span className="text-text-primary">{point}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="inline-block">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  Увеличение прибыли
                </h3>
                <div className="text-4xl font-bold text-green-500 mb-2">
                  +2-3 млн ₽
                </div>
                <p className="text-text-secondary">
                  Средняя дополнительная прибыль от продажи 3-комнатной квартиры после подготовки
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Что включает подготовка
            </h2>
            <p className="text-lg text-text-secondary">
              Комплекс услуг для максимального повышения привлекательности объекта
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
                  <Badge className="bg-accent-orange text-white">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Преимущества подготовки
              </h2>
              <p className="text-lg text-text-secondary">
                Почему стоит инвестировать в предпродажную подготовку
              </p>
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

      {/* Process */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Этапы работы
            </h2>
            <p className="text-lg text-text-secondary">
              Как проходит процесс предпродажной подготовки
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-accent-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
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

      {/* Price Calculator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Стоимость услуг
              </h2>
              <p className="text-lg text-text-secondary">
                Прозрачное ценообразование без скрытых платежей
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Базовый</CardTitle>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-orange">от 50 000 ₽</div>
                    <div className="text-sm text-text-secondary">для 1-2 комнатных</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Профессиональная фотосъемка</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Мелкий ремонт</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Уборка</span>
                  </div>
                  <Button className="w-full mt-6 bg-accent-orange text-white hover:bg-orange-600">
                    Выбрать
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-accent-orange border-2 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-orange text-white">
                  Популярный
                </Badge>
                <CardHeader>
                  <CardTitle className="text-center">Стандартный</CardTitle>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-orange">от 120 000 ₽</div>
                    <div className="text-sm text-text-secondary">для 3-4 комнатных</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Все из базового пакета</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Косметический ремонт</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Базовый стейджинг</span>
                  </div>
                  <Button className="w-full mt-6 bg-accent-orange text-white hover:bg-orange-600">
                    Выбрать
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Премиум</CardTitle>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-orange">от 250 000 ₽</div>
                    <div className="text-sm text-text-secondary">любая площадь</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Все из стандартного</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Полный стейджинг</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">3D-тур</span>
                  </div>
                  <Button className="w-full mt-6 bg-accent-orange text-white hover:bg-orange-600">
                    Выбрать
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Готовы увеличить стоимость недвижимости?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Получите бесплатную консультацию и узнайте, сколько можно дополнительно получить от продажи
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title="Получить консультацию по подготовке"
              description="Оценим ваш объект и составим план подготовки"
              serviceType="Предпродажная подготовка"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
