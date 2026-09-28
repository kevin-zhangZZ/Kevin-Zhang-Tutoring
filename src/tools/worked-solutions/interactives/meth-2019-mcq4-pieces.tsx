// 2019 Methods Exam 2 MCQ 4 — ∫₀^{π/6}(a sin x + b cos x) dx as a stacked area. The region under
// y = a sin x + b cos x splits into a sin-piece (blue, a × (2 − √3)/2 ≈ 0.134a — small, because sin x
// starts at 0) and a cos-piece (orange, b × 1/2 — cos x stays near 1 all the way to π/6). Sliders
// for a and b; the five options are evaluated at the same a and b, so the student sees that only C
// tracks the shaded area every time. A toggle applies the sign slip ∫ sin x dx = cos x, which makes
// the sin-piece negative although it sits above the axis: that total is option B.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle, integrate, num } from './kit'

const R3 = Math.sqrt(3)
const K = (2 - R3) / 2 // ∫₀^{π/6} sin x dx = 1 − √3/2
const P6 = Math.PI / 6

const OPTIONS: { l: string; v: (a: number, b: number) => number }[] = [
  { l: 'A', v: (a, b) => ((2 - R3) * a - b) / 2 },
  { l: 'B', v: (a, b) => (b - (2 - R3) * a) / 2 },
  { l: 'C', v: (a, b) => ((2 - R3) * a + b) / 2 },
  { l: 'D', v: (a, b) => ((2 - R3) * b - a) / 2 },
  { l: 'E', v: (a, b) => ((2 - R3) * b + a) / 2 },
]

const piLabel = (v: number) => {
  const k = Math.round(v / (Math.PI / 12))
  if (Math.abs(v - (k * Math.PI) / 12) > 1e-6) return ''
  return ({ 2: 'π/6', 4: 'π/3', 6: 'π/2' } as Record<number, string>)[k] ?? ''
}

export default function Pieces() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(1)
  const [slip, setSlip] = useState(false)

  const sinPart = slip ? -K * a : K * a // the slip gives [a cos x] = a(√3/2 − 1)
  const cosPart = b / 2
  const total = sinPart + cosPart
  const area = integrate(x => a * Math.sin(x) + b * Math.cos(x), 0, P6)
  const matches = OPTIONS.filter(o => Math.abs(o.v(a, b) - total) < 1e-9).map(o => o.l)

  const lower = (x: number) => a * Math.sin(x)
  const upper = (x: number) => a * Math.sin(x) + b * Math.cos(x)
  const yEnd = upper(0.8)

  let notice
  if (slip) {
    notice = (
      <Notice tone="warn">
        With <M>{'\\int\\sin x\\,dx=\\cos x'}</M> the sin-piece (now red) becomes <M>{'a\\left(\\tfrac{\\sqrt3}{2}-1\\right)\\approx -0.134a'}</M>:
        negative, even though for <M>{'a>0'}</M> that strip sits above the axis. The total now matches option <b>B</b>.
        Differentiate to check: <M>{'\\tfrac{d}{dx}\\cos x=-\\sin x'}</M>, so the antiderivative of <M>{'\\sin x'}</M> is{' '}
        <M>{'-\\cos x'}</M>.
      </Notice>
    )
  } else if (matches.length > 1) {
    notice = (
      <Notice>
        At these values options <b>{matches.join(' and ')}</b> give the same number, so a test here can&apos;t separate
        them. Pick values that break the tie, such as <M>a = 2</M>, <M>b = 1</M>, where only <b>C</b> still matches
        the shaded area.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        The shaded area is two stacked pieces. The <b>blue</b> piece is <M>a</M> times the area under{' '}
        <M>{'\\sin x'}</M>, only <M>{'\\tfrac{2-\\sqrt3}{2}\\approx0.134'}</M>, because <M>{'\\sin x'}</M> starts at{' '}
        <M>0</M>. The <b>orange</b> piece is <M>b</M> times the area under <M>{'\\cos x'}</M>, which is{' '}
        <M>{'\\tfrac12'}</M>. So the answer is about <M>0.134a + 0.5b</M>: only <b>C</b> fits. Make <M>a</M> or{' '}
        <M>b</M> negative and that piece is subtracted, but C still matches.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, Math.PI / 2]} y={[-3, 3]} xStep={Math.PI / 12} yStep={1} height={300} xLabels={piLabel}>
        <Region top={lower} bottom={() => 0} from={0} to={P6} color={slip ? C.bad : C.f} opacity={0.4} />
        <Region top={upper} bottom={lower} from={0} to={P6} color={C.g} opacity={0.35} />
        <Line.Segment point1={[P6, -3]} point2={[P6, 3]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={lower} domain={[0, P6]} color={C.f} weight={2} style="dashed" />
        <Plot.OfX y={upper} domain={[0, Math.PI / 2]} color={C.ink} weight={3} />
        <Label at={[0.8, yEnd]} attach={yEnd >= 0 ? 'n' : 's'} size={12}>
          a sin x + b cos x
        </Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-2} max={2} step={0.5} format={v => num(v, 1)} />
        <Slider label="b" value={b} onChange={setB} min={-2} max={2} step={0.5} format={v => num(v, 1)} />
        <Toggle label="Use ∫ sin x dx = cos x (sign slip)" checked={slip} onChange={setSlip} />
        <Readouts>
          <Readout
            color={slip ? C.bad : C.f}
            tex={slip ? `\\left[a\\cos x\\right]_0^{\\pi/6} \\approx ${num(sinPart, 3)}` : `a\\cdot\\tfrac{2-\\sqrt3}{2} \\approx ${num(sinPart, 3)}`}
          />
          <Readout color={C.g} tex={`b\\cdot\\tfrac12 = ${num(cosPart, 3)}`} />
          <Readout tex={`\\int_0^{\\pi/6}\\bigl(a\\sin x+b\\cos x\\bigr)dx \\approx ${num(area, 3)}`} />
          {slip && <Readout color={C.bad} tex={`\\text{total with the slip} \\approx ${num(total, 3)}`} />}
        </Readouts>
        <div className="flex flex-wrap gap-1.5 text-[12.5px]">
          {OPTIONS.map(o => {
            const hit = matches.includes(o.l)
            return (
              <span
                key={o.l}
                className={`rounded-md border px-2 py-0.5 tabular-nums ${
                  hit
                    ? slip
                      ? 'border-red-400 bg-red-50 text-red-700 dark:border-red-500/70 dark:bg-red-950/30 dark:text-red-300'
                      : 'border-green-500 bg-green-50 text-green-800 dark:border-green-500/70 dark:bg-green-950/30 dark:text-green-300'
                    : 'border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400'
                }`}
              >
                <b>{o.l}</b> {num(o.v(a, b), 3)}
              </span>
            )
          })}
        </div>
        {notice}
      </Controls>
    </div>
  )
}
