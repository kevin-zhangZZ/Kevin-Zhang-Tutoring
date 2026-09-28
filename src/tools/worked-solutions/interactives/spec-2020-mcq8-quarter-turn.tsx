// 2020 Specialist Exam 2 MCQ 8 — why (y − ix)¹⁴ = −(x + iy)¹⁴. On the Argand plane, y − ix is
// x + iy turned a quarter-turn clockwise about O (it is −i(x + iy), and multiplying by −i turns by
// −90° and keeps the modulus). Raising both to the power n multiplies both arguments by n, so the
// gap between the powers becomes n quarter-turns: for n = 14 that is 3½ turns, the same as a
// half-turn, so the two 14th powers are opposite each other through O: (−i)¹⁴ = −1. Drag x + iy
// round the unit circle (kept at modulus 1 so the powers stay on screen; the two moduli are always
// equal anyway), slide n from 1 to 14, and watch (−i)ⁿ cycle −i, −1, i, 1. A toggle shows option B
// (29%), −i(a + ib) = b − ia: the 14th power turned only once, as if the −i were never raised to
// the 14th power.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Polyline, Readout, Readouts,
  Slider, Toggle,
} from './kit'

const PI = Math.PI
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹'
const sup = (n: number) => String(n).split('').map(d => SUP[Number(d)]).join('')
const at = (angle: number, r = 1): [number, number] => [r * Math.cos(angle), r * Math.sin(angle)]
/** Where to centre a text label for the point at `angle`: pushed further out when the point is to the
 *  left or right of O, so a wide label clears the point instead of sitting on it. */
const labelAt = (angle: number, r: number) => at(angle, r + 0.24 * Math.abs(Math.cos(angle)))
const CYCLE = ['1', '-i', '-1', 'i'] // (−i)ⁿ for n ≡ 0, 1, 2, 3 (mod 4)

/** A clockwise spiral from angle `from` turning through `turn` radians (negative = clockwise),
 *  its radius growing a little each full turn so several turns stay visible. */
function spiral(from: number, turn: number): [number, number][] {
  const steps = Math.max(12, Math.ceil(Math.abs(turn) / 0.06))
  const pts: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const t = (turn * i) / steps
    const r = 0.2 + (0.1 * Math.abs(t)) / (2 * PI)
    pts.push(at(from + t, r))
  }
  return pts
}

