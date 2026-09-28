// 2018 Specialist Exam 2 MCQ 14 — the scalar resolute of a in the direction of b is the SIGNED
// LENGTH of a's shadow on the line of b. Any two vectors lie in a plane, so a = 3i − 2k and
// b = −i + 2j + 3k are drawn in their own plane at true length (|a| = √13, |b| = √14) and true
// angle (cos θ = −9/√182, θ ≈ 131.8°), with b along the horizontal. The shadow lands behind the
// origin, so the answer is negative: −9/√14. Two toggles give the other four-way combinations,
// which are exactly options A, B and D: resolving b onto a (divide by |a|) and/or keeping the
// shadow as a vector (the vector resolute). A slider for θ shows the sign flip at 90°.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polyline, Readout, Readouts, Slider,
  Toggle, Vector,
} from './kit'

const LA = Math.sqrt(13)
const LB = Math.sqrt(14)
const TH = (Math.acos(-9 / Math.sqrt(182)) * 180) / Math.PI // ≈ 131.81°
const I = '\\underset{\\sim}{i}'
const J = '\\underset{\\sim}{j}'
const K = '\\underset{\\sim}{k}'
const A = '\\underset{\\sim}{a}'
const B = '\\underset{\\sim}{b}'

type V = [number, number]
const add = (p: V, q: V): V => [p[0] + q[0], p[1] + q[1]]
const mul = (k: number, p: V): V => [k * p[0], k * p[1]]

