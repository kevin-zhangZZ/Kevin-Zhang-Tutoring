// 2022 Methods Exam 1 Q7c — a row of five tiles (tap any tile to switch it between Type A,
// f(x) = 4 sin(πx/10) + 10, and Type B, g(x) = −x³/100 + 3x²/10 − 2x + 10). Every join puts the
// right end (x = 20) of one tile against the left end (x = 0) of the next, so the four kinds of
// join (AA, AB, BA, BB) compare f(20) or g(20) with f(0) or g(0) — which is why both ends of both
// curves are needed (the report: some found only f(20) and g(20)). A toggle draws the gradients
// at the joins: at a mixed join they differ (f′(20) = 2π/5, g′(0) = −2), a corner, yet the
// colours still meet at height 10 — Condition 2 asks for no gap, not for matching derivatives.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, M, Notice, Readout, Readouts, Toggle } from './kit'

type TileType = 'A' | 'B'

const f = (x: number) => 4 * Math.sin((Math.PI * x) / 10) + 10
const g = (x: number) => -(x ** 3) / 100 + (3 * x ** 2) / 10 - 2 * x + 10
const df = (x: number) => ((2 * Math.PI) / 5) * Math.cos((Math.PI * x) / 10)
const dg = (x: number) => -(3 * x ** 2) / 100 + (3 * x) / 5 - 2

const N = 5
const S = 70 // one tile (20 cm) in svg units
const MARGIN = 20
const TOP = 28
const W = MARGIN * 2 + N * S
const H = TOP + S + 30
const K = S / 20
const sx = (i: number, x: number) => MARGIN + i * S + x * K
const sy = (y: number) => TOP + S - y * K

const colour = (t: TileType) => (t === 'A' ? C.f : C.g)
const rule = (t: TileType) => (t === 'A' ? f : g)
const slope = (t: TileType) => (t === 'A' ? df : dg)
const fn = (t: TileType) => (t === 'A' ? 'f' : 'g')
const gradTex = (t: TileType) => (t === 'A' ? '\\approx 1.26' : '= -2')
const gradExact = (t: TileType) => (t === 'A' ? '\\tfrac{2\\pi}{5}' : '-2')

function curve(t: TileType, i: number): string[] {
  const r = rule(t)
  const pts: string[] = []
  for (let j = 0; j <= 80; j++) {
    const x = (20 * j) / 80
    pts.push(`${sx(i, x).toFixed(2)},${sy(r(x)).toFixed(2)}`)
  }
  return pts
}

