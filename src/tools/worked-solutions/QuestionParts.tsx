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

// VCAA examination-report stats for a multiple-choice question: the percentage of
// students who chose each option (correct one flagged via `answer`), % who left it
// blank, and the examiner's written comment (if the report included one).
export interface MCQExaminerStats {
  percentages: Partial<Record<'A' | 'B' | 'C' | 'D' | 'E', number>>
  answer: 'A' | 'B' | 'C' | 'D' | 'E'
  noAnswer?: number
  comment?: ReactNode
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
  return (
    <div>
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
                      l === stats.answer
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

export function WorkingTable({ rows }: { rows: WorkingRow[] }) {
  return (
    <div>
      <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
        Worked Solution
      </p>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="grid grid-cols-2 bg-gray-50 dark:bg-gray-800/60">
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
            className={`grid grid-cols-2 ${i > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}`}
          >
            <div className="px-4 py-3 border-r border-gray-100 dark:border-gray-800 self-center space-y-1.5 text-[13.5px] text-gray-800 dark:text-gray-100">
              {row.working}
            </div>
            <div className="px-4 py-3 self-center text-[12.5px] leading-relaxed text-gray-500 dark:text-gray-400">
              {row.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
