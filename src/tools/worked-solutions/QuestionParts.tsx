// Shared building blocks for a multi-part written solution: one card per exam part
// (statement + marks + worked-solution steps + video slot) and a numbered step.

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
      <div className="flex items-start justify-between gap-3 mb-3">
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

      <div className="pl-10">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
          Worked solution
        </p>
        <ol className="flex flex-col gap-3 list-none p-0 m-0 mb-5">{children}</ol>

        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
          Video walkthrough
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
  )
}

export function Step({ n, final, children }: { n: number; final?: boolean; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        className={`flex-none w-[22px] h-[22px] rounded-full text-white font-display text-xs font-bold flex items-center justify-center mt-0.5 ${
          final ? 'bg-emerald-500' : 'bg-sky-500'
        }`}
      >
        {n}
      </span>
      <div className="text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300 flex-1 min-w-0">{children}</div>
    </li>
  )
}
