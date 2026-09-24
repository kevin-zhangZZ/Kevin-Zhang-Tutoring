import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { QUESTIONS, SUBJECTS, SUBJECT_NAME, SUBJECT_COLOR, type QuestionMeta } from './data'
import { QUESTION_DETAILS } from './details'
import ComingSoon from './ComingSoon'
import { examSourceFor } from './examSources'
import { LightboxProvider } from './Lightbox'
import { RevealScope } from './QuestionParts'
import { StudyModeProvider, useStudyMode } from './studyMode'
import { TOOL_PATH, parsePath, questionPath, subjectPath, yearPath } from './routes'
import { SidebarPrefsProvider, useSidebarPrefs } from './sidebarPrefs'
import { QuestionSidebar, type SidebarNav } from './QuestionSidebar'
import { listSequence, mainCode, relativeLabel, topicOf } from './sidebarModel'
import SidebarSettings from './SidebarSettings'
import { useBackToTop } from '../../components/Layout'

// Below this width (Tailwind's `lg`) the list and the solution are separate screens: pick a
// question from the list, read it with a ‹ previous · Questions · next › bar at the bottom.
const LG = 1024

// The last question opened, for the landing page's "Continue where you left off".
const LAST_QUESTION_KEY = 'ws-last-question'

function readLastQuestion(): QuestionMeta | undefined {
  try {
    const id = localStorage.getItem(LAST_QUESTION_KEY)
    return id ? QUESTIONS.find(q => q.id === id) : undefined
  } catch {
    return undefined
  }
}

// Shared look for the pill switches in the header. They never wrap: a wrapped pill turns into
// a tall capsule with oversized corners on phones, so below `sm` the container is a plain
// rounded rectangle and the buttons share its width equally.
const SWITCH_CLASS = 'grid grid-flow-col auto-cols-fr gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl sm:rounded-full p-1'
function switchButtonClass(active: boolean) {
  return `px-3 sm:px-4 py-1.5 rounded-lg sm:rounded-full text-sm font-medium text-center transition-all whitespace-nowrap ${
    active
      ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
  }`
}

export default function WorkedSolutions() {
  return (
    <StudyModeProvider>
      <SidebarPrefsProvider>
        <LightboxProvider>
          <WorkedSolutionsRoutes />
        </LightboxProvider>
      </SidebarPrefsProvider>
    </StudyModeProvider>
  )
}

function WorkedSolutionsRoutes() {
  const rest = useParams()['*'] ?? ''
  if (rest.split('/')[0] === 'settings') return <SidebarSettings />
  return <QuestionsPage rest={rest} />
}

function AnswersSwitch({ compact }: { compact?: boolean }) {
  const { hideAnswers, setHideAnswers } = useStudyMode()
  return (
    <div
      className={compact ? 'grid grid-flow-col auto-cols-fr gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1' : `${SWITCH_CLASS} w-full sm:w-auto`}
      role="group"
      aria-label="Answers"
      title="Hide answers to try each question before seeing the working"
    >
      <button type="button" onClick={() => setHideAnswers(false)} aria-pressed={!hideAnswers} className={switchButtonClass(!hideAnswers)}>
        Show answers
      </button>
      <button type="button" onClick={() => setHideAnswers(true)} aria-pressed={hideAnswers} className={switchButtonClass(hideAnswers)}>
        Hide answers
      </button>
    </div>
  )
}

