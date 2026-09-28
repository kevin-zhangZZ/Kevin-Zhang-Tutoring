// 2020 Specialist Exam 1 Q3 — the general solution θ = −π/12 + 2kπ/3 is an endless ladder of
// angles a third of a turn apart, but it gives only three points: every third rung is the same
// point again (three thirds of a turn is a full turn). Slide k and watch the point move on the
// circle and its rung light up on the number line of arguments below. The principal range
// (−π, π] is 2π wide, so it holds exactly one rung of each colour: k = −1, 0, 1. The default,
// k = 2, is the one taken by working through k = 0, 1, 2 mechanically: 5π/4 names the right point,
// but it is outside (−π, π]. The report notes some students didn't give principal values.

import { useState } from 'react'
import { C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Polyline, Readout, Readouts, Slider } from './kit'
import { piFrac, principal, spiral } from './spec-2020e1-q3-triple'

const PI = Math.PI
const U = PI / 12
/** θ_k in units of π/12: −π/12 + 2kπ/3 = (−1 + 8k)π/12. */
const nOf = (k: number) => -1 + 8 * k
/** Rungs a whole number of turns apart share a colour: k ≡ 0, 1, 2 (mod 3). */
const FAMILY = [C.f, C.g, C.violet]
const fam = (k: number) => ((k % 3) + 3) % 3
const inWindow = (n: number) => n > -12 && n <= 12
const at = (a: number, r = 1): [number, number] => [r * Math.cos(a), r * Math.sin(a)]
const K = [-2, -1, 0, 1, 2, 3]

// The number line of arguments θ (radians), with the principal range shaded.
const U0 = -5.2
const U1 = 6.6
const X = (u: number) => 18 + ((u - U0) / (U1 - U0)) * 304
const Y = 34

