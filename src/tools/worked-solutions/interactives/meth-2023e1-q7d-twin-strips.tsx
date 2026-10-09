// 2023 Methods Exam 1 Q7d — the line y = −x is its own mirror image in y = x, so the region it cuts
// off f and the region it cuts off f⁻¹ are mirror images. Slide a vertical strip across the
// lower region (line minus parabola, length a − a²); its reflection is a horizontal strip across
// the upper region at height a, with exactly the same length. Every strip has a twin, so the
// areas are equal and A = 2∫₀¹(x − x²)dx = 1/3. A toggle shows the report's other error,
// ∫₋₁¹(f − f⁻¹)dx, which ignores y = −x and gives a signed value between f and f⁻¹ (≈ 0.55):
// +1 on [−1, 0], −0.448 on [0, 1], where f⁻¹ is above f. x tick numbers beyond ±1.5 are hidden
// (equalScale widens the view on desktop and the −2 label was clipped at the edge).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider,
  Toggle, integrate, num, tick, usePlayer,
} from './kit'

const f = (x: number) => x * x - 2 * x
const fInv = (x: number) => 1 - Math.sqrt(Math.max(0, x + 1))
const line = (x: number) => -x
const W = 0.03
const WRONG = (4 * Math.SQRT2 - 4) / 3

export default function TwinStrips() {
  const [a, setA] = useState(0.35)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setA, { min: 0, max: 1, seconds: 6 })

  const fa = f(a)
  const len = a - a * a
  const swept = integrate(x => x - x * x, 0, a)
  const edge = a < 0.03 || a > 0.97
  const mid: [number, number] = [a, (fa - a) / 2]
  const midMirror: [number, number] = [(fa - a) / 2, a]

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>{'\\int_{-1}^{1}\\left(f(x) - f^{-1}(x)\\right)dx'}</M> measures between <M>f</M> and <M>{'f^{-1}'}</M>, so
        the line <M>y = -x</M> plays no part. The red region climbs up the left side to <M>(-1, 3)</M> (off the top
        here), and on <M>(0, 1)</M>, where <M>{'f^{-1}'}</M> is above <M>f</M>, its strips count as negative. It gives{' '}
        <M>{'\\tfrac{4\\sqrt2 - 4}{3} \\approx 0.55'}</M>, not <M>{'\\tfrac13'}</M>.
      </Notice>
    )
  } else if (edge) {
    notice = (
      <Notice tone="good">
        At <M>x = 0</M> and <M>x = 1</M> the line meets <M>f</M>, so the strip shrinks to nothing: these are the limits
        of the integral. Its twin shrinks to nothing at <M>(0, 0)</M> and <M>(-1, 1)</M>, where the line meets{' '}
        <M>{'f^{-1}'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The blue strip at <M>x = a</M> runs from the parabola up to the line, so its length is{' '}
        <M>{'-a - (a^2 - 2a) = a - a^2'}</M>. Reflect it in <M>y = x</M> and it becomes the orange strip at height{' '}
        <M>y = a</M>, from <M>{'f^{-1}'}</M> (at <M>{'x = f(a)'}</M>, since <M>{'f^{-1}(f(a)) = a'}</M>) across to the line (at{' '}
        <M>x = -a</M>): same length, because a reflection keeps lengths and
        the line <M>y = -x</M> lands back on itself. Press &ldquo;Sweep from 0 to 1&rdquo;: every strip has a twin, so the
        two regions have equal areas. Then press &ldquo;What if I integrate f − f⁻¹ from −1 to 1?&rdquo; to see what
        the report&apos;s other error measures instead.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.3, 1.5]} y={[-1.3, 1.6]} equalScale height={480} xLabels={v => (Math.abs(v) > 1.5 ? '' : tick(v))}>
        {wrong ? (
          <Region top={x => Math.max(f(x), fInv(x))} bottom={x => Math.min(f(x), fInv(x))} from={-1} to={1} color={C.bad} opacity={0.22} />
        ) : (
          <>
            <Region top={line} bottom={f} from={0} to={1} color={C.f} opacity={0.18} />
            <Region top={line} bottom={fInv} from={-1} to={0} color={C.g} opacity={0.18} />
          </>
        )}
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.ThroughPoints point1={[0, 0]} point2={[1, -1]} color={C.ink} weight={2} />
        <Plot.OfX y={f} domain={[-1.5, 1]} color={C.f} weight={3} />
        <Plot.OfX y={fInv} domain={[-1, 1.5]} color={C.g} weight={3} />

        {!wrong && (
          <>
            <Line.Segment point1={mid} point2={midMirror} color={C.guide} style="dashed" weight={1.5} />
            <Polygon points={[[a - W, fa], [a + W, fa], [a + W, -a], [a - W, -a]]} color={C.f} fillOpacity={0.85} weight={1} />
            <Polygon points={[[fa, a - W], [-a, a - W], [-a, a + W], [fa, a + W]]} color={C.g} fillOpacity={0.85} weight={1} />
          </>
        )}
        <Point x={1} y={-1} color={C.ink} />
        <Point x={-1} y={1} color={C.ink} />

        <Label at={[-0.45, f(-0.45)]} color={C.f} attach="w">f</Label>
        <Label at={[1.35, fInv(1.35)]} color={C.g} attach="n">f⁻¹</Label>
        <Label at={[-1.2, 1.2]} attach="ne">y = −x</Label>
        <Label at={[1.25, 1.25]} color={C.guide} attach="se">y = x</Label>
      </Plane>
      <Controls>
        <Slider
          label="a"
          value={a}
          onChange={v => {
            player.stop()
            setA(v)
          }}
          min={0}
          max={1}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(a)} label="Sweep from 0 to 1" />
          <Toggle label="What if I integrate f − f⁻¹ from −1 to 1?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          {wrong ? (
            <Readout color={C.bad} tex={`\\int_{-1}^{1}\\left(f - f^{-1}\\right)dx \\approx ${num(WRONG, 3)} \\ne \\tfrac13`} />
          ) : (
            <>
              <Readout color={C.f} tex={`\\text{blue: } -a-(a^2-2a) = a - a^2 = ${num(len, 3)}`} />
              <Readout color={C.g} tex={`\\text{orange: } -a-f(a) = a - a^2 = ${num(len, 3)}`} />
              <Readout tex={`\\text{each region so far} \\approx ${num(swept, 3)}`} />
              {a > 0.995 && <Readout color={C.good} tex={`2\\times\\tfrac16 = \\tfrac13\\ \\checkmark`} />}
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