function QuestionsPage({ rest }: { rest: string }) {
  // Subject, year and question all live in the URL (see routes.ts), so a link opens straight
  // to a question and refresh, Back and bookmarks keep the visitor's place.
  const navigate = useNavigate()
  const { subject, year: openYear, question: selected } = parsePath(rest)
  const { prefs, view, sort, setView, setSort } = useSidebarPrefs()
  const [sheetOpen, setSheetOpen] = useState(false)

  const Detail = selected?.hasDetail ? QUESTION_DETAILS[selected.id] : undefined
  const selectedColor = selected ? SUBJECT_COLOR[selected.subject] : null
  const selectedSource = selected ? examSourceFor(selected.subject, selected.year, selected.exam) : undefined

  const detailRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { parts, activePart, headerGone, jumpTo } = usePartTracking(detailRef, headerRef, selected?.id ?? null)

  // Previous / next step through whatever the list is showing (sidebarModel.listSequence).
  const sequence = subject
    ? listSequence({ subject, year: openYear, view, sort, topic: selected ? topicOf(selected) : null })
    : []
  const index = selected ? sequence.findIndex(q => q.id === selected.id) : -1
  const prev = index > 0 ? sequence[index - 1] : null
  const next = index > -1 && index < sequence.length - 1 ? sequence[index + 1] : null

  // The floating previous / next control carries its own ↑, so the shared back-to-top button
  // steps aside on large screens; on smaller ones it rises above the bottom bar.
  useBackToTop({ hideAtLg: !!selected && prefs.pager === 'float', liftBelowLg: !!selected })

  // Opening a question from lower down the page (the list is sticky, so that's the usual case
  // on a laptop) would otherwise keep the old scroll depth and land partway into the new
  // solution — often right on its answer. Jump (not smooth-scroll, which would sweep past the
  // working) to the top of the new question, but only when that top is above the viewport.
  useLayoutEffect(() => {
    const detail = detailRef.current
    const main = detail?.closest('main')
    if (!detail || !main) return
    const offset = detail.getBoundingClientRect().top - main.getBoundingClientRect().top
    if (offset < 0) main.scrollTo({ top: main.scrollTop + offset - 16 })
  }, [selected?.id])

  // Back from a question to the list on a phone: bring the row you were on into view.
  const lastSelected = useRef<string | null>(null)
  useLayoutEffect(() => {
    if (selected) {
      lastSelected.current = selected.id
      return
    }
    if (!lastSelected.current || window.innerWidth >= LG) return
    listRef.current?.querySelector(`[data-qid="${lastSelected.current}"]`)?.scrollIntoView({ block: 'center' })
  }, [selected?.id])

  useEffect(() => {
    if (!selected) return
    try {
      localStorage.setItem(LAST_QUESTION_KEY, selected.id)
    } catch {
      // Storage blocked — "Continue where you left off" just won't appear.
    }
  }, [selected])

  useEffect(() => setSheetOpen(false), [selected?.id])

  function showVideo() {
    window.dispatchEvent(new CustomEvent('ws:show-video'))
    // Give an MCQ's tab switch a moment to render the player before scrolling to it.
    window.setTimeout(() => {
      detailRef.current?.querySelector('[data-video]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 60)
  }

  const nav: SidebarNav | null = subject
    ? {
        questionHref: questionPath,
        yearHref: y => yearPath(subject, y),
        onYear: y => navigate(yearPath(subject, y)),
        onQuestion: () => setSheetOpen(false),
        onPart: p => {
          setSheetOpen(false)
          jumpTo(p)
        },
      }
    : null

  // On the list screen (a phone, back from a question), open the list around the question
  // you just left. Read from the ref during render on purpose: it still holds the previous
  // question on the render straight after navigating back.
  const recentQuestion = !selected && lastSelected.current ? QUESTIONS.find(q => q.id === lastSelected.current) : undefined
  const recent = recentQuestion && recentQuestion.subject === subject && recentQuestion.year === openYear ? recentQuestion : null

  const sidebar = (settingsHref?: string) =>
    subject && nav ? (
      <QuestionSidebar
        subject={subject}
        year={openYear}
        selected={selected}
        recent={recent}
        activePart={activePart}
        prefs={prefs}
        view={view}
        sort={sort}
        onView={setView}
        onSort={setSort}
        nav={nav}
        settingsHref={settingsHref}
      />
    ) : null

  return (
    <div className="min-h-full flex flex-col">
      <div className={`flex-1 px-4 sm:px-6 pb-10 ${selected ? 'pt-0 sm:pt-6 lg:pt-10' : 'pt-6 sm:pt-10'}`}>
        {/* Header — on a phone it gives way to the question once one is open. */}
        <div className={`${selected ? 'hidden lg:flex' : 'flex'} flex-wrap items-end justify-between gap-4 mb-8`}>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            VCAA Exam Explanations
          </h1>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <div className={`${SWITCH_CLASS} w-full sm:w-auto`} role="group" aria-label="Subject">
              {SUBJECTS.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => navigate(subjectPath(s.id))}
                  aria-pressed={subject === s.id}
                  className={switchButtonClass(subject === s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <AnswersSwitch />
          </div>
        </div>

        {subject === null ? (
          <Landing />
        ) : (
          <div className="flex gap-7 items-start flex-col lg:flex-row">
            {/* The list — sticky beside the solution on large screens, with its own scroll (and
                a reserved scrollbar gutter, so its width never shifts as the list grows or
                shrinks). On smaller screens it's the list screen, hidden once a question is
                open. */}
            <div
              ref={listRef}
              className={`${selected ? 'hidden lg:flex' : 'flex'} w-full lg:w-[336px] flex-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 flex-col lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto [scrollbar-gutter:stable] scrollbar-quiet`}
            >
              {sidebar(`${TOOL_PATH}/settings`)}
            </div>

            {/* Detail panel — only once a question is selected. On phones it runs edge to edge
                as a plain white sheet instead of a card inside the page's padding, so the
                maths gets the width. */}
            {selected && selectedColor && (
              <div
                ref={detailRef}
                className="ws-detail flex-1 min-w-0 w-[calc(100%+2rem)] -mx-4 sm:mx-0 sm:w-full bg-white dark:bg-gray-900 border-b sm:border border-gray-200 dark:border-gray-800 sm:rounded-2xl px-4 py-6 sm:p-8"
              >
                {prefs.backBar === 'on' && openYear !== null && (
                  <div className="lg:hidden -mx-4 sm:-mx-8 -mt-6 sm:-mt-8 mb-5 px-4 sm:px-8 h-11 flex items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 sm:rounded-t-2xl">
                    <Link to={yearPath(selected.subject, openYear)} className="text-[13px] font-semibold text-sky-700 dark:text-sky-400 truncate">
                      ‹ {view === 'topic' ? topicOf(selected) : `${selected.year} ${SUBJECTS.find(s => s.id === selected.subject)?.label}`}
                    </Link>
                    {index > -1 && (
                      <span className="flex-none font-display text-[11.5px] font-bold text-gray-400 dark:text-gray-500">
                        {index + 1} of {sequence.length}
                      </span>
                    )}
                  </div>
                )}
                <StickyQuestionBar
                  key={`bar-${selected.id}`}
                  label={`${selected.year} · ${selected.exam} · ${mainCode(selected.code)}`}
                  visible={headerGone}
                  parts={parts}
                  active={activePart}
                  onJump={jumpTo}
                />
                <div ref={headerRef} className="flex items-center gap-2 flex-wrap">
                  <span className={`font-display text-[12.5px] font-bold px-2.5 py-1 rounded-lg ${selectedColor.bg} ${selectedColor.text}`}>
                    {selected.year} · {selected.exam} · {selected.code}
                  </span>
                  {selected.percentCorrect !== undefined && (
                    <span className="font-display text-[12.5px] font-bold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      {selected.percentCorrect}% answered correctly
                    </span>
                  )}
                  {selected.flagged && (
                    <span className="font-display text-[12.5px] font-bold px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300">
                      ⚠️ VCAA-flagged
                    </span>
                  )}
                  {selected.hasVideo && (
                    <button
                      type="button"
                      onClick={showVideo}
                      className="flex items-center gap-1.5 font-display text-[12.5px] font-bold px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-700 text-white"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                      </svg>
                      Watch the walkthrough
                    </button>
                  )}
                  <span className="flex items-center gap-3 sm:ml-auto">
                    {selectedSource && (
                      <a
                        href={selectedSource.paper}
                        target="_blank"
                        rel="noreferrer"
                        className="font-display text-[12.5px] font-bold text-sky-700 dark:text-sky-400 hover:underline whitespace-nowrap"
                      >
                        Original paper ↗
                      </a>
                    )}
                    <CopyLinkButton />
                  </span>
                </div>
                <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white mt-3 mb-5 leading-snug">
                  {selected.topic}
                </h2>
                <RevealScope key={`question-${selected.id}`}>
                  {Detail ? <Detail key={selected.id} /> : <ComingSoon topic={selected.topic} />}
                </RevealScope>
                {prefs.pager === 'end' && <EndPager prev={prev} next={next} current={selected} />}
              </div>
            )}
          </div>
        )}
      </div>

      {selected && <PhoneBar prev={prev} next={next} current={selected} onMenu={() => setSheetOpen(true)} />}
      {selected && prefs.pager === 'float' && <FloatPager prev={prev} next={next} current={selected} detailRef={detailRef} />}
      {sheetOpen && selected && (
        <QuestionsSheet full={prefs.sheet === 'full'} selectedId={selected.id} onClose={() => setSheetOpen(false)}>
          {sidebar(`${TOOL_PATH}/settings`)}
        </QuestionsSheet>
      )}
    </div>
  )
}

// First screen: the three subjects with how much each holds, plus a way straight back to the
// last question this device opened.
function Landing() {
  const last = readLastQuestion()
  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      {last && (
        <Link
          to={questionPath(last)}
          className="flex items-center gap-3 flex-wrap bg-white dark:bg-gray-900 border border-sky-200 dark:border-sky-900 rounded-2xl px-5 py-4 hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
        >
          <span className="text-[13px] text-gray-500 dark:text-gray-400">Continue where you left off</span>
          <span className="font-display text-[14px] font-bold text-sky-700 dark:text-sky-300">
            {SUBJECT_NAME[last.subject]} {last.year} · {last.exam} · {mainCode(last.code)}
          </span>
          <span className="ml-auto text-sky-700 dark:text-sky-300">→</span>
        </Link>
      )}
      <div className="grid gap-3 sm:grid-cols-3">
        {SUBJECTS.map(s => {
          const qs = QUESTIONS.filter(q => q.subject === s.id)
          const ys = qs.map(q => q.year)
          const color = SUBJECT_COLOR[s.id]
          return (
            <Link
              key={s.id}
              to={subjectPath(s.id)}
              className="group flex flex-col gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <span className={`w-fit font-display text-[11.5px] font-bold px-2 py-0.5 rounded-md ${color.bg} ${color.text}`}>
                {Math.min(...ys)}–{Math.max(...ys)}
              </span>
              <span className="font-display text-[17px] font-bold text-gray-900 dark:text-white leading-snug">{SUBJECT_NAME[s.id]}</span>
              <span className="text-[13px] text-gray-500 dark:text-gray-400">
                {s.id === 'chemistry'
                  ? `${qs.length} of the hardest multiple-choice questions`
                  : `${qs.length} questions, every one worked through`}
              </span>
              <span className="mt-auto pt-1 text-[13px] font-semibold text-sky-700 dark:text-sky-400 group-hover:underline">Browse →</span>
            </Link>
          )
        })}
      </div>
      <Link to={`${TOOL_PATH}/settings`} className="text-[13px] font-semibold text-sky-700 dark:text-sky-400 hover:underline w-fit">
        Sidebar settings
      </Link>
    </div>
  )
}

function CopyLinkButton() {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  useEffect(() => {
    if (state === 'idle') return
    const t = window.setTimeout(() => setState('idle'), 1600)
    return () => window.clearTimeout(t)
  }, [state])
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(window.location.href).then(
          () => setState('copied'),
          () => setState('failed'),
        ) ?? setState('failed')
      }}
      className="flex items-center gap-1.5 font-display text-[12.5px] font-bold px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap"
    >
      <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M8.5 11.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5l-1 1M11.5 8.5a3.5 3.5 0 0 0-5 0L4 11a3.5 3.5 0 0 0 5 5l1-1" />
      </svg>
      <span aria-live="polite">{state === 'copied' ? 'Link copied' : state === 'failed' ? 'Copy the address bar' : 'Copy link'}</span>
    </button>
  )
}

// Which part of the open question is on screen, and whether its header has scrolled away —
// shared by the sticky question bar and the sidebar's parts list, both of which can also jump
// to a part.
function usePartTracking(detailRef: RefObject<HTMLDivElement>, headerRef: RefObject<HTMLDivElement>, questionId: string | null) {
  const [parts, setParts] = useState<{ letter: string; topic?: string }[]>([])
  const [activePart, setActivePart] = useState<string | null>(null)
  const [headerGone, setHeaderGone] = useState(false)
  // While a jump's smooth scroll is under way, keep the chosen part highlighted rather than
  // flicking through every part it passes.
  const jumping = useRef<{ part: string; until: number } | null>(null)

  useEffect(() => {
    setParts([])
    setActivePart(null)
    setHeaderGone(false)
    const detail = detailRef.current
    const header = headerRef.current
    const main = detail?.closest('main')
    if (!detail || !header || !main) return
    const partEls = () => Array.from(detail.querySelectorAll<HTMLElement>('[data-part]'))
    setParts(partEls().map(el => ({ letter: el.dataset.part!, topic: el.dataset.topic })))

    const update = () => {
      const box = main.getBoundingClientRect()
      setHeaderGone(header.getBoundingClientRect().bottom < box.top)
      if (jumping.current && Date.now() < jumping.current.until) {
        setActivePart(jumping.current.part)
        return
      }
      jumping.current = null
      // The part whose top has passed just under the sticky bar — or, at the very bottom of
      // the page (where the last parts can never scroll that high), the last one in view.
      const atBottom = main.scrollTop + main.clientHeight >= main.scrollHeight - 2
      let current: string | null = null
      for (const el of partEls()) {
        const top = el.getBoundingClientRect().top - box.top
        if (top <= 96 || (atBottom && top < main.clientHeight - 48)) current = el.dataset.part!
      }
      setActivePart(current)
    }
    update()
    main.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      main.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [detailRef, headerRef, questionId])

  const jumpTo = useCallback(
    (part: string) => {
      const main = detailRef.current?.closest('main')
      const el = detailRef.current?.querySelector<HTMLElement>(`[data-part="${CSS.escape(part)}"]`)
      if (!main || !el) return
      jumping.current = { part, until: Date.now() + 1200 }
      setActivePart(part)
      const offset = el.getBoundingClientRect().top - main.getBoundingClientRect().top
      main.scrollTo({ top: main.scrollTop + offset - 64, behavior: 'smooth' })
    },
    [detailRef],
  )

  return { parts, activePart, headerGone, jumpTo }
}

// A slim bar that pins to the top of the page once the question's own header has scrolled
// away, so a long multi-part question always says which question and part you're in. Its part
// chips jump straight to a part; the current part is highlighted as you scroll. It takes no
// space in the layout (a zero-height sticky wrapper with the bar hanging off it), and spans
// the detail card's full width by cancelling the card's padding.
function StickyQuestionBar({
  label,
  visible,
  parts,
  active,
  onJump,
}: {
  label: string
  visible: boolean
  parts: { letter: string; topic?: string }[]
  active: string | null
  onJump: (part: string) => void
}) {
  return (
    <div className="sticky top-0 z-20 h-0 -mx-4 sm:-mx-8">
      <div
        aria-hidden={!visible}
        className={`absolute inset-x-0 top-0 flex items-center gap-3 px-4 sm:px-8 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <span className="font-display text-[12.5px] font-bold text-sky-700 dark:text-sky-300 whitespace-nowrap">{label}</span>
        {parts.length > 1 && (
          <span className="flex gap-1 overflow-x-auto scrollbar-quiet">
            {parts.map(({ letter, topic }) => (
              <button
                key={letter}
                type="button"
                tabIndex={visible ? 0 : -1}
                onClick={() => onJump(letter)}
                title={topic}
                aria-current={active === letter ? 'true' : undefined}
                className={`flex-none min-w-[1.75rem] h-7 px-1.5 rounded-full font-display text-[11.5px] font-bold transition-colors ${
                  active === letter
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {letter}
              </button>
            ))}
          </span>
        )}
      </div>
    </div>
  )
}