function ArgumentLine({ k }: { k: number }) {
  const ticks: [number, string][] = [[-PI, '−π'], [0, '0'], [PI, 'π'], [2 * PI, '2π']]
  return (
    <div className="text-gray-700 dark:text-gray-300">
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">
        Every value of <M>\theta</M> on a number line. Shaded: the principal range <M>{'(-\\pi, \\pi]'}</M>. Filled dots
        are inside it; dots of the same colour are the same point on the circle.
      </p>
      <svg
        viewBox="0 0 340 80"
        className="w-full max-w-[520px] block"
        role="img"
        aria-label="Number line of the arguments −17π/12, −3π/4, −π/12, 7π/12, 5π/4 and 23π/12 for k = −2 to 3, with the principal range from −π to π shaded; only −3π/4, −π/12 and 7π/12 lie inside it"
      >
        <rect x={X(-PI)} y={Y - 10} width={X(PI) - X(-PI)} height={20} fill={C.good} opacity={0.14} />
        <line x1={X(U0)} y1={Y} x2={X(U1)} y2={Y} stroke="currentColor" strokeOpacity={0.55} strokeWidth={1.2} />
        {ticks.map(([u, t]) => (
          <g key={t}>
            <line x1={X(u)} y1={Y - 5} x2={X(u)} y2={Y + 5} stroke="currentColor" strokeWidth={1} />
            <text x={X(u)} y={Y + 19} fontSize={11} textAnchor="middle" fill="currentColor">{t}</text>
          </g>
        ))}
        {/* −π is not a principal argument (open end), π is (closed end). */}
        <circle cx={X(-PI)} cy={Y} r={3.4} stroke={C.good} strokeWidth={1.6} className="fill-white dark:fill-gray-900" />
        <circle cx={X(PI)} cy={Y} r={3.4} fill={C.good} />
        {K.map(j => {
          const n = nOf(j)
          const x = X(n * U)
          const colour = FAMILY[fam(j)]
          const cur = j === k
          const inside = inWindow(n)
          return (
            <g key={j}>
              {cur && <line x1={x} y1={Y - 12} x2={x} y2={Y + 12} stroke={colour} strokeWidth={2} />}
              <circle
                cx={x}
                cy={Y}
                r={cur ? 6 : 4.2}
                fill={inside ? colour : undefined}
                stroke={colour}
                strokeWidth={2}
                className={inside ? undefined : 'fill-white dark:fill-gray-900'}
              />
              <text x={x} y={Y - 17} fontSize={11} fontWeight={cur ? 700 : 500} textAnchor="middle" fill={colour}>
                {piFrac(n, false)}
              </text>
              <text x={x} y={Y + 38} fontSize={10} fontWeight={cur ? 700 : 400} textAnchor="middle" fill="currentColor" opacity={cur ? 1 : 0.7}>
                {`k = ${j}`.replace('-', '−')}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function Principal() {
  const [k, setK] = useState(2)
  const n = nOf(k)
  const a = n * U
  const colour = FAMILY[fam(k)]
  const inside = inWindow(n)
  const same = principal(n)

  let notice
  if (k === 0) {
    notice = (
      <Notice tone="good">
        <b>
          <M>k = 0</M>: <M>{'\\theta = -\\tfrac{\\pi}{12}'}</M>
        </b>
        , the argument <M>{'-\\tfrac{\\pi}{4}'}</M> divided by 3. It is inside <M>{'(-\\pi, \\pi]'}</M>, so it is a
        principal value. Each step of <M>k</M> adds <M>{'\\tfrac{2\\pi}{3}'}</M>, a third of a turn. Slide <M>k</M> up
        and down to find the others.
      </Notice>
    )
  } else if (k === 1) {
    notice = (
      <Notice tone="good">
        <b>
          <M>k = 1</M>: <M>{'\\theta = -\\tfrac{\\pi}{12} + \\tfrac{8\\pi}{12} = \\tfrac{7\\pi}{12}'}</M>
        </b>
        . Still inside <M>{'(-\\pi, \\pi]'}</M>, so this is a principal value: the second cube root.
      </Notice>
    )
  } else if (k === 2) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>k = 2</M>: <M>{'\\theta = -\\tfrac{\\pi}{12} + \\tfrac{16\\pi}{12} = \\tfrac{5\\pi}{4}'}</M>
        </b>
        . The point is a genuine cube root, but <M>{'\\tfrac{5\\pi}{4} > \\pi'}</M>: its rung is outside the shaded range,
        so it is not a principal value. It is the same point as <M>{'-\\tfrac{3\\pi}{4}'}</M> (<M>k = -1</M>, the violet
        dot inside the range): subtract <M>2\pi</M>. Working through <M>k = 0, 1, 2</M> without checking lands here, and
        the report notes some students didn&apos;t give principal values.
      </Notice>
    )
  } else if (k === 3) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>k = 3</M>: <M>{'\\theta = -\\tfrac{\\pi}{12} + 2\\pi = \\tfrac{23\\pi}{12}'}</M>
        </b>
        . Three thirds of a turn is a full turn, so this is the <M>k = 0</M> root again (and <M>{'\\tfrac{23\\pi}{12}'}</M>{' '}
        isn&apos;t a principal value either). Every third rung repeats a point, which is why there are exactly three cube
        roots, not infinitely many.
      </Notice>
    )
  } else if (k === -1) {
    notice = (
      <Notice tone="good">
        <b>
          <M>k = -1</M>: <M>{'\\theta = -\\tfrac{\\pi}{12} - \\tfrac{8\\pi}{12} = -\\tfrac{3\\pi}{4}'}</M>
        </b>
        , inside <M>{'(-\\pi, \\pi]'}</M>: the third principal value. So <M>k = -1, 0, 1</M> are the three rungs inside
        the range, one of each colour. That always works for cube roots: the range is <M>2\pi</M> wide, and rungs of the
        same colour are <M>2\pi</M> apart, so exactly one of each fits.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>
          <M>k = -2</M>: <M>{'\\theta = -\\tfrac{\\pi}{12} - \\tfrac{16\\pi}{12} = -\\tfrac{17\\pi}{12}'}</M>
        </b>
        , which is less than <M>-\pi</M>: outside the range. It is the <M>{'\\tfrac{7\\pi}{12}'}</M> point (<M>k = 1</M>)
        reached a full turn clockwise. Add <M>2\pi</M> to get its principal value.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-1.4, 1.4]}
        y={[-1.4, 1.4]}
        xStep={0.5}
        yStep={0.5}
        equalScale
        height={280}
        labels={false}
        xLabel="Re"
        yLabel="Im"
      >
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={1.5} />
        {[0, 1, 2].map(f => {
          const p = at(principal(nOf(f)) * U)
          return <Point key={f} x={p[0]} y={p[1]} color={FAMILY[f]} opacity={0.55} />
        })}
        {/* The turn from the k = 0 root: 2kπ/3, drawn as a spiral so more than a full turn shows. */}
        {k !== 0 && <Polyline points={spiral(-U, a, 0.28, 0.1)} color={colour} weight={2.5} />}
        <Line.Segment point1={[0, 0]} point2={at(-U)} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[0, 0]} point2={at(a)} color={colour} weight={2.5} />
        <Circle center={at(a)} radius={0.09} color={colour} fillOpacity={0} weight={2} />
        <Point x={at(a)[0]} y={at(a)[1]} color={colour} />
        <Label at={at(a, 1.3)} color={colour} attach="c">
          {`θ = ${piFrac(n, false)}`}
        </Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={v => setK(Math.round(v))} min={-2} max={3} step={1} format={v => String(v).replace('-', '−')} />
        <ArgumentLine k={k} />
        <Readouts>
          <Readout color={colour} tex={`\\theta = -\\tfrac{\\pi}{12} + \\tfrac{2k\\pi}{3} = ${piFrac(n, true)}`} />
          <Readout
            color={inside ? C.good : C.bad}
            tex={
              inside
                ? '-\\pi < \\theta \\le \\pi: \\text{ a principal value}'
                : `\\text{not principal; same point as } \\theta = ${piFrac(same, true)}`
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
