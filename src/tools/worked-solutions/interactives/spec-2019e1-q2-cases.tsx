// 2019 Specialist Exam 1 Q2 — |x − 4| = x/2 + 7 solved by cases, seen as a picture. The V of
// y = |x − 4| is two straight arms: y = x − 4 (Case 1, x ≥ 4) and y = 4 − x (Case 2, x < 4). Each
// case's algebra solves with the arm's WHOLE line, so its answer only counts if it lands on the
// real arm. A slider moves the constant in y = x/2 + k: at k = 7 (the question) both answers land
// on the V (x = 22 and x = −2); below k = −2 the line passes under the vertex and both case
// answers land on the dashed extensions — the numbers the unchecked algebra (or squaring) would
// wrongly keep. Case 1 gives x = 2k + 8, Case 2 gives x = (8 − 2k)/3.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle,
} from './kit'

const X0 = -6
const X1 = 26
const Y0 = -8
const Y1 = 22
const K_Q = 7
// drawing extent: the plane pads a little past the ranges, so draw past them too
const D0 = X0 - 4
const D1 = X1 + 4

/** k in steps of 0.5, written with a real minus sign. */
const kStr = (k: number) => (Number.isInteger(k) ? String(k) : k.toFixed(1)).replace('-', '−')

/** m/3 in lowest terms, as TeX. */
function thirdsTex(m: number): string {
  if (m % 3 === 0) return String(m / 3)
  const s = m < 0 ? '-' : ''
  return `${s}\\tfrac{${Math.abs(m)}}{3}`
}

/** m/3 as plain text for a plane label. */
function thirdsText(m: number): string {
  if (m % 3 === 0) return String(m / 3).replace('-', '−')
  return `${m < 0 ? '−' : ''}${Math.abs(m)}/3`
}

