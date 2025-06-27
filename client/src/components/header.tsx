import { HeaderTopBar, Logo, DesktopNavigation, MobileNavigation } from "./layout/header";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      {/* Top Contact Bar - Desktop Only */}
      <HeaderTopBar />

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Mobile Navigation */}
          <MobileNavigation />
        </nav>
      </div>
    </header>
  );
}