// Phones and tablets: ‹ previous · Questions · next ›, pinned to the bottom while reading.
function PhoneBar({
  prev,
  next,
  current,
  onMenu,
}: {
  prev: QuestionMeta | null
  next: QuestionMeta | null
  current: QuestionMeta
  onMenu: () => void
}) {
  const side = 'flex items-center min-w-0 px-4 text-[13px] font-semibold'
  return (
    <nav
      aria-label="Question navigation"
      className="lg:hidden sticky bottom-0 z-30 grid grid-cols-[1fr_auto_1fr] h-14 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-t border-gray-200 dark:border-gray-800 pb-[env(safe-area-inset-bottom)] box-content"
    >
      {prev ? (
        <Link to={questionPath(prev)} className={`${side} justify-start text-gray-700 dark:text-gray-200`} aria-label={`Previous: ${relativeLabel(prev, current)}`}>
          <span className="truncate">‹ {relativeLabel(prev, current)}</span>
        </Link>
      ) : (
        <span className={`${side} text-gray-300 dark:text-gray-600`}>‹ Start</span>
      )}
      <button
        type="button"
        onClick={onMenu}
        className="flex flex-col items-center justify-center px-5 border-x border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white"
      >
        <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M4 5.5h12M4 10h12M4 14.5h12" />
        </svg>
        <span className="text-[11px] font-semibold mt-0.5">Questions</span>
      </button>
      {next ? (
        <Link to={questionPath(next)} className={`${side} justify-end text-gray-700 dark:text-gray-200`} aria-label={`Next: ${relativeLabel(next, current)}`}>
          <span className="truncate">{relativeLabel(next, current)} ›</span>
        </Link>
      ) : (
        <span className={`${side} justify-end text-gray-300 dark:text-gray-600`}>End ›</span>
      )}
    </nav>
  )
}

