import { useState } from 'react'

export const usePersistentState = <T>(
  key: string,
  initialValue: T,
): [T, (newValue: T) => void] => {
  const persistedValue = sessionStorage.getItem(key)
  const [value, setValue] = useState<T>(
    persistedValue ? JSON.parse(persistedValue) : initialValue,
  )

  const persist = (value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  return [
    value,
    (value: T) => {
      setValue(value)
      persist(value)
    },
  ]
}
