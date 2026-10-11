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
// switching subject carries the marks over and drops the subject's own log and goal. The marks
// are held by the page and reach the URL a moment after they stop changing (URL_DELAY).

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams, type To } from 'react-router-dom'
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
/** How long the marks wait after their last change before they go into the URL. Browsers cap
 *  history writes (Safari, and so every iOS browser, refuses more than 100 in 10 seconds), and a
 *  slider drag changes the mark once per step. */
const URL_DELAY = 350

type Mode = 'single' | 'papers'

const PANEL = 'ss-panel'
const tabId = (m: Mode) => `ss-tab-${m}`
const markKey = (i: number) => `e${i + 1}`

/** The subject named by the path after the tool ('methods' when it names none). */
function subjectIn(rest: string): Subject {
  return SUBJECT_IDS.find(s => s === rest.split('/')[0]) ?? 'methods'
}

/** One subject's marks as a key ("methods:30-60"), to tell two sets apart. */
const marksId = (subject: Subject, marks: number[]) => `${subject}:${marks.join('-')}`

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
  const subject = subjectIn(rest)
  const [params] = useSearchParams()
  const mode: Mode = params.get('mode') === 'papers' ? 'papers' : 'single'
  const urlMarks = readMarks(params, subject)
  const urlId = marksId(subject, urlMarks)
  const years = DISTRIBUTIONS[subject]
  const span = `from ${years[0].year} to ${years[years.length - 1].year}`

  // ── Writing the URL ──
  // Every change replaces the history entry (trying marks shouldn't fill Back). A write the
  // browser refuses is dropped rather than thrown, so it can never stop the page; `write` says
  // whether it went through.
  const nav = useRef(navigate)
  nav.current = navigate
  const write = useCallback((to: To): boolean => {
    try {
      nav.current(to, { replace: true })
      return true
    } catch {
      return false
    }
  }, [])
  const patch = useCallback(
    (changes: Record<string, string | null>): boolean => {
      const q = liveQuery()
      for (const [k, v] of Object.entries(changes)) {
        if (v === null) q.delete(k)
        else q.set(k, v)
      }
      const qs = q.toString()
      return write({ search: qs ? `?${qs}` : '' })
    },
    [write],
  )

  // ── The marks ──
  // Held here, so every step shows at once, and written to the URL once they have stopped
  // changing for URL_DELAY. `inUrl` is what the URL holds as far as this page knows: the marks it
  // last wrote, or last took from the URL. When the URL's marks become anything else (a link
  // opened, Back or Forward, a subject switch), they replace the held ones and any write still
  // waiting is dropped; the page's own writes arriving change nothing.
  const [held, setHeld] = useState(() => ({ from: urlId, marks: urlMarks }))
  const inUrl = useRef(urlId)
  let marks = held.marks
  if (held.from !== urlId) {
    marks = urlId === inUrl.current ? held.marks : urlMarks
    setHeld({ from: urlId, marks })
  }
  const latest = useRef(marks)
  latest.current = marks
  const pending = useRef<{ subject: Subject; marks: number[] } | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useLayoutEffect(() => {
    if (urlId === inUrl.current) return
    inUrl.current = urlId
    clearTimeout(timer.current)
    pending.current = null
  }, [urlId])

  /** Write marks still waiting, now: before anything else reads or rewrites the URL. */
  const flush = useCallback(() => {
    clearTimeout(timer.current)
    const p = pending.current
    pending.current = null
    if (!p) return
    // Only into this page's own address: once the page is left, another page's is there.
    const route = window.location.hash.slice(1).split('?')[0]
    if (!(route === TOOL || route.startsWith(`${TOOL}/`)) || subjectIn(route.slice(TOOL.length + 1)) !== p.subject) return
    const before = inUrl.current
    inUrl.current = marksId(p.subject, p.marks)
    if (!patch(Object.fromEntries(p.marks.map((m, k) => [markKey(k), String(m)])))) {
      // Refused: the URL still has the old marks, and the next flush tries again.
      inUrl.current = before
      pending.current = p
    }
  }, [patch])

  const setMark = useCallback(
    (i: number, v: number) => {
      const next = latest.current.map((m, k) => (k === i ? Math.min(SUBJECTS[subject].exams[k].rawMax, Math.max(0, v)) : m))
      if (next[i] === latest.current[i]) return
      latest.current = next
      setHeld(h => ({ from: h.from, marks: next }))
      pending.current = { subject, marks: next }
      clearTimeout(timer.current)
      timer.current = setTimeout(flush, URL_DELAY)
    },
    [subject, flush],
  )

  // Leaving the page, or the page being hidden or closed: write what's waiting, so a reload or a
  // restored tab has the latest marks (flush keeps to this page's own address).
  // Any click flushes first, in the capture phase on document: that runs before React's own
  // listener on the root, so before a link's onClick navigates (Enter on a link clicks too), and
  // Back from the next page finds the latest marks. By unmount the new page's address is already
  // there, so the flush on unmount is only a fallback. At most one write per click.
  useEffect(() => {
    const onHidden = () => {
      if (document.visibilityState === 'hidden') flush()
    }
    window.addEventListener('pagehide', flush)
    document.addEventListener('visibilitychange', onHidden)
    document.addEventListener('click', flush, true)
    return () => {
      window.removeEventListener('pagehide', flush)
      document.removeEventListener('visibilitychange', onHidden)
      document.removeEventListener('click', flush, true)
      flush()
    }
  }, [flush])

  // Back or Forward: that entry's marks win, even when they match the ones the URL already had,
  // so a write still waiting can't land in it. Forgetting `inUrl` makes the next render take the
  // URL's marks.
  useEffect(() => {
    const onPop = () => {
      clearTimeout(timer.current)
      pending.current = null
      inUrl.current = ''
      setHeld(h => ({ from: '', marks: h.marks }))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const onLog = useCallback(
    (encoded: string) => {
      patch({ a: encoded || null })
    },
    [patch],
  )
  const onGoal = useCallback(
    (goal: number | null) => {
      patch({ g: goal === null ? null : String(goal) })
    },
    [patch],
  )

  // ── Tabs and subjects ──
  const goMode = (m: Mode) => {
    if (m === mode) return
    flush()
    patch({ mode: m === 'papers' ? 'papers' : null })
  }
  const toTrack = () => {
    goMode('papers')
    requestAnimationFrame(() => document.getElementById(tabId('papers'))?.focus())
  }
  const goSubject = (s: Subject) => {
    if (s === subject) return
    flush()
    const q = liveQuery()
    // The log and goal belong to the subject; the marks carry over if the link had any, or the
    // student has set some (a refused write can leave them out of the URL).
    q.delete('a')
    q.delete('g')
    const now = latest.current
    const had = SUBJECTS[subject].exams.some((_, i) => q.has(markKey(i))) || inUrl.current !== marksId(subject, now)
    SUBJECTS[subject].exams.forEach((_, i) => q.delete(markKey(i)))
    if (had) carryMarks(subject, s, now).forEach((m, i) => q.set(markKey(i), String(m)))
    write(`${TOOL}/${s}${q.toString() ? `?${q}` : ''}`)
  }

  useEffect(() => {
    // The live query, not this render's: Track My Papers may already have put its log in the URL
    // (child effects run first), and fixing the path mustn't undo that.
    const q = liveQuery().toString()
    if (rest.split('/')[0] !== subject) write(`${TOOL}/${subject}${q ? `?${q}` : ''}`)
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
        <p className="mt-2 max-w-3xl text-[0.9375rem] text-gray-600 dark:text-gray-300">
          See what study score your exam marks would earn, based on VCAA’s results {span}.
        </p>
      </header>

      <div className="flex flex-col gap-5">
        {/* A container, so the mark inputs go side by side only once the card itself is wide enough
            (not just the screen: the sidebar takes 240 px from 768 px up). */}
        <section className={`${CARD} @container flex flex-col gap-4`}>
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
                    className="inline-block py-1 -my-1 [@media(pointer:coarse)]:py-3 [@media(pointer:coarse)]:-my-3 text-left font-medium text-sky-700 dark:text-sky-400 [@media(hover:hover)]:hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
                <CopyLink strip={['mode', 'a', 'g']} flush={flush} />
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
