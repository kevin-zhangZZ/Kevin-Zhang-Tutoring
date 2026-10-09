// Your Progress: each logged paper's projected study score. Over Time draws the Recent Average
// line through them; By Paper Year lays them out by the year the paper was set. The student's
// goal (My Goal, in the header) is a dashed amber line in both views.
//
// Over Time runs on a date axis when every paper has a date. If any doesn't, the papers are
// spaced evenly in log order instead, which is the order they were sat (see practice/log.ts).
//
// Every paper is a focusable dot: focus, hover or tap shows its details; Esc, tapping elsewhere
// or moving on closes them, and the arrow keys step along the dots.

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import SegmentedControl from '../../../components/ui/SegmentedControl'
import type { Subject } from '../data.ts'
import { aheadOf, marksText } from '../format.ts'
import { CARD, H2, SUB } from '../shared.tsx'
import { DAY, MONTHS, dayOf, fmtDate, nth } from './dates.ts'
import { GOAL_MAX, GOAL_MIN, WINDOW, allDated, attemptName, parseGoal, rollingAverages, yearsFor, type Scored } from './log.ts'

type View = 'time' | 'paper'
type Rolling = ReturnType<typeof rollingAverages>

const H = 240
const PAD = { top: 18, right: 16, bottom: 28, left: 34 }
/** Same-day papers (or retakes of one paper in By Paper Year) are nudged apart by this much. */
const DODGE = 11

// ── Small hooks ────────────────────────────────────────────────────────────────────────────

/** A callback ref and the element's width, kept current as it resizes. */
function useWidth() {
  const [w, setW] = useState(0)
  const ro = useRef<ResizeObserver | null>(null)
  const ref = useCallback((el: HTMLElement | null) => {
    ro.current?.disconnect()
    ro.current = null
    if (!el) return
    setW(el.clientWidth)
    ro.current = new ResizeObserver(() => setW(el.clientWidth))
    ro.current.observe(el)
  }, [])
  return [ref, w] as const
}

/** Touch screens get bigger invisible hit targets round each dot. */
function useCoarsePointer(): boolean {
  const [coarse] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.('(pointer: coarse)').matches)
  return coarse
}

// ── Axes ───────────────────────────────────────────────────────────────────────────────────

/** x-axis ticks for a span of days: month starts, thinned to fit; weeks if under two months. */
function timeTicks(d0: number, d1: number, maxTicks: number): { day: number; label: string }[] {
  const start = new Date(d0 * DAY)
  const months: { day: number; label: string }[] = []
  for (let y = start.getUTCFullYear(), m = start.getUTCMonth() + 1; ; m++) {
    if (m > 11) {
      y++
      m = 0
    }
    const day = Date.UTC(y, m, 1) / DAY
    if (day > d1) break
    months.push({ day, label: m === 0 ? `Jan ${String(y).slice(2)}` : MONTHS[m] })
  }
  if (months.length >= 2) {
    const step = Math.ceil(months.length / maxTicks)
    return months.filter((_, i) => i % step === 0)
  }
  const weeks: { day: number; label: string }[] = []
  const step = 7 * Math.ceil((d1 - d0) / 7 / maxTicks || 1)
  for (let day = Math.ceil(d0); day <= d1; day += step) {
    const d = new Date(day * DAY)
    weeks.push({ day, label: `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}` })
  }
  return weeks
}

/** Which log positions get an ordinal label (1st 2nd 3rd …) when papers are evenly spaced:
 *  every one if they fit, else every other, else the 1st and every 5th, 10th… */
function orderTicks(n: number, maxTicks: number): number[] {
  const all = Array.from({ length: n }, (_, i) => i)
  const step = [1, 2, 5, 10, 20, 50, 100].find(s => Math.ceil(n / s) <= maxTicks) ?? Math.ceil(n / maxTicks)
  if (step <= 2) return all.filter(i => i % step === 0)
  return [0, ...all.filter(i => (i + 1) % step === 0)]
}

// ── Words ──────────────────────────────────────────────────────────────────────────────────

