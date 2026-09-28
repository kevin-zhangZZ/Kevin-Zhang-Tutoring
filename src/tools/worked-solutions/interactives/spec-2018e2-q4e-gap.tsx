// 2018 Specialist Exam 2 Q4e — the distance between the yachts is |r_B − r_A|, the length of the arrow
// from A to B. Top: the yachts near the crossing with that arrow and a 0.2 km circle around A. Bottom:
// |r_B − r_A| against t, which dips under 0.2 only for 1.529 < t < 1.597 h (4.1 minutes; closest
// 0.174 km at t ≈ 1.563). A toggle adds the report's misconception |r_B| − |r_A| (difference of
// distances from the buoy): it is 0 at t ≈ 1.402 while the yachts are 0.478 km apart, and "< 0.2"
// would hold from t ≈ 1.233 to t ≈ 3.900 h, i.e. 160 minutes.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider,
  Toggle, Vector,
} from './kit'

type V = [number, number]
const rA = (t: number): V => [t + 1, t * t + 2 * t]
const rB = (t: number): V => [t * t, t * t + 3]
const len = (v: V) => Math.hypot(v[0], v[1])
const gap = (t: number) => Math.sqrt(t ** 4 - 2 * t ** 3 + 3 * t * t - 10 * t + 10)
const wrongGap = (t: number) => len(rB(t)) - len(rA(t))
const T_IN = 1.52883055247
const T_OUT = 1.59733643352
const T_MIN = 1.56338475187
const T_EQ = 1.40217820576 // |r_A| = |r_B|
const T_W1 = 1.23298814110 // |r_B| − |r_A| = 0.2

const f3 = (v: number) => v.toFixed(3)
const lab = (v: number) => String(+v.toFixed(2))

