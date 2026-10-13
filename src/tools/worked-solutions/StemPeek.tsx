// Hold-to-peek at the question: a button in the bottom-right corner that, while pressed, drops
// the question down from the top of the screen (over the solution column on laptops), so a student
// deep in the working can check the wording, diagram or options without scrolling back up. Let go
// and it closes. The button only shows once the question has scrolled out of view.
//
// For multiple-choice and single-part short-answer questions only; a multi-part question repeats
// each part's statement in its own card. What it shows is a copy of the question as it is on the
// page: for an MCQ, everything MCQShell marks `data-stem` (question, diagram, options); for a
// single-part question, the box headed "Question N (k marks)" (AUTHORING_GUIDE §12.4).

import { useEffect, useRef, useState, type RefObject } from 'react'
import { isSection } from './mcqSections'

function findStem(detail: HTMLElement): HTMLElement[] {
  const lettered = Array.from(detail.querySelectorAll<HTMLElement>('[data-part]')).some(el => !isSection(el.dataset.part!))
  if (lettered) return []
  const marked = Array.from(detail.querySelectorAll<HTMLElement>('[data-stem]'))
  if (marked.length) return marked
  const head = Array.from(detail.querySelectorAll('p')).find(p => /^Question \d+ \(\d+ marks?\)$/.test(p.textContent?.trim() ?? ''))
  const box = head?.closest<HTMLElement>('.rounded-2xl, .rounded-xl')
  return box ? [box] : []
}

const DocIcon = () => (
  <svg viewBox="0 0 20 20" className="w-[18px] h-[18px] flex-none" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5.5 2.5h6l3.5 3.5v11.5h-9.5z" />
    <path d="M11.5 2.5V6H15M8 10h5M8 13h5" />
  </svg>
)

export default function StemPeek({ detailRef, questionKey, code }: { detailRef: RefObject<HTMLDivElement>; questionKey: string; code: string }) {
  const [stem, setStem] = useState<HTMLElement[]>([])
  const [away, setAway] = useState(false)
  const [open, setOpen] = useState(false)
  const [column, setColumn] = useState<{ left: number; width: number } | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Find the question once the solution is on the page (it can arrive a moment after the route).
  useEffect(() => {
    setStem([])
    setAway(false)
    setOpen(false)
    const detail = detailRef.current
    if (!detail) return
    let tries = 0
    const t = window.setInterval(() => {
      const s = findStem(detail)
      if (s.length || ++tries > 20) {
        window.clearInterval(t)
        setStem(s)
      }
    }, 150)
    return () => window.clearInterval(t)
  }, [detailRef, questionKey])

  // Show the button only once all of the question has scrolled out of view.
  useEffect(() => {
    const main = detailRef.current?.closest('main')
    if (!stem.length || !main || typeof IntersectionObserver !== 'function') return
    const visible = new Set<Element>()
    const io = new IntersectionObserver(
      es => {
        for (const e of es) {
          if (e.isIntersecting) visible.add(e.target)
          else visible.delete(e.target)
        }
        setAway(visible.size === 0)
      },
      { root: main },
    )
    stem.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [stem, detailRef])

  // Fill the panel with a copy of the question as it is on the page (maths, diagram and all).
  useEffect(() => {
    const body = bodyRef.current
    if (!open || !body) return
    body.replaceChildren(
      ...stem.map(el => {
        const c = el.cloneNode(true) as HTMLElement
        c.removeAttribute('id')
        c.removeAttribute('data-stem')
        c.classList.remove('mb-6')
        return c
      }),
    )
  }, [open, stem])

  // Letting go anywhere closes it, even if the finger slid off the button.
  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('pointerup', close)
    window.addEventListener('pointercancel', close)
    window.addEventListener('blur', close)
    return () => {
      window.removeEventListener('pointerup', close)
      window.removeEventListener('pointercancel', close)
      window.removeEventListener('blur', close)
    }
  }, [open])

  if (!stem.length) return null

  const start = () => {
    const d = detailRef.current?.getBoundingClientRect()
    setColumn(d ? { left: d.left, width: d.width } : null)
    setOpen(true)
  }
  const laptop = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches

  return (
    <>
      {open && (
        <div
          // The copy is for looking at only: its option buttons mustn't take focus or clicks.
          ref={el => el?.setAttribute('inert', '')}
          className="fixed z-[55] top-0 max-lg:inset-x-0 max-h-[72vh] overflow-hidden rounded-b-2xl bg-white dark:bg-gray-900 border border-t-0 border-gray-200 dark:border-gray-800 shadow-2xl p-4 sm:p-5 pointer-events-none"
          style={laptop && column ? { left: column.left, width: column.width } : undefined}
        >
          <div className="flex items-baseline justify-between gap-3 mb-2.5">
            <span className="font-display text-[12px] font-bold text-sky-700 dark:text-sky-300">{code}</span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">Let go to close</span>
          </div>
          {/* Diagrams shrink so the wording and options still fit on a phone. */}
          <div ref={bodyRef} className="flex flex-col gap-3 [&_img]:max-h-[26vh] [&_img]:w-auto [&_img]:mx-auto" />
        </div>
      )}
      <button
        type="button"
        aria-label={`Hold to see ${code}`}
        title={`Hold to see ${code}`}
        onPointerDown={e => {
          if (e.button !== 0) return
          e.preventDefault()
          start()
        }}
        onContextMenu={e => e.preventDefault()}
        onKeyDown={e => {
          if ((e.key === ' ' || e.key === 'Enter') && !open) {
            e.preventDefault()
            start()
          }
        }}
        onKeyUp={() => setOpen(false)}
        className={`fixed z-[60] right-6 bottom-[132px] lg:bottom-[76px] flex items-center gap-1.5 h-11 pl-3 pr-4 rounded-full bg-sky-700 dark:bg-sky-400 text-white dark:text-gray-950 shadow-lg font-display text-[12.5px] font-bold touch-none select-none [-webkit-touch-callout:none] transition-all duration-200 ${
          away || open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <DocIcon />
        <span>
          Hold<span className="hidden lg:inline"> to see {code}</span>
        </span>
      </button>
    </>
  )
}
