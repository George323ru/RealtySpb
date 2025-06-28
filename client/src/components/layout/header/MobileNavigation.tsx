import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mainNavigation,
  mobileBottomNav,
  secondaryNavigation,
} from "@/config/navigation";
import FavoritesButton from "./FavoritesButton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from ".";

export default function MobileNavigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* --- Top Mobile Bar --- */}
      <div className="lg:hidden flex items-center justify-end flex-1 ml-4 space-x-2">
        {/* Call Button */}
        <Button
          asChild
          size="icon"
          className="bg-accent-orange text-white hover:bg-accent-orange/90 rounded-lg h-8 w-8"
        >
          <a href="tel:+78121234567" aria-label="Позвонить">
            <Phone className="h-4 w-4" />
          </a>
        </Button>

        {/* Favorites */}
        <FavoritesButton variant="mobile" />

        {/* --- Hamburger Menu (Sheet) --- */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              aria-label="Открыть меню"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <ScrollArea className="h-full">
              <div className="p-6">
                <Logo onClick={() => setIsOpen(false)} />
              </div>

              <div className="flex flex-col space-y-2 p-4">
                {[...mainNavigation, ...secondaryNavigation].map(item => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      asChild
                      className="justify-start"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={item.href}>
                        {Icon && <Icon className="mr-2 h-4 w-4" />}
                        {item.name}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* --- Bottom Mobile Navigation Bar --- */}
      <div 
        data-mobile-nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg" 
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center justify-around px-1 max-w-full h-[64px]">
          {mobileBottomNav.map(item => {
            const IconComponent = item.icon;
            const isActive = location === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center p-1 transition-all duration-200 min-w-0',
                  isActive ? 'text-accent-orange' : 'text-gray-600'
                )}
              >
                {IconComponent && <IconComponent className="w-5 h-5 mb-0.5" />}
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
} 