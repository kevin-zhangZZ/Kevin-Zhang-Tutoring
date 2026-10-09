// 2022 Methods Exam 2 MCQ 13 — slide x along the number line, taking a = 2, and watch the inside
// of the log, u = (x + 2)/(x − 2) (orange), next to f(x) = log_e(u) (blue). f exists exactly where
// the orange graph is above the x-axis. At x = −a the fraction is 0 and at x = a it is undefined,
// so both endpoints are vertical asymptotes of f, not points of the domain (option D keeps them).
// Between them the fraction is negative (that gap is option B).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, tick } from './kit'

const A = 2
const u = (x: number) => (x + A) / (x - A)
const f = (x: number) => Math.log(u(x))
const Y = 4.6 // the plot reaches the edge of the view at about |y| = 4.6

/** Show a number to 2 dp, or to 3 sig. fig. when it is very small but non-zero. */
const show = (v: number) => {
  if (Math.abs(v) < 0.01 && v !== 0) return v.toPrecision(2)
  return (Math.round(v * 100) / 100).toString().replace('-', '−')
}

export default function Endpoints() {
  const [x, setX] = useState(-3)

  const atMinus = Math.abs(x + A) < 1e-9
  const atPlus = Math.abs(x - A) < 1e-9
  const inGap = x > -A && x < A
  const defined = !atMinus && !atPlus && !inGap
  const ux = atPlus ? NaN : u(x)

  const num = x + A
  const den = x - A
  const tex = (v: number) => show(v).replace('−', '-')
  const fracTex = `\\dfrac{x+2}{x-2}=\\dfrac{${tex(num)}}{${tex(den)}}`
  const uTex = atPlus ? `${fracTex}\\ \\text{(undefined)}` : `${fracTex}=${tex(ux)}`
  const fTex = defined ? `f(x)=\\log_e(${tex(ux)})=${tex(f(x))}` : 'f(x)\\ \\text{is undefined}'

  return (
    <div>
      <Plane
        x={[-6, 6]}
        y={[-4, 4]}
        xStep={1}
        yStep={1}
        height={320}
        xLabels={v => (Math.abs(v) > 6 ? '' : tick(v))}
      >
        {/* The asymptotes x = −a and x = a */}
        <Line.ThroughPoints point1={[-A, 0]} point2={[-A, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.ThroughPoints point1={[A, 0]} point2={[A, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[-A, 3.6]} attach="w" color={C.guide} size={12}>x = −a</Label>
        <Label at={[A, -4]} attach="e" color={C.guide} size={12}>x = a</Label>
        {/* The inside of the log */}
        <Plot.OfX y={u} domain={[-6, 1.6]} color={C.g} weight={2} style="dashed" />
        <Plot.OfX y={u} domain={[2.45, 6]} color={C.g} weight={2} style="dashed" />
        <Label at={[-5.9, u(-5.9)]} attach="ne" gap={10} color={C.g} size={12}>y = (x+a)/(x−a)</Label>
        {/* f itself */}
        <Plot.OfX y={f} domain={[-6, -2.04]} color={C.f} weight={3} />
        <Plot.OfX y={f} domain={[2.04, 6]} color={C.f} weight={3} />
        <Label at={[-5.2, f(-5.2)]} attach="s" gap={10} color={C.f} size={12}>y = f(x)</Label>
        {/* Where x is now */}
        <Line.Segment point1={[x, -4.6]} point2={[x, 4.6]} color={C.violet} weight={1} opacity={0.6} />
        {!atPlus && Math.abs(ux) < Y && <Point x={x} y={ux} color={C.g} />}
        {defined && Math.abs(f(x)) < Y && <Point x={x} y={f(x)} color={C.f} />}
        <Point x={x} y={0} color={defined ? C.good : C.bad} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x}
          onChange={v => setX(Math.abs(Math.abs(v) - A) < 0.04 ? Math.sign(v) * A : v)}
          min={-6}
          max={6}
          step={0.01}
          format={v => show(v)}
        />
        <Buttons>
          <ActionButton label="Go to x = −a" onClick={() => setX(-A)} />
          <ActionButton label="Go to x = a" onClick={() => setX(A)} />
        </Buttons>
        <Readouts>
          <Readout tex="a = 2" />
          <Readout
            color={defined ? C.good : C.bad}
            tex={`x=${tex(x)}\\ \\text{${defined ? 'is in the domain' : 'is not in the domain'}}`}
          />
          <Readout color={C.g} tex={uTex} />
          <Readout color={defined ? C.f : C.bad} tex={fTex} />
        </Readouts>
        {atMinus ? (
          <Notice tone="warn">
            At <M>x = -a</M> the numerator is <M>0</M>, so the fraction equals <M>0</M>, and <M>\log_e(0)</M> is
            undefined: there is no point on the blue curve, only an asymptote. So <M>-a</M> is not in the domain, and
            option D, which keeps <M>x = \pm a</M>, is wrong. The fraction must be strictly greater than <M>0</M>.
          </Notice>
        ) : atPlus ? (
          <Notice tone="warn">
            At <M>x = a</M> the denominator is <M>0</M>, so the fraction itself is undefined, and so is{' '}
            <M>f(a)</M>. The blue curve shoots up this asymptote instead of touching it. Slide a little to the right
            of <M>a</M> to see the fraction become a large positive number.
          </Notice>
        ) : inGap ? (
          <Notice tone="warn">
            Here <M>{'x + a > 0'}</M> but <M>{'x - a < 0'}</M>, so the fraction is negative (the orange curve is
            below the <M>x</M>-axis) and the log of a negative number is undefined. This gap,{' '}
            <M>(-a, a)</M>, is option B: it is where <M>f</M> does not exist. Try the button for <M>x = a</M>.
          </Notice>
        ) : x < -A ? (
          <Notice>
            Both <M>x + a</M> and <M>x - a</M> are negative here, so the fraction is positive and <M>f(x)</M> exists.
            Slide <M>x</M> slowly right towards <M>-a</M> (here <M>-2</M>): the fraction shrinks towards <M>0</M> and{' '}
            <M>f(x)</M> plunges down the asymptote. Then press the button for <M>x = -a</M>.
          </Notice>
        ) : (
          <Notice tone="good">
            Both <M>x + a</M> and <M>x - a</M> are positive here, so the fraction is positive and <M>f(x)</M> exists.
            Together with <M>{'x < -a'}</M> this gives <M>{'R\\setminus[-a,a]'}</M>, option C. The square brackets
            matter: both endpoints are removed along with everything between them.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
