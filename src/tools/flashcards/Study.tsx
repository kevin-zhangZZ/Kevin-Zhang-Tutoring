import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { cardKey, pickDir, promptFor, shuffle, type Card, type Deck, type Direction, type Prompt } from './data'
import { DAY, formatInterval, isDue, isNew, mastery, nextIntervals, rate, startOfDay, toggleStar, useProgress, type Rating } from './progress'
import { NEW_PER_SESSION } from './Home'
import { BackButton, FaceView, bigSize, midSize, Kbd, Progress, StarButton, isPlainKey, primaryBtn, secondaryBtn } from './parts'

// Memorise: flip a card, then rate it. Again brings it back in a few cards; Hard, Good and Easy
// send it away for longer each time, so the cards a student knows stop taking their time.

/** How many cards later an "Again" card comes back. */
const AGAIN_GAP = 3

const RATINGS: Array<{ label: string; tone: string }> = [
  { label: 'Again', tone: 'text-rose-600 dark:text-rose-400' },
  { label: 'Hard', tone: 'text-amber-600 dark:text-amber-400' },
  { label: 'Good', tone: 'text-emerald-700 dark:text-emerald-400' },
  { label: 'Easy', tone: 'text-blue-700 dark:text-blue-300' },
]

export default function Study({ deck, pool, dir, onExit, onTest }: {
  deck: Deck
  pool: Card[]
  dir: Direction
  onExit: () => void
  onTest: () => void
}) {
  const p = useProgress()
  const key = (c: Card) => cardKey(deck, c)

  // The session's pile, dealt once: due cards (most overdue first), then some new ones. With
  // none of either, every selected card in a random order ("study ahead").
  const [start] = useState(() => {
    const due = pool.filter(c => isDue(p, key(c))).sort((a, b) => p.cards[key(a)].due - p.cards[key(b)].due)
    const fresh = shuffle(pool.filter(c => isNew(p, key(c)))).slice(0, NEW_PER_SESSION)
    const ahead = !due.length && !fresh.length
    const cards = ahead ? shuffle(pool) : [...due, ...fresh]
    return { pile: cards.map(c => promptFor(c, pickDir(c, dir))), ahead, before: mastery(p, pool.map(key)) }
  })
  const [pile, setPile] = useState<Prompt[]>(start.pile)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(0)
  const [agains, setAgains] = useState(0)
  const [turn, setTurn] = useState(0)

  const current = pile[0]
  const id = current && key(current.card)
  const ivls = current ? nextIntervals(p, id) : null

  const grade = (g: Rating) => {
    rate(id, g)
    const [first, ...rest] = pile
    if (g === 0) {
      setAgains(n => n + 1)
      // Back in a few cards, asked the other way round when it can be.
      setPile([...rest.slice(0, AGAIN_GAP), promptFor(first.card, pickDir(first.card, dir)), ...rest.slice(AGAIN_GAP)])
    } else {
      setDone(n => n + 1)
      setPile(rest)
    }
    setFlipped(false)
    setTurn(t => t + 1)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!current || !isPlainKey(e)) return
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped(true) }
      else if (flipped && '1234'.includes(e.key) && e.key.length === 1) grade((Number(e.key) - 1) as Rating)
      else if (e.key === 's' || e.key === 'S') toggleStar(id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!current) {
    const after = mastery(p, pool.map(key))
    const tomorrow = pool.filter(c => { const s = p.cards[key(c)]; return s && s.due < startOfDay(Date.now()) + 2 * DAY }).length
    return (
      <div className="flex flex-col gap-4">
        <div><BackButton onClick={onExit} /></div>
        <div className="card px-5 py-10 text-center slide-up-in">
          <p className="font-display text-4xl font-bold text-gray-900 dark:text-white">Done</p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {done} card{done === 1 ? '' : 's'} reviewed · {agains} “Again” · mastery {start.before}% → <b className="text-emerald-700 dark:text-emerald-400">{after}%</b>
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {tomorrow ? `${tomorrow} card${tomorrow === 1 ? '' : 's'} due by tomorrow. Come back then to keep your streak.` : 'Nothing due tomorrow.'}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button onClick={onTest} className={primaryBtn}>Test yourself</button>
            <button onClick={onExit} className={secondaryBtn}>Back to decks</button>
          </div>
        </div>
      </div>
    )
  }

  const isFresh = isNew(p, id)
  return (
    <div className="flex flex-col gap-4 max-w-xl md:max-w-[44rem] mx-auto">
      <div className="flex items-center justify-between gap-3">
        <BackButton onClick={onExit} />
        <span className="text-sm text-gray-500 dark:text-gray-400">{start.ahead ? 'Studying ahead · ' : ''}{done} done</span>
      </div>
      <Progress done={done} total={done + pile.length} label={`${pile.length} left`} />

      {/* From tablet width the ratings stand in a column beside the card. The column is kept
          (empty) before the flip, so the card doesn't change width when they arrive. */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-[1fr_8rem] md:gap-3">
        <div className="relative">
          <span className="absolute right-2.5 top-2.5 z-10"><StarButton id={id} on={!!p.stars[id]} /></span>
          <div
            key={turn}
            role={flipped ? undefined : 'button'}
            tabIndex={flipped ? -1 : 0}
            aria-label={flipped ? undefined : 'Show the answer'}
            onClick={() => setFlipped(true)}
            className={`fc-scene slide-up-in ${flipped ? '' : 'cursor-pointer'} rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
          >
            <div className={`fc-card ${flipped ? 'fc-flipped' : ''}`}>
              <CardFace label={current.card.group} badge={isFresh ? 'New' : undefined}>
                <span className="text-sm text-gray-500 dark:text-gray-400">{deck.promptLabel[current.dir]}</span>
                <FaceView face={current.show} className={`mt-1 ${bigSize(current.show)} text-gray-900 dark:text-white`} />
                {current.dir === 'fwd' && current.card.ask && <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">{current.card.ask}</span>}
              </CardFace>
              {/* The back keeps the question in view: a band across the top asks it again, in full ink,
                  with the answer below the hairline. */}
              <div className={`fc-face fc-back ${faceShell} overflow-hidden bg-gray-50 dark:bg-gray-950 flex flex-col`}>
                <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-5 pt-3.5 pb-4 text-center">
                  <div className="text-left text-xs font-semibold text-gray-400 dark:text-gray-500">{current.card.group}</div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">{deck.promptLabel[current.dir]}</div>
                  <FaceView face={current.show} className={`${midSize(current.show)} text-gray-900 dark:text-white`} />
                  {current.dir === 'fwd' && current.card.ask && <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{current.card.ask}</div>}
                </div>
                <div className="relative flex-1 px-5 pt-10 pb-8 flex flex-col items-center justify-center text-center">
                  <span className="absolute left-4 top-3.5 text-xs font-semibold text-gray-400 dark:text-gray-500">{current.dir === 'fwd' ? 'Answer' : 'It’s'}</span>
                  <FaceView face={current.answer} className={`${bigSize(current.answer)} text-emerald-700 dark:text-emerald-400`} />
                  {current.dir === 'rev' && current.card.ask && <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">{current.card.ask}</span>}
                  {current.card.tip && <p className="mt-4 max-w-[40ch] text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">{current.card.tip}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {flipped ? (
          <div className="grid grid-cols-4 gap-2 md:grid-cols-1 md:grid-rows-4" role="group" aria-label="How well did you know it?">
            {RATINGS.map(({ label, tone }, g) => (
              <button
                key={label}
                onClick={() => grade(g as Rating)}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-2.5 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.97] transition-[background-color,transform] ${tone}`}
              >
                <span>{label}<Kbd>{String(g + 1)}</Kbd></span>
                <span className="text-[11.5px] font-medium text-gray-500 dark:text-gray-400">{ivls && formatInterval(ivls[g])}</span>
              </button>
            ))}
          </div>
        ) : <div className="hidden md:block" aria-hidden />}
      </div>
    </div>
  )
}

const faceShell = 'relative rounded-2xl border border-gray-200 dark:border-gray-800 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] min-h-[280px] sm:min-h-[300px]'

function CardFace({ label, badge, children }: { label: string; badge?: string; children: ReactNode }) {
  return (
    <div className={`fc-face ${faceShell} bg-white dark:bg-gray-900 px-5 pt-10 pb-10 flex flex-col items-center justify-center text-center`}>
      <span className="absolute left-4 top-3.5 text-xs font-semibold text-gray-400 dark:text-gray-500">{label}</span>
      {badge && <span className="absolute left-1/2 -translate-x-1/2 top-3.5 rounded-full bg-blue-50 dark:bg-blue-950 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300">{badge}</span>}
      {children}
    </div>
  )
}
