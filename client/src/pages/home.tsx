import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
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
import { staggerContainer, staggerItem } from "@/components/ui/animations";
import type { Property, NewBuilding, Service, Promotion } from "@shared/schema";
import { Info, ArrowRight, Users, CheckCircle, Clock } from "lucide-react";

// Блок "Как мы работаем"
function HowWeWorkSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with justify-between layout */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Как мы работаем
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Прозрачный процесс от первой консультации до получения ключей
            </p>
          </div>
        </div>

        {/* Glassmorphism grid with stagger animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            {
              step: "1",
              title: "Консультация",
              description: "Обсуждаем ваши цели и задачи"
            },
            {
              step: "2",
              title: "Подбор вариантов",
              description: "Находим лучшие объекты под ваш запрос"
            },
            {
              step: "3",
              title: "Юридическая проверка",
              description: "Гарантируем чистоту сделки"
            },
            {
              step: "4",
              title: "Сделка и сопровождение",
              description: "Ведем до получения ключей"
            }
          ].map((item, index) => (
            <motion.div
              key={item.step}
              variants={staggerItem}
              className="glass p-6 text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Number badge */}
              <div className="w-12 h-12 mx-auto mb-4 bg-accent-orange text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                {item.step}
              </div>

              {/* Title */}
              <h3 className="font-semibold mb-2 text-card-foreground">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Блок "Подбор специалиста"
function RealtorSelectionSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with justify-between layout */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Подберем идеального специалиста
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Ответьте на несколько вопросов, и мы найдем риэлтора с нужным опытом и специализацией
            </p>
          </div>
          <div className="hidden md:block">
            <Link href="/realtor-constructor">
              <Button variant="outline" className="text-accent-orange border-accent-orange hover:bg-accent-orange/5">
                Подобрать специалиста
              </Button>
            </Link>
          </div>
        </div>
        {/* Grid of expert cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-accent-orange" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">50+ экспертов</h3>
              <p className="text-muted-foreground">Каждый с опытом от 5 лет и успешными сделками на 500+ млн ₽</p>
            </CardContent>
          </Card>
          <Card className="text-center group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-8 h-8 text-accent-orange" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">Точная аналитика</h3>
              <p className="text-muted-foreground">Подбираем специалиста по 15 критериям под ваши цели</p>
            </CardContent>
          </Card>
          <Card className="text-center group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-accent-orange" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">Отклик за 10 минут</h3>
              <p className="text-muted-foreground">Эксперт свяжется с готовым планом решения вашей задачи</p>
            </CardContent>
          </Card>
        </div>

        {/* Mobile button */}
        <div className="text-center md:hidden">
          <Link href="/realtor-constructor">
            <Button className="text-accent-orange border-accent-orange hover:bg-accent-orange/5">
              Подобрать специалиста
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Блок "Обращение основателя"
function FounderSection() {
    return (
        <section className="py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Two-column layout for Vision section */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Left column - Text content */}
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight mb-6">
                            Обращение основателя
                        </h2>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-card-foreground">
                                Александр Козлов
                            </h3>
                            <p className="text-accent-orange font-semibold text-lg">
                                Основатель RealtySpb
                            </p>
                            <blockquote className="text-lg text-muted-foreground leading-relaxed italic">
                                "Здравствуйте! Я создал RealtySpb с одной целью — сделать процесс работы с недвижимостью
                                честным, понятным и безопасным для каждой семьи. За {new Date().getFullYear() - 2008} лет мы
                                помогли тысячам людей найти свой дом и защитили их от ошибок, которые могут стоить миллионы.
                                Мы здесь, чтобы защитить ваши интересы."
                            </blockquote>
                        </div>
                    </div>

                    {/* Right column - Founder avatar */}
                    <div className="flex justify-center md:justify-end">
                        <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-accent-orange to-orange-600 flex items-center justify-center text-white text-5xl lg:text-6xl font-bold shadow-2xl">
                            АК
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Компонент-мост для текстовых переходов
function SectionBridge({ text }: { text: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center text-lg text-muted-foreground py-8">{text}</div>
    </div>
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
        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with justify-between layout */}
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold tracking-tight mb-4">
                  {objectsContent.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {objectsContent.description}
                </p>
              </div>
              <div className="hidden md:block">
                <Link href="/buy">
                  <Button variant="outline" className="text-accent-orange border-accent-orange hover:bg-accent-orange/5">
                    Все объекты
                  </Button>
                </Link>
              </div>
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

            {/* Grid of property cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {isLoadingProperties ? (
                Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[450px] w-full" />)
              ) : (
                properties.slice(0, 6).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>

            {/* Mobile button */}
            <div className="text-center mt-12 md:hidden">
              <Link href="/buy">
                <Button variant="outline" className="text-accent-orange border-accent-orange hover:bg-accent-orange/5">
                  Все объекты
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Новостройки */}
        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with justify-between layout */}
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold tracking-tight mb-4">
                  Новостройки от надежных застройщиков
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  Ипотека от 3%, квартиры с отделкой и без, полное сопровождение.
                </p>
              </div>
            </div>

            {/* Grid of new buildings */}
            <div className="grid md:grid-cols-2 gap-6">
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
        <section className="py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with justify-between layout */}
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight mb-4">
                            Наши услуги
                        </h2>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">
                            Полный спектр услуг для комфортной сделки с недвижимостью
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <Link href="/services">
                            <Button variant="outline" className="text-accent-orange border-accent-orange hover:bg-accent-orange/5">
                                Все услуги
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Grid of services */}
                <div className="grid md:grid-cols-3 gap-6">
                    {services.slice(0, 6).map((service) => {
                        const priority = getServicePriority(service.name);
                        return (
                            <Card key={service.id} className={`group hover:shadow-lg transition-all duration-300 h-full flex flex-col ${priority === 'high' ? 'ring-2 ring-accent-orange/20' : ''}`}>
                                <CardContent className="p-6 flex flex-col flex-grow">
                                    {priority === 'high' && (
                                        <div className="text-xs font-bold text-accent-orange uppercase tracking-wider mb-2">
                                            Рекомендуем для вас
                                        </div>
                                    )}
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${priority === 'high' ? 'bg-accent-orange/10' : 'bg-muted'}`}>
                                      {/* Иконка будет добавлена позже или через маппинг */}
                                    </div>
                                    <h3 className="text-xl font-semibold text-card-foreground mb-3 min-h-[2.5rem] flex items-start leading-tight">
                                        {service.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-6">
                                        {service.description}
                                    </p>
                                    <div className="mt-auto">
                                        <Link href="/services">
                                            <Button variant="ghost" className="text-accent-orange font-medium text-sm hover:bg-accent-orange/5 transition-colors p-2 rounded-md w-full justify-start">
                                                Подробнее →
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Mobile button */}
                <div className="text-center mt-12 md:hidden">
                    <Link href="/services">
                        <Button variant="outline" className="text-accent-orange border-accent-orange hover:bg-accent-orange/5">
                            Все услуги
                        </Button>
                    </Link>
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
