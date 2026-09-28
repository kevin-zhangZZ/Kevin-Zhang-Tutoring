// 2018 Specialist Exam 2 Q4c — why x² − x − 4 = 0 has two roots but the paths cross only once. The
// cartesian curves y = x² − 1 and y = x + 3 (dashed) meet twice, but for t ≥ 0 yacht A only traces
// x ≥ 1 and yacht B only x ≥ 0 (solid). Dragging t below 0 (before the race) sends A back down the
// left arm of the parabola to the false point (−1.562, 1.438) at t ≈ −2.562, while B — whose x = t² can
// never be negative — never reaches it at all.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

type V = [number, number]
const rA = (t: number): V => [t + 1, t * t + 2 * t]
const rB = (t: number): V => [t * t, t * t + 3]
const XR = (1 + Math.sqrt(17)) / 2 // ≈ 2.5616, the real crossing
const XF = (1 - Math.sqrt(17)) / 2 // ≈ −1.5616, the rejected root
const REAL: V = [XR, XR + 3]
const FAKE: V = [XF, XF + 3]
const T_FAKE = XF - 1 // ≈ −2.5616, when A would be at the false point
const XMIN = -2.5
const XMAX = 4.5
const YMAX = 9

const f3 = (v: number) => v.toFixed(3)

export default function Domain() {
  const [t, setT] = useState(1)
  const A = rA(t)
  const B = rB(t)
  const atFake = Math.abs(t - T_FAKE) < 0.02
  const bOff = B[0] > XMAX || B[1] > YMAX
  const aOff = A[1] > YMAX

  let notice
  if (atFake) {
    notice = (
      <Notice tone="warn">
        At <M>t \approx -2.562</M>, A is at the second solution <M>(-1.562,\ 1.438)</M>, but that is <M>2.56</M> hours{' '}
        <b>before</b> the race, and the question says <M>t \ge 0</M>. B could never be there at any time: it would need{' '}
        <M>t^2 = -1.562</M>. The point is on neither yacht&apos;s path, so reject <M>{'x = \\tfrac{1-\\sqrt{17}}{2}'}</M>.
      </Notice>
    )
  } else if (t < 0) {
    notice = (
      <Notice tone="warn">
        Negative <M>t</M> is time before the race, which <M>t \ge 0</M> rules out. A backs along the rest of the
        parabola (red), where <M>x_A = t + 1 &lt; 1</M>. B goes nowhere new: <M>x_B = t^2</M> is positive for negative{' '}
        <M>t</M> too, so B just retraces its own half-line. Keep dragging to <M>t \approx -2.56</M>, or use the button.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        For <M>t \ge 0</M> the yachts start at <M>(1,\ 0)</M> and <M>(0,\ 3)</M> and only ever trace the <b>solid</b>{' '}
        parts: <M>y = x^2 - 1</M> for <M>x \ge 1</M> and <M>y = x + 3</M> for <M>x \ge 0</M>. The dashed parts are what
        the cartesian equations add once <M>t</M> is forgotten, and that is where the second root of{' '}
        <M>x^2 - x - 4 = 0</M> lives. Drag <M>t</M> below <M>0</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[XMIN, XMAX]} y={[-1.5, YMAX]} xStep={1} yStep={1} height={340}>
        <Plot.OfX y={x => x * x - 1} domain={[XMIN, 3.3]} color={C.guide} style="dashed" weight={2} />
        <Plot.OfX y={x => x + 3} domain={[XMIN, XMAX]} color={C.guide} style="dashed" weight={2} />
        <Plot.Parametric xy={rA} domain={[0, 2.2]} color={C.f} weight={3} />
        <Plot.Parametric xy={rB} domain={[0, 2.2]} color={C.g} weight={3} />
        {t < -0.01 && <Plot.Parametric xy={rA} domain={[t, 0]} color={C.bad} weight={4} />}
        <Label at={[-2.2, (-2.2) ** 2 - 1]} color={C.guide} attach="e">y = x² − 1</Label>
        <Label at={[-2.3, 0.7]} color={C.guide} attach="se">y = x + 3</Label>
        <Point x={REAL[0]} y={REAL[1]} color={C.good} />
        <Label at={REAL} color={C.good} attach="se" gap={9}>(2.562, 5.562)</Label>
        <Point x={FAKE[0]} y={FAKE[1]} color={C.bad} />
        <Label at={FAKE} color={C.bad} attach="e" gap={9}>rejected</Label>
        {!aOff && <Point x={A[0]} y={A[1]} color={C.f} />}
        {!aOff && <Label at={A} color={C.f} attach="nw">A</Label>}
        {!bOff && <Point x={B[0]} y={B[1]} color={C.g} />}
        {!bOff && <Label at={B} color={C.g} attach="se">B</Label>}
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={-3} max={2} step={0.005} format={v => v.toFixed(3)} />
        <Buttons>
          <ActionButton label="Go to t ≈ −2.562" onClick={() => setT(T_FAKE)} />
          <ActionButton label="Back to t = 1" onClick={() => setT(1)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`A = (${f3(A[0])},\\ ${f3(A[1])})`} />
          <Readout color={C.g} tex={`B = (${f3(B[0])},\\ ${f3(B[1])})${bOff ? '\\ \\text{(off the grid)}' : ''}`} />
          <Readout tex={`x_A = t+1 = ${f3(A[0])},\\ \\ x_B = t^2 = ${f3(B[0])}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
