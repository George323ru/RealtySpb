import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Phone } from "lucide-react";
import type { TeamMember } from "@shared/schema";

interface TeamMemberProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberProps) {
  return (
    <Card className="text-center group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="relative mb-6">
          <img
            src={member.photo}
            alt={member.name}
            className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        
        <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
        <p className="text-accent-orange font-medium mb-2">{member.position}</p>
        <p className="text-sm text-secondary mb-4">{member.experience}</p>
        
        {member.specialization && (
          <p className="text-sm text-secondary mb-4">
            Специализация: {member.specialization}
          </p>
        )}
        
        <div className="flex justify-center space-x-3">
          {member.telegram && (
            <a
              href={`https://t.me/${member.telegram}`}
              className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-accent-orange hover:text-text-primary transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          )}
          {member.phone && (
            <a
              href={`tel:${member.phone}`}
              className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-accent-orange hover:text-text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
