// 2020 Methods Exam 2 Q3b — a conditional probability as a share of an area. T ~ N(0, 4²). "Given
// that it arrives after its scheduled time" keeps only the blue half T > 0 (area 0.5), which becomes
// the new whole; "no later than c minutes after" is the orange slice 0 < T ≤ c inside it, and the
// answer is the slice's share of the half: 0.27337…/0.5 ≈ 0.547 at c = 3. A toggle shows the
// report's error, Pr(T ≤ 3) on top: the red region spills left of 0, outside the condition, and the
// "probability" comes out 1.547 (in fact it is at least 1 for every c ≥ 0).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle, integrate, num, tick } from './kit'

const SD = 4
const pdf = (t: number) => Math.exp(-(t * t) / (2 * SD * SD)) / (SD * Math.sqrt(2 * Math.PI))
/** Pr(0 < T ≤ c) for c ≥ 0. */
const slice = (c: number) => integrate(pdf, 0, c, 200)

export default function Given() {
  const [c, setC] = useState(3)
  const [wrong, setWrong] = useState(false)

  const top = slice(c) // Pr(0 < T ≤ c)
  const wrongTop = 0.5 + top // Pr(T ≤ c)
  const at3 = Math.abs(c - 3) < 1e-9
  const color = wrong ? C.bad : C.g

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>{'\\Pr(T \\le ' + c.toFixed(1) + ')'}</M> is the whole red region, and part of it lies <b>left of 0</b>: deliveries
        that arrived early. We were told this delivery was late, so those outcomes are impossible here; they are outside the
        blue half. The ratio comes out about {num(wrongTop / 0.5, 3)}, more than the whole, which no probability can be. (The
        red region always includes the left half, area 0.5, so this ratio is at least 1 for every <M>c</M>.) On top goes the
        overlap of the event and the condition: <M>{'\\Pr(0 < T \\le 3)'}</M>.
      </Notice>
    )
  } else if (at3) {
    notice = (
      <Notice>
        &ldquo;Given that it arrives after its scheduled time&rdquo; throws away the left half: only the <b>blue</b> region{' '}
        <M>T &gt; 0</M> is still possible, so its area, 0.5, becomes the whole. &ldquo;No later than 3 minutes after&rdquo; is
        the <b>orange</b> slice <M>{'0 < T \\le 3'}</M>, and it sits inside the blue. The answer is the orange&apos;s share of the
        blue: <M>{'0.27337\\ldots \\div 0.5 \\approx 0.547'}</M>. Now drag <M>c</M> to see how the share changes.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        With &ldquo;no later than {num(c, 1)} minutes after&rdquo;, the orange slice has area about {num(top, 4)}, so its share of
        the blue half is about {num(top / 0.5, 3)}. As <M>c</M> grows the orange fills more of the blue and the share heads
        towards 1, but it can never pass 1, because the orange is always <i>inside</i> the blue. Turn on the toggle to see what
        happens if the top of the fraction isn&apos;t kept inside the blue.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-12, 12]}
        y={[0, 0.112]}
        xStep={2}
        yStep={0.05}
        yLabels={false}
        xLabels={v => (Math.abs(v % 4) < 1e-9 && Math.abs(v) < 11 ? tick(v) : '')}
        xLabel="t"
        yLabel=""
        height={260}
      >
        {/* The condition T > 0: the new whole. */}
        <Region top={pdf} bottom={() => 0} from={0} to={12} color={C.f} opacity={0.16} />
        {/* The event, as the top of the fraction. */}
        <Region top={pdf} bottom={() => 0} from={wrong ? -12 : 0} to={c} color={color} opacity={wrong ? 0.35 : 0.5} />
        <Plot.OfX y={pdf} domain={[-12, 12]} color={C.f} weight={3} />
        <Line.Segment point1={[c, 0]} point2={[c, 0.104]} color={color} style="dashed" weight={2} />
        <Label at={[c, 0.104]} color={color} attach="n" size={12}>{`c = ${num(c, 1)}`}</Label>
        <Label at={[4.6, 0.012]} color={C.f} attach="e" size={12}>T &gt; 0</Label>
        {wrong && <Label at={[-5.5, 0.012]} color={C.bad} attach="n" size={12}>early</Label>}
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={setC} min={0} max={12} step={0.1} format={v => v.toFixed(1)} />
        <Buttons>
          <Toggle label="What if I use Pr(T ≤ c) on top?" checked={wrong} onChange={setWrong} />
          {!at3 && <ActionButton label="Back to c = 3" onClick={() => setC(3)} />}
        </Buttons>
        <Readouts>
          {wrong ? (
            <Readout color={C.bad} tex={`\\Pr(T \\le ${c.toFixed(1)}) \\approx ${wrongTop.toFixed(4)}`} />
          ) : (
            <Readout color={C.g} tex={`\\Pr(0 < T \\le ${c.toFixed(1)}) \\approx ${top.toFixed(4)}`} />
          )}
          <Readout color={C.f} tex={'\\Pr(T > 0) = 0.5'} />
          <Readout tex={`\\text{share} \\approx ${((wrong ? wrongTop : top) / 0.5).toFixed(3)}${wrong ? ' > 1' : ''}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
