import { useEffect, useRef, useState, type ReactNode } from 'react'
import Katex from '../../components/Katex'
import {
  cardKey, choicesFor, distractors, faceKey, gapTex, pickDir, promptFor, shuffle, typedMatches,
  type Card, type Deck, type Direction, type Face, type Prompt,
} from './data'
import { cardState, rate, restoreCard, touchStreak, type CardState } from './progress'
import { BackButton, FaceView, Kbd, bigSize, isLong, Progress, isPlainKey, primaryBtn, secondaryBtn, type QType, type Settings } from './parts'

// Test: set the length and the kinds of question, then a round marked as you go. A wrong answer
// sends the card back to Memorise as due now; "I was right" undoes that for a typed answer the
// marking didn't accept.

export const TYPES: Record<QType, { name: string; blurb: string }> = {
  mc: { name: 'Multiple choice', blurb: 'Pick from 4 answers' },
  tf: { name: 'True or false', blurb: 'Is this the right answer?' },
  write: { name: 'Written', blurb: 'Type the answer' },
  gap: { name: 'Fill the gap', blurb: 'Type the missing part' },
}

interface Question extends Prompt {
  type: QType
  choices?: Face[]
  /** True or false: the answer offered, and whether it's the right one. */
  offered?: Face
  truth?: boolean
}

interface Result {
  q: Question
  right: boolean
  /** What the student gave, ready to show. */
  given: ReactNode
  /** Multiple choice: the key of the choice picked. */
  picked?: string
  /** The card's schedule before a wrong answer reset it, for "I was right". */
  prev?: CardState
}

/** A gap's answer as printed: a real minus sign. */
const gapShown = (c: Card) => c.gap!.answers[0].replace(/-/g, '−')

const canWrite = (p: Prompt) => !!p.answer.plain
const canGap = (c: Card) => !!c.gap

function makeQuestions(deck: Deck, cards: Card[], dir: Direction, types: QType[]): Question[] {
  return cards.map(c => {
    const p = promptFor(c, pickDir(c, dir))
    let fits = types.filter(t => (t !== 'write' || canWrite(p)) && (t !== 'gap' || canGap(c)))
    if (!fits.length) fits = ['mc']
    const type = fits[Math.floor(Math.random() * fits.length)]
    if (type === 'mc') return { ...p, type, choices: choicesFor(p, deck) }
    if (type === 'tf') {
      const truth = Math.random() < 0.5
      return { ...p, type, truth, offered: truth ? p.answer : distractors(p, deck, 1)[0] ?? p.answer }
    }
    return { ...p, type }
  })
}

export default function Test({ deck, pool, settings, onSettings, onExit }: {
  deck: Deck
  pool: Card[]
  settings: Settings
  onSettings: (patch: Partial<Settings>) => void
  onExit: () => void
}) {
  const [round, setRound] = useState<{ qs: Question[]; retry: boolean } | null>(null)

  const start = (cards?: Card[]) => {
    const types = (Object.keys(TYPES) as QType[]).filter(t => settings.testTypes[t])
    const picked = cards ?? shuffle(pool).slice(0, Math.min(settings.testN, pool.length))
    setRound({ qs: makeQuestions(deck, picked, settings.dir, types), retry: !!cards })
  }

  if (!round) return <Setup deck={deck} pool={pool} settings={settings} onSettings={onSettings} onStart={() => start()} onExit={onExit} />
  return <Round key={round.qs.map(q => q.card.id).join() + round.retry} deck={deck} qs={round.qs} retry={round.retry} onRetest={cards => start(cards)} onNew={() => setRound(null)} onExit={onExit} />
}

