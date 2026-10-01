// 2021 Methods Exam 2 MCQ 16 — why sin(x) must be taken negative. The unit circle with the
// allowed arc [3π/2, 2π] (the fourth quadrant) in green, the line cos(x) = 3/5 and the lines
// sin(y) = ±5/13. P (for x) snaps between the two points where cos(x) = 3/5; Q (for y) snaps
// between the four points where sin²(y) = 25/169. The readouts give sin(x), cos(y) and their sum:
// the four sign choices give exactly options A, B, C and D, and only the pair with both points on
// the green arc is allowed (A, 8/65). It opens on option C (32% of students): P in the first
// quadrant, sin(x) = +4/5.

import { useState } from 'react'
import { C, Circle, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Controls } from './kit'

type V = [number, number]
const P_PTS: V[] = [
  [3 / 5, 4 / 5],
  [3 / 5, -4 / 5],
]
const Q_PTS: V[] = [
  [12 / 13, 5 / 13],
  [-12 / 13, 5 / 13],
  [-12 / 13, -5 / 13],
  [12 / 13, -5 / 13],
]
// Quadrant of each Q point, in Q_PTS order.
const Q_QUAD = [1, 2, 3, 4]

function nearest(pts: V[], [mx, my]: V): number {
  let best = 0
  let bestD = Infinity
  pts.forEach(([x, y], i) => {
    const d = (x - mx) ** 2 + (y - my) ** 2
    if (d < bestD) {
      bestD = d
      best = i
    }
  })
  return best
}

// Sign of sin(x) (s) and of cos(y) (c) → the option it gives.
function option(s: number, c: number): { letter: string; tex: string } {
  if (s < 0 && c > 0) return { letter: 'A', tex: '\\tfrac{8}{65}' }
  if (s < 0 && c < 0) return { letter: 'B', tex: '-\\tfrac{112}{65}' }
  if (s > 0 && c > 0) return { letter: 'C', tex: '\\tfrac{112}{65}' }
  return { letter: 'D', tex: '-\\tfrac{8}{65}' }
}

const QUAD_NAME = ['', 'first', 'second', 'third', 'fourth']

export default function Quadrant() {
  const [pi, setPi] = useState(0) // starts on the slip behind option C
  const [qi, setQi] = useState(3)
  const P = P_PTS[pi]
  const Q = Q_PTS[qi]
  const qQuad = Q_QUAD[qi]
  const pOk = pi === 1
  const qOk = qQuad === 4
  const s = Math.sign(P[1])
  const c = Math.sign(Q[0])
  const opt = option(s, c)
  const sinX = s < 0 ? '-\\tfrac45' : '\\tfrac45'
  const cosY = c < 0 ? '-\\tfrac{12}{13}' : '\\tfrac{12}{13}'

  let notice
  if (pOk && qOk) {
    notice = (
      <Notice tone="good">
        <b>Both points are on the green arc</b>, so this is the only pair the question allows. P is below the horizontal axis,
        so <M>{'\\sin(x) = -\\tfrac45'}</M>; Q is right of the vertical axis, so <M>{'\\cos(y) = \\tfrac{12}{13}'}</M>. The sum
        is <M>{'\\tfrac{8}{65}'}</M>, option A. Drag either point off the arc to see where the other options come from.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        {!pOk && (
          <>
            <b>P is in the first quadrant.</b> <M>{'\\cos(x) = \\tfrac35'}</M> there too, but that angle lies between{' '}
            <M>0</M> and <M>{'\\tfrac{\\pi}{2}'}</M>, outside <M>{'\\left[\\tfrac{3\\pi}{2}, 2\\pi\\right]'}</M>, and its sine is
            positive.{' '}
          </>
        )}
        {!qOk && (
          <>
            <b>Q is in the {QUAD_NAME[qQuad]} quadrant.</b> <M>{'\\sin^2(y) = \\tfrac{25}{169}'}</M> there too, but{' '}
            <M>y</M> must be on the green arc
            {qQuad === 1 ? <> (here <M>{'\\cos(y)'}</M> happens to have the right sign; <M>{'\\sin(y)'}</M> doesn&apos;t).</> : <>, where cosine is positive.</>}{' '}
          </>
        )}
        This pair gives <M>{`${sinX} ${c < 0 ? '' : '+'} ${cosY} = ${opt.tex}`}</M>, option {opt.letter}. Drag{' '}
        {!pOk && !qOk ? 'P and Q' : !pOk ? 'P' : 'Q'} onto the green arc.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.3, 1.3]} y={[-1.3, 1.3]} xStep={1} yStep={1} height={340} equalScale xLabel="" yLabel="" xLabels={false} yLabels={false}>
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} />
        <Plot.Parametric xy={t => [Math.cos(t), Math.sin(t)]} domain={[1.5 * Math.PI, 2 * Math.PI]} color={C.good} weight={6} />
        <Label at={[0.35, -1]} attach="s" color={C.good} size={12}>fourth quadrant: [3π/2, 2π]</Label>
        <Line.Segment point1={[0.6, -1.25]} point2={[0.6, 1.25]} color={C.f} style="dashed" weight={1.5} />
        <Label at={[0.6, 1.18]} attach="e" color={C.f} size={12}>cos x = 3/5</Label>
        <Line.Segment point1={[-1.3, 5 / 13]} point2={[1.3, 5 / 13]} color={C.g} style="dashed" weight={1.5} />
        <Line.Segment point1={[-1.3, -5 / 13]} point2={[1.3, -5 / 13]} color={C.g} style="dashed" weight={1.5} />
        <Label at={[-0.05, 5 / 13]} attach="nw" color={C.g} size={12}>sin²y = 25/169</Label>
        {P_PTS.map(([x, y]) => (
          <Point key={`p${y}`} x={x} y={y} color={C.guide} />
        ))}
        {Q_PTS.map(([x, y]) => (
          <Point key={`q${x}${y}`} x={x} y={y} color={C.guide} />
        ))}
        <Line.Segment point1={[0, 0]} point2={P} color={C.f} weight={2} />
        <Line.Segment point1={[0, 0]} point2={Q} color={C.g} weight={2} />
        <Label at={P} attach={P[1] > 0 ? 'ne' : 'se'} color={C.f} size={14}>P</Label>
        <Label at={Q} attach={Q[0] > 0 ? (Q[1] > 0 ? 'ne' : 'se') : Q[1] > 0 ? 'nw' : 'sw'} color={C.g} size={14}>Q</Label>
        <MovablePoint point={P} onMove={p => setPi(nearest(P_PTS, p))} color={C.f} />
        <MovablePoint point={Q} onMove={p => setQi(nearest(Q_PTS, p))} color={C.g} />
      </Plane>
      <Controls>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          Drag P and Q. P (angle <M>x</M>) snaps between the points where <M>{'\\cos(x) = \\tfrac35'}</M>; Q (angle{' '}
          <M>y</M>) between the points where <M>{'\\sin^2(y) = \\tfrac{25}{169}'}</M>. On the unit circle, cosine is the
          horizontal coordinate and sine the vertical one.
        </p>
        <Readouts>
          <Readout color={C.f} tex={`\\sin(x) = ${sinX}`} />
          <Readout color={C.g} tex={`\\cos(y) = ${cosY}`} />
          <Readout tex={`\\sin(x)+\\cos(y) = ${opt.tex}\\ \\text{(option ${opt.letter})}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
