import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Award, 
  Users, 
  Building, 
  TrendingUp, 
  Shield, 
  Heart,
  Target,
  Globe,
  CheckCircle,
  Calendar
} from "lucide-react";

export default function About() {
  const stats = [
    { value: "15+", label: "Лет на рынке", icon: Calendar },
    { value: "5000+", label: "Довольных клиентов", icon: Users },
    { value: "10000+", label: "Сделок проведено", icon: Building },
    { value: "98%", label: "Успешных сделок", icon: TrendingUp }
  ];

  const values = [
    {
      icon: Shield,
      title: "Надежность",
      description: "Гарантируем безопасность каждой сделки и защиту интересов клиентов"
    },
    {
      icon: Heart,
      title: "Клиентоориентированность", 
      description: "Индивидуальный подход к каждому клиенту и его потребностям"
    },
    {
      icon: Target,
      title: "Профессионализм",
      description: "Высокая экспертиза и постоянное развитие компетенций"
    },
    {
      icon: Globe,
      title: "Инновации",
      description: "Использование современных технологий и методов работы"
    }
  ];

  const achievements = [
    "Лидер рынка недвижимости Санкт-Петербурга",
    "Партнер ведущих застройщиков города", 
    "Сертифицированное агентство недвижимости",
    "Официальный партнер банков по ипотечному кредитованию",
    "Член Российской гильдии риэлторов",
    "Лауреат премии 'Лучшее агентство недвижимости 2023'"
  ];

  const services = [
    {
      title: "Покупка недвижимости",
      description: "Полное сопровождение сделки от поиска до оформления",
      features: ["Поиск по критериям", "Проверка документов", "Юридическое сопровождение", "Ипотечная поддержка"]
    },
    {
      title: "Продажа недвижимости", 
      description: "Максимальная цена в кратчайшие сроки",
      features: ["Оценка рыночной стоимости", "Предпродажная подготовка", "Маркетинг и реклама", "Ведение переговоров"]
    },
    {
      title: "Аренда недвижимости",
      description: "Быстрый поиск арендаторов и качественных объектов",
      features: ["Подбор объектов", "Проверка арендаторов", "Юридическое оформление", "Управление арендой"]
    },
    {
      title: "Инвестиционные решения",
      description: "Профессиональные консультации по инвестициям в недвижимость",
      features: ["Анализ рынка", "Подбор объектов", "Расчет доходности", "Долгосрочное сопровождение"]
    }
  ];

  const team = [
    {
      role: "Управляющий директор",
      experience: "15+ лет",
      description: "Эксперт рынка недвижимости СПб, автор более 100 статей"
    },
    {
      role: "Коммерческий директор", 
      experience: "12+ лет",
      description: "Специалист по коммерческой недвижимости и инвестициям"
    },
    {
      role: "Руководители отделов",
      experience: "8+ лет",
      description: "Команда профессионалов с глубокой экспертизой"
    },
    {
      role: "Риэлторы",
      experience: "3+ года",
      description: "50+ сертифицированных специалистов"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-text-primary mb-6">
              Риэлтор в СПб - О компании недвижимости
            </h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Мы — ведущее агентство недвижимости Санкт-Петербурга с 15-летним опытом. 
              Помогаем клиентам принимать правильные решения в сфере недвижимости, 
              обеспечивая надежность, профессионализм и индивидуальный подход.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/realtor-constructor">
                <Button className="bg-accent-orange text-white hover:bg-orange-600 px-8 py-3">
                  Подобрать специалиста
                </Button>
              </Link>
              <Link href="/contacts">
                <Button variant="outline" className="border-2 border-accent-orange text-accent-orange hover:bg-orange-50 px-8 py-3">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mx-auto">
                    <stat.icon className="w-8 h-8 text-accent-orange" />
                  </div>
                  <h3 className="text-3xl font-bold text-text-primary">{stat.value}</h3>
                  <p className="text-text-secondary">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-text-primary mb-6">Наша миссия и ценности</h2>
              <p className="text-xl text-text-secondary">
                Мы создаем доверительные отношения с клиентами, предоставляя экспертные услуги 
                и персональный подход к решению любых задач в сфере недвижимости.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary">{value.title}</h3>
                    <p className="text-text-secondary">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">Наши услуги</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Предоставляем полный спектр услуг по недвижимости — 
              от консультаций до полного сопровождения сложных сделок.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary mb-3">{service.title}</h3>
                    <p className="text-text-secondary mb-6">{service.description}</p>
                  </div>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-text-primary mb-6">Структура команды</h2>
              <p className="text-xl text-text-secondary">
                Профессиональная команда из 50+ специалистов с многолетним опытом
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-text-primary">{member.role}</h3>
                      <Badge variant="secondary" className="bg-accent-orange/10 text-accent-orange">
                        {member.experience}
                      </Badge>
                    </div>
                    <p className="text-text-secondary">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/realtor-constructor">
                <Button className="bg-accent-orange text-white hover:bg-orange-600 px-8 py-4 text-lg">
                  Подобрать вашего специалиста
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-text-primary mb-12">Наши достижения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-center space-x-4">
                    <Award className="w-8 h-8 text-accent-orange flex-shrink-0" />
                    <span className="text-text-primary font-medium">{achievement}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-orange to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Готовы начать работу с нами?</h2>
            <p className="text-xl mb-8 opacity-90">
              Получите профессиональную консультацию и подберите идеального специалиста для ваших задач
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/realtor-constructor">
                <Button className="bg-white text-accent-orange hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Подобрать специалиста
                </Button>
              </Link>
              <Link href="/contacts">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-accent-orange px-8 py-4 text-lg">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}