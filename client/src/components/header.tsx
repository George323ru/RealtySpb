import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Clock, Home, ChevronDown, ShoppingCart, TrendingUp, Key, Users, BookOpen, Building2, Store, Warehouse, Factory, Grid3X3, X, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/CartProvider";

export default function Header() {
  const [location, setLocation] = useLocation();
  const { getTotalItems } = useCart();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

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

  const handleMenuEnter = (menuName: string) => {
    setHoveredMenu(menuName);
  };

  const handleMenuLeave = () => {
    setHoveredMenu(null);
  };

  const handleMenuClick = (href: string) => {
    setLocation(href);
    setHoveredMenu(null);
  };

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
          <Link href="/" className="flex items-center" aria-label="Главная страница - Риэлтор в СПб">
            <div className="w-12 h-12 bg-yandex-yellow rounded-lg flex items-center justify-center mr-3">
              <Home className="text-yandex-black text-xl" />
            </div>
            <div>
              <div className="text-xl font-bold text-yandex-black">риэлтор в СПБ</div>
              <div className="text-xs text-text-secondary">realtorvspb.ru</div>
            </div>
          </Link>

          {/* Desktop and Mobile Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {mainNavigation.map((item) => {
              const IconComponent = item.icon ? {
                'TrendingUp': TrendingUp, 'Key': Key, 'Users': Users, 'BookOpen': BookOpen, 'Phone': Phone, 'ShoppingCart': ShoppingCart, 'Grid3X3': Grid3X3
              }[item.icon] || Home : Home;
              
              const isMenuOpen = hoveredMenu === item.name;
              
              return (
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => item.megaMenu && handleMenuEnter(item.name)}
                  onMouseLeave={() => item.megaMenu && handleMenuLeave()}
                >
                  {item.megaMenu ? (
                    <>
                      <button
                        onClick={() => handleMenuClick(item.href)}
                        className={cn(
                          "flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 whitespace-nowrap shadow-sm border border-transparent",
                          location === item.href && "text-white bg-accent-orange shadow-lg",
                          location !== item.href && !isMenuOpen && "text-text-primary hover:text-accent-orange hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:border-orange-200 hover:shadow-md hover:transform hover:scale-102",
                          isMenuOpen && "text-white bg-gradient-to-r from-accent-orange to-orange-500 shadow-lg transform scale-105"
                        )}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {item.name}
                        <ChevronDown className={cn(
                          "ml-2 w-4 h-4 transition-transform duration-300",
                          isMenuOpen && "rotate-180"
                        )} />
                      </button>
                      
                      <div 
                        className={cn(
                          "absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[820px] rounded-2xl shadow-2xl border border-neutral-100 bg-white/95 backdrop-blur-sm p-8 transform transition-all duration-300 ease-in-out",
                          isMenuOpen 
                            ? "opacity-100 visible pointer-events-auto scale-100" 
                            : "opacity-0 invisible pointer-events-none scale-95"
                        )}
                        style={{ zIndex: 999 }}
                      >
                        <div className="grid grid-cols-3 gap-12">
                          {item.megaMenu.sections.map((section) => (
                            <div key={section.title} className="space-y-1">
                              <h4 className="font-bold text-text-primary mb-6 text-sm uppercase tracking-wider text-neutral-800 border-b-2 border-gradient-to-r from-accent-orange to-orange-400 pb-3 bg-gradient-to-r from-accent-orange to-orange-500 bg-clip-text text-transparent">
                                {section.title}
                              </h4>
                              <div className="space-y-2">
                                {section.links.map((link) => (
                                  <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block group/item"
                                  >
                                    <div className="px-4 py-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:via-amber-25 hover:to-yellow-50 transition-all duration-300 border border-transparent hover:border-orange-100 hover:shadow-lg hover:transform hover:scale-102 min-h-[70px] flex flex-col justify-center">
                                      <div className="font-semibold text-text-primary group-hover/item:text-accent-orange text-sm leading-tight transition-colors">
                                        {link.name}
                                      </div>
                                      {(link as any).desc && (
                                        <div className="text-xs text-text-secondary group-hover/item:text-orange-600 mt-2 leading-relaxed transition-colors">
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
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 whitespace-nowrap shadow-sm border border-transparent",
                        location === item.href
                          ? "text-white bg-gradient-to-r from-accent-orange to-orange-500 shadow-lg transform scale-105"
                          : "text-text-primary hover:text-accent-orange hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:border-orange-200 hover:shadow-md hover:transform hover:scale-102"
                      )}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
            
            {secondaryNavigation.filter(item => ['Команда', 'Контакты', 'Отзывы'].includes(item.name)).map((item) => {
              const IconComponent = item.icon ? {
                'Users': Users, 'Info': BookOpen, 'Star': Users, 'BookOpen': BookOpen, 'Phone': Phone
              }[item.icon] || Home : Home;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 whitespace-nowrap shadow-sm border border-transparent",
                    location === item.href
                      ? "text-white bg-gradient-to-r from-accent-orange to-orange-500 shadow-lg transform scale-105"
                      : "text-text-primary hover:text-accent-orange hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:border-orange-200 hover:shadow-md hover:transform hover:scale-102"
                  )}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}

            {/* Cart Button - Desktop */}
            <Link href="/cart" className="relative ml-4">
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

          {/* Mobile Navigation - Show on smaller screens */}
          <div className="lg:hidden flex items-center justify-between flex-1 ml-4">
            {/* Mobile Menu Items */}
            <div className="flex items-center space-x-1 overflow-x-auto flex-1 mr-2">
              {mainNavigation.slice(0, 2).map((item) => {
                const IconComponent = item.icon ? {
                  'TrendingUp': TrendingUp, 'Key': Key, 'Users': Users, 'BookOpen': BookOpen, 'Phone': Phone, 'ShoppingCart': ShoppingCart, 'Grid3X3': Grid3X3
                }[item.icon] || Home : Home;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-2 py-1 text-xs font-medium rounded-md transition-all duration-200 whitespace-nowrap flex-shrink-0",
                      location === item.href
                        ? "text-white bg-accent-orange shadow-lg"
                        : "text-text-primary hover:text-accent-orange hover:bg-orange-50"
                    )}
                  >
                    {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
                    {item.name}
                  </Link>
                );
              })}
              
              {/* More button for remaining items */}
              <button className="flex items-center px-2 py-1 text-xs font-medium rounded-md text-text-primary hover:text-accent-orange hover:bg-orange-50 transition-all duration-200 whitespace-nowrap flex-shrink-0">
                <MoreHorizontal className="w-3 h-3 mr-1" />
                Ещё
              </button>
            </div>

            {/* Cart Button - Mobile */}
            <Link href="/cart" className="relative flex-shrink-0 ml-2">
              <Button variant="outline" size="sm" className="relative rounded-lg border-neutral-300 hover:border-accent-orange hover:text-accent-orange transition-colors h-8 w-8 p-0">
                <ShoppingCart className="h-3 w-3" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-accent-orange text-white text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

        </nav>

        {/* Mobile Bottom Navigation Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg mobile-nav-safe">
          <div className="flex items-center justify-around py-2 px-1 max-w-full">
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
                <button onClick={() => setActiveSubmenu(null)} className="text-gray-400 hover:text-gray-600" aria-label="Закрыть меню покупки недвижимости">
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
                <button onClick={() => setActiveSubmenu(null)} className="text-gray-400 hover:text-gray-600" aria-label="Закрыть меню услуг">
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
