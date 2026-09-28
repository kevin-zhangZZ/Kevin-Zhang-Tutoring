// 2020 Specialist Exam 2 MCQ 4 — why the range of f(g(x)) = ½sin(2x) on 0 < x < π/2 is (0, ½] and
// not (0, ½). Drag P along the curve: its height is carried across to a green range bar. The two
// ends of the domain are excluded (hollow dots), so the height 0 is approached but never reached;
// the peak (π/4, ½) is INSIDE the domain (solid dot), so ½ is reached. Half the cohort (option D)
// made the range open at ½ as well. The toggle shrinks the domain to (0, π/4), which turns the peak
// into an excluded endpoint — then, and only then, the range would be D's (0, ½). The point: an end
// of the range is missed only when the extreme height happens nowhere but at an excluded endpoint.
// Heights computed from ½sin(2x), the simplified rule checked with sympy (max ½ at x = π/4).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Toggle, clamp } from './kit'

const PI = Math.PI
const h = (x: number) => 0.5 * Math.sin(2 * x)
const PEAK = PI / 4
// P stops a little short of an excluded end, so the readout never rounds to the value it can't reach.
const GAP = 0.02
const SNAP = 0.02
const BAR = -0.17 // where the range bar stands, just left of the y-axis

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2.5 } }} />
}

/** Tick numbers at multiples of π/8. */
function piTick(v: number): string {
  const n = Math.round((8 * v) / PI)
  if (Math.abs(v - (n * PI) / 8) > 1e-6) return ''
  return ({ 1: 'π/8', 2: 'π/4', 3: '3π/8', 4: 'π/2' } as Record<number, string>)[n] ?? ''
}
const yTick = (v: number) => (Math.abs(v - 0.25) < 1e-9 ? '1/4' : Math.abs(v - 0.5) < 1e-9 ? '1/2' : '')

