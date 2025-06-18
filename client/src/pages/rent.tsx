import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";
import { 
  Key, 
  Shield, 
  Users, 
  Calculator, 
  FileText, 
  TrendingUp,
  CheckCircle,
  Clock,
  Search,
  Star
} from "lucide-react";

const rentFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
});

type RentFormData = z.infer<typeof rentFormSchema>;

export default function Rent() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<RentFormData>({
    resolver: zodResolver(rentFormSchema),
    defaultValues: {
      name: "",
      phone: "",

    },
  });

  const mutation = useMutation({
    mutationFn: async (data: RentFormData) => {
      return apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Заявка отправлена!",
        description: "Мы поможем найти надежных арендаторов для вашей недвижимости.",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RentFormData) => {
    mutation.mutate(data);
  };

  const services = [
    {
      icon: Search,
      title: "Поиск арендаторов",
      description: "Подбираем проверенных арендаторов с постоянным доходом",
      features: ["Проверка платежеспособности", "Анализ кредитной истории", "Рекомендации с предыдущих мест"]
    },
    {
      icon: FileText,
      title: "Оформление документов",
      description: "Составляем договор аренды с учетом ваших интересов",
      features: ["Юридически грамотный договор", "Акт приема-передачи", "Регистрация договора"]
    },
    {
      icon: Shield,
      title: "Гарантии безопасности",
      description: "Обеспечиваем защиту ваших интересов и имущества",
      features: ["Страхование имущества", "Залоговый депозит", "Контроль состояния объекта"]
    },
    {
      icon: Calculator,
      title: "Управление арендой",
      description: "Полное управление арендными отношениями",
      features: ["Контроль платежей", "Ведение отчетности", "Решение спорных вопросов"]
    }
  ];

  const advantages = [
    "Быстрый поиск арендаторов (в среднем 14 дней)",
    "Проверенная база арендаторов",
    "Юридическое сопровождение сделки",
    "Гарантия получения арендной платы",
    "Контроль состояния имущества",
    "Помощь в решении спорных ситуаций"
  ];

  const stats = [
    { value: "2000+", label: "Довольных арендодателей" },
    { value: "98%", label: "Успешных сделок" },
    { value: "14", label: "Дней средний поиск" },
    { value: "24/7", label: "Поддержка клиентов" }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 to-purple-700 py-20">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Сдайте недвижимость{" "}
              <span className="text-yandex-yellow">выгодно</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90">
              Найдем надежных арендаторов и обеспечим стабильный доход от вашей недвижимости
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-yandex-yellow mb-2">{stat.value}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rent Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Подать объект в аренду
              </h2>
              <p className="text-lg text-text-secondary">
                Заполните форму и мы найдем арендаторов для вашей недвижимости
              </p>
            </div>

            {isSubmitted ? (
              <Card className="p-12 text-center">
                <div className="text-purple-500 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Заявка принята!
                </h3>
                <p className="text-text-secondary">
                  Наш специалист свяжется с вами для обсуждения деталей сдачи в аренду.
                </p>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Заявка на сдачу в аренду</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="propertyType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Тип недвижимости</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите тип" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="квартира">Квартира</SelectItem>
                                  <SelectItem value="дом">Дом</SelectItem>
                                  <SelectItem value="коммерческая">Коммерческое помещение</SelectItem>
                                  <SelectItem value="офис">Офис</SelectItem>
                                  <SelectItem value="склад">Склад</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Адрес</FormLabel>
                              <FormControl>
                                <Input placeholder="Адрес объекта" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="desiredRent"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Желаемая арендная плата</FormLabel>
                              <FormControl>
                                <Input placeholder="Сумма в месяц (₽)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

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

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email (необязательно)</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Дополнительная информация</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Особенности объекта, требования к арендаторам..."
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 text-lg font-semibold"
                      >
                        {mutation.isPending ? "Отправляем..." : "Найти арендаторов"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Наши услуги по аренде
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Полный спектр услуг для успешной сдачи недвижимости в аренду
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <service.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary mb-2">
                        {service.title}
                      </h3>
                      <p className="text-text-secondary mb-4">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-text-secondary">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Преимущества работы с нами
              </h2>
              <p className="text-lg text-text-secondary">
                Почему более 2000 арендодателей доверяют нам свою недвижимость
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-center p-4 bg-neutral-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-text-primary">{advantage}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 text-lg font-semibold">
                Начать сотрудничество
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Готовы сдать недвижимость в аренду?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Получите консультацию и узнайте, сколько вы можете заработать на аренде
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-purple-600 hover:bg-neutral-100 px-8 py-3 text-lg font-semibold">
                Рассчитать доходность
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg font-semibold"
              >
                Задать вопрос
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
