import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Link } from "wouter";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-6 z-40 animate-fade-in-up">
      <Link href="/contact">
        <Button className="bg-accent-orange text-white hover:bg-orange-600 shadow-lg px-6 py-4 rounded-full flex items-center space-x-2">
          <Phone className="w-5 h-5" />
          <span className="hidden sm:inline">Обратный звонок</span>
        </Button>
      </Link>
    </div>
  );
}