export default function Cases() {
  const [k, setK] = useState(K_Q)
  const [ghost, setGhost] = useState(true)

  // Case 1 (x ≥ 4): x − 4 = x/2 + k  ⇒  x = 2k + 8
  const x1 = 2 * k + 8
  const y1 = x1 - 4
  const ok1 = x1 >= 4
  // Case 2 (x < 4): 4 − x = x/2 + k  ⇒  x = (8 − 2k)/3
  const m2 = Math.round(8 - 2 * k) // numerator over 3 (2k is an integer)
  const x2 = m2 / 3
  const y2 = 4 - x2
  const ok2 = x2 < 4
  const sameAsCase1 = Math.abs(x2 - x1) < 1e-9
  const nSol = (ok1 ? 1 : 0) + (ok2 ? 1 : 0)
  const line = (x: number) => x / 2 + k

  let notice
  if (k === K_Q) {
    notice = (
      <Notice tone="good">
        <b>This is the question, <M>k = 7</M>.</b> At <M>x = 4</M> the line is already <M>9</M> above the vertex. Going
        right, the arm (gradient <M>1</M>) gains on the line (gradient <M>{'\\tfrac12'}</M>) by only <M>{'\\tfrac12'}</M>{' '}
        per unit, so it takes <M>18</M> units to catch up: <M>x = 22</M>. Going left, the gap closes by{' '}
        <M>{'1 + \\tfrac12 = \\tfrac32'}</M> per unit, so after <M>6</M> units: <M>x = -2</M>. Now drag <M>k</M> below{' '}
        <M>-2</M>.
      </Notice>
    )
  } else if (k > -2) {
    notice = (
      <Notice>
        At <M>x = 4</M> the line has height <M>{'2 + k'}</M>, which is positive, so it passes <b>above the vertex</b> and
        crosses each arm once: two solutions, one from each case. Both case answers land on their own solid arm, so both
        pass the check. Keep dragging <M>k</M> below <M>-2</M>.
      </Notice>
    )
  } else if (k === -2) {
    notice = (
      <Notice>
        The line passes <b>through the vertex</b> <M>(4, 0)</M>. Both cases give <M>x = 4</M>: Case 1 keeps it (
        <M>{'4 \\ge 4'}</M>), and Case 2 must reject it (<M>{'4 < 4'}</M> is false) — the same point, so just one
        solution.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The line now passes <b>under the vertex</b> and misses the V completely: no solutions. Yet the algebra still
        produces two numbers ({ghost ? 'in red' : 'turn on the full lines to see them'}). Each one is where the line meets an arm&apos;s <b>dashed extension</b>, so it breaks
        its own case&apos;s condition. Squaring both sides gives these same two fakes, because at both of them{' '}
        <M>{'\\tfrac{x}{2} + k'}</M> is negative, and a modulus can never equal a negative number.
      </Notice>
    )
  }

  const tick1 = ok1 ? '\\ \\checkmark' : '\\ \\times'
  const tick2 = ok2 ? '\\ \\checkmark' : '\\ \\times'
  const showCase2Point = !sameAsCase1 && (ghost || ok2)

  return (
    <div>
      <Plane x={[X0, X1]} y={[Y0, Y1]} xStep={4} yStep={4} height={340}>
        {/* the two case regions */}
        <Region top={() => Y1 + 4} bottom={() => Y0 - 4} from={D0} to={4} color={C.violet} opacity={0.06} />
        <Region top={() => Y1 + 4} bottom={() => Y0 - 4} from={4} to={D1} color={C.f} opacity={0.06} />
        <Line.Segment point1={[4, Y0 - 4]} point2={[4, Y1 + 4]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[3.8, Y1]} attach="w" color={C.violet} size={11}>x &lt; 4</Label>
        <Label at={[4.2, Y1]} attach="e" color={C.f} size={11}>x ≥ 4</Label>

        {/* each arm's full line, dashed where it is not part of the V */}
        {ghost && <Plot.OfX y={x => x - 4} domain={[D0, 4]} color={C.f} weight={2} style="dashed" opacity={0.8} />}
        {ghost && <Plot.OfX y={x => 4 - x} domain={[4, D1]} color={C.violet} weight={2} style="dashed" opacity={0.8} />}

        {/* the V itself */}
        <Plot.OfX y={x => 4 - x} domain={[D0, 4]} color={C.violet} weight={3.5} />
        <Plot.OfX y={x => x - 4} domain={[4, D1]} color={C.f} weight={3.5} />
        <Label at={[13, 9]} attach="se" color={C.f} size={12}>y = x − 4</Label>
        {/* the left arm's name sits on its dashed continuation when shown (more room there) */}
        <Label at={ghost ? [9, -5] : [-6, 10]} attach="ne" color={C.violet} size={12}>y = 4 − x</Label>

        {/* the line y = x/2 + k */}
        <Plot.OfX y={line} domain={[D0, D1]} color={C.g} weight={3} />
        <Label at={[14, line(14)]} attach="nw" color={C.g} size={12}>{k === 0 ? 'y = ½x' : `y = ½x ${k < 0 ? '−' : '+'} ${kStr(Math.abs(k))}`}</Label>

        {/* what each case's algebra finds: a real solution drops to its x-value on the axis; a
            rejected one (on a dashed extension) is labelled in red where it sits */}
        {ok1 && x1 !== 4 && <Line.Segment point1={[x1, y1]} point2={[x1, 0]} color={C.good} style="dashed" weight={1.5} />}
        {(ghost || ok1) && <Point x={x1} y={y1} color={ok1 ? C.good : C.bad} />}
        {(ghost || ok1) && (
          <Label
            at={ok1 ? [x1, x1 === 4 ? 1.4 : 0] : [x1, y1]}
            attach={ok1 ? (x1 === 4 ? 'n' : 'ne') : 'se'}
            color={ok1 ? C.good : C.bad}
            size={12}
          >
            {`x = ${String(x1).replace('-', '−')}${ok1 ? '' : ' ✗'}`}
          </Label>
        )}
        {ok2 && !sameAsCase1 && <Line.Segment point1={[x2, y2]} point2={[x2, 0]} color={C.good} style="dashed" weight={1.5} />}
        {showCase2Point && <Point x={x2} y={y2} color={ok2 ? C.good : C.bad} />}
        {showCase2Point && (
          <Label at={ok2 ? [x2, 0] : [x2, y2 - 0.3]} attach={ok2 ? 'nw' : 'e'} gap={ok2 ? 7 : 16} color={ok2 ? C.good : C.bad} size={12}>
            {`x = ${thirdsText(m2)}${ok2 ? '' : ' ✗'}`}
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={-5} max={8} step={0.5} format={kStr} />
        <Buttons>
          <Toggle label="Extend each arm into its full line" checked={ghost} onChange={setGhost} />
          {k !== K_Q && <ActionButton label="Back to the question (k = 7)" onClick={() => setK(K_Q)} />}
        </Buttons>
        <Readouts>
          <Readout color={ok1 ? C.good : C.bad} tex={`\\text{Case 1 } (x \\ge 4)\\text{: } x = 2k + 8 = ${x1}${tick1}`} />
          <Readout color={ok2 ? C.good : C.bad} tex={`\\text{Case 2 } (x < 4)\\text{: } x = \\tfrac{8 - 2k}{3} = ${thirdsTex(m2)}${tick2}`} />
          <Readout tex={`\\text{solutions: } ${nSol}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
