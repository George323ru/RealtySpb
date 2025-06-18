import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchForm from "@/components/search-form";
import PropertyCard from "@/components/property-card";
import NewBuildingCard from "@/components/new-building-card";
import ConsultationForm from "@/components/consultation-form";
import PromotionBanner from "@/components/promotion-banner";
import useEmblaCarousel from 'embla-carousel-react';
import { 
  Home as HomeIcon, 
  DollarSign, 
  Key, 
  Wrench,
  ArrowRight,
  Hammer,
  PaintbrushVertical,
  Building,
  MapPin,
  Scale,
  Handshake,
  ChevronLeft,
  ChevronRight,
  Users,
  CheckCircle,
  Clock
} from "lucide-react";
import type { Property, NewBuilding, Service, TeamMember, Promotion } from "@shared/schema";



export default function Home() {
  const { data: properties = [] } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: newBuildings = [] } = useQuery<NewBuilding[]>({
    queryKey: ["/api/new-buildings"],
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: team = [] } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  const { data: promotions = [] } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions"],
  });

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  const quickActions = [
    {
      title: "Хочу купить",
      description: "Квартиры, дома, коммерческая недвижимость, земля",
      features: ["Новостройки", "Вторичный рынок", "Инвестиции"],
      icon: HomeIcon,
      color: "from-blue-50 to-blue-100 border-blue-200",
      iconBg: "bg-blue-500",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
      link: "/buy"
    },
    {
      title: "Хочу продать",
      description: "Быстрая и выгодная продажа вашей недвижимости",
      features: ["Оценка стоимости", "Подготовка к продаже", "Поиск покупателей"],
      icon: DollarSign,
      color: "from-green-50 to-green-100 border-green-200",
      iconBg: "bg-green-500",
      buttonColor: "bg-green-500 hover:bg-green-600",
      link: "/sell"
    },
    {
      title: "Хочу сдать",
      description: "Сдача в аренду с гарантией дохода",
      features: ["Поиск арендаторов", "Оформление договора", "Управление арендой"],
      icon: Key,
      color: "from-purple-50 to-purple-100 border-purple-200",
      iconBg: "bg-purple-500",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
      link: "/rent"
    },
    {
      title: "Дополнительные услуги",
      description: "Ремонт, дизайн, юридическое сопровождение",
      features: ["13 видов услуг", "Полный цикл работ", "Профессиональная команда"],
      icon: Wrench,
      color: "from-orange-50 to-orange-100 border-orange-200",
      iconBg: "bg-accent-orange",
      buttonColor: "bg-accent-orange hover:bg-orange-600",
      link: "/services"
    }
  ];

  const additionalServices = [
    { name: "Предпродажная подготовка", icon: Hammer, color: "bg-blue-100 text-blue-500" },
    { name: "Дизайн-проект", icon: PaintbrushVertical, color: "bg-purple-100 text-purple-500" },
    { name: "Ремонт", icon: Wrench, color: "bg-green-100 text-green-500" },
    { name: "Услуги по земле", icon: MapPin, color: "bg-yellow-100 text-yellow-500" },
    { name: "Подбор участка", icon: MapPin, color: "bg-red-100 text-red-500" },
    { name: "Строительство", icon: Building, color: "bg-indigo-100 text-indigo-500" },
    { name: "Проектирование", icon: Building, color: "bg-pink-100 text-pink-500" },
    { name: "Инженерные системы", icon: Wrench, color: "bg-teal-100 text-teal-500" },
    { name: "Ландшафтный дизайн", icon: PaintbrushVertical, color: "bg-emerald-100 text-emerald-500" },
    { name: "Юридическая проверка", icon: Scale, color: "bg-orange-100 text-orange-500" },
    { name: "Сопровождение сделки", icon: Handshake, color: "bg-cyan-100 text-cyan-500" },
    { name: "Управление недвижимостью", icon: Building, color: "bg-violet-100 text-violet-500" },
    { name: "Комплектация мебелью", icon: HomeIcon, color: "bg-rose-100 text-rose-500" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center"
        style={heroStyle}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Недвижимость в{" "}
              <span className="text-yandex-yellow">Санкт-Петербурге</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90">
              Профессиональные услуги по покупке, продаже и аренде недвижимости. Более 15 лет на рынке СПб.
            </p>
            
            <SearchForm className="max-w-5xl mx-auto mt-12" />
          </div>
        </div>
      </section>

      {/* Promotions Banner - Primary Focus */}
      <PromotionBanner promotions={promotions} category="all" className="mb-0" />

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
            {quickActions.map((action, index) => (
              <Card key={index} className={`group bg-gradient-to-br ${action.color} hover:shadow-xl transition-all duration-300 cursor-pointer h-full`}>
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className={`w-16 h-16 ${action.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="text-white text-2xl w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{action.title}</h3>
                  <p className="text-text-secondary mb-6 flex-1">{action.description}</p>
                  <div className="text-sm text-text-secondary space-y-1 mb-6 min-h-[72px] flex flex-col justify-center">
                    {action.features.map((feature, idx) => (
                      <div key={idx}>• {feature}</div>
                    ))}
                  </div>
                  <Link href={action.link} className="mt-auto">
                    <Button className={`w-full ${action.buttonColor} text-white font-medium`}>
                      {action.title === "Хочу купить" ? "Начать поиск" :
                       action.title === "Хочу продать" ? "Оценить квартиру" :
                       action.title === "Хочу сдать" ? "Сдать в аренду" : "Все услуги"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Рекомендуемые объекты
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Тщательно отобранная недвижимость с лучшим соотношением цена-качество
            </p>
          </div>
          
          {/* Property Carousel */}
          <div className="relative mb-8">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4 min-w-max">
                {properties.slice(0, 8).map((property) => (
                  <div key={property.id} className="flex-none w-80 lg:w-96">
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="text-center">
            <Link href="/buy">
              <Button className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 text-lg">
                Смотреть все объекты →
              </Button>
            </Link>
          </div>
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {newBuildings.slice(0, 3).map((building) => (
              <NewBuildingCard key={building.id} building={building} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/new-buildings">
              <Button className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600">
                Все новостройки СПб
                <ArrowRight className="ml-2 w-4 h-4" />
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow border border-neutral-200">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{service.name}</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Профессиональные услуги высокого качества с гарантией результата
                  </p>
                  <Link href="/services">
                    <Button variant="ghost" className="text-accent-orange font-medium text-sm hover:underline p-0">
                      Подробнее →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Подберем идеального специалиста
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Ответьте на несколько вопросов, и мы найдем риэлтора с нужным опытом и специализацией
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-white hover:shadow-lg transition-shadow text-center border border-neutral-200">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">50+ специалистов</h3>
                  <p className="text-text-secondary">Только проверенные эксперты с опытом от 3 лет</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white hover:shadow-lg transition-shadow text-center border border-neutral-200">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Персональный подбор</h3>
                  <p className="text-text-secondary">Учитываем ваши требования и тип сделки</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white hover:shadow-lg transition-shadow text-center border border-neutral-200">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Быстрый отклик</h3>
                  <p className="text-text-secondary">Специалист свяжется с вами в течение часа</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link href="/realtor-constructor">
                <Button className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 text-lg">
                  Подобрать специалиста
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
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
            
            <ConsultationForm className="max-w-2xl mx-auto" />
          </div>
        </div>
      </section>
    </div>
  );
}
