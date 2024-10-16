import React, { useEffect, useState } from 'react'
import { setUpObserver, RenderStats, getEmptyStats } from './observer'

export const useObserver = (elementId: string): [RenderStats, () => void] => {
  const [stats, setStats] = useState<RenderStats>(getEmptyStats())
  const reset = () => setStats(getEmptyStats())
  const observer = React.useRef<MutationObserver | null>(null)

  useEffect(() => {
    observer.current = setUpObserver(
      document.getElementById(elementId)!,
      setStats,
    )

    return () => observer.current?.disconnect()
  }, [])

  return [stats, reset]
}
