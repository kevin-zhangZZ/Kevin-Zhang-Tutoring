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
      // Inline maths ends with an invisible WORD JOINER (U+2060), which forbids a line break
      // between the maths and whatever follows it — otherwise punctuation straight after it
      // (the comma in "…y, so the product rule…") can wrap onto the next line on its own. It
      // goes inside this span, after KaTeX's output, so it never becomes an extra flex item.
      if (!display) ref.current.append('\u2060')
    }
  }, [tex, display])

  // Display-mode equations can render wider than their container (long vector/fraction
  // chains); scroll them horizontally instead of silently clipping.
  return <span ref={ref} className={display ? `block max-w-full overflow-x-auto ${className}` : className} />
}
