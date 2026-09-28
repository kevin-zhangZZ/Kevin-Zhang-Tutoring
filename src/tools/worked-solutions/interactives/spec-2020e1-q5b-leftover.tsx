// 2020 Specialist Exam 1 Q5b — split a = 2i − 3j + k into a piece along b = i + 4j − k and a
// leftover. Slide a multiple t·b (violet) along the line of b; the leftover a − t·b runs from its
// tip to the tip of a. However t is chosen the two pieces add back to a, but the leftover is at
// right angles to b for exactly one t: (a − tb)·b = −11 − 18t = 0 gives t = (a·b)/(b·b) = −11/18,
// the resolute's own multiplier — which is where the formula comes from, and why a⊥ = a − (the
// resolute) = 47/18 i − 5/9 j + 7/18 k. A button jumps to t = +11/18, the lost-minus-sign slip
// a − 11/18 b = 25/18 i − 49/9 j + 29/18 k: its angle to b is about 153° and the check gives −22.
//
// Two vectors always lie in one flat plane, so the picture is that plane drawn face-on and to
// scale: b along a line tilted 25° below the horizontal (tilted so a phone shows it at a usable
// size), |b| = √18, a·b̂ = −11/√18, and a's distance from the line of b is |a⊥| = √262/6 (checked
// with sympy: |a∥|² + |a⊥|² = 121/18 + 131/18 = 14 = |a|²). The plane's own axes and grid are kept
// out of view (the origin O sits at (10, 10)), since screen x and y mean nothing here.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Polyline, Readout, Readouts, Slider,
  Vector, clamp, num,
} from './kit'

type V2 = [number, number]

const L = Math.sqrt(18) // |b|
const A_ALONG = -11 / L // a·b̂, the signed length of a's shadow on b
const A_ACROSS = Math.sqrt(262) / 6 // |a⊥|
const T_STAR = -11 / 18
const T_SLIP = 11 / 18
const T_MIN = -1
const T_MAX = 0.75

const PHI = (-25 * Math.PI) / 180
const U: V2 = [Math.cos(PHI), Math.sin(PHI)] // along b
const W: V2 = [-Math.sin(PHI), Math.cos(PHI)] // at right angles to b, on a's side
const O: V2 = [10, 10]
/** The point s units along b's line and h units across it, from O. */
const P = (s: number, h: number): V2 => [O[0] + s * U[0] + h * W[0], O[1] + s * U[1] + h * W[1]]

const B = P(L, 0)
const A = P(A_ALONG, A_ACROSS)
const mid = (p: V2, q: V2): V2 => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]

const is = (a: number, b: number) => Math.abs(a - b) < 1e-9

function snap(t: number): number {
  const v = clamp(t, T_MIN, T_MAX)
  for (const s of [T_STAR, T_SLIP, 0]) if (Math.abs(v - s) < 0.03) return s
  return v
}

/** Pointer position → the t whose tip t·b is nearest to it on the line of b. */
function toT([x, y]: V2): number {
  return snap(((x - O[0]) * U[0] + (y - O[1]) * U[1]) / L)
}

const I = '\\underset{\\sim}{i}'
const J = '\\underset{\\sim}{j}'
const K = '\\underset{\\sim}{k}'
const AV = '\\underset{\\sim}{a}'
const BV = '\\underset{\\sim}{b}'

/** x i + y j + z k with rounded coefficients and proper signs. */
function vecTex(x: number, y: number, z: number): string {
  const term = (c: number, e: string, first: boolean) => {
    const s = num(Math.abs(c), 2)
    if (first) return `${c < 0 ? '-' : ''}${s}${e}`
    return `${c < 0 ? ' - ' : ' + '}${s}${e}`
  }
  return term(x, I, true) + term(y, J, false) + term(z, K, false)
}

/** A small arc at T from the direction of b round to the leftover, marking the angle between them. */
function arc(t: number, r: number): V2[] {
  const T = P(t * L, 0)
  const from = PHI
  const to = Math.atan2(A[1] - T[1], A[0] - T[0])
  const n = 24
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = from + ((to - from) * i) / n
    return [T[0] + r * Math.cos(a), T[1] + r * Math.sin(a)] as V2
  })
}

