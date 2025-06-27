import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import FavoritesButton from "./FavoritesButton";

export default function TabletHeaderActions() {
  return (
    <div className="hidden lg:flex xl:hidden items-center space-x-4">
      <Button 
        size="sm"
        className="bg-accent-orange text-white hover:bg-accent-orange/90 shadow-lg font-semibold text-sm rounded-xl transition-all duration-300"
        onClick={() => console.log('CTA Clicked')}
      >
        <Phone className="h-4 w-4 mr-2" />
        Звонок
      </Button>
      <FavoritesButton variant="desktop" />
    </div>
  );
} 