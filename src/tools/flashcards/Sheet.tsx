import { useState } from 'react'
import { cardKey, shuffle, type Card, type Deck, type Direction } from './data'
import { useProgress } from './progress'
import { BackButton, FaceView, StarButton, secondaryBtn } from './parts'

// Cover sheet: every selected card as a list with its answer blurred, like covering the right
// column of a page with your hand. Tap an answer to peek; star the ones you're unsure of.

export default function Sheet({ deck, pool, dir, onExit, open = false }: {
  deck: Deck
  pool: Card[]
  dir: Direction
  onExit: () => void
  /** Start with every answer showing (opening a topic from the decks page to read it). */
  open?: boolean
}) {
  const p = useProgress()
  const [shuffled, setShuffled] = useState<Card[] | null>(null)
  const [all, setAll] = useState(open)
  const [peeked, setPeeked] = useState<Set<string>>(new Set())
  // Mixed has no single way round for a list; it reads front first.
  const rev = dir === 'rev'

  const peek = (id: string) => setPeeked(s => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n })

  const row = (c: Card) => {
    const id = cardKey(deck, c)
    const open = all || peeked.has(id)
    const flip = rev && !c.oneWay
    return (
      <li key={c.id} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-3 px-4 py-2 border-t first:border-t-0 border-gray-100 dark:border-gray-800">
        <span className="text-gray-900 dark:text-gray-100 min-w-0">
          <FaceView face={flip ? c.back : c.front} />
          {!flip && c.ask && <span className="block text-xs text-gray-500 dark:text-gray-400">{c.ask}</span>}
        </span>
        <button
          onClick={() => peek(id)}
          aria-label={open ? undefined : 'Show this answer'}
          aria-expanded={open}
          className="min-w-0 min-h-[40px] rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 text-left text-gray-900 dark:text-gray-100 overflow-hidden"
        >
          <span className={`block transition-[filter] duration-200 ${open ? '' : 'fc-hidden'}`} aria-hidden={!open}>
            <FaceView face={flip ? c.front : c.back} />
          </span>
        </button>
        <StarButton id={id} on={!!p.stars[id]} />
      </li>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BackButton onClick={onExit} />
        <div className="flex gap-2">
          <button onClick={() => { setAll(a => !a); setPeeked(new Set()) }} className={secondaryBtn}>{all ? 'Hide answers' : 'Show all'}</button>
          <button onClick={() => setShuffled(s => (s ? null : shuffle(pool)))} className={secondaryBtn}>{shuffled ? 'In order' : 'Shuffle'}</button>
        </div>
      </div>

      {shuffled ? (
        <ul className="card overflow-hidden">{shuffled.map(row)}</ul>
      ) : (
        deck.groups.filter(g => pool.some(c => c.group === g)).map(g => {
          const inGroup = pool.filter(c => c.group === g)
          const sections = [...new Set(inGroup.map(c => c.section))]
          return (
            <section key={g} className="card overflow-hidden">
              <h2 className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-200">{g}</h2>
              {sections.map(sec => (
                <div key={sec ?? ''}>
                  {sec && <h3 className="px-4 pt-3 pb-1 text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400">{sec}</h3>}
                  <ul>{inGroup.filter(c => c.section === sec).map(row)}</ul>
                </div>
              ))}
            </section>
          )
        })
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Tap a blurred answer to peek. Star the ones you’re unsure of, then turn on “Starred only” on the decks page.</p>
    </div>
  )
}