export default function Leftover() {
  const [t, setT] = useState(-0.45)
  const T = P(t * L, 0)
  const atStar = is(t, T_STAR)
  const atSlip = is(t, T_SLIP)
  const atZero = is(t, 0)

  // Everything below is in the real, three-dimensional vectors.
  const dot = -11 - 18 * t // (a − tb)·b
  const len = Math.sqrt(14 + 22 * t + 18 * t * t) // |a − tb|
  const angle = (Math.acos(clamp(dot / (len * L), -1, 1)) * 180) / Math.PI
  const leftColor = atStar ? C.good : C.bad

  let tTex = `t \\approx ${num(t, 3)}`
  let leftTex = `${AV} - t${BV} \\approx ${vecTex(2 - t, -3 - 4 * t, 1 + t)}`
  let dotTex = `(${AV} - t${BV})\\cdot${BV} = -11 - 18t \\approx ${num(dot, 2)}`
  if (atStar) {
    tTex = 't = -\\tfrac{11}{18}'
    leftTex = `${AV} + \\tfrac{11}{18}${BV} = \\tfrac{47}{18}${I} - \\tfrac{5}{9}${J} + \\tfrac{7}{18}${K}`
    dotTex = `(${AV} - t${BV})\\cdot${BV} = -11 + 11 = 0`
  } else if (atSlip) {
    tTex = 't = \\tfrac{11}{18}'
    leftTex = `${AV} - \\tfrac{11}{18}${BV} = \\tfrac{25}{18}${I} - \\tfrac{49}{9}${J} + \\tfrac{29}{18}${K}`
    dotTex = `(${AV} - t${BV})\\cdot${BV} = -11 - 11 = -22`
  } else if (atZero) {
    tTex = 't = 0'
    leftTex = `${AV} - 0${BV} = ${AV}`
    dotTex = `${AV}\\cdot${BV} = -11`
  }

  let notice
  if (atStar) {
    notice = (
      <Notice tone="good">
        <b>A right angle: this is the split part b. asks for.</b> Here <M>{`(${AV} - t${BV})\\cdot${BV} = -11 - 18t = 0`}</M>, and
        solving that for <M>t</M> gives <M>{`t = \\tfrac{${AV}\\cdot${BV}}{${BV}\\cdot${BV}} = -\\tfrac{11}{18}`}</M>: that is where the
        resolute formula comes from. The violet arrow is the resolute, pointing backwards along <M>{BV}</M> because{' '}
        <M>{`${AV}\\cdot${BV} < 0`}</M>. The green arrow is the answer, <M>{`${AV} + \\tfrac{11}{18}${BV}`}</M>.
      </Notice>
    )
  } else if (atSlip) {
    notice = (
      <Notice tone="warn">
        <b>
          This is <M>{`${AV} - \\tfrac{11}{18}${BV}`}</M>: the minus sign of <M>{'-\\tfrac{11}{18}'}</M> has been lost.
        </b>{' '}
        The leftover leans far from a right angle (about {Math.round(angle)}°), and the check shows it:{' '}
        <M>{`(${AV} - t${BV})\\cdot${BV} = -22`}</M>, not <M>0</M>. Dotting your answer with <M>{BV}</M> takes ten seconds and
        catches this every time.
      </Notice>
    )
  } else if (atZero) {
    notice = (
      <Notice>
        With <M>t = 0</M> nothing has been taken away, so the leftover is <M>{AV}</M> itself, at about {Math.round(angle)}° to{' '}
        <M>{BV}</M>. The given multiplier is negative, so take away a <i>negative</i> multiple of <M>{BV}</M>: drag the point
        at O backwards along the dashed line (up and to the left).
      </Notice>
    )
  } else if (t < T_STAR) {
    notice = (
      <Notice>
        Too far back: the leftover now leans the other way (about {Math.round(angle)}° to <M>{BV}</M>), and{' '}
        <M>{`(${AV} - t${BV})\\cdot${BV} \\approx ${num(dot, 2)}`}</M> is positive. Come back towards O until the angle is{' '}
        <M>{'90^\\circ'}</M>.
      </Notice>
    )
  } else if (t < 0) {
    notice = (
      <Notice>
        The two arrows <M>{`t${BV}`}</M> and <M>{`${AV} - t${BV}`}</M> always add back to <M>{AV}</M>: the triangle closes
        whatever <M>t</M> is. But the leftover is at about {Math.round(angle)}° to <M>{BV}</M>, not <M>{'90^\\circ'}</M>, and{' '}
        <M>{`(${AV} - t${BV})\\cdot${BV} \\approx ${num(dot, 2)}`}</M>. Keep sliding back until the dot product is <M>0</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Taking away a <i>positive</i> multiple of <M>{BV}</M> moves the tail of the leftover forwards, and the angle only gets
        worse (about {Math.round(angle)}°). The resolute&apos;s multiplier is negative, so the tail has to go backwards,
        behind O.
      </Notice>
    )
  }

  const showTb = Math.abs(t) > 0.06
  const tbLabel = atStar ? '−11/18 b' : atSlip ? '11/18 b' : 'tb'
  const leftLabel = atStar ? 'a⊥' : 'a − tb'
  // The right-angle square, on O's side of the foot.
  const s = 0.38
  const square: V2[] = [
    [T[0] + s * U[0], T[1] + s * U[1]],
    [T[0] + s * U[0] + s * W[0], T[1] + s * U[1] + s * W[1]],
    [T[0] + s * W[0], T[1] + s * W[1]],
  ]

  return (
    <div>
      <Plane x={[5.75, 14.35]} y={[7.9, 13.8]} xStep={100} yStep={100} equalScale height={340} labels={false} xLabel="" yLabel="">
        <Line.ThroughPoints point1={O} point2={B} color={C.guide} style="dashed" weight={1.5} />
        <Vector tail={O} tip={B} color={C.g} weight={3} />
        <Label at={P(0.86 * L, 0)} color={C.g} attach="ne">b</Label>
        {!atZero && <Vector tail={T} tip={A} color={leftColor} weight={3} />}
        <Vector tail={O} tip={A} color={C.f} weight={3} />
        <Label at={mid(O, A)} color={C.f} attach="e">a</Label>
        {showTb && <Vector tail={O} tip={T} color={C.violet} weight={4} />}
        {showTb && (
          <Label at={mid(O, T)} color={C.violet} attach="sw">
            {tbLabel}
          </Label>
        )}
        {!atZero && (
          <Label at={mid(T, A)} color={leftColor} attach={t < 0 ? 'w' : 'ne'}>
            {leftLabel}
          </Label>
        )}
        {atStar ? (
          <Polyline points={square} color={C.good} weight={2} />
        ) : (
          !atZero && <Polyline points={arc(t, 0.7)} color={leftColor} weight={2} />
        )}
        <Point x={O[0]} y={O[1]} color={C.ink} svgCircleProps={{ r: 3.5 }} />
        <Label at={O} attach={t < -0.1 ? 'se' : 'sw'} size={12}>O</Label>
        <MovablePoint point={T} onMove={p => setT(toT(p))} color={C.violet} />
      </Plane>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
        To scale, in the flat plane that holds both <M>{AV}</M> and <M>{BV}</M> (with <M>m = 4</M>). The dashed line is the line of{' '}
        <M>{BV}</M>. Drag the violet point along it, or use the slider.
      </p>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => setT(snap(v))}
          min={T_MIN}
          max={T_MAX}
          step={0.005}
          format={v => (is(v, T_STAR) ? '−11/18' : is(v, T_SLIP) ? '11/18' : num(v, 3))}
        />
        <Readouts>
          <Readout color={C.violet} tex={tTex} />
          <Readout color={leftColor} tex={leftTex} />
          <Readout tex={dotTex} />
          <Readout tex={`\\text{angle to } ${BV} ${atStar ? '=' : '\\approx'} ${Math.round(angle)}^\\circ`} />
        </Readouts>
        <Buttons>
          <ActionButton label="t = −11/18 (the resolute)" onClick={() => setT(T_STAR)} />
          <ActionButton label="t = +11/18 (sign slip)" onClick={() => setT(T_SLIP)} />
          <ActionButton label="t = 0" onClick={() => setT(0)} />
        </Buttons>
        {notice}
      </Controls>
    </div>
  )
}
