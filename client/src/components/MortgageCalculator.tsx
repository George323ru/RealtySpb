import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, TrendingUp, Calendar } from "lucide-react";

interface MortgageCalculatorProps {
  compact?: boolean;
  defaultPrice?: number;
}

export default function MortgageCalculator({ compact = false, defaultPrice = 5000000 }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(defaultPrice);
  const [downPayment, setDownPayment] = useState(Math.round(defaultPrice * 0.2));
  const [term, setTerm] = useState(20);
  const [rate, setRate] = useState(12);
  
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [overpayment, setOverpayment] = useState(0);
  
  const downPaymentPercent = Math.round((downPayment / price) * 100);
  const loanAmount = price - downPayment;

  useEffect(() => {
    if (loanAmount > 0 && rate > 0 && term > 0) {
      const monthlyRate = rate / 100 / 12;
      const totalMonths = term * 12;
      
      const monthly = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                     (Math.pow(1 + monthlyRate, totalMonths) - 1);
      
      const total = monthly * totalMonths;
      const over = total - loanAmount;
      
      setMonthlyPayment(Math.round(monthly));
      setTotalAmount(Math.round(total));
      setOverpayment(Math.round(over));
    }
  }, [price, downPayment, term, rate, loanAmount]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const handlePriceChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, '')) || 0;
    setPrice(numValue);
    if (downPayment > numValue) {
      setDownPayment(Math.round(numValue * 0.2));
    }
  };

  const handleDownPaymentChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, '')) || 0;
    if (numValue <= price) {
      setDownPayment(numValue);
    }
  };

  if (compact) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="w-5 h-5 text-yandex-yellow" />
            Калькулятор ипотеки
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Стоимость жилья</Label>
            <Input
              value={formatNumber(price)}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="mt-1"
              placeholder="5 000 000"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Первоначальный взнос</Label>
            <Input
              value={formatNumber(downPayment)}
              onChange={(e) => handleDownPaymentChange(e.target.value)}
              className="mt-1"
              placeholder="1 000 000"
            />
            <div className="text-xs text-text-secondary mt-1">{downPaymentPercent}% от стоимости</div>
          </div>

          <div>
            <Label className="text-sm font-medium">Процентная ставка: {rate}%</Label>
            <Slider
              value={[rate]}
              onValueChange={(value) => setRate(value[0])}
              min={3}
              max={25}
              step={0.1}
              className="mt-2"
            />
            <div className="text-xs text-text-secondary mt-1">Среднерыночная ставка: 12-18%</div>
          </div>

          <div>
            <Label className="text-sm font-medium">Срок кредита: {term} лет</Label>
            <Slider
              value={[term]}
              onValueChange={(value) => setTerm(value[0])}
              min={5}
              max={30}
              step={1}
              className="mt-2"
            />
          </div>

          <div className="bg-neutral-50 rounded-lg p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Ежемесячный платеж</span>
              <span className="font-bold text-lg">{formatNumber(monthlyPayment)} ₽</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Переплата</span>
              <span className="text-sm font-medium text-red-600">{formatNumber(overpayment)} ₽</span>
            </div>
            <div className="text-xs text-orange-600 mt-2 pt-2 border-t border-neutral-200">
              ⚠️ Предварительный расчет.<br />
              Точные условия уточняйте у своего менеджера.
            </div>
            
            <Button className="w-full mt-3 bg-accent-orange hover:bg-accent-orange/90 text-white">
              Получить консультацию
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Calculator className="w-8 h-8 text-yandex-yellow" />
          Калькулятор ипотеки
        </CardTitle>
        <p className="text-text-secondary">
          Рассчитайте ежемесячный платеж и переплату по ипотечному кредиту
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Параметры кредита */}
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Стоимость недвижимости</Label>
              <div className="mt-2">
                <Input
                  value={formatNumber(price)}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="text-lg h-12"
                  placeholder="5 000 000"
                />
              </div>
              <Slider
                value={[price]}
                onValueChange={(value) => setPrice(value[0])}
                min={1000000}
                max={50000000}
                step={100000}
                className="mt-3"
              />
              <div className="flex justify-between text-sm text-text-secondary mt-1">
                <span>1 млн ₽</span>
                <span>50 млн ₽</span>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">
                Первоначальный взнос — {downPaymentPercent}%
              </Label>
              <div className="mt-2">
                <Input
                  value={formatNumber(downPayment)}
                  onChange={(e) => handleDownPaymentChange(e.target.value)}
                  className="text-lg h-12"
                  placeholder="1 000 000"
                />
              </div>
              <Slider
                value={[downPayment]}
                onValueChange={(value) => setDownPayment(value[0])}
                min={Math.round(price * 0.1)}
                max={Math.round(price * 0.9)}
                step={10000}
                className="mt-3"
              />
              <div className="flex justify-between text-sm text-text-secondary mt-1">
                <span>10% ({formatNumber(Math.round(price * 0.1))} ₽)</span>
                <span>90% ({formatNumber(Math.round(price * 0.9))} ₽)</span>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Процентная ставка — {rate}%</Label>
              <Slider
                value={[rate]}
                onValueChange={(value) => setRate(value[0])}
                min={3}
                max={25}
                step={0.1}
                className="mt-3"
              />
              <div className="flex justify-between text-sm text-text-secondary mt-1">
                <span>3%</span>
                <span>25%</span>
              </div>
              <div className="text-sm text-blue-600 mt-2">
                Среднерыночная ставка: 12-18%
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Срок кредита — {term} лет</Label>
              <Slider
                value={[term]}
                onValueChange={(value) => setTerm(value[0])}
                min={5}
                max={30}
                step={1}
                className="mt-3"
              />
              <div className="flex justify-between text-sm text-text-secondary mt-1">
                <span>5 лет</span>
                <span>30 лет</span>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Процентная ставка — {rate}%</Label>
              <Slider
                value={[rate]}
                onValueChange={(value) => setRate(value[0])}
                min={6}
                max={20}
                step={0.1}
                className="mt-3"
              />
              <div className="flex justify-between text-sm text-text-secondary mt-1">
                <span>6%</span>
                <span>20%</span>
              </div>
            </div>
          </div>

          {/* Результаты расчета */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yandex-yellow/10 to-orange-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-yandex-yellow" />
                Результат расчета
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Сумма кредита</span>
                    <span className="text-lg font-semibold">{formatNumber(loanAmount)} ₽</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Ежемесячный платеж
                    </span>
                    <span className="text-2xl font-bold text-green-600">{formatNumber(monthlyPayment)} ₽</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Общая сумма выплат</span>
                    <span className="text-lg font-semibold">{formatNumber(totalAmount)} ₽</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Переплата по кредиту
                    </span>
                    <span className="text-lg font-semibold text-red-600">{formatNumber(overpayment)} ₽</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-accent-orange hover:bg-accent-orange/90 text-white font-semibold py-3 text-lg">
                Получить консультацию по ипотеке
              </Button>
              <Button variant="outline" className="w-full border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white py-3 text-lg">
                Подобрать лучшие предложения
              </Button>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-orange-600 text-lg">⚠️</span>
                <div>
                  <p className="text-sm font-medium text-orange-800 mb-1">
                    Предварительный расчет
                  </p>
                  <p className="text-xs text-orange-700">
                    Расчет носит справочный характер. Итоговые условия зависят от банка, вашей кредитной истории и других факторов. Для получения точной информации обратитесь к своему менеджеру.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}