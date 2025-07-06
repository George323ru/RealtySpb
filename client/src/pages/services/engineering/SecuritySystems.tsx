import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, CheckCircle, Shield, Video, KeyRound, Siren, Building, Users, Server, FileText } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import LeadForm from '@/components/LeadForm';
import FloatingCTA from '@/components/FloatingCTA';
import { ProcessTimeline } from '@/components/ui/process-timeline';
import { EngineerExpertCard } from '@/components/ui/EngineerExpertCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils';

// --- Page Specific Configuration ---
const PAGE_SLUG = 'security-systems';
const PAGE_TITLE = 'Слаботочные системы и безопасность';

// --- Content Data ---
const heroData = {
  title: 'Слаботочные системы и безопасность',
  subtitle: 'Проектируем и монтируем комплексные системы безопасности для частных домов и коммерческих объектов под ключ.',
  features: ['Гарантия 5 лет', 'Оборудование от Hikvision и Dahua', 'Бесплатный аудит объекта'],
  image: 'https://images.unsplash.com/photo-1585433075596-936746e5b6b6?w=1200&q=80',
};

const segmentData = {
    b2c: {
        title: 'Для вашего дома',
        description: 'Обеспечьте безопасность своей семьи и имущества с помощью современных и удобных решений.',
        icon: 'Home'
    },
    b2b: {
        title: 'Для вашего бизнеса',
        description: 'Контролируйте все процессы, защитите активы и оптимизируйте расходы с помощью интегрированных систем.',
        icon: 'Building'
    }
}

