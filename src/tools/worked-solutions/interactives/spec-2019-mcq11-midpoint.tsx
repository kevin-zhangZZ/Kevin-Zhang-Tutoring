// 2019 Specialist Exam 2 MCQ 11 — the midpoint is halfway along each axis separately. Three
// number lines, one per coordinate. Drag M's x-coordinate a and N's y-coordinate b: the midpoint
// (their average with the fixed end) moves only half as far, so the unknown end is the known end
// reflected in the midpoint: a = 2(−5) − (−3) = −7 and b = 2(3/2) − 1 = 2. The z-coordinates are
// both given, so c is just their average, −3/2 (option E). The option buttons load each answer's
// (a, b, c) and show which rows fail: B and D stop at the gap −5 − (−3) = −2 without doubling, A
// subtracts N's coordinates.

import { useState, type ReactNode } from 'react'
import type { Attach } from './kit'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Readout, Readouts,
} from './kit'

type Letter = 'A' | 'B' | 'C' | 'D' | 'E'
const OPTIONS: Record<Letter, [number, number, number]> = {
  A: [-13, 2, -0.5],
  B: [-2, 0.5, -3],
  C: [-7, -2, -1.5],
  D: [-2, -0.5, -3],
  E: [-7, 2, -1.5],
}
const WHY: Record<Letter, ReactNode> = {
  A: (
    <>
      Option A: <M>a = -13</M> comes from subtracting <M>N</M>&apos;s coordinate, <M>{'\\tfrac{a - (-3)}{2} = -5'}</M>, and{' '}
      <M>{'c = -\\tfrac12'}</M> from <M>{'\\tfrac{-2 - (-1)}{2}'}</M>. A midpoint <b>adds</b> the coordinates, so the{' '}
      <M>x</M>-midpoint lands at <M>-8</M>, and the true <M>z</M>-midpoint is <M>{'-\\tfrac32'}</M>.
    </>
  ),
  B: (
    <>
      Option B: <M>{'a = -5 - (-3) = -2'}</M> is only the gap between <M>N</M> and the midpoint. <M>M</M> must be that same
      gap again on the far side of the midpoint. The <M>x</M>-midpoint lands at <M>{'-\\tfrac52'}</M>, the{' '}
      <M>y</M>-midpoint at <M>{'\\tfrac34'}</M>, and <M>c = -3</M> is the sum <M>{'-2 + (-1)'}</M>, never halved.
    </>
  ),
  C: (
    <>
      Option C has the right <M>a</M> and <M>c</M>, but with <M>b = -2</M> the <M>y</M>-midpoint is{' '}
      <M>{'\\tfrac{1 + (-2)}{2} = -\\tfrac12'}</M>, not <M>{'\\tfrac32'}</M>.
    </>
  ),
  D: (
    <>
      Option D makes the same slip as B for <M>a</M> and <M>c</M> (no doubling, no halving), and{' '}
      <M>{'b = -\\tfrac12'}</M> puts the <M>y</M>-midpoint at <M>{'\\tfrac14'}</M>.
    </>
  ),
  E: (
    <>
      Option E: every row lands. <M>a = -7</M> and <M>b = 2</M> are the known ends reflected in the midpoint, and{' '}
      <M>{'c = -\\tfrac32'}</M> is the average of <M>-2</M> and <M>-1</M>.
    </>
  ),
}

const ROW = { x: 2, y: 1, z: 0 }
const X0 = -14
const X1 = 3
const snap = (v: number) => Math.min(X1, Math.max(X0, Math.round(v * 2) / 2))

/** Plain-text value for labels: halves and quarters as fractions, with a true minus sign. */
function txt(v: number): string {
  const sign = v < 0 ? '−' : ''
  const a = Math.abs(v)
  if (Number.isInteger(a)) return sign + a
  if (Number.isInteger(a * 2)) return `${sign}${a * 2}/2`
  return `${sign}${a * 4}/4`
}
/** TeX value: halves and quarters as \tfrac. */
function tex(v: number): string {
  const sign = v < 0 ? '-' : ''
  const a = Math.abs(v)
  if (Number.isInteger(a)) return sign + a
  if (Number.isInteger(a * 2)) return `${sign}\\tfrac{${a * 2}}{2}`
  return `${sign}\\tfrac{${a * 4}}{4}`
}

/** M and N labels lean away from each other, so they stay apart when the points are close. */
const out = (self: number, other: number): Attach => (self <= other ? 'nw' : 'ne')
const ring = (color: string) => ({ r: 10, style: { fill: 'none', stroke: color, strokeWidth: 2.5 } })

