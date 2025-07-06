import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import LeadForm from "../../components/LeadForm";
import { CheckCircle, Award, Users, ShieldCheck, ArrowRight, Phone, Send, MessageSquare, Gavel, Scale, FileText, Lock, FileCheck2, PiggyBank, Search, BrainCircuit, FileStack, ArrowLeft, Euro, Clock, BarChart } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../../components/ui/carousel";
import React from "react";
import { cn } from "../../lib/utils";

// 1. Hero Block Data
const heroData = {
  title: (
    <>
      Юридическая проверка недвижимости:
      <span className="text-yandex-yellow"> 100% гарантия</span> чистоты сделки
    </>
  ),
  subtitle: "Проверяем объекты в Санкт-Петербурге и ЛО. Защищаем от мошенников, долгов и рисков потери собственности.",
  cta1: "Заказать проверку",
  cta2: "Примеры отчетов",
};

// 2. Social Proof Data
const socialProofData = {
  title: "Доверяйте фактам, а не словам",
  stats: [
    { icon: <Gavel className="w-8 h-8 text-accent-orange" />, value: "1000+", label: "проверенных объектов" },
    { icon: <Users className="w-8 h-8 text-accent-orange" />, value: "300 млн ₽+", label: "сэкономлено клиентам" },
    { icon: <Award className="w-8 h-8 text-accent-orange" />, value: "12 лет", label: "опыта юристов" },
  ],
};

// 3. Problem -> Solution Data
const beforeAfterData = [
  {
    title: "Риски покупки без проверки",
    points: [
      "Скрытые собственники и наследники",
      "Долги по коммунальным платежам и налогам",
      "Незаконные перепланировки",
      "Риск потерять и деньги, и квартиру",
    ],
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-500",
  },
  {
    title: "Безопасность с нашей проверкой",
    points: [
      "Полная история объекта и собственников",
      "Гарантия отсутствия обременений и долгов",
      "Рекомендации по устранению рисков",
      "Спокойствие и уверенность в сделке",
    ],
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-500",
  },
];

// 4. How it Works Data
const processSteps = [
  {
    step: "01",
    icon: <FileStack className="w-8 h-8 text-accent-orange" />,
    title: "Минимум бюрократии",
    description: "От вас — только кадастровый номер. Всю рутинную работу по сбору десятков справок и выписок мы берем на себя.",
  },
  {
    step: "02",
    icon: <Search className="w-8 h-8 text-accent-orange" />,
    title: "Глубокое сканирование",
    description: "Наши юристы «просвечивают» объект и всех его собственников. Вы узнаете о скрытых рисках, которых нет в открытых источниках.",
  },
  {
    step: "03",
    icon: <FileCheck2 className="w-8 h-8 text-accent-orange" />,
    title: "Отчет на человеческом языке",
    description: "Вы получаете простой и понятный документ, а не юридический трактат. Все риски и рекомендации — на одной странице.",
  },
  {
    step: "04",
    icon: <Gavel className="w-8 h-8 text-accent-orange" />,
    title: "Финальное заключение",
    description: "Вы получаете однозначный ответ: «Да» или «Нет». Наш юрист лично объяснит каждый пункт, чтобы у вас не осталось сомнений.",
  },
];

// 5. Unique Advantages Data
const advantagesData = {
    title: "Почему нам можно доверять",
    items: [
      {
        icon: <FileText className="w-6 h-6 text-accent-orange" />,
        title: "Проверяем всё",
        description: "Анализируем не только сам объект, но и всех собственников за последние 10 лет.",
      },
      {
        icon: <Scale className="w-6 h-6 text-accent-orange" />,
        title: "Опытные юристы",
        description: "В нашей команде — только практикующие юристы с опытом работы в недвижимости от 5 лет.",
      },
      {
        icon: <ShieldCheck className="w-6 h-6 text-accent-orange" />,
        title: "Финансовая гарантия",
        description: "Мы несем полную финансовую ответственность за результат проверки, что прописано в договоре.",
      },
      {
        icon: <Users className="w-6 h-6 text-accent-orange" />,
        title: "Представляем ваши интересы",
        description: "При необходимости проведем переговоры с продавцом для устранения выявленных рисков.",
      },
    ]
}

