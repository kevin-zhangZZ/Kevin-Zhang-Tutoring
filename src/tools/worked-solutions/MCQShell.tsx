// Shared shell for a standalone multiple-choice question: statement, optional diagram,
// options, and a Worked Solution / Examiner's Report / Video Walkthrough tab set — the
// single-question equivalent of PartCard, used by the various MCQ files under ./questions.
//
// Once the answer is showing, each option carries a bar for the share of students who chose
// it (from the VCAA report), so the popular wrong answer — usually the trap — reads at a
// glance. In "Hide answers" mode (studyMode.tsx) the options start neutral and clickable;
// choosing one marks it right or wrong, then reveals the bars, the working and the tabs.

import { useEffect, useId, useState, type ReactNode } from 'react'
import { WorkingTable, ExaminerReport, type WorkingRow, type MCQExaminerStats, type MCQLetter } from './QuestionParts'
import VideoPlayer, { DropboxLink } from './VideoPlayer'
import { DiagramScope } from './Lightbox'
import { useStudyMode } from './studyMode'
import SegmentedControl from '../../components/ui/SegmentedControl'

export interface MCQOptionData {
  letter: string
  content: ReactNode
  isAnswer?: boolean
}

type Tab = 'solution' | 'report' | 'video'

export function MCQShell({
  question,
  diagram,
  options,
  rows,
  background,
  extras,
  examinerReport,
  videoSrc,
  videoIsExternal,
  flawed,
}: {
  question: ReactNode
  diagram?: ReactNode
  options: MCQOptionData[]
  rows: WorkingRow[]
  /**
   * Optional context to read before the working — the MCQ equivalent of a `<Background>`
   * inside a PartCard. Renders at the top of the Worked Solution tab. Use it when the
   * question leans on an idea the reader may not have met, not to restate the question.
   * Detailed view only (studyMode.tsx).
   */
  background?: ReactNode
  /**
   * Teaching material after the working, in the Worked Solution tab: an `<Explore>` interactive
   * diagram, `<WrongMethod>` boxes for the popular wrong answers (AUTHORING_GUIDE §15).
   * Detailed view only (studyMode.tsx).
   */
  extras?: ReactNode
  examinerReport?: MCQExaminerStats
  videoSrc?: string
  videoIsExternal?: boolean
  /**
   * A small number of VCAA questions each year turn out to have no single defensible
   * correct answer — after review, VCAA itself retroactively accepts two, or all four
   * or five, of the options as correct (or, rarely, withdraws the question entirely).
   * Pass an explanation here and it renders as an unmissable warning banner above the
   * question — before the reader even sees the options — rather than only inside the
   * Examiner's Report tab. Mark every VCAA-accepted option with `isAnswer: true`.
   */
  flawed?: ReactNode
}) {
  const { hideAnswers, detailed } = useStudyMode()
  const [picked, setPicked] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('solution')
  const revealed = !hideAnswers || picked !== null
  const uid = useId()
  const tabId = (t: Tab) => `${uid}-tab-${t}`
  const panelId = `${uid}-panel`

  const hasReportTab = !!(examinerReport && (examinerReport.comment || examinerReport.flawed))
  const tabs: Tab[] = ['solution', ...(hasReportTab ? (['report'] as Tab[]) : []), ...(videoSrc ? (['video'] as Tab[]) : [])]

  // The header's "Video" badge asks for the walkthrough; switch to its tab if there is one.
  useEffect(() => {
    if (!videoSrc) return
    const onShowVideo = () => setTab('video')
    window.addEventListener('ws:show-video', onShowVideo)
    return () => window.removeEventListener('ws:show-video', onShowVideo)
  }, [videoSrc])

  const pct = (letter: string) => examinerReport?.percentages[letter as MCQLetter]
  const answers = options.filter(o => o.isAnswer)
  const wrongOptions = options.filter(o => !o.isAnswer && pct(o.letter) !== undefined)
  const commonWrong = flawed
    ? undefined
    : wrongOptions.reduce<MCQOptionData | undefined>((best, o) => (best === undefined || pct(o.letter)! > pct(best.letter)! ? o : best), undefined)

  return (
    <DiagramScope>
      {flawed && (
        <div className="flex gap-3 items-start rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-5 py-4 mb-5">
          <span className="flex-none text-xl leading-none mt-0.5">⚠️</span>
          <div className="text-[13.5px] leading-relaxed text-amber-900 dark:text-amber-200">
            <p className="font-display font-bold text-[13px] tracking-wide mb-1.5">
              VCAA-Flagged Question — No Single Correct Answer
            </p>
            {revealed ? flawed : <p>Choose an answer to see what VCAA decided.</p>}
          </div>
        </div>
      )}

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
            <MCQOption
              key={opt.letter}
              letter={opt.letter}
              isAnswer={opt.isAnswer}
              revealed={revealed}
              picked={picked === opt.letter}
              percent={revealed ? pct(opt.letter) : undefined}
              selectable={hideAnswers}
              onPick={hideAnswers && picked === null ? () => setPicked(opt.letter) : undefined}
            >
              {opt.content}
            </MCQOption>
          ))}
          {hideAnswers && picked === null && (
            <p className="text-[12.5px] text-gray-500 dark:text-gray-400 mt-1">Choose an answer to check it.</p>
          )}
          {hideAnswers && (
          <div aria-live="polite">
          {picked !== null && (
            <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400 mt-1">
              {options.find(o => o.letter === picked)?.isAnswer ? (
                <b className="text-emerald-700 dark:text-emerald-400">Correct. </b>
              ) : (
                <b className="text-rose-700 dark:text-rose-400">Not quite. </b>
              )}
              {pct(picked) !== undefined && <>{pct(picked)}% of students chose {picked}. </>}
              {!options.find(o => o.letter === picked)?.isAnswer && (
                <>
                  {answers.length > 1 ? 'VCAA accepted ' : 'The answer is '}
                  {answers.map(a => a.letter).join(' and ')}.{' '}
                </>
              )}
              <button
                type="button"
                onClick={() => setPicked(null)}
                className="font-semibold text-sky-700 dark:text-sky-400 hover:underline"
              >
                Try again
              </button>
            </p>
          )}
          </div>
          )}
          {revealed && commonWrong && pct(commonWrong.letter)! > 0 && (
            <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
              Most common wrong answer: {commonWrong.letter} ({pct(commonWrong.letter)}% of students).
            </p>
          )}
        </div>
      </div>

      {revealed && (
        <>
          {tabs.length > 1 && (
            <SegmentedControl
              variant="tabs"
              size="md"
              fill
              className="sm:inline-grid w-full sm:w-fit mb-5"
              aria-label="Solution views"
              value={tab}
              onChange={setTab}
              idFor={tabId}
              controls={panelId}
              options={tabs.map(t => ({
                value: t,
                label: TAB_LABEL[t],
                toneClassName: t === 'video' ? 'text-violet-600 dark:text-violet-400' : undefined,
              }))}
            />
          )}

          <div
            role={tabs.length > 1 ? 'tabpanel' : undefined}
            id={tabs.length > 1 ? panelId : undefined}
            aria-labelledby={tabs.length > 1 ? tabId(tab) : undefined}
          >
          {tab === 'solution' || tabs.length === 1 ? (
            <div className="flex flex-col gap-4">
              {detailed && background}
              <WorkingTable rows={rows} alwaysShow hideLabel={tabs.length > 1} />
              {detailed && extras}
            </div>
          ) : tab === 'report' && examinerReport ? (
            <ExaminerReport stats={examinerReport} />
          ) : tab === 'video' && videoSrc ? (
            <div data-video>
              {videoIsExternal ? (
                <DropboxLink src={videoSrc} label="this question" />
              ) : (
                <VideoPlayer src={videoSrc} label="this question" />
              )}
            </div>
          ) : null}
          </div>
        </>
      )}
    </DiagramScope>
  )
}

