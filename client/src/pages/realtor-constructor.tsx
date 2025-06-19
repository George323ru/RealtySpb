import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ConsultationForm from "@/components/consultation-form";
import { User, Clock, Star, Phone, UserCheck, Briefcase, Home, Building, HandshakeIcon, Check, ArrowRight } from "lucide-react";

interface Filters {
  gender: string;
  experience: string;
  services: string[];
}

interface RealtorProfile {
  id: string;
  name: string;
  gender: string;
  experience: number;
  services: string[];
  rating: number;
  description: string;
  avatar: string;
  specialization: string;
}

const mockRealtors: RealtorProfile[] = [
  {
    id: "1",
    name: "Анна Петрова",
    gender: "Женщина",
    experience: 8,
    services: ["Покупка", "Продажа", "Ипотека"],
    rating: 4.9,
    description: "Специализируюсь на жилой недвижимости в центральных районах",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    specialization: "Жилая недвижимость"
  },
  {
    id: "2", 
    name: "Михаил Сидоров",
    gender: "Мужчина",
    experience: 15,
    services: ["Коммерческая", "Инвестиции", "Консультации"],
    rating: 4.8,
    description: "Эксперт по коммерческой недвижимости и инвестиционным проектам",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    specialization: "Коммерческая недвижимость"
  },
  {
    id: "3",
    name: "Елена Волкова", 
    gender: "Женщина",
    experience: 5,
    services: ["Аренда", "Новостройки", "Сопровождение"],
    rating: 4.7,
    description: "Молодой и энергичный специалист по новостройкам и аренде",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    specialization: "Новостройки"
  },
  {
    id: "4",
    name: "Дмитрий Козлов",
    gender: "Мужчина",
    experience: 12,
    services: ["Покупка", "Новостройки", "Ипотека"],
    rating: 4.6,
    description: "Помогаю семьям найти квартиры в новостройках с ипотекой",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    specialization: "Семейное жилье"
  }
];

const genderOptions = [
  { value: "", label: "Не важно", icon: UserCheck },
  { value: "Женщина", label: "Женщина", icon: User },
  { value: "Мужчина", label: "Мужчина", icon: User }
];

const experienceOptions = [
  { value: "", label: "Любой опыт" },
  { value: "3-7", label: "3-7 лет" },
  { value: "7-15", label: "7-15 лет" },
  { value: "15+", label: "15+ лет" }
];

const serviceOptions = [
  { value: "Покупка", label: "Покупка", icon: Home },
  { value: "Продажа", label: "Продажа", icon: HandshakeIcon },
  { value: "Аренда", label: "Аренда", icon: Building },
  { value: "Ипотека", label: "Ипотека", icon: Briefcase },
  { value: "Новостройки", label: "Новостройки", icon: Building },
  { value: "Коммерческая", label: "Коммерческая", icon: Briefcase }
];

