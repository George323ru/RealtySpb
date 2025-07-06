import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  Lightbulb,
  ShieldCheck,
  Zap,
  PiggyBank,
  Heart,
  Building,
  FileText,
  Clock,
  Wrench,
  Home,
  CheckCircle,
} from 'lucide-react'
import OptimizedImage from '@/components/OptimizedImage'
import LeadForm from '@/components/LeadForm'
import FloatingCTA from '@/components/FloatingCTA'
import { ProcessTimeline } from '@/components/ui/process-timeline'
import { EngineerExpertCard } from '@/components/ui/EngineerExpertCard'
import { UrgencyBanner } from '@/components/ui/UrgencyBanner'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const SPACING = {
  section: 'py-24',
  container: 'container mx-auto px-6',
}

const heroData = {
  title: 'Электроснабжение под ключ',
  subtitle:
    'Проектируем и монтируем надёжные системы электроснабжения для частных домов, квартир и коммерческих объектов в Санкт-Петербурге и ЛО.',
  features: [
    'Гарантия 5 лет по договору',
    'Соблюдение ПУЭ и ГОСТ',
    'Согласование в Ленэнерго',
  ],
  image:
    'https://images.unsplash.com/photo-1581092921440-4c3030b0da9a?w=1200&q=80',
}

const pageData = {
  b2c: {
    advantages: {
      title: 'Надежность и комфорт для вашего дома',
      description:
        'Мы создаем безопасные и продуманные системы, которые делают вашу жизнь лучше.',
      items: [
        {
          icon: ShieldCheck,
          title: 'Безопасность — ваш приоритет',
          description:
            'Используем только сертифицированные материалы (Schneider Electric, ABB, Legrand) и строго соблюдаем ПУЭ. Ваша семья и имущество под надежной защитой.',
        },
        {
          icon: PiggyBank,
          title: 'Экономия до 20% на счетах',
          description:
            'Правильный расчет нагрузок и использование энергоэффективного оборудования (LED, диммеры, реле) снижают ваши ежемесячные расходы на электроэнергию.',
        },
        {
          icon: Heart,
          title: 'Комфорт и удобство',
          description:
            'Продуманное расположение розеток, выключателей и сценариев освещения. Управляем светом, розетками и даже шторами с одного выключателя или смартфона.',
        },
        {
          icon: Zap,
          title: 'Защита от скачков напряжения',
          description:
            'Устанавливаем реле напряжения и УЗИП, которые защищают вашу дорогую технику от внезапных перепадов в сети, предотвращая дорогостоящий ремонт.',
        },
      ],
    },
    processSteps: {
      title: 'Процесс работы с частными клиентами',
      description:
        'От первого звонка до гарантийного обслуживания — мы всегда на связи.',
      items: [
        {
          id: '1',
          title: 'Заявка и аудит объекта',
          description:
            'Вы оставляете заявку, наш инженер связывается с вами, проводит бесплатный аудит вашего объекта и собирает все требования к будущей системе.',
        },
        {
          id: '2',
          title: 'Техническое задание и проект',
          description:
            'Разрабатываем детальный проект электроснабжения: от схемы щита до плана расположения розеток. Все расчеты соответствуют ГОСТ и ПУЭ.',
        },
        {
          id: '3',
          title: 'Согласование и закупка',
          description:
            'При необходимости согласовываем проект в надзорных органах. Закупаем и доставляем на объект все материалы по ценам ниже рыночных.',
        },
        {
          id: '4',
          title: 'Монтаж и пусконаладка',
          description:
            'Наши штатные электрики выполняют монтаж. После — проводим все необходимые замеры и испытания, запускаем систему в работу.',
        },
        {
          id: '5',
          title: 'Сдача и гарантия',
          description:
            'Передаем вам полный пакет исполнительной документации и ставим объект на гарантийное обслуживание до 5 лет.',
        },
      ],
    },
    reviews: {
      title: 'Что говорят наши клиенты',
      description:
        'Мы гордимся своей работой и доверием, которое вы нам оказываете.',
      items: [
        {
          author: 'Анна и Виктор, ЖК "Чистое небо"',
          text: 'Заказывали полную замену электрики в новостройке от застройщика. Ребята из RealtySpb сделали все за 3 дня! Проложили кабели в гофре, собрали идеальный щиток. Теперь спим спокойно, зная, что все безопасно.',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
          author: 'Сергей, КП "Медное Озеро"',
          text: 'Нужно было подключить дом к столбу и сделать всю разводку. Ребята не только все смонтировали, но и сами решили все вопросы с Ленэнерго. Для меня это было самое важное, так как я живу в другом городе.',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
        },
        {
          author: 'Ольга, квартира в старом фонде',
          text: 'Очень боялась менять проводку в своей сталинке. Максим и его команда сделали все невероятно аккуратно. Минимально повредили отделку, все за собой убрали. Щиток теперь как произведение искусства.',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
        },
      ],
    },
    faqItems: {
      title: 'Ответы на частые вопросы',
      description:
        'Всё, что вы хотели знать об электрике в квартире или частном доме.',
      items: [
        {
          question: 'Вы работаете в старом фонде?',
          answer:
            'Да, у нас большой опыт работы со "сталинками", "хрущевками" и дореволюционными домами. Знаем все нюансы замены старой проводки на новую, безопасную.',
        },
        {
          question: 'Сколько стоит разводка электрики в квартире?',
          answer:
            'Стоимость зависит от площади и количества точек. Например, для однокомнатной квартиры 40м² "под ключ" с материалами — от 90 000 ₽. Точный расчет инженер делает бесплатно.',
        },
        {
          question: 'Помогаете ли вы с подключением к Ленэнерго?',
          answer:
            'Да, мы берем на себя всю бумажную работу: от получения ТУ до заключения договора и пломбировки счетчика. Вы экономите время и нервы.',
        },
      ],
    },
    cta: {
      title: 'Готовы сделать ваш дом безопасным и современным?',
      subtitle:
        'Оставьте заявку, и наш инженер подготовит для вас бесплатную смету и план работ в течение 24 часов. Это вас ни к чему не обязывает.',
      formSource: "Страница 'Электроснабжение' (Частные клиенты)",
      buttonText: 'Получить точную смету бесплатно',
    },
    urgencyBanner: {
      text: 'Цены на кабельную продукцию и автоматику растут. Зафиксируйте стоимость материалов в смете, забронировав монтаж в этом месяце!',
      buttonText: 'Зафиксировать цену',
    },
  },
  b2b: {
    advantages: {
      title: 'Эффективные решения для вашего бизнеса',
      description:
        'Гарантируем соблюдение сроков, нормативов и бюджета для коммерческих объектов.',
      items: [
        {
          icon: Clock,
          title: 'Соблюдение сроков по договору',
          description:
            'Четко придерживаемся графика работ, чтобы не задерживать запуск вашего бизнеса. Штрафы за срыв сроков прописаны в договоре.',
        },
        {
          icon: FileText,
          title: 'Полный пакет документов',
          description:
            'Готовим всю исполнительную документацию для сдачи объекта в эксплуатацию и проверок надзорными органами. Акты, протоколы, сертификаты.',
        },
        {
          icon: Building,
          title: 'Опыт работы с коммерцией',
          description:
            'Реализовали проекты для офисов, ресторанов, магазинов и производств. Понимаем специфику и требования к коммерческим объектам.',
        },
        {
          icon: Wrench,
          title: 'Снижение эксплуатационных расходов',
          description:
            'Проектируем системы с учетом удобства обслуживания и минимальных затрат на эксплуатацию, что сокращает ваши долгосрочные издержки.',
        },
      ],
    },
    processSteps: {
      title: 'Процесс работы с юридическими лицами',
      description:
        'Четкие этапы, прозрачная документация и ответственность за результат.',
      items: [
        {
          id: '1',
          title: 'Заявка и анализ ТЗ',
          description:
            'Анализируем ваш бизнес-объект, составляем детальное Техническое Задание, учитывая все нормативы и требования.',
        },
        {
          id: '2',
          title: 'Проектная документация',
          description:
            'Разрабатываем проектную документацию (стадия П и Р) для согласования, прохождения экспертизы и точного расчета.',
        },
        {
          id: '3',
          title: 'Договор и Смета',
          description:
            'Заключаем официальный договор с НДС, фиксируем итоговую смету и сроки выполнения всех работ.',
        },
        {
          id: '4',
          title: 'Электромонтаж и надзор',
          description:
            'Выполняем электромонтажные работы под контролем главного инженера и вашего технического надзора.',
        },
        {
          id: '5',
          title: 'Испытания и сдача объекта',
          description:
            'Проводим приемо-сдаточные испытания, готовим исполнительную документацию и сдаем объект в эксплуатацию.',
        },
      ],
    },
    reviews: {
      title: 'Нам доверяют лидеры рынка',
      description:
        'Отзывы от компаний, которые выбрали нас в качестве подрядчика.',
      items: [
        {
          author: 'ООО "ТехноСтрой"',
          text: 'Привлекли RealtySpb как субподрядчика на монтаж электрики в офисном центре. Все работы выполнены в срок, без единого замечания от технадзора. Исполнительную документацию подготовили идеально.',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
          author: "Марина, упр. рестораном 'Vino&Voda'",
          text: 'RealtySpb полностью делали электрику на нашей новой кухне. Мощности, безопасность, всё на высшем уровне. Сдали объект точно в срок, что для ресторанного бизнеса критически важно. Ни одного сбоя.',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        },
        {
          author: 'Иван, директор сети "Продукты у дома"',
          text: 'Работаем с RealtySpb уже на третьем объекте. Всегда четко, профессионально и с полным комплектом документов для проверяющих органов. Это экономит нам кучу времени и нервов.',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
        },
      ],
    },
    faqItems: {
      title: 'Вопросы от бизнеса',
      description:
        'Ответы на вопросы о лицензиях, договорах, НДС и работе с крупными объектами.',
      items: [
        {
          question: 'Какие у вас допуски и лицензии?',
          answer:
            'Мы являемся членом СРО, имеем все необходимые допуски для проектирования и монтажа электроустановок до 1000В, включая лицензию МЧС для систем пожарной сигнализации.',
        },
        {
          question:
            'Можете ли вы подготовить проект для прохождения экспертизы?',
          answer:
            'Да, мы разрабатываем проектную документацию в соответствии со всеми нормами и правилами, достаточную для прохождения государственной или коммерческой экспертизы.',
        },
        {
          question: 'Работаете ли вы по договору с НДС?',
          answer:
            'Да, мы работаем с юридическими лицами по договору с НДС 20%. Предоставляем все закрывающие документы для бухгалтерии.',
        },
      ],
    },
    cta: {
      title: 'Нужен надежный подрядчик по электрике?',
      subtitle:
        'Обсудите ваш проект с главным инженером и получите коммерческое предложение с учетом НДС в течение 48 часов.',
      formSource: "Страница 'Электроснабжение' (Бизнес)",
      buttonText: 'Запросить коммерческое предложение',
    },
    urgencyBanner: {
      text: 'Плановое повышение цен на услуги на 15% с 1 числа следующего месяца. Успейте заключить договор по старым ценам!',
      buttonText: 'Получить предложение',
    },
  },
}

