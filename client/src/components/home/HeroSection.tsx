import SearchForm from "@/components/SearchForm";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=1920')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } as const;

  return (
    <section 
      className={`relative min-h-screen flex flex-col justify-center py-16 sm:py-20 ${className || ''}`} 
      style={heroStyle} 
      role="banner" 
      aria-label="Поиск недвижимости в Санкт-Петербурге - безопасные сделки с экспертами"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white mb-8 sm:mb-12">
          <h1
            className="font-extrabold leading-tight tracking-tight text-white"
            style={{ fontSize: 'clamp(32px, 6vw, 72px)' }}
          >
            Найдем квартиру вашей мечты <span className="text-accent-orange">в сердце Петербурга</span>
          </h1>
          <p
            className="mb-8 font-light text-white/90"
            style={{ fontSize: 'clamp(16px, 2.2vw, 24px)' }}
          >
            Более 15 лет защищаем ваши интересы и помогаем принять верное финансовое решение. Гарантируем безопасность сделки и экономию вашего времени.
          </p>
          <SearchForm className="max-w-5xl mx-auto mt-12" />
        </div>
      </div>
    </section>
  );
} 