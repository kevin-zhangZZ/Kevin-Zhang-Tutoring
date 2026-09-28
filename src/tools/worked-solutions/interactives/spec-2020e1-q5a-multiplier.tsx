// 2020 Specialist Exam 1 Q5a — the vector resolute of a = 2i − 3j + k on b = i + mj − k is
// k·b with multiplier k = (a·b)/(b·b) = (1 − 3m)/(m² + 2). Drag m and watch k move along its
// graph: it meets the given value −11/18 (dashed) exactly twice, at m = 10/11 and m = 4 — the two
// roots of (11m − 10)(m − 4) = 0 — and of the integer dots only m = 4 lands on the line. Left of
// m = 1/3, a·b > 0 and the multiplier is positive, so a negative multiplier already says m > 1/3.
// Between the roots the curve dips below the line, which is the quadratic 11m² − 54m + 40 being
// negative there (k + 11/18 = (11m² − 54m + 40)/(18(m² + 2))). A toggle shows the scalar/vector
// resolute mix-up — dividing by |b| instead of b·b — whose curve crosses −11/18 once, at the
// non-integer m ≈ 0.650 (root of 2795m² − 1944m + 82 = 0 with 1 − 3m < 0; checked with sympy).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider,
  Toggle, clamp, num,
} from './kit'

const K_GIVEN = -11 / 18
const k = (m: number) => (1 - 3 * m) / (m * m + 2)
// The slip: the scalar resolute a·b/|b| set equal to −11/18.
const kWrong = (m: number) => (1 - 3 * m) / Math.sqrt(m * m + 2)
const M_WRONG = (972 + 11 * Math.sqrt(5914)) / 2795 // ≈ 0.6504

const M_MIN = -2
const M_MAX = 8
const ROOT_1 = 10 / 11
const ROOT_2 = 4
const ZERO = 1 / 3
const INTEGERS = Array.from({ length: M_MAX - M_MIN + 1 }, (_, i) => M_MIN + i)

// Snap onto the special values when the drag or slider passes close, so they can be reached with
// a finger.
function snap(m: number): number {
  const v = clamp(m, M_MIN, M_MAX)
  for (const s of [ROOT_1, ROOT_2, ZERO]) if (Math.abs(v - s) < 0.05) return s
  return v
}

const is = (a: number, b: number) => Math.abs(a - b) < 1e-9

