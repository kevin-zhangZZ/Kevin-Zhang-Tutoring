// 2016 Methods Exam 2 MCQ 19 (15% correct) — E(X) = 5b² + 4b, but only some b give a genuine
// probability distribution: every probability (a = 0.8 − 4b, b, 2b) must be ≥ 0, so 0 ≤ b ≤ 0.2.
// Slide b along the parabola: outside the green strip a probability goes negative. The
// parabola's turning point (−0.4, −0.8) is where the −0.8 in options A and B (41%) comes from,
// and b = 0.4 gives E(X) = 2.4 (option C) but a = −0.8. Inside the strip E(X) runs from 0 to 1.

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, num } from './kit'

const E = (b: number) => 5 * b * b + 4 * b

export default function AllowedB() {
  const [b, setB] = useState(0.1)
  const a = 0.8 - 4 * b
  const valid = b >= -1e-9 && b <= 0.2 + 1e-9
  const dot = valid ? C.good : C.bad

  let notice
  if (b < -1e-9) {
    notice = (
      <Notice tone="warn">
        Here <M>{`\\Pr(X=0)=b=${num(b)}`}</M> is <b>negative</b>, so this is not a probability distribution. The
        parabola&apos;s lowest point <M>(-0.4,\,-0.8)</M> is where the <M>-0.8</M> in options A and B comes from, but it
        needs <M>b=-0.4</M>. Slide right into the green strip.
      </Notice>
    )
  } else if (b > 0.2 + 1e-9) {
    notice = (
      <Notice tone="warn">
        Now <M>{`a=0.8-4b=${num(a)}`}</M> is <b>negative</b>, so this is not a distribution either.
        {Math.abs(b - 0.4) < 0.01 ? (
          <> This is option C&apos;s <M>2.4</M>: it needs <M>a=-0.8</M>.</>
        ) : (
          <> Going this far (e.g. <M>b=0.4</M>, giving option C&apos;s <M>2.4</M>) ignores <M>{'a\\ge0'}</M>.</>
        )}{' '}
        Slide back to <M>b=0.2</M>, where <M>a=0</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Every probability is <M>{'\\ge0'}</M>, so this is a genuine distribution. On <M>{'0\\le b\\le0.2'}</M> the curve
        only rises, so <M>\mathrm E(X)</M> runs from <M>0</M> (at <M>b=0</M>) up to <M>1</M> (at <M>b=0.2</M>, where{' '}
        <M>a=0</M>). Try sliding outside the strip.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.5, 0.48]} y={[-1.1, 3.4]} xStep={0.2} yStep={1} xLabels={v => (Math.abs(v) > 0.45 ? '' : num(v, 1))} height={320} xLabel="b" yLabel="E(X)">
        <Region top={() => 3.4} bottom={() => -1.1} from={0} to={0.2} color={C.good} opacity={0.15} />
        <Plot.OfX y={E} domain={[-0.5, 0.48]} color={C.f} weight={3} />
        <Point x={-0.4} y={-0.8} color={C.bad} />
        <Label at={[-0.4, -0.8]} color={C.bad} attach="s">(−0.4, −0.8)</Label>
        <Point x={b} y={E(b)} color={dot} />
        <Label at={[0.1, 2.5]} color={C.good} attach="c">allowed</Label>
      </Plane>
      <Controls>
        <Slider label="b" value={b} onChange={setB} min={-0.48} max={0.45} step={0.01} />
        <Readouts>
          <Readout color={a < -1e-9 ? C.bad : undefined} tex={`a = 0.8-4b = ${num(a)}`} />
          <Readout color={b < -1e-9 ? C.bad : undefined} tex={`b = ${num(b)},\\ 2b = ${num(2 * b)}`} />
          <Readout color={dot} tex={`\\mathrm E(X) = 5b^2+4b = ${num(E(b))}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
