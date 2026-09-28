// 2019 Specialist Exam 2 Q2c — the roots of 2z² + 4z + d = 0 are z = −1 ± √((2 − d)/2). Slide d:
// for d < 2 the two roots are REAL and slide along the real axis towards −1; at d = 2 they meet
// (double root at the centre −1); for d > 2 they split into a conjugate pair moving up and down
// the line Re(z) = −1. They are inside the disc |z + 1| ≤ √6/2 exactly for −1 ≤ d ≤ 5 — two end
// points, one from each regime. A number line of d shows the interval; the toggle shows the
// "roots must be non-real" slip, which finds only the end point d = 5.

import { useState } from 'react'
import { Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, PlayButton, Point, Readout, Readouts, Slider, Toggle, num, tick, usePlayer } from './kit'

/** Tick numbers only inside the requested range (the padding beyond it would put a tick under the axis names). */
const inRange = (lo: number, hi: number) => (v: number) => (v < lo - 1e-9 || v > hi + 1e-9 ? '' : tick(v))

const K = Math.sqrt(6) / 2
const D_MIN = -3
const D_MAX = 7
const T_MAX = Math.sqrt((D_MAX - 2) / 2) // how far the roots travel from −1 at either end of the slider

/** Distance t of each root from −1, and whether the roots are real. */
function roots(d: number) {
  const s = (2 - d) / 2
  return { real: s >= 0, t: Math.sqrt(Math.abs(s)) }
}

/** The d number line under the plane (plain SVG, dark-mode aware). */
function DLine({ d, onlyComplex }: { d: number; onlyComplex: boolean }) {
  const X0 = 24
  const X1 = 346
  const X = (v: number) => X0 + ((v - D_MIN) / (D_MAX - D_MIN)) * (X1 - X0)
  const Y = 30
  const inside = roots(d).t <= K + 0.006
  return (
    <svg viewBox="0 0 370 62" className="w-full max-w-[520px] mx-auto block" role="img" aria-label="Number line of d">
      <line x1={X0 - 8} y1={Y} x2={X1 + 8} y2={Y} className="stroke-gray-400 dark:stroke-gray-500" strokeWidth={1.5} />
      {Array.from({ length: D_MAX - D_MIN + 1 }, (_, i) => D_MIN + i).map(v => (
        <g key={v}>
          <line x1={X(v)} y1={Y - 4} x2={X(v)} y2={Y + 4} className="stroke-gray-400 dark:stroke-gray-500" strokeWidth={1} />
          <text x={X(v)} y={Y + 17} textAnchor="middle" fontSize={11} className="fill-gray-600 dark:fill-gray-300">
            {v < 0 ? `−${-v}` : v}
          </text>
        </g>
      ))}
      {onlyComplex ? (
        <>
          <line x1={X(-1)} y1={Y} x2={X(2)} y2={Y} stroke={C.bad} strokeWidth={5} strokeDasharray="5 4" strokeLinecap="round" />
          <line x1={X(2)} y1={Y} x2={X(5)} y2={Y} stroke={C.good} strokeWidth={5} strokeLinecap="round" />
          <circle cx={X(2)} cy={Y} r={4.5} className="fill-white dark:fill-gray-900" stroke={C.good} strokeWidth={2} />
          <circle cx={X(5)} cy={Y} r={4.5} fill={C.good} />
        </>
      ) : (
        <>
          <line x1={X(-1)} y1={Y} x2={X(5)} y2={Y} stroke={C.good} strokeWidth={5} strokeLinecap="round" />
          <circle cx={X(-1)} cy={Y} r={4.5} fill={C.good} />
          <circle cx={X(5)} cy={Y} r={4.5} fill={C.good} />
        </>
      )}
      {onlyComplex ? (
        <text x={X(-0.5)} y={10} textAnchor="middle" fontSize={10.5} fill={C.bad} fontWeight={600}>
          ← real roots: missed
        </text>
      ) : (
        <text x={X(-0.5)} y={10} textAnchor="middle" fontSize={10.5} className="fill-gray-500 dark:fill-gray-400">
          ← real roots
        </text>
      )}
      <text x={X(4.5)} y={10} textAnchor="middle" fontSize={10.5} className="fill-gray-500 dark:fill-gray-400">
        non-real roots →
      </text>
      <line x1={X(2)} y1={2} x2={X(2)} y2={Y - 6} className="stroke-gray-400 dark:stroke-gray-500" strokeWidth={1} strokeDasharray="2 2" />
      <path d={`M ${X(d)} ${Y - 7} l -5 -8 h 10 z`} fill={inside ? C.good : C.bad} />
      <text x={X1 + 12} y={Y + 4} fontSize={12} fontStyle="italic" fontWeight={600} className="fill-gray-700 dark:fill-gray-200">
        d
      </text>
    </svg>
  )
}

