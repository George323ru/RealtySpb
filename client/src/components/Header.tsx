import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Clock } from "lucide-react";
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

  const mainNavItems = [
    { title: "Купить", href: "/buy" },
    { title: "Продать", href: "/sell" },
    { title: "Сдать", href: "/rent" },
    { title: "Новостройки", href: "/new-buildings" },
    { title: "Вторичка", href: "/secondary" },
    { title: "Земля", href: "/land" },
    { title: "Услуги", href: "/services" },
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  location === item.href
                    ? "text-accent-orange bg-orange-50"
                    : "text-text-primary hover:text-accent-orange hover:bg-orange-50"
                }`}
              >
                {item.title}
              </Link>
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
              {mainNavItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block py-2 text-text-primary hover:text-accent-orange transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
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