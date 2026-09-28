// 2017 Specialist Exam 2 MCQ 2 — cos(x) > ¼cosec(x) on (0, 2π)\{π}, read off a graph. Slide x and
// compare the two heights: the inequality holds where cos x (blue) is above ¼cosec x (orange),
// shaded green. The key picture is just right of the asymptote x = π: sin x is a tiny negative
// number there, so ¼cosec x plunges to −∞, far below cos x. That interval, and (17π/12, 2π), are
// what the slip "multiply by sin x and keep >" (option B, 30%) misses; a toggle draws B's set
// (sin 2x > ½) as red bars to compare.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, clamp, num,
} from './kit'

const PI = Math.PI
const TAU = 2 * PI
const YV = 2.35
const cosec4 = (x: number) => 1 / (4 * Math.sin(x))
// Where ¼cosec x leaves the view (|y| = YV), so each branch is drawn only while visible.
const A = Math.asin(1 / (4 * YV))
const TRUE_SET: [number, number][] = [[PI / 12, (5 * PI) / 12], [PI, (13 * PI) / 12], [(17 * PI) / 12, TAU]]
const B_SET: [number, number][] = [[PI / 12, (5 * PI) / 12], [(13 * PI) / 12, (17 * PI) / 12]]
const CROSS: { k: number; attach: 'ne' | 'se' }[] = [
  { k: 1, attach: 'ne' },
  { k: 5, attach: 'ne' },
  { k: 13, attach: 'se' },
  { k: 17, attach: 'se' },
]

function piTick(v: number): string {
  const k = Math.round(v / (PI / 2))
  return ['', 'π/2', 'π', '3π/2', '2π'][k] ?? ''
}

