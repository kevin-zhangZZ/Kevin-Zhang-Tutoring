// 2018 Methods Exam 2 Q4g — the school-wide elite rate is a weighted average. The school is drawn
// as a strip of width 1: Year 12s take 1/7 of it and are elite at 5% (orange), everyone else takes
// 6/7 and is elite at an unknown rate x (sky). Part f's 0.0266 (dashed) is the rate for the whole
// school, so the total shaded area must equal 0.0266 × 1. The Year 12 column pokes above the line
// (green surplus, (1/7)(0.05 − 0.0266)); the others must sit below it by the same area, which
// happens at x ≈ 0.0227. A button tries the report's 6/7 × 0.0266 = 0.0228, which misses.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider } from './kit'

const PF = 1 - Math.exp(-0.027) // 0.026639, part f
const Y = 1 / 7
const RATE12 = 0.05
const X_TRUE = ((PF - RATE12 * Y) * 7) / 6 // 0.022745
const X_WRONG = (6 / 7) * PF // 0.022833

const rect = (x0: number, x1: number, y0: number, y1: number): [number, number][] => [
  [x0, y0], [x1, y0], [x1, y1], [x0, y1],
]

export default function Blend() {
  const [x, setX] = useState(PF)

  const total = RATE12 * Y + x * (1 - Y)
  const surplus = Y * (RATE12 - PF)
  const gap = (1 - Y) * (PF - x)
  const balanced = Math.abs(x - X_TRUE) < 0.00005
  const wrong = Math.abs(x - X_WRONG) < 0.00002
  const sameAsWhole = Math.abs(x - 0.0266) < 0.00005

  let notice
  if (balanced) {
    notice = (
      <Notice tone="good">
        <b>Balanced.</b> The green surplus above the line (Year 12s, <M>{'\\tfrac17'}</M> wide) exactly fills the gap
        below it (everyone else, <M>{'\\tfrac67'}</M> wide):{' '}
        <M>{'\\tfrac17(0.05-0.0266) = \\tfrac67(0.0266-x)'}</M>, so <M>x \approx 0.0227</M>. Part f.&apos;s rate is the
        weighted average of the two groups.
      </Notice>
    )
  } else if (wrong) {
    notice = (
      <Notice tone="warn">
        This is the report&apos;s common answer, <M>{'\\tfrac67\\times0.0266'}</M>. The total comes to{' '}
        <M>{total.toFixed(5)}</M>, not <M>{PF.toFixed(5)}</M>: too small a miss to see, but it is wrong in the fourth
        decimal place, which is exactly what is marked. That product is <M>{'\\Pr(E)\\Pr(Y\')'}</M>, not the elite
        rate <em>among</em> non-Year 12s, so it is only close by luck.
      </Notice>
    )
  } else if (sameAsWhole) {
    notice = (
      <Notice>
        What if non-Year 12s were elite at the school-wide <M>0.0266</M>? Then the Year 12 column still pokes above
        the line (the green surplus), and the total is <M>{total.toFixed(4)}</M>, more than <M>0.0266</M>: too many
        elites. The others must sit <b>below</b> the line by just enough to cancel that surplus. Lower <M>x</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Total elite share <M>{`= \\tfrac17(0.05)+\\tfrac67(${x.toFixed(4)}) = ${total.toFixed(4)}`}</M>, which is{' '}
        {total > PF ? 'too high' : 'too low'} against part f.&apos;s <M>0.0266</M>.{' '}
        {total > PF ? 'Lower' : 'Raise'} <M>x</M> until the green gap matches the Year 12 surplus.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 1]}
        y={[0, 0.06]}
        xStep={1 / 7}
        yStep={0.01}
        height={290}
        xLabel=""
        yLabel=""
        xLabels={v => (Math.abs(v - 1 / 7) < 1e-6 ? '1/7' : Math.abs(v - 1) < 1e-6 ? '1' : '')}
        yLabels={false}
      >
        <Polygon points={rect(0, Y, 0, Math.min(PF, RATE12))} color={C.g} fillOpacity={0.35} weight={1.5} />
        <Polygon points={rect(0, Y, PF, RATE12)} color={C.good} fillOpacity={0.45} weight={1.5} />
        <Polygon points={rect(Y, 1, 0, x)} color={C.f} fillOpacity={0.35} weight={1.5} />
        {x < PF && <Polygon points={rect(Y, 1, x, PF)} color={C.good} fillOpacity={0.2} weight={1} />}
        {x > PF && <Polygon points={rect(Y, 1, PF, x)} color={C.bad} fillOpacity={0.3} weight={1} />}
        <Line.Segment point1={[0, PF]} point2={[1, PF]} color={C.good} style="dashed" weight={2} />
        <Label at={[1, PF]} attach={x > PF - 0.004 ? 'sw' : 'nw'} color={C.good} size={12}>whole school (f.)</Label>
        <Label at={[Y / 2, RATE12]} attach="n" color={C.g} size={12}>Yr 12: 0.05</Label>
        <Label at={[0.42, Math.max(x, 0.004)]} attach="n" color={C.f} size={12}>{`others: ${x.toFixed(4)}`}</Label>
      </Plane>
      <Controls>
        <Slider label="x = \Pr(E\mid Y')" value={x} onChange={setX} min={0} max={0.05} step={0.0001} format={v => v.toFixed(4)} />
        <Buttons>
          <ActionButton label="Others at the whole-school rate" onClick={() => setX(PF)} />
          <ActionButton label="Try the report's 6/7 × 0.0266" onClick={() => setX(X_WRONG)} />
          <ActionButton label="Balance it" onClick={() => setX(X_TRUE)} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`\\text{Yr 12 surplus} = \\tfrac17(0.05-0.0266) = ${surplus.toFixed(5)}`} />
          <Readout
            color={x <= PF ? C.good : C.bad}
            tex={x <= PF ? `\\text{others' gap} = \\tfrac67(0.0266-x) = ${gap.toFixed(5)}` : `\\text{others above the line: } ${(-gap).toFixed(5)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
