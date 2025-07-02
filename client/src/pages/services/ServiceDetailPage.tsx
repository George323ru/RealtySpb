import { createElement, useRef, Suspense, lazy } from 'react'
import * as Icons from 'lucide-react'
import { Link, useParams } from 'wouter'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../components/ui/breadcrumb'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import LeadForm from '../../components/LeadForm'
import type { ServiceDetailData } from '@shared/types'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '../../components/ui/skeleton'
import { Helmet } from 'react-helmet-async'
import FloatingCTA from '../../components/FloatingCTA'
import OptimizedImage from '../../components/OptimizedImage'
import { useServicePageData } from '../../hooks/useServicePageData'
import { PainGainSwitcher } from '../../components/ui/pain-gain-switcher'
import { ProcessTimeline } from '../../components/ui/process-timeline'
import { HeatingEconomyCalculator } from '../../components/ui/heating-economy-calculator'
import { HeatingChecklist } from '../../components/ui/heating-checklist'
import { HeatingComparisonTabs } from '../../components/ui/heating-comparison-tabs'
import { Dialog, DialogContent, DialogTrigger } from '../../components/ui/dialog'
import { PlayCircle } from 'lucide-react'
import { HeatingEconomyLeadMagnet } from '../../components/ui/HeatingEconomyLeadMagnet'
import { EngineerExpertCard } from '../../components/ui/EngineerExpertCard'
import { UrgencyBanner } from '../../components/ui/UrgencyBanner'
import { Badge } from '../../components/ui/badge'

const Icon = ({ name, ...props }: { name: string } & Icons.LucideProps) => {
  const LucideIcon = Icons[name as keyof typeof Icons]
  if (!LucideIcon) return null
  return createElement(LucideIcon as React.ElementType, props)
}

const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

interface ServiceDetailPageProps {
  serviceId: string
}

function isServiceDetailData(data: any): data is ServiceDetailData {
  return data && typeof data.serviceName === 'string' && typeof data.metaDescription === 'string';
}

const BeforeAfterSlider = lazy(() => import('../../components/ui/BeforeAfterSlider'))
const DistrictsMap = lazy(() => import('../../components/ui/DistrictsMap'))

// --- Гарантии для блока ---
const guarantees = [
  {
    title: 'Гарантия на монтаж 3 года',
    description: 'Если в течение 3 лет возникнут проблемы по нашей вине — устраним бесплатно.',
    badge: '3 года',
  },
  {
    title: 'Прозрачная смета',
    description: 'Вы заранее видите все расходы, никаких скрытых платежей и доплат.',
    badge: '100% честно',
  },
  {
    title: 'Бесплатный аудит через год',
    description: 'Через год после сдачи объекта — бесплатная диагностика и рекомендации по обслуживанию.',
    badge: 'Аудит 0₽',
  },
]

// --- Тексты для нового Hero-блока ---
const heroTitle = 'Монтаж систем отопления на оборудовании Viessmann и Rehau с гарантией 3 года';
const heroSubtitle = 'Проектируем и реализуем инженерные системы для частных домов и коммерческих объектов. Прозрачная смета, сертифицированные инженеры, бесплатный аудит через год.';

// --- Примеры котельных для B2C (частные клиенты) ---
const boilerRoomCasesB2C = [
  {
    image: '/img/boilerroom1.jpg',
    title: 'Коттедж 200 м²',
    description: 'Viessmann Vitodens 100, Rehau Rautitan, автоматика Danfoss, монтаж за 7 дней.'
  },
  {
    image: '/img/boilerroom2.jpg',
    title: 'Частный дом 150 м²',
    description: 'Buderus Logamax Plus, Rehau, насосные группы Wilo, монтаж за 10 дней.'
  },
  {
    image: '/img/boilerroom3.jpg',
    title: 'Дача 80 м²',
    description: 'Vaillant ecoTEC, трубы Uponor, автоматика Siemens, монтаж за 5 дней.'
  },
]

