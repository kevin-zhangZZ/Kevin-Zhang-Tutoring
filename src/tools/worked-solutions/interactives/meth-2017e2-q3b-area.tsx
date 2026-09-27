// 2017 Methods Exam 2 Q3b — a probability is an area under the density. Drag the two ends of the
// interval: the part on the rising branch is blue and the part on the falling branch is orange,
// because across t = 45 the rule for f changes and each piece needs its own integral (split at 45,
// not 44). A toggle shows the other way a teacher would do it: the whole triangle has area 1, so cut
// off the two corner triangles (0.02 and 0.18 for 25 and 55) and 1 − 0.02 − 0.18 = 0.8.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Polygon, Polyline, Readout, Readouts, Slider, Text, Toggle, num } from './kit'

// The density is drawn in plot units: t across and S × f(t) up, so the peak f(45) = 1/25 is at
// height 45 (mafs pads the view in plot units, so the true heights would be squashed).
const S = 1125
const f = (t: number) => (t >= 20 && t < 45 ? (t - 20) / 625 : t >= 45 && t <= 70 ? (70 - t) / 625 : 0)
const Y = (t: number) => S * f(t)
/** Pr(T ≤ x), from the areas of the triangles. */
const cdf = (x: number) => (x <= 20 ? 0 : x <= 45 ? (x - 20) ** 2 / 1250 : x <= 70 ? 1 - (70 - x) ** 2 / 1250 : 1)
const GRAPH: [number, number][] = [[0, 0], [20, 0], [45, 45], [70, 0], [100, 0]]
function under(a: number, b: number): [number, number][] {
  const pts: [number, number][] = [[a, 0], [a, Y(a)]]
  for (const k of [20, 45, 70]) if (k > a && k < b) pts.push([k, Y(k)])
  pts.push([b, Y(b)], [b, 0])
  return pts
}

// Tick numbers drawn by hand (the plane's own labels would show plot units). In mafs, attach "n"
// hangs the text below the anchor.
/** A slider value for the text: whole numbers as is, otherwise one decimal place. */
const fmt = (v: number) => (Math.abs(v - Math.round(v)) < 0.05 ? String(Math.round(v)) : v.toFixed(1))

function Ticks({ xs = [], ys = [], xName }: { xs?: [number, string][]; ys?: [number, string][]; xName?: [number, string] }) {
  return (
    <>
      {xs.map(([v, s]) => (
        <Text key={`x${v}`} x={v} y={0} attach="n" attachDistance={17} size={12} color={C.ink}>{s}</Text>
      ))}
      {xName && (
        <Text x={xName[0]} y={0} attach="w" attachDistance={2} size={14} color={C.ink} svgTextProps={{ fontStyle: 'italic', dy: '-0.9em' }}>{xName[1]}</Text>
      )}
      {ys.map(([v, s]) => (
        <Text key={`y${v}`} x={0} y={v} attach="w" attachDistance={7} size={12} color={C.ink}>{s}</Text>
      ))}
    </>
  )
}

