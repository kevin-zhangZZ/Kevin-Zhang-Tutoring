// 2015 Methods Exam 1 Q7b — 3e^t = 5 + 8e^(−t) becomes 3a² − 5a − 8 = 0 with a = e^t.
// The parabola in a has two roots, a = −1 and a = 8/3, but as t runs over every real number
// the point a = e^t only ever moves along the positive a-axis (shaded region a ≤ 0 is
// unreachable). The readouts show the two sides of the ORIGINAL equation alongside the quadratic,
// so the student sees the quadratic is zero exactly when the original sides agree (since
// 3a² − 5a − 8 = a·(3e^t − 5 − 8e^(−t)) and a > 0).

import { useState } from 'react'
import { C, Label, M, Notice, Plane, Plot, Point, Region, Readout, Readouts, Controls, Slider } from './kit'

const p = (a: number) => 3 * a * a - 5 * a - 8
const T_ROOT = Math.log(8 / 3) // ≈ 0.981

export default function HiddenQuadratic() {
  const [t, setT] = useState(0)
  const a = Math.exp(t)
  const lhs = 3 * a
  const rhs = 5 + 8 / a
  const atRoot = Math.abs(t - T_ROOT) < 0.02

  let notice
  if (atRoot) {
    notice = (
      <Notice tone="good">
        <b>Here <M>{'e^t = \\tfrac83'}</M>, so <M>{'t = \\log_e\\!\\left(\\tfrac83\\right) \\approx 0.981'}</M>.</b> Both sides of the
        original equation equal 8, and the point sits on the parabola&apos;s right-hand root. This is the only solution.
      </Notice>
    )
  } else if (t < -1.5) {
    notice = (
      <Notice tone="warn">
        However negative <M>t</M> gets, <M>{'a = e^t'}</M> only creeps towards 0; it never reaches 0, let alone{' '}
        <M>a = -1</M>. That is why the root <M>a = -1</M> gives no value of <M>t</M>: <M>{'e^t = -1'}</M> has no solution.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Every value of <M>t</M> lands on the <b>positive</b> <M>a</M>-axis, since <M>{'e^t > 0'}</M>. Drag <M>t</M> right until
        the two sides of the original equation agree, then drag it far left and watch whether <M>a</M> can ever reach the
        red root.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2, 4]} y={[-12, 16]} xStep={1} yStep={4} height={320} xLabel="a" yLabel="">
        <Region top={() => 16} bottom={() => -12} from={-2} to={0} color={C.bad} opacity={0.1} />
        <Label at={[-1, -10]} color={C.bad} attach="c">eᵗ never here</Label>
        <Plot.OfX y={p} domain={[-2, 4]} color={C.f} weight={3} />
        <Label at={[3.4, p(3.4)]} color={C.f} attach="w">3a² − 5a − 8</Label>
        <Point x={-1} y={0} color={C.bad} />
        <Label at={[-1.1, -5]} color={C.bad} attach="c">a = −1</Label>
        <Point x={8 / 3} y={0} color={C.good} />
        <Label at={[8 / 3, 0]} color={C.good} attach="nw">a = 8/3</Label>
        <Point x={a} y={p(a)} color={atRoot ? C.good : C.g} />
        <Point x={a} y={0} color={atRoot ? C.good : C.g} />
        {!atRoot && <Label at={[a, 0]} color={C.g} attach="n">eᵗ</Label>}
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={-3} max={1.3} step={0.005} format={v => v.toFixed(3)} />
        <Readouts>
          <Readout color={atRoot ? C.good : C.g} tex={`a = e^{t} \\approx ${a.toFixed(3)}`} />
          <Readout tex={`3a^2-5a-8 \\approx ${p(a).toFixed(2)}`} />
          <Readout tex={`3e^t \\approx ${lhs.toFixed(2)},\\quad 5+8e^{-t} \\approx ${rhs.toFixed(2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
