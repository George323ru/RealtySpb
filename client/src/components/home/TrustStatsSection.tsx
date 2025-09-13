import { Link } from "wouter";

type UserIntent = 'buy' | 'sell' | 'rent' | 'service';

interface TrustStatsSectionProps {
  userIntent: UserIntent;
  className?: string;
}

export default function TrustStatsSection({ userIntent, className }: TrustStatsSectionProps) {
  return (
    <section className={`py-20 lg:py-24 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className={`text-4xl font-bold mb-2 text-foreground`}>
              15+ лет
            </div>
            <div className="text-muted-foreground">на рынке недвижимости</div>
            {userIntent === 'buy' && (
              <div className="text-xs text-accent-gray mt-1 font-medium">
                ✓ Гарантия надежности для покупателей
              </div>
            )}
          </div>
          <div>
            <div className={`text-4xl font-bold mb-2 text-foreground`}>
              1000+ клиентов
            </div>
            <div className="text-muted-foreground">доверили нам сделки</div>
            {userIntent === 'sell' && (
              <div className="text-xs text-accent-gray mt-1 font-medium">
                ✓ Продаем на 15-20% дороже рынка
              </div>
            )}
          </div>
          <div>
            <div className={`text-4xl font-bold mb-2 text-foreground`}>
              50+ экспертов
            </div>
            <div className="text-muted-foreground">в команде</div>
            {userIntent === 'service' && (
              <div className="text-xs text-accent-gray mt-1 font-medium">
                ✓ Решаем любые задачи под ключ
              </div>
            )}
          </div>
          <div>
            <div className={`text-4xl font-bold mb-2 text-foreground`}>
              24/7
            </div>
            <div className="text-muted-foreground">поддержка клиентов</div>
            <div className="text-xs text-accent-orange mt-1 font-medium">
              ✓ Всегда на связи
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-6 mt-8">
          {/* Логотипы банков-партнеров (заглушки) */}
          <div className="w-24 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Сбер</div>
          <div className="w-24 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">ВТБ</div>
          <div className="w-24 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Альфа</div>
        </div>
        
        {/* Ссылка на отзывы */}
        <div className="text-center mt-6">
          <Link href="/reviews" className="text-accent-orange hover:text-orange-600 font-medium text-sm transition-colors underline">
            Читать отзывы наших клиентов →
          </Link>
        </div>
      </div>
    </section>
  );
} 