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

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
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
