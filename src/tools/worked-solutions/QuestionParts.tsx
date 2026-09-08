// Shared building blocks for a multi-part written solution: one card per exam part
// (statement + marks + a working/reasoning table + video slot).

import { ReactNode } from 'react'
import VideoPlayer, { DropboxLink } from './VideoPlayer'

export function PartCard({
  letter,
  marks,
  statement,
  videoSrc,
  videoIsExternal,
  children,
}: {
  letter: string
  marks: number
  statement: ReactNode
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
            <div className="px-4 py-3 border-r border-gray-100 dark:border-gray-800 flex flex-col justify-center gap-1.5 text-[13.5px] text-gray-800 dark:text-gray-100">
              {row.working}
            </div>
            <div className="px-4 py-3 flex flex-col justify-center text-[12.5px] leading-relaxed text-gray-500 dark:text-gray-400">
              {row.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
