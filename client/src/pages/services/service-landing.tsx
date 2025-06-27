import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, Users, Award, Clock } from "lucide-react";
import UnifiedForm from "@/components/UnifiedForm";
import { SERVICES } from "@/lib/constants";
import PreSalePreparation from "./PreSalePreparation";

// Подробные данные для каждой услуги
const SERVICE_DATA = {
  "pre-sale-preparation": {
    title: "Предпродажная подготовка недвижимости",
    subtitle: "Увеличим стоимость вашей недвижимости на 15-30%",
    description: "Комплексная подготовка недвижимости к продаже включает юридическую проверку, оценку состояния, рекомендации по улучшению и маркетинговое позиционирование.",
    benefits: [
      "Увеличение стоимости на 15-30%",
      "Сокращение времени продажи в 2-3 раза",
      "Профессиональная фотосъемка",
      "Юридическая чистота сделки",
      "Маркетинговое позиционирование"
    ],
    process: [
      "Осмотр и оценка объекта",
      "Анализ документов",
      "План улучшений",
      "Реализация рекомендаций",
      "Подготовка к продаже"
    ],
    price: "от 50 000 ₽",
    duration: "7-14 дней"
  },
  "design-project": {
    title: "Дизайн-проект недвижимости",
    subtitle: "Создаем уникальные интерьеры под ваш стиль жизни",
    description: "Разработка индивидуального дизайн-проекта с учетом функциональных потребностей, стиля жизни и бюджета клиента.",
    benefits: [
      "Индивидуальный подход",
      "3D-визуализация проекта",
      "Подбор материалов и мебели",
      "Авторский надзор",
      "Гарантия на проект"
    ],
    process: [
      "Техническое задание",
      "Концепция и планировка",
      "3D-визуализация",
      "Рабочие чертежи",
      "Авторский надзор"
    ],
    price: "от 2 500 ₽/м²",
    duration: "30-45 дней"
  },
  "renovation": {
    title: "Ремонт под ключ",
    subtitle: "Качественный ремонт с гарантией результата",
    description: "Полный спектр ремонтных работ от косметического до капитального ремонта с использованием качественных материалов.",
    benefits: [
      "Гарантия на работы 3 года",
      "Фиксированная стоимость",
      "Качественные материалы",
      "Соблюдение сроков",
      "Уборка после ремонта"
    ],
    process: [
      "Замеры и смета",
      "Демонтажные работы",
      "Черновые работы",
      "Чистовые работы",
      "Финальная приемка"
    ],
    price: "от 15 000 ₽/м²",
    duration: "2-6 месяцев"
  },
  "construction": {
    title: "Строительство домов",
    subtitle: "Строим дома вашей мечты",
    description: "Полный цикл строительства от проектирования до сдачи объекта с гарантией качества и соблюдением сроков.",
    benefits: [
      "Собственная строительная база",
      "Контроль качества на всех этапах",
      "Гарантия 5 лет",
      "Фиксированная стоимость",
      "Помощь с документами"
    ],
    process: [
      "Проектирование",
      "Фундаментные работы",
      "Возведение стен и кровли",
      "Инженерные системы",
      "Отделочные работы"
    ],
    price: "от 45 000 ₽/м²",
    duration: "6-12 месяцев"
  },
  "legal-check": {
    title: "Юридическая проверка недвижимости",
    subtitle: "Защитим вас от рисков при покупке",
    description: "Комплексная юридическая проверка недвижимости, выявление рисков и составление заключения о безопасности сделки.",
    benefits: [
      "Проверка всех документов",
      "Выявление скрытых рисков",
      "Страхование ответственности",
      "Юридическое сопровождение",
      "Гарантия чистоты сделки"
    ],
    process: [
      "Сбор документов",
      "Проверка в реестрах",
      "Анализ истории объекта",
      "Выявление обременений",
      "Заключение о рисках"
    ],
    price: "от 25 000 ₽",
    duration: "3-5 дней"
  },
  "transaction-support": {
    title: "Сопровождение сделок",
    subtitle: "Безопасное проведение сделок с недвижимостью",
    description: "Полное юридическое и техническое сопровождение сделки от подписания предварительного договора до регистрации права собственности.",
    benefits: [
      "Минимизация рисков",
      "Контроль всех этапов",
      "Работа с банками",
      "Страхование сделки",
      "Послепродажное обслуживание"
    ],
    process: [
      "Предварительный договор",
      "Проверка документов",
      "Подготовка к сделке",
      "Проведение расчетов",
      "Регистрация права"
    ],
    price: "от 1% от стоимости",
    duration: "10-20 дней"
  },
  "property-management": {
    title: "Управление недвижимостью",
    subtitle: "Профессиональное управление вашими объектами",
    description: "Комплексное управление недвижимостью включает поиск арендаторов, ведение документооборота, контроль состояния объектов.",
    benefits: [
      "Поиск надежных арендаторов",
      "Максимизация доходности",
      "Контроль состояния объекта",
      "Ведение документооборота",
      "Решение спорных вопросов"
    ],
    process: [
      "Анализ объекта",
      "Маркетинговая стратегия",
      "Поиск арендаторов",
      "Заключение договоров",
      "Постоянное управление"
    ],
    price: "от 8% от аренды",
    duration: "Постоянно"
  },
  "design": {
    title: "Проектирование",
    subtitle: "Архитектурное проектирование под ключ",
    description: "Полный цикл проектирования от концепции до рабочих чертежей с учетом всех норм и требований.",
    benefits: [
      "Индивидуальный подход",
      "Соблюдение всех норм",
      "Согласование в инстанциях",
      "Авторский надзор",
      "Гарантия качества"
    ],
    process: [
      "Техническое задание",
      "Эскизный проект",
      "Проектная документация",
      "Рабочие чертежи",
      "Авторский надзор"
    ],
    price: "от 800 ₽/м²",
    duration: "45-90 дней"
  },
  "engineering-systems": {
    title: "Инженерные системы",
    subtitle: "Проектирование и монтаж инженерных коммуникаций",
    description: "Комплексные решения по инженерным системам: отопление, водоснабжение, электрика, вентиляция.",
    benefits: [
      "Энергоэффективные решения",
      "Современное оборудование",
      "Гарантия на системы",
      "Сервисное обслуживание",
      "Соответствие нормам"
    ],
    process: [
      "Техническое обследование",
      "Проектирование систем",
      "Поставка оборудования",
      "Монтажные работы",
      "Пуско-наладка"
    ],
    price: "от 3 000 ₽/м²",
    duration: "30-60 дней"
  },
  "landscape-design": {
    title: "Ландшафтный дизайн",
    subtitle: "Создание уникальных ландшафтных решений",
    description: "Проектирование и реализация ландшафтного дизайна территории с учетом климатических особенностей.",
    benefits: [
      "Уникальный дизайн",
      "Адаптация к климату",
      "Качественные растения",
      "Системы полива",
      "Долговечность решений"
    ],
    process: [
      "Анализ участка",
      "Концепция дизайна",
      "Проектная документация",
      "Подготовка территории",
      "Реализация проекта"
    ],
    price: "от 2 000 ₽/м²",
    duration: "30-120 дней"
  },
  "furniture-selection": {
    title: "Комплектация мебелью",
    subtitle: "Профессиональный подбор и расстановка мебели",
    description: "Полная комплектация объекта мебелью и предметами интерьера с учетом стиля и бюджета.",
    benefits: [
      "Подбор под стиль",
      "Работа с поставщиками",
      "Контроль качества",
      "Доставка и сборка",
      "Гарантия на мебель"
    ],
    process: [
      "Анализ потребностей",
      "Подбор вариантов",
      "Согласование с клиентом",
      "Заказ и доставка",
      "Сборка и расстановка"
    ],
    price: "от 15% от стоимости",
    duration: "14-45 дней"
  }
};

