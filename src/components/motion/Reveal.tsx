import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import './motion.css'

/** Fades and lifts its children in the first time they scroll into view. `index` staggers siblings. */
export function Reveal({ children, index = 0, className = '' }: { children: ReactNode; index?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        el.setAttribute('data-revealed', '')
        io.disconnect()
      }
    }, { rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} data-reveal className={className} style={{ '--i': index } as CSSProperties}>
      {children}
    </div>
  )
}

/** Style for a staggered load-in: <div className="rise-in" style={stagger(2)}>. */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties

/** True when the visitor asked for less motion. */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduce(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduce
}

/** True while the element is on screen, so looping previews can pause when scrolled away. */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(entries => setInView(entries.some(e => e.isIntersecting)))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView] as const
}
