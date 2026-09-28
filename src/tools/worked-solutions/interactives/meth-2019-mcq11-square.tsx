// 2019 Methods Exam 2 MCQ 11 — the tree diagram drawn as a unit square (an area model). Column A
// has width p, column A′ width 1 − p; the shaded B-part of each column has height m = Pr(B | A)
// and n = Pr(B | A′). The dashed line is Pr(B) = pm + (1 − p)n, a weighted average of m and n, so
// it always sits between the two heights. Independence needs Pr(B | A) = Pr(B), i.e. the line
// level with m, which happens exactly when n = m, whatever p is (option A). Buttons set values
// that satisfy each of options B–E without m = n, and the readouts show independence failing.

import { useState } from 'react'
import { Buttons, C, Controls, M, Notice, Readout, Readouts, Slider } from './kit'

const X0 = 46
const Y0 = 14
const S = 200
const TOL = 0.005

type Opt = 'A' | 'B' | 'C' | 'D' | 'E'

const OPTS: { key: Opt; tex: string; holds: (p: number, m: number, n: number) => boolean }[] = [
  { key: 'A', tex: 'm = n', holds: (_p, m, n) => Math.abs(m - n) < TOL },
  { key: 'B', tex: 'm = 1 - p', holds: (p, m) => Math.abs(m - (1 - p)) < TOL },
  { key: 'C', tex: 'm + n = 1', holds: (_p, m, n) => Math.abs(m + n - 1) < TOL },
  { key: 'D', tex: 'm = p', holds: (p, m) => Math.abs(m - p) < TOL },
  { key: 'E', tex: 'm + n = 1 - p', holds: (p, m, n) => Math.abs(m + n - (1 - p)) < TOL },
]

const r2 = (v: number) => Math.round(v * 100) / 100

