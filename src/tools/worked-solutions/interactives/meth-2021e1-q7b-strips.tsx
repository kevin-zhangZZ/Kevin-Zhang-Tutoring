// 2021 Methods Exam 1 Q7b — why E(X) needs the extra x. Chop [1, 2] into n equal strips under
// f(x) = 2/x². Each strip's area, 2/a − 2/b for a strip from a to b, is the probability that X lands
// in it. Treat X as sitting at its strip's middle and X becomes discrete, so its mean is
// Σ x·Pr(X = x), the discrete formula; the table does exactly that for n ≤ 6. As n grows the sum
// closes in on ∫₁² x f(x) dx = 2 logₑ(2) ≈ 1.386 (1.5 at n = 1, 1.394 at n = 4, 1.3864 at n = 40).
// A toggle drops the x (the report's "integral of f(x) rather than xf(x)"): the sum is then the total
// probability, 1 for every n, i.e. ∫₁² f(x) dx = 1 from part a — the dashed line lands on the edge x = 1.
// Values checked in Python: strip probabilities sum to 1; midpoint-weighted sums as above.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle } from './kit'

const f = (x: number) => (x < 1 || x > 2 ? 0 : 2 / (x * x))
const MEAN = 2 * Math.LN2
const TABLE_MAX = 6

/** The n strips: left edge a, right edge b, middle x, probability Pr(a ≤ X ≤ b) = 2/a − 2/b. */
function strips(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = 1 + i / n
    const b = 1 + (i + 1) / n
    return { a, b, x: (a + b) / 2, p: 2 / a - 2 / b }
  })
}

