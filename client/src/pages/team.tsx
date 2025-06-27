import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MessageCircle } from "lucide-react";
import type { TeamMember } from "@shared/schema";

export default function Team() {
  const { data: team = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  const departments = [
    {
      name: "Отдел продаж",
      description: "Специалисты по работе с покупателями и продавцами недвижимости",
      members: team.filter(member => 
        member.position.toLowerCase().includes('продаж') || 
        member.position.toLowerCase().includes('риэлтор')
      )
    },
    {
      name: "Новостройки",
      description: "Эксперты по новым жилым комплексам и застройщикам",
      members: team.filter(member => 
        member.position.toLowerCase().includes('новостройк')
      )
    },
    {
      name: "Коммерческая недвижимость",
      description: "Специалисты по офисам, торговым и складским помещениям",
      members: team.filter(member => 
        member.position.toLowerCase().includes('коммерческ')
      )
    },
    {
      name: "Загородная недвижимость",
      description: "Эксперты по домам, участкам и коттеджным поселкам",
      members: team.filter(member => 
        member.position.toLowerCase().includes('загородн')
      )
    }
  ];

  const leadership = team.filter(member => 
    member.position.toLowerCase().includes('руководитель') ||
    member.position.toLowerCase().includes('директор') ||
    member.position.toLowerCase().includes('управляющий')
  );

  const otherMembers = team.filter(member => 
    !departments.some(dept => dept.members.includes(member)) &&
    !leadership.includes(member)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-neutral-200 rounded mb-8 w-1/3 mx-auto"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg">
                    <div className="w-32 h-32 bg-neutral-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                    <div className="h-3 bg-neutral-200 rounded mb-4 w-3/4 mx-auto"></div>
                    <div className="h-8 bg-neutral-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <Card className="text-center group hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-8 h-full flex flex-col">
        <div className="relative mb-6 overflow-hidden rounded-full w-32 h-32 mx-auto">
          <img 
            src={member.photo} 
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        
        <h3 className="text-xl font-semibold text-text-primary mb-2">{member.name}</h3>
        <p className="text-accent-orange font-medium mb-2">{member.position}</p>
        <p className="text-sm text-text-secondary mb-4 flex-1">{member.experience}</p>
        
        {member.specialization && member.specialization.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {member.specialization.map((spec, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-center space-x-2 mt-auto">
          {member.phone && (
            <Button
              size="sm"
              variant="outline"
              className="w-10 h-10 p-0"
              onClick={() => window.location.href = `tel:${member.phone}`}
            >
              <Phone className="w-4 h-4" />
            </Button>
          )}
          {member.telegram && (
            <Button
              size="sm"
              variant="outline"
              className="w-10 h-10 p-0"
              onClick={() => window.open(`https://t.me/${member.telegram.replace('@', '')}`, '_blank')}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          )}
          {member.whatsapp && (
            <Button
              size="sm"
              variant="outline"
              className="w-10 h-10 p-0"
              onClick={() => window.open(`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="w-10 h-10 p-0"
          >
            <Mail className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 py-20 min-h-[70vh] flex items-center">
        {/* Enhanced Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        
        {/* Background Image with Enhanced Contrast */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920')"}}
        ></div>
        
        {/* Additional Gradient Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-transparent to-pink-900/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Enhanced Typography with Better Contrast */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-2xl">
              Наша{" "}
              <span className="text-yandex-yellow drop-shadow-lg">команда</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-12 font-light text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Профессиональные риэлторы и эксперты с многолетним опытом работы на рынке недвижимости
            </p>
            
            {/* Enhanced Stats Cards with Better Visibility */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-yandex-yellow mb-3 drop-shadow-lg">50+</div>
                <div className="text-base text-white/90 font-medium">Специалистов</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-yandex-yellow mb-3 drop-shadow-lg">15+</div>
                <div className="text-base text-white/90 font-medium">Лет опыта</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-yandex-yellow mb-3 drop-shadow-lg">5000+</div>
                <div className="text-base text-white/90 font-medium">Довольных клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      {leadership.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  Руководство
                </h2>
                <p className="text-lg text-text-secondary">
                  Опытные лидеры, определяющие стратегию развития компании
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {leadership.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Departments */}
      {departments.map((department, index) => 
        department.members.length > 0 && (
          <section key={index} className={`py-16 ${index % 2 === 0 ? 'bg-neutral-100' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                    {department.name}
                  </h2>
                  <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                    {department.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {department.members.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      )}

      {/* Other Team Members */}
      {otherMembers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  Другие специалисты
                </h2>
                <p className="text-lg text-text-secondary">
                  Профессионалы в различных областях недвижимости
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {otherMembers.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Join Team CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Хотите присоединиться к нашей команде?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Мы всегда ищем талантливых и мотивированных специалистов в области недвижимости
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-indigo-600 hover:bg-neutral-100 px-8 py-3 text-lg font-semibold">
                Отправить резюме
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 text-lg font-semibold"
              >
                Узнать о вакансиях
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
