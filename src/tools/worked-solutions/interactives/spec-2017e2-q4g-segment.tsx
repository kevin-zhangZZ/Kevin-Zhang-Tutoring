// 2017 Specialist Exam 2 Q4g — the segment of |z| = 4 cut off by the chord Re(z) = k, on O's side
// (x ≥ k), as sector minus triangle: A = ½r²(θ − sin θ), where θ is the angle the shaded arc subtends
// at O. Left of O (the question's k = −2) θ > π, sin θ < 0, and the triangle is ADDED; right of O it is
// cut away. A toggle shows the report's common error: θ = 2π/3 measures the minor segment instead.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider, Toggle, integrate, tick } from './kit'

const R = 4
const arc = (from: number, to: number, n = 90): [number, number][] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = from + ((to - from) * i) / n
    return [R * Math.cos(t), R * Math.sin(t)] as [number, number]
  })

export default function Segment() {
  const [k, setK] = useState(-2)
  const [minor, setMinor] = useState(false)

  const phi = Math.acos(k / R)
  const theta = 2 * phi // angle of the arc x ≥ k, measured at O
  const h = R * Math.sin(phi)
  const A: [number, number] = [k, h]
  const B: [number, number] = [k, -h]
  const sector = 0.5 * R * R * theta
  const tri = 0.5 * R * R * Math.sin(theta) // signed
  const seg = sector - tri
  const check = integrate(x => 2 * Math.sqrt(Math.max(0, R * R - x * x)), k, R, 400)
  const wrongTheta = 2 * Math.PI - theta
  const wrong = 0.5 * R * R * (wrongTheta - Math.sin(wrongTheta))
  const atQ = Math.abs(k + 2) < 0.03
  const atZero = Math.abs(k) < 0.03
  const added = theta > Math.PI + 1e-6

  const segPts: [number, number][] = arc(-phi, phi)
  const otherPts: [number, number][] = arc(phi, 2 * Math.PI - phi)
  const sectorPts: [number, number][] = [[0, 0], ...arc(-phi, phi)]
  const thetaTex = atQ ? '\\tfrac{4\\pi}{3}' : theta.toFixed(3)

  let notice
  if (minor) {
    notice = (
      <Notice tone="warn">
        With the angle between the two roots, <M>{atQ ? '\\theta = \\tfrac{2\\pi}{3}' : `\\theta = ${wrongTheta.toFixed(3)}`}</M>,
        the formula gives <M>{wrong.toFixed(2)}</M>: the area of the red {k < 0 ? <b>minor</b> : <>other</>} segment on the far side of the chord. The
        report says a significant number of students did this. The question wants the region bounded by the major arc, which
        is more than half the disc, <M>{'8\\pi \\approx 25.13'}</M>.
      </Notice>
    )
  } else if (atQ) {
    notice = (
      <Notice tone="good">
        This is the question&apos;s chord <M>{'\\operatorname{Re}(z) = -2'}</M>. The major arc subtends{' '}
        <M>{'\\theta = \\tfrac{4\\pi}{3}'}</M> at <M>O</M>, and the green triangle <M>OAB</M> is <b>inside</b> the segment, so it
        is added: <M>{'\\tfrac{32\\pi}{3} + 4\\sqrt3 \\approx 40.44'}</M>. The formula does this by itself, since{' '}
        <M>{'\\sin\\tfrac{4\\pi}{3} = -\\tfrac{\\sqrt3}{2}'}</M>. Slide the chord right past <M>O</M> to see the triangle flip.
      </Notice>
    )
  } else if (atZero) {
    notice = (
      <Notice>
        <M>{'\\theta = \\pi'}</M>: the chord is a diameter, the triangle is flat (<M>{'\\sin\\pi = 0'}</M>), and the segment is
        exactly half the disc, <M>{'8\\pi \\approx 25.13'}</M>. This is the changeover between adding and removing the
        triangle.
      </Notice>
    )
  } else if (added) {
    notice = (
      <Notice>
        Chord left of <M>O</M>: the orange segment is the major one and contains <M>O</M>. <M>{'\\theta > \\pi'}</M>, so{' '}
        <M>{'\\sin\\theta < 0'}</M> and <M>{'-\\tfrac12 r^2\\sin\\theta'}</M> adds the green triangle to the sector. Set{' '}
        <M>k = -2</M> for the question.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Chord right of <M>O</M>: now the orange segment is the minor one and <M>O</M> is outside it. <M>{'\\theta < \\pi'}</M>,{' '}
        <M>{'\\sin\\theta > 0'}</M>, and the red triangle is cut away from the sector. Same formula, both cases.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-5, 5]}
        y={[-4.8, 5.2]}
        equalScale
        xLabel="Re(z)"
        yLabel="Im(z)"
        height={360}
        xLabels={v => (v >= 5 ? '' : tick(v))}
        yLabels={v => (v >= 5 ? '' : tick(v))}
      >
        {minor ? (
          <Polygon points={otherPts} color={C.bad} fillOpacity={0.25} weight={0} />
        ) : (
          <>
            <Polygon points={sectorPts} color={C.f} fillOpacity={0.2} weight={0} />
            <Polygon points={[[0, 0], A, B]} color={added ? C.good : C.bad} fillOpacity={0.4} weight={2} />
          </>
        )}
        <Circle center={[0, 0]} radius={R} color={C.ink} fillOpacity={0} weight={1.5} />
        <Polygon points={minor ? otherPts : segPts} color={minor ? C.bad : C.g} fillOpacity={0} weight={4} />
        <Line.Segment point1={A} point2={B} color={C.ink} weight={2} />
        <Label at={A} color={C.ink} attach={k < 0 ? 'nw' : 'ne'} gap={6}>A</Label>
        <Label at={B} color={C.ink} attach={k < 0 ? 'sw' : 'se'} gap={6}>B</Label>
        <Label at={[0, 0]} color={C.ink} attach={k < 0 ? 'e' : 'w'} gap={8}>O</Label>
      </Plane>
      <Controls>
        <Slider
          label="\text{chord } \operatorname{Re}(z) = k"
          value={k}
          onChange={setK}
          min={-3.6}
          max={3.6}
          step={0.05}
          format={v => (Math.abs(v + 2) < 0.03 ? '-2' : v.toFixed(2))}
        />
        <Toggle label="Use the angle between the roots instead" checked={minor} onChange={setMinor} />
        {minor ? (
          <Readouts>
            <Readout color={C.bad} tex={`\\theta = ${atQ ? '\\tfrac{2\\pi}{3}' : wrongTheta.toFixed(3)}`} />
            <Readout color={C.bad} tex={`\\tfrac12 r^2(\\theta - \\sin\\theta) = ${wrong.toFixed(2)}\\ \\text{(${k < 0 ? 'minor' : 'far'} segment)}`} />
          </Readouts>
        ) : (
          <Readouts>
            <Readout color={C.f} tex={`\\text{sector } \\tfrac12 r^2\\theta = ${sector.toFixed(2)}\\ \\ (\\theta = ${thetaTex})`} />
            <Readout color={added ? C.good : C.bad} tex={`\\text{triangle } \\tfrac12 r^2\\sin\\theta = ${tri.toFixed(2)}`} />
            <Readout color={C.g} tex={`\\text{segment} = ${seg.toFixed(2)}\\ \\ (\\textstyle\\int \\text{check } ${check.toFixed(2)})`} />
          </Readouts>
        )}
        {notice}
      </Controls>
    </div>
  )
}
