import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LeadForm from "@/components/LeadForm";
import { CONTACT_INFO, SERVICE_TYPES } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation } from "lucide-react";

export default function Contact() {
  const [selectedOffice, setSelectedOffice] = useState("main");

  const offices = [
    {
      id: "main",
      name: "Главный офис",
      address: "Невский проспект, 15, БЦ \"Северная Столица\", 5 этаж",
      phone: "+7 (812) 123-45-67",
      email: "info@spb-realty.ru",
      hours: "Пн-Вс: 9:00-21:00",
      coordinates: { lat: 59.9311, lng: 30.3609 }
    },
    {
      id: "vasilievsky",
      name: "Офис на Васильевском острове",
      address: "Средний проспект В.О., 85",
      phone: "+7 (812) 123-45-68",
      email: "vasilievsky@spb-realty.ru",
      hours: "Пн-Пт: 9:00-19:00, Сб: 10:00-17:00",
      coordinates: { lat: 59.9386, lng: 30.2916 }
    },
    {
      id: "primorsky",
      name: "Офис в Приморском районе",
      address: "Комендантский проспект, 17, к.1",
      phone: "+7 (812) 123-45-69",
      email: "primorsky@spb-realty.ru",
      hours: "Пн-Пт: 9:00-19:00, Сб: 10:00-17:00",
      coordinates: { lat: 60.0088, lng: 30.2597 }
    }
  ];

  const currentOffice = offices.find(office => office.id === selectedOffice) || offices[0];

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8 text-blue-500" />,
      title: "Телефон",
      description: "Звоните в любое время",
      value: CONTACT_INFO.phone,
      action: `tel:${CONTACT_INFO.phone}`
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-500" />,
      title: "WhatsApp",
      description: "Быстрые ответы в мессенджере",
      value: CONTACT_INFO.whatsapp,
      action: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`
    },
    {
      icon: <i className="fab fa-telegram text-3xl text-blue-400"></i>,
      title: "Telegram",
      description: "Удобное общение в Telegram",
      value: CONTACT_INFO.telegram,
      action: `https://t.me/${CONTACT_INFO.telegram.replace('@', '')}`
    },
    {
      icon: <Mail className="w-8 h-8 text-purple-500" />,
      title: "Email",
      description: "Подробные вопросы на почту",
      value: CONTACT_INFO.email,
      action: `mailto:${CONTACT_INFO.email}`
    }
  ];

  const faqItems = [
    {
      question: "Какова стоимость ваших услуг?",
      answer: "Стоимость зависит от типа услуги: покупка/продажа - 3% от стоимости сделки, аренда - 50-100% от месячной платы. Консультации и оценка недвижимости бесплатны."
    },
    {
      question: "Сколько времени занимает продажа недвижимости?",
      answer: "В среднем 30-45 дней для квартир в хорошем состоянии. Срок может варьироваться в зависимости от состояния объекта, района и рыночной ситуации."
    },
    {
      question: "Предоставляете ли вы юридическое сопровождение?",
      answer: "Да, мы предоставляем полное юридическое сопровождение сделок, включая проверку документов, составление договоров и регистрацию перехода права собственности."
    },
    {
      question: "Работаете ли вы с ипотекой?",
      answer: "Да, мы сотрудничаем со всеми крупными банками и поможем оформить ипотеку на выгодных условиях. Также консультируем по государственным программам поддержки."
    },
    {
      question: "Можно ли получить консультацию онлайн?",
      answer: "Конечно! Мы проводим онлайн-консультации через Zoom, WhatsApp или Telegram. Также можем организовать виртуальный показ недвижимости."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Свяжитесь с нами 
              <span className="text-yandex-yellow"> прямо сейчас</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Мы готовы ответить на ваши вопросы и помочь решить любые задачи с недвижимостью в Санкт-Петербурге
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-yandex-yellow text-yandex-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold">
                Позвонить сейчас
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                Написать в WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Выберите удобный способ связи
            </h2>
            <p className="text-lg text-text-secondary">
              Отвечаем быстро в любое удобное для вас время
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {method.title}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {method.description}
                  </p>
                  <div className="font-medium text-accent-orange mb-4">
                    {method.value}
                  </div>
                  <a href={method.action}>
                    <Button className="bg-accent-orange text-white hover:bg-orange-600 w-full">
                      Связаться
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Office Info */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <LeadForm 
                title="Получить консультацию"
                description="Оставьте заявку и наш эксперт свяжется с вами в течение 15 минут"
              />
            </div>

            {/* Office Information */}
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-8">
                Наши офисы
              </h2>

              {/* Office Selector */}
              <div className="mb-6">
                <Label htmlFor="office-select">Выберите офис</Label>
                <Select value={selectedOffice} onValueChange={setSelectedOffice}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {offices.map(office => (
                      <SelectItem key={office.id} value={office.id}>
                        {office.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Office Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{currentOffice.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-text-primary">Адрес</div>
                      <div className="text-text-secondary">{currentOffice.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-text-primary">Телефон</div>
                      <a href={`tel:${currentOffice.phone}`} className="text-accent-orange hover:underline">
                        {currentOffice.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-text-primary">Email</div>
                      <a href={`mailto:${currentOffice.email}`} className="text-accent-orange hover:underline">
                        {currentOffice.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent-orange mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-text-primary">Часы работы</div>
                      <div className="text-text-secondary">{currentOffice.hours}</div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-accent-orange text-white hover:bg-orange-600">
                      <Navigation className="w-4 h-4 mr-2" />
                      Построить маршрут
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Как нас найти
            </h2>
            <p className="text-lg text-text-secondary">
              Мы находимся в центре города, удобно добираться на любом транспорте
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center mb-8">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-accent-orange mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Интерактивная карта
              </h3>
              <p className="text-text-secondary">
                Карта с точным расположением наших офисов
              </p>
            </div>
          </div>

          {/* Transport Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-subway text-blue-500 text-xl"></i>
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Метро</h3>
                <p className="text-text-secondary">
                  Невский проспект (2 мин пешком)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-bus text-green-500 text-xl"></i>
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Автобус</h3>
                <p className="text-text-secondary">
                  Остановки: 7, 24, 191 маршруты
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-car text-purple-500 text-xl"></i>
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Парковка</h3>
                <p className="text-text-secondary">
                  Подземная парковка в здании
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Часто задаваемые вопросы
              </h2>
              <p className="text-lg text-text-secondary">
                Ответы на популярные вопросы наших клиентов
              </p>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-3">
                      {item.question}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-text-secondary mb-4">
                Не нашли ответ на свой вопрос?
              </p>
              <Button className="bg-accent-orange text-white hover:bg-orange-600">
                Задать вопрос эксперту
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Срочная консультация
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Нужна помощь прямо сейчас? Звоните по горячей линии - мы работаем 24/7
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${CONTACT_INFO.phone}`}>
              <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <Phone className="w-5 h-5 mr-2" />
                {CONTACT_INFO.phone}
              </Button>
            </a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`}>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
