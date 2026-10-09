// Study Score Projection: what study score would a student's exam marks earn, from VCAA's
// published grade distributions for 2016–2025 (data.ts; the method is in model.ts). Two tabs:
//   Check My Marks (single/): one set of marks (Exam 1 and Exam 2 for Methods and Specialist,
//     the one exam for Chemistry) scored against every year, and the marks each score needs.
//   Track My Papers (practice/): a log of the past papers a student has sat, each scored against
//     the students who sat that paper, charted as a trend.
//
// Subject is in the path (#/study-score/chemistry); everything else is in the query string, so a
// result can be bookmarked or sent: e1/e2 for the marks (Chemistry uses e1 alone), mode=papers
// for Track My Papers, a= for its log and g= for its goal. Switching tabs keeps all of them;
// switching subject carries the marks over and drops the subject's own log and goal.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SegmentedControl from '../../components/ui/SegmentedControl'
import { DISTRIBUTIONS, SUBJECTS, SUBJECT_IDS, type Subject } from './data.ts'
import { project, typicalOf } from './model.ts'
import { CARD, CopyLink, SUB } from './shared.tsx'
import HowItWorks from './about.tsx'
import CheckMarks from './single/index.tsx'
import MarkInputs from './single/MarkInputs.tsx'
import StickyMarkBar from './single/StickyMarkBar.tsx'
import PracticeMode from './practice/index.tsx'

const TOOL = '/study-score'
/** Marks a first visit starts on: 75% of each paper. */
const DEFAULT_SHARE = 0.75

type Mode = 'single' | 'papers'

const PANEL = 'ss-panel'
const tabId = (m: Mode) => `ss-tab-${m}`
const markKey = (i: number) => `e${i + 1}`

function readMarks(q: URLSearchParams, subject: Subject): number[] {
  return SUBJECTS[subject].exams.map((e, i) => {
    const v = Number(q.get(markKey(i)))
    return q.has(markKey(i)) && Number.isFinite(v) ? Math.min(e.rawMax, Math.max(0, Math.round(v))) : Math.round(e.rawMax * DEFAULT_SHARE)
  })
}

/** The same marks on another subject's papers: kept if the papers match, else the same overall share. */
function carryMarks(from: Subject, to: Subject, marks: number[]): number[] {
  const a = SUBJECTS[from].exams
  const b = SUBJECTS[to].exams
  if (a.length === b.length && a.every((e, i) => e.rawMax === b[i].rawMax)) return marks
  const share = marks.reduce((s, m) => s + m, 0) / a.reduce((s, e) => s + e.rawMax, 0)
  return b.map(e => Math.round(e.rawMax * share))
}

/** The query as it is right now. The app routes by hash, so it lives inside the hash. Read at
 *  call time rather than from the render, so two changes in one tick (a log and a goal saved
 *  together) don't undo each other. */
function liveQuery(): URLSearchParams {
  return new URLSearchParams(window.location.hash.split('?')[1] ?? '')
}

// ── Page ───────────────────────────────────────────────────────────────────────────────────

