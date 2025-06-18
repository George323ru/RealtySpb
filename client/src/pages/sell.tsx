import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConsultationForm from "@/components/consultation-form";
import { CheckCircle, DollarSign, Clock, Shield, Star, Calculator, Camera, FileText, Users, TrendingUp } from "lucide-react";

const Sell = () => {
  const [activeStep, setActiveStep] = useState(1);

  const advantages = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "Максимальная цена",
      description: "Продадим вашу недвижимость по рыночной стоимости или выше благодаря профессиональной подготовке"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Быстрая продажа",
      description: "Средний срок продажи 45-60 дней благодаря активному маркетингу и большой клиентской базе"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Юридическая защита",
      description: "Полная правовая проверка и сопровождение сделки, страхование рисков"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Профессиональный подход",
      description: "15+ лет опыта, современные технологии продаж, индивидуальная стратегия для каждого объекта"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Оценка недвижимости",
      description: "Бесплатная оценка рыночной стоимости вашего объекта",
      icon: <Calculator className="w-6 h-6" />,
      details: [
        "Анализ рынка и аналогичных объектов",
        "Профессиональная оценка состояния",
        "Определение конкурентных преимуществ",
        "Рекомендации по цене"
      ]
    },
    {
      number: 2,
      title: "Подготовка к продаже",
      description: "Подготовим объект для максимально выгодной продажи",
      icon: <Camera className="w-6 h-6" />,
      details: [
        "Профессиональная фотосъемка",
        "Создание презентации объекта",
        "Рекомендации по улучшению",
        "Подготовка документов"
      ]
    },
    {
      number: 3,
      title: "Маркетинг и реклама",
      description: "Активное продвижение на всех площадках и каналах",
      icon: <TrendingUp className="w-6 h-6" />,
      details: [
        "Размещение на всех сайтах недвижимости",
        "Социальные сети и таргетированная реклама",
        "Печатная реклама в специализированных изданиях",
        "Работа с нашей клиентской базой"
      ]
    },
    {
      number: 4,
      title: "Показы и переговоры",
      description: "Организуем показы и проведем переговоры с покупателями",
      icon: <Users className="w-6 h-6" />,
      details: [
        "Квалификация потенциальных покупателей",
        "Организация и проведение показов",
        "Переговоры о цене и условиях",
        "Помощь в выборе лучшего предложения"
      ]
    },
    {
      number: 5,
      title: "Сопровождение сделки",
      description: "Полное юридическое и техническое сопровождение",
      icon: <FileText className="w-6 h-6" />,
      details: [
        "Проверка документов покупателя",
        "Подготовка договора купли-продажи",
        "Сопровождение в МФЦ/Росреестре",
        "Контроль расчетов и передача ключей"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Анна Михайлова",
      text: "Продали квартиру в центре за 2 месяца на 500 тысяч дороже первоначальной оценки. Команда работала очень профессионально!",
      rating: 5,
      property: "3-комн. квартира, Центральный район"
    },
    {
      name: "Дмитрий Петров",
      text: "Отличный сервис! Все прошло быстро и без проблем. Особенно понравилось юридическое сопровождение.",
      rating: 5,
      property: "Загородный дом, Пушкинский район"
    },
    {
      name: "Елена Сергеева",
      text: "Профессиональная команда, которая действительно заботится о результате. Рекомендую всем знакомым!",
      rating: 5,
      property: "2-комн. квартира, Московский район"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Продайте недвижимость выгодно и быстро
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Профессиональный подход, максимальная цена, полное сопровождение сделки
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">45-60 дней</div>
                <div className="text-sm opacity-80">Средний срок продажи</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-sm opacity-80">Успешных сделок</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">15+ лет</div>
                <div className="text-sm opacity-80">Опыт на рынке</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Мы обеспечиваем максимальную выгоду и комфорт при продаже вашей недвижимости
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
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

      {/* Process Steps */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Как проходит продажа
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Пошаговый процесс продажи недвижимости с полным сопровождением на каждом этапе
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {steps.map((step) => (
                <Button
                  key={step.number}
                  variant={activeStep === step.number ? "default" : "outline"}
                  onClick={() => setActiveStep(step.number)}
                  className="mb-2"
                >
                  <span className="mr-2">{step.number}</span>
                  {step.title}
                </Button>
              ))}
            </div>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`${activeStep === step.number ? "block" : "hidden"}`}
                >
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-lg text-text-secondary mb-4">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {step.details.map((detail, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-text-secondary">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Отзывы клиентов
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Реальные отзывы от людей, которые успешно продали недвижимость с нашей помощью
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-orange to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <ConsultationForm 
              title="Получите бесплатную оценку недвижимости"
              description="Оставьте заявку и наш эксперт проведет оценку вашего объекта в течение 24 часов"
            />
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Что входит в наши услуги
              </h3>
              <div className="space-y-4">
                {[
                  "Профессиональная оценка рыночной стоимости",
                  "Юридическая проверка документов",
                  "Профессиональная фотосъемка и создание презентации",
                  "Размещение на всех площадках недвижимости",
                  "Активный поиск покупателей через нашу клиентскую базу",
                  "Организация и проведение показов",
                  "Переговоры с покупателями",
                  "Помощь в оформлении документов",
                  "Сопровождение сделки до полного завершения",
                  "Консультации по налогообложению"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Наши гарантии
              </h3>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-text-primary mb-2">
                      Гарантия результата
                    </h4>
                    <p className="text-text-secondary">
                      Если мы не продадим вашу недвижимость в течение 6 месяцев, 
                      мы вернем 50% от суммы вознаграждения.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-text-primary mb-2">
                      Юридическая защита
                    </h4>
                    <p className="text-text-secondary">
                      Страхование профессиональной ответственности до 10 млн рублей. 
                      Полная правовая защита сделки.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-text-primary mb-2">
                      Прозрачность
                    </h4>
                    <p className="text-text-secondary">
                      Еженедельные отчеты о проделанной работе. 
                      Полная прозрачность всех этапов продажи.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sell;
