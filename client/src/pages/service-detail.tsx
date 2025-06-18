import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ConsultationForm from "@/components/consultation-form";
import ServiceCard from "@/components/service-card";
import { Service } from "@shared/schema";
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Star,
  Award,
  Shield,
  Users,
  X
} from "lucide-react";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: service, isLoading, error } = useQuery<Service>({
    queryKey: [`/api/services/${slug}`],
  });

  const { data: allServices = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
              <div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <X className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Услуга не найдена
              </h1>
              <p className="text-text-secondary mb-6">
                Запрашиваемая услуга не существует или была удалена
              </p>
              <Link href="/services">
                <Button className="bg-accent-orange hover:bg-orange-600">
                  Вернуться к услугам
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedServices = allServices
    .filter(s => s.id !== service.id && s.category === service.category)
    .slice(0, 3);

  const getIconColorClass = (category: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-500",
      purple: "bg-purple-100 text-purple-500",
      green: "bg-green-100 text-green-500",
      yellow: "bg-yellow-100 text-yellow-500",
      red: "bg-red-100 text-red-500",
      indigo: "bg-indigo-100 text-indigo-500",
      pink: "bg-pink-100 text-pink-500",
      teal: "bg-teal-100 text-teal-500",
      emerald: "bg-emerald-100 text-emerald-500",
      orange: "bg-orange-100 text-orange-500",
      cyan: "bg-cyan-100 text-cyan-500",
      violet: "bg-violet-100 text-violet-500",
      rose: "bg-rose-100 text-rose-500",
    };
    return colors[category as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-accent-orange">Главная</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-accent-orange">Услуги</Link>
            <span>/</span>
            <span className="text-text-primary">{service.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/services">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к услугам
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColorClass(service.category)}`}>
                    <i className={`${service.icon} text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h1 className="text-3xl font-bold text-text-primary">
                        {service.name}
                      </h1>
                      <Badge variant="outline" className="capitalize">
                        {service.category === "main" ? "Основная" : "Дополнительная"}
                      </Badge>
                    </div>
                    <p className="text-lg text-text-secondary mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center space-x-6">
                      {service.price && (
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-accent-orange mr-2" />
                          <span className="font-semibold text-text-primary">{service.price}</span>
                        </div>
                      )}
                      {service.duration && (
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-accent-orange mr-2" />
                          <span className="text-text-secondary">{service.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Full Description */}
            {service.fullDescription && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-6">
                    Подробное описание
                  </h2>
                  <div className="prose max-w-none text-text-secondary">
                    {service.fullDescription.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-6">
                    Что включает услуга
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Process Steps */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  Этапы выполнения
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      step: "1",
                      title: "Первичная консультация",
                      description: "Обсуждаем ваши потребности, анализируем задачи и составляем план работ"
                    },
                    {
                      step: "2", 
                      title: "Планирование и согласование",
                      description: "Разрабатываем детальный план, составляем смету и согласовываем с вами все детали"
                    },
                    {
                      step: "3",
                      title: "Выполнение работ",
                      description: "Реализуем проект согласно плану с регулярными отчетами о прогрессе"
                    },
                    {
                      step: "4",
                      title: "Контроль качества и сдача",
                      description: "Проверяем качество выполненных работ и сдаем готовый результат"
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-accent-orange text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-2">{step.title}</h3>
                        <p className="text-text-secondary">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  Почему выбирают нас
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Опыт и экспертиза</h3>
                      <p className="text-text-secondary text-sm">15+ лет работы на рынке недвижимости</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Сертификация</h3>
                      <p className="text-text-secondary text-sm">Все необходимые лицензии и сертификаты</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Гарантии</h3>
                      <p className="text-text-secondary text-sm">Полная гарантия на выполненные работы</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Команда профессионалов</h3>
                      <p className="text-text-secondary text-sm">Специалисты высокого уровня в каждой области</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <ConsultationForm 
                  title="Заказать услугу"
                  description="Оставьте заявку и мы рассчитаем стоимость для вашего случая"
                />
              </CardContent>
            </Card>

            {/* Service Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Информация об услуге
                </h3>
                <div className="space-y-4">
                  {service.price && (
                    <div>
                      <div className="text-sm text-text-secondary mb-1">Стоимость</div>
                      <div className="font-semibold text-text-primary">{service.price}</div>
                    </div>
                  )}
                  {service.duration && (
                    <div>
                      <div className="text-sm text-text-secondary mb-1">Срок выполнения</div>
                      <div className="font-semibold text-text-primary">{service.duration}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-text-secondary mb-1">Категория</div>
                    <div className="font-semibold text-text-primary capitalize">
                      {service.category === "main" ? "Основная услуга" : "Дополнительная услуга"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Связаться с нами
                </h3>
                <div className="space-y-3">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    <i className="fab fa-whatsapp mr-2"></i>
                    WhatsApp
                  </Button>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    <i className="fab fa-telegram mr-2"></i>
                    Telegram
                  </Button>
                  <Button className="w-full bg-accent-orange hover:bg-orange-600 text-white">
                    <i className="fas fa-phone mr-2"></i>
                    Позвонить
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Download Materials */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Материалы
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <i className="fas fa-file-pdf mr-2 text-red-500"></i>
                    Презентация услуги
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <i className="fas fa-file-alt mr-2 text-blue-500"></i>
                    Техническое задание
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <i className="fas fa-calculator mr-2 text-green-500"></i>
                    Калькулятор стоимости
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Похожие услуги
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => (
                <ServiceCard key={relatedService.id} service={relatedService} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