export default function Area() {
  const [lo, setLo] = useState(25)
  const [hi, setHi] = useState(55)
  const [tails, setTails] = useState(false)
  const total = cdf(hi) - cdf(lo)
  const rising = lo < 45 ? cdf(Math.min(hi, 45)) - cdf(lo) : 0
  const falling = hi > 45 ? cdf(hi) - cdf(Math.max(lo, 45)) : 0
  const leftTail = cdf(lo)
  const rightTail = 1 - cdf(hi)
  const straddles = lo < 45 && hi > 45
  const isQuestion = Math.abs(lo - 25) < 0.3 && Math.abs(hi - 55) < 0.3
  const from20 = lo < 20.3 && Math.abs(hi - 55) < 0.3

  let notice
  if (tails && straddles) {
    const b1 = fmt(lo - 20)
    const b2 = fmt(70 - hi)
    notice = (
      <Notice>
        The whole triangle has area 1, so take away the two red corners. Each corner is a right-angled triangle, because{' '}
        <M>f</M> is a straight line: base <M>{b1}</M> and height <M>{`f(${fmt(lo)}) = \\tfrac{${b1}}{625}`}</M> on the left,
        area <M>{`\\tfrac12 \\times ${b1} \\times \\tfrac{${b1}}{625} \\approx ${num(leftTail, 3)}`}</M>, and base{' '}
        <M>{b2}</M> on the right, area <M>{`\\approx ${num(rightTail, 3)}`}</M>. So the green area is{' '}
        <M>{`1 - ${num(leftTail, 3)} - ${num(rightTail, 3)} \\approx ${num(total, 3)}`}</M>
        {isQuestion ? <>, which is <M>{'\\tfrac45'}</M> ✓, with no integrals at all.</> : '.'}
      </Notice>
    )
  } else if (tails) {
    notice = (
      <Notice>
        The whole triangle has area 1, so the green area is 1 minus the two red pieces:{' '}
        <M>{`1 - ${num(leftTail, 3)} - ${num(rightTail, 3)} \\approx ${num(total, 3)}`}</M>. When the interval doesn&apos;t
        cross the peak, one of the red pieces contains the peak, so it isn&apos;t a simple corner triangle any more.
      </Notice>
    )
  } else if (from20) {
    notice = (
      <Notice tone="warn">
        With 20 as the lower end, the shaded area is <M>\Pr(T \le 55) = 0.82</M>, not <M>\Pr(25 \le T \le 55)</M>. The report
        notes some students used 20 instead of 25 as the lower limit. (0.82 is part c.&apos;s denominator, so it is worth knowing,
        but it isn&apos;t this answer.)
      </Notice>
    )
  } else if (straddles) {
    notice = (
      <Notice>
        The shaded area is <M>{`\\Pr(${fmt(lo)} \\le T \\le ${fmt(hi)})`}</M>. It runs across <M>t = 45</M>, where the
        rule for <M>f</M> changes, so it takes two integrals: the blue piece uses <M>{'\\tfrac{t-20}{625}'}</M> up to 45 and the
        orange piece uses <M>{'\\tfrac{70-t}{625}'}</M> from 45. Split at exactly 45: <M>t</M> is continuous, so{' '}
        <M>{'20 \\le t < 45'}</M> runs right up to 45, not to 44. Try the lower end at 20, or turn on the corners view.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Both ends are on the same side of the peak, so only one rule is involved and a single integral does it. The split is
        needed only when the interval crosses <M>t = 45</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-19, 108]} y={[-8, 52]} xStep={5} yStep={11.25} labels={false} xLabel="" yLabel="" height={280}>
        <Text x={0} y={50} attach="e" attachDistance={6} size={14} color={C.ink} svgTextProps={{ fontStyle: 'italic' }}>y</Text>
        <Ticks xs={[[20, '20'], [40, '40'], [60, '60'], [80, '80'], [100, '100']]} ys={[[22.5, '1/50'], [45, '1/25']]} xName={[108, 't']} />
        {tails ? (
          <>
            {lo > 20 && <Polygon points={under(20, lo)} color={C.bad} fillOpacity={0.3} weight={0} strokeOpacity={0} />}
            {hi < 70 && <Polygon points={under(hi, 70)} color={C.bad} fillOpacity={0.3} weight={0} strokeOpacity={0} />}
            {hi > lo && <Polygon points={under(lo, hi)} color={C.good} fillOpacity={0.3} weight={0} strokeOpacity={0} />}
          </>
        ) : (
          <>
            {lo < 45 && hi > lo && <Polygon points={under(lo, Math.min(hi, 45))} color={C.f} fillOpacity={0.35} weight={0} strokeOpacity={0} />}
            {hi > 45 && hi > lo && <Polygon points={under(Math.max(lo, 45), hi)} color={C.g} fillOpacity={0.35} weight={0} strokeOpacity={0} />}
            {straddles && <Line.Segment point1={[45, 0]} point2={[45, 45]} color={C.ink} style="dashed" weight={1.5} />}
          </>
        )}
        <Polyline points={GRAPH} color={C.f} weight={3} />
        {!tails && straddles && <Label at={[45, 45]} color={C.ink} attach="e">t = 45</Label>}
      </Plane>
      <Controls>
        <Slider label="\text{from}" value={lo} onChange={v => setLo(Math.min(v, hi))} min={20} max={70} step={0.1} format={v => v.toFixed(1)} />
        <Slider label="\text{to}" value={hi} onChange={v => setHi(Math.max(v, lo))} min={20} max={70} step={0.1} format={v => v.toFixed(1)} />
        <Buttons>
          <Toggle label="Whole triangle minus the corners" checked={tails} onChange={setTails} />
        </Buttons>
        <Readouts>
          {tails ? (
            <>
              <Readout color={C.bad} tex={`\\text{corners} \\approx ${num(leftTail, 3)} + ${num(rightTail, 3)}`} />
              <Readout color={C.good} tex={`1 - \\text{corners} \\approx ${num(total, 4)}`} />
            </>
          ) : (
            <>
              {rising > 0 && <Readout color={C.f} tex={`\\text{blue} \\approx ${num(rising, 4)}`} />}
              {falling > 0 && <Readout color={C.g} tex={`\\text{orange} \\approx ${num(falling, 4)}`} />}
              <Readout tex={`\\text{area} \\approx ${num(total, 4)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
