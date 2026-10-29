import { useEffect, useRef, type ReactNode } from 'react'
import SegmentedControl from '../../components/ui/SegmentedControl'
import Toggle from '../../components/ui/Toggle'
import { cardKey, subjects, type Card, type Deck, type Subject } from './data'
import { isDue, isNew, liveStreak, mastery, resetProgress, useProgress } from './progress'
import { type Settings } from './parts'

// The decks page: the subject's decks down the side (a scrolling row on phones), and for the open
// deck one main action, Memorise, with Test and Match beside it and the deck's topics below.
// Progress figures only show once there is progress: a new visitor sees cards, not rows of 0%.

export type View = 'study' | 'sheet' | 'test' | 'match'

/** How many new cards a Memorise session adds after the due ones. */
export const NEW_PER_SESSION = 10

export default function Home({ subject, deck, settings, onSettings, pool, onSubject, onDeck, onStart, onTopic }: {
  subject: Subject
  deck: Deck
  settings: Settings
  onSettings: (patch: Partial<Settings>) => void
  /** The cards selected: chosen groups, starred only if asked. */
  pool: Card[]
  onSubject: (id: string) => void
  onDeck: (id: string) => void
  onStart: (v: View) => void
  /** Opens one topic's cards, answers showing. */
  onTopic: (group: string) => void
}) {
  const p = useProgress()
  const keys = (d: Deck, cs: Card[]) => cs.map(c => cardKey(d, c))
  const dueIn = (d: Deck, cs: Card[] = d.cards) => keys(d, cs).filter(id => isDue(p, id)).length
  const due = dueIn(deck, pool)
  const fresh = keys(deck, pool).filter(id => isNew(p, id)).length
  const deckMastery = mastery(p, keys(deck, deck.cards))
  const best = p.best[subject.id]
  const streak = liveStreak(p)
  const dueToday = subjects.reduce((n, s) => n + s.decks.reduce((m, d) => m + dueIn(d), 0), 0)
  const allOn = settings.groups.length === deck.groups.length

  // On phones the decks are a sideways row: bring the open one into the middle of it (the row
  // only, never the page).
  const rail = useRef<HTMLElement>(null)
  useEffect(() => {
    const row = rail.current
    const on = row?.querySelector<HTMLElement>('[aria-current]')
    if (!row || !on || row.scrollWidth <= row.clientWidth) return
    row.scrollLeft = on.offsetLeft - (row.clientWidth - on.offsetWidth) / 2
  }, [deck.id])

  const toggleGroup = (g: string) => {
    const next = settings.groups.includes(g) ? settings.groups.filter(x => x !== g) : [...settings.groups, g]
    onSettings({ groups: deck.groups.filter(x => next.includes(x)) })
  }

  const headline = !pool.length ? 'Pick a topic to start'
    : due || fresh ? [due && `${due} due`, fresh && `${Math.min(fresh, NEW_PER_SESSION)} new`].filter(Boolean).join(', ')
    : 'Nothing due today'

  return (
    <div className="flex flex-col gap-6">
      {/* Subject, and today's numbers across every subject */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <SegmentedControl
          size="md"
          aria-label="Subject"
          value={subject.id}
          onChange={onSubject}
          options={subjects.map(s => {
            const n = s.decks.reduce((m, d) => m + dueIn(d), 0)
            return {
              value: s.id,
              ariaLabel: n ? `${s.name}, ${n} due` : s.name,
              label: <>{s.name}{n > 0 && <span className="ml-1.5 tabular-nums text-blue-700 dark:text-blue-300">{n}</span>}</>,
            }
          })}
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 tabular-nums">
          {dueToday} due today{streak > 0 && <>, <span className="font-semibold text-amber-700 dark:text-amber-400">{streak}-day streak</span></>}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 lg:items-start">
        {/* Decks: a rail on laptops, a row that scrolls sideways on phones */}
        <nav
          ref={rail}
          aria-label={`${subject.name} decks`}
          className="relative -mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 flex lg:flex-col gap-1.5 lg:gap-0.5 overflow-x-auto lg:overflow-visible snap-x scroll-px-5 pb-1 lg:pb-0 lg:sticky lg:top-6 [scrollbar-width:none]"
        >
          {subject.decks.map(d => {
            const on = d.id === deck.id
            const n = dueIn(d)
            return (
              <button
                key={d.id}
                onClick={() => onDeck(d.id)}
                aria-current={on ? 'page' : undefined}
                className={`snap-start shrink-0 flex items-center justify-between gap-4 rounded-lg border lg:border-transparent lg:dark:border-transparent px-3 py-2 text-left text-sm leading-snug whitespace-nowrap lg:whitespace-normal transition-colors ${
                  on
                    ? 'border-blue-200 bg-blue-50 text-blue-800 font-semibold dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-200'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 lg:bg-transparent lg:dark:bg-transparent'
                }`}
              >
                <span>{d.title}</span>
                <span className={`text-xs tabular-nums ${n ? 'font-semibold text-blue-700 dark:text-blue-300' : on ? 'text-blue-700/70 dark:text-blue-300/70' : 'text-gray-400 dark:text-gray-500'}`}>
                  {n ? `${n} due` : d.cards.length}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="min-w-0 flex flex-col gap-6">
          <header key={deck.id} className="slide-up-in">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{deck.title}</h2>
            <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">{deck.blurb}</p>
          </header>

          {/* The main action: Memorise */}
          <section aria-labelledby="fc-memorise" className="rounded-2xl bg-blue-600 dark:bg-blue-700 px-5 py-5 sm:px-6 sm:py-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 shadow-[0_18px_40px_-24px_rgba(37,99,235,0.8)] dark:shadow-none">
            <div>
              <h3 id="fc-memorise" className="text-sm font-semibold text-blue-100">Memorise</h3>
              <p className="mt-0.5 font-display text-2xl sm:text-[1.7rem] font-bold tracking-tight tabular-nums">{headline}</p>
              <p className="mt-1 text-sm text-blue-100/90">
                {deckMastery > 0 ? `${deckMastery}% of this deck mastered. ` : ''}Rate each card, and the hard ones come back sooner.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => onStart('study')}
                disabled={!pool.length}
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none transition-[background-color,transform]"
              >
                {due || fresh || !pool.length ? 'Start' : 'Study ahead'}
              </button>
              <button
                onClick={() => onStart('sheet')}
                disabled={!pool.length}
                className="rounded-lg border border-white/40 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none transition-[background-color,transform]"
              >
                Cover sheet
              </button>
            </div>
          </section>

          {/* Test and Match: secondary, side by side */}
          <div className="grid gap-3 sm:grid-cols-2">
            <ActionRow title="Test yourself" body="Mixed questions, marked for you. Misses come back in Memorise." disabled={!pool.length} onClick={() => onStart('test')} />
            <ActionRow
              title="Match"
              body={best !== undefined ? <>Pair 6 cards against the clock. Your best: <span className="font-semibold text-gray-700 dark:text-gray-200 tabular-nums">{(best / 1000).toFixed(1)} s</span></> : 'Pair 6 cards with their answers against the clock.'}
              disabled={pool.length < 2}
              onClick={() => onStart('match')}
            />
          </div>

          {/* Topics, and how the cards are asked */}
          <section aria-labelledby="fc-topics">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <h3 id="fc-topics" className="font-display text-lg font-bold text-gray-900 dark:text-white">Topics</h3>
              <button onClick={() => onSettings({ groups: allOn ? [] : deck.groups })} className="text-sm font-medium text-blue-700 dark:text-blue-300 hover:underline underline-offset-2">
                {allOn ? 'Clear' : 'Select all'}
              </button>
            </div>
            <div className="card overflow-hidden">
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {deck.groups.map(g => {
                  const cs = deck.cards.filter(c => c.group === g)
                  const ids = keys(deck, cs)
                  const m = mastery(p, ids)
                  const d = ids.filter(id => isDue(p, id)).length
                  const starred = ids.filter(id => p.stars[id]).length
                  return (
                    <li key={g} className="flex items-center gap-3 pl-4 pr-3 py-1">
                      {/* The tick picks the topic for study; the name opens its cards to read. */}
                      <input type="checkbox" checked={settings.groups.includes(g)} onChange={() => toggleGroup(g)} aria-label={`Study ${g}`} className="w-4 h-4 accent-blue-600 cursor-pointer" />
                      <button
                        onClick={() => onTopic(g)}
                        title={`See the ${g} cards`}
                        className="group/topic min-w-0 flex-1 flex items-center gap-2 rounded-lg px-2 py-2 text-left text-[15px] text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                      >
                        <span className="truncate">{g}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">{cs.length}</span>
                        <span aria-hidden className="text-gray-300 dark:text-gray-600 group-hover/topic:text-blue-600 dark:group-hover/topic:text-blue-400 group-hover/topic:translate-x-0.5 transition-transform">›</span>
                      </button>
                      <span className="flex items-center gap-3 text-xs tabular-nums whitespace-nowrap">
                        {starred > 0 && <span className="text-amber-600 dark:text-amber-400" title="Starred">★ {starred}</span>}
                        {d > 0 ? <span className="font-semibold text-blue-700 dark:text-blue-300">{d} due</span>
                          : m > 0 ? <span className="text-gray-500 dark:text-gray-400" title="Mastered">{m}%</span> : null}
                      </span>
                    </li>
                  )
                })}
              </ul>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/60 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Show first</span>
                  <SegmentedControl
                    aria-label="Show first"
                    value={settings.dir}
                    onChange={d => onSettings({ dir: d })}
                    options={[
                      { value: 'fwd', label: deck.directionLabel.fwd },
                      { value: 'rev', label: deck.directionLabel.rev },
                      { value: 'mixed', label: 'Mixed' },
                    ]}
                  />
                </div>
                <Toggle appearance="switch" checked={settings.starredOnly} onChange={v => onSettings({ starredOnly: v })} label="Starred only" />
                <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums sm:ml-auto">{pool.length} card{pool.length === 1 ? '' : 's'} selected</span>
              </div>
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>{deck.source ? `From ${deck.source}. ` : ''}Progress is saved on this device only.</span>
            <button
              onClick={() => { if (window.confirm('Forget all flashcard progress, stars and best times on this device?')) resetProgress() }}
              className="hover:text-rose-600 dark:hover:text-rose-400 underline-offset-2 hover:underline"
            >
              Reset progress
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ActionRow({ title, body, disabled, onClick }: { title: string; body: ReactNode; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3.5 text-left hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-px active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none transition-[border-color,transform]"
    >
      <span>
        <span className="block font-semibold text-gray-900 dark:text-white">{title}</span>
        <span className="block mt-0.5 text-[13px] leading-snug text-gray-500 dark:text-gray-400">{body}</span>
      </span>
      <span aria-hidden className="text-blue-700 dark:text-blue-300 transition-transform group-hover:translate-x-1">→</span>
    </button>
  )
}
