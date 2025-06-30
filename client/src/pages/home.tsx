import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PropertyCard from "@/components/PropertyCard";
import NewBuildingCardHorizontal from "@/components/NewBuildingCardHorizontal";
import PromotionBanner from "@/components/promotion-banner";
import MortgageCalculator from "@/components/MortgageCalculator";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  HeroSection, 
  QuickActionsSection, 
  TrustStatsSection, 
  TeamExpertsSection, 
  FinalCTASection 
} from "@/components/home";
import { useUserIntent } from "@/hooks/useUserIntent";
import type { Property, NewBuilding, Service, Promotion } from "@shared/schema";
import { Info, ArrowRight, Users, CheckCircle, Clock } from "lucide-react";

// Блок "Как мы работаем"
function HowWeWorkSection() {
  return (
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
  );
}

// Блок "Подбор специалиста"
function RealtorSelectionSection() {
  return (
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
  );
}

// Блок "Обращение основателя"
function FounderSection() {
    return (
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
    );
}

// Компонент-мост для текстовых переходов
function SectionBridge({ text }: { text: string }) {
  return (
    <div className="text-center text-lg text-text-secondary my-8">{text}</div>
  );
}

// Основной компонент страницы Home
export default function Home() {
  const { 
    userIntent, 
    setUserIntent, 
    getBridgeText, 
    getObjectsSectionContent, 
    getServicePriority 
  } = useUserIntent();

  const { data: properties = [], isLoading: isLoadingProperties } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  const { data: newBuildings = [] } = useQuery<NewBuilding[]>({
    queryKey: ["/api/new-buildings"],
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: promotions = [] } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions"],
  });

  const objectsContent = getObjectsSectionContent();

  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />

        <QuickActionsSection userIntent={userIntent} onUserIntentChange={setUserIntent} />
        
        <SectionBridge text="Почему нам доверяют сотни клиентов?" />
        <TrustStatsSection userIntent={userIntent} />

        <TeamExpertsSection />
        
        <SectionBridge text={getBridgeText('experts-to-objects')} />

        {/* Блок: Объекты */}
        <section className="py-16 bg-neutral-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                {objectsContent.title}
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                {objectsContent.description}
              </p>
            </div>

            {userIntent === 'sell' && (
              <Alert className="mb-8 border-accent-orange bg-orange-50 text-orange-800 max-w-4xl mx-auto">
                <Info className="h-5 w-5 text-accent-orange" />
                <AlertTitle className="font-semibold">Продаете похожий объект?</AlertTitle>
                <AlertDescription>
                  Мы уже продали похожие объекты на 15-20% дороже рынка.{" "}
                  <Link href="/sell" className="underline font-medium hover:text-orange-900">
                    Узнайте, как мы можем помочь вам.
                  </Link>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoadingProperties ? (
                Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[450px] w-full" />)
              ) : (
                properties.slice(0, 4).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>
            <div className="text-center mt-12">
              <Link href="/buy">
                <Button size="lg" variant="outline" className="text-accent-orange border-accent-orange hover:bg-orange-50 hover:text-orange-600">
                  Смотреть все объекты
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Новостройки */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Новостройки от надежных застройщиков
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Ипотека от 3%, квартиры с отделкой и без, полное сопровождение.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newBuildings.slice(0, 4).map(building => (
                <NewBuildingCardHorizontal key={building.id} building={building} />
              ))}
            </div>
          </div>
        </section>
        
        {promotions.length > 0 && <PromotionBanner promotions={promotions} />}
        
        <MortgageCalculator />

        <SectionBridge text={getBridgeText('objects-to-services')} />

        {/* Блок: Услуги */}
        <section className="py-12 bg-neutral-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.slice(0, 4).map((service) => {
                        const priority = getServicePriority(service.name);
                        return (
                            <Card key={service.id} className={`group hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${priority === 'high' ? 'bg-orange-50' : 'bg-white'}`}>
                                <CardContent className="p-6 flex flex-col flex-grow">
                                    {priority === 'high' && (
                                        <div className="text-xs font-bold text-accent-orange uppercase tracking-wider mb-2">
                                            Рекомендуем для вас
                                        </div>
                                    )}
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${priority === 'high' ? 'ring-2 ring-accent-orange ring-offset-2' : ''}`}>
                                      {/* Иконка будет добавлена позже или через маппинг */}
                                    </div>
                                    <h3 className="text-xl font-semibold text-text-primary mb-3 min-h-[2.5rem] flex items-start leading-tight">
                                        {service.name}
                                    </h3>
                                    <p className="text-sm text-text-secondary leading-relaxed flex-grow mb-6">
                                        {service.description}
                                    </p>
                                    <div className="mt-auto">
                                        <Link href="/services">
                                            <Button variant="ghost" className="text-accent-orange font-medium text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors p-2 rounded-md w-full justify-start !shadow-none border-0">
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

        <SectionBridge text={getBridgeText('services-to-process')} />
        
        <HowWeWorkSection />
        
        <SectionBridge text="Ваша команда экспертов всегда на связи:" />
        
        <RealtorSelectionSection />
        
        <FounderSection />

        <FinalCTASection userIntent={userIntent} />
      </main>
    </div>
  );
}
