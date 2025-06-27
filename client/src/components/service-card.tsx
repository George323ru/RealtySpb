import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@shared/schema";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

// Related services mapping
const relatedServicesMap: Record<string, string[]> = {
  "Предпродажная подготовка": ["Дизайн-проект", "Фотосъемка", "Юридическая проверка"],
  "Юридическое сопровождение": ["Регистрация права", "Проверка документов", "Нотариальные услуги"],
  "Оценка недвижимости": ["Анализ рынка", "Техническая экспертиза", "Страхование"],
  "Ипотечное консультирование": ["Подбор банка", "Помощь с документами", "Страхование жизни"],
  "Управление инвестициями": ["Анализ доходности", "Налоговое планирование", "Мониторинг рынка"],
  "Коммерческая недвижимость": ["Бизнес-план", "Лицензирование", "Арендные отношения"],
  "Земля": ["Подбор участков", "Межевание", "Оформление документов", "Разрешения на строительство"]
};

const ServiceCard = ({ service, className = "" }: ServiceCardProps) => {
  const getIconColorClass = (serviceId: number) => {
    const colors = [
      "bg-blue-100 text-blue-500 group-hover:bg-blue-500 group-hover:text-white",
      "bg-purple-100 text-purple-500 group-hover:bg-purple-500 group-hover:text-white",
      "bg-green-100 text-green-500 group-hover:bg-green-500 group-hover:text-white",
      "bg-yellow-100 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white",
      "bg-red-100 text-red-500 group-hover:bg-red-500 group-hover:text-white",
      "bg-indigo-100 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white",
      "bg-pink-100 text-pink-500 group-hover:bg-pink-500 group-hover:text-white",
      "bg-teal-100 text-teal-500 group-hover:bg-teal-500 group-hover:text-white",
    ];
    return colors[serviceId % colors.length];
  };

  const relatedServices = relatedServicesMap[service.name] || [];

  return (
    <Link href={`/services/${service.id}`} className="block group h-full">
      <Card className={`h-full border border-neutral-200 bg-white transition-all duration-300 ease-out group-hover:shadow-2xl group-hover:shadow-blue-100/50 group-hover:-translate-y-1 group-hover:scale-[1.02] cursor-pointer ${className}`}>
        <CardContent className="p-6 h-full flex flex-col">
          {/* Icon Section */}
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 ${getIconColorClass(service.id)}`}>
            <i className={`${service.icon} text-xl transition-transform duration-300`}></i>
          </div>
          
          {/* Title */}
          <h3 className="font-bold text-xl text-text-primary mb-3 transition-colors duration-300 group-hover:text-accent-orange line-clamp-2">
            {service.name}
          </h3>
          
          {/* Description */}
          <p className="text-base text-text-secondary mb-6 flex-1 transition-colors duration-300 group-hover:text-text-primary leading-relaxed">
            {service.shortDescription}
          </p>

          <div className="space-y-4 mt-auto">
            {/* Price */}
            {service.price && (
              <div className="transform transition-all duration-300 group-hover:scale-105">
                <p className="text-lg font-bold text-accent-orange transition-colors duration-300 group-hover:text-accent-orange-dark">
                  {service.price}
                </p>
              </div>
            )}

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="space-y-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center transition-all duration-300 group-hover:translate-x-1">
                    <div className="w-2 h-2 bg-accent-orange rounded-full mr-3 transition-transform duration-300 group-hover:scale-125"></div>
                    <span className="text-sm text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="border-t border-neutral-100 pt-4 mt-4 transition-colors duration-300 group-hover:border-accent-orange/30">
                <p className="text-xs font-medium text-text-secondary mb-3 transition-colors duration-300 group-hover:text-accent-orange">
                  Дополнительные услуги:
                </p>
                <div className="space-y-1">
                  {relatedServices.slice(0, 2).map((relatedService, index) => (
                    <div key={index} className="text-xs text-text-secondary transition-all duration-300 group-hover:text-text-primary group-hover:translate-x-1">
                      • {relatedService}
                    </div>
                  ))}
                  {relatedServices.length > 2 && (
                    <div className="text-xs text-accent-orange transition-colors duration-300 group-hover:text-accent-orange-dark">
                      +{relatedServices.length - 2} еще
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Call to Action */}
            <div className="pt-2">
              <div className="inline-flex items-center text-accent-orange font-medium text-sm transition-all duration-300 group-hover:text-accent-orange-dark transform group-hover:translate-x-1">
                Подробнее
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceCard;
