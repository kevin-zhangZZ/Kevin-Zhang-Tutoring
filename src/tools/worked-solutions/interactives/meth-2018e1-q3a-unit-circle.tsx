// 2018 Methods Exam 1 Q3a — cos(x) is the horizontal coordinate of the point P at angle x on the
// unit circle, so solving cos(x) = −½ means finding where the vertical line (horizontal
// coordinate −½) cuts the circle. Drag P (or use the slider) for one lap, 0 to 2π: the line is
// cut exactly twice, at 2π/3 and 4π/3. A toggle copies the reference angle π/3 into quadrants 2
// and 3; another shows the report's slip (π/6 as the reference angle), whose points 5π/6 and
// 7π/6 sit at −√3/2 and miss the line.

import { useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider,
  Toggle, clamp, num,
} from './kit'

const STEP = Math.PI / 60 // the slider and the drag both snap to multiples of π/60 (3°)
const TAU = 2 * Math.PI
const SOL = [(2 * Math.PI) / 3, (4 * Math.PI) / 3]
const R3 = Math.sqrt(3) / 2

const snap = (t: number) => clamp(Math.round(t / STEP) * STEP, 0, TAU)
const same = (a: number, b: number) => Math.abs(a - b) < 1e-6

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}
/** x as a multiple of π, reduced: [numerator, denominator] of x/π. */
function piParts(t: number): [number, number] {
  const n = Math.round(t / STEP)
  if (n === 0) return [0, 1]
  const g = gcd(n, 60)
  return [n / g, 60 / g]
}
function piText(t: number): string {
  const [a, b] = piParts(t)
  if (a === 0) return '0'
  return `${a === 1 ? '' : a}π${b === 1 ? '' : `/${b}`}`
}
function piTex(t: number): string {
  const [a, b] = piParts(t)
  if (a === 0) return '0'
  const top = `${a === 1 ? '' : a}\\pi`
  return b === 1 ? top : `\\tfrac{${top}}{${b}}`
}
/** Exact cosine for the angles a student is likely to stop on; otherwise 3 dp. */
function cosTex(t: number): string {
  const c = Math.cos(t)
  for (const [v, tex] of [[0, '0'], [1, '1'], [-1, '-1'], [0.5, '\\tfrac12'], [-0.5, '-\\tfrac12'], [R3, '\\tfrac{\\sqrt3}{2}'], [-R3, '-\\tfrac{\\sqrt3}{2}'], [Math.SQRT1_2, '\\tfrac{1}{\\sqrt2}'], [-Math.SQRT1_2, '-\\tfrac{1}{\\sqrt2}']] as const) {
    if (Math.abs(c - v) < 1e-9) return tex
  }
  return `\\approx ${num(c, 3)}`
}
/** 2cos(x) + 1, exact where cos(x) is. */
function fTex(t: number): string {
  const c = Math.cos(t)
  for (const [v, tex] of [[0, '1'], [1, '3'], [-1, '-1'], [0.5, '2'], [-0.5, '0'], [R3, '1+\\sqrt3'], [-R3, '1-\\sqrt3'], [Math.SQRT1_2, '1+\\sqrt2'], [-Math.SQRT1_2, '1-\\sqrt2']] as const) {
    if (Math.abs(c - v) < 1e-9) return `= ${tex}`
  }
  return `\\approx ${num(2 * c + 1, 2)}`
}

/** An arc of radius r from angle a to angle b, for marking angles. */
function Arc({ a, b, r, color }: { a: number; b: number; r: number; color: string }) {
  return <Plot.Parametric xy={t => [r * Math.cos(t), r * Math.sin(t)]} domain={[a, b]} color={color} weight={2.5} />
}

