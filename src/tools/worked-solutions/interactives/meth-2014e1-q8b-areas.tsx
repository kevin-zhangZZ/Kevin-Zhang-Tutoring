// 2014 Methods Exam 1 Q8b — a conditional probability is a ratio of two AREAS under the density.
// The violet region X ≤ m has area ½ (the median); the blue region X < a sits inside it while
// a ≤ m, so Pr(X < a | X ≤ m) = blue ÷ ½. Starts at a = 1 (the question). A toggle shows the
// report's most common error — dividing by m ≈ 3.47, a position on the x-axis, not an area —
// and dragging a past m shows why the question says m > 1. Numbers checked with sympy:
// Pr(X<1) = 1 − e^{−1/5} ≈ 0.1813, answer ≈ 0.3625, wrong ÷m version ≈ 0.0523.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const f = (x: number) => Math.exp(-x / 5) / 5
const F = (x: number) => 1 - Math.exp(-x / 5)
const MED = 5 * Math.log(2)
const zero = () => 0

export default function Areas() {
  const [a, setA] = useState(1)
  const [wrong, setWrong] = useState(false)

  const past = a > MED
  const blue = F(Math.min(a, MED))
  const cond = blue / 0.5
  const bad = blue / MED
  const atOne = Math.abs(a - 1) < 0.01

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>m \approx 3.47</M> is a <b>place on the <M>x</M>-axis</b>, not an area, so it cannot be{' '}
        <M>\Pr(X\le m)</M>. Dividing by it gives about <M>{bad.toFixed(3)}</M>, which is even smaller than the blue
        area itself. Conditioning on an event that contains the blue region can only make its probability bigger, so that is a red flag.
      </Notice>
    )
  } else if (past) {
    notice = (
      <Notice>
        Now <M>a</M> is past <M>m</M>: the blue region spills outside the violet one, so the overlap is just{' '}
        <M>X\le m</M> and the answer becomes <M>1</M>. That is why the question tells you <M>m</M> is greater than 1.
      </Notice>
    )
  } else if (atOne) {
    notice = (
      <Notice tone="good">
        At <M>a = 1</M> the blue area is <M>{'1-e^{-1/5}\\approx 0.181'}</M>. It lies inside the violet area{' '}
        <M>\tfrac12</M>, so the answer is <M>{'0.181 \\div \\tfrac12 \\approx 0.363'}</M>. Turn on the toggle to see
        the common error.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The blue area stays inside the violet one while <M>a\le m</M>, so the answer is always blue <M>\div\tfrac12</M>.
        Drag <M>a</M> past <M>m</M> to see what changes.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 8]} y={[0, 0.23]} xStep={1} yStep={0.05} yLabels={v => (v > 0.19 ? "" : v.toFixed(2))} height={280} label="Density of X with the regions X ≤ m and X < a shaded">
        <Region top={f} bottom={zero} from={0} to={MED} color={C.violet} opacity={0.18} />
        <Region top={f} bottom={zero} from={0} to={Math.min(a, MED)} color={C.f} opacity={0.45} />
        <Plot.OfX y={f} domain={[0, 8]} color={C.ink} weight={2.5} />
        <Line.Segment point1={[MED, 0]} point2={[MED, 0.2]} color={C.violet} style="dashed" weight={2} />
        <Label at={[MED, 0.2]} color={C.violet} attach="n">m ≈ 3.47</Label>
        <Line.Segment point1={[a, 0]} point2={[a, 0.215]} color={C.f} weight={2} />
        <Label at={[a, 0.215]} color={C.f} attach={a > 6 ? 'w' : 'e'}>a</Label>
        <Label at={[2.3, 0.035]} color={C.violet} attach="c">area ½</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={0} max={6} step={0.05} />
        <Buttons>
          <Toggle label="Divide by m instead (the common error)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\Pr(X<${a.toFixed(2)}\\cap X\\le m) \\approx ${blue.toFixed(3)}`} />
          <Readout color={C.violet} tex={`\\Pr(X\\le m) = \\tfrac12`} />
          {wrong ? (
            <Readout color={C.bad} tex={`${blue.toFixed(3)} \\div ${MED.toFixed(2)} \\approx ${bad.toFixed(3)}\\ \\text{(wrong)}`} />
          ) : (
            <Readout color={C.good} tex={`\\Pr(X<${a.toFixed(2)}\\mid X\\le m) \\approx ${cond.toFixed(3)}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
