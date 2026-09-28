// 2020 Specialist Exam 2 MCQ 19 — a change in velocity is the arrow from the tip of "before" to
// the tip of "after". v_before = 2i − 10j is fixed; the tip of v_after is draggable (starting at
// the question's 2i − 7j), and Δv = v_after − v_before is drawn between the tips, with
// |Δp| = 0.02|Δv|. Both velocities point down, so the hit only slowed the ball: Δv = 3j and
// |Δp| = 0.06 (B). "Knocked back" sets v_after = 2i + 7j, the case where 10 + 7 = 17 really would
// be right (0.34, option E). A toggle draws the two speeds as circles, to compare the change in
// speed with the magnitude of the change in velocity.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Polygon, Readout, Readouts, Toggle,
  clamp,
} from './kit'

const MASS = 0.02
const BEFORE: [number, number] = [2, -10]
const QUESTION: [number, number] = [2, -7]
const BACK: [number, number] = [2, 7]

const len = (p: [number, number]) => Math.hypot(p[0], p[1])
const same = (p: [number, number], q: [number, number]) => p[0] === q[0] && p[1] === q[1]
/** i and j components as TeX, e.g. "2\underset{\sim}{i} - 7\underset{\sim}{j}". */
function ij(p: [number, number]): string {
  const I = '\\underset{\\sim}{i}'
  const J = '\\underset{\\sim}{j}'
  const parts: string[] = []
  const k = (n: number) => (n === 1 ? '' : n === -1 ? '-' : `${n}`)
  if (p[0] !== 0) parts.push(`${k(p[0])}${I}`)
  if (p[1] !== 0) parts.push(`${parts.length && p[1] > 0 ? '+' : ''}${k(p[1])}${J}`)
  return parts.length ? parts.join(' ') : '\\underset{\\sim}{0}'
}

/** An arrow with a head sized in plane units (the plane is equal-scale), smaller than mafs's
 *  Vector head, so the short Δv arrow between the two tips stays readable. */
function Arrow({ tail, tip, color, weight = 3 }: { tail: [number, number]; tip: [number, number]; color: string; weight?: number }) {
  const dx = tip[0] - tail[0]
  const dy = tip[1] - tail[1]
  const L = Math.hypot(dx, dy)
  if (L < 0.01) return null
  const ux = dx / L
  const uy = dy / L
  const h = Math.min(0.75, L * 0.4)
  const hw = h * 0.42
  const base: [number, number] = [tip[0] - ux * h, tip[1] - uy * h]
  return (
    <>
      <Line.Segment point1={tail} point2={base} color={color} weight={weight} />
      <Polygon
        points={[tip, [base[0] - uy * hw, base[1] + ux * hw], [base[0] + uy * hw, base[1] - ux * hw]]}
        color={color}
        fillOpacity={1}
        weight={1}
      />
    </>
  )
}

