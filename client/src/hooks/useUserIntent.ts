import { useState, useEffect } from 'react';
import type { UserIntent, BridgeTextConfig } from '@/components/home/types';

// Конфигурация мостовых текстов между секциями
const bridgeTexts: BridgeTextConfig = {
  'experts-to-objects': {
    'buy': 'С такой командой экспертов покупка становится безопасной. Взгляните на объекты, которые мы проверили и рекомендуем:',
    'sell': 'С такой командой экспертов продажа принесет максимальную прибыль. Посмотрите, какие объекты мы недавно продали выгодно:',
    'rent': 'С такой командой экспертов ваша аренда будет стабильно приносить доход. Изучите объекты с высокой доходностью:',
    'service': 'С такой командой экспертов любая задача решается под ключ. Посмотрите объекты, которые мы уже преобразили:'
  },
  'objects-to-services': {
    'buy': 'Эти объекты — лишь часть рынка. Чтобы найти именно ваш вариант, воспользуйтесь нашими услугами:',
    'sell': 'Такой результат достигается благодаря комплексному подходу. Узнайте, какие услуги помогут продать выгодно:',
    'rent': 'Такая доходность возможна при профессиональном управлении. Изучите услуги для собственников:',
    'service': 'Качественный результат — это всегда команда профессионалов. Выберите нужную услугу:'
  },
  'services-to-process': {
    'buy': 'Готовы найти вашу идеальную квартиру? Вот как проходит наша работа:',
    'sell': 'Готовы продать с максимальной выгодой? Вот как мы это делаем:',
    'rent': 'Готовы получать стабильный доход? Вот наш план действий:',
    'service': 'Готовы решить вашу задачу? Вот как мы работаем:'
  }
};

// Конфигурация контента для секции объектов
const objectsSectionContent = {
  'buy': {
    title: 'Объекты с гарантированной ликвидностью',
    description: 'Недвижимость, которая растет в цене и легко продается — проверено экспертами'
  },
  'sell': {
    title: 'Объекты, которые мы продали выгодно',
    description: 'Примеры сделок, где мы помогли продать на 15-20% дороже рыночной стоимости'
  },
  'rent': {
    title: 'Объекты с высокой арендной доходностью',
    description: 'Недвижимость, которая приносит стабильный доход от сдачи в аренду'
  },
  'service': {
    title: 'Объекты наших клиентов',
    description: 'Недвижимость, с которой мы работали — от консультации до полного сопровождения'
  }
};

export function useUserIntent() {
  const [userIntent, setUserIntent] = useState<UserIntent>('buy');

  // Загрузка из localStorage при инициализации
  useEffect(() => {
    const savedIntent = localStorage.getItem('realtyspb-user-intent');
    if (savedIntent && ['buy', 'sell', 'rent', 'service'].includes(savedIntent)) {
      setUserIntent(savedIntent as UserIntent);
    }
  }, []);

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('realtyspb-user-intent', userIntent);
  }, [userIntent]);

  // Функция для получения мостовых текстов
  const getBridgeText = (bridgeType: keyof BridgeTextConfig): string => {
    return bridgeTexts[bridgeType][userIntent];
  };

  // Функция для получения контента секции объектов
  const getObjectsSectionContent = () => {
    return objectsSectionContent[userIntent];
  };

  // Функция для определения приоритета услуги
  const getServicePriority = (serviceName: string): 'high' | 'medium' | 'low' => {
    const priorities: Record<UserIntent, string[]> = {
      'buy': ['Юридическая проверка', 'Сопровождение сделки'],
      'sell': ['Предпродажная подготовка', 'Дизайн-проект'],
      'rent': ['Управление недвижимостью', 'Комплектация мебелью'],
      'service': [] // все равнозначны
    };
    
    const highPriority = priorities[userIntent] || [];
    if (highPriority.includes(serviceName)) return 'high';
    if (userIntent === 'service') return 'medium'; // все услуги равнозначны
    return 'low';
  };

  return {
    userIntent,
    setUserIntent,
    getBridgeText,
    getObjectsSectionContent,
    getServicePriority
  };
} 