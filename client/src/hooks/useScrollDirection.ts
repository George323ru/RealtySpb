import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'top'>('top');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let lastDirection = 'top';

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      let newDirection = lastDirection;
      let newIsVisible = isVisible;

      // Если мы в самом верху страницы
      if (scrollY < 10) {
        newDirection = 'top';
        newIsVisible = true;
      } else if (Math.abs(scrollY - lastScrollY) > 5) { // Добавляем порог чувствительности
        if (scrollY > lastScrollY) {
          // Скроллим вниз
          newDirection = 'down';
          newIsVisible = false;
        } else if (scrollY < lastScrollY) {
          // Скроллим вверх
          newDirection = 'up';
          newIsVisible = true;
        }
      }

      // Обновляем состояние только при реальных изменениях
      if (newDirection !== scrollDirection) {
        setScrollDirection(newDirection as 'up' | 'down' | 'top');
        console.log(`🔄 Header: ${newDirection === 'down' ? 'Скрыт' : 'Показан'} (${newDirection})`);
      }
      
      if (newIsVisible !== isVisible) {
        setIsVisible(newIsVisible);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
      lastDirection = newDirection;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDirection, isVisible]);

  return { scrollDirection, isVisible };
} 