const advantages = {
  b2c: [
    {
      icon: Video,
      title: 'Видеонаблюдение 24/7',
      description:
        'Наблюдайте за домом из любой точки мира через смартфон. Записи хранятся в облаке до 30 дней.',
      details: [
        'Установка камер с Full HD и ночным видением.',
        'Безопасное облачное хранилище с доступом только для вас.',
        'Интеллектуальные уведомления о движении в ваше отсутствие.',
        'Просмотр онлайн и архива записей через мобильное приложение.',
      ],
      images: [
        'https://images.unsplash.com/photo-1608622288333-e6a86c6a7a2b?w=1200&q=80',
        'https://images.unsplash.com/photo-1599544955734-3198f760a7e4?w=1200&q=80',
        'https://images.unsplash.com/photo-1617931383792-805f778a87b1?w=1200&q=80',
      ],
      cta: { text: 'Подобрать камеры', href: '#lead-form' },
    },
    {
      icon: KeyRound,
      title: 'Умный дом и доступ',
      description:
        'Открывайте двери без ключа, управляйте освещением и получайте уведомления о событиях.',
      details: [
        'Установка умных замков с доступом по отпечатку пальца или смартфону.',
        'Создание сценариев "Я дома" и "Я ушел".',
        'Интеграция с голосовыми помощниками Алиса и Google Assistant.',
        'Управление воротами и шлагбаумами прямо из приложения.',
      ],
      images: [
        'https://images.unsplash.com/photo-1588796114828-639d1078a3c3?w=1200&q=80',
        'https://images.unsplash.com/photo-1562778612-e1e073639660?w=1200&q=80',
        'https://images.unsplash.com/photo-1631049916629-f8553fce45e3?w=1200&q=80',
      ],
      cta: { text: 'Рассчитать систему', href: '#lead-form' },
    },
    {
      icon: Siren,
      title: 'Защита от вторжений и ЧП',
      description:
        'Мгновенные оповещения о взломе, задымлении или протечке воды на ваш телефон и пульт охраны.',
      details: [
        'Беспроводные датчики открытия дверей и окон.',
        'Датчики движения с иммунитетом к домашним животным.',
        'Датчики дыма, протечки воды и утечки газа.',
        'Подключение к централизованному пульту охраны с выездом ГБР.',
      ],
      images: [
        'https://images.unsplash.com/photo-1558002038-105553b35349?w=1200&q=80',
        'https://images.unsplash.com/photo-1526976668942-364d28413b86?w=1200&q=80',
        'https://images.unsplash.com/photo-1574796336465-db3227a8f94d?w=1200&q=80',
      ],
      cta: { text: 'Подключить охрану', href: '#lead-form' },
    },
    {
      icon: CheckCircle,
      title: 'Простая установка',
      description:
        'Монтаж без пыли и шума за 1-2 дня. Интегрируем системы в готовый ремонт.',
      details: [
        'Большинство систем — беспроводные, не требуют штробления стен.',
        'Наши монтажники убирают за собой весь мусор.',
        'Проводим полный инструктаж по использованию системы.',
        'Гарантия на монтажные работы — 5 лет.',
      ],
      images: [
        'https://images.unsplash.com/photo-1631048099359-66e1184a79b2?w=1200&q=80',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80',
        'https://images.unsplash.com/photo-1587573752692-a14a6823101e?w=1200&q=80',
      ],
      cta: { text: 'Заказать монтаж', href: '#lead-form' },
    },
  ],
  b2b: [
    {
      icon: Users,
      title: 'Контроль доступа (СКУД)',
      description:
        'Разграничение прав доступа для сотрудников, учет рабочего времени, защита от посторонних.',
      details: [
        'Биометрические терминалы, считыватели карт и электронные замки.',
        'Интеграция с 1С и CRM для автоматического учета рабочего времени.',
        'Гостевой доступ по QR-кодам или временным пропускам.',
        'Централизованное управление всеми точками доступа из одного интерфейса.',
      ],
      images: [
        'https://images.unsplash.com/photo-1621926220853-24025a173a32?w=1200&q=80',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
      ],
      cta: { text: 'Получить КП', href: '#lead-form' },
    },
    {
      icon: Server,
      title: 'Видеоаналитика и архивы',
      description:
        'Распознавание лиц и номеров, контроль кассовых операций, поиск в архиве за секунды.',
      details: [
        'Детекция очередей, оставленных предметов и праздношатания.',
        'Система распознавания автомобильных номеров для парковок.',
        'Поиск в видеоархиве по лицу, цвету одежды или номеру авто.',
        'Интеграция с кассовым ПО для предотвращения хищений.',
      ],
      images: [
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
      ],
      cta: { text: 'Заказать демо', href: '#lead-form' },
    },
    {
      icon: FileText,
      title: 'Пожарная сигнализация (АПС)',
      description:
        'Проектирование и монтаж систем по ГОСТу для прохождения проверок МЧС. Интеграция с другими системами.',
      details: [
        'Разработка проекта АПС и СОУЭ в соответствии с ФЗ-123.',
        'Использование сертифицированного оборудования "Болид".',
        'Подготовка полного пакета исполнительной документации.',
        'Интеграция с системами дымоудаления, вентиляции и СКУД.',
      ],
      images: [
        'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&q=80',
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
        'https://images.unsplash.com/photo-1621905251912-895c9a96414a?w=1200&q=80',
      ],
      cta: { text: 'Запросить проект', href: '#lead-form' },
    },
    {
      icon: Building,
      title: 'Масштабируемые решения',
      description:
        'Системы, которые растут вместе с вашим бизнесом. От небольшого офиса до крупного ТРК.',
      details: [
        'Модульная архитектура, позволяющая добавлять новые функции и объекты.',
        'Единая платформа для управления безопасностью всей сети филиалов.',
        'Облачные и серверные решения под любой масштаб и бюджет.',
        'Техническая поддержка и развитие системы по договору SLA.',
      ],
      images: [
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
        'https://images.unsplash.com/photo-1557862921-37829c790f19?w=1200&q=80',
      ],
      cta: { text: 'Обсудить интеграцию', href: '#lead-form' },
    },
  ],
};

