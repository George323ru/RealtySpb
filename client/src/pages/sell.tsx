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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";
import { 
  DollarSign, 
  Calculator, 
  FileText, 
  Users, 
  CheckCircle, 
  TrendingUp,
  Camera,
  Shield,
  Clock,
  Award
} from "lucide-react";

const sellFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
});

type SellFormData = z.infer<typeof sellFormSchema>;

export default function Sell() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<SellFormData>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      name: "",
      phone: "",

    },
  });

  const mutation = useMutation({
    mutationFn: async (data: SellFormData) => {
      return apiRequest("POST", "/api/leads", {
        ...data,
        serviceType: "продать",
        source: "sell-page",
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами для оценки недвижимости.",
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

  const onSubmit = (data: SellFormData) => {
    mutation.mutate(data);
  };

  const advantages = [
    {
      icon: Calculator,
      title: "Бесплатная оценка",
      description: "Точная рыночная стоимость вашей недвижимости"
    },
    {
      icon: Camera,
      title: "Профессиональная съемка",
      description: "Качественные фото и виртуальные туры"
    },
    {
      icon: Users,
      title: "Активный поиск покупателей",
      description: "Более 10 000 клиентов в нашей базе"
    },
    {
      icon: Shield,
      title: "Юридическая безопасность",
      description: "Полная проверка документов и сопровождение сделки"
    },
    {
      icon: Clock,
      title: "Быстрая продажа",
      description: "Средний срок продажи 45 дней"
    },
    {
      icon: Award,
      title: "Максимальная цена",
      description: "Получите на 15% больше рыночной стоимости"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Оценка недвижимости",
      description: "Бесплатная оценка рыночной стоимости вашего объекта",
      color: "bg-blue-500"
    },
    {
      number: "02", 
      title: "Подготовка к продаже",
      description: "Подготовка документов, фотосъемка, создание презентации",
      color: "bg-green-500"
    },
    {
      number: "03",
      title: "Размещение и реклама",
      description: "Размещение на всех площадках и активное продвижение",
      color: "bg-purple-500"
    },
    {
      number: "04",
      title: "Показы и переговоры",
      description: "Организация показов и ведение переговоров с покупателями",
      color: "bg-orange-500"
    },
    {
      number: "05",
      title: "Сделка",
      description: "Оформление сделки и передача ключей новому владельцу",
      color: "bg-accent-orange"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-900 to-green-700 py-20">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Продать квартиру в СПб{" "}
              <span className="text-yandex-yellow">выгодно</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90">
              Получите максимальную стоимость за вашу недвижимость. Бесплатная оценка и полное сопровождение сделки.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-yandex-yellow mb-2">15%</div>
                <div className="text-sm">Выше рыночной цены</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-yandex-yellow mb-2">45</div>
                <div className="text-sm">Дней средний срок</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-yandex-yellow mb-2">100%</div>
                <div className="text-sm">Юридическая чистота</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evaluation Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Получите бесплатную оценку недвижимости
              </h2>
              <p className="text-lg text-text-secondary">
                Заполните форму и узнайте точную рыночную стоимость вашего объекта
              </p>
            </div>

            {isSubmitted ? (
              <Card className="p-12 text-center">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Заявка отправлена!
                </h3>
                <p className="text-text-secondary">
                  Наш специалист свяжется с вами в течение 30 минут для проведения оценки.
                </p>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Форма оценки недвижимости</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg font-semibold"
                      >
                        {mutation.isPending ? "Отправляем..." : "Получить бесплатную оценку"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Почему выбирают нас для продажи
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Наш опыт и профессиональный подход помогают продать недвижимость быстро и выгодно
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <advantage.icon className="w-8 h-8 text-green-500" />
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Процесс продажи
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Пошаговый план работы для успешной продажи вашей недвижимости
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 flex-shrink-0`}>
                  {step.number}
                </div>
                <div className="flex-1">
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Готовы продать недвижимость?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Получите бесплатную консультацию и узнайте точную стоимость вашего объекта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-green-600 hover:bg-neutral-100 px-8 py-3 text-lg font-semibold">
                Узнать стоимость
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg font-semibold"
              >
                Позвонить сейчас
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
