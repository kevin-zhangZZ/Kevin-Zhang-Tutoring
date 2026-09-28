// 2019 Methods Exam 1 Q9f — addition of ordinates for g(f(x)) + f(g(x)), with g(f(x)) = e^(3+2x−x²)
// (a bell, peak e⁴ at x = 1) and f(g(x)) = 3 + 2eˣ − e²ˣ (asymptote y = 3, max (0, 4), root logₑ3,
// then plunging). Sweep x: a blue arrow of height g(f(x)) has the orange arrow f(g(x)) stacked on
// top, and the violet point is the sum. Left of logₑ3 both arrows point up, so the sum is
// positive; right of it both curves are decreasing, so the sum falls from positive to −∞ and
// crosses 0 exactly once (x ≈ 1.866). A toggle shows the equivalent picture g(f(x)) = −f(g(x)).

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, Vector, num, usePlayer } from './kit'

const G = (x: number) => Math.exp(3 + 2 * x - x * x)
const F = (x: number) => 3 + 2 * Math.exp(x) - Math.exp(2 * x)
const S = (x: number) => G(x) + F(x)
const LN3 = Math.log(3)

/** The one root of S, by bisection on (logₑ3, 2.5) where S is strictly decreasing. */
const ROOT = (() => {
  let a = LN3
  let b = 2.5
  for (let i = 0; i < 60; i++) {
    const m = (a + b) / 2
    if (S(m) > 0) a = m
    else b = m
  }
  return (a + b) / 2
})()

const XA = -2
const XB = 2.6
const YR: [number, number] = [-66, 64]

export default function AdditionOfOrdinates() {
  const [x0, setX0] = useState(1.7)
  const [flip, setFlip] = useState(false)
  const player = usePlayer(setX0, { min: -1.8, max: 2.2, seconds: 8 })

  const g0 = G(x0)
  const f0 = F(x0)
  const s0 = g0 + f0
  const atRoot = Math.abs(x0 - ROOT) < 0.03
  const past = x0 >= ROOT - 0.03
  const sumCol = atRoot ? C.good : C.violet
  const dx = 0.1

  let notice
  if (flip) {
    notice = (
      <Notice>
        The same equation rearranged: <M>{'g(f(x)) = -f(g(x))'}</M>. The dashed curve <M>{'-f(g(x))'}</M> is part
        e.&apos;s graph flipped: minimum <M>(0, -4)</M>, asymptote <M>y = -3</M>, zero at <M>{'\\log_e 3'}</M>, then
        climbing forever. The blue bell sinks towards <M>0</M> as it climbs, so they cross <b>once</b>, at the same{' '}
        <span className="whitespace-nowrap">
          <M>{`x \\approx ${num(ROOT)}`}</M>.
        </span>
      </Notice>
    )
  } else if (atRoot) {
    notice = (
      <Notice tone="good">
        <b>Here the orange arrow exactly cancels the blue one</b>: <M>{'g(f(x)) + f(g(x)) = 0'}</M> at{' '}
        <M>{`x \\approx ${num(ROOT)}`}</M>. This is the one solution. Keep sliding right to see why there can&apos;t be
        another.
      </Notice>
    )
  } else if (x0 <= LN3) {
    notice = (
      <Notice>
        Left of <M>{'x = \\log_e 3'}</M> <b>both arrows point up</b>: <M>{'g(f(x)) = e^{3+2x-x^2}'}</M> is always
        positive, and <M>{'f(g(x)) \\ge 0'}</M> until its <M>x</M>-intercept <M>{'\\log_e 3'}</M> (part d.). Positive plus
        non-negative can&apos;t make <M>0</M>, so there are no solutions here. Drag right, or press play.
      </Notice>
    )
  } else if (!past) {
    notice = (
      <Notice>
        Past <M>{'\\log_e 3'}</M> the orange arrow <M>{'f(g(x))'}</M> points <b>down</b>, but it is still shorter than the
        blue one, so the sum is positive. Both curves are falling here, <M>{'g(f(x))'}</M> because <M>{'x > 1'}</M>{' '}
        (part b.) and <M>{'f(g(x))'}</M> because <M>{'x > 0'}</M> (part e.), so the sum is falling too.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        After the crossing the sum is negative, and both <M>{'g(f(x))'}</M> and <M>{'f(g(x))'}</M> keep decreasing, so
        their sum keeps decreasing. It can never climb back to <M>0</M>: <b>exactly one solution</b>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[XA, XB]} y={YR} xStep={0.5} yStep={20} height={340} yLabel="">
        <Line.Segment point1={[LN3, YR[0]]} point2={[LN3, YR[1]]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[LN3, -30]} color={C.guide} attach="w">
          x = logₑ3
        </Label>
        <Plot.OfX y={G} domain={[XA, XB]} color={C.f} weight={3} />
        <Plot.OfX y={F} domain={[XA, XB]} color={C.g} weight={3} />
        {flip ? (
          <Plot.OfX y={x => -F(x)} domain={[XA, XB]} color={C.g} style="dashed" weight={2.5} />
        ) : (
          <Plot.OfX y={S} domain={[XA, XB]} color={C.violet} weight={3} />
        )}
        <Label at={[2.05, G(2.05)]} color={C.f} attach="ne">
          g(f(x))
        </Label>
        <Label at={[1.95, F(1.95)]} color={C.g} attach="w">
          f(g(x))
        </Label>
        {flip ? (
          <Label at={[2.2, -F(2.2)]} color={C.g} attach="w">
            −f(g(x))
          </Label>
        ) : (
          <Label at={[1.75, S(1.75)]} color={C.violet} attach="e">
            sum
          </Label>
        )}
        {!flip && (
          <>
            <Line.Segment point1={[x0, YR[0]]} point2={[x0, YR[1]]} color={C.guide} weight={1} opacity={0.5} />
            <Vector tail={[x0, 0]} tip={[x0, g0]} color={C.f} weight={3} />
            <Vector tail={[x0 + dx, g0]} tip={[x0 + dx, s0]} color={C.g} weight={3} />
            <Line.Segment point1={[x0, s0]} point2={[x0 + dx, s0]} color={sumCol} weight={1.5} />
            <Point x={x0} y={s0} color={sumCol} />
          </>
        )}
        {flip && (
          <>
            <Line.Segment point1={[x0, YR[0]]} point2={[x0, YR[1]]} color={C.guide} weight={1} opacity={0.5} />
            <Point x={x0} y={g0} color={C.f} />
            <Point x={x0} y={-f0} color={C.g} />
          </>
        )}
        {(past || flip) && <Point x={ROOT} y={flip ? G(ROOT) : 0} color={C.good} />}
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={-1.8}
          max={2.2}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep x" />
          <Toggle label="Compare g(f(x)) with −f(g(x)) instead" checked={flip} onChange={setFlip} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`g(f(x)) = ${num(g0, 2)}`} />
          <Readout color={C.g} tex={`f(g(x)) = ${num(f0, 2)}`} />
          <Readout color={sumCol} tex={`\\text{sum} = ${num(s0, 2)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
