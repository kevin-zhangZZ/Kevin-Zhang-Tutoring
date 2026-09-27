// 2017 Specialist Exam 2 MCQ 10 — why x = −a is NOT a point of inflection even though f″(−a) = 0.
// The curve is one function that satisfies every condition in the question: a = 3, b = −1 and
// f″(x) = (x + a)²(x − b)/g(x) with g(x) = −e^{1.729x}/0.0909 ≈ −11e^{1.73x} < 0, the two
// constants of integration and the exponent fitted (sympy) so that f(a) = 1, f(−a) = −1,
// f(b) = −1 and f(−b) = 1. Drag P along it: the tangent, the concavity shading and the sign table
// show f″ keeping its sign through −a (a squared factor touches zero without crossing) and
// changing sign only at b — the idea 83% of students missed (options A, C and D all include −a).

import { useState } from 'react'
import { C, Controls, Katex, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Region, clamp, num } from './kit'

// f(x) = e^{cx}(q₃x³ + q₂x² + q₁x + q₀) + C₁x + C₂, the closed form of ∬ −k(x + 3)²(x + 1)e^{cx}.
const A = 3
const B = -1
const c = -1.7290836901031864
const q = (x: number) => ((-0.030410672526482138 * x - 0.31840114125436199) * x - 1.1317075689903847) * x - 1.3697252828043172
const dq = (x: number) => (3 * -0.030410672526482138 * x + 2 * -0.31840114125436199) * x - 1.1317075689903847
const C1 = -0.22927273293549762
const C2 = 1.7350399039438822
const k = 0.090919712361325124
const f = (x: number) => Math.exp(c * x) * q(x) + C1 * x + C2
const fp = (x: number) => Math.exp(c * x) * (c * q(x) + dq(x)) + C1
const fpp = (x: number) => -k * (x + A) ** 2 * (x - B) * Math.exp(c * x)

