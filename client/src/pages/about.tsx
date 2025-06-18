import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Award, 
  Users, 
  Building, 
  TrendingUp, 
  Shield, 
  Heart,
  Target,
  Globe,
  CheckCircle,
  Calendar
} from "lucide-react";

export default function About() {
  const stats = [
    { value: "15+", label: "Лет на рынке", icon: Calendar },
    { value: "5000+", label: "Довольных клиентов", icon: Users },
    { value: "10000+", label: "Сделок проведено", icon: Building },
    { value: "98%", label: "Успешных сделок", icon: TrendingUp }
  ];

  const values = [
    {
      icon: Shield,
      title: "Надежность",
      description: "Гарантируем безопасность каждой сделки и защиту интересов клиентов"
    },
    {
      icon: Heart,
      title: "Клиентоориентированность", 
      description: "Индивидуальный подход к каждому клиенту и его потребностям"
    },
    {
      icon: Target,
      title: "Профессионализм",
      description: "Высокая экспертиза и постоянное развитие компетенций"
    },
    {
      icon: Globe,
      title: "Инновации",
      description: "Использование современных технологий и методов работы"
    }
  ];

  const achievements = [
    "Лидер рынка недвижимости Санкт-Петербурга",
    "Более 15 лет успешной работы",
    "Собственная база из 10,000+ объектов",
    "Команда из 50+ сертифицированных специалистов",
    "Партнерство с ведущими застройщиками",
    "Полный цикл услуг от поиска до сопровождения"
  ];

  const timeline = [
    {
      year: "2009",
      title: "Основание компании",
      description: "Начало работы с фокусом на вторичную недвижимость"
    },
    {
      year: "2012",
      title: "Расширение услуг",
      description: "Добавление услуг по новостройкам и коммерческой недвижимости"
    },
    {
      year: "2015",
      title: "Дополнительные услуги",
      description: "Запуск направлений дизайна, ремонта и строительства"
    },
    {
      year: "2018",
      title: "Цифровизация",
      description: "Внедрение современных IT-решений и онлайн-сервисов"
    },
    {
      year: "2021",
      title: "Лидерство",
      description: "Признание лидером рынка недвижимости СПб"
    },
    {
      year: "2025",
      title: "Инновации",
      description: "Запуск новых сервисов и расширение географии"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 py-20">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920')"}}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              О компании{" "}
              <span className="text-yandex-yellow">СПБ Недвижимость</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 font-light opacity-90">
              Лидирующее агентство недвижимости в Санкт-Петербурге с более чем 15-летним опытом работы
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-yandex-yellow" />
                  <div className="text-3xl font-bold text-yandex-yellow mb-1">{stat.value}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
                  Наша история
                </h2>
                <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                  Компания "СПБ Недвижимость" была основана в 2009 году группой профессионалов 
                  с многолетним опытом работы на рынке недвижимости Санкт-Петербурга.
                </p>
                <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                  За годы работы мы помогли тысячам семей найти дом своей мечты, а также 
                  обеспечили успешную продажу недвижимости для многих собственников.
                </p>
                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  Сегодня мы предлагаем полный спектр услуг: от поиска и продажи недвижимости 
                  до дизайна, ремонта и юридического сопровождения сделок.
                </p>
                <Link href="/contacts">
                  <Button className="bg-accent-orange hover:bg-orange-600 text-white px-8 py-3 text-lg">
                    Связаться с нами
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
                  alt="Офис компании"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"
                    alt="Команда"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400"
                    alt="Недвижимость"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Наши ценности
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Принципы, которыми мы руководствуемся в работе с каждым клиентом
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Этапы развития
              </h2>
              <p className="text-lg text-text-secondary">
                Ключевые моменты в истории нашей компании
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-neutral-200"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="inline-block max-w-sm">
                      <CardContent className="p-6">
                        <Badge className="bg-accent-orange text-white mb-2">
                          {item.year}
                        </Badge>
                        <h3 className="text-lg font-semibold text-text-primary mb-2">
                          {item.title}
                        </h3>
                        <p className="text-text-secondary text-sm">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent-orange rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Наши достижения
              </h2>
              <p className="text-lg text-text-secondary">
                Результаты, которыми мы гордимся
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                    <span className="text-text-primary font-medium">{achievement}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Наша миссия
            </h2>
            <p className="text-xl leading-relaxed mb-8 opacity-90">
              Сделать рынок недвижимости Санкт-Петербурга более прозрачным, безопасным и 
              доступным для каждого человека. Мы стремимся к тому, чтобы покупка, продажа 
              или аренда недвижимости стала простым и понятным процессом.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/team">
                <Button className="bg-white text-blue-600 hover:bg-neutral-100 px-8 py-3 text-lg font-semibold">
                  Познакомиться с командой
                </Button>
              </Link>
              <Link href="/contacts">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold"
                >
                  Начать сотрудничество
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
