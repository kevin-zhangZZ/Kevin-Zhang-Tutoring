// 2017 Methods Exam 2 Q3e.ii — a conditional binomial probability as a share of bars. X ~ Bi(7, 8/25)
// is drawn as eight bars. "Given at least one" throws away the X = 0 bar, so the bars 1–7 become the
// new whole (0.9328); "at least two" is the bars 2–7 (0.7113), and the answer is their share,
// 0.7626. A toggle shows the report's wrong version Pr(X > 2)/Pr(X > 1): for a count, "> 2" drops the
// bar at 2 from the top and "> 1" drops the bar at 1 from the bottom, giving 0.5605.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Polygon, Readout, Readouts, Text, Toggle, num } from './kit'

const P = 8 / 25
const choose = (n: number, k: number) => {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
const PMF = Array.from({ length: 8 }, (_, k) => choose(7, k) * P ** k * (1 - P) ** (7 - k))
const sumFrom = (lo: number) => PMF.slice(lo).reduce((s, v) => s + v, 0)

// Bars in plot units: bar k is centred at k + 1 (so the y-axis sits clear of the first bar) and is
// 100 × Pr(X = k) tall — mafs pads the view in plot units, so a 0–1 height would be squashed.
export default function Given() {
  const [wrong, setWrong] = useState(false)
  const topFrom = wrong ? 3 : 2 // numerator: bars topFrom…7
  const givenFrom = wrong ? 2 : 1 // denominator: bars givenFrom…7
  const num_ = sumFrom(topFrom)
  const den = sumFrom(givenFrom)

  return (
    <div>
      <Plane x={[-1, 8.7]} y={[-8, 36]} xStep={1} yStep={10} labels={false} xLabel="" yLabel="" height={270}>
        {Array.from({ length: 8 }, (_, j) => (
          <Text key={`x${j}`} x={j + 1} y={0} attach="n" attachDistance={17} size={12} color={C.ink}>{String(j)}</Text>
        ))}
        {[10, 20, 30].map(v => (
          <Text key={`y${v}`} x={0} y={v} attach="w" attachDistance={7} size={12} color={C.ink}>{(v / 100).toFixed(1)}</Text>
        ))}
        <Text x={8.7} y={0} attach="w" attachDistance={2} size={14} color={C.ink} svgTextProps={{ fontStyle: 'italic', dy: '-0.9em' }}>x</Text>
        {PMF.map((v, j) => {
          const h = 100 * v
          const inTop = j >= topFrom
          const inGiven = j >= givenFrom
          const color = inTop ? C.g : inGiven ? C.f : C.guide
          return (
            <Polygon
              key={j}
              points={[[j + 0.65, 0], [j + 1.35, 0], [j + 1.35, h], [j + 0.65, h]]}
              color={color}
              fillOpacity={inGiven ? 0.7 : 0.25}
              weight={inGiven ? 0 : 1.5}
              strokeStyle={inGiven ? 'solid' : 'dashed'}
              strokeOpacity={inGiven ? 0 : 0.9}
            />
          )
        })}
        {PMF.slice(0, 5).map((v, j) => (
          <Label key={j} at={[j + 1, 100 * v]} color={j >= topFrom ? C.g : j >= givenFrom ? C.f : C.guide} attach="s" size={10}>
            {num(v, 3)}
          </Label>
        ))}
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="What if I write Pr(X > 2) / Pr(X > 1)?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\Pr(X ${wrong ? '> 2' : '\\ge 2'}) \\approx ${num(num_, 4)}`} />
          {/* No colour key: the denominator is the blue AND the orange bars together. */}
          <Readout tex={`\\Pr(X ${wrong ? '> 1' : '\\ge 1'}) \\approx ${num(den, 4)}`} />
          <Readout tex={`\\text{share} \\approx ${num(num_ / den, 4)}`} />
        </Readouts>
        {wrong ? (
          <Notice tone="warn">
            <M>X</M> counts days, so it only takes whole numbers: <M>X &gt; 2</M> means <M>X \ge 3</M>, and <M>X &gt; 1</M> means{' '}
            <M>X \ge 2</M>. The bar at 2 has dropped out of the top and the bar at 1 out of the bottom, and the share falls to about{' '}
            {num(num_ / den, 4)}. That answers a different question (&ldquo;at least three, given at least two&rdquo;). &ldquo;At least
            two&rdquo; <b>includes</b> two: <M>X \ge 2</M>.
          </Notice>
        ) : (
          <Notice>
            &ldquo;Given at least one&rdquo; rules out the dashed <M>X = 0</M> bar, so only the coloured bars 1 to 7 are still
            possible: together they are the new whole, <M>{'1 - 0.68^7 \\approx 0.9328'}</M>. &ldquo;At least two&rdquo; is the orange
            bars, <M>\approx 0.7113</M>, and they sit entirely inside the given ones. The answer is their share:{' '}
            <M>{'\\tfrac{0.7113\\ldots}{0.9328\\ldots} \\approx 0.7626'}</M>. Divide the unrounded values and round once at the end:{' '}
            <M>0.7113 \div 0.9328</M> gives <M>0.7625</M>, the wrong answer the report mentions.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
