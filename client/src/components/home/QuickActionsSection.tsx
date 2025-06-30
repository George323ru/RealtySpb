import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home as HomeIcon, 
  DollarSign, 
  Key, 
  Wrench,
  ArrowRight
} from "lucide-react";

type UserIntent = 'buy' | 'sell' | 'rent' | 'service';

interface QuickActionsSectionProps {
  userIntent: UserIntent;
  onUserIntentChange: (intent: UserIntent) => void;
  className?: string;
}

const quickActions = [
  {
    title: "Хочу купить",
    description: "Найдем идеальную недвижимость с экономией до 500 000 рублей",
    features: ["Новостройки с льготами", "Проверенный вторичный рынок", "Доходные инвестиции"],
    icon: HomeIcon,
    color: "from-blue-50 to-blue-100 border-blue-200",
    iconBg: "bg-blue-500",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
    link: "/buy"
  },
  {
    title: "Хочу продать",
    description: "Продаем на 15-20% дороже рынка благодаря профессиональной подготовке",
    features: ["Срочная продажа до 2 недель", "Продажа с подготовкой +20%", "Элитная недвижимость"],
    icon: DollarSign,
    color: "from-green-50 to-green-100 border-green-200",
    iconBg: "bg-green-500",
    buttonColor: "bg-green-500 hover:bg-green-600",
    link: "/sell"
  },
  {
    title: "Хочу сдать",
    description: "Гарантируем заполняемость 95% и стабильный доход без ваших забот",
    features: ["Краткосрочная аренда +40%", "Долгосрочная аренда", "Коммерческая аренда"],
    icon: Key,
    color: "from-purple-50 to-purple-100 border-purple-200",
    iconBg: "bg-purple-500",
    buttonColor: "bg-purple-500 hover:bg-purple-600",
    link: "/rent"
  },
  {
    title: "Хочу заказать услугу",
    description: "Решаем любые задачи с недвижимостью под ключ с гарантией качества",
    features: ["Ремонт и дизайн", "Юридическое сопровождение", "Проектирование"],
    icon: Wrench,
    color: "from-orange-50 to-orange-100 border-orange-200",
    iconBg: "bg-gray-700",
    buttonColor: "bg-accent-orange hover:bg-orange-600",
    link: "/services"
  }
];

const actionButtonProps = {
  buy: { text: "Начать поиск", link: "/buy" },
  sell: { text: "Выбрать способ продажи", link: "/sell" },
  rent: { text: "Выбрать тип аренды", link: "/rent" },
  service: { text: "Смотреть услуги", link: "/services" },
};

export default function QuickActionsSection({ userIntent, onUserIntentChange, className }: QuickActionsSectionProps) {
  const currentButtonProps = actionButtonProps[userIntent];

  return (
    <section className={`py-16 bg-white ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">Что вы хотите сделать?</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">Выберите подходящий вариант и мы поможем решить вашу задачу быстро и профессионально</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            // Определяем intent для каждой карточки
            const intent =
              action.title === "Хочу купить" ? 'buy' :
              action.title === "Хочу продать" ? 'sell' :
              action.title === "Хочу сдать" ? 'rent' : 'service';
            const isActive = userIntent === intent;
            
            return (
              <Card
                key={index}
                className={`group bg-gradient-to-br ${action.color} hover:shadow-2xl shadow-md transition-all duration-300 cursor-pointer h-full border ${isActive ? 'ring-4 ring-accent-orange border-accent-orange' : ''}`}
                onClick={() => onUserIntentChange(intent)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
              >
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className={`w-16 h-16 ${action.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="text-white text-2xl w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{action.title}</h3>
                  <p className="text-text-secondary mb-6 flex-1">{action.description}</p>
                  <div className="text-sm text-text-secondary space-y-1 mt-auto min-h-[72px] flex flex-col justify-center">
                    {action.features.map((feature, idx) => (
                      <div key={idx}>• {feature}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link href={currentButtonProps.link}>
            <Button size="lg" className="bg-accent-orange text-white px-10 py-6 rounded-lg font-semibold hover:bg-orange-600 text-lg shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:scale-105">
              {currentButtonProps.text}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 