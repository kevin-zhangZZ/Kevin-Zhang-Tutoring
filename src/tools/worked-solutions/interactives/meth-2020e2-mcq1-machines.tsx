// 2020 Methods Exam 2 MCQ 1 — a composite is two function machines in a row, and the one written
// INSIDE the bracket works first. Choose the composite (g(f(x)) or f(g(x))) and the input (−1 or 2):
// the chain shows the inside machine's output becoming the outside machine's input, and the given
// values light up as they are used. g(f(−1)) = g(4) = 6 is the answer (D); f(g(−1)) = f(2) = 5 is
// option C, the same machines in the other order. With x = 2 the chain stalls, because g(5) and
// f(7) aren't given: the inside function's output has to be an input the outside one takes (the
// idea behind the domain of a composite). Only the five values printed in the question are used.

import { useState } from 'react'
import { Buttons, C, Controls, Katex, M, Notice, Toggle } from './kit'

type Fn = 'f' | 'g'
type Order = 'gf' | 'fg'

const VALUES: Record<Fn, Map<number, number>> = {
  f: new Map([
    [-1, 4],
    [2, 5],
  ]),
  g: new Map([
    [-1, 2],
    [2, 7],
    [4, 6],
  ]),
}
const GIVEN: [Fn, number][] = [
  ['f', -1],
  ['f', 2],
  ['g', -1],
  ['g', 2],
  ['g', 4],
]
const COLOR: Record<Fn, string> = { f: C.f, g: C.g }
const n = (v: number) => (v < 0 ? `-${-v}` : String(v))
const coloured = (fn: Fn) => `{\\color{${COLOR[fn]}}${fn}}`

/** One looked-up value as a chip: "f(−1) = 4", outlined in its function's colour when in use. */
function Chip({ fn, x, value, active, missing = false }: { fn: Fn; x: number; value?: number; active: boolean; missing?: boolean }) {
  const style = active && !missing ? { borderColor: COLOR[fn], boxShadow: `0 0 0 1px ${COLOR[fn]}` } : undefined
  return (
    <span
      style={style}
      className={`inline-flex items-center rounded-md border px-2 py-1 text-[12.5px] ${
        missing
          ? 'border-dashed border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-200'
          : active
            ? 'bg-white text-gray-900 dark:bg-gray-900 dark:text-white'
            : 'border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400'
      }`}
    >
      <Katex tex={`${fn}(${n(x)}) = ${missing ? '\\,?' : n(value ?? 0)}`} />
      {missing && <span className="ml-1.5 text-[11px] font-semibold">not given</span>}
    </span>
  )
}

