import { 
  TrendingUp, 
  Key, 
  Users, 
  BookOpen, 
  Phone, 
  Heart, 
  Home,
  Building2,
  Store,
  Warehouse,
  Factory
} from "lucide-react";

export interface NavigationLink {
  name: string;
  href: string;
  desc?: string;
}

export interface MegaMenuSection {
  title: string;
  links: NavigationLink[];
}

export interface MegaMenu {
  sections: MegaMenuSection[];
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: any;
  megaMenu?: MegaMenu;
}

export interface ServiceItem {
  name: string;
  href: string;
  icon: string;
}

// Services data for mobile submenu
export const services: ServiceItem[] = [
  { name: "Предпродажная подготовка", href: "/services/pre-sale-preparation", icon: "🏠" },
  { name: "Оценка недвижимости", href: "/services/property-valuation", icon: "💰" },
  { name: "Юридическое сопровождение", href: "/services/legal-support", icon: "⚖️" },
  { name: "Ипотечное консультирование", href: "/services/mortgage-consulting", icon: "🏦" },
  { name: "Инвестиционные консультации", href: "/services/investment-consulting", icon: "📈" },
  { name: "Сопровождение сделок", href: "/services/transaction-support", icon: "🤝" },
  { name: "Управление недвижимостью", href: "/services/property-management", icon: "🔧" },
  { name: "Коммерческая недвижимость", href: "/services/commercial-real-estate", icon: "🏢" },
  { name: "Арендные консультации", href: "/services/rental-consulting", icon: "🔑" },
  { name: "Налоговое планирование", href: "/services/tax-planning", icon: "📊" },
  { name: "Страхование недвижимости", href: "/services/property-insurance", icon: "🛡️" },
  { name: "Земля", href: "/land", icon: "🌱" }
];

// Main navigation items
export const mainNavigation: NavigationItem[] = [
  {
    name: "Купить",
    href: "/buy",
    megaMenu: {
      sections: [
        {
          title: "Жилая недвижимость",
          links: [
            { name: "Квартиры", href: "/buy?type=квартира", desc: "Готовые к заселению" },
            { name: "Новостройки", href: "/new-buildings", desc: "От застройщика" },
            { name: "Вторичная", href: "/secondary", desc: "Проверенные варианты" },
            { name: "Дома и коттеджи", href: "/buy?type=дом", desc: "Загородная недвижимость" },
          ]
        },
        {
          title: "Коммерческая",
          links: [
            { name: "Офисы", href: "/buy?type=офис", desc: "Бизнес-центры" },
            { name: "Торговые помещения", href: "/buy?type=торговая", desc: "Магазины, салоны" },
            { name: "Склады", href: "/buy?type=склад", desc: "Логистические объекты" },
            { name: "Производство", href: "/buy?type=производство", desc: "Промышленные объекты" },
          ]
        },
        {
          title: "Другое",
          links: [
            { name: "Земля", href: "/land", desc: "Участки под застройку" },
            { name: "Гаражи", href: "/buy?type=гараж", desc: "Боксы и места" },
            { name: "Машиноместа", href: "/buy?type=машиноместо", desc: "Парковочные места" },
            { name: "Кладовые", href: "/buy?type=кладовая", desc: "Складские помещения" },
          ]
        }
      ]
    }
  },
  { name: "Продать", href: "/sell" },
  { name: "Сдать", href: "/rent" },
  { name: "Ремонт", href: "/services/renovation" },
  {
    name: "Услуги",
    href: "/services",
    megaMenu: {
      sections: [
        {
          title: "Консультационные",
          links: [
            { name: "Предпродажная подготовка", href: "/services/pre-sale-preparation" },
            { name: "Юридическая проверка", href: "/services/legal-check" },
            { name: "Сопровождение сделки", href: "/services/transaction-support" },
            { name: "Управление недвижимостью", href: "/services/property-management" },
          ]
        },
        {
          title: "Строительные",
          links: [
            { name: "Дизайн-проект", href: "/services/design-project" },
            { name: "Ремонт под ключ", href: "/services/renovation" },
            { name: "Строительство домов", href: "/services/construction" },
            { name: "Проектирование", href: "/services/design" },
          ]
        },
        {
          title: "Специализированные",
          links: [
            { name: "Инженерные системы", href: "/services/engineering-systems" },
            { name: "Ландшафтный дизайн", href: "/services/landscape-design" },
            { name: "Комплектация мебелью", href: "/services/furniture-selection" },
            { name: "Земельные участки", href: "/land" },
          ]
        }
      ]
    }
  }
];

// Secondary navigation items
export const secondaryNavigation: NavigationItem[] = [
  { name: "Команда", href: "/team" },
  { name: "О нас", href: "/about" },
  { name: "Отзывы", href: "/reviews" },
  { name: "Блог", href: "/blog" },
  { name: "Контакты", href: "/contacts" },
];

// Mobile bottom navigation items
export const mobileBottomNav = [
  { name: "Главная", href: "/", icon: Home },
  { name: "Избранное", href: "/favorites", icon: Heart },
  { name: "Продать", href: "/sell", icon: TrendingUp },
  { name: "Аренда", href: "/rent", icon: Key },
  { name: "Услуги", href: "/services", icon: Building2, hasSubmenu: true },
];

// Mobile buy submenu items
export const mobileBuySubmenu = [
  { name: "Новостройки", href: "/new-buildings", icon: Building2 },
  { name: "Вторичное жилье", href: "/secondary", icon: Store },
  { name: "Коммерческая", href: "/buy", icon: Warehouse },
  { name: "Земля", href: "/land", icon: Factory },
]; 