// 2017 Specialist Exam 2 MCQ 5 — |z − 2 + i| = |z − 4| is the set of points equidistant from
// 2 − i = (2, −1) and 4 = (4, 0): their perpendicular bisector y = −2x + 11/2. Drag z (it snaps
// onto the line when close) or jump to an option and compare the two distances. The midpoint
// (3, −½) is option A. A toggle shows the sign slip z − (2 + i): that bisector passes through D.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Readout, Readouts, Toggle,
} from './kit'

type Pt = [number, number]
const Q: Pt = [4, 0]
const OPTIONS: { letter: string; at: Pt; attach: 'e' | 'w' | 'sw' }[] = [
  { letter: 'A', at: [3, -0.5], attach: 'e' },
  { letter: 'B', at: [-3, -0.5], attach: 'sw' },
  { letter: 'C', at: [-3, 1.5], attach: 'w' },
  { letter: 'D', at: [3, 0.5], attach: 'e' },
  { letter: 'E', at: [3, -1.5], attach: 'e' },
]

const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1])

// Snap onto the bisector of P and Q when within 0.15 units of it
function snapTo(z: Pt, P: Pt): Pt {
  const mx = (P[0] + Q[0]) / 2
  const my = (P[1] + Q[1]) / 2
  // direction of the bisector = PQ rotated 90°
  const dx = -(Q[1] - P[1])
  const dy = Q[0] - P[0]
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  const t = (z[0] - mx) * ux + (z[1] - my) * uy
  const foot: Pt = [mx + t * ux, my + t * uy]
  return dist(z, foot) < 0.15 ? foot : z
}

export default function Bisector() {
  const [misread, setMisread] = useState(false)
  const [z, setZ] = useState<Pt>([1.5, 1.5])

  const P: Pt = misread ? [2, 1] : [2, -1]
  const dP = dist(z, P)
  const dQ = dist(z, Q)
  const equal = Math.abs(dP - dQ) < 0.005
  const mid: Pt = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]
  const atOpt = OPTIONS.find(o => dist(o.at, z) < 1e-6)
  // bisector: through mid, perpendicular to PQ
  const dir: Pt = [-(Q[1] - P[1]), Q[0] - P[0]]
  const other: Pt = [mid[0] + dir[0], mid[1] + dir[1]]
  const pName = misread ? '2 + i' : '2 - i'
  const lineCol = misread ? C.bad : C.f

  let notice
  if (misread) {
    notice = (
      <Notice tone="warn">
        Reading <M>z - 2 + i</M> as <M>z - (2 + i)</M> moves the fixed point to <M>2 + i = (2, 1)</M>. Its bisector (red)
        passes through <M>{'\\left(3, \\tfrac12\\right)'}</M>, option D, which 10% chose. But{' '}
        <M>z - 2 + i = z - (2 - i)</M>: the <M>+i</M> means the point is <M>2 - i</M>. Turn the toggle off to compare.
      </Notice>
    )
  } else if (equal && atOpt?.letter === 'A') {
    notice = (
      <Notice tone="good">
        Option A is the <b>midpoint</b> of <M>2 - i</M> and <M>4</M>, so it is automatically the same distance from both:{' '}
        <M>{'\\tfrac{\\sqrt5}{2}'}</M> each. Every point on the blue line works the same way. Now try{' '}
        <b>Misread the sign</b> to see where option D comes from.
      </Notice>
    )
  } else if (equal) {
    notice = (
      <Notice tone="good">
        The two distances match, and <M>z</M> is on the blue line. Every such point lies on the <b>perpendicular bisector</b>{' '}
        of the segment from <M>2 - i</M> to <M>4</M>: it cuts the segment at its midpoint{' '}
        <M>{'\\left(3, -\\tfrac12\\right)'}</M> at right angles. Press <b>A</b> to jump there.
      </Notice>
    )
  } else if (atOpt) {
    notice = (
      <Notice tone="warn">
        At option {atOpt.letter} the distances are <M>{dP.toFixed(2)}</M> and <M>{dQ.toFixed(2)}</M>: not equal, so this point
        is not on the path. It is off the blue line. Try option A.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Drag <M>z</M>. The orange lengths are its distances to <M>2 - i</M> and <M>4</M>. Move it until they are equal: you
        will always end up on the blue line (it snaps on when you are close). That line is the whole path{' '}
        <M>|z - 2 + i| = |z - 4|</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-4, 5.5]} y={[-3, 3]} xStep={2} equalScale xLabel="Re" yLabel="Im" height={380}>
        <Line.ThroughPoints point1={mid} point2={other} color={lineCol} weight={3} style={misread ? 'dashed' : 'solid'} />
        <Line.Segment point1={P} point2={Q} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={z} point2={P} color={C.g} weight={2} opacity={0.8} />
        <Line.Segment point1={z} point2={Q} color={C.g} weight={2} opacity={0.8} />

        {OPTIONS.map(o => (
          <Point key={o.letter} x={o.at[0]} y={o.at[1]} color={C.guide} />
        ))}
        {OPTIONS.map(o => (
          <Label key={`l${o.letter}`} at={o.at} attach={o.attach} color={C.guide} size={12}>
            {o.letter}
          </Label>
        ))}

        <Point x={P[0]} y={P[1]} color={C.g} />
        <Point x={Q[0]} y={Q[1]} color={C.g} />
        <Label at={P} color={C.g} attach={misread ? 'nw' : 'sw'}>
          {misread ? '2 + i' : '2 − i'}
        </Label>
        <Label at={Q} color={C.g} attach="ne">
          4
        </Label>

        <MovablePoint point={z} onMove={v => setZ(snapTo(v as Pt, P))} color={equal ? C.good : C.violet} />
        <Label at={z} color={equal ? C.good : C.violet} attach="nw">
          z
        </Label>
      </Plane>
      <Controls>
        <Buttons>
          {OPTIONS.map(o => (
            <Toggle key={o.letter} label={o.letter} checked={atOpt?.letter === o.letter} onChange={() => setZ(o.at)} />
          ))}
          <Toggle label="Misread the sign: z − (2 + i)" checked={misread} onChange={setMisread} />
        </Buttons>
        <Readouts>
          <Readout tex={`z = ${z[0].toFixed(2)} ${z[1] < 0 ? '-' : '+'} ${Math.abs(z[1]).toFixed(2)}i`} color={equal ? C.good : C.violet} />
          <Readout tex={`|z - (${pName})| = ${dP.toFixed(3)}`} color={C.g} />
          <Readout tex={`|z - 4| = ${dQ.toFixed(3)}`} color={C.g} />
          <Readout tex={equal ? '\\text{equal}\\ \\checkmark' : '\\text{not equal}'} color={equal ? C.good : C.bad} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
