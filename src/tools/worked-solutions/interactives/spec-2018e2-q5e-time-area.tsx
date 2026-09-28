// 2018 Specialist Exam 2 Q5e — why the time is the area under 1/a, not under a. Plotted against
// speed v: dt/dv = 1/a = 2/(9.8 − 2v) and a = (9.8 − 2v)/2. A thin strip under 1/a is Δv/a, the
// time to gain Δv of speed; adding strips from 0 to 4.5 gives ∫₀^4.5 2/(9.8 − 2v) dv = logₑ(12.25)
// ≈ 2.51 s. The area blows up as v → 4.9 (terminal speed never reached). A toggle integrates the
// reciprocal a instead (the report's common error): ≈ 11.93 at 4.5, and a finite 12.005 even at 4.9.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Region, Slider, Toggle,
  usePlayer,
} from './kit'

const K = 4.9
const inv = (v: number) => 2 / (9.8 - 2 * v) // dt/dv = 1/a
const acc = (v: number) => (9.8 - 2 * v) / 2 // a
const YMAX = 6
const capped = (v: number) => Math.min(inv(v), YMAX + 0.5)
const timeTo = (V: number) => Math.log(K / (K - V)) // ∫₀^V 1/a dv
const wrongTo = (V: number) => K * V - (V * V) / 2 // ∫₀^V a dv
const DV = 0.1

export default function TimeArea() {
  const [V, setV] = useState(3)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setV, { min: 0, max: 4.5, seconds: 5 })

  const at45 = Math.abs(V - 4.5) < 0.03
  const a = acc(V)
  const s0 = Math.max(0, V - DV)
  const stripTop = wrong ? acc(V) : capped(V)
  const stripColor = wrong ? C.bad : C.good

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Integrating <M>{'a = \\tfrac{9.8-2v}{2}'}</M>, the reciprocal of the right integrand, gives{' '}
        <M>{`${wrongTo(V).toFixed(2)}`}</M> here{at45 ? ' instead of 2.51' : ''}. Look at the red strips: they are
        tallest at the start, exactly when the suitcase gains speed fastest, which should take the <em>least</em> time. And
        the red area stays finite even at <M>v = 4.9</M> (<M>{'\\approx 12.0'}</M>), as if the suitcase reached its terminal
        speed. Units give it away too: <M>{'\\text{m s}^{-2}\\times\\text{m s}^{-1}'}</M> is not seconds.
      </Notice>
    )
  } else if (at45) {
    notice = (
      <Notice tone="good">
        At <M>v = 4.5</M> the shaded area is <M>{'\\int_0^{4.5}\\frac{2}{9.8-2v}\\,dv \\approx 2.51'}</M> s, the answer
        to e.ii. Now slide towards <M>4.9</M>: the strips shoot up and the area has no limit, because the suitcase never
        actually reaches <M>4.9</M> m s<M>{'^{-1}'}</M>. Then turn on &ldquo;Integrate a instead&rdquo;.
      </Notice>
    )
  } else if (V < 4.5) {
    notice = (
      <Notice>
        The green strip is <M>{'\\Delta v \\div a'}</M>: the time it takes to gain <M>0.1</M> m s<M>{'^{-1}'}</M> of speed
        when the acceleration is <M>a</M> (just like time = distance ÷ speed). Early on <M>a</M> is near <M>4.9</M>, so each
        strip is short; as <M>a</M> shrinks, each extra bit of speed takes longer. Adding the strips from <M>0</M> to{' '}
        <M>4.5</M> is <M>{'\\int_0^{4.5}\\frac1a\\,dv'}</M>. Slide to <M>4.5</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past <M>4.5</M> the strips grow fast: at <M>{`v = ${V.toFixed(2)}`}</M> the next <M>0.1</M> m s
        <M>{'^{-1}'}</M> takes about <M>{`${(DV / a).toFixed(2)}`}</M> s. As <M>{'v \\to 4.9'}</M>,{' '}
        <M>{'\\tfrac1a \\to \\infty'}</M> and so does the area: the terminal speed is never reached. Turn on
        &ldquo;Integrate a instead&rdquo; to see the common wrong integrand.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 5.3]} y={[0, YMAX]} xStep={1} yStep={1} height={300} xLabel="v" yLabel="">
        {wrong ? (
          <Region top={acc} bottom={() => 0} from={0} to={V} color={C.bad} opacity={0.22} />
        ) : (
          <Region top={capped} bottom={() => 0} from={0} to={V} color={C.f} opacity={0.25} />
        )}
        <Line.Segment point1={[K, 0]} point2={[K, YMAX]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[K, 0.35]} color={C.guide} attach="e">4.9</Label>
        <Plot.OfX y={acc} domain={[0, K]} color={C.g} weight={wrong ? 3 : 2} />
        <Plot.OfX y={inv} domain={[0, K - 2 / (2 * YMAX + 1)]} color={C.f} weight={wrong ? 2 : 3} />
        <Label at={[0.3, acc(0.3)]} color={C.g} attach="ne">a = (9.8 − 2v)/2</Label>
        <Label at={[4.72, inv(4.72)]} color={C.f} attach="w">dt/dv = 1/a</Label>
        <Polygon points={[[s0, 0], [V, 0], [V, stripTop], [s0, stripTop]]} color={stripColor} fillOpacity={0.85} weight={1} />
        <Line.Segment point1={[4.5, 0]} point2={[4.5, 0.25]} color={C.ink} weight={2} />
        <Label at={[4.5, 0]} color={C.ink} attach="s">4.5</Label>
      </Plane>
      <Controls>
        <Slider
          label="v"
          value={V}
          onChange={x => {
            player.stop()
            setV(x)
          }}
          min={0.1}
          max={4.85}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(V)} label="Sweep from 0 to 4.5" />
          <ActionButton
            label="v = 4.5"
            onClick={() => {
              player.stop()
              setV(4.5)
            }}
          />
          <Toggle label="Integrate a instead" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`a \\approx ${a.toFixed(2)}`} />
          <Readout color={stripColor} tex={wrong ? `\\text{strip} = a\\,\\Delta v \\approx ${(a * DV).toFixed(3)}` : `\\text{strip} = \\tfrac{\\Delta v}{a} \\approx ${(DV / a).toFixed(3)}\\text{ s}`} />
          {wrong ? (
            <Readout color={C.bad} tex={`\\int_0^{${V.toFixed(2)}} a\\,dv \\approx ${wrongTo(V).toFixed(2)}`} />
          ) : (
            <Readout color={at45 ? C.good : C.f} tex={`t = \\int_0^{${V.toFixed(2)}} \\tfrac{1}{a}\\,dv \\approx ${timeTo(V).toFixed(2)}\\text{ s}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
