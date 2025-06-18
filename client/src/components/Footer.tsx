import { Link } from "wouter";
import { CONTACT_INFO } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-yandex-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-yandex-yellow rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-home text-yandex-black text-xl"></i>
              </div>
              <div>
                <div className="text-xl font-bold">СПБ Недвижимость</div>
                <div className="text-sm text-gray-400">Профессиональные услуги</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Лидирующее агентство недвижимости в Санкт-Петербурге. Более 15 лет помогаем клиентам решать вопросы с недвижимостью.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent-orange transition-colors">
                <i className="fab fa-telegram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent-orange transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent-orange transition-colors">
                <i className="fab fa-vk"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent-orange transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Основные услуги</h3>
            <ul className="space-y-3">
              <li><Link href="/buy" className="text-gray-300 hover:text-yandex-yellow transition-colors">Хочу купить</Link></li>
              <li><Link href="/sell" className="text-gray-300 hover:text-yandex-yellow transition-colors">Хочу продать</Link></li>
              <li><Link href="/rent" className="text-gray-300 hover:text-yandex-yellow transition-colors">Хочу сдать</Link></li>
              <li><Link href="/new-buildings" className="text-gray-300 hover:text-yandex-yellow transition-colors">Новостройки</Link></li>
              <li><Link href="/secondary" className="text-gray-300 hover:text-yandex-yellow transition-colors">Вторичная недвижимость</Link></li>
              <li><Link href="/buy?type=commercial" className="text-gray-300 hover:text-yandex-yellow transition-colors">Коммерческая недвижимость</Link></li>
            </ul>
          </div>
          
          {/* Additional Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Дополнительные услуги</h3>
            <ul className="space-y-3">
              <li><Link href="/services/pre-sale-preparation" className="text-gray-300 hover:text-yandex-yellow transition-colors">Предпродажная подготовка</Link></li>
              <li><Link href="/services/design-project" className="text-gray-300 hover:text-yandex-yellow transition-colors">Дизайн-проект</Link></li>
              <li><Link href="/services/renovation" className="text-gray-300 hover:text-yandex-yellow transition-colors">Ремонт</Link></li>
              <li><Link href="/services/construction" className="text-gray-300 hover:text-yandex-yellow transition-colors">Строительство</Link></li>
              <li><Link href="/services/legal-verification" className="text-gray-300 hover:text-yandex-yellow transition-colors">Юридическое сопровождение</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-yandex-yellow transition-colors">Все услуги</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Контакты</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-yandex-yellow mr-3 mt-1" />
                <div>
                  <div className="font-medium">{CONTACT_INFO.phone}</div>
                  <div className="text-sm text-gray-400">Круглосуточно</div>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-yandex-yellow mr-3 mt-1" />
                <div>
                  <div className="font-medium">{CONTACT_INFO.email}</div>
                  <div className="text-sm text-gray-400">Ответим в течение часа</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-yandex-yellow mr-3 mt-1" />
                <div>
                  <div className="font-medium">Невский проспект, 15</div>
                  <div className="text-sm text-gray-400">БЦ "Северная Столица", 5 этаж</div>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-yandex-yellow mr-3 mt-1" />
                <div>
                  <div className="font-medium">{CONTACT_INFO.workingHours}</div>
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
                <li><Link href="/about" className="text-gray-400 hover:text-yandex-yellow transition-colors">О компании</Link></li>
                <li><Link href="/team" className="text-gray-400 hover:text-yandex-yellow transition-colors">Наша команда</Link></li>
                <li><Link href="/reviews" className="text-gray-400 hover:text-yandex-yellow transition-colors">Отзывы клиентов</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-yandex-yellow transition-colors">Блог</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Покупателям</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/buy" className="text-gray-400 hover:text-yandex-yellow transition-colors">Каталог объектов</Link></li>
                <li><Link href="/new-buildings" className="text-gray-400 hover:text-yandex-yellow transition-colors">Новостройки</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-yandex-yellow transition-colors">Ипотечные программы</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yandex-yellow transition-colors">Инвестиции в недвижимость</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Продавцам</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sell" className="text-gray-400 hover:text-yandex-yellow transition-colors">Оценка недвижимости</Link></li>
                <li><Link href="/services/pre-sale-preparation" className="text-gray-400 hover:text-yandex-yellow transition-colors">Подготовка к продаже</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-yandex-yellow transition-colors">Маркетинг объекта</a></li>
                <li><Link href="/services/transaction-support" className="text-gray-400 hover:text-yandex-yellow transition-colors">Документооборот</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 СПБ Недвижимость. Все права защищены.
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-yandex-yellow transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-gray-400 hover:text-yandex-yellow transition-colors">Пользовательское соглашение</a>
            <a href="#" className="text-gray-400 hover:text-yandex-yellow transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