// --- Примеры котельных для B2B (коммерческие клиенты) ---
const boilerRoomCasesB2B = [
  {
    image: '/img/boilerroom4.jpg',
    title: 'Офисное здание 1000 м²',
    description: 'Viessmann Vitocrossal 300, Rehau Rautitan, автоматика Honeywell, монтаж за 15 дней.'
  },
  {
    image: '/img/boilerroom5.jpg',
    title: 'Торговый центр 2500 м²',
    description: 'Buderus Logamax Plus, Uponor, насосные группы Grundfos, монтаж за 20 дней.'
  },
  {
    image: '/img/boilerroom6.jpg',
    title: 'Производственное помещение 800 м²',
    description: 'Vaillant ecoTEC, Rehau, автоматика Siemens, монтаж за 12 дней.'
  },
]

// --- Примеры смет для B2C (частные клиенты) ---
const estimateExamplesB2C = [
  {
    title: 'Квартира 80 м²',
    price: 'от 320 000 ₽',
    duration: '5 дней',
    details: {
      'Котел': 'Viessmann Vitodens 100-W',
      'Трубы': 'Rehau Rautitan',
      'Радиаторы': 'Kermi',
      'Автоматика': 'Danfoss',
      'Монтаж': '5 дней',
      'Гарантия': '3 года',
    }
  },
  {
    title: 'Частный дом 150 м²',
    price: 'от 540 000 ₽',
    duration: '7 дней',
    details: {
      'Котел': 'Buderus Logamax Plus',
      'Трубы': 'Rehau Rautitan',
      'Радиаторы': 'Purmo',
      'Автоматика': 'Siemens',
      'Монтаж': '7 дней',
      'Гарантия': '3 года',
    }
  },
  {
    title: 'Коттедж 250 м²',
    price: 'от 890 000 ₽',
    duration: '10 дней',
    details: {
      'Котел': 'Vaillant ecoTEC',
      'Трубы': 'Uponor',
      'Радиаторы': 'Kermi',
      'Автоматика': 'Danfoss',
      'Монтаж': '10 дней',
      'Гарантия': '3 года',
    }
  },
]

// --- Примеры смет для B2B (коммерческие клиенты) ---
const estimateExamplesB2B = [
  {
    title: 'Офисное здание 1000 м²',
    price: 'от 2 800 000 ₽',
    duration: '15 дней',
    details: {
      'Котел': 'Viessmann Vitocrossal 300',
      'Трубы': 'Rehau Rautitan',
      'Радиаторы': 'Kermi',
      'Автоматика': 'Honeywell',
      'Монтаж': '15 дней',
      'Гарантия': '3 года',
      'НДС': 'Включен',
      'Документация': 'Исполнительная',
    }
  },
  {
    title: 'Торговый центр 2500 м²',
    price: 'от 6 500 000 ₽',
    duration: '20 дней',
    details: {
      'Котел': 'Buderus Logamax Plus',
      'Трубы': 'Uponor',
      'Радиаторы': 'Purmo',
      'Автоматика': 'Siemens',
      'Монтаж': '20 дней',
      'Гарантия': '3 года',
      'НДС': 'Включен',
      'Документация': 'Исполнительная',
    }
  },
  {
    title: 'Производственное помещение 800 м²',
    price: 'от 2 200 000 ₽',
    duration: '12 дней',
    details: {
      'Котел': 'Vaillant ecoTEC',
      'Трубы': 'Rehau',
      'Радиаторы': 'Kermi',
      'Автоматика': 'Siemens',
      'Монтаж': '12 дней',
      'Гарантия': '3 года',
      'НДС': 'Включен',
      'Документация': 'Исполнительная',
    }
  },
]

// --- Пример расширенного инженера для блока ---
const leadEngineer = {
  name: 'Иван Петров',
  experience: '15 лет',
  quote: 'Я отвечаю за каждую систему как за свою собственную. Опыт работы с объектами до 5000 м².',
  certificates: [
    { name: 'Viessmann', icon: '/img/cert-viessmann.png' },
    { name: 'Rehau', icon: '/img/cert-rehau.png' },
  ],
  projectsCount: 57,
  photo: '/img/engineer-petrov.jpg',
  trainingPhoto: '/img/engineer-training.jpg',
}

