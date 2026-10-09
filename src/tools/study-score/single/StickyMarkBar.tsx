// Phones only, Check My Marks only: once the mark inputs have scrolled away, a slim bar pins to
// the top of the scroll area with − and + for each mark and the live headline, so a student can
// try a mark or two while reading the year rows. It goes again when the inputs come back into
// view, or once Marks Needed has scrolled past.
//
// Like the worked-solutions question bar, it takes no room in the layout: a zero-height sticky
// wrapper at the top of the page with the bar hanging off it, so it is already pinned by the
// time it shows. The app scrolls inside <main>, not the window, and `sticky top-0` pins to that.

import { useEffect, useRef, useState, type RefObject } from 'react'
import { SUBJECTS, type Subject } from '../data.ts'
import { scrollBehavior } from '../shared.tsx'
import { PHONE, useMedia } from './useMedia.ts'

/** The bar's height; the watched edges are measured from just below it. */
const BAR = 52

export default function StickyMarkBar({
  subject,
  marks,
  typical,
  busy,
  onMark,
  inputs,
  end,
}: {
  subject: Subject
  marks: number[]
  typical: number
  /** A mark box holds something that isn't a mark yet: the number is dimmed, as the results are. */
  busy: boolean
  onMark: (i: number, v: number) => void
  /** The top card's mark inputs. */
  inputs: RefObject<HTMLElement>
  /** The last card the bar stays for (Marks Needed). */
  end: RefObject<HTMLElement>
}) {
  const exams = SUBJECTS[subject].exams
  const phone = useMedia(PHONE)
  const [shown, setShown] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  /** Whether the bar last hid because the inputs came back into view (rather than Marks Needed
   *  scrolling past, or the screen growing past phone width). */
  const inputsBack = useRef(false)

  useEffect(() => {
    const a = inputs.current
    const b = end.current
    if (!phone || !a || !b || typeof IntersectionObserver === 'undefined') {
      inputsBack.current = false
      setShown(false)
      return
    }
    // Each target is "gone" once its bottom edge is above the top of the visible area.
    let inputsGone = false
    let endGone = false
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          const top = e.rootBounds?.top ?? 0
          const gone = !e.isIntersecting && e.boundingClientRect.bottom <= top
          if (e.target === a) inputsGone = gone
          else endGone = gone
        }
        inputsBack.current = !inputsGone
        setShown(inputsGone && !endGone)
      },
      { root: a.closest('main'), rootMargin: `-${BAR}px 0px 0px 0px` },
    )
    io.observe(a)
    io.observe(b)
    return () => io.disconnect()
    // The inputs are a new element after a subject switch.
  }, [phone, inputs, end, subject])

  /** Back to the full inputs, with that box ready to type in. */
  const jump = (i: number) => {
    const box = inputs.current?.querySelector<HTMLInputElement>(`[data-mark="${i}"]`)
    if (!box) return
    box.scrollIntoView({ behavior: scrollBehavior(), block: 'center' })
    box.focus({ preventScroll: true })
  }

  // ── Focus never stays in a hidden bar ──
  // aria-hidden and tabIndex keep focus from arriving, but not from staying: a button focused
  // as the bar fades would be left invisible (and still pressable with Space). Hand focus to the
  // matching box if the inputs are back in view, else let it go.
  useEffect(() => {
    if (shown) return
    const el = document.activeElement
    if (!(el instanceof HTMLElement) || !bar.current?.contains(el)) return
    const i = el.closest<HTMLElement>('[data-exam]')?.dataset.exam
    const box = inputsBack.current && i !== undefined ? inputs.current?.querySelector<HTMLInputElement>(`[data-mark="${i}"]`) : null
    if (box) box.focus({ preventScroll: true })
    else el.blur()
  }, [shown, inputs])

  const step = 'flex-none w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
  const tab = shown ? 0 : -1

  return (
    <div className="sticky top-0 z-20 h-0 sm:hidden">
      <div
        ref={bar}
        aria-hidden={!shown}
        className={`absolute -inset-x-4 top-0 flex items-center justify-between gap-1 px-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm transition-opacity-transform duration-200 motion-reduce:transition-none ${
          shown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        style={{ height: BAR }}
      >
        {exams.map((e, i) => (
          <span key={e.label} data-exam={i} className="flex items-center gap-0.5 min-w-0">
            <span className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">{e.short}</span>
            <button type="button" tabIndex={tab} aria-label={`${e.label} down one mark`} disabled={marks[i] <= 0} onClick={() => onMark(i, marks[i] - 1)} className={step}>
              <svg viewBox="0 0 16 16" aria-hidden className="w-4 h-4">
                <path d="M3.5 8h9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              tabIndex={tab}
              aria-label={`${e.label}: ${marks[i]} out of ${e.rawMax}. Go to the mark inputs`}
              onClick={() => jump(i)}
              className="flex-none min-w-10 h-10 px-0.5 rounded-lg font-display text-base font-bold text-gray-900 dark:text-white tabular-nums hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {marks[i]}
            </button>
            <button type="button" tabIndex={tab} aria-label={`${e.label} up one mark`} disabled={marks[i] >= e.rawMax} onClick={() => onMark(i, marks[i] + 1)} className={step}>
              <svg viewBox="0 0 16 16" aria-hidden className="w-4 h-4">
                <path d="M3.5 8h9M8 3.5v9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </span>
        ))}
        <span className="flex-none flex items-baseline gap-1 text-[15px] text-gray-500 dark:text-gray-400">
          <span aria-hidden>→</span>
          <span className="sr-only">Typical</span>
          <b className={`font-display text-lg font-bold text-sky-700 dark:text-sky-300 tabular-nums ${busy ? 'opacity-50' : ''}`}>{typical}</b>
        </span>
      </div>
    </div>
  )
}
