import * as React from "react"

const MOBILE_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useMobileNavigation() {
  const isMobile = useIsMobile()
  
  // Получаем CSS переменные для высоты навигации
  const mobileNavHeight = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      const rootStyles = getComputedStyle(document.documentElement)
      return rootStyles.getPropertyValue('--mobile-nav-height').trim() || '72px'
    }
    return '72px'
  }, [])

  const floatingCtaOffset = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      const rootStyles = getComputedStyle(document.documentElement)
      return rootStyles.getPropertyValue('--floating-cta-offset').trim() || '88px'
    }
    return '88px'
  }, [])

  return {
    isMobile,
    mobileNavHeight,
    floatingCtaOffset,
    // Утилиты для стилизации
    getMobileBottomSpacing: () => isMobile ? floatingCtaOffset : '24px',
    getMobileNavClasses: () => isMobile ? 'pb-safe-bottom' : '',
  }
}
