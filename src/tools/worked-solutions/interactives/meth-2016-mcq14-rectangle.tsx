// 2016 Methods Exam 2 MCQ 14 (37% correct) — slide the corner (u, v) along y = 4 − x² and watch
// the rectangle's area A(u) = u(4 − u²) rise and fall (orange curve). The peak is at
// u = 2√3/3 ≈ 1.15 with area 16√3/9 ≈ 3.08. Two of the popular wrong options are the width u
// (B, 21%) and the height v (D, 14%) at the peak, not the area. A "forget to square" toggle
// uses height 4 − u: the corner leaves the parabola, the area curve becomes u(4 − u), whose
// peak is 4 at u = 2 (option A, 7%); the right u with this wrong height gives option C (20%).

import { useState } from 'react'
import { C, Controls, Label, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle, num } from './kit'

const para = (x: number) => 4 - x * x
const area = (u: number) => u * para(u)
const wrongArea = (u: number) => u * (4 - u)
const U_STAR = (2 * Math.sqrt(3)) / 3
const A_STAR = (16 * Math.sqrt(3)) / 9

export default function Rectangle() {
  const [u, setU] = useState(0.6)
  const [noSquare, setNoSquare] = useState(false)

  const v = noSquare ? 4 - u : para(u)
  const A = u * v
  const atPeak = !noSquare && Math.abs(u - U_STAR) < 0.02
  const rectColor = noSquare ? C.bad : atPeak ? C.good : C.violet
  const areaFn = noSquare ? wrongArea : area

  let notice
  if (noSquare) {
    notice = (
      <Notice tone="warn">
        With height <M>4-u</M> the corner leaves the parabola (below it for <M>{'u<1'}</M>, above it for{' '}
        <M>{'u>1'}</M>), so this is not the rectangle in the question. Its area <M>u(4-u)</M> (orange) peaks at{' '}
        <M>4</M> when <M>u=2</M>: option A. Finding the right <M>{'u=\\tfrac{2\\sqrt3}{3}'}</M> but then using this
        height gives <M>{'\\tfrac{8\\sqrt3-4}{3}\\approx3.29'}</M>: option C. Turn the toggle off to put the corner
        back on the curve.
      </Notice>
    )
  } else if (atPeak) {
    notice = (
      <Notice tone="good">
        <b>This is the biggest rectangle.</b> Its width is <M>{'u=\\tfrac{2\\sqrt3}{3}\\approx1.15'}</M> (option B) and its
        height is <M>{'v=\\tfrac83'}</M> (option D), but the question asks for the <b>area</b>:{' '}
        <M>{'\\tfrac{2\\sqrt3}{3}\\times\\tfrac83=\\tfrac{16\\sqrt3}{9}\\approx3.08'}</M>, option E.
      </Notice>
    )
  } else if (u < U_STAR) {
    notice = (
      <Notice>
        Narrow and tall: widening still adds more area than the falling height takes away, so the orange area curve is
        still rising. Slide <M>u</M> to the right until the area stops growing.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Wide and short: the height <M>4-u^2</M> now falls so fast that the area shrinks (at <M>u=2</M> it is{' '}
        <M>0</M>). Slide back left to find the peak of the orange curve.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.15, 2.2]} y={[-0.3, 4.4]} xStep={0.5} yStep={1} xLabels={x => (x < -0.1 || x > 2.1 ? '' : num(x, 1))} height={320} xLabel="x" yLabel="y">
        <Polygon
          points={[[0, 0], [u, 0], [u, v], [0, v]]}
          color={rectColor}
          fillOpacity={0.25}
          weight={2}
        />
        <Plot.OfX y={para} domain={[-0.15, 2.1]} color={C.f} weight={3} />
        <Plot.OfX y={areaFn} domain={[0, 2]} color={C.g} weight={2.5} />
        <Point x={u} y={v} color={rectColor} />
        <Point x={u} y={areaFn(u)} color={C.g} />
        <Label at={[u, v]} color={rectColor} attach={u > 1.4 ? 'nw' : 'ne'}>{noSquare ? '(u, 4 − u)' : '(u, v)'}</Label>
        <Label at={[0.25, para(0.25)]} color={C.f} attach="ne">y = 4 − x²</Label>
        <Label at={[1.85, areaFn(1.85)]} color={C.g} attach={noSquare ? 'w' : 'e'}>{noSquare ? 'area u(4 − u)' : 'area A(u)'}</Label>
      </Plane>
      <Controls>
        <Slider label="u" value={u} onChange={setU} min={0} max={2} step={0.005} />
        <Toggle label="Forget to square: height 4 − u" checked={noSquare} onChange={setNoSquare} />
        <Readouts>
          <Readout tex={`\\text{width } u = ${u.toFixed(2)}`} />
          <Readout tex={`\\text{height } ${noSquare ? '4-u' : 'v=4-u^2'} = ${v.toFixed(2)}`} />
          <Readout color={rectColor} tex={`\\text{area} = ${A.toFixed(2)}`} />
          {atPeak && <Readout color={C.good} tex={`\\tfrac{16\\sqrt3}{9}\\approx ${A_STAR.toFixed(2)}\\ \\checkmark`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
