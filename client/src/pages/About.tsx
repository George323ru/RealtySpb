import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { CheckCircle, TrendingUp, Users, Award, Shield, Clock } from "lucide-react";

export default function About() {
  const achievements = [
    {
      number: "1500+",
      title: "Успешных сделок",
      description: "За время работы компании"
    },
    {
      number: "15",
      title: "Лет на рынке",
      description: "Опыт работы с недвижимостью"
    },
    {
      number: "98%",
      title: "Довольных клиентов",
      description: "Рекомендуют нас друзьям"
    },
    {
      number: "50",
      title: "Экспертов",
      description: "Профессиональная команда"
    }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Надежность",
      description: "Гарантируем юридическую чистоту всех сделок и полную прозрачность процесса"
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Клиентоориентированность",
      description: "Индивидуальный подход к каждому клиенту и решение именно ваших задач"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      title: "Профессионализм",
      description: "Глубокая экспертиза рынка и постоянное повышение квалификации команды"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: "Оперативность",
      description: "Быстрое решение вопросов и сокращение времени на проведение сделок"
    }
  ];

  const services = [
    "Покупка и продажа недвижимости",
    "Аренда жилой и коммерческой недвижимости",
    "Инвестиционное консультирование",
    "Юридическое сопровождение сделок",
    "Оценка недвижимости",
    "Ипотечное консультирование",
    "Предпродажная подготовка объектов",
    "Дизайн и ремонт",
    "Строительные услуги",
    "Управление недвижимостью"
  ];

  const timeline = [
    {
      year: "2009",
      title: "Основание компании",
      description: "Начало работы на рынке недвижимости Санкт-Петербурга"
    },
    {
      year: "2012",
      title: "Расширение услуг",
      description: "Добавили услуги по коммерческой недвижимости и инвестиционному консультированию"
    },
    {
      year: "2015",
      title: "Новые направления",
      description: "Запустили отдел строительства и дизайна интерьеров"
    },
    {
      year: "2018",
      title: "Цифровизация",
      description: "Внедрили современные IT-решения для улучшения сервиса"
    },
    {
      year: "2021",
      title: "Лидер рынка",
      description: "Вошли в ТОП-3 агентств недвижимости Санкт-Петербурга"
    },
    {
      year: "2024",
      title: "Новые горизонты",
      description: "Расширение в сфере загородной недвижимости и премиального сегмента"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-700 to-slate-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              О компании 
              <span className="text-yandex-yellow"> СПБ Недвижимость</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Ведущее агентство недвижимости Санкт-Петербурга с 15-летним опытом работы и безупречной репутацией
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                  Связаться с нами
                </Button>
              </Link>
              <Link href="/team">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-700 px-8 py-4 text-lg">
                  Наша команда
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-8">
              Наша миссия
            </h2>
            <p className="text-xl text-text-secondary leading-relaxed mb-8">
              Мы помогаем людям принимать правильные решения в сфере недвижимости, обеспечивая 
              профессиональное сопровождение на каждом этапе сделки. Наша цель — сделать процесс 
              покупки, продажи или аренды недвижимости максимально простым, безопасным и выгодным 
              для каждого клиента.
            </p>
            
            <Card className="inline-block">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  Наше видение
                </h3>
                <p className="text-text-secondary">
                  Стать самым надежным партнером в сфере недвижимости, который клиенты 
                  выбирают за профессионализм, честность и результат.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Наши достижения
            </h2>
            <p className="text-lg text-text-secondary">
              Цифры, которые говорят о нашем профессионализме
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-accent-orange mb-2">
                    {achievement.number}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-text-secondary">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Наши ценности
            </h2>
            <p className="text-lg text-text-secondary">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Наши услуги
              </h2>
              <p className="text-lg text-text-secondary">
                Полный спектр услуг в сфере недвижимости
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
              <Link href="/services">
                <Button className="bg-accent-orange text-white hover:bg-orange-600 px-8 py-4">
                  Подробнее об услугах
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              История компании
            </h2>
            <p className="text-lg text-text-secondary">
              Основные вехи нашего развития
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-20 h-20 bg-accent-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                  {item.year}
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

      {/* Certifications */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Лицензии и сертификаты
            </h2>
            <p className="text-lg text-text-secondary">
              Официальные разрешения и признание профессионализма
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Лицензия Росреестра
                </h3>
                <p className="text-text-secondary">
                  Официальная лицензия на осуществление деятельности в сфере недвижимости
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Член РГР
                </h3>
                <p className="text-text-secondary">
                  Член Российской гильдии риэлторов с соблюдением всех стандартов
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  ISO 9001
                </h3>
                <p className="text-text-secondary">
                  Сертификат качества управления и предоставления услуг
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-orange to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Готовы работать с профессионалами?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Доверьте свои вопросы недвижимости команде экспертов с 15-летним опытом
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-accent-orange hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Получить консультацию
              </Button>
            </Link>
            <Link href="/reviews">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-accent-orange px-8 py-4 text-lg">
                Читать отзывы
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
