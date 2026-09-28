// 2018 Specialist Exam 2 Q4d — "faster" means a longer velocity arrow. Left: v_A = i + (2t+2)j and
// v_B = 2t i + 2t j drawn from a common tail, with a dashed circle of radius |v_A|; B is slower while its
// tip is inside the circle, and the tip reaches the circle at t = 5/2. Right: speed of A − speed of B
// against t, positive for 0 ≤ t < 5/2 (the other root, t = −1/2, is before the race). A toggle swaps in
// the report's wrong idea — comparing position vectors |r_A| and |r_B| — which gives 1.402 < t < 3.720.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle,
  Vector,
} from './kit'

type V = [number, number]
const vA = (t: number): V => [1, 2 * t + 2]
const vB = (t: number): V => [2 * t, 2 * t]
const rA = (t: number): V => [t + 1, t * t + 2 * t]
const rB = (t: number): V => [t * t, t * t + 3]
const len = (v: V) => Math.hypot(v[0], v[1])
const dSpeed = (t: number) => Math.sqrt(4 * t * t + 8 * t + 5) - Math.sqrt(8) * Math.abs(t)
const dDist = (t: number) => len(rA(t)) - len(rB(t))
const R1 = 1.40217820576 // |r_A| = |r_B|
const R2 = 3.72034601754
const TMAX = 3.2

const f3 = (v: number) => v.toFixed(3)
const vec = (name: string, sub: string, v: V) =>
  `\\underset{\\sim}{${name}}_${sub} =${+v[0].toFixed(2)}\\,\\underset{\\sim}{i} + ${+v[1].toFixed(2)}\\,\\underset{\\sim}{j}`

export default function SpeedArrows() {
  const [t, setT] = useState(1)
  const [wrong, setWrong] = useState(false)

  const a = wrong ? rA(t) : vA(t)
  const b = wrong ? rB(t) : vB(t)
  const la = len(a)
  const lb = len(b)
  const sym = wrong ? 'r' : 'v'
  const atCross = !wrong && Math.abs(t - 2.5) < 0.01

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        These arrows are now <b>position</b> vectors from the buoy, so their lengths are distances from the buoy, not
        speeds. At <M>t = 0</M> B is further out (<M>3</M> km against <M>1</M> km) yet B is not moving at all.
        Comparing <M>{'\\left|\\underset{\\sim}{r}_A\\right| > \\left|\\underset{\\sim}{r}_B\\right|'}</M> gives{' '}
        <M>1.402 &lt; t &lt; 3.720</M> (red dashed graph): an answer to a different question.
      </Notice>
    )
  } else if (atCross) {
    notice = (
      <Notice tone="good">
        At <M>{'t = \\tfrac52'}</M> both arrows have length <M>{'\\sqrt{50} \\approx 7.071'}</M>: B&apos;s tip sits exactly
        on A&apos;s circle. That is the equation <M>4t^2 + 8t + 5 = 8t^2</M>. The arrows point in different directions,
        and that doesn&apos;t matter: speed ignores direction.
      </Notice>
    )
  } else if (t < 2.5) {
    notice = (
      <Notice>
        Speed is the <b>length</b> of the velocity arrow. The dashed circle has radius{' '}
        <M>{`\\left|\\underset{\\sim}{v}_A\\right| =${f3(la)}`}</M>; B&apos;s tip is inside it, so B is slower. B starts from rest{' '}
        (<M>{'\\underset{\\sim}{v}_B = \\underset{\\sim}{0}'}</M> at <M>t = 0</M>) but its arrow grows steadily. Drag{' '}
        <M>t</M> towards <M>2.5</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now B&apos;s tip is <b>outside</b> A&apos;s circle, so B is faster. A is faster only for{' '}
        <M>{'0 \\le t < \\tfrac52'}</M>, the green stretch of the graph. The graph&apos;s other zero, <M>t = -\tfrac12</M>,
        is before the race. Turn on the wrong idea to see what comparing position vectors does.
      </Notice>
    )
  }

  const pr: V = wrong ? [-1, 11] : [-1, 7]
  const qr: V = wrong ? [-1, 17] : [-1, 9]

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">
            {wrong ? 'Position vectors from the buoy' : 'Velocity vectors, drawn from one point'}
          </p>
          <Plane x={pr} y={qr} xStep={wrong ? 5 : 2} yStep={wrong ? 5 : 2} height={300} equalScale xLabel="" yLabel="">
            <Circle center={[0, 0]} radius={la} color={C.f} fillOpacity={0.06} strokeStyle="dashed" />
            <Vector tail={[0, 0]} tip={a} color={C.f} weight={3} />
            {lb > 0.02 ? <Vector tail={[0, 0]} tip={b} color={C.g} weight={3} /> : <Point x={0} y={0} color={C.g} />}
            <Label at={a} color={C.f} attach="e">A</Label>
            <Label at={b} color={C.g} attach={lb > 0.02 ? 'e' : 'se'}>B</Label>
          </Plane>
        </div>
        <div>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">
            {wrong ? (
              <>
                Speed of A − speed of B (violet), <M>{'\\left|\\underset{\\sim}{r}_A\\right| - \\left|\\underset{\\sim}{r}_B\\right|'}</M> (red)
              </>
            ) : (
              'Speed of A − speed of B'
            )}
          </p>
          <Plane x={[-1, 4]} y={[-3, 3]} xStep={1} yStep={1} height={300} xLabel="t" yLabel="">
            <Region top={() => 3} bottom={() => -3} from={-1} to={0} color={C.guide} opacity={0.18} />
            <Region top={dSpeed} bottom={() => 0} from={0} to={2.5} color={C.good} opacity={0.22} />
            <Plot.OfX y={dSpeed} domain={[-1, 0]} color={C.violet} weight={2} style="dashed" />
            <Plot.OfX y={dSpeed} domain={[0, 4]} color={C.violet} weight={3} />
            {wrong && <Plot.OfX y={dDist} domain={[0, 4]} color={C.bad} weight={3} style="dashed" />}
            {wrong && <Point x={R1} y={0} color={C.bad} />}
            {wrong && <Point x={R2} y={0} color={C.bad} />}
            <Point x={2.5} y={0} color={C.good} />
            <Label at={[2.5, 0]} color={C.good} attach="ne">5/2</Label>
            <Point x={-0.5} y={0} color={C.guide} />
            <Label at={[-0.5, -1.8]} color={C.guide} attach="c">before</Label>
            <Label at={[-0.5, -2.35]} color={C.guide} attach="c">t = 0</Label>
            <Point x={t} y={dSpeed(t)} color={C.violet} />
          </Plane>
        </div>
      </div>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={0} max={TMAX} step={0.005} format={v => `${v.toFixed(3)} h`} />
        <Buttons>
          <ActionButton label="t = 5/2" onClick={() => setT(2.5)} />
          <Toggle label="Wrong idea: compare distances from the buoy" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={vec(sym, 'A', a)} />
          <Readout color={C.g} tex={vec(sym, 'B', b)} />
          <Readout color={C.f} tex={`\\left|\\underset{\\sim}{${sym}}_A\\right| = ${f3(la)}`} />
          <Readout color={C.g} tex={`\\left|\\underset{\\sim}{${sym}}_B\\right| = ${f3(lb)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
