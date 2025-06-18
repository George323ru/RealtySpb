import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import ConsultationForm from "@/components/consultation-form";
import { User, Award, Clock, MapPin, Star, Phone } from "lucide-react";

interface RealtorProfile {
  id: string;
  gender: string;
  age: number;
  experience: number;
  services: string[];
  rating: number;
  description: string;
  avatar: string;
}

const mockRealtors: RealtorProfile[] = [
  {
    id: "1",
    gender: "Женщина",
    age: 32,
    experience: 8,
    services: ["Покупка", "Продажа", "Ипотека"],
    rating: 4.9,
    description: "Специализируюсь на жилой недвижимости в центральных районах. Помогу найти идеальный вариант с учетом всех ваших пожеланий.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
  },
  {
    id: "2", 
    gender: "Мужчина",
    age: 45,
    experience: 15,
    services: ["Коммерческая", "Инвестиции", "Консультации"],
    rating: 4.8,
    description: "Эксперт по коммерческой недвижимости и инвестиционным проектам. Более 15 лет успешной работы на рынке СПб.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  },
  {
    id: "3",
    gender: "Женщина", 
    age: 28,
    experience: 5,
    services: ["Аренда", "Новостройки", "Сопровождение"],
    rating: 4.7,
    description: "Молодой и энергичный специалист. Отлично разбираюсь в новостройках и помогаю с арендой жилья.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
  },
  {
    id: "4",
    gender: "Мужчина",
    age: 38,
    experience: 12,
    services: ["Покупка", "Новостройки", "Ипотека"],
    rating: 4.6,
    description: "Помогаю семьям найти квартиры в новостройках. Специализируюсь на работе с ипотечными программами.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    id: "5",
    gender: "Женщина",
    age: 41,
    experience: 18,
    services: ["Продажа", "Коммерческая", "Консультации"],
    rating: 4.9,
    description: "Старший риэлтор с большим опытом. Работаю с элитной недвижимостью и коммерческими объектами.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150"
  },
  {
    id: "6",
    gender: "Мужчина",
    age: 29,
    experience: 4,
    services: ["Аренда", "Сопровождение", "Консультации"],
    rating: 4.5,
    description: "Специализируюсь на аренде жилья и полном сопровождении сделок. Быстро решаю любые вопросы.",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150"
  },
  {
    id: "7",
    gender: "Женщина",
    age: 35,
    experience: 10,
    services: ["Покупка", "Продажа", "Инвестиции"],
    rating: 4.8,
    description: "Помогаю клиентам принимать взвешенные решения при покупке и продаже недвижимости как инвестиции.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
  },
  {
    id: "8",
    gender: "Мужчина",
    age: 52,
    experience: 20,
    services: ["Коммерческая", "Инвестиции", "Консультации"],
    rating: 5.0,
    description: "Ведущий эксперт по коммерческой недвижимости. Помогаю крупным инвесторам и девелоперам.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
  }
];

export default function RealtorConstructor() {
  const [filters, setFilters] = useState({
    gender: "",
    ageRange: [25, 55],
    experienceRange: [1, 20],
    services: [] as string[]
  });
  
  const [showForm, setShowForm] = useState(false);

  const serviceOptions = [
    "Покупка", "Продажа", "Аренда", "Новостройки", 
    "Коммерческая", "Ипотека", "Инвестиции", "Консультации", "Сопровождение"
  ];

  const filteredRealtors = mockRealtors.filter(realtor => {
    if (filters.gender && realtor.gender !== filters.gender) return false;
    if (realtor.age < filters.ageRange[0] || realtor.age > filters.ageRange[1]) return false;
    if (realtor.experience < filters.experienceRange[0] || realtor.experience > filters.experienceRange[1]) return false;
    if (filters.services.length > 0 && !filters.services.some(service => realtor.services.includes(service))) return false;
    return true;
  });

  const handleServiceToggle = (service: string) => {
    setFilters(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Подбор риэлтора
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Выберите параметры специалиста, который лучше всего подойдет для решения ваших задач
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Параметры подбора</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Gender */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Пол специалиста</Label>
                  <RadioGroup
                    value={filters.gender}
                    onValueChange={(value) => setFilters(prev => ({...prev, gender: value}))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" id="any" />
                      <Label htmlFor="any">Любой</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Мужчина" id="male" />
                      <Label htmlFor="male">Мужчина</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Женщина" id="female" />
                      <Label htmlFor="female">Женщина</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Age Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Возраст: {filters.ageRange[0]} - {filters.ageRange[1]} лет
                  </Label>
                  <Slider
                    value={filters.ageRange}
                    onValueChange={(value) => setFilters(prev => ({...prev, ageRange: value}))}
                    max={65}
                    min={22}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Experience Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Опыт: {filters.experienceRange[0]} - {filters.experienceRange[1]} лет
                  </Label>
                  <Slider
                    value={filters.experienceRange}
                    onValueChange={(value) => setFilters(prev => ({...prev, experienceRange: value}))}
                    max={25}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Services */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Специализация</Label>
                  <div className="space-y-2">
                    {serviceOptions.map(service => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={filters.services.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                        />
                        <Label htmlFor={service} className="text-sm cursor-pointer">{service}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => setFilters({gender: "", ageRange: [25, 55], experienceRange: [1, 20], services: []})}
                  variant="outline"
                  className="w-full"
                >
                  Сбросить фильтры
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-text-secondary">
                Найдено специалистов: <span className="font-semibold">{filteredRealtors.length}</span>
              </p>
            </div>

            <div className="space-y-4">
              {filteredRealtors.map(realtor => (
                <Card key={realtor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={realtor.avatar}
                          alt="Специалист"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <User className="w-4 h-4 text-accent-orange" />
                              <span className="font-medium">{realtor.gender}, {realtor.age} лет</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-text-secondary">
                              <div className="flex items-center gap-1">
                                <Award className="w-4 h-4" />
                                <span>{realtor.experience} лет опыта</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>{realtor.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-text-secondary mb-3 text-sm">
                          {realtor.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {realtor.services.map(service => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            onClick={() => setShowForm(true)}
                            className="bg-accent-orange hover:bg-orange-600 text-white"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Связаться
                          </Button>
                          <Button variant="outline">
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredRealtors.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-text-secondary">
                      По заданным параметрам специалисты не найдены. Попробуйте изменить фильтры.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Связаться со специалистом</h3>
              <ConsultationForm defaultService="Подбор риэлтора" />
              <Button 
                onClick={() => setShowForm(false)}
                variant="outline"
                className="w-full mt-4"
              >
                Закрыть
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}