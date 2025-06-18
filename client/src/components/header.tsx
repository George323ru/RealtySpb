import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Phone, Mail, Clock, Home, ChevronDown, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/CartProvider";

export default function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const navigation = [
    {
      name: "Хочу купить",
      href: "/buy",
      dropdown: [
        { name: "Квартиры", href: "/buy?type=квартира" },
        { name: "Дома", href: "/buy?type=дом" },
        { name: "Коммерческая", href: "/buy?type=коммерческая" },
        { name: "Земля", href: "/buy?type=земля" },
        { name: "Гаражи", href: "/buy?type=гараж" },
        { name: "Машиноместа", href: "/buy?type=машиноместо" },
        { name: "Новостройки", href: "/new-buildings" },
        { name: "Вторичная недвижимость", href: "/secondary" },
      ]
    },
    { name: "Хочу продать", href: "/sell" },
    { name: "Хочу сдать", href: "/rent" },
    {
      name: "Услуги",
      href: "/services",
      dropdown: [
        { name: "Предпродажная подготовка", href: "/services/1" },
        { name: "Дизайн-проект", href: "/services/2" },
        { name: "Ремонт", href: "/services/3" },
        { name: "Строительство", href: "/services/4" },
        { name: "Юридическая проверка", href: "/services/5" },
        { name: "Сопровождение сделки", href: "/services/6" },
        { name: "Все услуги", href: "/services" },
      ]
    },
    { name: "О нас", href: "/about" },
    { name: "Блог", href: "/blog" },
    { name: "Контакты", href: "/contacts" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      {/* Top Contact Bar - Desktop Only */}
      <div className="hidden lg:block border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-sm text-text-secondary">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-accent-orange" />
                +7 (812) 123-45-67
              </span>
              <span className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-accent-orange" />
                info@spb-realty.ru
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-accent-orange" />
                Пн-Вс: 9:00-21:00
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-accent-orange transition-colors">
                <i className="fab fa-telegram text-lg"></i>
              </a>
              <a href="#" className="hover:text-accent-orange transition-colors">
                <i className="fab fa-whatsapp text-lg"></i>
              </a>
              <a href="#" className="hover:text-accent-orange transition-colors">
                <i className="fab fa-vk text-lg"></i>
              </a>
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
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center py-2 font-medium transition-colors",
                    location === item.href
                      ? "text-accent-orange"
                      : "text-text-primary hover:text-accent-orange"
                  )}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                </Link>
                
                {item.dropdown && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-2 py-4 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="px-6 py-2">
                      <div className="grid grid-cols-2 gap-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block py-2 text-sm text-text-secondary hover:text-accent-orange transition-colors"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cart and CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/contacts">
              <Button className="bg-accent-orange hover:bg-orange-600 text-white">
                Оценить недвижимость
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-2 text-lg font-medium transition-colors",
                        location === item.href
                          ? "text-accent-orange"
                          : "text-text-primary hover:text-accent-orange"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block py-1 text-sm text-text-secondary hover:text-accent-orange transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <Link href="/contacts" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-accent-orange hover:bg-orange-600 text-white">
                      Оценить недвижимость
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
