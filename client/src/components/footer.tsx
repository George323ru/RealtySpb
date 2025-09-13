import { Link } from "wouter";
import { Home, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-accent-gray rounded-lg flex items-center justify-center mr-3">
                <Home className="text-card-foreground text-xl" />
              </div>
              <div>
                <div className="text-xl font-bold text-card-foreground">СПБ Недвижимость</div>
                <div className="text-sm text-muted-foreground">Профессиональные услуги</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Лидирующее агентство недвижимости в Санкт-Петербурге. Более 15 лет помогаем клиентам решать вопросы с недвижимостью.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://t.me/realtorvspb" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent-gray transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram канал"
              >
                <i className="fab fa-telegram"></i>
              </a>
              <a 
                href="https://wa.me/79211234567" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent-gray transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a 
                href="https://vk.com/realtorvspb" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent-gray transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ВКонтакте"
              >
                <i className="fab fa-vk"></i>
              </a>
              <a 
                href="https://instagram.com/realtorvspb" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent-gray transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Основные услуги</h3>
            <ul className="space-y-3">
              <li><Link href="/buy" className="text-gray-300 hover:text-accent-gray transition-colors">Хочу купить</Link></li>
              <li><Link href="/sell" className="text-gray-300 hover:text-accent-gray transition-colors">Хочу продать</Link></li>
              <li><Link href="/rent" className="text-gray-300 hover:text-accent-gray transition-colors">Хочу сдать</Link></li>
              <li><Link href="/new-buildings" className="text-gray-300 hover:text-accent-gray transition-colors">Новостройки</Link></li>
              <li><Link href="/secondary" className="text-gray-300 hover:text-accent-gray transition-colors">Вторичная недвижимость</Link></li>
              <li><Link href="/buy?type=коммерческая" className="text-gray-300 hover:text-accent-gray transition-colors">Коммерческая недвижимость</Link></li>
            </ul>
          </div>
          
          {/* Additional Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Дополнительные услуги</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-gray-300 hover:text-accent-gray transition-colors">Предпродажная подготовка</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-accent-gray transition-colors">Дизайн-проект</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-accent-gray transition-colors">Ремонт</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-accent-gray transition-colors">Строительство</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-accent-gray transition-colors">Юридическое сопровождение</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-accent-gray transition-colors">Все услуги</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Контакты</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="text-yandex-yellow mr-3 mt-1 w-5 h-5" />
                <div>
                  <div className="font-medium">+7 (812) 123-45-67</div>
                  <div className="text-sm text-gray-400">Круглосуточно</div>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="text-yandex-yellow mr-3 mt-1 w-5 h-5" />
                <div>
                  <div className="font-medium">info@spb-realty.ru</div>
                  <div className="text-sm text-gray-400">Ответим в течение часа</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="text-yandex-yellow mr-3 mt-1 w-5 h-5" />
                <div>
                  <div className="font-medium">Невский проспект, 15</div>
                  <div className="text-sm text-gray-400">БЦ "Северная Столица", 5 этаж</div>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="text-yandex-yellow mr-3 mt-1 w-5 h-5" />
                <div>
                  <div className="font-medium">Пн-Вс: 9:00-21:00</div>
                  <div className="text-sm text-gray-400">Без выходных</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Navigation */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Информация</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-accent-gray transition-colors">О компании</Link></li>
                <li><Link href="/realtor-constructor" className="text-gray-400 hover:text-accent-gray transition-colors">Подобрать специалиста</Link></li>
                <li><Link href="/reviews" className="text-gray-400 hover:text-accent-gray transition-colors">Отзывы клиентов</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-accent-gray transition-colors">Блог</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Покупателям</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/buy" className="text-gray-400 hover:text-accent-gray transition-colors">Каталог объектов</Link></li>
                <li><Link href="/buy" className="text-gray-400 hover:text-accent-gray transition-colors">Поиск по карте</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-accent-gray transition-colors">Ипотечные программы</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-accent-gray transition-colors">Инвестиции в недвижимость</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Продавцам</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sell" className="text-gray-400 hover:text-accent-gray transition-colors">Оценка недвижимости</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-accent-gray transition-colors">Подготовка к продаже</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-accent-gray transition-colors">Маркетинг объекта</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-accent-gray transition-colors">Документооборот</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 СПБ Недвижимость. Все права защищены.
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-accent-gray transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-muted-foreground hover:text-accent-gray transition-colors">Пользовательское соглашение</a>
            <a href="#" className="text-muted-foreground hover:text-accent-gray transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
