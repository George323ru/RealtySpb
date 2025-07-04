import {
  HeaderTopBar,
  Logo,
  DesktopNavigation,
  CompactDesktopNavigation,
  TabletNavigation,
  MobileNavigation,
  TabletHeaderActions,
} from './layout/header';
import DesktopHeaderActions from './layout/header/DesktopHeaderActions';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { cn } from '@/lib/utils';

export default function Header() {
  const { isVisible } = useScrollDirection();

  return (
    <header 
      className={cn(
        "bg-white shadow-sm border-b border-neutral-200 z-50",
        // На мобиле и планшете - sticky
        "sticky top-0",
        // На десктопе - fixed с анимацией
        "lg:fixed lg:top-0 lg:left-0 lg:right-0",
        "lg:transition-transform lg:duration-300 lg:ease-in-out",
        !isVisible && "lg:-translate-y-full"
      )}
    >
      {/* Top Contact Bar - Desktop Only */}
      <HeaderTopBar />

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Left Block: Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Center Block: Navigation Links (hidden on mobile) */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <DesktopNavigation />
            <CompactDesktopNavigation />
            <TabletNavigation />
          </div>

          {/* Right Block: Actions & Mobile Menu */}
          <div className="flex items-center justify-end flex-1 lg:flex-none">
            <DesktopHeaderActions />
            <TabletHeaderActions />
            <MobileNavigation />
          </div>
        </nav>
      </div>
    </header>
  );
}
