import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { Helmet } from 'react-helmet-async'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, CheckCircle, Clock, Shield, Thermometer, PiggyBank, Heart, Building, FileText, Calculator } from 'lucide-react'
import OptimizedImage from '@/components/OptimizedImage'
import LeadForm from '@/components/LeadForm'
import FloatingCTA from '@/components/FloatingCTA'
import { ProcessTimeline } from '@/components/ui/process-timeline'
import { EngineerExpertCard } from '@/components/ui/EngineerExpertCard'
import { UrgencyBanner } from '@/components/ui/UrgencyBanner'

// --- Константы для страницы ---
const SPACING = {
  section: 'py-24',
  container: 'container mx-auto px-6',
  grid: 'grid gap-8',
  card: 'p-8',
}

const ANIMATION = {
  stagger: 0.1,
  duration: 0.6,
}

// --- Данные для страницы ---
const heroData = {
  title: 'Монтаж систем отопления',
  subtitle: 'Проектируем и устанавливаем инженерные системы для частных домов и коммерческих объектов',
  features: ['Гарантия 3 года', 'Оборудование Viessmann', 'Бесплатный аудит'],
  image: 'https://images.unsplash.com/photo-1628592102751-ba834f697244?w=1200&q=80',
}

const estimateExamples = {
  b2c: [
    {
      type: 'Квартира 80 м²',
      price: 'от 320 000 ₽',
      duration: '5 дней',
      works: [
        'Котел Viessmann Vitodens 100-W',
        'Трубы Rehau Rautitan',
        'Радиаторы Kermi (4 шт.)',
        'Автоматика Danfoss',
        'Монтаж и пусконаладка',
        'Гарантия 3 года',
      ],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80',
    },
    {
      type: 'Частный дом 150 м²',
      price: 'от 540 000 ₽',
      duration: '7 дней',
      works: [
        'Котел Buderus Logamax Plus',
        'Трубы Rehau Rautitan',
        'Радиаторы Purmo (6 шт.)',
        'Автоматика Siemens',
        'Теплый пол 40 м²',
        'Гарантия 3 года',
      ],
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80',
    },
    {
      type: 'Коттедж 250 м²',
      price: 'от 890 000 ₽',
      duration: '10 дней',
      works: [
        'Котел Vaillant ecoTEC',
        'Трубы Uponor',
        'Радиаторы Kermi (8 шт.)',
        'Автоматика Danfoss',
        'Теплый пол 80 м²',
        'Гарантия 3 года',
      ],
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&q=80',
    },
  ],
  b2b: [
    {
      type: 'Офисное здание 1000 м²',
      price: 'от 2 800 000 ₽',
      duration: '15 дней',
      works: [
        'Котел Viessmann Vitocrossal 300',
        'Трубы Rehau Rautitan',
        'Радиаторы Kermi (25 шт.)',
        'Автоматика Honeywell',
        'Исполнительная документация',
        'Гарантия 3 года + НДС',
      ],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    },
    {
      type: 'Торговый центр 2500 м²',
      price: 'от 6 500 000 ₽',
      duration: '20 дней',
      works: [
        'Котел Buderus Logamax Plus',
        'Трубы Uponor',
        'Радиаторы Purmo (60 шт.)',
        'Автоматика Siemens',
        'Исполнительная документация',
        'Гарантия 3 года + НДС',
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    },
    {
      type: 'Производственное помещение 800 м²',
      price: 'от 2 200 000 ₽',
      duration: '12 дней',
      works: [
        'Котел Vaillant ecoTEC',
        'Трубы Rehau',
        'Радиаторы Kermi (20 шт.)',
        'Автоматика Siemens',
        'Исполнительная документация',
        'Гарантия 3 года + НДС',
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    },
  ],
}

const advantages = {
  b2c: [
    {
      icon: Shield,
      title: 'Надежность на десятилетия',
      description: 'Используем только проверенное оборудование Viessmann, Buderus, Rehau с гарантией до 10 лет.',
    },
    {
      icon: Thermometer,
      title: 'Комфорт в каждом помещении',
      description: 'Точная настройка температуры в каждой комнате, автоматическое поддержание микроклимата.',
    },
    {
      icon: PiggyBank,
      title: 'Экономия на отоплении',
      description: 'Современные котлы и автоматика позволяют экономить до 30% на расходах на отопление.',
    },
    {
      icon: Heart,
      title: 'Забота о вашем доме',
      description: 'Бесплатный аудит через год, рекомендации по обслуживанию, поддержка 24/7.',
    },
  ],
  b2b: [
    {
      icon: Clock,
      title: 'Соблюдение сроков',
      description: 'Четкое планирование, бригады до 8 человек, работа в 2-3 смены при необходимости.',
    },
    {
      icon: Calculator,
      title: 'Фиксированный бюджет',
      description: 'Прозрачная смета без скрытых доплат, работа по договору с НДС, поэтапная оплата.',
    },
    {
      icon: FileText,
      title: 'Полная документация',
      description: 'Исполнительная документация, сертификаты, паспорта оборудования, акты приемки.',
    },
    {
      icon: Building,
      title: 'Опыт с крупными объектами',
      description: 'Реализовали проекты до 5000 м², работаем с застройщиками и подрядчиками.',
    },
  ],
}

const processSteps = [
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
]

const faq = {
  b2c: [
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
  ],
  b2b: [
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
  ],
}

const engineerData = {
  name: 'Иван Петров',
  position: 'Ведущий инженер',
  experience: '15 лет',
  quote: 'Я отвечаю за каждую систему как за свою собственную. Опыт работы с объектами до 5000 м².',
  certificates: ['Viessmann', 'Rehau', 'Buderus'],
  projectsCount: 57,
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
}

// --- Компоненты страницы ---
const HeroSection = () => (
  <section className={`${SPACING.section} bg-gradient-to-br from-slate-50 to-slate-100`}>
    <div className={SPACING.container}>
      <motion.div 
        className="grid lg:grid-cols-2 gap-16 items-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: ANIMATION.stagger }
          }
        }}
      >
        <motion.div variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0, transition: { duration: ANIMATION.duration } }
        }}>
          <Badge variant="secondary" className="mb-6">Инженерные системы</Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {heroData.title}
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            {heroData.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            {heroData.features.map((feature, index) => (
              <motion.div
                key={feature}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
                }}
              >
                <Badge variant="outline" className="text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {feature}
                </Badge>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg px-8 py-6">
              Получить консультацию
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Скачать прайс
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="relative"
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0, transition: { duration: ANIMATION.duration } }
          }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <OptimizedImage
              src={heroData.image}
              alt="Монтаж системы отопления"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
)

