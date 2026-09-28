// 2019 Methods Exam 2 Q3a — why the period of f(t) = sin(πt/3) + sin(πt/6) is 12. Slide a copy of
// the graph P units left (the dashed curve y = f(t + P)) and see when it lands back on f. The
// readouts track how many cycles each wave has done in P: the copy only fits when BOTH counts are
// whole numbers, which first happens at P = 12, the LCM of 6 and 12. Starts at P = 6, the most
// common wrong answer, where the fast wave is back in step but the slow one is upside down.

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Readout, Readouts, Slider } from './kit'

const f = (t: number) => Math.sin((Math.PI * t) / 3) + Math.sin((Math.PI * t) / 6)
const isWhole = (v: number) => Math.abs(v - Math.round(v)) < 1e-9

function cycles(v: number) {
  return isWhole(v) ? String(Math.round(v)) : v.toFixed(2).replace(/0$/, '')
}

export default function PeriodWidget() {
  const [P, setP] = useState(6)

  let gap = 0
  for (let i = 0; i <= 240; i++) {
    const t = (24 * i) / 240
    gap = Math.max(gap, Math.abs(f(t + P) - f(t)))
  }
  const fits = gap < 1e-6
  const fast = P / 6
  const slow = P / 12
  const copyColor = fits ? C.good : C.g

  let notice
  if (P === 0) {
    notice = (
      <Notice>
        With no shift the copy sits on top of <M>f</M> trivially. Drag <M>P</M> to the right and watch for the
        first time the dashed copy lands back on the blue curve.
      </Notice>
    )
  } else if (P === 6) {
    notice = (
      <Notice tone="warn">
        <b><M>P = 6</M> fails.</b> The fast wave <M>{'\\sin\\left(\\tfrac{\\pi t}{3}\\right)'}</M> has done exactly one
        cycle, so it is back in step, but the slow wave has done only half a cycle and is upside down:{' '}
        <M>{'f(t+6)=\\sin\\left(\\tfrac{\\pi t}{3}\\right)-\\sin\\left(\\tfrac{\\pi t}{6}\\right)'}</M>. Look how the
        dashed copy misses. Now drag <M>P</M> to <M>12</M>.
      </Notice>
    )
  } else if (P === 12) {
    notice = (
      <Notice tone="good">
        <b>The copy fits.</b> In <M>12</M> units the fast wave has done <M>2</M> whole cycles and the slow wave{' '}
        <M>1</M>, so both are back where they started together. <M>12</M> is the lowest common multiple of{' '}
        <M>6</M> and <M>12</M>, and no smaller shift works, so the period is <M>12</M>.
      </Notice>
    )
  } else if (P === 18) {
    notice = (
      <Notice tone="warn">
        <M>18</M> (another answer the report lists) fails as well: the fast wave has done <M>3</M> cycles, but the
        slow wave has done <M>1.5</M>, so it is upside down again. Both counts must be whole numbers.
      </Notice>
    )
  } else if (P === 24) {
    notice = (
      <Notice>
        <M>24</M> also fits (<M>4</M> and <M>2</M> cycles), but it is two periods. The period is the{' '}
        <em>smallest</em> positive shift that fits, which is <M>12</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The dashed copy lands on <M>f</M> only when <b>both</b> waves have done a whole number of cycles. Watch the
        two readouts: the fast wave is whole every <M>6</M> units, the slow wave every <M>12</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 24.5]} y={[-2.2, 2.2]} xStep={2} yStep={1} height={260} xLabel="t" xLabels={v => (v % 4 === 0 && v >= 0 && v <= 24 ? String(v) : '')}>
        <Plot.OfX y={f} domain={[0, 24.5]} color={C.f} weight={3} />
        <Plot.OfX y={t => f(t + P)} domain={[0, 24.5]} color={copyColor} weight={2.5} style="dashed" />
        <Label at={[14.5, 1.75]} color={C.f} attach="e">y = f(t)</Label>
        <Label at={[22.3, -1.95]} color={copyColor} attach="w">{`copy: y = f(t + ${P})`}</Label>
      </Plane>
      <Controls>
        <Slider label="P" value={P} onChange={setP} min={0} max={24} step={1} format={v => v.toFixed(0)} />
        <Readouts>
          <Readout
            color={isWhole(fast) ? C.good : C.bad}
            tex={`\\sin\\left(\\tfrac{\\pi t}{3}\\right)\\text{: } \\tfrac{P}{6} = ${cycles(fast)}\\text{ cycle${isWhole(fast) && Math.round(fast) === 1 ? '' : 's'}}`}
          />
          <Readout
            color={isWhole(slow) ? C.good : C.bad}
            tex={`\\sin\\left(\\tfrac{\\pi t}{6}\\right)\\text{: } \\tfrac{P}{12} = ${cycles(slow)}\\text{ cycle${isWhole(slow) && Math.round(slow) === 1 ? '' : 's'}}`}
          />
          <Readout color={copyColor} tex={fits ? `\\text{copy fits } \\checkmark` : `\\text{biggest gap} \\approx ${gap.toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
