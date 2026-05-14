import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Drop-in replacement for `@github/spark`'s `useKV` hook that persists to
 * `localStorage`. Returns `[value, setValue]` with the same call shape as
 * `useState` (supports both direct values and updater functions).
 *
 * Data is scoped to the visitor's browser. This is suitable for client-only
 * features (e.g. the admin panel that the site owner uses on their own
 * machine). For cross-device persistence, swap this for a real backend.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const readInitial = (): T => {
    if (typeof window === 'undefined') return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return initialValue
      return JSON.parse(raw) as T
    } catch {
      return initialValue
    }
  }

  const [value, setValueState] = useState<T>(readInitial)

  // Keep a ref so the setter is stable even when consumers pass updater fns.
  const valueRef = useRef(value)
  useEffect(() => {
    valueRef.current = value
  }, [value])

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValueState(prev => {
        const resolved =
          typeof next === 'function'
            ? (next as (p: T) => T)(prev)
            : next
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved))
        } catch {
          // Quota exceeded / private mode — silently ignore.
        }
        return resolved
      })
    },
    [key],
  )

  // Sync across tabs.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key || e.newValue === null) return
      try {
        setValueState(JSON.parse(e.newValue) as T)
      } catch {
        /* ignore malformed payloads */
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  return [value, setValue]
}
