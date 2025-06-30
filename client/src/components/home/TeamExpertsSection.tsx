import { Link } from "wouter";
import TeamCard from "@/components/team-card";
import { useTeamMembers } from "@/hooks/useTeam";

interface TeamExpertsSectionProps {
  className?: string;
}

export default function TeamExpertsSection({ className }: TeamExpertsSectionProps) {
  const { data: team = [] } = useTeamMembers();

  return (
    <section className={`py-12 bg-white ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
            Познакомьтесь с нашими ведущими экспертами
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Опытные профессионалы, которые лично проведут вас через каждый этап сделки
          </p>
        </div>
        
        {team && team.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {team.slice(0, 3).map((member) => (
              <TeamCard key={member.id} member={member} className="transform hover:scale-105 transition-transform" />
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link href="/team" className="text-accent-orange hover:text-orange-600 font-medium transition-colors underline">
            Познакомиться со всей командой →
          </Link>
        </div>
      </div>
    </section>
  );
} 