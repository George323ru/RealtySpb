import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  ChevronRight,
  HardHat,
  Star,
  Wrench,
  AirVent,
  Thermometer,
  Wind,
  ShieldCheck,
  Filter,
  PackageCheck,
  FileText,
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
    name: 'Екатерина В.',
    role: 'Владелица квартиры в новостройке',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    rating: 5,
    text: 'После установки приточной вентиляции в квартире наконец-то стало легко дышать! Пропала духота, окна можно не открывать, а воздух всегда свежий и чистый. Работы выполнили за один день, очень чисто и аккуратно. Спасибо!',
  },
  {
    name: 'Игорь Антонов',
    role: 'Владелец офисного помещения',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    rating: 5,
    text: 'Заказывали проектирование и монтаж системы вентиляции и кондиционирования для нашего офиса. Сотрудники RealtySpb предложили отличное решение с рекуперацией тепла, что уже помогает экономить на отоплении. Все работает автоматически, климат в офисе идеальный. Рекомендую.',
  },
  {
    name: 'Семья Николаевых',
    role: 'Владельцы загородного коттеджа',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
    rating: 5,
    text: 'Для нашего каркасного дома правильная вентиляция была критически важна. Инженер компании провел расчеты воздухообмена, подобрал оборудование. Теперь в доме нет проблем с влажностью и плесенью. Система очень тихая, ее практически не слышно.',
  },
]

const faqItems = [
    {
      question: 'Насколько шумной является система вентиляции?',
      answer:
        'Мы используем современные малошумные вентиляторы и качественные шумоглушители. При правильном проектировании и монтаже работающая система по уровню шума сравнима с тихим шепотом (25-30 дБ) и не доставляет дискомфорта.',
    },
    {
      question: 'Можно ли установить вентиляцию в квартире с готовым ремонтом?',
      answer:
        'Да, это возможно. Мы предлагаем решения для чистовой отделки, например, компактные приточные установки (бризеры), которые монтируются в стену с минимальным вмешательством в интерьер. Алмазное бурение отверстий производится с пылесосом, что гарантирует чистоту.',
    },
    {
      question: 'Что такое рекуперация и зачем она нужна?',
      answer:
        'Рекуперация — это процесс возврата тепла. Установка с рекуператором подогревает входящий уличный воздух за счет теплого воздуха, удаляемого из помещения. Это позволяет значительно (до 90%) сократить расходы на отопление зимой.',
    },
    {
      question: 'Как часто нужно обслуживать систему?',
      answer:
        'Основное обслуживание — это замена фильтров. В зависимости от модели установки и качества воздуха, фильтры меняются раз в 6-12 месяцев. Мы предоставляем подробные инструкции и можем взять систему на сервисное обслуживание.',
    },
]

const benefits = [
  {
    icon: <Filter className="w-10 h-10 text-primary" />,
    title: 'Чистый воздух без пыли',
    description: 'Многоступенчатая фильтрация задерживает пыль, аллергены и вредные частицы. Вы дышите только чистым и здоровым воздухом.',
  },
  {
    icon: <Thermometer className="w-10 h-10 text-primary" />,
    title: 'Комфортный микроклимат',
    description: 'Система поддерживает идеальную температуру и влажность в помещении, создавая здоровую и продуктивную атмосферу.',
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: 'Защита от плесени и грибка',
    description: 'Правильный воздухообмен удаляет избыточную влагу — главную причину появления плесени, грибка и порчи отделки.',
  },
  {
    icon: <Wrench className="w-10 h-10 text-primary" />,
    title: 'Профессиональный монтаж',
    description: 'Наши инженеры имеют опыт более 7 лет и используют профессиональное оборудование для гарантии качества и долговечности системы.',
  },
]

const processSteps = [
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: 'Аудит и расчет',
      description: 'Инженер выезжает на объект, проводит замеры и расчет необходимого воздухообмена по нормам СНиП для каждого помещения.',
    },
    {
      icon: <HardHat className="w-8 h-8 text-primary" />,
      title: 'Проект и подбор оборудования',
      description: 'Готовим 3D-проект расположения воздуховодов и оборудования. Подбираем оптимальную систему под ваш бюджет и задачи.',
    },
    {
      icon: <Wind className="w-8 h-8 text-primary" />,
      title: 'Монтаж и автоматизация',
      description: 'Монтируем воздуховоды, устанавливаем оборудование и настраиваем автоматику для удобного управления климатом.',
    },
    {
      icon: <PackageCheck className="w-8 h-8 text-primary" />,
      title: 'Пуско-наладка и сервис',
      description: 'Запускаем систему, проверяем все режимы работы, обучаем вас и предлагаем дальнейшее сервисное обслуживание.',
    },
]

function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-sky-100 dark:from-neutral-900 dark:to-blue-900/70 py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <motion.div variants={fadeIn}>
          <Badge variant="secondary" className="mb-4">
            <AirVent className="w-4 h-4 mr-2" />
            Чистый воздух и комфорт
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-white leading-tight mb-4">
            Вентиляция и климат-контроль
            <br />
            <span className="text-primary">под ключ в вашем доме</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Создаем здоровый микроклимат в квартирах, домах и офисах. Проектирование, монтаж и автоматизация систем вентиляции с гарантией.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={scrollToForm}>
              Получить консультацию инженера
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
              Почему вентиляция — это инвестиция в здоровье
            </motion.h2>
            <motion.p variants={fadeIn} className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Современные дома герметичны, как термосы. Без правильной вентиляции в них накапливается углекислый газ, влага и вредные вещества.
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
              Прозрачный процесс от заявки до запуска
            </motion.h2>
            <motion.p variants={fadeIn} className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Мы берем на себя все этапы, чтобы вы получили готовую систему без головной боли.
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
              Что говорят наши клиенты
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
              Часто задаваемые вопросы
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
            title="Получите расчет системы вентиляции для вашего объекта"
            description="Оставьте заявку, и наш инженер бесплатно проконсультирует вас, подберет оборудование и составит точную смету."
            serviceType="Вентиляция и климат-контроль"
            theme="dark"
          />
        </motion.div>
      </div>
    </section>
  )
}


export default function Ventilation() {
  const pageTitle = 'Системы вентиляции и кондиционирования под ключ в СПб и ЛО - RealtySpb'
  const pageDescription = 'Профессиональный проект и монтаж систем вентиляции, кондиционирования и климат-контроля для квартир, домов и офисов. Гарантия, сервис, современные решения.'
  const pageUrl = 'https://realtyspb.ru/services/engineering/ventilation'
  const ogImageUrl = 'https://realtyspb.ru/og-images/ventilation-systems.jpg' // Replace with a relevant image URL

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {},
      }}
      className="bg-white dark:bg-neutral-900"
      data-service-id="ventilation"
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
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Вентиляция и климат-контроль под ключ",
              "description": "${pageDescription}",
              "provider": {
                "@type": "Organization",
                "name": "RealtySpb",
                "url": "https://realtyspb.ru"
              },
              "areaServed": {
                "@type": "City",
                "name": "Санкт-Петербург"
              },
              "serviceType": "Вентиляция и кондиционирование"
            }
          `}
        </script>
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