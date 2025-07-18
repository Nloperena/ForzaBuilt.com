import * as React from "react"

const LANDSCAPE_BREAKPOINT = 1024 // Landscape typically starts around 1024px width

export function useIsLandscape() {
  const [isLandscape, setIsLandscape] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkLandscape = () => {
      // Check if screen width is greater than height (landscape) and above breakpoint
      const isLandscapeOrientation = window.innerWidth > window.innerHeight
      const isAboveBreakpoint = window.innerWidth >= LANDSCAPE_BREAKPOINT
      setIsLandscape(isLandscapeOrientation && isAboveBreakpoint)
    }

    const mql = window.matchMedia(`(min-width: ${LANDSCAPE_BREAKPOINT}px)`)
    const onChange = () => {
      checkLandscape()
    }
    
    mql.addEventListener("change", onChange)
    checkLandscape()
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isLandscape
}

// Landscape-optimized responsive values
export const useLandscapeValues = () => {
  const isLandscape = useIsLandscape()
  
  return {
    isLandscape,
    // Card dimensions for landscape
    cardWidth: isLandscape ? 540 : 480, // 3x larger cards in landscape
    cardHeight: isLandscape ? 720 : 640, // 3x taller cards in landscape
    cardGap: isLandscape ? 24 : 20, // More spacing in landscape
    // Visible cards count for landscape
    visibleCards: isLandscape ? 2 : 3, // Show fewer but larger cards
    // Font sizes for landscape
    titleFontSize: isLandscape ? '2rem' : '2rem', // 3x larger text in landscape
    logoSize: isLandscape ? '180px' : '180px', // 3x larger logos in landscape
    // Container padding for landscape
    containerPadding: isLandscape ? 48 : 40, // More padding in landscape
  }
} 