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
import { useFloatingCtaPosition } from "@/hooks/useFloatingCtaPosition";

interface FloatingCTAProps {
  /** Порог скролла после которого показывается кнопка */
  scrollThreshold?: number;
  /** Номер телефона для прямого звонка */
  phoneNumber?: string;
  /** Дополнительные CSS классы */
  className?: string;
  /** Показывать всегда (игнорировать скролл) */
  alwaysVisible?: boolean;
  /** Отступ снизу на мобиле (по умолчанию 120px) */
  mobileBottomOffset?: number;
  /** Отступ снизу на десктопе (по умолчанию 24px) */
  desktopBottomOffset?: number;
  /** Включить debug режим */
  debug?: boolean;
  /** Стиль кнопки: 'modern' (белая с оранжевой границей) или 'classic' (оранжевая) */
  variant?: 'modern' | 'classic';
}

export default function FloatingCTA({
  scrollThreshold = 500,
  phoneNumber = "+78121234567",
  className,
  alwaysVisible = false,
  mobileBottomOffset = 120,
  desktopBottomOffset = 24,
  debug = false,
  variant = 'modern'
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  
  const { position, bottomOffset, isMobile } = useFloatingCtaPosition({
    mobileBottomOffset,
    desktopBottomOffset,
    rightOffset: 24,
    debug
  });

  useEffect(() => {
    if (alwaysVisible) return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, alwaysVisible]);

  const handleClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  if (!isVisible) return null;

  if (debug) {
    console.log('🎯 FloatingCTA render:', {
      isVisible,
      isMobile,
      bottomOffset,
      position
    });
  }

  const buttonStyles = variant === 'modern' 
    ? cn(
        // Современный стиль с белым фоном и оранжевой обводкой (без bounce)
        "h-14 px-6 rounded-full shadow-2xl",
        "!bg-white !border-2 !border-accent-orange",
        "!text-accent-orange",
        "hover:!bg-orange-50 hover:!border-orange-600 hover:!text-orange-600",
        "hover:shadow-2xl hover:scale-105",
        "transition-all duration-300 ease-in-out",
        "flex items-center gap-2",
        "!opacity-100",
        "ring-2 ring-orange-200/50",
        "text-lg font-bold"
      )
    : cn(
        // Классический оранжевый стиль
        "bg-accent-orange text-white hover:bg-orange-600",
        "shadow-lg rounded-full flex items-center space-x-2",
        "transition-all duration-200 hover:scale-105 hover:shadow-xl",
        "px-4 py-3 text-sm lg:px-6 lg:py-4 lg:text-base"
      );

  return (
    <div 
      style={position}
      className={cn(
        "transition-all duration-300 ease-in-out animate-fade-in-up",
        className
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={handleClick}
              className={buttonStyles}
              aria-label="Обратный звонок - заказать бесплатную консультацию"
            >
              <Phone className={variant === 'modern' ? "w-6 h-6" : "w-4 h-4 lg:w-5 lg:h-5"} />
              <span className="hidden sm:inline font-bold whitespace-nowrap">
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
      
      {/* Debug панель */}
      {debug && (
        <div className="absolute top-full mt-2 left-0 bg-black text-white text-xs p-2 rounded shadow-lg whitespace-nowrap">
          <div>Mobile: {isMobile ? 'YES' : 'NO'}</div>
          <div>Bottom: {bottomOffset}px</div>
          <div>Position: {position.bottom}</div>
          <div>Variant: {variant}</div>
        </div>
      )}
    </div>
  );
}