// Large screens, "Floating" setting: ↑ back to top, ‹ previous, where you are, › next.
function FloatPager({
  prev,
  next,
  current,
  detailRef,
}: {
  prev: QuestionMeta | null
  next: QuestionMeta | null
  current: QuestionMeta
  detailRef: RefObject<HTMLDivElement>
}) {
  const btn = 'w-10 h-10 grid place-items-center hover:bg-white/10 transition-colors'
  const off = 'w-10 h-10 grid place-items-center opacity-30'
  return (
    <nav
      aria-label="Question navigation"
      className="hidden lg:flex fixed bottom-6 right-6 z-20 items-center bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full shadow-lg overflow-hidden text-[13px] font-semibold"
    >
      <button
        type="button"
        onClick={() => detailRef.current?.closest('main')?.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`${btn} border-r border-white/15 dark:border-gray-900/15`}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
      {prev ? (
        <Link to={questionPath(prev)} className={btn} aria-label={`Previous: ${relativeLabel(prev, current)}`} title={`Previous: ${relativeLabel(prev, current)}`}>
          ‹
        </Link>
      ) : (
        <span className={off} aria-hidden>
          ‹
        </span>
      )}
      <span className="px-1 font-display whitespace-nowrap">{mainCode(current.code)}</span>
      {next ? (
        <Link to={questionPath(next)} className={btn} aria-label={`Next: ${relativeLabel(next, current)}`} title={`Next: ${relativeLabel(next, current)}`}>
          ›
        </Link>
      ) : (
        <span className={off} aria-hidden>
          ›
        </span>
      )}
    </nav>
  )
}

