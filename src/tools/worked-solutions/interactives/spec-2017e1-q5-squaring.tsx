// 2017 Specialist Exam 1 Q5 — why squaring lets a = 2 sneak in. Triangle BCD is drawn flat, in its
// own plane, with the vertex C at the corner and CB along the bottom, so the side lengths and the
// angle θ at C are true size. CB = −i + k (length √2) never changes; CD = (a − 2)i − j − k (length
// √((a − 2)² + 2)) swings as a changes, with cos θ = (1 − a)/(√2 √((a − 2)² + 2)). The green guide is
// θ = π/3, and CD lies along it only at a = −2. The toggle shows what the squared equation
// 4(1 − a)² = 2((a − 2)² + 2) really tests — cos²θ = 1/4 — which is just as true on the red 2π/3
// guide, reached at a = 2, where CB·CD = −1 < 0. The sign of CB·CD = 1 − a (acute for a < 1, a right
// angle at a = 1, obtuse beyond) is the check that throws a = 2 out.
//
// C is placed away from the origin so the plane's own axes stay out of view: in this picture they
// would mean nothing. The faint grid squares are one unit, so lengths can be read off.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num,
} from './kit'

const CX = 10
const CY = 1
const LEN_CB = Math.SQRT2
const lenCD = (a: number) => Math.sqrt((a - 2) ** 2 + 2)
const cosTheta = (a: number) => (1 - a) / (LEN_CB * lenCD(a))
const polar = (r: number, t: number): [number, number] => [CX + r * Math.cos(t), CY + r * Math.sin(t)]
const near = (a: number, k: number) => Math.abs(a - k) < 0.03

const G60 = polar(5.2, Math.PI / 3)
const G120 = polar(4.4, (2 * Math.PI) / 3)

