import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import { CheckCircle, TrendingUp, Users, Shield, Clock, Star } from "lucide-react";

export default function Sell() {
  const [propertyType, setPropertyType] = useState("apartment");

  const advantages = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "Продажа по максимальной цене",
      description: "Профессиональная оценка и маркетинг для получения лучшей стоимости"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Быстрые сроки",
      description: "Продаем недвижимость в среднем за 30-45 дней"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Безопасность сделки",
      description: "Полная юридическая проверка и сопровождение"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "База покупателей",
      description: "Более 5000 активных покупателей в нашей базе"
    }
  ];

  const services = [
    "Бесплатная оценка недвижимости",
    "Предпродажная подготовка",
    "Профессиональная фотосъемка",
    "Размещение на всех площадках",
    "Показы потенциальным покупателям",
    "Переговоры с покупателями",
    "Юридическое сопровождение",
    "Сопровождение до регистрации"
  ];

  const steps = [
    {
      number: "01",
      title: "Заявка и оценка",
      description: "Оставляете заявку, мы бесплатно оцениваем вашу недвижимость"
    },
    {
      number: "02", 
      title: "Подготовка к продаже",
      description: "Подготавливаем документы и при необходимости помогаем с улучшениями"
    },
    {
      number: "03",
      title: "Маркетинг",
      description: "Создаем привлекательные объявления и размещаем на всех площадках"
    },
    {
      number: "04",
      title: "Показы и переговоры",
      description: "Проводим показы квартиры и ведем переговоры с покупателями"
    },
    {
      number: "05",
      title: "Сделка",
      description: "Оформляем сделку и сопровождаем до полной регистрации"
    }
  ];

  const testimonials = [
    {
      name: "Анна Козлова",
      text: "Продали квартиру на Васильевском острове за 2 недели! Цена была выше, чем мы ожидали.",
      rating: 5,
      property: "3-комнатная квартира"
    },
    {
      name: "Михаил Петров",
      text: "Отличная работа команды. Взяли на себя все заботы по продаже дома в пригороде.",
      rating: 5,
      property: "Загородный дом"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Продайте недвижимость 
              <span className="text-yandex-yellow"> выгодно</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Профессиональная помощь в продаже любой недвижимости в Санкт-Петербурге. 
              Получите максимальную стоимость за минимальное время.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Получить оценку бесплатно
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
                Узнать стоимость услуг
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Почему выбирают нас для продажи
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Более 1000 успешных сделок по продаже недвижимости в Санкт-Петербурге
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-text-secondary">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Что входит в наши услуги
              </h2>
              <p className="text-lg text-text-secondary">
                Полный комплекс услуг для успешной продажи вашей недвижимости
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-text-primary font-medium">{service}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Card className="inline-block">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Комиссия всего 3%
                  </h3>
                  <p className="text-text-secondary mb-4">
                    При успешной продаже. Никаких скрытых платежей.
                  </p>
                  <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">
                    Оценка бесплатно
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Как мы работаем
            </h2>
            <p className="text-lg text-text-secondary">
              Простой и понятный процесс продажи недвижимости
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-accent-orange text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                  {step.number}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Отзывы наших клиентов
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-text-secondary mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-semibold text-text-primary">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {testimonial.property}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section className="py-16 bg-gradient-to-r from-accent-orange to-orange-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Узнайте стоимость вашей недвижимости
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Получите профессиональную оценку и план продажи абсолютно бесплатно
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title="Получить бесплатную оценку"
              description="Заполните форму и наш эксперт свяжется с вами в течение 15 минут"
              serviceType="Хочу продать недвижимость"
            />
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Дополнительные услуги
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-hammer text-blue-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Предпродажная подготовка
                </h3>
                <p className="text-text-secondary mb-6">
                  Косметический ремонт и стейджинг для увеличения стоимости
                </p>
                <Link href="/services/pre-sale-preparation">
                  <Button variant="outline" className="border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white">
                    Подробнее
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-balance-scale text-green-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Юридическое сопровождение
                </h3>
                <p className="text-text-secondary mb-6">
                  Полная проверка документов и сопровождение сделки
                </p>
                <Link href="/services/legal-verification">
                  <Button variant="outline" className="border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white">
                    Подробнее
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-handshake text-purple-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Альтернативные сделки
                </h3>
                <p className="text-text-secondary mb-6">
                  Помощь с одновременной покупкой и продажей недвижимости
                </p>
                <Link href="/services/transaction-support">
                  <Button variant="outline" className="border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white">
                    Подробнее
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