/** A value travelling along the chain. */
function Box({ value, caption, color }: { value: number | undefined; caption: string; color?: string }) {
  return (
    <div className="flex-none flex flex-col items-center gap-1">
      <div
        style={color && value !== undefined ? { borderColor: color } : undefined}
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg border-2 flex items-center justify-center font-display text-[17px] font-semibold tabular-nums ${
          value === undefined
            ? 'border-dashed border-rose-400 text-rose-500 dark:border-rose-700 dark:text-rose-300'
            : color
              ? 'text-gray-900 dark:text-white'
              : 'border-gray-400 text-gray-900 dark:border-gray-500 dark:text-white'
        }`}
      >
        {value === undefined ? '?' : n(value).replace('-', '−')}
      </div>
      <span className="text-[11px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
        <Katex tex={caption} />
      </span>
    </div>
  )
}

/** A function machine between two boxes: an arrow carrying the function's name. */
function Machine({ fn, nth }: { fn: Fn; nth: string }) {
  return (
    <div className="flex-1 min-w-[3.25rem] flex flex-col items-center -mt-5">
      <span className="text-[10.5px] font-semibold text-gray-400 dark:text-gray-500 mb-0.5">{nth}</span>
      <div className="w-full flex items-center">
        <div className="flex-1 h-[2px]" style={{ background: COLOR[fn] }} />
        <span
          className="flex-none mx-1 rounded-full px-2 py-0.5 text-[13px] font-semibold italic text-white"
          style={{ background: COLOR[fn] }}
        >
          {fn}
        </span>
        <div className="flex-1 h-[2px]" style={{ background: COLOR[fn] }} />
        <svg viewBox="0 0 8 10" className="flex-none w-2 h-2.5" aria-hidden="true">
          <path d="M0 0 L8 5 L0 10 Z" fill={COLOR[fn]} />
        </svg>
      </div>
    </div>
  )
}

export default function Machines() {
  const [order, setOrder] = useState<Order>('gf')
  const [x, setX] = useState(-1)
  const inner: Fn = order === 'gf' ? 'f' : 'g'
  const outer: Fn = order === 'gf' ? 'g' : 'f'
  const mid = VALUES[inner].get(x) as number
  const out = VALUES[outer].get(mid)

  const innerTex = `${coloured(inner)}(${n(x)})`
  const whole = `${coloured(outer)}\\bigl(${innerTex}\\bigr)`
  const chain = `${whole} = ${coloured(outer)}(${mid}) = ${out === undefined ? '\\;?' : out}`

  let notice
  if (order === 'gf' && x === -1) {
    notice = (
      <Notice tone="good">
        <b>Inside first.</b> In <M>g(f(-1))</M> the bracket <M>f(-1)</M> has to be worked out before <M>g</M> can do
        anything, so <M>f</M> is the <i>first</i> machine even though <M>g</M> is written first. <M>f</M> turns −1 into 4, and
        that 4, not −1, is what goes into <M>g</M>: <M>g(4) = 6</M>, option D. Stopping at 4 (option B) leaves out the second
        machine. Now swap the order to <M>f(g(x))</M>.
      </Notice>
    )
  } else if (order === 'fg' && x === -1) {
    notice = (
      <Notice tone="warn">
        This is <M>f(g(-1))</M>: the same two machines in the <b>other order</b>. Now <M>g</M> is inside, so it goes first:{' '}
        <M>g(-1) = 2</M>, then <M>f(2) = 5</M>. That is option C, the answer to a different question. Whichever function sits
        next to the <M>x</M> acts first. Now try the input <M>x = 2</M>.
      </Notice>
    )
  } else if (order === 'gf') {
    notice = (
      <Notice>
        <M>f(2) = 5</M>, so the next step needs <M>g(5)</M>, and we aren&apos;t told it: the chain stalls. The inside
        machine&apos;s output has to be an input the outside machine takes. That is the idea behind the domain of a
        composite: <M>g(f(x))</M> exists only when <M>f(x)</M> lands in the domain of <M>g</M>. In the question,{' '}
        <M>f(-1) = 4</M> lands on 4, one of the inputs we are told <M>g</M> at.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>g(2) = 7</M>, but we aren&apos;t told <M>f(7)</M>, so <M>f(g(2))</M> can&apos;t be found from the information
        given. With these five values only <M>g(f(-1))</M> and <M>f(g(-1))</M> can be worked out, and they give different
        answers, 6 and 5: the order matters.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Given</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {GIVEN.map(([fn, gx]) => (
          <Chip
            key={`${fn}${gx}`}
            fn={fn}
            x={gx}
            value={VALUES[fn].get(gx)}
            active={(fn === inner && gx === x) || (fn === outer && gx === mid)}
          />
        ))}
        {out === undefined && <Chip fn={outer} x={mid} active missing />}
      </div>

      <div className="text-center text-[15px] mb-3">
        <Katex tex={chain} />
      </div>

      <div className="flex items-center gap-1 px-1 pt-5">
        <Box value={x} caption="x" />
        <Machine fn={inner} nth="1st (inside)" />
        <Box value={mid} caption={innerTex} color={COLOR[inner]} />
        <Machine fn={outer} nth="2nd (outside)" />
        <Box value={out} caption={whole} color={COLOR[outer]} />
      </div>

      <Controls>
        <Buttons>
          <span className="text-[12px] text-gray-500 dark:text-gray-400">Composite:</span>
          <Toggle label={<M>g(f(x))</M>} checked={order === 'gf'} onChange={() => setOrder('gf')} />
          <Toggle label={<M>f(g(x))</M>} checked={order === 'fg'} onChange={() => setOrder('fg')} />
        </Buttons>
        <Buttons>
          <span className="text-[12px] text-gray-500 dark:text-gray-400">Input:</span>
          <Toggle label={<M>x = -1</M>} checked={x === -1} onChange={() => setX(-1)} />
          <Toggle label={<M>x = 2</M>} checked={x === 2} onChange={() => setX(2)} />
        </Buttons>
        {notice}
      </Controls>
    </div>
  )
}
