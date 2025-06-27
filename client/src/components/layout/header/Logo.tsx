import { Link } from "wouter";
import { Home } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="Главная страница - Риэлтор в СПб">
      <div className="w-12 h-12 bg-yandex-yellow rounded-lg flex items-center justify-center mr-3">
        <Home className="text-yandex-black text-xl" />
      </div>
      <div>
        <div className="text-xl font-bold text-yandex-black">риэлтор в СПБ</div>
        <div className="text-xs text-text-secondary">realtorvspb.ru</div>
      </div>
    </Link>
  );
} 