// --- Дополненные этапы работы для отопления (B2C + B2B) ---
const heatingProcessSteps = [
  {
    id: '1',
    title: 'Заявка и консультация',
    description: 'Вы оставляете заявку — мы связываемся, уточняем детали и подбираем оптимальное решение.',
  },
  {
    id: '2', 
    title: 'Выезд инженера',
    description: 'Инженер бесплатно выезжает на объект, проводит замеры и аудит.',
  },
  {
    id: '3',
    title: 'Смета и договор',
    description: 'Вы получаете прозрачную смету и договор с фиксированной ценой.',
  },
  {
    id: '4',
    title: 'Монтаж и запуск',
    description: 'Выполняем монтаж, тестируем систему, обучаем вас управлению.',
  },
  {
    id: '5',
    title: 'Гарантийное обслуживание',
    description: 'В течение 3 лет — бесплатная поддержка и аудит через год.',
  },
  {
    id: '6',
    title: 'Работа с НДС и документация',
    description: 'Работаем по договору с НДС, готовим исполнительную документацию согласно СНиП.',
  },
]

// --- Преимущества для B2C (частные клиенты) ---
const advantagesB2C = [
  {
    icon: 'Shield',
    title: 'Надежность на десятилетия',
    description: 'Используем только проверенное оборудование Viessmann, Buderus, Rehau с гарантией до 10 лет.',
  },
  {
    icon: 'Thermometer',
    title: 'Комфорт в каждом помещении',
    description: 'Точная настройка температуры в каждой комнате, автоматическое поддержание микроклимата.',
  },
  {
    icon: 'PiggyBank',
    title: 'Экономия на отоплении',
    description: 'Современные котлы и автоматика позволяют экономить до 30% на расходах на отопление.',
  },
  {
    icon: 'Heart',
    title: 'Забота о вашем доме',
    description: 'Бесплатный аудит через год, рекомендации по обслуживанию, поддержка 24/7.',
  },
]

// --- Преимущества для B2B (коммерческие клиенты) ---
const advantagesB2B = [
  {
    icon: 'Clock',
    title: 'Соблюдение сроков',
    description: 'Четкое планирование, бригады до 8 человек, работа в 2-3 смены при необходимости.',
  },
  {
    icon: 'Calculator',
    title: 'Фиксированный бюджет',
    description: 'Прозрачная смета без скрытых доплат, работа по договору с НДС, поэтапная оплата.',
  },
  {
    icon: 'FileText',
    title: 'Полная документация',
    description: 'Исполнительная документация, сертификаты, паспорта оборудования, акты приемки.',
  },
  {
    icon: 'Building',
    title: 'Опыт с крупными объектами',
    description: 'Реализовали проекты до 5000 м², работаем с застройщиками и подрядчиками.',
  },
]

// --- FAQ для B2C (частные клиенты) ---
const faqB2C = [
  {
    question: 'Сколько времени займет монтаж системы отопления?',
    answer: 'Сроки зависят от площади объекта: квартира 80 м² — 5 дней, дом 150 м² — 7 дней, коттедж 250 м² — 10 дней. Все сроки фиксируются в договоре.',
  },
  {
    question: 'Какое оборудование вы используете?',
    answer: 'Работаем только с премиум-брендами: котлы Viessmann, Buderus, Vaillant; трубы Rehau, Uponor; автоматика Danfoss, Siemens. Все оборудование с гарантией производителя.',
  },
  {
    question: 'Нужно ли обслуживать систему отопления?',
    answer: 'Да, рекомендуем ежегодное обслуживание для поддержания эффективности. Мы проводим бесплатный аудит через год после сдачи объекта.',
  },
  {
    question: 'Можно ли управлять отоплением удаленно?',
    answer: 'Да, современная автоматика позволяет управлять температурой через приложение на телефоне из любой точки мира.',
  },
]

