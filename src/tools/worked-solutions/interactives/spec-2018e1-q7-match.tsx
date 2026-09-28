// 2018 Specialist Exam 1 Q7 — what "find a" means for an identity. The solid curve is the
// left-hand side cot(2x) + ½tan(x); the dashed curve is a·cot(x) for the slider's a. Only a = ½
// puts the dashed curve on the solid one, and the ratio LHS ÷ cot(x) reads ½ at every x — that
// constant ratio is a. The reported answer a = 2 gets its own message. A toggle swaps in the
// report's error cot(2x) = 1/cos(2x): the ratio then changes with x, so no constant a can work.

import { useState } from 'react'
import { C, Controls, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const PI = Math.PI
const cot = (x: number) => Math.cos(x) / Math.sin(x)
const lhsTrue = (x: number) => cot(2 * x) + 0.5 * Math.tan(x)
const lhsWrong = (x: number) => 1 / Math.cos(2 * x) + 0.5 * Math.tan(x)

const E = 0.004
// Pieces between the asymptotes, so no line is drawn across one. The true left-hand side is
// undefined at x = π/2 (cot(2x) and tan(x) both are), which leaves a tiny gap there.
const TRUE_PIECES: [number, number][] = [
  [0.03, PI / 2 - E],
  [PI / 2 + E, PI - 0.03],
]
const WRONG_PIECES: [number, number][] = [
  [0.03, PI / 4 - E],
  [PI / 4 + E, PI / 2 - E],
  [PI / 2 + E, (3 * PI) / 4 - E],
  [(3 * PI) / 4 + E, PI - 0.03],
]

const piTick = (v: number) => {
  const k = Math.round(v / (PI / 4))
  if (Math.abs(v - (k * PI) / 4) > 1e-6) return ''
  return ['', 'π/4', 'π/2', '3π/4', 'π'][k] ?? ''
}

const Y = 4
const onPlane = (y: number) => Number.isFinite(y) && Math.abs(y) <= Y + 0.3

export default function MatchMultiple() {
  const [a, setA] = useState(1)
  const [x0, setX0] = useState(0.52)
  const [wrong, setWrong] = useState(false)

  const lhs = wrong ? lhsWrong : lhsTrue
  const pieces = wrong ? WRONG_PIECES : TRUE_PIECES
  const L0 = lhs(x0)
  const c0 = cot(x0)
  const R0 = a * c0
  const ratio = L0 / c0
  const ratioTex = Number.isFinite(ratio) && Math.abs(ratio) < 1000 ? num(ratio, 3) : '\\text{huge}'
  const isHalf = Math.abs(a - 0.5) < 1e-9
  const isTwo = Math.abs(a - 2) < 1e-9
  const lhsTex = wrong ? '\\tfrac{1}{\\cos(2x)}+\\tfrac12\\tan(x)' : '\\cot(2x)+\\tfrac12\\tan(x)'

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        With <M>{'\\cot(2x)'}</M> read as <M>{'\\tfrac{1}{\\cos(2x)}'}</M>, the violet ratio <b>changes as you drag x</b>:
        about <M>0.672</M> at <M>{'x=\\tfrac{\\pi}{8}'}</M> but <M>1.321</M> at <M>{'x=\\tfrac{\\pi}{6}'}</M>. An identity
        needs one constant <M>a</M>, so no setting of the slider can work. That is the signal the first step is wrong:{' '}
        <M>{'\\cot(2x)=\\tfrac{1}{\\tan(2x)}'}</M>, while <M>{'\\tfrac{1}{\\cos(2x)}'}</M> is <M>{'\\sec(2x)'}</M>.
      </Notice>
    )
  } else if (isHalf) {
    notice = (
      <Notice tone="good">
        At <M>{'a=\\tfrac12'}</M> the dashed curve lies exactly on the solid one, <b>at every x</b>, not just where you
        happen to be. Drag x anywhere: the violet ratio stays at <M>0.500</M>. That constant ratio is what the question
        calls <M>a</M>. Now turn on the toggle to see the report&apos;s <M>{'\\tfrac{1}{\\cos(2x)}'}</M> mistake.
      </Notice>
    )
  } else if (isTwo) {
    notice = (
      <Notice tone="warn">
        <M>a=2</M> is an answer the examiners saw. Here the dashed curve is <b>four times</b> as tall as the solid one.
        The working ends at <M>{'\\frac{1}{2\\tan(x)}'}</M>, and that 2 sits in the <b>denominator</b>:{' '}
        <M>{'\\frac{1}{2\\tan(x)}=\\frac12\\cdot\\frac{1}{\\tan(x)}=\\frac12\\cot(x)'}</M>. Slide <M>a</M> down until the
        curves coincide.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`a=${num(a, 2)}`}</M> the dashed curve <M>{'a\\cot(x)'}</M> is not the solid left-hand side. Look at the
        violet readout instead of guessing: drag x and <M>{'\\text{solid}\\div\\cot(x)'}</M> gives the <b>same number</b>{' '}
        wherever you go. Set <M>a</M> to that number and watch the curves meet.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, PI]} y={[-Y, Y]} xStep={PI / 4} yStep={1} height={320} xLabels={piTick}>
        {pieces.map(([p, q]) => (
          <Plot.OfX key={`${p}`} y={lhs} domain={[p, q]} color={wrong ? C.bad : C.f} weight={3.5} />
        ))}
        <Plot.OfX y={x => a * cot(x)} domain={[0.03, PI - 0.03]} color={C.g} weight={2.5} style="dashed" />
        {onPlane(L0) && (
          <Line.Segment point1={[x0, 0]} point2={[x0, L0]} color={C.guide} style="dashed" weight={1.5} />
        )}
        {onPlane(R0) && <Point x={x0} y={R0} color={C.g} />}
        {onPlane(L0) && <Point x={x0} y={L0} color={wrong ? C.bad : C.f} />}
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={0} max={2.5} step={0.25} />
        <Slider label="x" value={x0} onChange={setX0} min={0.2} max={2.94} step={0.01} />
        <Toggle
          label={<>Use <M>{'\\cot(2x)=\\tfrac{1}{\\cos(2x)}'}</M> (the report&apos;s error)</>}
          checked={wrong}
          onChange={setWrong}
        />
        <Readouts>
          <Readout color={wrong ? C.bad : C.f} tex={`\\text{solid: } ${lhsTex} = ${num(L0, 3)}`} />
          <Readout color={C.g} tex={`\\text{dashed: } a\\cot(x) = ${num(R0, 3)}`} />
          <Readout color={C.violet} tex={`\\text{solid}\\div\\cot(x) = ${ratioTex}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
