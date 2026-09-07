import { useEffect, useRef } from 'react'
import katex from 'katex'

interface KatexProps {
  tex: string
  display?: boolean
  className?: string
}

export default function Katex({ tex, display = false, className = '' }: KatexProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      })
    }
  }, [tex, display])

  // Display-mode equations can render wider than their container (long vector/fraction
  // chains); scroll them horizontally instead of silently clipping.
  return <span ref={ref} className={display ? `block max-w-full overflow-x-auto ${className}` : className} />
}
