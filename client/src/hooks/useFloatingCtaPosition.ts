import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

interface FloatingCtaPositionConfig {
  /** Отступ снизу на мобиле (в пикселях) */
  mobileBottomOffset: number;
  /** Отступ снизу на десктопе (в пикселях) */
  desktopBottomOffset: number;
  /** Отступ справа (в пикселях) */
  rightOffset: number;
  /** Включить debug режим */
  debug?: boolean;
}

const DEFAULT_CONFIG: FloatingCtaPositionConfig = {
  mobileBottomOffset: 120, // Заведомо большой отступ для мобиле
  desktopBottomOffset: 24,
  rightOffset: 24,
  debug: false
};

export function useFloatingCtaPosition(config: Partial<FloatingCtaPositionConfig> = {}) {
  const isMobile = useIsMobile();
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  const [mobileNavHeight, setMobileNavHeight] = useState(0);

  useEffect(() => {
    if (!isMobile) return;

    // Пытаемся измерить реальную высоту мобильной навигации
    const measureNavHeight = () => {
      const mobileNav = document.querySelector('[data-mobile-nav]');
      if (mobileNav) {
        const height = mobileNav.getBoundingClientRect().height;
        setMobileNavHeight(height);
        
        if (finalConfig.debug) {
          console.log('🔍 Mobile nav height measured:', height + 'px');
        }
      }
    };

    // Измеряем сразу и через небольшую задержку
    measureNavHeight();
    const timer = setTimeout(measureNavHeight, 100);

    return () => clearTimeout(timer);
  }, [isMobile, finalConfig.debug]);

  const bottomOffset = isMobile 
    ? Math.max(finalConfig.mobileBottomOffset, mobileNavHeight + 20) // минимум 20px над навигацией
    : finalConfig.desktopBottomOffset;

  const position = {
    position: 'fixed' as const,
    bottom: `${bottomOffset}px`,
    right: `${finalConfig.rightOffset}px`,
    zIndex: 50,
  };

  if (finalConfig.debug) {
    console.log('📱 CTA Position Debug:', {
      isMobile,
      mobileNavHeight,
      bottomOffset,
      position
    });
  }

  return {
    position,
    bottomOffset,
    isMobile,
    mobileNavHeight,
    // Утилиты для настройки
    updateConfig: (newConfig: Partial<FloatingCtaPositionConfig>) => ({ ...finalConfig, ...newConfig })
  };
} 