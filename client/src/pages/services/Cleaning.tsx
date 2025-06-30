import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import { CheckCircle, Sparkles, Wind, SprayCan, Trash2 } from "lucide-react";

export default function Cleaning() {
  const services = [
    {
      icon: <Sparkles className="w-8 h-8 text-blue-500" />,
      title: "Генеральная уборка",
      description: "Комплексная уборка всех помещений",
      price: "от 5 000 ₽"
    },
    {
      icon: <Trash2 className="w-8 h-8 text-green-500" />,
      title: "Уборка после ремонта",
      description: "Удаление строительной пыли и грязи",
      price: "от 8 000 ₽"
    },
    {
      icon: <Wind className="w-8 h-8 text-purple-500" />,
      title: "Поддерживающая уборка",
      description: "Регулярная уборка для поддержания чистоты",
      price: "от 2 500 ₽"
    },
    {
      icon: <SprayCan className="w-8 h-8 text-orange-500" />,
      title: "Химчистка мебели",
      description: "Глубокая чистка мягкой мебели и ковров",
      price: "от 1 500 ₽"
    }
  ];

  const benefits = [
    "Используем профессиональную гипоаллергенную химию",
    "Гарантия сохранности вашего имущества",
    "Опытные и проверенные клинеры",
    "Фиксированная стоимость без доплат",
    "Приезжаем со всем необходимым оборудованием",
    "Работаем быстро и в удобное для вас время"
  ];

  const process = [
    {
      step: "01",
      title: "Заявка и консультация",
      description: "Вы оставляете заявку, мы уточняем детали и объем работ"
    },
    {
      step: "02",
      title: "Подбор оборудования и средств",
      description: "Подбираем инвентарь и химию под тип ваших поверхностей"
    },
    {
      step: "03",
      title: "Проведение уборки",
      description: "Команда клинеров выполняет все оговоренные работы"
    },
    {
      step: "04",
      title: "Контроль качества",
      description: "Менеджер проверяет качество уборки по чек-листу"
    },
    {
      step: "05",
      title: "Приемка работы",
      description: "Вы принимаете работу и наслаждаетесь чистотой"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Профессиональная уборка
              <span className="text-yandex-yellow"> для дома и офиса</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Вернем вашим помещениям сияющую чистоту, пока вы занимаетесь своими делами.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Рассчитать стоимость
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-teal-700 px-8 py-4 text-lg">
                Виды уборки
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
              Что мы предлагаем
            </h2>
            <p className="text-lg text-text-secondary">
              Подберем идеальное решение для любой задачи
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
                  <Badge className="bg-teal-500 text-white">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
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
                Почему нам доверяют
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle className="w-6 h-6 text-teal-500 mt-1 flex-shrink-0" />
                  <p className="text-text-primary">{benefit}</p>
                </div>
              ))}
            </div>
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
              Прозрачный процесс от заявки до идеального результата
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
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
      
      {/* CTA Form */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
             <LeadForm title="Оставьте заявку на уборку"
              subtitle="Наш менеджер свяжется с вами, чтобы рассчитать точную стоимость и ответить на все вопросы."
            />
          </div>
        </div>
      </section>
    </div>
  );
} 