const estimateExamples = {
  b2c: [
    { type: '1-комнатная квартира', price: 'от 45 000 ₽', duration: '1 день', works: ['IP-домофон', '2 камеры', 'Датчик протечки', 'Настройка приложения'], image: 'https://images.unsplash.com/photo-1617103996426-c1c81e7a44a6?w=600&q=80' },
    { type: 'Частный дом 200 м²', price: 'от 150 000 ₽', duration: '3 дня', works: ['4 уличные камеры', 'Сигнализация Ajax', 'Контроль ворот', 'ИБП'], image: 'https://images.unsplash.com/photo-1574892484683-11a91a9a8377?w=600&q=80' },
  ],
  b2b: [
    { type: 'Офис 150 м²', price: 'от 250 000 ₽', duration: '5 дней', works: ['СКУД на 5 дверей', '8 камер', 'Серверная стойка', 'АТС'], image: 'https://images.unsplash.com/photo-1556761175-b413da4b248a?w=600&q=80' },
    { type: 'Склад 1000 м²', price: 'от 700 000 ₽', duration: '10 дней', works: ['16 камер с аналитикой', 'Турникеты', 'Пожарная сигнализация', 'Интеграция с 1С'], image: 'https://images.unsplash.com/photo-1565315893521-e35ac1a9a834?w=600&q=80' },
  ],
};

const processSteps = [
    { id: '1', title: 'Аудит и ТЗ', description: 'Бесплатно выезжаем на объект, изучаем задачи и готовим техническое задание.' },
    { id: '2', title: 'Проект и смета', description: 'Проектируем расположение элементов и готовим точную смету с оборудованием.' },
    { id: '3', title: 'Монтаж и настройка', description: 'Прокладываем кабели, устанавливаем и настраиваем оборудование. Делаем это аккуратно.' },
    { id: '4', title: 'Обучение и сдача', description: 'Показываем, как пользоваться системой, передаем доступы и исполнительную документацию.' },
];

const faq = {
  b2c: [
    { question: 'Смогу ли я смотреть камеры с телефона?', answer: 'Да, вы получите доступ к онлайн-просмотру и архиву записей через удобное приложение на iOS и Android.' },
    { question: 'Не испортит ли монтаж мой ремонт?', answer: 'Мы используем беспроводные датчики и технологии, которые минимизируют вмешательство. Для прокладки кабелей используем специальные инструменты, чтобы было чисто.' },
  ],
  b2b: [
    { question: 'Вы работаете с НДС?', answer: 'Да, мы работаем с юридическими лицами по договору с НДС, предоставляем все закрывающие документы.' },
    { question: 'Поможете пройти проверку МЧС?', answer: 'Мы проектируем и монтируем пожарные сигнализации строго по нормативам, готовим полный пакет документов для успешного прохождения инспекций.' },
  ],
};

const engineerData = {
  expert: {
    name: 'Максим Орлов',
    position: 'Ведущий инженер систем безопасности',
    experience: '12 лет опыта',
    specialization: 'Интеграция СКУД, видеонаблюдения и ОПС',
    quote: 'Надежная система безопасности — это та, о которой вы не вспоминаете в повседневной жизни, но которая безотказно работает в нужный момент.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  }
};


// --- Reusable Components with Motion ---

const MotionCard = motion(Card);

const Section = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <section className={`py-16 md:py-24 ${className}`}>{children}</section>
);

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="container mx-auto px-4">{children}</div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">{children}</h2>
);

const SectionDescription = ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">{children}</p>
);

// --- Page Sections ---

