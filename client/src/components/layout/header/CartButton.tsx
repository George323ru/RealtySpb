import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";

interface CartButtonProps {
  variant?: 'desktop' | 'mobile';
}

export default function CartButton({ variant = 'desktop' }: CartButtonProps) {
  const { getTotalItems } = useCart();

  if (variant === 'mobile') {
    return (
      <Link href="/cart" className="relative flex-shrink-0 ml-2">
        <Button variant="outline" size="sm" className="relative rounded-lg border-neutral-300 hover:border-accent-orange hover:text-accent-orange transition-colors h-8 w-8 p-0">
          <ShoppingCart className="h-3 w-3" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-accent-orange text-white text-xs">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </Link>
    );
  }

  return (
    <Link href="/cart" className="relative ml-4">
      <Button variant="outline" size="sm" className="relative rounded-lg border-neutral-300 hover:border-accent-orange hover:text-accent-orange transition-colors">
        <ShoppingCart className="h-4 w-4" />
        {getTotalItems() > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent-orange text-white text-xs">
            {getTotalItems()}
          </Badge>
        )}
      </Button>
    </Link>
  );
} 