function Setup({ deck, pool, settings, onSettings, onStart, onExit }: {
  deck: Deck
  pool: Card[]
  settings: Settings
  onSettings: (patch: Partial<Settings>) => void
  onStart: () => void
  onExit: () => void
}) {
  const n = Math.min(settings.testN, pool.length)
  const can: Record<QType, boolean> = {
    mc: true,
    tf: true,
    write: pool.some(c => (settings.dir !== 'rev' && c.back.plain) || (settings.dir !== 'fwd' && !c.oneWay && c.front.plain)),
    gap: pool.some(canGap),
  }
  const chosen = (Object.keys(TYPES) as QType[]).filter(t => settings.testTypes[t] && can[t])
  return (
    <div className="flex flex-col gap-4 max-w-xl">
      <div><BackButton onClick={onExit} /></div>
      <div className="card p-5 sm:p-6">
        <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">Set up your test</h2>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{deck.title} · {settings.groups.join(', ')}{settings.starredOnly ? ' · starred only' : ''}</p>

        <label className="block mt-5 text-sm text-gray-500 dark:text-gray-400">
          Questions: <b className="text-gray-900 dark:text-white tabular-nums">{n}</b> of {pool.length}
          <input
            type="range"
            min={1}
            max={pool.length}
            value={n}
            onChange={e => onSettings({ testN: Number(e.target.value) })}
            className="mt-2 block w-full accent-blue-600"
          />
        </label>

        <p className="mt-5 mb-2 text-sm text-gray-500 dark:text-gray-400">Question types</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {(Object.keys(TYPES) as QType[]).map(t => (
            <label key={t} className={`flex gap-2.5 items-start rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2.5 ${can[t] ? 'cursor-pointer' : 'opacity-50'}`}>
              <input
                type="checkbox"
                disabled={!can[t]}
                checked={settings.testTypes[t] && can[t]}
                onChange={e => onSettings({ testTypes: { ...settings.testTypes, [t]: e.target.checked } })}
                className="mt-1 w-4 h-4 accent-blue-600"
              />
              <span className="text-sm text-gray-900 dark:text-gray-100">
                {TYPES[t].name}
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  {can[t] ? TYPES[t].blurb : t === 'write' ? 'None of these answers can be typed' : 'No gap cards selected'}
                </span>
              </span>
            </label>
          ))}
        </div>
        <button onClick={onStart} disabled={!chosen.length} className={`${primaryBtn} mt-5 w-full py-2.5`}>Start test</button>
      </div>
    </div>
  )
}

