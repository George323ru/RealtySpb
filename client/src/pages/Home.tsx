import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SearchForm from "@/components/SearchForm";
import PropertyCard from "@/components/PropertyCard";
import { Home as HomeIcon, DollarSign, Key, Wrench } from "lucide-react";
import { SERVICE_TYPES } from "@/lib/constants";
import type { Property, NewBuilding, TeamMember, PropertySearchFilters } from "@shared/schema";

export default function Home() {
  const { data: featuredProperties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  const { data: newBuildings, isLoading: buildingsLoading } = useQuery<NewBuilding[]>({
    queryKey: ["/api/new-buildings"],
  });

  const { data: teamMembers, isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  const handleSearch = (filters: PropertySearchFilters) => {
    // Navigate to search results
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });
    window.location.href = `/buy?${params.toString()}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Недвижимость в 
              <span className="text-yandex-yellow"> Санкт-Петербурге</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90">
              Профессиональные услуги по покупке, продаже и аренде недвижимости. Более 15 лет на рынке СПб.
            </p>
            
            <div className="mt-12">
              <SearchForm onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Что вы хотите сделать?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Выберите подходящий вариант и мы поможем решить вашу задачу быстро и профессионально
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Buy Card */}
            <Card className="group bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <HomeIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Хочу купить</h3>
                <p className="text-text-secondary mb-6">Квартиры, дома, коммерческая недвижимость, земля</p>
                <div className="text-sm text-text-secondary space-y-1 mb-6">
                  <div>• Новостройки</div>
                  <div>• Вторичный рынок</div>
                  <div>• Инвестиции</div>
                </div>
                <Link href="/buy">
                  <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                    Начать поиск
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Sell Card */}
            <Card className="group bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Хочу продать</h3>
                <p className="text-text-secondary mb-6">Быстрая и выгодная продажа вашей недвижимости</p>
                <div className="text-sm text-text-secondary space-y-1 mb-6">
                  <div>• Оценка стоимости</div>
                  <div>• Подготовка к продаже</div>
                  <div>• Поиск покупателей</div>
                </div>
                <Link href="/sell">
                  <Button className="w-full bg-green-500 text-white hover:bg-green-600">
                    Оценить квартиру
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Rent Card */}
            <Card className="group bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Хочу сдать</h3>
                <p className="text-text-secondary mb-6">Сдача в аренду с гарантией дохода</p>
                <div className="text-sm text-text-secondary space-y-1 mb-6">
                  <div>• Поиск арендаторов</div>
                  <div>• Оформление договора</div>
                  <div>• Управление арендой</div>
                </div>
                <Link href="/rent">
                  <Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
                    Сдать в аренду
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Services Card */}
            <Card className="group bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Дополнительные услуги</h3>
                <p className="text-text-secondary mb-6">Ремонт, дизайн, юридическое сопровождение</p>
                <div className="text-sm text-text-secondary space-y-1 mb-6">
                  <div>• 13 видов услуг</div>
                  <div>• Полный цикл работ</div>
                  <div>• Профессиональная команда</div>
                </div>
                <Link href="/services">
                  <Button className="w-full bg-accent-orange text-white hover:bg-orange-600">
                    Все услуги
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Рекомендуемые объекты
              </h2>
              <p className="text-lg text-text-secondary">
                Тщательно отобранная недвижимость с лучшим соотношением цена-качество
              </p>
            </div>
            <div className="mt-6 lg:mt-0">
              <Link href="/buy">
                <Button variant="outline" className="border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white">
                  Смотреть все объекты →
                </Button>
              </Link>
            </div>
          </div>
          
          {propertiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-6 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded mb-4"></div>
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Buildings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Новостройки Санкт-Петербурга
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Лучшие жилые комплексы от проверенных застройщиков с государственной гарантией
            </p>
          </div>
          
          {buildingsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl p-8 animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-8 rounded mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-10 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {newBuildings?.map((building) => (
                <Card key={building.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                      <img
                        src={building.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3"}
                        alt={building.name}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                    </div>
                    <CardContent className="lg:w-1/2 p-8">
                      <div className="flex items-center mb-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                          Сдача в {building.completionDate}
                        </span>
                        <span className="text-sm text-text-secondary">от застройщика</span>
                      </div>
                      <h3 className="text-2xl font-bold text-text-primary mb-3">{building.name}</h3>
                      <p className="text-text-secondary mb-4 flex items-center">
                        <i className="fas fa-map-marker-alt mr-1 text-accent-orange"></i>
                        {building.location}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="text-sm text-text-secondary">Квартиры от</div>
                          <div className="text-xl font-bold text-text-primary">
                            {new Intl.NumberFormat("ru-RU").format(parseFloat(building.priceFrom))} ₽
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-text-secondary">За м²</div>
                          <div className="text-xl font-bold text-text-primary">
                            от {new Intl.NumberFormat("ru-RU").format(parseFloat(building.pricePerMeterFrom))} ₽
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary mb-6">
                        <span>{building.totalFlats} квартир</span>
                        <span>{building.readiness}</span>
                      </div>
                      <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                        Посмотреть планировки
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/new-buildings">
              <Button className="bg-accent-orange text-white px-8 py-4 hover:bg-orange-600">
                Все новостройки СПб →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Наша команда
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Профессиональные риэлторы с многолетним опытом работы на рынке недвижимости Санкт-Петербурга
            </p>
          </div>
          
          {teamLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6"></div>
                  <div className="bg-gray-300 h-6 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded mb-4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers?.slice(0, 4).map((member) => (
                <div key={member.id} className="text-center group">
                  <div className="relative mb-6">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">{member.name}</h3>
                  <p className="text-accent-orange font-medium mb-2">{member.position}</p>
                  <p className="text-sm text-text-secondary mb-4">Опыт работы: {member.experience}</p>
                  <div className="flex justify-center space-x-3">
                    {member.telegram && (
                      <a href="#" className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-accent-orange hover:text-white transition-colors">
                        <i className="fab fa-telegram text-sm"></i>
                      </a>
                    )}
                    {member.whatsapp && (
                      <a href="#" className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-accent-orange hover:text-white transition-colors">
                        <i className="fab fa-whatsapp text-sm"></i>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="py-16 bg-gradient-to-r from-accent-orange to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Получите консультацию эксперта бесплатно
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Оставьте заявку и наш специалист свяжется с вами в течение 15 минут для решения вашего вопроса
            </p>
            
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input type="text" placeholder="Введите имя" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input type="tel" placeholder="+7 (___) ___-__-__" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="service">Выберите услугу</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_TYPES.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Опишите ваш вопрос (необязательно)</Label>
                    <Textarea placeholder="Расскажите о ваших потребностях" rows={3} />
                  </div>
                  <Button type="submit" className="w-full bg-accent-orange text-white py-4 hover:bg-orange-600">
                    Получить консультацию
                  </Button>
                  <p className="text-sm text-text-secondary">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="#" className="text-accent-orange hover:underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
