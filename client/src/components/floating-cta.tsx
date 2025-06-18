import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import ConsultationForm from "./consultation-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-accent-orange hover:bg-orange-600 text-white px-6 py-4 rounded-full shadow-lg flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span className="hidden sm:inline">Обратный звонок</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <ConsultationForm 
            title="Заказать обратный звонок"
            description="Оставьте ваш номер телефона и мы перезвоним в течение 15 минут"
            onSuccess={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FloatingCTA;
