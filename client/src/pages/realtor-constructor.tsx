import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, MessageCircle, Send, User, Award, Star, Search, Users } from "lucide-react";
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

  const [selectedRealtor, setSelectedRealtor] = useState<GeneratedRealtor | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchResults, setSearchResults] = useState<GeneratedRealtor[]>([]);

  // Generate realtors based on filters
  const generateRealtors = (): GeneratedRealtor[] => {
    const maleNames = ["Александр", "Дмитрий", "Сергей", "Андрей", "Владимир", "Михаил", "Алексей", "Максим"];
    const femaleNames = ["Анна", "Елена", "Мария", "Ольга", "Татьяна", "Ирина", "Светлана", "Наталья"];
    const lastNames = ["Петров", "Иванов", "Сидоров", "Козлов", "Волков", "Смирнов", "Новиков", "Морозов"];
    
    const specializations = [
      ["Жилая недвижимость", "Вторичка"],
      ["Новостройки", "Инвестиции"],
      ["Коммерческая недвижимость"],
      ["Загородная недвижимость", "Дома"],
      ["Элитная недвижимость"],
      ["Аренда", "Жилая недвижимость"]
    ];

    const photos = {
      male: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face"
      ],
      female: [
        "https://images.unsplash.com/photo-1494790108755-2616b4db8f79?w=200&h=200&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face"
      ]
    };

    let results: GeneratedRealtor[] = [];
    let id = 1;

    // Generate combinations based on filters
    const genders = filters.gender ? [filters.gender] : ["Мужской", "Женский"];
    const experiences = filters.experience ? [filters.experience] : ["1-3 года", "3-5 лет", "5-10 лет", "10+ лет"];
    const ratings = filters.rating ? [parseFloat(filters.rating)] : [4.5, 4.7, 4.8, 4.9, 5.0];

    genders.forEach(gender => {
      experiences.forEach(experience => {
        ratings.forEach(rating => {
          const isMale = gender === "Мужской";
          const names = isMale ? maleNames : femaleNames;
          const name = `${names[Math.floor(Math.random() * names.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}${isMale ? '' : 'а'}`;
          
          let realtorSpecs = specializations[Math.floor(Math.random() * specializations.length)];
          if (filters.specialization) {
            realtorSpecs = specializations.find(specs => 
              specs.some(spec => spec.includes(filters.specialization))
            ) || [filters.specialization];
          }

          const photoArray = isMale ? photos.male : photos.female;
          const photo = photoArray[Math.floor(Math.random() * photoArray.length)];

          const realtor: GeneratedRealtor = {
            id: `generated-${id++}`,
            name,
            gender,
            experience,
            specialization: realtorSpecs,
            rating,
            photo,
            phone: `+7 (812) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 90 + 10)}`,
            telegram: Math.random() > 0.3 ? `@${name.split(' ')[0].toLowerCase()}` : undefined,
            whatsapp: Math.random() > 0.4 ? `+7 (812) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 90 + 10)}` : undefined,
            availability: filters.availability || (Math.random() > 0.7 ? "Занят" : "Свободен"),
            completedDeals: Math.floor(Math.random() * 200 + 50),
            description: `Опытный риэлтор с ${experience} стажа работы. Специализация: ${realtorSpecs.join(", ").toLowerCase()}. Помогу найти идеальный вариант недвижимости в Санкт-Петербурге.`
          };

          results.push(realtor);
        });
      });
    });

    // Filter by availability if specified
    if (filters.availability) {
      results = results.filter(r => r.availability === filters.availability);
    }

    // Limit results to avoid overwhelming the user
    return results.slice(0, 6);
  };

  const handleSearch = () => {
    const results = generateRealtors();
    setSearchResults(results);
    setSelectedRealtor(null);
  };

  const handleSelectRealtor = (realtor: GeneratedRealtor) => {
    setSelectedRealtor(realtor);
    setShowForm(true);
  };

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
                <span>200+ специалистов</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6" />
                <span>Проверенные профессионалы</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-6 w-6" />
                <span>Высокий рейтинг</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Constructor Form */}
        <Card className="mb-12 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-text-primary">
              Конструктор специалиста
            </CardTitle>
            <p className="text-center text-text-secondary">
              Выберите критерии для поиска идеального риэлтора
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Пол
                </label>
                <Select value={filters.gender} onValueChange={(value) => setFilters(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любой" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любой</SelectItem>
                    <SelectItem value="Мужской">Мужской</SelectItem>
                    <SelectItem value="Женский">Женский</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Опыт работы
                </label>
                <Select value={filters.experience} onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любой" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любой</SelectItem>
                    <SelectItem value="1-3 года">1-3 года</SelectItem>
                    <SelectItem value="3-5 лет">3-5 лет</SelectItem>
                    <SelectItem value="5-10 лет">5-10 лет</SelectItem>
                    <SelectItem value="10+ лет">10+ лет</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Специализация
                </label>
                <Select value={filters.specialization} onValueChange={(value) => setFilters(prev => ({ ...prev, specialization: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любая" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любая</SelectItem>
                    <SelectItem value="Жилая недвижимость">Жилая недвижимость</SelectItem>
                    <SelectItem value="Новостройки">Новостройки</SelectItem>
                    <SelectItem value="Коммерческая">Коммерческая</SelectItem>
                    <SelectItem value="Загородная">Загородная недвижимость</SelectItem>
                    <SelectItem value="Элитная">Элитная недвижимость</SelectItem>
                    <SelectItem value="Аренда">Аренда</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Рейтинг от
                </label>
                <Select value={filters.rating} onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любой" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любой</SelectItem>
                    <SelectItem value="4.5">4.5+</SelectItem>
                    <SelectItem value="4.7">4.7+</SelectItem>
                    <SelectItem value="4.8">4.8+</SelectItem>
                    <SelectItem value="4.9">4.9+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Доступность
                </label>
                <Select value={filters.availability} onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любая" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Любая</SelectItem>
                    <SelectItem value="Свободен">Свободен</SelectItem>
                    <SelectItem value="Занят">Занят</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={handleSearch}
                className="bg-accent-orange text-white hover:bg-orange-600 px-8 py-3 text-lg"
                size="lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Найти специалистов
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
              Подходящие специалисты ({searchResults.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((realtor) => (
                <Card key={realtor.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={realtor.photo}
                        alt={realtor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary">{realtor.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(realtor.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-text-secondary">{realtor.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Опыт:</span>
                        <Badge variant="secondary">{realtor.experience}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Сделок:</span>
                        <span className="text-sm font-medium">{realtor.completedDeals}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Статус:</span>
                        <Badge 
                          variant={realtor.availability === "Свободен" ? "default" : "secondary"}
                          className={realtor.availability === "Свободен" ? "bg-green-100 text-green-700" : ""}
                        >
                          {realtor.availability}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-text-secondary mb-2">Специализация:</p>
                      <div className="flex flex-wrap gap-1">
                        {realtor.specialization.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary mb-4">{realtor.description}</p>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleSelectRealtor(realtor)}
                        className="flex-1 bg-accent-orange text-white hover:bg-orange-600"
                        size="sm"
                      >
                        <User className="h-4 w-4 mr-1" />
                        Выбрать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      {realtor.telegram && (
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      {realtor.whatsapp && (
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Selected Realtor Form */}
        {selectedRealtor && showForm && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Связаться со специалистом
              </CardTitle>
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={selectedRealtor.photo}
                  alt={selectedRealtor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{selectedRealtor.name}</h3>
                  <p className="text-text-secondary">{selectedRealtor.specialization.join(", ")}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ConsultationForm
                defaultService={`Консультация с ${selectedRealtor.name}`}
              />
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        {!showForm && (
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Не нашли подходящего специалиста?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Оставьте заявку, и мы подберем для вас идеального риэлтора под ваши требования
            </p>
            <ConsultationForm defaultService="Подбор специалиста" />
          </div>
        )}
      </div>
    </div>
  );
}