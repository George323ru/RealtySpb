import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'top'>('top');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      // Если мы в самом верху страницы
      if (scrollY < 10) {
        setScrollDirection('top');
        setIsVisible(true);
        console.log('📍 TOP: isVisible =', true);
      } else if (scrollY > lastScrollY) {
        // Скроллим вниз
        setScrollDirection('down');
        setIsVisible(false);
        console.log('📍 DOWN: isVisible =', false, 'scrollY:', scrollY);
      } else if (scrollY < lastScrollY) {
        // Скроллим вверх
        setScrollDirection('up');
        setIsVisible(true);
        console.log('📍 UP: isVisible =', true, 'scrollY:', scrollY);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrollDirection, isVisible };
} 