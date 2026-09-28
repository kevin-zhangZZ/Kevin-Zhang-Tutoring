// 2019 Methods Exam 2 Q3c — why the maximum strength is about 1.76 and not 1 + 1 = 2. The signal
// is the sum of a fast wave sin(πt/3) (orange) and a slow wave sin(πt/6) (violet). At the slider's
// t the two contributions are stacked as bars, and their total is the point on f. The waves peak at
// different times (t = 1.5 and t = 3), so the best the sum can do is a trade-off in between, at
// t ≈ 1.79. Buttons jump to the fast peak, t = 2 (f(2) = √3 ≈ 1.73, one of the report's common wrong
// answers) and the true maximum.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

const fast = (t: number) => Math.sin((Math.PI * t) / 3)
const slow = (t: number) => Math.sin((Math.PI * t) / 6)
const f = (t: number) => fast(t) + slow(t)
// f'(t) = 0  <=>  4cos²u + cos u − 2 = 0 with u = πt/6
const T_MAX = (6 / Math.PI) * Math.acos((Math.sqrt(33) - 1) / 8)
const F_MAX = f(T_MAX)

export default function PeaksWidget() {
  const [t, setT] = useState(1.5)
  const s1 = fast(t)
  const s2 = slow(t)
  const y = s1 + s2
  const near = (v: number) => Math.abs(t - v) < 0.011
  const atMax = near(T_MAX)
  const dx = 0.07

  let notice
  if (near(1.5)) {
    notice = (
      <Notice>
        At <M>t = 1.5</M> the fast wave is at its peak of <M>1</M>, but the slow wave is only at{' '}
        <M>{'\\sin\\tfrac{\\pi}{4}\\approx0.71'}</M>, so <M>f(1.5)\approx1.71</M>. Now try the slow wave&apos;s peak at{' '}
        <M>t = 3</M>.
      </Notice>
    )
  } else if (near(3)) {
    notice = (
      <Notice>
        At <M>t = 3</M> the slow wave peaks at <M>1</M>, but the fast wave has fallen back to <M>0</M>, so{' '}
        <M>f(3) = 1</M>. The two peaks never line up, which is why the maximum can&apos;t be <M>1 + 1 = 2</M>.
      </Notice>
    )
  } else if (near(2)) {
    notice = (
      <Notice tone="warn">
        <M>{'f(2)=\\tfrac{\\sqrt3}{2}+\\tfrac{\\sqrt3}{2}=\\sqrt3\\approx1.73'}</M>, one of the report&apos;s common wrong
        answers. The peak is close to <M>t = 2</M> but not at it: nudge <M>t</M> a little to the left and the total
        still rises.
      </Notice>
    )
  } else if (atMax) {
    notice = (
      <Notice tone="good">
        <b>The best trade-off.</b> Here the fast wave has come down a little (<M>{s1.toFixed(2)}</M>) while the slow
        wave has climbed (<M>{s2.toFixed(2)}</M>), and the total <M>{F_MAX.toFixed(4)}</M> is as high as it gets, so the
        maximum strength is <M>1.76</M>. The <M>t</M>-value <M>1.79</M> is where it happens, not the strength.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The height of <M>f</M> is the orange bar plus the violet bar. Drag <M>t</M> and look for where the two bars
        together reach highest; it isn&apos;t where either wave peaks on its own.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 6.2]} y={[-1.2, 2.2]} xStep={1} yStep={0.5} height={300} xLabel="t" yLabels={v => (Number.isInteger(v) ? String(v) : '')}>
        <Line.Segment point1={[0, 2]} point2={[6.2, 2]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[6.1, 2]} color={C.guide} attach="sw">1 + 1 = 2 never happens</Label>
        <Plot.OfX y={fast} domain={[0, 6.2]} color={C.g} weight={2} style="dashed" />
        <Plot.OfX y={slow} domain={[0, 6.2]} color={C.violet} weight={2} style="dashed" />
        <Plot.OfX y={f} domain={[0, 6.2]} color={C.f} weight={3} />
        <Line.Segment point1={[t - dx, 0]} point2={[t - dx, s1]} color={C.g} weight={6} />
        <Line.Segment point1={[t + dx, s1]} point2={[t + dx, y]} color={C.violet} weight={6} />
        <Line.Segment point1={[t - dx, s1]} point2={[t + dx, s1]} color={C.guide} weight={1} />
        <Point x={t} y={y} color={C.f} />
        {atMax && <Point x={T_MAX} y={F_MAX} color={C.good} />}
        <Label at={[5.3, f(5.3)]} color={C.f} attach="s">f</Label>
        <Label at={[4.5, fast(4.5)]} color={C.g} attach="s">sin(πt/3)</Label>
        <Label at={[5.4, slow(5.4)]} color={C.violet} attach="ne">sin(πt/6)</Label>
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={6} step={0.01} />
        <Buttons>
          <ActionButton label="t = 1.5" onClick={() => setT(1.5)} />
          <ActionButton label="t = 2" onClick={() => setT(2)} />
          <ActionButton label="t = 3" onClick={() => setT(3)} />
          <ActionButton label="Maximum" onClick={() => setT(Math.round(T_MAX * 100) / 100)} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\sin\\left(\\tfrac{\\pi t}{3}\\right) = ${s1.toFixed(3)}`} />
          <Readout color={C.violet} tex={`\\sin\\left(\\tfrac{\\pi t}{6}\\right) = ${s2.toFixed(3)}`} />
          <Readout color={C.f} tex={`f(t) = ${y.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
