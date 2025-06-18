import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Phone, Mail, Clock, ChevronDown } from "lucide-react";
import { COMPANY_NAME, COMPANY_TAGLINE, PHONE_NUMBER, EMAIL, WORKING_HOURS } from "@/lib/constants";

const Header = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
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
        { title: "Вторичная недвижимость", href: "/secondary" },
      ],
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
        { title: "Юридическая проверка", href: "/services/legal-check" },
        { title: "Сопровождение сделки", href: "/services/transaction-support" },
        { title: "Все услуги", href: "/services" },
      ],
    },
    { title: "О нас", href: "/about" },
    { title: "Блог", href: "/blog" },
    { title: "Контакты", href: "/contacts" },
  ];

  return (
    <header className={`bg-white border-b border-neutral-200 sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? "shadow-lg" : ""
    }`}>
      {/* Top Contact Bar - Desktop Only */}
      <div className="hidden lg:block border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-sm text-text-secondary">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-accent-orange" />
                {PHONE_NUMBER}
              </span>
              <span className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-accent-orange" />
                {EMAIL}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-accent-orange" />
                {WORKING_HOURS}
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
              <div className="text-xl font-bold text-yandex-black">{COMPANY_NAME}</div>
              <div className="text-xs text-text-secondary">{COMPANY_TAGLINE}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
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
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              {item.dropdown.slice(0, 6).map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  className="block py-2 text-sm text-text-secondary hover:text-accent-orange transition-colors"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                            <div className="border-t border-neutral-200 pt-3">
                              {item.dropdown.slice(6).map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
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
                            {item.dropdown.slice(0, -1).map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
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
                                {item.dropdown[item.dropdown.length - 1].title} →
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
                      location === item.href ? "text-accent-orange" : "text-text-primary hover:text-accent-orange"
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
            <Button className="bg-accent-orange hover:bg-orange-600 text-white">
              Оценить недвижимость
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yandex-yellow rounded-lg flex items-center justify-center mr-3">
                    <Home className="text-yandex-black text-lg" />
                  </div>
                  <div>
                    <div className="font-bold text-yandex-black">{COMPANY_NAME}</div>
                    <div className="text-xs text-text-secondary">{COMPANY_TAGLINE}</div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  {navigationItems.map((item, index) => (
                    <div key={index}>
                      <Link
                        href={item.href}
                        className="block py-2 font-medium text-text-primary hover:text-accent-orange transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                      {item.dropdown && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="block py-1 text-sm text-text-secondary hover:text-accent-orange transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <Button className="w-full bg-accent-orange hover:bg-orange-600 text-white">
                    Оценить недвижимость
                  </Button>
                </div>

                <div className="border-t pt-6 space-y-3">
                  <div className="flex items-center text-sm text-text-secondary">
                    <Phone className="w-4 h-4 mr-2 text-accent-orange" />
                    {PHONE_NUMBER}
                  </div>
                  <div className="flex items-center text-sm text-text-secondary">
                    <Mail className="w-4 h-4 mr-2 text-accent-orange" />
                    {EMAIL}
                  </div>
                  <div className="flex items-center text-sm text-text-secondary">
                    <Clock className="w-4 h-4 mr-2 text-accent-orange" />
                    {WORKING_HOURS}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;
