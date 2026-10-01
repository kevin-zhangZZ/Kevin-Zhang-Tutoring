// Is It a Net?: six squares (one of the cube's 11 nets or one of 5 near misses, in random order and
// turned or flipped at random). Predict Yes or No, then watch it fold: overlapping squares are
// hatched, open faces dashed, and the result is explained in words. Score and streak carry on while
// the page is open (also across the Explore tab).
import { useEffect, useRef, useState } from 'react'
import { IS_IT_A_NET, GRID_SYMMETRIES, makeChallenge, challengeFeedback, type Challenge } from '../lib/nets.ts'
import ChallengeView, { type ChallengeHandle } from './ChallengeView'
import PatternView from './PatternView'
import { tokensFor, useDark, useMedia, FOCUS, PILL_OFF } from './common'

const CARD = 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl'
const FOLD_MS = 3000
const N = IS_IT_A_NET.length

type Answer = 'yes' | 'no' | null
interface Round { ch: Challenge; no: number; answered: Answer; revealed: boolean }

/* ── the deck: all 16 patterns, shuffled; reshuffled when used up (never the same one twice running) ── */
function shuffle(prevLast: number): number[] {
  const d = IS_IT_A_NET.map((_, i) => i)
  for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [d[i], d[j]] = [d[j], d[i]] }
  if (d[0] === prevLast && d.length > 1) [d[0], d[1]] = [d[1], d[0]]
  return d
}
const memo: { deck: number[]; pos: number; round: Round | null; score: number; total: number; streak: number; best: number } = {
  deck: [], pos: 0, round: null, score: 0, total: 0, streak: 0, best: 0,
}
function drawRound(): Round {
  if (memo.pos >= memo.deck.length) {
    memo.deck = shuffle(memo.deck.length ? memo.deck[memo.deck.length - 1] : -1)
    memo.pos = 0
  }
  const pattern = IS_IT_A_NET[memo.deck[memo.pos]]
  memo.pos++
  const r: Round = { ch: makeChallenge(pattern, Math.floor(Math.random() * GRID_SYMMETRIES.length)), no: memo.pos, answered: null, revealed: false }
  memo.round = r
  return r
}

