// 2023 Specialist Exam 2 Q5b — the shortest distance from B to the segment AC is the height of
// triangle ABC on base AC, so part a.'s area gives it in one line. Triangle ABC is drawn flat in
// its own plane Π, true to scale (|AC| = 3, |AB| = √2, |BC| = √5). Slide P = A + λ(AC) along the
// segment: |BP| is smallest exactly when BP · AC = 0, at λ = 1/3 (inside the segment), where
// |BP| = 1 and ½ × |AC| × |BP| = 1.5, the area from part a.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Point, Polygon, Readout, Readouts, Slider, num } from './kit'

// True-shape frame: A at the origin, AC along the horizontal axis, B above it.
const A2: [number, number] = [0, 0]
const B2: [number, number] = [1, 1]
const C2: [number, number] = [3, 0]
const STEP = 1 / 90

export default function Height() {
  const [lam, setLam] = useState(0.8)

  const perp = Math.abs(lam - 1 / 3) < 1e-6
  const atA = lam < 1e-6
  const atC = lam > 1 - 1e-6
  const P2: [number, number] = [3 * lam, 0]
  const bp = Math.sqrt(9 * lam * lam - 6 * lam + 2)
  const dot = 9 * lam - 3
  const half = 1.5 * bp
  const col = perp ? C.good : C.g
  const toward = lam > 1 / 3 ? 'A' : 'C'
  const m = 0.13

  let notice
  if (perp) {
    notice = (
      <Notice tone="good">
        <b>Now <M>{'\\overrightarrow{BP}\\cdot\\overrightarrow{AC}=0'}</M>, so BP is perpendicular to AC</b> and{' '}
        <M>{'|\\overrightarrow{BP}|=1'}</M> is the smallest it gets. This BP is the height of triangle ABC on base AC,
        so <M>{'\\tfrac12\\times3\\times1=1.5'}</M>, exactly part a.&apos;s area. The foot is at{' '}
        <M>{'\\lambda=\\tfrac13'}</M>, between A and C, so it really is on the segment.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        {atA || atC ? (
          <>
            P is at {atA ? 'A' : 'C'}, so this is just the length{' '}
            <M>{atA ? '|\\overrightarrow{BA}|=\\sqrt2' : '|\\overrightarrow{BC}|=\\sqrt5'}</M>, not the shortest distance.{' '}
          </>
        ) : (
          <>
            <M>{`\\overrightarrow{BP}\\cdot\\overrightarrow{AC}=${num(dot)}\\neq0`}</M>, so BP is slanted and{' '}
            <M>{`|\\overrightarrow{BP}|\\approx${num(bp, 3)}`}</M> is longer than it needs to be.{' '}
          </>
        )}
        A slanted BP is not the triangle&apos;s height: <M>{`\\tfrac12\\times3\\times${num(bp, 3)}=${num(half, 3)}`}</M>{' '}
        overshoots the area 1.5. Slide P toward {toward} until the dot product is 0.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.4, 3.4]} y={[-0.45, 1.35]} xStep={1} yStep={1} equalScale height={300} labels={false} xLabel="" yLabel="">
        <Polygon points={[A2, B2, C2]} color={C.guide} fillOpacity={0.12} weight={1} />
        <Line.Segment point1={A2} point2={B2} color={C.guide} weight={2} />
        <Line.Segment point1={B2} point2={C2} color={C.guide} weight={2} />
        <Line.Segment point1={A2} point2={C2} color={C.f} weight={4} />
        <Line.Segment point1={B2} point2={P2} color={col} weight={3} />
        {perp && (
          <>
            <Line.Segment point1={[1 + m, 0]} point2={[1 + m, m]} color={C.good} weight={2} />
            <Line.Segment point1={[1 + m, m]} point2={[1, m]} color={C.good} weight={2} />
            <Label at={[1, 0.5]} color={C.good} attach="w">
              h = 1
            </Label>
          </>
        )}
        <Point x={A2[0]} y={A2[1]} color={C.f} />
        <Point x={C2[0]} y={C2[1]} color={C.f} />
        <Point x={B2[0]} y={B2[1]} color={C.ink} />
        <Point x={P2[0]} y={P2[1]} color={col} />
        <Label at={A2} attach="sw">A</Label>
        <Label at={C2} attach="se">C</Label>
        <Label at={B2} attach="n">B</Label>
        <Label at={P2} attach="s" color={col}>P</Label>
      </Plane>
      <Controls>
        <Slider label="\lambda" value={lam} onChange={setLam} min={0} max={1} step={STEP} />
        <Readouts>
          <Readout tex={`P = A + \\lambda\\overrightarrow{AC} = (${num(1 + 2 * lam)},\\ ${num(1 + lam)},\\ ${num(2 + 2 * lam)})`} />
          <Readout color={col} tex={`\\overrightarrow{BP}\\cdot\\overrightarrow{AC} = 9\\lambda-3 = ${num(dot)}`} />
          <Readout color={col} tex={`|\\overrightarrow{BP}| = ${num(bp, 3)}`} />
          <Readout color={perp ? C.good : undefined} tex={`\\tfrac12\\times|\\overrightarrow{AC}|\\times|\\overrightarrow{BP}| = ${num(half, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
