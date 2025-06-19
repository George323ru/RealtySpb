import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Percent, Gift, Star } from "lucide-react";
import type { Promotion } from "@shared/schema";

interface PromotionBannerProps {
  promotions: Promotion[];
  category?: string;
  className?: string;
}

export default function PromotionBanner({ promotions, category = "all", className = "" }: PromotionBannerProps) {
  // Фильтруем акции по категории
  const relevantPromotions = promotions.filter(promo => 
    promo.isActive && (promo.category === category || promo.category === "all")
  ).sort((a, b) => b.priority - a.priority);

  if (relevantPromotions.length === 0) {
    return null;
  }

  const mainPromotion = relevantPromotions[0];
  
  const getDiscountIcon = (type: string) => {
    switch (type) {
      case 'percentage':
        return <Percent className="w-5 h-5" />;
      case 'fixed':
        return <Gift className="w-5 h-5" />;
      case 'special':
        return <Star className="w-5 h-5" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };

  const formatValidUntil = (date: Date | null) => {
    if (!date) return null;
    const now = new Date();
    const validDate = new Date(date);
    const diffTime = validDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return "Заканчивается сегодня";
    if (diffDays === 1) return "Осталось 1 день";
    if (diffDays <= 3) return `Осталось ${diffDays} дня`;
    if (diffDays <= 7) return `Осталось ${diffDays} дней`;
    
    return validDate.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Main Promotion */}
      <div 
        className="relative p-8 text-white"
        style={{ backgroundColor: mainPromotion.backgroundColor }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-current"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full border border-current"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-current"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                {getDiscountIcon(mainPromotion.discountType)}
                <Badge 
                  className="ml-3 bg-white/20 text-white border-white/30"
                  style={{ color: mainPromotion.textColor }}
                >
                  Акция
                </Badge>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: mainPromotion.textColor }}>
                {mainPromotion.title}
              </h2>
              
              <p className="text-lg opacity-90 mb-4" style={{ color: mainPromotion.textColor }}>
                {mainPromotion.description}
              </p>

              {mainPromotion.discountValue && (
                <div className="flex items-center mb-4">
                  <span className="text-5xl font-extrabold mr-2" style={{ color: mainPromotion.textColor }}>
                    {mainPromotion.discountValue}
                  </span>
                  <span className="text-lg opacity-80" style={{ color: mainPromotion.textColor }}>
                    скидка
                  </span>
                </div>
              )}

              {mainPromotion.validUntil && (
                <div className="flex items-center mb-6 opacity-90">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm" style={{ color: mainPromotion.textColor }}>
                    {formatValidUntil(mainPromotion.validUntil)}
                  </span>
                </div>
              )}

              <Button 
                className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
                size="lg"
              >
                {mainPromotion.buttonText}
              </Button>
            </div>

            {mainPromotion.discountValue && (
              <div className="hidden lg:block">
                <div className="text-right">
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="text-6xl font-black mb-2" style={{ color: mainPromotion.textColor }}>
                      {mainPromotion.discountValue}
                    </div>
                    <div className="text-sm opacity-80" style={{ color: mainPromotion.textColor }}>
                      Экономия
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Promotions */}
      {relevantPromotions.length > 1 && (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4">
          <div className="flex items-center space-x-4 overflow-x-auto">
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
              Другие акции:
            </span>
            {relevantPromotions.slice(1, 4).map((promo) => (
              <Badge 
                key={promo.id} 
                variant="outline" 
                className="whitespace-nowrap bg-white hover:bg-gray-50 cursor-pointer"
              >
                {promo.discountValue} — {promo.title}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}