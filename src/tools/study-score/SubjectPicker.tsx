// The subject switch: Methods, Specialist and Chemistry as a segmented control, as they were, with
// a fourth segment for everything else. "Other" opens a search field under the control; once a
// subject is picked there, the fourth segment shows its name. Search matches the full name, the
// short label and what students call a subject ("spec", "chem", "further", "eco", "jap").

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import SegmentedControl from '../../components/ui/SegmentedControl'
import { SUBJECTS, SUBJECT_IDS, type Subject } from './data.ts'
import { FOCUS } from './shared.tsx'

/** The three subjects that keep their own segment. */
const PINNED: Subject[] = ['methods', 'specialist', 'chemistry']
const OTHERS = SUBJECT_IDS.filter(s => !PINNED.includes(s))
const OTHER = 'other'

/** Shorter names for phones, where four segments share about 330 px. */
const PHONE: Partial<Record<Subject, string>> = { specialist: 'Spec', chemistry: 'Chem', general: 'General' }
const named = (s: Subject) =>
  PHONE[s] ? (
    <>
      <span className="sm:hidden">{PHONE[s]}</span>
      <span className="hidden sm:inline">{SUBJECTS[s].label}</span>
    </>
  ) : (
    SUBJECTS[s].label
  )

/** Words students type for a subject, beyond its name and label. */
const ALIASES: Record<Subject, string> = {
  methods: 'maths math mm cas',
  specialist: 'spec maths math sm',
  chemistry: 'chem science',
  general: 'gen maths math further fm',
  english: 'eng',
  accounting: 'acc accounts',
  economics: 'eco econ',
  japanese: 'jap jsl language languages lote',
}

/** Subjects for a search: those with a word starting with it first, then any containing it.
 *  Nothing typed: the subjects without a segment of their own. */
function search(q: string): Subject[] {
  const t = q.trim().toLowerCase()
  if (!t) return OTHERS
  const text = (s: Subject) => `${SUBJECTS[s].name} ${SUBJECTS[s].label} ${ALIASES[s]}`.toLowerCase()
  const starts = SUBJECT_IDS.filter(s => text(s).split(/\s+/).some(w => w.startsWith(t)))
  const inside = SUBJECT_IDS.filter(s => !starts.includes(s) && text(s).includes(t))
  return [...starts, ...inside]
}

export default function SubjectPicker({ value, onChange }: { value: Subject; onChange: (s: Subject) => void }) {
  const id = useId()
  const listId = `${id}-list`
  const pinned = PINNED.includes(value)
  const [open, setOpen] = useState(false)
  const [listShown, setListShown] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const items = search(query)

  // Opening the field puts the cursor in it, with the list showing.
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const close = () => {
    setOpen(false)
    setQuery('')
    setActive(0)
    setListShown(false)
  }
  const pick = (s: Subject) => {
    close()
    onChange(s)
  }
  const onSegment = (v: string) => {
    if (v === OTHER) {
      if (open) close()
      else setOpen(true)
      return
    }
    close()
    onChange(v as Subject)
  }
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      setListShown(true)
      if (items.length) setActive(a => (a + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (items[active]) pick(items[active])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close()
      document.getElementById(`${id}-${OTHER}-label`)?.closest('button')?.focus()
    }
  }

  const otherLabel = pinned ? 'Other' : named(value)
  const showList = open && listShown

  return (
    <div className="flex flex-col gap-2">
      <SegmentedControl
        aria-label="Subject"
        size="md"
        // Each segment as wide as its name, with the spare room shared out: equal columns
        // squeeze "Japanese" on a phone while "Spec" has room to spare. Phones get tighter side
        // padding, and on the narrowest the fourth segment gives way first, with an ellipsis.
        className="w-full sm:w-auto [&>button]:flex-auto [&>button]:px-2 sm:[&>button]:px-3.5 [&>button:last-child]:min-w-0"
        value={pinned ? value : OTHER}
        onChange={onSegment}
        options={[
          ...PINNED.map(s => ({ value: s as string, label: named(s), ariaLabel: SUBJECTS[s].name })),
          {
            value: OTHER,
            label: (
              <span id={`${id}-${OTHER}-label`} className="inline-flex items-center gap-1 min-w-0">
                <span className="truncate">{otherLabel}</span>
                {/* On a phone a picked subject's name needs the arrow's room ("Accounting" in about 80 px). */}
                <svg
                  viewBox="0 0 12 12"
                  aria-hidden
                  className={`w-3 h-3 flex-none transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''} ${pinned ? '' : 'hidden sm:block'}`}
                >
                  <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ),
            ariaLabel: pinned ? 'Other subjects' : `${SUBJECTS[value].name}, other subjects`,
          },
        ]}
      />
      {open && (
        <div className="relative w-full sm:max-w-lg">
          <div className="flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 focus-within:border-sky-600 dark:focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 dark:focus-within:ring-sky-900">
            <svg viewBox="0 0 16 16" aria-hidden className="w-4 h-4 flex-none text-gray-500 dark:text-gray-400">
              <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-label="Search subjects"
              aria-expanded={showList}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={showList && items[active] ? `${id}-opt-${items[active]}` : undefined}
              autoComplete="off"
              placeholder="Search subjects"
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                setActive(0)
                setListShown(true)
              }}
              onFocus={() => setListShown(true)}
              onBlur={() => setListShown(false)}
              onKeyDown={onKeyDown}
              className="flex-1 min-w-0 bg-transparent py-2.5 text-[0.9375rem] font-medium text-gray-900 dark:text-white placeholder:font-normal placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close search"
              className={`relative flex-none rounded-md p-1 text-gray-500 dark:text-gray-400 [@media(hover:hover)]:hover:text-gray-800 dark:[@media(hover:hover)]:hover:text-gray-200 after:absolute after:-inset-2 ${FOCUS}`}
            >
              <svg viewBox="0 0 12 12" aria-hidden className="w-3.5 h-3.5">
                <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {showList && (
            <ul
              id={listId}
              role="listbox"
              aria-label="Subjects"
              className="absolute z-20 left-0 right-0 top-[calc(100%+6px)] max-h-72 overflow-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1.5 shadow-lg"
            >
              {items.length === 0 ? (
                <li className="px-2.5 py-2 text-[0.8125rem] text-gray-500 dark:text-gray-400">
                  No subject called “{query.trim()}”. Study scores cover {SUBJECT_IDS.map(s => SUBJECTS[s].label).join(', ')}.
                </li>
              ) : (
                items.map((s, i) => (
                  <li
                    key={s}
                    id={`${id}-opt-${s}`}
                    role="option"
                    aria-selected={i === active}
                    // Before the input's blur, so the pick isn't lost when the list closes.
                    onMouseDown={e => {
                      e.preventDefault()
                      pick(s)
                    }}
                    onMouseMove={() => setActive(i)}
                    className={`flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 [@media(pointer:coarse)]:py-3 cursor-pointer ${
                      i === active ? 'bg-sky-50 dark:bg-sky-950/60' : ''
                    }`}
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{SUBJECTS[s].name}</span>
                    {s === value && <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Current</span>}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