export default function ServiceLanding() {
  const { slug } = useParams();
  
  // Специальная страница для предпродажной подготовки
  if (slug === "pre-sale-preparation") {
    return <PreSalePreparation />;
  }
  
  const serviceData = SERVICE_DATA[slug as keyof typeof SERVICE_DATA];
  const serviceInfo = SERVICES.find(s => s.slug === slug);

  if (!serviceData || !serviceInfo) {
    return <div>Услуга не найдена</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-orange to-orange-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6">
              <i className={`${serviceInfo.icon} text-3xl`}></i>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">{serviceData.title}</h1>
            <p className="text-xl lg:text-2xl mb-8 text-orange-100">{serviceData.subtitle}</p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">{serviceData.description}</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline" className="bg-white/10 text-white border-white/30 text-lg px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                {serviceData.duration}
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/30 text-lg px-4 py-2">
                <Award className="w-5 h-5 mr-2" />
                {serviceData.price}
              </Badge>
            </div>

            <Button size="lg" variant="outline" className="bg-white text-accent-orange hover:bg-gray-50 border-white text-lg px-8 py-3">
              Получить консультацию
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">Преимущества услуги</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceData.benefits.map((benefit, index) => (
                <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-text-primary font-medium">{benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">Как мы работаем</h2>
            <div className="space-y-6">
              {serviceData.process.map((step, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50">
                  <div className="w-10 h-10 bg-accent-orange text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="text-lg text-text-primary font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent-orange mb-2">500+</div>
                <p className="text-gray-300">Выполненных проектов</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-orange mb-2">15+</div>
                <p className="text-gray-300">Лет опыта</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-orange mb-2">98%</div>
                <p className="text-gray-300">Довольных клиентов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-text-primary">Получить консультацию</h2>
              <p className="text-text-secondary">Оставьте заявку, и мы свяжемся с вами в течение 15 минут</p>
            </div>
            
            <UnifiedForm
              title="Заказать услугу"
              serviceType={serviceData.title}
              buttonText="Получить консультацию"
              successTitle="Заявка отправлена!"
              successMessage="Мы свяжемся с вами в ближайшее время для обсуждения деталей."
              className="bg-gray-50 p-8 rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}