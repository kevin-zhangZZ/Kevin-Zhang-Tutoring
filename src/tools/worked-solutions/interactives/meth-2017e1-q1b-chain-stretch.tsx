// 2017 Methods Exam 1 Q1b — why the chain rule MULTIPLIES, and where g'(1) = −9 gets its minus sign.
// Three number lines on one scale: x, then u = 2 − x³, then g = u³, all starting from 1 (x = 1 gives
// u = 1 gives g = 1). A small step Δx is passed down the chain: the inside turns it into a step about
// 3 times as long in the OPPOSITE direction (du/dx = −3), and cubing stretches that about 3 times again
// (dg/du = 3). The ratios multiply exactly, (Δg/Δu)(Δu/Δx) = Δg/Δx, and settle on −3, 3 and −9 as
// Δx shrinks. A toggle shows the sign-slip answer +9 predicting a g-step the wrong way.

import { useState } from 'react'
import { C, Controls, M, Notice, Readout, Readouts, Slider, Toggle } from './kit'

const u = (x: number) => 2 - x ** 3
const g = (x: number) => u(x) ** 3

const W = 400
const S = 165 // px per unit, the same on all three lines
const px = (v: number) => W / 2 + (v - 1) * S
const ROWS = [
  { y: 40, name: 'x', color: C.f },
  { y: 122, name: 'u = 2 − x³', color: C.violet },
  { y: 204, name: 'g = u³', color: C.g },
]
const PRED_Y = 240
const TICKS = [0, 0.5, 1, 1.5, 2]

function Arrow({ from, to, y, color, dashed = false }: { from: number; to: number; y: number; color: string; dashed?: boolean }) {
  const dir = Math.sign(to - from)
  const long = Math.abs(to - from) > 9
  return (
    <g>
      <line
        x1={from}
        y1={y}
        x2={long ? to - dir * 7 : to}
        y2={y}
        stroke={color}
        strokeWidth={dashed ? 3 : 4.5}
        strokeDasharray={dashed ? '6 4' : undefined}
        strokeLinecap="round"
      />
      {long && <polygon points={`${to},${y} ${to - dir * 10},${y - 6} ${to - dir * 10},${y + 6}`} fill={color} />}
    </g>
  )
}

