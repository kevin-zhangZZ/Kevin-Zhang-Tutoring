// 2015 Methods Exam 1 Q10b — the report: "Many students found the gradient of the radius CT
// rather than the gradient of the line segment XT." Both lines are drawn through T: the radius CT
// (gradient tan θ, rising) and the tangent XY (gradient −cos θ/sin θ, falling), with the right
// angle at T. The readouts show the two gradients multiply to −1 at every θ; at θ = π/2 the
// radius is vertical (no gradient) and the tangent horizontal (gradient 0 = −cos(π/2)/sin(π/2)).

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Polygon, Readout, Readouts, Slider, tick } from './kit'

export default function RadiusVsTangent() {
  const [th, setTh] = useState(0.8)
  const c = Math.cos(th)
  const s = Math.sin(th)
  const T: [number, number] = [2 + 2 * c, 2 * s]
  const vertical = Math.PI / 2 - th < 0.005
  const mR = s / c
  const mT = -c / s
  // small right-angle marker at T: along the radius (back towards C) and along the tangent
  const k = 0.22
  const a: [number, number] = [T[0] - k * c, T[1] - k * s]
  const b: [number, number] = [T[0] + k * s, T[1] - k * c]
  const ab: [number, number] = [a[0] + k * s, a[1] - k * c]

  return (
    <div>
      <Plane x={[-0.6, 5.6]} y={[-0.6, 3.6]} equalScale height={300} minHeight={160} xLabels={v => (v < 0 || v > 5 ? "" : tick(v))} yLabels={v => (v < 0 ? "" : tick(v))}>
        <Circle center={[2, 0]} radius={2} color={C.guide} fillOpacity={0} weight={2} />
        <Line.ThroughPoints point1={T} point2={[T[0] + s, T[1] - c]} color={C.g} weight={3} />
        <Line.Segment point1={[2, 0]} point2={T} color={C.f} weight={4} />
        <Polygon points={[T, a, ab, b]} color={C.ink} fillOpacity={0} weight={1.5} />
        <Point x={2} y={0} color={C.ink} />
        <Point x={T[0]} y={T[1]} color={C.ink} />
        <Label at={[2, 0]} attach="s">C</Label>
        <Label at={T} attach="ne">T</Label>
        <Label at={[2 + c, s]} attach="w" color={C.f}>radius CT</Label>
        <Label at={[T[0] + 1.2 * s, T[1] - 1.2 * c]} attach="ne" color={C.g}>tangent XY</Label>
      </Plane>
      <Controls>
        <Slider label="\theta" value={th} onChange={setTh} min={0.3} max={Math.PI / 2} step={0.01} />
        <Readouts>
          <Readout color={C.f} tex={vertical ? 'm_{CT}\\ \\text{undefined (vertical)}' : `m_{CT} = \\tan\\theta = ${mR.toFixed(2)}`} />
          <Readout color={C.g} tex={`m_{XY} = -\\frac{\\cos\\theta}{\\sin\\theta} = ${vertical ? '0.00' : mT.toFixed(2)}`} />
          {!vertical && <Readout tex={`m_{CT}\\times m_{XY} = ${(mR * mT).toFixed(2)}`} />}
        </Readouts>
        {vertical ? (
          <Notice tone="good">
            At <M>{'\\theta = \\tfrac{\\pi}{2}'}</M> the radius is vertical and the tangent horizontal. <M>{'-\\tfrac{\\cos\\theta}{\\sin\\theta}'}</M>{' '}
            gives the correct gradient <M>0</M>, which is why that form of the answer is the safer one to write.
          </Notice>
        ) : (
          <Notice>
            The <b>blue radius rises</b> (gradient <M>\tan\theta</M>, positive) while the <b>orange tangent falls</b>. The question
            asks for the orange line, and the figure shows it sloping down, so a positive answer cannot be right. Drag{' '}
            <M>\theta</M> and watch the product stay at <M>-1</M>; then drag to <M>{'\\tfrac{\\pi}{2}'}</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
