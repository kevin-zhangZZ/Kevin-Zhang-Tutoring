import type { ReactNode } from 'react'
import SegmentedControl from '../../components/ui/SegmentedControl'
import Toggle from '../../components/ui/Toggle'
import { cardKey, subjects, type Card, type Deck, type Subject } from './data'
import { isDue, isNew, mastery, resetProgress, useProgress, type Progress } from './progress'
import { MasteryBar, Ring, primaryBtn, secondaryBtn, type Settings } from './parts'

// The starting page: pick a subject and its groups, see what's due and how well each group is
// known, then start Memorise, Test or Match.

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
  const keys = (cs: Card[]) => cs.map(c => cardKey(deck, c))
  const due = keys(pool).filter(id => isDue(p, id)).length
  const fresh = keys(pool).filter(id => isNew(p, id)).length
  const best = p.best[subject.id]
  const allOn = settings.groups.length === deck.groups.length

  const toggleGroup = (g: string) => {
    const next = settings.groups.includes(g) ? settings.groups.filter(x => x !== g) : [...settings.groups, g]
    onSettings({ groups: deck.groups.filter(x => next.includes(x)) })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Subjects */}
      <div className="grid sm:grid-cols-3 gap-3">
        {subjects.map(s => (
          <SubjectTile key={s.id} subject={s} p={p} on={s.id === subject.id} onClick={() => onSubject(s.id)} />
        ))}
      </div>

      {/* Decks in the subject, when there's more than one */}
      {subject.decks.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5" role="group" aria-label={`${subject.name} decks`}>
          {subject.decks.map(d => {
            const ids = d.cards.map(c => cardKey(d, c))
            const dd = ids.filter(id => isDue(p, id)).length
            const on = d.id === deck.id
            return (
              <button
                key={d.id}
                onClick={() => onDeck(d.id)}
                aria-pressed={on}
                className={`flex flex-col gap-2 text-left rounded-xl border px-3.5 py-3 transition-[border-color,background-color] ${
                  on ? 'border-blue-600 dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/30' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-600'
                }`}
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-semibold text-[15px] text-gray-900 dark:text-white leading-snug">{d.title}</span>
                  <span className={`text-xs tabular-nums whitespace-nowrap ${dd ? 'font-semibold text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>{dd ? `${dd} due` : d.cards.length}</span>
                </span>
                <MasteryBar pct={mastery(p, ids)} />
              </button>
            )
          })}
        </div>
      )}

      {/* Groups */}
      <section className="card p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 mb-1">
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">{deck.title}</h2>
          <button
            onClick={() => onSettings({ groups: allOn ? [] : deck.groups })}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            {allOn ? 'Clear' : 'Select all'}
          </button>
        </div>
        <ul>
          {deck.groups.map(g => {
            const cs = deck.cards.filter(c => c.group === g)
            const ids = keys(cs)
            const m = mastery(p, ids)
            const d = ids.filter(id => isDue(p, id)).length
            const starred = ids.filter(id => p.stars[id]).length
            const on = settings.groups.includes(g)
            return (
              <li key={g} className="border-t first:border-t-0 border-gray-100 dark:border-gray-800">
                <div className="grid grid-cols-[auto_minmax(0,1fr)_4.5rem_2.5rem] sm:grid-cols-[auto_minmax(0,1fr)_8rem_4.5rem_2.5rem] items-center gap-3 py-1.5">
                  {/* The tick box picks the topic for study; its name opens the topic's cards to read. */}
                  <input type="checkbox" checked={on} onChange={() => toggleGroup(g)} aria-label={`Include ${g}`} className="w-4 h-4 accent-blue-600 cursor-pointer" />
                  <button
                    onClick={() => onTopic(g)}
                    title={`See the ${g} cards`}
                    className="group/topic -ml-1.5 justify-self-start max-w-full flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-left text-[15px] text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="truncate">{g}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">{cs.length}</span>
                    <span aria-hidden className="text-gray-400 group-hover/topic:text-blue-600 dark:group-hover/topic:text-blue-400 group-hover/topic:translate-x-0.5 transition-transform">›</span>
                  </button>
                  <span className="hidden sm:block"><MasteryBar pct={m} /></span>
                  <span className={`text-right text-[13px] tabular-nums ${d ? 'font-semibold text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                    {d ? `${d} due` : `${m}%`}
                  </span>
                  <span className="text-right text-xs text-amber-600 dark:text-amber-400 tabular-nums">{starred ? `★ ${starred}` : ''}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Options */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
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
        <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums">{pool.length} card{pool.length === 1 ? '' : 's'} selected</span>
      </div>

      {/* Start */}
      <div className="grid gap-3 md:grid-cols-[1.25fr_1fr_1fr]">
        <StartCard title="Memorise" body={
          due || fresh
            ? <><b className="text-gray-900 dark:text-white">{due} due</b> and {Math.min(fresh, NEW_PER_SESSION)} new. Rate each card; the ones you find hard come back sooner.</>
            : pool.length ? 'Nothing due. You can still study ahead.' : 'Pick some cards above.'
        }>
          <button onClick={() => onStart('study')} disabled={!pool.length} className={primaryBtn}>{due || fresh || !pool.length ? 'Start' : 'Study ahead'}</button>
          <button onClick={() => onStart('sheet')} disabled={!pool.length} className={secondaryBtn}>Cover sheet</button>
        </StartCard>
        <StartCard title="Test" body="Mixed question types, marked for you. Anything you get wrong comes back in Memorise.">
          <button onClick={() => onStart('test')} disabled={!pool.length} className={secondaryBtn}>Set up test</button>
        </StartCard>
        <StartCard title="Match" body={<>Pair 6 cards with their answers against the clock.{best !== undefined && <> Best: <b className="text-gray-900 dark:text-white tabular-nums">{(best / 1000).toFixed(1)} s</b></>}</>}>
          <button onClick={() => onStart('match')} disabled={pool.length < 2} className={secondaryBtn}>Play</button>
        </StartCard>
      </div>

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
  )
}

function SubjectTile({ subject, p, on, onClick }: { subject: Subject; p: Progress; on: boolean; onClick: () => void }) {
  const ids = subject.decks.flatMap(d => d.cards.map(c => cardKey(d, c)))
  const due = ids.filter(id => isDue(p, id)).length
  const fresh = ids.filter(id => isNew(p, id)).length
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`flex items-center gap-4 text-left rounded-xl border bg-white dark:bg-gray-900 px-4 py-3.5 transition-[border-color,box-shadow] ${
        on ? 'border-blue-600 dark:border-blue-500 ring-[3px] ring-blue-100 dark:ring-blue-950' : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
      }`}
    >
      <Ring pct={mastery(p, ids)} />
      <span>
        <span className="block font-display text-lg font-bold text-gray-900 dark:text-white">{subject.name}</span>
        <span className="text-[13px] text-gray-500 dark:text-gray-400">
          {subject.decks.length > 1 ? `${subject.decks.length} decks` : subject.decks[0].title} · {ids.length} cards ·{' '}
          {due ? <span className="font-semibold text-blue-700 dark:text-blue-300">{due} due</span> : `${fresh} new`}
        </span>
      </span>
    </button>
  )
}

function StartCard({ title, body, children }: { title: string; body: ReactNode; children: ReactNode }) {
  return (
    <div className="card p-4 flex flex-col gap-1.5">
      <h3 className="font-display text-base font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="flex-1 mb-2 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">{body}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
