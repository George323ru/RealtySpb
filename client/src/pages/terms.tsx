import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    document.title = "Пользовательское соглашение - Риэлтор в СПб";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Пользовательское соглашение сайта агентства недвижимости Риэлтор в СПб. Условия использования сервиса.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Пользовательское соглашение
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Последнее обновление: 19 июня 2025 года
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Общие положения
              </h2>
              <p className="text-muted-foreground mb-4">
                Настоящее Пользовательское соглашение регулирует отношения между 
                агентством недвижимости "Риэлтор в СПб" и пользователями сайта 
                realtorvspb.ru при использовании наших услуг.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Предмет соглашения
              </h2>
              <p className="text-muted-foreground mb-4">
                Компания предоставляет пользователям доступ к информации о недвижимости 
                и сопутствующих услугах через веб-сайт.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Права и обязанности сторон
              </h2>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Права пользователя:
              </h3>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Получать актуальную информацию о недвижимости</li>
                <li>Пользоваться услугами агентства</li>
                <li>Получать консультации специалистов</li>
                <li>Отказаться от услуг в любое время</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Обязанности пользователя:
              </h3>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Предоставлять достоверную информацию</li>
                <li>Соблюдать условия соглашения</li>
                <li>Не нарушать права третьих лиц</li>
                <li>Своевременно оплачивать оказанные услуги</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Ответственность
              </h2>
              <p className="text-muted-foreground mb-4">
                Компания несет ответственность за качество оказываемых услуг в 
                соответствии с действующим законодательством РФ.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Разрешение споров
              </h2>
              <p className="text-muted-foreground mb-4">
                Все споры решаются путем переговоров. При невозможности достижения 
                соглашения споры рассматриваются в судебном порядке.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Контактная информация
              </h2>
              <div className="bg-background p-4 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Телефон:</strong> +7 (812) 123-45-67<br />
                  <strong>Email:</strong> info@realtorvspb.ru<br />
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