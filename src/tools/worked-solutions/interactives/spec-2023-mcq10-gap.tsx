// 2023 Specialist Exam 2 MCQ 10 — why Iₙ = nIₙ₋₁ − 1. For n = 1…4 it shades Iₙ, the area under
// y = (1 − x)ⁿeˣ (blue), and the extra area up to y = n(1 − x)ⁿ⁻¹eˣ (orange), whose total is
// nIₙ₋₁. The orange gap is always exactly 1: by the product rule its height at each x is the rate
// the blue curve is falling, and the blue curve falls from 1 at x = 0 to 0 at x = 1 (violet dots,
// the boundary term [uv]₀¹ = −1). Areas are computed numerically (Simpson), not from the
// recurrence. A toggle shows option C (the chain-rule minus sign lost) giving a negative value
// for a positive area.

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, integrate } from './kit'

const SUB = '₀₁₂₃₄₅₆₇₈₉'
const sub = (k: number) => String(k).split('').map(d => SUB[Number(d)]).join('')

// TeX for (1 − x)^k, omitting the index when k = 1 and dropping the factor when k = 0.
const pow = (k: number) => (k === 0 ? '' : k === 1 ? '(1-x)' : `(1-x)^{${k}}`)

export default function Gap() {
  const [n, setN] = useState(2)
  const [showC, setShowC] = useState(false)

  const blue = (x: number) => Math.pow(1 - x, n) * Math.exp(x)
  const orange = (x: number) => n * Math.pow(1 - x, n - 1) * Math.exp(x)
  const In = integrate(blue, 0, 1, 400)
  const nIprev = integrate(orange, 0, 1, 400)
  const gap = nIprev - In
  const optC = -1 - nIprev

  // Region labels: Iₙ inside the blue area near x = 0.12; "gap" where the gap is widest.
  const xs = Array.from({ length: 41 }, (_, i) => i / 40)
  const gx = xs.reduce((best, x) => (orange(x) - blue(x) > orange(best) - blue(best) ? x : best), 0)
  const gxL = Math.min(Math.max(gx, 0.15), 0.8)
  const coef = n === 1 ? '' : String(n)
  const nI = `${coef}I_{${n - 1}}`

  const notice = showC ? (
    <Notice tone="warn">
      Lose the chain-rule minus sign, writing <M>{'\\tfrac{du}{dx} = n(1-x)^{n-1}'}</M>, and the parts formula gives{' '}
      <M>{'I_n = -1 - nI_{n-1}'}</M> (option C). Here that is <M>{`-1 - ${nI} \\approx ${optC.toFixed(3)}`}</M>, a negative
      number. But <M>{`I_${n}`}</M> is the blue area, above the x-axis, so it must be positive. Option D,{' '}
      <M>{'-nI_{n-1}'}</M>, is negative too.
    </Notice>
  ) : (
    <Notice>
      The blue area is <M>{`I_${n} \\approx ${In.toFixed(3)}`}</M>; the whole area under the orange curve is{' '}
      <M>{`${nI} \\approx ${nIprev.toFixed(3)}`}</M>. Step <M>n</M> from 1 to 4: the orange gap between them is always
      exactly 1, so <M>{'I_n = nI_{n-1} - 1'}</M>. That 1 is the boundary term: the blue curve falls from height 1
      at <M>x = 0</M> to 0 at <M>x = 1</M> (violet dots), so <M>{'\\left[(1-x)^ne^x\\right]_0^1 = -1'}</M>, a number, unlike
      option E. Then turn on option C.
    </Notice>
  )

  return (
    <div>
      <Plane x={[-0.08, 1.08]} y={[-0.25, 4.4]} xStep={0.25} yStep={1} height={320}>
        <Region top={orange} bottom={blue} from={0} to={1} color={C.g} opacity={0.25} />
        <Region top={blue} bottom={() => 0} from={0} to={1} color={C.f} opacity={0.3} />
        <Plot.OfX y={orange} domain={[0, 1]} color={C.g} weight={3} />
        <Plot.OfX y={blue} domain={[0, 1]} color={C.f} weight={3} />
        <Point x={0} y={1} color={C.violet} />
        <Point x={1} y={0} color={C.violet} />
        <Label at={[0.12, blue(0.12) / 2]} color={C.f} attach="c" size={13}>{`I${sub(n)}`}</Label>
        <Label at={[gxL, (orange(gxL) + blue(gxL)) / 2]} color={C.g} attach="c" size={13}>gap</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={4} step={1} format={v => v.toFixed(0)} />
        <Toggle label="Lose the chain-rule minus (option C)" checked={showC} onChange={setShowC} />
        <Readouts>
          <Readout color={C.f} tex={`I_${n} = \\int_0^1 ${pow(n)}e^x\\,dx \\approx ${In.toFixed(3)}`} />
          <Readout color={C.g} tex={`${nI} = \\int_0^1 ${coef}${pow(n - 1)}e^x\\,dx \\approx ${nIprev.toFixed(3)}`} />
          <Readout color={C.good} tex={`\\text{gap} = ${nI} - I_${n} \\approx ${gap.toFixed(3)}`} />
          <Readout color={C.violet} tex={`\\left[${pow(n)}e^x\\right]_0^1 = 0 - 1 = -1`} />
          {showC && <Readout color={C.bad} tex={`\\text{C: }{-1} - ${nI} \\approx ${optC.toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
