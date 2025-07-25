import { useCallback, useRef } from 'react'

export function useThrottledScroll(callback: (value: any) => void, delay: number = 16) {
  const lastRan = useRef(Date.now())
  
  return useCallback((value: any) => {
    if (Date.now() - lastRan.current >= delay) {
      callback(value)
      lastRan.current = Date.now()
    }
  }, [callback, delay])
}

export function useDebounce(callback: (value: any) => void, delay: number = 100) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  return useCallback((value: any) => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => callback(value), delay)
  }, [callback, delay])
}