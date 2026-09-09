// Shared shell for a standalone multiple-choice question: statement, optional diagram,
// options, and a Worked Solution / Examiner's Report / Video Walkthrough tab set — the
// single-question equivalent of PartCard, used by the various MCQ files under ./questions.

import { useState, ReactNode } from 'react'
import { WorkingTable, ExaminerReport, type WorkingRow, type MCQExaminerStats } from './QuestionParts'
import VideoPlayer, { DropboxLink } from './VideoPlayer'

export interface MCQOptionData {
  letter: string
  content: ReactNode
  isAnswer?: boolean
}

export function MCQShell({
  question,
  diagram,
  options,
  rows,
  examinerReport,
  videoSrc,
  videoIsExternal,
}: {
  question: ReactNode
  diagram?: ReactNode
  options: MCQOptionData[]
  rows: WorkingRow[]
  examinerReport?: MCQExaminerStats
  videoSrc?: string
  videoIsExternal?: boolean
}) {
  const [tab, setTab] = useState<'solution' | 'report' | 'video'>('solution')

  return (
    <div>
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 mb-6">
        {question}
      </div>

      <div className={`flex gap-6 mb-6 flex-col ${diagram ? 'sm:flex-row' : ''}`}>
        {diagram && (
          <div className="flex-none w-full sm:w-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3">
            {diagram}
          </div>
        )}
        <div className="flex-1 flex flex-col gap-2">
          {options.map(opt => (
            <MCQOption key={opt.letter} letter={opt.letter} isAnswer={opt.isAnswer}>
              {opt.content}
            </MCQOption>
          ))}
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1 w-fit mb-5 flex-wrap">
        <TabButton active={tab === 'solution'} onClick={() => setTab('solution')}>Worked Solution</TabButton>
        {examinerReport && (
          <TabButton active={tab === 'report'} onClick={() => setTab('report')}>Examiner's Report</TabButton>
        )}
        <TabButton active={tab === 'video'} onClick={() => setTab('video')} accent={!!videoSrc} soon={!videoSrc}>Video Walkthrough</TabButton>
      </div>

      {tab === 'solution' ? (
        <WorkingTable rows={rows} />
      ) : tab === 'report' && examinerReport ? (
        <ExaminerReport stats={examinerReport} />
      ) : tab === 'video' ? (
        videoSrc ? (
          videoIsExternal ? (
            <DropboxLink src={videoSrc} label="this question" />
          ) : (
            <VideoPlayer src={videoSrc} label="this question" />
          )
        ) : (
          <div className="border-[1.5px] border-dashed border-gray-300 dark:border-gray-700 rounded-2xl px-7 py-9 text-center text-[13.5px] leading-relaxed text-gray-400 dark:text-gray-500">
            Video walkthrough coming soon.
          </div>
        )
      ) : null}
    </div>
  )
}

function MCQOption({ letter, children, isAnswer }: { letter: string; children: ReactNode; isAnswer?: boolean }) {
  return (
    <div
      className={`flex gap-2.5 items-start px-3 py-2.5 rounded-xl border ${
        isAnswer
          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900'
          : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800'
      }`}
    >
      <span
        className={`flex-none w-5 h-5 rounded-full flex items-center justify-center font-display text-[11.5px] font-bold mt-0.5 ${
          isAnswer
            ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
        }`}
      >
        {letter}
      </span>
      <span className="text-[13.5px] text-gray-700 dark:text-gray-300 leading-snug">{children}</span>
    </div>
  )
}

// `accent` marks the Video Walkthrough tab when a video actually exists for this question —
// gives it a play icon and violet coloring (in both active and inactive states). `soon` marks
// it when no video exists yet — the tab is disabled (non-clickable) rather than leading to a
// "coming soon" placeholder, dimmed, and labelled "(Soon)".
function TabButton({
  active,
  onClick,
  children,
  accent,
  soon,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  accent?: boolean
  soon?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={soon}
      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13.5px] font-medium transition-colors ${
        active ? 'bg-white dark:bg-gray-900 shadow-sm' : ''
      } ${soon ? 'cursor-not-allowed' : ''} ${
        accent
          ? 'text-violet-600 dark:text-violet-400'
          : active
            ? 'text-gray-900 dark:text-white'
            : soon
              ? 'text-gray-400/70 dark:text-gray-500/70'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
      }`}
    >
      {accent && (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 flex-none">
          <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
        </svg>
      )}
      {children}
      {soon && <span className="text-[11px]">&nbsp;(Soon)</span>}
    </button>
  )
}
