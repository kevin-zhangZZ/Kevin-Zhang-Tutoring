// 2017 Methods Exam 2 Q3f — why q = 21p²(1 − p)⁵ + 35p³(1 − p)⁴. Seven independent days, each either
// "more than d minutes" (probability p) or not (1 − p): one arrangement with exactly two such days
// has probability p²(1 − p)⁵, and stepping through them shows there are C(7, 2) = 21 (C(7, 3) = 35 for
// three days). Below, the whole distribution of Y ~ Bi(7, p) as bars, with q the two orange bars
// added together; the p slider starts at 8/25 (d = 50, from part e.) and previews part g.i.

import { useState } from 'react'
import { Buttons, C, Controls, Katex, Label, M, Notice, Plane, Polygon, Readout, Readouts, Slider, Text, Toggle, num } from './kit'

const choose = (n: number, k: number) => {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
const pmf = (k: number, p: number) => choose(7, k) * p ** k * (1 - p) ** (7 - k)

/** Every way of choosing k of the 7 days, in order: [0, 1], [0, 2], … */
function arrangements(k: number): number[][] {
  const out: number[][] = []
  const walk = (start: number, picked: number[]) => {
    if (picked.length === k) {
      out.push(picked)
      return
    }
    for (let i = start; i < 7; i++) walk(i + 1, [...picked, i])
  }
  walk(0, [])
  return out
}
const ARR = { 2: arrangements(2), 3: arrangements(3) } as const

// Bars in plot units: bar k is centred at k + 1 (so the y-axis sits clear of the first bar) and is
// 100 × Pr(Y = k) tall; mafs pads the view in plot units, so a 0–1 height would be squashed. The p
// slider stops at 0.07 and 0.93, where the tallest bar (0.93⁷ ≈ 0.60) still fits under TOP, so the
// Math.min below never actually cuts a bar short.
const TOP = 62

export default function Arrangements() {
  const [p, setP] = useState(0.32)
  const [k, setK] = useState<2 | 3>(2)
  const [idx, setIdx] = useState(0)
  const list = ARR[k]
  const chosen = new Set(list[idx % list.length])
  const p2 = pmf(2, p)
  const p3 = pmf(3, p)

  return (
    <div>
      <div className="flex gap-1 sm:gap-1.5 mb-2">
        {Array.from({ length: 7 }, (_, i) => {
          const on = chosen.has(i)
          return (
            <div
              key={i}
              className={`flex-1 min-w-0 rounded-lg border text-center py-1.5 ${
                on
                  ? 'bg-orange-100 border-orange-300 text-orange-900 dark:bg-orange-950/50 dark:border-orange-800 dark:text-orange-100'
                  : 'bg-gray-50 border-gray-200 text-gray-500 dark:bg-gray-800/60 dark:border-gray-700 dark:text-gray-400'
              }`}
            >
              <p className="text-[10.5px] font-semibold leading-none mb-1">Day {i + 1}</p>
              <p className="text-[12.5px] leading-none whitespace-nowrap">
                {/* 1{-}p drops the spacing round the minus so it fits a narrow tile on one line. */}
                <Katex tex={on ? 'p' : '1{-}p'} />
              </p>
            </div>
          )
        })}
      </div>
      <p className="text-[12.5px] text-gray-600 dark:text-gray-300 mb-2">
        Arrangement {(idx % list.length) + 1} of {list.length}: probability{' '}
        <Katex tex={k === 2 ? 'p^2(1-p)^5' : 'p^3(1-p)^4'} />
      </p>
      <Buttons>
        <Toggle label="Exactly 2 days" checked={k === 2} onChange={() => { setK(2); setIdx(0) }} />
        <Toggle label="Exactly 3 days" checked={k === 3} onChange={() => { setK(3); setIdx(0) }} />
        <button
          type="button"
          onClick={() => setIdx(i => (i + 1) % list.length)}
          className="text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Next arrangement ›
        </button>
      </Buttons>

      <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 mt-4 mb-1">
        The distribution of Y, the number of days out of 7 with more than d minutes
      </p>
      <Plane x={[-1.3, 9]} y={[-8, TOP + 4]} xStep={1} yStep={10} labels={false} xLabel="" yLabel="" height={250}>
        {Array.from({ length: 8 }, (_, j) => (
          <Text key={`x${j}`} x={j + 1} y={0} attach="n" attachDistance={17} size={12} color={C.ink}>{String(j)}</Text>
        ))}
        {[20, 40, 60].map(v => (
          <Text key={`y${v}`} x={0} y={v} attach="w" attachDistance={7} size={12} color={C.ink}>{(v / 100).toFixed(1)}</Text>
        ))}
        {Array.from({ length: 8 }, (_, j) => {
          const h = Math.min(TOP, 100 * pmf(j, p))
          const hot = j === 2 || j === 3
          return (
            <Polygon
              key={j}
              points={[[j + 0.65, 0], [j + 1.35, 0], [j + 1.35, h], [j + 0.65, h]]}
              color={hot ? C.g : C.guide}
              fillOpacity={hot ? 0.75 : 0.4}
              weight={hot && j === k ? 2.5 : 0}
              strokeOpacity={hot && j === k ? 1 : 0}
            />
          )
        })}
        <Label at={[3, 100 * p2]} color={C.g} attach="n" size={11}>{num(p2, 3)}</Label>
        <Label at={[4, 100 * p3]} color={C.g} attach="n" size={11}>{num(p3, 3)}</Label>
      </Plane>
      <Controls>
        <Slider label="p" value={p} onChange={setP} min={0.07} max={0.93} step={0.005} format={v => v.toFixed(3)} />
        <Readouts>
          <Readout color={C.g} tex={`\\Pr(Y=2) = 21p^2(1-p)^5 \\approx ${num(p2, 4)}`} />
          <Readout color={C.g} tex={`\\Pr(Y=3) = 35p^3(1-p)^4 \\approx ${num(p3, 4)}`} />
          <Readout tex={`q \\approx ${num(p2 + p3, 4)}`} />
        </Readouts>
        <Notice>
          Each orange day is &ldquo;more than <M>d</M> minutes&rdquo; (probability <M>p</M>), each grey day is not
          (probability <M>1 - p</M>), and the days are independent, so multiply:{' '}
          {k === 2 ? (
            <>
              this arrangement has probability <M>p^2(1-p)^5</M>. Every arrangement of exactly two orange days has that same
              probability, and there are <M>{'\\binom72 = 21'}</M> of them (press Next to step through), so{' '}
              <M>\Pr(Y=2) = 21p^2(1-p)^5</M>.
            </>
          ) : (
            <>
              this arrangement has probability <M>p^3(1-p)^4</M>, and there are <M>{'\\binom73 = 35'}</M> ways to choose the three
              days, so <M>\Pr(Y=3) = 35p^3(1-p)^4</M>.
            </>
          )}{' '}
          <M>q</M> is the two orange bars added.{' '}
          {Math.abs(p - 0.32) < 0.003
            ? <>(<M>p = 0.32</M> is part e.&apos;s <M>{'d = 50'}</M>.) Slide <M>p</M>: which value makes them biggest together? That is part g.i.</>
            : <>Part g.i. finds the <M>p</M> that makes them biggest together.</>}
        </Notice>
      </Controls>
    </div>
  )
}
