import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ConsultationForm from "@/components/consultation-form";
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Star, 
  Award,
  Phone,
  MessageCircle
} from "lucide-react";
import type { Service } from "@shared/schema";

export default function ServiceDetail() {
  const params = useParams();
  const serviceId = parseInt(params.id || '1');

  const { data: service, isLoading } = useQuery<Service>({
    queryKey: [`/api/services/${serviceId}`],
  });

  // Mock detailed service data since we don't have extended schema
  const serviceDetails = {
    1: {
      fullDescription: "Предпродажная подготовка — это комплекс мероприятий, направленных на увеличение рыночной стоимости недвижимости и ускорение процесса продажи. Наши специалисты проведут детальный анализ объекта, выявят его слабые стороны и предложат экономически обоснованные улучшения.",
      stages: [
        "Первичный осмотр и анализ объекта",
        "Составление плана улучшений",
        "Выполнение косметических работ",
        "Профессиональная фотосъемка",
        "Подготовка презентационных материалов"
      ],
      benefits: [
        "Увеличение стоимости на 10-20%",
        "Сокращение времени продажи",
        "Привлечение большего числа покупателей",
        "Улучшение восприятия объекта"
      ],
      timeline: "7-14 дней",
      warranty: "6 месяцев",
      images: [
        "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
      ]
    }
  };

  const details = serviceDetails[serviceId as keyof typeof serviceDetails] || serviceDetails[1];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-neutral-200 rounded mb-8 w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-64 bg-neutral-200 rounded mb-6"></div>
                  <div className="h-32 bg-neutral-200 rounded mb-6"></div>
                </div>
                <div className="h-96 bg-neutral-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Услуга не найдена
          </h2>
          <p className="text-text-secondary mb-4">
            Возможно, услуга была удалена или перемещена
          </p>
          <Link href="/services">
            <Button>Вернуться к услугам</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Link href="/" className="hover:text-accent-orange">Главная</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-accent-orange">Услуги</Link>
              <span>/</span>
              <span className="text-text-primary">{service.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/services">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к услугам
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Service Header */}
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-3xl mb-2">{service.name}</CardTitle>
                      <p className="text-lg text-text-secondary">{service.shortDescription}</p>
                    </div>
                    <Badge className="bg-accent-orange text-text-primary text-lg px-4 py-2">
                      {service.price}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {details.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${service.name} - фото ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-neutral-100 rounded-lg">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-text-secondary" />
                      <div className="text-sm text-text-secondary">Срок выполнения</div>
                      <div className="font-semibold">{details.timeline}</div>
                    </div>
                    
                    <div className="text-center p-4 bg-neutral-100 rounded-lg">
                      <Award className="w-6 h-6 mx-auto mb-2 text-text-secondary" />
                      <div className="text-sm text-text-secondary">Гарантия</div>
                      <div className="font-semibold">{details.warranty}</div>
                    </div>
                    
                    <div className="text-center p-4 bg-neutral-100 rounded-lg">
                      <Star className="w-6 h-6 mx-auto mb-2 text-text-secondary" />
                      <div className="text-sm text-text-secondary">Рейтинг</div>
                      <div className="font-semibold">4.9/5</div>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Описание услуги</h3>
                    <p className="text-text-secondary leading-relaxed mb-6">
                      {details.fullDescription}
                    </p>
                    <p className="text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Stages */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Этапы выполнения</h3>
                    <div className="space-y-4">
                      {details.stages.map((stage, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-8 h-8 bg-accent-orange text-text-primary rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0 mt-1">
                            {index + 1}
                          </div>
                          <p className="text-text-secondary">{stage}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Преимущества</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {details.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-text-secondary">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Что входит в услугу</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Часто задаваемые вопросы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">
                        Сколько времени занимает выполнение услуги?
                      </h4>
                      <p className="text-text-secondary">
                        Срок выполнения зависит от объема работ и составляет от {details.timeline}. 
                        Точные сроки определяются после осмотра объекта.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">
                        Предоставляете ли вы гарантию на выполненные работы?
                      </h4>
                      <p className="text-text-secondary">
                        Да, мы предоставляем гарантию {details.warranty} на все выполненные работы 
                        и используемые материалы.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2">
                        Можно ли заказать услугу частично?
                      </h4>
                      <p className="text-text-secondary">
                        Конечно! Мы можем адаптировать услугу под ваши потребности и бюджет, 
                        выполнив только необходимые этапы работ.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Заказать услугу</CardTitle>
                </CardHeader>
                <CardContent>
                  <ConsultationForm 
                    defaultService={service.name}
                    className="!p-0 !bg-transparent"
                  />
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-text-primary mb-4">Нужна консультация?</h3>
                  <div className="space-y-3">
                    <Button className="w-full bg-accent-orange hover:bg-orange-600 text-text-primary">
                      <Phone className="w-4 h-4 mr-2" />
                      Позвонить сейчас
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Написать в WhatsApp
                    </Button>
                  </div>
                  <p className="text-sm text-text-secondary mt-4 text-center">
                    Бесплатная консультация по телефону
                  </p>
                </CardContent>
              </Card>

              {/* Service Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Информация об услуге</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Стоимость:</span>
                      <span className="font-semibold text-accent-orange">{service.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Срок:</span>
                      <span className="font-semibold">{details.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Гарантия:</span>
                      <span className="font-semibold">{details.warranty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Рейтинг:</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold ml-1">4.9</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Дополнительные услуги</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/services/2">
                      <Button variant="ghost" className="w-full justify-start text-left p-2">
                        <div>
                          <div className="font-medium">Дизайн-проект</div>
                          <div className="text-sm text-text-secondary">от 3 000 ₽/м²</div>
                        </div>
                      </Button>
                    </Link>
                    <Link href="/services/3">
                      <Button variant="ghost" className="w-full justify-start text-left p-2">
                        <div>
                          <div className="font-medium">Ремонт под ключ</div>
                          <div className="text-sm text-text-secondary">от 15 000 ₽/м²</div>
                        </div>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
