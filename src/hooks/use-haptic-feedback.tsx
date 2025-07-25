import { useCallback } from 'react'

type HapticIntensity = 'light' | 'medium' | 'heavy'

export function useHapticFeedback() {
  const triggerHaptic = useCallback((intensity: HapticIntensity = 'medium') => {
    // Check if the device supports haptic feedback
    if ('vibrate' in navigator) {
      const vibrationPattern = {
        light: 10,
        medium: 25,
        heavy: 50
      }
      
      navigator.vibrate(vibrationPattern[intensity])
    }
    
    // For iOS devices that support haptic feedback
    if ('ontouchstart' in window && 'DeviceMotionEvent' in window) {
      // iOS haptic feedback would be implemented here if available via a polyfill
      // For now, we'll use the vibration API fallback
    }
  }, [])

  return triggerHaptic
}