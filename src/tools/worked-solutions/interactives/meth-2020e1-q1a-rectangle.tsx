// 2020 Methods Exam 1 Q1a — why the product rule has two terms. Read y = x² sin(x) as the area of
// a rectangle, width x² and height sin(x). Increase x by h and both sides grow: the extra area is
// an orange strip down the right (width grows), a blue strip along the top (height grows) and a
// small violet corner (both at once). The table divides each piece by h; as h shrinks, the two
// strips settle on the two terms 2x sin(x) and x² cos(x), while the corner (about 2x cos(x) × h²,
// the only place the two derivatives multiply) goes to 0. That is the product rule, and it is why
// "differentiate each factor and multiply" (2x cos(x)) is wrong.
//
// x stays in [0.6, 1.3] and h in [0.02, 0.25], so x + h < π/2: sin is still increasing and every
// piece has positive area.

import { useState } from 'react'
import { Buttons, C, Controls, Katex, Label, M, Notice, Plane, PlayButton, Polygon, Slider, num, usePlayer } from './kit'

const H_MAX = 0.25
const H_MIN = 0.02

type Box = [number, number, number, number]
const rect = ([x0, x1, y0, y1]: Box): [number, number][] => [
  [x0, y0],
  [x1, y0],
  [x1, y1],
  [x0, y1],
]

function Piece({ box, color, opacity }: { box: Box; color: string; opacity: number }) {
  return <Polygon points={rect(box)} color={color} fillOpacity={opacity} weight={1} />
}

export default function ProductRectangle() {
  const [x, setX] = useState(1)
  // The player runs s from 0 to 1; h = H_MAX at s = 0 and shrinks to H_MIN at s = 1.
  const [s, setS] = useState((H_MAX - 0.2) / (H_MAX - H_MIN))
  const player = usePlayer(setS, { min: 0, max: 1, seconds: 6 })
  const h = H_MAX - s * (H_MAX - H_MIN)

  const u = x * x
  const v = Math.sin(x)
  const du = (x + h) ** 2 - u
  const dv = Math.sin(x + h) - v
  const right = du * v
  const top = u * dv
  const corner = du * dv
  const total = right + top + corner
  const t1 = 2 * x * Math.sin(x)
  const t2 = x * x * Math.cos(x)

  let notice
  if (h > 0.12) {
    notice = (
      <Notice>
        Read <M>y = x^2\sin(x)</M> as the area of a rectangle: width <M>x^2</M>, height <M>\sin(x)</M>. Increase{' '}
        <M>x</M> by <M>h</M> and <b>both sides grow</b>: the width by the orange strip, the height by the blue strip, plus
        the violet corner where both grow at once. The change in area, <M>\Delta y</M>, is the three pieces added. Now
        press &ldquo;Shrink h&rdquo; (or drag <M>h</M> towards 0) and watch the <M>\div h</M> column.
      </Notice>
    )
  } else if (h > 0.05) {
    notice = (
      <Notice>
        The strips get thinner as <M>h</M> shrinks, but so does <M>h</M>, so each strip <M>\div h</M> settles down: the
        orange one heads for <M>2x\sin(x)</M>, the blue one for <M>x^2\cos(x)</M>. The corner is thin in <i>both</i>{' '}
        directions, so its <M>\div h</M> value keeps falling towards <M>0</M>. Keep shrinking <M>h</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>Two strips survive; the corner doesn&apos;t.</b> The orange strip gives (rate the width grows) × height,{' '}
        <M>2x\cdot\sin(x)</M>. The blue strip gives width × (rate the height grows), <M>x^2\cdot\cos(x)</M>. So{' '}
        <M>{'\\frac{dy}{dx} = 2x\\sin(x) + x^2\\cos(x)'}</M>: one term for each factor changing while the other holds
        still. The corner is about <M>2x\cos(x)\times h^2</M>, the only place the two derivatives multiply each other,
        and it vanishes. That is why &ldquo;differentiate each factor and multiply&rdquo;, <M>2x\cos(x)</M>, is wrong.
      </Notice>
    )
  }

  const rows: { name: string; color?: string; area: number; limitTex: string; limit: number }[] = [
    { name: 'right strip', color: C.g, area: right, limitTex: '2x\\sin(x)', limit: t1 },
    { name: 'top strip', color: C.f, area: top, limitTex: 'x^2\\cos(x)', limit: t2 },
    { name: 'corner', color: C.violet, area: corner, limitTex: '0', limit: 0 },
    { name: 'total', area: total, limitTex: '\\tfrac{dy}{dx}', limit: t1 + t2 },
  ]

  return (
    <div>
      <Plane x={[0, 2.5]} y={[0, 1.05]} xStep={0.5} yStep={0.25} height={290} labels={false} xLabel="" yLabel="">
        <Piece box={[0, u, 0, v]} color={C.guide} opacity={0.18} />
        <Piece box={[u, u + du, 0, v]} color={C.g} opacity={0.6} />
        <Piece box={[0, u, v, v + dv]} color={C.f} opacity={0.6} />
        <Piece box={[u, u + du, v, v + dv]} color={C.violet} opacity={0.85} />
        <Label at={[u / 2, 0.66 * v]} attach="c" size={13}>y = x² sin x</Label>
        <Label at={[u / 2, 0]} attach="s" size={12} gap={5}>width x²</Label>
        <Label at={[0, 0.3 * v]} attach="e" size={12} gap={6}>height sin x</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={0.6} max={1.3} step={0.01} />
        <Slider
          label="h"
          value={h}
          onChange={v2 => {
            player.stop()
            setS((H_MAX - v2) / (H_MAX - H_MIN))
          }}
          min={H_MIN}
          max={H_MAX}
          step={0.005}
          format={v2 => v2.toFixed(3)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(s)} label="Shrink h" />
        </Buttons>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px] text-gray-700 dark:text-gray-300 tabular-nums">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                <th className="py-1 pr-2 text-left font-normal">piece</th>
                <th className="py-1 px-1 text-right font-normal">area</th>
                <th className="py-1 px-1 text-right font-normal">
                  <Katex tex="\div h" />
                </th>
                <th className="py-1 pl-2 text-left font-normal">
                  as <Katex tex="h\to0" />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr
                  key={r.name}
                  className={r.color ? '' : 'border-t border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-white'}
                >
                  <td className="py-1 pr-2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      {r.color && <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: r.color }} />}
                      {r.color ? r.name : <Katex tex="\Delta y" />}
                    </span>
                  </td>
                  <td className="py-1 px-1 text-right">{num(r.area, 3)}</td>
                  <td className="py-1 px-1 text-right">{num(r.area / h, 2)}</td>
                  <td className="py-1 pl-2 whitespace-nowrap">
                    <Katex tex={r.limit === 0 ? '0' : `${r.limitTex} \\approx ${num(r.limit, 2)}`} />
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
