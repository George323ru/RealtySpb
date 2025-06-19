
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Clock, Home, ChevronDown, ShoppingCart, TrendingUp, Key, Users, BookOpen, Building2, Store, Warehouse, Factory, Grid3X3, X, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/CartProvider";

export default function Header() {
  const [location] = useLocation();
  const { getTotalItems } = useCart();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Services data for mobile submenu
  const services = [
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


  const mainNavigation = [
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
    { name: "Продать", href: "/sell", icon: "TrendingUp" },
    { name: "Сдать", href: "/rent", icon: "Key" },
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

  const secondaryNavigation = [
    { name: "Команда", href: "/team", icon: "Users" },
    { name: "О нас", href: "/about", icon: "Info" },
    { name: "Отзывы", href: "/reviews", icon: "Star" },
    { name: "Блог", href: "/blog", icon: "BookOpen" },
    { name: "Контакты", href: "/contacts", icon: "Phone" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      {/* Top Contact Bar - Desktop Only */}
      <div className="hidden lg:block border-b border-neutral-100 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-xs text-text-secondary">
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
            <div className="flex items-center space-x-3 text-xs">
              <span>Быстрая консультация:</span>
              <div className="flex items-center space-x-2">
                <a href="#" className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-xs">Т</span>
                </a>
                <a href="#" className="w-6 h-6 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600 transition-colors">
                  <span className="text-xs">W</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 bg-yandex-yellow rounded-lg flex items-center justify-center mr-3">
              <Home className="text-yandex-black text-xl" />
            </div>
            <div>
              <div className="text-xl font-bold text-yandex-black">риэлтор в СПБ</div>
              <div className="text-xs text-text-secondary">realtorvspb.ru</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-0.5 overflow-x-auto" style={{ 
            maxWidth: 'calc(100vw - 200px)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {mainNavigation.map((item) => {
              const IconComponent = item.icon === 'TrendingUp' ? TrendingUp :
                                 item.icon === 'Key' ? Key :
                                 item.icon === 'Users' ? Users :
                                 item.icon === 'BookOpen' ? BookOpen :
                                 item.icon === 'Phone' ? Phone : 
                                 item.icon === 'ShoppingCart' ? ShoppingCart :
                                 item.icon === 'Grid3X3' ? Grid3X3 : Home;
              
              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-1.5 py-1 text-xs font-medium rounded-md transition-all duration-200 whitespace-nowrap",
                      location === item.href
                        ? "text-white bg-accent-orange shadow-lg"
                        : "text-text-primary hover:text-accent-orange hover:bg-orange-50"
                    )}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                    {item.name}
                    {item.megaMenu && <ChevronDown className="ml-1 w-3 h-3" />}
                  </Link>
                  
                  {/* Mega Menu for "Купить" and "Услуги" */}
                  {item.megaMenu && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-2xl mt-3 py-8 w-[780px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-neutral-100">
                      <div className="px-8">
                        <div className="grid grid-cols-3 gap-10">
                          {item.megaMenu.sections.map((section, idx) => (
                            <div key={idx}>
                              <h4 className="font-bold text-text-primary mb-5 text-sm uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-3">
                                {section.title}
                              </h4>
                              <div className="space-y-0">
                                {section.links.map((link, linkIdx) => (
                                  <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block group/item"
                                  >
                                    <div className="px-3 py-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-200 border border-transparent hover:border-orange-100 min-h-[60px] flex flex-col justify-center">
                                      <div className="font-medium text-text-primary group-hover/item:text-accent-orange text-sm leading-tight">
                                        {link.name}
                                      </div>
                                      {(link as any).desc && (
                                        <div className="text-xs text-text-secondary mt-1 leading-relaxed">
                                          {(link as any).desc}
                                        </div>
                                      )}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
            
            {/* Secondary Navigation */}
            {secondaryNavigation.map((item) => {
              const IconComponent = item.icon === 'Users' ? Users :
                                 item.icon === 'Info' ? BookOpen :
                                 item.icon === 'Star' ? Users :
                                 item.icon === 'BookOpen' ? BookOpen :
                                 item.icon === 'Phone' ? Phone : Home;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-1.5 py-1 text-xs font-medium rounded-md transition-all duration-200 whitespace-nowrap",
                    location === item.href
                      ? "text-white bg-accent-orange shadow-lg"
                      : "text-text-primary hover:text-accent-orange hover:bg-orange-50"
                  )}
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Cart Button */}
          <div className="flex items-center">
            <Link href="/cart" className="relative">
              <Button variant="outline" size="sm" className="relative rounded-lg border-neutral-300 hover:border-accent-orange hover:text-accent-orange transition-colors">
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent-orange text-white text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Cart Button */}
          <div className="lg:hidden">
            <Link href="/cart" className="relative">
              <Button variant="outline" size="sm" className="relative rounded-lg border-neutral-300 hover:border-accent-orange hover:text-accent-orange transition-colors">
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent-orange text-white text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

        </nav>

        {/* Mobile Bottom Navigation Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg">
          <div className="flex items-center justify-around py-2 px-1">
            <Link href="/" className={cn(
              "flex flex-col items-center justify-center p-1 transition-all duration-200 min-w-0",
              location === "/" ? "text-accent-orange" : "text-gray-600"
            )}>
              <Home className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-medium">Главная</span>
            </Link>
            
            <button 
              onClick={() => setActiveSubmenu(activeSubmenu === 'buy' ? null : 'buy')}
              className={cn(
                "flex flex-col items-center justify-center p-1 transition-all duration-200 min-w-0",
                activeSubmenu === 'buy' ? "text-accent-orange" : "text-gray-600"
              )}
            >
              <ShoppingCart className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-medium">Купить</span>
            </button>
            
            <Link href="/sell" className={cn(
              "flex flex-col items-center justify-center p-1 transition-all duration-200 min-w-0",
              location === "/sell" ? "text-accent-orange" : "text-gray-600"
            )}>
              <TrendingUp className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-medium">Продать</span>
            </Link>
            
            <Link href="/rent" className={cn(
              "flex flex-col items-center justify-center p-1 transition-all duration-200 min-w-0",
              location === "/rent" ? "text-accent-orange" : "text-gray-600"
            )}>
              <Key className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-medium">Аренда</span>
            </Link>
            
            <button 
              onClick={() => setActiveSubmenu(activeSubmenu === 'services' ? null : 'services')}
              className={cn(
                "flex flex-col items-center justify-center p-1 transition-all duration-200 min-w-0",
                activeSubmenu === 'services' ? "text-accent-orange" : "text-gray-600"
              )}
            >
              <Grid3X3 className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-medium">Услуги</span>
            </button>
          </div>
        </div>

        {/* Mobile Submenus */}
        {activeSubmenu === 'buy' && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setActiveSubmenu(null)}>
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Купить недвижимость</h3>
                <button onClick={() => setActiveSubmenu(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/new-buildings" onClick={() => setActiveSubmenu(null)} className="flex flex-col items-center p-4 bg-neutral-50 rounded-lg hover:bg-orange-50 transition-colors">
                  <Building2 className="w-8 h-8 mb-2 text-accent-orange" />
                  <span className="text-sm font-medium text-text-primary text-center">Новостройки</span>
                </Link>
                <Link href="/secondary" onClick={() => setActiveSubmenu(null)} className="flex flex-col items-center p-4 bg-neutral-50 rounded-lg hover:bg-orange-50 transition-colors">
                  <Store className="w-8 h-8 mb-2 text-accent-orange" />
                  <span className="text-sm font-medium text-text-primary text-center">Вторичное жилье</span>
                </Link>
                <Link href="/buy" onClick={() => setActiveSubmenu(null)} className="flex flex-col items-center p-4 bg-neutral-50 rounded-lg hover:bg-orange-50 transition-colors">
                  <Warehouse className="w-8 h-8 mb-2 text-accent-orange" />
                  <span className="text-sm font-medium text-text-primary text-center">Коммерческая</span>
                </Link>
                <Link href="/land" onClick={() => setActiveSubmenu(null)} className="flex flex-col items-center p-4 bg-neutral-50 rounded-lg hover:bg-orange-50 transition-colors">
                  <Factory className="w-8 h-8 mb-2 text-accent-orange" />
                  <span className="text-sm font-medium text-text-primary text-center">Земля</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeSubmenu === 'services' && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setActiveSubmenu(null)}>
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Услуги</h3>
                <button onClick={() => setActiveSubmenu(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-2">
                {services.map((service) => (
                  <Link 
                    key={service.href} 
                    href={service.href} 
                    onClick={() => setActiveSubmenu(null)} 
                    className="flex items-center p-3 hover:bg-neutral-50 rounded-lg transition-colors"
                  >
                    <span className="text-lg mr-3">{service.icon}</span>
                    <span className="font-medium text-text-primary">{service.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
