import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSchema } from "@shared/schema";
import { 
  User, 
  Users, 
  Award, 
  Clock, 
  CheckCircle,
  Phone
} from "lucide-react";
import { z } from "zod";

const realtorConstructorSchema = insertLeadSchema.extend({
  realtorGender: z.string().min(1, "Выберите пол риэлтора"),
  realtorAge: z.string().min(1, "Выберите возраст риэлтора"), 
  realtorExperience: z.string().min(1, "Выберите опыт работы"),
  realtorServices: z.array(z.string()).min(1, "Выберите хотя бы одну услугу"),
});

type RealtorConstructorData = z.infer<typeof realtorConstructorSchema>;

export default function RealtorConstructor() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<RealtorConstructorData>({
    resolver: zodResolver(realtorConstructorSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceType: "realtor-constructor",
      realtorGender: "",
      realtorAge: "",
      realtorExperience: "",
      realtorServices: [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: RealtorConstructorData) => {
      return apiRequest("POST", "/api/leads", {
        ...data,
        message: `Конструктор риэлтора: ${data.realtorGender}, ${data.realtorAge}, опыт ${data.realtorExperience}, услуги: ${data.realtorServices.join(', ')}`
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Заявка отправлена!",
        description: "Мы найдем подходящего риэлтора и свяжемся с вами.",
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

  const onSubmit = (data: RealtorConstructorData) => {
    mutation.mutate(data);
  };

  const services = [
    "Покупка квартиры",
    "Продажа квартиры", 
    "Аренда квартиры",
    "Покупка новостройки",
    "Коммерческая недвижимость",
    "Земельные участки",
    "Юридическое сопровождение",
    "Оценка недвижимости",
    "Ипотечное консультирование",
    "Дизайн и ремонт"
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <User className="w-16 h-16 mx-auto mb-6 text-orange-400" />
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Конструктор{" "}
              <span className="text-orange-400">риэлтора</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90">
              Опишите идеального специалиста, и мы найдем именно такого риэлтора для ваших задач
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                <div className="text-lg font-semibold mb-1">Персональный подбор</div>
                <div className="text-sm">По вашим критериям</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <Award className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                <div className="text-lg font-semibold mb-1">Проверенные специалисты</div>
                <div className="text-sm">Только опытные риэлторы</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <Clock className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                <div className="text-lg font-semibold mb-1">Быстрый подбор</div>
                <div className="text-sm">Ответ в течение 30 минут</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Constructor Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <Card className="p-8 text-center">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Заявка отправлена!
                </h3>
                <p className="text-text-secondary mb-4">
                  Мы подберем риэлтора по вашим критериям и свяжемся с вами в течение 30 минут
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                >
                  Создать новую заявку
                </Button>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Создайте портрет идеального риэлтора
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Contact Info */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-text-primary">
                          Ваши контактные данные
                        </h3>
                        
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
                      </div>

                      {/* Realtor Preferences */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-text-primary">
                          Предпочтения по риэлтору
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="realtorGender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Пол</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Выберите пол" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="male">Мужчина</SelectItem>
                                    <SelectItem value="female">Женщина</SelectItem>
                                    <SelectItem value="any">Не важно</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="realtorAge"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Возраст</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Выберите возраст" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="young">До 30 лет</SelectItem>
                                    <SelectItem value="middle">30-45 лет</SelectItem>
                                    <SelectItem value="senior">45+ лет</SelectItem>
                                    <SelectItem value="any">Не важно</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="realtorExperience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Опыт работы</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Выберите опыт" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="junior">До 2 лет</SelectItem>
                                    <SelectItem value="middle">2-5 лет</SelectItem>
                                    <SelectItem value="senior">5-10 лет</SelectItem>
                                    <SelectItem value="expert">Более 10 лет</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Services */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-text-primary">
                          Необходимые услуги
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="realtorServices"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {services.map((service) => (
                                  <FormField
                                    key={service}
                                    control={form.control}
                                    name="realtorServices"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={service}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(service)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, service])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== service
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-normal">
                                            {service}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {mutation.isPending ? "Отправляем заявку..." : "Найти риэлтора"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-12">
              Почему персональный подбор риэлтора эффективнее?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-orange-500 mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    Учет личных предпочтений
                  </h3>
                  <p className="text-text-secondary">
                    Мы подбираем риэлтора, с которым вам будет комфортно работать, 
                    учитывая ваши пожелания по полу, возрасту и стилю общения
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-orange-500 mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    Специализация по услугам
                  </h3>
                  <p className="text-text-secondary">
                    Риэлтор будет специализироваться именно на тех услугах, 
                    которые вам нужны, что гарантирует высокое качество работы
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Clock className="w-12 h-12 text-orange-500 mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    Экономия времени
                  </h3>
                  <p className="text-text-secondary">
                    Не нужно тратить время на поиск и собеседования - 
                    мы сразу предоставим подходящего специалиста
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <CheckCircle className="w-12 h-12 text-orange-500 mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    Гарантия результата
                  </h3>
                  <p className="text-text-secondary">
                    Если риэлтор вам не подойдет, мы бесплатно подберем другого 
                    специалиста в соответствии с вашими требованиями
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}