export default function QuarterTurn() {
  const [theta, setTheta] = useState(0.35)
  const [n, setN] = useState(1)
  const [showB, setShowB] = useState(false)

  const w = at(theta)
  const wn = at(n * theta) // (x + iy)ⁿ
  const zn = at(n * (theta - PI / 2)) // (y − ix)ⁿ = ((−i)(x + iy))ⁿ
  const bn = at(n * theta - PI / 2) // −i(x + iy)ⁿ: option B's idea
  const r = n % 4
  const gap = -90 * n
  const equiv = ((gap % 360) + 360) % 360 // in [0, 360)
  const equivSigned = equiv > 180 ? equiv - 360 : equiv
  const showBNow = showB && n === 14
  const bLabel = n === 1 ? 'x + iy' : `(x+iy)${sup(n)}`
  const oLabel = n === 1 ? 'y − ix' : `(y−ix)${sup(n)}`

  let notice
  if (showBNow) {
    notice = (
      <Notice tone="warn">
        <b>The red point is option B</b>, <M>-i(a + ib) = b - ia</M>: the blue <M>(x + iy)^{'{14}'}</M> turned just{' '}
        <i>one</i> quarter-turn. That is what you get by taking the <M>-i</M> outside the bracket without raising it to the
        14th power. The true <M>(y - ix)^{'{14}'}</M> (orange) has been turned 14 quarter-turns, which is a half-turn: it is
        a quarter-turn further round than the red point.
      </Notice>
    )
  } else if (n === 1) {
    notice = (
      <Notice>
        <b>Multiplying by <M>-i</M> turns a point a quarter-turn clockwise about <M>O</M></b> and keeps its distance from{' '}
        <M>O</M>: <M>x + iy</M> (blue) becomes <M>y - ix</M> (orange). Check with coordinates: <M>(x, y)</M> goes to{' '}
        <M>(y, -x)</M>. That is the whole trick: <M>y - ix = -i(x + iy)</M>. Now slide <M>n</M> up and watch the gap
        between the two powers.
      </Notice>
    )
  } else if (n === 14) {
    notice = (
      <Notice tone="good">
        <b><M>n = 14</M>.</b> Raising to a power multiplies the arguments, so the quarter-turn gap has become 14
        quarter-turns clockwise: <M>{'3\\tfrac12'}</M> turns, which ends up in the same place as a half-turn. Orange is
        exactly opposite blue, wherever you drag <M>x + iy</M>: <M>{'(y - ix)^{14} = -(x + iy)^{14} = -(a + ib)'}</M>, option
        A. Now switch on option B.
      </Notice>
    )
  } else if (r === 2) {
    notice = (
      <Notice>
        <M>{`n = ${n}`}</M>: the gap is {n} quarter-turns, a whole number of turns and a half. So the two points are
        opposite each other: <M>{`(-i)^{${n}} = -1`}</M>. Every <M>n</M> that leaves remainder 2 on division by 4 does this,
        and 14 is one of them.
      </Notice>
    )
  } else if (r === 3) {
    notice = (
      <Notice>
        <M>{`n = ${n}`}</M>: {n} quarter-turns clockwise is whole turns plus three more quarter-turns clockwise, the same as
        one quarter-turn anticlockwise. So <M>{`(-i)^{${n}} = i`}</M>: orange is blue turned <M>90^\circ</M> anticlockwise.
      </Notice>
    )
  } else if (r === 0) {
    notice = (
      <Notice>
        <M>{`n = ${n}`}</M>: {n} quarter-turns is exactly {n / 4} full {n === 4 ? 'turn' : 'turns'}, so the two points
        coincide: <M>{`(-i)^{${n}} = 1`}</M>. Keep going.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{`n = ${n}`}</M>: whole turns plus one quarter-turn clockwise, the same gap as at <M>n = 1</M>:{' '}
        <M>{`(-i)^{${n}} = -i`}</M>. The powers of <M>-i</M> repeat every four: <M>-i,\ -1,\ i,\ 1</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-1.5, 1.5]}
        y={[-1.5, 1.5]}
        xStep={0.5}
        yStep={0.5}
        equalScale
        height={330}
        labels={false}
        xLabel="Re"
        yLabel="Im"
      >
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={1.5} />
        <Label at={[1, 0]} attach="se" size={11} color={C.guide}>1</Label>
        {/* The turn from (x + iy)ⁿ to (y − ix)ⁿ: n quarter-turns clockwise. */}
        <Polyline points={spiral(n * theta, (-n * PI) / 2)} color={C.g} weight={2} />
        <Line.Segment point1={[0, 0]} point2={wn} color={C.f} weight={2} />
        <Line.Segment point1={[0, 0]} point2={zn} color={C.g} weight={2} />
        {showBNow && (
          <>
            <Line.Segment point1={[0, 0]} point2={bn} color={C.bad} style="dashed" weight={2} />
            <Point x={bn[0]} y={bn[1]} color={C.bad} />
            <Label at={at(n * theta - PI / 2, 1.2)} color={C.bad} attach="c">
              B
            </Label>
          </>
        )}
        {n > 1 && (
          <Label at={labelAt(theta, 1.2)} color={C.f} attach="c" size={11} bold={false}>
            x + iy
          </Label>
        )}
        <Point x={zn[0]} y={zn[1]} color={C.g} />
        <Label at={labelAt(n * (theta - PI / 2), 1.24)} color={C.g} attach="c">
          {oLabel}
        </Label>
        <Point x={wn[0]} y={wn[1]} color={C.f} />
        <Label at={labelAt(n * theta, 1.24)} color={C.f} attach="c">
          {bLabel}
        </Label>
        <MovablePoint
          point={w}
          constrain={([px, py]) => {
            const len = Math.hypot(px, py) || 1
            return [px / len, py / len]
          }}
          onMove={([px, py]) => setTheta(Math.atan2(py, px))}
          color={C.f}
        />
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={14} step={1} format={v => String(v)} />
        <Buttons>
          <ActionButton label="n = 1" onClick={() => setN(1)} />
          <ActionButton label="Jump to n = 14" onClick={() => setN(14)} />
          <Toggle
            label="Show option B's answer"
            checked={showB}
            onChange={v => {
              setShowB(v)
              if (v) setN(14)
            }}
          />
        </Buttons>
        <div className="flex items-center gap-1.5 text-[12.5px] text-gray-600 dark:text-gray-300">
          <span className="mr-1">
            <M>{'(-i)^n'}</M> cycles:
          </span>
          {[1, 2, 3, 0].map(m => (
            <span
              key={m}
              className={`px-2 py-0.5 rounded-md border ${
                m === r
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-100 font-semibold'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <M>{CYCLE[m]}</M>
            </span>
          ))}
        </div>
        <Readouts>
          {n === 1 ? (
            <Readout color={C.g} tex="y - ix = -i(x + iy)" />
          ) : (
            <>
              <Readout color={C.g} tex={`(y - ix)^{${n}} = (-i)^{${n}}(x + iy)^{${n}}`} />
              <Readout
                tex={`= ${CYCLE[r] === '1' ? '' : CYCLE[r] === '-1' ? '-' : CYCLE[r]}(x + iy)^{${n}}${n === 14 ? ' = -(a + ib)' : ''}`}
              />
            </>
          )}
          <Readout
            tex={`\\text{gap} = ${n}\\times(-90^\\circ) = ${gap}^\\circ${Math.abs(gap) > 180 ? ` \\equiv ${equivSigned}^\\circ` : ''}`}
          />
        </Readouts>
        {notice}
        <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
          Drag the blue point <M>x + iy</M> round the circle. It is kept at modulus 1 so its powers stay on screen; that loses
          nothing, because <M>|y - ix| = |x + iy|</M>, so the two powers always have equal moduli and only the angles differ.
        </p>
      </Controls>
    </div>
  )
}
