// 2020 Methods Exam 1 Q3 — the angle inside the tan. Slide x along the question's graph,
// y = tan(ax + b) with the answer a = 7π/24, b = π/24, and watch its angle u = ax + b move along
// the standard graph y = tan u underneath, at the same height. x = −1 lands on u = −π/4, x = 0 on
// u = b ≈ 0.13 (inside the green stretch 0 < u < 1), x = 1 on u = π/3: the whole of [−1, 1] maps
// onto one arc of the branch through the origin, which is why the principal solutions of
// tan u = −1 and tan u = √3 are the ones to use. The other solutions (3π/4 and −5π/4; 4π/3 and
// −2π/3) sit in grey on the neighbouring branches. Past the ends of [−1, 1] the angle heads for
// ±π/2, which is where the question's asymptotes are: x = 11/7 and x = −13/7 (checked with sympy).

import { useState, type ReactNode } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, num,
} from './kit'

const PI = Math.PI
const A = (7 * PI) / 24
const B = PI / 24
const ROOT3 = Math.sqrt(3)
// Curves are clipped just outside the visible y-range [−3, 3] (the plane pads it by 8%).
const Y = 3.4
const T = Math.atan(Y)
const f = (x: number) => Math.tan(A * x + B)
// The part of the question's branch that is on screen: tan(ax + b) = ±Y.
const X_LO = (-T - B) / A
const X_HI = (T - B) / A

// Tick numbers on the u-axis at multiples of π/2.
function piTick(v: number): string {
  const n = Math.round(v / (PI / 2))
  if (n === 0 || Math.abs(v - (n * PI) / 2) > 1e-6) return ''
  const m = Math.abs(n)
  const s = m % 2 === 0 ? (m === 2 ? 'π' : `${m / 2}π`) : m === 1 ? 'π/2' : `${m}π/2`
  return (n < 0 ? '−' : '') + s
}

// Solutions of tan u = −1 and tan u = √3 on the three branches shown. The middle-branch ones are
// the angles at x = −1 and x = 1; the others are drawn in grey.
const LEFT = [
  { u: (-5 * PI) / 4, text: '−5π/4', main: false },
  { u: -PI / 4, text: '−π/4', main: true },
  { u: (3 * PI) / 4, text: '3π/4', main: false },
]
const RIGHT = [
  { u: (-2 * PI) / 3, text: '−2π/3', main: false },
  { u: PI / 3, text: 'π/3', main: true },
  { u: (4 * PI) / 3, text: '4π/3', main: false },
]

function Caption({ children }: { children: ReactNode }) {
  return <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">{children}</p>
}

