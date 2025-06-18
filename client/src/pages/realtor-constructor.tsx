import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Clock, 
  Star, 
  Briefcase, 
  Phone, 
  MessageCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Users,
  Home as HomeIcon,
  Building,
  MapPin
} from "lucide-react";

const realtorRequestSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  serviceType: z.string().min(1, "Выберите тип услуги"),
  propertyType: z.string().optional(),
  budget: z.string().optional(),
  preferences: z.object({
    gender: z.string().optional(),
    experience: z.string().optional(),
    specialization: z.array(z.string()).optional(),
    rating: z.string().optional(),
  }),
});

type RealtorRequestData = z.infer<typeof realtorRequestSchema>;

export default function RealtorConstructor() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    gender: "",
    experience: "",
    specialization: [] as string[],
    rating: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<RealtorRequestData>({
    resolver: zodResolver(realtorRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceType: "",
      propertyType: "",
      budget: "",
      preferences: preferences,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: RealtorRequestData) => {
      const leadData = {
        ...data,
        source: "realtor_constructor",
        preferences: JSON.stringify(data.preferences),
      };
      return apiRequest("/api/leads", {
        method: "POST",
        body: JSON.stringify(leadData),
      });
    },
    onSuccess: () => {
      toast({
        title: "Заявка отправлена!",
        description: "Подходящий специалист свяжется с вами в ближайшее время",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      setStep(4); // Success step
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RealtorRequestData) => {
    const finalData = {
      ...data,
      preferences: preferences,
    };
    mutation.mutate(finalData);
  };

  const handleSpecializationChange = (specialization: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      specialization: checked 
        ? [...prev.specialization, specialization]
        : prev.specialization.filter(s => s !== specialization)
    }));
  };

  const serviceTypes = [
    { value: "купить", label: "Хочу купить недвижимость", icon: HomeIcon },
    { value: "продать", label: "Хочу продать недвижимость", icon: Building },
    { value: "сдать", label: "Хочу сдать в аренду", icon: MapPin },
    { value: "консультация", label: "Нужна консультация", icon: MessageCircle },
  ];

  const propertyTypes = [
    "Квартира",
    "Дом",
    "Коммерческая недвижимость",
    "Земельный участок",
    "Гараж",
    "Машиноместо",
  ];

  const specializations = [
    "Квартиры",
    "Элитная недвижимость",
    "Новостройки",
    "Коммерческая недвижимость",
    "Загородная недвижимость",
    "Инвестиции",
    "Юридическое сопровождение",
    "Ипотечное кредитование",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Подбор специалиста
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Ответьте на несколько вопросов, и мы найдем идеального риэлтора для ваших задач
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center ${stepNumber < 3 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= stepNumber
                        ? 'bg-accent-orange text-white'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {step > stepNumber ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        step > stepNumber ? 'bg-accent-orange' : 'bg-neutral-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-text-secondary">
              <span>Требования</span>
              <span>Предпочтения</span>
              <span>Контакты</span>
            </div>
          </div>

          <Card className="bg-white shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Step 1: Service Requirements */}
                {step === 1 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary mb-6">
                        Какая услуга вам нужна?
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {serviceTypes.map((service) => (
                          <Card
                            key={service.value}
                            className={`cursor-pointer transition-all border-2 ${
                              form.watch("serviceType") === service.value
                                ? 'border-accent-orange bg-orange-50'
                                : 'border-neutral-200 hover:border-accent-orange'
                            }`}
                            onClick={() => form.setValue("serviceType", service.value)}
                          >
                            <CardContent className="p-6 text-center">
                              <service.icon className="w-8 h-8 mx-auto mb-3 text-accent-orange" />
                              <p className="font-semibold text-text-primary">
                                {service.label}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {form.watch("serviceType") && (
                      <div>
                        <Label className="text-lg font-semibold mb-4 block">
                          Тип недвижимости
                        </Label>
                        <Select onValueChange={(value) => form.setValue("propertyType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип недвижимости" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <Label className="text-lg font-semibold mb-4 block">
                        Бюджет (необязательно)
                      </Label>
                      <Input
                        placeholder="Например: до 10 млн ₽"
                        {...form.register("budget")}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!form.watch("serviceType")}
                        className="bg-accent-orange text-white hover:bg-orange-600"
                      >
                        Далее
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Preferences */}
                {step === 2 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-text-primary mb-6">
                      Ваши предпочтения (необязательно)
                    </h2>

                    {/* Gender Preference */}
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">
                        Пол специалиста
                      </Label>
                      <RadioGroup
                        value={preferences.gender}
                        onValueChange={(value) => setPreferences(prev => ({ ...prev, gender: value }))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Мужчина</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Женщина</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="any" id="any" />
                          <Label htmlFor="any">Не важно</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Experience */}
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">
                        Опыт работы
                      </Label>
                      <RadioGroup
                        value={preferences.experience}
                        onValueChange={(value) => setPreferences(prev => ({ ...prev, experience: value }))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3-5" id="exp-3-5" />
                          <Label htmlFor="exp-3-5">3-5 лет</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5-10" id="exp-5-10" />
                          <Label htmlFor="exp-5-10">5-10 лет</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="10+" id="exp-10" />
                          <Label htmlFor="exp-10">Более 10 лет</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Specialization */}
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">
                        Специализация
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {specializations.map((spec) => (
                          <div key={spec} className="flex items-center space-x-2">
                            <Checkbox
                              id={spec}
                              checked={preferences.specialization.includes(spec)}
                              onCheckedChange={(checked) => 
                                handleSpecializationChange(spec, checked as boolean)
                              }
                            />
                            <Label htmlFor={spec} className="text-sm">
                              {spec}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">
                        Минимальный рейтинг
                      </Label>
                      <RadioGroup
                        value={preferences.rating}
                        onValueChange={(value) => setPreferences(prev => ({ ...prev, rating: value }))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4.5" id="rating-4.5" />
                          <Label htmlFor="rating-4.5">4.5+ звезд</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4.0" id="rating-4.0" />
                          <Label htmlFor="rating-4.0">4.0+ звезд</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="any" id="rating-any" />
                          <Label htmlFor="rating-any">Любой рейтинг</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                      >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Назад
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setStep(3)}
                        className="bg-accent-orange text-white hover:bg-orange-600"
                      >
                        Далее
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Information */}
                {step === 3 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-text-primary mb-6">
                      Ваши контактные данные
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-lg font-semibold mb-2 block">
                          Имя *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Ваше имя"
                          {...form.register("name")}
                        />
                        {form.formState.errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-lg font-semibold mb-2 block">
                          Телефон *
                        </Label>
                        <Input
                          id="phone"
                          placeholder="+7 (___) ___-__-__"
                          {...form.register("phone")}
                        />
                        {form.formState.errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                      >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Назад
                      </Button>
                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="bg-accent-orange text-white hover:bg-orange-600"
                      >
                        {mutation.isPending ? "Отправляем..." : "Найти специалиста"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary">
                      Заявка успешно отправлена!
                    </h2>
                    <p className="text-text-secondary max-w-md mx-auto">
                      Мы подберем подходящего специалиста и он свяжется с вами в течение часа.
                    </p>
                    <div className="space-y-4">
                      <Button
                        onClick={() => {
                          setStep(1);
                          form.reset();
                          setPreferences({
                            gender: "",
                            experience: "",
                            specialization: [],
                            rating: "",
                          });
                        }}
                        variant="outline"
                      >
                        Подать еще одну заявку
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}