import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Политика конфиденциальности - Риэлтор в СПб";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Политика конфиденциальности агентства недвижимости Риэлтор в СПб. Защита персональных данных клиентов.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-text-primary mb-8">
            Политика конфиденциальности
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-text-secondary mb-6">
              Последнее обновление: 19 июня 2025 года
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                1. Общие положения
              </h2>
              <p className="text-text-secondary mb-4">
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты 
                информации о физических лицах, пользующихся услугами агентства недвижимости 
                "Риэлтор в СПб" (далее — "Компания").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                2. Сбор персональных данных
              </h2>
              <p className="text-text-secondary mb-4">
                Мы собираем следующие персональные данные:
              </p>
              <ul className="list-disc pl-6 text-text-secondary mb-4">
                <li>Имя и фамилия</li>
                <li>Номер телефона</li>
                <li>Адрес электронной почты</li>
                <li>Информация о недвижимости</li>
                <li>Предпочтения по поиску недвижимости</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                3. Цели обработки данных
              </h2>
              <p className="text-text-secondary mb-4">
                Персональные данные используются для:
              </p>
              <ul className="list-disc pl-6 text-text-secondary mb-4">
                <li>Предоставления услуг по недвижимости</li>
                <li>Связи с клиентами</li>
                <li>Отправки релевантных предложений</li>
                <li>Улучшения качества обслуживания</li>
                <li>Выполнения договорных обязательств</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                4. Защита данных
              </h2>
              <p className="text-text-secondary mb-4">
                Компания принимает все необходимые технические и организационные меры 
                для защиты персональных данных от неправомерного доступа, изменения, 
                раскрытия или уничтожения.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                5. Права субъектов данных
              </h2>
              <p className="text-text-secondary mb-4">
                Вы имеете право:
              </p>
              <ul className="list-disc pl-6 text-text-secondary mb-4">
                <li>Получать информацию об обработке ваших данных</li>
                <li>Требовать исправления неточных данных</li>
                <li>Требовать удаления данных</li>
                <li>Отозвать согласие на обработку</li>
                <li>Обратиться с жалобой в надзорный орган</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                6. Сроки хранения
              </h2>
              <p className="text-text-secondary mb-4">
                Персональные данные хранятся не дольше, чем это необходимо для 
                достижения целей обработки, но не более 5 лет с момента последнего 
                взаимодействия с клиентом.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                7. Контактная информация
              </h2>
              <p className="text-text-secondary mb-4">
                По вопросам обработки персональных данных обращайтесь:
              </p>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <p className="text-text-secondary">
                  <strong>Телефон:</strong> +7 (812) 123-45-67<br />
                  <strong>Email:</strong> privacy@realtorvspb.ru<br />
                  <strong>Адрес:</strong> Санкт-Петербург, Невский пр., д. 1
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}