export default function UnitCircle() {
  const [x, setX] = useState(Math.PI / 3)
  const [found, setFound] = useState<boolean[]>([false, false])
  const [showRef, setShowRef] = useState(false)
  const [showSlip, setShowSlip] = useState(false)

  const move = (t: number) => {
    const s = snap(t)
    setX(s)
    const hit = SOL.map(v => same(s, v))
    if (hit.some(Boolean)) setFound(f => f.map((v, i) => v || hit[i]))
  }

  const cx = Math.cos(x)
  const sy = Math.sin(x)
  const onLine = SOL.some(v => same(x, v))
  const nFound = found.filter(Boolean).length
  const pColor = onLine ? C.good : cx > 1e-9 ? C.f : C.violet

  let notice
  if (showSlip) {
    notice = (
      <Notice tone="warn">
        Using <M>{'\\tfrac{\\pi}{6}'}</M> as the reference angle gives <M>{'\\tfrac{5\\pi}{6}'}</M> and{' '}
        <M>{'\\tfrac{7\\pi}{6}'}</M> (red). Their horizontal coordinate is <M>{'-\\tfrac{\\sqrt3}{2}\\approx -0.87'}</M>, so
        they miss the orange line. <M>{'\\tfrac{\\pi}{6}'}</M> belongs to <M>{'\\cos = \\tfrac{\\sqrt3}{2}'}</M>. The one for{' '}
        <M>{'\\tfrac12'}</M> is <M>{'\\tfrac{\\pi}{3}'}</M>, because the short side <M>{'\\tfrac12'}</M> sits next to the{' '}
        <M>{'60^\\circ'}</M> angle.
      </Notice>
    )
  } else if (onLine) {
    notice = (
      <Notice tone="good">
        <b>P is on the orange line.</b> <M>{`\\cos\\left(${piTex(x)}\\right) = -\\tfrac12`}</M>, so{' '}
        <M>{`2\\cos\\left(${piTex(x)}\\right)+1 = 0`}</M>.{' '}
        {nFound < 2 ? (
          <>Now find the other point where the line cuts the circle.</>
        ) : (
          <>
            Both found. One lap from <M>0</M> to <M>{'2\\pi'}</M> crosses the line exactly twice, so there are exactly two
            solutions. Going round again (or backwards past <M>0</M>) only repeats them, outside the domain.
          </>
        )}
      </Notice>
    )
  } else if (same(x, Math.PI / 3)) {
    notice = (
      <Notice>
        <M>{'\\cos\\left(\\tfrac{\\pi}{3}\\right) = \\tfrac12'}</M>: the right <b>size</b> but the wrong <b>sign</b>. This{' '}
        <M>{'\\tfrac{\\pi}{3}'}</M> is the reference angle.{' '}
        {showRef ? (
          <>
            The green rays copy it either side of the negative horizontal axis, into the two quadrants where the horizontal
            coordinate is negative. Both land on the orange line: drag P to each.
          </>
        ) : (
          <>
            Turn on &ldquo;Reference angle&rdquo; to see it copied into the two quadrants where the horizontal coordinate is
            negative, then drag P there.
          </>
        )}
      </Notice>
    )
  } else if (cx > 1e-9) {
    notice = (
      <Notice>
        <M>{'\\cos x'}</M> is P&apos;s horizontal coordinate (the blue bar). Here it is positive, since P is right of the
        vertical axis, so <M>{'2\\cos x + 1 > 1'}</M>. No solution lives on this side: P must be in quadrant 2 or 3.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        P is left of the vertical axis, so <M>{'\\cos x'}</M> is negative, which is the right side. But{' '}
        <M>{`\\cos x ${cosTex(x).startsWith('\\approx') ? '' : '='} ${cosTex(x)}`}</M> here, and you need exactly{' '}
        <M>{'-\\tfrac12'}</M>, where the orange line cuts the circle.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-1.35, 1.35]}
        y={[-1.2, 1.2]}
        xStep={0.5}
        yStep={0.5}
        height={330}
        equalScale
        xLabel=""
        yLabel=""
        xLabels={false}
        yLabels={false}
      >
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={2} />
        {/* the circle's radius, so the horizontal coordinates have a scale (tick numbers would sit on the lines) */}
        <Label at={[1, 0]} color={C.guide} attach="se" gap={4}>1</Label>
        <Label at={[-1, 0]} color={C.guide} attach="sw" gap={4}>−1</Label>

        {/* the target: horizontal coordinate −½ */}
        <Line.Segment point1={[-0.5, -1.2]} point2={[-0.5, 1.2]} color={C.g} style="dashed" weight={2} />
        <Label at={[-0.5, 1.2]} color={C.g} attach="w">cos x = −½</Label>

        {/* reference angle π/3 in quadrant 1, copied into quadrants 2 and 3 */}
        {showRef && (
          <>
            <Line.Segment point1={[0, 0]} point2={[0.5, R3]} color={C.guide} style="dashed" weight={2} />
            <Arc a={0} b={Math.PI / 3} r={0.3} color={C.guide} />
            <Label at={[0.3 * Math.cos(Math.PI / 6), 0.3 * Math.sin(Math.PI / 6)]} color={C.guide} attach="ne" gap={4}>π/3</Label>
            {[1, -1].map(s => (
              <g key={s}>
                <Line.Segment point1={[0, 0]} point2={[-0.5, s * R3]} color={C.good} weight={2} />
                <Arc a={s > 0 ? (2 * Math.PI) / 3 : Math.PI} b={s > 0 ? Math.PI : (4 * Math.PI) / 3} r={0.3} color={C.good} />
                <Label at={[-0.3 * Math.cos(Math.PI / 6), s * 0.3 * Math.sin(Math.PI / 6)]} color={C.good} attach={s > 0 ? 'nw' : 'sw'} gap={4}>π/3</Label>
              </g>
            ))}
          </>
        )}

        {/* the report's slip: π/6 as the reference angle */}
        {showSlip && (
          <>
            <Line.Segment point1={[-R3, 0]} point2={[-0.5, 0]} color={C.bad} weight={3} />
            {[1, -1].map(s => (
              <g key={s}>
                <Line.Segment point1={[0, 0]} point2={[-R3, s * 0.5]} color={C.bad} weight={2} />
                <Line.Segment point1={[-R3, s * 0.5]} point2={[-R3, 0]} color={C.bad} style="dashed" weight={1.5} />
                <Point x={-R3} y={s * 0.5} color={C.bad} />
              </g>
            ))}
            <Label at={[-R3, 0.5]} color={C.bad} attach="nw">5π/6</Label>
            <Label at={[-R3, -0.5]} color={C.bad} attach="sw">7π/6</Label>
          </>
        )}

        {/* solutions found so far */}
        {SOL.map((v, i) =>
          found[i] ? (
            <g key={v}>
              <Point x={Math.cos(v)} y={Math.sin(v)} color={C.good} />
              <Label at={[Math.cos(v), Math.sin(v)]} color={C.good} attach={i === 0 ? 'ne' : 'se'}>
                {i === 0 ? '2π/3' : '4π/3'}
              </Label>
            </g>
          ) : null,
        )}

        {/* the angle x, the radius, and cos x as P's horizontal coordinate */}
        {x > 1e-9 && <Arc a={0} b={x} r={0.16} color={C.violet} />}
        <Line.Segment point1={[0, 0]} point2={[cx, sy]} color={pColor} weight={2} />
        <Line.Segment point1={[cx, sy]} point2={[cx, 0]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[0, 0]} point2={[cx, 0]} color={C.f} weight={6} />
        {Math.abs(cx) > 0.2 && (
          <Label at={[cx / 2, 0]} color={C.f} attach={sy >= 0 ? 's' : 'n'} gap={8}>cos x</Label>
        )}
        <MovablePoint
          point={[cx, sy]}
          onMove={([px, py]) => {
            let t = Math.atan2(py, px)
            if (t < 0) t += TAU
            // don't let a drag just below the positive axis jump from 2π back to 0
            if (x > Math.PI && t < 0.05) t = TAU
            move(t)
          }}
          color={pColor}
        />
        <Label at={[cx, sy]} color={pColor} attach={cx >= 0 ? (sy >= 0 ? 'ne' : 'se') : sy >= 0 ? 'nw' : 'sw'} gap={12}>P</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={move} min={0} max={TAU} step={STEP} format={piText} />
        <Buttons>
          <Toggle label="Reference angle" checked={showRef} onChange={setShowRef} />
          <Toggle label="Try π/6 instead (the slip)" checked={showSlip} onChange={setShowSlip} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`x = ${piTex(x)}`} />
          <Readout color={C.f} tex={`\\cos x ${cosTex(x).startsWith('\\approx') ? '' : '='} ${cosTex(x)}`} />
          <Readout
            color={onLine ? C.good : undefined}
            tex={`2\\cos x + 1 ${fTex(x)}${onLine ? '\\ \\checkmark' : ''}`}
          />
          {showSlip && <Readout color={C.bad} tex="2\cos\left(\tfrac{5\pi}{6}\right)+1 = 1-\sqrt3 \ne 0" />}
          <Readout tex={`\\text{found: } ${nFound} \\text{ of } 2`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