export default function Gap() {
  const [t, setT] = useState(1.45)
  const [wrong, setWrong] = useState(false)
  const A = rA(t)
  const B = rB(t)
  const d = gap(t)
  const w = wrongGap(t)
  const inside = d < 0.2

  let notice
  if (wrong && Math.abs(t - T_EQ) < 0.004) {
    notice = (
      <Notice tone="warn">
        At <M>t \approx 1.402</M> both yachts are exactly <M>5.341</M> km from the buoy, so{' '}
        <M>{'\\left|\\underset{\\sim}{r}_B\\right| - \\left|\\underset{\\sim}{r}_A\\right| = 0'}</M>, yet the violet arrow shows they are{' '}
        <M>0.478</M> km apart. Two boats can be the same distance from the buoy in quite different directions. Taken as the
        gap, the red curve stays under <M>0.2</M> from <M>t \approx 1.233</M> to <M>t \approx 3.900</M>: &ldquo;160
        minutes&rdquo;.
      </Notice>
    )
  } else if (wrong) {
    notice = (
      <Notice tone="warn">
        The red dashed curve is <M>{'\\left|\\underset{\\sim}{r}_B\\right| - \\left|\\underset{\\sim}{r}_A\\right|'}</M>: how much further B is
        from the <b>buoy</b> than A is. It says nothing about the distance between the yachts, and it can even be
        negative. Press &ldquo;Same distance from buoy&rdquo; to see it read <M>0</M> while the yachts are clearly apart.
      </Notice>
    )
  } else if (inside) {
    notice = (
      <Notice tone="good">
        B is inside the <M>0.2</M> km circle around A: too close. This lasts only from <M>t \approx 1.529</M> to{' '}
        <M>t \approx 1.597</M> h, which is <M>0.0685</M> h <M>\approx 4.1</M> minutes. Closest approach is{' '}
        <M>0.174</M> km at <M>t \approx 1.563</M>. Since <M>{'t < \\tfrac52'}</M> here, A is the faster yacht (part d), so
        A would take the time penalty.
      </Notice>
    )
  } else if (t < T_IN) {
    notice = (
      <Notice>
        The violet arrow is <M>{'\\underset{\\sim}{r}_B - \\underset{\\sim}{r}_A'}</M>: it runs from A to B, so its{' '}
        <b>length</b> is the distance between the yachts. Slide <M>t</M> forward and watch it shrink. The violet graph
        is that length; the rule is broken wherever it is below the dashed <M>0.2</M> line.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The yachts are separating again. The distance was under <M>0.2</M> km only for the short green window, about{' '}
        <M>4.1</M> minutes. Now turn on the wrong idea to see what <M>{'\\left|\\underset{\\sim}{r}_B\\right| - \\left|\\underset{\\sim}{r}_A\\right|'}</M>{' '}
        does.
      </Notice>
    )
  }

  return (
    <div>
      <div className="max-w-[420px] mx-auto">
      <Plane x={[1.9, 3.1]} y={[4.7, 6.6]} xStep={0.5} yStep={0.5} height={360} equalScale labels={lab}>
        <Plot.Parametric xy={rA} domain={[1.3, 1.85]} color={C.f} weight={2} opacity={0.5} />
        <Plot.Parametric xy={rB} domain={[1.3, 1.85]} color={C.g} weight={2} opacity={0.5} />
        <Circle
          center={A}
          radius={0.2}
          color={inside ? C.bad : C.guide}
          fillOpacity={inside ? 0.18 : 0.06}
          strokeStyle="dashed"
        />
        {d > 0.03 && <Vector tail={A} tip={B} color={C.violet} weight={3} />}
        <Point x={A[0]} y={A[1]} color={C.f} />
        <Point x={B[0]} y={B[1]} color={C.g} />
        <Label at={A} color={C.f} attach="e" gap={24}>A</Label>
        <Label at={B} color={C.g} attach="w" gap={9}>B</Label>
      </Plane>
      </div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-3 mb-1">
        Distance between the yachts (violet){wrong ? ' and the wrong quantity (red)' : ''} against <M>t</M> (hours)
      </p>
      <Plane x={[1.2, 2]} y={[-0.6, 1.2]} xStep={0.2} yStep={0.2} height={230} labels={lab} xLabel="t" yLabel="">
        {wrong && <Region top={() => 0.2} bottom={wrongGap} from={T_W1} to={2} color={C.bad} opacity={0.14} />}
        <Region top={() => 1.2} bottom={() => -0.6} from={T_IN} to={T_OUT} color={C.good} opacity={0.22} />
        <Line.Segment point1={[1.2, 0.2]} point2={[2, 0.2]} color={C.bad} style="dashed" weight={2} />
        <Label at={[2, 0.2]} color={C.bad} attach="nw">0.2 km</Label>
        <Label at={[1.2, 0.6]} color={C.guide} attach="e">0.6</Label>
        <Label at={[1.2, -0.4]} color={C.guide} attach="e">−0.4</Label>
        <Line.Segment point1={[t, -0.6]} point2={[t, 1.2]} color={C.guide} style="dashed" weight={1} />
        <Plot.OfX y={gap} domain={[1.2, 2]} color={C.violet} weight={3} />
        {wrong && <Plot.OfX y={wrongGap} domain={[1.2, 2]} color={C.bad} weight={3} style="dashed" />}
        <Point x={t} y={d} color={C.violet} />
        {wrong && <Point x={t} y={w} color={C.bad} />}
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={setT} min={1.4} max={1.75} step={0.001} format={v => `${v.toFixed(3)} h`} />
        <Buttons>
          <ActionButton label="Enters 0.2 km" onClick={() => setT(T_IN)} />
          <ActionButton label="Closest" onClick={() => setT(T_MIN)} />
          <ActionButton label="Leaves 0.2 km" onClick={() => setT(T_OUT)} />
          {wrong && <ActionButton label="Same distance from buoy" onClick={() => setT(T_EQ)} />}
          <Toggle
            label="Wrong idea: subtract distances from the buoy"
            checked={wrong}
            onChange={setWrong}
          />
        </Buttons>
        <Readouts>
          <Readout tex={`t = ${f3(t)}\\text{ h} = ${(t * 60).toFixed(1)}\\text{ min}`} />
          <Readout color={C.violet} tex={`\\left|\\underset{\\sim}{r}_B - \\underset{\\sim}{r}_A\\right| = ${f3(d)}\\text{ km}`} />
          {wrong && <Readout color={C.bad} tex={`\\left|\\underset{\\sim}{r}_B\\right| - \\left|\\underset{\\sim}{r}_A\\right| = ${f3(w)}`} />}
          {wrong && <Readout tex={`\\left|\\underset{\\sim}{r}_A\\right| = ${f3(len(A))},\\ \\left|\\underset{\\sim}{r}_B\\right| = ${f3(len(B))}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