export default function Strips() {
  const [n, setN] = useState(4)
  const [slip, setSlip] = useState(false)

  const S = strips(n)
  const sumP = S.reduce((t, s) => t + s.p, 0)
  const sumXP = S.reduce((t, s) => t + s.x * s.p, 0)
  const line = slip ? 1 : sumXP
  const lineColour = slip ? C.bad : C.good

  let notice
  if (slip) {
    notice = (
      <Notice tone="warn">
        <b>Without the <M>x</M> you are only adding the probabilities</b>, and they make up the whole region, so the
        total is <M>1</M> for every <M>n</M>. In the limit that is <span className="whitespace-nowrap"><M>{'\\int_1^2 f(x)\\,dx = 1'}</M>,</span>{' '}
        the total probability from part (a). Every density gives <M>1</M> here, so it says nothing about where <M>X</M> is
        centred: the dashed line at <M>x = 1</M> sits on the very edge of the region, though <M>X</M> takes values
        right across <M>[1, 2]</M>. Switch the toggle off.
      </Notice>
    )
  } else if (n === 1) {
    notice = (
      <Notice>
        With one strip, all the probability (<M>1</M>) sits at the middle, <M>1.5</M>, so the estimate is{' '}
        <span className="whitespace-nowrap"><M>{'1.5 \\times 1 = 1.5'}</M>.</span> But <M>f</M> is much taller near{' '}
        <M>x = 1</M>, so <M>X</M> is more likely to be small and the true mean is further left. Increase <M>n</M>.
      </Notice>
    )
  } else if (n <= TABLE_MAX) {
    notice = (
      <Notice>
        Each strip&apos;s area is the probability that <M>X</M> lands in it. Treat <M>X</M> as sitting at the middle of
        its strip and <M>X</M> becomes a discrete random variable, so its mean is{' '}
        <span className="whitespace-nowrap"><M>{'\\sum x\\cdot\\Pr(X=x)'}</M>:</span> each value times its probability,
        exactly as the table does. Increase <M>n</M> to make the strips thinner.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        With <M>{`n = ${n}`}</M> strips the sum is <span className="whitespace-nowrap"><M>{`\\approx ${sumXP.toFixed(4)}`}</M>,</span>{' '}
        closing in on <span className="whitespace-nowrap"><M>{'2\\log_e(2) \\approx 1.3863'}</M>.</span> As the strips get
        thin, each probability becomes <M>{'f(x)\\,dx'}</M> and the sum becomes an integral, so{' '}
        <M>{'\\sum x\\cdot\\Pr(X=x)'}</M> becomes <span className="whitespace-nowrap"><M>{'\\int_1^2 x\\,f(x)\\,dx'}</M>.</span>{' '}
        The <M>x</M> is the value and <M>{'f(x)\\,dx'}</M> its probability: the mean needs both. Now try the toggle.
      </Notice>
    )
  }

  const cell = 'px-1.5 py-1 text-center'
  const head = 'px-2 py-1 text-left font-normal whitespace-nowrap text-gray-500 dark:text-gray-400'

  return (
    <div>
      <Plane x={[0.8, 2.2]} y={[-0.4, 2.5]} xStep={0.25} yStep={0.5} xLabels={false} height={300}>
        {[1, 1.25, 1.5, 1.75, 2].map(k => (
          <Label key={k} at={[k, -0.16]} attach="s" size={11} gap={3} bold={false}>{String(k)}</Label>
        ))}
        {S.map((s, i) => (
          <Region key={i} top={f} bottom={() => 0} from={s.a} to={s.b} color={i % 2 ? C.violet : C.f} opacity={0.3} samples={40} />
        ))}
        {S.slice(1).map((s, i) => (
          <Line.Segment key={i} point1={[s.a, 0]} point2={[s.a, f(s.a)]} color={C.guide} weight={1} />
        ))}
        <Plot.OfX y={f} domain={[1, 2]} color={C.f} weight={3} />
        <Line.Segment point1={[1, 0]} point2={[1, 2]} color={C.f} weight={2} />
        <Line.Segment point1={[2, 0]} point2={[2, 0.5]} color={C.f} weight={2} />
        <Label at={[1.62, f(1.62)]} color={C.f} attach="ne">y = f(x)</Label>
        <Label at={[1, 2]} color={C.f} attach="w" size={11} bold={false}>2</Label>
        <Label at={[2, 0.5]} color={C.f} attach="e" size={11} bold={false}>0.5</Label>
        {n <= 12 && S.map((s, i) => <Point key={i} x={s.x} y={0} color={C.ink} />)}
        <Line.Segment point1={[line, 0]} point2={[line, 2.2]} color={lineColour} style="dashed" weight={2} />
        <Label at={[line, 2.2]} attach={slip ? 'e' : 'n'} color={lineColour} size={12} gap={5}>
          {slip ? 'Σ Pr = 1' : `Σ x·Pr ≈ ${sumXP.toFixed(3)}`}
        </Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={40} step={1} format={v => String(Math.round(v))} />
        <Toggle label={<>Drop the <M>x</M>: add up <M>{'\\Pr'}</M> only, i.e. <M>{'\\int_1^2 f(x)\\,dx'}</M></>} checked={slip} onChange={setSlip} />
        {n <= TABLE_MAX ? (
          <div className="overflow-x-auto">
            <table className="mx-auto text-[13px] border-collapse tabular-nums text-gray-800 dark:text-gray-100">
              <tbody>
                <tr>
                  <th className={head}><i>x</i> (middle)</th>
                  {S.map((s, i) => <td key={i} className={cell}>{s.x.toFixed(3)}</td>)}
                  <td className={`${cell} font-semibold`}>Σ</td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <th className={head}>Pr (area)</th>
                  {S.map((s, i) => <td key={i} className={cell}>{s.p.toFixed(3)}</td>)}
                  <td className={`${cell} font-semibold`} style={slip ? { color: C.bad } : undefined}>{sumP.toFixed(3)}</td>
                </tr>
                <tr className={`border-t border-gray-200 dark:border-gray-700 ${slip ? 'opacity-35 line-through' : ''}`}>
                  <th className={head}><i>x</i> × Pr</th>
                  {S.map((s, i) => <td key={i} className={cell}>{(s.x * s.p).toFixed(3)}</td>)}
                  <td className={`${cell} font-semibold`} style={slip ? undefined : { color: C.good }}>{sumXP.toFixed(3)}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-center text-[11.5px] text-gray-500 dark:text-gray-400 mt-1">
              A strip from <i>a</i> to <i>b</i> has area <M>{'\\int_a^b \\tfrac{2}{x^2}\\,dx = \\tfrac{2}{a} - \\tfrac{2}{b}'}</M>.
            </p>
          </div>
        ) : null}
        <Readouts>
          {slip ? (
            <Readout color={C.bad} tex={`\\sum \\Pr = ${sumP.toFixed(3)} \\;\\to\\; \\int_1^2 f(x)\\,dx = 1`} />
          ) : (
            <Readout color={C.good} tex={`\\sum x\\cdot\\Pr \\approx ${sumXP.toFixed(4)} \\;\\to\\; \\int_1^2 x\\,f(x)\\,dx \\approx ${MEAN.toFixed(4)}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
