import SearchForm from "@/components/SearchForm";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={`relative min-h-screen flex flex-col justify-center py-20 lg:py-24 ${className || ''}`}
      role="banner"
      aria-label="Поиск недвижимости в Санкт-Петербурге - безопасные сделки с экспертами"
    >
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          {/* Floating Badge */}
          <div className="minimal-pill px-6 py-3 mb-8 inline-flex items-center text-sm font-medium">
            ⭐️ Лучшие агенты недвижимости Петербурга
          </div>

          <h1
            className="font-bold leading-tight tracking-tight text-foreground mb-6"
            style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
          >
            Найдем квартиру вашей мечты в сердце Петербурга
          </h1>
          <p
            className="text-muted-foreground leading-relaxed max-w-2xl mb-12"
            style={{ fontSize: 'clamp(18px, 2.2vw, 24px)' }}
          >
            Более 15 лет защищаем ваши интересы и помогаем принять верное финансовое решение. Гарантируем безопасность сделки и экономию вашего времени.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="minimal-pill px-8 py-4 font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
              Подобрать квартиру
            </button>
            <button className="minimal-pill px-8 py-4 font-semibold text-primary bg-secondary hover:bg-secondary/80 transition-colors">
              Узнать стоимость
            </button>
          </div>

          {/* Search Form */}
          <div className="w-full max-w-4xl mb-16">
            <SearchForm />
          </div>

          {/* Info Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
            <div className="minimal-card p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-2">15+</div>
              <div className="text-sm text-muted-foreground">лет опыта</div>
            </div>
            <div className="minimal-card p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">клиентов</div>
            </div>
            <div className="minimal-card p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-2">50+</div>
              <div className="text-sm text-muted-foreground">экспертов</div>
            </div>
            <div className="minimal-card p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">поддержка</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 