const mean = (xs: Scored[]) => xs.reduce((s, a) => s + a.proj.exact, 0) / xs.length
const bestOf = (xs: Scored[]) => xs.reduce((a, b) => (b.proj.exact > a.proj.exact ? b : a))

/** "2019 paper, 13 Sept, 2nd try, 40, ahead of 91%" ("2019 paper (5th logged), …" undated). */
function dotLabel(a: Scored): string {
  const name = a.date ? `${a.paper} paper, ${fmtDate(a.date)}` : attemptName(a)
  return `${name}${a.sitting > 1 ? `, ${nth(a.sitting)} try` : ''}, ${a.proj.score}, ${aheadOf(a.proj.pct)}`
}

/** What the chart shows, for screen readers; each paper is also in Your Attempts. */
function summaryOf(scored: Scored[], rolling: Rolling, view: View, goal: number | null): string {
  const n = scored.length
  const best = bestOf(scored)
  const tail = `Best ${best.proj.score} (${best.paper} paper).${goal !== null ? ` Your goal is ${goal}.` : ''} Each paper is listed under Your Attempts.`
  if (view === 'paper') {
    return `Projected study score by paper year. ${n > 1 ? `Your ${n} papers average ${mean(scored).toFixed(1)}. ` : ''}${tail}`
  }
  if (!rolling.length) return `${n} ${n === 1 ? 'paper' : 'papers'} logged. ${tail}`
  const f = (v: number) => v.toFixed(1)
  const from = rolling[0].v
  const now = rolling[rolling.length - 1].v
  const after = `after your ${nth(WINDOW)} paper`
  const trend =
    rolling.length === 1
      ? `Recent Average ${f(now)} ${after}.`
      : f(from) === f(now)
        ? `Recent Average stayed at ${f(now)} from your ${nth(WINDOW)} paper to now.`
        : `Recent Average ${now > from ? 'rose' : 'fell'} from ${f(from)} ${after} to ${f(now)} now.`
  return `${trend} ${tail}`
}

function subtitleOf(view: View, dated: boolean, n: number): string {
  if (view === 'paper') {
    return `Each paper’s projected study score by the year the paper was set.${n > 1 ? ' The grey dashed line is the average of all your papers.' : ''}`
  }
  const dots = dated ? 'Each paper’s projected study score by the date you sat it.' : 'Each paper’s projected study score in the order you sat them.'
  const line = ` The line is your Recent Average: at each paper, the average of that paper and the ${WINDOW - 1} before it.`
  return n >= WINDOW ? dots + line : dots
}

// ── Goal box ───────────────────────────────────────────────────────────────────────────────

const GOAL_HINT = `Goals go up to ${GOAL_MAX}: near full marks this tool reads a few points low.`

/**
 * The My Goal box's own text, so half-typed values ("4" on the way to "40") stay put while the
 * goal itself is only ever a valid whole number or null. Clearing the box removes the goal.
 */