// Large screens, "End" setting: previous / next cards after the last part of a question.
function EndPager({ prev, next, current }: { prev: QuestionMeta | null; next: QuestionMeta | null; current: QuestionMeta }) {
  const card = (q: QuestionMeta | null, dir: 'prev' | 'next') =>
    q ? (
      <Link
        to={questionPath(q)}
        className={`rounded-xl border px-4 py-3 transition-colors ${
          dir === 'next'
            ? 'text-right border-sky-200 dark:border-sky-900 bg-sky-50/60 dark:bg-sky-950/30 hover:border-sky-300 dark:hover:border-sky-700'
            : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
        }`}
      >
        <div className="text-[11.5px] font-semibold text-gray-400 dark:text-gray-500">{dir === 'prev' ? '← Previous' : 'Next →'}</div>
        <div className="font-display text-[13px] font-bold text-sky-700 dark:text-sky-300 mt-0.5">{relativeLabel(q, current)}</div>
        <div className="text-[12.5px] text-gray-600 dark:text-gray-400">{topicOf(q)}</div>
      </Link>
    ) : (
      <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800 px-4 py-3 text-[12px] text-gray-300 dark:text-gray-600">
        {dir === 'prev' ? 'Start of the list' : 'End of the list'}
      </div>
    )
  return (
    <div className="hidden lg:grid grid-cols-2 gap-3 mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
      {card(prev, 'prev')}
      {card(next, 'next')}
    </div>
  )
}

