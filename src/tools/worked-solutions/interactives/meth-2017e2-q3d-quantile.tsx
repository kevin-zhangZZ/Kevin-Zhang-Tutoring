// 2017 Methods Exam 2 Q3d — Pr(T ≥ a) = 0.7 is the area to the RIGHT of a under the triangular
// density. Slide a: the area to its right (blue) and to its left (orange) update, and the left
// piece is always a triangle with base a − 20 and height f(a), so Pr(T ≤ a) = (a − 20)²/1250 while
// a ≤ 45. The answer a ≈ 39.3649 sits left of the peak, because 70% of the area must lie to its
// right. A toggle jumps to the report's common wrong answer 50.6351 (solving ∫₂₀ᵃ f = 0.7), where it
// is the LEFT area that is 0.7 — the mirror image of the right answer in t = 45.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Polygon, Polyline, Readout, Readouts, Slider, Text, Toggle, Buttons, num } from './kit'

// The density is drawn in plot units: t across, and S × f(t) up, so the peak f(45) = 1/25 sits
// at height 45. (mafs pads the view in plot units, so the tiny true heights would be squashed.)
const S = 1125
const f = (t: number) => (t >= 20 && t < 45 ? (t - 20) / 625 : t >= 45 && t <= 70 ? (70 - t) / 625 : 0)
const Y = (t: number) => S * f(t)
/** Pr(T ≤ x), from the areas of the triangles. */
const cdf = (x: number) => (x <= 20 ? 0 : x <= 45 ? (x - 20) ** 2 / 1250 : x <= 70 ? 1 - (70 - x) ** 2 / 1250 : 1)
const GRAPH: [number, number][] = [[0, 0], [20, 0], [45, 45], [70, 0], [100, 0]]

/** The region under the density from a to b — exact, since the density is piecewise linear. */
function under(a: number, b: number): [number, number][] {
  const pts: [number, number][] = [[a, 0], [a, Y(a)]]
  for (const k of [20, 45, 70]) if (k > a && k < b) pts.push([k, Y(k)])
  pts.push([b, Y(b)], [b, 0])
  return pts
}

// Tick numbers drawn by hand (the plane's own labels would show plot units). In mafs, attach "n"
// hangs the text below the anchor and "s" stands it on top.
function Ticks({ xs = [], ys = [], xName }: { xs?: [number, string][]; ys?: [number, string][]; xName?: [number, string] }) {
  return (
    <>
      {xs.map(([v, s]) => (
        <Text key={`x${v}`} x={v} y={0} attach="n" attachDistance={17} size={12} color={C.ink}>{s}</Text>
      ))}
      {xName && (
        <Text x={xName[0]} y={3.5} attach="w" attachDistance={2} size={14} color={C.ink} svgTextProps={{ fontStyle: 'italic' }}>{xName[1]}</Text>
      )}
      {ys.map(([v, s]) => (
        <Text key={`y${v}`} x={0} y={v} attach="w" attachDistance={7} size={12} color={C.ink}>{s}</Text>
      ))}
    </>
  )
}

const ANSWER = 20 + Math.sqrt(375) // 39.3649…
const WRONG = 70 - Math.sqrt(375) // 50.6351…, the mirror image of ANSWER in t = 45

