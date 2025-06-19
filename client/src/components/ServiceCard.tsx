import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: "bg-blue-100", text: "text-blue-500" },
      purple: { bg: "bg-purple-100", text: "text-purple-500" },
      green: { bg: "bg-green-100", text: "text-green-500" },
      yellow: { bg: "bg-yellow-100", text: "text-yellow-500" },
      red: { bg: "bg-red-100", text: "text-red-500" },
      indigo: { bg: "bg-indigo-100", text: "text-indigo-500" },
      pink: { bg: "bg-pink-100", text: "text-pink-500" },
      teal: { bg: "bg-teal-100", text: "text-teal-500" },
      emerald: { bg: "bg-emerald-100", text: "text-emerald-500" },
      orange: { bg: "bg-orange-100", text: "text-orange-500" },
      cyan: { bg: "bg-cyan-100", text: "text-cyan-500" },
      violet: { bg: "bg-violet-100", text: "text-violet-500" },
      rose: { bg: "bg-rose-100", text: "text-rose-500" },
    };
    return colors[color] || colors.blue;
  };

  const colorClasses = getColorClasses(service.color);

  return (
    <Card className="hover:shadow-lg transition-shadow border border h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center mb-4`}>
          <i className={`${service.icon} ${colorClasses.text} text-xl`}></i>
        </div>
        
        <h3 className="font-semibold text-primary mb-2">{service.name}</h3>
        <p className="text-sm text-secondary mb-4 flex-grow">{service.shortDescription}</p>
        
        {service.price && (
          <p className="text-sm font-medium text-primary mb-2">
            Стоимость: {service.price}
          </p>
        )}
        
        {service.duration && (
          <p className="text-sm text-secondary mb-4">
            Срок: {service.duration}
          </p>
        )}
        
        <Link
          href={`/services/${service.slug}`}
          className="text-accent font-medium text-sm hover:underline flex items-center mt-auto"
        >
          Подробнее <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
