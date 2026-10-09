// 2023 Methods Exam 2 MCQ 18 — f(x) = sin(ax) on [−aπ, aπ], with a slider for a = 1, 2, 3, 4 on a fixed
// window [−4π, 4π]. The shaded domain gets a times wider (width 2aπ) while each wave gets a times
// shorter (period 2π/a), so the domain holds a × a = a² periods. The bands mark the periods: each
// starts and ends at a zero of f and has exactly one dip (local minimum, f = −1) inside it, so there
// are a² local minima. The option chips remember every a the student has tried: a = 2 alone leaves
// B, D and E standing (all equal 4), a = 1 alone leaves C and E (both 1) — it takes a = 3 (or two
// cases together) to leave only E.

import { useState } from 'react'
import { C, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider } from './kit'

const PI = Math.PI
const XR: [number, number] = [-4 * PI, 4 * PI]
const YR: [number, number] = [-1.5, 1.7]

const OPTIONS: { letter: string; tex: string; value: (a: number) => number }[] = [
  { letter: 'A', tex: '', value: () => 2 },
  { letter: 'B', tex: '', value: () => 4 },
  { letter: 'C', tex: 'a', value: a => a },
  { letter: 'D', tex: '2a', value: a => 2 * a },
  { letter: 'E', tex: 'a^2', value: a => a * a },
]

const TICKS = [-4, -3, -2, -1, 1, 2, 3, 4]
const PERIOD_TEX: Record<number, string> = { 1: '2\\pi', 2: '\\pi', 3: '\\tfrac{2\\pi}{3}', 4: '\\tfrac{\\pi}{2}' }
const piLabel = (v: number) => {
  const n = Math.round(v / PI)
  return n === 1 ? 'π' : n === -1 ? '−π' : n < 0 ? `−${-n}π` : `${n}π`
}

