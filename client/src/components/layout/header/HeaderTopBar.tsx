import { Phone, Clock } from "lucide-react";

export default function HeaderTopBar() {
  return (
    <div className="hidden lg:block border-b border-neutral-100 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 text-xs text-text-secondary">
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
          <div className="flex items-center space-x-3 text-xs">
            <span>Быстрая консультация:</span>
            <div className="flex items-center space-x-2">
              <a 
                href="#" 
                className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Написать в Telegram"
              >
                <span className="text-xs">Т</span>
              </a>
              <a 
                href="#" 
                className="w-6 h-6 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="Написать в WhatsApp"
              >
                <span className="text-xs">W</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 