function MCQOption({
  letter,
  children,
  isAnswer,
  revealed,
  picked,
  percent,
  selectable,
  onPick,
}: {
  letter: string
  children: ReactNode
  isAnswer?: boolean
  revealed: boolean
  picked: boolean
  percent?: number
  /** Hide-answers mode: options are buttons in every state, so focus stays put after a pick. */
  selectable?: boolean
  onPick?: () => void
}) {
  const correct = revealed && isAnswer
  const wrongPick = revealed && picked && !isAnswer
  const tone = correct
    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900'
    : wrongPick
      ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900'
      : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800'
  const chip = correct
    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
    : wrongPick
      ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300'
      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
  const bar = correct
    ? 'bg-emerald-100/80 dark:bg-emerald-900/30'
    : wrongPick
      ? 'bg-rose-100/80 dark:bg-rose-900/30'
      : 'bg-gray-200/60 dark:bg-gray-700/40'

  const inner = (
    <>
      {percent !== undefined && (
        <span aria-hidden className={`absolute inset-y-0 left-0 ${bar}`} style={{ width: `${percent}%` }} />
      )}
      <span
        className={`relative flex-none w-5 h-5 rounded-full flex items-center justify-center font-display text-[11.5px] font-bold mt-0.5 ${chip}`}
      >
        {letter}
      </span>
      <span className="relative flex-1 text-[13.5px] text-gray-700 dark:text-gray-300 leading-snug">{children}</span>
      {percent !== undefined && (
        <span
          className={`relative flex-none font-display text-[11.5px] font-bold tabular-nums mt-0.5 ${
            correct
              ? 'text-emerald-700 dark:text-emerald-300'
              : wrongPick
                ? 'text-rose-700 dark:text-rose-300'
                : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          {percent}%{correct ? ' ✓' : ''}
          <span className="sr-only"> of students chose {letter}</span>
        </span>
      )}
    </>
  )

  const base = `relative overflow-hidden flex gap-2.5 items-start px-3 py-2.5 rounded-xl border text-left ${tone}`
  return selectable ? (
    <button
      type="button"
      onClick={onPick}
      aria-pressed={picked}
      aria-disabled={onPick ? undefined : true}
      className={`${base} w-full ${
        onPick
          ? 'hover:border-sky-300 dark:hover:border-sky-700 hover:bg-white dark:hover:bg-gray-800 transition-colors'
          : 'cursor-default'
      }`}
    >
      {inner}
    </button>
  ) : (
    <div className={base}>{inner}</div>
  )
}

// Short labels on phones, full ones from `sm`. The Video Walkthrough tab (only there when a
// video is) gets a play icon and violet text in both states.
const TAB_LABEL: Record<Tab, ReactNode> = {
  solution: (
    <>
      <span className="sm:hidden">Solution</span>
      <span className="hidden sm:inline">Worked Solution</span>
    </>
  ),
  report: (
    <>
      <span className="sm:hidden">Report</span>
      <span className="hidden sm:inline">Examiner's Report</span>
    </>
  ),
  video: (
    <>
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 flex-none" aria-hidden="true">
        <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
      </svg>
      <span className="sm:hidden">Video</span>
      <span className="hidden sm:inline">Video Walkthrough</span>
    </>
  ),
}
