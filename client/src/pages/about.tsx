import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TeamCard from "@/components/team-card";
import ConsultationForm from "@/components/consultation-form";
import { TeamMember } from "@shared/schema";
import { 
  Award, 
  Users, 
  Building, 
  TrendingUp, 
  Star,
  CheckCircle,
  Calendar,
  Target,
  Heart,
  Shield
} from "lucide-react";

const About = () => {
  const { data: teamMembers = [], isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  const stats = [
    { value: "15+", label: "лет на рынке", icon: <Calendar className="w-8 h-8 text-blue-500" /> },
    { value: "2500+", label: "успешных сделок", icon: <TrendingUp className="w-8 h-8 text-green-500" /> },
    { value: "98%", label: "довольных клиентов", icon: <Star className="w-8 h-8 text-yellow-500" /> },
    { value: "24/7", label: "поддержка клиентов", icon: <Users className="w-8 h-8 text-purple-500" /> }
  ];

  const values = [
    {
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      title: "Надежность",
      description: "Гарантируем безопасность каждой сделки и защиту интересов наших клиентов"
    },
    {
      icon: <Star className="w-12 h-12 text-yellow-500" />,
      title: "Качество",
      description: "Высокие стандарты обслуживания и профессиональный подход к каждому проекту"
    },
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: "Забота о клиентах",
      description: "Индивидуальный подход и внимание к потребностям каждого клиента"
    },
    {
      icon: <Target className="w-12 h-12 text-green-500" />,
      title: "Результативность",
      description: "Достигаем поставленных целей и превышаем ожидания наших клиентов"
    }
  ];

  const achievements = [
    {
      year: "2008",
      title: "Основание компании",
      description: "Начало работы на рынке недвижимости Санкт-Петербурга"
    },
    {
      year: "2012",
      title: "Расширение услуг",
      description: "Добавлены услуги по ремонту и дизайну недвижимости"
    },
    {
      year: "2015",
      title: "1000-я сделка",
      description: "Достигнут важный рубеж в количестве проведенных сделок"
    },
    {
      year: "2018",
      title: "Премия 'Лучшее агентство'",
      description: "Признание профессионального сообщества"
    },
    {
      year: "2020",
      title: "Цифровизация процессов",
      description: "Внедрение современных технологий в работу с клиентами"
    },
    {
      year: "2023",
      title: "2500-я сделка",
      description: "Новый рекорд по количеству успешно проведенных сделок"
    }
  ];

  const licenses = [
    {
      title: "Лицензия на риэлторскую деятельность",
      number: "№ СПБ-12345-2008",
      date: "Действительна до 2026 года"
    },
    {
      title: "Лицензия на строительные работы",
      number: "№ СТР-67890-2010", 
      date: "Действительна до 2025 года"
    },
    {
      title: "Лицензия на проектирование",
      number: "№ ПРО-11223-2012",
      date: "Действительна до 2027 года"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              О компании СПБ Недвижимость
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Более 15 лет помогаем людям решать вопросы с недвижимостью в Санкт-Петербурге
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Наша история
              </h2>
              <p className="text-lg text-text-secondary">
                От небольшой риэлторской компании до ведущего агентства полного цикла
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-6">
                  Как все начиналось
                </h3>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    В 2008 году группа профессиональных риэлторов объединилась с целью создать 
                    агентство недвижимости нового уровня в Санкт-Петербурге. Мы поставили перед 
                    собой амбициозную задачу — изменить представление людей о работе с недвижимостью.
                  </p>
                  <p>
                    За годы работы мы расширили спектр услуг, добавив проектирование, строительство, 
                    ремонт и дизайн. Сегодня мы предлагаем полный цикл услуг — от поиска земельного 
                    участка до сдачи готового объекта под ключ.
                  </p>
                  <p>
                    Наша команда выросла с 3 до 25+ профессионалов, а количество довольных клиентов 
                    превысило 2500 человек. Мы гордимся тем, что большинство новых клиентов приходят 
                    к нам по рекомендациям.
                  </p>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600" 
                  alt="Офис СПБ Недвижимость" 
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="w-12 h-12 text-accent-orange mr-4" />
                  <h3 className="text-2xl font-bold text-text-primary">Наша миссия</h3>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  Делать процесс работы с недвижимостью простым, понятным и безопасным для каждого клиента. 
                  Мы стремимся предоставить не просто услугу, а комплексное решение, которое превосходит ожидания.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Building className="w-12 h-12 text-blue-500 mr-4" />
                  <h3 className="text-2xl font-bold text-text-primary">Наше видение</h3>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  Стать ведущим агентством недвижимости в Северо-Западном регионе, устанавливающим 
                  стандарты качества и инноваций в отрасли. Создать экосистему, где каждый этап 
                  работы с недвижимостью максимально комфортен для клиента.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
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
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Ключевые достижения
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Важные вехи в развитии нашей компании
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-accent-orange"></div>
              
              <div className="space-y-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:space-x-8`}>
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} mb-4 md:mb-0`}>
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="text-accent-orange font-bold text-lg mb-2">{achievement.year}</div>
                          <h3 className="text-xl font-semibold text-text-primary mb-2">{achievement.title}</h3>
                          <p className="text-text-secondary">{achievement.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    
                    <div className="w-full md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Licenses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Лицензии и сертификаты
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Мы работаем в полном соответствии с законодательством РФ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {licenses.map((license, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-accent-orange mb-4" />
                  <h3 className="font-semibold text-text-primary mb-2">{license.title}</h3>
                  <p className="text-text-secondary text-sm mb-2">{license.number}</p>
                  <p className="text-text-secondary text-sm">{license.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Команда профессионалов
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Опытные специалисты, которые помогут решить любые задачи с недвижимостью
            </p>
          </div>
          
          {teamLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 skeleton" />
                  <div className="h-4 bg-gray-200 rounded mb-2 skeleton" />
                  <div className="h-3 bg-gray-200 rounded skeleton" />
                </div>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.slice(0, 4).map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
              {teamMembers.length > 4 && (
                <div className="text-center mt-12">
                  <Button className="bg-accent-orange hover:bg-orange-600 text-white px-8 py-3">
                    Вся команда
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-text-secondary">Информация о команде скоро будет доступна</p>
            </div>
          )}
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Почему выбирают нас
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="w-8 h-8 text-green-500" />,
                title: "Полный цикл услуг",
                description: "От поиска объекта до получения ключей — все услуги в одном месте"
              },
              {
                icon: <Star className="w-8 h-8 text-yellow-500" />,
                title: "Высокий рейтинг",
                description: "98% клиентов рекомендуют нас своим друзьям и знакомым"
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-500" />,
                title: "Юридическая защита",
                description: "Страхование сделок и полная правовая защита наших клиентов"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
                title: "Современные технологии",
                description: "Используем передовые решения для максимального удобства клиентов"
              },
              {
                icon: <Users className="w-8 h-8 text-indigo-500" />,
                title: "Персональный подход",
                description: "Индивидуальное решение для каждого клиента и его потребностей"
              },
              {
                icon: <Calendar className="w-8 h-8 text-red-500" />,
                title: "Быстрые сроки",
                description: "Средний срок сделки — 45 дней благодаря отлаженным процессам"
              }
            ].map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {advantage.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-text-secondary">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <ConsultationForm 
              title="Готовы начать работу с нами?"
              description="Свяжитесь с нами для бесплатной консультации по вашему проекту"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