// --- FAQ для B2B (коммерческие клиенты) ---
const faqB2B = [
  {
    question: 'Какие условия для подрядчиков и застройщиков?',
    answer: 'Работаем по договору с НДС, предоставляем отсрочку платежа до 30 дней, поэтапная оплата по факту выполненных работ.',
  },
  {
    question: 'Какие документы вы предоставляете?',
    answer: 'Исполнительная документация, сертификаты на оборудование, паспорта, акты приемки, гарантийные обязательства. Все документы готовы для сдачи в эксплуатацию.',
  },
  {
    question: 'Можете ли работать в 2-3 смены для соблюдения сроков?',
    answer: 'Да, при необходимости организуем работу в несколько смен. У нас есть бригады до 8 человек для крупных объектов.',
  },
  {
    question: 'Какие у вас условия по гарантии для коммерческих объектов?',
    answer: 'Гарантия на монтаж 3 года, на оборудование — согласно гарантии производителя (до 10 лет). Дополнительно предоставляем расширенную гарантию до 5 лет.',
  },
]

const ServiceDetailPage = ({ serviceId }: ServiceDetailPageProps) => {
  const {
    data: serviceData,
    isLoading,
    isError,
  } = useServicePageData(serviceId)

  const heroImageRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ target: heroImageRef })
  const parallaxY = useTransform(scrollY, [0, 300], [0, 60])

  if (isLoading) {
    return <ServiceDetailSkeleton />
  }

  if (isError || !serviceData) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-destructive">
          Ошибка при загрузке данных
        </h2>
        <p className="mt-4 text-muted-foreground">
          Не удалось загрузить информацию для этой страницы.
        </p>
      </div>
    )
  }

  if (!isServiceDetailData(serviceData)) {
    return null;
  }

  const {
    serviceName,
    metaDescription,
    hero,
    targetAudiences,
    painGain,
    subServices,
    caseStudies,
    processSteps,
    advantages,
    faq,
  } = serviceData as ServiceDetailData;

  const leadEngineer = (serviceData as any).leadEngineer

  // --- Schema.org JSON-LD ---
  const jsonLd: any[] = []
  if (serviceId === 'heating') {
    // Service
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceName,
      description: metaDescription,
      provider: {
        '@type': 'LocalBusiness',
        name: 'RealtySpb',
        url: 'https://realtyspb.ru',
      },
      areaServed: 'Санкт-Петербург и Ленинградская область',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
      },
    })
    // FAQ
    if (faq && faq.length > 0) {
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      })
    }
    // Reviews (если есть)
    if (Array.isArray((serviceData as any).reviews)) {
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: serviceName,
        review: (serviceData as any).reviews.map((r: any) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.author },
          reviewBody: r.text,
        })),
      })
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {},
      }}
      className="bg-neutral-50 text-foreground"
    >
      <Helmet>
        <title>{`${serviceName} - RealtySpb`}</title>
        <meta name="description" content={metaDescription} />
        {jsonLd.map((obj, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
        ))}
      </Helmet>
      
      {/* Breadcrumbs */}
      <div className="border-b bg-background">
        <motion.div
          variants={animationVariants}
          className="container mx-auto px-4 py-6"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Главная</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/services">Услуги</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{serviceName}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>
      </div>

      {/* Hero Section */}
      <motion.header
        variants={animationVariants}
        className="relative overflow-hidden bg-background py-20 md:py-32"
      >
        <div ref={heroImageRef} className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              {serviceId === 'heating' ? heroTitle : hero.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {serviceId === 'heating' ? heroSubtitle : hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button size="lg" asChild className="shadow-lg">
                <a href="#lead-form">{hero.primaryCta}</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#case-studies">{hero.secondaryCta}</a>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-auto md:self-stretch">
            {serviceId === 'heating' && hero.videoUrl ? (
              <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-full">
                <video
                  src={hero.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={hero.image}
                  className="h-full w-full rounded-lg object-cover shadow-2xl"
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-lg" />
              </motion.div>
            ) : (
            <OptimizedImage
              src={hero.image}
              alt={hero.title}
              className="h-full w-full rounded-lg object-cover shadow-2xl"
            />
            )}
          </div>
        </div>
        {serviceId === 'heating' && <HeatingEconomyCalculator className="mb-12" />}
        {serviceId === 'heating' && <HeatingEconomyLeadMagnet />}
      </motion.header>

      {/* --- Блок Гарантии --- */}
      <section className="container mx-auto px-4 py-12" id="guarantees">
        <motion.h2
          variants={animationVariants}
          className="text-2xl md:text-3xl font-bold mb-8 text-center"
        >
          Ваши гарантии и спокойствие
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-3">
          {guarantees.map((g, i) => (
            <Card key={i} className="flex flex-col items-start p-6 shadow-lg">
              <Badge className="mb-4 text-base px-4 py-2">{g.badge}</Badge>
              <h3 className="text-lg font-semibold mb-2">{g.title}</h3>
              <p className="text-muted-foreground text-sm">{g.description}</p>
            </Card>
          ))}
        </div>
        {/* JSON-LD микроразметка для гарантий */}
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WarrantyPromise',
              name: 'Гарантии на отопление',
              description: 'Гарантия на монтаж, прозрачная смета, бесплатный аудит через год',
              durationOfWarranty: {
                '@type': 'QuantitativeValue',
                value: 36,
                unitCode: 'MON',
              },
              provider: {
                '@type': 'LocalBusiness',
                name: 'RealtySpb',
                url: 'https://realtyspb.ru',
              },
            })}
          </script>
        </Helmet>
      </section>

      {/* Target Audience Section */}
      <motion.section
        variants={animationVariants}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold">Для кого эта услуга?</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {targetAudiences.map((audience: { icon: string; title: string }, i: number) => (
              <Card key={i} className="text-center">
                <CardHeader className="items-center gap-4">
                  <Icon name={audience.icon} className="h-10 w-10 text-primary" />
                  <CardTitle>{audience.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pain/Gain Section */}
      {serviceId === 'heating' ? (
        <PainGainSwitcher painGain={painGain} className="my-12" />
      ) : (
      <motion.section
        variants={animationVariants}
        className="bg-background py-24"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-destructive">
                  <Icons.XCircle /> {painGain.painTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                  {painGain.pains.map((pain: { text: string }, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icons.ShieldAlert className="mt-1 h-5 w-5 flex-shrink-0 text-destructive/80" />
                    <span>{pain.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Icons.CheckCircle2 /> {painGain.gainTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                  {painGain.gains.map((gain: { text: string }, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icons.Star className="mt-1 h-5 w-5 flex-shrink-0 text-primary/80" />
                    <span>{gain.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>
      )}

      {serviceId === 'heating' && <HeatingChecklist className="mb-12" />}
      {serviceId === 'heating' && <HeatingComparisonTabs className="mb-12" />}

      {/* Case Studies Section */}
      <motion.section
        id="case-studies"
        variants={animationVariants}
        className="bg-background py-24"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Наши работы</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Реальные примеры аккуратных котельных и инженерных решений.
            </p>
          </div>
          {serviceId === 'heating' ? (
            <Tabs defaultValue="b2c" className="mt-12">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="b2c">Для частных домов</TabsTrigger>
                <TabsTrigger value="b2b">Для бизнеса</TabsTrigger>
              </TabsList>
              <TabsContent value="b2c" className="mt-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                  {boilerRoomCasesB2C.map((item, i) => (
                    <Card key={i} className="overflow-hidden">
                      <OptimizedImage src={item.image} alt={item.title} className="h-64 w-full object-cover" />
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="b2b" className="mt-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                  {boilerRoomCasesB2B.map((item, i) => (
                    <Card key={i} className="overflow-hidden">
                      <OptimizedImage src={item.image} alt={item.title} className="h-64 w-full object-cover" />
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
              {caseStudies.map((study: any, i: number) => (
                study.beforeImage && study.afterImage ? (
                  <Card key={i} className="overflow-hidden">
                    <Suspense fallback={<div className="h-64 bg-neutral-100 animate-pulse" />}>
                      <BeforeAfterSlider before={study.beforeImage} after={study.afterImage} alt={study.title} />
                    </Suspense>
                    <CardHeader>
                      <CardTitle>{study.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold">Задача:</h4>
                        <p className="text-muted-foreground">{study.problem}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Решение:</h4>
                        <p className="text-muted-foreground">{study.solution}</p>
                      </div>
                      <div className="flex justify-between border-t pt-4">
                        <div className="text-sm"><span className="font-semibold">Срок:</span> {study.duration}</div>
                        <div className="text-sm"><span className="font-semibold">Бюджет:</span> {study.budget}</div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  study.videoUrl ?
                    <Dialog key={i}>
                      <DialogTrigger asChild>
                        <Card className="overflow-hidden cursor-pointer group relative">
                          <OptimizedImage src={study.image} alt={study.title} className="h-64 w-full object-cover group-hover:opacity-70 transition" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="h-20 w-20 text-white/90 drop-shadow-lg opacity-80 group-hover:scale-110 transition-transform" />
                          </div>
                          <CardHeader>
                            <CardTitle>{study.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-semibold">Задача:</h4>
                              <p className="text-muted-foreground">{study.problem}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold">Решение:</h4>
                              <p className="text-muted-foreground">{study.solution}</p>
                            </div>
                            <div className="flex justify-between border-t pt-4">
                              <div className="text-sm"><span className="font-semibold">Срок:</span> {study.duration}</div>
                              <div className="text-sm"><span className="font-semibold">Бюджет:</span> {study.budget}</div>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl p-0 overflow-hidden aspect-video">
                        <iframe
                          src={study.videoUrl}
                          title={study.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-[360px] md:h-[480px] lg:h-[600px]"
                        />
                      </DialogContent>
                    </Dialog>
                  : (
              <Card key={i} className="overflow-hidden">
                <OptimizedImage src={study.image} alt={study.title} className="h-64 w-full object-cover"/>
                <CardHeader>
                  <CardTitle>{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Задача:</h4>
                    <p className="text-muted-foreground">{study.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Решение:</h4>
                    <p className="text-muted-foreground">{study.solution}</p>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <div className="text-sm"><span className="font-semibold">Срок:</span> {study.duration}</div>
                    <div className="text-sm"><span className="font-semibold">Бюджет:</span> {study.budget}</div>
                  </div>
                </CardContent>
              </Card>
                    )
                  )
              ))}
            </div>
          )}
        </div>
      </motion.section>
      
      {/* Примеры смет */}
      {serviceId === 'heating' && (
        <section className="container mx-auto px-4 py-12" id="estimate-examples">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Примеры реальных смет</h2>
          <Tabs defaultValue="b2c" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="b2c">Для частных домов</TabsTrigger>
              <TabsTrigger value="b2b">Для бизнеса</TabsTrigger>
            </TabsList>
            <TabsContent value="b2c" className="mt-8">
              <div className="grid gap-6 md:grid-cols-3">
                {estimateExamplesB2C.map((ex, i) => (
                  <Dialog key={i}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-xl transition">
                        <CardHeader>
                          <CardTitle>{ex.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold mb-2">{ex.price}</div>
                          <div className="text-muted-foreground text-sm mb-2">Срок: {ex.duration}</div>
                          <Button variant="outline" size="sm">Подробнее</Button>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <h3 className="text-xl font-bold mb-4">{ex.title}</h3>
                      <ul className="mb-4">
                        {Object.entries(ex.details).map(([key, value]) => (
                          <li key={key} className="flex justify-between border-b py-1">
                            <span className="font-medium">{key}</span>
                            <span>{value}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="text-lg font-bold">Итого: {ex.price}</div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="b2b" className="mt-8">
              <div className="grid gap-6 md:grid-cols-3">
                {estimateExamplesB2B.map((ex, i) => (
                  <Dialog key={i}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-xl transition">
                        <CardHeader>
                          <CardTitle>{ex.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold mb-2">{ex.price}</div>
                          <div className="text-muted-foreground text-sm mb-2">Срок: {ex.duration}</div>
                          <Button variant="outline" size="sm">Подробнее</Button>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <h3 className="text-xl font-bold mb-4">{ex.title}</h3>
                      <ul className="mb-4">
                        {Object.entries(ex.details).map(([key, value]) => (
                          <li key={key} className="flex justify-between border-b py-1">
                            <span className="font-medium">{key}</span>
                            <span>{value}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="text-lg font-bold">Итого: {ex.price}</div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      )}

      {/* Sub-services Section */}
      <motion.section
        variants={animationVariants}
        className="py-24"
      >
         <div className="container mx-auto px-4">
          <div className="text-center">
             <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
               {serviceId === 'heating' ? 'Анатомия идеальной системы отопления' : 'Что входит в услугу?'}
             </h2>
             <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
               Мы оказываем полный комплекс работ, чтобы вы получили готовый результат без головной боли.
             </p>
           </div>
           <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             {subServices.map((service: { icon: string; title: string; description: string }, index: number) => (
               <Card key={index} className="flex flex-col">
                 <CardHeader className="flex flex-row items-center gap-4">
                   <Icon name={service.icon} className="h-8 w-8 text-primary" />
                   <CardTitle className="text-xl">{service.title}</CardTitle>
                 </CardHeader>
                 <CardContent className="flex-grow">
                   <p className="text-muted-foreground">{service.description}</p>
                 </CardContent>
               </Card>
             ))}
           </div>
         </div>
      </motion.section>
      
      {/* How it Works Section */}
      {serviceId === 'heating' ? (
        <ProcessTimeline
          steps={heatingProcessSteps}
          title="Как мы создаем 'сердце' вашего дома"
          subtitle="Пошаговый путь от идеи до идеального результата."
          className="my-12"
        />
      ) : (
       <motion.section
        variants={animationVariants}
        className="py-24"
       >
        <div className="container mx-auto px-4">
           <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Процесс работы</h2>
             <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
               Прозрачный и понятный процесс от заявки до сдачи объекта.
             </p>
           </div>
           <div className="mt-12 space-y-8">
              {processSteps.map((step: { id: string; title: string; description: string }) => (
              <div key={step.id} className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {step.id}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-1 text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
           </div>
        </div>
      </motion.section>
      )}

      {/* Advantages Section */}
      <motion.section
        variants={animationVariants}
        className="bg-background py-24"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {serviceId === 'heating' ? 'Надежность, заложенная в ДНК' : 'Почему мы?'}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {serviceId === 'heating'
                ? 'Мы не просто монтируем трубы — мы проектируем и реализуем инженерную систему, которая будет служить вашей семье десятилетиями.'
                : 'Нам доверяют, потому что мы гарантируем результат, а не обещаем.'}
            </p>
          </div>
          {serviceId === 'heating' ? (
            <Tabs defaultValue="b2c" className="mt-12">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="b2c">Владельцам домов</TabsTrigger>
                <TabsTrigger value="b2b">Бизнесу</TabsTrigger>
              </TabsList>
              <TabsContent value="b2c" className="mt-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {advantagesB2C.map((adv, i) => (
                    <div key={i}>
                      <Icon name={adv.icon} className="h-10 w-10 text-primary" />
                      <h3 className="mt-4 text-xl font-semibold">{adv.title}</h3>
                      <p className="mt-2 text-muted-foreground">{adv.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="b2b" className="mt-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {advantagesB2B.map((adv, i) => (
                    <div key={i}>
                      <Icon name={adv.icon} className="h-10 w-10 text-primary" />
                      <h3 className="mt-4 text-xl font-semibold">{adv.title}</h3>
                      <p className="mt-2 text-muted-foreground">{adv.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {advantages.map((adv: { icon: string; title: string; description: string }, i: number) => (
                <div key={i}>
                  <Icon name={adv.icon} className="h-10 w-10 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">{adv.title}</h3>
                  <p className="mt-2 text-muted-foreground">{adv.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        variants={animationVariants}
        className="py-24"
      >
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Остались вопросы?</h2>
             <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
               Ответы на популярные вопросы о {serviceName}.
             </p>
           </div>
           {serviceId === 'heating' ? (
             <Tabs defaultValue="b2c" className="mt-12">
               <TabsList className="grid w-full grid-cols-2">
                 <TabsTrigger value="b2c">Частным клиентам</TabsTrigger>
                 <TabsTrigger value="b2b">Бизнесу</TabsTrigger>
               </TabsList>
               <TabsContent value="b2c" className="mt-8">
                 <Accordion type="single" collapsible className="w-full">
                   {faqB2C.map((item, index) => (
                     <AccordionItem key={index} value={`item-${index}`}>
                       <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                       <AccordionContent>{item.answer}</AccordionContent>
                     </AccordionItem>
                   ))}
                 </Accordion>
               </TabsContent>
               <TabsContent value="b2b" className="mt-8">
                 <Accordion type="single" collapsible className="w-full">
                   {faqB2B.map((item, index) => (
                     <AccordionItem key={index} value={`item-${index}`}>
                       <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                       <AccordionContent>{item.answer}</AccordionContent>
                     </AccordionItem>
                   ))}
                 </Accordion>
               </TabsContent>
             </Tabs>
           ) : (
             <Accordion type="single" collapsible className="mt-12 w-full">
               {faq.map((item: { question: string; answer: string }, index: number) => (
                 <AccordionItem key={index} value={`item-${index}`}>
                   <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                   <AccordionContent>{item.answer}</AccordionContent>
                 </AccordionItem>
               ))}
             </Accordion>
           )}
         </div>
      </motion.section>
      
      {/* Lead Form Section */}
      <motion.section
        id="lead-form"
        variants={animationVariants}
        className={serviceId === 'heating' ? 'relative bg-slate-900 py-24 text-primary-foreground overflow-hidden' : 'bg-slate-900 py-24 text-primary-foreground'}
      >
        {serviceId === 'heating' && leadEngineer && (
          <div className="container mx-auto max-w-xl px-4 mb-10">
            <EngineerExpertCard expert={leadEngineer} />
          </div>
        )}
        {serviceId === 'heating' && (
          <div
            className="pointer-events-none absolute inset-0 z-0 animate-[shine_8s_linear_infinite]"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,200,255,0.18) 0%, rgba(0,0,0,0.0) 80%), radial-gradient(ellipse 60% 40% at 70% 70%, rgba(255,0,200,0.12) 0%, rgba(0,0,0,0.0) 80%)',
              backgroundSize: '200% 200%',
              backgroundPosition: '50% 50%'
            }}
          />
        )}
        <div className="container relative z-10 mx-auto max-w-xl px-4">
          <LeadForm
            title={`Получите точный расчет для услуги "${serviceName}"`}
            description="Оставьте заявку, и наш инженер свяжется с вами в течение 15 минут, чтобы провести консультацию и подготовить смету."
            serviceType={serviceName}
          />
          {serviceId === 'heating' && <UrgencyBanner className="mt-6" />}
        </div>
      </motion.section>

      <FloatingCTA />
    </motion.div>
  )
}

const ServiceDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <div>
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="mt-4 h-6 w-full" />
        <Skeleton className="mt-2 h-6 w-5/6" />
        <div className="mt-8 flex gap-4">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-12 w-48" />
        </div>
      </div>
      <Skeleton className="h-80 w-full" />
    </div>
    <div className="py-24">
       <Skeleton className="mx-auto h-10 w-1/2" />
       <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  </div>
);

export default ServiceDetailPage 