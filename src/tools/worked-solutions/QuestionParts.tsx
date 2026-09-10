// Shared building blocks for a multi-part written solution: one card per exam part
// (statement + marks + a working/reasoning table + examiner's report + video slot).

import { ReactNode } from 'react'
import VideoPlayer, { DropboxLink } from './VideoPlayer'

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

export function PartCard({
  letter,
  marks,
  statement,
  examinerReport,
  videoSrc,
  videoIsExternal,
  children,
}: {
  letter: string
  marks: number
  statement: ReactNode
  /** VCAA examination-report stats for this part — omit if not yet transcribed. */
  examinerReport?: SAExaminerStats
  /** Omit while no video has been recorded yet — shows a "coming soon" note instead. */
  videoSrc?: string
  videoIsExternal?: boolean
  children: ReactNode
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <span className="flex-none w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-display text-sm font-bold flex items-center justify-center">
            {letter}
          </span>
          <p className="text-[14px] text-gray-800 dark:text-gray-200 leading-relaxed pt-0.5">{statement}</p>
        </div>
        <span className="flex-none text-[11px] font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap pt-1">
          {marks} mark{marks === 1 ? '' : 's'}
        </span>
      </div>

      <div className="sm:pl-10 flex flex-col gap-5">
        {children}

        {examinerReport && <SAExaminerReport stats={examinerReport} maxMarks={marks} />}

        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          {videoSrc ? (
            videoIsExternal ? (
              <DropboxLink src={videoSrc} label={`part (${letter})`} />
            ) : (
              <VideoPlayer src={videoSrc} label={`part (${letter})`} />
            )
          ) : (
            <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// Marks-distribution table + comment for one part of a short-answer question, as published
// in the VCAA examination report (e.g. "Marks 0 1 2 | % 7 15 78 | Average 1.7").
export function SAExaminerReport({ stats, maxMarks }: { stats: SAExaminerStats; maxMarks: number }) {
  return (
    <div>
      <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
        Examiner's Report
      </p>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
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

// %A-E distribution + comment for an MCQ, as published in the VCAA examination report.
export function ExaminerReport({ stats }: { stats: MCQExaminerStats }) {
  const letters = ['A', 'B', 'C', 'D', 'E'] as const
  const isAnswer = (l: MCQLetter) => (Array.isArray(stats.answer) ? stats.answer.includes(l) : l === stats.answer)
  return (
    <div>
      {stats.flawed && (
        <div className="flex gap-2.5 items-start rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 mb-3 text-[12.5px] leading-relaxed text-amber-900 dark:text-amber-200">
          <span className="flex-none text-base leading-none mt-0.5">⚠️</span>
          <div>
            <p className="font-bold tracking-wide mb-1">VCAA-flagged question</p>
            {stats.flawed}
          </div>
        </div>
      )}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-center text-[12.5px] border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/60">
                {letters.map(l => (
                  <th key={l} className="px-3 py-2 font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">
                    % {l}
                  </th>
                ))}
                <th className="px-3 py-2 font-semibold text-gray-700 dark:text-gray-300 border-b border-l border-gray-200 dark:border-gray-800 whitespace-nowrap">
                  % No Answer
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {letters.map(l => (
                  <td
                    key={l}
                    className={`px-3 py-2 ${
                      isAnswer(l)
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 font-bold text-emerald-700 dark:text-emerald-300'
                        : 'text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {stats.percentages[l] ?? '—'}
                  </td>
                ))}
                <td className="px-3 py-2 text-gray-500 dark:text-gray-400 border-l border-gray-200 dark:border-gray-800">
                  {stats.noAnswer ?? 0}
                </td>
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
export function WorkingTable({ rows }: { rows: WorkingRow[] }) {
  return (
    <div>
      <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
        Worked Solution
      </p>
      <div className="@container rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="hidden @2xl:grid @2xl:grid-cols-2 bg-gray-50 dark:bg-gray-800/60">
          <div className="px-4 py-2 border-r border-gray-200 dark:border-gray-800 text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500">
            Working
          </div>
          <div className="px-4 py-2 text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500">
            Reasoning
          </div>
        </div>
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 @2xl:grid-cols-2 ${i > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}`}
          >
            <div className="px-4 py-3 @2xl:border-r border-gray-100 dark:border-gray-800 self-center space-y-1.5 text-[13.5px] text-gray-800 dark:text-gray-100">
              {row.working}
            </div>
            {row.reason && (
              <div className="px-4 pb-3 pt-1 @2xl:pt-3 @2xl:self-center text-[12.5px] leading-relaxed text-gray-500 dark:text-gray-400 border-t @2xl:border-t-0 border-dashed border-gray-100 dark:border-gray-800">
                <p className="@2xl:hidden text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-1 mt-2">
                  Reasoning
                </p>
                {row.reason}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
