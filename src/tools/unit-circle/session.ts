import { useCallback, useEffect, useReducer, useRef } from 'react'

// One run of Values Test or Locate Test, in either mode:
//   practice — endless, with a per-angle tally for the weak-spot circle; tapping a point there
//              narrows the questions to that one angle ("drill")
//   test     — a round of ROUND_LENGTH questions, then a results screen. "Practise these" starts
//              a short round of just the questions missed.
// The clock starts on the first answer and pauses while a wrong answer's feedback is showing.

export type SessionMode = 'practice' | 'test'
export const ROUND_LENGTH = 20

export interface Tally {
  right: number
  wrong: number
}

export interface Miss<Q> {
  question: Q
  /** What the student answered, as TeX (or plain text for Locate Test). */
  given: string
}

interface State<Q> {
  question: Q
  answered: number
  correct: number
  wrong: number
  misses: Miss<Q>[]
  perAngle: Record<number, Tally>
  elapsed: number
  started: boolean
  paused: boolean
  finished: boolean
  drill: number | null
  queue: Q[]
  total: number
  retry: boolean
}

type Action<Q> =
  | { type: 'record'; correct: boolean; angle: number; given?: string }
  | { type: 'advance'; next: Q | null }
  | { type: 'tick' }
  | { type: 'restart'; first: Q; queue: Q[]; total: number; retry: boolean; drill: number | null }
  | { type: 'drill'; angle: number | null; next: Q }

function fresh<Q>(first: Q, queue: Q[] = [], total = ROUND_LENGTH, retry = false, drill: number | null = null): State<Q> {
  return {
    question: first, answered: 0, correct: 0, wrong: 0, misses: [], perAngle: {},
    elapsed: 0, started: false, paused: false, finished: false, drill, queue, total, retry,
  }
}

function reducer<Q>(s: State<Q>, a: Action<Q>): State<Q> {
  switch (a.type) {
    case 'record': {
      const t = s.perAngle[a.angle] ?? { right: 0, wrong: 0 }
      return {
        ...s,
        started: true,
        correct: s.correct + (a.correct ? 1 : 0),
        wrong: s.wrong + (a.correct ? 0 : 1),
        paused: !a.correct,
        perAngle: { ...s.perAngle, [a.angle]: a.correct ? { ...t, right: t.right + 1 } : { ...t, wrong: t.wrong + 1 } },
        misses: a.correct ? s.misses : [...s.misses, { question: s.question, given: a.given ?? '' }],
      }
    }
    case 'advance':
      if (!a.next) return { ...s, answered: s.answered + 1, paused: false, finished: true }
      return { ...s, answered: s.answered + 1, paused: false, question: a.next, queue: s.queue.length ? s.queue.slice(1) : s.queue }
    case 'tick':
      return { ...s, elapsed: s.elapsed + 1 }
    case 'restart':
      return fresh(a.first, a.queue, a.total, a.retry, a.drill)
    case 'drill':
      return { ...s, drill: a.angle, question: a.next }
  }
}

interface Options<Q> {
  mode: SessionMode
  /** A new question, limited to one angle when `onlyAngle` is set, and not a repeat of `prev`. */
  generate: (onlyAngle: number | null, prev: Q | null) => Q
  angleOf: (q: Q) => number
  /** Changes whenever a setting changes; a new setting starts a new session. */
  resetKey: string
}

export function useSession<Q>({ mode, generate, angleOf, resetKey }: Options<Q>) {
  const [state, dispatch] = useReducer(reducer as (s: State<Q>, a: Action<Q>) => State<Q>, undefined, () => fresh(generate(null, null)))
  const ref = useRef(state)
  ref.current = state
  const gen = useRef(generate)
  gen.current = generate

  const modeRef = useRef(mode)
  modeRef.current = mode

  const restart = useCallback((retry?: Q[]) => {
    // A drill (one angle only) belongs to practice; a test always covers every angle.
    const drill = modeRef.current === 'practice' ? ref.current.drill : null
    if (retry && retry.length) dispatch({ type: 'restart', first: retry[0], queue: retry.slice(1), total: retry.length, retry: true, drill: null })
    else dispatch({ type: 'restart', first: gen.current(drill, null), queue: [], total: ROUND_LENGTH, retry: false, drill })
  }, [])

  // New settings or a new mode: start over.
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    restart()
  }, [resetKey, mode, restart])

  useEffect(() => {
    if (!state.started || state.paused || state.finished) return
    const id = setInterval(() => dispatch({ type: 'tick' }), 1000)
    return () => clearInterval(id)
  }, [state.started, state.paused, state.finished])

  const record = useCallback((correct: boolean, given?: string) => {
    dispatch({ type: 'record', correct, angle: angleOf(ref.current.question), given })
  }, [angleOf])

  const advance = useCallback(() => {
    const s = ref.current
    const done = s.answered + 1
    if (mode === 'test' && done >= s.total) { dispatch({ type: 'advance', next: null }); return }
    const next = s.queue.length ? s.queue[0] : gen.current(s.drill, s.question)
    dispatch({ type: 'advance', next })
  }, [mode])

  const setDrill = useCallback((angle: number | null) => {
    dispatch({ type: 'drill', angle, next: gen.current(angle, ref.current.question) })
  }, [])

  return { ...state, record, advance, restart, setDrill }
}

/** "01:42" */
export function formatTime(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`
}
