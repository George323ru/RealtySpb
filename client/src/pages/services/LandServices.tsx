import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import { CheckCircle, MapPin, FileText, Search, Building2, Ruler, TreePine } from "lucide-react";

export default function LandServices() {
  const services = [
    {
      icon: <Search className="w-8 h-8 text-green-500" />,
      title: "Подбор участков",
      description: "Поиск земельных участков под ваши требования",
      price: "от 50 000 ₽"
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      title: "Оформление документов",
      description: "Полное юридическое сопровождение сделки",
      price: "от 80 000 ₽"
    },
    {
      icon: <Ruler className="w-8 h-8 text-purple-500" />,
      title: "Кадастровые работы",
      description: "Межевание, топосъемка, техпланы",
      price: "от 25 000 ₽"
    },
    {
      icon: <Building2 className="w-8 h-8 text-orange-500" />,
      title: "Подготовка к строительству",
      description: "Получение разрешений и подключение коммуникаций",
      price: "от 150 000 ₽"
    }
  ];

  const landTypes = [
    {
      title: "ИЖС участки",
      description: "Земли для индивидуального жилищного строительства",
      features: ["Возможность прописки", "Все виды коммуникаций", "Банковское кредитование"],
      area: "от 6 соток",
      price: "от 150 000 ₽/сотка"
    },
    {
      title: "СНТ и ДНП",
      description: "Участки в садовых товариществах и дачных поселках",
      features: ["Доступная стоимость", "Развитая инфраструктура", "Готовые коммуникации"],
      area: "от 4 соток",
      price: "от 80 000 ₽/сотка"
    },
    {
      title: "Коммерческие участки",
      description: "Земли для коммерческого использования",
      features: ["Высокий трафик", "Развитая инфраструктура", "Инвестиционная привлекательность"],
      area: "от 10 соток",
      price: "от 500 000 ₽/сотка"
    }
  ];

  const benefits = [
    "Эксклюзивная база земельных участков",
    "Проверка юридической чистоты",
    "Анализ перспектив развития района",
    "Помощь в получении кредита на землю",
    "Сопровождение всех этапов оформления",
    "Консультации по строительству"
  ];

  const process = [
    {
      step: "01",
      title: "Определение требований",
      description: "Выясняем ваши потребности и бюджет"
    },
    {
      step: "02",
      title: "Подбор вариантов",
      description: "Находим подходящие участки из нашей базы"
    },
    {
      step: "03",
      title: "Выезд на участок",
      description: "Осматриваем выбранные варианты"
    },
    {
      step: "04",
      title: "Юридическая проверка",
      description: "Проверяем документы и обременения"
    },
    {
      step: "05",
      title: "Оформление сделки",
      description: "Подготавливаем и регистрируем договор"
    },
    {
      step: "06",
      title: "Поддержка после покупки",
      description: "Помогаем с дальнейшими вопросами"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Услуги по земле и 
              <span className="text-yandex-yellow"> строительству</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Полный цикл услуг: от подбора участка до получения разрешения на строительство
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Подобрать участок
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 text-lg">
                Каталог участков
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Комплекс услуг по земле
            </h2>
            <p className="text-lg text-text-secondary">
              Все этапы работы с земельными участками
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {service.description}
                  </p>
                  <Badge className="bg-green-500 text-white">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Land Types */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Типы земельных участков
            </h2>
            <p className="text-lg text-text-secondary">
              Подберем участок под любые цели и бюджет
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {landTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">{type.area}</Badge>
                    <Badge className="bg-green-500 text-white">{type.price}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-text-secondary">{type.description}</p>
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-text-primary">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-green-500 text-white hover:bg-green-600">
                    Смотреть участки
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Этапы работы
            </h2>
            <p className="text-lg text-text-secondary">
              Как мы помогаем найти и оформить участок
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                  {item.step}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Наши преимущества
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-text-primary font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Наши результаты
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-500 mb-2">500+</div>
                <div className="text-text-primary font-semibold">Участков продано</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">95%</div>
                <div className="text-text-primary font-semibold">Успешных сделок</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-500 mb-2">30</div>
                <div className="text-text-primary font-semibold">Дней средний срок</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
                <div className="text-text-primary font-semibold">Юридическая чистота</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Найдем идеальный участок для вас
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Расскажите о ваших требованиях, и мы подберем лучшие варианты земельных участков
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title="Подобрать земельный участок"
              description="Опишите ваши требования к участку и бюджет"
              serviceType="Услуги по земле и строительству"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
