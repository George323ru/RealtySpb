import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, ArrowLeft, ArrowRight, User, Clock, Target, Phone } from "lucide-react";
import { z } from "zod";

const realtorRequestSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  gender: z.string().min(1, "Выберите пол"),
  ageRange: z.string().min(1, "Выберите возрастную категорию"),
  experienceLevel: z.string().min(1, "Выберите уровень опыта"),
  serviceType: z.string().min(1, "Выберите тип услуги"),
});

type RealtorRequestData = z.infer<typeof realtorRequestSchema>;

export default function RealtorConstructor() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const totalSteps = 4;
  
  const form = useForm<RealtorRequestData>({
    resolver: zodResolver(realtorRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      gender: "",
      ageRange: "",
      experienceLevel: "",
      serviceType: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: RealtorRequestData) => {
      const response = await apiRequest("POST", "/api/leads", {
        ...data,
        serviceType: "подбор специалиста",
        source: "realtor-constructor",
      });
      return response.json();
    },
    onSuccess: () => {
      setIsCompleted(true);
      toast({
        title: "Заявка отправлена!",
        description: "Мы подберем для вас идеального специалиста и свяжемся в течение часа.",
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

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: RealtorRequestData) => {
    mutation.mutate(data);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              🎉 Отлично! Заявка отправлена
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Мы уже подбираем для вас идеального специалиста и свяжемся в течение часа
            </p>
            <Button 
              onClick={() => {setIsCompleted(false); setCurrentStep(1); form.reset();}}
              className="bg-accent-orange text-white hover:bg-orange-600 px-8 py-3 rounded-xl"
            >
              Подобрать еще одного специалиста
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const stepTitles = [
    "Выберите пол специалиста",
    "Укажите возраст",
    "Выберите опыт работы",
    "Ваши контакты"
  ];

  const stepEmojis = ["👤", "🎂", "💼", "📞"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              🎯 Конструктор специалиста
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-6">
              Найдем идеального риэлтора за 2 минуты
            </p>
            
            {/* Progress Bar */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      step <= currentStep 
                        ? 'bg-accent-orange text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {step <= currentStep ? stepEmojis[step - 1] : step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-2 mx-2 rounded-full ${
                        step < currentStep ? 'bg-accent-orange' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                {stepTitles[currentStep - 1]}
              </h2>
              <p className="text-text-secondary">
                Шаг {currentStep} из {totalSteps}
              </p>
            </div>
          </div>

          <Card className="bg-white shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Step 1: Gender Selection */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                              >
                                <div className="relative">
                                  <RadioGroupItem value="мужской" id="male" className="sr-only" />
                                  <Label 
                                    htmlFor="male"
                                    className={`flex flex-col items-center p-8 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                                      field.value === "мужской" 
                                        ? 'border-accent-orange bg-orange-50 shadow-lg' 
                                        : 'border-gray-200 hover:border-orange-300'
                                    }`}
                                  >
                                    <div className="text-6xl mb-4">👨‍💼</div>
                                    <span className="text-xl font-semibold">Мужчина</span>
                                    <span className="text-sm text-gray-500 mt-2">Предпочитаю мужчину-риэлтора</span>
                                  </Label>
                                </div>
                                <div className="relative">
                                  <RadioGroupItem value="женский" id="female" className="sr-only" />
                                  <Label 
                                    htmlFor="female"
                                    className={`flex flex-col items-center p-8 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                                      field.value === "женский" 
                                        ? 'border-accent-orange bg-orange-50 shadow-lg' 
                                        : 'border-gray-200 hover:border-orange-300'
                                    }`}
                                  >
                                    <div className="text-6xl mb-4">👩‍💼</div>
                                    <span className="text-xl font-semibold">Женщина</span>
                                    <span className="text-sm text-gray-500 mt-2">Предпочитаю женщину-риэлтора</span>
                                  </Label>
                                </div>
                                <div className="relative md:col-span-2">
                                  <RadioGroupItem value="не важно" id="any" className="sr-only" />
                                  <Label 
                                    htmlFor="any"
                                    className={`flex flex-col items-center p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                                      field.value === "не важно" 
                                        ? 'border-accent-orange bg-orange-50 shadow-lg' 
                                        : 'border-gray-200 hover:border-orange-300'
                                    }`}
                                  >
                                    <div className="text-4xl mb-2">🤝</div>
                                    <span className="text-lg font-semibold">Не важно</span>
                                    <span className="text-sm text-gray-500">Главное - профессионализм</span>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 2: Age Range */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="ageRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                              >
                                <div className="relative">
                                  <RadioGroupItem value="25-35" id="young" className="sr-only" />
                                  <Label 
                                    htmlFor="young"
                                    className={`flex flex-col items-center p-8 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                                      field.value === "25-35" 
                                        ? 'border-accent-orange bg-orange-50 shadow-lg' 
                                        : 'border-gray-200 hover:border-orange-300'
                                    }`}
                                  >
                                    <div className="text-6xl mb-4">🌟</div>
                                    <span className="text-xl font-semibold">25-35 лет</span>
                                    <span className="text-sm text-gray-500 mt-2">Энергичный молодой специалист</span>
                                  </Label>
                                </div>
                                <div className="relative">
                                  <RadioGroupItem value="35-45" id="experienced" className="sr-only" />
                                  <Label 
                                    htmlFor="experienced"
                                    className={`flex flex-col items-center p-8 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                                      field.value === "35-45" 
                                        ? 'border-accent-orange bg-orange-50 shadow-lg' 
                                        : 'border-gray-200 hover:border-orange-300'
                                    }`}
                                  >
                                    <div className="text-6xl mb-4">💼</div>
                                    <span className="text-xl font-semibold">35-45 лет</span>
                                    <span className="text-sm text-gray-500 mt-2">Опытный профессионал</span>
                                  </Label>
                                </div>
                                <div className="relative">
                                  <RadioGroupItem value="45+" id="senior" className="sr-only" />
                                  <Label 
                                    htmlFor="senior"
                                    className={`flex flex-col items-center p-8 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                                      field.value === "45+" 
                                        ? 'border-accent-orange bg-orange-50 shadow-lg' 
                                        : 'border-gray-200 hover:border-orange-300'
                                    }`}
                                  >
                                    <div className="text-6xl mb-4">🎓</div>
                                    <span className="text-xl font-semibold">45+ лет</span>
                                    <span className="text-sm text-gray-500 mt-2">Мудрый наставник</span>
                                  </Label>
                                </div>
                                <div className="relative">
                                  <RadioGroupItem value="любой" id="anyAge" className="sr-only" />
                                  <Label 
                                    htmlFor="anyAge"
                                    className={`flex flex-col items-center p-8 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                                      field.value === "любой" 
                                        ? 'border-accent-orange bg-orange-50 shadow-lg' 
                                        : 'border-gray-200 hover:border-orange-300'
                                    }`}
                                  >
                                    <div className="text-6xl mb-4">🤷‍♂️</div>
                                    <span className="text-xl font-semibold">Любой возраст</span>
                                    <span className="text-sm text-gray-500 mt-2">Возраст не важен</span>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 3: Experience Level */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-1 gap-4"
                              >
                                <div className="relative">
                                  <RadioGroupItem value="новичок" id="beginner" className="sr-only" />
                                  <Label 
                                    htmlFor="beginner"
                                    className={`flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                                      field.value === "новичок" 
                                        ? 'border-accent-orange bg-orange-50 shadow-lg' 
                                        : 'border-gray-200 hover:border-orange-300'
                                    }`}
                                  >
                                    <div className="text-4xl mr-6">🌱</div>
                                    <div>
                                      <span className="text-xl font-semibold block">Новичок (1-3 года)</span>
                                      <span className="text-sm text-gray-500">Молодой специалист, готов больше времени уделить моей сделке</span>
                                    </div>
                                  </Label>
                                </div>
                                <div className="relative">
                                  <RadioGroupItem value="опытный" id="experienced-pro" className="sr-only" />
                                  <Label 
                                    htmlFor="experienced-pro"
                                    className={`flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                                      field.value === "опытный" 
                                        ? 'border-accent-orange bg-orange-50 shadow-lg' 
                                        : 'border-gray-200 hover:border-orange-300'
                                    }`}
                                  >
                                    <div className="text-4xl mr-6">⭐</div>
                                    <div>
                                      <span className="text-xl font-semibold block">Опытный (3-7 лет)</span>
                                      <span className="text-sm text-gray-500">Проверенный профессионал с хорошим портфолио</span>
                                    </div>
                                  </Label>
                                </div>
                                <div className="relative">
                                  <RadioGroupItem value="эксперт" id="expert" className="sr-only" />
                                  <Label 
                                    htmlFor="expert"
                                    className={`flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                                      field.value === "эксперт" 
                                        ? 'border-accent-orange bg-orange-50 shadow-lg' 
                                        : 'border-gray-200 hover:border-orange-300'
                                    }`}
                                  >
                                    <div className="text-4xl mr-6">👑</div>
                                    <div>
                                      <span className="text-xl font-semibold block">Эксперт (7+ лет)</span>
                                      <span className="text-sm text-gray-500">Топ-риэлтор с безупречной репутацией</span>
                                    </div>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 4: Contact Information */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <div className="text-6xl mb-4">📞</div>
                        <h3 className="text-2xl font-bold text-text-primary mb-2">Почти готово!</h3>
                        <p className="text-text-secondary">Укажите контакты, чтобы мы могли связаться с вами</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-semibold">Ваше имя</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Введите ваше имя" 
                                  className="h-12 text-lg rounded-xl border-2 focus:border-accent-orange"
                                  {...field} 
                                />
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
                              <FormLabel className="text-lg font-semibold">Телефон</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="+7 (___) ___-__-__" 
                                  className="h-12 text-lg rounded-xl border-2 focus:border-accent-orange"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-semibold">Что планируете делать?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                              >
                                {[
                                  { value: "купить", label: "Купить недвижимость", emoji: "🏠" },
                                  { value: "продать", label: "Продать недвижимость", emoji: "💰" },
                                  { value: "сдать", label: "Сдать в аренду", emoji: "🔑" },
                                  { value: "консультация", label: "Получить консультацию", emoji: "💬" }
                                ].map((option) => (
                                  <div key={option.value} className="relative">
                                    <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                                    <Label 
                                      htmlFor={option.value}
                                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                                        field.value === option.value 
                                          ? 'border-accent-orange bg-orange-50' 
                                          : 'border-gray-200 hover:border-orange-300'
                                      }`}
                                    >
                                      <div className="text-2xl mr-4">{option.emoji}</div>
                                      <span className="font-medium">{option.label}</span>
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="px-6 py-3 rounded-xl"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Назад
                    </Button>
                    
                    {currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-accent-orange text-white hover:bg-orange-600 px-6 py-3 rounded-xl"
                      >
                        Далее
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="bg-accent-orange text-white hover:bg-orange-600 px-8 py-3 rounded-xl"
                      >
                        {mutation.isPending ? "Отправляем..." : "🎉 Найти специалиста!"}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}