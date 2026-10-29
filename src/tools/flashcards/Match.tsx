import { useEffect, useState } from 'react'
import { shuffle, type Card, type Face } from './data'
import { saveBest, useProgress } from './progress'
import { BackButton, FaceView, isLong, primaryBtn } from './parts'

// Match: six cards' fronts and backs scattered on a grid. Tap one, then its partner; a wrong
// pair adds a second to the clock. The best time is kept for each subject.

const PAIRS = 6
const PENALTY = 1000

interface Tile {
  card: string
  face: Face
}

function deal(pool: Card[]): Tile[] {
  return shuffle(shuffle(pool).slice(0, PAIRS).flatMap(c => [{ card: c.id, face: c.front }, { card: c.id, face: c.back }]))
}

export default function Match({ pool, subjectId, onExit }: { pool: Card[]; subjectId: string; onExit: () => void }) {
  const p = useProgress()
  const [game, setGame] = useState(() => ({ tiles: deal(pool), start: Date.now() }))
  const [picked, setPicked] = useState<number | null>(null)
  const [gone, setGone] = useState<Set<string>>(new Set())
  const [shake, setShake] = useState<number[]>([])
  const [penalty, setPenalty] = useState(0)
  const [end, setEnd] = useState<{ ms: number; record: boolean; previous?: number } | null>(null)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    if (end) return
    const id = setInterval(() => setNow(Date.now()), 100)
    return () => clearInterval(id)
  }, [end])

  const pairs = game.tiles.length / 2
  const restart = () => {
    setGame({ tiles: deal(pool), start: Date.now() })
    setPicked(null); setGone(new Set()); setShake([]); setPenalty(0); setEnd(null)
  }

  const tap = (i: number) => {
    const t = game.tiles[i]
    if (gone.has(t.card) || end) return
    if (picked === null || picked === i) { setPicked(picked === i ? null : i); setShake([]); return }
    const other = game.tiles[picked]
    if (other.card === t.card) {
      const next = new Set(gone).add(t.card)
      setGone(next)
      setPicked(null)
      if (next.size === pairs) {
        const ms = Date.now() - game.start + penalty
        const previous = p.best[subjectId]
        setEnd({ ms, record: saveBest(subjectId, ms) && previous !== undefined, previous })
      }
    } else {
      setShake([picked, i])
      setPenalty(x => x + PENALTY)
      setPicked(null)
      setTimeout(() => setShake([]), 400)
    }
  }

  if (end) {
    const best = p.best[subjectId]
    return (
      <div className="flex flex-col gap-4">
        <div><BackButton onClick={onExit} /></div>
        <div className="card px-5 py-10 text-center slide-up-in">
          <p className="font-display text-5xl font-bold text-gray-900 dark:text-white tabular-nums">{(end.ms / 1000).toFixed(1)} s</p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {end.record ? <b className="text-emerald-700 dark:text-emerald-400">New best!</b> : best !== undefined && <>Best: {(best / 1000).toFixed(1)} s</>}
            {penalty > 0 && <> · includes {penalty / 1000} s of penalties</>}
          </p>
          <button onClick={restart} className={`${primaryBtn} mt-5`}>Play again</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BackButton onClick={onExit} label="Quit" />
        <span className="text-sm text-gray-500 dark:text-gray-400">Tap a card, then its partner. A wrong pair adds 1 s.</span>
        <b className="font-mono text-lg text-gray-900 dark:text-white tabular-nums" aria-label="Time">{((now - game.start + penalty) / 1000).toFixed(1)}</b>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
        {game.tiles.map((t, i) => {
          const isGone = gone.has(t.card)
          return (
            <button
              key={i}
              onClick={() => tap(i)}
              disabled={isGone}
              aria-pressed={picked === i}
              className={`min-h-[84px] rounded-xl border px-2 py-2.5 ${isLong(t.face) ? 'text-xs sm:text-[13px] leading-snug' : 'text-[15px] sm:text-base'} flex items-center justify-center text-center transition-[opacity,transform,background-color,border-color] duration-200 ${
                isGone ? 'opacity-0 scale-90 pointer-events-none'
                : shake.includes(i) ? 'fc-shake border-rose-400 bg-rose-50 dark:bg-rose-950/40'
                : picked === i ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-500'
              } text-gray-900 dark:text-gray-100`}
            >
              <FaceView face={t.face} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
