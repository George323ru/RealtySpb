import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "wouter";
import { 
  Settings, 
  TrendingUp, 
  Users, 
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";
import type { Service } from "@shared/schema";

export default function Services() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Дополнительные услуги
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Полный спектр услуг для работы с недвижимостью — от дизайна до юридического сопровождения
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">13</div>
                <div className="opacity-90">видов услуг</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="opacity-90">завершенных проектов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="opacity-90">довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="opacity-90">поддержка проектов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Почему выбирают наши услуги
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Профессионализм</h3>
              <p className="text-secondary text-sm">
                Опытные специалисты с многолетним стажем
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Качество</h3>
              <p className="text-secondary text-sm">
                Гарантия качества на все выполненные работы
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Сроки</h3>
              <p className="text-secondary text-sm">
                Строгое соблюдение согласованных сроков
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Прозрачность</h3>
              <p className="text-secondary text-sm">
                Честная ценовая политика без скрытых платежей
              </p>
            </Card>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary">
              Наши услуги
            </h2>
            <p className="text-secondary">
              Доступно услуг: {services.length}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-gray-400 mb-4">
                  <Settings className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Услуги не найдены
                </h3>
                <p className="text-secondary">
                  В данный момент услуги недоступны
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Process Section */}
        <section className="mb-16 bg-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Как мы работаем
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Консультация</h3>
              <p className="text-secondary">
                Бесплатная консультация и анализ ваших потребностей
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Планирование</h3>
              <p className="text-secondary">
                Разработка детального плана работ и составление сметы
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Выполнение</h3>
              <p className="text-secondary">
                Профессиональное выполнение работ с контролем качества
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Сдача</h3>
              <p className="text-secondary">
                Сдача проекта с гарантией и послепроектным обслуживанием
              </p>
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Популярные услуги
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-2 border-accent-orange/20 hover:border-accent-orange/40 transition-colors">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-hammer text-blue-500 text-xl"></i>
                </div>
                <CardTitle className="text-xl">Предпродажная подготовка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary mb-4">
                  Комплексная подготовка недвижимости к продаже для увеличения стоимости
                </p>
                <ul className="space-y-2 text-sm text-secondary mb-6">
                  <li>✓ Профессиональная оценка</li>
                  <li>✓ Рекомендации по улучшению</li>
                  <li>✓ Косметический ремонт</li>
                  <li>✓ Стайлинг интерьера</li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent-orange">от 50 000 ₽</span>
                  <Link href="/services/pre-sale-preparation">
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-2 border-accent-orange/20 hover:border-accent-orange/40 transition-colors">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-paint-brush text-purple-500 text-xl"></i>
                </div>
                <CardTitle className="text-xl">Дизайн-проект</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary mb-4">
                  Создание уникального дизайна интерьера под ваши потребности
                </p>
                <ul className="space-y-2 text-sm text-secondary mb-6">
                  <li>✓ 3D визуализация</li>
                  <li>✓ Рабочие чертежи</li>
                  <li>✓ Подбор материалов</li>
                  <li>✓ Авторский надзор</li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent-orange">от 2 000 ₽/м²</span>
                  <Link href="/services/design-project">
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-2 border-accent-orange/20 hover:border-accent-orange/40 transition-colors">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-balance-scale text-orange-500 text-xl"></i>
                </div>
                <CardTitle className="text-xl">Юридическое сопровождение</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary mb-4">
                  Полная правовая экспертиза и сопровождение сделок
                </p>
                <ul className="space-y-2 text-sm text-secondary mb-6">
                  <li>✓ Проверка документов</li>
                  <li>✓ Анализ рисков</li>
                  <li>✓ Сопровождение сделки</li>
                  <li>✓ Правовая защита</li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent-orange">от 25 000 ₽</span>
                  <Link href="/services/legal-check">
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-accent-orange to-orange-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Нужна консультация?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Получите бесплатную консультацию по любой из наших услуг
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="bg-white text-accent-orange hover:bg-gray-100">
              Получить консультацию
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