export default function Square() {
  const [p, setP] = useState(0.4)
  const [m, setM] = useState(0.75)
  const [n, setN] = useState(0.35)

  const pB = p * m + (1 - p) * n
  const indep = Math.abs(m - n) < TOL
  const lineColor = indep ? C.good : C.violet
  const heldWrong = OPTS.filter(o => o.key !== 'A' && o.holds(p, m, n))

  const yOf = (v: number) => Y0 + S * (1 - v)
  const xSplit = X0 + p * S

  /** Values that satisfy option k but (for B–E) keep m ≠ n. */
  const trySet = (k: Opt) => {
    const away = (v: number) => r2(v <= 0.5 ? v + 0.3 : v - 0.3)
    if (k === 'A') setN(m)
    else if (k === 'B') {
      const mm = r2(1 - p)
      setM(mm)
      setN(away(mm))
    } else if (k === 'C') {
      const mm = Math.abs(m - 0.5) < 0.1 ? 0.75 : m
      setM(mm)
      setN(r2(1 - mm))
    } else if (k === 'D') {
      setM(p)
      setN(away(p))
    } else {
      const mm = r2(0.75 * (1 - p))
      setM(mm)
      setN(r2(1 - p - mm))
    }
  }

  let notice
  if (indep) {
    notice = (
      <Notice tone="good">
        With <M>m = n</M> the shaded <M>B</M>-parts are the same height in both columns, so <M>B</M> is one level band and
        the dashed line <M>\Pr(B)</M> sits at that same height: <M>{'\\Pr(B\\mid A) = \\Pr(B)'}</M>, so <M>A</M> and{' '}
        <M>B</M> are independent. Now drag <M>p</M>: the columns change width but the band stays level. Independence does
        not depend on <M>p</M>.
      </Notice>
    )
  } else if (heldWrong.length > 0) {
    notice = (
      <Notice tone="warn">
        Option {heldWrong.map(o => o.key).join(' and ')} holds here, yet <M>m \ne n</M>, so the dashed{' '}
        <M>\Pr(B)</M> sits between the two heights and <M>{'\\Pr(B\\mid A) = m \\ne \\Pr(B)'}</M>. Not independent. A
        condition that can hold while the events are dependent is not the condition for independence.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>\Pr(B) = pm + (1-p)n</M> is a <b>weighted average</b> of <M>m</M> and <M>n</M>, so the dashed line always
        lies between the two shaded heights. It can be level with <M>m</M> (which is what <M>{'\\Pr(B\\mid A) = \\Pr(B)'}</M>{' '}
        needs) only if <M>n</M> is level too. Drag <M>n</M> up to <M>m</M>, or test options B to E with the buttons.
      </Notice>
    )
  }

  const txt = 'fill-gray-700 dark:fill-gray-200'
  const sub = 'fill-gray-500 dark:fill-gray-400'

  return (
    <div>
      <svg
        viewBox="0 0 340 272"
        className="w-full max-w-[420px] mx-auto block"
        role="img"
        aria-label={`Unit square split into column A of width ${p.toFixed(2)} and column A-dash of width ${(1 - p).toFixed(2)}; B shaded to height ${m.toFixed(2)} in A and ${n.toFixed(2)} in A-dash; Pr(B) = ${pB.toFixed(2)}`}
      >
        {/* the two columns, not-B part */}
        <rect x={X0} y={Y0} width={S} height={S} className="fill-gray-100 dark:fill-gray-800" />
        {/* B-parts */}
        <rect x={X0} y={yOf(m)} width={p * S} height={m * S} fill={C.f} fillOpacity={0.55} />
        <rect x={xSplit} y={yOf(n)} width={(1 - p) * S} height={n * S} fill={C.f} fillOpacity={0.35} />
        {/* outline and split */}
        <rect x={X0} y={Y0} width={S} height={S} fill="none" className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={1.4} />
        <line x1={xSplit} y1={Y0} x2={xSplit} y2={Y0 + S} className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={1.4} />
        {/* top edges of the B-parts */}
        <line x1={X0} y1={yOf(m)} x2={xSplit} y2={yOf(m)} stroke={C.f} strokeWidth={2.5} />
        <line x1={xSplit} y1={yOf(n)} x2={X0 + S} y2={yOf(n)} stroke={C.f} strokeWidth={2.5} />
        {/* Pr(B), the weighted average */}
        <line x1={X0 - 4} y1={yOf(pB)} x2={X0 + S + 30} y2={yOf(pB)} stroke={lineColor} strokeWidth={2.2} strokeDasharray="6 4" />
        <text x={X0 + S + 33} y={yOf(pB) + 4} fontSize={12} fill={lineColor} fontWeight={600}>
          Pr(B)
        </text>
        {/* height labels */}
        <text x={X0 - 7} y={yOf(m) + 4} fontSize={13} textAnchor="end" fill={C.f} fontStyle="italic" fontWeight={600}>
          m
        </text>
        <text x={X0 + S + 6} y={yOf(n) + (Math.abs(n - pB) < 0.06 ? (n >= pB ? -4 : 12) : 4)} fontSize={13} fill={C.f} fontStyle="italic" fontWeight={600}>
          n
        </text>
        <text x={X0 - 22} y={Y0 + 5} fontSize={10} textAnchor="end" className={sub}>1</text>
        <text x={X0 - 22} y={Y0 + S + 4} fontSize={10} textAnchor="end" className={sub}>0</text>
        {/* column labels */}
        <text x={X0 + (p * S) / 2} y={Y0 + S + 17} fontSize={13} textAnchor="middle" className={txt} fontStyle="italic">
          A
        </text>
        <text x={xSplit + ((1 - p) * S) / 2} y={Y0 + S + 17} fontSize={13} textAnchor="middle" className={txt} fontStyle="italic">
          A′
        </text>
        <text x={X0 + (p * S) / 2} y={Y0 + S + 32} fontSize={11} textAnchor="middle" className={sub}>
          {p < 0.16 ? '' : `width p`}
        </text>
        <text x={xSplit + ((1 - p) * S) / 2} y={Y0 + S + 32} fontSize={11} textAnchor="middle" className={sub}>
          {p > 0.8 ? '' : `width 1 − p`}
        </text>
        <text x={X0 + S / 2} y={Y0 + S + 48} fontSize={11} textAnchor="middle" className={sub}>
          shaded = B
        </text>
      </svg>
      <Controls>
        <Slider label="p" value={p} onChange={v => setP(r2(v))} min={0.05} max={0.95} step={0.01} />
        <Slider label="m" value={m} onChange={v => setM(Math.abs(v - n) < 0.015 ? n : r2(v))} min={0} max={1} step={0.01} />
        <Slider label="n" value={n} onChange={v => setN(Math.abs(v - m) < 0.015 ? m : r2(v))} min={0} max={1} step={0.01} />
        <Buttons>
          {OPTS.map(o => (
            <button
              key={o.key}
              type="button"
              onClick={() => trySet(o.key)}
              className={`text-[12.5px] px-3 py-1.5 rounded-full border ${
                o.holds(p, m, n)
                  ? o.key === 'A'
                    ? 'border-green-500 bg-green-50 text-green-800 dark:bg-green-950/40 dark:text-green-200'
                    : 'border-red-400 bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-200'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <b>{o.key}</b>: <M>{o.tex}</M>
            </button>
          ))}
        </Buttons>
        <Readouts>
          <Readout color={lineColor} tex={`\\Pr(B) = pm + (1-p)n = ${pB.toFixed(3)}`} />
          <Readout
            color={indep ? C.good : C.bad}
            tex={`\\Pr(B\\mid A) = m = ${m.toFixed(2)} ${indep ? '=' : '\\ne'} \\Pr(B)`}
          />
          <Readout tex={`\\Pr(A\\cap B) = pm = ${(p * m).toFixed(3)}`} />
          <Readout tex={`\\Pr(A)\\Pr(B) = p\\times\\Pr(B) = ${(p * pB).toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
