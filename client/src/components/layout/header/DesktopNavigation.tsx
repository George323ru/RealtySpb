import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavigation, secondaryNavigation } from "@/config/navigation";
import CartButton from "./CartButton";

export default function DesktopNavigation() {
  const [location, setLocation] = useLocation();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMenuEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredMenu(menuName);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 300);
  };

  const handleMenuClick = (href: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setLocation(href);
    setHoveredMenu(null);
  };

  return (
    <div className="hidden lg:flex items-center space-x-2">
      {mainNavigation.map((item) => {
        const IconComponent = item.icon || Home;
        const isMenuOpen = hoveredMenu === item.name;
        
        return (
          <div 
            key={item.name} 
            className="relative"
            onMouseEnter={() => item.megaMenu && handleMenuEnter(item.name)}
            onMouseLeave={() => item.megaMenu && handleMenuLeave()}
          >
            {item.megaMenu ? (
              <>
                <button
                  onClick={() => handleMenuClick(item.href)}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 whitespace-nowrap shadow-sm border border-transparent",
                    location === item.href && "text-white bg-accent-orange shadow-lg",
                    location !== item.href && !isMenuOpen && "text-text-primary hover:text-accent-orange hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:border-orange-200 hover:shadow-md hover:transform hover:scale-102",
                    isMenuOpen && "text-white bg-gradient-to-r from-accent-orange to-orange-500 shadow-lg transform scale-105"
                  )}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {item.name}
                  <ChevronDown className={cn(
                    "ml-2 w-4 h-4 transition-transform duration-300",
                    isMenuOpen && "rotate-180"
                  )} />
                </button>
                
                <div 
                  className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[820px] rounded-2xl shadow-2xl border border-neutral-100 bg-white/95 backdrop-blur-sm p-8 transform transition-all duration-300 ease-in-out",
                    isMenuOpen 
                      ? "opacity-100 visible pointer-events-auto scale-100" 
                      : "opacity-0 invisible pointer-events-none scale-95"
                  )}
                  style={{ zIndex: 999 }}
                  onMouseEnter={() => handleMenuEnter(item.name)}
                  onMouseLeave={handleMenuLeave}
                >
                  <div className="grid grid-cols-3 gap-12">
                    {item.megaMenu.sections.map((section) => (
                      <div key={section.title} className="space-y-1">
                        <h4 className="font-bold text-text-primary mb-6 text-sm uppercase tracking-wider text-neutral-800 border-b-2 border-gradient-to-r from-accent-orange to-orange-400 pb-3 bg-gradient-to-r from-accent-orange to-orange-500 bg-clip-text text-transparent">
                          {section.title}
                        </h4>
                        <div className="space-y-2">
                          {section.links.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              className="block group/item"
                              onClick={() => {
                                if (timeoutRef.current) {
                                  clearTimeout(timeoutRef.current);
                                  timeoutRef.current = null;
                                }
                                setHoveredMenu(null);
                              }}
                            >
                              <div className="px-4 py-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:via-amber-25 hover:to-yellow-50 transition-all duration-300 border border-transparent hover:border-orange-100 hover:shadow-lg hover:transform hover:scale-102 min-h-[70px] flex flex-col justify-center">
                                <div className="font-semibold text-text-primary group-hover/item:text-accent-orange text-sm leading-tight transition-colors">
                                  {link.name}
                                </div>
                                {link.desc && (
                                  <div className="text-xs text-text-secondary group-hover/item:text-orange-600 mt-2 leading-relaxed transition-colors">
                                    {link.desc}
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 whitespace-nowrap shadow-sm border border-transparent",
                  location === item.href
                    ? "text-white bg-gradient-to-r from-accent-orange to-orange-500 shadow-lg transform scale-105"
                    : "text-text-primary hover:text-accent-orange hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:border-orange-200 hover:shadow-md hover:transform hover:scale-102"
                )}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
      
      {secondaryNavigation.filter(item => ['Команда', 'Контакты', 'Отзывы'].includes(item.name)).map((item) => {
        const IconComponent = item.icon || Home;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 whitespace-nowrap shadow-sm border border-transparent",
              location === item.href
                ? "text-white bg-gradient-to-r from-accent-orange to-orange-500 shadow-lg transform scale-105"
                : "text-text-primary hover:text-accent-orange hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:border-orange-200 hover:shadow-md hover:transform hover:scale-102"
            )}
          >
            <IconComponent className="w-4 h-4 mr-2" />
            {item.name}
          </Link>
        );
      })}

      <CartButton variant="desktop" />
    </div>
  );
} 