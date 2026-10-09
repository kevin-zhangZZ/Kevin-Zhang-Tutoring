// 2023 Methods Exam 2 MCQ 11 — why the gradient of y = f(x)g(x) at x = −2 is 24 − 14 = 10 and not
// f′(−2) × g′(−2) = 6. Any f and g with the four given values have this gradient at x = −2, so the
// widget uses the simplest pair: the straight lines f(x) = 3x − 1 (f(−2) = −7, gradient 3) and
// g(x) = 2x + 12 (g(−2) = 8, gradient 2), so y = 6x² + 34x − 12 and P = (−2, −56).
//
// Step from x = −2 to x = −2 + h: f changes by Δf = 3h and g by Δg = 2h, and
// Δy = (f + Δf)(g + Δg) − fg = g·Δf + f·Δg + Δf·Δg = 24h − 14h + 6h², so the chord PQ has gradient
// 24 − 14 + 6h = 10 + 6h. The product of the derivatives, 3 × 2 = 6, only appears in the last
// piece, which carries an extra h and vanishes as h → 0, leaving the product rule's 24 − 14 = 10.
// The toggle draws the gradient-6 line through P; it cuts the curve again at x = −8/3, so it is
// not the tangent.

import { useState } from 'react'
import { Buttons, C, Controls, Katex, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, num, usePlayer } from './kit'

const H_MAX = 1.5
const H_MIN = 0.02
const H_START = 1

const y = (x: number) => 6 * x * x + 34 * x - 12 // (3x − 1)(2x + 12)
const P: [number, number] = [-2, -56]

export default function TwoPieces() {
  // The player runs s from 0 to 1; h = H_MAX at s = 0 and shrinks to H_MIN at s = 1.
  const [s, setS] = useState((H_MAX - H_START) / (H_MAX - H_MIN))
  const player = usePlayer(setS, { min: 0, max: 1, seconds: 6 })
  const [wrong, setWrong] = useState(false)
  const h = H_MAX - s * (H_MAX - H_MIN)

  const Q: [number, number] = [-2 + h, y(-2 + h)]
  const chord = (Q[1] - P[1]) / h // = 10 + 6h

  const rows: { tex: string; perH: string; limit: string; color?: string }[] = [
    { tex: 'g(-2)\\,\\Delta f = 8(3h)', perH: '24', limit: '24', color: C.f },
    { tex: 'f(-2)\\,\\Delta g = -7(2h)', perH: '-14', limit: '-14', color: C.f },
    { tex: '\\Delta f\\,\\Delta g = (3h)(2h)', perH: `6h = ${num(6 * h, 2)}`, limit: '0', color: C.violet },
    { tex: '\\text{chord gradient}', perH: num(chord, 2), limit: '10' },
  ]

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red line has gradient <M>f'(-2)\times g'(-2) = 3\times2 = 6</M>. It cuts straight through the curve and meets it
        again at <M>{'x = -\\tfrac{8}{3}'}</M>, so it is not the tangent. Multiplying the derivatives keeps only the
        violet piece, the one that vanishes, and throws away the two pieces that make the gradient: <M>24 - 14 = 10</M>.
      </Notice>
    )
  } else if (h > 0.4) {
    notice = (
      <Notice>
        Any <M>f</M> and <M>g</M> with the four given values would do, so take the simplest: the straight lines{' '}
        <M>f(x) = 3x - 1</M> and <M>g(x) = 2x + 12</M>. Step from{' '}
        <M>x = -2</M> to <M>-2 + h</M>: <M>f</M> changes by <M>\Delta f = f'(-2)h = 3h</M> and <M>g</M> by{' '}
        <M>\Delta g = g'(-2)h = 2h</M>, and
        expanding <M>{'(f + \\Delta f)(g + \\Delta g) - fg'}</M> splits the change in <M>y</M> into the three pieces in the
        table. Press &ldquo;Shrink h&rdquo; and watch the orange chord <M>PQ</M>.
      </Notice>
    )
  } else if (h > 0.08) {
    notice = (
      <Notice>
        The first two pieces give <M>24</M> and <M>-14</M> whatever <M>h</M> is. The violet piece is the only place the two
        derivatives multiply, <M>3\times2 = 6</M>, and it comes with an extra <M>h</M>, so it keeps shrinking. Keep
        shrinking <M>h</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>The chord has become the tangent.</b> Its gradient settles on <M>24 - 14 = 10</M>: <M>g(-2)f'(-2)</M> from{' '}
        <M>f</M> changing plus <M>f(-2)g'(-2)</M> from <M>g</M> changing, which is the product rule. The <M>6</M> from
        multiplying the derivatives has gone to <M>0</M>. Now turn on &ldquo;Multiply the derivatives&rdquo; to see the gradient-6 line.
      </Notice>
    )
  }

  return (
    <div>
      {/* y-axis name placed beside the axis top (not on it), so it isn't clipped at the edge. */}
      <Plane x={[-4, 0.7]} y={[-65, -25]} xStep={1} yStep={10} height={300} yLabel="">
        <Plot.OfX y={y} color={C.f} weight={3} />
        <Line.ThroughPoints point1={P} point2={[-1, -46]} color={C.good} style="dashed" weight={2} />
        <Line.ThroughPoints point1={P} point2={Q} color={C.g} weight={2} />
        {wrong && (
          <>
            <Line.ThroughPoints point1={P} point2={[-1, -50]} color={C.bad} weight={2} />
            <Point x={-8 / 3} y={-60} color={C.bad} />
          </>
        )}
        <Point x={Q[0]} y={Q[1]} color={C.g} />
        <Point x={P[0]} y={P[1]} color={C.ink} />
        <Label at={P} attach="nw" size={12}>P(−2, −56)</Label>
        <Label at={Q} attach="se" size={12} color={C.g}>Q</Label>
        <Label at={[-0.9, -33]} attach="w" size={12} color={C.f}>y = f(x)g(x)</Label>
        <Label at={[0, -25]} attach="e" size={14} italic>y</Label>
      </Plane>
      <Controls>
        <Slider
          label="h"
          value={h}
          onChange={v => {
            player.stop()
            setS((H_MAX - v) / (H_MAX - H_MIN))
          }}
          min={H_MIN}
          max={H_MAX}
          step={0.01}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(s)} label="Shrink h" />
        </Buttons>
        <Toggle label="Multiply the derivatives: gradient 6" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={C.g} tex={`\\text{chord }PQ\\text{: gradient } ${num(chord, 2)}`} />
          <Readout color={C.good} tex="\text{tangent at }P\text{: gradient }10" />
          {wrong && <Readout color={C.bad} tex="f'(-2)\,g'(-2) = 6" />}
        </Readouts>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px] text-gray-700 dark:text-gray-300 tabular-nums">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                <th className="py-1 pr-2 text-left font-normal">
                  piece of <Katex tex="\Delta y" />
                </th>
                <th className="py-1 px-1 text-right font-normal">
                  <Katex tex="\div h" />
                </th>
                <th className="py-1 pl-2 text-right font-normal">
                  as <Katex tex="h\to0" />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr
                  key={r.tex}
                  className={r.color ? '' : 'border-t border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-white'}
                >
                  <td className="py-1 pr-2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      {r.color && <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: r.color }} />}
                      <Katex tex={r.tex} />
                    </span>
                  </td>
                  <td className="py-1 px-1 text-right whitespace-nowrap">
                    <Katex tex={r.perH} />
                  </td>
                  <td className="py-1 pl-2 text-right">
                    <Katex tex={r.limit} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {notice}
      </Controls>
    </div>
  )
}
