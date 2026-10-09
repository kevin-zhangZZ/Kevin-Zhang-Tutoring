// Track My Papers: a log of the past papers a student has sat, in the order they sat them, each
// projected against the students who sat that paper. The headline and chart (Headline.tsx,
// Chart.tsx) lead with the Recent Average, since single papers jump around by a few points
// depending on how kind the year was; the form and list are Form.tsx and List.tsx.
//
// The log lives in the URL (?a=…, see log.ts) so it can be bookmarked or sent, and is kept on
// this device per subject. A log that arrives in a link is compared with this device's first:
// one that only adds papers is saved, an old bookmark of your own log opens the saved one, and
// anything else is shown with a strip (LinkNotice.tsx) and never written here until the student
// says so. A date is optional: a paper added without one goes at the end, as the latest.

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { isOldCourse, type Subject } from '../data.ts'
import { aheadOf } from '../format.ts'
import { Announce, CARD, CopyLink, H2, KeepInMind, SUB, scrollBehavior } from '../shared.tsx'
import { fmtDate } from './dates.ts'
import {
  attemptName,
  compareLogs,
  decodeAttempts,
  encodeAttempts,
  insertAttempt,
  loadAttempts,
  loadGoal,
  parseGoal,
  removeAttempt,
  replaceAttempt,
  saveAttempts,
  saveGoal,
  scoreAttempts,
  type Draft,
} from './log.ts'
import AttemptForm, { blankMarks, defaultPaper, type FormValues } from './Form.tsx'
import AttemptList, { UndoLine } from './List.tsx'
import LinkNotice from './LinkNotice.tsx'
import PracticeHeadline from './Headline.tsx'
import ProgressChart from './Chart.tsx'

// ── Arriving ───────────────────────────────────────────────────────────────────────────────

/** `saved`: the link's papers were saved here (`added` new ones; null if nothing was saved
 *  before). `clash`: the link's log isn't this device's, and nothing is written here yet. */
type Notice = { kind: 'saved'; added: number | null } | { kind: 'clash' }

/** The log this page last put in the URL (or accepted from it). `before` is the one a change of
 *  the student's replaced, which may still be in the URL for a moment until the router catches
 *  up; it isn't a new link arriving. */
interface Known {
  subject: Subject
  encoded: string
  before: string
}

/** What to show for a log in the URL that this page didn't put there: on arrival (the page
 *  is keyed by subject, so a new subject arrives afresh), or a link opened over this one. */
function arrive(subject: Subject, encoded: string): { show: string; save: boolean; notice: Notice | null } {
  const saved = loadAttempts(subject)
  if (!encoded) return { show: saved, save: false, notice: null }
  const link = decodeAttempts(encoded, subject)
  const mine = decodeAttempts(saved, subject)
  const clean = encodeAttempts(link)
  switch (compareLogs(link, mine)) {
    case 'same':
      return { show: clean, save: false, notice: null }
    case 'subset':
      // An old bookmark of this device's own log: open what's saved now.
      return { show: saved, save: false, notice: null }
    case 'superset':
      return { show: clean, save: true, notice: { kind: 'saved', added: mine.length ? link.length - mine.length : null } }
    default:
      return { show: clean, save: false, notice: { kind: 'clash' } }
  }
}

// ── Mode ───────────────────────────────────────────────────────────────────────────────────

/** A paper removed (`at`: where it was in the log) or the whole log cleared (`at` null). */
interface Undo {
  prev: string
  text: string
  at: number | null
}

/** The add form as typed, for one subject. `paper` null means "the default" (the newest paper
 *  not logged yet), so it moves on after each add. */
interface AddDraft extends Omit<FormValues, 'paper'> {
  subject: Subject
  paper: number | null
}

const FLASH_MS = 2000
/** A zero-width space, to tell two identical status messages apart. */
const ZWSP = String.fromCharCode(0x200b)