function useGoalBox(subject: Subject, goal: number | null, onGoal: (g: number | null) => void) {
  const shown = (g: number | null) => (g === null ? '' : String(g))
  const [text, setText] = useState(() => shown(goal))
  const [left, setLeft] = useState(false)
  // A goal from elsewhere (a link, another subject) replaces the box unless it already says it.
  useEffect(() => setText(t => (parseGoal(t) === goal ? t : shown(goal))), [goal])
  useEffect(() => {
    setText(shown(goal))
    setLeft(false)
    // Only on a subject change; the effect above follows the goal itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject])

  const change = (v: string) => {
    setText(v)
    setLeft(false)
    const g = parseGoal(v)
    if (g !== goal) onGoal(g)
  }
  const v = Number(text)
  const hint =
    text.trim() === ''
      ? ''
      : v > GOAL_MAX
        ? GOAL_HINT
        : left && parseGoal(text) === null
          ? `Goals are whole numbers from ${GOAL_MIN} to ${GOAL_MAX}.`
          : ''
  return { text, change, leave: () => setLeft(true), hint }
}

// ── Chart ──────────────────────────────────────────────────────────────────────────────────

export default function ProgressChart({
  subject,
  scored,
  goal,
  onGoal,
  onAddPaper,
}: {
  subject: Subject
  scored: Scored[]
  goal: number | null
  onGoal: (g: number | null) => void
  onAddPaper: () => void
}) {
  const headingId = useId()
  const hintId = useId()
  const [view, setView] = useState<View>('time')
  const box = useGoalBox(subject, goal, onGoal)
  const n = scored.length
  const dated = allDated(scored)
  const rolling = rollingAverages(scored)
  const anyRetake = scored.some(a => a.sitting > 1)
  const dotTone = view === 'time' ? 'bg-sky-200 dark:bg-sky-900 border border-sky-600 dark:border-sky-400' : 'bg-sky-600 dark:bg-sky-400'

  return (
    <section aria-labelledby={headingId} className={`@container ${CARD}`}>
      <div className="flex items-start justify-between gap-3">
        <h2 id={headingId} className={H2}>
          Your Progress
        </h2>
        <button
          type="button"
          onClick={onAddPaper}
          className="flex-none inline-flex items-center gap-1.5 rounded-lg border border-gray-300 dark:border-gray-700 px-2.5 py-1.5 [@media(pointer:coarse)]:py-2.5 text-[12.5px] font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <svg width={11} height={11} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
            <path d="M6 2v8M2 6h8" />
          </svg>
          Add a Paper
        </button>
      </div>
      <p className={`${SUB} mt-0.5 max-w-2xl`}>{subtitleOf(view, dated, n)}</p>

      <div className="mt-3 flex flex-col items-start gap-2 @sm:flex-row @sm:flex-wrap @sm:items-center @sm:gap-x-5">
        <SegmentedControl
          aria-label="Chart order"
          value={view}
          onChange={setView}
          options={[
            { value: 'time', label: 'Over Time' },
            { value: 'paper', label: 'By Paper Year' },
          ]}
        />
        <label className="inline-flex items-center gap-2 text-[12px] font-semibold text-gray-500 dark:text-gray-400">
          My Goal
          <input
            type="number"
            inputMode="numeric"
            min={GOAL_MIN}
            max={GOAL_MAX}
            step={1}
            placeholder="—"
            value={box.text}
            onChange={e => box.change(e.target.value)}
            onBlur={box.leave}
            aria-invalid={box.hint ? true : undefined}
            aria-describedby={box.hint ? hintId : undefined}
            className="w-14 h-8 [@media(pointer:coarse)]:h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-1.5 text-center text-[14px] font-semibold tabular-nums text-gray-900 dark:text-white placeholder:font-normal placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <p id={hintId} aria-live="polite" className={box.hint ? 'mt-1.5 text-[12px] text-gray-500 dark:text-gray-400' : 'sr-only'}>
        {box.hint}
      </p>

      {n > 0 ? (
        <Plot subject={subject} scored={scored} rolling={rolling} view={view} dated={dated} goal={goal} />
      ) : (
        <div className="mt-3 h-40 grid place-items-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-[13px] text-gray-500 dark:text-gray-400 text-center px-4">
          Add a paper and its projected study score shows up here.
        </div>
      )}

      {n > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[12px] text-gray-500 dark:text-gray-400">
          {view === 'time' && rolling.length > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="w-4 h-[3px] rounded-full bg-sky-600 dark:bg-sky-400" />
              Recent Average (last {WINDOW})
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className={`w-2.5 h-2.5 rounded-full ${dotTone}`} />
            Single paper
          </span>
          {anyRetake && (
            <span className="inline-flex items-center gap-1.5">
              <svg width={12} height={12} viewBox="0 0 12 12" aria-hidden>
                <path
                  d="M6 0.8L11.2 6L6 11.2L0.8 6Z"
                  strokeWidth={view === 'time' ? 1.3 : 0}
                  className={view === 'time' ? 'fill-sky-200 dark:fill-sky-900 stroke-sky-600 dark:stroke-sky-400' : 'fill-sky-600 dark:fill-sky-400'}
                />
              </svg>
              Retake
            </span>
          )}
          {view === 'time' && n < WINDOW && <span>The Recent Average line starts at your {nth(WINDOW)} paper.</span>}
        </div>
      )}
      {n > 0 && view === 'time' && !dated && (
        <p className="mt-1.5 text-[12px] text-gray-500 dark:text-gray-400">Some papers have no date, so they’re spaced evenly in the order you logged them.</p>
      )}
    </section>
  )
}

// ── Plot ───────────────────────────────────────────────────────────────────────────────────

/** Labels drawn over lines get a halo in the card's own colour so a line never strikes through. */
const HALO = 'stroke-white dark:stroke-gray-900'

function Plot({
  subject,
  scored,
  rolling,
  view,
  dated,
  goal,
}: {
  subject: Subject
  scored: Scored[]
  rolling: Rolling
  view: View
  dated: boolean
  goal: number | null
}) {
  const [widthRef, width] = useWidth()
  const wrap = useRef<HTMLDivElement | null>(null)
  const setWrap = useCallback(
    (el: HTMLDivElement | null) => {
      wrap.current = el
      widthRef(el)
    },
    [widthRef],
  )
  const [active, setActive] = useState<number | null>(null)
  const coarse = useCoarsePointer()

  // A new view moves every dot; close whatever was open.
  useEffect(() => setActive(null), [view])
  // A tap anywhere outside the chart closes the details too, and so does Esc, even when they
  // were opened by hovering (the dot then has no focus to catch the key).
  useEffect(() => {
    if (active === null) return
    const away = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setActive(null)
    }
    const esc = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('pointerdown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [active])

  const n = scored.length
  const time = view === 'time'
  const years = yearsFor(subject)

  // y: a 10-point window at least, on 5s, inside 0–50, always taking in the goal (which may sit
  // on the top or bottom gridline: its label fits in the padding either way).
  const values = [...scored.map(a => a.proj.exact), ...(time ? rolling.map(r => r.v) : [])]
  let lo = Math.max(0, Math.floor((Math.min(...values) - 2) / 5) * 5)
  let hi = Math.min(50, Math.ceil((Math.max(...values) + 2) / 5) * 5)
  if (goal !== null) {
    lo = Math.min(lo, Math.floor(goal / 5) * 5)
    hi = Math.max(hi, Math.ceil(goal / 5) * 5)
  }
  while (hi - lo < 10) {
    if (hi < 50) hi += 5
    else lo -= 5
  }
  const yTicks: number[] = []
  for (let t = lo; t <= hi; t += 5) yTicks.push(t)

  const iw = Math.max(0, width - PAD.left - PAD.right)
  const ih = H - PAD.top - PAD.bottom
  const y = (s: number) => PAD.top + (1 - (s - lo) / (hi - lo)) * ih

  // x: days (every paper dated), log position (some undated), or paper year.
  const order = new Map(scored.map((a, i) => [a.id, i]))
  const slot = (i: number) => PAD.left + ((i + 0.5) / n) * iw
  let baseX: (a: Scored) => number
  let xTicks: { x: number; label: string }[]
  if (time && dated) {
    const days = scored.map(a => dayOf(a.date as string))
    const first = Math.min(...days)
    const last = Math.max(...days)
    const pad = Math.max(3, (last - first) * 0.04)
    const d0 = first - pad
    const d1 = last + pad
    const at = (day: number) => PAD.left + ((day - d0) / (d1 - d0)) * iw
    baseX = a => at(dayOf(a.date as string))
    // Everything on one day: label that day rather than the week around it.
    const ticks = first === last ? [{ day: first, label: fmtDate(scored[0].date as string, false) }] : timeTicks(d0, d1, Math.max(2, Math.floor(iw / 70)))
    xTicks = ticks.map(t => ({ x: at(t.day), label: t.label }))
  } else if (time) {
    baseX = a => slot(order.get(a.id) ?? 0)
    xTicks = orderTicks(n, Math.max(2, Math.floor(iw / 44))).map(i => ({ x: slot(i), label: nth(i + 1) }))
  } else {
    const at = (yr: number) => PAD.left + ((yr - years[0]) / (years.length - 1)) * iw
    baseX = a => at(a.paper)
    xTicks = years.filter((_, i) => iw >= 360 || i % 2 === (years.length - 1) % 2).map(yr => ({ x: at(yr), label: String(yr) }))
  }
  // Papers that would land on one spot (same day; or the same paper in By Paper Year) are
  // spread a little either side of it, in log order.
  const spot = (a: Scored) => (time ? (dated ? a.date ?? '' : `#${a.id}`) : String(a.paper))
  const groups = new Map<string, number[]>()
  for (const a of scored) groups.set(spot(a), [...(groups.get(spot(a)) ?? []), a.id])
  const x = (a: Scored) => {
    const g = groups.get(spot(a)) ?? [a.id]
    const shift = (g.indexOf(a.id) - (g.length - 1) / 2) * DODGE
    return Math.min(width - PAD.right, Math.max(PAD.left, baseX(a) + shift))
  }

  // Dots go in left-to-right order so Tab and the arrow keys move the way the eye does.
  const dots = time ? scored : [...scored].sort((p, q) => p.paper - q.paper || p.id - q.id)
  const avg = mean(scored)
  const lastRoll = rolling[rolling.length - 1]
  // The end label sits just above the line's end, unless the last paper's dot is already there.
  const endY = lastRoll ? y(lastRoll.v) : 0
  const endDotY = lastRoll ? y(lastRoll.a.proj.exact) : 0
  const endLabelY = endDotY < endY - 2 && endDotY > endY - 30 ? endY + 16 : endY - 10
  const rollPath = rolling.map((r, i) => `${i ? 'L' : 'M'}${x(r.a).toFixed(1)},${y(r.v).toFixed(1)}`).join('')
  const hv = scored.find(a => a.id === active)

  const onDotKey = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === 'Escape') {
      setActive(null)
      return
    }
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
    const all = Array.from(wrap.current?.querySelectorAll<SVGGElement>('[data-dot]') ?? [])
    const i = all.indexOf(e.currentTarget)
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? all.length - 1 : e.key === 'ArrowLeft' ? Math.max(0, i - 1) : Math.min(all.length - 1, i + 1)
    e.preventDefault()
    all[next]?.focus()
  }

  return (
    <div ref={setWrap} className="relative mt-3" style={{ height: H }} onMouseLeave={() => setActive(null)} onClick={() => setActive(null)}>
      {width > 0 && (
        <svg width={width} height={H} className="block" role="group" aria-label={summaryOf(scored, rolling, view, goal)}>
          <g aria-hidden>
            {yTicks.map(t => (
              <g key={t}>
                <line x1={PAD.left} x2={width - PAD.right} y1={y(t)} y2={y(t)} className="stroke-gray-100 dark:stroke-gray-800" />
                <text x={PAD.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-gray-500 dark:fill-gray-400 text-[11px] tabular-nums">
                  {t}
                </text>
              </g>
            ))}
            {/* Keyed by position: month names repeat once the dates span more than a year. */}
            {xTicks.map(t => (
              <text key={t.x} x={t.x} y={H - 8} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-[11px] tabular-nums">
                {t.label}
              </text>
            ))}

            {!time && n > 1 && (
              <line x1={PAD.left} x2={width - PAD.right} y1={y(avg)} y2={y(avg)} strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" />
            )}
            {goal !== null && (
              <line x1={PAD.left} x2={width - PAD.right} y1={y(goal)} y2={y(goal)} strokeWidth={1.5} strokeDasharray="6 4" className="stroke-amber-600 dark:stroke-amber-400" />
            )}
            {time && rolling.length > 1 && (
              <path d={rollPath} fill="none" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" className="stroke-sky-600 dark:stroke-sky-400" />
            )}
            {/* With exactly WINDOW papers the average is one point: mark it so its label has an anchor. */}
            {time && rolling.length === 1 && <circle cx={x(lastRoll.a)} cy={y(lastRoll.v)} r={3.5} className="fill-sky-600 dark:fill-sky-400" />}
          </g>

          {dots.map(a => {
            const on = active === a.id
            const cx = x(a)
            const cy = y(a.proj.exact)
            const tone =
              view === 'time' ? 'fill-sky-200 dark:fill-sky-900 stroke-sky-600 dark:stroke-sky-400' : 'fill-sky-600 dark:fill-sky-400 stroke-white dark:stroke-gray-900'
            const strokeWidth = view === 'time' ? 1.5 : 2
            const d = on ? 8.5 : 6.5
            return (
              <g
                key={a.id}
                data-dot
                tabIndex={0}
                role="img"
                aria-label={dotLabel(a)}
                className="group cursor-pointer outline-none"
                onFocus={() => setActive(a.id)}
                onBlur={() => setActive(cur => (cur === a.id ? null : cur))}
                onMouseEnter={() => setActive(a.id)}
                onClick={e => {
                  e.stopPropagation()
                  setActive(a.id)
                }}
                onKeyDown={onDotKey}
              >
                <circle cx={cx} cy={cy} r={coarse ? 20 : 14} fill="transparent" />
                <circle cx={cx} cy={cy} r={12} fill="none" strokeWidth={2} className="stroke-transparent group-focus-visible:stroke-blue-500" />
                {a.sitting > 1 ? (
                  <path d={`M${cx},${cy - d}L${cx + d},${cy}L${cx},${cy + d}L${cx - d},${cy}Z`} strokeWidth={strokeWidth} strokeLinejoin="round" className={tone} />
                ) : (
                  <circle cx={cx} cy={cy} r={on ? 6.5 : 5} strokeWidth={strokeWidth} className={tone} />
                )}
              </g>
            )
          })}

          {/* Labels last, haloed, so neither a line nor a dot can cover them. */}
          <g aria-hidden className="pointer-events-none text-[11px]">
            {goal !== null && (
              <text x={PAD.left + 3} y={y(goal) - 5} strokeWidth={4} strokeLinejoin="round" paintOrder="stroke" className={`fill-amber-700 dark:fill-amber-300 font-semibold ${HALO}`}>
                Goal {goal}
              </text>
            )}
            {time && lastRoll && (
              <text
                x={Math.min(x(lastRoll.a) + 8, width - PAD.right)}
                y={endLabelY}
                textAnchor={x(lastRoll.a) + 40 > width - PAD.right ? 'end' : 'start'}
                strokeWidth={4}
                strokeLinejoin="round"
                paintOrder="stroke"
                className={`fill-gray-700 dark:fill-gray-200 font-semibold tabular-nums ${HALO}`}
              >
                {Math.round(lastRoll.v)}
              </text>
            )}
            {!time && n > 1 && (
              <text
                x={width - PAD.right}
                y={y(avg) - 6}
                textAnchor="end"
                strokeWidth={4}
                strokeLinejoin="round"
                paintOrder="stroke"
                className={`fill-gray-500 dark:fill-gray-400 tabular-nums ${HALO}`}
              >
                {n === 2 ? 'Both Papers' : `All ${n} Papers`}: {avg.toFixed(1)}
              </text>
            )}
          </g>
        </svg>
      )}
      {hv && width > 0 && <Tip subject={subject} a={hv} left={Math.min(Math.max(x(hv), 92), width - 92)} dotY={y(hv.proj.exact)} />}
    </div>
  )
}

// ── Tooltip ────────────────────────────────────────────────────────────────────────────────

/** A paper's details, above its dot (below it when the dot is near the top). The dot's own
 *  label already says all this to screen readers. */
function Tip({ subject, a, left, dotY }: { subject: Subject; a: Scored; left: number; dotY: number }) {
  const below = dotY < 70
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-10 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2.5 py-1.5 text-[12px] leading-snug shadow-lg whitespace-nowrap"
      style={{ left, top: below ? dotY + 16 : dotY - 16, transform: below ? 'translateX(-50%)' : 'translate(-50%, -100%)' }}
    >
      <div className="font-semibold">
        {a.paper} paper{a.sitting > 1 ? ` (${nth(a.sitting)} try)` : ''} · {a.proj.score}
      </div>
      <div className="opacity-80 tabular-nums">
        {a.date ? fmtDate(a.date) : 'No date'} · {aheadOf(a.proj.pct)}
      </div>
      <div className="opacity-80 tabular-nums">{marksText(subject, a.marks)}</div>
    </div>
  )
}