// 8. FAQ Data
const faqItems = [
  {
    question: 'Зачем нужна проверка, если есть риелтор и Росреестр?',
    answer:
      'Риелтор заинтересован в сделке, а выписка из Росреестра не показывает всей картины: скрытых собственников, долгов или рисков банкротства продавца. Наша полная юридическая проверка недвижимости — это глубокий анализ по десяткам баз для защиты вас от риска потерять и квартиру, и деньги.',
  },
  {
    question: 'Что самое страшное вы можете найти при проверке?',
    answer:
      'Самые опасные риски — это те, что ведут к оспариванию сделки: неучтенные наследники, продажа по поддельной доверенности или банкротство продавца. Наша задача — выявить эти "мины" до того, как вы подпишете договор, и обеспечить финансовую безопасность покупки квартиры.',
  },
  {
    question: 'Сколько времени занимает юридическая проверка квартиры?',
    answer:
      'Стандартная глубокая проверка юридической чистоты занимает от 1 до 3 рабочих дней. Это оптимальный срок, чтобы тщательно проанализировать все документы, не затягивая выход на сделку. Мы понимаем, что время важно, и работаем максимально оперативно.',
  },
  {
    question: 'Вы даете гарантию на свою проверку?',
    answer:
      'Мы предоставляем официальное письменное заключение юриста с описанием всех рисков и четкой рекомендацией: "покупать" или "не покупать". Этот документ — ваша уверенность и основа для взвешенного решения. Мы отвечаем за каждое слово в нашем заключении.',
  },
];

// 9. Extended Reviews Data
const testimonialsData = [
    {
      name: "Семья Ивановых",
      property: "Покупка 3-комн. квартиры на вторичке",
      before: "Нашли идеальную квартиру, продавец очень торопил со сделкой. Решили на всякий случай заказать проверку.",
      after: "Юристы выяснили, что на квартире висит крупный долг по ипотеке, который продавец скрывал. Мы отказались от сделки и сэкономили 8 млн рублей. Спасибо!",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Артем, инвестор",
      property: "Покупка коммерческого помещения",
      before: "Хотел купить помещение под сдачу в аренду. Документы от продавца выглядели чистыми.",
      after: "Проверка показала, что продавец находится в стадии предбанкротства, и сделку могли бы оспорить. RealtySPB уберегли меня от потери 15 млн. Теперь все объекты проверяю только с ними.",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
];

const includedServicesData = {
  title: "Что входит в юридическую проверку",
  description: "Комплексный анализ объекта и собственников для гарантированной безопасности сделки.",
  services: [
    {
      icon: <FileText className="w-8 h-8 text-cyan-500" />,
      title: "Анализ документов",
      description: "Проверка правоустанавливающих документов, истории переходов прав.",
      price: "от 5 000 ₽"
    },
    {
      icon: <Users className="w-8 h-8 text-rose-500" />,
      title: "Проверка собственников",
      description: "Анализ на банкротство, судебные дела, долги ФССП.",
      price: "от 7 000 ₽"
    },
    {
      icon: <Lock className="w-8 h-8 text-amber-500" />,
      title: "Проверка обременений",
      description: "Выявление залогов, арестов, ипотек и других ограничений.",
      price: "от 4 000 ₽"
    },
    {
      icon: <FileCheck2 className="w-8 h-8 text-lime-500" />,
      title: "Письменное заключение",
      description: "Подробный отчет юриста с описанием рисков и рекомендациями.",
      price: "от 9 000 ₽"
    }
  ]
};

interface ProcessStepProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  index: number;
}

