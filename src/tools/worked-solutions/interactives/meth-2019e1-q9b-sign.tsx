// 2019 Methods Exam 1 Q9b — why the sign of the derivative of g(f(x)) = e^(3+2x−x²) is decided
// by (2 − 2x) alone. Two synced panels: the bell y = g(f(x)) on top and the parabola y = f(x)
// below, each with a tangent at the same x. The derivative (2 − 2x)·e^(f(x)) is f'(x) times a
// positive number, so both graphs go uphill and downhill together and both turn at x = 1. A
// toggle shows the bracket-less "derivative" 2 − 2x·e^(f(x)) (the report's warning) as a dashed
// tangent that points the wrong way, e.g. at x = 0.5 where the bell is clearly rising.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const f = (x: number) => 3 + 2 * x - x * x
const fp = (x: number) => 2 - 2 * x
const G = (x: number) => Math.exp(f(x))
const Gp = (x: number) => fp(x) * G(x)
const wrong = (x: number) => 2 - 2 * x * G(x)

const X0 = -1.5
const X1 = 3.5

/** Half-width of a tangent segment so it stays a sensible length on a stretched plane. */
const half = (m: number, maxRise: number, maxRun = 0.55) => Math.min(maxRun, maxRise / Math.max(Math.abs(m), 1e-9))

function tangent(x0: number, y0: number, m: number, maxRise: number) {
  const h = half(m, maxRise)
  return { p1: [x0 - h, y0 - m * h] as [number, number], p2: [x0 + h, y0 + m * h] as [number, number] }
}

export default function SignOfDerivative() {
  const [x0, setX0] = useState(1.6)
  const [noBrackets, setNoBrackets] = useState(false)

  const atTurn = Math.abs(x0 - 1) < 0.021
  const m = Gp(x0)
  const mf = fp(x0)
  const w = wrong(x0)
  const col = atTurn ? C.good : m > 0 ? C.good : C.bad
  const tTop = tangent(x0, G(x0), m, 16)
  const tWrong = tangent(x0, G(x0), w, 16)
  const tBot = tangent(x0, f(x0), mf, 1.6)
  const sign = (v: number) => (Math.abs(v) < 0.05 ? '0' : v > 0 ? '+' : '-')

  let notice
  if (noBrackets) {
    const disagree = Math.sign(w) !== Math.sign(m) && !atTurn
    notice = (
      <Notice tone="warn">
        Without brackets, <M>{'2-2x\\,e^{f(x)}'}</M> only multiplies the <M>2x</M> by the exponential, so it is a
        different expression, not the derivative. At <M>{`x = ${num(x0)}`}</M> it gives <M>{num(w, 1)}</M> (dashed red),
        but the true slope is <M>{num(m, 1)}</M>.{' '}
        {disagree ? (
          <>It even gets the <b>sign</b> wrong here.</>
        ) : (
          <>Try <M>x = 0.5</M>: the bell is clearly rising there, yet the bracket-less version says the slope is negative.</>
        )}
      </Notice>
    )
  } else if (atTurn) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 1</M> both graphs turn together.</b> Here <M>2 - 2x = 0</M>, so the derivative is{' '}
        <M>{'0 \\times e^{4} = 0'}</M>. The factor <M>{'e^{f(x)}'}</M> is never zero, so <M>x = 1</M> is the only place
        the sign of the derivative can change.
      </Notice>
    )
  } else if (x0 < 1) {
    notice = (
      <Notice>
        Left of <M>x = 1</M> the parabola is going uphill, so <M>{"f'(x) = 2 - 2x > 0"}</M>. The other factor,{' '}
        <M>{`e^{f(x)} \\approx ${num(G(x0), 1)}`}</M>, is positive, like every power of <M>e</M>. Positive times positive
        is positive, so the bell is going uphill too. Drag past <M>x = 1</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Right of <M>x = 1</M>, <M>{'2 - 2x < 0'}</M> but <M>{`e^{f(x)} \\approx ${num(G(x0), 2)}`}</M> is still
        positive. Negative times positive is negative, so the derivative of <M>g(f(x))</M> is negative for{' '}
        <b>every</b> <M>{'x > 1'}</M> (the red stretch). The exponential changes how steep the bell is, never which way it
        goes. Turn on &ldquo;Drop the brackets&rdquo; to see the report&apos;s warning.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[-8, 62]} xStep={0.5} yStep={10} height={230} yLabel="">
        <Line.Segment point1={[1, 0]} point2={[1, 62]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[1, 0]} point2={[X1, 0]} color={C.bad} weight={5} opacity={0.55} />
        <Plot.OfX y={G} domain={[X0, X1]} color={C.f} weight={3} />
        <Label at={[-0.35, G(-0.35)]} color={C.f} attach="nw">
          g(f(x))
        </Label>
        <Label at={[2.2, 0]} color={C.bad} attach="n">
          x &gt; 1
        </Label>
        {noBrackets && <Line.Segment point1={tWrong.p1} point2={tWrong.p2} color={C.bad} style="dashed" weight={2.5} />}
        <Line.Segment point1={tTop.p1} point2={tTop.p2} color={col} weight={3} />
        <Point x={x0} y={G(x0)} color={col} />
      </Plane>
      <div className="h-2" />
      <Plane x={[X0, X1]} y={[-4, 5.5]} xStep={0.5} yStep={2} height={170} yLabel="">
        <Line.Segment point1={[1, -4]} point2={[1, 5.5]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[X0, X1]} color={C.g} weight={3} />
        <Label at={[2.3, f(2.3)]} color={C.g} attach="ne">
          f(x)
        </Label>
        <Line.Segment point1={tBot.p1} point2={tBot.p2} color={col} weight={3} />
        <Point x={x0} y={f(x0)} color={col} />
      </Plane>
      <Controls>
        <Slider label="x" value={x0} onChange={setX0} min={-1.2} max={3.4} step={0.01} />
        <Buttons>
          <Toggle
            label="Drop the brackets"
            checked={noBrackets}
            onChange={v => {
              setNoBrackets(v)
              if (v) setX0(0.5)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`f'(x) = 2-2x = ${num(mf)}\\ (${sign(mf)})`} />
          <Readout color={C.f} tex={`e^{f(x)} = ${num(G(x0), 2)}\\ (+)`} />
          <Readout color={col} tex={`\\tfrac{d}{dx}g(f(x)) = ${num(m, 1)}\\ (${sign(m)})`} />
          {noBrackets && <Readout color={C.bad} tex={`2-2x\\,e^{f(x)} = ${num(w, 1)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
