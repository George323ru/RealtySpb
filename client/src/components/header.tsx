import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Clock, Home, ChevronDown, ShoppingCart, TrendingUp, Key, Users, BookOpen, Building2, Store, Warehouse, Factory } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/CartProvider";

export default function Header() {
  const [location] = useLocation();
  const { getTotalItems } = useCart();

  const navigation = [
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
    },
    { name: "Специалисты", href: "/realtor-constructor", icon: "Users" },
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
          <div className="flex items-center space-x-1">
            {navigation.map((item) => {
              const IconComponent = item.icon === 'TrendingUp' ? TrendingUp :
                                 item.icon === 'Key' ? Key :
                                 item.icon === 'Users' ? Users :
                                 item.icon === 'BookOpen' ? BookOpen :
                                 item.icon === 'Phone' ? Phone : null;
              
              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap hover:scale-105",
                      location === item.href
                        ? "text-white bg-accent-orange shadow-lg"
                        : "text-text-primary hover:text-accent-orange hover:bg-orange-50"
                    )}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                    {item.name}
                    {(item.dropdown || item.megaMenu) && <ChevronDown className="ml-1 w-3 h-3" />}
                  </Link>
                  
                  {/* Mega Menu for "Купить" */}
                  {item.megaMenu && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-xl mt-2 py-6 w-[600px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-neutral-200">
                      <div className="px-6">
                        <div className="grid grid-cols-3 gap-6">
                          {item.megaMenu.sections.map((section, idx) => (
                            <div key={idx}>
                              <h4 className="font-semibold text-text-primary mb-3 text-sm uppercase tracking-wide">
                                {section.title}
                              </h4>
                              <div className="space-y-2">
                                {section.links.map((link) => (
                                  <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block group/item"
                                  >
                                    <div className="px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors">
                                      <div className="font-medium text-text-primary group-hover/item:text-accent-orange text-sm">
                                        {link.name}
                                      </div>
                                      <div className="text-xs text-text-secondary mt-1">
                                        {link.desc}
                                      </div>
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
                  
                  {/* Regular Dropdown */}
                  {item.dropdown && (
                    <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg mt-2 py-3 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-neutral-200">
                      <div className="px-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-3 py-2 text-sm text-text-secondary hover:text-accent-orange hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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


        </nav>
      </div>
    </header>
  );
}
