import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Константы для улучшения читаемости
const SCROLL_THRESHOLD = 500;
const PHONE_NUMBER = "+78121234567";

// Кастомный хук для отслеживания скролла
function useScrollVisibility(threshold: number) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    // Добавляем пассивный обработчик для лучшей производительности
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
}

export default function FloatingCTA() {
  const isVisible = useScrollVisibility(SCROLL_THRESHOLD);

  const handleCallClick = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  // Если кнопка не видна, не рендерим её вообще для оптимизации
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-8 duration-500">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleCallClick}
              className={cn(
                // Основные стили с !important для гарантии применения
                "h-14 px-6 rounded-full shadow-2xl",
                // Явный белый фон и яркая оранжевая обводка
                "!bg-white !border-3 !border-orange-500",
                "!text-orange-500",
                // Эффекты при наведении
                "hover:!bg-orange-50 hover:!border-orange-600 hover:!text-orange-600",
                "hover:shadow-2xl hover:scale-110",
                // Анимации и привлечение внимания
                "transition-all duration-300 ease-in-out",
                "animate-bounce-slow",
                // Расположение элементов
                "flex items-center gap-2",
                // Убираем все возможные прозрачности
                "!opacity-100",
                // Дополнительные эффекты для заметности
                "ring-2 ring-orange-200 ring-opacity-50",
                // Более крупный текст
                "text-lg font-bold"
              )}
            >
              <Phone className="w-6 h-6 animate-bounce" />
              <span className="hidden sm:inline-block font-bold whitespace-nowrap">
                Обратный звонок
              </span>
              <span className="sm:hidden font-bold">
                Звонок
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-gray-800 text-white">
            <p className="font-medium">Нужна консультация? Мы перезвоним! 💙</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
