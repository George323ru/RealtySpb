import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    // You can implement callback functionality here
    window.location.href = 'tel:+78121234567';
  };

  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 z-40 transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <Button
        onClick={handleClick}
        className="bg-accent-orange hover:bg-accent-orange/90 text-text-primary px-6 py-4 rounded-full shadow-lg flex items-center space-x-2"
      >
        <Phone className="w-5 h-5" />
        <span className="hidden sm:inline">Обратный звонок</span>
      </Button>
    </div>
  );
}
