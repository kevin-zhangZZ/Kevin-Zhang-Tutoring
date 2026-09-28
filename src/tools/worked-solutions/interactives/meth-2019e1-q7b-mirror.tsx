// 2019 Methods Exam 1 Q7b — a geometric second look at the answer. Reflect triangle ABP in the
// x-axis: P' = (x, −√(1 − x²)) and triangle APP' is inscribed in the whole unit circle with exactly
// twice the area of ABP. Its sides are AP = AP' = √(2 + 2x) and PP' = 2√(1 − x²); setting
// AP = PP' gives 2x² + x − 1 = 0, the same quadratic as A'(x) = 0, so the maximum at x = 1/2 is
// the moment APP' becomes equilateral (all sides √3, area 3√3/4, half of it 3√3/8).

import { useState } from 'react'
import {
  C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider,
  clamp,
} from './kit'

const X_MIN = -0.9
const X_MAX = 0.95
const semi = (x: number) => Math.sqrt(Math.max(0, 1 - x * x))

export default function Mirror() {
  const [x, setX] = useState(-0.2)
  const y = semi(x)
  const ap = Math.sqrt(2 + 2 * x)
  const pp = 2 * y
  const big = (x + 1) * y // area of APP' = 2 × area ABP
  const equi = Math.abs(x - 0.5) < 0.025
  const sideColor = equi ? C.good : C.violet

  let notice
  if (equi) {
    notice = (
      <Notice tone="good">
        <b>All three sides are <M>{'\\sqrt3'}</M>: triangle APP&apos; is equilateral.</b> Its area is{' '}
        <M>{'\\tfrac{\\sqrt3}{4}(\\sqrt3)^2 = \\tfrac{3\\sqrt3}{4}'}</M>, and ABP is half of it,{' '}
        <M>{'\\tfrac{3\\sqrt3}{8}'}</M>, the calculus answer. Setting <M>{"AP = PP'"}</M> gives{' '}
        <M>{'2+2x = 4(1-x^2)'}</M>, i.e. <M>{'2x^2+x-1=0'}</M>: the very quadratic that came from{' '}
        <M>{"A'(x)=0"}</M>.
      </Notice>
    )
  } else if (x < 0.5) {
    notice = (
      <Notice>
        Reflecting ABP in the <M>x</M>-axis gives a triangle APP&apos; inside the <b>whole</b> unit circle with exactly{' '}
        <b>twice</b> the area, so making ABP as big as possible means making APP&apos; as big as possible. Right now it is
        tall and thin: <M>{"PP'"}</M> is longer than <M>AP</M>. Drag P right until the sides match.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now APP&apos; is short and wide: <M>AP</M> is longer than <M>{"PP'"}</M>, and the area (twice ABP&apos;s) is
        falling again. The biggest triangle that fits in a circle is the balanced one, with all sides equal. Drag P back
        to <M>{'x = \\tfrac12'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.25, 1.25]} y={[-1.15, 1.15]} xStep={0.5} yStep={0.5} height={380} equalScale labels={false}>
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} strokeStyle="dashed" />
        <Plot.OfX y={semi} domain={[-1, 1]} color={C.f} weight={3} />
        <Polygon points={[[-1, 0], [x, 0], [x, -y]]} color={C.f} fillOpacity={0.08} weight={1} strokeStyle="dashed" />
        <Polygon points={[[-1, 0], [x, 0], [x, y]]} color={C.f} fillOpacity={0.3} weight={1} />
        <Line.Segment point1={[-1, 0]} point2={[x, y]} color={sideColor} weight={3.5} />
        <Line.Segment point1={[-1, 0]} point2={[x, -y]} color={sideColor} weight={3.5} />
        <Line.Segment point1={[x, y]} point2={[x, -y]} color={equi ? C.good : C.g} weight={3.5} />
        <Point x={-1} y={0} color={C.ink} />
        <Label at={[-1, 0]} attach="nw">
          A
        </Label>
        <Point x={x} y={0} color={C.ink} />
        <Label at={[x, 0]} attach={x > 0.3 ? 'w' : 'e'}>
          B
        </Label>
        <Point x={x} y={-y} color={C.ink} />
        <Label at={[x, -y]} attach="se">
          P&apos;
        </Label>
        <MovablePoint
          point={[x, y]}
          color={C.f}
          constrain={([px, py]) => {
            const th = clamp(Math.atan2(Math.max(py, 0), px), Math.acos(X_MAX), Math.acos(X_MIN))
            return [Math.cos(th), Math.sin(th)]
          }}
          onMove={([px]) => setX(clamp(px, X_MIN, X_MAX))}
        />
        <Label at={[x, y]} attach="ne" gap={12}>
          P
        </Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={v => setX(clamp(v, X_MIN, X_MAX))} min={X_MIN} max={X_MAX} step={0.005} />
        <Readouts>
          <Readout color={sideColor} tex={`AP = AP' = \\sqrt{2+2x} = ${ap.toFixed(3)}`} />
          <Readout color={equi ? C.good : C.g} tex={`PP' = 2\\sqrt{1-x^2} = ${pp.toFixed(3)}`} />
        </Readouts>
        <Readouts>
          <Readout tex={`\\text{area } APP' = ${big.toFixed(3)}`} />
          <Readout color={C.f} tex={`\\text{area } ABP = \\tfrac12 \\times ${big.toFixed(3)} = ${(big / 2).toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
