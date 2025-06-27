import { HeaderTopBar, Logo, DesktopNavigation, MobileNavigation } from "./layout/header";
import DesktopHeaderActions from "./layout/header/DesktopHeaderActions";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      {/* Top Contact Bar - Desktop Only */}
      <HeaderTopBar />

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation Links */}
            <div className="ml-6 mr-8">
              <DesktopNavigation />
            </div>
          </div>

          {/* Desktop Actions */}
          <DesktopHeaderActions />

          {/* Mobile Navigation (burger icon and full-screen menu) */}
          <MobileNavigation />
        </nav>
      </div>
    </header>
  );
}
