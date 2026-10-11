// Phones only, Check My Marks only: once the mark inputs have scrolled away, a slim bar pins to
// the top of the scroll area with − and + for each mark and the live headline, so a student can
// try a mark or two while reading the year rows. It goes again when the inputs come back into
// view, or once Marks Needed has scrolled past.
//
// Like the worked-solutions question bar, it takes no room in the layout: a zero-height sticky
// wrapper at the top of the page with the bar hanging off it, so it is already pinned by the
// time it shows. The app scrolls inside <main>, not the window, and `sticky top-0` pins to that.
// While it shows, <main> gets scroll padding for it, so whatever takes keyboard focus is brought
// into view below the bar rather than under it.

import { useEffect, useRef, useState, type RefObject } from 'react'
import { SUBJECTS, type Subject } from '../data.ts'
import { FOCUS, scrollBehavior } from '../shared.tsx'
import { PHONE, useMedia } from '../useMedia.ts'

/** The bar's height; the watched edges are measured from just below it. */
const BAR = 52
/** Room kept clear under the bar for a focused element (and its focus ring). */
const CLEAR = BAR + 8

/** Focus showing a ring, as keyboard focus does. A click's focus is left alone: moving the row
 *  out from under the pointer mid-click would lose the click. */
function ringShown(el: HTMLElement): boolean {
  try {
    return el.matches(':focus-visible')
  } catch {
    return true
  }
}

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

  // ── Focus never hides under the bar ──
  // Scroll padding makes the browser bring a focused element into view below the bar. It doesn't
  // move an element that already counts as in view, which includes the strip under the bar, so a
  // focus check scrolls one that landed there down into sight, at once (no motion to reduce).
  // Not <main> itself (Skip to Content focuses it), nor anything too tall to fit below the bar:
  // neither can be brought into view by moving it down.
  /** The box `jump` is focusing, which is already on its way into view. */
  const jumping = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const main = bar.current?.closest('main')
    if (!shown || !main) return
    main.style.scrollPaddingTop = `${CLEAR}px`
    const onFocus = (e: FocusEvent) => {
      const el = e.target
      if (!(el instanceof HTMLElement) || el === jumping.current || el.contains(main) || bar.current?.contains(el) || !ringShown(el)) return
      const box = el.getBoundingClientRect()
      if (box.height > main.clientHeight - CLEAR) return
      const under = main.getBoundingClientRect().top + CLEAR - box.top
      if (under > 0) main.scrollBy({ top: -under, behavior: 'instant' })
    }
    main.addEventListener('focusin', onFocus)
    return () => {
      main.style.scrollPaddingTop = ''
      main.removeEventListener('focusin', onFocus)
    }
  }, [shown])

  /** Back to the full inputs, with that box ready to type in. */
  const jump = (i: number) => {
    const box = inputs.current?.querySelector<HTMLInputElement>(`[data-mark="${i}"]`)
    if (!box) return
    box.scrollIntoView({ behavior: scrollBehavior(), block: 'center' })
    jumping.current = box
    box.focus({ preventScroll: true })
    jumping.current = null
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

  // Hover tints only where there's a real hover: on a phone, a tapped button would keep it.
  // At 0 or full marks a stepper is aria-disabled, not disabled, so focus stays on it.
  const step = `flex-none w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center [@media(hover:hover)]:hover:bg-gray-200 dark:[@media(hover:hover)]:hover:bg-gray-700 aria-disabled:opacity-40 aria-disabled:cursor-default ${FOCUS}`
  const tab = shown ? 0 : -1
  /** A stepper's handler: the new mark, or nothing at the limit. */
  const stepTo = (i: number, v: number) => () => {
    if (v >= 0 && v <= exams[i].rawMax) onMark(i, v)
  }

  // ── Fitting a 320 px phone ──
  // The bar is as wide as <main>, so at 320 px it has 304 px inside its padding. Full size, a
  // two-exam bar needs about 324: each exam is its label (about 12 px) and three 40 px buttons
  // with 2 px between them (138), twice, then the result (→ about 13, 4 px, about 22 of score:
  // 39), with 4 px between the three. So below 360 px the mark button hugs its number (px-1 and
  // at least 24 px wide: about 28 for two digits, still 40 px tall) and the arrow goes, the sr-only
  // "Typical" still naming the result: 2 × 126 + 22 + 8 = about 282. The steppers stay 40 px.
  // From 360 px there are 344 px, room for the full bar.
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
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{e.short}</span>
            <button type="button" tabIndex={tab} aria-label={`${e.label} down one mark`} aria-disabled={marks[i] <= 0 || undefined} onClick={stepTo(i, marks[i] - 1)} className={step}>
              <svg viewBox="0 0 16 16" aria-hidden className="w-4 h-4">
                <path d="M3.5 8h9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              tabIndex={tab}
              aria-label={`${e.label}: ${marks[i]} out of ${e.rawMax}. Go to the mark inputs`}
              onClick={() => jump(i)}
              className={`flex-none min-w-10 h-10 px-0.5 max-[359.98px]:min-w-6 max-[359.98px]:px-1 rounded-lg font-display text-base font-bold text-gray-900 dark:text-white tabular-nums [@media(hover:hover)]:hover:bg-gray-50 dark:[@media(hover:hover)]:hover:bg-gray-800 ${FOCUS}`}
            >
              {marks[i]}
            </button>
            <button type="button" tabIndex={tab} aria-label={`${e.label} up one mark`} aria-disabled={marks[i] >= e.rawMax || undefined} onClick={stepTo(i, marks[i] + 1)} className={step}>
              <svg viewBox="0 0 16 16" aria-hidden className="w-4 h-4">
                <path d="M3.5 8h9M8 3.5v9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </span>
        ))}
        <span className="flex-none flex items-baseline gap-1 text-[0.9375rem] text-gray-500 dark:text-gray-400">
          <span aria-hidden className="max-[359.98px]:hidden">
            →
          </span>
          <span className="sr-only">Typical</span>
          <b className={`font-display text-lg font-bold text-sky-700 dark:text-sky-300 tabular-nums ${busy ? 'opacity-50' : ''}`}>{typical}</b>
        </span>
      </div>
    </div>
  )
}
