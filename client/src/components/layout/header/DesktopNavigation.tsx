import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavigation, secondaryNavigation } from "@/config/navigation";
import { Button } from "@/components/ui/button";

// Navigation-specific button styles that override global styles
const navButtonStyles = "h-10 min-h-10 px-3 text-sm font-semibold whitespace-nowrap transition-colors duration-300 border border-transparent rounded-xl hover:transform-none hover:shadow-md";

const activeStyles = "bg-accent-orange text-white shadow-lg";
const inactiveStyles = "text-text-primary hover:text-accent-orange hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:border-orange-200";

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
    <nav className="hidden lg:flex items-center space-x-1">
      {mainNavigation.map((item) => {
        const IconComponent = item.icon || Home;
        const isMenuOpen = hoveredMenu === item.name;
        const isActive = location === item.href;
        
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
                    navButtonStyles,
                    "flex items-center",
                    (isActive || isMenuOpen) ? activeStyles : inactiveStyles
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
                    "absolute top-full mt-4 w-[780px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border border-neutral-100 bg-white/95 backdrop-blur-sm p-8 transform transition-all duration-300 ease-in-out",
                    "left-0 -translate-x-1/4",
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
                  navButtonStyles,
                  "flex items-center",
                  isActive ? activeStyles : inactiveStyles
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
        const isActive = location === item.href;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              navButtonStyles,
              "flex items-center",
              isActive ? activeStyles : inactiveStyles
            )}
          >
            <IconComponent className="w-4 h-4 mr-2" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
} 