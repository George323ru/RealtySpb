import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, Phone, Mail, Clock } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      title: "Хочу купить",
      href: "/buy",
      dropdown: [
        { title: "Квартиры", href: "/buy?type=apartment" },
        { title: "Дома", href: "/buy?type=house" },
        { title: "Коммерческая", href: "/buy?type=commercial" },
        { title: "Земля", href: "/buy?type=land" },
        { title: "Гаражи", href: "/buy?type=garage" },
        { title: "Машиноместа", href: "/buy?type=parking" },
        { title: "Новостройки", href: "/new-buildings" },
        { title: "Вторичная недвижимость", href: "/secondary" }
      ]
    },
    { title: "Хочу продать", href: "/sell" },
    { title: "Хочу сдать", href: "/rent" },
    {
      title: "Услуги",
      href: "/services",
      dropdown: [
        { title: "Предпродажная подготовка", href: "/services/pre-sale-preparation" },
        { title: "Дизайн-проект", href: "/services/design-project" },
        { title: "Ремонт", href: "/services/renovation" },
        { title: "Строительство", href: "/services/construction" },
        { title: "Юридическая проверка", href: "/services/legal-verification" },
        { title: "Сопровождение сделки", href: "/services/transaction-support" },
        { title: "Все услуги →", href: "/services" }
      ]
    },
    { title: "Подбор специалиста", href: "/realtor-constructor" },
    { title: "Калькулятор ипотеки", href: "/calculator" },
    { title: "О нас", href: "/about" },
    { title: "Блог", href: "/blog" },
    { title: "Контакты", href: "/contact" }
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.title} className="relative group">
                {item.dropdown ? (
                  <>
                    <button className="flex items-center py-2 text-text-primary hover:text-accent-orange transition-colors font-medium">
                      {item.title}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-2 py-4 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="px-6 py-2">
                        {item.title === "Хочу купить" && (
                          <>
                            <h3 className="font-semibold text-text-primary mb-3">Тип недвижимости</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {item.dropdown.slice(0, 6).map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="block py-2 text-sm text-text-secondary hover:text-accent-orange transition-colors"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                            <div className="border-t border-neutral-200 mt-3 pt-3">
                              {item.dropdown.slice(6).map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="block py-1 text-sm font-medium text-accent-orange hover:underline"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                        {item.title === "Услуги" && (
                          <>
                            {item.dropdown.slice(0, -1).map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="block py-2 text-sm text-text-secondary hover:text-accent-orange transition-colors"
                              >
                                {subItem.title}
                              </Link>
                            ))}
                            <div className="border-t border-neutral-200 mt-2 pt-2">
                              <Link
                                href={item.dropdown[item.dropdown.length - 1].href}
                                className="block py-1 text-sm font-medium text-accent-orange hover:underline"
                              >
                                {item.dropdown[item.dropdown.length - 1].title}
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`py-2 font-medium transition-colors ${
                      location === item.href
                        ? "text-accent-orange"
                        : "text-text-primary hover:text-accent-orange"
                    }`}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/sell">
              <Button className="bg-accent-orange text-white hover:bg-orange-600">
                Оценить недвижимость
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 py-4">
            <div className="space-y-4">
              {navItems.map((item) => (
                <div key={item.title}>
                  <Link
                    href={item.href}
                    className="block py-2 text-text-primary hover:text-accent-orange transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 space-y-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block py-1 text-sm text-text-secondary hover:text-accent-orange transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-neutral-200">
                <Link href="/sell" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-accent-orange text-white hover:bg-orange-600">
                    Оценить недвижимость
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
