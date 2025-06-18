import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Star, Phone, MessageCircle, Filter, Users } from "lucide-react";
import ConsultationForm from "@/components/consultation-form";

interface RealtorFilters {
  gender: string;
  experience: string;
  specialization: string;
  rating: string;
  availability: string;
}

interface GeneratedRealtor {
  id: string;
  name: string;
  gender: string;
  experience: string;
  specialization: string[];
  rating: number;
  photo: string;
  phone: string;
  telegram?: string;
  whatsapp?: string;
  availability: string;
  completedDeals: number;
  description: string;
}

export default function RealtorConstructor() {
  const [filters, setFilters] = useState<RealtorFilters>({
    gender: "",
    experience: "",
    specialization: "",
    rating: "",
    availability: ""
  });

  const [showResults, setShowResults] = useState(false);
  const [selectedRealtor, setSelectedRealtor] = useState<GeneratedRealtor | null>(null);

  const handleFilterChange = (key: keyof RealtorFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const generateRealtors = () => {
    setShowResults(true);
    // In a real implementation, this would call an API to generate realtors based on filters
  };

  const generateMockRealtors = (): GeneratedRealtor[] => {
    const maleNames = ["Александр", "Дмитрий", "Михаил", "Андрей", "Сергей"];
    const femaleNames = ["Елена", "Анна", "Мария", "Ольга", "Татьяна"];
    const surnames = ["Петров", "Иванов", "Сидоров", "Козлов", "Волков"];
    
    const specializations = [
      ["Квартиры", "Вторичка"],
      ["Новостройки", "Коммерческая"],
      ["Загородная", "Дома"],
      ["Инвестиции", "Элитная"],
      ["Земля", "Участки"]
    ];

    const realtors: GeneratedRealtor[] = [];
    
    for (let i = 0; i < 6; i++) {
      const isMan = filters.gender === "мужчина" || (filters.gender === "" && Math.random() > 0.5);
      const names = isMan ? maleNames : femaleNames;
      const name = `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`;
      
      let experienceYears = 5;
      if (filters.experience === "1-3 года") experienceYears = 2;
      else if (filters.experience === "3-5 лет") experienceYears = 4;
      else if (filters.experience === "5-10 лет") experienceYears = 7;
      else if (filters.experience === "10+ лет") experienceYears = 12;
      else experienceYears = Math.floor(Math.random() * 15) + 1;

      const baseRating = filters.rating ? parseFloat(filters.rating) : 4.5;
      const rating = Math.min(5, baseRating + (Math.random() - 0.5) * 0.4);

      const realtor: GeneratedRealtor = {
        id: `realtor-${i}`,
        name,
        gender: isMan ? "мужчина" : "женщина",
        experience: `${experienceYears} лет`,
        specialization: specializations[Math.floor(Math.random() * specializations.length)],
        rating: Math.round(rating * 10) / 10,
        photo: `https://images.unsplash.com/photo-${isMan ? '1472099645785-5658abf4ff4e' : '1494790108755-2616c7bea3a0'}?w=150&h=150&fit=crop&crop=face`,
        phone: `+7 (${900 + Math.floor(Math.random() * 99)}) ${100 + Math.floor(Math.random() * 899)}-${10 + Math.floor(Math.random() * 89)}-${10 + Math.floor(Math.random() * 89)}`,
        telegram: Math.random() > 0.3 ? "@realtor_spb" : undefined,
        whatsapp: Math.random() > 0.4 ? "+7900000000" : undefined,
        availability: filters.availability || (Math.random() > 0.3 ? "Свободен" : "Занят до завтра"),
        completedDeals: Math.floor(Math.random() * 200) + 50,
        description: `Специалист по ${specializations[Math.floor(Math.random() * specializations.length)].join(" и ").toLowerCase()}. Опыт работы ${experienceYears} лет. Помогу найти идеальный вариант для ваших потребностей.`
      };

      realtors.push(realtor);
    }

    return realtors;
  };

  const handleSelectRealtor = (realtor: GeneratedRealtor) => {
    setSelectedRealtor(realtor);
  };

  const mockRealtors = showResults ? generateMockRealtors() : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-background-secondary">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent-orange to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Выбрать специалиста
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-orange-100">
              Найдите идеального риэлтора под ваши требования
            </p>
            <div className="flex items-center justify-center space-x-8 text-orange-100">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6" />
                <span>Персональный подход</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-6 w-6" />
                <span>Проверенные специалисты</span>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-6 w-6" />
                <span>Умный подбор</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Filters */}
        <Card className="mb-12 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-text-primary">
              Конструктор специалиста
            </CardTitle>
            <p className="text-center text-text-secondary">
              Укажите предпочтения, и мы подберем идеального риэлтора
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Пол
                </label>
                <Select value={filters.gender} onValueChange={(value) => handleFilterChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Не важно" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Не важно</SelectItem>
                    <SelectItem value="мужчина">Мужчина</SelectItem>
                    <SelectItem value="женщина">Женщина</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Опыт работы
                </label>
                <Select value={filters.experience} onValueChange={(value) => handleFilterChange('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любой" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любой</SelectItem>
                    <SelectItem value="1-3 года">1-3 года</SelectItem>
                    <SelectItem value="3-5 лет">3-5 лет</SelectItem>
                    <SelectItem value="5-10 лет">5-10 лет</SelectItem>
                    <SelectItem value="10+ лет">Более 10 лет</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Специализация
                </label>
                <Select value={filters.specialization} onValueChange={(value) => handleFilterChange('specialization', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любая" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любая</SelectItem>
                    <SelectItem value="Квартиры">Квартиры</SelectItem>
                    <SelectItem value="Новостройки">Новостройки</SelectItem>
                    <SelectItem value="Загородная">Загородная недвижимость</SelectItem>
                    <SelectItem value="Коммерческая">Коммерческая</SelectItem>
                    <SelectItem value="Инвестиции">Инвестиции</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Минимальный рейтинг
                </label>
                <Select value={filters.rating} onValueChange={(value) => handleFilterChange('rating', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любой" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любой</SelectItem>
                    <SelectItem value="4.0">4.0+</SelectItem>
                    <SelectItem value="4.5">4.5+</SelectItem>
                    <SelectItem value="4.8">4.8+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Доступность
                </label>
                <Select value={filters.availability} onValueChange={(value) => handleFilterChange('availability', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любая" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любая</SelectItem>
                    <SelectItem value="Свободен">Свободен сегодня</SelectItem>
                    <SelectItem value="Завтра">Свободен завтра</SelectItem>
                    <SelectItem value="На неделе">На этой неделе</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={generateRealtors}
                  className="w-full bg-accent-orange text-white hover:bg-orange-600"
                >
                  Подобрать специалистов
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-text-primary">
                Подходящие специалисты ({mockRealtors.length})
              </h2>
              <Badge variant="outline" className="text-accent-orange border-accent-orange">
                <Filter className="h-4 w-4 mr-1" />
                По вашим критериям
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {mockRealtors.map((realtor) => (
                <Card key={realtor.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={realtor.photo} alt={realtor.name} />
                      <AvatarFallback>
                        <User className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{realtor.name}</CardTitle>
                    <div className="flex items-center justify-center space-x-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold">{realtor.rating}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Опыт:</span>
                        <span className="font-medium">{realtor.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Сделок:</span>
                        <span className="font-medium">{realtor.completedDeals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Статус:</span>
                        <Badge variant={realtor.availability === "Свободен" ? "default" : "secondary"}>
                          {realtor.availability}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Специализация:</h4>
                      <div className="flex flex-wrap gap-1">
                        {realtor.specialization.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary">{realtor.description}</p>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleSelectRealtor(realtor)}
                        className="flex-1 bg-accent-orange text-white hover:bg-orange-600"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Выбрать
                      </Button>
                      {realtor.telegram && (
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Selected Realtor Form */}
        {selectedRealtor && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Связаться с {selectedRealtor.name}
              </CardTitle>
              <p className="text-center text-text-secondary">
                Специалист свяжется с вами в ближайшее время
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedRealtor.photo} alt={selectedRealtor.name} />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedRealtor.name}</h3>
                  <p className="text-text-secondary">{selectedRealtor.experience} опыта</p>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{selectedRealtor.rating}</span>
                  </div>
                </div>
              </div>
              <ConsultationForm 
                defaultService={`Консультация с ${selectedRealtor.name}`}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}