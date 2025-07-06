import React, { useEffect } from "react";
import { motion, useAnimation, useInView, animate } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import { CheckCircle, Camera, Paintbrush, Wrench, TrendingUp, Clock, Euro, Star, Users, Briefcase, ArrowRight, Award, BarChart, ShieldCheck, MessageSquare, Eye, ClipboardList, Megaphone, ArrowLeft, XCircle, FileText, Handshake, Building } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel } from "../../components/ui/carousel";
import { cn } from "../../lib/utils";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
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

const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const TestimonialsHeader = () => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="max-w-xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
          Говорят наши клиенты
        </h2>
        <p className="text-lg text-text-secondary mt-2">
          Реальные истории, которые доказывают ценность нашей работы.
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

export default function PreSalePreparation() {
  const services = [
    {
      icon: <Camera className="w-8 h-8 text-blue-500" />,
      title: "Профессиональная фотосъемка",
      description: "Качественные фото для привлекательных объявлений",
      price: "от 15 000 ₽"
    },
    {
      icon: <Paintbrush className="w-8 h-8 text-green-500" />,
      title: "Косметический ремонт",
      description: "Устранение дефектов и освежение интерьера",
      price: "от 2 500 ₽/м²"
    },
    {
      icon: <Wrench className="w-8 h-8 text-purple-500" />,
      title: "Мелкий ремонт",
      description: "Устранение мелких недостатков и поломок",
      price: "от 5 000 ₽"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: "Стейджинг",
      description: "Расстановка мебели и декора для показов",
      price: "от 25 000 ₽"
    }
  ];

  const benefits = [
    "Увеличение стоимости недвижимости на 15-20%",
    "Сокращение времени продажи в 2-3 раза",
    "Привлечение большего количества покупателей",
    "Улучшение первого впечатления от объекта",
    "Профессиональная презентация недвижимости",
    "Выделение среди конкурентов на рынке"
  ];

  const processSteps = [
    {
      icon: <FileText />,
      title: 'Анализ и стратегия',
      description:
        'Вы получаете ясный план действий и прозрачную смету. Мы находим скрытый потенциал вашего объекта, чтобы выжать максимум из продажи.',
    },
    {
      icon: <Paintbrush />,
      title: 'Преображение объекта',
      description:
        'Мы берем всю рутину на себя. Ваша недвижимость становится идеальной для покупателя, пока вы занимаетесь своими делами.',
    },
    {
      icon: <Camera />,
      title: 'Профессиональная упаковка',
      description:
        'Создаем "вау-эффект" с помощью фото, видео и 3D-туров, которые выделяют вашу квартиру среди сотен других и привлекают целевых покупателей.',
    },
    {
      icon: <Handshake />,
      title: 'Продажа и переговоры',
      description:
        'Организуем поток покупателей, проводим показы и ведем переговоры от вашего имени, профессионально отстаивая цену и доводя сделку до успешного финала.',
    },
  ];

  const beforeAfter = [
    {
      title: 'Без подготовки',
      points: [
        'Среднее время продажи: 6-8 месяцев',
        'Постоянный торг до 15% от стартовой цены',
        "Мало звонков и 'пустые' просмотры",
        "Объявление 'приедается' и теряется в потоке",
      ],
      iconColor: 'text-red-500 bg-red-500/10',
      Icon: XCircle,
    },
    {
      title: 'С нашей подготовкой',
      points: [
        'Среднее время продажи: 1-2 месяца',
        'Продажа по максимальной цене, торг минимален',
        'Высокий спрос и очередь из реальных покупателей',
        'Ваш объект — самый привлекательный в районе',
      ],
      iconColor: 'text-green-500 bg-green-500/10',
      Icon: CheckCircle,
    },
  ];

  const testimonials = [
    {
      quote: "Благодаря подготовке, моя квартира была продана на 2 недели быстрее и на 1.2 млн рублей дороже, чем я ожидал. Невероятный результат!",
      author: "Алексей Петров",
      property: "2-комн. квартира на Комендантском",
      rating: 5
    },
    {
      quote: "Никогда бы не подумала, что небольшой косметический ремонт и правильная расстановка мебели могут так преобразить квартиру. Спасибо команде!",
      author: "Елена Сидорова",
      property: "Студия в Девяткино",
      rating: 5
    },
    {
      name: 'Константин Р.',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop',
      message:
        'Думал, это только для дорогих квартир. Но моя однушка в спальном районе после подготовки ушла на 15% дороже рынка. Инвестиция, которая точно того стоила.',
      rating: 5,
    },
    {
      name: 'Анна К.',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
      message:
        'Квартира не продавалась полгода, уже отчаялась. После вашей подготовки ушла за 3 недели, да еще и на 800 тыс. дороже, чем я просила изначально! Просто в шоке, спасибо!',
      rating: 5,
    },
    {
      name: 'Виктор П.',
      image:
        'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=300&auto=format&fit=crop',
      message:
        'Самое ценное — с меня сняли всю головную боль. Не пришлось самому искать ремонтников, клининг, фотографа. Все сделали под ключ. Экономия времени и нервов колоссальная.',
      rating: 5,
    },
    {
      name: 'Мария С.',
      image:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
      message:
        'Сделали легкий косметический ремонт и красивый декор. Покупатели на просмотре сказали: "Как уютно, хотим здесь жить!". Продали первому же клиенту.',
      rating: 5,
    },
  ];

  const faqData = [
    {
      question: 'Зачем нужна подготовка? Не проще ли просто снизить цену?',
      answer:
        'Снижение цены привлекает "охотников за скидками", а качественная предпродажная подготовка — серьезных покупателей, готовых платить больше. Инвестируя в хоумстейджинг и косметический ремонт, вы увеличиваете конечную стоимость квартиры на 10-20%. Мы создаем "вау-эффект", чтобы покупатель влюбился в вашу квартиру, а не искал поводы для торга.',
    },
    {
      question: "У меня нет времени на ремонт. Вы все делаете 'под ключ'?",
      answer:
        'Именно! В этом и заключается наша услуга. Мы полностью забираем на себя всю рутину: от планирования и закупки материалов до контроля рабочих и финального клининга. Ваше участие минимально — вы просто принимаете готовый результат, экономя время и нервы для более важных дел.',
    },
    {
      question: 'Сколько это стоит и когда я верну свои вложения?',
      answer:
        'Стоимость предпродажной подготовки всегда индивидуальна. Мы начинаем с прозрачной сметы, где каждый рубль обоснован. В 95% случаев вложения окупаются многократно прямо на сделке за счет увеличения цены. В среднем, каждый вложенный рубль в подготовку приносит 5-7 рублей дополнительной прибыли.',
    },
    {
      question: 'Что если у меня совсем небольшой бюджет?',
      answer:
        'Большой бюджет не всегда нужен. Иногда чудеса творят генеральная уборка, правильная перестановка мебели (это и есть хоумстейджинг), и новый текстиль. Мы — эксперты в поиске решений с максимальной отдачей. Мы найдем "болевые точки" вашей квартиры и предложим план, который поможет продать квартиру быстро и выгодно даже с ограниченными средствами.',
    },
  ];

  // Data for the "What's Included" block
  const includedServicesData = {
    title: "Что включает подготовка",
    description: "Комплекс услуг для максимального повышения привлекательности объекта",
    services: [
      {
        icon: <Camera className="w-8 h-8 text-blue-500" />,
        title: "Профессиональная фотосъемка",
        description: "Качественные фото для привлекательных объявлений",
        price: "от 15 000 ₽"
      },
      {
        icon: <Paintbrush className="w-8 h-8 text-green-500" />,
        title: "Косметический ремонт",
        description: "Устранение дефектов и освежение интерьера",
        price: "от 2 500 ₽/м²"
      },
      {
        icon: <Wrench className="w-8 h-8 text-purple-500" />,
        title: "Мелкий ремонт",
        description: "Устранение мелких недостатков и поломок",
        price: "от 5 000 ₽"
      },
      {
        icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
        title: "Стейджинг",
        description: "Расстановка мебели и декора для показов",
        price: "от 25 000 ₽"
      }
    ]
  };

  // 9. Messenger-style Reviews Data
  const testimonialsData = [
    {
      name: 'Константин Р.',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop',
      message:
        'Думал, это только для дорогих квартир. Но моя однушка в спальном районе после подготовки ушла на 15% дороже рынка. Инвестиция, которая точно того стоила.',
      rating: 5,
    },
    {
      name: 'Анна К.',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
      message:
        'Квартира не продавалась полгода, уже отчаялась. После вашей подготовки ушла за 3 недели, да еще и на 800 тыс. дороже, чем я просила изначально! Просто в шоке, спасибо!',
      rating: 5,
    },
    {
      name: 'Виктор П.',
      image:
        'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=300&auto=format&fit=crop',
      message:
        'Самое ценное — с меня сняли всю головную боль. Не пришлось самому искать ремонтников, клининг, фотографа. Все сделали под ключ. Экономия времени и нервов колоссальная.',
      rating: 5,
    },
    {
      name: 'Мария С.',
      image:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
      message:
        'Сделали легкий косметический ремонт и красивый декор. Покупатели на просмотре сказали: "Как уютно, хотим здесь жить!". Продали первому же клиенту.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-text-primary">
      {/* Hero Section */}
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
              Продайте квартиру <br />
              <span className="text-accent-orange">дороже и быстрее</span>
            </motion.h1>
            <motion.p 
              className="text-lg lg:text-xl mb-10 text-text-secondary max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Профессиональная предпродажная подготовка и хоумстейджинг в
              Санкт-Петербурге. Увеличиваем итоговую стоимость объекта в
              среднем на 15-20%.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Button
                size="lg"
                className="bg-accent-orange text-white hover:bg-orange-600 px-8 h-12 text-base font-bold"
              >
                Рассчитать стоимость
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

      {/* Social Proof Section */}
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
                +<AnimatedCounter value={18} />%
              </div>
              <p className="text-text-secondary mt-2">
                среднее увеличение цены
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl lg:text-5xl font-extrabold text-accent-orange">
                в <AnimatedCounter value={2} /> раза
              </div>
              <p className="text-text-secondary mt-2">
                среднее ускорение продажи
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl lg:text-5xl font-extrabold text-accent-orange">
                <AnimatedCounter value={200} />+
              </div>
              <p className="text-text-secondary mt-2">
                счастливых клиентов
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Comparison */}
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
              Разница, которую видят покупатели
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

      {/* How It Works */}
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
              Как мы создаем ценность
            </h2>
            <p className="text-lg text-text-secondary mt-3 max-w-3xl mx-auto">
              Четыре этапа, которые превращают вашу квартиру в востребованный
              актив на рынке.
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

      {/* Benefits Section */}
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
              Почему это работает
            </h2>
            <p className="text-lg text-text-secondary mt-4 max-w-3xl mx-auto">
              Подготовка — это не затраты, а самая выгодная инвестиция в вашу
              недвижимость.
            </p>
          </motion.div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                Icon: BarChart,
                title: 'Рост цены на 15-20%',
                description:
                  'Профессионально подготовленный объект воспринимается как более дорогой и статусный, что напрямую влияет на финальную цену продажи.',
              },
              {
                Icon: Clock,
                title: 'Продажа в 2-3 раза быстрее',
                description:
                  'Привлекательные фото и «вау-эффект» на показах генерируют больше звонков и предложений, сокращая срок экспозиции.',
              },
              {
                Icon: Eye,
                title: 'Профессиональная презентация',
                description:
                  'Мы знаем, как скрыть мелкие недостатки и выгодно подчеркнуть все достоинства вашего объекта, чтобы он выглядел безупречно.',
              },
              {
                Icon: Star,
                title: 'Эмоциональная привязка',
                description:
                  'С помощью хоумстейджинга мы создаем интерьер, в котором хочется жить. Покупатель влюбляется в квартиру, а не ищет поводы для торга.',
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

      {/* Reviews Section */}
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

      {/* FAQ Section */}
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
              Остались вопросы?
            </h2>
            <p className="text-lg text-text-secondary mt-4">
              Здесь самые частые сомнения наших клиентов. Возможно, среди них
              есть и ваше.
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

      {/* Final CTA Section */}
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
              Увеличьте стоимость своей недвижимости
            </h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto mb-8">
              Оставьте заявку, и мы бесплатно рассчитаем потенциал роста цены
              вашей квартиры после подготовки.
            </p>
          </motion.div>
          <motion.div className="max-w-xl mx-auto" variants={itemVariants}>
            <LeadForm 
              title="Получить бесплатный расчет"
              description="Это займет 1 минуту и ни к чему не обязывает"
              serviceType="Предпродажная подготовка"
              theme="dark"
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