const HeroSection = () => (
    <div className="relative bg-gray-50 pt-20 pb-10">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge variant="secondary" className="mb-4">
              {PAGE_TITLE}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{heroData.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{heroData.subtitle}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              {heroData.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <a href="#lead-form">Рассчитать стоимость</a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="h-80 md:h-full w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <OptimizedImage
              src={heroData.image}
              alt="Системы безопасности"
              className="rounded-lg shadow-xl object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </Container>
    </div>
);

const SegmentChooser = ({ segment, setSegment }: { segment: 'b2c' | 'b2b', setSegment: (s: 'b2c' | 'b2b') => void }) => (
    <Section>
        <Container>
            <div className="max-w-2xl mx-auto">
                <Tabs value={segment} onValueChange={(value) => setSegment(value as 'b2c' | 'b2b')} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-auto">
                        <TabsTrigger value="b2c" className="flex flex-col gap-2 p-6 text-lg">
                           <span>Для дома</span>
                           <span className="text-sm font-normal text-gray-500">Безопасность семьи и имущества</span>
                        </TabsTrigger>
                        <TabsTrigger value="b2b" className="flex flex-col gap-2 p-6 text-lg">
                           <span>Для бизнеса</span>
                           <span className="text-sm font-normal text-gray-500">Контроль активов и персонала</span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </Container>
    </Section>
);

const AdvantagesSection = ({ segment }: { segment: 'b2c' | 'b2b' }) => (
  <Section className="bg-white">
    <Container>
      <SectionTitle>
        {segment === 'b2c' ? 'Спокойствие для вас и вашей семьи' : 'Полный контроль над вашим бизнесом'}
      </SectionTitle>
      <SectionDescription>
        {segment === 'b2c' ? 'Современные системы безопасности, которые защищают то, что вам дорого.' : 'Интегрированные решения для предотвращения потерь, оптимизации процессов и повышения безопасности.'}
      </SectionDescription>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {advantages[segment].map((adv, i) => (
          <Dialog key={adv.title}>
            <DialogTrigger asChild>
              <MotionCard
                className="text-center p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <adv.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{adv.title}</h3>
                  <p className="text-gray-600">{adv.description}</p>
                </div>
                <div className="mt-6">
                  <Button variant="link" className="text-primary p-0 h-auto">
                    Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </MotionCard>
            </DialogTrigger>
            <DialogContent className="max-w-6xl sm:rounded-lg">
              <AdvantageDialogContent adv={adv} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </Container>
  </Section>
);

const AdvantageDialogContent = ({
  adv,
}: {
  adv: (typeof advantages.b2c)[0]
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const [thumbApi, setThumbApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onThumbClick = useCallback(
    (index: number) => {
      if (!api || !thumbApi) return
      api.scrollTo(index)
    },
    [api, thumbApi]
  )

  const onSelect = useCallback(() => {
    if (!api || !thumbApi) return
    setSelectedIndex(api.selectedScrollSnap())
    thumbApi.scrollTo(api.selectedScrollSnap())
  }, [api, thumbApi, setSelectedIndex])

  useEffect(() => {
    if (!api) return
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)
  }, [api, onSelect])

  return (
    <div className="grid md:grid-cols-2 gap-x-12">
      <div className="p-10 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-3xl font-bold flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0 mt-1">
                <adv.icon className="w-8 h-8 text-primary" />
              </div>
              <span className="flex-grow">{adv.title}</span>
            </DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground">
              {adv.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Ключевые особенности:</h4>
            <ul className="space-y-3">
              {adv.details.map((detail, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-md transition-colors hover:bg-muted/50"
                >
                  <CheckCircle
                    className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"
                  />
                  <span className="text-base">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-auto pt-8">
          <DialogClose asChild>
            <Button
              asChild
              size="lg"
              className="w-full text-lg font-semibold"
            >
              <a href={adv.cta.href}>{adv.cta.text}</a>
            </Button>
          </DialogClose>
        </div>
      </div>

      <div className="bg-muted/30 p-10 flex flex-col items-center justify-center gap-6">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {adv.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="overflow-hidden rounded-lg border">
                  <img
                    src={image}
                    alt={`${adv.title} - Изображение ${index + 1}`}
                    className="object-cover w-full h-full aspect-[4/3]"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        <Carousel
          setApi={setThumbApi}
          opts={{
            align: 'start',
            containScroll: 'keepSnaps',
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {adv.images.map((image, index) => (
              <CarouselItem
                key={index}
                onClick={() => onThumbClick(index)}
                className="pl-2 basis-1/4 cursor-pointer"
              >
                <div
                  className={cn(
                    'overflow-hidden rounded-md h-20 transition-all border-2',
                    selectedIndex === index
                      ? 'border-primary'
                      : 'border-transparent opacity-50 hover:opacity-100',
                  )}
                >
                  <img
                    src={image}
                    alt={`${adv.title} - Миниатюра ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

const EstimateExamplesSection = ({ segment }: { segment: 'b2c' | 'b2b' }) => (
    <Section>
        <Container>
            <SectionTitle>Примеры наших работ</SectionTitle>
            <div className="grid lg:grid-cols-2 gap-8">
                {estimateExamples[segment].map((ex, i) => (
                    <MotionCard
                        key={i}
                        className="overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <div className="grid md:grid-cols-2">
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2">{ex.type}</h3>
                                <p className="text-3xl font-bold text-primary mb-2">{ex.price}</p>
                                <p className="text-gray-500 mb-4">Срок: {ex.duration}</p>
                                <Separator className="my-4"/>
                                <ul className="space-y-2">
                                    {ex.works.map(work => (
                                        <li key={work} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500"/>
                                            <span className="text-sm">{work}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <OptimizedImage src={ex.image} alt={ex.type} className="h-64 md:h-full object-cover"/>
                        </div>
                    </MotionCard>
                ))}
            </div>
        </Container>
    </Section>
)


const ProcessSection = () => (
  <Section className="bg-white">
    <Container>
      <SectionTitle>Как мы работаем</SectionTitle>
      <SectionDescription>От заявки до работающей системы за 4 простых шага.</SectionDescription>
      <ProcessTimeline steps={processSteps} />
    </Container>
  </Section>
);

const EngineerSection = () => (
  <Section>
    <Container>
      <div className="max-w-4xl mx-auto">
        <EngineerExpertCard {...engineerData} />
      </div>
    </Container>
  </Section>
);

const FAQSection = ({ segment }: { segment: 'b2c' | 'b2b' }) => (
    <Section>
        <Container>
            <SectionTitle>Часто задаваемые вопросы</SectionTitle>
            <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {faq[segment].map((item, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-gray-700">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </Container>
    </Section>
)


const CTASection = () => {
  return (
    <Section className="bg-gray-800 text-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <SectionTitle>Рассчитайте стоимость вашей системы безопасности</SectionTitle>
          <SectionDescription>
            Оставьте заявку, и наш инженер подготовит для вас бесплатный расчет и план расположения оборудования в течение 24 часов.
          </SectionDescription>
          <div className="mt-8 bg-white p-8 rounded-lg shadow-2xl">
            <LeadForm 
              title="Заявка на расчет"
              description="Наш инженер свяжется с вами в ближайшее время"
              serviceType="security-systems"
              theme="dark"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};


// --- Main Page Component ---

const SecuritySystems = () => {
  const [segment, setSegment] = useState<'b2c' | 'b2b'>('b2c');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Potential: Set segment from URL params or localStorage
  }, []);

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: PAGE_TITLE,
    provider: {
      '@type': 'Organization',
      name: 'RealtySpb',
      url: 'http://localhost:3000'
    },
    areaServed: {
      '@type': 'City',
      'name': 'Санкт-Петербург',
    },
    description: heroData.subtitle
  }

  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>{`${PAGE_TITLE} | RealtySpb`}</title>
        <meta name="description" content={heroData.subtitle} />
        <link rel="canonical" href={`http://localhost:3000/services/engineering/${PAGE_SLUG}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      
      <HeroSection />
      
      <SegmentChooser segment={segment} setSegment={setSegment} />
      
      <motion.div
        key={segment}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AdvantagesSection segment={segment} />
        <EstimateExamplesSection segment={segment} />
        <ProcessSection />
        <EngineerSection />
        <FAQSection segment={segment} />
      </motion.div>
      
      <div id="lead-form" ref={formRef}>
        <CTASection />
      </div>

      <FloatingCTA />
    </div>
  );
};

export default SecuritySystems;
