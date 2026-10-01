// 2023 Methods Exam 2 MCQ 12 — the turning point of E(X) is not allowed. The probabilities k², 3k,
// k and −k² − 4k + 1 add to 1 for every k, so the sum can't find k; what restricts k is that every
// probability must be ≥ 0, which gives 0 ≤ k ≤ √5 − 2 (≈ 0.236, shaded green). The mean
// E(X) = −3k² − 7k + 2 has its turning point at k = −7/6 (E(X) = 73/12 ≈ 6.08, not an option), but
// there Pr(X = 0) = 3k = −3.5. On the allowed interval E(X) is decreasing, so its largest value is
// at k = 0: E(X) = 2, when X = 2 for certain.
//
// Starts at the turning point (the tempting "maximum"); the table under the graph shows each
// probability for the current k, in red when it is negative.

import { useState } from 'react'
import { C, Controls, Katex, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, tick } from './kit'

const K_HI = Math.sqrt(5) - 2 // ≈ 0.236
const E = (k: number) => -3 * k * k - 7 * k + 2
const EPS = 1e-9

export default function AllowedK() {
  const [k, setK] = useState(-7 / 6)

  const probs = [k * k, 3 * k, k, -k * k - 4 * k + 1]
  const allowed = probs.every(p => p >= -EPS)
  const mean = E(k)

  let notice
  if (k < -EPS) {
    notice =
      Math.abs(k + 7 / 6) <= 0.02 ? (
        <Notice tone="warn">
          This is the turning point of <M>E(X) = -3k^2 - 7k + 2</M>: <M>{'k = -\\tfrac{7}{6}'}</M> gives{' '}
          <M>{'E(X) = \\tfrac{73}{12} \\approx 6.08'}</M>, bigger than every option. But look at the table:{' '}
          <M>\Pr(X=0) = 3k = -3.5</M>. A probability can&apos;t be negative, so this <M>k</M> is not allowed. Drag{' '}
          <M>k</M> right until every probability is <M>\geq 0</M>.
        </Notice>
      ) : (
        <Notice tone="warn">
          Not allowed: with <M>{'k < 0'}</M>, both <M>\Pr(X=0) = 3k</M> and <M>\Pr(X=1) = k</M> are negative (red in
          the table). So every <M>k</M> to the left of <M>0</M> is ruled out, and with it the high part of the curve,
          turning point and all. Drag <M>k</M> right into the green band.
        </Notice>
      )
  } else if (!allowed) {
    notice = (
      <Notice tone="warn">
        Now <M>\Pr(X=2) = -k^2 - 4k + 1</M> is negative: it is <M>0</M> at <M>{'k = \\sqrt5 - 2 \\approx 0.236'}</M> and
        below <M>0</M> after that. So the allowed values are <M>{'0 \\leq k \\leq \\sqrt5 - 2'}</M>, the green band. Drag{' '}
        <M>k</M> back into it.
      </Notice>
    )
  } else if (k > 0.005) {
    notice = (
      <Notice>
        Every probability is <M>\geq 0</M>, so this <M>k</M> is allowed. Inside the green band the curve slopes downhill,
        so <M>E(X)</M> gets bigger as <M>k</M> gets smaller. Drag <M>k</M> to the left edge of the band.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>The largest allowed mean is at the left edge, k = 0.</b> The table is <M>0, 0, 0, 1</M>: <M>X = 2</M> for
        certain, so <M>E(X) = 2</M>, option <b>E</b>. No mean can beat this, because <M>X</M> is never more than{' '}
        <M>2</M>.
      </Notice>
    )
  }

  const cell = 'border border-gray-300 dark:border-gray-700 px-2 py-1 text-center'

  return (
    <div>
      <Plane x={[-1.4, 0.5]} y={[-3, 7]} xStep={0.5} yStep={2} height={290} xLabel="k" yLabel="E(X)" xLabels={v => (v < -1.45 || v > 0.45 ? '' : tick(v))}>
        <Region top={() => 7} bottom={() => -3} from={0} to={K_HI} color={C.good} opacity={0.15} />
        <Plot.OfX y={E} color={C.f} weight={2.5} />
        <Plot.OfX y={E} domain={[0, K_HI]} color={C.good} weight={4.5} />
        <Point x={-7 / 6} y={73 / 12} color={C.guide} />
        <Label at={[-7 / 6, 73 / 12]} attach="s" size={12} gap={9}>turning point</Label>
        <Label at={[K_HI / 2, -3]} attach="n" size={12} color={C.good}>allowed</Label>
        <Point x={k} y={mean} color={allowed ? C.good : C.bad} />
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={setK} min={-1.4} max={0.5} step={0.01} />
        <Readouts>
          <Readout color={allowed ? C.good : C.bad} tex={`E(X) = -3k^2 - 7k + 2 = ${mean.toFixed(2)}`} />
        </Readouts>
        <div className="overflow-x-auto">
          <table className="border-collapse text-[12.5px] text-gray-700 dark:text-gray-300 tabular-nums">
            <tbody>
              <tr>
                <td className={cell}>
                  <Katex tex="x" />
                </td>
                {[-1, 0, 1, 2].map(x => (
                  <td key={x} className={cell}>
                    <Katex tex={String(x)} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className={cell}>
                  <Katex tex="\Pr(X=x)" />
                </td>
                {probs.map((p, i) => (
                  <td
                    key={i}
                    className={`${cell} ${p < -EPS ? 'bg-red-50 text-red-700 font-semibold dark:bg-red-950/40 dark:text-red-300' : ''}`}
                  >
                    {Math.abs(p) < 0.005 ? '0.00' : p.toFixed(2).replace('-', '−')}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        {notice}
      </Controls>
    </div>
  )
}