export default function RootsVsD() {
  const [d, setD] = useState(0)
  const [onlyComplex, setOnlyComplex] = useState(false)
  const player = usePlayer(setD, { min: D_MIN, max: D_MAX, seconds: 9 })

  const { real, t } = roots(d)
  const inside = t <= K + 0.006
  const col = inside ? C.good : C.bad
  const near = (v: number) => Math.abs(d - v) < 0.03
  const z1: [number, number] = real ? [-1 - t, 0] : [-1, t]
  const z2: [number, number] = real ? [-1 + t, 0] : [-1, -t]

  let notice
  if (near(2)) {
    notice = (
      <Notice tone="good">
        At <M>d=2</M> the discriminant <M>16-8d</M> is <M>0</M>: a <b>double root</b> <M>z=-1</M>, right at the centre
        of the circle. This is the switch-over: below <M>d=2</M> the roots move along the real axis, above it they move
        up and down the line <M>{'\\operatorname{Re}(z)=-1'}</M>.
      </Notice>
    )
  } else if (near(-1) || near(5)) {
    notice = (
      <Notice tone="good">
        {near(5) ? (
          <>
            <M>d=5</M> is the original equation: the roots are exactly <M>{'-1\\pm\\tfrac{\\sqrt6}{2}i'}</M>, on the
            circle. This is the <b>right</b> end point; the non-real case finds it.
          </>
        ) : (
          <>
            At <M>d=-1</M> the <b>real</b> roots <M>{'-1\\pm\\tfrac{\\sqrt6}{2}'}</M> sit exactly on the circle where it
            crosses the real axis. This is the <b>left</b> end point: the one you only find by checking real roots too.
          </>
        )}{' '}
        Both end points are included because the relation is <M>\le</M>.
      </Notice>
    )
  } else if (!inside) {
    notice = (
      <Notice tone="warn">
        {real ? 'Real' : 'Non-real'} roots, but they are <M>{num(t, 2)}</M> from <M>-1</M>, more than{' '}
        <M>{'\\tfrac{\\sqrt6}{2}\\approx1.22'}</M>, so they are <b>outside</b> the disc. Slide <M>d</M> towards{' '}
        <M>2</M> to bring them in; they enter at <M>{d < 2 ? 'd=-1' : 'd=5'}</M>.
      </Notice>
    )
  } else if (real) {
    notice = onlyComplex ? (
      <Notice tone="warn">
        The &ldquo;roots must be non-real&rdquo; method throws this value of <M>d</M> away. But look: both roots are
        real numbers inside the disc, so <M>{'|z+1|\\le\\tfrac{\\sqrt6}{2}'}</M> holds. Nothing in the question says
        the roots are non-real; <M>{'d\\in R'}</M> is all it asks.
      </Notice>
    ) : (
      <Notice tone="good">
        For <M>d</M> below <M>2</M> the roots are <b>real</b>: two points on the real axis, each <M>{num(t, 2)}</M> from{' '}
        <M>-1</M>. They are inside the disc, so this <M>d</M> counts. Slide <M>d</M> down to find where they leave the
        circle, then press play to watch the whole journey.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        For <M>d</M> above <M>2</M> the roots are a conjugate pair <M>{'-1\\pm ti'}</M>, straight above and below the
        centre, each <M>{num(t, 2)}</M> from <M>-1</M>. Still inside the disc, so this <M>d</M> counts. Slide{' '}
        <M>d</M> up to find where they leave.
      </Notice>
    )
  }

  const zTex = near(2) ? 'z=-1\\ (\\text{double})' : `z=-1\\pm${num(t, 3)}${real ? '' : 'i'}`

  return (
    <div>
      <Plane x={[-3.4, 1.4]} y={[-1.8, 1.8]} equalScale height={320} xLabel="" yLabel="Im" xLabels={inRange(-3.4, 1.4)} yLabels={inRange(-1.8, 1.8)}>
        <Label at={[1.4, 0]} attach="n" size={14} italic>Re</Label>
        <Circle center={[-1, 0]} radius={K} color={C.f} fillOpacity={0.12} weight={2.5} />
        {/* The two tracks the roots travel along. */}
        <Line.Segment point1={[-1 - T_MAX, 0]} point2={[-1 + T_MAX, 0]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[-1, -T_MAX]} point2={[-1, T_MAX]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={-1} y={0} color={C.guide} />
        <Point x={z1[0]} y={z1[1]} color={col} />
        <Point x={z2[0]} y={z2[1]} color={col} />
        <Label at={[-1 + K * Math.cos(2.3), K * Math.sin(2.3)]} attach="nw" color={C.f}>|z + 1| = √6/2</Label>
      </Plane>
      <DLine d={d} onlyComplex={onlyComplex} />
      <Controls>
        <Slider
          label="d"
          value={d}
          onChange={v => {
            player.stop()
            setD(v)
          }}
          min={D_MIN}
          max={D_MAX}
          step={0.05}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(d)} label="Sweep d from −3 to 7" />
          <Toggle label="Common slip: roots must be non-real" checked={onlyComplex} onChange={setOnlyComplex} />
        </Buttons>
        <div className="[&_.katex]:pointer-events-none">
        <Readouts>
          <Readout tex={`16-8d=${num(16 - 8 * d, 2)}`} />
          <Readout color={col} tex={zTex} />
          <Readout color={col} tex={`|z+1|=${num(t, 3)}${inside ? '\\le' : '>'}\\tfrac{\\sqrt6}{2}`} />
        </Readouts>
        </div>
        {notice}
      </Controls>
    </div>
  )
}