export default function ChainStretch() {
  const [h, setH] = useState(0.1)
  const [slip, setSlip] = useState(false)

  const zero = Math.abs(h) < 1e-9
  const x1 = 1 + h
  const u1 = u(x1)
  const g1 = g(x1)
  const du = u1 - 1
  const dg = g1 - 1
  const r1 = zero ? -3 : du / h
  const r2 = zero ? 3 : dg / du
  const slope = slip ? 9 : -9
  const predColor = slip ? C.bad : C.good
  const labelsRight = h >= 0
  const sideX = labelsRight ? W - 6 : 6
  const sideAnchor = labelsRight ? 'end' : 'start'
  const f2 = (v: number) => (v >= 0 ? v.toFixed(2) : `−${(-v).toFixed(2)}`)

  let notice
  if (slip) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>{"g'(1) = +9"}</M> predicts the red arrow
        </b>
        : <M>g</M> moving the <em>same</em> way as <M>x</M>. The real <M>g</M>-step (orange) goes the other way,
        because the inside <M>2 - x^3</M> reverses every step. Dropping the minus from{' '}
        <M>{'\\frac{d}{dx}(2 - x^3) = -3x^2'}</M> is exactly the slip with negatives the report describes.
      </Notice>
    )
  } else if (zero) {
    notice = <Notice>Move <M>\Delta x</M> away from 0 to send a step down the chain.</Notice>
  } else if (Math.abs(h) <= 0.02) {
    notice = (
      <Notice tone="good">
        <b>As the step shrinks, the ratios close in on</b> <M>-3</M>, <M>3</M> and <M>-9</M>. Those limits are{' '}
        <M>{'\\frac{du}{dx}'}</M>, <M>{'\\frac{dg}{du}'}</M> and <M>{"g'(1)"}</M>. The chain rule is just the fraction
        identity <M>{'\\frac{\\Delta g}{\\Delta u}\\times\\frac{\\Delta u}{\\Delta x} = \\frac{\\Delta g}{\\Delta x}'}</M>{' '}
        with the steps shrunk to nothing. Now turn on the sign slip.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        A step to the <b>{h > 0 ? 'right' : 'left'}</b> in <M>x</M> becomes a step about 3 times as long to the{' '}
        <b>{h > 0 ? 'left' : 'right'}</b> in <M>u</M>: the inside <M>2 - x^3</M> is decreasing, and that reversal is
        the minus sign in <M>{'\\frac{du}{dx} = -3x^2'}</M>. Cubing then stretches the step about{' '}
        <M>{'3u^2 = 3'}</M> times. Stretches multiply, so <M>g</M> moves about <M>9</M> times as far, reversed. Drag{' '}
        <M>\Delta x</M> towards 0 and watch the ratios settle.
      </Notice>
    )
  }

  return (
    <div>
      <div className="text-gray-700 dark:text-gray-200">
        <svg viewBox={`0 0 ${W} 262`} className="w-full h-auto" role="img" aria-label="Three number lines x, u and g showing a step passed down the chain">
          {/* where each step starts: x = 1, u = 1, g = 1 */}
          {ROWS.map((r, i) => (
            <line
              key={r.name}
              x1={px(1)}
              y1={r.y + 23}
              x2={px(1)}
              y2={(i < 2 ? ROWS[i + 1].y : PRED_Y) - 6}
              stroke={C.guide}
              strokeWidth={1}
              strokeDasharray="3 4"
            />
          ))}
          {!zero && (
            <polyline
              points={`${px(x1)},${ROWS[0].y} ${px(u1)},${ROWS[1].y} ${px(g1)},${ROWS[2].y}`}
              fill="none"
              stroke={C.guide}
              strokeWidth={1.2}
              strokeDasharray="4 3"
            />
          )}
          {ROWS.map(r => (
            <g key={r.name}>
              <line x1={8} y1={r.y} x2={W - 8} y2={r.y} stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.2} />
              {TICKS.map(t => (
                <g key={t}>
                  <line x1={px(t)} y1={r.y - 4} x2={px(t)} y2={r.y + 4} stroke="currentColor" strokeOpacity={0.45} />
                  <text x={px(t)} y={r.y + 18} fontSize={13} textAnchor="middle" fill="currentColor" fillOpacity={0.65}>
                    {t}
                  </text>
                </g>
              ))}
              <text x={8} y={r.y - 11} fontSize={15} fontWeight={700} fontStyle="italic" fill={r.color}>
                {r.name}
              </text>
            </g>
          ))}
          {!zero && (
            <>
              <Arrow from={px(1)} to={px(x1)} y={ROWS[0].y} color={C.f} />
              <Arrow from={px(1)} to={px(u1)} y={ROWS[1].y} color={C.violet} />
              <Arrow from={px(1)} to={px(g1)} y={ROWS[2].y} color={C.g} />
              <Arrow from={px(1)} to={px(1 + slope * h)} y={PRED_Y} color={predColor} dashed />
              <text
                x={px(1) + (slope * h > 0 ? -6 : 6)}
                y={PRED_Y + 18}
                fontSize={13}
                fontWeight={600}
                textAnchor={slope * h > 0 ? 'end' : 'start'}
                fill={predColor}
              >
                {slip ? '+9Δx (sign slip)' : '−9Δx, from g′(1) = −9'}
              </text>
              <text x={sideX} y={(ROWS[0].y + ROWS[1].y) / 2 + 5} fontSize={14} fontWeight={700} textAnchor={sideAnchor} fill={C.violet}>
                {r1 < 0 ? `× (${f2(r1)})` : `× ${f2(r1)}`}
              </text>
              <text x={sideX} y={(ROWS[1].y + ROWS[2].y) / 2 + 5} fontSize={14} fontWeight={700} textAnchor={sideAnchor} fill={C.g}>
                {r2 < 0 ? `× (${f2(r2)})` : `× ${f2(r2)}`}
              </text>
            </>
          )}
          <circle cx={px(1)} cy={ROWS[0].y} r={4.5} fill="currentColor" />
          <circle cx={px(1)} cy={ROWS[1].y} r={4.5} fill="currentColor" />
          <circle cx={px(1)} cy={ROWS[2].y} r={4.5} fill="currentColor" />
        </svg>
      </div>
      <Controls>
        <Slider label="\Delta x" value={h} onChange={setH} min={-0.1} max={0.1} step={0.005} format={v => v.toFixed(3)} />
        <div className="flex flex-wrap items-center gap-2">
          <Toggle label="Sign slip: g′(1) = +9" checked={slip} onChange={setSlip} />
        </div>
        <Readouts>
          <Readout color={C.violet} tex={`\\tfrac{\\Delta u}{\\Delta x} ${zero ? '\\to' : '='} ${r1.toFixed(3)}`} />
          <Readout color={C.g} tex={`\\tfrac{\\Delta g}{\\Delta u} ${zero ? '\\to' : '='} ${r2.toFixed(3)}`} />
          <Readout
            tex={`\\tfrac{\\Delta g}{\\Delta x} = ${r1.toFixed(2)}\\times ${r2.toFixed(2)} ${zero ? '\\to' : '='} ${(r1 * r2).toFixed(2)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