export default function StudyScore() {
  const navigate = useNavigate()
  const rest = useParams()['*'] ?? ''
  const subject: Subject = SUBJECT_IDS.find(s => s === rest.split('/')[0]) ?? 'methods'
  const [params] = useSearchParams()
  const mode: Mode = params.get('mode') === 'papers' ? 'papers' : 'single'
  const marks = readMarks(params, subject)
  const years = DISTRIBUTIONS[subject]
  const span = `from ${years[0].year} to ${years[years.length - 1].year}`

  // Query changes replace the history entry (dragging a slider shouldn't fill Back).
  const nav = useRef(navigate)
  nav.current = navigate
  const patch = useCallback((changes: Record<string, string | null>) => {
    const q = liveQuery()
    for (const [k, v] of Object.entries(changes)) {
      if (v === null) q.delete(k)
      else q.set(k, v)
    }
    const qs = q.toString()
    nav.current({ search: qs ? `?${qs}` : '' }, { replace: true })
  }, [])

  const setMark = useCallback(
    (i: number, v: number) => patch(Object.fromEntries(readMarks(liveQuery(), subject).map((m, k) => [markKey(k), String(k === i ? v : m)]))),
    [patch, subject],
  )
  const onLog = useCallback((encoded: string) => patch({ a: encoded || null }), [patch])
  const onGoal = useCallback((goal: number | null) => patch({ g: goal === null ? null : String(goal) }), [patch])

  const goMode = (m: Mode) => {
    if (m !== mode) patch({ mode: m === 'papers' ? 'papers' : null })
  }
  const toTrack = () => {
    goMode('papers')
    requestAnimationFrame(() => document.getElementById(tabId('papers'))?.focus())
  }
  const goSubject = (s: Subject) => {
    if (s === subject) return
    const q = liveQuery()
    // The log and goal belong to the subject; the marks carry over (if the link had any).
    q.delete('a')
    q.delete('g')
    const had = SUBJECTS[subject].exams.some((_, i) => q.has(markKey(i)))
    SUBJECTS[subject].exams.forEach((_, i) => q.delete(markKey(i)))
    if (had) carryMarks(subject, s, marks).forEach((m, i) => q.set(markKey(i), String(m)))
    navigate(`${TOOL}/${s}${q.toString() ? `?${q}` : ''}`, { replace: true })
  }

  useEffect(() => {
    // The live query, not this render's: Track My Papers may already have put its log in the URL
    // (child effects run first), and fixing the path mustn't undo that.
    const q = liveQuery().toString()
    if (rest.split('/')[0] !== subject) navigate(`${TOOL}/${subject}${q ? `?${q}` : ''}`, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const marksKey = marks.join('-')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rows = useMemo(() => project(subject, marks), [subject, marksKey])
  const typical = typicalOf(rows)
  // A mark box holding something that isn't a mark (yet).
  const [busy, setBusy] = useState(false)
  const inputsRef = useRef<HTMLDivElement>(null)
  const needRef = useRef<HTMLElement>(null)

  return (
    <div className="px-4 sm:px-6 pt-6 sm:pt-10 pb-16 max-w-5xl mx-auto">
      {mode === 'single' && (
        <StickyMarkBar subject={subject} marks={marks} typical={typical} busy={busy} onMark={setMark} inputs={inputsRef} end={needRef} />
      )}

      <header className="mb-5">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Study Score Projection</h1>
        <p className="mt-2 max-w-3xl text-[15px] text-gray-600 dark:text-gray-300">
          See what study score your exam marks would earn, based on VCAA’s results {span}.
        </p>
      </header>

      <div className="flex flex-col gap-5">
        <section className={`${CARD} flex flex-col gap-4`}>
          <SegmentedControl
            aria-label="Subject"
            size="md"
            fill
            className="w-full sm:w-auto sm:max-w-md"
            value={subject}
            onChange={goSubject}
            options={SUBJECT_IDS.map(s => ({ value: s, label: SUBJECTS[s].label, ariaLabel: SUBJECTS[s].name }))}
          />
          <div className="flex flex-col gap-2">
            <SegmentedControl
              variant="tabs"
              aria-label="Mode"
              size="md"
              fill
              className="w-full sm:w-auto sm:max-w-md"
              value={mode}
              onChange={goMode}
              idFor={tabId}
              controls={PANEL}
              options={[
                { value: 'single', label: 'Check My Marks' },
                { value: 'papers', label: 'Track My Papers' },
              ]}
            />
            <p className={SUB}>
              {mode === 'single' ? (
                <>
                  Your marks, scored against each year {span}.{' '}
                  <button
                    type="button"
                    onClick={toTrack}
                    className="inline-block py-1 -my-1 [@media(pointer:coarse)]:py-3 [@media(pointer:coarse)]:-my-3 text-left font-medium text-sky-700 dark:text-sky-400 hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    Just sat a past paper? Log it in Track My Papers<span aria-hidden> →</span>
                  </button>
                </>
              ) : (
                'Log each past paper you sit and see your trend.'
              )}
            </p>
          </div>
          {mode === 'single' && (
            <>
              <MarkInputs key={subject} subject={subject} marks={marks} onMark={setMark} onBusy={setBusy} boxRef={inputsRef} />
              {/* Right-aligned at every width, so the copy-by-hand box that opens under it on a
                  refused clipboard stays on screen. */}
              <div className="flex justify-end">
                <CopyLink strip={['mode', 'a', 'g']} />
              </div>
            </>
          )}
        </section>

        <div role="tabpanel" id={PANEL} aria-labelledby={tabId(mode)} className="flex flex-col gap-5 min-w-0">
          {mode === 'single' ? (
            <CheckMarks subject={subject} marks={marks} rows={rows} typical={typical} busy={busy} endRef={needRef} />
          ) : (
            <PracticeMode key={subject} subject={subject} encoded={params.get('a') ?? ''} goalParam={params.get('g')} onLog={onLog} onGoal={onGoal} />
          )}
          <HowItWorks subject={subject} />
        </div>
      </div>
    </div>
  )
}
