import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface FavoritesButtonProps {
  variant?: 'desktop' | 'mobile';
}

export default function FavoritesButton({ variant = 'desktop' }: FavoritesButtonProps) {
  if (variant === 'mobile') {
    return (
      <Link href="/favorites" className="relative flex-shrink-0 ml-2">
        <Button variant="outline" size="sm" className="relative rounded-lg border-neutral-300 hover:border-accent-orange hover:text-accent-orange transition-colors h-8 w-8 p-0">
          <Heart className="h-3 w-3" />
        </Button>
      </Link>
    );
  }

  return (
    <Link href="/favorites" className="relative ml-4">
      <Button variant="outline" size="sm" className="relative rounded-lg border-neutral-300 hover:border-accent-orange hover:text-accent-orange transition-colors">
        <Heart className="h-4 w-4" />
      </Button>
    </Link>
  );
} 