export default function Midpoint() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(-4)
  const [pick, setPick] = useState<Letter | null>(null)

  const midX = (a - 3) / 2
  const midY = (1 + b) / 2
  const midZ = -1.5
  const hitX = midX === -5
  const hitY = midY === 1.5
  const claimedC = pick ? OPTIONS[pick][2] : null

  const load = (L: Letter) => {
    setA(OPTIONS[L][0])
    setB(OPTIONS[L][1])
    setPick(L)
  }

  /** One number line: the fixed/draggable ends, the two equal halves, the midpoint. */
  const row = (Y: number, mV: number, nV: number, mid: number) => (
    <>
      <Line.Segment point1={[X0, Y]} point2={[X1, Y]} color={C.guide} weight={1.5} />
      <Line.Segment point1={[mV, Y]} point2={[mid, Y]} color={C.f} weight={4} />
      <Line.Segment point1={[mid, Y]} point2={[nV, Y]} color={C.g} weight={4} />
      <Point x={mid} y={Y} color={C.violet} />
      <Label at={[mid, Y]} color={C.violet} attach="s" size={12}>{txt(mid)}</Label>
    </>
  )

  let notice
  if (pick) {
    notice = <Notice tone={pick === 'E' ? 'good' : 'warn'}>{WHY[pick]}</Notice>
  } else if (hitX && hitY) {
    notice = (
      <Notice tone="good">
        Both land: <M>a = -7</M> and <M>b = 2</M>. On the <M>z</M>-line both ends are given, so there is nothing to solve:{' '}
        <M>{'c = \\tfrac{-2 + (-1)}{2} = -\\tfrac32'}</M>. That is option E. Now load the wrong options to see where each one
        breaks.
      </Notice>
    )
  } else if (hitX) {
    notice = (
      <Notice>
        <M>a = -7</M>: <M>M</M> is 2 to the left of the midpoint, exactly as <M>N</M> is 2 to the right. <M>M</M> is{' '}
        <M>N</M> reflected in the midpoint, so <M>{'a = 2(-5) - (-3)'}</M>. Now drag <M>N</M> on the <M>y</M>-line until
        its midpoint reaches the ring at <M>{'\\tfrac32'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Drag <M>M</M> (blue) along the <M>x</M>-line. The midpoint (violet) moves only <b>half</b> as far as <M>M</M>,
        because it is the average of <M>M</M> and a fixed <M>N</M>. Put the midpoint on the green ring at <M>-5</M>: how far
        did <M>M</M> have to go?
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[-0.6, 2.6]} xStep={1} yStep={1} height={240} labels={false} xLabel="" yLabel="">
        {/* Targets: where the midpoint has to land. */}
        <Point x={-5} y={ROW.x} color={C.good} svgCircleProps={ring(C.good)} />
        <Point x={1.5} y={ROW.y} color={C.good} svgCircleProps={ring(C.good)} />
        {claimedC !== null && (
          <Point x={claimedC} y={ROW.z} color={C.bad} svgCircleProps={ring(claimedC === midZ ? C.good : C.bad)} />
        )}

        {row(ROW.x, a, -3, midX)}
        {row(ROW.y, 1, b, midY)}
        {row(ROW.z, -2, -1, midZ)}

        {/* Fixed ends. */}
        <Point x={-3} y={ROW.x} color={C.g} />
        <Point x={1} y={ROW.y} color={C.f} />
        <Point x={-2} y={ROW.z} color={C.f} />
        <Point x={-1} y={ROW.z} color={C.g} />

        {/* Draggable unknowns. */}
        <MovablePoint
          point={[a, ROW.x]}
          color={C.f}
          constrain={([x]) => [snap(x), ROW.x]}
          onMove={([x]) => {
            setA(snap(x))
            setPick(null)
          }}
        />
        <MovablePoint
          point={[b, ROW.y]}
          color={C.g}
          constrain={([x]) => [snap(x), ROW.y]}
          onMove={([x]) => {
            setB(snap(x))
            setPick(null)
          }}
        />

        <Label at={[a, ROW.x]} color={C.f} attach={out(a, -3)} gap={8}>M</Label>
        <Label at={[-3, ROW.x]} color={C.g} attach={out(-3 + 1e-9, a)} gap={8}>N</Label>
        <Label at={[1, ROW.y]} color={C.f} attach={out(1, b)} gap={8}>M</Label>
        <Label at={[b, ROW.y]} color={C.g} attach={out(b + 1e-9, 1)} gap={8}>N</Label>
        <Label at={[-2, ROW.z]} color={C.f} attach="nw" gap={8}>M</Label>
        <Label at={[-1, ROW.z]} color={C.g} attach="ne" gap={8}>N</Label>
        <Label at={[X0, ROW.x]} attach="w" italic>x</Label>
        <Label at={[X0, ROW.y]} attach="w" italic>y</Label>
        <Label at={[X0, ROW.z]} attach="w" italic>z</Label>
        {[-12, -8, -4, 0].map(k => (
          <Label key={k} at={[k, -0.35]} color={C.guide} attach="s" size={11} bold={false}>
            {txt(k)}
          </Label>
        ))}
      </Plane>
      <Controls>
        <Buttons>
          {(Object.keys(OPTIONS) as Letter[]).map(L => (
            <ActionButton key={L} label={`Option ${L}`} onClick={() => load(L)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`a = ${tex(a)}`} />
          <Readout color={C.g} tex={`b = ${tex(b)}`} />
          <Readout
            color={hitX && hitY ? C.good : C.violet}
            tex={`\\text{midpoint} = \\left(${tex(midX)},\\ ${tex(midY)},\\ -\\tfrac32\\right)`}
          />
          {claimedC !== null && (
            <Readout color={claimedC === midZ ? C.good : C.bad} tex={`\\text{option's } c = ${tex(claimedC)}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
