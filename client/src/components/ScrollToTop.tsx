import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Скроллим к верху страницы при смене маршрута
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // Используем 'auto' для мгновенного скролла, можно заменить на 'smooth' для плавного
    });
  }, [location]);

  return null; // Компонент ничего не рендерит
} 