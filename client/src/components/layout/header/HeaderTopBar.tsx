import { Phone, Clock } from "lucide-react";

export default function HeaderTopBar() {
  return (
    <div className="hidden xl:block border-b border-neutral-100 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center py-2 text-xs text-text-secondary">
          <div className="flex items-center space-x-4">
            <span className="flex items-center hover:text-accent-orange transition-colors">
              <Phone className="w-3 h-3 mr-1 text-accent-orange" />
              +7 (812) 123-45-67
            </span>
            <span className="flex items-center hover:text-accent-orange transition-colors">
              <Clock className="w-3 h-3 mr-1 text-accent-orange" />
              Пн-Вс: 9:00-21:00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 