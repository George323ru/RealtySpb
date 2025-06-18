import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ServiceCard from "@/components/service-card";
import ConsultationForm from "@/components/consultation-form";
import { Service } from "@shared/schema";
import { 
  CheckCircle, 
  Star, 
  Award, 
  Users, 
  TrendingUp, 
  Shield,
  Clock,
  Target,
  ArrowRight
} from "lucide-react";
import { SERVICES } from "@/lib/constants";

const Services = () => {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const advantages = [
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "15+ лет опыта",
      description: "Многолетний опыт работы на рынке недвижимости Санкт-Петербурга"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: "Лицензии и сертификаты",
      description: "Все необходимые лицензии и профессиональные сертификаты"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Команда экспертов",
      description: "Профессиональные специалисты в каждой области"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Гарантии качества",
      description: "Полная гарантия на все выполненные работы"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Консультация",
      description: "Обсуждаем ваши потребности и составляем план работ",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: "2",
      title: "Планирование",
      description: "Разрабатываем детальный план и смету проекта",
      icon: <Target className="w-6 h-6" />
    },
    {
      step: "3",
      title: "Выполнение",
      description: "Реализуем проект с соблюдением сроков и качества",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      step: "4",
      title: "Сдача",
      description: "Сдаем готовый проект и предоставляем гарантии",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  const mainServices = [
    {
      category: "Подготовка к продаже",
      services: [
        "Предпродажная подготовка",
        "Дизайн-проект", 
        "Ремонт"
      ],
      color: "bg-blue-500"
    },
    {
      category: "Строительство",
      services: [
        "Услуги по земле и строительству",
        "Подбор участка",
        "Строительство",
        "Проектирование"
      ],
      color: "bg-green-500"
    },
    {
      category: "Инженерия и дизайн",
      services: [
        "Инженерные системы",
        "Ландшафтный дизайн"
      ],
      color: "bg-purple-500"
    },
    {
      category: "Юридические услуги",
      services: [
        "Юридическая проверка",
        "Сопровождение сделки"
      ],
      color: "bg-orange-500"
    },
    {
      category: "Управление",
      services: [
        "Управление недвижимостью",
        "Комплектация мебелью"
      ],
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-orange to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Полный спектр услуг по недвижимости
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              От консультации до реализации — все услуги для работы с недвижимостью в одном месте
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">13</div>
                <div className="text-sm opacity-80">Видов услуг</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-80">Выполненных проектов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-sm opacity-80">Довольных клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Основные направления услуг
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Мы предлагаем комплексные решения для всех потребностей в сфере недвижимости
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-accent-orange rounded-full mr-3"></div>
                        <span className="text-text-secondary">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Все наши услуги
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Подробная информация о каждой услуге с ценами и сроками выполнения
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 skeleton"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 skeleton"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 skeleton"></div>
                </div>
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Услуги скоро появятся
              </h3>
              <p className="text-text-secondary">
                Мы работаем над наполнением каталога услуг
              </p>
            </div>
          )}
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
              Наши конкурентные преимущества и гарантии качества
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

      {/* Process */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Как мы работаем
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Четкий процесс выполнения работ с гарантией качества на каждом этапе
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    {step.icon}
                  </div>
                  <Badge variant="outline" className="mb-3">
                    Этап {step.step}
                  </Badge>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Наши гарантии
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Гарантия качества
                </h3>
                <p className="text-text-secondary mb-4">
                  Гарантируем качество всех выполненных работ в соответствии с договором и стандартами.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-text-secondary">Проверка качества на каждом этапе</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-text-secondary">Исправление недочетов за наш счет</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Соблюдение сроков
                </h3>
                <p className="text-text-secondary mb-4">
                  Выполняем все работы в установленные договором сроки или компенсируем задержку.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-text-secondary">Четкое планирование этапов</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-text-secondary">Еженедельные отчеты о прогрессе</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-6">
                <Star className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Сервисное обслуживание
                </h3>
                <p className="text-text-secondary mb-4">
                  Предоставляем послепродажное обслуживание и техническую поддержку.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="text-sm text-text-secondary">Консультации после завершения</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="text-sm text-text-secondary">Гарантийное обслуживание</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-orange to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <ConsultationForm 
              title="Нужна консультация по услугам?"
              description="Расскажите о ваших задачах и мы предложим оптимальное решение"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Часто задаваемые вопросы
              </h2>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "Какие гарантии вы предоставляете на выполненные работы?",
                  answer: "Мы предоставляем гарантию от 1 до 5 лет в зависимости от вида работ. Все гарантийные обязательства прописываются в договоре."
                },
                {
                  question: "Можно ли заказать только часть услуг?",
                  answer: "Да, вы можете заказать любую услугу отдельно или в комплексе. Мы предлагаем как индивидуальные услуги, так и комплексные решения."
                },
                {
                  question: "Как происходит оплата услуг?",
                  answer: "Оплата производится поэтапно согласно договору. Обычно это: предоплата 30%, промежуточные платежи по факту выполнения этапов, окончательный расчет при сдаче работ."
                },
                {
                  question: "Работаете ли вы с объектами в Ленинградской области?",
                  answer: "Да, мы работаем как в Санкт-Петербурге, так и в Ленинградской области. Стоимость услуг может включать транспортные расходы для удаленных объектов."
                }
              ].map((faq, index) => (
                <Card key={index} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-text-primary mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-text-secondary">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
