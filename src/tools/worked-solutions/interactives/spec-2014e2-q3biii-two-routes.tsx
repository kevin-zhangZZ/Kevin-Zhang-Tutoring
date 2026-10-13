// 2014 Specialist Exam 2 Q3b.iii — the point P is reached two ways: along AD (A + α·AD) and along
// OB (β·OB). Each route writes AP as (a-coefficient)a + (c-coefficient)c: via AD it is
// −(α/2)a + αc, via OB it is (β − 1)a + βc. Two sliders move the two candidate points; they land on
// the same point only when BOTH coefficients agree. Because a is drawn horizontal, the
// c-coefficient is the height (fraction of the way up), so α = β puts the points level; the
// a-coefficients then agree only at −α/2 = α − 1, i.e. α = β = 2/3 (checked with sympy). The
// parallelogram is drawn skewed (a = (4, 0), c = (1.5, 3)) so a and c are visibly not
// perpendicular — equating coefficients needs only that they are not parallel.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Point, Polygon, Readout, Readouts, Slider, Toggle, num,
} from './kit'

type V = [number, number]
const A_: V = [4, 0]
const C_: V = [1.5, 3]
const O: V = [0, 0]
const A = A_
const Cpt = C_
const B: V = [A_[0] + C_[0], A_[1] + C_[1]]
const D: V = [C_[0] + A_[0] / 2, C_[1] + A_[1] / 2]
const TOL = 1e-6 // exact match only: the slider grid (step 0.01) never hits 2/3, so only the button reaches P

/** A + m·a + n·c */
const fromA = (m: number, n: number): V => [A[0] + m * A_[0] + n * C_[0], A[1] + m * A_[1] + n * C_[1]]

export default function TwoRoutes() {
  const [alpha, setAlpha] = useState(0.3)
  const [beta, setBeta] = useState(0.8)
  const [lock, setLock] = useState(false)

  const b = lock ? alpha : beta
  // Coefficients of AP in terms of a and c
  const m1 = -alpha / 2
  const n1 = alpha
  const m2 = b - 1
  const n2 = b
  const cMatch = Math.abs(n1 - n2) < TOL
  const aMatch = Math.abs(m1 - m2) < TOL
  const both = cMatch && aMatch

  const P1 = fromA(m1, n1)
  const P2 = fromA(m2, n2)
  const K1 = fromA(m1, 0)
  const K2 = fromA(m2, 0)
  const col1 = both ? C.good : C.g
  const col2 = both ? C.good : C.f

  let notice
  if (both) {
    notice = (
      <Notice tone="good">
        <b>Both coefficients agree, so the two points coincide: this is <M>P</M>.</b> The <M>{'\\underset{\\sim}{c}'}</M>-coefficients
        gave <M>{'\\alpha = \\beta'}</M> and the <M>{'\\underset{\\sim}{a}'}</M>-coefficients gave <M>{'-\\tfrac\\alpha2 = \\beta - 1'}</M>;
        together <M>{'\\alpha = \\beta = \\tfrac23'}</M>. Both dashed paths are now the same path:{' '}
        <M>{'\\overrightarrow{AP} = -\\tfrac13\\underset{\\sim}{a} + \\tfrac23\\underset{\\sim}{c}'}</M>.
      </Notice>
    )
  } else if (cMatch) {
    notice = (
      <Notice tone="warn">
        <b>Same <M>{'\\underset{\\sim}{c}'}</M>-coefficient, so the points are level</b> — but the{' '}
        <M>{'\\underset{\\sim}{a}'}</M>-coefficients differ (<M>{`${num(m1, 2)}`}</M> vs <M>{`${num(m2, 2)}`}</M>), so they are still
        different points. Matching one coefficient is not enough. {lock ? <>Keep sliding <M>\alpha</M> until the points meet.</> : <>Turn on &ldquo;Keep <M>{'\\beta = \\alpha'}</M>&rdquo; and slide.</>}
      </Notice>
    )
  } else if (aMatch) {
    notice = (
      <Notice tone="warn">
        <b>Same <M>{'\\underset{\\sim}{a}'}</M>-coefficient, so both dashed paths start with the same step along <M>{'\\underset{\\sim}{a}'}</M></b>, but
        the <M>{'\\underset{\\sim}{c}'}</M>-coefficients differ, so the points are at different heights. Both coefficients must match.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Orange is <M>{'A + \\alpha\\overrightarrow{AD}'}</M>, blue is <M>{'\\beta\\overrightarrow{OB}'}</M>. Each dashed path goes from{' '}
        <M>A</M> along <M>{'\\underset{\\sim}{a}'}</M>, then along <M>{'\\underset{\\sim}{c}'}</M>, by that route&apos;s coefficients.
        The points meet only when <b>both</b> coefficients agree. Since <M>{'\\underset{\\sim}{c}'}</M> is the only one that goes up,
        start by making the heights equal: turn on &ldquo;Keep <M>{'\\beta = \\alpha'}</M>&rdquo;.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.6, 6.2]} y={[-0.7, 3.7]} equalScale height={340} labels={false} xLabel="" yLabel="">
        <Polygon points={[O, A, B, Cpt]} color={C.guide} fillOpacity={0.06} weight={2} />
        <Line.Segment point1={A} point2={D} color={C.g} weight={2} opacity={0.6} />
        <Line.Segment point1={O} point2={B} color={C.f} weight={2} opacity={0.6} />
        {/* staircase paths from A: along a, then along c */}
        <Line.Segment point1={A} point2={K1} color={col1} weight={2} style="dashed" />
        <Line.Segment point1={K1} point2={P1} color={col1} weight={2} style="dashed" />
        <Line.Segment point1={A} point2={K2} color={col2} weight={2} style="dashed" />
        <Line.Segment point1={K2} point2={P2} color={col2} weight={2} style="dashed" />
        <Point x={P1[0]} y={P1[1]} color={col1} />
        <Point x={P2[0]} y={P2[1]} color={col2} />
        <Label at={O} attach="sw">O</Label>
        <Label at={A} attach="se">A</Label>
        <Label at={B} attach="ne">B</Label>
        <Label at={Cpt} attach="nw">C</Label>
        <Label at={D} attach="n">D</Label>
        {both ? (
          <Label at={P1} attach="e" color={C.good}>P</Label>
        ) : (
          <>
            <Label at={P1} attach="e" color={C.g}>via AD</Label>
            <Label at={P2} attach="w" color={C.f}>via OB</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="\alpha" value={alpha} onChange={setAlpha} min={0} max={1} step={0.01} />
        {!lock && <Slider label="\beta" value={beta} onChange={setBeta} min={0} max={1} step={0.01} />}
        <Buttons>
          <Toggle label={<>Keep <M>{'\\beta = \\alpha'}</M></>} checked={lock} onChange={v => { setLock(v); if (v) setBeta(alpha) }} />
          <ActionButton label={<>Show <M>{'\\alpha = \\beta = \\tfrac23'}</M></>} onClick={() => { setAlpha(2 / 3); setBeta(2 / 3) }} />
        </Buttons>
        <Readouts>
          <Readout color={col1} tex={`\\text{via } AD:\\ \\overrightarrow{AP} = ${num(m1, 2)}\\,\\underset{\\sim}{a} + ${num(n1, 2)}\\,\\underset{\\sim}{c}`} />
          <Readout color={col2} tex={`\\text{via } OB:\\ \\overrightarrow{AP} = ${num(m2, 2)}\\,\\underset{\\sim}{a} + ${num(n2, 2)}\\,\\underset{\\sim}{c}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