// Phones and tablets: the question list over the solution, opened from the bottom bar. It
// opens scrolled so the current question sits about a fifth of the way down, with the few
// before it still in view.
function QuestionsSheet({
  full,
  selectedId,
  onClose,
  children,
}: {
  full: boolean
  selectedId: string
  onClose: () => void
  children: ReactNode
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    const box = scrollRef.current
    const row = box?.querySelector<HTMLElement>(`[data-qid="${selectedId}"]`)
    if (box && row) {
      const rowTop = row.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop
      box.scrollTop = Math.max(0, rowTop - box.clientHeight * 0.2)
    }
    closeRef.current?.focus({ preventScroll: true })
  }, [selectedId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Questions">
      {!full && <button type="button" aria-label="Close questions" onClick={onClose} className="absolute inset-0 w-full bg-black/30" />}
      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col bg-white dark:bg-gray-900 ${
          full ? 'top-0' : 'h-[82%] rounded-t-2xl shadow-[0_-12px_30px_-12px_rgba(0,0,0,.35)] animate-[sheet-in_.22s_cubic-bezier(.2,.8,.2,1)]'
        }`}
      >
        {!full && <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto mt-2" aria-hidden />}
        <div className="flex items-center justify-between gap-3 px-4 pt-2.5 pb-2.5 border-b border-gray-100 dark:border-gray-800">
          <span className="font-display text-[15px] font-bold text-gray-900 dark:text-white">Questions</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 grid place-items-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
          >
            ✕
          </button>
        </div>
        <div ref={scrollRef} className="relative flex-1 overflow-y-auto scrollbar-quiet px-3 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="mb-3">
            <AnswersSwitch compact />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
