import { useEffect, useRef, useCallback, RefObject } from "react"

interface UseClickOutsideReturn {
  nodeRef: RefObject<HTMLElement>
}

export default function useClickOutSide(callback: () => void): UseClickOutsideReturn {
  const nodeRef: RefObject<HTMLElement> = useRef(null)

  const handleClickOutSide = useCallback(
    (ev: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(ev.target as Node)) {
        callback()
      }
    },
    [callback, nodeRef],
  )

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide)
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide)
    }
  }, [handleClickOutSide])

  return {
    nodeRef,
  }
}
