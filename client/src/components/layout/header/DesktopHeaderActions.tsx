import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartButton from "./CartButton";

export default function DesktopHeaderActions() {
  return (
    <div className="hidden lg:flex items-center space-x-3">
      <Button 
        className="bg-accent-orange text-white hover:bg-accent-orange/90 shadow-lg font-semibold px-6 py-2.5 text-sm rounded-xl transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105"
        onClick={() => console.log('CTA Clicked')}
      >
        <Phone className="w-4 h-4 mr-2" />
        Бесплатная консультация
      </Button>
      <CartButton variant="desktop" />
    </div>
  );
} 