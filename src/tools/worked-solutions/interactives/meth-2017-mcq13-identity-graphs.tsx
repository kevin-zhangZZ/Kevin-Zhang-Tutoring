// 2017 Methods Exam 2 MCQ 13 — a statement like h(x)h(−x) = −h(x²) is claimed for EVERY x in the
// domain (−1, 1), so its two sides must be the same graph. Pick an option: the left-hand side is
// drawn thick in blue and the right-hand side dashed in orange, for h(x) = 1/(x − 1). In A–D the
// dashed graph lies exactly on the blue one; in E they come apart, (h(x))² above the x-axis and
// h(x²) below it, so E is the statement that is not true. At x = 0 the gap is 1 versus −1.

import { useState } from 'react'
import { C, Controls, Katex, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, clamp, num, tick } from './kit'

const h = (x: number) => 1 / (x - 1)
const cap = (v: number) => clamp(v, -40, 40)

type Key = 'A' | 'B' | 'C' | 'D' | 'E'
const KEYS: Key[] = ['A', 'B', 'C', 'D', 'E']

const OPTS: Record<Key, { lhs: (x: number) => number; rhs: (x: number) => number; lt: string; rt: string; both?: string }> = {
  A: { lhs: x => h(x) * h(-x), rhs: x => -h(x * x), lt: 'h(x)h(-x)', rt: '-h(x^2)', both: '\\dfrac{1}{1-x^2}' },
  B: { lhs: x => h(x) + h(-x), rhs: x => 2 * h(x * x), lt: 'h(x)+h(-x)', rt: '2h(x^2)', both: '\\dfrac{2}{x^2-1}' },
  C: { lhs: x => h(x) - h(0), rhs: x => x * h(x), lt: 'h(x)-h(0)', rt: 'xh(x)', both: '\\dfrac{x}{x-1}' },
  D: { lhs: x => h(x) - h(-x), rhs: x => 2 * x * h(x * x), lt: 'h(x)-h(-x)', rt: '2xh(x^2)', both: '\\dfrac{2x}{x^2-1}' },
  E: { lhs: x => h(x) ** 2, rhs: x => h(x * x), lt: '(h(x))^2', rt: 'h(x^2)' },
}

function Picker({ value, onChange }: { value: Key; onChange: (k: Key) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[12.5px] text-gray-500 dark:text-gray-400 mr-1">Statement</span>
      {KEYS.map(k => (
        <button
          key={k}
          type="button"
          onClick={() => onChange(k)}
          aria-pressed={value === k}
          className={
            'w-9 py-1 rounded-full border text-[13px] font-semibold ' +
            (value === k
              ? 'bg-sky-700 border-sky-700 text-white dark:bg-sky-500 dark:border-sky-500 dark:text-gray-950'
              : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500')
          }
        >
          {k}
        </button>
      ))}
    </div>
  )
}

export default function IdentityGraphs() {
  const [key, setKey] = useState<Key>('A')
  const [x0, setX0] = useState(0.5)
  const o = OPTS[key]
  const l = o.lhs(x0)
  const r = o.rhs(x0)
  const equal = Math.abs(l - r) < 1e-9 * Math.max(1, Math.abs(l))

  let notice
  if (key !== 'E') {
    notice = (
      <Notice>
        The dashed orange graph of <M>{o.rt}</M> sits exactly on the blue graph of <M>{o.lt}</M>. Slide{' '}
        <M>x</M> anywhere in <M>(-1, 1)</M>: the two readouts always agree, because both sides simplify to{' '}
        <M>{o.both ?? ''}</M>. So statement {key} is true for every <M>x</M>. Now try <b>E</b>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The two sides come apart. <M>{'(h(x))^2'}</M> is a square, so its graph stays <b>above</b> the <M>x</M>-axis.
        But for every <M>x</M> in <M>(-1, 1)</M>, <M>{'x^2 - 1 < 0'}</M>, so <M>{'h(x^2) = \\tfrac{1}{x^2-1}'}</M> stays{' '}
        <b>below</b> it. They can never be equal. Slide to <M>x = 0</M>: the left side is <M>1</M> and the right side
        is <M>-1</M>. One <M>x</M> where the sides differ is enough to make the statement false.
      </Notice>
    )
  }

  return (
    <div>
      <div className="mb-2 flex flex-col gap-2">
        <Picker value={key} onChange={setKey} />
        <div className="text-[14px]">
          <Katex tex={`\\color{${C.f}}{${o.lt}} \\;\\overset{?}{=}\\; \\color{${C.g}}{${o.rt}}`} />
        </div>
      </div>
      <Plane x={[-1.25, 1.25]} y={[-6, 6]} xStep={0.5} yStep={2} height={300} xLabels={v => (Math.abs(v) > 1.1 ? '' : tick(v))}>
        <Line.Segment point1={[-1, -6]} point2={[-1, 6]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[1, -6]} point2={[1, 6]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={x => cap(o.lhs(x))} domain={[-0.995, 0.995]} color={C.f} weight={7} opacity={0.55} />
        <Plot.OfX y={x => cap(o.rhs(x))} domain={[-0.995, 0.995]} color={C.g} weight={2.5} style="dashed" />
        {!equal && (
          <Line.Segment point1={[x0, cap(l)]} point2={[x0, cap(r)]} color={C.bad} weight={2} style="dashed" />
        )}
        <Point x={x0} y={cap(l)} color={C.f} />
        <Point x={x0} y={cap(r)} color={C.g} />
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={-0.95} max={0.95} step={0.01} />
        <Readouts>
          <Readout color={C.f} tex={`${o.lt} = ${num(l, 3)}`} />
          <Readout color={C.g} tex={`${o.rt} = ${num(r, 3)}`} />
          <Readout color={equal ? C.good : C.bad} tex={equal ? '\\text{equal}\\ \\checkmark' : '\\text{not equal}'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
