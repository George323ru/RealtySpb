import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadForm from "@/components/LeadForm";
import { Phone, Mail, MessageCircle, Award, Users, Star } from "lucide-react";
import type { TeamMember } from "@shared/schema";

export default function Team() {
  const { data: teamMembers, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  const achievements = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "50+ экспертов",
      description: "Профессиональная команда специалистов"
    },
    {
      icon: <Award className="w-8 h-8 text-green-500" />,
      title: "15 лет опыта",
      description: "Средний стаж работы в недвижимости"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "1500+ сделок",
      description: "Успешно проведенных операций"
    }
  ];

  const specializations = [
    {
      title: "Жилая недвижимость",
      count: teamMembers?.filter(m => m.specialization && m.specialization.includes("Жилая недвижимость")).length || 0,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Коммерческая недвижимость", 
      count: teamMembers?.filter(m => m.specialization && m.specialization.includes("Коммерческая недвижимость")).length || 0,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Новостройки",
      count: teamMembers?.filter(m => m.specialization && m.specialization.includes("Новостройки")).length || 0,
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Инвестиции",
      count: teamMembers?.filter(m => m.specialization && m.specialization.includes("Инвестиции")).length || 0,
      color: "bg-orange-100 text-orange-700"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Наша команда 
              <span className="text-yandex-yellow"> экспертов</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Профессиональные риэлторы с многолетним опытом работы на рынке недвижимости Санкт-Петербурга
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Найти своего эксперта
              </Button>
              <Link href="/about">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                  О компании
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {achievement.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-text-secondary">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Специализации наших экспертов
            </h2>
            <p className="text-lg text-text-secondary">
              Узкопрофильные специалисты для решения любых задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {specializations.map((spec, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Badge className={`${spec.color} text-lg px-4 py-2 mb-3`}>
                    {spec.count} экспертов
                  </Badge>
                  <h3 className="font-semibold text-text-primary">
                    {spec.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Познакомьтесь с командой
            </h2>
            <p className="text-lg text-text-secondary">
              Каждый эксперт - профессионал своего дела
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="w-48 h-48 bg-gray-300 rounded-2xl mx-auto mb-6"></div>
                  <div className="bg-gray-300 h-6 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded mb-4"></div>
                </div>
              ))}
            </div>
          ) : teamMembers && teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-48 h-48 rounded-2xl mx-auto object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-text-primary mb-2">
                        {member.name}
                      </h3>
                      <p className="text-accent-orange font-medium mb-2">
                        {member.position}
                      </p>
                      <p className="text-sm text-text-secondary mb-4">
                        Опыт работы: {member.experience}
                      </p>

                      {member.specializations.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {member.specializations.slice(0, 2).map((spec, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {member.description && (
                        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                          {member.description}
                        </p>
                      )}

                      <div className="flex justify-center space-x-3 mb-4">
                        {member.phone && (
                          <a 
                            href={`tel:${member.phone}`}
                            className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-accent-orange hover:text-white transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        )}
                        {member.telegram && (
                          <a 
                            href={`https://t.me/${member.telegram.replace('@', '')}`}
                            className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-accent-orange hover:text-white transition-colors"
                          >
                            <i className="fab fa-telegram text-sm"></i>
                          </a>
                        )}
                        {member.whatsapp && (
                          <a 
                            href={`https://wa.me/${member.whatsapp.replace(/\D/g, '')}`}
                            className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-accent-orange hover:text-white transition-colors"
                          >
                            <i className="fab fa-whatsapp text-sm"></i>
                          </a>
                        )}
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-white"
                      >
                        Связаться с экспертом
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Команда формируется
              </h3>
              <p className="text-text-secondary">
                Мы подбираем лучших специалистов для нашей команды
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Team */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Почему выбирают нашу команду
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    Профессиональное образование
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Все наши специалисты имеют профильное образование и регулярно повышают квалификацию
                  </p>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li>• Сертифицированные риэлторы</li>
                    <li>• Регулярное обучение</li>
                    <li>• Знание законодательства</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    Индивидуальный подход
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Каждый клиент получает персонального консультанта, который ведет сделку от начала до конца
                  </p>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li>• Персональный менеджер</li>
                    <li>• Индивидуальная стратегия</li>
                    <li>• Постоянная поддержка</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    Глубокие знания рынка
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Наши эксперты знают особенности каждого района и могут дать профессиональную оценку
                  </p>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li>• Аналитика рынка</li>
                    <li>• Знание районов СПб</li>
                    <li>• Ценовые тренды</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    Ответственность за результат
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Мы гарантируем качество наших услуг и несем ответственность за результат
                  </p>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li>• Гарантии качества</li>
                    <li>• Страхование сделок</li>
                    <li>• Поддержка после сделки</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Готовы работать с профессионалами?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Выберите эксперта по вашему направлению и получите персональную консультацию
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm 
              title="Подобрать эксперта"
              description="Расскажите о вашей задаче, и мы подберем подходящего специалиста"
              serviceType="Консультация эксперта"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
