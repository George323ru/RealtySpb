import ConsultationForm from "@/components/consultation-form";

type UserIntent = 'buy' | 'sell' | 'rent' | 'service';

interface FinalCTASectionProps {
  userIntent: UserIntent;
  className?: string;
}

// Функция для получения контента финального CTA
const getFinalCTAContent = (userIntent: UserIntent) => {
  const content = {
    'buy': {
      title: 'Найдите идеальную квартиру за 15 минут',
      description: 'Получите персональную подборку объектов и план покупки с экономией до 500 000 рублей'
    },
    'sell': {
      title: 'Узнайте реальную стоимость вашей недвижимости',
      description: 'Получите профессиональную оценку и план продажи с увеличением цены на 15-20%'
    },
    'rent': {
      title: 'Рассчитайте доходность вашей аренды',
      description: 'Получите анализ рынка и план сдачи с доходностью выше среднерыночной'
    },
    'service': {
      title: 'Получите план решения вашей задачи',
      description: 'Узнайте стоимость работ и получите персональный план реализации проекта'
    }
  };
  
  return content[userIntent] || content['buy'];
};

export default function FinalCTASection({ userIntent, className }: FinalCTASectionProps) {
  const ctaContent = getFinalCTAContent(userIntent);

  return (
    <section className={`py-16 bg-gradient-to-r from-accent-orange to-orange-600 conversion-section ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-black">
            {ctaContent.title} — бесплатно
          </h2>
          <p className="text-xl mb-8 text-black">
            {ctaContent.description}
          </p>
          
          <div className="max-w-2xl mx-auto">
            <ConsultationForm />
            
            {/* Альтернативный, низкопороговый CTA */}
            <div className="mt-6 text-center">
              <div className="text-white/80 text-sm mb-3">или</div>
              <button 
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
                onClick={() => {
                  // TODO: Реализовать скачивание файла
                  alert('Скачивание файла будет реализовано позже');
                }}
              >
                {userIntent === 'buy' ? '📋 Скачать чек-лист проверки квартиры' :
                 userIntent === 'sell' ? '📊 Скачать гид по продаже недвижимости' :
                 userIntent === 'rent' ? '💰 Скачать калькулятор доходности аренды' :
                 '🎯 Скачать план решения задач с недвижимостью'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 