export default function Multiplier() {
  const [m, setM] = useState(-1)
  const [wrong, setWrong] = useState(false)
  const km = k(m)

  const atRoot2 = is(m, ROOT_2)
  const atRoot1 = is(m, ROOT_1)
  const atZero = is(m, ZERO)

  // Exact readouts at the special values; rounded (≈) everywhere else.
  let dotAB = `= 1 - 3m \\approx ${num(1 - 3 * m)}`
  let dotBB = `= m^2 + 2 \\approx ${num(m * m + 2)}`
  let mult = `\\approx ${num(km, 3)}`
  if (atRoot2) {
    dotAB = '= 1 - 12 = -11'
    dotBB = '= 1 + 16 + 1 = 18'
    mult = '= -\\tfrac{11}{18}'
  } else if (atRoot1) {
    dotAB = '= 1 - \\tfrac{30}{11} = -\\tfrac{19}{11}'
    dotBB = '= \\tfrac{100}{121} + 2 = \\tfrac{342}{121}'
    mult = '= -\\tfrac{19}{11}\\times\\tfrac{121}{342} = -\\tfrac{11}{18}'
  } else if (atZero) {
    dotAB = '= 1 - 1 = 0'
    dotBB = '= \\tfrac19 + 2 = \\tfrac{19}{9}'
    mult = '= 0'
  }

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>The red curve divides by <M>{'|\\underset{\\sim}{b}|'}</M> instead of <M>{'\\underset{\\sim}{b}\\cdot\\underset{\\sim}{b}'}</M>.</b>{' '}
        <M>{'\\tfrac{1-3m}{\\sqrt{m^2+2}}'}</M> is the <i>scalar</i> resolute: the length of the shadow, not the number of{' '}
        <M>{'\\underset{\\sim}{b}'}</M>&apos;s in it. It crosses <M>{'-\\tfrac{11}{18}'}</M> only once, at{' '}
        <M>{'m \\approx 0.65'}</M>, which is not an integer, so &ldquo;<M>m</M> is an integer&rdquo; has nothing to pick. If
        your equation has no integer root, check that you divided by <M>{'\\underset{\\sim}{b}\\cdot\\underset{\\sim}{b} = |\\underset{\\sim}{b}|^2'}</M>.
      </Notice>
    )
  } else if (atRoot2) {
    notice = (
      <Notice tone="good">
        <b>
          <M>m = 4</M>: the curve meets the dashed line.
        </b>{' '}
        Here <M>{'\\underset{\\sim}{a}\\cdot\\underset{\\sim}{b} = -11'}</M> and <M>{'\\underset{\\sim}{b}\\cdot\\underset{\\sim}{b} = 18'}</M>, so the
        multiplier is exactly <M>{'-\\tfrac{11}{18}'}</M>. It is the only integer dot on the line: its neighbours{' '}
        <M>m = 3</M> and <M>m = 5</M> give <M>{'-\\tfrac{8}{11}'}</M> and <M>{'-\\tfrac{14}{27}'}</M>, one either side. Now
        try the other crossing.
      </Notice>
    )
  } else if (atRoot1) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>{'m = \\tfrac{10}{11}'}</M> gives <M>{'-\\tfrac{11}{18}'}</M> too.
        </b>{' '}
        It is the root from the factor <M>11m - 10</M>, and it really does solve the equation. It is rejected for one reason
        only: the question says <M>m</M> is an integer. Without that condition the question would have two answers, which is
        why the condition is there.
      </Notice>
    )
  } else if (atZero) {
    notice = (
      <Notice>
        At <M>{'m = \\tfrac13'}</M>, <M>{'\\underset{\\sim}{a}\\cdot\\underset{\\sim}{b} = 0'}</M>: <M>{'\\underset{\\sim}{a}'}</M> is
        perpendicular to <M>{'\\underset{\\sim}{b}'}</M>, casts no shadow on it, and the multiplier is <M>0</M>. From here on
        the multiplier is negative. Keep dragging right.
      </Notice>
    )
  } else if (m < ZERO) {
    notice = (
      <Notice>
        Left of <M>{'m = \\tfrac13'}</M>, <M>{'\\underset{\\sim}{a}\\cdot\\underset{\\sim}{b} = 1 - 3m'}</M> is positive, so the
        multiplier is positive: the resolute would point the <i>same</i> way as <M>{'\\underset{\\sim}{b}'}</M>. The given
        multiplier <M>{'-\\tfrac{11}{18}'}</M> is negative, so before any algebra you know <M>1 - 3m &lt; 0</M>, that is{' '}
        <M>{'m > \\tfrac13'}</M>. Drag the point to the right.
      </Notice>
    )
  } else if (m < ROOT_1) {
    notice = (
      <Notice>
        Now the multiplier is negative (<M>{`\\approx ${num(km, 3)}`}</M>): the shadow of <M>{'\\underset{\\sim}{a}'}</M> points
        backwards along <M>{'\\underset{\\sim}{b}'}</M>. But it is not yet down to <M>{'-\\tfrac{11}{18} \\approx -0.611'}</M>.
        Keep going right until the curve meets the dashed line.
      </Notice>
    )
  } else if (m < ROOT_2) {
    notice = (
      <Notice>
        Between the two crossings the curve is <i>below</i> the dashed line (<M>{`k \\approx ${num(km, 3)}`}</M>). That is the
        quadratic from the working being negative between its roots:{' '}
        <M>{'k + \\tfrac{11}{18} = \\tfrac{11m^2 - 54m + 40}{18(m^2+2)}'}</M>. Find where it comes back up to the line.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past <M>m = 4</M> the curve creeps back up towards <M>0</M>: <M>{'\\underset{\\sim}{b}\\cdot\\underset{\\sim}{b} \\approx m^2'}</M>{' '}
        grows much faster than <M>{'\\underset{\\sim}{a}\\cdot\\underset{\\sim}{b} \\approx -3m'}</M>, so the multiplier shrinks. It
        never returns to <M>{'-\\tfrac{11}{18}'}</M>, so the equation has exactly two solutions.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[M_MIN, M_MAX]}
        y={[-1.25, 1.5]}
        xStep={1}
        yStep={0.5}
        height={290}
        xLabel="m"
        yLabel="k"
        yLabels={v => (Number.isInteger(v) ? String(v).replace('-', '−') : '')}
      >
        <Line.ThroughPoints point1={[0, K_GIVEN]} point2={[1, K_GIVEN]} color={C.g} style="dashed" weight={2} />
        <Label at={[M_MAX, K_GIVEN]} color={C.g} attach="sw">−11/18</Label>
        {wrong && (
          <>
            <Plot.OfX y={kWrong} domain={[M_MIN, M_MAX]} color={C.bad} weight={2.5} />
            <Point x={M_WRONG} y={K_GIVEN} color={C.bad} />
            <Label at={[M_WRONG, K_GIVEN]} color={C.bad} attach="sw">≈ 0.65</Label>
          </>
        )}
        <Plot.OfX y={k} domain={[M_MIN, M_MAX]} color={C.f} weight={3} />
        {INTEGERS.map(i => (
          <Point key={i} x={i} y={k(i)} color={i === ROOT_2 ? C.good : C.guide} svgCircleProps={{ r: i === ROOT_2 ? 5 : 3.5 }} />
        ))}
        {!wrong && (
          <>
            <Point x={ROOT_1} y={K_GIVEN} color={C.g} svgCircleProps={{ r: 4.5 }} />
            <Label at={[ROOT_1, K_GIVEN]} color={C.g} attach="sw" gap={14}>10/11</Label>
          </>
        )}
        <Label at={[ROOT_2, K_GIVEN]} color={C.good} attach="se" gap={16}>4</Label>
        <Line.Segment point1={[m, 0]} point2={[m, km]} color={C.guide} style="dashed" weight={1.5} />
        <MovablePoint point={[m, km]} onMove={([x]) => setM(snap(x))} color={atRoot2 ? C.good : C.f} />
      </Plane>
      <Controls>
        <Slider label="m" value={m} onChange={v => setM(snap(v))} min={M_MIN} max={M_MAX} step={0.01} format={v => (is(v, ROOT_1) ? '10/11' : is(v, ZERO) ? '1/3' : num(v, 2))} />
        <Readouts>
          <Readout tex={`\\underset{\\sim}{a}\\cdot\\underset{\\sim}{b} ${dotAB}`} />
          <Readout tex={`\\underset{\\sim}{b}\\cdot\\underset{\\sim}{b} ${dotBB}`} />
          <Readout color={C.f} tex={`k ${mult}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          The blue curve is the multiplier{' '}
          <M>{'k = (\\underset{\\sim}{a}\\cdot\\underset{\\sim}{b})\\,/\\,(\\underset{\\sim}{b}\\cdot\\underset{\\sim}{b})'}</M> in the
          resolute <M>{'k\\,\\underset{\\sim}{b}'}</M>. Drag the point along it, or use the slider; the dots mark the whole
          numbers <M>m</M>.
        </p>
        <Buttons>
          <ActionButton label="Go to m = 10/11" onClick={() => setM(ROOT_1)} />
          <ActionButton label="Go to m = 4" onClick={() => setM(ROOT_2)} />
          <Toggle label="What if I divide by |b|?" checked={wrong} onChange={setWrong} />
        </Buttons>
        {notice}
      </Controls>
    </div>
  )
}
