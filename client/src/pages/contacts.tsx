import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSchema } from "@shared/schema";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Car,
  Bus,
  Building,
  MessageCircle,
  Send
} from "lucide-react";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contacts() {
  // Schema.org микроразметка для контактной информации
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Риэлтор в СПб",
    "url": "https://realtorvspb.ru",
    "telephone": "+7 (812) 123-45-67",
    "email": "info@realtorvspb.ru",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Невский проспект, 15, БЦ \"Северная Столица\", 5 этаж",
      "addressLocality": "Санкт-Петербург",
      "addressCountry": "RU"
    },
    "openingHours": "Mo-Su 09:00-21:00",
    "areaServed": "Санкт-Петербург"
  };
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/leads", {
        ...data,
        serviceType: "консультация",
        source: "contacts-page",
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Сообщение отправлено!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  const officeInfo = {
    address: "Невский проспект, 15",
    building: 'БЦ "Северная Столица", 5 этаж',
    phone: "+7 (812) 123-45-67",
    email: "info@spb-realty.ru",
    workHours: "Пн-Вс: 9:00-21:00",
    metro: "м. Невский проспект",
    parking: "Подземная парковка"
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      link: "https://wa.me/78121234567",
      color: "text-green-600 hover:bg-green-50"
    },
    {
      name: "Telegram",
      icon: Send,
      link: "https://t.me/spb_realty",
      color: "text-blue-600 hover:bg-blue-50"
    },
    {
      name: "VKontakte",
      icon: MessageCircle,
      link: "https://vk.com/spb_realty",
      color: "text-blue-700 hover:bg-blue-50"
    }
  ];

  const departments = [
    {
      name: "Отдел продаж",
      phone: "+7 (812) 123-45-67",
      email: "sales@spb-realty.ru",
      description: "Покупка и продажа недвижимости"
    },
    {
      name: "Отдел аренды",
      phone: "+7 (812) 123-45-68",
      email: "rent@spb-realty.ru",
      description: "Сдача и аренда недвижимости"
    },
    {
      name: "Дополнительные услуги",
      phone: "+7 (812) 123-45-69",
      email: "services@spb-realty.ru",
      description: "Ремонт, дизайн, юридические услуги"
    },
    {
      name: "Техническая поддержка",
      phone: "+7 (812) 123-45-70",
      email: "support@spb-realty.ru",
      description: "Помощь с сайтом и онлайн-сервисами"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Микроразметка Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-900 via-cyan-900 to-blue-900 py-20 min-h-[70vh] flex items-center">
        {/* Enhanced Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        
        {/* Background Image with Enhanced Contrast */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920')"}}
        ></div>
        
        {/* Additional Gradient Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-transparent to-blue-900/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Enhanced Typography with Better Contrast */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-2xl">
              Свяжитесь{" "}
              <span className="text-yandex-yellow drop-shadow-lg">с нами</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-12 font-light text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Мы готовы ответить на все ваши вопросы и помочь с любыми задачами в сфере недвижимости
            </p>
            
            {/* Enhanced Contact Cards with Better Visibility */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <Phone className="w-10 h-10 mx-auto mb-4 text-yandex-yellow drop-shadow-lg" />
                <div className="text-lg font-semibold mb-2 text-white/95">Телефон</div>
                <div className="text-base text-white/90">{officeInfo.phone}</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <Mail className="w-10 h-10 mx-auto mb-4 text-yandex-yellow drop-shadow-lg" />
                <div className="text-lg font-semibold mb-2 text-white/95">Email</div>
                <div className="text-base text-white/90">{officeInfo.email}</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <Clock className="w-10 h-10 mx-auto mb-4 text-yandex-yellow drop-shadow-lg" />
                <div className="text-lg font-semibold mb-2 text-white/95">Режим работы</div>
                <div className="text-base text-white/90">{officeInfo.workHours}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                  Написать нам
                </h2>
                
                {isSubmitted ? (
                  <Card className="p-8 text-center">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      Сообщение отправлено!
                    </h3>
                    <p className="text-text-secondary">
                      Мы свяжемся с вами в ближайшее время.
                    </p>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-8">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Ваше имя</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Как к вам обращаться?" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Телефон</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+7 (___) ___-__-__" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>



                          <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 text-lg font-semibold"
                          >
                            {mutation.isPending ? "Отправляем..." : "Отправить сообщение"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Office Info */}
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-6">
                  Наш офис
                </h2>
                
                <Card className="mb-6">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <MapPin className="w-6 h-6 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-text-primary mb-1">Адрес</div>
                          <div className="text-text-secondary">{officeInfo.address}</div>
                          <div className="text-text-secondary text-sm">{officeInfo.building}</div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="w-6 h-6 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-text-primary mb-1">Телефон</div>
                          <a href={`tel:${officeInfo.phone}`} className="text-text-secondary hover:text-teal-500">
                            {officeInfo.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Mail className="w-6 h-6 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-text-primary mb-1">Email</div>
                          <a href={`mailto:${officeInfo.email}`} className="text-text-secondary hover:text-teal-500">
                            {officeInfo.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="w-6 h-6 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-text-primary mb-1">Режим работы</div>
                          <div className="text-text-secondary">{officeInfo.workHours}</div>
                          <div className="text-text-secondary text-sm">Без выходных</div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Bus className="w-6 h-6 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-text-primary mb-1">Как добраться</div>
                          <div className="text-text-secondary">{officeInfo.metro}</div>
                          <div className="text-text-secondary text-sm">5 минут пешком от метро</div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Car className="w-6 h-6 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-text-primary mb-1">Парковка</div>
                          <div className="text-text-secondary">{officeInfo.parking}</div>
                          <div className="text-text-secondary text-sm">Первые 2 часа бесплатно</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Мы в соцсетях</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex flex-col items-center p-4 rounded-lg border-2 border-neutral-200 hover:border-current transition-colors ${social.color}`}
                        >
                          <social.icon className="w-8 h-8 mb-2" />
                          <span className="text-sm font-medium">{social.name}</span>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Отделы и специалисты
              </h2>
              <p className="text-lg text-text-secondary">
                Свяжитесь напрямую с нужным отделом для быстрого решения вопроса
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Building className="w-8 h-8 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary mb-2">
                          {dept.name}
                        </h3>
                        <p className="text-text-secondary text-sm mb-4">
                          {dept.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 text-teal-500 mr-2" />
                            <a href={`tel:${dept.phone}`} className="text-text-secondary hover:text-teal-500 text-sm">
                              {dept.phone}
                            </a>
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-teal-500 mr-2" />
                            <a href={`mailto:${dept.email}`} className="text-text-secondary hover:text-teal-500 text-sm">
                              {dept.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Как нас найти
              </h2>
              <p className="text-lg text-text-secondary">
                Мы находимся в самом центре Санкт-Петербурга
              </p>
            </div>

            <Card className="overflow-hidden">
              <div className="h-96 bg-neutral-200 flex items-center justify-center">
                <div className="text-center text-text-secondary">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Интерактивная карта</h3>
                  <p className="mb-4">{officeInfo.address}</p>
                  <p className="text-sm">{officeInfo.building}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Нужна срочная консультация?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Позвоните нам прямо сейчас или напишите в мессенджер
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-teal-600 hover:bg-neutral-100 px-8 py-3 text-lg font-semibold"
                onClick={() => window.location.href = `tel:${officeInfo.phone}`}
              >
                <Phone className="w-5 h-5 mr-2" />
                Позвонить сейчас
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 text-lg font-semibold"
                onClick={() => window.open('https://wa.me/78121234567', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
