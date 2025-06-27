import { useState } from "react";
import { Link, useLocation } from "wouter";
import { MoreHorizontal, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavigation, mobileBottomNav, mobileBuySubmenu, services } from "@/config/navigation";
import CartButton from "./CartButton";
import { Button } from "@/components/ui/button";

export default function MobileNavigation() {
  const [location] = useLocation();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <>
      {/* Mobile Top Navigation */}
      <div className="lg:hidden flex items-center justify-between flex-1 ml-4">
        <div className="flex items-center space-x-1 overflow-x-auto flex-1 mr-2">
          {mainNavigation.slice(0, 2).map((item) => {
            const IconComponent = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-2 py-1 text-xs font-medium rounded-md transition-all duration-200 whitespace-nowrap flex-shrink-0",
                  location === item.href
                    ? "text-white bg-accent-orange shadow-lg"
                    : "text-text-primary hover:text-accent-orange hover:bg-orange-50"
                )}
              >
                {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
                {item.name}
              </Link>
            );
          })}
          
          <button className="flex items-center px-2 py-1 text-xs font-medium rounded-md text-text-primary hover:text-accent-orange hover:bg-orange-50 transition-all duration-200 whitespace-nowrap flex-shrink-0">
            <MoreHorizontal className="w-3 h-3 mr-1" />
            Ещё
          </button>
        </div>

        {/* Иконки действий */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button 
            size="icon"
            className="bg-accent-orange text-white hover:bg-accent-orange/90 rounded-lg h-8 w-8"
            onClick={() => console.log('CTA Clicked')}
          >
            <Phone className="h-4 w-4" />
          </Button>
          <CartButton variant="mobile" />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg mobile-nav-safe">
        <div className="flex items-center justify-around py-2 px-1 max-w-full">
          {mobileBottomNav.map((item) => {
            const IconComponent = item.icon;
            const isActive = location === item.href;

            if (item.hasSubmenu) {
              const submenuKey = item.name === 'Купить' ? 'buy' : 'services';
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveSubmenu(activeSubmenu === submenuKey ? null : submenuKey)}
                  className={cn(
                    "flex flex-col items-center justify-center p-1 transition-all duration-200 min-w-0",
                    activeSubmenu === submenuKey ? "text-accent-orange" : "text-gray-600"
                  )}
                >
                  <IconComponent className="w-5 h-5 mb-0.5" />
                  <span className="text-xs font-medium">{item.name}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center p-1 transition-all duration-200 min-w-0",
                  isActive ? "text-accent-orange" : "text-gray-600"
                )}
              >
                <IconComponent className="w-5 h-5 mb-0.5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Buy Submenu */}
      {activeSubmenu === 'buy' && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setActiveSubmenu(null)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Купить недвижимость</h3>
              <button 
                onClick={() => setActiveSubmenu(null)} 
                className="text-gray-400 hover:text-gray-600" 
                aria-label="Закрыть меню покупки недвижимости"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mobileBuySubmenu.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    onClick={() => setActiveSubmenu(null)} 
                    className="flex flex-col items-center p-4 bg-neutral-50 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    <IconComponent className="w-8 h-8 mb-2 text-accent-orange" />
                    <span className="text-sm font-medium text-text-primary text-center">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Services Submenu */}
      {activeSubmenu === 'services' && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setActiveSubmenu(null)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Услуги</h3>
              <button 
                onClick={() => setActiveSubmenu(null)} 
                className="text-gray-400 hover:text-gray-600" 
                aria-label="Закрыть меню услуг"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-2">
              {services.map((service) => (
                <Link 
                  key={service.href} 
                  href={service.href} 
                  onClick={() => setActiveSubmenu(null)} 
                  className="flex items-center p-3 hover:bg-neutral-50 rounded-lg transition-colors"
                >
                  <span className="text-lg mr-3">{service.icon}</span>
                  <span className="font-medium text-text-primary">{service.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 