export default function PeakWidget() {
  const [x, setX] = useState(0.4)
  const [short, setShort] = useState(false)
  const end = short ? PEAK : PI / 2
  const lo = GAP
  const hi = end - GAP
  const xc = clamp(x, lo, hi)
  const y = h(xc)
  const atPeak = !short && Math.abs(xc - PEAK) < 1e-9
  const nearLeft = xc < 0.07
  const nearRight = xc > end - 0.07

  const move = ([mx]: [number, number]) => {
    const v = clamp(mx, lo, hi)
    setX(!short && Math.abs(v - PEAK) < SNAP ? PEAK : v)
  }

  let notice
  let tone: 'neutral' | 'good' | 'warn' = 'neutral'
  if (short) {
    tone = 'warn'
    notice = nearRight ? (
      <>
        <b>Now the peak is an excluded endpoint.</b> With the domain <M>{'\\left(0, \\tfrac{\\pi}{4}\\right)'}</M>, the curve only
        rises, and the height <M>{'\\tfrac12'}</M> would happen at <M>{'x = \\tfrac{\\pi}{4}'}</M> alone, which is no longer
        allowed. P gets as close as you like ({y.toFixed(4)} here) but never arrives, so this range really would be{' '}
        <M>{'\\left(0, \\tfrac12\\right)'}</M>: option D&apos;s range. D is right for a domain the question didn&apos;t give. Turn the toggle
        off to go back.
      </>
    ) : (
      <>
        This is <b>not</b> the question&apos;s domain: it stops at <M>{'\\tfrac{\\pi}{4}'}</M>, before the curve turns. The grey part is no
        longer in the domain. Drag P right, as far as it will go, and watch the range bar: its top is now hollow too.
      </>
    )
  } else if (atPeak) {
    tone = 'good'
    notice = (
      <>
        <b>This is the peak: <M>{'x = \\tfrac{\\pi}{4}'}</M>, height <M>{'\\tfrac12\\sin\\left(\\tfrac{\\pi}{2}\\right) = \\tfrac12'}</M>.</b>{' '}
        <M>{'\\tfrac{\\pi}{4}'}</M> is between <M>0</M> and <M>{'\\tfrac{\\pi}{2}'}</M>, so it <i>is</i> in the domain: the point is
        solid and the height <M>{'\\tfrac12'}</M> is in the range. That is why the range is closed at the top,{' '}
        <M>{'\\left(0, \\tfrac12\\right]'}</M>. Now try the toggle to see when the top <i>would</i> be missed.
      </>
    )
  } else if (nearLeft || nearRight) {
    notice = (
      <>
        P is right at the {nearLeft ? 'left' : 'right'} end, at height {y.toFixed(4)}. However close it gets,{' '}
        <M>{nearLeft ? 'x = 0' : 'x = \\tfrac{\\pi}{2}'}</M> itself is not in the domain (the hollow dot), so the height{' '}
        <M>0</M> is never reached. <b>That</b> end of the range is open because the only place the curve would touch{' '}
        <M>0</M> is an excluded endpoint. Now press &ldquo;Go to <M>{'x = \\tfrac{\\pi}{4}'}</M>&rdquo;.
      </>
    )
  } else {
    notice = (
      <>
        P&apos;s height <M>{`\\tfrac12\\sin(2x) \\approx ${y.toFixed(3)}`}</M> is carried across to the green bar on the left: the range is
        every height the curve reaches. Each height between <M>0</M> and <M>{'\\tfrac12'}</M> is reached twice, once on each side of
        the peak. Drag P to both ends, then to the top.
      </>
    )
  }

  return (
    <div>
      <Plane x={[-0.3, 1.72]} y={[-0.08, 0.62]} xStep={PI / 8} yStep={0.125} height={300} xLabels={piTick} yLabels={yTick}>
        {/* The range bar: every height the curve reaches. */}
        <Line.Segment point1={[BAR, 0]} point2={[BAR, 0.5]} color={C.good} weight={5} />
        {short ? <OpenPoint x={BAR} y={0.5} color={C.good} /> : <Point x={BAR} y={0.5} color={C.good} />}
        <OpenPoint x={BAR} y={0} color={C.good} />
        <Label at={[BAR, 0]} color={C.good} attach="s" gap={9} size={12}>range</Label>

        {short && <Plot.OfX y={h} domain={[PEAK, PI / 2]} color={C.guide} weight={2} style="dashed" />}
        <Plot.OfX y={h} domain={[0, end]} color={C.f} weight={3} />
        <OpenPoint x={0} y={0} color={C.f} />
        {short ? <OpenPoint x={PEAK} y={0.5} color={C.f} /> : <Point x={PEAK} y={0.5} color={C.good} />}
        {!short && <OpenPoint x={PI / 2} y={0} color={C.f} />}
        <Label at={[PEAK, 0.5]} color={short ? C.f : C.good} attach="n" gap={9}>
          {short ? '(π/4, 1/2) excluded' : '(π/4, 1/2)'}
        </Label>

        <Line.Segment point1={[BAR, y]} point2={[xc, y]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={BAR} y={y} color={C.f} svgCircleProps={{ r: 3.5 }} />
        <Label at={[xc, y]} color={C.f} attach={xc < PEAK ? 'se' : 'sw'}>P</Label>
        <MovablePoint point={[xc, y]} onMove={move} color={C.f} />
      </Plane>
      <Controls>
        <Buttons>
          {!short && <ActionButton label={<>Go to <M>{'x = \\tfrac{\\pi}{4}'}</M></>} onClick={() => setX(PEAK)} />}
          <Toggle
            label={<>What if the domain were <M>{'\\left(0, \\tfrac{\\pi}{4}\\right)'}</M>?</>}
            checked={short}
            onChange={v => {
              setShort(v)
              setX(v ? 0.45 : 0.4)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`x \\approx ${xc.toFixed(3)}`} />
          <Readout color={C.f} tex={`y = \\tfrac12\\sin(2x) \\approx ${y.toFixed(4)}`} />
          <Readout color={C.good} tex={short ? '\\text{range } \\left(0, \\tfrac12\\right)' : '\\text{range } \\left(0, \\tfrac12\\right]'} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the blue point P along the curve.</p>
        <Notice tone={tone}>{notice}</Notice>
      </Controls>
    </div>
  )
}
