import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavigation, secondaryNavigation } from "@/config/navigation";
import { Button } from "@/components/ui/button";

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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMenuClick(item.href)}
                  className={cn(
                    "flex items-center",
                    (isActive || isMenuOpen) && "text-accent-orange [background-size:100%_100%]"
                  )}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {item.name}
                  <ChevronDown className={cn(
                    "ml-2 w-4 h-4 transition-transform duration-300",
                    isMenuOpen && "rotate-180"
                  )} />
                </Button>
                
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
                            <Button
                              key={link.name}
                              variant="ghost"
                              size="sm"
                              asChild
                              className="w-full justify-start h-auto p-4 min-h-[70px] flex flex-col items-start"
                            >
                              <Link
                                href={link.href}
                                onClick={() => {
                                  if (timeoutRef.current) {
                                    clearTimeout(timeoutRef.current);
                                    timeoutRef.current = null;
                                  }
                                  setHoveredMenu(null);
                                }}
                              >
                                <div className="font-semibold text-text-primary group-hover/item:text-accent-orange text-sm leading-tight transition-colors">
                                  {link.name}
                                </div>
                                {link.desc && (
                                  <div className="text-xs text-text-secondary group-hover/item:text-orange-600 mt-2 leading-relaxed transition-colors">
                                    {link.desc}
                                  </div>
                                )}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className={cn(isActive && "text-accent-orange [background-size:100%_100%]")}
              >
                <Link href={item.href}>
                  <IconComponent className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              </Button>
            )}
          </div>
        );
      })}
      
      {secondaryNavigation.filter(item => ['Команда', 'Контакты', 'Отзывы'].includes(item.name)).map((item) => {
        const IconComponent = item.icon || Home;
        const isActive = location === item.href;
        
        return (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            asChild
            className={cn(isActive && "text-accent-orange [background-size:100%_100%]")}
          >
            <Link href={item.href}>
              <IconComponent className="w-4 h-4 mr-2" />
              {item.name}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
} 