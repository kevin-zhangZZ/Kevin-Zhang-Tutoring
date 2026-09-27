// 2016 Specialist Exam 2 Q2f — rotate the ray Arg(z) = απ with a slider (or press play to sweep α
// from −1 to 1) and watch when it meets y = x + 2. It hits whenever it points above the dashed
// parallel line y = x, misses when it points below, never meets it at the parallel directions
// α = 1/4 and −3/4, and at α = −1 there is no ray at all, because the principal argument can't be
// −π. The number line underneath records every α tried, green for a hit and red for a miss, so the
// answer (−1, −3/4) ∪ (1/4, 1] builds up as the ray turns. The slider runs a little past ±1 to
// show why α is confined to (−1, 1]. Answers with multiples of π, and including α = −1, were the
// report's common errors; 85% of students scored zero.

import { useEffect, useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, PlayButton, Point, Polygon, Polyline, Readout, Readouts,
  Slider, Toggle, num, usePlayer,
} from './kit'

const L = 4
// The window runs to 4.5 at the positive ends so the axis names sit between tick numbers.
const W = 4.5
const HOLE = 0.14
const MIN = -1.25
const MAX = 1.25

type Status = 'hit' | 'miss' | 'parallel' | 'none'

function status(a: number): Status {
  if (a <= -1 + 1e-9 || a > 1 + 1e-9) return 'none'
  if (Math.abs(a - 0.25) < 0.004 || Math.abs(a + 0.75) < 0.004) return 'parallel'
  const th = a * Math.PI
  return Math.sin(th) - Math.cos(th) > 0 ? 'hit' : 'miss'
}

const COLOUR: Record<Status, string> = { hit: C.good, miss: C.bad, parallel: C.bad, none: C.guide }

const dir = (a: number, r: number): [number, number] => [r * Math.cos(a), r * Math.sin(a)]

/** α as a fraction where it is one of the key values, else to 2 d.p. */
function alphaTex(a: number): string {
  const keys: [number, string][] = [[-1, '-1'], [-0.75, '-\\tfrac34'], [0.25, '\\tfrac14'], [0.5, '\\tfrac12'], [1, '1'], [0, '0']]
  for (const [v, t] of keys) if (Math.abs(a - v) < 0.004) return t
  return num(a)
}

// The α number line under the plane: the region where Arg(z) = απ is impossible, the trail of α
// values tried, the current α, and (on request) the answer with its open and closed endpoints.
function NumberLine({ alpha, visited, showAnswer }: { alpha: number; visited: Set<number>; showAnswer: boolean }) {
  const X = (a: number) => 26 + ((a - MIN) / (MAX - MIN)) * 282
  const Y = 36
  const ticks: [number, string][] = [[-1, '−1'], [-0.75, '−3/4'], [-0.5, '−1/2'], [0, '0'], [0.25, '1/4'], [0.5, '1/2'], [1, '1']]
  const marker = COLOUR[status(alpha)]
  return (
    <div className="text-gray-700 dark:text-gray-300">
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">
        Every <M>\alpha</M> you try is marked: green if its ray meets the line, red if it doesn&apos;t.
      </p>
      <svg viewBox="0 0 320 68" className="w-full max-w-[480px] block" role="img" aria-label="Number line of alpha from −1.25 to 1.25, marking which values give a ray that meets the line">
        <rect x={X(MIN)} y={Y - 8} width={X(-1) - X(MIN)} height={16} fill={C.guide} opacity={0.2} />
        <rect x={X(1)} y={Y - 8} width={X(MAX) - X(1)} height={16} fill={C.guide} opacity={0.2} />
        <text x={(X(MIN) + X(-1)) / 2} y={Y - 18} fontSize={9} textAnchor="middle" fill="currentColor" opacity={0.75}>no ray</text>
        <text x={(X(1) + X(MAX)) / 2} y={Y - 18} fontSize={9} textAnchor="middle" fill="currentColor" opacity={0.75}>no ray</text>
        <line x1={X(MIN)} y1={Y} x2={X(MAX)} y2={Y} stroke="currentColor" strokeOpacity={0.55} strokeWidth={1.2} />
        {[...visited].map(k => {
          const a = k / 100
          return <rect key={k} x={X(a) - 0.8} y={Y - 4} width={1.6} height={8} fill={COLOUR[status(a)]} />
        })}
        {ticks.map(([v, t]) => (
          <g key={v}>
            <line x1={X(v)} y1={Y - 5} x2={X(v)} y2={Y + 5} stroke="currentColor" strokeWidth={1} />
            <text x={X(v)} y={Y + 18} fontSize={10.5} textAnchor="middle" fill="currentColor">{t}</text>
          </g>
        ))}
        {showAnswer && (
          <g>
            <line x1={X(-1)} y1={Y - 11} x2={X(-0.75)} y2={Y - 11} stroke={C.good} strokeWidth={3.5} />
            <line x1={X(0.25)} y1={Y - 11} x2={X(1)} y2={Y - 11} stroke={C.good} strokeWidth={3.5} />
            {[-1, -0.75, 0.25].map(v => (
              <circle key={v} cx={X(v)} cy={Y - 11} r={3.4} stroke={C.good} strokeWidth={1.6} className="fill-white dark:fill-gray-900" />
            ))}
            <circle cx={X(1)} cy={Y - 11} r={3.4} fill={C.good} />
          </g>
        )}
        <path d={`M ${X(alpha) - 5} ${Y + 31} L ${X(alpha) + 5} ${Y + 31} L ${X(alpha)} ${Y + 24} Z`} fill={marker} />
        <line x1={X(alpha)} y1={Y - 8} x2={X(alpha)} y2={Y + 8} stroke={marker} strokeWidth={2.5} />
        <text x={6} y={Y + 4} fontSize={13} fontStyle="italic" fill="currentColor">α</text>
      </svg>
    </div>
  )
}