export default function Inside() {
  const [x, setX] = useState(-1)
  const u = A * x + B
  const y = Math.tan(u)
  const near = (v: number) => Math.abs(x - v) < 0.025

  let notice
  if (near(-1)) {
    notice = (
      <Notice>
        <b>At <M>x = -1</M> the angle is <M>u = -a + b</M></b>, and the point says <M>\tan u = -1</M>. On the lower
        graph the line <M>y = -1</M> meets <M>\tan u</M> once on <i>every</i> branch: at <M>{'-\\tfrac{\\pi}{4}'}</M>,
        but also at <M>{'\\tfrac{3\\pi}{4}'}</M> and <M>{'-\\tfrac{5\\pi}{4}'}</M> (grey). Which branch is this graph
        on? Press <b>x = 0</b>.
      </Notice>
    )
  } else if (near(0)) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 0</M> the angle is just <M>b</M></b>, and the question says <M>{'0 < b < 1'}</M> (the green
        stretch of the <M>u</M>-axis). Since <M>{'1 < \\tfrac{\\pi}{2} \\approx 1.57'}</M>, that is on the middle
        branch, between the asymptotes at <M>{'\\pm\\tfrac{\\pi}{2}'}</M>. The graph is continuous on{' '}
        <M>[-1, 1]</M>, so the angle can&apos;t jump to another branch: for every <M>x</M> in <M>[-1, 1]</M> it stays
        on this middle branch. Now press <b>x = 1</b>.
      </Notice>
    )
  } else if (near(1)) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 1</M> the angle is <M>u = a + b</M></b>, with <M>\tan u = \sqrt3</M>. On the middle branch that
        is <M>{'\\tfrac{\\pi}{3}'}</M>; <M>{'\\tfrac{4\\pi}{3}'}</M> and <M>{'-\\tfrac{2\\pi}{3}'}</M> are at the same
        height, but on other branches. So <M>[-1, 1]</M> maps onto the thick arc from <M>{'-\\tfrac{\\pi}{4}'}</M> to{' '}
        <M>{'\\tfrac{\\pi}{3}'}</M>: <M>{'-a + b = -\\tfrac{\\pi}{4}'}</M> and <M>{'a + b = \\tfrac{\\pi}{3}'}</M>.
      </Notice>
    )
  } else if (x > 1) {
    notice = (
      <Notice>
        Past <M>x = 1</M> the angle keeps growing towards <M>{'\\tfrac{\\pi}{2}'}</M>, where <M>\tan</M> is undefined.
        It gets there when <M>{'\\tfrac{7\\pi}{24}x + \\tfrac{\\pi}{24} = \\tfrac{\\pi}{2}'}</M>, at{' '}
        <M>{'x = \\tfrac{11}{7} \\approx 1.57'}</M>: that is the right-hand dashed asymptote of the question&apos;s
        graph.
      </Notice>
    )
  } else if (x < -1) {
    notice = (
      <Notice>
        Left of <M>x = -1</M> the angle keeps falling towards <M>{'-\\tfrac{\\pi}{2}'}</M>. It gets there when{' '}
        <M>{'\\tfrac{7\\pi}{24}x + \\tfrac{\\pi}{24} = -\\tfrac{\\pi}{2}'}</M>, at{' '}
        <M>{'x = -\\tfrac{13}{7} \\approx -1.86'}</M>: that is the left-hand dashed asymptote of the question&apos;s
        graph.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        As <M>x</M> slides, its angle <M>u = ax + b</M> slides along the lower graph, and the two violet points stay at
        the same height, because <M>y = \tan u</M> in both. For <M>x</M> between <M>-1</M> and <M>1</M> the angle stays
        on the thick arc of the middle branch and never reaches an asymptote. That is what &ldquo;continuous for{' '}
        <M>{'x \\in [-1, 1]'}</M>&rdquo; means.
      </Notice>
    )
  }

  return (
    <div>
      <Caption>
        The question&apos;s graph, <M>y = \tan(ax + b)</M>, with <M>{'a = \\tfrac{7\\pi}{24}'}</M> and{' '}
        <M>{'b = \\tfrac{\\pi}{24}'}</M>
      </Caption>
      <Plane x={[-2, 2]} y={[-3, 3]} xStep={1} yStep={1} height={230}>
        <Line.Segment point1={[11 / 7, -Y]} point2={[11 / 7, Y]} color={C.f} style="dashed" weight={1.5} />
        <Line.Segment point1={[-13 / 7, -Y]} point2={[-13 / 7, Y]} color={C.f} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[X_LO, X_HI]} color={C.f} weight={2} />
        <Plot.OfX y={f} domain={[-1, 1]} color={C.f} weight={5} />
        <Point x={-1} y={-1} color={C.ink} />
        <Label at={[-1, -1]} attach="se">(−1, −1)</Label>
        <Point x={1} y={ROOT3} color={C.ink} />
        <Label at={[1, ROOT3]} attach="w">(1, √3)</Label>
        <Point x={x} y={y} color={C.violet} />
      </Plane>

      <div className="mt-3">
        <Caption>
          The standard graph <M>y = \tan u</M>, where <M>u = ax + b</M> is the angle
        </Caption>
        <Plane x={[-1.5 * PI, 1.5 * PI]} y={[-3, 3]} xStep={PI / 2} yStep={1} height={230} xLabel="u" xLabels={piTick}>
          <Region top={() => Y} bottom={() => -Y} from={-PI / 2} to={PI / 2} color={C.g} opacity={0.07} samples={2} />
          {[-1.5, -0.5, 0.5, 1.5].map(k => (
            <Line.Segment key={k} point1={[k * PI, -Y]} point2={[k * PI, Y]} color={C.g} style="dashed" weight={1.5} />
          ))}
          <Line.Segment point1={[-1.5 * PI, -1]} point2={[1.5 * PI, -1]} color={C.guide} style="dashed" weight={1} />
          <Line.Segment point1={[-1.5 * PI, ROOT3]} point2={[1.5 * PI, ROOT3]} color={C.guide} style="dashed" weight={1} />
          {[-1, 0, 1].map(k => (
            <Plot.OfX key={k} y={Math.tan} domain={[k * PI - T, k * PI + T]} color={C.g} weight={2} opacity={k === 0 ? 1 : 0.45} />
          ))}
          <Plot.OfX y={Math.tan} domain={[-PI / 4, PI / 3]} color={C.g} weight={5} />
          {near(0) && <Line.Segment point1={[0, 0]} point2={[1, 0]} color={C.good} weight={6} />}
          {LEFT.map(s => (
            <g key={s.text}>
              <Point x={s.u} y={-1} color={s.main ? C.g : C.guide} />
              {/* −π/4 sits just left of the y-axis: below-right it ran into the −1 tick number on a phone. */}
              <Label at={[s.u, -1]} attach={s.main ? 'w' : 'se'} color={s.main ? C.g : C.guide} size={s.main ? 13 : 11}>
                {s.text}
              </Label>
            </g>
          ))}
          {RIGHT.map(s => (
            <g key={s.text}>
              <Point x={s.u} y={ROOT3} color={s.main ? C.g : C.guide} />
              <Label at={[s.u, ROOT3]} attach={s.main ? 'e' : 'w'} color={s.main ? C.g : C.guide} size={s.main ? 13 : 11}>
                {s.text}
              </Label>
            </g>
          ))}
          <Line.Segment point1={[u, 0]} point2={[u, y]} color={C.violet} style="dashed" weight={1.5} />
          <Point x={u} y={y} color={C.violet} />
        </Plane>
      </div>

      <Controls>
        <Slider label="x" value={x} onChange={setX} min={-1.5} max={1.25} step={0.01} format={v => num(v)} />
        <Buttons>
          <ActionButton label={<M>x = -1</M>} onClick={() => setX(-1)} />
          <ActionButton label={<M>x = 0</M>} onClick={() => setX(0)} />
          <ActionButton label={<M>x = 1</M>} onClick={() => setX(1)} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`x = ${num(x)}`} />
          <Readout tex={`u = \\tfrac{7\\pi}{24}x + \\tfrac{\\pi}{24} \\approx ${num(u)}`} />
          <Readout tex={`y = \\tan u \\approx ${num(y)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
