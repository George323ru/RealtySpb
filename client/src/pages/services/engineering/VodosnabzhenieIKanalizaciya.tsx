import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  ChevronRight,
  HardHat,
  MapPin,
  Recycle,
  ShieldCheck,
  Star,
  Wrench,
  Droplets,
  Sprout,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LeadForm from '@/components/LeadForm'
import { Badge } from '@/components/ui/badge'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const testimonials = [
  {
    name: 'Алексей и Ирина',
    role: 'Владельцы загородного дома',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    rating: 5,
    text: 'Заказывали полный монтаж водоснабжения и канализации для нашего нового дома. Инженер приехал, всё рассчитал, показал разные варианты. Сделали быстро, чисто, и главное — всё работает как часы. Наконец-то у нас комфорт как в городской квартире!',
  },
  {
    name: 'Михаил Петрович',
    role: 'Дачник со стажем',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    rating: 5,
    text: 'Нужна была замена старой системы канализации на септик. Боялся, что перекопают весь участок. Ребята из RealtySpb сделали всё очень аккуратно. Техника у них компактная. Теперь никаких запахов и проблем. Спасибо за профессионализм!',
  },
  {
    name: 'Ольга Новикова',
    role: 'Инвестор в недвижимость',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    rating: 5,
    text: 'Готовила дом к продаже. Потребовалось завести воду и сделать локальную канализацию, чтобы повысить привлекательность объекта. Команда сработала четко по договору, уложились в сроки и смету. Объект продался значительно дороже. Рекомендую.',
  },
]

const faqItems = [
  {
    question: 'Сколько времени занимает монтаж системы?',
    answer:
      'В среднем, полный монтаж системы водоснабжения и канализации для частного дома площадью 100-150 м² занимает от 5 до 10 рабочих дней. Сроки зависят от сложности проекта, типа грунта и выбранного оборудования.',
  },
  {
    question: 'Даете ли вы гарантию на свои работы?',
    answer:
      'Да, мы предоставляем официальную гарантию на все выполненные работы и установленное оборудование. Срок гарантии на монтажные работы составляет 3 года, на оборудование — в соответствии с гарантией производителя (от 1 до 10 лет).',
  },
  {
    question: 'Что входит в стоимость "под ключ"?',
    answer:
      'В стоимость "под ключ" входит всё необходимое для запуска системы: разработка проекта, подбор и доставка оборудования и материалов, все земляные и монтажные работы, пуско-наладка системы и инструктаж по её использованию.',
  },
  {
    question: 'Работаете ли вы в Ленинградской области?',
    answer:
      'Да, мы работаем по всему Санкт-Петербургу и Ленинградской области. Наш инженер бесплатно выезжает на объект для замеров и консультации в пределах 50 км от КАД.',
  },
]

const benefits = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: 'Гарантия 3 года',
    description: 'Мы уверены в качестве своих работ и даем официальную гарантию на монтаж. Ваше спокойствие — наш приоритет.',
  },
  {
    icon: <HardHat className="w-10 h-10 text-primary" />,
    title: 'Опытные инженеры',
    description: 'В нашей команде только штатные, аттестованные специалисты со стажем от 7 лет. Никаких случайных людей.',
  },
  {
    icon: <Wrench className="w-10 h-10 text-primary" />,
    title: 'Современное оборудование',
    description: 'Используем только проверенное оборудование от лидеров рынка (Rehau, Stout, Grundfos), что гарантирует надежность системы.',
  },
  {
    icon: <Recycle className="w-10 h-10 text-primary" />,
    title: 'Экологичные решения',
    description: 'Предлагаем современные септики и станции биологической очистки, которые безопасны для окружающей среды и не требуют частого обслуживания.',
  },
]

