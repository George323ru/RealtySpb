import { Button } from "@/components/ui/button";
import FavoritesButton from "./FavoritesButton";

export default function DesktopHeaderActions() {
  return (
    <div className="hidden xl:flex items-center space-x-6">
      <Button 
        size="sm"
        className="bg-accent-orange text-white hover:bg-accent-orange/90 shadow-lg font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105"
        onClick={() => console.log('CTA Clicked')}
      >
        Бесплатная консультация
      </Button>
      <FavoritesButton variant="desktop" />
    </div>
  );
} 