import { Card, CardHeader, CardTitle, CardContent } from './card'
import { Badge } from './badge'
import { Avatar } from './avatar'
import type { EngineerExpert } from '@shared/types'

interface EngineerExpertCardProps {
  expert: {
    name: string;
    experience: string;
    quote: string;
    certificates?: { name: string; icon: string }[];
    projectsCount?: number;
    photo?: string;
    trainingPhoto?: string;
  }
}

export const EngineerExpertCard = ({ expert }: EngineerExpertCardProps) => (
  <Card className="flex flex-col items-center p-6">
    {expert.photo && (
      <img src={expert.photo} alt={expert.name} className="w-24 h-24 rounded-full mb-4" />
    )}
    <h3 className="text-xl font-bold mb-1">{expert.name}</h3>
    <div className="text-muted-foreground mb-2">Опыт: {expert.experience}</div>
    {expert.certificates && (
      <div className="flex gap-2 mb-2">
        {expert.certificates.map(cert => (
          <img key={cert.name} src={cert.icon} alt={cert.name} title={cert.name} className="h-8" />
        ))}
      </div>
    )}
    {expert.projectsCount && (
      <div className="text-sm text-primary font-semibold mb-2">Более {expert.projectsCount} реализованных объектов</div>
    )}
    <blockquote className="italic text-center text-muted-foreground mb-2">“{expert.quote}”</blockquote>
    {expert.trainingPhoto && (
      <img src={expert.trainingPhoto} alt="Сертификация" className="w-32 rounded-lg mt-2" />
    )}
  </Card>
) 