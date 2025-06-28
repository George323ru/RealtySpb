import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SearchForm from "@/components/search-form";
import PropertyCard from "@/components/property-card";
import NewBuildingCardHorizontal from "@/components/NewBuildingCardHorizontal";
import ConsultationForm from "@/components/consultation-form";
import PromotionBanner from "@/components/promotion-banner";
import MortgageCalculator from "@/components/MortgageCalculator";
import { Skeleton } from "@/components/ui/skeleton";
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
  Clock,
  Info
} from "lucide-react";
import type { Property, NewBuilding, Service, TeamMember, Promotion } from "@shared/schema";
import { useTeamMembers } from "@/hooks/useTeam";
import TeamCard from "@/components/team-card";

// Вспомогательный компонент для стрелки
function CarouselArrow({ direction, onClick, className = "" }: {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Прокрутить влево" : "Прокрутить вправо"}
      className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-xl border border-neutral-200 hover:bg-accent-orange hover:text-white transition-all duration-300 z-30 ${className}`}
      style={{ minWidth: 48, minHeight: 48 }}
    >
      {isLeft ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
    </button>
  );
}

export default function Home() {
  const { data: properties = [], isLoading: isLoadingProperties, isError: isErrorProperties } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  const { data: newBuildings = [] } = useQuery<NewBuilding[]>({
    queryKey: ["/api/new-buildings"],
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: team = [] } = useTeamMembers();

  const { data: promotions = [] } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions"],
  });

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=1920')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  const quickActions = [
    {
      title: "Хочу купить",
      description: "Найдем идеальную недвижимость с экономией до 500 000 рублей",
      features: ["Новостройки с льготами", "Проверенный вторичный рынок", "Доходные инвестиции"],
      icon: HomeIcon,
      color: "from-blue-50 to-blue-100 border-blue-200",
      iconBg: "bg-blue-500",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
      link: "/buy"
    },
    {
      title: "Хочу продать",
      description: "Продаем на 15-20% дороже рынка благодаря профессиональной подготовке",
      features: ["Срочная продажа до 2 недель", "Продажа с подготовкой +20%", "Элитная недвижимость"],
      icon: DollarSign,
      color: "from-green-50 to-green-100 border-green-200",
      iconBg: "bg-green-500",
      buttonColor: "bg-green-500 hover:bg-green-600",
      link: "/sell"
    },
    {
      title: "Хочу сдать",
      description: "Гарантируем заполняемость 95% и стабильный доход без ваших забот",
      features: ["Краткосрочная аренда +40%", "Долгосрочная аренда", "Коммерческая аренда"],
      icon: Key,
      color: "from-purple-50 to-purple-100 border-purple-200",
      iconBg: "bg-purple-500",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
      link: "/rent"
    },
    {
      title: "Хочу заказать услугу",
      description: "Решаем любые задачи с недвижимостью под ключ с гарантией качества",
      features: ["Ремонт и дизайн", "Юридическое сопровождение", "Проектирование"],
      icon: Wrench,
      color: "from-orange-50 to-orange-100 border-orange-200",
      iconBg: "bg-gray-700",
      buttonColor: "bg-accent-orange hover:bg-orange-600",
      link: "/services"
    }
  ];

  // Функция для определения приоритета услуги
  const getServicePriority = (serviceName: string): 'high' | 'medium' | 'low' => {
    const priorities: Record<string, string[]> = {
      'buy': ['Юридическая проверка', 'Сопровождение сделки'],
      'sell': ['Предпродажная подготовка', 'Дизайн-проект'],
      'rent': ['Управление недвижимостью', 'Комплектация мебелью'],
      'service': [] // все равнозначны
    };
    
    const highPriority = priorities[userIntent] || [];
    if (highPriority.includes(serviceName)) return 'high';
    if (userIntent === 'service') return 'medium'; // все услуги равнозначны
    return 'low';
  };

  // Функция для получения контента финального CTA
  const getFinalCTAContent = () => {
    const content = {
      'buy': {
        title: 'Найдите идеальную квартиру за 15 минут',
        description: 'Получите персональную подборку объектов и план покупки с экономией до 500 000 рублей'
      },
      'sell': {
        title: 'Узнайте реальную стоимость вашей недвижимости',
        description: 'Получите профессиональную оценку и план продажи с увеличением цены на 15-20%'
      },
      'rent': {
        title: 'Рассчитайте доходность вашей аренды',
        description: 'Получите анализ рынка и план сдачи с доходностью выше среднерыночной'
      },
      'service': {
        title: 'Получите план решения вашей задачи',
        description: 'Узнайте стоимость работ и получите персональный план реализации проекта'
      }
    };
    
    return content[userIntent] || content['buy'];
  };

  // Функция для динамического контента блока объектов
  const getObjectsSectionContent = () => {
    const content = {
      'buy': {
        title: 'Объекты с гарантированной ликвидностью',
        description: 'Недвижимость, которая растет в цене и легко продается — проверено экспертами'
      },
      'sell': {
        title: 'Объекты, которые мы продали выгодно',
        description: 'Примеры сделок, где мы помогли продать на 15-20% дороже рыночной стоимости'
      },
      'rent': {
        title: 'Объекты с высокой арендной доходностью',
        description: 'Недвижимость, которая приносит стабильный доход от сдачи в аренду'
      },
      'service': {
        title: 'Объекты наших клиентов',
        description: 'Недвижимость, с которой мы работали — от консультации до полного сопровождения'
      }
    };
    
    return content[userIntent];
  };

  // Функция для динамических текстовых мостов
  const getBridgeText = (bridgeType: 'experts-to-objects' | 'objects-to-services' | 'services-to-process') => {
    const bridges: Record<string, Record<string, string>> = {
      'experts-to-objects': {
        'buy': 'С такой командой экспертов покупка становится безопасной. Взгляните на объекты, которые мы проверили и рекомендуем:',
        'sell': 'С такой командой экспертов продажа принесет максимальную прибыль. Посмотрите, какие объекты мы недавно продали выгодно:',
        'rent': 'С такой командой экспертов ваша аренда будет стабильно приносить доход. Изучите объекты с высокой доходностью:',
        'service': 'С такой командой экспертов любая задача решается под ключ. Посмотрите объекты, которые мы уже преобразили:'
      },
      'objects-to-services': {
        'buy': 'Но найти квартиру — это лишь полдела. Настоящее спокойствие дает уверенность, что все дальнейшие шаги тоже под контролем:',
        'sell': 'Чтобы продать так же выгодно, важна правильная подготовка. Наши дополнительные услуги помогут увеличить стоимость:',
        'rent': 'Чтобы сдавать с максимальной доходностью, нужна профессиональная подготовка объекта:',
        'service': 'Все начинается с правильного планирования. Изучите весь спектр наших услуг под ключ:'
      },
      'services-to-process': {
        'buy': 'Покупка квартиры — это не только выбор стен, но и правильная последовательность шагов. Вот как мы проведем вас по этому пути:',
        'sell': 'Чтобы продать выгодно, важен каждый этап. Вот наш проверенный план, который принесет вам больше денег:',
        'rent': 'Успешная сдача требует системного подхода. Вот как мы организуем стабильный доход с вашей недвижимости:',
        'service': 'Любой проект требует четкого плана. Вот как просто и прозрачно мы реализуем вашу задачу:'
      }
    };
    
    return bridges[bridgeType]?.[userIntent] || bridges[bridgeType]?.['buy'] || '';
  };

  const additionalServices = [
    { 
      name: "Предпродажная подготовка", 
      icon: Hammer, 
      color: "bg-blue-100 text-blue-500",
      description: "Увеличиваем стоимость недвижимости на 15-20% за счет правильной подготовки"
    },
    { 
      name: "Дизайн-проект", 
      icon: PaintbrushVertical, 
      color: "bg-purple-100 text-purple-500",
      description: "Создаем дизайн-проект, который поможет продать быстрее и дороже"
    },
    { 
      name: "Ремонт", 
      icon: Wrench, 
      color: "bg-green-100 text-green-500",
      description: "Выполняем ремонт под ключ с гарантией качества и соблюдением сроков"
    },
    { 
      name: "Земля", 
      icon: MapPin, 
      color: "bg-emerald-100 text-emerald-500",
      description: "Поможем найти и оформить участок под строительство или инвестиции"
    },
    { 
      name: "Строительство", 
      icon: Building, 
      color: "bg-indigo-100 text-indigo-500",
      description: "Строим дома с фиксированной стоимостью и гарантией сдачи в срок"
    },
    { 
      name: "Проектирование", 
      icon: Building, 
      color: "bg-pink-100 text-pink-500",
      description: "Разрабатываем проекты домов с учетом всех современных требований"
    },
    { 
      name: "Инженерные системы", 
      icon: Wrench, 
      color: "bg-teal-100 text-teal-500",
      description: "Проектируем и монтируем все инженерные коммуникации под ключ"
    },
    { 
      name: "Ландшафтный дизайн", 
      icon: PaintbrushVertical, 
      color: "bg-green-100 text-green-500",
      description: "Создаем красивые и функциональные ландшафты для вашего участка"
    },
    { 
      name: "Юридическая проверка", 
      icon: Scale, 
      color: "bg-orange-100 text-orange-500",
      description: "Защищаем от юридических рисков и проводим сделки без скрытых проблем"
    },
    { 
      name: "Сопровождение сделки", 
      icon: Handshake, 
      color: "bg-cyan-100 text-cyan-500",
      description: "Ведем сделку от начала до конца, экономя ваше время и нервы"
    },
    { 
      name: "Управление недвижимостью", 
      icon: Building, 
      color: "bg-violet-100 text-violet-500",
      description: "Управляем арендной недвижимостью и обеспечиваем стабильный доход"
    },
    { 
      name: "Комплектация мебелью", 
      icon: HomeIcon, 
      color: "bg-rose-100 text-rose-500",
      description: "Подбираем мебель и декор для повышения привлекательности объекта"
    }
  ];

  // Фаза 0.1: Состояние сценария пользователя
  const [userIntent, setUserIntent] = useState<'buy' | 'sell' | 'rent' | 'service'>('buy');

  // Фаза 4.1: Память сессии - загрузка из localStorage при инициализации
  useEffect(() => {
    const savedIntent = localStorage.getItem('realtyspb-user-intent');
    if (savedIntent && ['buy', 'sell', 'rent', 'service'].includes(savedIntent)) {
      setUserIntent(savedIntent as 'buy' | 'sell' | 'rent' | 'service');
    }
  }, []);

  // Фаза 4.1: Память сессии - сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('realtyspb-user-intent', userIntent);
  }, [userIntent]);

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center py-16 sm:py-20" style={heroStyle} role="banner" aria-label="Поиск недвижимости в Санкт-Петербурге - безопасные сделки с экспертами">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight !text-white" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
              Найдем квартиру вашей мечты <span className="text-accent-orange" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>в сердце Петербурга</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90 !text-white" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
              Более 15 лет защищаем ваши интересы и помогаем принять верное финансовое решение. Гарантируем безопасность сделки и экономию вашего времени.
            </p>
            <SearchForm className="max-w-5xl mx-auto mt-12" />
          </div>
        </div>
        </section>

        {/* Quick Actions (userIntent) */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
          <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">Что вы хотите сделать?</h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">Выберите подходящий вариант и мы поможем решить вашу задачу быстро и профессионально</p>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                // Определяем intent для каждой карточки
                const intent =
                  action.title === "Хочу купить" ? 'buy' :
                  action.title === "Хочу продать" ? 'sell' :
                  action.title === "Хочу сдать" ? 'rent' : 'service';
                const isActive = userIntent === intent;
                return (
                  <Card
                    key={index}
                    className={`group bg-gradient-to-br ${action.color} hover:shadow-2xl shadow-md transition-all duration-300 cursor-pointer h-full border ${isActive ? 'ring-4 ring-accent-orange border-accent-orange' : ''}`}
                    onClick={() => setUserIntent(intent)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isActive}
                  >
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
                    <Button className={`w-full ${action.buttonColor} text-white font-medium ${
                      action.title === "Хочу купить" ? "shadow-lg shadow-blue-500/25 py-3" : ""
                    }`}>
                          {action.title === "Хочу купить"
                            ? "Начать поиск"
                            : action.title === "Хочу продать"
                            ? "Выбрать способ продажи"
                            : action.title === "Хочу сдать"
                            ? "Выбрать тип аренды"
                            : "Смотреть услуги"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Мост: доверие */}
        <div className="text-center text-lg text-text-secondary my-8">Почему нам доверяют сотни клиентов?</div>

        {/* Блок: Почему нам доверяют (заглушка) */}
        <section className="py-12 bg-neutral-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className={`text-4xl font-bold mb-2 transition-all duration-500 ${
                  userIntent === 'buy' ? 'text-accent-orange scale-110 animate-pulse' : 'text-accent-orange'
                }`}>
                  15+ лет
                </div>
                <div className="text-text-secondary">на рынке недвижимости</div>
                {userIntent === 'buy' && (
                  <div className="text-xs text-accent-orange mt-1 font-medium">
                    ✓ Гарантия надежности для покупателей
                  </div>
                )}
              </div>
              <div>
                <div className={`text-4xl font-bold mb-2 transition-all duration-500 ${
                  userIntent === 'sell' ? 'text-accent-orange scale-110 animate-pulse' : 'text-accent-orange'
                }`}>
                  1000+ клиентов
                </div>
                <div className="text-text-secondary">доверили нам сделки</div>
                {userIntent === 'sell' && (
                  <div className="text-xs text-accent-orange mt-1 font-medium">
                    ✓ Продаем на 15-20% дороже рынка
                  </div>
                )}
              </div>
              <div>
                <div className={`text-4xl font-bold mb-2 transition-all duration-500 ${
                  userIntent === 'service' ? 'text-accent-orange scale-110 animate-pulse' : 'text-accent-orange'
                }`}>
                  50+ экспертов
                </div>
                <div className="text-text-secondary">в команде</div>
                {userIntent === 'service' && (
                  <div className="text-xs text-accent-orange mt-1 font-medium">
                    ✓ Решаем любые задачи под ключ
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-8">
              {/* Логотипы банков-партнеров (заглушки) */}
              <div className="w-24 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Сбер</div>
              <div className="w-24 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">ВТБ</div>
              <div className="w-24 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Альфа</div>
            </div>
            
            {/* Ссылка на отзывы */}
            <div className="text-center mt-6">
              <Link href="/reviews" className="text-accent-orange hover:text-orange-600 font-medium text-sm transition-colors underline">
                Читать отзывы наших клиентов →
              </Link>
            </div>
          </div>
        </section>

        {/* Блок: Наши ведущие эксперты */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                Познакомьтесь с нашими ведущими экспертами
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Опытные профессионалы, которые лично проведут вас через каждый этап сделки
              </p>
            </div>
            
            {team && team.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {team.slice(0, 3).map((member) => (
                  <TeamCard key={member.id} member={member} className="transform hover:scale-105 transition-transform" />
                ))}
              </div>
            )}
            
            <div className="text-center mt-8">
              <Link href="/team" className="text-accent-orange hover:text-orange-600 font-medium transition-colors underline">
                Познакомиться со всей командой →
              </Link>
            </div>
          </div>
        </section>

        {/* Мост: экспертиза */}
        <div className="text-center text-lg text-text-secondary my-8">{getBridgeText('experts-to-objects')}</div>

        {/* Блок: Объекты (объединённый, с табами — пока оставить как есть) */}
        <section className="py-16 bg-neutral-100">
          <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              {getObjectsSectionContent().title}
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {getObjectsSectionContent().description}
            </p>
            </div>

            {/* Контекстная плашка для продавцов */}
            {userIntent === 'sell' && (
              <Alert className="mb-8 border-accent-orange bg-orange-50 text-orange-800 max-w-4xl mx-auto">
                <Info className="h-5 w-5 text-accent-orange" />
                <AlertTitle className="font-semibold">Продаете похожий объект?</AlertTitle>
                <AlertDescription>
                  Мы уже продали похожие объекты на 15-20% дороже рынка.{" "}
                  <Link href="/sell" className="underline font-medium hover:text-orange-900">
                    Узнайте, как мы это делаем →
                  </Link>
                </AlertDescription>
              </Alert>
            )}
          
          {/* Property Carousel */}
            <div className="mb-8">
              <div className="flex items-center w-full">
                <CarouselArrow
                  direction="left"
                  onClick={() => {
                    const container = document.getElementById('properties-scroll');
                    if (container) container.scrollBy({ left: -400, behavior: 'smooth' });
                  }}
                  className="mr-2"
                />
            <div 
              id="properties-scroll"
                  className="overflow-x-auto scrollbar-hide px-4 w-full"
                  style={{ scrollBehavior: 'smooth' }}
            >
              <div className="flex gap-6 pb-4 min-w-max">
                {isLoadingProperties ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex-none w-80 lg:w-96">
                      <Skeleton className="h-[400px] w-full" />
                    </div>
                  ))
                ) : isErrorProperties ? (
                  <div className="text-center text-red-500 py-8 col-span-full">
                    Не удалось загрузить объекты. Попробуйте позже.
                  </div>
                ) : properties && properties.length > 0 ? (
                  properties.map((property) => (
                    <div key={property.id} className="flex-none w-80 lg:w-96">
                      <PropertyCard property={property} />
                    </div>
                  ))
                ) : (
                  <div className="text-center text-text-secondary py-8 col-span-full w-full">
                    Рекомендуемых объектов пока нет.
                  </div>
                )}
                  </div>
                </div>
                <CarouselArrow
                  direction="right"
                  onClick={() => {
                    const container = document.getElementById('properties-scroll');
                    if (container) container.scrollBy({ left: 400, behavior: 'smooth' });
                  }}
                  className="ml-2"
                />
              </div>
          </div>
          
          {/* CTA Button */}
          <div className="text-center">
            <Link href={userIntent === 'sell' ? '/sell' : userIntent === 'rent' ? '/rent' : '/buy'}>
              <Button className="bg-accent-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 text-lg">
                {userIntent === 'sell' ? 'Продать похожий объект →' : 
                 userIntent === 'rent' ? 'Сдать недвижимость →' : 
                 'Смотреть все объекты →'}
              </Button>
            </Link>
            </div>
          </div>
        </section>

        {/* Мост: услуги */}
        <div className="text-center text-lg text-text-secondary my-8">{getBridgeText('objects-to-services')}</div>

        {/* Блок: Услуги */}
        <section className="py-16 bg-neutral-100">
          <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Экспертные услуги под ключ
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Решаем все задачи с недвижимостью — от юридического сопровождения до дизайна интерьера
            </p>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => {
              const priority = getServicePriority(service.name);
              const priorityStyles = {
                'high': 'bg-white hover:shadow-xl transition-all border-2 border-accent-orange scale-105 relative z-10',
                'medium': 'bg-white hover:shadow-lg transition-shadow border border-neutral-200',
                'low': 'bg-white hover:shadow-lg transition-shadow border border-neutral-200 opacity-75'
              };
              
              return (
                <Card key={index} className={`${priorityStyles[priority]} h-full`}>
                                    <CardContent className="p-6 h-full flex flex-col">
                    {/* Индикатор приоритета */}
                    {priority === 'high' && (
                      <div className="absolute -top-2 -right-2 bg-accent-orange text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Рекомендуем
                      </div>
                    )}
                    
                    {/* Иконка */}
                    <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 ${priority === 'high' ? 'ring-2 ring-accent-orange ring-offset-2' : ''}`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                  
                  {/* Заголовок с естественной высотой */}
                  <h3 className="text-xl font-semibold text-text-primary mb-3 min-h-[2.5rem] flex items-start leading-tight">
                    {service.name}
                  </h3>
                  
                  {/* Описание с автоматическим расширением */}
                  <p className="text-sm text-text-secondary leading-relaxed flex-grow mb-6">
                    {service.description}
                  </p>
                  
                  {/* Кнопка всегда внизу */}
                  <div className="mt-auto">
                    <Link href="/services">
                      <Button 
                        variant="ghost" 
                        className="text-accent-orange font-medium text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors p-2 rounded-md w-full justify-start !shadow-none border-0"
                      >
                        Подробнее →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              );
            })}
            </div>
          </div>
        </section>

        {/* Мост: процесс */}
        <div className="text-center text-lg text-text-secondary my-8">{getBridgeText('services-to-process')}</div>

        {/* Блок: Как мы работаем (заглушка) */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="w-12 h-12 mx-auto mb-2 bg-accent-orange rounded-full" />
                <div className="font-semibold mb-1">1. Консультация</div>
                <div className="text-text-secondary text-sm">Обсуждаем ваши цели и задачи</div>
                    </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-2 bg-accent-orange rounded-full" />
                <div className="font-semibold mb-1">2. Подбор вариантов</div>
                <div className="text-text-secondary text-sm">Находим лучшие объекты под ваш запрос</div>
                    </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-2 bg-accent-orange rounded-full" />
                <div className="font-semibold mb-1">3. Юридическая проверка</div>
                <div className="text-text-secondary text-sm">Гарантируем чистоту сделки</div>
                    </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-2 bg-accent-orange rounded-full" />
                <div className="font-semibold mb-1">4. Сделка и сопровождение</div>
                <div className="text-text-secondary text-sm">Ведем до получения ключей</div>
              </div>
            </div>
          </div>
        </section>

        {/* Мост: команда */}
        <div className="text-center text-lg text-text-secondary my-8">Ваша команда экспертов всегда на связи:</div>

        {/* Блок: Команда */}
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
                  <h3 className="text-xl font-bold text-text-primary mb-2">50+ экспертов</h3>
                  <p className="text-text-secondary">Каждый с опытом от 5 лет и успешными сделками на 500+ млн ₽</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white hover:shadow-lg transition-shadow text-center border border-neutral-200">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Точная аналитика</h3>
                  <p className="text-text-secondary">Подбираем специалиста по 15 критериям под ваши цели</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white hover:shadow-lg transition-shadow text-center border border-neutral-200">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-orange-600" />
                    </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Отклик за 10 минут</h3>
                  <p className="text-text-secondary">Эксперт свяжется с готовым планом решения вашей задачи</p>
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

        {/* Блок: Обращение основателя */}
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-accent-orange to-orange-600 flex items-center justify-center text-white text-4xl lg:text-5xl font-bold">
                        АК
                      </div>
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                        Александр Козлов
                      </h3>
                      <p className="text-accent-orange font-semibold mb-4">
                        Основатель RealtySpb
                      </p>
                      <blockquote className="text-lg text-text-secondary leading-relaxed italic">
                        "Здравствуйте! Я создал RealtySpb с одной целью — сделать процесс работы с недвижимостью 
                        честным, понятным и безопасным для каждой семьи. За {new Date().getFullYear() - 2008} лет мы 
                        помогли тысячам людей найти свой дом и защитили их от ошибок, которые могут стоить миллионы. 
                        Мы здесь, чтобы защитить ваши интересы."
                      </blockquote>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Финальный CTA */}
        <section className="py-16 bg-gradient-to-r from-accent-orange to-orange-600 conversion-section">
          <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-black">
              {getFinalCTAContent().title} — бесплатно
            </h2>
            <p className="text-xl mb-8 text-black">
              {getFinalCTAContent().description}
            </p>
            
            <div className="max-w-2xl mx-auto">
              <ConsultationForm />
              
              {/* Альтернативный, низкопороговый CTA */}
              <div className="mt-6 text-center">
                <div className="text-white/80 text-sm mb-3">или</div>
                <button 
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
                  onClick={() => {
                    // TODO: Реализовать скачивание файла
                    alert('Скачивание файла будет реализовано позже');
                  }}
                >
                  {userIntent === 'buy' ? '📋 Скачать чек-лист проверки квартиры' :
                   userIntent === 'sell' ? '📊 Скачать гид по продаже недвижимости' :
                   userIntent === 'rent' ? '💰 Скачать калькулятор доходности аренды' :
                   '🎯 Скачать план решения задач с недвижимостью'}
                </button>
              </div>
            </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