export default function IsItANet() {
  const dark = useDark()
  const T = tokensFor(dark)
  const fine = useMedia('(hover: hover) and (pointer: fine)')
  const reduced = useMedia('(prefers-reduced-motion: reduce)')

  // Come back to an unanswered pattern after a trip to Explore; otherwise deal a new one.
  const [round, setRound] = useState<Round>(() => (memo.round && !memo.round.answered ? memo.round : drawRound()))
  const [score, setScore] = useState({ score: memo.score, total: memo.total, streak: memo.streak, best: memo.best })
  const [foldT, setFoldT] = useState(0)
  const [playing, setPlaying] = useState(false)
  const foldRef = useRef(foldT)
  foldRef.current = foldT
  const viewRef = useRef<ChallengeHandle>(null)
  const yesRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const focusYes = useRef(false)

  useEffect(() => { memo.round = round }, [round])
  useEffect(() => { Object.assign(memo, score) }, [score])

  /* ── folding: ≈3 s, or two steps under reduced motion ── */
  useEffect(() => {
    if (!playing) return
    const finish = () => {
      setPlaying(false)
      setRound(r => (r.revealed ? r : { ...r, revealed: true }))
    }
    if (reduced) {
      const ids: number[] = []
      if (foldRef.current < 0.5) {
        setFoldT(0.5)
        ids.push(window.setTimeout(() => { setFoldT(1); ids.push(window.setTimeout(finish, 700)) }, 700))
      } else { setFoldT(1); ids.push(window.setTimeout(finish, 700)) }
      return () => ids.forEach(id => window.clearTimeout(id))
    }
    let raf = 0, t0: number | null = null
    const start = foldRef.current
    const step = (now: number) => {
      if (t0 === null) t0 = now
      const t = Math.min(1, start + (now - t0) / FOLD_MS)
      setFoldT(t)
      if (t >= 1) finish()
      else raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [playing, reduced])

  // However it got there (Play, or the slider dragged to 100%), reaching closed reveals the answer.
  useEffect(() => {
    if (round.answered && !round.revealed && foldT >= 1 && !playing) setRound(r => (r.revealed ? r : { ...r, revealed: true }))
  }, [foldT, playing, round.answered, round.revealed])

  // Once revealed, turn the cube so its open face (if any) is in view.
  useEffect(() => {
    if (!round.revealed) return
    const id = window.setTimeout(() => viewRef.current?.showGap(), 50)
    return () => window.clearTimeout(id)
  }, [round.revealed, round.ch])

  useEffect(() => {
    if (focusYes.current) { focusYes.current = false; yesRef.current?.focus() }
  }, [round])

  const answer = (yes: boolean) => {
    if (round.answered) return
    const fb = challengeFeedback(round.ch, yes)
    setScore(s => {
      const streak = fb.correct ? s.streak + 1 : 0
      return { score: s.score + (fb.correct ? 1 : 0), total: s.total + 1, streak, best: Math.max(s.best, streak) }
    })
    setRound(r => ({ ...r, answered: yes ? 'yes' : 'no' }))
    setFoldT(0)
    foldRef.current = 0
    setPlaying(true)
    // The Yes / No buttons lock, so keyboard focus moves on to Next Pattern.
    window.setTimeout(() => nextRef.current?.focus({ preventScroll: true }), 0)
  }
  const next = () => {
    setPlaying(false)
    setFoldT(0)
    foldRef.current = 0
    focusYes.current = true
    setRound(drawRound())
  }
  const foldAgain = () => {
    setFoldT(0)
    foldRef.current = 0
    setPlaying(false)
    window.setTimeout(() => setPlaying(true), 0)
  }
  const onPlay = () => {
    if (!round.answered) return
    if (playing) { setPlaying(false); return }
    if (foldRef.current >= 1) { setFoldT(0); foldRef.current = 0 }
    setPlaying(true)
  }

  const locked = !round.answered
  const pct = Math.round(foldT * 100)
  const fb = round.answered ? challengeFeedback(round.ch, round.answered === 'yes') : null
  // Non-nets: the pattern's own reason; nets: the family tip.
  const why = fb ? (!round.ch.isNet && round.ch.failReason ? round.ch.failReason : fb.tip) : ''

  const answerBtn = (yes: boolean, label: string) => {
    const chosen = round.answered === (yes ? 'yes' : 'no')
    return (
      <button
        ref={yes ? yesRef : undefined} type="button" aria-pressed={chosen} disabled={!!round.answered} onClick={() => answer(yes)}
        className={'flex-1 h-11 rounded-lg font-semibold text-[13.5px] transition-colors ' + FOCUS + ' ' + (chosen
          ? 'border-2 border-gray-900 bg-white text-gray-900 dark:border-gray-100 dark:bg-gray-900 dark:text-white'
          : 'border bg-white border-gray-300 text-gray-800 hover:border-gray-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:hover:border-gray-500 disabled:hover:border-gray-300 dark:disabled:hover:border-gray-700') +
          (round.answered && !chosen ? ' opacity-60' : '')}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="grid gap-3 lg:gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      <section className={'p-3 sm:p-4 min-w-0 ' + CARD} aria-labelledby="nets-ch-fold-title">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 id="nets-ch-fold-title" className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">Fold It Up</h3>
          <button type="button" onClick={() => viewRef.current?.resetView()}
            className={'inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-3 py-1.5 min-h-11 sm:min-h-0 rounded-full border ' + PILL_OFF + ' ' + FOCUS}>
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 1 0 1.8-4.1" /><path d="M2.3 1.8v2.6h2.6" /></svg>
            Reset View
          </button>
        </div>
        <ChallengeView ref={viewRef} ch={round.ch} t={foldT} revealed={round.revealed} T={T} fine={fine} />
        <div className="mt-3 flex items-center gap-2.5 sm:gap-3">
          <button type="button" onClick={onPlay} disabled={locked} aria-label={playing ? 'Pause' : 'Play'}
            className={'inline-flex items-center justify-center gap-1.5 text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 min-h-11 sm:min-h-0 min-w-[4.75rem] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 dark:disabled:hover:bg-white ' + FOCUS}>
            {playing
              ? <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true"><rect x="2" y="1.5" width="3" height="9" rx="0.6" fill="currentColor" /><rect x="7" y="1.5" width="3" height="9" rx="0.6" fill="currentColor" /></svg>
              : <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg>}
            {playing ? 'Pause' : 'Play'}
          </button>
          <label htmlFor="nets-ch-fold" className={'text-[13px] text-gray-700 dark:text-gray-300' + (locked ? ' opacity-50' : '')}>Fold</label>
          <input
            id="nets-ch-fold" type="range" min={0} max={100} step={1} value={pct} disabled={locked}
            aria-valuetext={pct + '% folded'} aria-describedby={locked ? 'nets-ch-lock' : undefined}
            onPointerDown={() => setPlaying(false)}
            onChange={e => { setPlaying(false); setFoldT(+e.target.value / 100) }}
            className={'flex-1 min-w-0 h-11 sm:h-6 rounded accent-emerald-600 dark:accent-emerald-400 ' + (locked ? 'opacity-50 cursor-not-allowed ' : 'cursor-pointer ') + FOCUS}
          />
          <span className="w-11 sm:w-28 lg:w-11 xl:w-28 text-right text-[13px] font-display font-semibold tabular-nums text-gray-800 dark:text-gray-100 whitespace-nowrap">
            {pct}%<span className="hidden sm:inline lg:hidden xl:inline"> · {pct === 0 ? 'Flat' : pct === 100 ? 'Closed' : 'Folding'}</span>
          </span>
        </div>
      </section>

      <section className={'p-4 min-w-0 ' + CARD} aria-labelledby="nets-ch-title">
        <div className="flex items-baseline justify-between gap-2">
          <h3 id="nets-ch-title" className="text-[13px] font-semibold text-gray-900 dark:text-gray-100">Is It a Net?</h3>
          <span className="text-[12px] text-gray-500 dark:text-gray-400 tabular-nums">Pattern {round.no} of {N}</span>
        </div>
        <p className="mt-1 text-[13.5px] text-gray-700 dark:text-gray-300">Will these six squares fold up into a cube?</p>
        <div className="mt-3 rounded-lg p-2" style={{ background: 'var(--nets-stage)', border: '1px solid var(--nets-stage-border)' }}>
          <PatternView key={round.ch.pattern.id + '|' + round.ch.sym + '|' + round.no} ch={round.ch} revealed={round.revealed} dark={dark} />
        </div>
        <div className="mt-3 flex gap-2">
          {answerBtn(true, 'Yes, It’s a Net')}
          {answerBtn(false, 'No, It Isn’t')}
        </div>
        <p className="mt-2 text-[13px] text-gray-600 dark:text-gray-400 tabular-nums">
          Score {score.score} of {score.total} · Streak {score.streak}{score.best >= 2 ? <span className="text-gray-500 dark:text-gray-500"> · Best {score.best}</span> : null}
        </p>
        {!round.answered && (
          <p id="nets-ch-lock" className="mt-2 text-[12.5px] text-gray-500 dark:text-gray-400">Turn the pattern round if it helps. The Fold slider unlocks once you answer.</p>
        )}
        <div role="status" aria-live="polite">
          {fb && (
            <div className={'mt-3 rounded-lg border px-3.5 py-2.5 text-[13px] leading-relaxed ' + (fb.correct
              ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100'
              : 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100')}>
              {fb.message}
              {why && <span className="block mt-1.5 opacity-90">{why}</span>}
            </div>
          )}
        </div>
        {round.answered && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button ref={nextRef} type="button" onClick={next}
              className={'inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 min-h-11 sm:min-h-0 ' + FOCUS}>
              Next Pattern
            </button>
            <button type="button" onClick={foldAgain}
              className={'text-[12.5px] font-semibold px-3 py-1.5 min-h-11 sm:min-h-0 rounded-full border ' + PILL_OFF + ' ' + FOCUS}>
              Fold Again
            </button>
          </div>
        )}
        {!round.ch.isNet && round.revealed && (
          <p className="mt-3 flex items-center gap-3 text-[12px] text-gray-600 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <svg width="16" height="16" aria-hidden="true"><defs><pattern id="nets-ch-key" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="#f59e0b" strokeWidth="2" strokeOpacity=".5" /></pattern></defs><rect x="1" y="1" width="14" height="14" rx="2" fill="url(#nets-ch-key)" stroke={dark ? '#fbbf24' : '#d97706'} strokeWidth="1.5" /></svg>
              Overlap
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="16" height="16" aria-hidden="true"><rect x="1" y="1" width="14" height="14" rx="2" fill="#f59e0b" fillOpacity=".1" stroke={dark ? '#fbbf24' : '#d97706'} strokeWidth="1.5" strokeDasharray="3 2" /></svg>
              Gap (open face)
            </span>
          </p>
        )}
      </section>
    </div>
  )
}
