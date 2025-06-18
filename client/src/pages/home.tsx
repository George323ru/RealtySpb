import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchForm from "@/components/search-form";
import PropertyCard from "@/components/property-card";
import TeamCard from "@/components/team-card";
import ServiceCard from "@/components/service-card";
import ConsultationForm from "@/components/consultation-form";
import { Property, NewBuilding, TeamMember, Service } from "@shared/schema";
import { 
  ShoppingCart, 
  DollarSign, 
  Key, 
  Settings, 
  ArrowRight,
  Star,
  CheckCircle
} from "lucide-react";

const Home = () => {
  const { data: featuredProperties = [], isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties?limit=3"],
  });

  const { data: newBuildings = [], isLoading: buildingsLoading } = useQuery<NewBuilding[]>({
    queryKey: ["/api/new-buildings"],
  });

  const { data: teamMembers = [], isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-bg min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              Недвижимость в{" "}
              <span className="text-yandex-yellow">Санкт-Петербурге</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90">
              Профессиональные услуги по покупке, продаже и аренде недвижимости. Более 15 лет на рынке СПб.
            </p>
            
            <div className="mt-12">
              <SearchForm />
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
                  <ShoppingCart className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Хочу купить</h3>
                <p className="text-text-secondary mb-6">Квартиры, дома, коммерческая недвижимость, земля</p>
                <div className="text-sm text-text-secondary space-y-1 mb-6">
                  <div>• Новостройки</div>
                  <div>• Вторичный рынок</div>
                  <div>• Инвестиции</div>
                </div>
                <Link href="/buy">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Начать поиск
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Sell Card */}
            <Card className="group bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Хочу продать</h3>
                <p className="text-text-secondary mb-6">Быстрая и выгодная продажа вашей недвижимости</p>
                <div className="text-sm text-text-secondary space-y-1 mb-6">
                  <div>• Оценка стоимости</div>
                  <div>• Подготовка к продаже</div>
                  <div>• Поиск покупателей</div>
                </div>
                <Link href="/sell">
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    Оценить квартиру
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Rent Card */}
            <Card className="group bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Key className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Хочу сдать</h3>
                <p className="text-text-secondary mb-6">Сдача в аренду с гарантией дохода</p>
                <div className="text-sm text-text-secondary space-y-1 mb-6">
                  <div>• Поиск арендаторов</div>
                  <div>• Оформление договора</div>
                  <div>• Управление арендой</div>
                </div>
                <Link href="/rent">
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">
                    Сдать в аренду
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Services Card */}
            <Card className="group bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent-orange rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Settings className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Дополнительные услуги</h3>
                <p className="text-text-secondary mb-6">Ремонт, дизайн, юридическое сопровождение</p>
                <div className="text-sm text-text-secondary space-y-1 mb-6">
                  <div>• 13 видов услуг</div>
                  <div>• Полный цикл работ</div>
                  <div>• Профессиональная команда</div>
                </div>
                <Link href="/services">
                  <Button className="w-full bg-accent-orange hover:bg-orange-600">
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
              <Link href="/buy" className="inline-flex items-center text-accent-orange font-medium hover:underline">
                Смотреть все объекты
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {propertiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-4">
                  <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 skeleton" />
                  <div className="h-4 bg-gray-200 rounded mb-2 skeleton" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 skeleton" />
                </div>
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">Нет доступных объектов для отображения</p>
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
                <div key={i} className="bg-neutral-100 rounded-2xl p-8">
                  <div className="h-6 bg-gray-200 rounded mb-4 skeleton" />
                  <div className="h-4 bg-gray-200 rounded mb-2 skeleton" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 skeleton" />
                </div>
              ))}
            </div>
          ) : newBuildings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {newBuildings.slice(0, 2).map((building) => (
                <Card key={building.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                      <img
                        src={building.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"}
                        alt={building.name}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                    </div>
                    <CardContent className="lg:w-1/2 p-8">
                      <div className="flex items-center mb-4">
                        <Badge className="bg-green-500 text-white mr-3">
                          {building.readiness}
                        </Badge>
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
                            {new Intl.NumberFormat("ru-RU").format(building.priceFrom)} ₽
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-text-secondary">За м²</div>
                          <div className="text-xl font-bold text-text-primary">
                            от {new Intl.NumberFormat("ru-RU").format(building.pricePerMeterFrom)} ₽
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary mb-6">
                        <span>{building.totalFlats} квартир</span>
                        <span>{building.readiness}</span>
                      </div>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        Посмотреть планировки
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">Нет доступных новостроек для отображения</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/new-buildings">
              <Button className="bg-accent-orange hover:bg-orange-600 text-white px-8 py-4 text-lg">
                Все новостройки СПб
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Дополнительные услуги
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Полный спектр услуг для работы с недвижимостью — от дизайна до юридического сопровождения
            </p>
          </div>
          
          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 skeleton" />
                  <div className="h-4 bg-gray-200 rounded mb-2 skeleton" />
                  <div className="h-3 bg-gray-200 rounded mb-4 skeleton" />
                </div>
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.slice(0, 8).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">Нет доступных услуг для отображения</p>
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
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
                <div key={i} className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 skeleton" />
                  <div className="h-4 bg-gray-200 rounded mb-2 skeleton" />
                  <div className="h-3 bg-gray-200 rounded skeleton" />
                </div>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.slice(0, 4).map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">Информация о команде не доступна</p>
            </div>
          )}
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="py-16 bg-gradient-to-r from-accent-orange to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <ConsultationForm 
              title="Получите консультацию эксперта бесплатно"
              description="Оставьте заявку и наш специалист свяжется с вами в течение 15 минут для решения вашего вопроса"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
