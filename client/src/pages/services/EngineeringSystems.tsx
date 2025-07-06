import {
  createElement,
  useEffect,
  useRef,
} from 'react'
import * as Icons from 'lucide-react'
import { Link } from 'wouter'
import { animate, motion, useInView, useMotionValue, useScroll, useSpring } from 'framer-motion'
import FloatingCTA from '../../components/FloatingCTA'
import LeadForm from '../../components/LeadForm'
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/ui/carousel'
import { Separator } from '../../components/ui/separator'
import { useServicePageData } from '../../hooks/useServicePageData'
import { Skeleton } from '../../components/ui/skeleton'
import type { ServicePageData, ServicePageDirection, ServicePageWorkStep, ServicePageReview, ServicePageFaqItem } from '@shared/types'

const AnimatedCounter = ({ to }: { to: number }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const count = useMotionValue(0)
  const rounded = useSpring(count, { stiffness: 100, damping: 30 })
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      animate(count, to, {
        duration: 2,
        ease: 'easeOut',
      })
    }
  }, [inView, count, to])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

const EngineeringSystemsPage = () => {
  const { data, isLoading, isError } = useServicePageData('engineering-systems')
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  })

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

  const Icon = ({ name, ...props }: { name: string } & Icons.LucideProps) => {
    const LucideIcon = Icons[name as keyof typeof Icons]
    if (!LucideIcon) {
      return null
    }
    return createElement(LucideIcon as React.ElementType, props)
  }

  const isServicePageData = (data: any): data is ServicePageData => {
    return data && Array.isArray(data.directions) && Array.isArray(data.howItWorksSteps)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-8 w-1/2" />
        <div className="py-20 text-center">
          <Skeleton className="mx-auto h-12 w-3/4" />
          <Skeleton className="mx-auto mt-6 h-6 w-1/2" />
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-destructive">
          Ошибка при загрузке данных
        </h2>
        <p className="mt-4 text-muted-foreground">
          Не удалось загрузить информацию для этой страницы. Пожалуйста,
          попробуйте обновить страницу или вернитесь позже.
        </p>
        <Button onClick={() => window.location.reload()} className="mt-6">
          Обновить страницу
        </Button>
      </div>
    )
  }

  if (!isServicePageData(data)) {
    return null
  }
  const { directions, howItWorksSteps, faqItems, reviews } = data as ServicePageData

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
      {/* Breadcrumbs */}
      <div className="bg-background">
      <motion.div
        variants={animationVariants}
        className="container mx-auto px-4 py-6"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Главная</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/services">Услуги</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Инженерные системы</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>
      </div>

      {/* Hero Section */}
      <motion.header
        variants={animationVariants}
        className="container mx-auto px-4 py-20 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Инженерные системы "под ключ"
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Создаем надежный фундамент для комфорта и безопасности вашего дома.
          Проектирование, монтаж и обслуживание всех видов инженерных
          коммуникаций.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}>
            <Button size="lg" asChild>
              <a href="#lead-form">Получить расчет стоимости</a>
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}>
            <Button size="lg" variant="outline" asChild>
              <a href="#directions">Все направления</a>
            </Button>
          </motion.div>
        </div>
      </motion.header>

      <Separator />

      {/* Social Proof Section */}
      <motion.section
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {},
        }}
      >
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <motion.div variants={animationVariants} className="group">
             <Card className="flex h-full flex-col items-center p-6 transition-shadow duration-300 group-hover:shadow-lg">
              <Icons.Award className="h-10 w-10 text-primary" />
              <p className="mt-4 text-5xl font-bold text-primary">
                <AnimatedCounter to={150} />+
              </p>
              <p className="mt-2 text-muted-foreground">Выполненных проектов</p>
            </Card>
          </motion.div>
          <motion.div variants={animationVariants} className="group">
            <Card className="flex h-full flex-col items-center p-6 transition-shadow duration-300 group-hover:shadow-lg">
              <Icons.Medal className="h-10 w-10 text-primary" />
              <p className="mt-4 text-5xl font-bold text-primary">
                <AnimatedCounter to={10} />
                <span className="text-3xl">лет</span>
              </p>
              <p className="mt-2 text-muted-foreground">
                Средний опыт инженеров
              </p>
            </Card>
          </motion.div>
          <motion.div variants={animationVariants} className="group">
            <Card className="flex h-full flex-col items-center p-6 transition-shadow duration-300 group-hover:shadow-lg">
              <Icons.Users className="h-10 w-10 text-primary" />
              <p className="mt-4 text-5xl font-bold text-primary">
                <AnimatedCounter to={90} />%
              </p>
              <p className="mt-2 text-muted-foreground">
                Клиентов приходят по рекомендации
              </p>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Directions Section */}
      <motion.section
        id="directions"
        className="container mx-auto px-4 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {},
        }}
      >
        <motion.div variants={animationVariants} className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Магия для каждой задачи
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            От одной розетки до комплексной автоматизации здания — у нас есть
            экспертиза для вашего проекта.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {directions.map((direction: ServicePageDirection, index: number) => (
            <motion.div key={index} variants={animationVariants} className="h-full">
            <motion.div
                className="h-full"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={{
                  rest: { scale: 1, y: 0, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
                  hover: { scale: 1.03, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <Card className="flex h-full flex-col text-center border-2 border-transparent">
                <CardHeader className="items-center">
                    <motion.div variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: 10, scale: 1.1 } }}>
                  <Icon
                    name={direction.icon}
                    className="mb-4 h-12 w-12 text-primary"
                  />
                    </motion.div>
                    <CardTitle className="text-xl">{direction.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <motion.p
                      className="text-muted-foreground"
                      variants={{
                        rest: { opacity: 0.7 },
                        hover: { opacity: 1 },
                      }}
                    >
                    {direction.description}
                    </motion.p>
                </CardContent>
                  <CardFooter className="justify-center pt-4">
                    <Button asChild variant="outline" className="overflow-hidden">
                      <Link to={`/services/engineering/${direction.slug}`}>
                        {direction.cta || 'Подробнее'}
                        <motion.span
                          className="inline-block"
                          variants={{
                            rest: { x: "-150%", opacity: 0 },
                            hover: { x: 0, opacity: 1 },
                          }}
                          transition={{ ease: 'easeOut' }}
                        >
                          <Icons.ArrowRight className="ml-2 h-4 w-4" />
                        </motion.span>
                      </Link>
                    </Button>
                  </CardFooter>
              </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Alchemy Section */}
      <motion.section
        className="bg-background py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={animationVariants} className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Превращаем хаос в систему
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Мы не просто монтируем оборудование. Мы создаем надежный
              фундамент для вашего комфорта, который будет служить
              десятилетиями.
            </p>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 items-center gap-8 md:grid-cols-5">
            {/* "Боль" Card */}
            <motion.div variants={animationVariants} className="md:col-span-2">
              <Card className="h-full border-destructive/50 bg-destructive/5">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
                      <Icons.XCircle className="h-6 w-6" />
                    </div>
                    <CardTitle>Боль: "Как-нибудь само"</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-destructive-foreground/80">
                  <p>❌ Провода и трубы вразнобой</p>
                  <p>❌ Постоянные сбои и "выбитые пробки"</p>
                  <p>❌ Непонятно, кто за что отвечает</p>
                  <p>❌ Риск протечек и замыканий</p>
                  <p>❌ Деньги, потраченные на переделки</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={animationVariants}
              className="hidden justify-center md:flex"
            >
              <Icons.ArrowRightCircle className="h-20 w-20 animate-pulse text-muted-foreground/30 duration-1000" />
            </motion.div>

            {/* "Решение" Card */}
            <motion.div variants={animationVariants} className="md:col-span-2">
              <Card className="h-full border-primary/50 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Icons.CheckCircle className="h-6 w-6" />
                    </div>
                    <CardTitle>Решение: Инженерный подход</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-primary-foreground/80">
                  <p>✅ Проект с 3D-визуализацией</p>
                  <p>✅ Системы с запасом прочности</p>
                  <p>✅ Единый ответственный подрядчик</p>
                  <p>✅ Гарантия по договору до 5 лет</p>
                  <p>✅ Экономия на эксплуатации до 30%</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="bg-background py-24"
        ref={timelineRef}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationVariants}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ваш проект в 4 ясных шага
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Прозрачный и понятный процесс от заявки до сдачи объекта.
            </p>
          </motion.div>

          <div className="relative mt-20">
            {/* The connecting line */}
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border origin-top"
              style={{ scaleY: scrollYProgress }}
            />

            {/* Steps */}
            {howItWorksSteps.map((step: ServicePageWorkStep, index: number) => (
              <motion.div
                key={step.id}
                className="relative mb-12 flex items-center justify-between"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: (i: number) => ({ opacity: 1, transition: { delay: i * 0.2 } })
                }}
              >
                {/* Content Card */}
                <div
                  className={`w-[calc(50%-4rem)] ${
                    index % 2 === 0 ? 'order-1 text-left' : 'order-3 text-right'
                  }`}
                >
                  <Card className="inline-block w-full text-left">
                  <CardHeader>
                      <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                </div>

                {/* Spacer */}
                <div className="w-16 flex-shrink-0"></div>
                
                {/* Timeline Dot */}
                <div className={`order-2`}>
                  <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground shadow-lg">
                    {step.id}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Reviews Section */}
      <motion.section
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animationVariants}
      >
        <div className="container mx-auto px-4">
          <div className="relative text-center">
            <Icons.Quote className="absolute inset-x-0 top-0 mx-auto h-24 w-24 -translate-y-1/2 text-primary/10" />
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Голоса тех, чьи дома мы преобразили
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Нам важно мнение каждого клиента, и мы гордимся результатами.
            </p>
          </div>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="mx-auto mt-12 w-full max-w-4xl"
          >
            <CarouselContent>
              {reviews.map((review: ServicePageReview, index: number) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    className="p-1"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="relative overflow-hidden bg-gradient-to-b from-white to-neutral-100">
                      <CardContent className="flex h-full flex-col justify-between p-6">
                        <Icons.Quote className="absolute -top-2 -left-2 h-16 w-16 text-primary/10" />
                        <div className="z-10 flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Icons.Star
                              key={i}
                              className="h-5 w-5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="z-10 mt-4 text-muted-foreground">
                          "{review.text}"
                        </p>
                        <p className="z-10 mt-4 font-semibold">{review.author}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="container mx-auto px-4 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animationVariants}
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Остались вопросы? У нас есть ответы
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Ответы на вопросы, которые помогут вам принять верное решение.
            </p>
          </div>
          <Accordion type="single" collapsible className="mt-12 w-full">
            {faqItems.map((item: ServicePageFaqItem, index: number) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left data-[state=open]:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>

      {/* Lead Form Section */}
      <motion.section
        id="lead-form"
        className="relative bg-slate-900 py-24 text-primary-foreground"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animationVariants}
      >
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_farthest-side,rgba(255,255,255,0.05),rgba(255,255,255,0))] bg-[length:40px_40px] bg-center"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-xl">
            <LeadForm
              title="Воплотите ваш проект в реальность"
              description="Получите детальный расчет и план работ для ваших инженерных систем. Наш инженер свяжется с вами, чтобы ответить на все вопросы."
              serviceType="Инженерные системы"
            />
            <div className="mt-6 flex items-center justify-center text-xs text-slate-400">
              <Icons.Lock className="mr-2 h-4 w-4" />
              <p>Ваши данные в безопасности и не передаются третьим лицам.</p>
            </div>
          </div>
        </div>
      </motion.section>
      <FloatingCTA />
    </motion.div>
  )
}

export default EngineeringSystemsPage
