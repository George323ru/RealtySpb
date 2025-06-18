import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSchema } from "@shared/schema";
import { 
  MapPin, 
  TreePine, 
  Home, 
  TrendingUp,
  CheckCircle,
  Phone,
  Hammer,
  Zap,
  Droplets,
  Wifi
} from "lucide-react";
import { z } from "zod";

const landFormSchema = insertLeadSchema.extend({
  landType: z.string().min(1, "Выберите тип участка"),
  landPurpose: z.string().min(1, "Выберите назначение"),
  landSize: z.string().min(1, "Выберите размер участка"),
  landLocation: z.string().min(1, "Выберите район"),
  budget: z.string().optional(),
});

type LandFormData = z.infer<typeof landFormSchema>;

export default function Land() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<LandFormData>({
    resolver: zodResolver(landFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceType: "land",
      landType: "",
      landPurpose: "",
      landSize: "",
      landLocation: "",
      budget: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LandFormData) => {
      return apiRequest("POST", "/api/leads", {
        ...data,
        message: `Земельный участок: ${data.landType}, ${data.landPurpose}, ${data.landSize}, район: ${data.landLocation}, бюджет: ${data.budget || 'не указан'}`
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Заявка отправлена!",
        description: "Мы подберем подходящие участки и свяжемся с вами.",
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

  const onSubmit = (data: LandFormData) => {
    mutation.mutate(data);
  };

  const landTypes = [
    { value: "igs", label: "ИЖС (индивидуальное жилищное строительство)" },
    { value: "snt", label: "СНТ (садовое некоммерческое товарищество)" },
    { value: "dacha", label: "Дачный участок" },
    { value: "commercial", label: "Коммерческий участок" },
    { value: "agricultural", label: "Сельскохозяйственный участок" }
  ];

  const purposes = [
    { value: "house", label: "Строительство дома" },
    { value: "dacha", label: "Дачное строительство" },
    { value: "garden", label: "Садоводство" },
    { value: "business", label: "Коммерческая деятельность" },
    { value: "investment", label: "Инвестиции" }
  ];

  const sizes = [
    { value: "small", label: "До 10 соток" },
    { value: "medium", label: "10-20 соток" },
    { value: "large", label: "20-50 соток" },
    { value: "xlarge", label: "Более 50 соток" }
  ];

  const locations = [
    "Всеволожский район",
    "Гатчинский район",
    "Приозерский район",
    "Выборгский район",
    "Кингисеппский район",
    "Ломоносовский район",
    "Тосненский район",
    "Лужский район"
  ];

  const services = [
    {
      title: "Подбор участков",
      description: "Найдем участки по вашим критериям и бюджету",
      icon: MapPin,
      features: ["База из 500+ участков", "Проверенные документы", "Выезд на участок"]
    },
    {
      title: "Юридическое сопровождение",
      description: "Полное правовое сопровождение сделки",
      icon: CheckCircle,
      features: ["Проверка документов", "Сопровождение сделки", "Гарантия чистоты"]
    },
    {
      title: "Подготовка к строительству",
      description: "Помощь в подготовке участка к застройке",
      icon: Hammer,
      features: ["Получение разрешений", "Подключение коммуникаций", "Топосъемка"]
    },
    {
      title: "Инвестиционный анализ",
      description: "Оценка инвестиционного потенциала участка",
      icon: TrendingUp,
      features: ["Анализ роста цен", "Прогноз развития района", "ROI расчет"]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-emerald-600 py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <TreePine className="w-16 h-16 mx-auto mb-6 text-orange-400" />
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Земельные{" "}
              <span className="text-orange-400">участки</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90">
              Профессиональные услуги по подбору и оформлению земельных участков в Ленинградской области
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                <div className="text-lg font-semibold mb-1">500+ участков</div>
                <div className="text-sm">В нашей базе данных</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                <div className="text-lg font-semibold mb-1">Проверенные документы</div>
                <div className="text-sm">Юридическая чистота</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                <div className="text-lg font-semibold mb-1">Выгодные цены</div>
                <div className="text-sm">Без переплат</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-8">
              Подберем участок по вашим требованиям
            </h2>
            
            {isSubmitted ? (
              <Card className="p-8 text-center">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Заявка отправлена!
                </h3>
                <p className="text-text-secondary mb-4">
                  Мы подберем подходящие участки и свяжемся с вами в течение часа
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                >
                  Подать новую заявку
                </Button>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Заявка на подбор участка</CardTitle>
                </CardHeader>
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

                      <FormField
                        control={form.control}
                        name="landType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Тип участка</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите тип участка" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {landTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="landPurpose"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Назначение</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите назначение" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {purposes.map((purpose) => (
                                    <SelectItem key={purpose.value} value={purpose.value}>
                                      {purpose.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="landSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Размер участка</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите размер" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {sizes.map((size) => (
                                    <SelectItem key={size.value} value={size.value}>
                                      {size.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="landLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Район</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите район" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {locations.map((location) => (
                                    <SelectItem key={location} value={location}>
                                      {location}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Бюджет (необязательно)</FormLabel>
                              <FormControl>
                                <Input placeholder="Ваш бюджет в рублях" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {mutation.isPending ? "Отправляем заявку..." : "Подобрать участок"}
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
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-12">
              Полный спектр услуг по земельным участкам
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                        <service.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                          {service.title}
                        </h3>
                        <p className="text-text-secondary mb-4">
                          {service.description}
                        </p>
                        <div className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-sm text-text-secondary">{feature}</span>
                            </div>
                          ))}
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

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-12">
              Что важно при выборе участка?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Zap className="w-8 h-8 text-orange-500 mr-3" />
                    <h3 className="text-xl font-semibold text-text-primary">Электроэнергия</h3>
                  </div>
                  <p className="text-text-secondary">
                    Проверяем возможность подключения к электросетям, 
                    мощность и стоимость подключения
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Droplets className="w-8 h-8 text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold text-text-primary">Водоснабжение</h3>
                  </div>
                  <p className="text-text-secondary">
                    Наличие центрального водоснабжения или возможность 
                    бурения скважины на участке
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Home className="w-8 h-8 text-green-500 mr-3" />
                    <h3 className="text-xl font-semibold text-text-primary">Транспорт</h3>
                  </div>
                  <p className="text-text-secondary">
                    Удобство транспортного сообщения с городом, 
                    качество дорог и близость к магистралям
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Wifi className="w-8 h-8 text-purple-500 mr-3" />
                    <h3 className="text-xl font-semibold text-text-primary">Интернет</h3>
                  </div>
                  <p className="text-text-secondary">
                    Возможность подключения высокоскоростного интернета 
                    для комфортной жизни и работы
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Готовы найти идеальный участок?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Оставьте заявку и получите персональную подборку участков уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => {
                  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Подобрать участок
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                +7 (812) 123-45-67
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}