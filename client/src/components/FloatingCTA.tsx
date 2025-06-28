import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFloatingCtaPosition } from "@/hooks/useFloatingCtaPosition";

interface FloatingCTAProps {
  /** Порог скролла после которого показывается кнопка */
  scrollThreshold?: number;
  /** Текст кнопки (по умолчанию скрыт на мобиле) */
  text?: string;
  /** Ссылка для кнопки */
  href?: string;
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
}

export default function FloatingCTA({
  scrollThreshold = 500,
  text = "Написать в Telegram",
  href = "https://t.me/pro_realtor_v_SPB",
  phoneNumber = "+78121234567",
  className,
  alwaysVisible = false,
  mobileBottomOffset = 120,
  desktopBottomOffset = 24,
  debug = false
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

  if (!isVisible) return null;

  if (debug) {
    console.log('🎯 FloatingCTA render:', {
      isVisible,
      isMobile,
      bottomOffset,
      position
    });
  }

  return (
    <div 
      style={position}
      className={cn(
        "transition-all duration-300 ease-in-out animate-fade-in-up",
        className
      )}
    >
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button 
          className={cn(
            // Базовые стили кнопки
            "bg-accent-orange text-white hover:bg-orange-600",
            "shadow-lg rounded-full flex items-center space-x-2",
            // Интерактивность
            "transition-all duration-200 hover:scale-105 hover:shadow-xl",
            // Адаптивные размеры
            "px-4 py-3 text-sm lg:px-6 lg:py-4 lg:text-base"
          )}
          aria-label={`${text} - Telegram @pro_realtor_v_SPB`}
        >
          <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="hidden sm:inline font-medium">
            {text}
          </span>
        </Button>
      </a>
      
      {/* Debug панель */}
      {debug && (
        <div className="absolute top-full mt-2 left-0 bg-black text-white text-xs p-2 rounded shadow-lg whitespace-nowrap">
          <div>Mobile: {isMobile ? 'YES' : 'NO'}</div>
          <div>Bottom: {bottomOffset}px</div>
          <div>Position: {position.bottom}</div>
        </div>
      )}
    </div>
  );
}