const EstimateExamplesSection = () => {
  const [activeTab, setActiveTab] = useState('b2c')

  return (
    <section className={SPACING.section}>
      <div className={SPACING.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: ANIMATION.duration } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Примеры смет
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Прозрачные цены на монтаж систем отопления. Все цены включают оборудование, монтаж и гарантию.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="b2c" className="text-base py-3">Частные клиенты</TabsTrigger>
            <TabsTrigger value="b2b" className="text-base py-3">Коммерческие объекты</TabsTrigger>
          </TabsList>

          <TabsContent value="b2c" className="mt-0">
            <motion.div 
              className="grid lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              {estimateExamples.b2c.map((example, index) => (
                <motion.div
                  key={example.type}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <OptimizedImage
                          src={example.image}
                          alt={example.type}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900">
                          {example.duration}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className={`${SPACING.card} flex flex-col h-full`}>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-slate-900">{example.type}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900">{example.price}</div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <ul className="space-y-3 flex-grow">
                        {example.works.map((work, workIndex) => (
                          <li key={workIndex} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-600">{work}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-6" size="lg">
                        Получить смету
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="b2b" className="mt-0">
            <motion.div 
              className="grid lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              {estimateExamples.b2b.map((example, index) => (
                <motion.div
                  key={example.type}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <OptimizedImage
                          src={example.image}
                          alt={example.type}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900">
                          {example.duration}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className={`${SPACING.card} flex flex-col h-full`}>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-slate-900">{example.type}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900">{example.price}</div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <ul className="space-y-3 flex-grow">
                        {example.works.map((work, workIndex) => (
                          <li key={workIndex} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-600">{work}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-6" size="lg">
                        Получить коммерческое предложение
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

const AdvantagesSection = () => {
  const [activeTab, setActiveTab] = useState('b2c')

  return (
    <section className={`${SPACING.section} bg-slate-50`}>
      <div className={SPACING.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: ANIMATION.duration } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Почему выбирают нас
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Наши преимущества для разных типов клиентов
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="b2c" className="text-base py-3">Частные клиенты</TabsTrigger>
            <TabsTrigger value="b2b" className="text-base py-3">Коммерческие объекты</TabsTrigger>
          </TabsList>

          <TabsContent value="b2c" className="mt-0">
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              {advantages.b2c.map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className={`${SPACING.card} text-center`}>
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <advantage.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">{advantage.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{advantage.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="b2b" className="mt-0">
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              {advantages.b2b.map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className={`${SPACING.card} text-center`}>
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <advantage.icon className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-4">{advantage.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{advantage.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

const ProcessSection = () => (
  <section className={SPACING.section}>
    <div className={SPACING.container}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: ANIMATION.duration } }
        }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-slate-900 mb-6">
          Как мы работаем
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Простой и понятный процесс от заявки до сдачи объекта
        </p>
      </motion.div>

      <ProcessTimeline steps={processSteps} />
    </div>
  </section>
)

const EngineerSection = () => (
  <section className={`${SPACING.section} bg-slate-50`}>
    <div className={SPACING.container}>
      <EngineerExpertCard expert={engineerData} />
    </div>
  </section>
)

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState('b2c')

  return (
    <section className={SPACING.section}>
      <div className={SPACING.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: ANIMATION.duration } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ответы на самые популярные вопросы наших клиентов
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="b2c" className="text-base py-3">Частные клиенты</TabsTrigger>
            <TabsTrigger value="b2b" className="text-base py-3">Коммерческие объекты</TabsTrigger>
          </TabsList>

          <TabsContent value="b2c" className="mt-0">
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              {faq.b2c.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <Card className="h-full border-0 shadow-sm">
                    <CardContent className={`${SPACING.card}`}>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">{item.question}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="b2b" className="mt-0">
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              {faq.b2b.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <Card className="h-full border-0 shadow-sm">
                    <CardContent className={`${SPACING.card}`}>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">{item.question}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

const CTASection = () => (
  <section className={`${SPACING.section} bg-gradient-to-r from-blue-600 to-blue-700`}>
    <div className={SPACING.container}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: ANIMATION.duration } }
        }}
        className="text-center text-white"
      >
        <h2 className="text-4xl font-bold mb-6">
          Остались вопросы?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Получите бесплатную консультацию от нашего ведущего инженера. 
          Ответим на все вопросы и подготовим индивидуальное предложение.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            Получить консультацию
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
            Заказать звонок
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
)

// --- Основной компонент ---
const Heating = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>Монтаж систем отопления в Санкт-Петербурге | RealtySpb</title>
        <meta 
          name="description" 
          content="Проектируем и устанавливаем системы отопления для частных домов и коммерческих объектов. Оборудование Viessmann, Buderus, Rehau. Гарантия 3 года. Бесплатный аудит." 
        />
        <meta name="keywords" content="монтаж отопления, система отопления, котел, радиаторы, теплый пол, Санкт-Петербург" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Монтаж систем отопления в Санкт-Петербурге" />
        <meta property="og:description" content="Проектируем и устанавливаем системы отопления для частных домов и коммерческих объектов. Оборудование Viessmann, Buderus, Rehau." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://realtyspb.ru/services/heating" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Монтаж систем отопления",
            "description": "Проектируем и устанавливаем системы отопления для частных домов и коммерческих объектов",
            "provider": {
              "@type": "Organization",
              "name": "RealtySpb",
              "url": "https://realtyspb.ru"
            },
            "areaServed": {
              "@type": "City",
              "name": "Санкт-Петербург"
            },
            "serviceType": "Монтаж инженерных систем",
            "offers": {
              "@type": "Offer",
              "price": "320000",
              "priceCurrency": "RUB",
              "description": "Монтаж системы отопления для квартиры 80 м²"
            }
          })}
        </script>
      </Helmet>

      <HeroSection />
      <EstimateExamplesSection />
      <AdvantagesSection />
      <ProcessSection />
      <EngineerSection />
      <FAQSection />
      <CTASection />
      
      <FloatingCTA 
        text="Получить консультацию"
        showAfterScroll={300}
      />
    </>
  )
}

export default Heating 