const engineerData = {
  name: 'Максим Орлов',
  experience: 'Главный инженер-электрик, 12 лет опыта, 4-я группа допуска',
  quote:
    '«Правильная электрика — это как кровеносная система здания. Она должна быть незаметной, но работать безупречно. Моя задача — спроектировать именно такую систему, которая будет служить вам десятилетиями без единого сбоя».',
  photo:
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
}

const HeroSection = () => (
  <section className={`${SPACING.container} ${SPACING.section} text-center`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Badge variant="secondary" className="mb-4">
        <Lightbulb className="mr-2 h-4 w-4" />
        Надежность в каждой розетке
      </Badge>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        {heroData.title}
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        {heroData.subtitle}
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button size="lg" asChild>
          <a href="#lead-form">Получить расчет сметы</a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="#process">
            Как мы работаем <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </motion.div>
    <motion.div
      className="mt-16"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <OptimizedImage
        src={heroData.image}
        alt="Профессиональный монтаж электрощита"
        className="aspect-[16/9] w-full rounded-xl object-cover shadow-2xl ring-1 ring-gray-900/10"
      />
    </motion.div>
  </section>
)

const AudienceChoiceCards = ({ activeTab, setActiveTab }) => {
  const choices = [
    {
      key: 'b2c',
      icon: Home,
      title: 'Для частных клиентов',
      description: 'Квартира, дом, коттедж',
      image:
        'https://images.unsplash.com/photo-1505691938895-1758d7FEB511?w=800&q=80',
    },
    {
      key: 'b2b',
      icon: Building,
      title: 'Для бизнеса',
      description: 'Офис, магазин, производство',
      image:
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    },
  ]

  return (
    <section className={`${SPACING.container} py-12`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {choices.map(choice => {
          const isActive = activeTab === choice.key
          return (
            <motion.div
              key={choice.key}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setActiveTab(choice.key)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <OptimizedImage
                src={choice.image}
                alt={choice.title}
                className={cn(
                  'w-full h-48 object-cover transition-all duration-500',
                  isActive
                    ? 'grayscale-0'
                    : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100',
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div>
                    <choice.icon className="w-8 h-8 text-white mb-2" />
                    <h3 className="text-2xl font-bold text-white">
                      {choice.title}
                    </h3>
                    <p className="text-white/80">{choice.description}</p>
                  </div>
                  {isActive && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle className="w-12 h-12 text-white bg-primary rounded-full p-2" />
                    </motion.div>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  'absolute inset-0 ring-4 ring-primary transition-all duration-300 pointer-events-none',
                  isActive ? 'ring-opacity-100' : 'ring-opacity-0',
                )}
              />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

const AdvantagesSection = ({ title, description, items }) => (
  <section className={`${SPACING.container} ${SPACING.section}`}>
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg text-gray-600">{description}</p>
    </div>
    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {items.map((adv, index) => (
        <motion.div
          key={adv.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full text-center">
            <CardHeader className="items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <adv.icon className="h-6 w-6" />
              </div>
              <CardTitle className="pt-4">{adv.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{adv.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </section>
)

const ProcessSection = ({ title, description, items }) => (
  <section
    id="process"
    className={`${SPACING.container} ${SPACING.section} bg-gray-50`}
  >
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg text-gray-600">{description}</p>
    </div>
    <div className="mt-16">
      <ProcessTimeline steps={items} />
    </div>
  </section>
)

const ReviewsSection = ({ title, description, items }) => (
  <section className={`${SPACING.container} ${SPACING.section}`}>
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg text-gray-600">{description}</p>
    </div>
    <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
      {items.map((review, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="flex h-full flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <OptimizedImage
                src={review.avatar}
                alt={review.author}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <CardTitle>{review.author}</CardTitle>
                <div className="mt-1 flex items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.367-2.448a1 1 0 00-1.175 0l-3.367 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                    </svg>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600">{`"${review.text}"`}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </section>
)

const EngineerSection = () => (
  <section className={`${SPACING.container} ${SPACING.section} bg-gray-50`}>
    <div className="mx-auto">
      <EngineerExpertCard expert={engineerData} />
    </div>
  </section>
)

const FAQSection = ({ title, description, items }) => (
  <section className={`${SPACING.container} ${SPACING.section}`}>
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg text-gray-600">{description}</p>
    </div>
    <div className="mt-10 mx-auto max-w-3xl">
      <Accordion type="single" collapsible className="w-full">
        {items.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
)

const CTASection = ({ cta }) => (
  <section id="lead-form" className="bg-gray-900">
    <div
      className={`${SPACING.container} ${SPACING.section} mx-auto max-w-4xl text-center`}
    >
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {cta.title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
        {cta.subtitle}
      </p>
      <div className="mt-10">
        <LeadForm source={cta.formSource} buttonText={cta.buttonText} />
      </div>
    </div>
  </section>
)

const Electricity = () => {
  const [activeTab, setActiveTab] = useState('b2c')
  const [isCtaVisible, setIsCtaVisible] = useState(false)
  const content = pageData[activeTab]

  useEffect(() => {
    const timer = setTimeout(() => setIsCtaVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-white">
      <Helmet>
        <title>
          Электроснабжение под ключ в Санкт-Петербурге и ЛО | RealtySpb
        </title>
        <meta
          name="description"
          content="Профессиональный монтаж и проектирование систем электроснабжения для квартир, домов и бизнеса. Гарантия 5 лет, соблюдение ПУЭ и ГОСТ. Бесплатный расчет!"
        />
        <link
          rel="canonical"
          href="https://realtyspb.com/services/engineering/electricity"
        />
      </Helmet>

      <UrgencyBanner
        text={content.urgencyBanner.text}
        buttonText={content.urgencyBanner.buttonText}
        buttonLink="#lead-form"
      />

      <HeroSection />

      <AudienceChoiceCards activeTab={activeTab} setActiveTab={setActiveTab} />

      <AdvantagesSection
        title={content.advantages.title}
        description={content.advantages.description}
        items={content.advantages.items}
      />
      <ProcessSection
        title={content.processSteps.title}
        description={content.processSteps.description}
        items={content.processSteps.items}
      />
      <ReviewsSection
        title={content.reviews.title}
        description={content.reviews.description}
        items={content.reviews.items}
      />
      <EngineerSection />
      <FAQSection
        title={content.faqItems.title}
        description={content.faqItems.description}
        items={content.faqItems.items}
      />
      <CTASection cta={content.cta} />

      {isCtaVisible && (
        <FloatingCTA
          title="Рассчитайте стоимость электрики"
          subtitle="Получите смету и консультацию инженера бесплатно"
          buttonText="Получить расчет"
          formSource="Всплывающее окно 'Электрика'"
        />
      )}
    </div>
  )
}

export default Electricity 