import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  DollarSign,
  Phone,
  MessageCircle,
  Users,
  Shield,
  Settings
} from "lucide-react";
import type { Service } from "@shared/schema";

const contactSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email").optional().or(z.literal("")),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ServiceDetail() {
  const { slug } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showContactForm, setShowContactForm] = useState(false);

  const { data: service, isLoading, error } = useQuery<Service>({
    queryKey: [`/api/services/${slug}`],
    enabled: !!slug,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const formattedData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        service: `Интерес к услуге: ${service?.name}`,
        message: data.message || '',
      };
      return apiRequest("POST", "/api/leads", formattedData);
    },
    onSuccess: () => {
      toast({
        title: "Заявка отправлена!",
        description: "Наш специалист свяжется с вами в ближайшее время.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      setShowContactForm(false);
      reset();
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: "bg-blue-100", text: "text-blue-500", border: "border-blue-200" },
      purple: { bg: "bg-purple-100", text: "text-purple-500", border: "border-purple-200" },
      green: { bg: "bg-green-100", text: "text-green-500", border: "border-green-200" },
      yellow: { bg: "bg-yellow-100", text: "text-yellow-500", border: "border-yellow-200" },
      red: { bg: "bg-red-100", text: "text-red-500", border: "border-red-200" },
      orange: { bg: "bg-orange-100", text: "text-orange-500", border: "border-orange-200" },
    };
    return colors[color] || colors.blue;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-32 bg-gray-200 rounded-2xl mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
              <div>
                <div className="h-64 bg-gray-200 rounded-2xl"></div>
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
          <CardContent className="pt-6 text-center">
            <div className="text-gray-400 mb-4">
              <Settings className="w-16 h-16 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-primary mb-2">Услуга не найдена</h1>
            <p className="text-secondary mb-6">
              Возможно, услуга была удалена или перемещена
            </p>
            <Link href="/services">
              <Button className="bg-accent-orange hover:bg-orange-600">
                Вернуться к услугам
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const colorClasses = getColorClasses(service.color);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-accent-orange">Главная</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-accent-orange">Услуги</Link>
          <span>/</span>
          <span className="text-primary">{service.name}</span>
        </nav>

        {/* Back Button */}
        <Button variant="outline" className="mb-6" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к услугам
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Header */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 ${colorClasses.bg} rounded-2xl flex items-center justify-center`}>
                    <i className={`${service.icon} ${colorClasses.text} text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-primary mb-4">
                      {service.name}
                    </h1>
                    <p className="text-lg text-secondary leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center space-x-6 mt-6">
                      {service.price && (
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-5 h-5 text-accent-orange" />
                          <span className="font-semibold">{service.price}</span>
                        </div>
                      )}
                      {service.duration && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-accent-orange" />
                          <span className="font-semibold">{service.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Full Description */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Подробное описание</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-secondary leading-relaxed whitespace-pre-line">
                    {service.fullDescription}
                  </p>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Process Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Как проходит работа</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Консультация</h4>
                      <p className="text-secondary text-sm">
                        Обсуждаем ваши потребности и составляем техническое задание
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Планирование</h4>
                      <p className="text-secondary text-sm">
                        Разрабатываем план работ и согласовываем сроки выполнения
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Выполнение</h4>
                      <p className="text-secondary text-sm">
                        Реализуем проект с регулярными отчетами о ходе работ
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Сдача проекта</h4>
                      <p className="text-secondary text-sm">
                        Передаем готовый результат с гарантией качества
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price and Contact Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  {service.price && (
                    <div className="text-3xl font-bold text-primary mb-2">
                      {service.price}
                    </div>
                  )}
                  {service.duration && (
                    <div className="text-secondary">
                      Срок выполнения: {service.duration}
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <Button 
                    className="w-full bg-accent-orange hover:bg-orange-600"
                    onClick={() => setShowContactForm(true)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Заказать услугу
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Получить консультацию
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-secondary">Гарантия качества</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-secondary">Соблюдение сроков</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-secondary">Опытная команда</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            {showContactForm && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Заказать услугу
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowContactForm(false)}
                    >
                      ✕
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Ваше имя"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="+7 (812) 123-45-67"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">Дополнительная информация</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Расскажите о ваших требованиях"
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent-orange hover:bg-orange-600"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Отправка..." : "Отправить заявку"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
