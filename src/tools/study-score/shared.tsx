// Pieces both modes use: the Keep in Mind notes under the headline, Copy Link, a polite
// screen-reader announcer, and the card styles.

import { useEffect, useId, useRef, useState } from 'react'
import { OLD_COURSE_UP_TO, SUBJECTS, type Subject } from './data.ts'
import { fullMarksRange } from './model.ts'

export const CARD = 'rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5'
export const H2 = 'font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white'
export const SUB = 'text-[0.8125rem] text-gray-500 dark:text-gray-400'

/** 'smooth', unless the device asks for reduced motion. */
export function scrollBehavior(): ScrollBehavior {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

// ── Keep in Mind ───────────────────────────────────────────────────────────────────────────

/**
 * The two things every projection needs said next to it (give or take 2 points; SACs aren't in
 * it), plus, when they apply, the full-marks ceiling and old-course papers reading low.
 */
export function KeepInMind({ subject, nearTop = false, oldCourse = false }: { subject: Subject; nearTop?: boolean; oldCourse?: boolean }) {
  const id = useId()
  const one = SUBJECTS[subject].exams.length === 1
  const lines = [
    'Each projected score is give or take 2 points.',
    `SACs aren’t included. If your SACs are in line with ${one ? 'your exam' : 'your exams'}, they won’t change it.`,
  ]
  if (nearTop) {
    const { lo, hi } = fullMarksRange(subject)
    lines.push(
      `Near full marks this reads low: full marks itself shows ${lo === hi ? `${lo}` : `${lo} to ${hi}, depending on the year`}. Many students tie at the top, and SACs decide the last few points.`,
    )
  }
  const last = OLD_COURSE_UP_TO[subject]
  if (oldCourse && last !== null) {
    lines.push(`Papers up to ${last} are from the previous course. If you skipped questions that are no longer on the course, those papers read a few points low.`)
  }
  return (
    <section aria-labelledby={id} className="px-1">
      <h2 id={id} className="text-[0.8125rem] font-semibold text-gray-700 dark:text-gray-200">
        Keep in Mind
      </h2>
      <ul className="mt-1 flex flex-col gap-1 text-[0.84375rem] leading-snug text-gray-700 dark:text-gray-300">
        {lines.map(l => (
          <li key={l} className="flex gap-2">
            <span aria-hidden className="mt-[0.5em] w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500 flex-none" />
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

// ── Copy Link ──────────────────────────────────────────────────────────────────────────────

/** This page's link with some query keys left out. The app routes by hash, so the query lives
 *  inside the hash (#/study-score/methods?e1=30&e2=60). */
function linkWithout(strip: string[]): string {
  const { origin, pathname, search, hash } = window.location
  const [route, query = ''] = hash.split('?')
  const q = new URLSearchParams(query)
  for (const k of strip) q.delete(k)
  const qs = q.toString()
  return `${origin}${pathname}${search}${route}${qs ? `?${qs}` : ''}`
}

/**
 * Copies this page's link. Where the clipboard is refused (some in-app browsers, WeChat's among
 * them), it shows the link selected in a box to copy by hand instead of failing silently.
 * `flush` runs first, for a page still waiting to put its latest change in the address.
 */
export function CopyLink({ strip = [], flush, className = '' }: { strip?: string[]; flush?: () => void; className?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [link, setLink] = useState('')
  // Said to screen readers on its own, not through the button's label, and emptied afterwards,
  // so the label going back to "Copy Link" isn't read out again.
  const [said, setSaid] = useState('')
  const boxRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (state !== 'copied') return
    const t = setTimeout(() => {
      setState('idle')
      setSaid('')
    }, 1800)
    return () => clearTimeout(t)
  }, [state])
  useEffect(() => {
    if (state !== 'failed') return
    boxRef.current?.focus()
    boxRef.current?.select()
  }, [state])
  const close = () => {
    setState('idle')
    setSaid('')
    buttonRef.current?.focus()
  }

  const copy = () => {
    flush?.()
    const url = linkWithout(strip)
    setLink(url)
    // Emptied first, so copying again straight away is said again.
    setSaid('')
    const done = (ok: boolean) => {
      setState(ok ? 'copied' : 'failed')
      setSaid(ok ? 'Link copied' : 'Couldn’t copy the link')
    }
    if (!navigator.clipboard?.writeText) return done(false)
    navigator.clipboard.writeText(url).then(
      () => done(true),
      () => done(false),
    )
  }

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={copy}
        className="rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-1.5 [@media(pointer:coarse)]:py-2.5 text-[0.8125rem] font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Couldn’t Copy' : 'Copy Link'}
      </button>
      <span role="status" className="sr-only">
        {said}
      </span>
      {state === 'failed' && (
        <div
          onKeyDown={e => e.key === 'Escape' && close()}
          className="absolute right-0 top-full mt-2 z-20 w-[min(20rem,80vw)] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 shadow-lg flex flex-col gap-2">
          <label className="text-[0.78125rem] text-gray-600 dark:text-gray-300">
            Copy this link by hand (press and hold, or select it):
            <input
              ref={boxRef}
              readOnly
              value={link}
              onFocus={e => e.target.select()}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-2 py-1.5 text-[0.78125rem] [@media(pointer:coarse)]:text-base text-gray-900 dark:text-white"
            />
          </label>
          <button
            type="button"
            onClick={close}
            className="self-end rounded-lg px-3 py-1.5 [@media(pointer:coarse)]:py-2.5 text-[0.78125rem] font-medium text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

// ── Announcements ──────────────────────────────────────────────────────────────────────────

/**
 * A visually hidden polite status that reads out `text` once it has stopped changing for `delay`
 * ms, so dragging a slider doesn't chatter. The text on first render isn't read out.
 */
export function Announce({ text, delay = 700 }: { text: string; delay?: number }) {
  const [said, setSaid] = useState('')
  const first = useRef(text)
  useEffect(() => {
    if (text === first.current) return
    first.current = ''
    const t = setTimeout(() => setSaid(text), delay)
    return () => clearTimeout(t)
  }, [text, delay])
  return (
    <div role="status" aria-live="polite" className="sr-only">
      {said}
    </div>
  )
}
