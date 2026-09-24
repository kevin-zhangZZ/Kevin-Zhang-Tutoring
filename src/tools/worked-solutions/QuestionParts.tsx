// Shared building blocks for a multi-part written solution: one card per exam part
// (statement + marks + a working/reasoning table + examiner's report + video slot).

import { Children, Fragment, cloneElement, createContext, isValidElement, useContext, useEffect, useState, type ReactNode } from 'react'
import VideoPlayer, { DropboxLink } from './VideoPlayer'
import { useStudyMode } from './studyMode'

// VCAA examination-report stats for one part of a short-answer question: the percentage
// of students who scored each mark (index = mark value, e.g. marks[0] = % who scored 0),
// the average mark, and the examiner's written comment (if the report included one).
export interface SAExaminerStats {
  marks: number[]
  average: number
  comment?: ReactNode
}

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
    if (child.type === Fragment) {
      return cloneElement(child, undefined, gateChildren((child.props as { children?: ReactNode }).children, show))
    }
    return show ? child : null
  })
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

  return (
    <RevealCtx.Provider value={{ done, setDone }}>
      {/* On phones the part is a plain section under a divider rather than a bordered card, so
          the maths gets the full width instead of losing it to a third level of padding. */}
      <div
        data-part={letter}
        data-topic={topic}
        id={`part-${letter}`}
        className="scroll-mt-16 border-t pt-6 sm:pt-6 sm:border sm:rounded-2xl sm:p-6 border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            <span className="flex-none w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-display text-sm font-bold flex items-center justify-center">
              {letter}
            </span>
            <div className="text-[14px] text-gray-800 dark:text-gray-200 leading-relaxed pt-0.5">{statement}</div>
          </div>
          <span className="flex-none text-[11px] font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap pt-1">
            {marks} mark{marks === 1 ? '' : 's'}
          </span>
        </div>

        <div className="sm:pl-10 flex flex-col gap-5">
          {gateChildren(children, !hideAnswers || done)}

          {examinerReport && <SAExaminerReport stats={examinerReport} maxMarks={marks} />}

          {videoSrc && (
            <div data-video>
              <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
                Video Walkthrough
              </p>
              {videoIsExternal ? (
                <DropboxLink src={videoSrc} label={`part (${letter})`} />
              ) : (
                <VideoPlayer src={videoSrc} label={`part (${letter})`} />
              )}
            </div>
          )}
        </div>
      </div>
    </RevealCtx.Provider>
  )
}

// A short recap of the theory a part depends on, shown above that part's working — what
// "average rate of change" actually means, how a transformation acts on a graph, why an
// inverse function's tangent is the reflected one, and so on. The worked solutions assume a
// student is reading alone with no teacher to ask, so anything the question quietly relies
// on gets stated here rather than left implicit in the algebra.
export function Background({ children, title = 'Background' }: { children: ReactNode; title?: string }) {
  return (
    <div className="rounded-xl border border-sky-100 dark:border-sky-900/50 bg-sky-50/70 dark:bg-sky-950/20 px-4 py-3">
      <p className="text-[11px] font-bold tracking-wider text-sky-700 dark:text-sky-300 mb-1.5">{title}</p>
      <div className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-300 space-y-2">{children}</div>
    </div>
  )
}

// Marks-distribution table + comment for one part of a short-answer question, as published
// in the VCAA examination report (e.g. "Marks 0 1 2 | % 7 15 78 | Average 1.7"). On phones the
// table becomes a small bar chart, one column per mark, so no column (usually Average) gets
// cut off. In "Hide answers" mode it waits until the working above it is fully revealed, since
// the examiner's comment usually names the answer.
export function SAExaminerReport({ stats, maxMarks }: { stats: SAExaminerStats; maxMarks: number }) {
  const { hideAnswers } = useStudyMode()
  const reveal = useContext(RevealCtx)
  if (hideAnswers && reveal && !reveal.done) return null

  return (
    <div>
      <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
        Examiner's Report
      </p>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="sm:hidden px-3 pt-3 pb-2.5">
          <div className="grid gap-1.5 items-end" style={{ gridTemplateColumns: `repeat(${maxMarks + 1}, minmax(0, 1fr))` }}>
            {stats.marks.map((p, m) => (
              <div key={m} className="flex flex-col items-center gap-1">
                <span className="text-[11px] tabular-nums text-gray-500 dark:text-gray-400">{p}%</span>
                <div
                  className="w-full rounded-t bg-sky-200 dark:bg-sky-800/70"
                  style={{ height: `${Math.max(3, Math.round(p * 0.56))}px` }}
                />
                <span className="text-[11.5px] font-semibold text-gray-700 dark:text-gray-300">{m}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-baseline mt-2 text-[11px] text-gray-400 dark:text-gray-500">
            <span className="font-bold tracking-wider">Marks</span>
            <span>
              Average <b className="text-[12.5px] text-sky-700 dark:text-sky-300">{stats.average}</b> / {maxMarks}
            </span>
          </div>
        </div>
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-center text-[12.5px] border-collapse min-w-[280px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/60">
                <th className="px-3 py-2 text-left text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500 border-b border-r border-gray-200 dark:border-gray-800">
                  Marks
                </th>
                {Array.from({ length: maxMarks + 1 }, (_, m) => (
                  <th key={m} className="px-3 py-2 font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">
                    {m}
                  </th>
                ))}
                <th className="px-3 py-2 font-bold text-gray-700 dark:text-gray-300 border-b border-l border-gray-200 dark:border-gray-800 whitespace-nowrap">
                  Average
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 text-left text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500 border-r border-gray-200 dark:border-gray-800">%</td>
                {stats.marks.map((p, m) => (
                  <td key={m} className="px-3 py-2 text-gray-800 dark:text-gray-100">{p}</td>
                ))}
                <td className="px-3 py-2 font-bold text-sky-700 dark:text-sky-300 border-l border-gray-200 dark:border-gray-800">{stats.average}</td>
              </tr>
            </tbody>
          </table>
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
      <p className="text-[12px] text-gray-400 dark:text-gray-500">
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
export interface WorkingRow {
  working: ReactNode
  reason?: ReactNode
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
  const { hideAnswers } = useStudyMode()
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
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500">Worked Solution</p>
          {stepping && (
            <span className="font-display text-[11px] font-bold tabular-nums text-gray-400 dark:text-gray-500">
              {shown} / {rows.length} steps
            </span>
          )}
        </div>
      )}
      {visibleCount === 0 ? (
        <div className="rounded-xl border-[1.5px] border-dashed border-gray-300 dark:border-gray-700 px-4 py-5 text-center text-[13px] text-gray-400 dark:text-gray-500">
          Have a go first. The working is hidden until you ask for it.
        </div>
      ) : (
        <div className="@container rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="hidden @2xl:grid @2xl:grid-cols-2 bg-gray-50 dark:bg-gray-800/60">
            <div className="px-4 py-2 border-r border-gray-200 dark:border-gray-800 text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500">
              Working
            </div>
            <div className="px-4 py-2 text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500">
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
              {row.reason && (
                <div className="px-3 sm:px-4 pb-3 pt-1 @2xl:pt-3 @2xl:self-center text-[12.5px] leading-relaxed text-gray-500 dark:text-gray-400 border-t @2xl:border-t-0 border-dashed border-gray-100 dark:border-gray-800">
                  <p className="@2xl:hidden text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-1 mt-2">
                    Reasoning
                  </p>
                  {row.reason}
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