export default function Quantile() {
  const [a, setA] = useState(30)
  const left = cdf(a)
  const right = 1 - left
  const atAnswer = Math.abs(a - ANSWER) < 0.06
  const atWrong = Math.abs(a - WRONG) < 0.01

  let notice
  if (atWrong) {
    notice = (
      <Notice tone="warn">
        This is <M>a \approx 50.6351</M>, from solving <M>{'\\int_{20}^{a} f(t)\\,dt = 0.7'}</M>. That integral is the
        area to the <b>left</b> of <M>a</M>, so here <M>\Pr(T \le a)</M> = 0.7 and <M>\Pr(T \ge a)</M> is only{' '}
        <b>0.3</b>, the wrong way round. Notice it is the mirror image of the right answer in the line{' '}
        <M>t = 45</M>: <M>45 - 39.3649 = 50.6351 - 45</M>. Turn the toggle off to see the right one.
      </Notice>
    )
  } else if (atAnswer) {
    notice = (
      <Notice tone="good">
        <b>Blue area = 0.7.</b> The orange triangle on the left then has area 0.3, and its base is{' '}
        <M>a - 20</M> and its height is <M>{'f(a) = \\tfrac{a-20}{625}'}</M>, so{' '}
        <M>{'\\tfrac12(a-20)\\cdot\\tfrac{a-20}{625} = \\tfrac{(a-20)^2}{1250} = 0.3'}</M>. That gives{' '}
        <M>{'a = 20 + \\sqrt{375} \\approx 39.3649'}</M>: left of the peak, as it has to be when most of the area
        is to its right.
      </Notice>
    )
  } else if (a >= 45) {
    notice = (
      <Notice>
        <M>a</M> is at or past the peak, so at most half the area is to its right: <M>\Pr(T \ge a)</M> ≈ {num(right, 3)}.
        It can never reach 0.7 here. Seventy per cent of the area to the right means <M>a</M> must be on the{' '}
        <b>left</b> side of the triangle. Slide back left of 45.
      </Notice>
    )
  } else if (right > 0.7) {
    notice = (
      <Notice>
        The blue area to the right of <M>a</M> is <M>\Pr(T \ge a)</M> ≈ {num(right, 3)}, still more than 0.7, so slide{' '}
        <M>a</M> to the right. Watch the orange piece: it is always a <b>triangle</b>, base <M>a - 20</M> and
        height <M>f(a)</M>. That is why it is easier to set the left area equal to 0.3 than the right area equal
        to 0.7: the right-hand region has a corner at the peak, so it would need two integrals.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now <M>\Pr(T \ge a)</M> ≈ {num(right, 3)}, less than 0.7, so <M>a</M> has gone too far right. The answer is where
        the orange triangle has area exactly 0.3.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-19, 108]} y={[-8, 52]} xStep={5} yStep={11.25} labels={false} xLabel="" yLabel="" height={290}>
        <Text x={0} y={50} attach="e" attachDistance={6} size={14} color={C.ink} svgTextProps={{ fontStyle: 'italic' }}>y</Text>
        <Ticks xs={[[20, '20'], [40, '40'], [60, '60'], [80, '80'], [100, '100']]} ys={[[22.5, '1/50'], [45, '1/25']]} xName={[108, 't']} />
        {a > 20 && <Polygon points={under(20, a)} color={C.g} fillOpacity={0.35} weight={0} strokeOpacity={0} />}
        {a < 70 && <Polygon points={under(a, 70)} color={C.f} fillOpacity={0.3} weight={0} strokeOpacity={0} />}
        <Polyline points={GRAPH} color={C.f} weight={3} />
        {atWrong && <Line.Segment point1={[ANSWER, 0]} point2={[ANSWER, 48]} color={C.good} style="dashed" weight={1.5} />}
        {atWrong && <Line.Segment point1={[45, 0]} point2={[45, 50]} color={C.guide} style="dashed" weight={1.5} />}
        {atWrong && <Label at={[ANSWER, 44]} color={C.good} attach="w">39.36</Label>}
        <Line.Segment point1={[a, 0]} point2={[a, Math.max(Y(a), 0) + 6]} color={atWrong ? C.bad : C.ink} weight={2} />
        <Label at={[a, Y(a) + 6]} color={atWrong ? C.bad : C.ink} attach="n">a</Label>
        {/* Area labels sit inside their region while it is wide enough to hold one clear of the a-line and
            the sloping edges; otherwise just outside the triangle, left of 20 or right of 70. */}
        {a > 20.5 && (a >= 40
          ? <Label at={[Math.min((20 + a) / 2 + 3, a - 8), 0]} color={C.g} attach="n">{num(left, 2)}</Label>
          : <Label at={[19, 5]} color={C.g} attach="w">{num(left, 2)}</Label>)}
        {a < 69.5 && (a <= 50
          ? <Label at={[Math.min((a + 70) / 2 + 4, 59), 0]} color={C.f} attach="n">{num(right, 2)}</Label>
          : <Label at={[77, 0]} color={C.f} attach="n">{num(right, 2)}</Label>)}
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={20} max={70} step={0.05} format={v => v.toFixed(2)} />
        <Buttons>
          <Toggle
            label="What if I solve ∫ from 20 to a = 0.7?"
            checked={atWrong}
            onChange={on => setA(on ? WRONG : ANSWER)}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\Pr(T \\le a) \\approx ${num(left, 4)}`} />
          <Readout color={C.f} tex={`\\Pr(T \\ge a) \\approx ${num(right, 4)}`} />
          {a <= 45 && a > 20 && <Readout tex={`\\tfrac{(a-20)^2}{1250} \\approx ${num(left, 4)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