export default function Rotate() {
  const [alpha, setAlpha] = useState(0.6)
  const [showAnswer, setShowAnswer] = useState(false)
  const [visited, setVisited] = useState<Set<number>>(() => new Set([60]))
  const player = usePlayer(setAlpha, { min: -1, max: 1, seconds: 10 })

  useEffect(() => {
    const k = Math.round(alpha * 100)
    setVisited(prev => {
      if (prev.has(k)) return prev
      const next = new Set(prev)
      next.add(k)
      return next
    })
  }, [alpha])

  const st = status(alpha)
  const th = alpha * Math.PI
  const s = Math.sin(th) - Math.cos(th)
  const hit: [number, number] | null = st === 'hit' ? dir(th, 2 / s) : null
  const hitVisible = hit !== null && hit[0] >= -L - 0.1 && hit[0] <= W && hit[1] >= -L - 0.1 && hit[1] <= W
  const arcPts: [number, number][] = Array.from({ length: 61 }, (_, i) => dir((th * i) / 60, 0.7))
  const rayColour = COLOUR[st]
  const hitTex = hit ? `\\left(${num(hit[0])},\\ ${num(hit[1])}\\right)` : ''

  let notice
  if (st === 'none') {
    if (Math.abs(alpha + 1) < 0.004) {
      notice = (
        <Notice tone="warn">
          <b><M>\alpha = -1</M> would need <M>{'\\mathrm{Arg}(z) = -\\pi'}</M></b>, but the principal argument lies in{' '}
          <M>{'(-\\pi, \\pi]'}</M>, so no <M>z</M> has argument <M>-\pi</M>: there is no such ray. The grey direction does
          reach the line at <M>-2</M>, but the points on it have argument <M>\pi</M>, which is <M>\alpha = 1</M>, already
          counted. So <M>-1</M> is excluded; the report says including it was a common error.
        </Notice>
      )
    } else {
      const same = alpha > 1 ? alpha - 2 : alpha + 2
      notice = (
        <Notice tone="warn">
          <M>{`\\mathrm{Arg}(z) = ${num(alpha)}\\pi`}</M> is outside <M>{'(-\\pi, \\pi]'}</M>, so no complex number has this
          principal argument: there is no ray. The grey direction is the ray <M>{`\\alpha = ${num(same)}`}</M>, already
          counted. That is why <M>\alpha</M> only runs over <M>{'(-1, 1]'}</M>, and why the answer comes in two pieces
          instead of one.
        </Notice>
      )
    }
  } else if (st === 'parallel') {
    const pos = alpha > 0
    notice = (
      <Notice tone="warn">
        <b>
          <M>{`\\alpha = ${pos ? '\\tfrac14' : '-\\tfrac34'}`}</M>: the ray is exactly parallel to <M>y = x + 2</M>.
        </b>{' '}
        It points along <M>{pos ? '\\theta = \\tfrac{\\pi}{4}' : '\\theta = -\\tfrac{3\\pi}{4}'}</M>, the dashed line{' '}
        <M>y = x</M>, which has the same gradient, 1. Parallel lines never meet, so this <M>\alpha</M> is excluded: a round
        bracket at <M>{pos ? '\\tfrac14' : '-\\tfrac34'}</M>.
      </Notice>
    )
  } else if (st === 'miss') {
    notice = (
      <Notice>
        <b>Miss.</b> The ray points <b>below</b> the dashed line <M>y = x</M>, but <M>y = x + 2</M> lies entirely above it,
        so the ray can never reach it. (Extended backwards through O it would, but a ray only goes one way.) Every{' '}
        <M>\alpha</M> strictly between <M>{'-\\tfrac34'}</M> and <M>{'\\tfrac14'}</M> misses. Press play to sweep the ray
        all the way round.
      </Notice>
    )
  } else if (Math.abs(alpha - 1) < 0.004) {
    notice = (
      <Notice tone="good">
        <b>
          <M>\alpha = 1</M>: <M>{'\\mathrm{Arg}(z) = \\pi'}</M>
        </b>
        , the negative real axis. It meets the line at <M>-2</M>, one of the points from part b. The principal argument can
        equal <M>\pi</M> (the interval <M>{'(-\\pi, \\pi]'}</M> is closed at <M>\pi</M>), so <M>\alpha = 1</M> is{' '}
        <b>included</b>: a square bracket.
      </Notice>
    )
  } else if (!hitVisible || (alpha > 0.25 && alpha < 0.32) || (alpha < -0.75 && alpha > -0.82)) {
    notice = (
      <Notice tone="good">
        <b>Hit, but a long way out</b>{hitVisible ? '' : ', off the diagram'}: at about <M>{hitTex}</M>. The ray is nearly
        parallel to <M>y = x + 2</M>, so the meeting point runs off to infinity as <M>\alpha</M> approaches{' '}
        <M>{alpha > 0 ? '\\tfrac14' : '-\\tfrac34'}</M>. At exactly that value they never meet.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b>Hit</b> at about <M>{hitTex}</M>. The ray points <b>above</b> the dashed line <M>y = x</M>, into the side where{' '}
        <M>y = x + 2</M> is, so going far enough along it you must cross the line.{' '}
        {alpha > 0 ? (
          <>
            Every direction from just past <M>{'\\tfrac{\\pi}{4}'}</M> round to <M>\pi</M> does the same.
          </>
        ) : (
          <>
            Going clockwise, every direction from just past <M>{'-\\tfrac{3\\pi}{4}'}</M> round towards <M>-\pi</M> does
            the same.
          </>
        )}
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-L, W]} y={[-L, W]} equalScale height={320} xLabel="Re" yLabel="Im">
        {showAnswer && <Polygon points={[[-6, -6], [6, 6], [-6, 6]]} color={C.good} fillOpacity={0.1} weight={0} strokeOpacity={0} />}
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[3.6, 3.6]} color={C.guide} attach="w">y = x</Label>
        <Line.ThroughPoints point1={[0, 2]} point2={[1, 3]} color={C.g} weight={3} />
        <Label at={[-3.4, -1.4]} color={C.g} attach="e">y = x + 2</Label>
        <Line.Segment
          point1={dir(th, HOLE)}
          point2={dir(th, 12)}
          color={rayColour}
          weight={st === 'none' ? 2.5 : 3.5}
          style={st === 'hit' || st === 'miss' ? 'solid' : 'dashed'}
        />
        <Circle center={[0, 0]} radius={HOLE} color={rayColour} fillOpacity={0} weight={2.5} />
        <Polyline points={arcPts} color={C.violet} weight={2.5} />
        {/* The meeting point's coordinates are in the readout below: a label here would sit on the
            ray or the line for some directions. */}
        {hit && hitVisible && <Point x={hit[0]} y={hit[1]} color={C.good} />}
      </Plane>
      <Controls>
        <Slider
          label="\alpha"
          value={alpha}
          onChange={v => {
            player.stop()
            setAlpha(v)
          }}
          min={MIN}
          max={MAX}
          step={0.01}
          format={v => num(v)}
        />
        <NumberLine alpha={alpha} visited={visited} showAnswer={showAnswer} />
        <Buttons>
          <PlayButton
            playing={player.playing}
            onClick={() => {
              if (!player.playing) setAlpha(-1)
              player.toggle(-1)
            }}
            label="Sweep α from −1 to 1"
          />
          <Toggle label="Show the answer" checked={showAnswer} onChange={setShowAnswer} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`\\text{angle} = \\alpha\\pi,\\ \\alpha = ${alphaTex(alpha)}`} />
          <Readout
            color={rayColour}
            tex={
              st === 'hit'
                ? `\\text{meets } y = x + 2 \\text{ at} \\approx ${hitTex}`
                : st === 'none'
                  ? '\\text{no ray}'
                  : '\\text{no intersection}'
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
