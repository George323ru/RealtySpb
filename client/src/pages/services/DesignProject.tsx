import React, { useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import LeadForm from '@/components/LeadForm';
import {
  CheckCircle,
  Palette,
  Ruler,
  DraftingCompass,
  Lightbulb,
  Camera,
  Layers,
  Star,
  ArrowRight,
  ArrowLeft,
  XCircle,
  FileText,
  Save,
  Clock,
  Eye,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from '../../components/ui/carousel';
import { cn } from '../../lib/utils';

// --- Animation Variants (from Template "1") ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const cardSlideIn = (direction = 'left') => ({
  hidden: { opacity: 0, x: direction === 'left' ? -100 : 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
});

// --- Reusable Components (from Template "1") ---

const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: latest => {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const TestimonialsHeader = () => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="max-w-xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
          Что говорят о наших проектах
        </h2>
        <p className="text-lg text-text-secondary mt-2">
          Истории, в которых дизайн изменил жизнь.
        </p>
      </div>
      <div className="hidden md:flex gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="h-12 w-12 rounded-full bg-white border-neutral-300 text-neutral-600 hover:border-accent-orange hover:text-accent-orange disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:text-neutral-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="h-12 w-12 rounded-full bg-white border-neutral-300 text-neutral-600 hover:border-accent-orange hover:text-accent-orange disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:text-neutral-600"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

interface BenefitCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => (
  <motion.div
    className="bg-neutral-50 rounded-2xl p-8 border h-full transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg"
    variants={itemVariants}
  >
    <div className="mb-5">
      <div className="w-12 h-12 flex items-center justify-center bg-accent-orange/10 rounded-lg">
        {React.cloneElement(icon, {
          className: 'w-6 h-6 text-accent-orange',
        })}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2 text-text-primary">{title}</h3>
    <p className="text-text-secondary leading-relaxed">{description}</p>
  </motion.div>
);

const StarRating = ({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) => (
  <div className={cn('flex items-center gap-1', className)}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'
        }`}
      />
    ))}
  </div>
);

interface ProcessStepProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  index: number;
}

const ProcessStep = ({ icon, title, description, index }: ProcessStepProps) => (
  <motion.div
    className="relative bg-white rounded-2xl p-8 border shadow-sm overflow-hidden h-full"
    variants={itemVariants}
  >
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
  </motion.div>
);

// --- Page Component ---
export default function DesignProject() {
  // --- Page-specific Content ---

  const processSteps = [
    {
      icon: <Lightbulb />,
      title: 'Брифинг и Техническое Задание',
      description:
        'Вместе мы определяем ваши цели, стиль и бюджет. Вы получаете четкое ТЗ — основу будущего интерьера, где учтена каждая деталь.',
    },
    {
      icon: <Ruler />,
      title: 'Планировка и концепция',
      description:
        'Разрабатываем 2-3 варианта планировочных решений. Вы выбираете лучшее, а мы создаем концепцию, которая делает пространство логичным и удобным.',
    },
    {
      icon: <Layers />,
      title: '3D-визуализация',
      description:
        'Вы увидите свой будущий интерьер на фотореалистичных изображениях. Это ваша гарантия, что результат на 100% совпадет с ожиданиями.',
    },
    {
      icon: <FileText />,
      title: 'Рабочая документация',
      description:
        'Готовим полный альбом чертежей для строителей. Это исключает ошибки, переделки и экономит ваши деньги на этапе ремонта.',
    },
  ];

  const beforeAfter = [
    {
      title: 'Без проекта (ремонт наугад)',
      points: [
        'Перерасход бюджета на 20-40% из-за переделок',
        'Сроки ремонта непредсказуемы и всегда затягиваются',
        'Результат не совпадает с картинкой в голове',
        'Неудобная планировка и "мертвые зоны"',
      ],
      iconColor: 'text-red-500 bg-red-500/10',
      Icon: XCircle,
    },
    {
      title: 'С дизайн-проектом',
      points: [
        'Точный бюджет, экономия на материалах до 30%',
        'Четкий план и соблюдение сроков строителями',
        'Вы на 100% знаете, что получите в финале',
        'Каждый сантиметр площади работает на вас',
      ],
      iconColor: 'text-green-500 bg-green-500/10',
      Icon: CheckCircle,
    },
  ];

  const testimonialsData = [
    {
      name: 'Ольга и Максим',
      image:
        'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=300&auto=format&fit=crop',
      message:
        'Дизайн-проект сэкономил нам кучу денег и нервов. Строители работали строго по чертежам, и мы избежали всех "сюрпризов". Квартира получилась именно такой, как мы мечтали!',
      rating: 5,
    },
    {
      name: 'Андрей В.',
      image:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=300&auto=format&fit=crop',
      message:
        'Никогда бы не подумал, что моя маленькая студия может быть такой функциональной. Дизайнеры предложили гениальное решение с зонированием. Теперь у меня есть и гостиная, и спальня.',
      rating: 5,
    },
    {
      name: 'Екатерина Ф.',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
      message:
        'Я увидела квартиру в 3D и сразу влюбилась! Это так круто — вносить правки еще до того, как купили хоть один гвоздь. Результат превзошел все ожидания.',
      rating: 5,
    },
  ];

  const faqData = [
    {
      question: 'Сколько стоит дизайн-проект?',
      answer:
        'Стоимость зависит от площади объекта и состава проекта (от базового до полного с авторским надзором). Но главный принцип — проект должен экономить деньги, а не быть статьей расходов. В среднем, он окупается 2-3 раза только за счет грамотного подбора материалов и отсутствия переделок.',
    },
    {
      question: 'Зачем нужен проект, если я и так знаю, чего хочу?',
      answer:
        'Знать, чего вы хотите — это прекрасно! Наша задача — превратить ваше "хочу" в четкий технический план для строителей. Мы продумаем эргономику, освещение, расположение розеток и все те детали, которые и создают настоящий комфорт. Проект — это мост между идеей и ее безупречной реализацией.',
    },
    {
      question: 'Как долго делается проект?',
      answer:
        'В среднем, разработка полного дизайн-проекта для квартиры 50-80 м² занимает от 25 до 40 рабочих дней. Мы всегда закрепляем сроки в договоре. Помните: один месяц планирования экономит 3-4 месяца хаоса на стройке.',
    },
    {
      question: 'Вы помогаете с подбором мебели и материалов?',
      answer:
        'Да, это часть полного дизайн-проекта. Мы не просто рисуем красивые картинки, а создаем ведомость всех чистовых материалов, мебели, сантехники и освещения с артикулами и контактами поставщиков. Это избавляет вас от мучительных походов по магазинам.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-text-primary">
      {/* --- Hero Section --- */}
      <motion.section
        className="bg-white pt-20 pb-16 lg:pt-32 lg:pb-24"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl lg:text-6xl font-extrabold mb-6 !leading-tight tracking-tighter"
              variants={itemVariants}
            >
              Создайте интерьер, в котором хочется жить.
              <br />
              <span className="text-accent-orange">Еще до начала ремонта</span>
            </motion.h1>
            <motion.p
              className="text-lg lg:text-xl mb-10 text-text-secondary max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Профессиональный дизайн-проект интерьера в Санкт-Петербурге,
              который экономит ваши деньги, время и гарантирует результат.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Button
                size="lg"
                className="bg-accent-orange text-white hover:bg-orange-600 px-8 h-12 text-base font-bold"
              >
                Получить консультацию
              </Button>
            </motion.div>
            <motion.p
              className="mt-4 text-sm text-text-secondary"
              variants={itemVariants}
            >
              Это бесплатно и ни к чему не обязывает
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* --- Social Proof Section --- */}
      <motion.section
        className="py-16 bg-neutral-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-8 text-center max-w-5xl mx-auto">
            <motion.div variants={itemVariants}>
              <div className="text-4xl lg:text-5xl font-extrabold text-accent-orange">
                <AnimatedCounter value={400} />+
              </div>
              <p className="text-text-secondary mt-2">проектов в портфолио</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl lg:text-5xl font-extrabold text-accent-orange">
                до <AnimatedCounter value={30} />%
              </div>
              <p className="text-text-secondary mt-2">экономия бюджета на ремонте</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl lg:text-5xl font-extrabold text-accent-orange">
                <AnimatedCounter value={25} />
              </div>
              <p className="text-text-secondary mt-2">дней от идеи до альбома</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- Benefits Comparison --- */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Планирование vs. Случайность
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {beforeAfter.map((comparison, index) => (
              <motion.div
                key={index}
                className="bg-neutral-50 rounded-2xl p-8 border"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardSlideIn(index === 0 ? 'left' : 'right')}
              >
                <h3 className="text-2xl font-bold text-center text-text-primary mb-6">
                  {comparison.title}
                </h3>
                <ul className="space-y-4">
                  {comparison.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-4">
                      <div
                        className={cn(
                          'w-7 h-7 flex-shrink-0 mt-0.5 rounded-lg flex items-center justify-center',
                          comparison.iconColor
                        )}
                      >
                        <comparison.Icon className="w-5 h-5" />
                      </div>
                      <span className="text-text-secondary">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- How It Works --- */}
      <motion.section
        id="process"
        className="py-20 bg-neutral-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Как рождается ваш идеальный интерьер
            </h2>
            <p className="text-lg text-text-secondary mt-3 max-w-3xl mx-auto">
              Четыре прозрачных этапа от вашей мечты до готовых чертежей для
              строителей.
            </p>
          </motion.div>
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
      </motion.section>

      {/* --- Benefits Section --- */}
      <motion.section
        id="benefits"
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Проект — это ваша выгода и спокойствие
            </h2>
            <p className="text-lg text-text-secondary mt-4 max-w-3xl mx-auto">
              Дизайн-проект — это не дополнительные расходы, а самый умный
              инструмент экономии на ремонте.
            </p>
          </motion.div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                Icon: Save,
                title: 'Экономия бюджета',
                description:
                  'Просчитанные объемы материалов и точные чертежи исключают ошибки и переделки, экономя до 30% стоимости ремонта.',
              },
              {
                Icon: CheckCircle,
                title: 'Гарантия результата',
                description:
                  'Благодаря 3D-визуализации вы видите финальный результат еще до начала работ и можете быть уверены, что он вам понравится.',
              },
              {
                Icon: Eye,
                title: 'Авторский надзор',
                description:
                  'Мы проследим, чтобы строители реализовали проект в точности по чертежам, освобождая вас от контроля за стройкой.',
              },
              {
                Icon: Palette,
                title: 'Функциональность и эргономика',
                description:
                  'Мы создаем не просто красивую картинку, а продуманное пространство, где каждый метр работает на ваш комфорт.',
              },
            ].map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={<benefit.Icon />}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Reviews Section --- */}
      <motion.section
        id="reviews"
        className="py-20 bg-neutral-50 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <Carousel>
            <TestimonialsHeader />
            <CarouselContent className="-ml-4">
              {testimonialsData.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full">
                    <Card className="flex flex-col h-full bg-white shadow-sm border rounded-2xl">
                      <CardContent className="p-6 flex-grow">
                        <StarRating rating={testimonial.rating} />
                        <p className="text-text-secondary mt-4">
                          "{testimonial.message}"
                        </p>
                      </CardContent>
                      <CardHeader className="pt-0 p-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-11 h-11 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-text-primary">
                              {testimonial.name}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </motion.section>

      {/* --- FAQ Section --- */}
      <motion.section
        id="faq"
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Часто задаваемые вопросы
            </h2>
            <p className="text-lg text-text-secondary mt-4">
              Отвечаем на то, что волнует вас больше всего.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData.map((item, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={index}
                  className="border bg-neutral-50 rounded-xl"
                >
                  <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline p-6 text-text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-text-secondary text-base px-6 pb-6 pt-0 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Final CTA Section --- */}
      <motion.section
        className="py-20 bg-neutral-800 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Готовы увидеть ваш будущий интерьер?
            </h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto mb-8">
              Оставьте заявку на бесплатную консультацию, и мы расскажем, как
              создать дизайн-проект, который превзойдет ваши ожидания.
            </p>
          </motion.div>
          <motion.div className="max-w-xl mx-auto" variants={itemVariants}>
            <LeadForm
              title="Записаться на консультацию"
              description="Это займет 1 минуту и ни к чему не обязывает"
              serviceType="Дизайн-проект"
              theme="dark"
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