export default function TileJoins() {
  const [types, setTypes] = useState<TileType[]>(['A', 'A', 'B', 'B', 'A'])
  const [grad, setGrad] = useState(false)

  const flip = (i: number) => setTypes(ts => ts.map((t, j) => (j === i ? (t === 'A' ? 'B' : 'A') : t)))
  const shuffle = () =>
    setTypes(ts => {
      let next = ts
      while (next.join('') === ts.join('')) next = ts.map((): TileType => (Math.random() < 0.5 ? 'A' : 'B'))
      return next
    })

  const joins = types.slice(0, -1).map((t, i) => [t, types[i + 1]] as const)
  const mixed = joins.some(([l, r]) => l !== r)
  const only = types[0]
  const other: TileType = only === 'A' ? 'B' : 'A'

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[460px] mx-auto block select-none"
        role="img"
        aria-label="A row of five tiles; each join meets at height 10"
      >
        {types.map((t, i) => {
          const pts = curve(t, i)
          return (
            <g
              key={i}
              onClick={() => flip(i)}
              style={{ cursor: 'pointer' }}
              role="button"
              aria-label={`Tile ${i + 1}, Type ${t}: tap to switch`}
            >
              <rect x={sx(i, 0)} y={TOP} width={S} height={S} className="fill-white dark:fill-gray-900" />
              <path
                d={`M${sx(i, 0)},${sy(0)} L${pts.join(' L')} L${sx(i, 20)},${sy(0)} Z`}
                fill={colour(t)}
                fillOpacity={0.3}
              />
              <polyline points={pts.join(' ')} fill="none" stroke={colour(t)} strokeWidth={2.5} />
              <rect
                x={sx(i, 0)}
                y={TOP}
                width={S}
                height={S}
                fill="none"
                className="stroke-gray-400 dark:stroke-gray-500"
                strokeWidth={1.2}
              />
              <text x={sx(i, 10)} y={TOP - 9} textAnchor="middle" fontSize={12.5} fontWeight={700} fill={colour(t)}>
                Type {t}
              </text>
            </g>
          )
        })}

        {/* height 10 guide */}
        <line x1={sx(0, 0)} x2={sx(N - 1, 20)} y1={sy(10)} y2={sy(10)} stroke={C.guide} strokeWidth={1} strokeDasharray="4 3" />
        <text x={MARGIN - 4} y={sy(10) + 3.5} textAnchor="end" fontSize={10} className="fill-gray-500 dark:fill-gray-400">
          10
        </text>

        {joins.map(([l, r], i) => {
          const X = sx(i + 1, 0)
          const dx = 3.5
          const mL = slope(l)(20)
          const mR = slope(r)(0)
          return (
            <g key={i}>
              {grad && (
                <>
                  <line
                    x1={X - dx * K}
                    y1={sy(10 - mL * dx)}
                    x2={X + dx * K}
                    y2={sy(10 + mL * dx)}
                    stroke={colour(l)}
                    strokeWidth={2}
                    strokeDasharray="3 2"
                  />
                  <line
                    x1={X - dx * K}
                    y1={sy(10 - mR * dx)}
                    x2={X + dx * K}
                    y2={sy(10 + mR * dx)}
                    stroke={colour(r)}
                    strokeWidth={2}
                    strokeDasharray="3 2"
                  />
                </>
              )}
              <circle cx={X} cy={sy(10)} r={4} fill={C.good} />
              <circle cx={X} cy={TOP + S + 15} r={8} fill="none" stroke={C.good} strokeWidth={1.3} />
              <text x={X} y={TOP + S + 19} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={C.good}>
                {i + 1}
              </text>
            </g>
          )
        })}
      </svg>

      <Controls>
        <Buttons>
          <ActionButton label="Try a random order" onClick={shuffle} />
          <Toggle label="Show gradients at the joins" checked={grad} onChange={setGrad} />
        </Buttons>
        <Readouts>
          {joins.map(([l, r], i) =>
            grad ? (
              <Readout
                key={i}
                color={C.good}
                tex={`\\text{Join ${i + 1} (${l}${r}): } ${fn(l)}'(20) ${gradTex(l)},\\ ${fn(r)}'(0) ${gradTex(r)}`}
              />
            ) : (
              <Readout key={i} color={C.good} tex={`\\text{Join ${i + 1} (${l}${r}): } ${fn(l)}(20) = 10 = ${fn(r)}(0)`} />
            ),
          )}
        </Readouts>
        {!grad && !mixed && (
          <Notice>
            Every tile is Type {only}, so every join only compares <M>{`${fn(only)}(20)`}</M> with{' '}
            <M>{`${fn(only)}(0)`}</M>. That shows Type {only} tiles line up with each other, nothing more. Tap a
            tile to switch it to Type {other}: the new joins compare <M>f</M> with <M>g</M>, which is why all four
            endpoints are needed.
          </Notice>
        )}
        {!grad && mixed && (
          <Notice tone="good">
            Each readout pairs where one tile finishes (<M>x = 20</M>) with where the next one starts (
            <M>x = 0</M>), and every value is 10, so every join lands on the dashed line. Tap tiles or try a random
            order: it stays that way. Then show the gradients at the joins.
          </Notice>
        )}
        {grad && mixed && (
          <Notice>
            Where an A tile meets a B tile the gradients differ: Type A meets each edge with gradient{' '}
            <M>{"\\tfrac{2\\pi}{5} \\approx 1.26"}</M>, Type B with <M>-2</M>, so the boundary has a corner there.
            But the two colours still meet at height 10 with no gap, so the pattern is continuous. Condition 2 asks
            only for that; trying to show the derivatives are equal would fail here, and isn't needed.
          </Notice>
        )}
        {grad && !mixed && (
          <Notice>
            With only Type {only} tiles the gradients happen to match at every join (
            <M>{`${fn(only)}'(20) = ${fn(only)}'(0) = ${gradExact(only)}`}</M>), so the
            boundary looks smooth. Tap a tile to switch it to Type {other} and see a join with a corner that still
            meets Condition 2.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
