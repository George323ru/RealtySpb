import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@shared/schema";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

const ServiceCard = ({ service, className = "" }: ServiceCardProps) => {
  const getIconColorClass = (category: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-500",
      purple: "bg-purple-100 text-purple-500",
      green: "bg-green-100 text-green-500",
      yellow: "bg-yellow-100 text-yellow-500",
      red: "bg-red-100 text-red-500",
      indigo: "bg-indigo-100 text-indigo-500",
      pink: "bg-pink-100 text-pink-500",
      teal: "bg-teal-100 text-teal-500",
      emerald: "bg-emerald-100 text-emerald-500",
      orange: "bg-orange-100 text-orange-500",
      cyan: "bg-cyan-100 text-cyan-500",
      violet: "bg-violet-100 text-violet-500",
      rose: "bg-rose-100 text-rose-500",
    };
    return colors[category as keyof typeof colors] || colors.blue;
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow border border-neutral-200 ${className}`}>
      <CardContent className="p-6">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getIconColorClass(service.category)}`}>
          <i className={`${service.icon} text-xl`}></i>
        </div>
        
        <h3 className="font-semibold text-text-primary mb-2">
          {service.name}
        </h3>
        
        <p className="text-sm text-text-secondary mb-4">
          {service.description}
        </p>

        {service.price && (
          <p className="text-sm font-medium text-accent-orange mb-2">
            {service.price}
          </p>
        )}

        {service.duration && (
          <p className="text-xs text-text-secondary mb-4">
            Срок выполнения: {service.duration}
          </p>
        )}

        {service.features && service.features.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-text-secondary space-y-1">
              {service.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1 h-1 bg-accent-orange rounded-full mr-2"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Link 
          href={`/services/${service.slug}`}
          className="inline-flex items-center text-accent-orange font-medium text-sm hover:underline"
        >
          Подробнее
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
