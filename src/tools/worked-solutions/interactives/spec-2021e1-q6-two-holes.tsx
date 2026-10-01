// 2021 Specialist Exam 1 Q6 — the i and j components force m = 7 and n = 5, so c is a combination
// of a and b only when its k-component |1 − p²| equals 4, the k-component of 7a + 5b. Slide p:
// the blue curve |1 − p²| meets the orange line 4 at just two points, p = ±√5 (dependent); the
// violet gap shows c leaving the plane of a and b everywhere else. The green p-axis with two
// holes is the answer set R \ {−√5, √5} — the step the report says many students missed (they found
// p = ±√5 for dependence but did not conclude the complement). The hump between −1 and 1 (at most
// 1) also shows why the branch 1 − p² = 4 has no real solution.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num, tick } from './kit'

const R5 = Math.sqrt(5)
const X0 = -3.5
const X1 = 3.5
const kOf = (p: number) => Math.abs(1 - p * p)
const SNAP = 0.03

const vc = '\\underset{\\sim}{c}'
const va = '\\underset{\\sim}{a}'
const vb = '\\underset{\\sim}{b}'
const vi = '\\underset{\\sim}{i}'
const vj = '\\underset{\\sim}{j}'
const vk = '\\underset{\\sim}{k}'

function Hole({ x, color }: { x: number; color: string }) {
  return <Point x={x} y={0} color={color} svgCircleProps={{ r: 5.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2.5 } }} />
}

export default function TwoHoles() {
  const [p, setPRaw] = useState(1.5)
  const setP = (v: number) => setPRaw(Math.abs(Math.abs(v) - R5) < SNAP ? Math.sign(v) * R5 : v)

  const dep = Math.abs(Math.abs(p) - R5) < 1e-9
  const hump = Math.abs(p) < 1
  const k = dep ? 4 : kOf(p)
  const kTex = dep ? '4' : k.toFixed(2)
  const pText = dep ? (p < 0 ? '−√5' : '√5') : num(p)
  const pTex = dep ? (p < 0 ? '-\\sqrt5' : '\\sqrt5') : p.toFixed(2)

  let notice
  if (dep) {
    notice = (
      <Notice tone="warn">
        <b>At <M>{`p = ${pTex}`}</M> the curve meets the line:</b> <M>{'\\left|1-p^2\\right| = |1-5| = 4'}</M>, so{' '}
        <M>{`${vc} = 7${va}+5${vb}`}</M> exactly. Now <M>{vc}</M> lies in the plane of <M>{va}</M> and <span className="whitespace-nowrap"><M>{vb}</M>,</span> and the
        three vectors are <b>dependent</b>. This is where many students stopped and wrote <M>{'p=\\pm\\sqrt5'}</M>, but
        the question asks for <b>independent</b>: these two values are the holes in the green axis, and every other{' '}
        <M>p</M> is in the answer.
      </Notice>
    )
  } else if (hump) {
    notice = (
      <Notice>
        Between <M>p=-1</M> and <M>p=1</M>, <M>1-p^2</M> is positive, so <M>{'\\left|1-p^2\\right| = 1-p^2'}</M>: the small
        hump, which never rises above <M>1</M>. It can never reach <M>4</M>, which is why the branch{' '}
        <M>1-p^2=4</M> (that is, <M>p^2=-3</M>) gave nothing. Here <M>{vc}</M> is off the plane of <M>{va}</M> and{' '}
        <span className="whitespace-nowrap"><M>{vb}</M>,</span> so the vectors are <b>independent</b>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        At <M>{`p = ${pTex}`}</M> the blue curve gives <M>{vc}</M> a <span className="whitespace-nowrap"><M>{vk}</M>-component</span> of{' '}
        <M>{`\\left|1-p^2\\right| = ${kTex}`}</M>, but <M>{`7${va}+5${vb}`}</M> has <M>4</M>. The <M>{vi}</M> and{' '}
        <M>{vj}</M> equations already fixed <M>m=7</M> and <M>n=5</M>, so nothing can close the violet gap:{' '}
        <M>{vc}</M> is off the plane of <M>{va}</M> and <span className="whitespace-nowrap"><M>{vb}</M>,</span> and the vectors are <b>independent</b>. Slide{' '}
        <M>p</M> to find where the curve meets the orange line: those are the only holes in the green answer set.
      </Notice>
    )
  }

  const lo = Math.min(k, 4)
  const axisColor = dep ? C.bad : C.good

  return (
    <div>
      <Plane x={[X0, X1]} y={[-1, 6]} xStep={1} yStep={1} height={310} xLabel="p" yLabel="" xLabels={v => (Math.abs(v) > X1 ? '' : tick(v))}>
        {/* The answer set: the whole p-axis, with holes at ±√5. */}
        <Line.Segment point1={[X0, 0]} point2={[X1, 0]} color={C.good} weight={5} />
        {/* Guides from the two holes up to where the curve meets 4. */}
        <Line.Segment point1={[-R5, 0]} point2={[-R5, 4]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[R5, 0]} point2={[R5, 4]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[X0, 4]} point2={[X1, 4]} color={C.g} style="dashed" weight={2.5} />
        <Plot.OfX y={kOf} domain={[X0, X1]} color={C.f} weight={3} />
        {/* p on the axis, the guide up to the curve, and the gap between c and 7a + 5b. */}
        <Line.Segment point1={[p, 0]} point2={[p, lo]} color={C.guide} style="dashed" weight={1.5} />
        {!dep && <Line.Segment point1={[p, k]} point2={[p, 4]} color={C.violet} weight={4} />}
        <Hole x={-R5} color={C.bad} />
        <Hole x={R5} color={C.bad} />
        <Point x={p} y={0} color={axisColor} svgCircleProps={{ r: dep ? 8 : 6 }} />
        <Point x={p} y={k} color={dep ? C.bad : C.f} svgCircleProps={{ r: dep ? 8 : 6 }} />
        <Label at={[-2.45, kOf(-2.45)]} color={C.f} attach="e">|1 − p²|</Label>
        <Label at={[X1, 4]} color={C.g} attach="n">4</Label>
        <Label at={[-R5, 0]} color={C.bad} attach="nw">−√5</Label>
        <Label at={[R5, 0]} color={C.bad} attach="ne">√5</Label>
      </Plane>
      <Controls>
        <Slider label="p" value={p} onChange={setP} min={X0} max={X1} step={0.01} format={() => pText} />
        <Buttons>
          <ActionButton label={<M>{'p=-\\sqrt5'}</M>} onClick={() => setPRaw(-R5)} />
          <ActionButton label={<M>{'p=\\sqrt5'}</M>} onClick={() => setPRaw(R5)} />
          <ActionButton label={<M>p=0.5</M>} onClick={() => setPRaw(0.5)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`${vc} = 3${vi}+2${vj}+${kTex}${vk}`} />
          <Readout color={C.g} tex={`7${va}+5${vb} = 3${vi}+2${vj}+4${vk}`} />
          {dep ? (
            <Readout color={C.bad} tex={`${vc} = 7${va}+5${vb} \\ \\Rightarrow\\ \\text{dependent}`} />
          ) : (
            <Readout color={C.violet} tex={`${vc}-\\left(7${va}+5${vb}\\right) = ${(k - 4).toFixed(2)}${vk} \\ne ${'\\underset{\\sim}{0}'} \\ \\Rightarrow\\ \\text{independent}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
