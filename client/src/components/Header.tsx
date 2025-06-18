import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, ChevronDown } from "lucide-react";
import { CONTACT_INFO, SERVICES } from "@/lib/constants";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [location] = useLocation();
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (showServicesDropdown && !(event.target as Element).closest('.services-dropdown')) {
        setShowServicesDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showServicesDropdown]);

  const mainNavItems = [
    { title: "Купить", href: "/buy" },
    { title: "Продать", href: "/sell" },
    { title: "Сдать", href: "/rent" },
    { title: "Новостройки", href: "/new-buildings" },
    { title: "Вторичка", href: "/secondary" },
    { title: "Земля", href: "/land" },
    { title: "Специалист", href: "/realtor-constructor" },
    { title: "Калькулятор", href: "/calculator" },
    { title: "О нас", href: "/about" },
    { title: "Блог", href: "/blog" },
    { title: "Контакты", href: "/contacts" }
  ];



  return (
    <header
      className={`bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50 transition-all duration-300 ${
        isSticky ? "header-sticky" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Contact Bar */}
        <div className="hidden lg:flex justify-between items-center py-2 text-sm text-text-secondary border-b border-neutral-200">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-accent-orange" />
              {CONTACT_INFO.phone}
            </span>
            <span className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-accent-orange" />
              {CONTACT_INFO.email}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-accent-orange" />
              {CONTACT_INFO.workingHours}
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

        {/* Main Navigation */}
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            <div className="w-12 h-12 bg-yandex-yellow rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-home text-yandex-black text-xl"></i>
            </div>
            <div>
              <div className="text-xl font-bold text-yandex-black">СПБ Недвижимость</div>
              <div className="text-xs text-text-secondary">Профессиональные услуги</div>
            </div>
          </Link>

          {/* Always Visible Navigation */}
          <div className="flex items-center space-x-1 overflow-x-auto flex-1 mx-4">
            {mainNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-colors rounded-lg whitespace-nowrap ${
                  location === item.href
                    ? "text-accent-orange bg-orange-50"
                    : "text-text-primary hover:text-accent-orange hover:bg-orange-50"
                }`}
              >
                {item.title}
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <div className="relative services-dropdown">
              <button
                onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                className={`px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-colors rounded-lg whitespace-nowrap flex items-center space-x-1 ${
                  location.startsWith('/services')
                    ? "text-accent-orange bg-orange-50"
                    : "text-text-primary hover:text-accent-orange hover:bg-orange-50"
                }`}
              >
                <span>Услуги</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {showServicesDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-[700px]">
                  <div className="p-6">
                    <div className="grid grid-cols-4 gap-2">
                      <Link
                        href="/services/pre-sale-preparation"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-2 py-2 text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                      >
                        Предпродажная подготовка
                      </Link>
                      <Link
                        href="/services/design-project"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-2 py-2 text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                      >
                        Дизайн-проект
                      </Link>
                      <Link
                        href="/services/renovation"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-2 py-2 text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                      >
                        Ремонт под ключ
                      </Link>
                      <Link
                        href="/services/construction"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-2 py-2 text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                      >
                        Строительство домов
                      </Link>
                      <Link
                        href="/services/design"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-2 py-2 text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                      >
                        Проектирование
                      </Link>
                      <Link
                        href="/services/engineering-systems"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-2 py-2 text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                      >
                        Инженерные системы
                      </Link>
                      <Link
                        href="/services/landscape-design"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-2 py-2 text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                      >
                        Ландшафтный дизайн
                      </Link>
                      <Link
                        href="/services/legal-check"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-2 py-2 text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                      >
                        Юридическая проверка
                      </Link>
                      <Link
                        href="/services/transaction-support"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-2 py-2 text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                      >
                        Сопровождение сделки
                      </Link>
                      <Link
                        href="/services/property-management"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-2 py-2 text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                      >
                        Управление недвижимостью
                      </Link>
                      <Link
                        href="/services/furniture-selection"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-2 py-2 text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                      >
                        Комплектация мебелью
                      </Link>
                      <Link
                        href="/land"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-2 py-2 text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors whitespace-nowrap"
                      >
                        Земельные участки
                      </Link>
                    </div>
                    
                    {/* All services link - spans full width at bottom */}
                    <div className="border-t border-gray-200 mt-4 pt-3">
                      <Link
                        href="/services"
                        onClick={() => setShowServicesDropdown(false)}
                        className="block px-3 py-2 text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded transition-colors font-medium text-center"
                      >
                        Все услуги →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <Link href="/sell">
              <Button className="bg-accent-orange text-white hover:bg-orange-600 text-xs lg:text-sm px-2 lg:px-4">
                Оценить
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}