export default function RealtorConstructor() {
  const [filters, setFilters] = useState<Filters>({
    gender: "",
    experience: "",
    services: []
  });

  const [showResults, setShowResults] = useState(false);

  const handleServiceToggle = (service: string) => {
    setFilters(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const filteredRealtors = mockRealtors.filter(realtor => {
    if (filters.gender && realtor.gender !== filters.gender) return false;
    
    if (filters.experience) {
      const [min, max] = filters.experience.includes('+') 
        ? [parseInt(filters.experience), 100] 
        : filters.experience.split('-').map(Number);
      if (realtor.experience < min || realtor.experience > max) return false;
    }
    
    if (filters.services.length > 0) {
      const hasMatchingService = filters.services.some(service => 
        realtor.services.includes(service)
      );
      if (!hasMatchingService) return false;
    }
    
    return true;
  });

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 py-16">
        <div className="absolute inset-0 bg-card bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-foreground">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Подберите{" "}
              <span className="text-yandex-yellow">идеального</span>{" "}
              специалиста
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90">
              Ответьте на 3 простых вопроса, и мы найдем риэлтора под ваши задачи
            </p>
          </div>
        </div>
      </section>

      {/* Constructor Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            
            {!showResults ? (
              <Card className="bg-white shadow-xl border-0 rounded-2xl">
                <CardContent className="p-8">
                  
                  {/* Step 1: Gender */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-accent text-foreground rounded-full flex items-center justify-center font-bold text-sm">1</div>
                      <h3 className="text-xl font-semibold text-foreground">Пол специалиста</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {genderOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFilters(prev => ({ ...prev, gender: option.value }))}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 hover:scale-105 ${
                            filters.gender === option.value
                              ? 'border-accent-orange bg-orange-50 text-accent shadow-lg'
                              : 'border hover:border-neutral-300 text-muted-foreground hover:bg-background'
                          }`}
                        >
                          <option.icon className="w-5 h-5" />
                          <span className="font-medium">{option.label}</span>
                          {filters.gender === option.value && <Check className="w-4 h-4 ml-auto" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Experience */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-accent text-foreground rounded-full flex items-center justify-center font-bold text-sm">2</div>
                      <h3 className="text-xl font-semibold text-foreground">Опыт работы</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {experienceOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFilters(prev => ({ ...prev, experience: option.value }))}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 text-center hover:scale-105 ${
                            filters.experience === option.value
                              ? 'border-accent-orange bg-orange-50 text-accent shadow-lg'
                              : 'border hover:border-neutral-300 text-muted-foreground hover:bg-background'
                          }`}
                        >
                          <span className="font-medium text-sm">{option.label}</span>
                          {filters.experience === option.value && <Check className="w-4 h-4 mx-auto mt-1" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Services */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-accent text-foreground rounded-full flex items-center justify-center font-bold text-sm">3</div>
                      <h3 className="text-xl font-semibold text-foreground">Тип сделки</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {serviceOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleServiceToggle(option.value)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 hover:scale-105 ${
                            filters.services.includes(option.value)
                              ? 'border-accent-orange bg-orange-50 text-accent shadow-lg'
                              : 'border hover:border-neutral-300 text-muted-foreground hover:bg-background'
                          }`}
                        >
                          <option.icon className="w-5 h-5" />
                          <span className="font-medium">{option.label}</span>
                          {filters.services.includes(option.value) && (
                            <Check className="w-4 h-4 ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="text-center pt-4">
                    <Button 
                      onClick={handleSearch}
                      className="bg-gradient-to-r from-accent-orange to-orange-600 text-foreground px-12 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-lg"
                    >
                      Найти специалиста
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>

                </CardContent>
              </Card>
            ) : (
              <>
                {/* Results Header */}
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Найдено {filteredRealtors.length} подходящих специалистов
                  </h2>
                  <Button 
                    onClick={() => setShowResults(false)}
                    variant="outline"
                    className="mb-6 border-accent-orange text-accent hover:bg-orange-50"
                  >
                    ← Изменить критерии
                  </Button>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {filteredRealtors.map((realtor) => (
                    <Card key={realtor.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img 
                            src={realtor.avatar} 
                            alt={realtor.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground mb-1">{realtor.name}</h3>
                            <p className="text-accent font-medium mb-2">{realtor.specialization}</p>
                            
                            <div className="flex items-center gap-4 mb-3 text-sm">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span>{realtor.experience} лет</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="font-medium">{realtor.rating}</span>
                              </div>
                            </div>

                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{realtor.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {realtor.services.map((service) => (
                                <Badge key={service} variant="secondary" className="text-xs bg-orange-100 text-accent">
                                  {service}
                                </Badge>
                              ))}
                            </div>

                            <Button className="bg-accent text-foreground hover:bg-orange-600 w-full rounded-lg font-medium">
                              <Phone className="w-4 h-4 mr-2" />
                              Связаться со специалистом
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* No Results */}
                {filteredRealtors.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                      <User className="w-12 h-12 text-neutral-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Специалисты не найдены</h3>
                    <p className="text-muted-foreground mb-6">Попробуйте изменить критерии поиска или оставьте заявку</p>
                    <Button 
                      onClick={() => setShowResults(false)}
                      variant="outline"
                      className="border-accent-orange text-accent hover:bg-orange-50"
                    >
                      Изменить критерии
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-orange to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Не нашли подходящего специалиста?
            </h2>
            <p className="text-xl text-foreground mb-8 opacity-90">
              Оставьте заявку и мы подберем эксперта под ваши требования в течение часа
            </p>
            
            <ConsultationForm defaultService="Подбор специалиста" />
          </div>
        </div>
      </section>
    </div>
  );
}