import { useMemo } from 'react'
import katex from 'katex'
// The stylesheet ships with this (lazily loaded) component rather than the entry bundle, so
// pages without maths don't wait on it.
import 'katex/dist/katex.min.css'

interface KatexProps {
  tex: string
  display?: boolean
  className?: string
}

export default function Katex({ tex, display = false, className = '' }: KatexProps) {
  // Rendered to a string during render (not in an effect), so the formula is in the very
  // first paint instead of popping in a frame later.
  const html = useMemo(() => {
    const out = katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      strict: false,
    })
    // Inline maths ends with an invisible WORD JOINER (U+2060), which forbids a line break
    // between the maths and whatever follows it — otherwise punctuation straight after it
    // (the comma in "…y, so the product rule…") can wrap onto the next line on its own. It
    // goes inside this span, after KaTeX's output, so it never becomes an extra flex item.
    return display ? out : out + '⁠'
  }, [tex, display])

  // Display-mode equations can render wider than their container (long vector/fraction
  // chains); scroll them horizontally instead of silently clipping.
  return (
    <span
      className={display ? `block max-w-full overflow-x-auto ${className}` : className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
