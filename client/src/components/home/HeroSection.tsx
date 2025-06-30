import SearchForm from "@/components/SearchForm";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=1920')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <section 
      className={`relative min-h-screen flex flex-col justify-center py-16 sm:py-20 ${className || ''}`} 
      style={heroStyle} 
      role="banner" 
      aria-label="Поиск недвижимости в Санкт-Петербурге - безопасные сделки с экспертами"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight !text-white" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Найдем квартиру вашей мечты <span className="text-accent-orange" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>в сердце Петербурга</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 font-light opacity-90 !text-white" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
            Более 15 лет защищаем ваши интересы и помогаем принять верное финансовое решение. Гарантируем безопасность сделки и экономию вашего времени.
          </p>
          <SearchForm className="max-w-5xl mx-auto mt-12" />
        </div>
      </div>
    </section>
  );
} 