const ProcessStep = ({ icon, title, description, index }: ProcessStepProps) => (
  <div className="relative bg-white rounded-2xl p-8 border shadow-sm overflow-hidden h-full">
    <div className="absolute -top-2 -left-2 text-8xl font-extrabold text-neutral-100 z-0 select-none">
      {String(index + 1).padStart(2, '0')}
    </div>
    <div className="relative z-10">
      <div className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center bg-accent-orange/10 rounded-lg">
        {React.cloneElement(icon, {
          className: 'w-5 h-5 text-accent-orange',
        })}
      </div>
      <h3 className="text-xl font-bold mb-3 mt-12 text-text-primary">
        {title}
      </h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function LegalCheck() {
  return (
    <div className="bg-neutral-50 text-text-primary">
      {/* 1. Hero Section */}
      <section className="bg-yandex-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 max-w-4xl mx-auto">
            {heroData.title}
          </h1>
          <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {heroData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 font-semibold">
              {heroData.cta1}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-yandex-black">
              {heroData.cta2}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Social Proof */}
      <section id="social-proof" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              {socialProofData.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            {socialProofData.stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                {stat.icon}
                <div className="text-3xl font-bold mt-2">{stat.value}</div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Problem -> Solution */}
      <section id="problem-solution" className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {beforeAfterData.map((comparison, index) => (
              <Card key={index} className={`${comparison.color} border-2`}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center text-text-primary">
                    {comparison.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comparison.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start gap-3">
                      <CheckCircle className={`w-6 h-6 flex-shrink-0 ${comparison.iconColor}`} />
                      <span className="text-text-primary">{point}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* 4. How It Works */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Как мы обеспечиваем вашу безопасность
            </h2>
            <p className="text-lg text-text-secondary mt-3 max-w-3xl mx-auto">
              Четырехэтапная проверка, которая снимает все вопросы и дает 100%
              уверенность в чистоте сделки.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* 5. Unique Advantages */}
      <section id="advantages" className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">{advantagesData.title}</h2>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {advantagesData.items.map((advantage, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-orange-light text-accent-orange rounded-lg flex items-center justify-center">
                      {advantage.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{advantage.title}</h3>
                      <p className="text-text-secondary">{advantage.description}</p>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* 5. Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-text-primary">Ваша финансовая безопасность</h2>
              <p className="text-lg text-text-secondary mt-4 max-w-3xl mx-auto">Наша проверка — это не просто услуга, а ваша гарантия спокойствия и защиты от рисков.</p>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                {[
                  {
                    Icon: ShieldCheck,
                    title: "Защита от мошенников",
                    description: "Выявляем все скрытые риски: поддельные документы, незаконные перепланировки, неучтенных собственников. Вы полностью защищены.",
                  },
                  {
                    Icon: Euro,
                    title: "Сохранение миллионов",
                    description: "Наша проверка — ваша страховка от потери денег и самой квартиры. Вы спите спокойно, зная, что сделка чиста.",
                  },
                  {
                    Icon: Clock,
                    title: "Ускорение сделки",
                    description: "Заранее готовим полный пакет документов, что сокращает время выхода на сделку и предотвращает срывы из-за «бумажных» проблем.",
                  },
                  {
                    Icon: BarChart,
                    title: "Сильная позиция в торге",
                    description: "Наличие полного юридического заключения снимает все вопросы покупателя и лишает его аргументов для торга.",
                  }
                ].map(({ Icon, title, description }, index) => (
                  <div key={index} className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-accent-orange rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
                      <p className="text-text-secondary leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* 7. Second CTA / Lead Magnet */}
      <section id="lead-magnet" className="py-16 bg-accent-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Чек-лист: «10 пунктов проверки квартиры перед покупкой»</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Получите PDF-файл, который поможет вам задать правильные вопросы продавцу и не упустить важные детали.
          </p>
          <Button
            size="lg"
            className="bg-white text-accent-orange hover:bg-white/90 shadow-lg font-semibold transition-all transform hover:scale-105 text-lg px-8 py-3"
          >
            Скачать бесплатно
          </Button>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Остались вопросы? Мы ответим</h2>
            <p className="text-lg text-gray-600 mt-4">
              Здесь самые частые сомнения наших клиентов. Возможно, среди них
              есть и ваше.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="border-b-0 bg-white rounded-xl shadow-sm transition-all hover:shadow-md"
              >
                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline p-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base px-6 pb-6 pt-0 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 9. Extended Reviews */}
      <section id="reviews" className="py-20 bg-neutral-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">Говорят наши клиенты</h2>
            <p className="text-lg text-text-secondary mt-2 max-w-xl">
              Реальные истории, где наша проверка спасла время и деньги.
            </p>
          </div>
          <div className="relative px-12">
            <Carousel opts={{ loop: true }}>
              <CarouselContent className="-ml-4">
                {testimonialsData.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <div className="bg-white rounded-2xl shadow-sm p-6 h-full flex flex-col font-sans">
                        <div className="flex items-center gap-4 mb-4">
                          <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-text-primary">{testimonial.name}</p>
                            <p className="text-sm text-neutral-400">вчера в 18:05</p>
                          </div>
                        </div>
                        <div className="flex-grow flex items-start w-full">
                          <div className="bg-white p-4 rounded-lg mt-2 text-left w-full border border-neutral-200/60">
                            <p className="text-sm text-text-secondary leading-relaxed"><span className="font-semibold text-red-500">До:</span> {testimonial.before}</p>
                            <hr className="my-2 border-neutral-200/60" />
                            <p className="text-sm text-text-primary leading-relaxed"><span className="font-semibold text-green-600">После:</span> {testimonial.after}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="max-lg:hidden" />
              <CarouselNext className="max-lg:hidden" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-text-primary">Стоимость проверки</h2>
              <p className="text-lg text-text-secondary mt-4">
                Выберите подходящий уровень безопасности для вашей сделки
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {[
                {
                  title: "Экспресс",
                  price: "15 000 ₽",
                  description: "За 24 часа",
                  features: ["Проверка собственников", "Проверка на залоги и аресты", "Устная консультация юриста"],
                  isPopular: false,
                },
                {
                  title: "Полная",
                  price: "35 000 ₽",
                  description: "Самый популярный выбор",
                  features: ["Все из 'Экспресс'", "История перехода прав", "Письменное заключение"],
                  isPopular: true,
                },
                {
                  title: "С сопровождением",
                  price: "от 70 000 ₽",
                  description: "Полная защита на всех этапах",
                  features: ["Все из 'Полной'", "Участие юриста в переговорах", "Сопровождение на сделке"],
                  isPopular: false,
                },
              ].map((plan, index) => (
                <Card key={index} className={cn(
                  "flex flex-col rounded-2xl bg-white transition-all duration-300 ease-in-out",
                   plan.isPopular 
                    ? "border-2 border-accent-orange shadow-2xl scale-105 z-10"
                    : "border shadow-lg hover:shadow-2xl hover:-translate-y-2"
                )}>
                  {plan.isPopular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-orange text-white font-semibold">
                      Популярный
                    </Badge>
                  )}
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                    <p className="text-4xl font-bold py-2 text-accent-orange">{plan.price}</p>
                    <p className="text-sm text-text-secondary">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow p-8 pt-0">
                    <ul className="space-y-4 mb-8 flex-grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-text-primary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button size="lg" className="w-full bg-accent-orange text-white font-bold text-base transition-all hover:bg-orange-600 hover:shadow-lg hover:brightness-110">
                      Выбрать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. What's Included Section */}
      <section id="included-services" className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              {includedServicesData.title}
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {includedServicesData.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {includedServicesData.services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-8 flex flex-col items-center h-full">
                  <div className="flex-grow flex flex-col items-center">
                    <div className="flex justify-center mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {service.description}
                    </p>
                  </div>
                  <Badge className="bg-accent-orange text-white font-semibold mt-6">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section id="final-cta" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <LeadForm 
            title="Будьте уверены в своей будущей квартире"
            description="Закажите полную юридическую проверку и спите спокойно. Консультация юриста — бесплатно."
            serviceType="Юридическая проверка"
          />
          <div className="text-center mt-8">
            <p className="text-text-secondary mb-4">Или свяжитесь с нами удобным способом:</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg">
                <Send className="w-5 h-5 mr-2" /> Telegram
              </Button>
              <Button variant="outline" size="lg">
                <MessageSquare className="w-5 h-5 mr-2" /> WhatsApp
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="w-5 h-5 mr-2" /> Позвонить
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Second CTA Section */}
      <section className="py-20 bg-accent-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Готовы к безопасной сделке?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Защитите свои деньги и нервы. Получите полный юридический анализ вашего объекта.
          </p>
          <button
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-accent-orange shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-accent-orange"
          >
            Получить бесплатную консультацию
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
} 