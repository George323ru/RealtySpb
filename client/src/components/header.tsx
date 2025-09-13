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
        // Fixed positioning for scroll behavior
        "fixed top-4 inset-x-4 z-50",
        // Minimalist container style
        "minimal-container",
        // Smooth animations
        "transition-transform duration-300 ease-in-out",
        !isVisible && "-translate-y-full"
      )}
    >
      {/* Top Contact Bar - Desktop Only */}
      <HeaderTopBar />

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          {/* Left Block: Logo and Title */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center Block: Navigation Links (hidden on mobile) */}
          <div className="hidden md:flex items-center">
            <DesktopNavigation />
            <CompactDesktopNavigation />
            <TabletNavigation />
          </div>

          {/* Right Block: Actions & Mobile Menu */}
          <div className="flex items-center">
            <DesktopHeaderActions />
            <TabletHeaderActions />
            <MobileNavigation />
          </div>
        </nav>
      </div>
    </header>
  );
}