const X0 = -4.5
const X1 = 4.5
const Y = 2.6
// P may go anywhere the curve is on screen (it leaves the top just left of x ≈ −3.74).
const P_MIN = -3.7
const SAMPLES = Array.from({ length: 1601 }, (_, i) => P_MIN + ((X1 - 0.1 - P_MIN) * i) / 1600)
function nearestOnF([mx, my]: [number, number]): number {
  let best = SAMPLES[0]
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = (x - mx) ** 2 + (f(x) - my) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

type Col = 0 | 1 | 2 | 3 | 4
const NEAR = 0.07
function column(x: number): Col {
  if (Math.abs(x + A) < NEAR) return 1
  if (Math.abs(x - B) < NEAR) return 3
  if (x < -A) return 0
  if (x < B) return 2
  return 4
}

const MINUS = '−'
const HEADS = ['x<-a', '-a', '-a<x<b', 'b', 'x>b']
const ROWS: { tex: string; vals: string[] }[] = [
  { tex: '(x+a)^2', vals: ['+', '0', '+', '+', '+'] },
  { tex: 'x-b', vals: [MINUS, MINUS, MINUS, '0', '+'] },
  { tex: 'g(x)', vals: [MINUS, MINUS, MINUS, MINUS, MINUS] },
  { tex: "f''(x)", vals: ['+', '0', '+', '0', MINUS] },
]
const SHAPE = ['∪', '∪', '∪', '∪ → ∩', '∩']

function SignTable({ col }: { col: Col }) {
  const cell = (i: number) =>
    `px-1 py-1 text-center ${i === col ? 'bg-emerald-100 dark:bg-emerald-900/50 font-semibold text-gray-900 dark:text-white' : ''}`
  return (
    <table className="w-full table-fixed border-collapse text-[12px] text-gray-700 dark:text-gray-300">
      <thead>
        <tr className="border-b border-gray-200 dark:border-gray-700">
          <th className="w-[4.2rem] px-1 py-1 text-left font-normal text-gray-500 dark:text-gray-400">sign of</th>
          {HEADS.map((h, i) => (
            <th key={h} className={`${cell(i)} font-normal`}>
              <Katex tex={h} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ROWS.map(r => (
          <tr key={r.tex} className={r.tex === "f''(x)" ? 'border-t border-gray-200 dark:border-gray-700' : ''}>
            <td className="px-1 py-1">
              <Katex tex={r.tex} />
            </td>
            {r.vals.map((v, i) => (
              <td key={i} className={cell(i)}>
                {v}
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td className="px-1 py-1 text-gray-500 dark:text-gray-400">shape</td>
          {SHAPE.map((s, i) => (
            <td key={i} className={cell(i)}>
              {s}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

function Jump({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[12.5px] font-semibold px-3 py-1.5 rounded-full border bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
    >
      {children}
    </button>
  )
}

export default function SquaredFactor() {
  const [x, setX] = useState(-A)
  const y = f(x)
  const slope = fp(x)
  const col = column(x)

  let notice
  if (col === 1) {
    notice = (
      <Notice tone="warn">
        <b>At <M>x = -a</M>, <M>f''</M> is zero, because the factor <M>(x + a)^2</M> is zero.</b> But look at the tangent: it stays
        <b> under</b> the curve on both sides, and the shading doesn&apos;t change. <M>(x + a)^2</M> is a square, so it is
        positive on <i>both</i> sides of <M>-a</M>: <M>f''</M> is + on the left and + on the right. The curve straightens for an
        instant and keeps bending the same way. No change of concavity, so <M>(-a, -1)</M> is <b>not</b> a point of
        inflection. Now press &ldquo;Go to b&rdquo;.
      </Notice>
    )
  } else if (col === 3) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = b</M> the factor <M>x - b</M> changes from − to +</b>, so <M>f''</M> changes from + to −. Here the tangent
        <b> cuts through</b> the curve: it is under the curve on the left and above it on the right. Concave up has become
        concave down, so <M>(b, -1)</M> is a point of inflection of <M>f</M>. The question asks about <M>|f(x)|</M>, though:
        see the next diagram.
      </Notice>
    )
  } else if (col === 0) {
    notice = (
      <Notice>
        Left of <M>-a</M>, <M>f''</M> is positive (read down the first column: + times − divided by − is +). The curve is
        <b> concave up</b> and the tangent sits under it. Drag P to the right, through <M>x = -a</M>, and watch whether
        anything changes.
      </Notice>
    )
  } else if (col === 2) {
    notice = (
      <Notice>
        Between <M>-a</M> and <M>b</M>, <M>f''</M> is still positive: <b>concave up</b>, exactly as it was left of <M>-a</M>.
        Passing through <M>-a</M> changed nothing. Keep going to <M>x = b</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Right of <M>b</M>, <M>f''</M> is negative: <b>concave down</b>, and the tangent sits above the curve. Nothing else changes
        sign out here, so <M>f</M> has exactly one point of inflection, at <M>x = b</M>. The points <M>(-b, 1)</M> and{' '}
        <M>(a, 1)</M> aren&apos;t needed for this question: <M>f''</M> is not zero at either.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[-Y, Y]} xStep={1} yStep={1} height={320} labels={false}>
        <Region top={() => Y} bottom={() => -Y} from={X0} to={B} color={C.good} opacity={0.08} />
        <Region top={() => Y} bottom={() => -Y} from={B} to={X1} color={C.g} opacity={0.08} />
        <Label at={[-2.3, 2.2]} color={C.good} attach="s" size={12}>concave up</Label>
        <Label at={[2.4, 2.2]} color={C.g} attach="s" size={12}>concave down</Label>
        <Line.Segment point1={[-A, 0]} point2={[-A, -1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[B, 0]} point2={[B, -1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[-B, 0]} point2={[-B, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[A, 0]} point2={[A, 1]} color={C.guide} style="dashed" weight={1.5} />
        {/* mafs's Text puts attach 'n' BELOW the anchor and 's' above it: each letter goes on the
            side of the axis away from its point. */}
        <Label at={[-A, 0]} attach="n" size={12}>−a</Label>
        <Label at={[B, 0]} attach="n" size={12}>b</Label>
        <Label at={[-B, 0]} attach="s" size={12}>−b</Label>
        <Label at={[A, 0]} attach="s" size={12}>a</Label>
        <Label at={[0, 1]} attach="w" size={12}>1</Label>
        <Label at={[0, -1]} attach="e" size={12}>−1</Label>
        <Plot.OfX y={f} domain={[-3.8, X1]} color={C.f} weight={3} />
        <Line.PointSlope point={[x, y]} slope={slope} color={C.g} weight={2} />
        <Point x={-A} y={-1} color={C.ink} />
        <Point x={B} y={-1} color={C.ink} />
        <Point x={-B} y={1} color={C.ink} />
        <Point x={A} y={1} color={C.ink} />
        <Label at={[x, y]} color={C.f} attach={x < -2.2 ? 'e' : 'sw'}>P</Label>
        <MovablePoint point={[x, y]} onMove={p => setX(clamp(nearestOnF(p), P_MIN, X1 - 0.1))} color={C.f} />
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          <Jump onClick={() => setX(-A)}>Go to −a</Jump>
          <Jump onClick={() => setX(B)}>Go to b</Jump>
          <span className="text-[12px] text-gray-500 dark:text-gray-400">or drag P along the curve.</span>
        </div>
        <Readouts>
          <Readout color={C.f} tex={`x = ${num(x)}`} />
          <Readout color={C.g} tex={`\\text{tangent gradient} = ${num(slope)}`} />
          <Readout tex={`f''(x) ${col === 1 || col === 3 ? '= 0' : fpp(x) > 0 ? '> 0' : '< 0'}`} />
        </Readouts>
        <SignTable col={col} />
        {notice}
        <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
          The curve is one function that fits every condition in the question, with <M>a = 3</M>, <M>b = -1</M> and{' '}
          <M>{'g(x) \\approx -11e^{1.73x}'}</M>. Any other <M>f</M> that fits gives the same conclusions (no inflection
          at <M>-a</M>, one at <M>b</M>), because the argument uses only signs.
        </p>
      </Controls>
    </div>
  )
}