export default function Shadow() {
  const [deg, setDeg] = useState(TH)
  const [swap, setSwap] = useState(false)
  const [asVector, setAsVector] = useState(false)

  const th = (deg * Math.PI) / 180
  const aTip: V = [LA * Math.cos(th), LA * Math.sin(th)]
  const bTip: V = [LB, 0]
  const exact = Math.abs(deg - TH) < 0.3
  const dot = LA * LB * Math.cos(th)

  // Resolve w onto the direction u.
  const u: V = swap ? [Math.cos(th), Math.sin(th)] : [1, 0]
  const w: V = swap ? bTip : aTip
  const scalar = w[0] * u[0] + w[1] * u[1]
  const foot = mul(scalar, u)

  // Right-angle marker at the foot of the perpendicular.
  const toW: V = [w[0] - foot[0], w[1] - foot[1]]
  const hlen = Math.hypot(toW[0], toW[1])
  const n: V = hlen > 1e-6 ? mul(1 / hlen, toW) : [0, 0]
  const back = mul(scalar >= 0 ? -1 : 1, u)
  const q = 0.22
  const showSquare = hlen > 0.35 && Math.abs(scalar) > 0.35

  const option = !exact ? null : swap ? (asVector ? 'D' : 'A') : asVector ? 'B' : 'C'
  const shadowColor = option === 'C' ? C.good : option ? C.bad : C.violet

  let valueTex: string
  if (option === 'C') valueTex = `${A}\\cdot\\hat{${B}} = \\frac{-9}{\\sqrt{14}} = -\\frac{9\\sqrt{14}}{14} \\approx ${scalar.toFixed(2)}`
  else if (option === 'A') valueTex = `${B}\\cdot\\hat{${A}} = \\frac{-9}{\\sqrt{13}} \\approx ${scalar.toFixed(2)}`
  else if (option === 'B') valueTex = `\\frac{${A}\\cdot${B}}{|${B}|^2}\\,${B} = -\\frac{9}{14}\\left(-${I}+2${J}+3${K}\\right)`
  else if (option === 'D') valueTex = `\\frac{${A}\\cdot${B}}{|${A}|^2}\\,${A} = -\\frac{9}{13}\\left(3${I}-2${K}\\right)`
  else valueTex = swap
    ? `${B}\\cdot\\hat{${A}} = |${B}|\\cos\\theta \\approx ${scalar.toFixed(2)}`
    : `${A}\\cdot\\hat{${B}} = |${A}|\\cos\\theta \\approx ${scalar.toFixed(2)}`

  let notice
  if (option === 'C') {
    notice = (
      <Notice tone="good">
        The green bar is the <b>shadow of <M>{A}</M> on the line of <M>{`${B}\\text{.}`}</M></b> It is{' '}
        <M>{'\\tfrac{9}{\\sqrt{14}} \\approx 2.41'}</M> long and falls <em>behind</em> the origin (the angle is obtuse,
        since <M>{`${A}\\cdot${B} = -9`}</M>), so the scalar resolute is <M>{'-\\tfrac{9\\sqrt{14}}{14}'}</M>: option C.
        Now try each toggle to see where the other options come from.
      </Notice>
    )
  } else if (option === 'A') {
    notice = (
      <Notice tone="warn">
        This is the shadow of <M>{B}</M> on the line of <M>{A}</M>, a different length:{' '}
        <M>{'-\\tfrac{9}{\\sqrt{13}}'}</M> (option A). Same dot product, but divided by <M>{`|${A}|`}</M>. The vector
        after &ldquo;in the direction of&rdquo; is the ruler you measure along, so it is the one you divide by.
      </Notice>
    )
  } else if (option === 'B') {
    notice = (
      <Notice tone="warn">
        The arrow is the <b>vector</b> resolute (option B): the shadow itself, pointing along{' '}
        <M>{`-${B}`}</M>. It has the right length, but the question asks for the <b>scalar</b> resolute, a single
        signed number: the arrow&apos;s length with a minus sign because it points against <M>{B}</M>.
      </Notice>
    )
  } else if (option === 'D') {
    notice = (
      <Notice tone="warn">
        Both slips at once: the vector resolute of <M>{B}</M> in the direction of <M>{A}</M>, option D. It resolves the
        wrong vector <em>and</em> answers with a vector.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The shadow&apos;s signed length is <M>{swap ? `|${B}|\\cos\\theta` : `|${A}|\\cos\\theta`}</M>. For{' '}
        <M>{'\\theta'}</M> below <M>{'90^\\circ'}</M> it falls along the direction measured: positive. At{' '}
        <M>{'90^\\circ'}</M> it vanishes (the dot product is <M>0</M>). Past <M>{'90^\\circ'}</M> it falls behind the
        origin: negative. Press &ldquo;Question&apos;s vectors&rdquo; to return to <M>{'\\theta \\approx 131.8^\\circ'}</M>.
      </Notice>
    )
  }

  const dirFar = mul(5.2, u)
  const mid = mul(0.5, foot)

  return (
    <div>
      <Plane x={[-5, 5]} y={[-2.5, 4]} xStep={1} yStep={1} height={320} equalScale xLabel="" yLabel="" labels={false}>
        <Line.Segment point1={mul(-1, dirFar)} point2={dirFar} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={w} point2={foot} color={C.guide} style="dashed" weight={1.5} />
        {showSquare && (
          <Polyline
            points={[add(foot, mul(q, n)), add(add(foot, mul(q, n)), mul(q, back)), add(foot, mul(q, back))]}
            color={C.guide}
            weight={1.5}
          />
        )}
        <Vector tail={[0, 0]} tip={bTip} color={C.g} weight={swap ? 2.5 : 3} />
        <Vector tail={[0, 0]} tip={aTip} color={C.f} weight={swap ? 3 : 2.5} />
        {asVector ? (
          Math.abs(scalar) > 0.05 && <Vector tail={[0, 0]} tip={foot} color={shadowColor} weight={5} />
        ) : (
          <Line.Segment point1={[0, 0]} point2={foot} color={shadowColor} weight={6} />
        )}
        <Point x={foot[0]} y={foot[1]} color={shadowColor} />
        <Label at={aTip} color={C.f} attach={aTip[0] < 0 ? 'nw' : 'ne'}>a</Label>
        <Label at={bTip} color={C.g} attach="ne">b</Label>
        {deg > 8 && (
          <>
            <Plot.Parametric xy={s => [0.6 * Math.cos(s), 0.6 * Math.sin(s)]} domain={[0, th]} color={C.guide} weight={1.5} />
            <Label at={[0.6 * Math.cos(th / 2), 0.6 * Math.sin(th / 2)]} color={C.guide} attach={th / 2 > Math.PI / 2 ? 'nw' : 'ne'} gap={4}>
              θ
            </Label>
          </>
        )}
        {Math.abs(scalar) > 0.6 && (
          <Label at={mid} color={shadowColor} attach={swap ? 'e' : 's'} gap={swap ? 10 : 9}>
            {asVector ? 'vector' : scalar.toFixed(2)}
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider
          label="\theta"
          value={deg}
          onChange={setDeg}
          min={0}
          max={180}
          step={0.5}
          format={v => `${v.toFixed(1)}°`}
        />
        <Buttons>
          <ActionButton label="Question's vectors" onClick={() => setDeg(TH)} />
          <Toggle label="Resolve b onto a instead" checked={swap} onChange={setSwap} />
          <Toggle label="Keep it as a vector" checked={asVector} onChange={setAsVector} />
        </Buttons>
        <Readouts>
          <Readout tex={`${A}\\cdot${B} = ${exact ? '-9' : dot.toFixed(2)}`} />
          <Readout tex={valueTex} color={shadowColor} />
          {option && <Readout tex={`\\text{option ${option}}${option === 'C' ? '\\ \\checkmark' : ''}`} color={shadowColor} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
