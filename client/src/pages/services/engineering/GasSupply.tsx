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
import { ArrowRight, CheckCircle, Clock, Shield, PiggyBank, Heart, Building, FileText, Calculator, Flame, Factory, Home as HomeIcon, Lightbulb, Users } from 'lucide-react'
import OptimizedImage from '@/components/OptimizedImage'
import LeadForm from '@/components/LeadForm'
import FloatingCTA from '@/components/FloatingCTA'
import { ProcessTimeline } from '@/components/ui/process-timeline'
import { EngineerExpertCard } from '@/components/ui/EngineerExpertCard'
import { UrgencyBanner } from '@/components/ui/UrgencyBanner'
import { heroData, estimateExamples, advantages, processSteps, faq, engineerData } from '@/api/gasSupplyData'

// --- Типы ---
type AudienceType = 'b2c' | 'b2b';

// --- Константы для страницы ---
const SPACING = {
  section: 'py-16 sm:py-24',
  container: 'container mx-auto px-4 sm:px-6',
}

const ANIMATION = {
  stagger: 0.1,
  duration: 0.6,
}

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * ANIMATION.stagger,
      duration: ANIMATION.duration,
      ease: 'easeOut',
    },
  }),
}

// --- Компоненты-секции ---

const HeroSection = () => (
  <motion.section
    className={`${SPACING.section} text-center bg-gray-50 dark:bg-gray-900/50`}
    variants={sectionVariants}
    custom={0}
  >
    <div className={SPACING.container}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Badge variant="secondary" className="mb-4 text-sm font-bold tracking-widest uppercase">
          <Flame className="w-4 h-4 mr-2" />
          Энергия для вашего будущего
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {heroData.title}
        </h1>
        <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600 dark:text-gray-300">
          {heroData.subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          {heroData.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-200">
              <CheckCircle className="w-5 h-5 mr-2 text-primary" />
              {feature}
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button size="lg" asChild>
            <a href="#lead-form">
              Рассчитать стоимость газификации <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  </motion.section>
)

const AudienceSwitcher = ({ activeTab, onTabChange }: { activeTab: AudienceType, onTabChange: (tab: AudienceType) => void }) => (
    <motion.div
        className="sticky top-16 md:top-24 z-10 py-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md"
        variants={sectionVariants}
        custom={1}
    >
        <div className={SPACING.container}>
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">Для кого наши услуги?</h2>
                <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Выберите ваш сегмент, чтобы увидеть релевантные решения и цены.
                </p>
            </div>
            <Tabs
                value={activeTab}
                onValueChange={(value) => onTabChange(value as AudienceType)}
                className="w-full"
            >
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                    <TabsTrigger value="b2c" className="flex items-center gap-2">
                        <HomeIcon className="w-4 h-4" />
                        Частным клиентам
                    </TabsTrigger>
                    <TabsTrigger value="b2b" className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Бизнесу
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    </motion.div>
);

const EstimateExamplesSection = ({ activeTab }: { activeTab: AudienceType }) => {
  const examples = estimateExamples[activeTab];
  
  return (
    <motion.section
      className={`${SPACING.section} bg-white dark:bg-gray-950`}
      variants={sectionVariants}
      custom={2}
    >
      <div className={SPACING.container}>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">Примеры смет на газификацию</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-400">
            Ознакомьтесь с реальными примерами наших работ для {activeTab === 'b2c' ? 'частных лиц' : 'бизнеса'}.
          </p>
        </div>
        <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-2">
          {examples.map((example, index) => (
            <Card key={index} className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
              <OptimizedImage src={example.image} alt={example.type} className="object-cover w-full h-48" />
              <CardHeader>
                <CardTitle>{example.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{example.price}</p>
                <p className="mt-1 text-sm text-gray-500">Срок выполнения: {example.duration}</p>
                <Separator className="my-4" />
                <ul className="space-y-2">
                  {example.works.map((work, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-500 shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{work}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

const AdvantagesSection = ({ activeTab }: { activeTab: AudienceType }) => {
    const advantagesData = advantages[activeTab];

    return (
    <motion.section
      className={`${SPACING.section} bg-gray-50 dark:bg-gray-900/50`}
      variants={sectionVariants}
      custom={3}
    >
      <div className={SPACING.container}>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">Почему выбирают нас</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-400">
            Наши преимущества для {activeTab === 'b2c' ? 'частных клиентов' : 'бизнеса'}.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {advantagesData.map((advantage, index) => (
            <motion.div
              key={index}
              variants={sectionVariants}
              custom={index}
            >
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl">
                    <advantage.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">{advantage.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

const ProcessSection = () => (
  <motion.section
    className={`${SPACING.section}`}
    variants={sectionVariants}
    custom={4}
  >
    <div className={SPACING.container}>
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">Процесс газификации "под ключ"</h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-400">
          Мы полностью берем на себя все этапы — от аудита до постановки на учет.
        </p>
      </div>
      <ProcessTimeline steps={processSteps} />
    </div>
  </motion.section>
)

const EngineerSection = () => (
  <EngineerExpertCard expert={engineerData} />
)

const FAQSection = ({ activeTab }: { activeTab: AudienceType }) => {
  const faqData = faq[activeTab];

  return (
    <motion.section
      className={`${SPACING.section} bg-white dark:bg-gray-950`}
      variants={sectionVariants}
      custom={5}
    >
      <div className={SPACING.container}>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">Часто задаваемые вопросы</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-400">
            Ответы на самые популярные вопросы для {activeTab === 'b2c' ? 'частных клиентов' : 'бизнеса'}.
          </p>
        </div>
        <div className="max-w-3xl mx-auto mt-12 space-y-4">
            {faqData.map((item, index) => (
            <Card key={index}>
                <CardHeader>
                <CardTitle className='text-lg'>{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                </CardContent>
            </Card>
            ))}
        </div>
      </div>
    </motion.section>
  )
}

const CTASection = () => (
  <motion.section
    id="lead-form"
    className={`${SPACING.section} bg-gray-50 dark:bg-gray-900/50`}
    variants={sectionVariants}
    custom={6}
  >
    <div className={SPACING.container}>
      <div className="max-w-4xl mx-auto">
        <LeadForm
          title="Получите точный расчет стоимости газификации"
          description="Оставьте заявку, и наш инженер подготовит подробную смету для вашего объекта в течение 24 часов."
          serviceType="Газификация"
        />
      </div>
    </div>
  </motion.section>
)

const GasSupplyPage = () => {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const [activeTab, setActiveTab] = useState<AudienceType>('b2c');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloatingCTA(true)
      } else {
        setShowFloatingCTA(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-950"
    >
      <Helmet>
        <title>Газификация и работа с энергией под ключ в Санкт-Петербурге и ЛО | RealtySpb</title>
        <meta
          name="description"
          content="Профессиональная газификация частных домов, коттеджных поселков и промышленных объектов. Полный цикл работ от проекта до запуска. Гарантия 5 лет."
        />
        <link rel="canonical" href="https://realtyspb.com/services/engineering/gas-supply" />
      </Helmet>
      
      <UrgencyBanner />

      <motion.div initial="hidden" animate="visible">
        <HeroSection />
        <AudienceSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        <EstimateExamplesSection activeTab={activeTab} />
        <AdvantagesSection activeTab={activeTab} />
        <ProcessSection />
        <EngineerSection />
        <FAQSection activeTab={activeTab} />
        <CTASection />
      </motion.div>

      <FloatingCTA />
    </motion.div>
  )
}

export default GasSupplyPage 