export default function ChangeArrow() {
  const [after, setAfter] = useState<[number, number]>(QUESTION)
  const [speeds, setSpeeds] = useState(false)

  const dv: [number, number] = [after[0] - BEFORE[0], after[1] - BEFORE[1]]
  const dp = MASS * len(dv)
  const dSpeed = MASS * (len(after) - len(BEFORE))
  const atQ = same(after, QUESTION)
  const atBack = same(after, BACK)
  const mid: [number, number] = [(after[0] + BEFORE[0]) / 2, (after[1] + BEFORE[1]) / 2]

  let notice
  if (speeds) {
    notice = (
      <Notice tone="warn">
        The dashed circles are the two speeds, so the change in speed is only the gap between them:{' '}
        <M>{`0.02\\left(|\\underset{\\sim}{v}_{\\text{after}}| - |\\underset{\\sim}{v}_{\\text{before}}|\\right) \\approx ${dSpeed.toFixed(3)}`}</M>.
        In the question its size lands near 0.06 only because the two arrows point almost the same way. Press
        &ldquo;Knocked back&rdquo;: the circles, and so the change in speed, stay exactly the same, but{' '}
        <M>{'\\Delta\\underset{\\sim}{v}'}</M> grows to <M>{'17\\underset{\\sim}{j}'}</M>.
      </Notice>
    )
  } else if (atQ) {
    notice = (
      <Notice tone="good">
        <M>{'\\Delta\\underset{\\sim}{v}'}</M> runs from the tip of &ldquo;before&rdquo; to the tip of &ldquo;after&rdquo;:
        just <M>{'3\\underset{\\sim}{j}'}</M>, because the <M>{'\\underset{\\sim}{i}'}</M>-components match. Both arrows
        point down, so the hit only slowed the ball from 10 to 7 in the <M>{'-\\underset{\\sim}{j}'}</M> direction and 10
        and 7 subtract. Press &ldquo;Knocked back&rdquo; to see when <M>10 + 7</M> would be right.
      </Notice>
    )
  } else if (atBack) {
    notice = (
      <Notice>
        Now the ball really is sent back up, so <M>{'\\Delta\\underset{\\sim}{v} = 17\\underset{\\sim}{j}'}</M> and{' '}
        <M>{'|\\Delta\\underset{\\sim}{p}| = 0.02 \\times 17 = 0.34'}</M>, option E. That answers a different question: in the
        real one the <M>{'\\underset{\\sim}{j}'}</M>-component after the hit is still negative.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Wherever you drag &ldquo;after&rdquo;, <M>{'\\Delta\\underset{\\sim}{v} = \\underset{\\sim}{v}_{\\text{after}} - \\underset{\\sim}{v}_{\\text{before}}'}</M>{' '}
        is the arrow from the tip of before to the tip of after, and <M>{'|\\Delta\\underset{\\sim}{p}|'}</M> is 0.02 times
        its length. Press &ldquo;The question&rdquo; to go back.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-6, 8]} y={[-11, 8]} xStep={2} yStep={2} equalScale height={500} xLabel="i" yLabel="j">
        {speeds && (
          <>
            <Circle center={[0, 0]} radius={len(BEFORE)} color={C.g} fillOpacity={0} weight={1.5} strokeStyle="dashed" />
            <Circle center={[0, 0]} radius={len(after)} color={C.f} fillOpacity={0} weight={1.5} strokeStyle="dashed" />
          </>
        )}
        <Arrow tail={[0, 0]} tip={BEFORE} color={C.g} />
        <Arrow tail={[0, 0]} tip={after} color={C.f} />
        <Arrow tail={BEFORE} tip={after} color={C.good} weight={4} />
        <Label at={BEFORE} attach="se" color={C.g}>before</Label>
        <Label at={after} attach={after[1] >= 0 ? 'ne' : after[0] >= 2 ? 'e' : 'w'} color={C.f}>after</Label>
        {len(dv) > 1.5 && <Label at={mid} attach={dv[0] >= 0 ? 'e' : 'w'} color={C.good}>Δv</Label>}
        <MovablePoint
          point={after}
          onMove={p => setAfter([clamp(Math.round(p[0]), -6, 8), clamp(Math.round(p[1]), -11, 8)])}
          color={C.f}
        />
      </Plane>
      <Controls>
        <Buttons>
          <ActionButton label="The question: 2i − 7j" onClick={() => setAfter(QUESTION)} />
          <ActionButton label="Knocked back: 2i + 7j" onClick={() => setAfter(BACK)} />
          <Toggle label="Compare the change in speed" checked={speeds} onChange={setSpeeds} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\underset{\\sim}{v}_{\\text{after}} = ${ij(after)}`} />
          <Readout color={C.good} tex={`\\Delta\\underset{\\sim}{v} = ${ij(dv)}`} />
          <Readout color={C.good} tex={`|\\Delta\\underset{\\sim}{p}| = 0.02 \\times ${Number.isInteger(len(dv)) ? len(dv) : len(dv).toFixed(2)} =${dp.toFixed(3)}`} />
          {speeds && <Readout color={C.bad} tex={`0.02 \\times \\text{change in speed} = ${dSpeed.toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