function Round({ deck, qs, retry, onRetest, onNew, onExit }: {
  deck: Deck
  qs: Question[]
  retry: boolean
  onRetest: (cards: Card[]) => void
  onNew: () => void
  onExit: () => void
}) {
  const [i, setI] = useState(0)
  const [results, setResults] = useState<Result[]>([])
  const [typed, setTyped] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const q = qs[i]
  const answered = results.length > i ? results[i] : null
  const finished = i >= qs.length

  useEffect(() => { input.current?.focus() }, [i])

  const record = (right: boolean, given: ReactNode, picked?: string) => {
    const id = cardKey(deck, q.card)
    let prev: CardState | undefined
    if (right) touchStreak()
    else { prev = cardState(id); rate(id, 0) }
    setResults(r => [...r, { q, right, given, picked, prev }])
  }

  const answerChoice = (f: Face) => { if (!answered) record(faceKey(f) === faceKey(q.answer), <FaceView face={f} />, faceKey(f)) }
  const answerTF = (v: boolean) => { if (!answered) record(v === q.truth, v ? 'True' : 'False') }
  const answerTyped = () => {
    if (answered || !typed.trim()) return
    const right = q.type === 'gap'
      ? typedMatches(typed, q.card.gap!.answers, false)
      : typedMatches(typed, [q.answer.plain!], q.answer.tex !== undefined)
    record(right, typed.trim())
  }
  const override = () => {
    const r = results[i]
    restoreCard(cardKey(deck, r.q.card), r.prev)
    touchStreak()
    setResults(rs => rs.map((x, j) => (j === i ? { ...x, right: true } : x)))
  }
  const next = () => { setTyped(''); setI(n => n + 1) }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished || !isPlainKey(e)) return
      if (answered && e.key === 'Enter') { e.preventDefault(); next() }
      else if (!answered && q.type === 'mc' && /^[1-4]$/.test(e.key)) answerChoice(q.choices![Number(e.key) - 1])
      else if (!answered && q.type === 'tf' && /^[12tf]$/i.test(e.key)) answerTF(e.key === '1' || e.key.toLowerCase() === 't')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (finished) {
    const right = results.filter(r => r.right).length
    const wrong = results.filter(r => !r.right)
    const byType = (Object.keys(TYPES) as QType[])
      .map(t => { const rs = results.filter(r => r.q.type === t); return rs.length ? `${TYPES[t].name} ${rs.filter(r => r.right).length}/${rs.length}` : '' })
      .filter(Boolean).join(' · ')
    return (
      <div className="flex flex-col gap-4">
        <div><BackButton onClick={onExit} /></div>
        <div className="card p-6 sm:p-8 slide-up-in">
          <p className="text-sm text-gray-500 dark:text-gray-400">{retry ? 'Retest' : 'Test complete'}</p>
          <p className="mt-1 font-display text-5xl font-bold text-gray-900 dark:text-white tabular-nums">{Math.round((100 * right) / results.length)}%</p>
          <p className="mt-1 text-gray-500 dark:text-gray-400">{right} of {results.length} right</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{byType}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {wrong.length > 0 && <button onClick={() => onRetest(wrong.map(r => r.q.card))} className={primaryBtn}>Retest the {wrong.length} wrong</button>}
            <button onClick={onNew} className={wrong.length ? secondaryBtn : primaryBtn}>New test</button>
          </div>
          {wrong.length > 0 ? (
            <>
              <p className="mt-7 text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400">To Go Over <span className="font-normal normal-case tracking-normal">· now due in Memorise</span></p>
              <ul className="mt-2 divide-y divide-gray-100 dark:divide-gray-800">
                {wrong.map(r => (
                  <li key={r.q.card.id} className="py-2.5 grid sm:grid-cols-2 gap-x-4 gap-y-1 items-baseline">
                    <span className="text-gray-900 dark:text-gray-100">
                      {r.q.type === 'gap' ? <Katex tex={gapTex(r.q.card.gap!.tex)} /> : <FaceView face={r.q.show} />}
                      {r.q.type !== 'gap' && r.q.dir === 'fwd' && r.q.card.ask && <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{r.q.card.ask}</span>}
                    </span>
                    <span className="flex flex-wrap items-baseline gap-x-3">
                      <b className="font-semibold text-emerald-700 dark:text-emerald-400">{r.q.type === 'gap' ? gapShown(r.q.card) : r.q.type === 'tf' ? (r.q.truth ? 'True' : 'False') : <FaceView face={r.q.answer} />}</b>
                      <span className="text-sm text-rose-600 dark:text-rose-400 line-through decoration-rose-400/60">{r.given}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : <p className="mt-6 text-gray-500 dark:text-gray-400">Full marks. Nothing to go over.</p>}
        </div>
      </div>
    )
  }

  const score = results.filter(r => r.right).length
  const typedType = q.type === 'write' || q.type === 'gap'
  return (
    <div className="flex flex-col gap-4 max-w-xl">
      <div className="flex items-center justify-between gap-3">
        <BackButton onClick={onExit} label="Quit" />
        <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums">{score} right</span>
      </div>
      <Progress done={i} total={qs.length} label={`${i + 1} of ${qs.length}`} />

      <div key={i} className="slide-up-in card px-5 py-7 flex flex-col items-center text-center">
        <span className="text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400">{TYPES[q.type].name}</span>
        {q.type === 'gap' ? (
          <Katex tex={gapTex(q.card.gap!.tex, answered ? q.card.gap!.answers[0] : undefined)} className="mt-4 text-2xl sm:text-3xl text-gray-900 dark:text-white" />
        ) : (
          <>
            <span className="mt-3 text-sm text-gray-500 dark:text-gray-400">{deck.promptLabel[q.dir]}</span>
            <FaceView face={q.show} className={`mt-1 ${bigSize(q.show)} text-gray-900 dark:text-white`} />
            {q.dir === 'fwd' && q.card.ask && <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">{q.card.ask}</span>}
            {q.type === 'tf' && (
              <span className="mt-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 px-4 py-2 text-xl leading-snug text-blue-800 dark:text-blue-200">
                <span className="sr-only">Answer offered: </span><FaceView face={q.offered!} />
              </span>
            )}
          </>
        )}
        {q.type === 'gap' && q.card.gap!.answers.some(a => a === '+' || a === '-') && !answered && (
          <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">+ or −</span>
        )}
      </div>

      {q.type === 'mc' && (
        <div className={`grid gap-2.5 ${q.choices!.some(isLong) ? 'grid-cols-1' : q.choices!.some(c => c.text) ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'}`}>
          {q.choices!.map((c, n) => (
            <Option key={faceKey(c)} n={n} long={q.choices!.some(isLong)} state={!answered ? 'open' : faceKey(c) === faceKey(q.answer) ? 'right' : faceKey(c) === answered.picked ? 'wrong' : 'dim'} onClick={() => answerChoice(c)}>
              <FaceView face={c} />
            </Option>
          ))}
        </div>
      )}
      {q.type === 'tf' && (
        <div className="grid grid-cols-2 gap-2.5">
          {[true, false].map((v, n) => (
            <Option key={String(v)} n={n} state={!answered ? 'open' : v === q.truth ? 'right' : !answered.right ? 'wrong' : 'dim'} onClick={() => answerTF(v)}>
              {v ? 'True' : 'False'}
            </Option>
          ))}
        </div>
      )}
      {typedType && (
        <form onSubmit={e => { e.preventDefault(); answerTyped() }} className="flex gap-2">
          <input
            ref={input}
            value={typed}
            onChange={e => setTyped(e.target.value)}
            disabled={!!answered}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Your answer"
            placeholder={q.type === 'gap' ? 'The missing part' : q.answer.tex ? 'e.g. SO4 2-' : 'Type the name'}
            className="flex-1 min-w-0 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button disabled={!!answered || !typed.trim()} className={primaryBtn}>Check</button>
        </form>
      )}

      {answered ? (
        <div aria-live="polite" className={`flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm ${answered.right ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'}`}>
          <span>
            {answered.right ? 'Correct' : <>Answer: <b className="font-semibold">{q.type === 'gap' ? gapShown(q.card) : q.type === 'tf' ? (q.truth ? 'True' : 'False') : <FaceView face={q.answer} />}</b>{q.type === 'tf' && !q.truth && <> — it’s <FaceView face={q.answer} /></>}</>}
          </span>
          <span className="flex gap-2">
            {!answered.right && typedType && <button onClick={override} className={`${secondaryBtn} bg-white dark:bg-gray-900`}>I was right</button>}
            <button onClick={next} autoFocus={!typedType} className={primaryBtn}>{i === qs.length - 1 ? 'See results' : 'Next'}<Kbd>Enter</Kbd></button>
          </span>
        </div>
      ) : q.type === 'mc' || q.type === 'tf' ? (
        <p className="text-xs text-gray-500 dark:text-gray-400">Pick one.<Kbd>{q.type === 'mc' ? '1–4' : '1–2'}</Kbd></p>
      ) : null}
    </div>
  )
}

function Option({ n, state, long, onClick, children }: { n: number; state: 'open' | 'right' | 'wrong' | 'dim'; long?: boolean; onClick: () => void; children: ReactNode }) {
  const look = {
    open: 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 active:scale-[0.97]',
    right: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300',
    wrong: 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300',
    dim: 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 opacity-30',
  }[state]
  return (
    <button onClick={onClick} disabled={state !== 'open'} className={`relative rounded-xl border flex items-center transition-all duration-150 ${long ? 'pl-8 pr-4 py-3 text-[15px] leading-snug text-left justify-start min-h-[56px] min-w-0 overflow-x-auto' : 'px-3 py-3 text-lg justify-center min-h-[64px] sm:min-h-[76px]'} ${look}`}>
      <span className="absolute left-2.5 top-2 text-[10px] font-mono text-gray-400 hidden [@media(pointer:fine)]:inline" aria-hidden>{n + 1}</span>
      {children}
    </button>
  )
}