export default function PracticeMode({
  subject,
  encoded,
  goalParam,
  onLog,
  onGoal,
}: {
  subject: Subject
  encoded: string
  goalParam: string | null
  onLog: (encoded: string) => void
  onGoal: (goal: number | null) => void
}) {
  // ── The log, and links arriving ──
  const known = useRef<Known | null>(null)
  const k = known.current
  const fresh = !(k && k.subject === subject && (encoded === k.encoded || encoded === k.before))
  const arrival = useMemo(() => (fresh ? arrive(subject, encoded) : null), [fresh, subject, encoded])
  const shown = arrival ? arrival.show : encoded
  const attempts = useMemo(() => decodeAttempts(shown, subject), [shown, subject])
  const scored = useMemo(() => scoreAttempts(subject, attempts), [subject, attempts])

  const [notice, setNotice] = useState<Notice | null>(null)
  const [clashEdited, setClashEdited] = useState(false)
  // A goal typed while a link's log clashes goes in the URL only, like the log. It's held here
  // too (undefined: not touched), so clearing the box doesn't bring this device's goal back.
  const [clashGoal, setClashGoal] = useState<number | null | undefined>(undefined)
  const [, setArrivals] = useState(0)
  const clash = notice?.kind === 'clash'

  const [editing, setEditing] = useState<number | null>(null)
  const [undo, setUndo] = useState<Undo | null>(null)
  const [flash, setFlash] = useState<number | null>(null)
  const [said, setSaid] = useState('')
  /** Read `text` out. Announce only speaks when its text changes, so every other message carries
   *  a zero-width space: the same message twice in a row (Save, then Save again) is still read. */
  const say = (text: string) => setSaid(t => (t.endsWith(ZWSP) ? text : text + ZWSP))

  useEffect(() => {
    if (!arrival) return
    // No `before` here: if something else rewrites the URL in the meantime (the page fixing its
    // path on a first visit), this simply runs again.
    known.current = { subject, encoded: arrival.show, before: arrival.show }
    if (arrival.save) saveAttempts(subject, arrival.show)
    setNotice(arrival.notice)
    setClashEdited(false)
    setClashGoal(undefined)
    setEditing(null)
    setUndo(null)
    setFlash(null)
    setArrivals(n => n + 1)
    if (arrival.show !== encoded) onLog(arrival.show)
    // Runs once per arrival; the props it reads belong to that render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrival])

  // Focus and scrolling that wait for a change to reach the URL and the page.
  const afterCommit = useRef<{ encoded: string; run: () => void } | null>(null)
  const [tick, setTick] = useState(0)
  useEffect(() => {
    // The URL has caught up: the log it replaced no longer counts as ours.
    const k = known.current
    if (k && k.encoded === encoded) k.before = encoded
    const job = afterCommit.current
    if (job && job.encoded === encoded) {
      afterCommit.current = null
      job.run()
    }
  }, [encoded, tick])

  useEffect(() => {
    if (flash === null) return
    const t = setTimeout(() => setFlash(null), FLASH_MS)
    return () => clearTimeout(t)
  }, [flash])

  /** Put `next` in the URL, then `after()` once the page shows it. */
  const show = (next: string, after?: () => void) => {
    known.current = { subject, encoded: next, before: shown }
    afterCommit.current = after ? { encoded: next, run: after } : null
    setTick(t => t + 1)
    if (next !== encoded) onLog(next)
  }
  /** A change the student made: in the URL, and on this device unless a link's log clashes. */
  const commit = (next: string, after?: () => void) => {
    if (clash) setClashEdited(true)
    else saveAttempts(subject, next)
    if (notice?.kind === 'saved') setNotice(null)
    setEditing(null)
    show(next, after)
  }

  // ── Goal ──
  const [goalVersion, setGoalVersion] = useState(0)
  const goal = useMemo(
    () => (clash && clashGoal !== undefined ? clashGoal : (parseGoal(goalParam) ?? loadGoal(subject))),
    // goalVersion: the saved goal changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goalParam, subject, goalVersion, clash, clashGoal],
  )
  const changeGoal = (g: number | null) => {
    if (clash) {
      setClashGoal(g)
      setClashEdited(true)
    } else {
      saveGoal(subject, g)
      setGoalVersion(v => v + 1)
    }
    onGoal(g)
  }
  // This device's goal goes into the URL too, so Copy Link carries it; only once the log has
  // settled, so the two URL changes don't land together and one undo the other.
  useEffect(() => {
    if (fresh || known.current?.encoded !== encoded || clash || goalParam !== null) return
    const g = loadGoal(subject)
    if (g !== null) onGoal(g)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fresh, encoded, clash, subject, goalParam])

  // ── Focus ──
  const pageRef = useRef<HTMLDivElement>(null)
  const addFormRef = useRef<HTMLFormElement | null>(null)
  const addMarkRef = useRef<HTMLInputElement | null>(null)
  const focusOn = (selector: string) => {
    const el = pageRef.current?.querySelector<HTMLElement>(selector)
    if (!el) return
    el.focus({ preventScroll: true })
    el.scrollIntoView({ block: 'nearest', behavior: scrollBehavior() })
  }
  const jumpToForm = () => {
    addMarkRef.current?.focus({ preventScroll: true })
    addFormRef.current?.scrollIntoView({ block: 'center', behavior: scrollBehavior() })
  }

  // ── Adding ──
  const paper0 = defaultPaper(subject, attempts)
  const [addDraft, setAddDraft] = useState<AddDraft>(() => ({ subject, paper: null, date: '', dateBad: false, marks: blankMarks(subject) }))
  const mine = addDraft.subject === subject
  const addValues: FormValues = {
    paper: (mine ? addDraft.paper : null) ?? paper0,
    date: addDraft.date,
    dateBad: addDraft.dateBad,
    marks: mine ? addDraft.marks : blankMarks(subject),
  }
  const setAdd = (v: FormValues) =>
    setAddDraft({ ...v, subject, paper: v.paper === addValues.paper && (!mine || addDraft.paper === null) ? null : v.paper })

  const add = (draft: Draft) => {
    const { list, at } = insertAttempt(attempts, draft)
    const first = attempts.length === 0
    const p = scoreAttempts(subject, list)[at].proj
    // Clear the marks; keep the date (for logging several in a row) and the Paper default.
    setAddDraft({ subject, paper: null, date: addValues.date, dateBad: false, marks: blankMarks(subject) })
    setUndo(null)
    setFlash(at)
    say(`Added your ${attemptName(list[at])}: ${p.score}, ${aheadOf(p.pct)} of the state.`)
    commit(encodeAttempts(list), () => {
      addMarkRef.current?.focus({ preventScroll: true })
      // The first paper's headline appears where the form was, so stay there.
      if (!first) pageRef.current?.querySelector(`[data-row="${at}"]`)?.scrollIntoView({ block: 'nearest', behavior: scrollBehavior() })
    })
  }

  // ── Editing, removing, undoing ──
  const saveEdit = (id: number, draft: Draft) => {
    const { list, at } = replaceAttempt(attempts, id, draft)
    setUndo(null)
    // A new date can move the paper: show where it went.
    setFlash(at !== id ? at : null)
    say(`Saved your ${attemptName(list[at])}.`)
    commit(encodeAttempts(list), () => focusOn(`[data-edit="${at}"]`))
  }
  const remove = (id: number) => {
    const a = attempts[id]
    setUndo({ prev: shown, text: a.date ? `Removed your ${a.paper} paper from ${fmtDate(a.date)}.` : `Removed your ${a.paper} paper.`, at: id })
    setFlash(null)
    commit(encodeAttempts(removeAttempt(attempts, id)), () => focusOn('[data-undo]'))
  }
  const clearAll = () => {
    const n = attempts.length
    setUndo({ prev: shown, text: `Cleared ${n} paper${n === 1 ? '' : 's'}.`, at: null })
    setFlash(null)
    commit('', () => focusOn('[data-undo]'))
  }
  const undoIt = () => {
    if (!undo) return
    const back = decodeAttempts(undo.prev, subject)
    const at = undo.at ?? back.length - 1
    setUndo(null)
    setFlash(null)
    say(undo.at === null ? `Put back ${back.length} paper${back.length === 1 ? '' : 's'}.` : `Put back your ${attemptName(back[at])}.`)
    commit(undo.prev, () => focusOn(`[data-edit="${at}"]`))
  }

  // ── A link's log that clashes ──
  const savedCount = useMemo(
    () => (clash ? decodeAttempts(loadAttempts(subject), subject).length : 0),
    // Re-read whenever the strip is drawn for a new log.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clash, subject, shown],
  )
  const keepLink = () => {
    saveAttempts(subject, shown)
    // The goal shown with the log comes with it.
    saveGoal(subject, goal)
    setGoalVersion(v => v + 1)
    setNotice({ kind: 'saved', added: null })
    setClashEdited(false)
    setClashGoal(undefined)
    requestAnimationFrame(() => pageRef.current?.querySelector<HTMLElement>('[data-note]')?.focus())
  }
  const openMine = () => {
    const saved = loadAttempts(subject)
    setNotice(null)
    setClashEdited(false)
    setClashGoal(undefined)
    setEditing(null)
    setUndo(null)
    setFlash(null)
    say('Opened the log saved on this device.')
    // The strip had focus and is gone: carry on from the top of the panel.
    show(saved, () => {
      const top = pageRef.current
      if (!top) return
      top.tabIndex = -1
      top.addEventListener('blur', () => top.removeAttribute('tabindex'), { once: true })
      top.focus({ preventScroll: true })
    })
    // This device's goal too, not the link's (none saved: the link's goes).
    onGoal(loadGoal(subject))
  }

  // ── Page ──
  const firstId = useId()
  const listId = useId()
  const empty = attempts.length === 0

  const addForm = (boxed: boolean) => (
    <AttemptForm
      subject={subject}
      attempts={attempts}
      values={addValues}
      onValues={setAdd}
      onSubmit={add}
      formRef={addFormRef}
      firstMarkRef={addMarkRef}
      className={boxed ? 'sm:rounded-xl sm:border sm:border-dashed sm:border-gray-300 sm:dark:border-gray-700 sm:p-3' : ''}
    />
  )

  return (
    <div ref={pageRef} className="flex flex-col gap-5 outline-none">
      <Announce text={said} />

      {clash && <LinkNotice attempts={attempts} savedCount={savedCount} edited={clashEdited} onSave={keepLink} onOpenMine={openMine} />}
      {notice?.kind === 'saved' && (
        <p data-note tabIndex={-1} role="status" className="-mb-2 px-1 text-[12px] text-gray-500 dark:text-gray-400 outline-none">
          {notice.added === null
            ? 'Saved on this device.'
            : `Saved on this device: ${notice.added} new paper${notice.added === 1 ? '' : 's'} from the link added.`}
        </p>
      )}

      {empty ? (
        <section aria-labelledby={firstId} className={CARD}>
          <h2 id={firstId} className={H2}>
            Log Your First Paper
          </h2>
          <p className={`${SUB} mt-0.5 mb-4 max-w-2xl`}>Enter your marks from any past paper you’ve sat. Your trend line starts at your 3rd paper.</p>
          {addForm(false)}
          {undo && <UndoLine text={undo.text} onUndo={undoIt} className="mt-4" />}
        </section>
      ) : (
        <>
          <PracticeHeadline subject={subject} scored={scored} goal={goal} />
          <KeepInMind
            subject={subject}
            nearTop={scored.some(a => a.proj.score >= 45)}
            oldCourse={scored.some(a => isOldCourse(subject, a.paper))}
          />
          <ProgressChart subject={subject} scored={scored} goal={goal} onGoal={changeGoal} onAddPaper={jumpToForm} />

          <section aria-labelledby={listId} className={CARD}>
            {/* Copy Link stays top-right at every width, so the copy-by-hand box that opens under
                it when the clipboard is refused stays on screen. */}
            <div className="flex items-start justify-between gap-4">
              <h2 id={listId} className={H2}>
                Your Attempts
              </h2>
              <CopyLink strip={['e1', 'e2']} className="flex-none" />
            </div>
            <p className={`${SUB} mt-0.5 mb-4 max-w-2xl`}>
              {clash
                ? 'Not saved on this device yet. Use Copy Link to send it back.'
                : 'Add each paper as you sit it. Saved on this device; use Copy Link to send your log to someone.'}
            </p>
            {addForm(true)}
            <div className="mt-5">
              <AttemptList
                subject={subject}
                scored={scored}
                editing={editing}
                flash={flash}
                removed={undo && undo.at !== null ? { at: undo.at, text: undo.text } : null}
                onEdit={setEditing}
                onSave={saveEdit}
                onRemove={remove}
                onUndo={undoIt}
              />
            </div>
            <button
              type="button"
              onClick={clearAll}
              className="mt-2 -ml-1.5 h-9 [@media(pointer:coarse)]:h-10 rounded-lg px-1.5 text-[12.5px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Clear All Papers
            </button>
          </section>
        </>
      )}
    </div>
  )
}
