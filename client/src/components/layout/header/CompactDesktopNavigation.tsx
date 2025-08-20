import { useState, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown, Home, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNavigation, secondaryNavigation } from '@/config/navigation';
import { Button } from '@/components/ui/button';

// Состав компактного меню: Купить, Продать, Сдать, Ремонт, Контакты
const contactsItem = secondaryNavigation.find(item => item.name === 'Контакты');
const compactNavItems = [
  ...mainNavigation.filter(item => ['Купить', 'Продать', 'Сдать'].includes(item.name)),
  { name: 'Ремонт', href: '/services/renovation', icon: Wrench },
  ...(contactsItem ? [contactsItem] : []),
];

export default function CompactDesktopNavigation() {
  const [location, setLocation] = useLocation();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMenuEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredMenu(menuName);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 200);
  };

  const handleLinkClick = (href: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setLocation(href);
    setHoveredMenu(null);
  };

  return (
    <nav className="hidden xl:flex 2xl:hidden items-center space-x-1">
      {compactNavItems.map(item => {
        const IconComponent = item.icon || Home;
        const isActive = location === item.href;
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLinkClick(item.href)}
                  className={cn(
                    'flex items-center',
                    (isActive || isMenuOpen) &&
                      'text-accent-orange bg-orange-50'
                  )}
                >
                  {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                  {item.name}
                  <ChevronDown
                    className={cn(
                      'ml-2 w-4 h-4 transition-transform',
                      isMenuOpen && 'rotate-180'
                    )}
                  />
                </Button>
                <div
                  className={cn(
                    'absolute top-full mt-2 w-[780px] rounded-2xl shadow-2xl border bg-white/95 backdrop-blur-sm p-8 transform transition-all duration-300 ease-in-out',
                    isMenuOpen
                      ? 'opacity-100 visible scale-100'
                      : 'opacity-0 invisible scale-95'
                  )}
                  style={{ zIndex: 999 }}
                >
                  <div className="grid grid-cols-3 gap-12">
                    {item.megaMenu.sections.map(section => (
                      <div key={section.title}>
                        <h4 className="font-bold text-text-primary mb-4 text-sm uppercase tracking-wider text-neutral-800 border-b-2 border-accent-orange pb-2">
                          {section.title}
                        </h4>
                        <div className="space-y-2 mt-4">
                          {section.links.map(link => (
                            <Button
                              key={link.name}
                              variant="ghost"
                              size="sm"
                              asChild
                              className="w-full justify-start h-auto p-3 flex flex-col items-start"
                              onClick={() => handleLinkClick(link.href)}
                            >
                              <Link href={link.href}>
                                <div className="font-semibold text-text-primary text-sm">
                                  {link.name}
                                </div>
                                {link.desc && (
                                  <div className="text-xs text-text-secondary mt-1">
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
                className={cn(isActive && 'text-accent-orange bg-orange-50')}
              >
                <Link
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                >
                  {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                  {item.name}
                </Link>
              </Button>
            )}
          </div>
        );
      })}
    </nav>
  );
} 