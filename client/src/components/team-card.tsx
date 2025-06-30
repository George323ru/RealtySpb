import { Card, CardContent } from "@/components/ui/card";
import { Phone, Send, MessageSquare } from "lucide-react";
import { TeamMember } from "@shared/schema";

interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

const TeamCard = ({ member, className = "" }: TeamCardProps) => {
  return (
    <Card className={`text-center group hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardContent className="p-6">
        <div className="relative mb-6 overflow-hidden rounded-full w-32 h-32 mx-auto">
          <img
            src={member.photo}
            alt={`${member.name} - ${member.position}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          {member.name}
        </h3>
        
        <p className="text-accent-orange font-medium mb-2">
          {member.position}
        </p>
        
        <p className="text-sm text-text-secondary mb-4">
          Опыт работы: {member.experience}
        </p>

        {member.specialization && member.specialization.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {member.specialization.map((spec, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-neutral-100 text-text-secondary text-xs rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-center space-x-3">
          {member.telegram && (
            <a
              href={`https://t.me/${member.telegram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
              title="Написать в Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
          )}
          {member.whatsapp && (
            <a
              href={`https://wa.me/${member.whatsapp.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors"
              title="Написать в WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          )}
          {member.phone && (
            <a
              href={`tel:${member.phone}`}
              className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-accent-orange hover:text-white transition-colors"
              title="Позвонить"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
