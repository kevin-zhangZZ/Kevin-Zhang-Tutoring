// Shared building blocks for a multi-part written solution: one card per exam part
// (statement + marks + a working/reasoning table + examiner's report + video slot).

import { Children, Fragment, cloneElement, createContext, isValidElement, useContext, useEffect, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import VideoPlayer, { DropboxLink } from './VideoPlayer'
import { useStudyMode } from './studyMode'
import { Explore } from './Explore'

// VCAA examination-report stats for one part of a short-answer question: the percentage
// of students who scored each mark (index = mark value, e.g. marks[0] = % who scored 0),
// the average mark, and the examiner's written comment (if the report included one).
export interface SAExaminerStats {
  marks: number[]
  average: number
  comment?: ReactNode
}

// VCAA prints averages to at least one decimal place ("1.0", "0.0"), but a whole number
// stored as `average: 1` would render as "1".
const formatAverage = (a: number) => (Number.isInteger(a) ? a.toFixed(1) : String(a))

export type MCQLetter = 'A' | 'B' | 'C' | 'D' | 'E'

// VCAA examination-report stats for a multiple-choice question: the percentage of
// students who chose each option (correct one flagged via `answer`), % who left it
// blank, and the examiner's written comment (if the report included one). `answer` is
// normally a single letter, but a small number of VCAA questions each year turn out to
// have no single defensible correct answer — VCAA itself retroactively accepts two or
// all four/five options as correct after review. `answer` accepts an array for exactly
// this case, and `flawed` carries the caveat explaining why (see MCQShell's `flawed`
// prop, which surfaces the same explanation up front rather than only in this tab).
export interface MCQExaminerStats {
  percentages: Partial<Record<MCQLetter, number>>
  answer: MCQLetter | MCQLetter[]
  noAnswer?: number
  comment?: ReactNode
  flawed?: ReactNode
}

// "Hide answers" mode (see studyMode.tsx) reveals working one row at a time. A WorkingTable
// reports through this context once every row is showing, and the things that would give the
// answer away before then — the part's finished sketch or diagram, and its examiner's report —
// wait for that. Each PartCard provides its own; a single-part question (a WorkingTable and an
// SAExaminerReport with no PartCard around them) uses the question-wide RevealScope that the
// tool mounts around every question.
interface Reveal {
  done: boolean
  setDone: (done: boolean) => void
}

const RevealCtx = createContext<Reveal | null>(null)

export function RevealScope({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false)
  return <RevealCtx.Provider value={{ done, setDone }}>{children}</RevealCtx.Provider>
}

// In "Hide answers" mode, a part shows its statement, any Background and the step-through
// WorkingTable straight away; everything else among its children (in practice the finished
// sketch or diagram) is held back until the working is fully revealed. The children keep the
// same structure and keys whether shown or not — otherwise revealing the last step would
// remount the WorkingTable and reset it to zero steps.
function gateChildren(children: ReactNode, show: boolean): ReactNode {
  return Children.map(children, child => {
    if (!isValidElement(child)) return show ? child : null
    if (child.type === WorkingTable || child.type === Background) return child
    if (child.type === Explore && (child.props as { spoilerFree?: boolean }).spoilerFree) return child
    if (child.type === Fragment) {
      return cloneElement(child, undefined, gateChildren((child.props as { children?: ReactNode }).children, show))
    }
    return show ? child : null
  })
}

// The rail beside each part, and the label that rides down it, need to know the question they're
// in and how to move about it. The tool (index.tsx) provides this around the open question;
// anywhere else a PartCard renders without a rail.
export interface PartNav {
  /** The question's code without its parts, e.g. "Q4". */
  code: string
  /** The question's part letters, in order. */
  parts: string[]
  jumpTo: (letter: string) => void
  /** Back to the very top of the question. */
  jumpTop: () => void
  /** Press on a label: opens the ladder of parts, which follows the finger until it lifts. */
  startSlide: (e: ReactPointerEvent<HTMLElement>, letter: string) => void
}

export const PartNavCtx = createContext<PartNav | null>(null)

const Chevron = ({ up }: { up?: boolean }) => (
  <svg viewBox="0 0 10 6" aria-hidden="true">
    <path
      d={up ? 'M1.5 4.75 5 1.25 8.5 4.75' : 'M1.5 1.25 5 4.75 8.5 1.25'}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// A part's rail and its label. Light blue beside the parts in view, dark beside the one in focus
// (its top past the middle of the screen); the focused part's label carries the question code and
// ▴ / ▾ to step between parts — ▴ on the first part goes to the top of the question, and the last
// part has no ▾, so the arrows never leave the question. Pressing the label opens a ladder of the
// parts to slide along. Which part is in focus, and which have been seen, are data attributes the
// tool sets on the part (usePartTracking), so scrolling restyles the rails without re-rendering
// the solution. Rendered twice per part: in the page margin on phones (`part`) and in the answer's
// indent under the letter circle from `sm` up (`answer`); index.css shows the right one, and drops
// the label on laptops, where the question list beside the solution does that job. The label is
// for touch and pointer: keyboard and screen-reader users have the part headings and the list.
function PartRail({ letter, host }: { letter: string; host: 'part' | 'answer' }) {
  const nav = useContext(PartNavCtx)
  if (!nav || !letter) return null
  const i = nav.parts.indexOf(letter)
  const prev = i > 0 ? nav.parts[i - 1] : null
  const next = i > -1 && i < nav.parts.length - 1 ? nav.parts[i + 1] : null
  return (
    <span className={`ws-railbox ws-railbox-${host}`} aria-hidden="true">
      <span className="ws-rail" />
      <span className="ws-railcol">
        <span className="ws-ride">
          <button type="button" tabIndex={-1} className="ws-ride-ar" onClick={() => (prev ? nav.jumpTo(prev) : nav.jumpTop())}>
            <Chevron up />
          </button>
          <span className="ws-ride-mid" onPointerDown={e => nav.startSlide(e, letter)}>
            <span className="ws-ride-q">{nav.code}</span>
            <span>{letter}</span>
          </span>
          {next && (
            <button type="button" tabIndex={-1} className="ws-ride-ar" onClick={() => nav.jumpTo(next)}>
              <Chevron />
            </button>
          )}
        </span>
      </span>
    </span>
  )
}

export function PartCard({
  letter,
  topic,
  marks,
  statement,
  examinerReport,
  videoSrc,
  videoIsExternal,
  children,
}: {
  letter: string
  /** A one- to three-word subtopic for this part ("Confidence Interval", "Chain Rule"),
   *  shown in the sidebar's parts list and on the sticky part bar. Collected into
   *  partStats.ts by `npm run part-stats`. */
  topic?: string
  marks: number
  statement: ReactNode
  /** VCAA examination-report stats for this part — omit if not yet transcribed. */
  examinerReport?: SAExaminerStats
  /** Omit while no video has been recorded yet — the part then has no video section at all. */
  videoSrc?: string
  videoIsExternal?: boolean
  children: ReactNode
}) {
  const { hideAnswers } = useStudyMode()
  const [done, setDone] = useState(false)
  // The examiner's comment usually names the answer, so in "Hide answers" mode it waits until
  // the working is fully revealed. A part with no video has no video section at all.
  const report = examinerReport && (!hideAnswers || done) ? <SAExaminerReport stats={examinerReport} maxMarks={marks} /> : null
  const video = videoSrc ? (
    <Video src={videoSrc} external={videoIsExternal} label={`part (${letter})`} />
  ) : null
  const shelf = report || video

  return (
    <RevealCtx.Provider value={{ done, setDone }}>
      {/* On phones the part is a plain section under a divider rather than a bordered card, so
          the maths gets the full width instead of losing it to a third level of padding. */}
      <div
        data-part={letter}
        data-topic={topic}
        id={`part-${letter}`}
        className={`ws-part relative scroll-mt-16 border-t pt-6 sm:pt-6 sm:border sm:rounded-2xl sm:p-6 border-gray-200 dark:border-gray-800 ${shelf ? 'sm:pb-0' : ''}`}
      >
        <PartRail letter={letter} host="part" />
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            {/* The part's heading (h3, under the question's h2), so screen readers can jump part to part.
                With a rail on a phone, the letter lives on the rail instead and this circle is kept
                for screen readers only (index.css). */}
            <h3 className="ws-part-circle flex-none w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-display text-sm font-bold flex items-center justify-center">
              <span className="sr-only">Part </span>
              {letter}
            </h3>
            <div className="text-[14px] text-gray-800 dark:text-gray-200 leading-relaxed pt-0.5">{statement}</div>
          </div>
          <span className="flex-none text-[11px] font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap pt-1">
            {marks} mark{marks === 1 ? '' : 's'}
          </span>
        </div>

        {/* The shelf sits inside this indented column so the part rail runs on down through it,
            stopping short of the card's foot (ws-rail-inset, index.css). */}
        <div className={`relative sm:pl-10 flex flex-col gap-5 ${shelf ? 'ws-rail-inset' : ''}`}>
          <PartRail letter={letter} host="answer" />
          {gateChildren(children, !hideAnswers || done)}
          {shelf && (
            <Shelf video={video} className="mt-1 rounded-xl sm:rounded-none sm:rounded-b-2xl px-4 sm:-ml-16 sm:-mr-6 sm:pl-16 sm:pr-6">
              {report}
            </Shelf>
          )}
        </div>
      </div>
    </RevealCtx.Provider>
  )
}

function Video({ src, external, label }: { src: string; external?: boolean; label: string }) {
  return external ? <DropboxLink src={src} label={label} /> : <VideoPlayer src={src} label={label} />
}

// Everything *about* a question rather than the working itself (VCAA's examiner's report and the
// video walkthrough) sits on a grey shelf across the foot of its card, so the change of surface
// separates the two without any labels needing to shout. Report on the left and video on the
// right when the card is wide enough; stacked otherwise. `className` sets the negative margins
// that take the shelf out to its card's edges.
function Shelf({ video, className, children }: { video: ReactNode; className: string; children: ReactNode }) {
  return (
    <div className={`border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 py-4 sm:pb-5 ${className}`}>
      {/* The container query lives on this unpainted box: containment on the painted one above
          would lift its background over the part rail. */}
      <div className="@container">
        <div className={`grid gap-5 ${children && video ? '@3xl:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]' : ''}`}>
          {children && <div className="min-w-0">{children}</div>}
          {video && (
            <div data-video className="min-w-0">
              <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-violet-700 dark:text-violet-300 mb-2.5">
                <svg viewBox="0 0 16 16" className="w-3 h-3 flex-none" fill="currentColor" aria-hidden="true">
                  <path d="M5 3.2v9.6c0 .5.5.8.9.5l7-4.8a.6.6 0 000-1L5.9 2.7c-.4-.3-.9 0-.9.5z" />
                </svg>
                Video Walkthrough
              </p>
              {video}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// The shelf for a single-part question: the examiner's report (and a video, once there is one)
// at the foot of the question's card, whose padding is p-5 / sm:p-6.
export function ReportShelf({ stats, maxMarks, videoSrc, videoIsExternal }: { stats: SAExaminerStats; maxMarks: number; videoSrc?: string; videoIsExternal?: boolean }) {
  const { hideAnswers } = useStudyMode()
  const reveal = useContext(RevealCtx)
  const report = hideAnswers && reveal && !reveal.done ? null : <SAExaminerReport stats={stats} maxMarks={maxMarks} />
  const video = videoSrc ? <Video src={videoSrc} external={videoIsExternal} label="this question" /> : null
  if (!report && !video) return null
  return (
    <Shelf video={video} className="-mx-5 -mb-5 sm:-mx-6 sm:-mb-6 rounded-b-2xl px-5 sm:px-6">
      {report}
    </Shelf>
  )
}

// A short recap of the theory a part depends on, shown above that part's working — what
// "average rate of change" actually means, how a transformation acts on a graph, why an
// inverse function's tangent is the reflected one, and so on. The worked solutions assume a
// student is reading alone with no teacher to ask, so anything the question quietly relies
// on gets stated here rather than left implicit in the algebra.
//
// Teaching, so Detailed view only (studyMode.tsx) — except with `always`, for the few that aren't
// teaching: a single-part question's stem, or a notice that some parts are left out.
export function Background({ children, title = 'Background', always }: { children: ReactNode; title?: string; always?: boolean }) {
  const { detailed } = useStudyMode()
  if (!detailed && !always) return null
  return (
    <div className="rounded-xl border border-sky-100 dark:border-sky-900/50 bg-sky-50/70 dark:bg-sky-950/20 px-4 py-3">
      <p className="text-[11px] font-bold tracking-wider text-sky-700 dark:text-sky-300 mb-1.5">{title}</p>
      <div className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-300 space-y-2">{children}</div>
    </div>
  )
}

// Teaching material that isn't one of the shared boxes — a wrapper card around a question-level
// Background, a CAS aside, and so on. Shown only in the Detailed view (studyMode.tsx); Background,
// WrongMethod and Explore already hide themselves in the Concise view.
export function DetailOnly({ children }: { children: ReactNode }) {
  const { detailed } = useStudyMode()
  return detailed ? <>{children}</> : null
}

// A tempting wrong method and exactly where it breaks — what a teacher says after marking a pile
// of scripts: "a lot of you did this; here's why it doesn't work." Sits after the working
// (AUTHORING_GUIDE §15.4). `working` is the wrong working as a student would write it; the
// children say where and why it goes wrong, and how to catch it next time.
export function WrongMethod({
  title,
  source,
  working,
  children,
}: {
  /** The wrong idea, in the words a student would think it: "Integrate f − f⁻¹ from 0 to 1". */
  title: ReactNode
  /** How we know it's common: "Examiner's report", "31% chose A". */
  source?: ReactNode
  working?: ReactNode
  children: ReactNode
}) {
  const { detailed } = useStudyMode()
  if (!detailed) return null
  return (
    <div data-wrong-method className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/20 px-4 py-3">
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-rose-700 dark:text-rose-300">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" aria-hidden="true">
            <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.15" />
            <path d="M5.2 5.2l5.6 5.6M10.8 5.2l-5.6 5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Common Mistake
        </p>
        {source && <span className="flex-none text-[11px] text-rose-700/80 dark:text-rose-300/80">{source}</span>}
      </div>
      <p className="text-[13.5px] font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</p>
      {working && (
        <div className="mb-2.5 rounded-lg bg-white dark:bg-gray-900 border-l-[3px] border-rose-300 dark:border-rose-700 px-3 py-2 text-[13.5px] text-gray-700 dark:text-gray-200 space-y-1">
          {working}
        </div>
      )}
      <div className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-300 space-y-2">{children}</div>
    </div>
  )
}

// A note that the current Chemistry Data Book gives a different value from the one the paper
// and report used (AUTHORING_GUIDE §14.4). Sits inside a working row's `reason`, after the
// reasoning itself, as a yellow callout with a warning sign so it isn't missed.
export function DataBookNote({ children }: { children: ReactNode }) {
  return (
    <span className="mt-2 flex gap-2 items-start rounded-lg border border-amber-300 dark:border-amber-700/70 bg-amber-50 dark:bg-amber-950/40 px-3 py-2 text-amber-900 dark:text-amber-100">
      <svg viewBox="0 0 24 24" className="flex-none w-[18px] h-[18px] mt-px" role="img" aria-label="Warning">
        <path d="M12 2.8 1.6 20.8h20.8L12 2.8Z" fill="#FACC15" stroke="#A16207" strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="10.95" y="8.6" width="2.1" height="6.9" rx="1.05" fill="#422006" />
        <circle cx="12" cy="17.9" r="1.2" fill="#422006" />
      </svg>
      <span>
        <b>Data Book update:</b> {children}
      </span>
    </span>
  )
}

// Marks distribution + comment for one part of a short-answer question, as published in the VCAA
// examination report (e.g. "Marks 0 1 2 | % 7 15 78 | Average 1.7"), drawn as one grey bar split
// by mark: 0 marks palest on the left to full marks darkest on the right, each section's mark
// above it and its % inside. A part most students got right reads dark and one most got wrong
// reads pale before any number is read, and the grey keeps it from competing with the working.
// In "Hide answers" mode it waits until the working above it is fully revealed, since the
// examiner's comment usually names the answer.
export function SAExaminerReport({ stats, maxMarks }: { stats: SAExaminerStats; maxMarks: number }) {
  const { hideAnswers } = useStudyMode()
  const reveal = useContext(RevealCtx)
  if (hideAnswers && reveal && !reveal.done) return null

  const last = stats.marks.length - 1
  return (
    <div>
      <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">Examiner's Report</p>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900">
        <div className="flex items-end gap-5 px-4 py-3">
          <div className="flex-1 flex gap-px" role="img" aria-label={stats.marks.map((p, m) => `${p}% scored ${m}`).join(', ')}>
            {stats.marks.map((p, m) => (
              // Sized by share, with a floor so a 2% section still has room for its label.
              <div key={m} className="flex flex-col gap-1" style={{ flex: `${Math.max(p, 0.01)} 1 0`, minWidth: 34 }}>
                <span className="text-[11px] font-semibold tabular-nums text-center text-gray-600 dark:text-gray-300">{m}</span>
                <span
                  className={`h-5 flex items-center justify-center text-[10.5px] font-semibold tabular-nums whitespace-nowrap ${markShade(m, maxMarks)} ${
                    m === 0 ? 'rounded-l-md' : ''
                  } ${m === last ? 'rounded-r-md' : ''}`}
                >
                  {p}%
                </span>
              </div>
            ))}
          </div>
          <span className="pb-0.5 text-[12px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Average <b className="text-[13px] font-bold tabular-nums text-gray-800 dark:text-gray-100">{formatAverage(stats.average)}</b> / {maxMarks}
          </span>
        </div>
        {stats.comment && (
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 text-[12.5px] leading-relaxed text-gray-600 dark:text-gray-400">
            {stats.comment}
          </div>
        )}
      </div>
    </div>
  )
}

// Grey for a mark out of maxMarks, with a text colour that reads on it: 0 marks palest, full
// marks darkest, whatever the number of marks.
const MARK_SHADES = [
  'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
  'bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-100',
  'bg-gray-400 text-white dark:bg-gray-500 dark:text-white',
  'bg-gray-500 text-white dark:bg-gray-400 dark:text-gray-900',
  'bg-gray-600 text-white dark:bg-gray-300 dark:text-gray-900',
]
const markShade = (m: number, max: number) => MARK_SHADES[max === 0 ? 0 : Math.round((m / max) * (MARK_SHADES.length - 1))]

// The MCQ's Examiner's Report tab. The %A–E distribution itself is drawn as bars on the
// options (see MCQShell), so this carries what the bars can't: the flagged-question caveat,
// the examiner's written comment and the no-answer rate.
export function ExaminerReport({ stats }: { stats: MCQExaminerStats }) {
  return (
    <div className="flex flex-col gap-3">
      {stats.flawed && (
        <div className="flex gap-2.5 items-start rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-[12.5px] leading-relaxed text-amber-900 dark:text-amber-200">
          <span className="flex-none text-base leading-none mt-0.5">⚠️</span>
          <div>
            <p className="font-bold tracking-wide mb-1">VCAA-Flagged Question</p>
            {stats.flawed}
          </div>
        </div>
      )}
      {stats.comment && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 text-[12.5px] leading-relaxed text-gray-600 dark:text-gray-400">
          {stats.comment}
        </div>
      )}
      <p className="text-[12px] text-gray-500 dark:text-gray-400">
        {Object.keys(stats.percentages).length > 0 ? (
          <>The bars on the options show how students answered. {stats.noAnswer ?? 0}% left it blank.</>
        ) : (
          <>VCAA&rsquo;s report gives no response percentages for this question.</>
        )}
      </p>
    </div>
  )
}

// One row of the working/reasoning table. `working` is what a student would actually write
// on the exam page (equations, substitutions, the final boxed answer); `reason` is the
// explanatory "why" for that line — omit it for a row that's just algebraic manipulation
// with nothing new to explain, and the cell renders empty.
//
// `more` is the teacher's elaboration on that line — the longer "why", a check, the trap to
// avoid — shown under `reason` in the Detailed view only (studyMode.tsx). Keep `reason` to what
// a student needs to follow the line on their own, so the Concise view stays uncluttered.
export interface WorkingRow {
  working: ReactNode
  reason?: ReactNode
  more?: ReactNode
}

// The Working/Reasoning split only works as two side-by-side columns once there's genuinely
// enough width for both — squeeze it (a narrow browser window, a collapsed-but-still-present
// sidebar, a high page zoom) and a two-column split forces every equation into a sliver too
// narrow for even simple expressions, which is exactly the horizontal-scrollbar problem this
// is trying to avoid. `@container` here means the breakpoint below responds to this table's
// own rendered width, not the viewport's — the correct thing to key off, since the same
// viewport width can leave this table anywhere from full-bleed to squeezed depending on
// whether the tool sidebar and the app's own nav rail are open. Below that width, Working and
// Reasoning stack (in DOM order, so Working still comes first) and each gets the full card
// width instead of half of it.
//
// In "Hide answers" mode the rows are revealed one step at a time (Show next step / Show all),
// so a student who is stuck can take a single hint rather than the whole answer. `alwaysShow`
// opts out — MCQShell uses it, since there choosing an option is the reveal. `hideLabel`
// drops the "Worked Solution" heading where a tab of the same name already says it.
export function WorkingTable({
  rows,
  alwaysShow,
  hideLabel,
}: {
  rows: WorkingRow[]
  alwaysShow?: boolean
  hideLabel?: boolean
}) {
  const { hideAnswers, detailed } = useStudyMode()
  const reveal = useContext(RevealCtx)
  const stepping = hideAnswers && !alwaysShow
  const [shown, setShown] = useState(0)
  const visibleCount = stepping ? shown : rows.length
  const complete = visibleCount >= rows.length

  const setDone = reveal?.setDone
  useEffect(() => {
    setDone?.(complete)
  }, [complete, setDone])

  return (
    <div>
      {(!hideLabel || stepping) && (
        <div className="flex items-baseline justify-between gap-3 mb-2.5">
          <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400">Worked Solution</p>
          {stepping && (
            <span className="font-display text-[11px] font-bold tabular-nums text-gray-500 dark:text-gray-400">
              {shown} / {rows.length} steps
            </span>
          )}
        </div>
      )}
      {visibleCount === 0 ? (
        <div className="rounded-xl border-[1.5px] border-dashed border-gray-300 dark:border-gray-700 px-4 py-5 text-center text-[13px] text-gray-500 dark:text-gray-400">
          Have a go first. The working is hidden until you ask for it.
        </div>
      ) : (
        <div className="@container rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="hidden @2xl:grid @2xl:grid-cols-2 bg-gray-50 dark:bg-gray-800/60">
            <div className="px-4 py-2 border-r border-gray-200 dark:border-gray-800 text-[10px] font-bold tracking-wider text-gray-500 dark:text-gray-400">
              Working
            </div>
            <div className="px-4 py-2 text-[10px] font-bold tracking-wider text-gray-500 dark:text-gray-400">
              Reasoning
            </div>
          </div>
          {rows.slice(0, visibleCount).map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 @2xl:grid-cols-2 ${i > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}`}
            >
              <div className="px-3 sm:px-4 py-3 @2xl:border-r border-gray-100 dark:border-gray-800 self-center space-y-1.5 text-[13.5px] text-gray-800 dark:text-gray-100">
                {row.working}
              </div>
              {(row.reason || (detailed && row.more)) && (
                <div className="px-3 sm:px-4 pb-3 pt-1 @2xl:pt-3 @2xl:self-center text-[12.5px] leading-relaxed text-gray-500 dark:text-gray-400 border-t @2xl:border-t-0 border-dashed border-gray-100 dark:border-gray-800">
                  <p className="@2xl:hidden text-[10px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-1 mt-2">
                    Reasoning
                  </p>
                  {row.reason}
                  {detailed && row.more && <div data-more className={row.reason ? 'mt-1.5 space-y-1.5' : 'space-y-1.5'}>{row.more}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {stepping && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {complete ? (
            <button
              type="button"
              onClick={() => setShown(0)}
              className="text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Hide working
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShown(s => Math.min(rows.length, s + 1))}
                className="text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
              >
                {shown === 0 ? 'Show first step' : 'Show next step'}
              </button>
              <button
                type="button"
                onClick={() => setShown(rows.length)}
                className="text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Show all
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