export default function SquaringLetsTwoIn() {
  const [a, setA] = useState(0)
  const [squared, setSquared] = useState(false)

  const cos = cosTheta(a)
  const theta = Math.acos(cos)
  const deg = (theta * 180) / Math.PI
  const dot = 1 - a
  const Cpt: [number, number] = [CX, CY]
  const B: [number, number] = [CX + LEN_CB, CY]
  const D = polar(lenCD(a), theta)
  const atMinus2 = near(a, -2)
  const atPlus2 = near(a, 2)
  const atOne = near(a, 1)
  const dotColor = atOne ? C.guide : dot > 0 ? C.good : C.bad

  const thetaTex = atMinus2
    ? '\\theta = \\tfrac{\\pi}{3}'
    : atPlus2
      ? '\\theta = \\tfrac{2\\pi}{3}'
      : atOne
        ? '\\theta = \\tfrac{\\pi}{2}'
        : `\\theta \\approx ${deg.toFixed(1)}^\\circ`

  let notice
  if (atMinus2) {
    notice = (
      <Notice tone="good">
        <b>At <M>a = -2</M>, CD lies exactly along the green guide.</b> Here{' '}
        <M>{'\\overrightarrow{CB}\\cdot\\overrightarrow{CD} = 3'}</M> and <M>{'|\\overrightarrow{CD}| = 3\\sqrt2'}</M>, so{' '}
        <M>{'\\cos\\theta = \\frac{3}{\\sqrt2\\times3\\sqrt2} = \\frac12'}</M>: the angle is <M>{'\\tfrac{\\pi}{3}'}</M>.{' '}
        {squared
          ? 'The squared equation is satisfied here too, as it should be. Now press a = 2 and compare.'
          : 'Now press a = 2, the other root of a² = 4, and look at the angle there.'}
      </Notice>
    )
  } else if (atPlus2 && !squared) {
    notice = (
      <Notice tone="warn">
        <b>At <M>a = 2</M> the angle is <M>{'\\tfrac{2\\pi}{3}'}</M> (120°), not <M>{'\\tfrac{\\pi}{3}'}</M>.</b>{' '}
        <M>{'\\overrightarrow{CB}\\cdot\\overrightarrow{CD} = -1'}</M> is negative, so the angle is obtuse. Yet <M>a = 2</M>{' '}
        comes straight out of <M>a^2 = 4</M>. Turn on &ldquo;What squaring checks&rdquo; to see why the algebra can&apos;t
        tell these two angles apart.
      </Notice>
    )
  } else if (atPlus2) {
    notice = (
      <Notice tone="warn">
        Here <M>{'\\cos\\theta = -\\tfrac12'}</M>, but <M>{'\\cos^2\\theta = \\tfrac14'}</M>, and that is all the squared
        equation <M>{'4(1-a)^2 = 2\\left((a-2)^2+2\\right)'}</M> says (divide both sides by{' '}
        <M>{'8\\left((a-2)^2+2\\right)'}</M>). <b>Squaring can&apos;t tell <M>{'\\tfrac12'}</M> from <M>{'-\\tfrac12'}</M></b>, so it
        can&apos;t tell <M>{'\\tfrac{\\pi}{3}'}</M> from <M>{'\\tfrac{2\\pi}{3}'}</M>. Only the sign check <M>{'1-a>0'}</M>{' '}
        (an acute angle needs a positive dot product) rejects <M>a = 2</M>.
      </Notice>
    )
  } else if (atOne) {
    notice = (
      <Notice>
        <b>At <M>a = 1</M>, <M>{'\\overrightarrow{CB}\\cdot\\overrightarrow{CD} = 0'}</M>: a right angle.</b> For{' '}
        <M>{'a<1'}</M> the dot product <M>1 - a</M> is positive and the angle is acute; for <M>{'a>1'}</M> it is negative and
        the angle is obtuse. <M>{'\\tfrac{\\pi}{3}'}</M> is acute, so the answer must have <M>{'a<1'}</M>, the condition written
        down before squaring.
      </Notice>
    )
  } else if (squared) {
    notice = (
      <Notice>
        The red guide is where <M>{'\\cos\\theta = -\\tfrac12'}</M>. Both guides make <M>{'\\cos^2\\theta = \\tfrac14'}</M>, so
        together they are <b>every angle the squared equation accepts</b>. Slide <M>a</M> and watch the{' '}
        <M>{'\\cos^2\\theta'}</M> readout: it hits <M>{'0.25'}</M> once on each guide.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Drag <M>a</M>: <M>D</M> moves, so CD swings and the angle <M>\theta</M> at <M>C</M> changes, while CB stays put. The
        triangle is drawn flat in its own plane, so <M>\theta</M> and the side lengths are true size. As <M>a</M>{' '}
        increases, <M>{'\\overrightarrow{CB}\\cdot\\overrightarrow{CD} = 1-a'}</M> falls and the angle opens up. Find the{' '}
        <M>a</M> that puts CD on the green <M>{'\\tfrac{\\pi}{3}'}</M> guide.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[CX - 2.7, CX + 3.8]}
        y={[CY - 0.35, CY + 5.3]}
        equalScale
        height={340}
        labels={false}
        xLabel=""
        yLabel=""
      >
        <Line.Segment point1={Cpt} point2={G60} color={C.good} style="dashed" weight={2} />
        <Label at={G60} attach="ne" color={C.good}>π/3</Label>
        {squared && (
          <>
            <Line.Segment point1={Cpt} point2={G120} color={C.bad} style="dashed" weight={2} />
            <Label at={G120} attach="n" color={C.bad}>2π/3</Label>
          </>
        )}
        <Line.Segment point1={B} point2={D} color={C.guide} weight={1.5} />
        <Plot.Parametric xy={t => polar(0.55, t)} domain={[0, theta]} color={C.violet} weight={2.5} />
        <Label at={polar(0.75, theta / 2)} attach="c" color={C.violet} italic>θ</Label>
        <Line.Segment point1={Cpt} point2={B} color={C.f} weight={3} />
        <Line.Segment point1={Cpt} point2={D} color={C.g} weight={3} />
        <Point x={CX} y={CY} color={C.ink} />
        <Point x={B[0]} y={B[1]} color={C.ink} />
        <Point x={D[0]} y={D[1]} color={C.g} />
        <Label at={Cpt} attach="sw">C</Label>
        <Label at={B} attach="se">B</Label>
        <Label at={[CX + LEN_CB / 2, CY]} attach="s" color={C.f}>√2</Label>
        <Label at={D} attach={D[0] > CX + 3.1 ? 'w' : theta < Math.PI / 2 ? 'e' : theta < 2.3 ? 'w' : 'n'} color={C.g}>D</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-4} max={4} step={0.05} format={v => num(v, 2)} />
        <Buttons>
          <ActionButton label="a = −2" onClick={() => setA(-2)} />
          <ActionButton label="a = 2" onClick={() => setA(2)} />
          <Toggle label="What squaring checks" checked={squared} onChange={setSquared} />
        </Buttons>
        <Readouts>
          <Readout color={dotColor} tex={`\\overrightarrow{CB}\\cdot\\overrightarrow{CD} = 1-a = ${num(dot, 2)}`} />
          <Readout color={C.g} tex={`|\\overrightarrow{CD}| = ${num(lenCD(a), 3)}`} />
          <Readout color={C.violet} tex={`\\cos\\theta = ${num(cos, 3)}`} />
          <Readout tex={thetaTex} />
          {squared && (
            <Readout
              color={C.violet}
              tex={`\\cos^2\\theta = ${num(cos * cos, 3)}${atMinus2 || atPlus2 ? ' = \\tfrac14' : ''}`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
