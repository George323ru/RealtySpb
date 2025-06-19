import MortgageCalculator from "@/components/MortgageCalculator";
import ConsultationForm from "@/components/consultation-form";

export default function Calculator() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 py-20">
        <div className="absolute inset-0 bg-card bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-text-primary">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Калькулятор{" "}
              <span className="text-yandex-yellow">ипотеки</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90">
              Рассчитайте точный размер ежемесячного платежа и переплаты по ипотечному кредиту
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-yandex-yellow mb-2">6-20%</div>
                <div className="text-sm">Диапазон ставок</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-yandex-yellow mb-2">5-30</div>
                <div className="text-sm">Лет срок кредита</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-yandex-yellow mb-2">10-90%</div>
                <div className="text-sm">Первоначальный взнос</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <MortgageCalculator compact={false} />
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Как работает калькулятор
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Наш калькулятор использует аннуитетную формулу расчета для максимально точного результата
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Укажите стоимость</h3>
                <p className="text-text-secondary">Введите полную стоимость недвижимости</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Первоначальный взнос</h3>
                <p className="text-text-secondary">Определите размер первоначального взноса</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Срок и ставка</h3>
                <p className="text-text-secondary">Выберите срок кредита и процентную ставку</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">4</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Получите результат</h3>
                <p className="text-text-secondary">Узнайте точный размер ежемесячного платежа</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Полезные советы
              </h2>
              <p className="text-lg text-text-secondary">
                Рекомендации для выгодного оформления ипотеки
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-text-primary mb-3">Первоначальный взнос</h3>
                <p className="text-text-secondary mb-4">
                  Чем больше первоначальный взнос, тем меньше будет переплата по кредиту. 
                  Рекомендуемый размер — от 20% стоимости жилья.
                </p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• 10% — минимальный взнос</li>
                  <li>• 20% — оптимальный размер</li>
                  <li>• 30%+ — максимальная выгода</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-bold text-text-primary mb-3">Срок кредита</h3>
                <p className="text-text-secondary mb-4">
                  Более длительный срок снижает ежемесячный платеж, но увеличивает общую переплату. 
                  Найдите баланс между комфортным платежом и экономией.
                </p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• 10-15 лет — минимальная переплата</li>
                  <li>• 15-20 лет — оптимальный срок</li>
                  <li>• 25-30 лет — минимальный платеж</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-xl font-bold text-text-primary mb-3">Процентная ставка</h3>
                <p className="text-text-secondary mb-4">
                  Ставка зависит от банка, вашей кредитной истории и дохода. 
                  Сравните предложения разных банков для выбора лучших условий.
                </p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Зарплатные клиенты — льготные ставки</li>
                  <li>• Госпрограммы — от 6%</li>
                  <li>• Стандартные условия — 8-15%</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold text-text-primary mb-3">Досрочное погашение</h3>
                <p className="text-text-secondary mb-4">
                  Досрочные платежи значительно сокращают переплату. 
                  Даже небольшие дополнительные взносы дают существенный эффект.
                </p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Уменьшение срока кредита</li>
                  <li>• Снижение ежемесячного платежа</li>
                  <li>• Экономия на процентах</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yandex-yellow to-orange-400">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-yandex-black mb-6">
              Нужна помощь с оформлением ипотеки?
            </h2>
            <p className="text-xl text-yandex-black mb-8 opacity-90">
              Наши специалисты помогут подобрать банк с лучшими условиями и проведут сделку под ключ
            </p>
            
            <ConsultationForm defaultService="Консультация по ипотеке" />
          </div>
        </div>
      </section>
    </div>
  );
}