export default function SineDips() {
  const [a, setA] = useState(2)
  const [tried, setTried] = useState<number[]>([2])

  const choose = (v: number) => {
    const n = Math.round(v)
    setA(n)
    setTried(t => (t.includes(n) ? t : [...t, n]))
  }

  const f = (x: number) => Math.sin(a * x)
  const period = (2 * PI) / a
  const lo = -a * PI
  const hi = a * PI
  // Local minima: ax = −π/2 + 2nπ, strictly inside the domain.
  const minima: number[] = []
  for (let n = -40; n <= 40; n++) {
    const x = (-PI / 2 + 2 * n * PI) / a
    if (x > lo + 1e-9 && x < hi - 1e-9) minima.push(x)
  }
  const count = minima.length
  const bands = Array.from({ length: a * a }, (_, j) => lo + j * period)
  const ruledOut = (o: (typeof OPTIONS)[number]) => tried.some(t => o.value(t) !== t * t)
  const left = OPTIONS.filter(o => !ruledOut(o)).map(o => o.letter)

  let notice
  if (a === 1) {
    notice = (
      <Notice tone={left.length === 1 ? 'good' : 'neutral'}>
        The domain <M>{'[-\\pi, \\pi]'}</M> is exactly one period (<M>{'2\\pi'}</M>), so there is one dip. But{' '}
        <M>{'1 = a = a^2'}</M>, so <M>{'a = 1'}</M> on its own can't decide between C and E.{' '}
        {left.length === 1 ? (
          <>With the other values of <M>a</M> you have tried, only E is left.</>
        ) : (
          <>
            Now try <M>{'a = 2'}</M> and <M>{'a = 3'}</M>.
          </>
        )}
      </Notice>
    )
  } else if (a === 2) {
    notice = (
      <Notice tone={left.length === 1 ? 'good' : 'warn'}>
        The domain is twice as wide (<M>{'4\\pi'}</M>) and each wave is half as long (period <M>{'\\pi'}</M>), so{' '}
        <M>{'2 \\times 2 = 4'}</M> periods and 4 dips. But <M>{'4 = 2a = a^2'}</M> here, so <M>{'a = 2'}</M> on its
        own can't separate B, D and E.{' '}
        {left.length === 1 ? (
          <>With the other values of <M>a</M> you have tried, only E is left.</>
        ) : (
          <>
            Try <M>{'a = 3'}</M>.
          </>
        )}
      </Notice>
    )
  } else if (a === 3) {
    notice = (
      <Notice tone="good">
        Three times as wide (<M>{'6\\pi'}</M>) and each wave a third as long (<M>{'\\tfrac{2\\pi}{3}'}</M>):{' '}
        <M>{'3 \\times 3 = 9'}</M> periods, 9 dips. The options give 2, 4, 3, 6 and 9, so only{' '}
        <M>{'a^2'}</M> fits — option E.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <M>{'4 \\times 4 = 16'}</M> dips — again <M>{'a^2'}</M>. Each shaded band is one period: it starts and ends at a
        zero of <M>f</M> and holds exactly one dip, so counting periods counts the local minima.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={XR} y={YR} xStep={PI} yStep={1} height={260} xLabels={false} yLabels={v => (Math.round(v) === -1 ? '−1' : '')}>
        {bands.map((s, j) => (
          <Region
            key={j}
            top={() => 1.25}
            bottom={() => -1.25}
            from={s}
            to={s + period}
            color={j % 2 === 0 ? C.violet : C.f}
            opacity={0.1}
            samples={2}
          />
        ))}
        <Line.Segment point1={[lo, -1.25]} point2={[lo, 1.25]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[hi, -1.25]} point2={[hi, 1.25]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[lo, 1.25]} attach="n" color={C.guide} size={12}>{`x = ${piLabel(lo)}`}</Label>
        <Label at={[hi, 1.25]} attach="n" color={C.guide} size={12}>{`x = ${piLabel(hi)}`}</Label>
        <Plot.OfX y={f} domain={[lo, hi]} color={C.f} weight={2.5} minSamplingDepth={10} />
        {/* π-ticks sit below the shaded band (not on the axis, where the curve crosses at every multiple of π). */}
        {TICKS.map(n => (
          <Label key={`t${n}`} at={[n * PI, -1.4]} attach="c" color={C.guide} size={11} bold={false}>
            {piLabel(n * PI)}
          </Label>
        ))}
        {minima.map(x => (
          <Point key={x} x={x} y={-1} color={C.g} />
        ))}
        {a <= 3 &&
          minima.map((x, i) => (
            <Label key={`n${x}`} at={[x, -1]} attach="s" color={C.g} size={11} gap={6}>
              {i + 1}
            </Label>
          ))}
      </Plane>
      <div className="mt-3 flex flex-col gap-3">
        <Slider label="a" value={a} onChange={choose} min={1} max={4} step={1} format={v => String(Math.round(v))} />
        <Readouts>
          <Readout tex={`\\text{period} = \\tfrac{2\\pi}{a} = ${PERIOD_TEX[a]}`} />
          <Readout tex={`\\text{domain width} = 2a\\pi = ${2 * a}\\pi`} />
          <Readout tex={`\\text{periods} = ${a * a}`} color={C.violet} />
          <Readout tex={`\\text{local minima} = ${count}`} color={C.g} />
        </Readouts>
        <div className="flex flex-wrap gap-1.5 text-[12.5px]">
          {OPTIONS.map(o => {
            const out = ruledOut(o)
            return (
              <span
                key={o.letter}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 ${
                  out
                    ? 'border-gray-200 text-gray-400 opacity-60 dark:border-gray-700 dark:text-gray-500'
                    : 'border-emerald-400 text-emerald-800 dark:border-emerald-700 dark:text-emerald-200'
                }`}
              >
                <b>{o.letter}</b> <M>{o.tex ? `${o.tex} = ${o.value(a)}` : String(o.value(a))}</M>
                <span className={out ? 'text-red-500 dark:text-red-400' : ''}>{out ? '✗' : '✓'}</span>
              </span>
            )
          })}
        </div>
        <p className="-mt-1 text-[12px] text-gray-500 dark:text-gray-400">
          Each chip shows the option's value at this <M>a</M>. An option gets a ✗ once any <M>a</M> you have tried gives a different count of local minima. Tried so far:{' '}
          <M>{`a = ${[...tried].sort((p, q) => p - q).join(',\\ ')}`}</M>.
        </p>
        {notice}
      </div>
    </div>
  )
}