const processSteps = [
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: 'Консультация и выезд инженера',
      description: 'Вы оставляете заявку, мы проводим первичную консультацию и договариваемся о бесплатном выезде инженера для точных замеров и анализа объекта.',
    },
    {
      icon: <Sprout className="w-8 h-8 text-primary" />,
      title: 'Проект и смета',
      description: 'На основе замеров мы готовим детальный проект и прозрачную смету с фиксированной ценой. Вы точно знаете, за что платите.',
    },
    {
      icon: <Droplets className="w-8 h-8 text-primary" />,
      title: 'Монтаж системы',
      description: 'Наша бригада выполняет все работы — от земляных до подключения сантехники. Мы соблюдаем чистоту и строительные нормы.',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: 'Пуско-наладка и сдача',
      description: 'Мы запускаем систему, проверяем ее работу во всех режимах, обучаем вас пользоваться и подписываем акт выполненных работ. Ваша система готова!',
    },
  ]

function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-neutral-900 dark:to-blue-900 py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <motion.div variants={fadeIn}>
          <Badge variant="secondary" className="mb-4">
            <Wrench className="w-4 h-4 mr-2" />
            Инженерные системы под ключ
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-white leading-tight mb-4">
            Водоснабжение и канализация
            <br />
            <span className="text-primary">для вашего дома</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Гарантируем комфорт городской квартиры в вашем загородном доме. Полный цикл работ от проекта до запуска с гарантией 3 года.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={scrollToForm}>
              Рассчитать стоимость
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              Смотреть проекты
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center mb-12">
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              Надежность, заложенная в основу
            </motion.h2>
            <motion.p variants={fadeIn} className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Мы создаем инженерные системы, которые служат десятилетиями, требуя минимального внимания с вашей стороны.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div variants={fadeIn} key={index}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300 dark:bg-neutral-800 dark:border-neutral-700">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <CardTitle className="dark:text-white">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 dark:text-neutral-400">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-blue-50/50 dark:bg-neutral-800/30">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center mb-12">
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              Всего 4 шага до комфорта
            </motion.h2>
            <motion.p variants={fadeIn} className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Мы сделали процесс максимально простым и прозрачным для вас.
            </motion.p>
          </div>
          <div className="relative">
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/20" aria-hidden="true"></div>
             <div className="grid md:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                    <motion.div variants={fadeIn} key={index} className="text-center relative bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
                        <div className="mb-4 inline-block">{step.icon}</div>
                        <h3 className="text-lg font-semibold mb-2 dark:text-white">{step.title}</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{step.description}</p>
                    </motion.div>
                ))}
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center mb-12">
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              Нам доверяют самое ценное — комфорт семьи
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div variants={fadeIn} key={testimonial.name}>
                <Card className="h-full flex flex-col dark:bg-neutral-800 dark:border-neutral-700">
                  <CardContent className="pt-6 flex-grow">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold dark:text-white">{testimonial.name}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-4">{testimonial.text}</p>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="py-16 md:py-24 bg-blue-50/50 dark:bg-neutral-800/30">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              Отвечаем на вопросы
            </motion.h2>
          </div>
          <motion.div variants={fadeIn}>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white dark:bg-neutral-800 rounded-lg mb-2 shadow-sm px-4">
                  <AccordionTrigger className="text-lg text-left hover:no-underline dark:text-white">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-neutral-600 dark:text-neutral-400">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section id="lead-form" className="py-16 md:py-24 bg-neutral-900 dark:bg-black">
      <div className="container mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <LeadForm
            title="Получите точный расчет стоимости"
            description="Оставьте заявку, и наш инженер бесплатно проконсультирует вас, составит смету и ответит на все вопросы."
            serviceType="Водоснабжение и канализация"
            theme="dark"
          />
        </motion.div>
      </div>
    </section>
  )
}


export default function VodosnabzhenieIKanalizaciya() {
  const pageTitle = 'Водоснабжение и канализация под ключ в СПб и ЛО - RealtySpb'
  const pageDescription = 'Профессиональный монтаж систем водоснабжения и канализации для загородных домов. Гарантия 3 года, опытные инженеры, современные материалы. Рассчитайте стоимость онлайн!'
  const pageUrl = 'https://realtyspb.ru/services/engineering/vodosnabzhenie-i-kanalizaciya'
  const ogImageUrl = 'https://realtyspb.ru/og-images/water-systems.jpg' // Replace with a relevant image URL

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {},
      }}
      className="bg-white dark:bg-neutral-900"
    >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RealtySpb" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      
    </motion.div>
  )
}