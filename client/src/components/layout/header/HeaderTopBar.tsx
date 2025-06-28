import { Phone, Clock } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

export default function HeaderTopBar() {
  const { scrollDirection } = useScrollDirection();
  
  // TopBar скрывается при любом скролле (кроме самого верха)
  const isTopBarVisible = scrollDirection === 'top';

  return (
    <div 
      className={cn(
        "hidden xl:block border-b border-neutral-100 bg-neutral-50 transition-all duration-300 ease-in-out overflow-hidden",
        isTopBarVisible ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
      )}
    >
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