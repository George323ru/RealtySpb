import { Link, useLocation } from "wouter";
import { Home, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavigation, secondaryNavigation } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Элементы для планшетной версии
const tabletVisibleItems = mainNavigation.slice(0, 2); // "Купить", "Продать"
const tabletMoreItems = [
  ...mainNavigation.slice(2),
  ...secondaryNavigation.filter(item =>
    ['Команда', 'Отзывы', 'Контакты'].includes(item.name)
  ),
];

export default function TabletNavigation() {
  const [location] = useLocation();

  return (
    <nav className="hidden lg:flex xl:hidden items-center justify-center space-x-1">
      {tabletVisibleItems.map(item => {
        const IconComponent = item.icon || Home;
        const isActive = location === item.href;
        return (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            asChild
            className={cn(
              'flex items-center text-sm whitespace-nowrap',
              isActive && 'text-accent-orange bg-orange-50'
            )}
          >
            <Link href={item.href}>
              {IconComponent && IconComponent !== Home && <IconComponent className="w-4 h-4 mr-2" />}
              {item.name}
            </Link>
          </Button>
        );
      })}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-sm whitespace-nowrap"
          >
            <MoreHorizontal className="w-4 h-4 mr-2" />
            Ещё
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {tabletMoreItems.map(item => {
            const IconComponent = item.icon || Home;
            return (
              <DropdownMenuItem key={item.name} asChild>
                <Link href={item.href}>
                  {IconComponent && IconComponent !== Home && <IconComponent className="w-4 h-4 mr-2" />}
                  {item.name}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
} 