export default function CosecInequality() {
  const [x0, setX0] = useState(3.3)
  const [showB, setShowB] = useState(false)

  const atPi = Math.abs(x0 - PI) < 0.003
  const c = Math.cos(x0)
  const g = cosec4(x0)
  const holds = !atPi && c > g
  const sinNeg = x0 > PI
  const col = holds ? C.good : C.bad
  const gShown = clamp(g, -YV, YV)

  let notice
  if (showB) {
    notice = (
      <Notice tone="warn">
        <b>The red bars are option B</b>: multiply by <M>\sin x</M>, keep <M>{'>'}</M>, and solve{' '}
        <M>{'\\sin 2x > \\tfrac12'}</M> on the whole interval. Left of <M>\pi</M> they agree with the green bands. Right of{' '}
        <M>\pi</M> they are exactly wrong: B leaves out <M>{'\\left(\\pi,\\tfrac{13\\pi}{12}\\right)'}</M> and{' '}
        <M>{'\\left(\\tfrac{17\\pi}{12},2\\pi\\right)'}</M>, where blue is clearly above orange, and keeps the band in
        between, where it is not. There <M>{'\\sin x < 0'}</M>, so the inequality should have flipped.
      </Notice>
    )
  } else if (atPi) {
    notice = (
      <Notice tone="warn">
        At <M>x = \pi</M>, <M>\sin x = 0</M> and <M>{'\\operatorname{cosec} x'}</M> is undefined: that asymptote is why the
        question removes <M>\pi</M>. It is also where <M>\sin x</M> changes sign.
      </Notice>
    )
  } else if (!sinNeg) {
    notice = holds ? (
      <Notice tone="good">
        Blue is above orange, so the inequality holds. Here <M>{'\\sin x > 0'}</M>, so multiplying through by{' '}
        <M>\sin x</M> keeps the sign: <M>{'\\sin x\\cos x > \\tfrac14'}</M>, i.e. <M>{'\\sin 2x > \\tfrac12'}</M>{' '}
        (now <M>{`${num(Math.sin(2 * x0), 3)}`}</M>). Slide past <M>\pi</M> to see what changes.
      </Notice>
    ) : (
      <Notice>
        Orange is above blue here, so the inequality fails. Near <M>0</M> and near <M>\pi</M>,{' '}
        <M>\sin x</M> is small and positive, which sends <M>{'\\tfrac14\\operatorname{cosec}x'}</M> up to{' '}
        <M>{'+\\infty'}</M>. Only between <M>{'\\tfrac{\\pi}{12}'}</M> and <M>{'\\tfrac{5\\pi}{12}'}</M> does blue get
        above it.
      </Notice>
    )
  } else if (x0 < (13 * PI) / 12) {
    notice = (
      <Notice tone="good">
        <b>This is the interval option B misses.</b> Just right of <M>\pi</M>, <M>\sin x</M> is a tiny{' '}
        <em>negative</em> number, so <M>{'\\tfrac{1}{4\\sin x}'}</M> plunges towards <M>{'-\\infty'}</M>, far below{' '}
        <M>{'\\cos x \\approx -1'}</M>. The inequality holds, even though <M>{`\\sin 2x = ${num(Math.sin(2 * x0), 3)}`}</M>{' '}
        is less than <M>{'\\tfrac12'}</M>: multiplying by a negative <M>\sin x</M> flips the sign.
      </Notice>
    )
  } else if (x0 < (17 * PI) / 12) {
    notice = (
      <Notice>
        Now blue has dropped below orange, so the inequality fails, even though{' '}
        <M>{`\\sin 2x = ${num(Math.sin(2 * x0), 3)}`}</M>
        {Math.sin(2 * x0) > 0.5 ? <>{' '}is more than <M>{'\\tfrac12'}</M></> : null}. With{' '}
        <M>{'\\sin x < 0'}</M>, the condition is <M>{'\\sin 2x < \\tfrac12'}</M>, not <M>{'>'}</M>. Turn on the toggle to
        see what the unflipped version claims.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Blue is back above orange. As <M>x \to 2\pi</M>, <M>\sin x \to 0</M> from below, so orange dives to{' '}
        <M>{'-\\infty'}</M> again and blue stays above all the way to <M>2\pi</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, TAU]} y={[-2, 2]} xStep={PI / 2} yStep={1} height={320} xLabels={piTick}>
        {TRUE_SET.map(([a, b]) => (
          <Region key={a} top={() => YV} bottom={() => -YV} from={a} to={b} color={C.good} opacity={0.13} />
        ))}
        <Line.Segment point1={[PI, -YV]} point2={[PI, YV]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[PI, 2.05]} attach="e" color={C.guide} size={12}>x = π</Label>

        <Plot.OfX y={Math.cos} domain={[0, TAU]} color={C.f} weight={3} />
        <Plot.OfX y={cosec4} domain={[A, PI - A]} color={C.g} weight={3} />
        <Plot.OfX y={cosec4} domain={[PI + A, TAU - A]} color={C.g} weight={3} />
        <Label at={[2.3, Math.cos(2.3)]} attach="ne" color={C.f}>cos x</Label>
        <Label at={[2.9, cosec4(2.9)]} attach="w" color={C.g}>¼ cosec x</Label>

        {CROSS.map(({ k, attach }) => (
          <g key={k}>
            <Point x={(k * PI) / 12} y={Math.cos((k * PI) / 12)} color={C.ink} />
            <Label at={[(k * PI) / 12, Math.cos((k * PI) / 12)]} attach={attach} size={12}>
              {k === 1 ? 'π/12' : `${k}π/12`}
            </Label>
          </g>
        ))}

        {showB && (
          <>
            {B_SET.map(([a, b]) => (
              <Line.Segment key={a} point1={[a, -1.8]} point2={[b, -1.8]} color={C.bad} weight={6} />
            ))}
            <Label at={[2.35, -1.8]} attach="c" color={C.bad} size={12}>option B</Label>
          </>
        )}

        {!atPi && (
          <>
            <Line.Segment point1={[x0, c]} point2={[x0, gShown]} color={col} weight={4} />
            <Point x={x0} y={c} color={C.f} />
            {Math.abs(g) <= YV && <Point x={x0} y={g} color={C.g} />}
          </>
        )}
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={setX0}
          min={0.02}
          max={TAU - 0.02}
          step={0.005}
          format={v => `${(v / PI).toFixed(3)}\u03c0`}
        />
        <Buttons>
          <Toggle label="Wrong idea: multiply by sin x and keep >" checked={showB} onChange={setShowB} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\cos x = ${num(c, 3)}`} />
          <Readout color={C.g} tex={atPi ? '\\tfrac14\\operatorname{cosec}x\\ \\text{undefined}' : `\\tfrac14\\operatorname{cosec}x = ${num(g, 3)}`} />
          <Readout tex={`\\sin x ${x0 < PI ? '> 0' : atPi ? '= 0' : '< 0'}`} />
          {!atPi && <Readout color={col} tex={holds ? '\\text{holds}\\ \\checkmark' : '\\text{fails}\\ \\times'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}

