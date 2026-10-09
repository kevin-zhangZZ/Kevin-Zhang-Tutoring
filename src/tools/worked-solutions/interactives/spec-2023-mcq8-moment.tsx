// 2023 Specialist Exam 2 MCQ 8 — test the five options at one moment. A time slider drains the pool
// (V = 8000 − 5t: 15 L/min of fresh water in, 20 L/min out) and, for a pool holding Q = 10 kg of
// chemical at that moment, works out from the physics how fast chemical leaves: each litre holds
// Q/V kg and 20 L leave a minute, so dQ/dt = 0 − 20Q/V. The table puts the same t and Q into every
// option. Only A agrees at every t. B (−Q/400) divides by a fixed 8000 L, so it agrees only at t = 0
// and falls behind as the pool shrinks; C is −15Q/V (the 15 L/min coming in used for the flow out);
// D (+15Q/V) and E (+20Q/V, 29% chose it) are positive — they say chemical is being added, though
// only fresh water comes in. Every value checked with sympy (e.g. t = 1200, Q = 10: A −0.1,
// B −0.025, C −0.075, D 0.075, E 0.1).

import { useState } from 'react'
import { C, Controls, Katex, M, Notice, Readout, Readouts, Slider } from './kit'

const Q = 10 // kg in the pool at the moment being tested; every option is a multiple of Q

type Letter = 'A' | 'B' | 'C' | 'D' | 'E'
const OPTS: { letter: Letter; tex: string; f: (t: number) => number }[] = [
  { letter: 'A', tex: '\\dfrac{4Q}{t-1600}', f: t => (4 * Q) / (t - 1600) },
  { letter: 'B', tex: '\\dfrac{-Q}{400}', f: () => -Q / 400 },
  { letter: 'C', tex: '\\dfrac{3Q}{t-1600}', f: t => (3 * Q) / (t - 1600) },
  { letter: 'D', tex: '\\dfrac{3Q}{1600-t}', f: t => (3 * Q) / (1600 - t) },
  { letter: 'E', tex: '\\dfrac{4Q}{1600-t}', f: t => (4 * Q) / (1600 - t) },
]

/** Three significant figures, with a real minus sign. */
function sig(v: number): string {
  return String(Number(v.toPrecision(3))).replace('-', '−')
}

/** The pool, drawn with its level at V out of 8000 L. */
function Pool({ V }: { V: number }) {
  const X0 = 50
  const X1 = 170
  const TOP = 40
  const FLOOR = 130
  const level = FLOOR - ((FLOOR - TOP - 6) * V) / 8000
  return (
    <svg viewBox="0 0 230 150" className="w-full max-w-[260px] text-gray-700 dark:text-gray-300" role="img" aria-label={`Pool holding ${Math.round(V)} litres`}>
      <defs>
        <marker id="pool-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
        </marker>
      </defs>
      <rect x={X0 + 1.5} y={level} width={X1 - X0 - 3} height={Math.max(0, FLOOR - level - 1.5)} fill={C.f} fillOpacity={0.25} />
      <line x1={X0 + 1.5} y1={level} x2={X1 - 1.5} y2={level} stroke={C.f} strokeWidth={2} />
      <path d={`M${X0} ${TOP} L${X0} ${FLOOR} L${X1} ${FLOOR} L${X1} ${TOP}`} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinejoin="round" />
      <path d={`M6 26 L80 26 L80 ${TOP + 8}`} fill="none" stroke="currentColor" strokeWidth={2} markerEnd="url(#pool-arrow)" />
      <text x={6} y={16} fontSize={11.5} fontWeight={600} fill="currentColor">in: 15 L/min, fresh</text>
      <path d={`M${X1} 122 L222 122`} fill="none" stroke="currentColor" strokeWidth={2} markerEnd="url(#pool-arrow)" />
      <text x={X1 + 4} y={112} fontSize={11.5} fontWeight={600} fill="currentColor">out:</text>
      <text x={X1 + 4} y={142} fontSize={11.5} fontWeight={600} fill="currentColor">20 L/min</text>
      <text x={X0 + 8} y={V > 1500 ? level + 15 : level - 6} fontSize={12} fontWeight={700} fill={C.f}>{`V = ${Math.round(V)} L`}</text>
    </svg>
  )
}

export default function MomentWidget() {
  const [t, setT] = useState(1200)
  const V = 8000 - 5 * t
  const c = Q / V
  const truth = -20 * c
  const vals = OPTS.map(o => ({ ...o, v: o.f(t) }))
  const okOf = (v: number) => Math.abs(v - truth) < 1e-9

  let notice
  if (t === 0) {
    notice = (
      <Notice>
        At <M>t = 0</M> the pool still holds 8000 L, so B, which always divides by 8000, gives the same rate as A. One
        moment can&apos;t separate them. Slide <M>t</M> to the right and watch B&apos;s value stay put while the true rate
        changes.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Only A matches at every <M>t</M>. B divides by 8000 L, but the pool now holds {Math.round(V)} L, so the same 10 kg
        is more concentrated and leaves faster than B says. C, D and E miss at every <M>t</M>, and D and E even have the
        wrong sign. Drag <M>t</M> back to 0 to see where B agrees.
      </Notice>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Pool V={V} />
        <div className="flex flex-col gap-1.5 text-[13px] text-gray-700 dark:text-gray-300">
          <span>
            Suppose that after <M>{`t = ${t}`}</M> minutes the pool holds <M>Q = 10</M> kg of chemical.
          </span>
          <Readouts>
            <Readout tex={`V = 8000 - 5t = ${V}\\ \\text{L}`} color={C.f} />
          </Readouts>
          <span>
            Each litre holds <M>{`\\tfrac{Q}{V} = \\tfrac{10}{${V}}`}</M> kg, and 20 L leave each minute:
          </span>
          <Readouts>
            <Readout tex={`\\tfrac{dQ}{dt} = 0 - 20 \\times \\tfrac{10}{${V}} = ${sig(truth).replace('−', '-')}\\ \\text{kg/min}`} color={C.good} />
          </Readouts>
        </div>
      </div>

      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={1500} step={50} format={v => `${v} min`} />
      </Controls>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px] text-gray-700 dark:text-gray-300 border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
              <th className="py-1.5 pr-3 font-semibold">Option</th>
              <th className="py-1.5 pr-3 font-semibold">
                <Katex tex="\tfrac{dQ}{dt}" />
              </th>
              <th className="py-1.5 pr-3 font-semibold">
                Value at <M>{`t = ${t},\\ Q = 10`}</M>
              </th>
            </tr>
          </thead>
          <tbody>
            {vals.map(o => {
              const ok = okOf(o.v)
              return (
                <tr key={o.letter} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-1.5 pr-3 font-semibold">{o.letter}</td>
                  <td className="py-1.5 pr-3">
                    <Katex tex={o.tex} />
                  </td>
                  <td className={`py-1.5 pr-3 font-semibold tabular-nums ${ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                    {sig(o.v)} {ok ? '✓' : '✗'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {notice}
    </div>
  )
}
