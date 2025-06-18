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
  "Земля": ["Подбор участка", "Проверка документов", "Подключение коммуникаций", "Разрешения на строительство"]
};

const ServiceCard = ({ service, className = "" }: ServiceCardProps) => {
  const getIconColorClass = (serviceId: number) => {
    const colors = [
      "bg-blue-100 text-blue-500",
      "bg-purple-100 text-purple-500",
      "bg-green-100 text-green-500",
      "bg-yellow-100 text-yellow-500",
      "bg-red-100 text-red-500",
      "bg-indigo-100 text-indigo-500",
      "bg-pink-100 text-pink-500",
      "bg-teal-100 text-teal-500",
    ];
    return colors[serviceId % colors.length];
  };

  const relatedServices = relatedServicesMap[service.name] || [];

  return (
    <Card className={`hover:shadow-lg transition-shadow border border-neutral-200 h-full ${className}`}>
      <CardContent className="p-6 h-full flex flex-col">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getIconColorClass(service.id)}`}>
          <i className={`${service.icon} text-xl`}></i>
        </div>
        
        <h3 className="font-semibold text-text-primary mb-2">
          {service.name}
        </h3>
        
        <p className="text-sm text-text-secondary mb-4 flex-1">
          {service.shortDescription}
        </p>

        <div className="space-y-3">
          {service.price && (
            <p className="text-sm font-medium text-accent-orange">
              {service.price}
            </p>
          )}

          {service.features && service.features.length > 0 && (
            <div className="text-xs text-text-secondary space-y-1">
              {service.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1 h-1 bg-accent-orange rounded-full mr-2"></div>
                  {feature}
                </div>
              ))}
            </div>
          )}

          {relatedServices.length > 0 && (
            <div className="border-t border-neutral-100 pt-3 mt-3">
              <p className="text-xs text-text-secondary mb-2">Дополнительные услуги:</p>
              <div className="space-y-1">
                {relatedServices.map((relatedService, index) => (
                  <div key={index} className="text-xs text-text-secondary">
                    • {relatedService}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-auto pt-4">
            <Link 
              href={`/services/${service.id}`}
              className="inline-flex items-center text-accent-orange font-medium text-sm hover:underline"
            >
              Подробнее
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
